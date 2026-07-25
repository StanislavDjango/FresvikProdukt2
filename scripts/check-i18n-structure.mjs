import { createHash } from "node:crypto";
import * as cheerio from "cheerio";

const baseUrl =
  process.env.I18N_CHECK_BASE_URL || "http://127.0.0.1:3060";

const routePairs = [
  ["/", "/en"],
  ["/produkt", "/en/products"],
  ["/referansar", "/en/references"],
  ["/aktuelt", "/en/about/news"],
  ["/firmainfo", "/en/about/company-info"],
  ["/kontakt", "/en/contact"],
  [
    "/produkt/fresvik-pir-panel",
    "/en/products/fresvik-pir-panel",
  ],
  [
    "/produkt/fresvik-pur-panel",
    "/en/products/fresvik-pur-panel",
  ],
  [
    "/produkt/kjole-fryseportar",
    "/en/products/cold-freezer-room-gates",
  ],
  ["/tenester/montasje", "/en/services/installation"],
  ["/dokumentasjon", "/en/documentation"],
  [
    "/andre-produkter/pvc-gardiner",
    "/en/products/accessories/pvc-gardiner",
  ],
  [
    "/referansar/celsa-steel-sotra",
    "/en/references/celsa-steel-sotra",
  ],
];

function normalizeImageSource(source) {
  if (!source) return "";

  try {
    const url = new URL(source, baseUrl);
    if (url.pathname === "/_next/image") {
      return url.searchParams.get("url") || source;
    }
    return url.pathname;
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

function pageMetrics(html) {
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
  };
}

async function readPage(path) {
  const response = await fetch(new URL(path, baseUrl), {
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }

  return pageMetrics(await response.text());
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
      readPage(sourcePath),
      readPage(englishPath),
    ]);
    const sourceComparable = comparableMetrics(source);
    const englishComparable = comparableMetrics(english);

    if (JSON.stringify(sourceComparable) !== JSON.stringify(englishComparable)) {
      failures.push({
        sourcePath,
        englishPath,
        source: sourceComparable,
        english: englishComparable,
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
    console.error(`FAIL ${sourcePath} <> ${englishPath}: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error("\nStructural locale parity failures:");
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log(`\nChecked ${routePairs.length} NN/EN route pairs.`);
