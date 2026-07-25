import { defineQuery } from "next-sanity";
import {
  getEnglishPageCopy,
} from "@/data/englishPages";
import {
  getContentPage as getFallbackContentPage,
  type ContentCard,
  type ContentPage,
  type ContentSection,
} from "@/data/pages";
import {
  isMigrationArchiveKind,
  sectionIs,
  sectionKind,
  stableContentSections,
} from "@/i18n/contentStructure";
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
  _key?: string;
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
  _key?: string;
  kind?: string;
  translationKey?: string;
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
  translationGroup?: string;
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
    _key,
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
    _key,
    kind,
    translationKey,
    title,
    intro,
    "items": items[]{
      _key,
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
  translationGroup,
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
  translationGroup,
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
  translationGroup,
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
  translationGroup,
  "slug": slug.current,
  intro,
  "imageUrl": image.asset->url
}`);

const DOCUMENTS_INDEX_QUERY = defineQuery(`*[
  _type == "documentFile" &&
  ((!defined(language) && $language == "nn") || language == $language)
] | order(category asc, title asc) {
  title,
  translationGroup,
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
  translationGroup,
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
  translationGroup,
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
    key: card._key,
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
  const sourcePath = sourcePathForDoc(doc);
  const sections = (doc.migrationSections || [])
    .map((section) => {
      const title = section.title || "Innhald";
      return {
        key: section._key,
        kind: section.kind,
        translationKey: section.translationKey,
        title,
        intro: section.intro,
        items: (section.items || [])
          .map(migrationContentCard)
          .filter((item) => item.title && item.text),
      };
    })
    .filter((section) => section.title && section.items.length > 0);

  return stableContentSections(sections, sourcePath);
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

function translatedField<T>(translated: T | undefined, fallback: T) {
  if (typeof translated === "string") {
    return translated.trim() ? translated : fallback;
  }
  return translated ?? fallback;
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
    title: translatedField(copyCard?.title, base.title),
    text: translatedField(copyCard?.text, base.text),
    href: localizedIndexHref(translatedField(copyCard?.href, base.href), "en"),
    meta: translatedField(copyCard?.meta, base.meta),
    imageUrl: base.imageUrl || copyCard?.imageUrl,
    imageAlt: translatedField(
      copyCard?.imageAlt,
      base.imageAlt || copyCard?.title || base.title,
    ),
  };
}

function publicContentSections(
  sections: ContentPage["sections"],
  sourcePath: string,
) {
  return stableContentSections(sections, sourcePath).filter(
    (section) => !isMigrationArchiveKind(section.kind),
  );
}

function canonicalCardHref(card: ContentCard | undefined) {
  if (!card?.href?.startsWith("/")) return undefined;
  return sourcePathForEnglishPath(
    card.href.startsWith("/en/") ? card.href.slice(3) : card.href,
  );
}

function findCopySection(
  visualSection: ContentSection,
  visualSections: ContentPage["sections"],
  copySections: ContentPage["sections"],
) {
  const byTranslationKey = visualSection.translationKey
    ? copySections.find(
        (section) => section.translationKey === visualSection.translationKey,
      )
    : undefined;
  if (byTranslationKey) return byTranslationKey;

  const byKey = visualSection.key
    ? copySections.find((section) => section.key === visualSection.key)
    : undefined;
  if (byKey) return byKey;

  const visualKind = sectionKind(visualSection);
  if (!visualKind) return undefined;

  const visualKindMatches = visualSections.filter(
    (section) => sectionKind(section) === visualKind,
  );
  const copyKindMatches = copySections.filter(
    (section) => sectionKind(section) === visualKind,
  );
  return visualKindMatches.length === 1 && copyKindMatches.length === 1
    ? copyKindMatches[0]
    : undefined;
}

function findCopyCard(
  visualCard: ContentCard,
  copyCards: ContentCard[],
) {
  const byKey = visualCard.key
    ? copyCards.find((card) => card.key === visualCard.key)
    : undefined;
  if (byKey) return byKey;

  const href = canonicalCardHref(visualCard);
  const byHref = href
    ? copyCards.find((card) => canonicalCardHref(card) === href)
    : undefined;
  if (byHref) return byHref;
  return undefined;
}

function mergeEnglishVisualSections(
  visualSections: ContentPage["sections"],
  copySections: ContentPage["sections"],
  sourcePath: string,
): ContentPage["sections"] {
  const stableVisualSections = stableContentSections(visualSections, sourcePath);
  const stableCopySections = stableContentSections(copySections, sourcePath);

  return stableVisualSections.map((visualSection) => {
    const copySection = findCopySection(
      visualSection,
      stableVisualSections,
      stableCopySections,
    );

    return {
      ...visualSection,
      kind: sectionKind(visualSection),
      title: translatedField(copySection?.title, visualSection.title),
      intro: translatedField(copySection?.intro, visualSection.intro),
      items: visualSection.items.map((visualItem) => {
        const copyItem = copySection
          ? findCopyCard(visualItem, copySection.items)
          : undefined;
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

  const stableFallbackSections = stableContentSections(fallbackSections, path);
  const visualItems =
    path === "/produkt"
      ? stableFallbackSections.flatMap((section) =>
          sectionIs(section, "products") ? section.items : [],
        )
      : path === "/tenester"
        ? stableFallbackSections.find((section) => sectionIs(section, "services"))
            ?.items || []
        : path === "/referansar"
          ? stableFallbackSections.find((section) => sectionIs(section, "references"))
              ?.items || []
          : path === "/aktuelt"
            ? stableFallbackSections.find((section) => sectionIs(section, "news"))
                ?.items || []
            : path === "/tilsette"
              ? stableFallbackSections.find((section) => sectionIs(section, "employees"))
                  ?.items || []
              : [];

  if (!visualItems.length) return sections;

  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      const visualItem = findCopyCard(item, visualItems);
      return {
        ...item,
        ...localizedVisualFields(visualItem, "en"),
        title: item.title,
        text: item.text,
        meta: item.meta || visualItem?.meta,
        imageAlt: item.imageAlt || visualItem?.imageAlt || item.title,
      };
    }),
  }));
}

function enrichEnglishHomeSections(
  sections: ContentPage["sections"],
  fallbackSections: ContentPage["sections"] | undefined,
): ContentPage["sections"] {
  if (!fallbackSections?.length) return sections;

  const stableFallbackSections = stableContentSections(fallbackSections, "/");
  const productVisuals =
    stableFallbackSections.find((section) => sectionIs(section, "products"))
      ?.items || [];
  const customerVisuals =
    stableFallbackSections
      .find((section) => sectionIs(section, "customer-areas"))
      ?.items.filter((item) => !item.title.toLowerCase().includes("dekor")) ||
    [];

  return sections.map((section) => {
    const visualSource = sectionIs(section, "products")
      ? productVisuals
      : sectionIs(section, "customer-areas")
        ? customerVisuals
        : [];

    if (!visualSource.length) return section;

    return {
      ...section,
      items: section.items.map((item) => {
        const visualItem = findCopyCard(item, visualSource);
        return {
          ...item,
          ...localizedVisualFields(visualItem, "en"),
          imageAlt: item.imageAlt || visualItem?.imageAlt || item.title,
        };
      }),
    };
  });
}

async function fetchIndexItemsWithFallback(
  query: string,
  language: "nn" | "en",
) {
  if (language === "nn") {
    return client.fetch<SanityIndexItem[]>(
      query,
      { language },
      { next: { revalidate: 60 } },
    );
  }

  const [sourceItems, englishItems] = await Promise.all([
    client.fetch<SanityIndexItem[]>(
      query,
      { language: "nn" },
      { next: { revalidate: 60 } },
    ),
    client.fetch<SanityIndexItem[]>(
      query,
      { language: "en" },
      { next: { revalidate: 60 } },
    ),
  ]);

  if (sourceItems.length === 0) return englishItems;
  if (englishItems.length === 0) return sourceItems;

  const usedEnglishItems = new Set<SanityIndexItem>();

  return sourceItems.map((sourceItem) => {
    const sourcePath = sourceItem.slug ? pathForSlug(sourceItem.slug) : undefined;
    const translation = englishItems.find((englishItem) => {
      if (usedEnglishItems.has(englishItem)) return false;
      if (
        sourceItem.translationGroup &&
        sourceItem.translationGroup === englishItem.translationGroup
      ) {
        return true;
      }
      if (!sourcePath || !englishItem.slug) return false;
      return (
        sourcePathForEnglishPath(pathForSlug(englishItem.slug)) === sourcePath
      );
    });

    if (!translation) return sourceItem;
    usedEnglishItems.add(translation);

    return {
      ...sourceItem,
      _type: translatedField(translation._type, sourceItem._type),
      title: translatedField(translation.title, sourceItem.title),
      name: translatedField(translation.name, sourceItem.name),
      slug: translatedField(translation.slug, sourceItem.slug),
      text: translatedField(translation.text, sourceItem.text),
      excerpt: translatedField(translation.excerpt, sourceItem.excerpt),
      description: translatedField(
        translation.description,
        sourceItem.description,
      ),
      intro: translatedField(translation.intro, sourceItem.intro),
      role: translatedField(translation.role, sourceItem.role),
      location: translatedField(translation.location, sourceItem.location),
      phone: translatedField(translation.phone, sourceItem.phone),
      email: translatedField(translation.email, sourceItem.email),
      date: translatedField(translation.date, sourceItem.date),
      year: translatedField(translation.year, sourceItem.year),
      category: translatedField(translation.category, sourceItem.category),
      imageUrl: translatedField(translation.imageUrl, sourceItem.imageUrl),
      fileUrl: translatedField(translation.fileUrl, sourceItem.fileUrl),
      externalUrl: translatedField(
        translation.externalUrl,
        sourceItem.externalUrl,
      ),
      localPath: translatedField(translation.localPath, sourceItem.localPath),
      translationGroup: translatedField(
        translation.translationGroup,
        sourceItem.translationGroup,
      ),
    };
  });
}

async function getIndexSections(path: string, language: "nn" | "en" = "nn") {
  if (path === "/aktuelt") {
    const items = await fetchIndexItemsWithFallback(NEWS_INDEX_QUERY, language);
    return [{
      kind: "news",
      title: language === "en" ? "News" : "Nyheiter frå Sanity",
      items: indexCards(items, language),
    }];
  }
  if (path === "/referansar") {
    const items = await fetchIndexItemsWithFallback(REFERENCES_INDEX_QUERY, language);
    return [{
      kind: "references",
      title: language === "en" ? "References" : "Referansar frå Sanity",
      items: indexCards(items, language),
    }];
  }
  if (path === "/produkt") {
    const items = await fetchIndexItemsWithFallback(PRODUCTS_INDEX_QUERY, language);
    return [{
      kind: "products",
      title: language === "en" ? "Products and solutions" : "Produkt frå Sanity",
      items: indexCards(items, language),
    }];
  }
  if (path === "/tenester") {
    const items = await fetchIndexItemsWithFallback(SERVICES_INDEX_QUERY, language);
    return [{
      kind: "services",
      title: language === "en" ? "Services" : "Tenester frå Sanity",
      items: indexCards(items, language),
    }];
  }
  if (path === "/dokumentasjon" || path === "/monteringsanvisning") {
    const allItems = await fetchIndexItemsWithFallback(DOCUMENTS_INDEX_QUERY, language);
    const filtered =
      path === "/monteringsanvisning"
        ? allItems.filter((item) =>
            `${item.category || ""} ${item.title || ""}`.toLowerCase().includes("mont"),
          )
        : allItems;
    return [{
      kind: path === "/monteringsanvisning" ? "mounting-downloads" : "documents",
      title: language === "en" ? "Documentation" : "Dokument frå Sanity",
      items: indexCards(filtered, language),
    }];
  }
  if (path === "/tilsette") {
    const items = await fetchIndexItemsWithFallback(EMPLOYEES_INDEX_QUERY, language);
    return [{
      kind: "employees",
      title: language === "en" ? "Employees" : "Tilsette frå Sanity",
      items: indexCards(items, language),
    }];
  }
  if (path === "/kundeservice/faq") {
    const items = await fetchIndexItemsWithFallback(FAQ_INDEX_QUERY, language);
    return [{
      kind: "faq",
      title: language === "en" ? "Questions" : "Spørsmål frå Sanity",
      items: indexCards(items, language),
    }];
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
      ? mergeEnglishVisualSections(
          fallback.sections,
          localizedStructuredSections,
          sourcePath,
        )
      : localizedStructuredSections;
  const localizedIndexSections =
    language === "en"
      ? enrichEnglishIndexSections(sourcePath, indexSections, fallback?.sections)
      : indexSections;
  const hasIndexItems = localizedIndexSections.some(
    (section) => section.items.length > 0,
  );
  const preferIndexSections = hasIndexItems && indexContentPaths.has(sourcePath);
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
    sections: publicContentSections(sections, sourcePath),
    todo: undefined,
  };
}

function localizeEnglishHref(href?: string) {
  return href?.startsWith("/") &&
    !href.startsWith("/assets/") &&
    !href.startsWith("/s/")
    ? withLocale(href, "en")
    : href;
}

function englishCopySections(
  doc: SanityContentDoc | null,
  indexSections: ContentPage["sections"],
  sourcePath: string,
) {
  if (indexContentPaths.has(sourcePath) && indexSections.length > 0) {
    return indexSections;
  }
  if (!doc) return [];

  const migrated = migrationSections(doc);
  return migrated.length > 0 ? migrated : sanitySections(doc);
}

function overlayEnglishPage(
  basePage: ContentPage,
  doc: SanityContentDoc | null,
  indexSections: ContentPage["sections"],
  sourcePath: string,
): ContentPage {
  const copy = getEnglishPageCopy(sourcePath);
  const baseSections = stableContentSections(basePage.sections, sourcePath);
  const translatedSections = englishCopySections(doc, indexSections, sourcePath);
  const translatedCards = doc ? migrationCards(doc) : [];
  const sections =
    translatedSections.length > 0
      ? mergeEnglishVisualSections(baseSections, translatedSections, sourcePath)
      : baseSections.map((section) => ({
          ...section,
          items: section.items.map((item) => localizeCardHref(item, "en")),
        }));
  const cards = basePage.cards.map((card) => {
    const translatedCard = findCopyCard(card, translatedCards);
    return (
      mergeEnglishVisualCard(card, translatedCard) ||
      localizeCardHref(card, "en")
    );
  });

  return {
    ...basePage,
    slug: withLocale(sourcePath, "en"),
    title: doc?.title || copy?.title || basePage.title,
    eyebrow: copy?.eyebrow || basePage.eyebrow,
    intro: (doc ? firstUsefulText(doc) : undefined) || copy?.intro || basePage.intro,
    description:
      doc?.seoDescription ||
      doc?.excerpt ||
      doc?.shortDescription ||
      doc?.description ||
      copy?.description ||
      basePage.description,
    sourceUrl: basePage.sourceUrl || doc?.sourceUrl,
    publishedAt: doc?.date || basePage.publishedAt,
    cards: cards.map((card) => ({
      ...card,
      href: localizeEnglishHref(card.href),
    })),
    sections: publicContentSections(sections, sourcePath).map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        href: localizeEnglishHref(item.href),
      })),
    })),
    showMigrationDetails: false,
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

async function fetchContentDoc(
  slugs: string[],
  language: "nn" | "en",
) {
  return client.fetch<SanityContentDoc | null>(
    CONTENT_DOC_QUERY,
    { slugs, language },
    { next: { revalidate: 60 } },
  );
}

export async function getSanityContentPage(path: string, language: "nn" | "en" = "nn") {
  const fallback = getFallbackContentPage(path);
  const publicFallback = fallback
    ? {
        ...fallback,
        sections: publicContentSections(fallback.sections, path),
      }
    : undefined;
  if (!isSanityConfigured) return language === "nn" ? publicFallback : null;

  const sourceSlug = slugForPath(path);

  try {
    if (language === "nn") {
      const doc = await fetchContentDoc([sourceSlug], "nn");
      if (!doc) return publicFallback;
      const normalizedPath = sourcePathForDoc(doc);
      const indexSections = await getIndexSections(normalizedPath, "nn");
      return mergeContentPage(doc, publicFallback, indexSections, "nn");
    }

    const englishSlug = slugForPath(englishPathForSourcePath(path));
    const [sourceDoc, englishDoc, sourceIndexSections, englishIndexSections] =
      await Promise.all([
        fetchContentDoc([sourceSlug], "nn"),
        fetchContentDoc(
          sourceSlug === englishSlug ? [sourceSlug] : [sourceSlug, englishSlug],
          "en",
        ),
        getIndexSections(path, "nn"),
        getIndexSections(path, "en"),
      ]);

    const basePage = sourceDoc
      ? mergeContentPage(sourceDoc, publicFallback, sourceIndexSections, "nn")
      : publicFallback;

    if (basePage) {
      return overlayEnglishPage(basePage, englishDoc, englishIndexSections, path);
    }
    if (!englishDoc) return null;

    return mergeContentPage(englishDoc, undefined, englishIndexSections, "en");
  } catch (error) {
    console.error(`Failed to load ${path} from Sanity`, error);
    return language === "nn" ? publicFallback : null;
  }
}
