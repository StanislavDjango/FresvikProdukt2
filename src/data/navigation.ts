import { type Locale, withLocale } from "@/i18n/config";

export type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationItem[];
};

const mainNavigationByLocale: Record<Locale, NavigationItem[]> = {
  nn: [
  {
    label: "Produkt",
    href: "/produkt",
    children: [
      { label: "Fresvik PIR Panel", href: "/produkt/fresvik-pir-panel" },
      { label: "Fresvik PUR Panel", href: "/produkt/fresvik-pur-panel" },
      { label: "Kjøle- og fryseportar", href: "/produkt/kjole-fryseportar" },
      { label: "Kjøle- og frysedører", href: "/produkt/kjole-frysedorer" },
      { label: "Fasadepanel", href: "/produkt/fasadepanel" },
      { label: "Frysetunnel", href: "/produkt/frysetunnel" },
      { label: "Tilleggsutstyr", href: "/tilleggsutstyr" },
    ],
  },
  {
    label: "Tenester",
    href: "/tenester",
    children: [
      { label: "Montasje", href: "/tenester/montasje" },
      { label: "Leveranse", href: "/tenester/leveranse" },
      {
        label: "Service og reservedeler",
        href: "/tenester/service-reservedeler",
      },
    ],
  },
  {
    label: "Dokumentasjon",
    href: "/dokumentasjon",
    children: [
      { label: "Monteringsanvisning", href: "/monteringsanvisning" },
      {
        label: "Elektrisk skyveport",
        href: "/monteringsanvisningar-fresvik-skyveport",
      },
      { label: "FAQ", href: "/kundeservice/faq" },
    ],
  },
  { label: "Referansar", href: "/referansar" },
  {
    label: "Om oss",
    href: "/om-oss",
    children: [
      { label: "Firmainfo", href: "/firmainfo" },
      { label: "Tilsette", href: "/tilsette" },
      { label: "Aktuelt", href: "/aktuelt" },
      { label: "Stilling ledig", href: "/stillingledig" },
    ],
  },
  { label: "Kontakt", href: "/kontakt" },
  ],
  en: [
    {
      label: "Products",
      href: "/produkt",
      children: [
        { label: "Fresvik PIR Panel", href: "/produkt/fresvik-pir-panel" },
        { label: "Fresvik PUR Panel", href: "/produkt/fresvik-pur-panel" },
        { label: "Cold and freezer gates", href: "/produkt/kjole-fryseportar" },
        { label: "Cold and freezer room doors", href: "/produkt/kjole-frysedorer" },
        { label: "Facade panels", href: "/produkt/fasadepanel" },
        { label: "Freezing tunnel", href: "/produkt/frysetunnel" },
        { label: "Accessories", href: "/tilleggsutstyr" },
      ],
    },
    {
      label: "Services",
      href: "/tenester",
      children: [
        { label: "Installation", href: "/tenester/montasje" },
        { label: "Delivery", href: "/tenester/leveranse" },
        {
          label: "Service and spare parts",
          href: "/tenester/service-reservedeler",
        },
      ],
    },
    {
      label: "Documentation",
      href: "/dokumentasjon",
      children: [
        { label: "Installation guide", href: "/monteringsanvisning" },
        {
          label: "Electric sliding gate",
          href: "/monteringsanvisningar-fresvik-skyveport",
        },
        { label: "FAQ", href: "/kundeservice/faq" },
      ],
    },
    { label: "References", href: "/referansar" },
    {
      label: "About us",
      href: "/om-oss",
      children: [
        { label: "Company info", href: "/firmainfo" },
        { label: "Employees", href: "/tilsette" },
        { label: "News", href: "/aktuelt" },
        { label: "Careers", href: "/stillingledig" },
      ],
    },
    { label: "Contact", href: "/kontakt" },
  ],
};

function localizeItems(items: NavigationItem[], locale: Locale): NavigationItem[] {
  return items.map((item) => ({
    ...item,
    href: withLocale(item.href, locale),
    children: item.children ? localizeItems(item.children, locale) : undefined,
  }));
}

export function getMainNavigation(locale: Locale = "nn") {
  return localizeItems(mainNavigationByLocale[locale], locale);
}

export const mainNavigation: NavigationItem[] = getMainNavigation("nn");

export const footerNavigation: NavigationItem[] = [
  { label: "Personvernerklæring", href: "/personvernerklering" },
  { label: "Openheitslova", href: "/openheitslova" },
  { label: "Dokumentasjon", href: "/dokumentasjon" },
  { label: "Kontakt", href: "/kontakt" },
];

const footerNavigationByLocale: Record<Locale, NavigationItem[]> = {
  nn: footerNavigation,
  en: [
    { label: "Privacy policy", href: "/personvernerklering" },
    { label: "Transparency Act", href: "/openheitslova" },
    { label: "Documentation", href: "/dokumentasjon" },
    { label: "Contact", href: "/kontakt" },
  ],
};

export function getFooterNavigation(locale: Locale = "nn") {
  return localizeItems(footerNavigationByLocale[locale], locale);
}

export const publicRoutes = [
  "/",
  "/produkt",
  "/produkt/fresvik-pir-panel",
  "/produkt/fresvik-pur-panel",
  "/produkt/kjole-fryseportar",
  "/produkt/kjole-frysedorer",
  "/produkt/fasadepanel",
  "/produkt/frysetunnel",
  "/tilleggsutstyr",
  "/tenester",
  "/tenester/montasje",
  "/tenester/leveranse",
  "/tenester/service-reservedeler",
  "/dokumentasjon",
  "/monteringsanvisning",
  "/monteringsanvisningar-fresvik-skyveport",
  "/kundeservice/faq",
  "/referansar",
  "/om-oss",
  "/firmainfo",
  "/tilsette",
  "/aktuelt",
  "/stillingledig",
  "/kontakt",
  "/personvernerklering",
  "/openheitslova",
] as const;
