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
const auditJsonPath = path.join(root, "MACHINE_READABLE_MIGRATION_AUDIT.json");
const checkOnly = process.argv.includes("--check");

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);
const documentExtensions = new Set([".pdf", ".doc", ".docx", ".xls", ".xlsx"]);
const knownOriginalUrls = new Map([
  [
    "/assets/fresvik/images/old-site/home-flag-of-norway.jpg",
    "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/c9b5403a-bfc1-4fde-9c6b-c448d7c8e9e0/Flag_of_Norway_with_proportions.svg.jpg",
  ],
  [
    "/assets/fresvik/images/old-site/home-pir-fire-illustration.png",
    "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/de58b233-c5b5-4348-8494-72c6df72a6dd/Blue+3D+Cube+Icon+Logo+Template+Square+-+Made+with+PosterMyWall+%285%29.png",
  ],
  [
    "/assets/fresvik/images/old-site/home-fresvik-panel-room.jpg",
    "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/2f0fa235-c925-4a25-954e-eddda22388b1/aaa.jpg",
  ],
  [
    "/assets/fresvik/images/old-site/home-kjole-fryseportar.jpg",
    "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/c8dc8a03-e4f0-4407-bbdd-7844fac31bdc/Fresvik%2Bskyveport.jpg",
  ],
  [
    "/assets/fresvik/images/old-site/home-kjole-frysedorer.jpg",
    "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/67e1460b-fd80-4be3-98d1-1fa26118af4c/FP+Produkt+23.jpg",
  ],
  [
    "/assets/fresvik/images/old-site/home-fasadepanel.webp",
    "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1c0b8495-5976-420a-b7a9-eb2f88e17b74/image-asset+%281%29.jpg",
  ],
  [
    "/assets/fresvik/images/old-site/home-job-factory.jpg",
    "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/5fc55087-b42c-48d7-9587-0811aa56c942/Fresvik+Produkt+-+Fabrikk-27.jpg",
  ],
  [
    "/assets/fresvik/images/old-site/home-sentral-godkjent.png",
    "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385862366-SQTJIQF8X2Y8LT02Z2UT/sentral%2Bgodkjent.png",
  ],
  [
    "/assets/fresvik/images/old-site/home-poly.png",
    "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385870865-8TDYDXKTA92N3SV2CI5E/Poly.png",
  ],
  [
    "/assets/fresvik/images/old-site/home-startbank.png",
    "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385876430-SF9NN179JLHLSGSAMMMQ/Startbarnk.png",
  ],
]);

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

function appendNote(notes, note) {
  if (!note) return;
  if (notes.some((existing) => existing.includes(note) || note.includes(existing))) return;
  notes.push(note);
}

function notesFor(entry, duplicateOf) {
  const notes = [];
  appendNote(notes, String(entry.notes || "").trim());
  if (entry.originalUrl.startsWith("TODO")) {
    appendNote(
      notes,
      "TODO: exact original remote asset URL was not retained in local data; sourcePages records known old pages.",
    );
  }
  if (duplicateOf) {
    appendNote(notes, `Duplicate file content of ${duplicateOf}.`);
  }
  if (entry.usedBy.length === 0) {
    appendNote(notes, "Unused local migration cache file; keep until asset review is complete.");
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
  compileTs(
    path.join(root, "src", "data", "oldSiteContentExtract.ts"),
    path.join(tempDir, "node_modules", "@", "data", "oldSiteContentExtract.js"),
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
    const knownOriginalUrl = knownOriginalUrls.get(localPath);
    const originalUrl =
      previous?.originalUrl && !previous.originalUrl.startsWith("TODO")
        ? previous.originalUrl
        : knownOriginalUrl || previous?.originalUrl || "TODO: unknown original URL";
    const notes =
      knownOriginalUrl &&
      String(previous?.notes || "").includes("TODO: exact original remote asset URL")
        ? "Recovered originalUrl from live old /startside sitemap."
        : previous?.notes || "";

    baseEntries.push({
      originalUrl,
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
      notes,
    });
  }

  const canonicalByHash = new Map();
  for (const entry of baseEntries) {
    if (!entry.sha256) continue;
    if (!canonicalByHash.has(entry.sha256)) {
      canonicalByHash.set(entry.sha256, entry.localPath);
    }
  }
  const entryByLocalPath = new Map(baseEntries.map((entry) => [entry.localPath, entry]));

  return baseEntries.map((entry) => {
    const duplicateOf =
      entry.sha256 && canonicalByHash.get(entry.sha256) !== entry.localPath
        ? canonicalByHash.get(entry.sha256)
        : null;
    const canonicalEntry = duplicateOf ? entryByLocalPath.get(duplicateOf) : null;
    const resolvedEntry = {
      ...entry,
      sanityAssetId: entry.sanityAssetId || canonicalEntry?.sanityAssetId || null,
      sanityReference: entry.sanityReference || canonicalEntry?.sanityReference || null,
    };

    return {
      ...resolvedEntry,
      status: statusFor(resolvedEntry, canonicalByHash),
      notes: notesFor(resolvedEntry, duplicateOf),
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
  const audit = existsSync(auditJsonPath)
    ? JSON.parse(readFileSync(auditJsonPath, "utf8"))
    : null;
  const assetStatusCounts = audit?.summary?.assetStatusCounts || {};
  const auditSummary = audit?.summary;
  const sitemapComparison = auditSummary
    ? `
## Old Sitemap Image Coverage

| Metric | Count |
| --- | ---: |
| Baseline old sitemap image count | ${auditSummary.localBaselineImageCount} |
| Live sitemap image entries | ${auditSummary.liveSitemapImageEntries} |
| Live sitemap unique image URLs | ${auditSummary.liveSitemapUniqueImageUrls} |
| Local migrated image assets | ${auditSummary.localImageAssets} |
| Sitemap images classified migrated | ${assetStatusCounts.migrated || 0} |
| Sitemap duplicate image entries | ${assetStatusCounts.duplicate || 0} |
| Sitemap thumbnail/variant unresolved | ${assetStatusCounts["thumbnail-or-variant"] || 0} |
| Sitemap images missing local match | ${assetStatusCounts.missing || 0} |
| Local-only images without recovered originalUrl | ${assetStatusCounts["local-only"] || 0} |

Source drift note: \`src/data/legacyRoutes.ts\` stores the earlier baseline, while \`MACHINE_READABLE_MIGRATION_AUDIT.json\` stores the latest live sitemap audit.
`
    : "";

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

${sitemapComparison}

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
