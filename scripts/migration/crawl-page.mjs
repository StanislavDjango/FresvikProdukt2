import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  evidenceDirFor,
  extractPage,
  fetchText,
  loadConfig,
  parseArgs,
  root,
  writeJson,
} from "./shared.mjs";

const args = parseArgs(process.argv.slice(2));
const oldUrl = args.url || args._[0];

if (!oldUrl) {
  console.error("Usage: npm run migration:crawl-page -- https://www.fresvik.no/path");
  process.exit(1);
}

const config = await loadConfig();
const fetched = await fetchText(oldUrl);
const page = extractPage(fetched.body, fetched.url);
const targetDir = evidenceDirFor(config, fetched.url);

await mkdir(targetDir, { recursive: true });
await writeFile(path.join(targetDir, "page.html"), fetched.body);
await writeFile(path.join(targetDir, "visible-text.txt"), `${page.visibleText}\n`);
await writeFile(path.join(targetDir, "content.md"), `${page.markdown.trim()}\n`);
await writeJson(path.join(targetDir, "meta.json"), {
  requestedUrl: oldUrl,
  finalUrl: fetched.url,
  fetchedAt: new Date().toISOString(),
  status: fetched.status,
  contentType: fetched.contentType,
  title: page.title,
  metaDescription: page.metaDescription,
  counts: page.counts,
});
await writeJson(path.join(targetDir, "headings.json"), page.headings);
await writeJson(path.join(targetDir, "links.json"), page.links);
await writeJson(path.join(targetDir, "images.json"), page.images);
await writeJson(path.join(targetDir, "documents.json"), page.documents);
await writeJson(path.join(targetDir, "page.json"), {
  ...page,
  markdown: undefined,
});

console.log(`Wrote evidence for ${fetched.url}`);
console.log(path.relative(root, targetDir));
console.log(
  `Counts: ${page.counts.textBlocks} text blocks, ${page.counts.images} images, ${page.counts.documents} documents, ${page.counts.links} links.`,
);
