import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { mkdir, readdir, readFile, rm, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const publicRoot = path.join(root, "public");
const assetRoot = path.join(publicRoot, "assets", "fresvik");
const tempDir = path.join(root, ".generated", "asset-manifest-cjs");
const manifestPath = path.join(root, "sanity", "seed", "assetManifest.json");
const statusPath = path.join(root, "ASSET_MIGRATION_STATUS.md");
const checkOnly = process.argv.includes("--check");

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);
const documentExtensions = new Set([".pdf", ".doc", ".docx", ".xls", ".xlsx"]);

function compileTs(sourceFile, outputFile) {
  const source = readFileSync(sourceFile, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;

  mkdirSync(path.dirname(outputFile), { recursive: true });
  writeFileSync(outputFile, output);
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function listFiles(dir) {
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

function assetPathFromFile(filePath) {
  return `/${path.relative(publicRoot, filePath).split(path.sep).join("/")}`;
}

function filePathFromAsset(assetPath) {
  return path.join(root, "public", assetPath.replace(/^\//, ""));
}

function assetTypeFor(assetPath) {
  const extension = path.extname(assetPath).toLowerCase();
  if (imageExtensions.has(extension)) return "image";
  if (documentExtensions.has(extension)) return "document";
  return "other";
}

function targetSanityTypeFor(assetType) {
  return assetType === "image" ? "image asset" : "file asset";
}

async function hashFile(filePath) {
  const buffer = await readFile(filePath);
  return createHash("sha256").update(buffer).digest("hex");
}

function collectAssetUsageFromCard(map, card, usedBy, sourcePages) {
  if (card.href?.startsWith("/assets/fresvik/")) {
    addToUsage(map, card.href, usedBy, sourcePages);
  }

  if (card.imageUrl?.startsWith("/assets/fresvik/")) {
    addToUsage(map, card.imageUrl, usedBy, sourcePages);
  }
}

function addToUsage(usage, assetPath, usedBy, sourcePages) {
  if (!assetPath?.startsWith("/assets/fresvik/")) return;
  if (!usage.has(assetPath)) {
    usage.set(assetPath, {
      usedBy: new Set(),
      sourcePages: new Set(),
    });
  }

  for (const route of usedBy.filter(Boolean)) usage.get(assetPath).usedBy.add(route);
  for (const source of sourcePages.filter(Boolean)) {
    usage.get(assetPath).sourcePages.add(source);
  }
}

function collectAssetUsageFromInventory(usage, inventory) {
  const routeSource = (href) =>
    href?.startsWith("/") && !href.startsWith("/assets/")
      ? `https://www.fresvik.no${href}`
      : undefined;

  for (const [exportName, value] of Object.entries(inventory)) {
    if (!Array.isArray(value)) continue;

    for (const item of value) {
      const itemRoute =
        item.href?.startsWith("/") && !item.href.startsWith("/assets/")
          ? item.href
          : undefined;
      const sourcePage =
        routeSource(item.href) ||
        (exportName === "oldSiteEmployees"
          ? "https://www.fresvik.no/tilsette"
          : undefined) ||
        (exportName === "oldSiteLegalDocuments"
          ? "https://www.fresvik.no/openheitslova"
          : undefined);
      const usedBy =
        itemRoute ||
        (exportName === "oldSiteEmployees" ? "/tilsette" : undefined) ||
        (exportName === "oldSiteLegalDocuments" ? "/openheitslova" : undefined);

      addToUsage(usage, item.imageUrl, [usedBy], [sourcePage]);
      addToUsage(usage, item.href, [usedBy], [sourcePage]);
    }
  }
}

function collectAssetUsageFromPages(usage, pages) {
  for (const page of pages) {
    const sourcePages = [page.sourceUrl];
    const usedBy = [page.slug];

    for (const card of page.cards) {
      collectAssetUsageFromCard(usage, card, usedBy, sourcePages);
    }

    for (const section of page.sections) {
      for (const item of section.items) {
        collectAssetUsageFromCard(usage, item, usedBy, sourcePages);
      }
    }
  }
}

function collectAssetUsageFromSeed(usage) {
  const seedPath = path.join(root, "sanity", "seed", "migratedContent.ndjson");
  if (!existsSync(seedPath)) return;

  const lines = readFileSync(seedPath, "utf8").split("\n").filter(Boolean);
  for (const line of lines) {
    const doc = JSON.parse(line);
    const usedBy = doc.slug?.current ? [`/${doc.slug.current}`] : [doc._id];
    addToUsage(usage, doc.localPath, usedBy, []);
    addToUsage(usage, doc.migratedImagePath, usedBy, []);
  }
}

function loadExistingManifest() {
  if (!existsSync(manifestPath)) return new Map();

  const parsed = JSON.parse(readFileSync(manifestPath, "utf8"));
  return new Map(parsed.map((entry) => [entry.localPath, entry]));
}

function statusFor(entry, canonicalByHash) {
  if (
    entry.status === "needs-review" ||
    entry.status === "external-only" ||
    entry.status === "duplicate"
  ) {
    return entry.status;
  }
  if (!entry.filePath || !existsSync(path.join(root, entry.filePath))) return "missing";
  if (entry.sanityAssetId || entry.sanityReference) return "uploaded-to-sanity";
  if (canonicalByHash.get(entry.sha256) !== entry.localPath) return "duplicate";
  if (entry.usedBy.length === 0) return "unused";
  if (entry.originalUrl.startsWith("TODO")) return "ready-for-sanity";
  return "ready-for-sanity";
}

function notesFor(entry, duplicateOf) {
  const notes = [];
  if (entry.originalUrl.startsWith("TODO")) {
    notes.push(
      "TODO: exact original remote asset URL was not retained in local data; sourcePages records known old pages.",
    );
  }
  if (duplicateOf) {
    notes.push(`Duplicate file content of ${duplicateOf}.`);
  }
  if (entry.usedBy.length === 0) {
    notes.push("Unused local migration cache file; keep until asset review is complete.");
  }
  return notes.join(" ");
}

async function buildManifest() {
  await rm(tempDir, { recursive: true, force: true });
  await ensureDir(path.join(tempDir, "node_modules", "@", "data"));
  compileTs(
    path.join(root, "src", "data", "oldSiteInventory.ts"),
    path.join(tempDir, "node_modules", "@", "data", "oldSiteInventory.js"),
  );
  compileTs(path.join(root, "src", "data", "pages.ts"), path.join(tempDir, "pages.js"));

  const inventory = require(path.join(
    tempDir,
    "node_modules",
    "@",
    "data",
    "oldSiteInventory.js",
  ));
  const { getAllContentPages } = require(path.join(tempDir, "pages.js"));

  const usage = new Map();
  collectAssetUsageFromInventory(usage, inventory);
  collectAssetUsageFromPages(usage, getAllContentPages());
  collectAssetUsageFromSeed(usage);

  const existing = loadExistingManifest();
  const filePaths = await listFiles(assetRoot);
  const allAssetPaths = new Set([
    ...filePaths.map(assetPathFromFile),
    ...usage.keys(),
  ]);

  const baseEntries = [];
  for (const localPath of [...allAssetPaths].sort()) {
    const filePath = filePathFromAsset(localPath);
    const relativeFilePath = path.relative(root, filePath).split(path.sep).join("/");
    const exists = existsSync(filePath);
    const fileInfo = exists ? await stat(filePath) : undefined;
    const sha256 = exists ? await hashFile(filePath) : null;
    const assetType = assetTypeFor(localPath);
    const previous = existing.get(localPath);
    const usedBy = [...(usage.get(localPath)?.usedBy || [])].sort();
    const sourcePages = [...(usage.get(localPath)?.sourcePages || [])].sort();

    baseEntries.push({
      originalUrl: previous?.originalUrl || "TODO: unknown original URL",
      localPath,
      filePath: relativeFilePath,
      assetType,
      usedBy,
      sourcePages,
      sha256,
      fileSize: fileInfo?.size || null,
      sanityAssetId: previous?.sanityAssetId || null,
      sanityReference: previous?.sanityReference || null,
      status: previous?.status || "local-only",
      targetSanityType: targetSanityTypeFor(assetType),
      notes: "",
    });
  }

  const canonicalByHash = new Map();
  for (const entry of baseEntries) {
    if (!entry.sha256) continue;
    if (!canonicalByHash.has(entry.sha256)) {
      canonicalByHash.set(entry.sha256, entry.localPath);
    }
  }

  return baseEntries.map((entry) => {
    const duplicateOf =
      entry.sha256 && canonicalByHash.get(entry.sha256) !== entry.localPath
        ? canonicalByHash.get(entry.sha256)
        : null;

    return {
      ...entry,
      status: statusFor(entry, canonicalByHash),
      notes: notesFor(entry, duplicateOf),
    };
  });
}

function count(entries, predicate) {
  return entries.filter(predicate).length;
}

function statusMarkdown(entries) {
  const byStatus = new Map();
  for (const entry of entries) {
    byStatus.set(entry.status, (byStatus.get(entry.status) || 0) + 1);
  }

  const localPathUsers = [
    ...new Set(entries.flatMap((entry) => entry.usedBy).filter((value) => value.startsWith("/"))),
  ].sort();
  const unknownOriginals = count(entries, (entry) => entry.originalUrl.startsWith("TODO"));

  return `# Asset Migration Status

Generated from local migration cache and source data.

## Summary

| Metric | Count |
| --- | ---: |
| Total assets found | ${entries.length} |
| Images | ${count(entries, (entry) => entry.assetType === "image")} |
| PDFs/documents | ${count(entries, (entry) => entry.assetType === "document")} |
| Other assets | ${count(entries, (entry) => entry.assetType === "other")} |
| Used assets | ${count(entries, (entry) => entry.usedBy.length > 0)} |
| Unused assets | ${count(entries, (entry) => entry.status === "unused")} |
| Missing assets | ${count(entries, (entry) => entry.status === "missing")} |
| Duplicate assets | ${count(entries, (entry) => entry.status === "duplicate")} |
| Ready for Sanity | ${count(entries, (entry) => entry.status === "ready-for-sanity")} |
| Uploaded to Sanity | ${count(entries, (entry) => entry.status === "uploaded-to-sanity")} |
| Failed or needs review | ${count(entries, (entry) => entry.status === "missing" || entry.status === "needs-review")} |
| TODO original URLs | ${unknownOriginals} |

## Status Counts

${[...byStatus.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([status, value]) => `- \`${status}\`: ${value}`)
  .join("\n")}

## Local Path Usage

${localPathUsers.length} routes/documents still use local \`/assets/fresvik\` paths while assets wait for Sanity import.

${localPathUsers.map((route) => `- \`${route}\``).join("\n")}

## Notes

- \`public/assets/fresvik\` remains a temporary migration cache.
- \`originalUrl\` is marked \`TODO: unknown original URL\` where the exact old remote asset URL was not retained in local source data.
- Real Sanity upload requires \`NEXT_PUBLIC_SANITY_PROJECT_ID\`, \`NEXT_PUBLIC_SANITY_DATASET\`, \`NEXT_PUBLIC_SANITY_API_VERSION\`, and \`SANITY_AUTH_TOKEN\`.
- \`sanity/seed/migratedContent.ndjson\` remains the baseline; generate \`sanity/seed/migratedContent.withAssets.ndjson\` after uploads instead of overwriting it.
- Do not delete local files until Sanity upload, reference generation, and production verification are complete.
`;
}

function assertUpToDate(filePath, expected) {
  if (!existsSync(filePath)) {
    throw new Error(`${path.relative(root, filePath)} does not exist`);
  }

  const current = readFileSync(filePath, "utf8");
  if (current !== expected) {
    throw new Error(`${path.relative(root, filePath)} is not up to date`);
  }
}

const manifest = await buildManifest();
const manifestJson = `${JSON.stringify(manifest, null, 2)}\n`;
const statusText = statusMarkdown(manifest);

if (checkOnly) {
  assertUpToDate(manifestPath, manifestJson);
  assertUpToDate(statusPath, statusText);
  console.log(`Asset manifest check passed for ${manifest.length} assets.`);
} else {
  await ensureDir(path.dirname(manifestPath));
  writeFileSync(manifestPath, manifestJson);
  writeFileSync(statusPath, statusText);
  console.log(`Wrote ${manifest.length} assets to ${path.relative(root, manifestPath)}`);
  console.log(`Wrote ${path.relative(root, statusPath)}`);
}
