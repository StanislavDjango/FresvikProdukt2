export type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
};

export const redirectRules: RedirectRule[] = [
  {
    source: "/produkt/fresvik-panel",
    destination: "/produkt/fresvik-pur-panel",
    permanent: true,
  },
  {
    source: "/startside",
    destination: "/",
    permanent: true,
  },
  {
    source: "/send-foresporsel",
    destination: "/kontakt",
    permanent: true,
  },
  {
    source: "/store",
    destination: "/tilleggsutstyr",
    permanent: true,
  },
  {
    source: "/store/p/dr-tiltrekker-diktator",
    destination: "/tilleggsutstyr",
    permanent: true,
  },
  {
    source: "/andre-produkter",
    destination: "/tilleggsutstyr",
    permanent: true,
  },
  {
    source: "/andre-produkter/:slug*",
    destination: "/tilleggsutstyr",
    permanent: true,
  },
  {
    source: "/referansar/category/:slug*",
    destination: "/referansar",
    permanent: true,
  },
  {
    source: "/produktfoto",
    destination: "/produkt",
    permanent: true,
  },
  {
    source: "/kjolerom-fryserom-offshore-1",
    destination: "/kjolerom-fryserom-offshore",
    permanent: true,
  },
];

export const redirectedSources = redirectRules.map((rule) => rule.source);

export function isRedirectedSource(route: string) {
  return redirectRules.some((rule) => {
    if (rule.source === route) {
      return true;
    }

    if (!rule.source.includes(":slug*")) {
      return false;
    }

    return route.startsWith(rule.source.replace("/:slug*", ""));
  });
}
