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
    "/referansar/fryserom-baza-fredrikstad",
    {
      title: "Skreddarsydd fryserom til Baza i Fredrikstad",
      description: [
        "Den nye løysinga sikrer driftssikker lagring av frosne varer året rundt.",
        "Fresvik Produkt har levert eit skreddarsydd fryserom til Baza Nordic i Fredrikstad, tilpassa deira behov for effektiv og driftssikker lagring av frosne varer. Løysinga er utvikla med fokus på kvalitet, energieffektivitet og optimal utnytting av tilgjengeleg plass.",
        "Installasjonen blei gjennomført i tett dialog med kunden for å sikre ein saumlaus prosess frå planlegging til ferdigstilling.",
        "Resultatet er eit moderne fryserom som gir Baza auka kapasitet, betre logistikkflyt og stabile lagringsforhold året rundt.",
        "Vi set stor pris på tilliten og samarbeidet med Baza, og er stolte av å bidra til deira vidare vekst.",
      ].join("\n"),
      year: 2026,
      category: "Kjøle- og fryserom",
      location: "Fredrikstad",
      customerType: "Næringsmiddel",
      migratedImagePath: "/assets/fresvik/images/migrated/baza-fryserom-1.jpeg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Skreddarsydd fryserom til Baza i Fredrikstad",
              text: [
                "Den nye løysinga sikrer driftssikker lagring av frosne varer året rundt.",
                "Fresvik Produkt har levert eit skreddarsydd fryserom til Baza Nordic i Fredrikstad, tilpassa deira behov for effektiv og driftssikker lagring av frosne varer. Løysinga er utvikla med fokus på kvalitet, energieffektivitet og optimal utnytting av tilgjengeleg plass.",
                "Installasjonen blei gjennomført i tett dialog med kunden for å sikre ein saumlaus prosess frå planlegging til ferdigstilling.",
                "Resultatet er eit moderne fryserom som gir Baza auka kapasitet, betre logistikkflyt og stabile lagringsforhold året rundt.",
                "Vi set stor pris på tilliten og samarbeidet med Baza, og er stolte av å bidra til deira vidare vekst.",
              ].join("\n"),
              imageAlt: "Baza fryserom i Fredrikstad",
              migratedImagePath: "/assets/fresvik/images/migrated/baza-fryserom-1.jpeg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilder frå prosjektet",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Baza fryserom 1",
              text: "Bilde frå gammal Baza-side.",
              imageAlt: "Baza fryserom prosjektbilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/baza-fryserom-1.jpeg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Baza fryserom 2",
              text: "Bilde frå gammal Baza-side.",
              imageAlt: "Baza fryserom prosjektbilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/Baza+fryserom+-+2.jpeg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Baza fryserom 3",
              text: "Bilde frå gammal Baza-side.",
              imageAlt: "Baza fryserom prosjektbilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/baza-fryserom-3-07c5687883.jpeg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Baza fryserom 4",
              text: "Bilde frå gammal Baza-side.",
              imageAlt: "Baza fryserom prosjektbilde 4",
              migratedImagePath: "/assets/fresvik/images/old-site/baza-fryserom-4-cb6ffaddb9.jpeg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-customer",
              _type: "migrationCard",
              title: "Baza Nordic",
              text: "Kundelenke frå gammal referanseside.",
              href: "https://baza.no/",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Historisk leveranse til Spar Lund Torv",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/historisk-leveranse-pir-panel-spar-lund-torv",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/historisk-leveranse-pir-panel-spar-lund-torv",
    {
      title: "Historisk leveranse til Spar Lund Torv",
      description: [
        "Fresvik Produkt har levert det aller første PIR-prosjektet som er produsert i Norge.",
        "Spar Lund Torv investerte i 2025 i eit nytt fryserom og tre nye kjølerom, i tillegg til nye deleveggar. Fresvik Produkt leverte óg innestengingsalarm og PVC-gardin, i tillegg til pendeldører frå Kvanne Industrier.",
        "Me er den første norske produsenten av tilpassa PIR-Panel med enkel eksenterlås. PIR-Panel er eit sandwichelement med oppskumma PIR-skum (Polyisocyanurat-skum) som kjerne, innkapsla mellom to stålplater. Produktet er SINTEF-godkjent og utvikla i Norge.",
        "Me vil takke Kelvin og Kvanne for et godt samarbeid!",
        "Interessert i å vite mer om våre PIR-produkt? Ta kontakt med salsavdelinga vår.",
      ].join("\n"),
      year: 2025,
      category: "Kjøle- og fryserom",
      location: "Lund Torv",
      customerType: "Daglegvarebutikk",
      migratedImagePath: "/assets/fresvik/images/migrated/spar-lund-torv-fresvik-produkt-1.jpeg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Historisk leveranse til Spar Lund Torv",
              text: [
                "Fresvik Produkt har levert det aller første PIR-prosjektet som er produsert i Norge.",
                "Spar Lund Torv investerte i 2025 i eit nytt fryserom og tre nye kjølerom, i tillegg til nye deleveggar. Fresvik Produkt leverte óg innestengingsalarm og PVC-gardin, i tillegg til pendeldører frå Kvanne Industrier.",
                "Me er den første norske produsenten av tilpassa PIR-Panel med enkel eksenterlås. PIR-Panel er eit sandwichelement med oppskumma PIR-skum (Polyisocyanurat-skum) som kjerne, innkapsla mellom to stålplater. Produktet er SINTEF-godkjent og utvikla i Norge.",
                "Me vil takke Kelvin og Kvanne for et godt samarbeid!",
                "Interessert i å vite mer om våre PIR-produkt? Ta kontakt med salsavdelinga vår.",
              ].join("\n"),
              imageAlt: "Spar Lund Torv prosjektbilde",
              migratedImagePath: "/assets/fresvik/images/migrated/spar-lund-torv-fresvik-produkt-1.jpeg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilde frå prosjektet",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Spar Lund Torv 1",
              text: "Bilde frå gammal Spar Lund Torv-side.",
              imageAlt: "Spar Lund Torv prosjektbilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/spar-lund-torv-fresvik-produkt-1.jpeg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Spar Lund Torv 2",
              text: "Bilde frå gammal Spar Lund Torv-side.",
              imageAlt: "Spar Lund Torv prosjektbilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/spar-lund-torv-fresvik-produkt-2-c2c17be8ad.jpeg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Spar Lund Torv 3",
              text: "Bilde frå gammal Spar Lund Torv-side.",
              imageAlt: "Spar Lund Torv prosjektbilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/spar-lund-torv-fresvik-produkt-3-f164cf8622.jpeg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Spar Lund Torv 4",
              text: "Bilde frå gammal Spar Lund Torv-side.",
              imageAlt: "Spar Lund Torv prosjektbilde 4",
              migratedImagePath: "/assets/fresvik/images/old-site/spar-lund-torv-fresvik-produkt-4-f3d73040e5.jpeg",
            },
            {
              _key: "reference-project-image-4",
              _type: "migrationCard",
              title: "Spar Lund Torv 5",
              text: "Bilde frå gammal Spar Lund Torv-side.",
              imageAlt: "Spar Lund Torv prosjektbilde 5",
              migratedImagePath: "/assets/fresvik/images/old-site/spar-lund-torv-fresvik-produkt-5-e03cc26d6f.jpeg",
            },
            {
              _key: "reference-project-image-5",
              _type: "migrationCard",
              title: "Spar Lund Torv 6",
              text: "Bilde frå gammal Spar Lund Torv-side.",
              imageAlt: "Spar Lund Torv prosjektbilde 6",
              migratedImagePath: "/assets/fresvik/images/old-site/spar-lund-torv-fresvik-produkt-6-3754b65db4.jpeg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-kvanne",
              _type: "migrationCard",
              title: "Kvanne Industrier",
              text: "Leverandørlenke frå gammal referanseside.",
              href: "https://kvanne.no/",
            },
            {
              _key: "reference-project-pir-panel",
              _type: "migrationCard",
              title: "PIR-Panel",
              text: "Produktlenke frå gammal referanseside.",
              href: "/produkt/fresvik-pir-panel",
            },
            {
              _key: "reference-project-contact",
              _type: "migrationCard",
              title: "Ta kontakt med salsavdelinga vår",
              text: "Kontaktlenke frå gammal referanseside.",
              href: "/kontakt",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Skreddarsydd fryserom til Baza i Fredrikstad",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/fryserom-baza-fredrikstad",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Bjerkreim Legekontor: fryselager og kjølerom",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/bjerkreim-legekontor-vikesaa",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/bjerkreim-legekontor-vikesaa",
    {
      title: "Bjerkreim Legekontor: fryselager og kjølerom",
      description: [
        "Fresvik Produkt har levert tilpassa produkt til Bjerkreim Legekontor i Vikeså.",
        "Bygginga starta i september 2023 og prosjektet stod ferdig i juni 2025, klart til bruk. Det ble bygt omsorgsbustadar med 46 leilegheiter fordelt på tre etasjar.",
        "Fresvik Produkt leverte fryselager og kjølerom samt dører til dette prosjektet.",
        "Takk til RK Tekniske for nok eit godt samarbeid!",
      ].join("\n"),
      year: 2025,
      category: "Kjøle- og fryserom",
      location: "Vikeså",
      customerType: "Helse og omsorg",
      migratedImagePath: "/assets/fresvik/images/migrated/bjerkreim-legekontor-1.jpeg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Bjerkreim Legekontor: fryselager og kjølerom",
              text: [
                "Fresvik Produkt har levert tilpassa produkt til Bjerkreim Legekontor i Vikeså.",
                "Bygginga starta i september 2023 og prosjektet stod ferdig i juni 2025, klart til bruk. Det ble bygt omsorgsbustadar med 46 leilegheiter fordelt på tre etasjar.",
                "Fresvik Produkt leverte fryselager og kjølerom samt dører til dette prosjektet.",
                "Takk til RK Tekniske for nok eit godt samarbeid!",
              ].join("\n"),
              imageAlt: "Bjerkreim Legekontor prosjektbilde",
              migratedImagePath: "/assets/fresvik/images/migrated/bjerkreim-legekontor-1.jpeg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilde frå prosjektet",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Bjerkreim Legekontor 1",
              text: "Bilde frå gammal Bjerkreim-side.",
              imageAlt: "Bjerkreim Legekontor prosjektbilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/bjerkreim-legekontor-1.jpeg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Bjerkreim Legekontor 2",
              text: "Bilde frå gammal Bjerkreim-side.",
              imageAlt: "Bjerkreim Legekontor prosjektbilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/bjerkreim-legekontor-2-15392c46d2.jpeg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Bjerkreim Legekontor 3",
              text: "Bilde frå gammal Bjerkreim-side.",
              imageAlt: "Bjerkreim Legekontor prosjektbilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/bjerkreim-legekontor-3-49a0ccc7a5.jpeg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Bjerkreim Legekontor 4",
              text: "Bilde frå gammal Bjerkreim-side.",
              imageAlt: "Bjerkreim Legekontor prosjektbilde 4",
              migratedImagePath: "/assets/fresvik/images/old-site/bjerkreim-legekontor-4-a2734bc915.jpeg",
            },
            {
              _key: "reference-project-image-4",
              _type: "migrationCard",
              title: "Bjerkreim Legekontor 5",
              text: "Bilde frå gammal Bjerkreim-side.",
              imageAlt: "Bjerkreim Legekontor prosjektbilde 5",
              migratedImagePath: "/assets/fresvik/images/old-site/bjerkreim-legekontor-5-670f56525d.jpeg",
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
              title: "Historisk leveranse til Spar Lund Torv",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/historisk-leveranse-pir-panel-spar-lund-torv",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Kjøle- og fryserom til Bunnpris Hammerfest",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/bunnpris-hammerfest",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/bunnpris-hammerfest",
    {
      title: "Kjøle- og fryserom til Bunnpris Hammerfest",
      description: [
        "Bunnpris Hammerfest har fått seg nye rom fra Fresvik Produkt.",
        "Langt nord i vårt vakre land har vi levert eit fryserom og eit kjølerom til meierivarer.",
        "I tillegg til romleveranse, har vi levert innestengningsalarm, frysedør og PVC-gardin til fryserommet.",
        "Takk til Plug-in Norge AS for eit godt samarbeid!",
      ].join("\n"),
      year: 2025,
      category: "Kjøle- og fryserom",
      location: "Hammerfest",
      customerType: "Daglegvarebutikk",
      migratedImagePath: "/assets/fresvik/images/migrated/1000024746.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Kjøle- og fryserom til Bunnpris Hammerfest",
              text: [
                "Bunnpris Hammerfest har fått seg nye rom fra Fresvik Produkt.",
                "Langt nord i vårt vakre land har vi levert eit fryserom og eit kjølerom til meierivarer.",
                "I tillegg til romleveranse, har vi levert innestengningsalarm, frysedør og PVC-gardin til fryserommet.",
                "Takk til Plug-in Norge AS for eit godt samarbeid!",
              ].join("\n"),
              imageAlt: "Bunnpris Hammerfest prosjektbilde",
              migratedImagePath: "/assets/fresvik/images/migrated/1000024746.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilde frå prosjektet",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Bunnpris Hammerfest 1",
              text: "Bilde frå gammal Bunnpris Hammerfest-side.",
              imageAlt: "Bunnpris Hammerfest prosjektbilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/1000024746.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Bunnpris Hammerfest 2",
              text: "Bilde frå gammal Bunnpris Hammerfest-side.",
              imageAlt: "Bunnpris Hammerfest prosjektbilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/1000024748-b7ff43e043.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Bunnpris Hammerfest 3",
              text: "Bilde frå gammal Bunnpris Hammerfest-side.",
              imageAlt: "Bunnpris Hammerfest prosjektbilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/1000024750-95c1c49ec6.jpg",
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
              title: "Bjerkreim Legekontor: fryselager og kjølerom",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/bjerkreim-legekontor-vikesaa",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Bunnpris Volda: Nytt kjølerom med isolert kjøledør",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/kjolerom-kjoledor-bunnpris-volda",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/kjolerom-kjoledor-bunnpris-volda",
    {
      title: "Bunnpris Volda: nytt kjølerom med isolert kjøledør",
      description: [
        "Fresvik Produkt har levert produkt til nok ein fornøgd kunde.",
        "Vi leverte eit nytt kjølerom med kjøledør til nok ein Bunnpris-butikk, no i vakre Volda i Møre og Romsdal. Produkta er levert med standard FoodSafe Polyester-overflater, som gir enkelt reinhald og hindrar bakterievekst.",
        "Takk til Fryst AS for eit godt samarbeid.",
      ].join("\n"),
      year: 2025,
      category: "Kjøle- og fryserom",
      location: "Volda",
      customerType: "Daglegvarebutikk",
      migratedImagePath: "/assets/fresvik/images/migrated/kjlerom-bunnpris-volda-3.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Bunnpris Volda: nytt kjølerom med isolert kjøledør",
              text: [
                "Fresvik Produkt har levert produkt til nok ein fornøgd kunde.",
                "Vi leverte eit nytt kjølerom med kjøledør til nok ein Bunnpris-butikk, no i vakre Volda i Møre og Romsdal. Produkta er levert med standard FoodSafe Polyester-overflater, som gir enkelt reinhald og hindrar bakterievekst.",
                "Takk til Fryst AS for eit godt samarbeid.",
              ].join("\n"),
              imageAlt: "Bunnpris Volda kjølerom med isolert kjøledør",
              migratedImagePath: "/assets/fresvik/images/migrated/kjlerom-bunnpris-volda-3.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilde frå prosjektet",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Bunnpris Volda 1",
              text: "Bilde frå gammal Bunnpris Volda-side.",
              imageAlt: "Bunnpris Volda prosjektbilde 1",
              migratedImagePath: "/assets/fresvik/images/old-site/kj-lerom-bunnpris-volda-1-29c0ec8f7e.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Bunnpris Volda 2",
              text: "Bilde frå gammal Bunnpris Volda-side.",
              imageAlt: "Bunnpris Volda prosjektbilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/kj-lerom-bunnpris-volda-2-d21d3cb590.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Bunnpris Volda 3",
              text: "Bilde frå gammal Bunnpris Volda-side.",
              imageAlt: "Bunnpris Volda prosjektbilde 3",
              migratedImagePath: "/assets/fresvik/images/migrated/kjlerom-bunnpris-volda-3.jpg",
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
              title: "Kjøle- og fryserom til Bunnpris Hammerfest",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/bunnpris-hammerfest",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Nytt stort fryserom til Coop Obs Alnabru",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/fryserom-coop-obs-alnabru",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/fryserom-coop-obs-alnabru",
    {
      title: "Nytt stort fryserom til Coop Obs Alnabru",
      description: [
        "Fresvik Produkt fekk jobben med å levere eit nytt stort fryserom til Coop Obs Alnabru tidlegare i 2024.",
        "I tillegg til fryserommet leverte vi fryseport, PVC-gardin og innestengningsalarm.",
        "Vi takkar for oppdraget og godt samarbeid med Coolteam.",
      ].join("\n"),
      year: 2024,
      category: "Kjøle- og fryserom",
      location: "Alnabru",
      customerType: "Daglegvarebutikk",
      migratedImagePath: "/assets/fresvik/images/migrated/fryserom-obs-alna-3-red.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Nytt stort fryserom til Coop Obs Alnabru",
              text: [
                "Fresvik Produkt fekk jobben med å levere eit nytt stort fryserom til Coop Obs Alnabru tidlegare i 2024.",
                "I tillegg til fryserommet leverte vi fryseport, PVC-gardin og innestengningsalarm.",
                "Vi takkar for oppdraget og godt samarbeid med Coolteam.",
              ].join("\n"),
              imageAlt: "Fryserom til Coop Obs Alnabru",
              migratedImagePath: "/assets/fresvik/images/migrated/fryserom-obs-alna-3-red.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilde frå prosjektet",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Coop Obs Alnabru 1",
              text: "Bilde frå gammal Coop Obs Alnabru-side.",
              imageAlt: "Fryserom Coop Obs Alnabru prosjektbilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/fryserom-obs-alna-3-red.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Coop Obs Alnabru 2",
              text: "Bilde frå gammal Coop Obs Alnabru-side.",
              imageAlt: "Fryserom Coop Obs Alnabru prosjektbilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/fryserom-obs-alna-4-red-2d87e8b63a.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Coop Obs Alnabru 3",
              text: "Bilde frå gammal Coop Obs Alnabru-side.",
              imageAlt: "Fryserom Coop Obs Alnabru prosjektbilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/fryserom-obs-alna-5-red-f01c79a8c6.jpg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-coolteam",
              _type: "migrationCard",
              title: "Coolteam",
              text: "Samarbeidspartnar nemnd på gammal side.",
              href: "https://coolteam.no/",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Bunnpris Volda: Nytt kjølerom med isolert kjøledør",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/kjolerom-kjoledor-bunnpris-volda",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Kjøle- og fryserom til nye Vik helse- og omsorgssenter",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/vik-helse-og-omsorgssenter",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/vik-helse-og-omsorgssenter",
    {
      title: "Kjøle- og fryserom til nye Vik helse- og omsorgssenter",
      description: [
        "Fresvik Produkt har hittil levert 5 kjølerom og 1 fryserom med tilhøyrande dørar.",
        "Ei stor utbygging er på gang i Vik når det nye helse- og omsorgssenteret er under bygging. Etter planen skal bygginga pågå heilt til 2026, men ein del er ferdigstilt og teke i bruk.",
        "Fresvik Produkt er stolt leverandør av kjøle- og fryserom til dette anlegget. Hittil har vi levert 5 kjølerom og 1 fryserom med tilhøyrande dørar.",
        "Dette har vi levert gjennom Sogn Kjøleservice, takk for godt samarbeid.",
        "Fresvik Produkt er stolte over å kunne produsere og levere dette i eigen kommune.",
      ].join("\n"),
      year: 2024,
      category: "Kjøle- og fryserom",
      location: "Vik",
      customerType: "Helse- og omsorgssenter",
      migratedImagePath: "/assets/fresvik/images/migrated/vik-helse-og-sjukeheim-1.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Kjøle- og fryserom til nye Vik helse- og omsorgssenter",
              text: [
                "Fresvik Produkt har hittil levert 5 kjølerom og 1 fryserom med tilhøyrande dørar.",
                "Ei stor utbygging er på gang i Vik når det nye helse- og omsorgssenteret er under bygging. Etter planen skal bygginga pågå heilt til 2026, men ein del er ferdigstilt og teke i bruk.",
                "Fresvik Produkt er stolt leverandør av kjøle- og fryserom til dette anlegget. Hittil har vi levert 5 kjølerom og 1 fryserom med tilhøyrande dørar.",
                "Dette har vi levert gjennom Sogn Kjøleservice, takk for godt samarbeid.",
                "Fresvik Produkt er stolte over å kunne produsere og levere dette i eigen kommune.",
              ].join("\n"),
              imageAlt: "Kjøle- og fryserom til Vik helse- og omsorgssenter",
              migratedImagePath: "/assets/fresvik/images/migrated/vik-helse-og-sjukeheim-1.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilde frå prosjektet",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Vik helse- og omsorgssenter 1",
              text: "Bilde frå gammal Vik helse- og omsorgssenter-side.",
              imageAlt: "Vik helse- og omsorgssenter prosjektbilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/vik-helse-og-sjukeheim-1.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Vik helse- og omsorgssenter 2",
              text: "Bilde frå gammal Vik helse- og omsorgssenter-side.",
              imageAlt: "Vik helse- og omsorgssenter prosjektbilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/vik-helse-og-sjukeheim-2-9d84f6c72a.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Vik helse- og omsorgssenter 3",
              text: "Bilde frå gammal Vik helse- og omsorgssenter-side.",
              imageAlt: "Vik helse- og omsorgssenter prosjektbilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/vik-helse-og-sjukeheim-3-741bbf0fef.jpg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Vik helse- og omsorgssenter 4",
              text: "Bilde frå gammal Vik helse- og omsorgssenter-side.",
              imageAlt: "Vik helse- og omsorgssenter prosjektbilde 4",
              migratedImagePath: "/assets/fresvik/images/old-site/vik-helse-og-sjukeheim-4-f1a14468b8.jpg",
            },
            {
              _key: "reference-project-image-4",
              _type: "migrationCard",
              title: "Vik helse- og omsorgssenter 5",
              text: "Bilde frå gammal Vik helse- og omsorgssenter-side.",
              imageAlt: "Vik helse- og omsorgssenter prosjektbilde 5",
              migratedImagePath: "/assets/fresvik/images/old-site/vik-helse-og-sjukeheim-5-549411dc5b.jpg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-sogn-kjoleservice",
              _type: "migrationCard",
              title: "Sogn Kjøleservice",
              text: "Samarbeidspartnar nemnd på gammal side.",
              href: "https://www.sognkulde.no/",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Nytt stort fryserom til Coop Obs Alnabru",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/fryserom-coop-obs-alnabru",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Nok ein Kiwi-butikk får nye fryse- og kjølerom",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/fryse-og-kjolerom-kiwi-otta",
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
