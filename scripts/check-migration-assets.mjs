import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const filesToScan = [
  "src/data/pages.ts",
  "src/data/oldSiteInventory.ts",
  "src/data/navigation.ts",
  "sanity/seed/migratedContent.ndjson",
];

const assetPattern = /["'](\/assets\/fresvik\/[^"']+)["']/g;
const oldRemotePatterns = [
  "images.squarespace-cdn.com",
  "static1.squarespace.com",
];

async function readText(path) {
  return readFile(path, "utf8");
}

function collectAssetPaths(text) {
  return [...text.matchAll(assetPattern)].map((match) => match[1]);
}

async function assertAssetExists(assetPath) {
  const localPath = join("public", assetPath);

  if (!existsSync(localPath)) {
    throw new Error(`${assetPath} is referenced but ${localPath} is missing`);
  }

  const info = await stat(localPath);
  if (info.size < 100) {
    throw new Error(`${localPath} looks too small (${info.size} bytes)`);
  }

  if (localPath.endsWith(".pdf")) {
    const header = await readFile(localPath);
    if (header.subarray(0, 4).toString("utf8") !== "%PDF") {
      throw new Error(`${localPath} does not start with %PDF`);
    }
  }
}

const failures = [];
const referencedAssets = new Set();

for (const file of filesToScan) {
  const text = await readText(file);

  for (const remotePattern of oldRemotePatterns) {
    if (text.includes(remotePattern)) {
      failures.push(`${file} still references ${remotePattern}`);
    }
  }

  if (/href:\s*["']#/.test(text) || /href=["']#/.test(text)) {
    failures.push(`${file} contains a placeholder href="#"`);
  }

  for (const assetPath of collectAssetPaths(text)) {
    referencedAssets.add(assetPath);
  }
}

for (const assetPath of referencedAssets) {
  try {
    await assertAssetExists(assetPath);
  } catch (error) {
    failures.push(error.message);
  }
}

if (failures.length > 0) {
  console.error("Migration asset audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Migration asset audit passed for ${referencedAssets.size} local /assets/fresvik references.`,
);
