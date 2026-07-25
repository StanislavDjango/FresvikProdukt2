import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";

const root = path.resolve(import.meta.dirname, "..");
const seedPath = path.join(root, "sanity", "seed", "migratedSupport.en.ndjson");
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
    throw new Error(`Missing English support seed file: ${path.relative(root, seedPath)}`);
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

function client({ perspective } = {}) {
  return createClient({
    projectId: envValue("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: envValue("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: envValue("NEXT_PUBLIC_SANITY_API_VERSION"),
    token: envValue("SANITY_AUTH_TOKEN"),
    useCdn: false,
    perspective,
  });
}

function publicDocFromDraft(doc) {
  const publicDoc = { ...doc };
  delete publicDoc._createdAt;
  delete publicDoc._updatedAt;
  delete publicDoc._rev;

  return {
    ...publicDoc,
    _id: doc._id.replace(/^drafts\./, ""),
  };
}

function typeCounts(docs) {
  return docs.reduce((counts, doc) => {
    counts[doc._type] = (counts[doc._type] || 0) + 1;
    return counts;
  }, {});
}

async function publishDocs(docs) {
  const sanity = client();
  const batchSize = 20;

  for (let index = 0; index < docs.length; index += batchSize) {
    const batch = docs.slice(index, index + batchSize).map(publicDocFromDraft);
    let transaction = sanity.transaction();

    for (const doc of batch) {
      transaction = transaction.createOrReplace(doc);
    }

    await transaction.commit({ visibility: "sync" });
    console.log(`Published ${Math.min(index + batch.length, docs.length)} / ${docs.length}`);
  }
}

async function verifyPublished(docs) {
  const sanity = client({ perspective: "raw" });
  const ids = docs.map((doc) => doc._id.replace(/^drafts\./, ""));
  const publishedDocs = await sanity.fetch(
    "*[_id in $ids && language == 'en']{_id, _type, language, title, question, name}",
    { ids },
  );
  const publishedIds = new Set(publishedDocs.map((doc) => doc._id));
  const missing = ids.filter((id) => !publishedIds.has(id));

  if (missing.length > 0) {
    throw new Error(`Publish verification failed. Missing published IDs: ${missing.join(", ")}`);
  }

  console.log(`Verified ${publishedDocs.length} published English support documents.`);
  console.log(`Verified published types: ${JSON.stringify(typeCounts(publishedDocs))}`);
}

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));

const docs = readSeedDocs();

console.log(`${dryRun ? "Dry run" : "Apply"} English support Sanity publish`);
console.log(`Seed file: ${path.relative(root, seedPath)}`);
console.log(`Documents: ${docs.length}`);
console.log(`Types: ${JSON.stringify(typeCounts(docs))}`);

if (dryRun) {
  console.log("No Sanity writes performed. Run with --apply to publish support documents.");
  process.exit(0);
}

requireEnv([
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "SANITY_AUTH_TOKEN",
]);

await publishDocs(docs);
await verifyPublished(docs);
console.log("English support Sanity publish completed.");
