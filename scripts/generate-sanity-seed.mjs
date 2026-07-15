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
const newsArticleOverrides = new Map([
  [
    "/aktuelt/samaneh-shakeri-ny-teknisk-sjef",
    {
      imageAlt: "Samaneh Shakeri, ny teknisk sjef i Fresvik Produkt.",
      author: {
        name: "Ingvild Hagen",
        text:
          "Ingvild er digital marknadsførar i Gasta design & kommunikasjon. Ho jobbar fast med mange av kundane våre, og er eksperten vår på digital annonsering.",
        email: "ingvild@gasta.no",
      },
      previous: {
        title: "Ledig stilling: Seljar - arbeidsstad Fresvik",
        href: "/aktuelt/ledig-stilling-seljar-arbeidsstad-fresvik-2026",
      },
      next: {
        title: "Ny teknisk teiknar på plass",
        href: "/aktuelt/ny-teknisk-teiknar-havard-berdal",
      },
    },
  ],
  [
    "/aktuelt/ledig-stilling-seljar-arbeidsstad-fresvik-2026",
    {
      imageAlt: "Fresvik Produkt produksjonsmiljø.",
      recoveryNote:
        "Denne gamle nyheitssida er bevart som rute, men brødteksten er ikkje synleg i live HTML. Tittel, publiseringsdato, forfattar, bilde og neste-lenke er bevart frå gammal side.",
      author: {
        name: "Ingvild Hagen",
        text:
          "Ingvild er digital marknadsførar i Gasta design & kommunikasjon. Ho jobbar fast med mange av kundane våre, og er eksperten vår på digital annonsering.",
        email: "ingvild@gasta.no",
      },
      next: {
        title: "Møt vår nye tekniske sjef",
        href: "/aktuelt/samaneh-shakeri-ny-teknisk-sjef",
      },
    },
  ],
  [
    "/aktuelt/ny-teknisk-teiknar-havard-berdal",
    {
      imageAlt: "Håvard Berdal er ny teknisk teiknar.",
      author: {
        name: "Ingvild Hagen",
        text:
          "Ingvild er digital marknadsførar i Gasta design & kommunikasjon. Ho jobbar fast med mange av kundane våre, og er eksperten vår på digital annonsering.",
        email: "ingvild@gasta.no",
      },
      previous: {
        title: "Møt vår nye tekniske sjef",
        href: "/aktuelt/samaneh-shakeri-ny-teknisk-sjef",
      },
      next: {
        title: "John Bøthun blir pensjonist",
        href: "/aktuelt/john-bothun-blir-pensjonist",
      },
    },
  ],
]);

function newsMigrationSections(item, extract, bodyText, override) {
  if (!override) return undefined;

  const publishedAt = extract?.publishedAt
    ? new Date(extract.publishedAt).toLocaleDateString("nn-NO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : item.lastmod;
  const imagePath = extract?.imageUrls?.[0] || item.imageUrl;

  return [
    {
      _key: "news-article-main",
      _type: "migrationSection",
      title: "Nyheit frå gammal side",
      intro: `Publisert ${publishedAt}.`,
      items: [
        {
          _key: "news-article-main-text",
          _type: "migrationCard",
          title: item.title,
          text: bodyText || override.recoveryNote || "",
          meta: override.imageAlt,
          imageAlt: override.imageAlt,
          migratedImagePath: imagePath,
        },
      ],
    },
    override.author
      ? {
          _key: "news-article-author",
          _type: "migrationSection",
          title: "Forfattar frå gammal side",
          items: [
            {
              _key: "news-article-author-main",
              _type: "migrationCard",
              title: override.author.name,
              text: override.author.text,
              href: `mailto:${override.author.email}`,
              meta: override.author.email,
            },
          ],
        }
      : undefined,
    override.previous || override.next
      ? {
          _key: "news-article-links",
          _type: "migrationSection",
          title: "Navigasjon frå gammal side",
          items: [
            override.previous
              ? {
                  _key: "news-article-prev",
                  _type: "migrationCard",
                  title: override.previous.title,
                  text: "Forrige nyheit frå gammal side.",
                  href: override.previous.href,
                }
              : undefined,
            override.next
              ? {
                  _key: "news-article-next",
                  _type: "migrationCard",
                  title: override.next.title,
                  text: "Neste nyheit frå gammal side.",
                  href: override.next.href,
                }
              : undefined,
          ].filter(Boolean),
        }
      : undefined,
  ].filter(Boolean);
}

oldSiteNews.forEach((item) => {
  const extract = getOldSiteContentExtract(item.href);
  const override = newsArticleOverrides.get(item.href);
  const bodyText =
    extract?.bodyParagraphs?.length > 0
      ? extract.bodyParagraphs.join("\n")
      : extract?.extractionStatus === "unrecoverable"
        ? override?.recoveryNote || extract.description || ""
        : newsByHref.get(item.href) || "";
  add({
    _id: slugId("newsArticle", item.href),
    _type: "newsArticle",
    title: item.title,
    slug: { _type: "slug", current: slugCurrent(item.href) },
    date: extract?.publishedAt?.slice(0, 10) || item.lastmod,
    excerpt:
      extract?.extractionStatus === "unrecoverable"
        ? override?.recoveryNote || extract.description
        : extract?.description || newsByHref.get(item.href),
    body: blocks(bodyText),
    seoTitle: item.title,
    seoDescription:
      extract?.extractionStatus === "unrecoverable"
        ? override?.recoveryNote || extract.description
        : extract?.description || newsByHref.get(item.href),
    migratedImagePath: extract?.imageUrls?.[0] || item.imageUrl,
    migrationSections: newsMigrationSections(item, extract, bodyText, override),
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
    "/referansar/fryse-og-kjolerom-kiwi-otta",
    {
      title: "Nok ein Kiwi-butikk får nye fryse- og kjølerom",
      description: [
        "Fresvik Produkt har levert fryse- og kjølerom til nok ein Kiwi-butikk, denne gongen i flotte Otta, nord i Gudbrandsdalen.",
        "Her har vi levert eitt fryserom med frysedør, innestengningsalarm og PVC-gardin, samt 4 kjølerom med både våre eigne dører og pendeldører frå Kvanne Industrier.",
        "Vi takkar Carrier for eit godt samarbeid!",
      ].join("\n"),
      year: 2024,
      category: "Kjøle- og fryserom",
      location: "Otta",
      customerType: "Daglegvarebutikk",
      migratedImagePath: "/assets/fresvik/images/migrated/kiwi-otta-1.jpeg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Nok ein Kiwi-butikk får nye fryse- og kjølerom",
              text: [
                "Fresvik Produkt har levert fryse- og kjølerom til nok ein Kiwi-butikk, denne gongen i flotte Otta, nord i Gudbrandsdalen.",
                "Her har vi levert eitt fryserom med frysedør, innestengningsalarm og PVC-gardin, samt 4 kjølerom med både våre eigne dører og pendeldører frå Kvanne Industrier.",
                "Vi takkar Carrier for eit godt samarbeid!",
              ].join("\n"),
              imageAlt: "Fryse- og kjølerom til Kiwi Otta",
              migratedImagePath: "/assets/fresvik/images/migrated/kiwi-otta-1.jpeg",
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
              title: "Kiwi Otta 1",
              text: "Bilde frå gammal Kiwi Otta-side.",
              imageAlt: "Kiwi Otta prosjektbilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/kiwi-otta-1.jpeg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Kiwi Otta 2",
              text: "Bilde frå gammal Kiwi Otta-side.",
              imageAlt: "Kiwi Otta prosjektbilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/kiwi-otta-2-bcce8cf47d.jpeg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Kiwi Otta 3",
              text: "Bilde frå gammal Kiwi Otta-side.",
              imageAlt: "Kiwi Otta prosjektbilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/kiwi-otta-3-91dee182be.jpeg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Kiwi Otta 4",
              text: "Bilde frå gammal Kiwi Otta-side.",
              imageAlt: "Kiwi Otta prosjektbilde 4",
              migratedImagePath: "/assets/fresvik/images/old-site/kiwi-otta-4-dea768e669.jpeg",
            },
            {
              _key: "reference-project-image-4",
              _type: "migrationCard",
              title: "Kiwi Otta 5",
              text: "Bilde frå gammal Kiwi Otta-side.",
              imageAlt: "Kiwi Otta prosjektbilde 5",
              migratedImagePath: "/assets/fresvik/images/old-site/kiwi-otta-5-9a1569c04c.jpeg",
            },
            {
              _key: "reference-project-image-5",
              _type: "migrationCard",
              title: "Kiwi Otta 6",
              text: "Bilde frå gammal Kiwi Otta-side.",
              imageAlt: "Kiwi Otta prosjektbilde 6",
              migratedImagePath: "/assets/fresvik/images/old-site/kiwi-otta-6-374399c9c5.jpeg",
            },
            {
              _key: "reference-project-image-6",
              _type: "migrationCard",
              title: "Kiwi Otta 7",
              text: "Bilde frå gammal Kiwi Otta-side.",
              imageAlt: "Kiwi Otta prosjektbilde 7",
              migratedImagePath: "/assets/fresvik/images/old-site/kiwi-otta-7-09c22d5667.jpg",
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
              title: "Kjøle- og fryserom til nye Vik helse- og omsorgssenter",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/vik-helse-og-omsorgssenter",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Nye leveransar til Rema 1000 Øya i Larvik",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/nye-leveransar-til-rema-1000-ya-i-larvik",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/nye-leveransar-til-rema-1000-ya-i-larvik",
    {
      title: "Nye leveransar til Rema 1000 Øya i Larvik",
      description:
        "Tidlegare i år leverte Fresvik Produkt nye kjøle- og fryserom til Rema 1000 Øya i Gamle Kongevei 47 i Larvik. Leveransen inkluderte eit fryserom og eit kjølerom, komplett med dører, innestengingsalarm, PVC-gardin og kjørerampe.",
      year: 2024,
      category: "Kjøle- og fryserom",
      location: "Larvik",
      customerType: "Daglegvarebutikk",
      migratedImagePath: "/assets/fresvik/images/migrated/1715599204491-upscale.jpeg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Nye leveransar til Rema 1000 Øya i Larvik",
              text:
                "Tidlegare i år leverte Fresvik Produkt nye kjøle- og fryserom til Rema 1000 Øya i Gamle Kongevei 47 i Larvik. Leveransen inkluderte eit fryserom og eit kjølerom, komplett med dører, innestengingsalarm, PVC-gardin og kjørerampe.",
              imageAlt: "Kjøle- og fryserom til Rema 1000 Øya i Larvik",
              migratedImagePath: "/assets/fresvik/images/migrated/1715599204491-upscale.jpeg",
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
              title: "Rema 1000 Øya Larvik 1",
              text: "Bilde frå gammal Rema 1000 Øya Larvik-side.",
              imageAlt: "Rema 1000 Øya Larvik prosjektbilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/1715599204491-upscale.jpeg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Rema 1000 Øya Larvik 2",
              text: "Bilde frå gammal Rema 1000 Øya Larvik-side.",
              imageAlt: "Rema 1000 Øya Larvik prosjektbilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/1715599206722-upscale-2137d27afe.jpeg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Rema 1000 Øya Larvik 3",
              text: "Bilde frå gammal Rema 1000 Øya Larvik-side.",
              imageAlt: "Rema 1000 Øya Larvik prosjektbilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/1715599204829-upscale-2-346667b36f.jpeg",
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
              title: "Nok ein Kiwi-butikk får nye fryse- og kjølerom",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/fryse-og-kjolerom-kiwi-otta",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Ny leveranse til Dyreparken Safaricamp i Kristiansand Dyrepark",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark",
    {
      title: "Ny leveranse til Dyreparken Safaricamp i Kristiansand Dyrepark",
      description: [
        "Fresvik Produkt har levert eit fryserom, fem kjølerom, innestengingsalarm, PVC-gardin og sju dører til Dyreparken Safaricamp i Kristiansand Dyrepark. Dørene er levert med sjølvlukkande hengsler – Fresvik Hengsler, som garanterer at døra aldri blir ståande åpen meir enn den trenger.",
        "Som einaste norske produsent av isolasjonspanel, dører og portar til kjøle- og fryserom, tilbyr me skreddarsydde løysingar som sikrar funksjonalitet og tryggleik. Produkta er kortreiste og av høg kvalitet, med enkel montering takka vere eksenterlås og med smarte løysingar som Fresvik Hengsle. Med hovudkontor og produksjonsanlegg i Fresvik i Sogn og salgsavdeling i Drammen, leverer me påliteleg og effektivt over heile Noreg.",
      ].join("\n"),
      year: 2024,
      category: "Kjøle- og fryserom",
      location: "Kristiansand",
      customerType: "Safaricamp",
      migratedImagePath: "/assets/fresvik/images/migrated/fp-dyreparken.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Ny leveranse til Dyreparken Safaricamp i Kristiansand Dyrepark",
              text: [
                "Fresvik Produkt har levert eit fryserom, fem kjølerom, innestengingsalarm, PVC-gardin og sju dører til Dyreparken Safaricamp i Kristiansand Dyrepark. Dørene er levert med sjølvlukkande hengsler – Fresvik Hengsler, som garanterer at døra aldri blir ståande åpen meir enn den trenger.",
                "Som einaste norske produsent av isolasjonspanel, dører og portar til kjøle- og fryserom, tilbyr me skreddarsydde løysingar som sikrar funksjonalitet og tryggleik. Produkta er kortreiste og av høg kvalitet, med enkel montering takka vere eksenterlås og med smarte løysingar som Fresvik Hengsle. Med hovudkontor og produksjonsanlegg i Fresvik i Sogn og salgsavdeling i Drammen, leverer me påliteleg og effektivt over heile Noreg.",
              ].join("\n\n"),
              imageAlt: "Fresvik leveranse til Dyreparken Safaricamp",
              migratedImagePath: "/assets/fresvik/images/migrated/fp-dyreparken.jpg",
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
              title: "Dyreparken Safaricamp prosjektbilde 1",
              text: "Bilde frå gammal Dyreparken Safaricamp-side.",
              imageAlt: "Fresvik leveranse til Dyreparken Safaricamp",
              migratedImagePath: "/assets/fresvik/images/migrated/fp-dyreparken.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Dyreparken Safaricamp prosjektbilde 2",
              text: "Bilde frå gammal Dyreparken Safaricamp-side.",
              imageAlt: "Fresvik leveranse til Dyreparken Safaricamp bilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/fp-dyreparken-1-d75e447c80.jpg",
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
              title: "Nye leveransar til Rema 1000 Øya i Larvik",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/nye-leveransar-til-rema-1000-ya-i-larvik",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Spesialløysing til tørkerom hjå Drageboden Kaupanger",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/spesialloysing-torkerom-drageboden-kaupanger",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/spesialloysing-torkerom-drageboden-kaupanger",
    {
      title: "Spesialløysing til tørkerom hjå Drageboden Kaupanger",
      description: [
        "Fresvik Produkt leverer så mangt! Drageboden på Kaupanger har no fått skreddarsydde panel som blir nytta som to tørkerom til trevirke.",
        "Dageboden har mellom anna stått for prefabrikering og utsmykking av hytta Hugin/Ramnereiret på Kaupanger. Dei jobbar med treverk, og fekk behov for tørkerom til materialane. Panel frå Fresvik Produkt blei ei god løysing.",
        "Her gjekk vi for ei rustfri overflate på innsida, på grunn av den høge varmen (opp til 60-70 gradar!). Vi leverte ein laus vegg på begge rom, slik at dei kan opne heile veggen og køyre inn pallar med treverk. Kunde har sjølv montert lås.",
        "Takk for eit kjekt prosjekt litt utanom det vanlege!",
      ].join("\n"),
      year: 2023,
      category: "Spesialløysing",
      location: "Kaupanger",
      customerType: "Treverk og tørkerom",
      migratedImagePath: "/assets/fresvik/images/migrated/dsc03066.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Spesialløysing til tørkerom hjå Drageboden Kaupanger",
              text: [
                "Fresvik Produkt leverer så mangt! Drageboden på Kaupanger har no fått skreddarsydde panel som blir nytta som to tørkerom til trevirke.",
                "Dageboden har mellom anna stått for prefabrikering og utsmykking av hytta Hugin/Ramnereiret på Kaupanger. Dei jobbar med treverk, og fekk behov for tørkerom til materialane. Panel frå Fresvik Produkt blei ei god løysing.",
                "Her gjekk vi for ei rustfri overflate på innsida, på grunn av den høge varmen (opp til 60-70 gradar!). Vi leverte ein laus vegg på begge rom, slik at dei kan opne heile veggen og køyre inn pallar med treverk. Kunde har sjølv montert lås.",
                "Takk for eit kjekt prosjekt litt utanom det vanlege!",
              ].join("\n\n"),
              imageAlt: "Tørkerom til Drageboden Kaupanger",
              migratedImagePath: "/assets/fresvik/images/migrated/dsc03066.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilde frå leveransen",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Drageboden prosjektbilde 1",
              text: "Bilde frå gammal Drageboden-side.",
              imageAlt: "Tørkerom til Drageboden Kaupanger bilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/dsc03066.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Drageboden prosjektbilde 2",
              text: "Bilde frå gammal Drageboden-side.",
              imageAlt: "Tørkerom til Drageboden Kaupanger bilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/img-4862-2f840ea519.jpeg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Drageboden prosjektbilde 3",
              text: "Bilde frå gammal Drageboden-side.",
              imageAlt: "Tørkerom til Drageboden Kaupanger bilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/dsc03067-556655ed95.jpg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Drageboden prosjektbilde 4",
              text: "Bilde frå gammal Drageboden-side.",
              imageAlt: "Tørkerom til Drageboden Kaupanger bilde 4",
              migratedImagePath: "/assets/fresvik/images/old-site/012ea3a01a484d6f8fb98e3ffb7f11bf-89343347bc.jpg",
            },
            {
              _key: "reference-project-image-4",
              _type: "migrationCard",
              title: "Drageboden prosjektbilde 5",
              text: "Bilde frå gammal Drageboden-side.",
              imageAlt: "Tørkerom til Drageboden Kaupanger bilde 5",
              migratedImagePath: "/assets/fresvik/images/old-site/dsc03068-6b5d38613b.jpg",
            },
            {
              _key: "reference-project-image-5",
              _type: "migrationCard",
              title: "Drageboden prosjektbilde 6",
              text: "Bilde frå gammal Drageboden-side.",
              imageAlt: "Tørkerom til Drageboden Kaupanger bilde 6",
              migratedImagePath: "/assets/fresvik/images/old-site/dsc03069-3979d8cacb.jpg",
            },
            {
              _key: "reference-project-image-6",
              _type: "migrationCard",
              title: "Drageboden prosjektbilde 7",
              text: "Bilde frå gammal Drageboden-side.",
              imageAlt: "Tørkerom til Drageboden Kaupanger bilde 7",
              migratedImagePath: "/assets/fresvik/images/old-site/dsc03070-9fdfd3fbdd.jpg",
            },
            {
              _key: "reference-project-image-7",
              _type: "migrationCard",
              title: "Drageboden prosjektbilde 8",
              text: "Bilde frå gammal Drageboden-side.",
              imageAlt: "Tørkerom til Drageboden Kaupanger bilde 8",
              migratedImagePath: "/assets/fresvik/images/old-site/dsc03071-873cd2675b.jpg",
            },
            {
              _key: "reference-project-image-8",
              _type: "migrationCard",
              title: "Drageboden prosjektbilde 9",
              text: "Bilde frå gammal Drageboden-side.",
              imageAlt: "Tørkerom til Drageboden Kaupanger bilde 9",
              migratedImagePath: "/assets/fresvik/images/old-site/img-4867-bf46ca70a7.jpeg",
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
              title: "Ny leveranse til Dyreparken Safaricamp i Kristiansand Dyrepark",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Omfattande leveranse til Bakehuset Trondheim",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/omfattande-leveranse-til-bakehuset-trondheim",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/omfattande-leveranse-til-bakehuset-trondheim",
    {
      title: "Omfattande leveranse til Bakehuset Trondheim",
      description: [
        "Fresvik Produkt har via vår kunde Carrier Refrigeration Norway produsert ein stor leveranse med fryserom, kjølerom og porter til Bakehuset Trondheim.",
        "Bakehuset Trondheim har røter langt tilbake i det førre århundre, og opna nytt bakeri på Tiller i 2022. Vi er glade for at dei valde løysinger frå Fresvik Produkt til det nye bakeriet.",
        "Totalt består leveransen av over 1250 kvadratmeter med panel.",
        "Vi har levert:",
        "2 stk fryserom",
        "3 stk fryseporter med PVC-gardiner",
        "4 stk kjølerom",
        "5 stk pendeldører frå Kvanne Industrier",
        "Takk for eit kjekt oppdrag!",
      ].join("\n"),
      year: 2023,
      category: "Kjøle- og fryserom",
      location: "Trondheim",
      customerType: "Bakeri",
      migratedImagePath: "/assets/fresvik/images/migrated/20220616-152720-1.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Omfattande leveranse til Bakehuset Trondheim",
              text: [
                "Fresvik Produkt har via vår kunde Carrier Refrigeration Norway produsert ein stor leveranse med fryserom, kjølerom og porter til Bakehuset Trondheim.",
                "Bakehuset Trondheim har røter langt tilbake i det førre århundre, og opna nytt bakeri på Tiller i 2022. Vi er glade for at dei valde løysinger frå Fresvik Produkt til det nye bakeriet.",
                "Totalt består leveransen av over 1250 kvadratmeter med panel.",
                "Vi har levert:",
                "2 stk fryserom",
                "3 stk fryseporter med PVC-gardiner",
                "4 stk kjølerom",
                "5 stk pendeldører frå Kvanne Industrier",
                "Takk for eit kjekt oppdrag!",
              ].join("\n\n"),
              imageAlt: "Bakehuset Trondheim leveranse",
              migratedImagePath: "/assets/fresvik/images/migrated/20220616-152720-1.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilde frå leveransen",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Bakehuset prosjektbilde 1",
              text: "Bilde frå gammal Bakehuset-side.",
              imageAlt: "Bakehuset Trondheim leveranse bilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/20220616-152720-1.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Bakehuset prosjektbilde 2",
              text: "Bilde frå gammal Bakehuset-side.",
              imageAlt: "Bakehuset Trondheim leveranse bilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/20220616-153035-1-ca797d1273.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Bakehuset prosjektbilde 3",
              text: "Bilde frå gammal Bakehuset-side.",
              imageAlt: "Bakehuset Trondheim leveranse bilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/20220616-175155-1-67567f4fc5.jpg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Bakehuset prosjektbilde 4",
              text: "Bilde frå gammal Bakehuset-side.",
              imageAlt: "Bakehuset Trondheim leveranse bilde 4",
              migratedImagePath: "/assets/fresvik/images/old-site/20220616-152821-1-44fd99581b.jpg",
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
              title: "Spesialløysing til tørkerom hjå Drageboden Kaupanger",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/spesialloysing-torkerom-drageboden-kaupanger",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Fryseromsportar til Rema 1000 i Narvik",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/fryseromsportar-til-rema-1000-i-narvik",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/fryseromsportar-til-rema-1000-i-narvik",
    {
      title: "Fryseromsportar til Rema 1000 i Narvik",
      description: [
        "Fresvik Produkt har levert fryseromsportar til vår kunde Relog AS. Dei er no komne på plass hjå Rema 1000 i Narvik.",
        "Leveransen består totalt av tre store fryseromsportar og fem fryseromsdører. Fresvik skyveportar er kjende for sin kvalitet og gode isoleringsevne, og er skreddarsydd til kunde ved vår fabrikk.",
        "Vi valgte Fresvik Produkt på grunnlag av anbefaling og pris. Vi kommer nok til å bruke dem igjen ved en senere anledning også!",
        "- Lars Skjetne, prosjektleder i Relog AS",
        "Fleire bilde frå leveransen:",
        "Klikk på bilda for stor visning.",
      ].join("\n"),
      year: 2022,
      category: "Kjøle- og fryserom",
      location: "Narvik",
      customerType: "Daglegvarebutikk",
      migratedImagePath: "/assets/fresvik/images/migrated/img-6262.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Fryseromsportar til Rema 1000 i Narvik",
              text: [
                "Fresvik Produkt har levert fryseromsportar til vår kunde Relog AS. Dei er no komne på plass hjå Rema 1000 i Narvik.",
                "Leveransen består totalt av tre store fryseromsportar og fem fryseromsdører. Fresvik skyveportar er kjende for sin kvalitet og gode isoleringsevne, og er skreddarsydd til kunde ved vår fabrikk.",
                "Vi valgte Fresvik Produkt på grunnlag av anbefaling og pris. Vi kommer nok til å bruke dem igjen ved en senere anledning også!",
                "- Lars Skjetne, prosjektleder i Relog AS",
              ].join("\n\n"),
              meta: "15. desember 2022",
              imageAlt: "Fryseromsportar til Rema 1000 i Narvik",
              migratedImagePath: "/assets/fresvik/images/migrated/img-6262.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Fleire bilde frå leveransen",
          intro: "Klikk på bilda for stor visning.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Rema 1000 Narvik prosjektbilde 1",
              text: "Bilde frå gammal Rema 1000 Narvik-side.",
              imageAlt: "Fryseromsportar til Rema 1000 i Narvik bilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/img-6262.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Rema 1000 Narvik prosjektbilde 2",
              text: "Bilde frå gammal Rema 1000 Narvik-side.",
              imageAlt: "Fryseromsportar til Rema 1000 i Narvik bilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/image002-0cccfb9d1c.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Rema 1000 Narvik prosjektbilde 3",
              text: "Bilde frå gammal Rema 1000 Narvik-side.",
              imageAlt: "Fryseromsportar til Rema 1000 i Narvik bilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/image003-ae909e6bb8.jpg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Rema 1000 Narvik prosjektbilde 4",
              text: "Bilde frå gammal Rema 1000 Narvik-side.",
              imageAlt: "Fryseromsportar til Rema 1000 i Narvik bilde 4",
              migratedImagePath: "/assets/fresvik/images/old-site/img-6262-7fe02e1c0b.jpg",
            },
            {
              _key: "reference-project-image-4",
              _type: "migrationCard",
              title: "Rema 1000 Narvik prosjektbilde 5",
              text: "Bilde frå gammal Rema 1000 Narvik-side.",
              imageAlt: "Fryseromsportar til Rema 1000 i Narvik bilde 5",
              migratedImagePath: "/assets/fresvik/images/old-site/img-6263-356dfec01d.jpg",
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
              title: "Omfattande leveranse til Bakehuset Trondheim",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/omfattande-leveranse-til-bakehuset-trondheim",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Fryse- og kjølerom til Sogn Frukt og Grønt",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront",
    {
      title: "Fryse- og kjølerom til Sogn Frukt og Grønt",
      description: [
        "I årets første månedar har vi hatt gleda av å levere fryse- og kjølerom til Fellespakkeriet på Håbakken i Lærdal, Sogn Frukt og Grønt.",
        "Vår leveranse bestod av 3 700 m2 panel i tjukkelsar frå 75 mm til 175 mm, produsert til 3 fryserom og 10 kjølerom.",
        "11 spesialportar blei levert av nederlandske Salco.",
        "Montasje blei utført av AKS Montering.",
        "Har du spørsmål om Fresvik kjølerom - ta kontakt med vår salsavdeling",
        "Bilder frå leveransen:",
      ].join("\n"),
      year: 2022,
      category: "Kjøle- og fryserom",
      location: "Lærdal",
      customerType: "Fruktpakkeri",
      migratedImagePath: "/assets/fresvik/images/migrated/img-2589.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Fryse- og kjølerom til Sogn Frukt og Grønt",
              text: [
                "I årets første månedar har vi hatt gleda av å levere fryse- og kjølerom til Fellespakkeriet på Håbakken i Lærdal, Sogn Frukt og Grønt.",
                "Vår leveranse bestod av 3 700 m2 panel i tjukkelsar frå 75 mm til 175 mm, produsert til 3 fryserom og 10 kjølerom.",
                "11 spesialportar blei levert av nederlandske Salco.",
                "Montasje blei utført av AKS Montering.",
                "Har du spørsmål om Fresvik kjølerom - ta kontakt med vår salsavdeling",
              ].join("\n\n"),
              meta: "4. juli 2022",
              imageAlt: "Fryse- og kjølerom til Sogn Frukt og Grønt",
              migratedImagePath: "/assets/fresvik/images/migrated/img-2589.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Bilder frå leveransen",
          intro: "Prosjektbilete bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Sogn Frukt og Grønt prosjektbilde 1",
              text: "Bilde frå gammal Sogn Frukt og Grønt-side.",
              imageAlt: "Fryse- og kjølerom til Sogn Frukt og Grønt bilde 1",
              migratedImagePath: "/assets/fresvik/images/migrated/img-2589.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Sogn Frukt og Grønt prosjektbilde 2",
              text: "Bilde frå gammal Sogn Frukt og Grønt-side.",
              imageAlt: "Fryse- og kjølerom til Sogn Frukt og Grønt bilde 2",
              migratedImagePath: "/assets/fresvik/images/old-site/img-0650-b498a58520.jpeg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Sogn Frukt og Grønt prosjektbilde 3",
              text: "Bilde frå gammal Sogn Frukt og Grønt-side.",
              imageAlt: "Fryse- og kjølerom til Sogn Frukt og Grønt bilde 3",
              migratedImagePath: "/assets/fresvik/images/old-site/img-1340-a8752cb661.jpeg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Sogn Frukt og Grønt prosjektbilde 4",
              text: "Bilde frå gammal Sogn Frukt og Grønt-side.",
              imageAlt: "Fryse- og kjølerom til Sogn Frukt og Grønt bilde 4",
              migratedImagePath: "/assets/fresvik/images/old-site/img-1679-ee1a28ad1e.jpeg",
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
              title: "Fryseromsportar til Rema 1000 i Narvik",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/fryseromsportar-til-rema-1000-i-narvik",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Fryserom og fryseport til Rentokil, Skjetten",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/fryserom-fryseport-rentokil",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/fryserom-fryseport-rentokil",
    {
      title: "Fryserom og fryseport til Rentokil, Skjetten",
      description: [
        "Fresvik Produkt AS har levert og montert fryserom for Kelvin AS til Rentokil på Lahaugmoen i Skjetten kommune.",
        "Rentokil skal bruke rommet til å fryse ned møbler og klær/tekstiler som er infisert av skadedyr, veggdyr, skjeggkre o.l.",
        "Størrelse på rom: 14600 x 11750 x 3725 mm",
        "Fryseport: 2700 x 2700 mm.",
        "Som vanleg med alle Fresvik fryserom, blir alle rom levert ferdig tilpassa med eksenterlås i alle overganger. Dette forkortar monteringstida og gir minimalt med avfall på byggeplass.",
        "I tillegg til rom og fryseport, har vi i dette prosjektet levert ei spesialbygd rampe.",
        "Vite meir om våre produkt? Ta kontakt med vår salsavdeling",
      ].join("\n"),
      year: 2018,
      category: "Kjøle- og fryserom",
      location: "Skjetten",
      customerType: "Skadedyrsanering",
      migratedImagePath: "/assets/fresvik/images/migrated/resvik-fryserom-innvendig-2.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Fryserom og fryseport til Rentokil, Skjetten",
              text: [
                "Fresvik Produkt AS har levert og montert fryserom for Kelvin AS til Rentokil på Lahaugmoen i Skjetten kommune.",
                "Rentokil skal bruke rommet til å fryse ned møbler og klær/tekstiler som er infisert av skadedyr, veggdyr, skjeggkre o.l.",
                "Størrelse på rom: 14600 x 11750 x 3725 mm",
                "Fryseport: 2700 x 2700 mm.",
                "Som vanleg med alle Fresvik fryserom, blir alle rom levert ferdig tilpassa med eksenterlås i alle overganger. Dette forkortar monteringstida og gir minimalt med avfall på byggeplass.",
                "I tillegg til rom og fryseport, har vi i dette prosjektet levert ei spesialbygd rampe.",
              ].join("\n\n"),
              meta: "14. desember 2018",
              imageAlt: "Fryserom innvendig",
              migratedImagePath: "/assets/fresvik/images/migrated/resvik-fryserom-innvendig-2.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Prosjektbilde",
          intro: "Bilde bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Fryserom innvendig",
              text: "Fryserom innvendig",
              imageAlt: "Fryserom innvendig",
              migratedImagePath: "/assets/fresvik/images/migrated/resvik-fryserom-innvendig-2.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Fryserom for klær, møbler etc",
              text: "Fryserom for klær, møbler etc",
              imageAlt: "Fryserom for klær, møbler etc",
              migratedImagePath: "/assets/fresvik/images/old-site/innvendig-m-bler-kl-r-7ee2829374.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Innvendig, port",
              text: "Innvendig, port",
              imageAlt: "Innvendig, port",
              migratedImagePath: "/assets/fresvik/images/old-site/innvendig-port-f20899ab4a.jpg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Utvendig, langside",
              text: "Utvendig, langside",
              imageAlt: "Utvendig, langside",
              migratedImagePath: "/assets/fresvik/images/old-site/utvendig-liggende-efe87a655e.jpg",
            },
            {
              _key: "reference-project-image-4",
              _type: "migrationCard",
              title: "Fryseport med rampe",
              text: "Fryseport med rampe",
              imageAlt: "Fryseport med rampe",
              migratedImagePath: "/assets/fresvik/images/old-site/utvendig-port-med-rampe-1810c8dd34.jpg",
            },
            {
              _key: "reference-project-image-5",
              _type: "migrationCard",
              title: "Utvendig portdetalj",
              text: "Utvendig portdetalj",
              imageAlt: "Utvendig portdetalj",
              migratedImagePath: "/assets/fresvik/images/old-site/utvendig-portdetalj-709e934be3.jpg",
            },
            {
              _key: "reference-project-image-6",
              _type: "migrationCard",
              title: "Utvendig rampe",
              text: "Utvendig rampe",
              imageAlt: "Utvendig rampe",
              migratedImagePath: "/assets/fresvik/images/old-site/utvendig-rampe-a594c8609a.jpg",
            },
            {
              _key: "reference-project-image-7",
              _type: "migrationCard",
              title: "Utvendig stående",
              text: "Utvendig stående",
              imageAlt: "Utvendig stående",
              migratedImagePath: "/assets/fresvik/images/old-site/utvendig-staende-7e43a93c88.jpg",
            },
            {
              _key: "reference-project-image-8",
              _type: "migrationCard",
              title: "Utvendig ventiler",
              text: "Utvendig ventiler",
              imageAlt: "Utvendig ventiler",
              migratedImagePath: "/assets/fresvik/images/old-site/utvendig-ventiler-ec0949f672.jpg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-kelvin",
              _type: "migrationCard",
              title: "Kelvin AS",
              text: "Ekstern prosjektlenke frå gammal side.",
              href: "http://kelvinas.no/",
            },
            {
              _key: "reference-project-rentokil",
              _type: "migrationCard",
              title: "Rentokil",
              text: "Ekstern prosjektlenke frå gammal side.",
              href: "http://www.rentokil.no/",
            },
            {
              _key: "reference-project-sales",
              _type: "migrationCard",
              title: "Ta kontakt med vår salsavdeling",
              text: "Intern kontaktlenke frå gammal side.",
              href: "/tilsette",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Fryse- og kjølerom til Sogn Frukt og Grønt",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Fresvik kjøle- og fryserom i miljøvennlege daglegvarebutikkar",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar",
    {
      title: "Fresvik kjøle- og fryserom i miljøvennlege daglegvarebutikkar",
      description: [
        "Nye Kiwi Skollenborg er bygd av NorgesGruppen Eiendom AS, og er del av ein trend vi no ser på bygging av meir miljøvennlege butikkar i daglegvarebransjen.",
        "På Kiwi Skollenborg ved Kongsberg har dei med dette bygget redusert CO2-fotavtrykket med over 50 %, samanlikna med ein vanleg Kiwi-butikk.",
        "Les meir om dette prosjektet i Dagbladet",
        "Vi har levert fire kjølerom og eit fryserom til vår kunde Carrier Refrigation Norway, ein leveranse på ca 300 m2. Monteringa er gjort av AKS Montering.",
        "Les meir om Kiwi Skollenborg i Bygg.no",
      ].join("\n"),
      year: 2018,
      category: "Kjøle- fryserom butikk",
      location: "Kongsberg",
      customerType: "Daglegvarebutikk",
      migratedImagePath: "/assets/fresvik/images/migrated/kiwi-skollenborg-2018-06-18-1-redigert-4-gang.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Kiwi Skollenborg, Kongsberg",
              text: [
                "Nye Kiwi Skollenborg er bygd av NorgesGruppen Eiendom AS, og er del av ein trend vi no ser på bygging av meir miljøvennlege butikkar i daglegvarebransjen.",
                "På Kiwi Skollenborg ved Kongsberg har dei med dette bygget redusert CO2-fotavtrykket med over 50 %, samanlikna med ein vanleg Kiwi-butikk.",
                "Les meir om dette prosjektet i Dagbladet",
                "Vi har levert fire kjølerom og eit fryserom til vår kunde Carrier Refrigation Norway, ein leveranse på ca 300 m2. Monteringa er gjort av AKS Montering.",
                "Les meir om Kiwi Skollenborg i Bygg.no",
              ].join("\n\n"),
              meta: "20. juni 2018",
              imageAlt: "Kiwi Skollenborg, Kongsberg",
              migratedImagePath: "/assets/fresvik/images/migrated/kiwi-skollenborg-2018-06-18-1-redigert-4-gang.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Prosjektbilde",
          intro: "Bilde bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Kiwi Skollenborg, Kongsberg",
              text: "Kiwi Skollenborg, Kongsberg",
              imageAlt: "Kiwi Skollenborg, Kongsberg",
              migratedImagePath: "/assets/fresvik/images/migrated/kiwi-skollenborg-2018-06-18-1-redigert-4-gang.jpg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-dagbladet",
              _type: "migrationCard",
              title: "Les meir om dette prosjektet i Dagbladet",
              text: "Ekstern prosjektlenke frå gammal side.",
              href: "https://www.dagbladet.no/mat/du-ser-ikke-hva-som-er-annerledes-med-denne-butikken-men-den-forandrer-norge/69898221",
            },
            {
              _key: "reference-project-carrier",
              _type: "migrationCard",
              title: "Carrier Refrigation Norway",
              text: "Ekstern prosjektlenke frå gammal side.",
              href: "https://www.carrier.com/commercial-refrigeration/en/no/",
            },
            {
              _key: "reference-project-bygg",
              _type: "migrationCard",
              title: "Les meir om Kiwi Skollenborg i Bygg.no",
              text: "Ekstern prosjektlenke frå gammal side.",
              href: "http://www.bygg.no/article/1344870",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Fryserom og fryseport til Rentokil, Skjetten",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/fryserom-fryseport-rentokil",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Karlsøybruket",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/karlsoybruket",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/karlsoybruket",
    {
      title: "Karlsøybruket",
      description: [
        "På førjulsvinteren 2017 har Fresvik Produkt levert og montert deler av eit større anlegg til Isowest AS.",
        "Karlsøybruket bygger nye produksjonslokaler for kvitfisk, og vi har levert vegger til sluser, kjølerom og produksjonskontor, samt kjøleport og glassfiberdører i inner- og yttervegger.",
        "Over nyttår skal vi til same anlegget levere og montere fasadepanel til nytt bygg for renseanlegg mm.",
        "Prosjektet har gått som planlagt, og vi ser fram til fortsettelsen på nyåret.",
      ].join("\n"),
      year: 2017,
      category: "Kjøle- og fryserom",
      location: "Karlsøy",
      customerType: "Fiskeindustri",
      migratedImagePath: "/assets/fresvik/images/migrated/img-7324.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Karlsøybruket",
              text: [
                "På førjulsvinteren 2017 har Fresvik Produkt levert og montert deler av eit større anlegg til Isowest AS.",
                "Karlsøybruket bygger nye produksjonslokaler for kvitfisk, og vi har levert vegger til sluser, kjølerom og produksjonskontor, samt kjøleport og glassfiberdører i inner- og yttervegger.",
                "Over nyttår skal vi til same anlegget levere og montere fasadepanel til nytt bygg for renseanlegg mm.",
                "Prosjektet har gått som planlagt, og vi ser fram til fortsettelsen på nyåret.",
              ].join("\n\n"),
              meta: "12. desember 2017",
              imageAlt: "IMG_7324.JPG",
              migratedImagePath: "/assets/fresvik/images/migrated/img-7324.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Prosjektbilde",
          intro: "Bilde bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "IMG_7324.JPG",
              text: "IMG_7324.JPG",
              imageAlt: "IMG_7324.JPG",
              migratedImagePath: "/assets/fresvik/images/migrated/img-7324.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "IMG_7326.JPG",
              text: "IMG_7326.JPG",
              imageAlt: "IMG_7326.JPG",
              migratedImagePath: "/assets/fresvik/images/old-site/img-7326-a7f540f769.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Port Karlsøybruket 2017.jpg",
              text: "Port Karlsøybruket 2017.jpg",
              imageAlt: "Port Karlsøybruket 2017.jpg",
              migratedImagePath: "/assets/fresvik/images/old-site/port-karls-ybruket-2017-a668d7c80d.jpg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-isowest",
              _type: "migrationCard",
              title: "Isowest AS",
              text: "Ekstern prosjektlenke frå gammal side.",
              href: "http://www.isowest.no/",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Fresvik kjøle- og fryserom i miljøvennlege daglegvarebutikkar",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Fiskehallen",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/fiskehallen",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/fiskehallen",
    {
      title: "Fiskehallen",
      description: [
        "Fresvik Produkt har gjennom åra levert mykje til Fiskehallen, og til mange ulike kundar der.",
        "Siste del av året har vi hatt leveransar til Sjømat AS, som også held til her. Bileta viser litt av dette anlegget.",
        "Dette prosjektet har bestått av både takflate, vegger og portar.",
        "Også på Fiskehallen er det AKS Montering som er den føretrekte montøren.",
      ].join("\n"),
      year: 2017,
      category: "Storkjøkken-restaurant",
      location: "Fiskehallen",
      customerType: "Sjømat",
      migratedImagePath: "/assets/fresvik/images/migrated/fiskehallen1.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Fiskehallen",
              text: [
                "Fresvik Produkt har gjennom åra levert mykje til Fiskehallen, og til mange ulike kundar der.",
                "Siste del av året har vi hatt leveransar til Sjømat AS, som også held til her. Bileta viser litt av dette anlegget.",
                "Dette prosjektet har bestått av både takflate, vegger og portar.",
                "Også på Fiskehallen er det AKS Montering som er den føretrekte montøren.",
              ].join("\n\n"),
              meta: "12. desember 2017",
              imageAlt: "fiskehallen1.jpg",
              migratedImagePath: "/assets/fresvik/images/migrated/fiskehallen1.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Prosjektbilde",
          intro: "Bilde bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "fiskehallen1.jpg",
              text: "fiskehallen1.jpg",
              imageAlt: "fiskehallen1.jpg",
              migratedImagePath: "/assets/fresvik/images/migrated/fiskehallen1.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "fiskehallen2.jpg",
              text: "fiskehallen2.jpg",
              imageAlt: "fiskehallen2.jpg",
              migratedImagePath: "/assets/fresvik/images/old-site/fiskehallen2-14ed360ecf.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "fiskehallen3.jpg",
              text: "fiskehallen3.jpg",
              imageAlt: "fiskehallen3.jpg",
              migratedImagePath: "/assets/fresvik/images/old-site/fiskehallen3-97fbee8985.jpg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-category",
              _type: "migrationCard",
              title: "Storkjøkken-restaurant",
              text: "Kategori frå gammal side.",
              href: "/referansar/category/Storkj%C3%B8kken-restaurant",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Karlsøybruket",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/karlsoybruket",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Celsa Steel Service, Sotra",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/celsa-steel-sotra",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/buskerud-storcash",
    {
      title: "Buskerud Storcash",
      description: [
        "I oktober i år opna Buskerud storcash sitt nye bygg i Kobbervikdalen i Drammen.",
        "Storcash er ein del av ASKO og NorgesGruppen og det nye bygget på 2300 kvadratmeter blir eit av dei mest miljøvennlege stormarknadane i landet.",
        "Vår samarbeidspartnar, Kelvin AS , har hatt ansvar for at varme fra kuldeanlegget på Storcash i Kobber blir gjenvunne og utnytta til oppvarming av bygget. Og på sommartid sørgjer kuldeanlegget for nedkjøling av ventilasjonslufta.",
        "Vi i Fresvik Produkt leverte 1650 kvm med Fresvik isolasjonspanel , sju kjøle- og frysedørar og ein fryseport, alle produsert ved vår fabrikk i Fresvik.",
        "Inne i butikken leverte Schott Termofrost heile 42 glassdørar til fryserommet, som vist på foto.",
      ].join("\n"),
      year: 2016,
      category: "Kjøle- fryserom butikk",
      location: "Kobbervikdalen, Drammen",
      customerType: "Storcash / daglegvare",
      migratedImagePath: "/assets/fresvik/images/migrated/image-asset-35.jpeg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Buskerud Storcash",
              text: [
                "I oktober i år opna Buskerud storcash sitt nye bygg i Kobbervikdalen i Drammen.",
                "Storcash er ein del av ASKO og NorgesGruppen og det nye bygget på 2300 kvadratmeter blir eit av dei mest miljøvennlege stormarknadane i landet.",
                "Vår samarbeidspartnar, Kelvin AS , har hatt ansvar for at varme fra kuldeanlegget på Storcash i Kobber blir gjenvunne og utnytta til oppvarming av bygget. Og på sommartid sørgjer kuldeanlegget for nedkjøling av ventilasjonslufta.",
                "Vi i Fresvik Produkt leverte 1650 kvm med Fresvik isolasjonspanel , sju kjøle- og frysedørar og ein fryseport, alle produsert ved vår fabrikk i Fresvik.",
                "Inne i butikken leverte Schott Termofrost heile 42 glassdørar til fryserommet, som vist på foto.",
              ].join("\n\n"),
              meta: "19. desember 2016",
              imageAlt: "Buskerud Storcash",
              migratedImagePath: "/assets/fresvik/images/migrated/image-asset-35.jpeg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Prosjektbilde",
          intro: "Bilde bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Buskerud Storcash",
              text: "Buskerud Storcash",
              imageAlt: "Buskerud Storcash",
              migratedImagePath: "/assets/fresvik/images/migrated/image-asset-35.jpeg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "dorer2_web.jpg",
              text: "dorer2_web.jpg",
              imageAlt: "dorer2_web.jpg",
              migratedImagePath: "/assets/fresvik/images/old-site/dorer2-web-23779e7371.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "dorer4_web.jpg",
              text: "dorer4_web.jpg",
              imageAlt: "dorer4_web.jpg",
              migratedImagePath: "/assets/fresvik/images/old-site/dorer4-web-67d1d45a02.jpg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "dorer5_web.jpg",
              text: "dorer5_web.jpg",
              imageAlt: "dorer5_web.jpg",
              migratedImagePath: "/assets/fresvik/images/old-site/dorer5-web-fa6b64e0ea.jpg",
            },
            {
              _key: "reference-project-image-4",
              _type: "migrationCard",
              title: "haandtak_web.jpg",
              text: "haandtak_web.jpg",
              imageAlt: "haandtak_web.jpg",
              migratedImagePath: "/assets/fresvik/images/old-site/haandtak-web-7f81b0c34f.jpg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-category",
              _type: "migrationCard",
              title: "Kjøle- fryserom butikk",
              text: "Kategori frå gammal side.",
              href: "/referansar/category/Kj%C3%B8le-+fryserom+butikk",
            },
            {
              _key: "reference-project-kelvin",
              _type: "migrationCard",
              title: "Kelvin AS",
              text: "Ekstern prosjektlenke frå gammal side.",
              href: "http://kelvinas.no/",
            },
            {
              _key: "reference-project-fresvik-isolasjonspanel",
              _type: "migrationCard",
              title: "Fresvik isolasjonspanel",
              text: "Gammal intern lenke `/kjlerom-fryserom-butikk/` peikar til produktoversikta.",
              href: "/produkt",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Celsa Steel Service, Sotra",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/celsa-steel-sotra",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Bjerke spekemat og delikatesse",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/bjerke-spekemat",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/bjerke-spekemat",
    {
      title: "Bjerke spekemat og delikatesse",
      description: [
        "Bjerke Spekemat og Delikatesser AS i Helgeroa opplever fin vekst og har nettopp investert i nytt produksjonslokale.",
        "Her har vi i Fresvik Produkt installert:",
        "- utvendige fasadepanel",
        "- innvendige skillevegger",
        "- himlinger",
        "- dører",
        "- portar",
        "Eit ganske så typisk Fresvik Produkt-prosjekt i vår største bransje - næringsmiddelbransjen.",
        "Monteringa er blitt gjennomført av våre gode partner, AKS Montering v/Anders Sætre, som også har teke foto.",
        "Om Bjerke spekemat og delikatesse",
        "Bjerke Spekemat og Delikatesse AS i Helgeroa i Vestfold er ei kombinert produksjons- og handelsbedrift med historie tilbake til 1975. Dei har 35 tilsette og ei årleg omsetning rundt 100 mill. kroner. Med eit veldig sterkt fokus på norske råvarer og høg kvalitet, er kvalitet på kjølerom og produksjonslokale ein viktig faktor for selskapet, og vi i Fresvik er glade for å vere ein samarbeidspartnar.",
      ].join("\n"),
      year: 2016,
      category: "Storkjøkken-restaurant",
      location: "Helgeroa, Vestfold",
      customerType: "Næringsmiddel / spekemat og delikatesse",
      migratedImagePath: "/assets/fresvik/images/migrated/fresvik-aks-montering1.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Bjerke spekemat og delikatesse",
              text: [
                "Bjerke Spekemat og Delikatesser AS i Helgeroa opplever fin vekst og har nettopp investert i nytt produksjonslokale.",
                "Her har vi i Fresvik Produkt installert:",
                "- utvendige fasadepanel",
                "- innvendige skillevegger",
                "- himlinger",
                "- dører",
                "- portar",
                "Eit ganske så typisk Fresvik Produkt-prosjekt i vår største bransje - næringsmiddelbransjen.",
                "Monteringa er blitt gjennomført av våre gode partner, AKS Montering v/Anders Sætre, som også har teke foto.",
                "Om Bjerke spekemat og delikatesse",
                "Bjerke Spekemat og Delikatesse AS i Helgeroa i Vestfold er ei kombinert produksjons- og handelsbedrift med historie tilbake til 1975. Dei har 35 tilsette og ei årleg omsetning rundt 100 mill. kroner. Med eit veldig sterkt fokus på norske råvarer og høg kvalitet, er kvalitet på kjølerom og produksjonslokale ein viktig faktor for selskapet, og vi i Fresvik er glade for å vere ein samarbeidspartnar.",
              ].join("\n\n"),
              meta: "14. mars 2016",
              imageAlt: "Bjerke spekemat og delikatesse",
              migratedImagePath: "/assets/fresvik/images/migrated/fresvik-aks-montering1.jpg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Prosjektbilde",
          intro: "Bilde bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "Fresvik aks montering1.jpg",
              text: "Fresvik aks montering1.jpg",
              imageAlt: "Fresvik aks montering1.jpg",
              migratedImagePath: "/assets/fresvik/images/migrated/fresvik-aks-montering1.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "Fresvik aks montering2.jpg",
              text: "Fresvik aks montering2.jpg",
              imageAlt: "Fresvik aks montering2.jpg",
              migratedImagePath: "/assets/fresvik/images/old-site/fresvik-aks-montering2-1b72163da7.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "Fresvik aks montering4.jpg",
              text: "Fresvik aks montering4.jpg",
              imageAlt: "Fresvik aks montering4.jpg",
              migratedImagePath: "/assets/fresvik/images/old-site/fresvik-aks-montering4-969d79d1cf.jpg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "Fresvik aks montering5.jpg",
              text: "Fresvik aks montering5.jpg",
              imageAlt: "Fresvik aks montering5.jpg",
              migratedImagePath: "/assets/fresvik/images/old-site/fresvik-aks-montering5-55466bac4e.jpg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-category-framside",
              _type: "migrationCard",
              title: "Framside-referansar",
              text: "Kategori frå gammal side.",
              href: "/referansar/category/Framside-referansar",
            },
            {
              _key: "reference-project-category-storkjokken",
              _type: "migrationCard",
              title: "Storkjøkken-restaurant",
              text: "Kategori frå gammal side.",
              href: "/referansar/category/Storkj%C3%B8kken-restaurant",
            },
            {
              _key: "reference-project-bjerke",
              _type: "migrationCard",
              title: "Bjerke Spekemat og Delikatesse AS",
              text: "Ekstern prosjektlenke frå gammal side.",
              href: "https://www.bjerkemat.no/",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Buskerud Storcash",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/buskerud-storcash",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Restauranthuset Malin",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/restauranthuset-malin",
            },
          ],
        },
      ],
    },
  ],
  [
    "/referansar/restauranthuset-malin",
    {
      title: "Restauranthuset Malin",
      description: [
        "China House AS har i haust opna det nye Restauranthuset Malin i Sogndal Kulturhus.",
        "Restauranten har blitt ein stor suksess, og Fresvik Produkt har levert både kjøle- og fryserom. I tillegg har vi levert vegger til grovkjøkken og oppvask, alt i tråd med ynskje frå oppdragsgivar.",
        "Fresvik Produkt har tilsvarande leveransar rundt i heile landet, men tykkjer det er ekstra kjekt at våre produkt i høve kvalitet og hygiene vert verdsatt lokalt.",
        "Prosjektet vart levert ferdig montert i løpet av nokre få veker. Dette var avgjerande for kunden, og Fresvik Produkt fekk det til i samarbeid med byggherre og ikkje minst ved hjelp av dyktige montørar som viste stor fleksibilitet.",
        "Fresvik Produkt ynskjer Resturanthuset Malin lukke til med drifta!",
        "Restauranthuset Malin i Sogndal, med 230 sitjeplassar.",
        "«Fresvik Produkt vart vald som leverandør på grunn av kvalitet/kompetanse og kort leveringstid. »",
        "— Per Rygg, prosjektleiar Via Nor as",
      ].join("\n"),
      year: 2015,
      category: "Storkjøkken-restaurant",
      location: "Sogndal Kulturhus",
      customerType: "Restaurant / storkjøkken",
      migratedImagePath: "/assets/fresvik/images/migrated/image2.jpg",
      migrationSections: [
        {
          _key: "reference-project-text",
          _type: "migrationSection",
          title: "Prosjekttekst",
          items: [
            {
              _key: "reference-project-text-main",
              _type: "migrationCard",
              title: "Restauranthuset Malin",
              text: [
                "China House AS har i haust opna det nye Restauranthuset Malin i Sogndal Kulturhus.",
                "Restauranten har blitt ein stor suksess, og Fresvik Produkt har levert både kjøle- og fryserom. I tillegg har vi levert vegger til grovkjøkken og oppvask, alt i tråd med ynskje frå oppdragsgivar.",
                "Fresvik Produkt har tilsvarande leveransar rundt i heile landet, men tykkjer det er ekstra kjekt at våre produkt i høve kvalitet og hygiene vert verdsatt lokalt.",
                "Prosjektet vart levert ferdig montert i løpet av nokre få veker. Dette var avgjerande for kunden, og Fresvik Produkt fekk det til i samarbeid med byggherre og ikkje minst ved hjelp av dyktige montørar som viste stor fleksibilitet.",
                "Fresvik Produkt ynskjer Resturanthuset Malin lukke til med drifta!",
              ].join("\n\n"),
              meta: "28. oktober 2015",
              imageAlt: "Restauranthuset Malin",
              migratedImagePath: "/assets/fresvik/images/migrated/image2.jpg",
            },
          ],
        },
        {
          _key: "reference-project-quote",
          _type: "migrationSection",
          title: "Sitat frå gammal side",
          items: [
            {
              _key: "reference-project-quote-main",
              _type: "migrationCard",
              title: "Restauranthuset Malin i Sogndal, med 230 sitjeplassar.",
              text: "«Fresvik Produkt vart vald som leverandør på grunn av kvalitet/kompetanse og kort leveringstid. »\n\n— Per Rygg, prosjektleiar Via Nor as",
              imageAlt: "Restauranthuset Malin i Sogndal - ein stor restaurant med 230 sitjeplassar",
              migratedImagePath: "/assets/fresvik/images/migrated/image-asset.jpeg",
            },
          ],
        },
        {
          _key: "reference-project-images",
          _type: "migrationSection",
          title: "Prosjektbilde",
          intro: "Bilde bevart frå den gamle referansesida.",
          items: [
            {
              _key: "reference-project-image-0",
              _type: "migrationCard",
              title: "image2.JPG",
              text: "image2.JPG",
              imageAlt: "image2.JPG",
              migratedImagePath: "/assets/fresvik/images/migrated/image2.jpg",
            },
            {
              _key: "reference-project-image-1",
              _type: "migrationCard",
              title: "image3.JPG",
              text: "image3.JPG",
              imageAlt: "image3.JPG",
              migratedImagePath: "/assets/fresvik/images/old-site/image3-1dcfcdfc38.jpg",
            },
            {
              _key: "reference-project-image-2",
              _type: "migrationCard",
              title: "image4.JPG",
              text: "image4.JPG",
              imageAlt: "image4.JPG",
              migratedImagePath: "/assets/fresvik/images/old-site/image4-ed22cf6c20.jpg",
            },
            {
              _key: "reference-project-image-3",
              _type: "migrationCard",
              title: "image7.JPG",
              text: "image7.JPG",
              imageAlt: "image7.JPG",
              migratedImagePath: "/assets/fresvik/images/old-site/image7-9d70827c73.jpg",
            },
            {
              _key: "reference-project-image-4",
              _type: "migrationCard",
              title: "Restauranthuset Malin i Sogndal, med 230 sitjeplassar.",
              text: "Restauranthuset Malin i Sogndal, med 230 sitjeplassar.",
              imageAlt: "Restauranthuset Malin i Sogndal - ein stor restaurant med 230 sitjeplassar",
              migratedImagePath: "/assets/fresvik/images/migrated/image-asset.jpeg",
            },
          ],
        },
        {
          _key: "reference-project-links",
          _type: "migrationSection",
          title: "Lenker frå gammal side",
          items: [
            {
              _key: "reference-project-category-framside",
              _type: "migrationCard",
              title: "Framside-referansar",
              text: "Kategori frå gammal side.",
              href: "/referansar/category/Framside-referansar",
            },
            {
              _key: "reference-project-category-storkjokken",
              _type: "migrationCard",
              title: "Storkjøkken-restaurant",
              text: "Kategori frå gammal side.",
              href: "/referansar/category/Storkj%C3%B8kken-restaurant",
            },
            {
              _key: "reference-project-prev",
              _type: "migrationCard",
              title: "Bjerke spekemat og delikatesse",
              text: "Forrige referanse frå gammal side.",
              href: "/referansar/bjerke-spekemat",
            },
            {
              _key: "reference-project-next",
              _type: "migrationCard",
              title: "Coop Extra Naustdal",
              text: "Neste referanse frå gammal side.",
              href: "/referansar/fryserom-med-fryseport-til-coop-extra-naustdal",
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
