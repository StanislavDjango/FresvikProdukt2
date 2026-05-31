import {
  oldSiteCompanyFacts,
  getOldSiteInventoryItem,
  oldSiteAccessories,
  oldSiteDocuments,
  oldSiteEmployees,
  oldSiteFaqItems,
  oldSiteLegalDocuments,
  oldSiteNews,
  oldSiteProducts,
  oldSiteReferences,
  oldSiteServices,
  oldSiteSupportPages,
  type MigratedListItem,
} from "@/data/oldSiteInventory";

export type ContentCard = {
  title: string;
  text: string;
  href?: string;
  meta?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type ContentPage = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  description: string;
  pageType: "home" | "index" | "product" | "service" | "support" | "company" | "legal";
  priority: "high" | "medium" | "low";
  sourceUrl?: string;
  cards: ContentCard[];
  sections: {
    title: string;
    intro?: string;
    items: ContentCard[];
  }[];
  todo?: string[];
};

const productCards: ContentCard[] = [
  {
    title: "Fresvik PIR Panel",
    text: "Isolerte panel for prosjekt der låg vekt, god isolasjon og presis montering er viktig.",
    href: "/produkt/fresvik-pir-panel",
  },
  {
    title: "Fresvik PUR Panel",
    text: "Panel for kjøle-, fryse- og industribygg. Innhald skal verifiserast mot den gamle produktsida.",
    href: "/produkt/fresvik-pur-panel",
  },
  {
    title: "Kjøle- og fryseportar",
    text: "Portløysingar for temperaturstyrte miljø, lager og næringsmiddelprosjekt.",
    href: "/produkt/kjole-fryseportar",
  },
  {
    title: "Kjøle- og frysedører",
    text: "Dører for kjøle- og fryserom med fokus på drift, tetting og dagleg bruk.",
    href: "/produkt/kjole-frysedorer",
  },
  {
    title: "Fasadepanel",
    text: "Fasadepanel for bygg der teknisk funksjon og eit ryddig uttrykk må fungere saman.",
    href: "/produkt/fasadepanel",
  },
  {
    title: "Tilleggsutstyr",
    text: "Tilbehør og kompletterande delar for panel-, port- og dørløysingar.",
    href: "/tilleggsutstyr",
  },
];

const serviceCards: ContentCard[] = [
  {
    title: "Montasje",
    text: "Planlegging og gjennomføring av montasje for panel, portar og tilhøyrande løysingar.",
    href: "/tenester/montasje",
  },
  {
    title: "Leveranse",
    text: "Koordinering av leveransar til prosjekt, med praktisk oppfølging frå Fresvik Produkt.",
    href: "/tenester/leveranse",
  },
  {
    title: "Service og reservedeler",
    text: "Hjelp med service, utskifting og reservedeler etter levering.",
    href: "/tenester/service-reservedeler",
  },
];

const supportCards: ContentCard[] = [
  {
    title: "Dokumentasjon",
    text: "Samla område for datablad, dokumentasjon og relevante PDF-filer.",
    href: "/dokumentasjon",
  },
  {
    title: "Monteringsanvisning",
    text: "Monteringsrettleiingar og praktisk dokumentasjon for utførande.",
    href: "/monteringsanvisning",
  },
  {
    title: "FAQ",
    text: "Ofte stilte spørsmål frå kundar, prosjekt og samarbeidspartnarar.",
    href: "/kundeservice/faq",
  },
];

const companyCards: ContentCard[] = [
  {
    title: "Firmainfo",
    text: "Selskapsinformasjon, kontaktpunkt og nøkkelopplysningar om Fresvik Produkt.",
    href: "/firmainfo",
  },
  {
    title: "Tilsette",
    text: "Oversikt over kontaktpersonar og avdelingar. Persondata må verifiserast før publisering.",
    href: "/tilsette",
  },
  {
    title: "Aktuelt",
    text: "Nyheiter og oppdateringar frå Fresvik Produkt.",
    href: "/aktuelt",
  },
  {
    title: "Stilling ledig",
    text: "Informasjon om eventuelle ledige stillingar og søknadsprosess.",
    href: "/stillingledig",
  },
];

function inventoryCards(items: MigratedListItem[], fallbackText: string): ContentCard[] {
  return items.map((item) => ({
    title: item.title,
    text: fallbackText,
    href: item.href,
    meta: item.lastmod,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt || item.title,
  }));
}

const faqCards = oldSiteFaqItems.map((item) => ({
  title: item.title,
  text:
    "Spørsmål henta frå gammal FAQ-side. Svarteksten må importerast eller kvalitetssikrast før endeleg publisering.",
  href: item.href,
}));

const employeeCards = oldSiteEmployees.map((employee) => ({
  title: employee.title,
  text: [
    employee.role,
    employee.location ? `Avdeling: ${employee.location}` : null,
    employee.phone ? `Telefon: ${employee.phone}` : null,
    employee.mobile ? `Mobil: ${employee.mobile}` : null,
    employee.email ? `E-post: ${employee.email}` : null,
  ]
    .filter(Boolean)
    .join(" | "),
  href: employee.href,
  imageUrl: employee.imageUrl,
  imageAlt: employee.imageAlt || employee.title,
}));

const legalDocumentCards = inventoryCards(
  oldSiteLegalDocuments,
  "Dokument eller ekstern kjelde funne på gammal Openheitslova-side. PDF-ar skal seinare importerast til Sanity assets.",
);

const companyFactCards = [
  {
    title: oldSiteCompanyFacts[0].title,
    text:
      "Fresvik Produkt er den einaste norske produsenten av isolasjonspanel, dører og portar til kjøle- og fryserom.",
    href: "/firmainfo",
  },
  {
    title: oldSiteCompanyFacts[1].title,
    text:
      "Selskapet oppgir marknadsleiande posisjon for kjøle- og fryserom til daglegvarehandel, energistasjonar og storkioskar.",
    href: "/firmainfo",
  },
  {
    title: oldSiteCompanyFacts[2].title,
    text:
      "Produksjon i Fresvik i Sogn skal gi kortreiste produkt og god leveransesikkerheit.",
    href: "/firmainfo",
  },
  {
    title: oldSiteCompanyFacts[3].title,
    text:
      "Hovudkontor og produksjonsanlegg ligg i Fresvik i Sogn, med salskontor i Drammen.",
    href: "/firmainfo",
  },
];

const newsCards = inventoryCards(
  oldSiteNews,
  "Nyheit registrert frå gammal sitemap. Brødtekst skal importerast frå kjeldesida til Sanity.",
);

const referenceCards = inventoryCards(
  oldSiteReferences,
  "Referanse registrert frå gammal sitemap. Prosjekttekst, kategori og bilete skal importerast til Sanity.",
);

const oldProductCards = inventoryCards(
  oldSiteProducts,
  "Produkt registrert frå gammal sitemap. Brødtekst, tekniske data og dokument skal importerast til Sanity.",
);

const oldServiceCards = inventoryCards(
  oldSiteServices,
  "Teneste registrert frå gammal sitemap. Brødtekst, prosess og CTA skal importerast til Sanity.",
);

const oldDocumentCards = inventoryCards(
  oldSiteDocuments,
  "Dokumentasjonsside registrert frå gammal sitemap. PDF-ar og eksterne dokument skal importerast.",
);

const oldAccessoryCards = inventoryCards(
  oldSiteAccessories,
  "Tilleggsutstyr registrert frå gammal sitemap. Produkttekst og bilete skal importerast til Sanity.",
);

const oldSupportCards = inventoryCards(
  oldSiteSupportPages,
  "Kundesegment eller supportsida registrert frå gammal sitemap. Innhald skal vurderast for ny struktur.",
);

const commonPanelBenefits: ContentCard[] = [
  {
    title: "Utvikla og produsert i Norge",
    text:
      "Panelinnhaldet er henta frå gamle produktsider. Fresvik legg vekt på norsk utvikling, produksjon og kort leveranseveg.",
  },
  {
    title: "Enkel montasje med eksenterlås",
    text:
      "Fresvik-panel er basert på eit fleksibelt modulsystem med eksenterlås i overgangane.",
  },
  {
    title: "Modulmål gir mindre svinn",
    text:
      "Fleksible modulmål og kundetilpassing skal bidra til mindre svinn og avfall på byggeplassen.",
  },
  {
    title: "Hygienisk overflate",
    text:
      "Panela har hygienisk overflate. Standard overflate er 0,55 mm galvanisert stålplate med 25 µm polyester, type FoodSafe.",
  },
];

const pirTechnicalCards: ContentCard[] = [
  {
    title: "Kjerne og tykkelse",
    text:
      "Sandwichelement med oppskumma PIR-skum som kjerne. Tykkelse: 75, 100, 125, 150 og 175 mm.",
  },
  {
    title: "Densitet og vekt",
    text: "Densitet: 43 (+/-3) kg/m3. Vekt ca. 14 - 18.5 kg/m2.",
  },
  {
    title: "U-verdi og temperatur",
    text:
      "U-verdi/termisk transmittans: 0.14 - 0.29 W/(m²K). Temperatur: -40°C til +70°C.",
  },
  {
    title: "Fleksible mål",
    text:
      "Fleksibel romhøgde i trinn på 50 mm opptil 8000 mm, og fleksibel modulbredde i trinn på 300 mm.",
  },
];

const purTechnicalCards: ContentCard[] = [
  {
    title: "Kjerne og tykkelse",
    text:
      "Sandwichelement med oppskumma polyuretan som kjerne. Tykkelse: 75, 100, 125, 150 og 175 mm.",
  },
  {
    title: "Densitet og vekt",
    text: "Densitet: 40 (+/-3) kg/m3. Vekt ca. 13 - 17 kg/m2.",
  },
  {
    title: "U-verdi og temperatur",
    text:
      "U-verdi/termisk transmittans: 0.13 - 0.29 W/(m²K). Temperatur: -40°C til +120°C.",
  },
  {
    title: "Fleksible mål",
    text:
      "Fleksibel romhøgde i trinn på 50 mm opptil 8000 mm, og fleksibel modulbredde i trinn på 300 mm.",
  },
];

const pirDocuments: ContentCard[] = [
  {
    title: "PIR-Paneler produktblad",
    text: "Produktblad funne på gammal Fresvik PIR-Panel-side.",
    href: "https://www.fresvik.no/s/PIR.pdf",
  },
  {
    title: "PIR-Paneler montasjeanvisning",
    text: "Montasjeanvisning funne på gammal Fresvik PIR-Panel-side.",
    href: "https://www.fresvik.no/s/FP-PIR-Paneler_Montasjeanvisning-nov-2025.pdf",
  },
];

const portDocuments: ContentCard[] = [
  {
    title: "Produktblad Fresvik Skyveport",
    text: "Produktblad for skyveport frå gammal portside.",
    href: "https://www.fresvik.no/s/Produktblad-Fresvik-Skyveport.pdf",
  },
  {
    title: "Monteringsanvisning manuell port",
    text: "PDF for manuell portmontasje frå gammal portside.",
    href: "https://www.fresvik.no/s/Fresvik-Port-Montasjeanvisning.pdf",
  },
  {
    title: "Monteringsanvisning elektrisk port",
    text: "Gammal underside for elektrisk portmontasje.",
    href: "/monteringsanvisningar-fresvik-skyveport",
  },
];

const documentationDownloads: ContentCard[] = [
  {
    title: "Miljødokument",
    text: "Miljødokument for Fresvik Produkt.",
    href: "https://www.fresvik.no/s/Miljdokument-Fresvik-Produkt.pdf",
  },
  {
    title: "Fresvik PIR-Panel CPR",
    text: "CPR-dokument for Fresvik PIR-Panel.",
    href: "https://www.fresvik.no/s/7060s-fnfz.pdf",
  },
  {
    title: "Teknisk godkjenning",
    text: "Teknisk godkjenning frå gammal dokumentasjonsside.",
    href: "https://www.fresvik.no/s/2135g-5.pdf",
  },
  {
    title: "Godkjenningsdokument hjå SINTEF",
    text: "Ekstern SINTEF Certification-side.",
    href: "https://sintefcertification.no/Product/Index/129",
  },
  {
    title: "Leveringsbetingelser",
    text: "Leveringsvilkår for Fresvik Produkt.",
    href: "https://www.fresvik.no/s/Leveringsvilkar-Fresvik-Produkt_rev2023.pdf",
  },
  {
    title: "Sentral godkjenning",
    text: "Sentral godkjenning frå gammal dokumentasjonsside.",
    href: "https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf",
  },
  {
    title: "Ytelseserklæring",
    text: "Ytelseserklæring for Fresvik Produkt.",
    href: "https://www.fresvik.no/s/Ytelseserklring-Fresvik-Produkt.pdf",
  },
];

const mountingDownloads: ContentCard[] = [
  {
    title: "Fryserom, Norsk/English",
    text: "Monteringsanvisning for fryserom.",
    href: "https://www.fresvik.no/s/Fresvik-Fryserom-Montasjeanvisning.pdf",
  },
  {
    title: "Manuell port",
    text: "Monteringsanvisning for manuell port.",
    href: "https://www.fresvik.no/s/Fresvik-Port-Montasjeanvisning.pdf",
  },
  {
    title: "Kjølerom, Norsk/English",
    text: "Monteringsanvisning for kjølerom.",
    href: "https://www.fresvik.no/s/Fresvik-Kjlerom-Montasjeanvisning.pdf",
  },
  {
    title: "Dør",
    text: "Monteringsanvisning for dør.",
    href: "https://www.fresvik.no/s/Fresvik-Dr-Montasjeanvisning.pdf",
  },
];

const pirSections = [
  {
    title: "Produktfordelar frå gammal side",
    intro:
      "Fresvik PIR-Panel er eit sandwichelement med oppskumma PIR-skum som kjerne, innkapsla mellom to stålplater.",
    items: commonPanelBenefits,
  },
  {
    title: "Tekniske data",
    items: pirTechnicalCards,
  },
  {
    title: "Dokument",
    items: pirDocuments,
  },
];

const purSections = [
  {
    title: "Produktfordelar frå gammal side",
    intro:
      "Fresvik PUR-Panel er eit sandwichelement med oppskumma polyuretan som kjerne, innkapsla mellom to stålplater.",
    items: commonPanelBenefits,
  },
  {
    title: "Tekniske data",
    items: purTechnicalCards,
  },
];

const portSections = [
  {
    title: "Skyveport til kjøle- og fryserom",
    intro:
      "Fresvik Produkt produserer kjøle- og fryseportar til næringsmiddelbransjen, engroslager og lagerbygg.",
    items: [
      {
        title: "Skreddarsydd etter mål",
        text:
          "Portane blir skreddarsydde ved fabrikken etter spesifikasjon frå kunde, og kan vere manuelle eller elektrisk drivne.",
      },
      {
        title: "Kvalitet og isolering",
        text:
          "Skyveportane er kjende for kvalitet og god isoleringsevne, og er laga for slitasje og tøff behandling.",
      },
      {
        title: "Tetting og varmekabel",
        text:
          "Beslagets løftemekanisme og gummipakningar i EPDM-kvalitet sørger for god tetting. Fryseport har doble pakningar og sjølvregulerande varmekabel.",
      },
    ],
  },
  {
    title: "Tekniske punkt",
    items: [
      {
        title: "Dørblad",
        text:
          "Galvanisert stålplate med polyesterlakkert FoodSafe-overflate. Dørblad og beslag kan leverast i rustfritt stål.",
      },
      {
        title: "Kjøl og frys",
        text:
          "Frys: 100 og 125 mm skumma polyurethane. Kjøl: 75 og 100 mm skumma polyurethane.",
      },
      {
        title: "Automatikk",
        text:
          "Automatisk elektrisk opning/stenging kan leverast med trykknapp- eller snortrekkbrytar som standard.",
      },
    ],
  },
  {
    title: "Dokument",
    items: portDocuments,
  },
];

const doorSections = [
  {
    title: "Dører til kjøle- og fryserom",
    intro:
      "Fresvik Produkt tilbyr tre modellar til ulike bruksområde, med galvanisert stålplate og FoodSafe-overflate.",
    items: [
      {
        title: "Konstruksjon",
        text:
          "Dørblad med pakningar er montert på utanpåliggande karm i 2 mm pulverlakkert galvanisert stål.",
      },
      {
        title: "Fryseromsdørar",
        text:
          "Fryseromsdørar har sjølvregulerande varmekabel, 230V og 16W/m.",
      },
      {
        title: "Rask levering",
        text:
          "Fresvik har lager av standard kjøleromsdører med slepelist i breidde-lysmål 800, 900, 1000 og 1100 mm, og standard høgde 2055 mm inkludert slepelista.",
      },
    ],
  },
];

const facadeSections = [
  {
    title: "Fasadepanel til lager- og industribygg",
    intro:
      "Fresvik har lang erfaring med bygg for næringsmiddelindustrien og leverer utvendige fasadepanel til lager og industribygg.",
    items: [
      {
        title: "Kundtilpassa løysingar",
        text:
          "Styrken ligg i kompetanse på kundetilpasningar der det er behov for fasadepanel, kjøle/fryserom og innerveggar.",
      },
      {
        title: "Panelkjerner",
        text:
          "Fasadepanel kan leverast med både polyuretan-skum og mineralull som kjerne.",
      },
      {
        title: "Byggetid og energi",
        text:
          "Isolasjonspanel skal gi god energiøkonomisering og kort byggjetid.",
      },
    ],
  },
];

export const contentPages: ContentPage[] = [
  {
    slug: "/",
    title: "Fresvik Produkt",
    eyebrow: "Isolerte løysingar for norske prosjekt",
    intro:
      "Fresvik Produkt leverer isolerte panel, portar, dører, montasje og service til kjøle-, fryse- og industriprosjekt.",
    description:
      "Modernisert for rask oversikt over produkt, tenester, dokumentasjon og kontaktpunkt.",
    pageType: "home",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/",
    cards: [...productCards.slice(0, 3), ...serviceCards],
    sections: [
      {
        title: "Produktområde",
        intro:
          "Startpunkt for produktinnhaldet som skal flyttast frå den gamle nettstaden til Sanity.",
        items: productCards,
      },
      {
        title: "Tenester og oppfølging",
        intro:
          "Prosjekt kan trenge meir enn produkt. Fresvik skal også synleggjere leveranse, montasje og service.",
        items: serviceCards,
      },
      {
        title: "Dokumentasjon og kundestøtte",
        items: supportCards,
      },
    ],
    todo: [
      "Migrer endeleg hero-tekst og bilete frå gammal framside.",
      "Koble produkt, dokument og nyheiter til Sanity når skjema er på plass.",
    ],
  },
  {
    slug: "/produkt",
    title: "Produkt",
    eyebrow: "Panel, portar, dører og tilbehør",
    intro:
      "Finn produktområda Fresvik Produkt skal presentere på den nye nettstaden.",
    description:
      "Oversikt over produkt frå Fresvik Produkt: PIR/PUR-panel, kjøle- og fryseportar, dører, fasadepanel og tilleggsutstyr.",
    pageType: "index",
    priority: "high",
    cards: oldProductCards.slice(0, 6),
    sections: [
      { title: "Produktområde i ny struktur", items: productCards },
      {
        title: "Produkt-URL-ar frå gammal sitemap",
        intro:
          "Desse produkt- og produktfoto-sidene er funne i gammal sitemap og skal migrerast eller redirectast.",
        items: oldProductCards,
      },
      {
        title: "Kundesegment frå gammal nettstad",
        intro:
          "Segment-sidene skal vurderast som landingssider, bruksområde eller redirects i ny struktur.",
        items: oldSupportCards.filter((item) =>
          item.href?.startsWith("/kjolerom-fryserom"),
        ),
      },
    ],
    todo: ["Importer produktbilete og PDF-dokument frå gammal nettstad."],
  },
  {
    slug: "/produkt/fresvik-pir-panel",
    title: "Fresvik PIR Panel",
    eyebrow: "Produkt",
    intro:
      "Sandwichelement med oppskumma PIR-skum som kjerne, utvikla og produsert i Norge for kjøle- og fryserom.",
    description:
      "Fresvik PIR Panel med tekniske data, produktfordelar og dokumentasjon frå gammal Fresvik-side.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/fresvik-pir-panel",
    cards: oldProductCards.filter((item) => item.href === "/produkt/fresvik-pir-panel"),
    sections: pirSections,
    todo: [
      "Importer produktbilete til Sanity assets eller lokal assets-mappe.",
      "Kvalitetssikre tekniske data mot original PDF før endeleg lansering.",
    ],
  },
  {
    slug: "/produkt/fresvik-pur-panel",
    title: "Fresvik PUR Panel",
    eyebrow: "Produkt",
    intro:
      "Sandwichelement med oppskumma polyuretan som kjerne, innkapsla mellom to stålplater.",
    description:
      "Fresvik PUR Panel med tekniske data og produktfordelar frå gammal Fresvik Panel-side.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/fresvik-panel",
    cards: oldProductCards.filter((item) => item.href === "/produkt/fresvik-panel"),
    sections: purSections,
    todo: [
      "Redirect frå `/produkt/fresvik-panel` til `/produkt/fresvik-pur-panel` er lagt til i app-logikk, men bør også vurderast som permanent redirect før lansering.",
      "Importer produktbilete og eventuelle PDF-ar til Sanity assets.",
    ],
  },
  {
    slug: "/produkt/kjole-fryseportar",
    title: "Kjøle- og fryseportar",
    eyebrow: "Produkt",
    intro:
      "Skyveportar for kjøle- og frysemiljø med krav til drift, isoleringsevne og tett funksjon.",
    description:
      "Produktområde for kjøle- og fryseportar frå Fresvik Produkt.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/kjole-fryseportar",
    cards: oldProductCards.filter((item) => item.href === "/produkt/kjole-fryseportar"),
    sections: portSections,
    todo: [
      "Importer portbilete og dokument til Sanity assets.",
      "Kvalitetssikre tekniske detaljar og variantar mot produktblad.",
    ],
  },
  {
    slug: "/produkt/kjole-frysedorer",
    title: "Kjøle- og frysedører",
    eyebrow: "Produkt",
    intro:
      "Kjøle- og fryseromsdører med FoodSafe-overflate, polyuretanisolasjon og modellar for ulike bruksområde.",
    description:
      "Produktområde for kjøle- og frysedører frå Fresvik Produkt.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/kjole-frysedorer",
    cards: oldProductCards.filter((item) => item.href === "/produkt/kjole-frysedorer"),
    sections: doorSections,
    todo: [
      "Migrer dørvariantar, bilete og eventuelle produktblad.",
      "Kvalitetssikre lagerførte standardmål og leveringstid med Fresvik.",
    ],
  },
  {
    slug: "/produkt/fasadepanel",
    title: "Fasadepanel",
    eyebrow: "Produkt",
    intro:
      "Utvendige fasadepanel til lager- og industribygg, med kompetanse frå næringsmiddelbygg.",
    description: "Produktområde for fasadepanel frå Fresvik Produkt.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/fasadepanel",
    cards: oldProductCards.filter((item) => item.href === "/produkt/fasadepanel"),
    sections: facadeSections,
    todo: [
      "Importer fasadepanel-bilete og referanselenker.",
      "Kvalitetssikre beskriving av panelkjerner, godkjenningar og ansvarsrett.",
    ],
  },
  {
    slug: "/tilleggsutstyr",
    title: "Tilleggsutstyr",
    eyebrow: "Produkt",
    intro:
      "Tilbehør og kompletterande utstyr for panel-, port- og dørløysingar.",
    description:
      "Tilleggsutstyr og relaterte produkt for Fresvik-produkt.",
    pageType: "product",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/tilleggsutstyr",
    cards: oldAccessoryCards.slice(0, 6),
    sections: [
      {
        title: "Tilleggsutstyr frå gammal sitemap",
        intro:
          "Dette er konkrete utstyrs- og butikk-URL-ar funne i gammal sitemap. Dei skal flyttast til produkt eller dokumentasjon i Sanity.",
        items: oldAccessoryCards,
      },
    ],
    todo: ["Avgjer om tilleggsutstyr skal vere eigne produkt eller sideblokker."],
  },
  {
    slug: "/tenester",
    title: "Tenester",
    eyebrow: "Leveranse, montasje og service",
    intro:
      "Fresvik Produkt skal vise korleis dei hjelper prosjekt frå avklaring til ferdig leveranse og oppfølging.",
    description:
      "Oversikt over tenester frå Fresvik Produkt: montasje, leveranse, service og reservedeler.",
    pageType: "index",
    priority: "high",
    cards: oldServiceCards,
    sections: [
      { title: "Tenesteområde", items: serviceCards },
      {
        title: "Teneste-URL-ar frå gammal sitemap",
        items: oldServiceCards,
      },
    ],
    todo: ["Migrer endelege servicetekstar frå gammal nettstad."],
  },
  {
    slug: "/tenester/montasje",
    title: "Montasje",
    eyebrow: "Teneste",
    intro:
      "Fresvik Produkt tilbyr montasje av Fresvik-panel til kjølerom og fryserom, og sandwich-panel for fasade.",
    description: "Montasjetenester frå Fresvik Produkt.",
    pageType: "service",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/tenester/montasje",
    cards: oldServiceCards.filter((item) => item.href === "/tenester/montasje"),
    sections: [
      {
        title: "Montasje frå gammal side",
        items: [
          {
            title: "Erfarne montørar",
            text:
              "Montasje blir gjort i samarbeid med erfarne montørar.",
          },
          {
            title: "Sentral godkjenning",
            text:
              "Fresvik Produkt er sentralt godkjent og oppgir at dette dokumenterer kompetanse, erfaring og system tilpassa byggenæringa.",
          },
          {
            title: "Kontakt sal",
            text:
              "Den gamle sida ber kundar ta kontakt med salsavdelinga for meir informasjon om montørane.",
          },
        ],
      },
    ],
    todo: [
      "Importer servicebilete og dokumentasjon for sentral godkjenning.",
      "Kvalitetssikre formulering rundt skatter/avgifter og godkjenningar.",
    ],
  },
  {
    slug: "/tenester/leveranse",
    title: "Leveranse",
    eyebrow: "Teneste",
    intro:
      "Leveransesikkerheit for fasadeelement, standard og spesialtilpassa kjølerom/fryserom.",
    description: "Leveransetenester frå Fresvik Produkt.",
    pageType: "service",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/tenester/leveranse",
    cards: oldServiceCards.filter((item) => item.href === "/tenester/leveranse"),
    sections: [
      {
        title: "Leveranse frå gammal side",
        items: [
          {
            title: "Fokus på leveransesikkerheit",
            text:
              "Fresvik legg vekt på at kunden skal vite at leveransen kjem til riktig tid.",
          },
          {
            title: "Alle nødvendige delar i pakken",
            text:
              "Leveransane blir pakka med nødvendige delar som er godt og synleg merka.",
          },
          {
            title: "Monteringsanvisningar på nett",
            text:
              "Gode monteringsanvisningar skal vere lette å laste ned frå heimesida.",
          },
        ],
      },
    ],
    todo: ["Kvalitetssikre leveransevilkår og eventuelle juridiske betingelsar."],
  },
  {
    slug: "/tenester/service-reservedeler",
    title: "Service og reservedeler",
    eyebrow: "Teneste",
    intro:
      "Service og reservedeler for dører og portar når noko går gale og leveringstid betyr mykje.",
    description: "Service og reservedeler frå Fresvik Produkt.",
    pageType: "service",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/tenester/service-reservedeler",
    cards: oldServiceCards.filter((item) => item.href === "/tenester/service-reservedeler"),
    sections: [
      {
        title: "Service frå gammal side",
        items: [
          {
            title: "Viss noko går gale, stiller vi opp",
            text:
              "Den gamle sida legg vekt på at Fresvik stiller opp når kundane treng service eller delar.",
          },
          {
            title: "Lager av reservedeler",
            text:
              "Fresvik oppgir å ha eit godt lager av reservedeler til dører og portar, slik at dei kan levere spesifikke delar ved behov.",
          },
          {
            title: "Kort leveringstid",
            text:
              "Reservelager kombinert med samarbeidspartnarar skal gi kort leveringstid når det trengst.",
          },
        ],
      },
    ],
    todo: ["Legg inn servicekontakt, skjema eller reservedelsflyt i Sanity."],
  },
  {
    slug: "/dokumentasjon",
    title: "Dokumentasjon",
    eyebrow: "Kundeservice",
    intro:
      "Teknisk godkjenning, miljødokument, leveringsbetingelser, sentral godkjenning og monteringsanvisningar.",
    description:
      "Dokumentasjon, datablad og PDF-filer frå Fresvik Produkt.",
    pageType: "support",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/dokumentasjon",
    cards: documentationDownloads.slice(0, 6),
    sections: [
      {
        title: "Nedlastingar frå gammal dokumentasjonsside",
        intro:
          "Desse dokumentlenkene er funne på gammal side og bør importerast til Sanity assets eller lokal dokumentmappe før endeleg lansering.",
        items: documentationDownloads,
      },
      {
        title: "Dokumentasjon frå gammal sitemap",
        intro:
          "Desse dokumentasjons- og monteringssidene er funne i gammal sitemap. Neste steg er å hente PDF-ar og koble dei til `documentFile`.",
        items: oldDocumentCards,
      },
      {
        title: "Support- og prosjektsider som må vurderast",
        intro:
          "Desse sidene kan bli eigne landingssider, dokumentasjon eller redirects.",
        items: oldSupportCards,
      },
    ],
    todo: [
      "Importer PDF-ar til Sanity `documentFile` eller `public/assets/fresvik/documents/`.",
      "Bygg filter/søk når dokumentlista er komplett.",
    ],
  },
  {
    slug: "/monteringsanvisning",
    title: "Monteringsanvisning",
    eyebrow: "Dokumentasjon",
    intro:
      "Monteringsanvisningar for fryserom, kjølerom, portar og dører.",
    description: "Monteringsanvisningar frå Fresvik Produkt.",
    pageType: "support",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/monteringsanvisning",
    cards: mountingDownloads,
    sections: [
      {
        title: "Monteringsfiler frå gammal side",
        intro:
          "Lenkene går førebels til gammal Squarespace-filplassering. Neste steg er å flytte dokumenta til Sanity assets eller lokal dokumentmappe.",
        items: mountingDownloads,
      },
      {
        title: "Relaterte dokumentasjonssider",
        items: oldDocumentCards.filter((item) =>
          item.href?.includes("monterings"),
        ),
      },
    ],
    todo: ["Legg dokumenta inn som `documentFile` i Sanity."],
  },
  {
    slug: "/kundeservice/faq",
    title: "FAQ",
    eyebrow: "Kundeservice",
    intro:
      "Ofte stilte spørsmål frå gammal Fresvik-side er samla her som grunnlag for ein enkel, søkbar og mobilvennleg struktur.",
    description: "Ofte stilte spørsmål for kundar av Fresvik Produkt.",
    pageType: "support",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/kundeservice/faq",
    cards: faqCards.slice(0, 6),
    sections: [
      {
        title: "Spørsmål frå gammal FAQ",
        intro:
          "Automatisk uttrekk fann desse spørsmåla. Svara vart ikkje trygt henta frå gammal side og er difor merka for kvalitetssikring.",
        items: faqCards,
      },
    ],
    todo: [
      "Importer eller skriv inn verifiserte svar i Sanity før endeleg lansering.",
      "Bygg accordion-visning når FAQ-data kjem frå `faqItem`.",
    ],
  },
  {
    slug: "/referansar",
    title: "Referansar",
    eyebrow: "Prosjekt og kundar",
    intro:
      "Referansar skal vise prosjekt, bruksområde og kundetypar på ein ryddig og filterbar måte.",
    description: "Referanseprosjekt frå Fresvik Produkt.",
    pageType: "company",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/referansar",
    cards: referenceCards.slice(0, 9),
    sections: [
      {
        title: "Registrerte referanseprosjekt frå gammal sitemap",
        intro:
          "Dette er faktiske referanse-URL-ar og bilete frå den gamle nettstaden. Neste steg er å flytte brødtekst, kategori og metadata til Sanity.",
        items: referenceCards,
      },
    ],
    todo: ["Importer referanseprosjekta som `referenceProject`-dokument i Sanity."],
  },
  {
    slug: "/om-oss",
    title: "Om Fresvik Produkt",
    eyebrow: "Selskapet",
    intro:
      "Ein moderne inngang til firmainfo, tilsette, nyheiter og kontaktpunkt.",
    description: "Om Fresvik Produkt, firmaet, menneska og aktuelle saker.",
    pageType: "company",
    priority: "medium",
    cards: companyCards,
    sections: [{ title: "Vidare informasjon", items: companyCards }],
    todo: ["Migrer endeleg selskapsforteljing frå gammal nettstad."],
  },
  {
    slug: "/firmainfo",
    title: "Firmainfo",
    eyebrow: "Selskapet",
    intro:
      "Fresvik Produkt er ein norsk produsent av isolasjonspanel, dører og portar til kjøle- og fryserom, med produksjon i Fresvik i Sogn.",
    description: "Firmainfo for Fresvik Produkt AS.",
    pageType: "company",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/firmainfo",
    cards: companyFactCards,
    sections: [
      {
        title: "Om Fresvik Produkt",
        intro:
          "Teksten er henta frå gammal firmainfo-side og skal seinare inn i Sanity som redigerbart innhald.",
        items: [
          {
            title: "Fagkunnskap og samarbeid",
            text:
              "Fresvik Produkt oppgir at dei er den einaste norske produsenten av isolasjonspanel, dører og portar til kjøle- og fryserom. Visjonen er å vere den beste samarbeidspartnaren for kjøleentreprenørar.",
          },
          {
            title: "Fleksible produksjonsløysingar",
            text:
              "Storleik og fleksible produksjonsløysingar skal gjere selskapet i stand til å levere kundetilpassa løysingar med lite svinn og avfall på byggjeplassen.",
          },
          {
            title: "Eksenterlås og montasje",
            text:
              "Alle isolasjonspanel blir levert med eksenterlås, som skal gi rask og enkel montasje.",
          },
        ],
      },
    ],
    todo: [
      "Kontroller organisasjonsnummer, formelle selskapsdata og eventuelle sertifikat før publisering.",
      "Flytt firmateksten til Sanity `page` når innhaldsmodellen blir fylt.",
    ],
  },
  {
    slug: "/tilsette",
    title: "Tilsette",
    eyebrow: "Kontaktpersonar",
    intro:
      "Kontaktpersonar frå gammal tilsette-side er samla her med rolle, telefon, e-post og bilete der kjelda hadde dette.",
    description: "Tilsette og kontaktpersonar hos Fresvik Produkt.",
    pageType: "company",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/tilsette",
    cards: employeeCards.slice(0, 6),
    sections: [
      {
        title: "Kontaktpersonar",
        intro:
          "Dette er persondata frå gammal offentleg side. Før endeleg lansering bør rekkefølgje og samtykke/personvern rutine sjekkast.",
        items: employeeCards,
      },
    ],
    todo: [
      "Verifiser GDPR/personvern og om alle personar framleis skal publiserast.",
      "Importer dei som `employee`-dokument i Sanity.",
    ],
  },
  {
    slug: "/aktuelt",
    title: "Aktuelt",
    eyebrow: "Nyheiter",
    intro:
      "Aktuelle saker og nyheiter frå Fresvik Produkt skal samlast i ein enkel nyheitsstruktur.",
    description: "Aktuelt og nyheiter frå Fresvik Produkt.",
    pageType: "company",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/aktuelt",
    cards: newsCards.slice(0, 9),
    sections: [
      {
        title: "Registrerte nyheiter frå gammal sitemap",
        intro:
          "Dette er faktiske nyheits-URL-ar, datoar og bilete frå den gamle nettstaden. Brødtekst og SEO-tekst skal importerast vidare til Sanity.",
        items: newsCards,
      },
    ],
    todo: ["Importer nyheitene som `newsArticle`-dokument i Sanity."],
  },
  {
    slug: "/stillingledig",
    title: "Stilling ledig",
    eyebrow: "Karriere",
    intro:
      "Informasjon om ledige stillingar og søknadsprosess hos Fresvik Produkt.",
    description: "Ledige stillingar hos Fresvik Produkt.",
    pageType: "company",
    priority: "low",
    sourceUrl: "https://www.fresvik.no/stillingledig",
    cards: [],
    sections: [
      {
        title: "Status",
        items: [
          {
            title: "TODO",
            text: "Verifiser om det finst aktive stillingar på gammal side.",
          },
        ],
      },
    ],
    todo: ["Publiser kjeldetekst eller tydeleg tomtilstand."],
  },
  {
    slug: "/personvernerklering",
    title: "Personvernerklæring",
    eyebrow: "Juridisk",
    intro:
      "Personvernteksten må migrerast nøyaktig frå godkjend kjelde før lansering.",
    description: "Personvernerklæring for Fresvik Produkt.",
    pageType: "legal",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/personvernerklering",
    cards: [],
    sections: [
      {
        title: "Juridisk tekst",
        items: [
          {
            title: "TODO: full juridisk tekst",
            text:
              "Automatisk uttrekk frå gammal side fann ikkje trygg brødtekst utover tittelen. Bruk godkjend juridisk kjelde eller manuell kontroll før publisering.",
          },
        ],
      },
    ],
    todo: ["Må kvalitetssikrast før domene flyttast."],
  },
  {
    slug: "/openheitslova",
    title: "Openheitslova",
    eyebrow: "Juridisk",
    intro:
      "Openheitslova skal fremme verksemder sin respekt for menneskerettar og anstendige arbeidsforhold, og sikre tilgang på informasjon.",
    description: "Openheitslova-informasjon for Fresvik Produkt.",
    pageType: "legal",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/openheitslova",
    cards: legalDocumentCards,
    sections: [
      {
        title: "Tekst frå gammal Openheitslova-side",
        items: [
          {
            title: "Arbeid med krava i lova",
            text:
              "Fresvik Produkt oppgir at dei er opptekne av problemstillinga og gjennomfører kontinuerleg tiltak for å tilfredsstille krava i lova.",
          },
          {
            title: "Utgreiing og dokument",
            text:
              "På bakgrunn av §5 i openheitslova skal verksemda offentleggjere ei utgreiing. Dokumentlenkene frå gammal side er lagt inn som eksterne kjelder og bør importerast til Sanity assets.",
          },
        ],
      },
      {
        title: "Dokument og eksterne kjelder",
        items: legalDocumentCards,
      },
    ],
    todo: [
      "Kvalitetssikre juridisk tekst og PDF-versjonar før domene flyttast.",
      "Importer PDF-ar til Sanity `documentFile` eller `public/assets/fresvik/documents/`.",
    ],
  },
];

export function getContentPage(slug: string) {
  return contentPages.find((page) => page.slug === slug);
}

export function getAllContentPages() {
  return contentPages;
}

function titleFromSlug(slug: string) {
  const lastSegment = slug.split("/").filter(Boolean).at(-1) || "side";

  return lastSegment
    .replace(/-/g, " ")
    .replace(/nbps|nbsp/g, "")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function createLegacyContentPage(slug: string): ContentPage {
  const isArticle = slug.startsWith("/aktuelt/");
  const isReference = slug.startsWith("/referansar/");
  const isAccessory = slug.startsWith("/andre-produkter/");
  const inventoryItem = getOldSiteInventoryItem(slug);

  return {
    slug,
    title: inventoryItem?.title || titleFromSlug(slug),
    eyebrow: isArticle
      ? "Aktuelt frå gammal nettstad"
      : isReference
        ? "Referanse frå gammal nettstad"
        : isAccessory
          ? "Tilleggsutstyr frå gammal nettstad"
          : "Gammal URL under migrering",
    intro:
      "Denne gamle Fresvik-sida er registrert i sitemap og blir halde levande medan innhaldet blir flytta til ny struktur.",
    description:
      "Migreringsside for gammal Fresvik Produkt URL. Endeleg tekst, bilete og dokument skal hentast frå gammal nettstad.",
    pageType: isArticle
      ? "company"
      : isReference
        ? "company"
        : isAccessory
          ? "product"
          : "index",
    priority: "low",
    sourceUrl: `https://www.fresvik.no${slug}`,
    cards: inventoryItem
      ? [
          {
            title: inventoryItem.title,
            text: "Registrert frå gammal sitemap. Brødtekst skal importerast frå kjeldesida til Sanity.",
            href: inventoryItem.href,
            meta: inventoryItem.lastmod,
            imageUrl: inventoryItem.imageUrl,
            imageAlt: inventoryItem.imageAlt || inventoryItem.title,
          },
        ]
      : [],
    sections: [
      {
        title: "Migreringsstatus",
        intro:
          "URL-en er dekt i ny Next.js-struktur slik at gamle interne lenker ikkje endar som 404 under migreringa.",
        items: [
          {
            title: "Kjelde",
            text: `Gammal side: https://www.fresvik.no${slug}`,
          },
          {
            title: "Neste steg",
            text: "TODO: hent tittel, brødtekst, bilete, PDF-ar og metadata frå gammal side og flytt til rett Sanity-type.",
          },
        ],
      },
    ],
    todo: [
      "Migrer nøyaktig tekst frå gammal side.",
      "Importer og kvalitetssikre bilete, dokument og alt-tekst.",
      "Avgjer om sida skal bli eiga side, nyheitsartikkel, referanse, produkt eller redirect.",
    ],
  };
}
