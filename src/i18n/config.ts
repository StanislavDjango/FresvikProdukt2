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

const sourcePathByEnglishPath = Object.fromEntries(
  Object.entries(englishPathBySourcePath).map(([sourcePath, englishPath]) => [
    englishPath,
    sourcePath,
  ]),
) as Record<string, string>;

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") return "/";
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
}

export function englishPathForSourcePath(sourcePath: string) {
  const normalized = normalizePath(sourcePath);
  return englishPathBySourcePath[
    normalized as keyof typeof englishPathBySourcePath
  ] ?? normalized;
}

export function sourcePathForEnglishPath(englishPath: string) {
  const normalized = normalizePath(englishPath);
  return sourcePathByEnglishPath[normalized] ?? normalized;
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
