import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";

const root = path.resolve(import.meta.dirname, "..");
const seedPath = path.join(root, "sanity", "seed", "migratedContent.en.ndjson");
const apply = process.argv.includes("--apply");
const dryRun = !apply;

const batchArg =
  process.argv.find((arg) => arg.startsWith("--batch="))?.split("=")[1] ||
  "priority-1";

const batches = {
  "priority-1": [
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
  ],
  "priority-2": [
    "/produkt/fasadepanel",
    "/produkt/frysetunnel",
    "/tilleggsutstyr",
    "/tenester/leveranse",
    "/tenester/service-reservedeler",
    "/monteringsanvisning",
    "/monteringsanvisningar-fresvik-skyveport",
    "/kundeservice/faq",
  ],
  "priority-3-safe": [
    "/referansar",
    "/om-oss",
    "/firmainfo",
    "/tilsette",
    "/aktuelt",
  ],
  "review-only": [
    "/stillingledig",
    "/personvernerklering",
    "/openheitslova",
  ],
};

batches.safe = [
  ...batches["priority-1"],
  ...batches["priority-2"],
  ...batches["priority-3-safe"],
];
batches.all = [...batches.safe, ...batches["review-only"]];
batches.complete = null;

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

function sourcePathForDoc(doc) {
  const sourceUrl = typeof doc.sourceUrl === "string" ? doc.sourceUrl : "";
  if (!sourceUrl.startsWith("https://www.fresvik.no")) return "";
  const url = new URL(sourceUrl);
  return url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
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
    "*[_id in $ids && language == 'en']{_id, _type, language, title, slug}",
    { ids },
  );
  const publishedIds = new Set(publishedDocs.map((doc) => doc._id));
  const missing = ids.filter((id) => !publishedIds.has(id));

  if (missing.length > 0) {
    throw new Error(`Publish verification failed. Missing published IDs: ${missing.join(", ")}`);
  }

  console.log(`Verified ${publishedDocs.length} published English documents.`);
  console.log(`Verified published types: ${JSON.stringify(typeCounts(publishedDocs))}`);
}

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));

if (!Object.hasOwn(batches, batchArg)) {
  throw new Error(
    `Unknown --batch=${batchArg}. Use one of: ${Object.keys(batches).join(", ")}`,
  );
}

const seedDocs = readSeedDocs();
const requestedSourcePaths = batches[batchArg]
  ? new Set(batches[batchArg])
  : new Set(seedDocs.map(sourcePathForDoc));
const docs =
  batchArg === "complete"
    ? seedDocs
    : seedDocs.filter((doc) => requestedSourcePaths.has(sourcePathForDoc(doc)));
const matchedSourcePaths = new Set(docs.map(sourcePathForDoc));
const missingSourcePaths = [...requestedSourcePaths].filter(
  (path) => !matchedSourcePaths.has(path),
);

if (missingSourcePaths.length > 0) {
  throw new Error(`Seed is missing requested source paths: ${missingSourcePaths.join(", ")}`);
}

console.log(`${dryRun ? "Dry run" : "Apply"} English Sanity publish`);
console.log(`Batch: ${batchArg}`);
console.log(`Documents: ${docs.length}`);
console.log(`Types: ${JSON.stringify(typeCounts(docs))}`);
for (const doc of docs) {
  console.log(`- ${doc._id} -> ${doc._id.replace(/^drafts\./, "")} (${sourcePathForDoc(doc)})`);
}

if (dryRun) {
  console.log("No Sanity writes performed. Run with --apply to publish this batch.");
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
console.log("English Sanity publish completed.");
