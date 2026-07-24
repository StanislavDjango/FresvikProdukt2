import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

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

function flattenKeys(value, prefix = "") {
  return Object.entries(value).flatMap(([key, nestedValue]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (
      nestedValue &&
      typeof nestedValue === "object" &&
      !Array.isArray(nestedValue)
    ) {
      return flattenKeys(nestedValue, fullKey);
    }

    return [fullKey];
  });
}

const routeMap = readJson("src/i18n/routeMap.json");
const nnMessages = readJson("src/i18n/messages/nn.json");
const enMessages = readJson("src/i18n/messages/en.json");
const proxySource = readText("src/proxy.ts");
const contactPageSource = readText("src/app/kontakt/page.tsx");
const englishPagesSource = readText("src/data/englishPages.ts");
const englishSeedDocs = readNdjson("sanity/seed/migratedContent.en.ndjson");
const liveBaseUrl = process.env.I18N_CHECK_BASE_URL;
const canonicalBaseUrl =
  process.env.I18N_CANONICAL_BASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://fresvik-produkt2.vercel.app";

const requiredEnglishRoutes = [
  "/",
  "/products",
  "/products/fresvik-pir-panel",
  "/products/fresvik-pur-panel",
  "/products/cold-freezer-doors",
  "/products/cold-freezer-ports",
  "/products/facade-panels",
  "/products/freezing-tunnel",
  "/services",
  "/services/installation",
  "/services/delivery",
  "/services/service-spare-parts",
  "/documentation",
  "/contact",
  "/about",
];

const priorityOneSourceRoutes = [
  "/",
  "/produkt",
  "/produkt/fresvik-pir-panel",
  "/produkt/fresvik-pur-panel",
  "/produkt/kjole-frysedorer",
  "/produkt/kjole-fryseportar",
  "/tenester",
  "/tenester/montasje",
  "/dokumentasjon",
  "/kontakt",
];

const requiredContentMessageKeys = [
  "Content.readMore",
  "Content.open",
  "Content.openApproval",
  "Content.contact",
  "Content.contactUs",
  "Content.allProducts",
  "Content.allAccessories",
  "Content.allCases",
  "Content.oldSource",
  "Content.relatedSolutions",
  "Content.companyCardFallback",
  "Content.companyInfoEyebrow",
  "Content.companyInfoTitle",
  "Content.companyInfoIntroFallback",
  "Content.companyInfoItemFallback",
  "Content.employeesEyebrow",
  "Content.employeesTitle",
  "Content.employeesIntroFallback",
  "Content.careerEyebrow",
  "Content.careerIntroFallback",
  "Content.careerItemFallback",
  "Content.legalInfoEyebrow",
  "Content.privacyTextTitle",
  "Content.legalDocumentEyebrow",
  "Content.legalDocumentFallback",
  "Content.faqEyebrow",
  "Content.faqTitle",
  "Content.faqIntro",
  "Content.faqAnswerFallback",
  "Content.accessoryNavigationLabel",
  "Content.accessoryPrevious",
  "Content.accessoryOverview",
  "Content.accessoryNext",
  "Content.missingDocumentsEyebrow",
  "Content.missingDocumentsTitle",
  "Content.missingDocumentsIntro",
  "Content.cooperationEyebrow",
  "Content.partnersTitle",
];

const errors = [];

function idSafe(value) {
  return value
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "home";
}

function slugForEnglishPath(englishPath) {
  if (englishPath === "/") return "home";
  return englishPath.replace(/^\/+|\/+$/g, "");
}

function expectedSourceUrl(sourcePath) {
  return `https://www.fresvik.no${sourcePath === "/" ? "" : sourcePath}`;
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
}

function sourcePathForEnglishPath(englishPath) {
  const normalized = normalizePath(englishPath);
  const match = entries.find(([, mappedEnglishPath]) => mappedEnglishPath === normalized);
  return match?.[0] ?? normalized;
}

function stripLocalePrefix(pathname) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) {
    return sourcePathForEnglishPath(pathname.slice(3) || "/");
  }
  return normalizePath(pathname);
}

function portableTextText(blocks) {
  return (blocks || [])
    .flatMap((block) => block.children || [])
    .map((child) => child.text || "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function withLocale(pathname, locale) {
  const cleanPath = stripLocalePrefix(pathname);
  if (locale === "nn") return cleanPath;

  const englishPath = routeMap[cleanPath] ?? cleanPath;
  if (englishPath === "/") return "/en";
  return `/en${englishPath}`;
}

function absoluteUrl(baseUrl, pathname) {
  const url = new URL(pathname === "/" ? "/" : pathname, baseUrl).toString();
  return pathname === "/" ? url.replace(/\/$/, "") : url.replace(/\/$/, "");
}

function linkTagValue(html, rel, attributeName, attributeValue) {
  const links = html.match(/<link[^>]+>/g) ?? [];
  return links.find(
    (link) =>
      link.includes(`rel="${rel}"`) &&
      (!attributeName || link.includes(`${attributeName}="${attributeValue}"`)),
  );
}

function hasHtmlLang(html, expectedLang) {
  return new RegExp(`<html[^>]*\\slang=["']${expectedLang}["']`).test(html);
}

async function validateLiveRoute(fetchBaseUrl, expectedBaseUrl, pathname, expectedLang, canonicalPath, sourcePath) {
  const url = absoluteUrl(fetchBaseUrl, pathname);
  const response = await fetch(url, { redirect: "manual" });

  if (response.status !== 200) {
    errors.push(`Live i18n route must return 200: ${url} returned ${response.status}`);
    return;
  }

  const html = await response.text();

  if (!hasHtmlLang(html, expectedLang)) {
    errors.push(`Live i18n route has wrong html lang: ${url}`);
  }

  const expectedCanonical = absoluteUrl(expectedBaseUrl, canonicalPath);
  const canonicalTag = linkTagValue(html, "canonical");

  if (!canonicalTag?.includes(`href="${expectedCanonical}"`)) {
    errors.push(`Live i18n route has wrong canonical: ${url}`);
  }

  const expectedNn = absoluteUrl(expectedBaseUrl, sourcePath);
  const expectedEn = absoluteUrl(expectedBaseUrl, withLocale(sourcePath, "en"));
  const nnAlternate = linkTagValue(html, "alternate", "hrefLang", "nn-NO");
  const enAlternate = linkTagValue(html, "alternate", "hrefLang", "en");

  if (!nnAlternate?.includes(`href="${expectedNn}"`)) {
    errors.push(`Live i18n route is missing nn-NO alternate: ${url}`);
  }

  if (!enAlternate?.includes(`href="${expectedEn}"`)) {
    errors.push(`Live i18n route is missing en alternate: ${url}`);
  }
}

const entries = Object.entries(routeMap);
const englishPaths = entries.map(([, englishPath]) => englishPath);
const duplicateEnglishPaths = englishPaths.filter(
  (englishPath, index) => englishPaths.indexOf(englishPath) !== index,
);

for (const duplicate of new Set(duplicateEnglishPaths)) {
  errors.push(`Duplicate English route mapping: ${duplicate}`);
}

for (const [sourcePath, englishPath] of entries) {
  if (!sourcePath.startsWith("/")) {
    errors.push(`Source path must start with "/": ${sourcePath}`);
  }

  if (!englishPath.startsWith("/")) {
    errors.push(`English path must start with "/": ${englishPath}`);
  }

  if (englishPath.startsWith("/en")) {
    errors.push(`English path must not include /en prefix in routeMap: ${englishPath}`);
  }

  const expectedEnglishHref = englishPath === "/" ? "/en" : `/en${englishPath}`;
  const actualEnglishHref = withLocale(sourcePath, "en");

  if (actualEnglishHref !== expectedEnglishHref) {
    errors.push(
      `Language switch EN mismatch for ${sourcePath}: expected "${expectedEnglishHref}", got "${actualEnglishHref}"`,
    );
  }

  const actualNorwegianHref = withLocale(expectedEnglishHref, "nn");

  if (actualNorwegianHref !== sourcePath) {
    errors.push(
      `Language switch NN mismatch for ${expectedEnglishHref}: expected "${sourcePath}", got "${actualNorwegianHref}"`,
    );
  }
}

for (const requiredPath of requiredEnglishRoutes) {
  if (!englishPaths.includes(requiredPath)) {
    errors.push(`Missing required English route: /en${requiredPath === "/" ? "" : requiredPath}`);
  }
}

const nnKeys = flattenKeys(nnMessages).sort();
const enKeys = flattenKeys(enMessages).sort();

for (const key of nnKeys) {
  if (!enKeys.includes(key)) {
    errors.push(`Missing English message key: ${key}`);
  }
}

for (const key of enKeys) {
  if (!nnKeys.includes(key)) {
    errors.push(`Missing Norwegian message key: ${key}`);
  }
}

for (const key of requiredContentMessageKeys) {
  if (!nnKeys.includes(key)) {
    errors.push(`Missing required Norwegian content message key: ${key}`);
  }

  if (!enKeys.includes(key)) {
    errors.push(`Missing required English content message key: ${key}`);
  }
}

if (!proxySource.includes('pathname.startsWith("/studio")')) {
  errors.push("/studio exclusion is missing from src/proxy.ts");
}

if (!proxySource.includes("withLocale(sourcePath, \"en\")")) {
  errors.push("English canonical redirect is missing from src/proxy.ts");
}

if (!contactPageSource.includes('languages:') || !contactPageSource.includes('en: "/en/contact"')) {
  errors.push("/kontakt metadata is missing English alternate language link");
}

if (englishPagesSource.includes("base.cards.map")) {
  errors.push("English fallback pages must not render Norwegian source cards");
}

if (englishPagesSource.includes("base.sections.map")) {
  errors.push("English fallback pages must not render Norwegian source sections");
}

if (englishSeedDocs.length === 0) {
  errors.push("sanity/seed/migratedContent.en.ndjson is missing or empty");
}

if (englishSeedDocs.length !== entries.length) {
  errors.push(
    `English seed document count (${englishSeedDocs.length}) must match routeMap entries (${entries.length})`,
  );
}

const englishSeedGroups = new Set(
  englishSeedDocs.map((doc) => doc.translationGroup).filter(Boolean),
);
const englishSeedByGroup = new Map(
  englishSeedDocs
    .filter((doc) => doc.translationGroup)
    .map((doc) => [doc.translationGroup, doc]),
);

for (const [sourcePath, englishPath] of entries) {
  const expectedGroup = `fresvik:${idSafe(sourcePath)}`;
  const expectedSlug = slugForEnglishPath(englishPath);
  const matchingDoc = englishSeedByGroup.get(expectedGroup);

  if (!englishSeedGroups.has(expectedGroup)) {
    errors.push(`Missing English seed document for routeMap source: ${sourcePath}`);
    continue;
  }

  if (matchingDoc.slug?.current !== expectedSlug) {
    errors.push(
      `English seed slug mismatch for ${sourcePath}: expected "${expectedSlug}", got "${matchingDoc.slug?.current || "missing"}"`,
    );
  }

  if (matchingDoc.sourceUrl !== expectedSourceUrl(sourcePath)) {
    errors.push(
      `English seed sourceUrl mismatch for ${sourcePath}: expected "${expectedSourceUrl(sourcePath)}", got "${matchingDoc.sourceUrl || "missing"}"`,
    );
  }
}

for (const sourcePath of priorityOneSourceRoutes) {
  const expectedGroup = `fresvik:${idSafe(sourcePath)}`;
  const matchingDoc = englishSeedByGroup.get(expectedGroup);
  const bodyText = portableTextText(matchingDoc?.body);
  const sectionCount = matchingDoc?.migrationSections?.length || 0;
  const itemCount = (matchingDoc?.migrationSections || []).reduce(
    (count, section) => count + (section.items?.length || 0),
    0,
  );

  if (!matchingDoc) {
    errors.push(`Missing Priority 1 English seed document: ${sourcePath}`);
    continue;
  }

  if (bodyText.includes("English translation draft.") || bodyText.length < 220) {
    errors.push(`Priority 1 English seed body is still only a placeholder: ${sourcePath}`);
  }

  if (sectionCount < 2 || itemCount < 3) {
    errors.push(`Priority 1 English seed needs structured translated sections: ${sourcePath}`);
  }
}

for (const doc of englishSeedDocs) {
  if (!doc._id?.startsWith("drafts.")) {
    errors.push(`English seed document must be a draft: ${doc._id || doc.title}`);
  }

  if (doc.language !== "en") {
    errors.push(`English seed document has wrong language: ${doc._id || doc.title}`);
  }

  if (doc.sourceLanguage !== "nn") {
    errors.push(`English seed document has wrong sourceLanguage: ${doc._id || doc.title}`);
  }

  if (!doc.translationGroup) {
    errors.push(`English seed document is missing translationGroup: ${doc._id || doc.title}`);
  }
}

if (liveBaseUrl) {
  const normalizedBaseUrl = liveBaseUrl.replace(/\/+$/, "");
  const normalizedCanonicalBaseUrl = canonicalBaseUrl.replace(/\/+$/, "");

  for (const [sourcePath] of entries) {
    await validateLiveRoute(
      normalizedBaseUrl,
      normalizedCanonicalBaseUrl,
      sourcePath,
      "nn",
      sourcePath,
      sourcePath,
    );
    await validateLiveRoute(
      normalizedBaseUrl,
      normalizedCanonicalBaseUrl,
      withLocale(sourcePath, "en"),
      "en",
      withLocale(sourcePath, "en"),
      sourcePath,
    );
  }
}

if (errors.length) {
  console.error("i18n validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `i18n validation passed for ${entries.length} route mappings, ${nnKeys.length} message keys and ${englishSeedDocs.length} English seed docs${liveBaseUrl ? ` with live checks at ${liveBaseUrl}` : ""}.`,
);
