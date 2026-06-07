import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const oldBaseUrl = "https://www.fresvik.no";
const auditPath = path.join(root, "MACHINE_READABLE_MIGRATION_AUDIT.json");
const extractPath = path.join(root, "src", "data", "oldSiteContentExtract.ts");
const imageDir = path.join(root, "public", "assets", "fresvik", "images", "old-site");
const manifestPath = path.join(root, "sanity", "seed", "assetManifest.json");

function readJson(filePath, fallback) {
  if (!existsSync(filePath)) return fallback;
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function hash(value) {
  return createHash("sha1").update(value).digest("hex").slice(0, 10);
}

function normalizePathname(value) {
  try {
    const url = value.startsWith("http") ? new URL(value) : new URL(value, oldBaseUrl);
    return decodeURI(url.pathname).replace(/\/$/, "") || "/";
  } catch {
    return decodeURI(value).replace(/\/$/, "") || "/";
  }
}

function decodeHtml(value = "") {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&aring;/g, "å")
    .replace(/&Aring;/g, "Å")
    .replace(/&aelig;/g, "æ")
    .replace(/&AElig;/g, "Æ")
    .replace(/&oslash;/g, "ø")
    .replace(/&Oslash;/g, "Ø");
}

function stripTags(html = "") {
  return decodeHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<svg[\s\S]*?<\/svg>/gi, "")
      .replace(/<(?:p|h[1-6]|li|br|figcaption|blockquote)\b[^>]*>/gi, "\n")
      .replace(/<\/(?:p|h[1-6]|li|figcaption|blockquote)>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function metaContent(html, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const propertyPattern = new RegExp(
    `<meta[^>]+(?:property|name|itemprop)=["']${escaped}["'][^>]+content=["']([^"']*)["'][^>]*>`,
    "i",
  );
  const contentFirstPattern = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name|itemprop)=["']${escaped}["'][^>]*>`,
    "i",
  );
  return decodeHtml(
    html.match(propertyPattern)?.[1] || html.match(contentFirstPattern)?.[1] || "",
  ).trim();
}

function textBlocksFromHtml(html) {
  const blockMatches = [
    ...html.matchAll(
      /<div class="sqs-text-block-container">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi,
    ),
  ];
  const blocks = blockMatches.map((match) => stripTags(match[1])).filter(Boolean);

  if (blocks.length > 0) return blocks;

  const contentStart =
    html.indexOf("blog-item-content e-content") >= 0
      ? html.indexOf("blog-item-content e-content")
      : html.indexOf("<article");
  const contentEnd = contentStart >= 0 ? html.indexOf("</article>", contentStart) : -1;
  const slice =
    contentStart >= 0 && contentEnd > contentStart
      ? html.slice(contentStart, contentEnd)
      : html.match(/<body[\s\S]*?<\/body>/i)?.[0] || html;

  return stripTags(slice)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function cleanParagraphs(blocks) {
  const ignored = [
    /^fresvik produkt$/i,
    /^produkt$/i,
    /^tenester$/i,
    /^aktuelt$/i,
    /^referansar$/i,
    /^kontakt$/i,
    /^facebook$/i,
    /^linkedin$/i,
    /^mob:/i,
    /^nettside levert av/i,
    /^ønskjer du meir informasjon/i,
    /^vi skreddarsyr løysingar/i,
    /^meld deg på nyheitsbrev/i,
    /^registrer deg/i,
    /^send inn$/i,
    /^godta alle$/i,
  ];
  const seen = new Set();
  const paragraphs = [];
  for (const block of blocks) {
    for (const raw of block.split(/\n{2,}|\n(?=[A-ZÆØÅ0-9])/)) {
      const text = raw.replace(/\s+/g, " ").trim();
      if (text.length < 24) continue;
      if (ignored.some((pattern) => pattern.test(text))) continue;
      if (text.includes("window.") || text.includes("Squarespace")) continue;
      const key = text.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      paragraphs.push(text);
    }
  }
  return paragraphs.slice(0, 28);
}

function linksFromHtml(html) {
  const links = [];
  for (const match of html.matchAll(/<a\b[^>]+href=["']([^"']+)["'][^>]*>/gi)) {
    const href = decodeHtml(match[1]).trim();
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (href.startsWith("#")) continue;
    try {
      const resolved = href.startsWith("http") ? new URL(href) : new URL(href, oldBaseUrl);
      links.push(resolved.href);
    } catch {
      // Ignore malformed old HTML links; they are not actionable migration targets.
    }
  }
  return [...new Set(links)];
}

function safeFilenameFromUrl(url) {
  const parsed = new URL(url);
  const rawName = decodeURIComponent(parsed.pathname.split("/").pop() || "image");
  const ext = rawName.match(/\.[a-z0-9]+$/i)?.[0]?.toLowerCase() || ".jpg";
  const stem = rawName
    .replace(/\.[a-z0-9]+$/i, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 70) || "image";
  return `${stem}-${hash(url)}${ext}`;
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "Fresvik migration audit" },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.text();
}

async function downloadImage(originalUrl) {
  mkdirSync(imageDir, { recursive: true });
  const filename = safeFilenameFromUrl(originalUrl);
  const absolutePath = path.join(imageDir, filename);
  const localPath = `/assets/fresvik/images/old-site/${filename}`;

  if (existsSync(absolutePath) && statSync(absolutePath).size > 0) {
    return localPath;
  }

  const response = await fetch(originalUrl, {
    redirect: "follow",
    headers: { "user-agent": "Fresvik migration audit" },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(absolutePath, buffer);
  return localPath;
}

function bestDocumentOriginalUrl(documentAsset, documentUrls) {
  const localStem = normalizeForMatch(path.basename(documentAsset.localPath));
  let best = null;
  for (const url of documentUrls) {
    const remoteStem = normalizeForMatch(path.basename(new URL(url).pathname));
    const score =
      sharedTokenScore(localStem, remoteStem) +
      (documentAsset.sourcePages?.some((page) => documentUrls.sourcePath === page) ? 0.25 : 0);
    if (!best || score > best.score) best = { url, score };
  }
  return best && best.score >= 0.45 ? best.url : null;
}

function normalizeForMatch(value = "") {
  return decodeURIComponent(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sharedTokenScore(a, b) {
  const aTokens = new Set(a.split(/\s+/).filter((token) => token.length > 2));
  const bTokens = new Set(b.split(/\s+/).filter((token) => token.length > 2));
  if (aTokens.size === 0 || bTokens.size === 0) return 0;
  let shared = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) shared += 1;
  }
  return shared / Math.max(aTokens.size, bTokens.size);
}

function writeExtractFile(extracts) {
  const entries = Object.fromEntries(extracts.map((entry) => [entry.href, entry]));
  const source = `// Generated by scripts/sync-old-site-content.mjs.\n// Source truth: live https://www.fresvik.no pages and sitemap image URLs.\n\nexport type OldSiteContentExtract = {\n  href: string;\n  sourceUrl: string;\n  title: string;\n  description?: string;\n  publishedAt?: string;\n  modifiedAt?: string;\n  bodyParagraphs: string[];\n  imageUrls: string[];\n  documentUrls: string[];\n  internalLinks: string[];\n  externalLinks: string[];\n  extractionStatus: \"extracted\" | \"unrecoverable\";\n  notes: string[];\n};\n\nexport const oldSiteContentExtracts: Record<string, OldSiteContentExtract> = ${JSON.stringify(
    entries,
    null,
    2,
  )};\n\nexport function getOldSiteContentExtract(href: string) {\n  return oldSiteContentExtracts[href];\n}\n`;
  writeFileSync(extractPath, source);
}

function updateDocumentOriginalUrls(allDocumentUrls) {
  const manifest = readJson(manifestPath, []);
  let changed = 0;
  for (const entry of manifest) {
    if (entry.assetType !== "document") continue;
    if (entry.originalUrl && !entry.originalUrl.startsWith("TODO")) continue;
    const match = bestDocumentOriginalUrl(entry, allDocumentUrls);
    if (!match) continue;
    entry.originalUrl = match;
    entry.notes = "Recovered original PDF URL from live old-site HTML during migration completion.";
    changed += 1;
  }
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return changed;
}

function updateImageOriginalUrls(localImageOriginals) {
  const manifest = readJson(manifestPath, []);
  let changed = 0;
  for (const entry of manifest) {
    if (entry.assetType !== "image") continue;
    const originalUrl = localImageOriginals.get(entry.localPath);
    if (!originalUrl) continue;
    if (entry.originalUrl === originalUrl) continue;
    entry.originalUrl = originalUrl;
    entry.notes = "Recovered original image URL from live sitemap during migration completion.";
    changed += 1;
  }
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return changed;
}

const audit = readJson(auditPath, null);
if (!audit) {
  throw new Error("Run npm run audit:migration before syncing old-site content.");
}

const imageRowsByPath = new Map();
for (const row of audit.assets || []) {
  if (!row.oldPath || row.oldPath.includes(",")) continue;
  if (!row.originalUrl || row.originalUrl.startsWith("TODO")) continue;
  const rows = imageRowsByPath.get(row.oldPath) || [];
  rows.push(row);
  imageRowsByPath.set(row.oldPath, rows);
}

const targetRoutes = audit.routes
  .filter((route) => route.status !== "redirect" && route.oldUrl?.startsWith(oldBaseUrl))
  .map((route) => ({
    href: route.oldPath,
    sourceUrl: route.oldUrl,
    contentType: route.contentType,
  }));

const extracts = [];
const allDocumentUrls = new Set();
const localImageOriginals = new Map();
let downloadedImages = 0;

for (const route of targetRoutes) {
  const notes = [];
  let html = "";
  try {
    html = await fetchText(route.sourceUrl);
  } catch (error) {
    extracts.push({
      href: route.href,
      sourceUrl: route.sourceUrl,
      title: route.href,
      bodyParagraphs: [],
      imageUrls: [],
      documentUrls: [],
      internalLinks: [],
      externalLinks: [],
      extractionStatus: "unrecoverable",
      notes: [`HTML fetch failed: ${error.message}`],
    });
    continue;
  }

  const title =
    metaContent(html, "headline") ||
    metaContent(html, "og:title").replace(/ — Fresvik Produkt| &mdash; Fresvik Produkt/g, "") ||
    route.href;
  const description = metaContent(html, "description") || metaContent(html, "og:description");
  const publishedAt = metaContent(html, "datePublished");
  const modifiedAt = metaContent(html, "dateModified");
  const bodyParagraphs = cleanParagraphs(textBlocksFromHtml(html));
  const links = linksFromHtml(html);
  const documentUrls = links.filter((url) => url.toLowerCase().includes(".pdf"));
  for (const url of documentUrls) allDocumentUrls.add(url);

  const internalLinks = links
    .filter((url) => {
      try {
        return new URL(url).hostname === "www.fresvik.no";
      } catch {
        return false;
      }
    })
    .map((url) => normalizePathname(url));
  const externalLinks = links.filter((url) => {
    try {
      return new URL(url).hostname !== "www.fresvik.no";
    } catch {
      return false;
    }
  });

  const imageUrls = [];
  const usedExistingLocalPaths = new Set();
  for (const row of imageRowsByPath.get(route.href) || []) {
    if (row.localPath && !usedExistingLocalPaths.has(row.localPath)) {
      imageUrls.push(row.localPath);
      localImageOriginals.set(row.localPath, row.originalUrl);
      usedExistingLocalPaths.add(row.localPath);
      continue;
    }
    try {
      const localPath = await downloadImage(row.originalUrl);
      imageUrls.push(localPath);
      localImageOriginals.set(localPath, row.originalUrl);
      downloadedImages += 1;
    } catch (error) {
      notes.push(`Image download failed for ${row.originalUrl}: ${error.message}`);
    }
  }

  if (bodyParagraphs.length === 0 && description) {
    bodyParagraphs.push(description);
    notes.push("Only meta description could be extracted from old HTML.");
  }

  extracts.push({
    href: route.href,
    sourceUrl: route.sourceUrl,
    title,
    description,
    publishedAt,
    modifiedAt,
    bodyParagraphs,
    imageUrls: [...new Set(imageUrls)],
    documentUrls: [...new Set(documentUrls)],
    internalLinks: [...new Set(internalLinks)],
    externalLinks: [...new Set(externalLinks)],
    extractionStatus: bodyParagraphs.length > 0 ? "extracted" : "unrecoverable",
    notes,
  });
}

writeExtractFile(extracts);
const recoveredImages = updateImageOriginalUrls(localImageOriginals);
const recoveredDocuments = updateDocumentOriginalUrls([...allDocumentUrls]);

console.log(
  `Wrote ${extracts.length} old-site content extracts, downloaded ${downloadedImages} images, recovered ${recoveredImages} image original URLs and ${recoveredDocuments} PDF original URLs.`,
);
