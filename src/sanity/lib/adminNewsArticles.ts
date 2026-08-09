import "server-only";

import { stripLocalePrefix, type Locale } from "@/i18n/config";
import { getSanityWriteClient } from "@/sanity/lib/writeClient";

type SanityRecord = Record<string, unknown>;

type RawNewsArticle = {
  _id: string;
  _rev: string;
  title?: string;
  date?: string;
  excerpt?: string;
  body?: SanityRecord[];
  migrationSections?: SanityRecord[];
};

export type EditableNewsArticle = {
  title: string;
  date: string;
  excerpt: string;
  body: string;
};

export type EditableNewsArticleUpdate = EditableNewsArticle;

const newsArticleQuery = `
  *[
    _type == "newsArticle" &&
    slug.current == $slug &&
    (
      language == $language ||
      (!defined(language) && $language == "nn")
    )
  ] | order(_updatedAt desc)[0] {
    _id,
    _rev,
    title,
    date,
    excerpt,
    body,
    migrationSections
  }
`;

function newsSlugFromPath(pathname: string, locale: Locale) {
  const canonicalPath = stripLocalePrefix(pathname).replace(/\/+$/, "");
  const prefix = "/aktuelt/";

  if (!canonicalPath.startsWith(prefix)) return null;

  const articleSlug = canonicalPath.slice(prefix.length);
  if (!articleSlug || articleSlug.includes("/")) return null;

  return locale === "en"
    ? `about/news/${articleSlug}`
    : `aktuelt/${articleSlug}`;
}

function portableTextToPlainText(body: SanityRecord[] | undefined) {
  if (!Array.isArray(body)) return "";

  return body
    .map((block) => {
      const children = Array.isArray(block.children)
        ? (block.children as SanityRecord[])
        : [];

      return children
        .map((child) => (typeof child.text === "string" ? child.text : ""))
        .join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

function mainNewsSection(sections: SanityRecord[] | undefined) {
  if (!Array.isArray(sections)) return undefined;

  return sections.find((section) => section._key === "news-article-main") ||
    sections.find(
      (section) =>
        typeof section.kind === "string" &&
        (section.kind.includes("nyheit") || section.kind === "article-body"),
    ) ||
    sections.find((section) => {
      const items = Array.isArray(section.items)
        ? (section.items as SanityRecord[])
        : [];

      return items.some((item) => typeof item.text === "string");
    });
}

function articleBodyFromDocument(document: RawNewsArticle) {
  const section = mainNewsSection(document.migrationSections);
  const items = section && Array.isArray(section.items)
    ? (section.items as SanityRecord[])
    : [];
  const sectionBody = items.find((item) => typeof item.text === "string")?.text;

  return typeof sectionBody === "string"
    ? sectionBody
    : portableTextToPlainText(document.body);
}

function portableTextFromPlainText(text: string) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => ({
      _key: `admin-block-${index}`,
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: `admin-span-${index}`,
          _type: "span",
          marks: [],
          text: paragraph,
        },
      ],
    }));
}

function formattedPublishedDate(date: string, locale: Locale) {
  const value = new Date(`${date}T12:00:00Z`);
  const formatted = new Intl.DateTimeFormat(
    locale === "en" ? "en-GB" : "nn-NO",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
  ).format(value);

  return locale === "en" ? `Published ${formatted}.` : `Publisert ${formatted}.`;
}

function updateMigrationSections(
  sections: SanityRecord[] | undefined,
  update: EditableNewsArticleUpdate,
  locale: Locale,
) {
  const currentSections = Array.isArray(sections) ? sections : [];
  const mainSection = mainNewsSection(currentSections);

  if (!mainSection) {
    return [
      {
        _key: "news-article-main",
        _type: "migrationSection",
        kind: "article-body",
        translationKey: "news-article-main",
        title: locale === "en" ? "News item" : "Nyheit",
        intro: formattedPublishedDate(update.date, locale),
        items: [
          {
            _key: "news-article-main-text",
            _type: "migrationCard",
            title: update.title,
            text: update.body,
            meta: update.excerpt,
          },
        ],
      },
      ...currentSections,
    ];
  }

  return currentSections.map((section) => {
    if (section !== mainSection) return section;

    const items = Array.isArray(section.items)
      ? (section.items as SanityRecord[])
      : [];
    const textItemIndex = items.findIndex(
      (item) => typeof item.text === "string",
    );
    const nextItems = [...items];

    if (textItemIndex >= 0) {
      nextItems[textItemIndex] = {
        ...nextItems[textItemIndex],
        title: update.title,
        text: update.body,
        meta: update.excerpt,
      };
    } else {
      nextItems.unshift({
        _key: "news-article-main-text",
        _type: "migrationCard",
        title: update.title,
        text: update.body,
        meta: update.excerpt,
      });
    }

    return {
      ...section,
      intro: formattedPublishedDate(update.date, locale),
      items: nextItems,
    };
  });
}

async function findNewsArticle(pathname: string, locale: Locale) {
  const slug = newsSlugFromPath(pathname, locale);
  if (!slug) return null;

  return getSanityWriteClient().fetch<RawNewsArticle | null>(newsArticleQuery, {
    slug,
    language: locale,
  });
}

export async function getEditableNewsArticle(
  pathname: string,
  locale: Locale,
): Promise<EditableNewsArticle | null> {
  const document = await findNewsArticle(pathname, locale);
  if (!document) return null;

  return {
    title: document.title || "",
    date: document.date || "",
    excerpt: document.excerpt || "",
    body: articleBodyFromDocument(document),
  };
}

export async function updateEditableNewsArticle(
  pathname: string,
  locale: Locale,
  update: EditableNewsArticleUpdate,
) {
  const document = await findNewsArticle(pathname, locale);
  if (!document) return null;

  const migrationSections = updateMigrationSections(
    document.migrationSections,
    update,
    locale,
  );

  await getSanityWriteClient()
    .patch(document._id)
    .ifRevisionId(document._rev)
    .set({
      title: update.title,
      date: update.date,
      excerpt: update.excerpt,
      body: portableTextFromPlainText(update.body),
      migrationSections,
    })
    .commit({ autoGenerateArrayKeys: true });

  return { ...update };
}
