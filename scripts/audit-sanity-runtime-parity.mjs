import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { createClient } from "next-sanity";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const tempDir = path.join(root, ".generated", "sanity-runtime-parity-cjs");
const jsonPath = path.join(root, "MACHINE_READABLE_SANITY_RUNTIME_PARITY_AUDIT.json");
const markdownPath = path.join(root, "SANITY_RUNTIME_PARITY_AUDIT.md");
const contentPagesPath = path.join(root, "src", "sanity", "lib", "contentPages.ts");

function loadEnvFile(fileName) {
  const filePath = path.join(root, fileName);
  if (!existsSync(filePath)) return;

  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.trim().replace(/^['"]|['"]$/g, "");
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

function envValue(key) {
  const value = process.env[key];
  return value && value !== "replacewithsanityprojectid" ? value : "";
}

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

function loadPagesModule() {
  compileTs(
    path.join(root, "src", "data", "oldSiteInventory.ts"),
    path.join(tempDir, "node_modules", "@", "data", "oldSiteInventory.js"),
  );
  compileTs(
    path.join(root, "src", "data", "oldSiteContentExtract.ts"),
    path.join(tempDir, "node_modules", "@", "data", "oldSiteContentExtract.js"),
  );
  compileTs(path.join(root, "src", "data", "pages.ts"), path.join(tempDir, "pages.js"));
  return require(path.join(tempDir, "pages.js"));
}

function localMigrationStructurePaths() {
  const source = readFileSync(contentPagesPath, "utf8");
  const match = source.match(
    /const localMigrationStructurePaths = new Set(?:<[^>]+>)?\(\[([\s\S]*?)\]\);/,
  );
  if (!match) {
    throw new Error("Could not read localMigrationStructurePaths from src/sanity/lib/contentPages.ts");
  }

  return [...match[1].matchAll(/"([^"]+)"/g)].map(([, value]) => value);
}

function previousAuditedRoutes() {
  if (!existsSync(jsonPath)) return [];
  try {
    const parsed = JSON.parse(readFileSync(jsonPath, "utf8"));
    return (parsed.routes || []).map((route) => route.route).filter(Boolean);
  } catch {
    return [];
  }
}

function slugForPath(route) {
  if (route === "/") return "home";
  return route.replace(/^\/+|\/+$/g, "") || "home";
}

function words(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/[^a-z0-9æøå]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort();
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

function pageRefs(page, key) {
  if (!page) return [];
  return unique([
    ...(page.cards || []).map((card) => card[key]),
    ...(page.sections || []).flatMap((section) =>
      (section.items || []).map((item) => item[key]),
    ),
  ]);
}

function pageLinks(page) {
  return unique(pageRefs(page, "href"));
}

function pageLocalImages(page) {
  return pageRefs(page, "imageUrl").filter((value) => value.startsWith("/assets/fresvik/"));
}

function pageLocalDocuments(page) {
  return pageLinks(page).filter((value) => value.startsWith("/assets/fresvik/documents/"));
}

function blockText(blocks) {
  return (blocks || [])
    .filter((block) => block?._type === "block")
    .map((block) => (block.children || []).map((child) => child.text || "").join(""))
    .filter(Boolean)
    .join("\n");
}

function sanityDocText(doc, indexItems) {
  if (!doc && indexItems.length === 0) return "";
  return [
    doc?.title,
    doc?.intro,
    doc?.excerpt,
    doc?.shortDescription,
    doc?.description,
    doc?.seoTitle,
    doc?.seoDescription,
    blockText(doc?.body),
    ...(doc?.features || []),
    ...(doc?.applications || []),
    ...(doc?.technicalData || []).flatMap((item) => [item.label, item.value]),
    ...(doc?.processSteps || []).flatMap((item) => [item.title, item.text]),
    ...(doc?.documents || []).flatMap((item) => [
      item.title,
      item.category,
      item.description,
      item.externalUrl,
      item.fileUrl,
      item.localPath,
    ]),
    ...(doc?.migrationCards || []).flatMap((item) => [
      item.title,
      item.text,
      item.href,
      item.meta,
      item.fileUrl,
    ]),
    ...(doc?.migrationSections || []).flatMap((section) => [
      section.title,
      section.intro,
      ...(section.items || []).flatMap((item) => [
        item.title,
        item.text,
        item.href,
        item.meta,
        item.fileUrl,
      ]),
    ]),
    ...indexItems.flatMap((item) => [
      item.title,
      item.name,
      item.text,
      item.excerpt,
      item.description,
      item.intro,
      item.role,
      item.location,
      item.phone,
      item.email,
      item.date,
      item.year,
      item.category,
      item.fileUrl,
      item.externalUrl,
      item.localPath,
    ]),
  ]
    .filter(Boolean)
    .join("\n");
}

function sanityImageRefs(doc, indexItems) {
  return unique([
    doc?.imageRef,
    doc?.imageUrl,
    ...(doc?.migrationCards || []).flatMap((item) => [item.imageRef, item.imageUrl]),
    ...(doc?.migrationSections || []).flatMap((section) =>
      (section.items || []).flatMap((item) => [item.imageRef, item.imageUrl]),
    ),
    ...(indexItems || []).flatMap((item) => [item.imageRef, item.imageUrl]),
  ]);
}

function sanityFileRefs(doc, indexItems) {
  return unique([
    ...(doc?.documents || []).flatMap((item) => [item.fileRef, item.fileUrl]),
    ...(doc?.migrationCards || []).flatMap((item) => [item.fileRef, item.fileUrl]),
    ...(doc?.migrationSections || []).flatMap((section) =>
      (section.items || []).flatMap((item) => [item.fileRef, item.fileUrl]),
    ),
    ...(indexItems || []).flatMap((item) => [item.fileRef, item.fileUrl]),
  ]);
}

function sanityLocalBackupRefs(doc, indexItems) {
  return unique([
    doc?.migratedImagePath,
    ...(doc?.documents || []).map((item) => item.localPath),
    ...(doc?.migrationCards || []).flatMap((item) => [
      item.migratedImagePath,
      item.migrationLocalDocumentPath,
      item.migrationBackupLocalPath,
    ]),
    ...(doc?.migrationSections || []).flatMap((section) =>
      (section.items || []).flatMap((item) => [
        item.migratedImagePath,
        item.migrationLocalDocumentPath,
        item.migrationBackupLocalPath,
      ]),
    ),
    ...(indexItems || []).map((item) => item.localPath),
  ].filter((value) => value?.startsWith?.("/assets/fresvik/")));
}

function statusFor(row) {
  const blockers = [];
  const warnings = [];
  if (!row.sanityDocumentFound) blockers.push("missing Sanity document");
  if (row.localWords > 0 && row.textCoverageRatio < 0.95) {
    blockers.push(`text coverage ${Math.round(row.textCoverageRatio * 100)}%`);
  }
  if (row.localImageCount > row.sanityImageRefCount) {
    blockers.push(`Sanity image refs ${row.sanityImageRefCount}/${row.localImageCount}`);
  }
  if (row.localDocumentCount > row.sanityFileRefCount) {
    blockers.push(`Sanity file refs ${row.sanityFileRefCount}/${row.localDocumentCount}`);
  }
  if (row.localAssetBackupRefCount > 0) {
    warnings.push(`${row.localAssetBackupRefCount} local backup asset ref(s) kept for source traceability`);
  }
  return {
    status: blockers.length === 0 ? "ready-for-sanity-runtime" : "local-fallback-required",
    blockers,
    warnings,
  };
}

function markdownTable(rows) {
  const lines = [
    "| Route | Runtime mode | Status | Local words | Sanity words | Text % | Local images | Sanity images | Local PDFs | Sanity files | Notes |",
    "| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
  ];

  for (const row of rows) {
    lines.push(
      `| ${[
        `\`${row.route}\``,
        row.runtimeMode,
        row.status,
        row.localWords,
        row.sanityWords,
        `${Math.round(row.textCoverageRatio * 100)}%`,
        row.localImageCount,
        row.sanityImageRefCount,
        row.localDocumentCount,
        row.sanityFileRefCount,
        [...row.blockers, ...row.warnings].join("; ") || "Can be tested without local fallback.",
      ].join(" | ")} |`,
    );
  }

  return lines.join("\n");
}

function createSanityClient() {
  const required = [
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
    "NEXT_PUBLIC_SANITY_DATASET",
    "NEXT_PUBLIC_SANITY_API_VERSION",
  ];
  const missing = required.filter((key) => !envValue(key));
  if (missing.length > 0) {
    throw new Error(`Missing required Sanity env var(s): ${missing.join(", ")}`);
  }

  return createClient({
    projectId: envValue("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: envValue("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: envValue("NEXT_PUBLIC_SANITY_API_VERSION"),
    token: envValue("SANITY_AUTH_TOKEN") || undefined,
    useCdn: false,
  });
}

const CONTENT_DOC_QUERY = `*[
  _type in ["page", "product", "service", "newsArticle", "referenceProject"] &&
  slug.current == $slug
][0]{
  _id,
  _type,
  title,
  "slug": slug.current,
  intro,
  body,
  seoTitle,
  seoDescription,
  sourceUrl,
  migratedImagePath,
  excerpt,
  date,
  shortDescription,
  features,
  technicalData,
  applications,
  processSteps,
  ctaText,
  description,
  year,
  category,
  location,
  customerType,
  "imageRef": coalesce(heroImage.asset._ref, image.asset._ref),
  "imageUrl": coalesce(heroImage.asset->url, image.asset->url),
  "documents": documents[]->{
    title,
    category,
    description,
    externalUrl,
    localPath,
    "fileRef": file.asset._ref,
    "fileUrl": file.asset->url
  },
  "migrationCards": migrationCards[]{
    title,
    text,
    href,
    meta,
    imageAlt,
    migratedImagePath,
    migrationLocalDocumentPath,
    migrationBackupLocalPath,
    "imageRef": image.asset._ref,
    "imageUrl": image.asset->url,
    "fileRef": file.asset._ref,
    "fileUrl": file.asset->url
  },
  "migrationSections": migrationSections[]{
    title,
    intro,
    "items": items[]{
      title,
      text,
      href,
      meta,
      imageAlt,
      migratedImagePath,
      migrationLocalDocumentPath,
      migrationBackupLocalPath,
      "imageRef": image.asset._ref,
      "imageUrl": image.asset->url,
      "fileRef": file.asset._ref,
      "fileUrl": file.asset->url
    }
  }
}`;

const INDEX_QUERIES = new Map([
  [
    "/aktuelt",
    `*[_type == "newsArticle"] | order(date desc, title asc) {
      title,
      "slug": slug.current,
      excerpt,
      date,
      "imageRef": image.asset._ref,
      "imageUrl": image.asset->url
    }`,
  ],
  [
    "/referansar",
    `*[_type == "referenceProject"] | order(year desc, title asc) {
      title,
      "slug": slug.current,
      description,
      year,
      category,
      location,
      "imageRef": image.asset._ref,
      "imageUrl": image.asset->url
    }`,
  ],
  [
    "/produkt",
    `*[_type == "product"] | order(title asc) {
      title,
      "slug": slug.current,
      intro,
      shortDescription,
      "imageRef": heroImage.asset._ref,
      "imageUrl": heroImage.asset->url
    }`,
  ],
  [
    "/tenester",
    `*[_type == "service"] | order(title asc) {
      title,
      "slug": slug.current,
      intro,
      "imageRef": image.asset._ref,
      "imageUrl": image.asset->url
    }`,
  ],
  [
    "/dokumentasjon",
    `*[_type == "documentFile"] | order(category asc, title asc) {
      title,
      category,
      description,
      externalUrl,
      localPath,
      "fileRef": file.asset._ref,
      "fileUrl": file.asset->url
    }`,
  ],
  [
    "/monteringsanvisning",
    `*[_type == "documentFile" && (
      lower(category) match "*mont*" ||
      lower(title) match "*mont*"
    )] | order(category asc, title asc) {
      title,
      category,
      description,
      externalUrl,
      localPath,
      "fileRef": file.asset._ref,
      "fileUrl": file.asset->url
    }`,
  ],
  [
    "/tilsette",
    `*[_type == "employee"] | order(order asc, name asc) {
      "title": name,
      role,
      location,
      phone,
      email,
      "imageRef": image.asset._ref,
      "imageUrl": image.asset->url
    }`,
  ],
  [
    "/kundeservice/faq",
    `*[_type == "faqItem"] | order(order asc, question asc) {
      "title": question,
      "text": pt::text(answer),
      category
    }`,
  ],
]);

async function fetchIndexItems(client, route) {
  const query = INDEX_QUERIES.get(route);
  if (!query) return [];
  return client.fetch(query, {});
}

async function main() {
  const { getContentPage } = loadPagesModule();
  const client = createSanityClient();
  const protectedRoutes = new Set(localMigrationStructurePaths());
  const routes = unique([...protectedRoutes, ...previousAuditedRoutes()]);

  const rows = [];
  for (const route of routes) {
    const fallbackPage = getContentPage(route);
    const [doc, indexItems] = await Promise.all([
      client.fetch(CONTENT_DOC_QUERY, { slug: slugForPath(route) }),
      fetchIndexItems(client, route),
    ]);

    const localText = pageText(fallbackPage);
    const sanityText = sanityDocText(doc, indexItems);
    const localWords = words(localText).length;
    const sanityWords = words(sanityText).length;
    const textCoverageRatio =
      localWords === 0 ? 1 : Number(Math.min(sanityWords / localWords, 1).toFixed(3));
    const localImages = pageLocalImages(fallbackPage);
    const localDocuments = pageLocalDocuments(fallbackPage);
    const localLinks = pageLinks(fallbackPage);
    const sanityImages = sanityImageRefs(doc, indexItems);
    const sanityFiles = sanityFileRefs(doc, indexItems);
    const sanityBackupRefs = sanityLocalBackupRefs(doc, indexItems);

    const baseRow = {
      route,
      runtimeMode: protectedRoutes.has(route)
        ? "local-fallback-protected"
        : "sanity-runtime-switched",
      localPageFound: Boolean(fallbackPage),
      sanityDocumentFound: Boolean(doc),
      sanityType: doc?._type || null,
      indexItemCount: indexItems.length,
      localWords,
      sanityWords,
      textCoverageRatio,
      localImageCount: localImages.length,
      sanityImageRefCount: sanityImages.length,
      localDocumentCount: localDocuments.length,
      sanityFileRefCount: sanityFiles.length,
      localLinkCount: localLinks.length,
      localAssetBackupRefCount: sanityBackupRefs.length,
      localImages,
      sanityImages,
      localDocuments,
      sanityFiles,
      localLinks,
      sanityBackupRefs,
    };
    rows.push({ ...baseRow, ...statusFor(baseRow) });
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    auditedRoutes: rows.length,
    fallbackProtectedRoutes: rows.filter(
      (row) => row.runtimeMode === "local-fallback-protected",
    ).length,
    sanityRuntimeSwitchedRoutes: rows.filter(
      (row) => row.runtimeMode === "sanity-runtime-switched",
    ).length,
    readyForSanityRuntime: rows.filter((row) => row.status === "ready-for-sanity-runtime").length,
    localFallbackRequired: rows.filter((row) => row.status === "local-fallback-required").length,
    routesWithBackupWarnings: rows.filter((row) => row.warnings.length > 0).length,
    localFallbackSource: "src/sanity/lib/contentPages.ts localMigrationStructurePaths",
    rule:
      "A route is ready only when Sanity has enough text plus image/file refs to replace the local migration structure without losing visible content.",
  };

  const todos = rows
    .filter((row) => row.status !== "ready-for-sanity-runtime")
    .map((row) => ({
      route: row.route,
      status: row.status,
      blockers: row.blockers,
      warnings: row.warnings,
      nextAction:
        "Enrich Sanity schema/seed/import for this route before removing it from localMigrationStructurePaths.",
    }));

  const audit = { summary, routes: rows, todos };
  writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);

  const markdown = `# Sanity Runtime Parity Audit

Generated: ${summary.generatedAt}

## Summary

- Audited runtime candidate routes: ${summary.auditedRoutes}
- Still protected by local fallback: ${summary.fallbackProtectedRoutes}
- Already switched to Sanity runtime: ${summary.sanityRuntimeSwitchedRoutes}
- Ready for Sanity runtime: ${summary.readyForSanityRuntime}
- Still requiring local fallback: ${summary.localFallbackRequired}
- Fallback source: \`${summary.localFallbackSource}\`

This audit does not change runtime behavior. It checks whether removing a route
from \`localMigrationStructurePaths\` would lose local migrated text, images,
PDFs/documents, or links.

## Route Parity

${markdownTable(rows)}

## Blockers

${
  todos.length === 0
    ? "No blockers found."
    : todos
        .map((todo) => `- \`${todo.route}\`: ${todo.blockers.join("; ")}`)
        .join("\n")
}

## Next Actions

${
  summary.localFallbackRequired === 0
    ? summary.fallbackProtectedRoutes === 0
      ? `- All audited runtime routes are running through Sanity runtime without parity blockers.
- Next step: verify the deployed Vercel production alias and then plan source-traceability/local-cache cleanup as a separate phase.
- Keep \`migrationBackupLocalPath\`, \`migratedImagePath\`, and \`migrationLocalDocumentPath\` until final source-traceability cleanup.`
      : `- ${summary.sanityRuntimeSwitchedRoutes} route(s) are already running through Sanity runtime without parity blockers.
- Next step: remove the next small batch from \`localMigrationStructurePaths\`, run build/link checks, and compare rendered pages before removing the full fallback list.
- Keep \`migrationBackupLocalPath\`, \`migratedImagePath\`, and \`migrationLocalDocumentPath\` until final source-traceability cleanup.`
    : `- Keep protected routes in \`localMigrationStructurePaths\` until this report shows \`ready-for-sanity-runtime\`.
- Enrich Sanity schemas/seed with section/card/image/document structures for routes where local fallback is still required.
- Re-run \`npm run audit:sanity-runtime\` after each Sanity model or seed change.`
}
`;

  writeFileSync(markdownPath, markdown);
  console.log(
    `Wrote ${path.relative(root, markdownPath)} and ${path.relative(root, jsonPath)} (${summary.readyForSanityRuntime}/${summary.auditedRoutes} ready).`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
