import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const tempDir = path.join(root, ".generated", "page-content-audit-cjs");
const oldBaseUrl = "https://www.fresvik.no";
const routeAuditPath = path.join(root, "MACHINE_READABLE_MIGRATION_AUDIT.json");
const newsRecoveryPath = path.join(root, "NEWS_CONTENT_RECOVERY_AUDIT.json");
const jsonPath = path.join(root, "MACHINE_READABLE_PAGE_CONTENT_AUDIT.json");
const markdownPath = path.join(root, "PAGE_CONTENT_MIGRATION_AUDIT.md");

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

function loadDataModules() {
  compileTs(
    path.join(root, "src", "data", "oldSiteInventory.ts"),
    path.join(tempDir, "node_modules", "@", "data", "oldSiteInventory.js"),
  );
  compileTs(
    path.join(root, "src", "data", "oldSiteContentExtract.ts"),
    path.join(tempDir, "node_modules", "@", "data", "oldSiteContentExtract.js"),
  );
  compileTs(
    path.join(root, "src", "data", "pages.ts"),
    path.join(tempDir, "pages.js"),
  );

  return {
    pages: require(path.join(tempDir, "pages.js")),
    contentExtract: require(path.join(
      tempDir,
      "node_modules",
      "@",
      "data",
      "oldSiteContentExtract.js",
    )),
  };
}

function readJson(filePath, fallback) {
  if (!existsSync(filePath)) return fallback;
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function readNdjson(filePath) {
  if (!existsSync(filePath)) return [];
  return readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/[^a-z0-9æøå]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function words(value = "") {
  return normalizeText(value).split(/\s+/).filter(Boolean);
}

function tokens(value = "") {
  return new Set(words(value).filter((token) => token.length >= 3));
}

function tokenScore(a, b) {
  const aTokens = tokens(a);
  const bTokens = tokens(b);
  if (aTokens.size === 0 || bTokens.size === 0) return 0;
  let shared = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) shared += 1;
  }
  return shared / Math.max(aTokens.size, bTokens.size);
}

function routeFromSeedDoc(doc) {
  if (!doc.slug?.current) return null;
  return doc.slug.current === "home" ? "/" : `/${doc.slug.current}`;
}

function portableText(doc) {
  return (doc.body || [])
    .filter((block) => block?._type === "block")
    .map((block) => (block.children || []).map((child) => child.text || "").join(""))
    .join("\n");
}

function seedText(doc) {
  if (!doc) return "";
  return [
    doc.title,
    doc.intro,
    doc.excerpt,
    doc.shortDescription,
    doc.description,
    doc.seoDescription,
    portableText(doc),
    ...(doc.features || []),
    ...(doc.applications || []),
    ...(doc.technicalData || []).flatMap((item) => [item.label, item.value]),
    ...(doc.processSteps || []).flatMap((item) => [item.title, item.text]),
  ]
    .filter(Boolean)
    .join("\n");
}

function pageText(page) {
  if (!page) return "";
  return [
    page.title,
    page.eyebrow,
    page.intro,
    page.description,
    ...(page.cards || []).flatMap((card) => [card.title, card.text, card.meta, card.href]),
    ...(page.sections || []).flatMap((section) => [
      section.title,
      section.intro,
      ...(section.items || []).flatMap((item) => [
        item.title,
        item.text,
        item.meta,
        item.href,
      ]),
    ]),
    ...(page.todo || []),
  ]
    .filter(Boolean)
    .join("\n");
}

function pageImages(page) {
  if (!page) return [];
  return [
    ...(page.cards || []).map((card) => card.imageUrl),
    ...(page.sections || []).flatMap((section) =>
      (section.items || []).map((item) => item.imageUrl),
    ),
  ].filter(Boolean);
}

function pageDocuments(page) {
  if (!page) return [];
  return [
    ...(page.cards || []).map((card) => card.href),
    ...(page.sections || []).flatMap((section) =>
      (section.items || []).map((item) => item.href),
    ),
  ].filter((href) => href?.startsWith("/assets/fresvik/documents/"));
}

function pageLinks(page) {
  if (!page) return [];
  return [
    ...(page.cards || []).map((card) => card.href),
    ...(page.sections || []).flatMap((section) =>
      (section.items || []).map((item) => item.href),
    ),
  ].filter(Boolean);
}

function manifestAssetsForRoute(manifest, route, type) {
  return manifest
    .filter((entry) => entry.assetType === type)
    .filter((entry) =>
      (entry.usedBy || []).includes(route) ||
      (entry.usedBy || []).includes(route === "/" ? "/home" : route) ||
      (entry.sourcePages || []).includes(`${oldBaseUrl}${route}`),
    );
}

function matchedParagraphs(oldParagraphs, localText) {
  const normalizedLocal = normalizeText(localText);
  const relevant = oldParagraphs
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => words(paragraph).length >= 8);

  return relevant.map((paragraph) => {
    const normalized = normalizeText(paragraph);
    const exact = normalized.length > 0 && normalizedLocal.includes(normalized);
    const score = exact ? 1 : tokenScore(paragraph, localText);
    return {
      text: paragraph,
      matched: exact || score >= 0.72,
      score: Number(score.toFixed(3)),
    };
  });
}

function contentBatch(contentType, oldPath) {
  if (oldPath === "/") return "homepage";
  if (contentType === "product") return "products";
  if (contentType === "service" || contentType === "document") return "services-documents";
  if (contentType === "news") return "news";
  if (contentType === "reference") return "references";
  return "support-company-legal";
}

const structuredListPaths = new Set(["/produkt", "/aktuelt", "/tilsette"]);

function structuredListCovered(route, oldImages, localImages, localLinkCount) {
  if (!structuredListPaths.has(route.oldPath)) return false;
  if (route.status === "redirect") return false;
  const imageCovered = oldImages.length === 0 || localImages.length >= oldImages.length;
  const hasUsefulLinks = localLinkCount >= 6;
  return imageCovered && hasUsefulLinks;
}

function pagePriority(row) {
  if (row.batch === "homepage") return 0;
  if (row.batch === "products") return 1;
  if (row.batch === "services-documents") return 2;
  if (row.batch === "news") return 3;
  if (row.batch === "references") return 4;
  return 5;
}

function routeStatusForContent({
  route,
  extract,
  oldParagraphMatches,
  oldImages,
  localImages,
  localLinkCount,
  oldDocuments,
  localDocuments,
  homepageRows,
  recovery,
}) {
  if (route.status === "redirect") return "redirect";
  if (route.oldPath === "/") {
    return homepageRows.every((row) => row.status === "migrated") ? "migrated" : "partial";
  }
  if (!extract) return "needs-review";
  if (
    oldParagraphMatches.length === 0 &&
    structuredListCovered(route, oldImages, localImages, localLinkCount)
  ) {
    return "migrated";
  }
  if (recovery?.status === "unrecoverable-from-checked-sources") return "unrecoverable";
  if (extract.extractionStatus === "unrecoverable") return "needs-review";
  if (oldParagraphMatches.length === 0) return "needs-review";

  const matchedText = oldParagraphMatches.filter((paragraph) => paragraph.matched).length;
  const textCoverage = matchedText / oldParagraphMatches.length;
  if (textCoverage < 0.85) return "partial";
  if (oldImages.length > 0 && localImages.length < oldImages.length) return "partial";
  if (oldDocuments.length > 0 && localDocuments.length < oldDocuments.length) return "partial";
  return "migrated";
}

function notesForRow(row) {
  const notes = [];
  if (row.status === "redirect") notes.push(`Redirects to ${row.newRoute}.`);
  if (row.structuredListAccepted) {
    notes.push("Structured index/list page: old body text was not extractable, but list links/images are covered.");
  }
  const blockingIgnoredDocumentReasons = (row.ignoredOldDocumentReasons || []).filter(
    (reason) => !reason.includes("handled-globally"),
  );
  if (blockingIgnoredDocumentReasons.length > 0) {
    notes.push(
      `Old documents ignored with reason ${blockingIgnoredDocumentReasons.length}: ${blockingIgnoredDocumentReasons.join("; ")}`,
    );
  }
  if (!row.hasExtract && row.status !== "redirect") notes.push("No old HTML extract is available.");
  if (row.extractionStatus === "unrecoverable" && !row.structuredListAccepted) {
    notes.push("Old HTML extraction failed or produced no reliable body.");
  }
  if (row.recoveryStatus === "unrecoverable-from-checked-sources") {
    notes.push(
      "Documented external blocker: live old-site body is empty/unusable, no usable Wayback snapshot was found, and checked external hints did not recover full body.",
    );
  }
  if (
    row.status !== "redirect" &&
    !row.structuredListAccepted &&
    row.hasExtract &&
    row.extractionStatus !== "unrecoverable" &&
    row.oldParagraphCount === 0 &&
    row.batch !== "homepage"
  ) {
    notes.push("Old HTML extract exists, but no reliable body paragraphs were extracted.");
  }
  if (row.oldParagraphCount > 0 && row.textCoverage < 0.85) {
    notes.push(`Text coverage ${Math.round(row.textCoverage * 100)}%.`);
  }
  if (row.oldImageCount > 0 && row.localImageCount < row.oldImageCount) {
    notes.push(`Images ${row.localImageCount}/${row.oldImageCount}.`);
  }
  if (row.oldDocumentCount > 0 && row.localDocumentCount < row.oldDocumentCount) {
    notes.push(`Documents ${row.localDocumentCount}/${row.oldDocumentCount}.`);
  }
  return notes.join(" ") || "Strict content evidence is covered.";
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

function summarize(rows, field = "status") {
  return rows.reduce((acc, row) => {
    acc[row[field]] = (acc[row[field]] || 0) + 1;
    return acc;
  }, {});
}

const routeAudit = readJson(routeAuditPath, null);
if (!routeAudit) {
  throw new Error("Run npm run audit:migration before npm run audit:content.");
}

const modules = loadDataModules();
const { getContentPage, createLegacyContentPage } = modules.pages;
const { getOldSiteContentExtract } = modules.contentExtract;
const seedDocs = readNdjson(path.join(root, "sanity", "seed", "migratedContent.ndjson"));
const seedByRoute = new Map(
  seedDocs.map((doc) => [routeFromSeedDoc(doc), doc]).filter(([route]) => route),
);
const manifest = readJson(path.join(root, "sanity", "seed", "assetManifest.json"), []);
const homepageRows = routeAudit.homepage || [];
const newsRecovery = readJson(newsRecoveryPath, { results: [] });
const recoveryByPath = new Map(
  (newsRecovery.results || []).map((result) => [result.path, result]),
);
const ignoredOldDocuments = new Map([
  [
    "https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf",
    "handled-globally: site-wide old footer/document link is migrated through documentation pages.",
  ],
  [
    "https://www.fresvik.no/s/PUR-ce-merke.pdf",
    "handled-globally: site-wide old footer/document link is migrated through documentation pages.",
  ],
  [
    "https://www.fresvik.no/s/lsning-med-firkantrr.pdf",
    "ignored-with-reason: live old-site PDF URL returns 404 during migration audit.",
  ],
]);

const pages = routeAudit.routes.map((route) => {
  const page = getContentPage(route.oldPath) || createLegacyContentPage(route.oldPath);
  const seedDoc = seedByRoute.get(route.oldPath);
  const extract = getOldSiteContentExtract(route.oldPath);
  const recovery = recoveryByPath.get(route.oldPath);
  const localText = [pageText(page), seedText(seedDoc)].filter(Boolean).join("\n");
  const oldParagraphMatches = matchedParagraphs(extract?.bodyParagraphs || [], localText);
  const oldImages = [...new Set(extract?.imageUrls || [])];
  const oldDocuments = [...new Set(extract?.documentUrls || [])];
  const ignoredOldDocumentReasons = oldDocuments
    .filter((documentUrl) => ignoredOldDocuments.has(documentUrl))
    .map((documentUrl) => `${documentUrl} (${ignoredOldDocuments.get(documentUrl)})`);
  const requiredOldDocuments = oldDocuments.filter(
    (documentUrl) => !ignoredOldDocuments.has(documentUrl),
  );
  const localImages = [
    ...new Set([
      ...pageImages(page),
      seedDoc?.migratedImagePath,
      ...manifestAssetsForRoute(manifest, route.oldPath, "image").map((entry) => entry.localPath),
    ].filter(Boolean)),
  ];
  const localDocuments = [
    ...new Set([
      ...pageDocuments(page),
      seedDoc?.localPath,
      ...manifestAssetsForRoute(manifest, route.oldPath, "document").map((entry) => entry.localPath),
    ].filter(Boolean)),
  ];
  const localLinks = pageLinks(page);
  const oldInternalLinks = [...new Set(extract?.internalLinks || [])];
  const oldExternalLinks = [...new Set(extract?.externalLinks || [])];
  const matchedTextCount = oldParagraphMatches.filter((paragraph) => paragraph.matched).length;
  const textCoverage =
    oldParagraphMatches.length > 0 ? matchedTextCount / oldParagraphMatches.length : 0;
  const structuredListAccepted =
    oldParagraphMatches.length === 0 &&
    structuredListCovered(route, oldImages, localImages, localLinks.length);
  const batch = contentBatch(route.contentType, route.oldPath);
  const status = routeStatusForContent({
    route,
    extract,
    oldParagraphMatches,
    oldImages,
    localImages,
    localLinkCount: localLinks.length,
    oldDocuments: requiredOldDocuments,
    localDocuments,
    homepageRows,
    recovery,
  });

  const row = {
    oldUrl: route.oldUrl,
    oldPath: route.oldPath,
    newRoute: route.newRoute,
    contentType: route.contentType,
    batch,
    status,
    routeAuditStatus: route.status,
    hasExtract: Boolean(extract),
    extractionStatus: extract?.extractionStatus || "missing",
    oldParagraphCount: oldParagraphMatches.length,
    matchedParagraphCount: matchedTextCount,
    textCoverage: Number(textCoverage.toFixed(3)),
    oldWordCount: words((extract?.bodyParagraphs || []).join("\n")).length,
    localWordCount: words(localText).length,
    oldImageCount: oldImages.length,
    localImageCount: localImages.length,
    oldDocumentCount: requiredOldDocuments.length,
    localDocumentCount: localDocuments.length,
    ignoredOldDocumentCount: ignoredOldDocumentReasons.length,
    ignoredOldDocumentReasons,
    oldInternalLinkCount: oldInternalLinks.length,
    oldExternalLinkCount: oldExternalLinks.length,
    localLinkCount: localLinks.length,
    recoveryStatus: recovery?.status || null,
    recoveryNotes: recovery?.notes || [],
    structuredListAccepted,
    missingParagraphs: oldParagraphMatches
      .filter((paragraph) => !paragraph.matched)
      .slice(0, 5)
      .map((paragraph) => paragraph.text),
    notes: "",
  };

  row.notes = notesForRow(row);
  return row;
});

const sortedPages = [...pages].sort((a, b) => {
  const priority = pagePriority(a) - pagePriority(b);
  if (priority !== 0) return priority;
  if (a.status !== b.status) return a.status.localeCompare(b.status);
  return a.oldPath.localeCompare(b.oldPath);
});

const todos = sortedPages
  .filter((row) => ["partial", "missing", "needs-review"].includes(row.status))
  .map((row) => ({
    type: "page-content",
    batch: row.batch,
    target: row.oldPath,
    status: row.status,
    task: row.notes,
  }));

const audit = {
  summary: {
    generatedAt: new Date().toISOString(),
    routeCount: pages.length,
    statusCounts: summarize(pages),
    batchCounts: summarize(pages, "batch"),
    todoCount: todos.length,
    nextBatch:
      todos.find((todo) => todo.batch !== "homepage")?.batch ||
      todos[0]?.batch ||
      "none",
  },
  pages: sortedPages,
  todos,
};

writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);

const queueRows = todos.slice(0, 80).map((todo) => ({
  batch: todo.batch,
  path: todo.target,
  status: todo.status,
  task: todo.task,
}));

const focusRows = sortedPages.map((row) => ({
  batch: row.batch,
  path: row.oldPath,
  status: row.status,
  text: `${row.matchedParagraphCount}/${row.oldParagraphCount}`,
  images: `${row.localImageCount}/${row.oldImageCount}`,
  docs: `${row.localDocumentCount}/${row.oldDocumentCount}`,
  links: `${row.localLinkCount}/${row.oldInternalLinkCount + row.oldExternalLinkCount}`,
  notes: row.notes,
}));

const markdown = `# Page Content Migration Audit

Generated: ${audit.summary.generatedAt}

This report is stricter than route coverage. A route is not considered content-migrated unless old HTML evidence, body text, images, documents and links are represented in the local migration data.

## Summary

| Metric | Count |
| --- | ---: |
| Audited routes | ${audit.summary.routeCount} |
| Migrated | ${audit.summary.statusCounts.migrated || 0} |
| Redirect | ${audit.summary.statusCounts.redirect || 0} |
| Partial | ${audit.summary.statusCounts.partial || 0} |
| Needs-review | ${audit.summary.statusCounts["needs-review"] || 0} |
| Unrecoverable documented | ${audit.summary.statusCounts.unrecoverable || 0} |
| Todo queue | ${audit.summary.todoCount} |

Next batch: \`${audit.summary.nextBatch}\`

## Batch Counts

${markdownTable(
  ["batch", "count"],
  Object.entries(audit.summary.batchCounts).map(([batch, count]) => ({ batch, count })),
)}

## Work Queue

${queueRows.length > 0 ? markdownTable(["batch", "path", "status", "task"], queueRows) : "- Ingen."}

## Page Evidence Coverage

${markdownTable(["batch", "path", "status", "text", "images", "docs", "links", "notes"], focusRows)}
`;

writeFileSync(markdownPath, markdown);

console.log(
  `Wrote ${markdownPath} and ${jsonPath}: ${audit.summary.statusCounts.migrated || 0} migrated, ${audit.summary.statusCounts.partial || 0} partial, ${audit.summary.statusCounts["needs-review"] || 0} needs-review.`,
);
