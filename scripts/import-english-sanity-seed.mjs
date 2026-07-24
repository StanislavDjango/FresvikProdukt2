import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";

const root = path.resolve(import.meta.dirname, "..");
const seedPath = path.join(root, "sanity", "seed", "migratedContent.en.ndjson");
const apply = process.argv.includes("--apply");
const dryRun = !apply;

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
    throw new Error(`Missing required environment variables for --apply: ${missing.join(", ")}`);
  }
}

function readSeedDocs() {
  if (!existsSync(seedPath)) {
    throw new Error(`Missing English seed file: ${path.relative(root, seedPath)}`);
  }

  const docs = readFileSync(seedPath, "utf8")
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

  const ids = new Set();
  const duplicates = new Set();

  for (const doc of docs) {
    if (!doc._id) throw new Error("English seed document is missing _id.");
    if (ids.has(doc._id)) duplicates.add(doc._id);
    ids.add(doc._id);
    if (doc.language !== "en") {
      throw new Error(`Seed document ${doc._id} is not language=en.`);
    }
    if (!doc._id.startsWith("drafts.")) {
      throw new Error(`Seed document ${doc._id} is not a draft id. Refusing to import.`);
    }
  }

  if (duplicates.size > 0) {
    throw new Error(`Duplicate English seed _id values: ${Array.from(duplicates).join(", ")}`);
  }

  return docs;
}

function sanityClient() {
  return createClient({
    projectId: envValue("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: envValue("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: envValue("NEXT_PUBLIC_SANITY_API_VERSION"),
    token: envValue("SANITY_AUTH_TOKEN"),
    useCdn: false,
  });
}

function sanityRawClient() {
  return createClient({
    projectId: envValue("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: envValue("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: envValue("NEXT_PUBLIC_SANITY_API_VERSION"),
    token: envValue("SANITY_AUTH_TOKEN"),
    useCdn: false,
    perspective: "raw",
  });
}

async function importDocs(docs) {
  const client = sanityClient();
  const batchSize = 20;

  for (let index = 0; index < docs.length; index += batchSize) {
    const batch = docs.slice(index, index + batchSize);
    let transaction = client.transaction();

    for (const doc of batch) {
      transaction = transaction.createOrReplace(doc);
    }

    await transaction.commit({ visibility: "sync" });
    console.log(`Imported ${Math.min(index + batch.length, docs.length)} / ${docs.length}`);
  }
}

async function verifyImport(docs) {
  const client = sanityRawClient();
  const ids = docs.map((doc) => doc._id);
  const importedDocs = await client.fetch(
    "*[_id in $ids]{_id, _type, language}",
    { ids },
  );
  const importedIds = new Set(importedDocs.map((doc) => doc._id));
  const missing = ids.filter((id) => !importedIds.has(id));

  if (missing.length > 0) {
    throw new Error(`Sanity import verification failed. Missing draft IDs: ${missing.join(", ")}`);
  }

  const typeCounts = importedDocs.reduce((counts, doc) => {
    counts[doc._type] = (counts[doc._type] || 0) + 1;
    return counts;
  }, {});

  console.log(`Verified ${importedDocs.length} imported English draft documents.`);
  console.log(`Verified document types: ${JSON.stringify(typeCounts)}`);
}

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));

const docs = readSeedDocs();
const typeCounts = docs.reduce((counts, doc) => {
  counts[doc._type] = (counts[doc._type] || 0) + 1;
  return counts;
}, {});

console.log(
  `${dryRun ? "Dry run" : "Apply"} English Sanity seed import: ${docs.length} draft documents`,
);
console.log(`Seed file: ${path.relative(root, seedPath)}`);
console.log(`Document types: ${JSON.stringify(typeCounts)}`);

if (dryRun) {
  console.log("No Sanity writes performed. Run with --apply to import draft English documents.");
  process.exit(0);
}

requireEnv([
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "SANITY_AUTH_TOKEN",
]);

await importDocs(docs);
await verifyImport(docs);
console.log("English Sanity seed import completed.");
