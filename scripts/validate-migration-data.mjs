import { existsSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const root = path.resolve(import.meta.dirname, "..");

const assetStatusSchema = z.enum([
  "ready-for-sanity",
  "uploaded-to-sanity",
  "needs-review",
  "external-only",
  "duplicate",
  "missing",
  "migrated",
  "ignored-with-reason",
  "thumbnail-or-variant",
  "local-only",
  "unrecoverable",
  "unused",
]);

const assetManifestEntrySchema = z.object({
  originalUrl: z.string().min(1),
  localPath: z.string().startsWith("/assets/fresvik/"),
  assetType: z.enum(["image", "document", "other"]),
  usedBy: z.array(z.string()),
  sourcePages: z.array(z.string()),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
  fileSize: z.number().int().nonnegative(),
  status: assetStatusSchema,
});

const migrationAuditSchema = z.object({
  summary: z.object({
    generatedAt: z.string().min(1),
    liveSitemapUrlCount: z.number().int().nonnegative(),
    migratedPageCount: z.number().int().nonnegative(),
    redirectCount: z.number().int().nonnegative(),
    partialCount: z.number().int().nonnegative(),
    missingCount: z.number().int().nonnegative(),
    needsReviewCount: z.number().int().nonnegative(),
  }),
  routes: z.array(z.object({ oldUrl: z.string().optional() }).passthrough()),
  assets: z.array(z.object({ status: z.string().min(1) }).passthrough()),
  documents: z.array(z.object({ status: z.string().min(1) }).passthrough()),
  internalLinks: z.array(z.object({ status: z.string().min(1) }).passthrough()),
  externalLinks: z.array(z.object({ status: z.string().min(1) }).passthrough()),
  todos: z.array(z.unknown()),
});

const pageContentAuditSchema = z.object({
  summary: z.object({
    generatedAt: z.string().min(1),
    routeCount: z.number().int().nonnegative(),
    todoCount: z.number().int().nonnegative(),
  }),
  pages: z.array(z.object({ status: z.string().min(1) }).passthrough()),
  todos: z.array(z.unknown()),
});

const seedDocumentSchema = z
  .object({
    _id: z.string().min(1),
    _type: z.string().min(1),
  })
  .passthrough();

const evidenceMetaSchema = z.object({
  requestedUrl: z.string().url(),
  finalUrl: z.string().url(),
  fetchedAt: z.string().min(1),
  status: z.number().int(),
  title: z.string(),
  counts: z.object({
    textBlocks: z.number().int().nonnegative(),
    links: z.number().int().nonnegative(),
    images: z.number().int().nonnegative(),
    documents: z.number().int().nonnegative(),
  }),
});

const comparisonSchema = z.object({
  oldUrl: z.string().url(),
  newUrl: z.string().url(),
  checkedAt: z.string().min(1),
  status: z.enum(["migrated", "partial"]),
  counts: z.object({
    oldTextBlocks: z.number().int().nonnegative(),
    missingTextBlocks: z.number().int().nonnegative(),
    oldLinks: z.number().int().nonnegative(),
    missingLinks: z.number().int().nonnegative(),
    oldImages: z.number().int().nonnegative(),
    missingImages: z.number().int().nonnegative(),
  }),
});

const checks = [];

function addCheck(name, run) {
  checks.push({ name, run });
}

function projectPath(...parts) {
  return path.join(root, ...parts);
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(projectPath(relativePath), "utf8"));
}

async function readNdjson(relativePath) {
  const text = await readFile(projectPath(relativePath), "utf8");
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`${relativePath}:${index + 1}: invalid JSON (${error.message})`);
      }
    });
}

function validateArray(schema, values, label) {
  values.forEach((value, index) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      throw new Error(`${label}[${index}]: ${z.prettifyError(result.error)}`);
    }
  });
}

async function listFiles(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const child = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(child)));
    } else if (entry.isFile()) {
      files.push(child);
    }
  }

  return files;
}

addCheck("assetManifest", async () => {
  const entries = await readJson("sanity/seed/assetManifest.json");
  if (!Array.isArray(entries)) throw new Error("assetManifest must be an array");
  validateArray(assetManifestEntrySchema, entries, "assetManifest");
  return `${entries.length} assets`;
});

addCheck("migratedContent.ndjson", async () => {
  const documents = await readNdjson("sanity/seed/migratedContent.ndjson");
  validateArray(seedDocumentSchema, documents, "migratedContent");
  return `${documents.length} documents`;
});

addCheck("migratedContent.withAssets.ndjson", async () => {
  const relativePath = "sanity/seed/migratedContent.withAssets.ndjson";
  if (!existsSync(projectPath(relativePath))) return "missing optional file";
  const documents = await readNdjson(relativePath);
  validateArray(seedDocumentSchema, documents, "migratedContent.withAssets");
  return `${documents.length} documents`;
});

addCheck("machine migration audit", async () => {
  const audit = await readJson("MACHINE_READABLE_MIGRATION_AUDIT.json");
  const result = migrationAuditSchema.safeParse(audit);
  if (!result.success) throw new Error(z.prettifyError(result.error));
  return `${audit.routes.length} routes, ${audit.assets.length} assets`;
});

addCheck("page content audit", async () => {
  const audit = await readJson("MACHINE_READABLE_PAGE_CONTENT_AUDIT.json");
  const result = pageContentAuditSchema.safeParse(audit);
  if (!result.success) throw new Error(z.prettifyError(result.error));
  return `${audit.pages.length} pages`;
});

addCheck("evidence cache", async () => {
  const files = await listFiles(projectPath("migration", "evidence"));
  const jsonFiles = files.filter((file) => file.endsWith(".json"));
  for (const file of jsonFiles) {
    JSON.parse(await readFile(file, "utf8"));
  }

  const metaFiles = jsonFiles.filter((file) => path.basename(file) === "meta.json");
  for (const file of metaFiles) {
    const parsed = JSON.parse(await readFile(file, "utf8"));
    const result = evidenceMetaSchema.safeParse(parsed);
    if (!result.success) throw new Error(`${path.relative(root, file)}: ${z.prettifyError(result.error)}`);
  }
  return `${jsonFiles.length} JSON files, ${metaFiles.length} page snapshots`;
});

addCheck("comparison cache", async () => {
  const files = await listFiles(projectPath("migration", "comparisons"));
  const compareFiles = files.filter((file) => path.basename(file) === "compare.json");
  for (const file of compareFiles) {
    const parsed = JSON.parse(await readFile(file, "utf8"));
    const result = comparisonSchema.safeParse(parsed);
    if (!result.success) throw new Error(`${path.relative(root, file)}: ${z.prettifyError(result.error)}`);
  }
  return `${compareFiles.length} comparisons`;
});

let failed = false;

for (const check of checks) {
  try {
    const detail = await check.run();
    console.log(`ok ${check.name}: ${detail}`);
  } catch (error) {
    failed = true;
    console.error(`fail ${check.name}`);
    console.error(error.message);
  }
}

if (failed) process.exit(1);

const assetStats = await stat(projectPath("sanity/seed/assetManifest.json"));
console.log(`Validated migration data. assetManifest bytes=${assetStats.size}`);
