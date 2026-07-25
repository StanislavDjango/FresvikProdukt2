import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const baselinePath = path.join(root, "sanity", "seed", "migratedContent.ndjson");
const supportPath = path.join(root, "sanity", "seed", "migratedSupport.en.ndjson");
const expectedTypes = ["documentFile", "faqItem", "employee"];
const errors = [];

function readNdjson(filePath) {
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing NDJSON file: ${path.relative(root, filePath)}`);
    return [];
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        errors.push(
          `Invalid NDJSON in ${path.relative(root, filePath)} line ${index + 1}: ${error.message}`,
        );
        return null;
      }
    })
    .filter(Boolean);
}

function countByType(docs) {
  return docs.reduce((acc, doc) => {
    acc[doc._type] = (acc[doc._type] || 0) + 1;
    return acc;
  }, {});
}

function textValues(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(textValues);
  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => !["_id", "_ref", "localPath", "migratedImagePath"].includes(key))
      .flatMap(([, nestedValue]) => textValues(nestedValue));
  }
  return [];
}

const migrationMarkers = [
  "gammal side",
  "gammal sitemap",
  "frå gammal",
  "kjeldetekst",
  "tekst henta",
  "utan omskriving",
  "bilde frå",
  "dokumentlenker",
  "lenker frå",
  "migrert innhald",
];

const baselineDocs = readNdjson(baselinePath);
const supportDocs = readNdjson(supportPath);
const baselineCounts = countByType(
  baselineDocs.filter((doc) => expectedTypes.includes(doc._type)),
);
const supportCounts = countByType(supportDocs);
const ids = new Set();

for (const type of expectedTypes) {
  if ((supportCounts[type] || 0) !== (baselineCounts[type] || 0)) {
    errors.push(
      `Support seed count mismatch for ${type}: expected ${baselineCounts[type] || 0}, got ${supportCounts[type] || 0}`,
    );
  }
}

for (const doc of supportDocs) {
  if (!doc._id?.startsWith("drafts.en-")) {
    errors.push(`Support doc id must start with drafts.en-: ${doc._id || "(missing)"}`);
  }
  if (ids.has(doc._id)) errors.push(`Duplicate support doc id: ${doc._id}`);
  ids.add(doc._id);
  if (doc.language !== "en") errors.push(`Support doc must be language=en: ${doc._id}`);
  if (doc.sourceLanguage !== "nn") {
    errors.push(`Support doc must have sourceLanguage=nn: ${doc._id}`);
  }
  if (!doc.translationGroup) errors.push(`Support doc missing translationGroup: ${doc._id}`);
  if (!doc.translatedFrom?._ref) errors.push(`Support doc missing translatedFrom ref: ${doc._id}`);

  for (const value of textValues(doc)) {
    const lower = value.toLowerCase();
    if (migrationMarkers.some((marker) => lower.includes(marker))) {
      errors.push(`Support doc contains public migration marker: ${doc._id}: ${value}`);
      break;
    }
  }

  if (doc._type === "documentFile" && !doc.localPath && !doc.externalUrl && !doc.file) {
    errors.push(`English document file has no file/localPath/externalUrl: ${doc._id}`);
  }
  if (doc._type === "faqItem" && (!doc.question || !doc.answer?.length)) {
    errors.push(`English FAQ item is incomplete: ${doc._id}`);
  }
  if (doc._type === "employee" && (!doc.name || !doc.role)) {
    errors.push(`English employee is incomplete: ${doc._id}`);
  }
}

if (errors.length > 0) {
  console.error("English support seed validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("English support seed validation passed.");
console.log(`Support documents: ${supportDocs.length}`);
console.log(`Types: ${JSON.stringify(supportCounts)}`);
