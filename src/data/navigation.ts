export type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationItem[];
};

export const mainNavigation: NavigationItem[] = [
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
];

export const footerNavigation: NavigationItem[] = [
  { label: "Personvernerklæring", href: "/personvernerklering" },
  { label: "Openheitslova", href: "/openheitslova" },
  { label: "Dokumentasjon", href: "/dokumentasjon" },
  { label: "Kontakt", href: "/kontakt" },
];

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
