import { createReadStream, existsSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { createClient } from "next-sanity";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "sanity", "seed", "assetManifest.json");
const args = new Set(process.argv.slice(2));
const apply = args.has("--apply");
const dryRun = !apply;

if (args.has("--apply") && args.has("--dry-run")) {
  console.error("Use either --apply or --dry-run, not both.");
  process.exit(1);
}

function loadEnvFile(fileName) {
  const filePath = path.join(root, fileName);
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    process.env[key] = rawValue
      .trim()
      .replace(/^['"]|['"]$/g, "");
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

function envValue(key) {
  const value = process.env[key];
  return value && value !== "replacewithsanityprojectid" ? value : "";
}

function validateEnv() {
  const required = [
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
    "NEXT_PUBLIC_SANITY_DATASET",
    "NEXT_PUBLIC_SANITY_API_VERSION",
    "SANITY_AUTH_TOKEN",
  ];
  const missing = required.filter((key) => !envValue(key));

  if (missing.length > 0 && apply) {
    console.error(
      `Missing required Sanity env var(s) for --apply: ${missing.join(", ")}`,
    );
    process.exit(1);
  }

  if (missing.length > 0 && dryRun) {
    console.warn(
      `Dry run only: missing Sanity env var(s) ignored: ${missing.join(", ")}`,
    );
  }
}

function loadManifest() {
  if (!existsSync(manifestPath)) {
    console.error("Missing sanity/seed/assetManifest.json. Run npm run assets:manifest first.");
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (!Array.isArray(manifest)) {
    console.error("sanity/seed/assetManifest.json must contain a JSON array.");
    process.exit(1);
  }
  return manifest;
}

function writeManifest(manifest) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

function uploadTypeFor(entry) {
  if (entry.assetType === "image") return "image";
  if (entry.assetType === "document") return "file";
  return null;
}

function sanityReferenceFor(entry, sanityAssetId) {
  const uploadType = uploadTypeFor(entry);
  if (uploadType === "image") {
    return {
      _type: "image",
      asset: { _type: "reference", _ref: sanityAssetId },
    };
  }

  return {
    _type: "file",
    asset: { _type: "reference", _ref: sanityAssetId },
  };
}

function appendNote(entry, note) {
  const current = String(entry.notes || "");
  if (current.includes(note)) return current;
  return [current, note].filter(Boolean).join(" ");
}

function removeUploadFailureNotes(notes) {
  return String(notes || "")
    .replace(/\s*Sanity upload failed:.*?(?=\s+(?:Uploaded to Sanity|Reuses Sanity asset|Local file missing|TODO:|Duplicate file content|Unused local migration cache file)|$)/g, "")
    .trim();
}

function readyForUpload(entry) {
  return (
    entry.status === "ready-for-sanity" ||
    entry.status === "local-only" ||
    entry.status === "needs-review"
  );
}

function summarize(manifest) {
  const uploadable = manifest.filter((entry) => uploadTypeFor(entry));
  return {
    total: manifest.length,
    uploadable: uploadable.length,
    images: uploadable.filter((entry) => entry.assetType === "image").length,
    documents: uploadable.filter((entry) => entry.assetType === "document").length,
    uploaded: uploadable.filter((entry) => entry.status === "uploaded-to-sanity").length,
    pending: uploadable.filter((entry) => readyForUpload(entry)).length,
    missing: uploadable.filter((entry) => entry.status === "missing").length,
    unsupported: manifest.length - uploadable.length,
  };
}

function buildUploadedByHash(manifest) {
  const uploadedByHash = new Map();
  for (const entry of manifest) {
    if (!entry.sha256 || !entry.sanityAssetId || !entry.sanityReference) continue;
    if (!uploadedByHash.has(entry.sha256)) {
      uploadedByHash.set(entry.sha256, entry);
    }
  }
  return uploadedByHash;
}

function reuseDuplicateAsset(entry, uploadedEntry) {
  entry.sanityAssetId = uploadedEntry.sanityAssetId;
  entry.sanityReference = uploadedEntry.sanityReference;
  entry.status = "duplicate";
  entry.notes = appendNote(
    entry,
    `Reuses Sanity asset from duplicate local file ${uploadedEntry.localPath}.`,
  );
}

function createSanityClient() {
  return createClient({
    projectId: envValue("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: envValue("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: envValue("NEXT_PUBLIC_SANITY_API_VERSION"),
    token: envValue("SANITY_AUTH_TOKEN"),
    useCdn: false,
  });
}

function refreshManifestStatus() {
  const result = spawnSync(process.execPath, ["scripts/generate-asset-manifest.mjs"], {
    cwd: root,
    encoding: "utf8",
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  if (result.status !== 0) {
    console.error("Failed to refresh ASSET_MIGRATION_STATUS.md after upload.");
    process.exit(result.status || 1);
  }
}

validateEnv();

const manifest = loadManifest();
const initialSummary = summarize(manifest);
const plannedUploads = manifest.filter(
  (entry) => uploadTypeFor(entry) && readyForUpload(entry),
);

console.log(
  `${dryRun ? "Dry run" : "Apply"}: ${initialSummary.images} images, ${initialSummary.documents} documents, ${initialSummary.pending} pending upload(s), ${initialSummary.uploaded} already uploaded.`,
);

if (initialSummary.unsupported > 0) {
  console.warn(`${initialSummary.unsupported} unsupported asset(s) will be skipped.`);
}

if (dryRun) {
  const missingFiles = plannedUploads.filter(
    (entry) => !existsSync(path.join(root, entry.filePath)),
  );
  console.log(`Would upload or reuse ${plannedUploads.length} asset(s).`);
  console.log(`Missing local files: ${missingFiles.length}`);
  process.exit(missingFiles.length > 0 ? 1 : 0);
}

const client = createSanityClient();
const uploadedByHash = buildUploadedByHash(manifest);
const results = {
  uploaded: 0,
  reused: 0,
  skipped: 0,
  failed: 0,
};

for (const entry of manifest) {
  const uploadType = uploadTypeFor(entry);
  if (!uploadType) {
    results.skipped += 1;
    continue;
  }

  if (entry.status === "uploaded-to-sanity" && entry.sanityAssetId) {
    results.skipped += 1;
    continue;
  }

  if (!readyForUpload(entry)) {
    results.skipped += 1;
    continue;
  }

  const duplicate = entry.sha256 ? uploadedByHash.get(entry.sha256) : null;
  if (duplicate && duplicate.localPath !== entry.localPath) {
    reuseDuplicateAsset(entry, duplicate);
    results.reused += 1;
    writeManifest(manifest);
    continue;
  }

  const filePath = path.join(root, entry.filePath);
  if (!existsSync(filePath)) {
    entry.status = "missing";
    entry.notes = appendNote(entry, "Local file missing during Sanity upload.");
    results.failed += 1;
    writeManifest(manifest);
    continue;
  }

  try {
    const document = await client.assets.upload(uploadType, createReadStream(filePath), {
      filename: path.basename(filePath),
    });
    entry.sanityAssetId = document._id;
    entry.sanityReference = sanityReferenceFor(entry, document._id);
    entry.status = "uploaded-to-sanity";
    entry.notes = removeUploadFailureNotes(entry.notes);
    entry.notes = appendNote(
      entry,
      `Uploaded to Sanity as ${document._id}.`,
    );
    if (entry.sha256) uploadedByHash.set(entry.sha256, entry);
    results.uploaded += 1;
    writeManifest(manifest);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Sanity upload failed for ${entry.localPath}: ${message}`);
    entry.status = "needs-review";
    entry.notes = appendNote(
      entry,
      `Sanity upload failed: ${message}.`,
    );
    results.failed += 1;
    writeManifest(manifest);
  }
}

writeManifest(manifest);
refreshManifestStatus();

console.log(
  `Sanity asset upload finished: ${results.uploaded} uploaded, ${results.reused} duplicate(s) reused, ${results.skipped} skipped, ${results.failed} failed.`,
);

if (results.failed > 0) {
  process.exit(1);
}
