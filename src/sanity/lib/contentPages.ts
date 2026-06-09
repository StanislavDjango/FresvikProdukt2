import { defineQuery } from "next-sanity";
import {
  getContentPage as getFallbackContentPage,
  type ContentCard,
  type ContentPage,
} from "@/data/pages";
import { isSanityConfigured } from "../env";
import { client } from "./client";

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
  slug.current == $slug
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
  "imageUrl": coalesce(heroImage.asset->url, image.asset->url),
  "documents": documents[]->{
    title,
    category,
    description,
    externalUrl,
    localPath,
    "fileUrl": file.asset->url
  }
}`);

const CONTENT_SLUGS_QUERY = defineQuery(`*[
  _type in ["page", "product", "service", "newsArticle", "referenceProject"] &&
  defined(slug.current)
].slug.current`);

const localMigrationStructurePaths = new Set([
  "/",
  "/produkt/fresvik-pir-panel",
  "/produkt/fresvik-pur-panel",
]);

const NEWS_INDEX_QUERY = defineQuery(`*[_type == "newsArticle"] | order(date desc, title asc) {
  title,
  "slug": slug.current,
  excerpt,
  date,
  "imageUrl": image.asset->url
}`);

const REFERENCES_INDEX_QUERY = defineQuery(`*[_type == "referenceProject"] | order(year desc, title asc) {
  title,
  "slug": slug.current,
  description,
  year,
  category,
  location,
  "imageUrl": image.asset->url
}`);

const PRODUCTS_INDEX_QUERY = defineQuery(`*[_type == "product"] | order(title asc) {
  title,
  "slug": slug.current,
  intro,
  shortDescription,
  "imageUrl": heroImage.asset->url
}`);

const SERVICES_INDEX_QUERY = defineQuery(`*[_type == "service"] | order(title asc) {
  title,
  "slug": slug.current,
  intro,
  "imageUrl": image.asset->url
}`);

const DOCUMENTS_INDEX_QUERY = defineQuery(`*[_type == "documentFile"] | order(category asc, title asc) {
  title,
  category,
  description,
  externalUrl,
  localPath,
  "fileUrl": file.asset->url
}`);

const EMPLOYEES_INDEX_QUERY = defineQuery(`*[_type == "employee"] | order(order asc, name asc) {
  "title": name,
  role,
  location,
  phone,
  email,
  "imageUrl": image.asset->url
}`);

const FAQ_INDEX_QUERY = defineQuery(`*[_type == "faqItem"] | order(order asc, question asc) {
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
    const path = pathForSlug(doc.slug);
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

  return {
    title: doc._type === "referenceProject" ? "Prosjekttekst" : "Innhald frå Sanity",
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
      text: document.description || document.category || "Dokument importert i Sanity.",
      href: document.fileUrl || document.externalUrl || document.localPath,
      meta: document.category,
    }))
    .filter((item) => item.href);

  if (items.length === 0) return null;
  return { title: "Dokument", items };
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

function indexCards(items: SanityIndexItem[]) {
  return items
    .map((item) => ({
      title: item.title || item.name || "Innhald",
      text:
        item.text ||
        item.excerpt ||
        item.description ||
        item.intro ||
        compactText([item.role, item.location, item.phone, item.email]) ||
        "Migrert innhald frå Sanity.",
      href: itemHref(item),
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

async function getIndexSections(path: string) {
  if (path === "/aktuelt") {
    const items = await client.fetch<SanityIndexItem[]>(NEWS_INDEX_QUERY, {}, { next: { revalidate: 60 } });
    return [{ title: "Nyheiter frå Sanity", items: indexCards(items) }];
  }
  if (path === "/referansar") {
    const items = await client.fetch<SanityIndexItem[]>(REFERENCES_INDEX_QUERY, {}, { next: { revalidate: 60 } });
    return [{ title: "Referansar frå Sanity", items: indexCards(items) }];
  }
  if (path === "/produkt") {
    const items = await client.fetch<SanityIndexItem[]>(PRODUCTS_INDEX_QUERY, {}, { next: { revalidate: 60 } });
    return [{ title: "Produkt frå Sanity", items: indexCards(items) }];
  }
  if (path === "/tenester") {
    const items = await client.fetch<SanityIndexItem[]>(SERVICES_INDEX_QUERY, {}, { next: { revalidate: 60 } });
    return [{ title: "Tenester frå Sanity", items: indexCards(items) }];
  }
  if (path === "/dokumentasjon" || path === "/monteringsanvisning") {
    const allItems = await client.fetch<SanityIndexItem[]>(DOCUMENTS_INDEX_QUERY, {}, { next: { revalidate: 60 } });
    const filtered =
      path === "/monteringsanvisning"
        ? allItems.filter((item) =>
            `${item.category || ""} ${item.title || ""}`.toLowerCase().includes("mont"),
          )
        : allItems;
    return [{ title: "Dokument frå Sanity", items: indexCards(filtered) }];
  }
  if (path === "/tilsette") {
    const items = await client.fetch<SanityIndexItem[]>(EMPLOYEES_INDEX_QUERY, {}, { next: { revalidate: 60 } });
    return [{ title: "Tilsette frå Sanity", items: indexCards(items) }];
  }
  if (path === "/kundeservice/faq") {
    const items = await client.fetch<SanityIndexItem[]>(FAQ_INDEX_QUERY, {}, { next: { revalidate: 60 } });
    return [{ title: "Spørsmål frå Sanity", items: indexCards(items) }];
  }
  return [];
}

function mergeContentPage(
  doc: SanityContentDoc,
  fallback: ContentPage | undefined,
  indexSections: ContentPage["sections"],
): ContentPage {
  const path = pathForSlug(doc.slug);
  const ownSections = sanitySections(doc);
  const keepLocalMigrationStructure =
    Boolean(fallback) && localMigrationStructurePaths.has(path);
  const sanityCards = imageCard(doc);
  let sections: ContentPage["sections"];
  let cards: ContentPage["cards"];

  if (keepLocalMigrationStructure) {
    sections = fallback?.sections || [];
    cards = fallback?.cards || [];
  } else {
    sections =
      indexSections.length > 0
        ? indexSections
        : ownSections.length > 0
          ? ownSections
          : fallback?.sections || [];
    cards =
      indexSections[0]?.items.slice(0, 9) ||
      (sanityCards.length > 0
        ? sanityCards
        : withoutLocalAssetRefs(fallback?.cards || []));
  }

  return {
    slug: path,
    title:
      keepLocalMigrationStructure && fallback
        ? fallback.title
        : doc.title || fallback?.title || "Fresvik Produkt",
    eyebrow: eyebrowFor(doc, fallback),
    intro:
      keepLocalMigrationStructure && fallback
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

export async function getSanityContentPage(path: string) {
  const fallback = getFallbackContentPage(path);
  if (!isSanityConfigured) return fallback;

  try {
    const doc = await client.fetch<SanityContentDoc | null>(
      CONTENT_DOC_QUERY,
      { slug: slugForPath(path) },
      { next: { revalidate: 60 } },
    );

    if (!doc) return fallback;

    const normalizedPath = pathForSlug(doc.slug);
    const indexSections = await getIndexSections(normalizedPath);
    return mergeContentPage(doc, fallback, indexSections);
  } catch (error) {
    console.error(`Failed to load ${path} from Sanity`, error);
    return fallback;
  }
}
