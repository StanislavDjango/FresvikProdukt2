import { defineQuery } from "next-sanity";
import {
  getContentPage as getFallbackContentPage,
  type ContentCard,
  type ContentPage,
} from "@/data/pages";
import { isSanityConfigured } from "../env";
import { client } from "./client";
import {
  englishPathForSourcePath,
  sourcePathForEnglishPath,
  withLocale,
} from "@/i18n/config";

type PortableTextBlock = {
  _type?: string;
  children?: Array<{ text?: string }>;
};

type SanityDocumentRef = {
  title?: string;
  category?: string;
  description?: string;
  externalUrl?: string;
  localPath?: string;
  fileUrl?: string;
};

type SanityMigrationCard = {
  title?: string;
  text?: string;
  href?: string;
  meta?: string;
  imageAlt?: string;
  migratedImagePath?: string;
  migrationLocalDocumentPath?: string;
  migrationBackupLocalPath?: string;
  imageUrl?: string;
  fileUrl?: string;
};

type SanityMigrationSection = {
  title?: string;
  intro?: string;
  items?: SanityMigrationCard[];
};

type SanityContentDoc = {
  _type:
    | "page"
    | "product"
    | "service"
    | "newsArticle"
    | "referenceProject";
  title?: string;
  slug?: string;
  intro?: string;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  sourceUrl?: string;
  migratedImagePath?: string;
  imageUrl?: string;
  excerpt?: string;
  date?: string;
  shortDescription?: string;
  features?: string[];
  technicalData?: Array<{ label?: string; value?: string }>;
  applications?: string[];
  processSteps?: Array<{ title?: string; text?: string }>;
  ctaText?: string;
  description?: string;
  year?: number;
  category?: string;
  location?: string;
  customerType?: string;
  documents?: SanityDocumentRef[];
  migrationCards?: SanityMigrationCard[];
  migrationSections?: SanityMigrationSection[];
  language?: "nn" | "en";
  translationGroup?: string;
};

type SanityIndexItem = {
  _type?: string;
  title?: string;
  name?: string;
  slug?: string;
  text?: string;
  excerpt?: string;
  description?: string;
  intro?: string;
  role?: string;
  location?: string;
  phone?: string;
  email?: string;
  date?: string;
  year?: number;
  category?: string;
  imageUrl?: string;
  fileUrl?: string;
  externalUrl?: string;
  localPath?: string;
};

const CONTENT_DOC_QUERY = defineQuery(`*[
  _type in ["page", "product", "service", "newsArticle", "referenceProject"] &&
  slug.current in $slugs &&
  ((language == $language) || (!defined(language) && $language == "nn"))
][0]{
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
  language,
  translationGroup,
  "imageUrl": coalesce(heroImage.asset->url, image.asset->url),
  "documents": documents[]->{
    title,
    category,
    description,
    externalUrl,
    localPath,
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
    "imageUrl": image.asset->url,
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
      "imageUrl": image.asset->url,
      "fileUrl": file.asset->url
    }
  }
}`);

const CONTENT_SLUGS_QUERY = defineQuery(`*[
  _type in ["page", "product", "service", "newsArticle", "referenceProject"] &&
  defined(slug.current) &&
  (!defined(language) || language == "nn")
].slug.current`);

const localMigrationStructurePaths = new Set<string>([]);

const indexContentPaths = new Set([
  "/aktuelt",
  "/referansar",
  "/produkt",
  "/tenester",
  "/dokumentasjon",
  "/monteringsanvisning",
  "/tilsette",
  "/kundeservice/faq",
]);

const NEWS_INDEX_QUERY = defineQuery(`*[
  _type == "newsArticle" &&
  ((!defined(language) && $language == "nn") || language == $language)
] | order(date desc, title asc) {
  title,
  "slug": slug.current,
  excerpt,
  date,
  "imageUrl": image.asset->url
}`);

const REFERENCES_INDEX_QUERY = defineQuery(`*[
  _type == "referenceProject" &&
  ((!defined(language) && $language == "nn") || language == $language)
] | order(year desc, title asc) {
  title,
  "slug": slug.current,
  description,
  year,
  category,
  location,
  "imageUrl": image.asset->url
}`);

const PRODUCTS_INDEX_QUERY = defineQuery(`*[
  _type == "product" &&
  ((!defined(language) && $language == "nn") || language == $language)
] | order(title asc) {
  title,
  "slug": slug.current,
  intro,
  shortDescription,
  "imageUrl": heroImage.asset->url
}`);

const SERVICES_INDEX_QUERY = defineQuery(`*[
  _type == "service" &&
  ((!defined(language) && $language == "nn") || language == $language)
] | order(title asc) {
  title,
  "slug": slug.current,
  intro,
  "imageUrl": image.asset->url
}`);

const DOCUMENTS_INDEX_QUERY = defineQuery(`*[
  _type == "documentFile" &&
  ((!defined(language) && $language == "nn") || language == $language)
] | order(category asc, title asc) {
  title,
  category,
  description,
  externalUrl,
  localPath,
  "fileUrl": file.asset->url
}`);

const EMPLOYEES_INDEX_QUERY = defineQuery(`*[
  _type == "employee" &&
  ((!defined(language) && $language == "nn") || language == $language)
] | order(order asc, name asc) {
  "title": name,
  role,
  location,
  phone,
  email,
  "imageUrl": image.asset->url
}`);

const FAQ_INDEX_QUERY = defineQuery(`*[
  _type == "faqItem" &&
  ((!defined(language) && $language == "nn") || language == $language)
] | order(order asc, question asc) {
  "title": question,
  "text": pt::text(answer),
  category
}`);

function slugForPath(path: string) {
  const normalized = path === "/" ? "home" : path.replace(/^\/+|\/+$/g, "");
  return normalized || "home";
}

function pathForSlug(slug?: string) {
  if (!slug || slug === "home") return "/";
  return `/${slug.replace(/^\/+|\/+$/g, "")}`;
}

function sourcePathForDoc(doc: SanityContentDoc) {
  return sourcePathForEnglishPath(pathForSlug(doc.slug));
}

function compactText(values: Array<string | number | null | undefined>) {
  return values
    .map((value) => (value === undefined || value === null ? "" : String(value).trim()))
    .filter(Boolean)
    .join(" | ");
}

function plainTextFromBlocks(blocks?: PortableTextBlock[]) {
  return (blocks || [])
    .filter((block) => block._type === "block")
    .map((block) => (block.children || []).map((child) => child.text || "").join(""))
    .map((text) => text.trim())
    .filter(Boolean);
}

function firstUsefulText(doc: SanityContentDoc) {
  return (
    doc.intro ||
    doc.excerpt ||
    doc.shortDescription ||
    doc.description ||
    plainTextFromBlocks(doc.body)[0] ||
    doc.title ||
    ""
  );
}

function pageTypeFor(doc: SanityContentDoc): ContentPage["pageType"] {
  if (doc._type === "product") return "product";
  if (doc._type === "service") return "service";
  if (doc._type === "page") {
    const path = sourcePathForDoc(doc);
    if (path === "/personvernerklering" || path === "/openheitslova") return "legal";
    if (
      path === "/dokumentasjon" ||
      path === "/monteringsanvisning" ||
      path === "/kundeservice/faq"
    ) {
      return "support";
    }
    if (path === "/" || path === "/home") return "home";
    if (path === "/firmainfo" || path === "/tilsette" || path === "/aktuelt") {
      return "company";
    }
  }
  return "company";
}

function eyebrowFor(doc: SanityContentDoc, fallback?: ContentPage) {
  if (fallback?.eyebrow) return fallback.eyebrow;
  if (doc._type === "product") return "Produkt";
  if (doc._type === "service") return "Teneste";
  if (doc._type === "newsArticle") return "Aktuelt";
  if (doc._type === "referenceProject") return "Referanse";
  return "Fresvik Produkt";
}

function imageCard(doc: SanityContentDoc): ContentCard[] {
  if (!doc.imageUrl) return [];
  return [
    {
      title: doc.title || "Bilde",
      text: firstUsefulText(doc),
      imageUrl: doc.imageUrl,
      imageAlt: doc.title || "Fresvik Produkt",
    },
  ];
}

function bodySection(doc: SanityContentDoc) {
  const paragraphs =
    doc._type === "referenceProject" && doc.description
      ? doc.description.split(/\n+/).map((line) => line.trim()).filter(Boolean)
      : plainTextFromBlocks(doc.body);

  if (paragraphs.length === 0) return null;

  if (doc._type === "referenceProject") {
    return {
      title: "Prosjekttekst",
      items: [
        {
          title: doc.title || "Referanse",
          text: paragraphs.join("\n\n"),
          imageUrl: doc.imageUrl,
          imageAlt: doc.title || "Referanse",
        },
      ],
    };
  }

  return {
    title: "Innhald frå Sanity",
    items: paragraphs.map((text, index) => ({
      title: paragraphs.length === 1 ? doc.title || "Innhald" : `Avsnitt ${index + 1}`,
      text,
    })),
  };
}

function listSection(title: string, values?: string[]) {
  const items = (values || []).filter(Boolean);
  if (items.length === 0) return null;
  return {
    title,
    items: items.map((text) => ({ title: text, text })),
  };
}

function documentsSection(documents?: SanityDocumentRef[]) {
  const items = (documents || [])
    .map((document) => ({
      title: document.title || "Dokument",
      text: document.description || document.category || "Dokumentasjon frå Fresvik Produkt.",
      href: document.fileUrl || document.externalUrl || document.localPath,
      meta: document.category,
    }))
    .filter((item) => item.href);

  if (items.length === 0) return null;
  return { title: "Dokument", items };
}

function migrationContentCard(card: SanityMigrationCard): ContentCard {
  return {
    title: card.title || "Innhald",
    text: card.text || card.meta || "Informasjon frå Fresvik Produkt.",
    href: card.fileUrl || card.href,
    meta: card.meta,
    imageUrl: card.imageUrl,
    imageAlt: card.imageAlt || card.title,
  };
}

function migrationCards(doc: SanityContentDoc) {
  return (doc.migrationCards || [])
    .map(migrationContentCard)
    .filter((card) => card.title && card.text);
}

function migrationSections(doc: SanityContentDoc) {
  return (doc.migrationSections || [])
    .map((section) => ({
      title: section.title || "Innhald",
      intro: section.intro,
      items: (section.items || [])
        .map(migrationContentCard)
        .filter((item) => item.title && item.text),
    }))
    .filter((section) => section.title && section.items.length > 0);
}

function sanitySections(doc: SanityContentDoc) {
  const sections = [
    bodySection(doc),
    listSection("Eigenskapar", doc.features),
    doc.technicalData && doc.technicalData.length > 0
      ? {
          title: "Tekniske data",
          items: doc.technicalData
            .filter((item) => item.label || item.value)
            .map((item) => ({
              title: item.label || "Teknisk data",
              text: item.value || item.label || "",
            })),
        }
      : null,
    listSection("Bruksområde", doc.applications),
    doc.processSteps && doc.processSteps.length > 0
      ? {
          title: "Prosess",
          items: doc.processSteps
            .filter((item) => item.title || item.text)
            .map((item) => ({
              title: item.title || "Steg",
              text: item.text || item.title || "",
            })),
        }
      : null,
    documentsSection(doc.documents),
  ].filter((section): section is NonNullable<typeof section> => Boolean(section));

  return sections;
}

function itemHref(item: SanityIndexItem) {
  if (item.slug) return pathForSlug(item.slug);
  return item.fileUrl || item.externalUrl || item.localPath;
}

function localizedIndexHref(href: string | undefined, language: "nn" | "en") {
  if (
    !href ||
    !href.startsWith("/") ||
    href.startsWith("/assets/") ||
    href.startsWith("/s/")
  ) {
    return href;
  }
  return withLocale(href, language);
}

function indexCards(items: SanityIndexItem[], language: "nn" | "en" = "nn") {
  return items
    .map((item) => ({
      title: item.title || item.name || "Innhald",
      text:
        item.text ||
        item.excerpt ||
        item.description ||
        item.intro ||
        compactText([item.role, item.location, item.phone, item.email]) ||
        "Informasjon frå Fresvik Produkt.",
      href: localizedIndexHref(itemHref(item), language),
      meta: compactText([item.date, item.year, item.category]) || undefined,
      imageUrl: item.imageUrl,
      imageAlt: item.title || item.name,
    }))
    .filter((item) => item.title && item.text);
}

function withoutLocalAssetRefs(cards: ContentCard[]) {
  return cards.map((card) => ({
    ...card,
    href: card.href?.startsWith("/assets/fresvik/") ? undefined : card.href,
    imageUrl: card.imageUrl?.startsWith("/assets/fresvik/")
      ? undefined
      : card.imageUrl,
  }));
}

function localizedVisualFields(card: ContentCard | undefined, language: "nn" | "en") {
  if (!card) return {};

  return {
    href: localizedIndexHref(card.href, language),
    imageUrl: card.imageUrl,
    imageAlt: card.imageAlt || card.title,
    meta: card.meta,
  };
}

function localizeCardHref(card: ContentCard, language: "nn" | "en"): ContentCard {
  return {
    ...card,
    href: localizedIndexHref(card.href, language),
  };
}

function mergeEnglishVisualCard(
  visualCard: ContentCard | undefined,
  copyCard: ContentCard | undefined,
): ContentCard | undefined {
  if (!visualCard && !copyCard) return undefined;

  const base = visualCard ?? copyCard;
  if (!base) return undefined;

  return {
    ...base,
    title: copyCard?.title || base.title,
    text: copyCard?.text || base.text,
    href: localizedIndexHref(copyCard?.href || base.href, "en"),
    meta: copyCard?.meta || base.meta,
    imageUrl: base.imageUrl || copyCard?.imageUrl,
    imageAlt: copyCard?.imageAlt || base.imageAlt || copyCard?.title || base.title,
  };
}

function isMigrationArchiveSectionTitle(title: string) {
  return (
    title === "Full tekst frå gammal side" ||
    title === "Bilde frå gammal side" ||
    title === "Dokumentlenker frå gammal side" ||
    title === "Lenker frå gammal side" ||
    title === "Lenker frå gammal aktuelt-side" ||
    title === "Nyheitsbrev og footerlenker frå gammal side"
  );
}

function mergeEnglishVisualSections(
  visualSections: ContentPage["sections"],
  copySections: ContentPage["sections"],
): ContentPage["sections"] {
  const copyQueue = copySections.filter(
    (section) => !isMigrationArchiveSectionTitle(section.title),
  );
  let copyIndex = 0;

  return visualSections.map((visualSection) => {
    const copySection = isMigrationArchiveSectionTitle(visualSection.title)
      ? undefined
      : copyQueue[copyIndex++];

    return {
      ...visualSection,
      intro: copySection?.intro || visualSection.intro,
      items: visualSection.items.map((visualItem, itemIndex) => {
        const copyItem = copySection?.items[itemIndex];
        return (
          mergeEnglishVisualCard(visualItem, copyItem) ||
          localizeCardHref(visualItem, "en")
        );
      }),
    };
  });
}

function enrichEnglishIndexSections(
  path: string,
  sections: ContentPage["sections"],
  fallbackSections: ContentPage["sections"] | undefined,
): ContentPage["sections"] {
  if (!fallbackSections?.length) return sections;

  const visualItems =
    path === "/produkt"
      ? fallbackSections.flatMap((section) =>
          ["Fresvik-panel", "Våre produkt", "Tilbehør"].includes(section.title)
            ? section.items
            : [],
        )
      : path === "/tenester"
        ? fallbackSections.find((section) => section.title === "Tenesteområde")
            ?.items || []
        : path === "/referansar"
          ? fallbackSections.find((section) => section.title === "Referansar")
              ?.items || []
          : path === "/aktuelt"
            ? fallbackSections.find((section) => section.title === "Aktuelt")
                ?.items || []
            : path === "/tilsette"
              ? fallbackSections.find((section) => section.title === "Kontaktpersonar")
                  ?.items || []
              : [];

  if (!visualItems.length) return sections;

  return sections.map((section) => ({
    ...section,
    items: section.items.map((item, index) => ({
      ...item,
      ...localizedVisualFields(visualItems[index], "en"),
      title: item.title,
      text: item.text,
      meta: item.meta || visualItems[index]?.meta,
      imageAlt: item.imageAlt || visualItems[index]?.imageAlt || item.title,
    })),
  }));
}

function enrichEnglishHomeSections(
  sections: ContentPage["sections"],
  fallbackSections: ContentPage["sections"] | undefined,
): ContentPage["sections"] {
  if (!fallbackSections?.length) return sections;

  const productVisuals =
    fallbackSections.find((section) => section.title.includes("Produktteaserar"))
      ?.items || [];
  const customerVisuals =
    fallbackSections
      .find((section) => section.title === "Våre kundar")
      ?.items.filter((item) => !item.title.toLowerCase().includes("dekor")) ||
    [];

  return sections.map((section) => {
    const visualSource = section.title === "Products and solutions"
      ? productVisuals
      : section.title === "Customer areas"
        ? customerVisuals
        : [];

    if (!visualSource.length) return section;

    return {
      ...section,
      items: section.items.map((item, index) => ({
        ...item,
        ...localizedVisualFields(visualSource[index], "en"),
        imageAlt: item.imageAlt || visualSource[index]?.imageAlt || item.title,
      })),
    };
  });
}

async function getIndexSections(path: string, language: "nn" | "en" = "nn") {
  if (path === "/aktuelt") {
    const items = await client.fetch<SanityIndexItem[]>(NEWS_INDEX_QUERY, { language }, { next: { revalidate: 60 } });
    return [{ title: "Nyheiter frå Sanity", items: indexCards(items, language) }];
  }
  if (path === "/referansar") {
    const items = await client.fetch<SanityIndexItem[]>(REFERENCES_INDEX_QUERY, { language }, { next: { revalidate: 60 } });
    return [{ title: "Referansar frå Sanity", items: indexCards(items, language) }];
  }
  if (path === "/produkt") {
    const items = await client.fetch<SanityIndexItem[]>(PRODUCTS_INDEX_QUERY, { language }, { next: { revalidate: 60 } });
    return [{ title: "Produkt frå Sanity", items: indexCards(items, language) }];
  }
  if (path === "/tenester") {
    const items = await client.fetch<SanityIndexItem[]>(SERVICES_INDEX_QUERY, { language }, { next: { revalidate: 60 } });
    return [{ title: "Tenester frå Sanity", items: indexCards(items, language) }];
  }
  if (path === "/dokumentasjon" || path === "/monteringsanvisning") {
    const allItems = await client.fetch<SanityIndexItem[]>(DOCUMENTS_INDEX_QUERY, { language }, { next: { revalidate: 60 } });
    const filtered =
      path === "/monteringsanvisning"
        ? allItems.filter((item) =>
            `${item.category || ""} ${item.title || ""}`.toLowerCase().includes("mont"),
          )
        : allItems;
    return [{ title: "Dokument frå Sanity", items: indexCards(filtered, language) }];
  }
  if (path === "/tilsette") {
    const items = await client.fetch<SanityIndexItem[]>(EMPLOYEES_INDEX_QUERY, { language }, { next: { revalidate: 60 } });
    return [{ title: "Tilsette frå Sanity", items: indexCards(items, language) }];
  }
  if (path === "/kundeservice/faq") {
    const items = await client.fetch<SanityIndexItem[]>(FAQ_INDEX_QUERY, { language }, { next: { revalidate: 60 } });
    return [{ title: "Spørsmål frå Sanity", items: indexCards(items, language) }];
  }
  return [];
}

function mergeContentPage(
  doc: SanityContentDoc,
  fallback: ContentPage | undefined,
  indexSections: ContentPage["sections"],
  language: "nn" | "en" = "nn",
): ContentPage {
  const path = pathForSlug(doc.slug);
  const canUseFallbackContent = language === "nn";
  const ownSections = sanitySections(doc);
  const structuredMigrationSections = migrationSections(doc);
  const sourcePath = sourcePathForDoc(doc);
  const localizedStructuredSections =
    language === "en" && sourcePath === "/"
      ? enrichEnglishHomeSections(structuredMigrationSections, fallback?.sections)
      : structuredMigrationSections;
  const hybridEnglishSections =
    language === "en" && fallback && sourcePath !== "/"
      ? mergeEnglishVisualSections(fallback.sections, localizedStructuredSections)
      : localizedStructuredSections;
  const localizedIndexSections =
    language === "en"
      ? enrichEnglishIndexSections(sourcePath, indexSections, fallback?.sections)
      : indexSections;
  const preferIndexSections =
    localizedIndexSections.length > 0 && indexContentPaths.has(sourcePath);
  const keepLocalMigrationStructure =
    canUseFallbackContent && Boolean(fallback) && localMigrationStructurePaths.has(path);
  const sanityCards = migrationCards(doc);
  const imageCards = imageCard(doc);
  let sections: ContentPage["sections"];
  let cards: ContentPage["cards"];

  if (keepLocalMigrationStructure) {
    sections = fallback?.sections || [];
    cards = fallback?.cards || [];
  } else {
    sections =
      preferIndexSections
        ? localizedIndexSections
        : hybridEnglishSections.length > 0
        ? hybridEnglishSections
        : localizedIndexSections.length > 0
        ? localizedIndexSections
        : ownSections.length > 0
          ? ownSections
          : canUseFallbackContent
            ? fallback?.sections || []
            : [];
    cards =
      sanityCards.length > 0
        ? sanityCards
        : localizedIndexSections[0]?.items.slice(0, 9) ||
          (imageCards.length > 0
            ? imageCards
            : canUseFallbackContent
              ? withoutLocalAssetRefs(fallback?.cards || [])
              : []);
  }

  const useFallbackHero = path === "/aktuelt" && Boolean(fallback);

  return {
    slug: path,
    title:
      useFallbackHero && fallback
        ? fallback.title
        : keepLocalMigrationStructure && fallback
        ? fallback.title
        : doc.title || fallback?.title || "Fresvik Produkt",
    eyebrow: eyebrowFor(doc, canUseFallbackContent ? fallback : undefined),
    intro:
      useFallbackHero && fallback
        ? fallback.intro
        : keepLocalMigrationStructure && fallback
        ? fallback.intro
        : firstUsefulText(doc) || fallback?.intro || doc.title || "Fresvik Produkt",
    description:
      keepLocalMigrationStructure && fallback
        ? fallback.description
        : doc.seoDescription ||
          doc.excerpt ||
          doc.shortDescription ||
          doc.description ||
          fallback?.description ||
          firstUsefulText(doc),
    pageType: fallback?.pageType || pageTypeFor(doc),
    priority: fallback?.priority || "medium",
    sourceUrl: doc.sourceUrl || fallback?.sourceUrl,
    publishedAt: doc.date,
    showMigrationDetails: false,
    cards,
    sections,
    todo: undefined,
  };
}

export async function getSanityContentSlugs() {
  if (!isSanityConfigured) return [];

  try {
    const slugs = await client.fetch<string[]>(
      CONTENT_SLUGS_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
    return slugs.map(pathForSlug).filter((path) => path !== "/");
  } catch (error) {
    console.error("Failed to load Sanity content slugs", error);
    return [];
  }
}

export async function getSanityContentPage(path: string, language: "nn" | "en" = "nn") {
  const fallback = getFallbackContentPage(path);
  if (!isSanityConfigured) return language === "nn" ? fallback : null;

  const slugs = [slugForPath(path)];
  if (language === "en") {
    const englishPath = englishPathForSourcePath(path);
    const englishSlug = slugForPath(englishPath);
    if (!slugs.includes(englishSlug)) slugs.push(englishSlug);
  }

  try {
    const doc = await client.fetch<SanityContentDoc | null>(
      CONTENT_DOC_QUERY,
      { slugs, language },
      { next: { revalidate: 60 } },
    );

    if (!doc) return language === "nn" ? fallback : null;

    const normalizedPath = sourcePathForDoc(doc);
    const indexSections = await getIndexSections(normalizedPath, language);
    return mergeContentPage(doc, fallback, indexSections, language);
  } catch (error) {
    console.error(`Failed to load ${path} from Sanity`, error);
    return language === "nn" ? fallback : null;
  }
}
