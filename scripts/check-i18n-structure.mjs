import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const baseUrl =
  process.env.I18N_CHECK_BASE_URL || "http://127.0.0.1:3060";
const routeMap = JSON.parse(
  fs.readFileSync(path.join(root, "src/i18n/routeMap.json"), "utf8"),
);

function readNdjson(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) return [];

  return fs
    .readFileSync(absolutePath, "utf8")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
}

const dynamicEnglishPathRules = [
  ["/aktuelt/", "/about/news/"],
  ["/referansar/", "/references/"],
  ["/andre-produkter/", "/products/accessories/"],
];

function englishPathForSourcePath(sourcePath) {
  const normalized = normalizePath(sourcePath);
  const exact = routeMap[normalized];
  if (exact) return exact === "/" ? "/en" : `/en${exact}`;

  for (const [sourcePrefix, englishPrefix] of dynamicEnglishPathRules) {
    if (normalized.startsWith(sourcePrefix)) {
      return `/en${englishPrefix}${normalized.slice(sourcePrefix.length)}`;
    }
  }

  return `/en${normalized === "/" ? "" : normalized}`;
}

function sourcePathForSeedDoc(doc) {
  if (typeof doc.sourceUrl === "string") {
    try {
      const sourceUrl = new URL(doc.sourceUrl);
      if (sourceUrl.hostname === "www.fresvik.no") {
        return normalizePath(sourceUrl.pathname);
      }
    } catch {
      // Fall through to the stable Sanity slug.
    }
  }

  const slug =
    typeof doc.slug === "string" ? doc.slug : doc.slug?.current;
  return slug ? normalizePath(slug === "home" ? "/" : slug) : undefined;
}

function generatedRoutePairs() {
  const sourcePaths = new Set(Object.keys(routeMap).map(normalizePath));
  const sanityDocs = readNdjson("sanity/seed/migratedContent.ndjson");

  for (const doc of sanityDocs) {
    if (!["page", "product", "service", "newsArticle", "referenceProject"].includes(doc._type)) {
      continue;
    }

    const sourcePath = sourcePathForSeedDoc(doc);
    if (sourcePath) sourcePaths.add(sourcePath);
  }

  return [...sourcePaths]
    .sort()
    .map((sourcePath) => [sourcePath, englishPathForSourcePath(sourcePath)]);
}

const routePairs = generatedRoutePairs();

function normalizeImageSource(source) {
  if (!source) return "";

  try {
    const url = new URL(source, baseUrl);
    if (url.pathname === "/_next/image") {
      const optimizedSource = url.searchParams.get("url");
      return optimizedSource
        ? normalizeImageSource(optimizedSource)
        : url.pathname;
    }
    return `${url.hostname}${url.pathname}`;
  } catch {
    return source;
  }
}

function elementSignature($, element) {
  const node = $(element);
  const classes = (node.attr("class") || "")
    .split(/\s+/)
    .filter(Boolean)
    .sort()
    .join(".");
  const children = node
    .children()
    .toArray()
    .filter((child) => child.type === "tag")
    .map((child) => elementSignature($, child))
    .join("");

  return `<${element.name}${classes ? `.${classes}` : ""}>${children}</${element.name}>`;
}

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

const forbiddenNorwegianUiLabels = [
  "Les meir",
  "Kontakt oss",
  "Send førespørsel",
  "Ring oss",
  "Alle produkt",
  "Alle saker",
  "Alle referansar",
  "Alt tilleggsutstyr",
  "Sjå produkta",
  "Namn",
  "Kva kan vi hjelpe med?",
  "E-postkladden er opna",
];

const forbiddenMigrationHeadings = [
  "Full tekst frå gammal side",
  "Bilde frå gammal side",
  "Bilete frå gammal side",
  "Dokumentlenker frå gammal side",
  "Lenker frå gammal side",
  "Tekst henta frå gammal side utan omskriving",
  "Migrerte lenker",
  "Migrerte bilde",
  "Migrerte bilete",
  "Kjeldetekst",
];

function normalizedText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function pageMetrics(html, locale) {
  const $ = cheerio.load(html);
  const main = $("main");
  const images = main
    .find("img")
    .map((_, element) => normalizeImageSource($(element).attr("src")))
    .get()
    .sort();
  const structure = main
    .children()
    .toArray()
    .filter((child) => child.type === "tag")
    .map((child) => elementSignature($, child))
    .join("");
  const violations = [];

  if (locale === "en") {
    const interactiveText = normalizedText(
      $("a, button, label")
        .map((_, element) => $(element).text())
        .get()
        .join(" "),
    );
    const headingText = normalizedText(
      $("h1, h2, h3, h4, h5, h6")
        .map((_, element) => $(element).text())
        .get()
        .join(" "),
    );

    for (const label of forbiddenNorwegianUiLabels) {
      if (interactiveText.includes(label)) {
        violations.push(`Norwegian UI label: "${label}"`);
      }
    }
    for (const heading of forbiddenMigrationHeadings) {
      if (headingText.includes(heading)) {
        violations.push(`Migration heading: "${heading}"`);
      }
    }
  }

  return {
    sections: main.find("section").length,
    articles: main.find("article").length,
    images,
    documents: main.find(
      'a[href$=".pdf"], a[href*="cdn.sanity.io/files"]',
    ).length,
    links: main.find("a").length,
    buttons: main.find("button").length,
    structureHash: digest(structure),
    violations,
  };
}

async function readPage(pathname, locale) {
  const response = await fetch(new URL(pathname, baseUrl), {
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`${pathname} returned ${response.status}`);
  }

  return pageMetrics(await response.text(), locale);
}

function comparableMetrics(metrics) {
  return {
    sections: metrics.sections,
    articles: metrics.articles,
    images: metrics.images,
    documents: metrics.documents,
    links: metrics.links,
    buttons: metrics.buttons,
    structureHash: metrics.structureHash,
  };
}

const failures = [];

for (const [sourcePath, englishPath] of routePairs) {
  try {
    const [source, english] = await Promise.all([
      readPage(sourcePath, "nn"),
      readPage(englishPath, "en"),
    ]);
    const sourceComparable = comparableMetrics(source);
    const englishComparable = comparableMetrics(english);

    if (
      JSON.stringify(sourceComparable) !== JSON.stringify(englishComparable) ||
      english.violations.length > 0
    ) {
      failures.push({
        sourcePath,
        englishPath,
        source: sourceComparable,
        english: englishComparable,
        violations: english.violations,
      });
      console.error(`FAIL ${sourcePath} <> ${englishPath}`);
    } else {
      console.log(
        `OK   ${sourcePath} <> ${englishPath} (${source.sections} sections, ${source.images.length} images)`,
      );
    }
  } catch (error) {
    failures.push({
      sourcePath,
      englishPath,
      error: error instanceof Error ? error.message : String(error),
    });
    console.error(
      `FAIL ${sourcePath} <> ${englishPath}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

if (failures.length > 0) {
  console.error("\nStructural locale parity failures:");
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log(`\nChecked ${routePairs.length} generated NN/EN route pairs.`);
