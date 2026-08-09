import "server-only";

import {
  englishPathForSourcePath,
  stripLocalePrefix,
  type Locale,
} from "@/i18n/config";
import type { EditableContentPageFormValues } from "@/lib/adminContentPageSchema";
import { getSanityWriteClient } from "@/sanity/lib/writeClient";

type SanityRecord = Record<string, unknown>;

type RawMigrationItem = SanityRecord & {
  _key?: string;
  title?: string;
  text?: string;
  meta?: string;
};

type RawMigrationSection = SanityRecord & {
  _key?: string;
  title?: string;
  intro?: string;
  items?: RawMigrationItem[];
};

type RawContentPage = {
  _id: string;
  _rev: string;
  _type: "page" | "product" | "service" | "referenceProject";
  title?: string;
  intro?: string;
  shortDescription?: string;
  description?: string;
  migrationSections?: RawMigrationSection[];
};

export type EditableContentPage = EditableContentPageFormValues;
export type EditableContentPageUpdate = EditableContentPageFormValues;

const contentPageQuery = `
  *[
    _type in ["page", "product", "service", "referenceProject"] &&
    slug.current == $slug &&
    (
      language == $language ||
      (!defined(language) && $language == "nn")
    )
  ] | order(_updatedAt desc)[0] {
    _id,
    _rev,
    _type,
    title,
    intro,
    shortDescription,
    description,
    migrationSections
  }
`;

function slugForPath(pathname: string) {
  if (pathname === "/") return "home";
  return pathname.replace(/^\/+|\/+$/g, "") || "home";
}

function localizedSlugFromPath(pathname: string, locale: Locale) {
  const sourcePath = stripLocalePrefix(pathname);
  const localizedPath =
    locale === "en" ? englishPathForSourcePath(sourcePath) : sourcePath;

  return slugForPath(localizedPath);
}

function sectionKey(section: RawMigrationSection, index: number) {
  return section._key || `__section:${index}`;
}

function itemKey(item: RawMigrationItem, sectionIndex: number, index: number) {
  return item._key || `__item:${sectionIndex}:${index}`;
}

function editablePageFromDocument(
  document: RawContentPage,
): EditableContentPage {
  const sections = Array.isArray(document.migrationSections)
    ? document.migrationSections
    : [];

  return {
    title: document.title || "",
    intro:
      document.intro ||
      document.shortDescription ||
      document.description ||
      "",
    sections: sections.map((section, sectionIndex) => ({
      key: sectionKey(section, sectionIndex),
      title: section.title || "",
      intro: section.intro || "",
      items: (Array.isArray(section.items) ? section.items : []).map(
        (item, itemIndex) => ({
          key: itemKey(item, sectionIndex, itemIndex),
          title: item.title || "",
          text: item.text || "",
          meta: item.meta || "",
        }),
      ),
    })),
  };
}

function mergeMigrationSections(
  currentSections: RawMigrationSection[] | undefined,
  update: EditableContentPageUpdate,
) {
  if (!Array.isArray(currentSections)) return undefined;

  const updatesByKey = new Map(
    update.sections.map((section) => [section.key, section]),
  );

  return currentSections.map((section, sectionIndex) => {
    const sectionUpdate = updatesByKey.get(sectionKey(section, sectionIndex));
    if (!sectionUpdate) return section;

    const itemUpdatesByKey = new Map(
      sectionUpdate.items.map((item) => [item.key, item]),
    );
    const currentItems = Array.isArray(section.items) ? section.items : [];

    return {
      ...section,
      title: sectionUpdate.title,
      intro: sectionUpdate.intro,
      items: currentItems.map((item, itemIndex) => {
        const itemUpdate = itemUpdatesByKey.get(
          itemKey(item, sectionIndex, itemIndex),
        );
        if (!itemUpdate) return item;

        return {
          ...item,
          title: itemUpdate.title,
          text: itemUpdate.text,
          meta: itemUpdate.meta,
        };
      }),
    };
  });
}

async function findContentPage(pathname: string, locale: Locale) {
  return getSanityWriteClient().fetch<RawContentPage | null>(contentPageQuery, {
    slug: localizedSlugFromPath(pathname, locale),
    language: locale,
  });
}

export async function getEditableContentPage(
  pathname: string,
  locale: Locale,
): Promise<EditableContentPage | null> {
  const document = await findContentPage(pathname, locale);
  return document ? editablePageFromDocument(document) : null;
}

export async function updateEditableContentPage(
  pathname: string,
  locale: Locale,
  update: EditableContentPageUpdate,
) {
  const document = await findContentPage(pathname, locale);
  if (!document) return null;

  const migrationSections = mergeMigrationSections(
    document.migrationSections,
    update,
  );
  const rootIntroField =
    document._type === "referenceProject" ? "description" : "intro";
  const fields: SanityRecord = {
    title: update.title,
    [rootIntroField]: update.intro,
  };

  if (migrationSections) {
    fields.migrationSections = migrationSections;
  }

  await getSanityWriteClient()
    .patch(document._id)
    .ifRevisionId(document._rev)
    .set(fields)
    .commit({ autoGenerateArrayKeys: true });

  return { ...update };
}
