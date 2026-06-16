import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "sanity", "seed", "assetManifest.json");
const sourceSeedPath = path.join(root, "sanity", "seed", "migratedContent.ndjson");
const outputSeedPath = path.join(
  root,
  "sanity",
  "seed",
  "migratedContent.withAssets.ndjson",
);

const imageFieldByType = {
  page: "heroImage",
  product: "heroImage",
  service: "image",
  employee: "image",
  newsArticle: "image",
  referenceProject: "image",
};

function readJson(pathname) {
  return JSON.parse(readFileSync(pathname, "utf8"));
}

function readNdjson(pathname) {
  return readFileSync(pathname, "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(
          `${path.relative(root, pathname)} line ${index + 1} is invalid JSON: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    });
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function buildReferenceMap(manifest) {
  const references = new Map();
  const referencesByHash = new Map();
  for (const entry of manifest) {
    if (!entry.localPath || !entry.sanityReference?.asset?._ref) continue;
    references.set(entry.localPath, entry.sanityReference);
    if (entry.sha256 && !referencesByHash.has(entry.sha256)) {
      referencesByHash.set(entry.sha256, entry.sanityReference);
    }
  }
  for (const entry of manifest) {
    if (!entry.localPath || references.has(entry.localPath)) continue;
    const hashReference = entry.sha256 ? referencesByHash.get(entry.sha256) : null;
    if (hashReference) {
      references.set(entry.localPath, hashReference);
      continue;
    }

    const duplicatePath = String(entry.notes || "").match(
      /Duplicate file content of (\/assets\/fresvik\/[^.]+(?:\.[a-z0-9]+))/i,
    )?.[1];
    const duplicateReference = duplicatePath ? references.get(duplicatePath) : null;
    if (duplicateReference) {
      references.set(entry.localPath, duplicateReference);
    }
  }
  return references;
}

if (!existsSync(manifestPath)) {
  console.error("Missing sanity/seed/assetManifest.json. Run npm run assets:manifest first.");
  process.exit(1);
}

if (!existsSync(sourceSeedPath)) {
  console.error("Missing sanity/seed/migratedContent.ndjson.");
  process.exit(1);
}

const manifest = readJson(manifestPath);
const references = buildReferenceMap(manifest);
const docs = readNdjson(sourceSeedPath);
const stats = {
  docs: docs.length,
  imagesRewritten: 0,
  filesRewritten: 0,
  missingImageRefs: 0,
  missingFileRefs: 0,
};

function rewriteMigrationCardAssets(card) {
  if (card.migratedImagePath) {
    const reference = references.get(card.migratedImagePath);
    if (reference?._type === "image") {
      card.image = clone(reference);
      card.migrationBackupLocalPath ||= card.migratedImagePath;
      stats.imagesRewritten += 1;
    } else {
      stats.missingImageRefs += 1;
    }
  }

  if (card.migrationLocalDocumentPath) {
    const reference = references.get(card.migrationLocalDocumentPath);
    if (reference?._type === "file") {
      card.file = clone(reference);
      card.migrationBackupLocalPath ||= card.migrationLocalDocumentPath;
      stats.filesRewritten += 1;
    } else {
      stats.missingFileRefs += 1;
    }
  }
}

const rewrittenDocs = docs.map((doc) => {
  const nextDoc = clone(doc);
  const imageField = imageFieldByType[nextDoc._type];

  if (imageField && nextDoc.migratedImagePath) {
    const reference = references.get(nextDoc.migratedImagePath);
    if (reference?._type === "image") {
      nextDoc[imageField] = clone(reference);
      nextDoc.migrationBackupLocalPath ||= nextDoc.migratedImagePath;
      stats.imagesRewritten += 1;
    } else {
      stats.missingImageRefs += 1;
    }
  }

  if (nextDoc._type === "documentFile" && nextDoc.localPath) {
    const reference = references.get(nextDoc.localPath);
    if (reference?._type === "file") {
      nextDoc.file = clone(reference);
      nextDoc.migrationBackupLocalPath ||= nextDoc.localPath;
      stats.filesRewritten += 1;
    } else {
      stats.missingFileRefs += 1;
    }
  }

  for (const card of nextDoc.migrationCards || []) {
    rewriteMigrationCardAssets(card);
  }

  for (const section of nextDoc.migrationSections || []) {
    for (const item of section.items || []) {
      rewriteMigrationCardAssets(item);
    }
  }

  return nextDoc;
});

const totalRewritten = stats.imagesRewritten + stats.filesRewritten;
if (totalRewritten === 0) {
  console.error(
    "No Sanity asset references found in assetManifest.json. Run npm run assets:upload:apply before generating migratedContent.withAssets.ndjson.",
  );
  process.exit(1);
}

writeFileSync(
  outputSeedPath,
  `${rewrittenDocs.map((doc) => JSON.stringify(doc)).join("\n")}\n`,
);

console.log(
  `Wrote ${stats.docs} documents to ${path.relative(root, outputSeedPath)}.`,
);
console.log(
  `Rewritten assets: ${stats.imagesRewritten} image field(s), ${stats.filesRewritten} file field(s). Missing refs kept as local paths: ${stats.missingImageRefs} image(s), ${stats.missingFileRefs} file(s).`,
);
