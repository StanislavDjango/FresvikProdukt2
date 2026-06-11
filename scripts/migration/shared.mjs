import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";
import TurndownService from "turndown";

export const root = path.resolve(import.meta.dirname, "..", "..");
export const configPath = path.join(root, "migration.config.json");

export const defaultConfig = {
  siteName: "site",
  oldBaseUrl: "",
  assetDir: "public/assets",
  evidenceDir: "migration/evidence",
  comparisonDir: "migration/comparisons",
  defaultNewBaseUrl: "http://127.0.0.1:3000",
};

export async function loadConfig() {
  if (!existsSync(configPath)) return defaultConfig;
  const parsed = JSON.parse(await readFile(configPath, "utf8"));
  return { ...defaultConfig, ...parsed };
}

export function parseArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) {
      args._.push(arg);
      continue;
    }

    const [rawKey, rawValue] = arg.slice(2).split("=");
    const key = rawKey.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    if (rawValue !== undefined) {
      args[key] = rawValue;
    } else if (argv[index + 1] && !argv[index + 1].startsWith("--")) {
      args[key] = argv[index + 1];
      index += 1;
    } else {
      args[key] = true;
    }
  }
  return args;
}

export function normalizeWhitespace(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

export function normalizeForCompare(value = "") {
  return normalizeWhitespace(value)
    .replace(/([\p{Ll}\p{N}])([\p{Lu}])/gu, "$1 $2")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

export function pageKeyFromUrl(url) {
  const parsed = new URL(url);
  const cleanPath = parsed.pathname.replace(/^\/+|\/+$/g, "") || "root";
  return path.join(parsed.hostname, cleanPath.split("/").map(safePathSegment).join("/"));
}

function safePathSegment(value) {
  return decodeURIComponent(value)
    .replace(/[^\p{L}\p{N}._-]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function evidenceDirFor(config, oldUrl) {
  return path.join(root, config.evidenceDir, pageKeyFromUrl(oldUrl));
}

export function comparisonDirFor(config, oldUrl) {
  return path.join(root, config.comparisonDir, pageKeyFromUrl(oldUrl));
}

export async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

export async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

export async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent":
        "Mozilla/5.0 FresvikMigrationBot/1.0 (+https://www.fresvik.no migration audit)",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} ${response.statusText}: ${url}`);
  }
  return {
    url: response.url,
    status: response.status,
    contentType: response.headers.get("content-type") || "",
    body: await response.text(),
  };
}

export function absoluteUrl(value, baseUrl) {
  try {
    const cleanValue = cleanCandidateUrl(value);
    if (!cleanValue) return "";
    return new URL(cleanValue, baseUrl).toString();
  } catch {
    return "";
  }
}

function cleanCandidateUrl(value = "") {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&quot.*$/g, "")
    .replace(/["'<>].*$/g, "")
    .trim();
}

export function classifyHref(href, baseUrl) {
  if (!href) return "empty";
  if (href === "#") return "placeholder";
  if (href.startsWith("#")) return "anchor";
  if (/^mailto:/i.test(href)) return "email";
  if (/^tel:/i.test(href)) return "phone";

  const url = absoluteUrl(href, baseUrl);
  if (!url) return "invalid";
  const parsed = new URL(url);
  const base = new URL(baseUrl);
  if (/\.(pdf|docx?|xlsx?|pptx?|zip)(\?|#|$)/i.test(parsed.pathname)) return "document";
  if (/\.(jpe?g|png|webp|gif|svg|avif)(\?|#|$)/i.test(parsed.pathname)) return "asset";
  return parsed.hostname === base.hostname ? "internal" : "external";
}

export function extractPage(html, pageUrl) {
  const $ = cheerio.load(html);
  const body = $("body").clone();
  body.find("script, style, noscript, template, svg").remove();

  const title = normalizeWhitespace($("title").first().text());
  const metaDescription = normalizeWhitespace(
    $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      "",
  );

  const headings = $("h1,h2,h3,h4,h5,h6")
    .toArray()
    .map((element) => ({
      level: element.tagName.toLowerCase(),
      text: normalizeWhitespace($(element).text()),
    }))
    .filter((heading) => heading.text);

  const textBlocks = body
    .find("h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,td,th,button")
    .toArray()
    .map((element) => normalizeWhitespace($(element).text()))
    .filter((text) => text.length >= 2);

  const visibleText = unique(textBlocks).join("\n");

  const links = $("a[href]")
    .toArray()
    .map((element) => {
      const href = $(element).attr("href") || "";
      return {
        text: extractLinkText($, element),
        href,
        absoluteUrl: absoluteUrl(href, pageUrl),
        type: classifyHref(href, pageUrl),
      };
    });

  const htmlImageUrls = [
    ...html.matchAll(/https?:\/\/images\.squarespace-cdn\.com\/[^"' <>)]+/gi),
  ].map((match) => match[0].replace(/&amp;/g, "&"));

  const imageCandidates = [];
  $("img,source").each((_, element) => {
    for (const attr of ["src", "data-src", "data-image", "data-large", "data-origin-src"]) {
      const value = $(element).attr(attr);
      if (value) imageCandidates.push(value);
    }
    for (const attr of ["srcset", "data-srcset"]) {
      const value = $(element).attr(attr);
      if (!value) continue;
      for (const part of value.split(",")) {
        const candidate = part.trim().split(/\s+/)[0];
        if (candidate) imageCandidates.push(candidate);
      }
    }
  });

  const images = unique(
    [...imageCandidates, ...htmlImageUrls]
      .map((url) => absoluteUrl(url, pageUrl))
      .map((url) => canonicalImageUrl(url, pageUrl))
      .map(cleanCandidateUrl),
  )
    .filter(Boolean)
    .map((url) => ({
      originalUrl: url,
      filename: filenameFromUrl(url),
      alt: findImageAlt($, url),
    }));

  const documents = links
    .filter((link) => link.type === "document")
    .map((link) => ({
      title: link.text || filenameFromUrl(link.absoluteUrl),
      href: link.href,
      oldUrl: link.absoluteUrl,
      sourcePage: pageUrl,
    }));

  const markdown = new TurndownService({ headingStyle: "atx" }).turndown(body.html() || "");

  return {
    url: pageUrl,
    title,
    metaDescription,
    headings,
    visibleText,
    textBlocks: unique(textBlocks),
    links,
    images,
    documents,
    markdown,
    counts: {
      headings: headings.length,
      textBlocks: unique(textBlocks).length,
      links: links.length,
      images: images.length,
      documents: documents.length,
    },
  };
}

function filenameFromUrl(url) {
  try {
    const parsed = new URL(url);
    const filename = decodeURIComponent(path.basename(parsed.pathname));
    return filename || parsed.hostname;
  } catch {
    return "";
  }
}

function canonicalImageUrl(url, pageUrl) {
  try {
    const parsed = new URL(url);
    if (parsed.pathname === "/_next/image" && parsed.searchParams.get("url")) {
      return absoluteUrl(parsed.searchParams.get("url"), pageUrl);
    }
    return url;
  } catch {
    return url;
  }
}

function extractLinkText($, element) {
  const rawText = normalizeWhitespace($(element).text());
  if (rawText && !rawText.includes("<img")) return rawText;
  const imageAlt = normalizeWhitespace($(element).find("img").first().attr("alt") || "");
  if (imageAlt) return imageAlt;
  return normalizeWhitespace(
    $(element).attr("aria-label") || $(element).attr("title") || "",
  );
}

function findImageAlt($, imageUrl) {
  const basename = filenameFromUrl(imageUrl);
  let alt = "";
  $("img").each((_, element) => {
    const values = ["src", "data-src", "data-image", "data-large", "data-origin-src"]
      .map((attr) => $(element).attr(attr) || "")
      .join(" ");
    if (values.includes(basename) || imageUrl.includes(values)) {
      alt = normalizeWhitespace($(element).attr("alt") || "");
    }
  });
  return alt;
}

export function summarizeCompare(oldPage, newPage) {
  const newText = normalizeForCompare(newPage.visibleText);
  const oldTextBlocks = oldPage.textBlocks.filter(
    (text) => text.length >= 18 && !isIgnorableGlobalText(text),
  );
  const missingTextBlocks = oldTextBlocks.filter(
    (text) => !textBlockCovered(text, newText),
  );

  const newLinks = new Set(newPage.links.map(linkCompareKey));
  const uniqueOldLinks = uniqueBy(oldPage.links, linkCompareKey);
  const missingLinks = uniqueOldLinks.filter((link) => {
    if (["email", "phone", "anchor", "placeholder"].includes(link.type)) return false;
    if (isIgnorableGlobalLink(link)) return false;
    return !newLinks.has(linkCompareKey(link));
  });

  const newImageStems = new Set(newPage.images.map((image) => filenameStem(image.filename)));
  const uniqueOldImages = uniqueBy(oldPage.images, (image) => filenameStem(image.filename)).filter(
    (image) => !isIgnorableGlobalImage(image.filename),
  );
  const missingImages = uniqueOldImages.filter((image) => {
    const stem = filenameStem(image.filename);
    if (!stem || stem.length < 4) return false;
    return !newImageStems.has(stem);
  });

  return {
    status:
      missingTextBlocks.length === 0 && missingLinks.length === 0 && missingImages.length === 0
        ? "migrated"
        : "partial",
    counts: {
      oldTextBlocks: oldTextBlocks.length,
      missingTextBlocks: missingTextBlocks.length,
      oldLinks: uniqueOldLinks.length,
      missingLinks: missingLinks.length,
      oldImages: uniqueOldImages.length,
      missingImages: missingImages.length,
    },
    missingTextBlocks,
    missingLinks,
    missingImages,
  };
}

function uniqueBy(items, keyFn) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const key = keyFn(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

function isIgnorableGlobalImage(filename = "") {
  const stem = filenameStem(filename);
  return stem === "logo" || stem.startsWith("favicon");
}

function isIgnorableGlobalText(text = "") {
  const normalized = normalizeForCompare(text);
  return (
    normalized === "apne meny lukk meny" ||
    normalized === "email address sign up" ||
    normalized === "thank you"
  );
}

function isIgnorableGlobalLink(link) {
  const key = linkCompareKey(link);
  return (
    key === "/cart" ||
    key === "/produkt/fresvik-panel" ||
    key === "/send-foresporsel" ||
    key === "/produkt-mappe" ||
    key === "/kundeservice" ||
    key === "www.facebook.com/profile.php" ||
    key === "www.linkedin.com/company/fresvik-produkt-as"
  );
}

function textBlockCovered(text, normalizedPageText) {
  const normalizedBlock = normalizeForCompare(text);
  if (!normalizedBlock) return true;
  if (normalizedPageText.includes(normalizedBlock)) return true;
  if (normalizedPageText.replace(/\s+/g, "").includes(normalizedBlock.replace(/\s+/g, ""))) {
    return true;
  }

  const words = normalizedBlock.split(" ").filter((word) => word.length >= 3);
  if (words.length < 4) return false;
  const uniqueWords = [...new Set(words)];
  const found = uniqueWords.filter((word) => normalizedPageText.includes(word)).length;
  return found / uniqueWords.length >= 0.82;
}

function linkCompareKey(link) {
  const value = link.absoluteUrl || link.href || "";
  if (link.type === "internal") return pathnameCompareKey(value);
  if (link.type === "document" || link.type === "asset") return fileCompareKey(value);
  return normalizeLinkForCompare(value);
}

function pathnameCompareKey(value = "") {
  try {
    const parsed = new URL(value);
    return parsed.pathname.replace(/\/+$/, "") || "/";
  } catch {
    return value.replace(/\/+$/, "");
  }
}

function fileCompareKey(value = "") {
  try {
    const parsed = new URL(value);
    return filenameStem(path.basename(parsed.pathname));
  } catch {
    return filenameStem(path.basename(value));
  }
}

function normalizeLinkForCompare(value = "") {
  try {
    const parsed = new URL(value);
    return `${parsed.hostname}${parsed.pathname}`.replace(/\/+$/, "");
  } catch {
    return value.replace(/\/+$/, "");
  }
}

function filenameStem(filename = "") {
  return filename
    .toLowerCase()
    .replace(/\.(jpe?g|png|webp|gif|svg|avif)$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
