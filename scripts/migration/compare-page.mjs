import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  comparisonDirFor,
  evidenceDirFor,
  extractPage,
  fetchText,
  loadConfig,
  parseArgs,
  readJson,
  root,
  summarizeCompare,
  writeJson,
} from "./shared.mjs";

const args = parseArgs(process.argv.slice(2));
const oldUrl = args.oldUrl || args._[0];
const newRoute = args.route || args._[1];

if (!oldUrl || !newRoute) {
  console.error(
    "Usage: npm run migration:compare-page -- https://www.fresvik.no/old-path /new-route --new-base http://127.0.0.1:3000",
  );
  process.exit(1);
}

const config = await loadConfig();
const evidenceDir = evidenceDirFor(config, oldUrl);
const oldPagePath = path.join(evidenceDir, "page.json");

if (!existsSync(oldPagePath)) {
  console.error(`Missing evidence: ${path.relative(root, oldPagePath)}`);
  console.error(`Run: npm run migration:crawl-page -- ${oldUrl}`);
  process.exit(1);
}

const oldPage = await readJson(oldPagePath);
const newBase = args.newBase || config.defaultNewBaseUrl;
const newUrl = new URL(newRoute, newBase).toString();
const fetched = await fetchText(newUrl);
const newPage = extractPage(fetched.body, fetched.url);
const result = summarizeCompare(oldPage, newPage);
const targetDir = comparisonDirFor(config, oldUrl);

await mkdir(targetDir, { recursive: true });
await writeJson(path.join(targetDir, "compare.json"), {
  oldUrl,
  newUrl: fetched.url,
  checkedAt: new Date().toISOString(),
  ...result,
});
await writeFile(path.join(targetDir, "new-visible-text.txt"), `${newPage.visibleText}\n`);
await writeFile(path.join(targetDir, "summary.md"), renderMarkdown(oldUrl, fetched.url, result));

console.log(`Comparison status: ${result.status}`);
console.log(path.relative(root, targetDir));
console.log(
  `Missing: ${result.counts.missingTextBlocks} text blocks, ${result.counts.missingImages} images, ${result.counts.missingLinks} links.`,
);

if (result.status !== "migrated" && !args.allowPartial) {
  process.exitCode = 2;
}

function renderMarkdown(oldUrl, newUrl, result) {
  const lines = [
    `# Page comparison`,
    ``,
    `Old URL: ${oldUrl}`,
    `New URL: ${newUrl}`,
    `Checked: ${new Date().toISOString()}`,
    `Status: ${result.status}`,
    ``,
    `## Counts`,
    ``,
    `| Metric | Count |`,
    `| --- | ---: |`,
    `| Old text blocks | ${result.counts.oldTextBlocks} |`,
    `| Missing text blocks | ${result.counts.missingTextBlocks} |`,
    `| Old images | ${result.counts.oldImages} |`,
    `| Missing images | ${result.counts.missingImages} |`,
    `| Old links | ${result.counts.oldLinks} |`,
    `| Missing links | ${result.counts.missingLinks} |`,
    ``,
    `## Missing Text Blocks`,
    ``,
    ...listItems(result.missingTextBlocks),
    ``,
    `## Missing Images`,
    ``,
    ...listItems(result.missingImages.map((image) => `${image.filename} — ${image.originalUrl}`)),
    ``,
    `## Missing Links`,
    ``,
    ...listItems(
      result.missingLinks.map((link) => `${link.text || "(no text)"} — ${link.absoluteUrl || link.href}`),
    ),
    ``,
  ];
  return `${lines.join("\n")}\n`;
}

function listItems(items) {
  if (items.length === 0) return ["None."];
  return items.slice(0, 100).map((item) => `- ${String(item).replace(/\n/g, " ")}`);
}
