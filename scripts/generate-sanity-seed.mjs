import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const tempDir = path.join(root, ".generated", "sanity-seed-cjs");
const seedPath = path.join(root, "sanity", "seed", "migratedContent.ndjson");

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

function slugId(prefix, value) {
  return `${prefix}-${value
    .replace(/^\/+/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "home"}`;
}

function slugCurrent(slug) {
  return slug === "/" ? "home" : slug.replace(/^\/+/, "");
}

function blocks(text) {
  return String(text || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => ({
      _key: `block-${index}`,
      _type: "block",
      style: "normal",
      children: [
        {
          _key: `span-${index}`,
          _type: "span",
          text: line,
          marks: [],
        },
      ],
      markDefs: [],
    }));
}

function cardToText(card) {
  return [card.title, card.text].filter(Boolean).join(": ");
}

function pageBody(page) {
  return blocks(
    [
      page.intro,
      ...page.cards.map(cardToText),
      ...page.sections.flatMap((section) => [
        section.title,
        section.intro,
        ...section.items.map(cardToText),
      ]),
    ]
      .filter(Boolean)
      .join("\n"),
  );
}

function pageImage(page) {
  return (
    page.cards.find((card) => card.imageUrl)?.imageUrl ||
    page.sections
      .flatMap((section) => section.items)
      .find((item) => item.imageUrl)?.imageUrl
  );
}

function documentCategory(title) {
  const lowered = title.toLowerCase();
  if (lowered.includes("montering")) return "Monteringsanvisning";
  if (
    lowered.includes("sintef") ||
    lowered.includes("godkjenning") ||
    lowered.includes("ytelse") ||
    lowered.includes("cpr")
  ) {
    return "Sertifikat";
  }
  if (lowered.includes("openheitslova")) return "Juridisk";
  if (lowered.includes("produkt") || lowered.includes("pir")) {
    return "Produktdokumentasjon";
  }
  return "Anna";
}

function documentCategoryFor(card) {
  return documentCategory(`${card.title} ${card.text || ""} ${card.href || ""}`);
}

rmSync(tempDir, { recursive: true, force: true });
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

const {
  oldSiteEmployees,
  oldSiteFaqItems,
  oldSiteNews,
  oldSiteReferences,
} = require(path.join(tempDir, "node_modules", "@", "data", "oldSiteInventory.js"));
const { getOldSiteContentExtract } = require(path.join(
  tempDir,
  "node_modules",
  "@",
  "data",
  "oldSiteContentExtract.js",
));
const { getContentPage, getAllContentPages } = require(path.join(tempDir, "pages.js"));

const docs = [];
const seenIds = new Set();

function add(doc) {
  if (seenIds.has(doc._id)) return;
  seenIds.add(doc._id);
  docs.push(doc);
}

add({
  _id: "siteSettings",
  _type: "siteSettings",
  siteName: "Fresvik Produkt",
  mainEmail: "post@fresvik.no",
  mainPhone: "+47 57 69 83 00",
  address: ["Fresvikvegen 995", "6896 Fresvik"],
  footerText:
    "Fresvik Produkt AS leverer isolerte panel, kjøle- og fryseløysingar, montasje og service til norske prosjekt.",
  newsletterText:
    "Meld deg på nyheitsbrev for tips og inspirasjon frå bransjen.",
  seoDefaults: {
    title: "Fresvik Produkt",
    description:
      "Isolerte panel, portar, dører, montasje og service til norske prosjekt.",
  },
});

const pages = getAllContentPages();
for (const page of pages) {
  const image = pageImage(page);
  if (page.pageType === "product") {
    const technicalSection = page.sections.find((section) =>
      /tekniske data/i.test(section.title),
    );
    add({
      _id: slugId("product", page.slug),
      _type: "product",
      title: page.title,
      slug: { _type: "slug", current: slugCurrent(page.slug) },
      intro: page.intro,
      shortDescription: page.description,
      features: page.sections
        .flatMap((section) => section.items.map((item) => item.title))
        .slice(0, 12),
      technicalData: technicalSection?.items.map((item, index) => ({
        _key: `technical-${index}`,
        label: item.title,
        value: item.text,
      })),
      applications: page.cards.map((card) => card.title),
      seoTitle: page.title,
      seoDescription: page.description,
      sourceUrl: page.sourceUrl,
      migratedImagePath: image,
    });
    continue;
  }

  if (page.pageType === "service") {
    add({
      _id: slugId("service", page.slug),
      _type: "service",
      title: page.title,
      slug: { _type: "slug", current: slugCurrent(page.slug) },
      intro: page.intro,
      body: pageBody(page),
      processSteps: page.sections.flatMap((section) =>
        section.items.map((item, index) => ({
          _key: `${slugId("step", section.title)}-${index}`,
          title: item.title,
          text: item.text,
        })),
      ),
      ctaText: "Kontakt Fresvik Produkt for meir informasjon.",
      seoTitle: page.title,
      seoDescription: page.description,
      sourceUrl: page.sourceUrl,
      migratedImagePath: image,
    });
    continue;
  }

  add({
    _id: slugId("page", page.slug),
    _type: "page",
    title: page.title,
    slug: { _type: "slug", current: slugCurrent(page.slug) },
    intro: page.intro,
    body: pageBody(page),
    seoTitle: page.title,
    seoDescription: page.description,
    sourceUrl: page.sourceUrl,
    migratedImagePath: image,
  });
}

const faqPage = getContentPage("/kundeservice/faq");
const faqByQuestion = new Map(
  faqPage.sections.flatMap((section) =>
    section.items.map((item) => [item.title, item.text]),
  ),
);
oldSiteFaqItems.forEach((item, index) => {
  add({
    _id: slugId("faq", item.title),
    _type: "faqItem",
    question: item.title,
    answer: blocks(faqByQuestion.get(item.title) || ""),
    category: "Kundeservice",
    order: index + 1,
  });
});

oldSiteEmployees.forEach((employee, index) => {
  add({
    _id: slugId("employee", employee.title),
    _type: "employee",
    name: employee.title,
    role: employee.role,
    location: employee.location,
    phone: employee.phone || employee.mobile,
    email: employee.email,
    order: index + 1,
    migratedImagePath: employee.imageUrl,
  });
});

const newsPage = getContentPage("/aktuelt");
const newsByHref = new Map(
  newsPage.sections.flatMap((section) =>
    section.items.map((item) => [item.href, item.text]),
  ),
);
oldSiteNews.forEach((item) => {
  const extract = getOldSiteContentExtract(item.href);
  const bodyText =
    extract?.bodyParagraphs?.length > 0
      ? extract.bodyParagraphs.join("\n")
      : newsByHref.get(item.href) || "";
  add({
    _id: slugId("newsArticle", item.href),
    _type: "newsArticle",
    title: item.title,
    slug: { _type: "slug", current: slugCurrent(item.href) },
    date: extract?.publishedAt?.slice(0, 10) || item.lastmod,
    excerpt: extract?.description || newsByHref.get(item.href),
    body: blocks(bodyText),
    seoTitle: item.title,
    seoDescription: extract?.description || newsByHref.get(item.href),
    migratedImagePath: extract?.imageUrls?.[0] || item.imageUrl,
    sourceUrl: extract?.sourceUrl || `https://www.fresvik.no${item.href}`,
  });
});

const referencesPage = getContentPage("/referansar");
const referenceByHref = new Map(
  referencesPage.sections.flatMap((section) =>
    section.items.map((item) => [item.href, item.text]),
  ),
);
oldSiteReferences.forEach((item) => {
  const extract = getOldSiteContentExtract(item.href);
  const bodyText =
    extract?.bodyParagraphs?.length > 0
      ? extract.bodyParagraphs.join("\n")
      : referenceByHref.get(item.href) || "";
  add({
    _id: slugId("referenceProject", item.href),
    _type: "referenceProject",
    title: item.title,
    slug: { _type: "slug", current: slugCurrent(item.href) },
    description: bodyText,
    year: (extract?.publishedAt || item.lastmod)
      ? Number((extract?.publishedAt || item.lastmod).slice(0, 4))
      : undefined,
    migratedImagePath: extract?.imageUrls?.[0] || item.imageUrl,
    sourceUrl: extract?.sourceUrl || `https://www.fresvik.no${item.href}`,
  });
});

for (const page of pages) {
  for (const card of [
    ...page.cards,
    ...page.sections.flatMap((section) => section.items),
  ]) {
    if (!card.href?.startsWith("/assets/fresvik/documents/")) continue;
    add({
      _id: slugId("documentFile", card.href),
      _type: "documentFile",
      title: card.title,
      category: documentCategoryFor(card),
      localPath: card.href,
      description: card.text,
      language: /english/i.test(card.title) ? "Norsk/English" : "Norsk",
    });
  }
}

docs.sort((a, b) => a._id.localeCompare(b._id));
writeFileSync(seedPath, docs.map((doc) => JSON.stringify(doc)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to ${path.relative(root, seedPath)}`);
