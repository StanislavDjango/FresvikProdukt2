const baseUrl = process.env.LINK_CHECK_BASE_URL || "http://127.0.0.1:3000";
const maxPages = Number(process.env.LINK_CHECK_MAX_PAGES || 250);
const ignoredPrefixes = [
  "/_next/",
  "/__nextjs",
  "/favicon.ico",
  "/icon.svg",
  "/studio",
];

function normalizeInternalUrl(value) {
  if (!value) return null;
  const trimmed = value.trim();
  if (
    !trimmed ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return null;
  }

  try {
    const url = new URL(trimmed, baseUrl);
    if (url.origin !== new URL(baseUrl).origin) return null;
    if (ignoredPrefixes.some((prefix) => url.pathname.startsWith(prefix))) {
      return null;
    }

    url.hash = "";
    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

function normalizeSitemapUrl(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    return `${url.pathname}${url.search}`;
  } catch {
    return normalizeInternalUrl(value);
  }
}

async function fetchText(path) {
  const response = await fetch(new URL(path, baseUrl), {
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }

  return response.text();
}

async function statusFor(path) {
  const response = await fetch(new URL(path, baseUrl), {
    redirect: "manual",
  });

  return response.status;
}

function extractSitemapPaths(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => normalizeSitemapUrl(match[1]))
    .filter(Boolean);
}

function extractInternalReferences(html) {
  const refs = new Set();
  const attrPattern = /\s(?:href|src)=["']([^"']+)["']/g;

  for (const match of html.matchAll(attrPattern)) {
    const normalized = normalizeInternalUrl(match[1]);
    if (normalized) refs.add(normalized);
  }

  return refs;
}

const sitemapXml = await fetchText("/sitemap.xml");
const sitemapPaths = Array.from(new Set(["/", ...extractSitemapPaths(sitemapXml)]));
const pagePaths = sitemapPaths
  .filter((path) => !path.includes(".") && !path.startsWith("/assets/"))
  .slice(0, maxPages);
const references = new Set(sitemapPaths);

for (const path of pagePaths) {
  const html = await fetchText(path);
  for (const reference of extractInternalReferences(html)) {
    references.add(reference);
  }
}

const failures = [];
for (const path of Array.from(references).sort()) {
  const status = await statusFor(path);
  if (status < 200 || status >= 400) {
    failures.push({ path, status });
  }
}

if (failures.length > 0) {
  console.error("Broken internal links found:");
  for (const failure of failures) {
    console.error(`- ${failure.path}: ${failure.status}`);
  }
  process.exit(1);
}

console.log(
  `Checked ${pagePaths.length} pages and ${references.size} internal URLs from ${baseUrl}.`,
);
