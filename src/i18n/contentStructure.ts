import type { ContentSection } from "@/data/pages";
import {
  migrationArchiveKinds,
  sectionKindFromTitleValue,
  semanticSectionKind,
  withStableSectionIdentities,
} from "@/i18n/contentStructure.shared.mjs";

export function sectionKindFromTitle(title: string) {
  return sectionKindFromTitleValue(title) as string | undefined;
}

export function sectionKind(section: Pick<ContentSection, "kind" | "title">) {
  return section.kind || sectionKindFromTitle(section.title);
}

export function sectionIs(
  section: Pick<ContentSection, "kind" | "title">,
  kind: string,
) {
  return sectionKind(section) === kind;
}

export function stableContentSections(
  sections: ContentSection[],
  sourcePath = "/",
) {
  return withStableSectionIdentities(sections, sourcePath) as ContentSection[];
}

export function semanticContentSectionKind(
  sourcePath: string,
  section: Pick<ContentSection, "kind" | "title">,
) {
  return semanticSectionKind(sourcePath, section) as string | undefined;
}

export function isMigrationArchiveKind(kind?: string) {
  return Boolean(kind && migrationArchiveKinds.has(kind));
}
