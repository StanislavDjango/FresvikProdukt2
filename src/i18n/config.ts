import routeMap from "@/i18n/routeMap.json";

export const locales = ["nn", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "nn";

export const localeLabels: Record<Locale, string> = {
  nn: "Norsk",
  en: "English",
};

export const localePrefix = {
  nn: "",
  en: "/en",
} satisfies Record<Locale, string>;

export const englishPathBySourcePath = routeMap;

const legacyEnglishPathAliases: Record<string, string> = {
  "/produkt/fresvik-panel": "/products/fresvik-pur-panel",
};

const canonicalSourcePathByEnglishPath = Object.fromEntries(
  Object.entries(englishPathBySourcePath).map(([sourcePath, englishPath]) => [
    englishPath,
    sourcePath,
  ]),
) as Record<string, string>;

const legacySourcePathAliases: Record<string, string> = {
  "/products/cold-freezer-ports": "/produkt/kjole-fryseportar",
};

const dynamicEnglishPathRules = [
  ["/aktuelt/", "/about/news/"],
  ["/referansar/", "/references/"],
  ["/andre-produkter/", "/products/accessories/"],
] as const;

const dynamicSourcePathRules = [
  ["/about/news/", "/aktuelt/"],
  ["/references/", "/referansar/"],
  ["/products/accessories/", "/andre-produkter/"],
] as const;

const collapsedEnglishIndexPaths = [
  ["/referansar/category/", "/references"],
  ["/andre-produkter/category/", "/products/accessories"],
] as const;

const collapsedSourceIndexPaths = [
  ["/references/category/", "/referansar"],
  ["/products/accessories/category/", "/tilleggsutstyr"],
] as const;

function collapsedIndexPath(
  pathname: string,
  rules: readonly (readonly [string, string])[],
) {
  return rules.find(([sourcePrefix]) => pathname.startsWith(sourcePrefix))?.[1];
}

function mapDynamicPath(
  pathname: string,
  rules: readonly (readonly [string, string])[],
) {
  for (const [sourcePrefix, destinationPrefix] of rules) {
    if (pathname.startsWith(sourcePrefix)) {
      return `${destinationPrefix}${pathname.slice(sourcePrefix.length)}`;
    }
  }

  return undefined;
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") return "/";
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
}

export function englishPathForSourcePath(sourcePath: string) {
  const normalized = normalizePath(sourcePath);
  const legacyAlias = legacyEnglishPathAliases[normalized];
  const collapsedPath = collapsedIndexPath(
    normalized,
    collapsedEnglishIndexPaths,
  );
  const exactPath =
    englishPathBySourcePath[
      normalized as keyof typeof englishPathBySourcePath
    ];

  return (
    legacyAlias ??
    collapsedPath ??
    exactPath ??
    mapDynamicPath(normalized, dynamicEnglishPathRules) ??
    normalized
  );
}

export function sourcePathForEnglishPath(englishPath: string) {
  const normalized = normalizePath(englishPath);
  const collapsedPath = collapsedIndexPath(
    normalized,
    collapsedSourceIndexPaths,
  );
  const exactPath =
    canonicalSourcePathByEnglishPath[normalized] ??
    legacySourcePathAliases[normalized];
  const dynamicPath = mapDynamicPath(normalized, dynamicSourcePathRules);

  return collapsedPath ?? exactPath ?? dynamicPath ?? normalized;
}

export function stripLocalePrefix(pathname: string) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) {
    return sourcePathForEnglishPath(pathname.slice(3) || "/");
  }
  return normalizePath(pathname);
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "nn";
}

export function withLocale(pathname: string, locale: Locale) {
  const cleanPath = stripLocalePrefix(pathname);

  if (locale === defaultLocale) return cleanPath;
  const englishPath = englishPathForSourcePath(cleanPath);
  if (englishPath === "/") return localePrefix[locale];
  return `${localePrefix[locale]}${englishPath}`;
}
