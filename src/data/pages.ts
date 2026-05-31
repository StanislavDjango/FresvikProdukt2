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

const productSections = [
  {
    title: "Dette skal migrerast frå gammal side",
    intro:
      "Produkttekst, tekniske data, bruksområde, bilete og dokument skal hentast frå gammal side og kvalitetssikrast før endelig publisering.",
    items: [
      {
        title: "Produktfordelar",
        text: "TODO: verifiser alle punkt mot kjeldesida før dei blir gjort redigerbare i Sanity.",
      },
      {
        title: "Tekniske data",
        text: "TODO: legg inn tabellar og spesifikasjonar som strukturerte felt, ikkje som lause skjermbilete.",
      },
      {
        title: "Dokument",
        text: "TODO: knyt relevante PDF-ar og monteringsdokument til produktet.",
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
      "Isolerte PIR-panel for prosjekt der effektiv isolasjon, låg vekt og ryddig montasje er viktig.",
    description:
      "Fresvik PIR Panel, med migreringsplass for tekniske data, bruksområde og dokumentasjon.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/fresvik-pir-panel",
    cards: [],
    sections: productSections,
    todo: ["Verifiser komplett produkttekst, tekniske data og dokument."],
  },
  {
    slug: "/produkt/fresvik-pur-panel",
    title: "Fresvik PUR Panel",
    eyebrow: "Produkt",
    intro:
      "PUR-panel for temperaturstyrte bygg og tekniske prosjekt. Innhaldet skal kontrollerast mot gammal `fresvik-panel`-side.",
    description:
      "Fresvik PUR Panel med planlagt redirect frå gammal Fresvik Panel URL når mapping er stadfesta.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/fresvik-panel",
    cards: [],
    sections: productSections,
    todo: ["Bekreft at `/produkt/fresvik-panel` skal mappe hit."],
  },
  {
    slug: "/produkt/kjole-fryseportar",
    title: "Kjøle- og fryseportar",
    eyebrow: "Produkt",
    intro:
      "Portar for kjøle- og frysemiljø med krav til drift, isolasjon og tett funksjon.",
    description:
      "Produktområde for kjøle- og fryseportar frå Fresvik Produkt.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/kjole-fryseportar",
    cards: [],
    sections: productSections,
    todo: ["Migrer portvariantar, bilete, dokument og tekniske data."],
  },
  {
    slug: "/produkt/kjole-frysedorer",
    title: "Kjøle- og frysedører",
    eyebrow: "Produkt",
    intro:
      "Dørløysingar for kjøle- og fryserom, lager og næringsmiddelprosjekt.",
    description:
      "Produktområde for kjøle- og frysedører frå Fresvik Produkt.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/kjole-frysedorer",
    cards: [],
    sections: productSections,
    todo: ["Migrer dørvariantar, bilete, dokument og tekniske data."],
  },
  {
    slug: "/produkt/fasadepanel",
    title: "Fasadepanel",
    eyebrow: "Produkt",
    intro:
      "Fasadepanel for prosjekt der bygget treng teknisk funksjon og eit ryddig eksteriør.",
    description: "Produktområde for fasadepanel frå Fresvik Produkt.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/fasadepanel",
    cards: [],
    sections: productSections,
    todo: ["Migrer fasadepanel-tekst, bilete, bruksområde og dokument."],
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
      "Montasje av panel, portar og relaterte løysingar med planlegging for effektiv gjennomføring på byggeplass.",
    description: "Montasjetenester frå Fresvik Produkt.",
    pageType: "service",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/tenester/montasje",
    cards: [],
    sections: [
      {
        title: "Montasjeprosess",
        items: [
          {
            title: "Avklaring",
            text: "TODO: hent arbeidsflyt og detaljar frå gammal side.",
          },
          {
            title: "Gjennomføring",
            text: "TODO: migrer montasjeinformasjon, krav og kontaktpunkt.",
          },
        ],
      },
    ],
    todo: ["Importer servicebilete og eventuelle dokument."],
  },
  {
    slug: "/tenester/leveranse",
    title: "Leveranse",
    eyebrow: "Teneste",
    intro:
      "Leveranse og koordinering av produkt til prosjekt der timing, logistikk og oppfølging er viktig.",
    description: "Leveransetenester frå Fresvik Produkt.",
    pageType: "service",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/tenester/leveranse",
    cards: [],
    sections: [
      {
        title: "Leveranseoppfølging",
        items: [
          {
            title: "Koordinering",
            text: "TODO: migrer leveranseprosess og praktisk informasjon.",
          },
          {
            title: "Prosjektkontakt",
            text: "Kontakt Fresvik tidleg for avklaring av produkt, mengder og levering.",
          },
        ],
      },
    ],
    todo: ["Verifiser tekst og eventuelle leveransevilkår frå gammal side."],
  },
  {
    slug: "/tenester/service-reservedeler",
    title: "Service og reservedeler",
    eyebrow: "Teneste",
    intro:
      "Oppfølging etter levering med service, reservedeler og praktisk hjelp ved behov.",
    description: "Service og reservedeler frå Fresvik Produkt.",
    pageType: "service",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/tenester/service-reservedeler",
    cards: [],
    sections: [
      {
        title: "Ettermarknad",
        items: [
          {
            title: "Service",
            text: "TODO: migrer serviceinformasjon og kontaktflyt.",
          },
          {
            title: "Reservedeler",
            text: "TODO: kartlegg kva reservedeler og dokument som skal synleggjerast.",
          },
        ],
      },
    ],
    todo: ["Legg inn dokument eller skjema dersom gammal side har dette."],
  },
  {
    slug: "/dokumentasjon",
    title: "Dokumentasjon",
    eyebrow: "Kundeservice",
    intro:
      "Samla inngang til dokument, datablad, monteringsanvisningar og andre filer.",
    description:
      "Dokumentasjon, datablad og PDF-filer frå Fresvik Produkt.",
    pageType: "support",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/dokumentasjon",
    cards: oldDocumentCards,
    sections: [
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
    todo: ["Bygg filter/søk når dokumentlista er komplett."],
  },
  {
    slug: "/monteringsanvisning",
    title: "Monteringsanvisning",
    eyebrow: "Dokumentasjon",
    intro:
      "Monteringsrettleiingar og praktiske dokument for utførande og prosjekt.",
    description: "Monteringsanvisningar frå Fresvik Produkt.",
    pageType: "support",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/monteringsanvisning",
    cards: oldDocumentCards.filter((item) =>
      item.href?.includes("monterings"),
    ),
    sections: [
      {
        title: "Filer som skal inn",
        items: [
          {
            title: "Monterings-PDF",
            text: "TODO: last ned, importer og kvalitetssikre alle monteringsanvisningar.",
          },
        ],
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
