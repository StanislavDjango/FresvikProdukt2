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
    source: "/tenester",
    destination: "/tenester/montasje",
    permanent: false,
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
  {
    source: "/kjleport-fryseport-1",
    destination: "/produkt/kjole-fryseportar",
    permanent: true,
  },
  {
    source: "/kjlerom-fryserom-butikk",
    destination: "/kjolerom-fryserom-butikk",
    permanent: true,
  },
  {
    source: "/kjole-fryseromsdorer",
    destination: "/produkt/kjole-frysedorer",
    permanent: true,
  },
  {
    source: "/om-oss/fresvik-produkt",
    destination: "/firmainfo",
    permanent: true,
  },
  {
    source: "/s/7060s-fnfz.pdf",
    destination: "/assets/fresvik/documents/sintef-produktsertifikat-7060s.pdf",
    permanent: true,
  },
  {
    source: "/s/2135g-5.pdf",
    destination: "/assets/fresvik/documents/sintef-teknisk-godkjenning-2135g.pdf",
    permanent: true,
  },
  {
    source: "/s/Endre-Skyveretning.pdf",
    destination: "/assets/fresvik/documents/endre-skyveretning.pdf",
    permanent: true,
  },
  {
    source: "/s/FP-PIR-Paneler_Montasjeanvisning-nov-2025.pdf",
    destination: "/assets/fresvik/documents/fp-pir-paneler-montasjeanvisning-nov-2025.pdf",
    permanent: true,
  },
  {
    source: "/s/Fresvik-Dr-Montasjeanvisning.pdf",
    destination: "/assets/fresvik/documents/fresvik-dor-montasjeanvisning.pdf",
    permanent: true,
  },
  {
    source: "/s/Fresvik-Fryserom-Montasjeanvisning.pdf",
    destination: "/assets/fresvik/documents/fresvik-fryserom-montasjeanvisning.pdf",
    permanent: true,
  },
  {
    source: "/s/Fresvik-Kjlerom-Montasjeanvisning.pdf",
    destination: "/assets/fresvik/documents/fresvik-kjolerom-montasjeanvisning.pdf",
    permanent: true,
  },
  {
    source: "/s/Fresvik-Port-Montasjeanvisning.pdf",
    destination: "/assets/fresvik/documents/fresvik-port-montasjeanvisning.pdf",
    permanent: true,
  },
  {
    source: "/s/Koblingsskjema-Fermod-5010.pdf",
    destination: "/assets/fresvik/documents/koblingsskjema-fermod-5010.pdf",
    permanent: true,
  },
  {
    source: "/s/Leveringsvilkar-Fresvik-Produkt_rev2023.pdf",
    destination: "/assets/fresvik/documents/leveringsvilkar-fresvik-produkt-2023.pdf",
    permanent: true,
  },
  {
    source: "/s/Miljdokument-Fresvik-Produkt.pdf",
    destination: "/assets/fresvik/documents/miljodokument-fresvik-produkt.pdf",
    permanent: true,
  },
  {
    source: "/s/Montasjeanvisning-5010-for-2150.pdf",
    destination: "/assets/fresvik/documents/montasjeanvisning-5010-for-2150.pdf",
    permanent: true,
  },
  {
    source: "/s/Montasjeanvisning-5010-for-3530-og-7530.pdf",
    destination: "/assets/fresvik/documents/montasjeanvisning-5010-for-3530-og-7530.pdf",
    permanent: true,
  },
  {
    source: "/s/PIR-ProduktbladFP.pdf",
    destination: "/assets/fresvik/documents/pir-panel.pdf",
    permanent: true,
  },
  {
    source: "/s/PIR.pdf",
    destination: "/assets/fresvik/documents/pir-panel.pdf",
    permanent: true,
  },
  {
    source: "/s/PUR-ProduktbladFP.pdf",
    destination: "/assets/fresvik/documents/pur-produktbladfp.pdf",
    permanent: true,
  },
  {
    source: "/s/PUR-ce-merke.pdf",
    destination: "/assets/fresvik/documents/pur-ce-merke.pdf",
    permanent: true,
  },
  {
    source: "/s/Produktblad-Fresvik-Skyveport.pdf",
    destination: "/assets/fresvik/documents/produktblad-fresvik-skyveport.pdf",
    permanent: true,
  },
  {
    source: "/s/Quick-Start-5010Exp-indB.pdf",
    destination: "/assets/fresvik/documents/quick-start-5010exp.pdf",
    permanent: true,
  },
  {
    source: "/s/Sentral-Godkjenning-Fresvik-Produkt.pdf",
    destination: "/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf",
    permanent: true,
  },
  {
    source: "/s/Tilleggsutstyr-NMoptions-kits5010Exp-A_NOR.pdf",
    destination: "/assets/fresvik/documents/tilleggsutstyr-nmoptions-kits5010exp.pdf",
    permanent: true,
  },
  {
    source: "/s/Ytelseserklring-Fresvik-Produkt.pdf",
    destination: "/assets/fresvik/documents/ytelseserklaring-fresvik-produkt.pdf",
    permanent: true,
  },
  {
    source: "/s/lsning-med-firkantrr.pdf",
    destination: "/aktuelt/innfesting-mot-golv",
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
