import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";

const root = path.resolve(import.meta.dirname, "..");
const seedPath = path.join(root, "sanity", "seed", "migratedContent.en.ndjson");
const requirePublished = process.argv.includes("--require-published");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  for (const rawLine of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;

    const separatorIndex = line.indexOf("=");
    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    if (!key || process.env[key]) continue;

    process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
  }
}

function envValue(name) {
  const value = process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function requireEnv(names) {
  const missing = names.filter((name) => !envValue(name));
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

function readSeedDocs() {
  if (!existsSync(seedPath)) {
    throw new Error(`Missing English seed file: ${path.relative(root, seedPath)}`);
  }

  return readFileSync(seedPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`Invalid NDJSON at line ${index + 1}: ${error.message}`);
      }
    });
}

function sanityClient({ perspective } = {}) {
  return createClient({
    projectId: envValue("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: envValue("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: envValue("NEXT_PUBLIC_SANITY_API_VERSION"),
    token: envValue("SANITY_AUTH_TOKEN"),
    useCdn: false,
    perspective,
  });
}

function typeCounts(docs) {
  return docs.reduce((counts, doc) => {
    counts[doc._type] = (counts[doc._type] || 0) + 1;
    return counts;
  }, {});
}

function validateSeedDocs(docs) {
  const errors = [];
  const ids = new Set();

  for (const doc of docs) {
    if (!doc._id) errors.push("English seed document is missing _id.");
    if (doc._id && ids.has(doc._id)) errors.push(`Duplicate English seed _id: ${doc._id}`);
    if (doc._id) ids.add(doc._id);
    if (!doc._id?.startsWith("drafts.")) {
      errors.push(`English seed document is not a draft id: ${doc._id || doc.title}`);
    }
    if (doc.language !== "en") {
      errors.push(`English seed document has wrong language: ${doc._id || doc.title}`);
    }
    if (!doc.translationGroup) {
      errors.push(`English seed document is missing translationGroup: ${doc._id || doc.title}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`English seed validation failed:\n- ${errors.join("\n- ")}`);
  }
}

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));
requireEnv([
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "SANITY_AUTH_TOKEN",
]);

const seedDocs = readSeedDocs();
validateSeedDocs(seedDocs);

const draftIds = seedDocs.map((doc) => doc._id);
const publishedIds = draftIds.map((id) => id.replace(/^drafts\./, ""));
const rawClient = sanityClient({ perspective: "raw" });
const publishedClient = sanityClient();

const [draftDocs, publishedDocs] = await Promise.all([
  rawClient.fetch(
    "*[_id in $ids]{_id, _type, language, translationGroup, title, slug}",
    { ids: draftIds },
  ),
  publishedClient.fetch(
    "*[_id in $ids && language == 'en']{_id, _type, language, translationGroup, title, slug}",
    { ids: publishedIds },
  ),
]);

const draftIdSet = new Set(draftDocs.map((doc) => doc._id));
const publishedIdSet = new Set(publishedDocs.map((doc) => doc._id));
const missingDraftIds = draftIds.filter((id) => !draftIdSet.has(id));
const missingPublishedIds = publishedIds.filter((id) => !publishedIdSet.has(id));

console.log("English Sanity runtime readiness");
console.log(`Seed file: ${path.relative(root, seedPath)}`);
console.log(`Seed documents: ${seedDocs.length}`);
console.log(`Seed types: ${JSON.stringify(typeCounts(seedDocs))}`);
console.log(`Imported draft documents: ${draftDocs.length}/${seedDocs.length}`);
console.log(`Draft types: ${JSON.stringify(typeCounts(draftDocs))}`);
console.log(`Published English documents: ${publishedDocs.length}/${seedDocs.length}`);
console.log(`Published types: ${JSON.stringify(typeCounts(publishedDocs))}`);

if (missingDraftIds.length > 0) {
  console.error("Missing imported English draft documents:");
  for (const id of missingDraftIds) console.error(`- ${id}`);
  process.exit(1);
}

if (missingPublishedIds.length > 0) {
  console.log("Public /en runtime will use fallback for unpublished English documents.");
  console.log(`Unpublished English documents: ${missingPublishedIds.length}`);
  if (requirePublished) {
    console.error("Missing published English documents:");
    for (const id of missingPublishedIds) console.error(`- ${id}`);
    process.exit(1);
  }
}

console.log("English Sanity draft coverage is complete.");
