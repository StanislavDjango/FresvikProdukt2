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
const englishSeedDocs = readNdjson("sanity/seed/migratedContent.en.ndjson");

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

function withLocale(pathname, locale) {
  const cleanPath = stripLocalePrefix(pathname);
  if (locale === "nn") return cleanPath;

  const englishPath = routeMap[cleanPath] ?? cleanPath;
  if (englishPath === "/") return "/en";
  return `/en${englishPath}`;
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

if (errors.length) {
  console.error("i18n validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `i18n validation passed for ${entries.length} route mappings, ${nnKeys.length} message keys and ${englishSeedDocs.length} English seed docs.`,
);
