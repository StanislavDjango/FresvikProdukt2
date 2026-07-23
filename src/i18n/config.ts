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

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function stripLocalePrefix(pathname: string) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "nn";
}

export function withLocale(pathname: string, locale: Locale) {
  const cleanPath = stripLocalePrefix(pathname);

  if (locale === defaultLocale) return cleanPath;
  if (cleanPath === "/") return localePrefix[locale];
  return `${localePrefix[locale]}${cleanPath}`;
}
