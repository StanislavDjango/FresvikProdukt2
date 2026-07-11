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

function cleanObject(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => {
      if (entryValue === undefined || entryValue === null) return false;
      if (Array.isArray(entryValue) && entryValue.length === 0) return false;
      return entryValue !== "";
    }),
  );
}

function migrationCard(card, key) {
  const localImagePath = card.imageUrl?.startsWith("/assets/fresvik/")
    ? card.imageUrl
    : undefined;
  const localDocumentPath = card.href?.startsWith("/assets/fresvik/documents/")
    ? card.href
    : undefined;

  return cleanObject({
    _key: key,
    _type: "migrationCard",
    title: card.title,
    text: card.text,
    href: card.href,
    meta: card.meta,
    imageAlt: card.imageAlt,
    migratedImagePath: localImagePath,
    migrationLocalDocumentPath: localDocumentPath,
  });
}

function migrationCards(page) {
  return page.cards.map((card, index) =>
    migrationCard(card, `card-${index}`),
  );
}

function migrationSections(page) {
  return page.sections.map((section, sectionIndex) =>
    cleanObject({
      _key: `section-${sectionIndex}`,
      _type: "migrationSection",
      title: section.title,
      intro: section.intro,
      items: section.items.map((item, itemIndex) =>
        migrationCard(item, `section-${sectionIndex}-item-${itemIndex}`),
      ),
    }),
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
      migrationCards: migrationCards(page),
      migrationSections: migrationSections(page),
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
      migrationCards: migrationCards(page),
      migrationSections: migrationSections(page),
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
    migrationCards: migrationCards(page),
    migrationSections: migrationSections(page),
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

const referenceProjectOverrides = new Map([
  [
    "/referansar/2014/7/8/coop-extra-sogndal",
    {
      title: "Coop Extra Sogndal",
      description:
        "Fresvik Produkt har levert og montert kjøle- og fryserom til heile butikken. Totalt ca. 800 m² panel.",
      year: 2014,
      category: "Kjøle- fryserom butikk",
      location: "Sogndal",
      customerType: "Daglegvarebutikk",
      migratedImagePath: "/assets/fresvik/images/migrated/coop-extra-sogndal.jpeg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Coop Extra Sogndal",
              text:
                "Fresvik Produkt har levert og montert kjøle- og fryserom til heile butikken. Totalt ca. 800 m² panel.",
              meta: "7. juli 2014",
              imageAlt: "Coop Extra Sogndal kjøle- og fryserom",
              migratedImagePath: "/assets/fresvik/images/migrated/coop-extra-sogndal.jpeg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilde frå gammal side",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Coop Extra Sogndal prosjektbilde 1",
              text: "Bilde frå gammal Coop Extra Sogndal-side.",
              imageAlt: "Coop Extra Sogndal kjøle- og fryserom",
              migratedImagePath: "/assets/fresvik/images/migrated/coop-extra-sogndal.jpeg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Coop Extra Sogndal prosjektbilde 2",
              text: "Bilde frå gammal Coop Extra Sogndal-side.",
              imageAlt: "Coop Extra Sogndal kjøle- og fryserom",
              migratedImagePath: "/assets/fresvik/images/old-site/image-asset-4ee32b3e77.jpeg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Coop Extra Sogndal prosjektbilde 3",
              text: "Bilde frå gammal Coop Extra Sogndal-side.",
              imageAlt: "Coop Extra Sogndal kjøle- og fryserom",
              migratedImagePath: "/assets/fresvik/images/old-site/image-asset-5bcf6cf645.jpeg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-contact",
              _type: "migrationCard",
              title: "Ta kontakt",
              text: "Gammal side lenka vidare til salsavdeling for meir informasjon.",
              href: "/kontakt",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Interfrukt",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/2014/7/8/interfrukt-vrt-strste-prosjekt",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/2014/7/8/interfrukt-vrt-strste-prosjekt",
    {
      title: "Interfrukt",
      description: [
        "På Langhus i Ski kommune har Anthon B. Nilsen bygd nytt grossistlager for frukt-og grønt på heile 21 300 kvadratmeter for Interfrukt SA.",
        "Interfrukt framleiger til ni ulike frukt-aktørar og det nye grossistlageret inneheld tørrlager, kjølelager, fryselager samt kontordel.",
        "Vi i Fresvik Produkt vart valt som leverandør av frys- og kjøleveggar i prosjektet, der Norske Stålbygg var totalentreprenør. Det er store dimensjonar på bygget, vår leveranse bestod av heile 16.500 kvm kjøle- og frysepanelar.",
        "- Den største utfordringa var høgda på 10,5 meter. Vi produserer panel på 8 meter, så panela måtte skøytast, men med not og fjør i panel-endane oppnår vi god styrke.",
        "Montasjen pågjekk i perioden august til desember 2013, og gjekk smertefritt seier vår prosjektleiar Arek Lekki.",
        "Ønskjer du meir informasjon om våre produkt - kontakt vår salsavdeling.",
      ].join("\n"),
      year: 2014,
      category: "Fasadepanel",
      location: "Langhus",
      customerType: "Grossistlager for frukt og grønt",
      migratedImagePath: "/assets/fresvik/images/migrated/interfrukt-langhus.webp",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Interfrukt",
              text: [
                "På Langhus i Ski kommune har Anthon B. Nilsen bygd nytt grossistlager for frukt-og grønt på heile 21 300 kvadratmeter for Interfrukt SA.",
                "Interfrukt framleiger til ni ulike frukt-aktørar og det nye grossistlageret inneheld tørrlager, kjølelager, fryselager samt kontordel.",
                "Vi i Fresvik Produkt vart valt som leverandør av frys- og kjøleveggar i prosjektet, der Norske Stålbygg var totalentreprenør. Det er store dimensjonar på bygget, vår leveranse bestod av heile 16.500 kvm kjøle- og frysepanelar.",
                "- Den største utfordringa var høgda på 10,5 meter. Vi produserer panel på 8 meter, så panela måtte skøytast, men med not og fjør i panel-endane oppnår vi god styrke.",
                "Montasjen pågjekk i perioden august til desember 2013, og gjekk smertefritt seier vår prosjektleiar Arek Lekki.",
                "Ønskjer du meir informasjon om våre produkt - kontakt vår salsavdeling.",
              ].join("\n\n"),
              meta: "9. juli 2014",
              imageAlt: "Grossistlager for Interfrukt på Langhus",
              migratedImagePath: "/assets/fresvik/images/migrated/interfrukt-langhus.webp",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilde frå gammal side",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Interfrukt prosjektbilde 1",
              text: "Bilde frå gammal Interfrukt-side.",
              imageAlt: "Grossistlager for Interfrukt på Langhus",
              migratedImagePath: "/assets/fresvik/images/migrated/interfrukt-langhus.webp",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Interfrukt prosjektbilde 2",
              text: "Bilde frå gammal Interfrukt-side.",
              imageAlt: "Interfrukt kjøle- og frysepanel",
              migratedImagePath: "/assets/fresvik/images/old-site/image-asset-72273e78e1.jpeg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Interfrukt prosjektbilde 3",
              text: "Bilde frå gammal Interfrukt-side.",
              imageAlt: "Interfrukt kjøle- og frysepanel",
              migratedImagePath: "/assets/fresvik/images/old-site/image-asset-fb046a8b70.jpeg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Interfrukt prosjektbilde 4",
              text: "Bilde frå gammal Interfrukt-side.",
              imageAlt: "Interfrukt kjøle- og frysepanel",
              migratedImagePath: "/assets/fresvik/images/old-site/image-asset-1d4ca4e9fd.jpeg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-contact",
              _type: "migrationCard",
              title: "Ta kontakt",
              text: "Gammal side lenka vidare til salsavdeling for meir informasjon.",
              href: "/kontakt",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Coop Extra Naustdal",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/fryserom-med-fryseport-til-coop-extra-naustdal",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Coop Extra Sogndal",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/2014/7/8/coop-extra-sogndal",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/celsa-steel-sotra",
    {
      title: "Celsa Steel Service, Sotra",
      description: [
        "Den 18. april begynte vi fasadeprosjektet på Celsa Steel Service AS sitt nye bygg på Sotra. Celsa Steel Service er ein av dei store aktørane på armeringsstål i Norge, og har åtte avdelingar i landet.",
        "Hovudentreprenøren er Brødrene Ulveseth AS.",
        "Det nye produksjonsanlegget på Straume er 3250 kvadratmeter, og vi sto for levering og montering av 2600 kvadratmeter fasadepanel med mineralull-kjerne, beslag og 16 stk. vinduer.",
        "Vårt prosjekt vart avslutta den 19.mai, og i oktober skal stålbedrifta flytte inn i sitt nye produksjonsanlegg.",
      ].join("\n"),
      year: 2014,
      category: "Fasadepanel",
      location: "Straume/Sotra",
      customerType: "Produksjonsanlegg",
      migratedImagePath: "/assets/fresvik/images/migrated/dsc-2579.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Celsa Steel Service, Sotra",
              text: [
                "Den 18. april begynte vi fasadeprosjektet på Celsa Steel Service AS sitt nye bygg på Sotra. Celsa Steel Service er ein av dei store aktørane på armeringsstål i Norge, og har åtte avdelingar i landet.",
                "Hovudentreprenøren er Brødrene Ulveseth AS.",
                "Det nye produksjonsanlegget på Straume er 3250 kvadratmeter, og vi sto for levering og montering av 2600 kvadratmeter fasadepanel med mineralull-kjerne, beslag og 16 stk. vinduer.",
                "Vårt prosjekt vart avslutta den 19.mai, og i oktober skal stålbedrifta flytte inn i sitt nye produksjonsanlegg.",
              ].join("\n\n"),
              meta: "26. juni 2014",
              imageAlt: "Celsa Steel Service sitt produksjonsanlegg på Sotra",
              migratedImagePath: "/assets/fresvik/images/migrated/dsc-2579.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilde frå gammal side",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Celsa Steel Service prosjektbilde 1",
              text: "Bilde frå gammal Celsa-side.",
              imageAlt: "Celsa Steel Service sitt produksjonsanlegg på Sotra",
              migratedImagePath: "/assets/fresvik/images/migrated/dsc-2579.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Celsa Steel Service prosjektbilde 2",
              text: "Bilde frå gammal Celsa-side.",
              imageAlt: "Fasadeprosjekt for Celsa Steel Service",
              migratedImagePath: "/assets/fresvik/images/old-site/dsc-2482-6376a08a05.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Celsa Steel Service prosjektbilde 3",
              text: "Bilde frå gammal Celsa-side.",
              imageAlt: "Fasadeprosjekt for Celsa Steel Service",
              migratedImagePath: "/assets/fresvik/images/old-site/dsc-2671-bd36a37fac.jpg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Celsa Steel Service prosjektbilde 4",
              text: "Bilde frå gammal Celsa-side.",
              imageAlt: "Fasadeprosjekt for Celsa Steel Service",
              migratedImagePath: "/assets/fresvik/images/old-site/dsc-2677-27266e77f0.jpg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Fiskehallen",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/fiskehallen",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Buskerud Storcash",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/buskerud-storcash",
            },
          ],
        },
      ],
    },
  ],
]);

oldSiteReferences.forEach((item) => {
  const extract = getOldSiteContentExtract(item.href);
  const bodyText =
    extract?.bodyParagraphs?.length > 0
      ? extract.bodyParagraphs.join("\n")
      : referenceByHref.get(item.href) || "";
  const override = referenceProjectOverrides.get(item.href);
  add({
    _id: slugId("referenceProject", item.href),
    _type: "referenceProject",
    title: override?.title || item.title,
    slug: { _type: "slug", current: slugCurrent(item.href) },
    description: override?.description || bodyText,
    year: override?.year || ((extract?.publishedAt || item.lastmod)
      ? Number((extract?.publishedAt || item.lastmod).slice(0, 4))
      : undefined),
    category: override?.category,
    location: override?.location,
    customerType: override?.customerType,
    migratedImagePath: override?.migratedImagePath || extract?.imageUrls?.[0] || item.imageUrl,
    migrationSections: override?.migrationSections,
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
