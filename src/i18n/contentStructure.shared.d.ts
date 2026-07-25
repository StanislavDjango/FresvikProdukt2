export const migrationArchiveKinds: Set<string>;

export function sectionKindFromTitleValue(title?: string): string | undefined;

export function semanticSectionKind(
  sourcePath: string,
  section: {
    kind?: string;
    title?: string;
  },
): string | undefined;

export function withStableSectionIdentities<
  T extends {
    _key?: string;
    key?: string;
    kind?: string;
    title?: string;
    translationKey?: string;
  },
>(sections: T[], sourcePath?: string): Array<T & {
  kind?: string;
  translationKey?: string;
}>;
