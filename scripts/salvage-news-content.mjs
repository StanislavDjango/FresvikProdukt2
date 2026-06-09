import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outputDir = path.join(root, ".generated", "news-content-salvage");
const jsonPath = path.join(root, "NEWS_CONTENT_RECOVERY_AUDIT.json");
const markdownPath = path.join(root, "NEWS_CONTENT_RECOVERY_AUDIT.md");
const contentAuditPath = path.join(root, "MACHINE_READABLE_PAGE_CONTENT_AUDIT.json");
const oldBaseUrl = "https://www.fresvik.no";

const externalHints = new Map([
  [
    "/aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv",
    ["https://www.sogn.no/bu-i-sogn-artiklar/fresvik-ein-god-jobb-og-eit-godt-liv"],
  ],
]);

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
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

function cleanParagraphs(text) {
  const ignored = [
    /^arne-olav lien bardølsgård$/i,
    /^gasta design$/i,
    /^fresvik produkt$/i,
    /^facebook$/i,
    /^linkedin$/i,
    /^godta alle$/i,
    /^registrer deg$/i,
    /^blog-item-content e-content/i,
    /^vi skaper lønnsame nettsider/i,
  ];
  const seen = new Set();
  return text
    .split(/\n{2,}|\n(?=[A-ZÆØÅ0-9])/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter((paragraph) => paragraph.length >= 24)
    .filter((paragraph) => !ignored.some((pattern) => pattern.test(paragraph)))
    .filter((paragraph) => {
      const key = paragraph.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 40);
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

function blogBodyHtml(html) {
  const start = html.indexOf("blog-item-content e-content");
  if (start < 0) return "";
  const articleEnd = html.indexOf("</article>", start);
  return articleEnd > start ? html.slice(start, articleEnd) : html.slice(start);
}

function textBlocksFromHtml(html) {
  const body = blogBodyHtml(html);
  const source = body || html.match(/<body[\s\S]*?<\/body>/i)?.[0] || html;
  return cleanParagraphs(stripTags(source));
}

function linkUrls(html) {
  return [...html.matchAll(/<a\b[^>]+href=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => decodeHtml(match[1]).trim())
    .filter(Boolean)
    .map((href) => {
      try {
        return new URL(href, oldBaseUrl).href;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

async function fetchWithTimeout(url, timeoutMs = 9000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "Fresvik migration content recovery" },
    });
    const text = await response.text();
    return { ok: response.ok, status: response.status, url: response.url, text };
  } finally {
    clearTimeout(timeout);
  }
}

async function waybackSnapshot(url) {
  const variants = [
    url,
    url.replace("https://www.", "https://"),
    url.replace("https://www.", "http://www."),
    `${url}/`,
  ];
  for (const variant of variants) {
    const apiUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(variant)}`;
    try {
      const response = await fetchWithTimeout(apiUrl, 7000);
      if (!response.ok) continue;
      const json = JSON.parse(response.text);
      const closest = json.archived_snapshots?.closest;
      if (closest?.available && closest.url) return closest;
    } catch {
      // Archive lookups are best-effort evidence only.
    }
  }
  return null;
}

async function sourceResult(name, url) {
  try {
    const response = await fetchWithTimeout(url);
    const paragraphs = response.ok ? textBlocksFromHtml(response.text) : [];
    return {
      name,
      url,
      fetchedUrl: response.url,
      httpStatus: response.status,
      paragraphCount: paragraphs.length,
      paragraphs,
      title: metaContent(response.text, "og:title") || metaContent(response.text, "headline"),
      description: metaContent(response.text, "og:description") || metaContent(response.text, "description"),
      links: linkUrls(response.text).slice(0, 40),
      status: response.ok && paragraphs.length > 0 ? "candidate" : "empty-or-unusable",
    };
  } catch (error) {
    return {
      name,
      url,
      httpStatus: null,
      paragraphCount: 0,
      paragraphs: [],
      links: [],
      status: "fetch-failed",
      error: error.message,
    };
  }
}

function markdownTable(headers, rows) {
  const escape = (value) =>
    String(value ?? "")
      .replace(/\|/g, "\\|")
      .replace(/\n/g, "<br>");
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${headers.map((header) => escape(row[header])).join(" | ")} |`),
  ].join("\n");
}

if (!existsSync(contentAuditPath)) {
  throw new Error("Run npm run audit:content before news salvage.");
}

mkdirSync(outputDir, { recursive: true });
const contentAudit = readJson(contentAuditPath);
const targets = [
  ...new Set([
    ...contentAudit.todos
      .filter((todo) => todo.batch === "news")
      .map((todo) => todo.target),
    ...(contentAudit.pages || [])
      .filter((page) => page.batch === "news" && page.status === "unrecoverable")
      .map((page) => page.oldPath),
  ]),
];

const results = [];
for (const target of targets) {
  const oldUrl = `${oldBaseUrl}${target}`;
  const live = await sourceResult("live-old-site", oldUrl);
  const snapshot = await waybackSnapshot(oldUrl);
  const archive = snapshot ? await sourceResult("wayback", snapshot.url) : null;
  const external = [];
  for (const url of externalHints.get(target) || []) {
    external.push(await sourceResult("external-hint", url));
  }
  const candidates = [live, archive, ...external].filter(Boolean);
  const best = candidates
    .filter((candidate) => candidate.paragraphCount > 0)
    .sort((a, b) => b.paragraphCount - a.paragraphCount)[0];
  const status = best
    ? best.name === "live-old-site"
      ? "recoverable-from-live"
      : `recoverable-from-${best.name}`
    : "unrecoverable-from-checked-sources";

  results.push({
    path: target,
    oldUrl,
    status,
    bestSource: best?.url || null,
    live,
    waybackSnapshot: snapshot,
    archive,
    external,
    notes: best
      ? [`Candidate body found from ${best.name}. Manual import/review required before marking migrated.`]
      : [
          "Live old-site article body is empty or unusable.",
          "Wayback availability lookup found no usable body snapshot.",
          external.length === 0
            ? "No external hint is known for this route."
            : "Known external hints did not produce a usable body candidate.",
        ],
  });
}

const audit = {
  generatedAt: new Date().toISOString(),
  targetCount: results.length,
  statusCounts: results.reduce((acc, row) => {
    acc[row.status] = (acc[row.status] || 0) + 1;
    return acc;
  }, {}),
  results,
};

writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);

for (const result of results) {
  writeFileSync(
    path.join(outputDir, `${result.path.replace(/^\//, "").replace(/\//g, "__")}.json`),
    `${JSON.stringify(result, null, 2)}\n`,
  );
}

const rows = results.map((row) => ({
  path: row.path,
  status: row.status,
  live: `${row.live.httpStatus || "n/a"} / ${row.live.paragraphCount}`,
  wayback: row.waybackSnapshot
    ? `${row.waybackSnapshot.status || "n/a"} ${row.archive?.paragraphCount || 0}`
    : "none",
  external: row.external.map((item) => `${item.httpStatus || "n/a"} / ${item.paragraphCount}`).join(", ") || "none",
  bestSource: row.bestSource || "",
  notes: row.notes.join(" "),
}));

const markdown = `# News Content Recovery Audit

Generated: ${audit.generatedAt}

This report checks the remaining news \`needs-review\` queue from \`MACHINE_READABLE_PAGE_CONTENT_AUDIT.json\`. It does not mark pages as migrated automatically; it records whether full body content can be recovered from checked sources.

## Summary

| Metric | Count |
| --- | ---: |
| Targets | ${audit.targetCount} |
${Object.entries(audit.statusCounts)
  .map(([status, count]) => `| ${status} | ${count} |`)
  .join("\n")}

## Results

${markdownTable(["path", "status", "live", "wayback", "external", "bestSource", "notes"], rows)}
`;

writeFileSync(markdownPath, markdown);
console.log(
  `Wrote ${path.relative(root, markdownPath)} and ${path.relative(root, jsonPath)} for ${results.length} news routes.`,
);
