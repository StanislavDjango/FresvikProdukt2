import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";
import { withStableSectionIdentities } from "../src/i18n/contentStructure.shared.mjs";

const root = path.resolve(import.meta.dirname, "..");
const apply = process.argv.includes("--apply");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  for (const rawLine of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;

    const separatorIndex = line.indexOf("=");
    const key = line.slice(0, separatorIndex).trim();
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");

    if (key && !process.env[key]) process.env[key] = value;
  }
}

function envValue(name) {
  return process.env[name]?.trim() || "";
}

function requireEnv(names) {
  const missing = names.filter((name) => !envValue(name));
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

function readNdjson(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function normalizedId(id) {
  return id.replace(/^drafts\./, "");
}

function sourcePathForDoc(doc) {
  if (doc.sourceUrl) {
    try {
      const pathname = new URL(doc.sourceUrl).pathname.replace(/\/+$/, "");
      return pathname || "/";
    } catch {
      // Use the slug below.
    }
  }

  const slug = typeof doc.slug === "string" ? doc.slug : doc.slug?.current;
  if (!slug || slug === "home") return "/";
  return `/${slug.replace(/^\/+|\/+$/g, "")}`;
}

function seedIdentityIndex() {
  const docs = [
    ...readNdjson("sanity/seed/migratedContent.ndjson"),
    ...readNdjson("sanity/seed/migratedContent.en.ndjson"),
  ];
  const index = new Map();

  for (const doc of docs) {
    if (!doc._id || !Array.isArray(doc.migrationSections)) continue;

    const sourcePath = sourcePathForDoc(doc);
    const sections = withStableSectionIdentities(doc.migrationSections, sourcePath);
    const sectionIndex = new Map(
      sections
        .filter((section) => section._key)
        .map((section) => [
          section._key,
          {
            kind: section.kind,
            translationKey: section.translationKey,
          },
        ]),
    );

    index.set(normalizedId(doc._id), { sourcePath, sectionIndex });
  }

  return index;
}

function stableSectionsForDoc(doc, seedIndex) {
  const seed = seedIndex.get(normalizedId(doc._id));
  const sourcePath = seed?.sourcePath || sourcePathForDoc(doc);
  const derived = withStableSectionIdentities(doc.migrationSections || [], sourcePath);

  return derived.map((section) => {
    const seeded = section._key ? seed?.sectionIndex.get(section._key) : undefined;
    return {
      ...section,
      kind: seeded?.kind || section.kind,
      translationKey: seeded?.translationKey || section.translationKey,
    };
  });
}

function countMissing(docs) {
  return docs.reduce(
    (summary, doc) => {
      summary.documents += 1;
      for (const section of doc.migrationSections || []) {
        summary.sections += 1;
        if (!section.kind) summary.missingKind += 1;
        if (!section.translationKey) summary.missingTranslationKey += 1;
      }
      return summary;
    },
    {
      documents: 0,
      sections: 0,
      missingKind: 0,
      missingTranslationKey: 0,
    },
  );
}

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));
requireEnv([
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "SANITY_AUTH_TOKEN",
]);

const client = createClient({
  projectId: envValue("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: envValue("NEXT_PUBLIC_SANITY_DATASET"),
  apiVersion: envValue("NEXT_PUBLIC_SANITY_API_VERSION"),
  token: envValue("SANITY_AUTH_TOKEN"),
  useCdn: false,
  perspective: "raw",
});
const docs = await client.fetch(
  `*[
    _type in ["page", "product", "service", "newsArticle", "referenceProject"] &&
    count(migrationSections) > 0
  ]{
    _id,
    sourceUrl,
    slug,
    migrationSections
  }`,
);
const seedIndex = seedIdentityIndex();
const before = countMissing(docs);
const changed = docs
  .map((doc) => ({
    id: doc._id,
    sections: stableSectionsForDoc(doc, seedIndex),
    original: doc.migrationSections,
  }))
  .filter(({ sections, original }) =>
    sections.some(
      (section, index) =>
        section.kind !== original[index]?.kind ||
        section.translationKey !== original[index]?.translationKey,
    ),
  );

console.log(`${apply ? "Apply" : "Dry run"} Sanity section identity backfill`);
console.log(JSON.stringify(before, null, 2));
console.log(`Documents requiring changes: ${changed.length}`);

if (!apply) {
  console.log("No writes performed. Run with --apply to update Sanity.");
  process.exit(0);
}

for (let index = 0; index < changed.length; index += 20) {
  const batch = changed.slice(index, index + 20);
  let transaction = client.transaction();

  for (const update of batch) {
    transaction = transaction.patch(update.id, (patch) =>
      patch.set({ migrationSections: update.sections }),
    );
  }

  await transaction.commit({ visibility: "sync" });
  console.log(`Updated ${Math.min(index + batch.length, changed.length)} / ${changed.length}`);
}

const verified = await client.fetch(
  `*[
    _type in ["page", "product", "service", "newsArticle", "referenceProject"] &&
    count(migrationSections) > 0
  ]{
    _id,
    migrationSections
  }`,
);
const after = countMissing(verified);
console.log("Verification");
console.log(JSON.stringify(after, null, 2));

if (after.missingKind > 0 || after.missingTranslationKey > 0) {
  throw new Error("Sanity section identity backfill verification failed.");
}

console.log("Sanity section identity backfill completed.");
