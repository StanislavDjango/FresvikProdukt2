export type ContentCard = {
  title: string;
  text: string;
  href?: string;
  meta?: string;
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
    cards: productCards,
    sections: [{ title: "Produktområde", items: productCards }],
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
    cards: productCards.slice(0, 4),
    sections: [
      {
        title: "Utstyr som skal kartleggast",
        items: [
          {
            title: "Produktlister",
            text: "TODO: hent komplett liste frå gammal side.",
          },
          {
            title: "Relasjonar",
            text: "TODO: knyt til aktuelle panel, portar og dører i Sanity.",
          },
        ],
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
    cards: serviceCards,
    sections: [{ title: "Tenesteområde", items: serviceCards }],
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
    cards: supportCards,
    sections: [
      {
        title: "Dokumentkategoriar",
        items: [
          {
            title: "Produktdokumentasjon",
            text: "TODO: importer PDF-filer og knyt dei til produkt.",
          },
          {
            title: "Sertifikat og eksterne dokument",
            text: "TODO: kartlegg SINTEF, Miljøfyrtårn og andre eksterne lenker.",
          },
        ],
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
    cards: [],
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
      "Ofte stilte spørsmål skal samlast i ein enkel, søkbar og mobilvennleg struktur.",
    description: "Ofte stilte spørsmål for kundar av Fresvik Produkt.",
    pageType: "support",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/kundeservice/faq",
    cards: [],
    sections: [
      {
        title: "Spørsmål som skal migrerast",
        items: [
          {
            title: "TODO",
            text: "Hent spørsmål, svar og kategoriar frå gammal FAQ-side.",
          },
        ],
      },
    ],
    todo: ["Bygg `faqItem` schema og accordion-visning."],
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
    cards: [],
    sections: [
      {
        title: "Referanseprosjekt",
        items: [
          {
            title: "TODO",
            text: "Migrer prosjektliste, bilete, år, stad og kundetype frå gammal side.",
          },
        ],
      },
    ],
    todo: ["Bygg `referenceProject` schema og filter."],
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
      "Selskapsinformasjon, kontaktdata og relevante sertifikat skal samlast her.",
    description: "Firmainfo for Fresvik Produkt AS.",
    pageType: "company",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/firmainfo",
    cards: [],
    sections: [
      {
        title: "Informasjon som skal verifiserast",
        items: [
          {
            title: "Selskapsdata",
            text: "TODO: migrer organisasjonsnummer, adresser og nøkkeldata frå gammal side.",
          },
          {
            title: "Sertifikat",
            text: "TODO: migrer relevante PDF-ar og eksterne lenker.",
          },
        ],
      },
    ],
    todo: ["Kontroller juridiske og formelle opplysningar før publisering."],
  },
  {
    slug: "/tilsette",
    title: "Tilsette",
    eyebrow: "Kontaktpersonar",
    intro:
      "Oversikt over personar og avdelingar skal publiserast etter at persondata er verifisert.",
    description: "Tilsette og kontaktpersonar hos Fresvik Produkt.",
    pageType: "company",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/tilsette",
    cards: [],
    sections: [
      {
        title: "Persondata",
        items: [
          {
            title: "TODO",
            text: "Hent namn, roller, telefon, e-post, bilete og rekkefølgje frå gammal side.",
          },
        ],
      },
    ],
    todo: ["Verifiser GDPR/personvern før import av tilsette."],
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
    cards: [],
    sections: [
      {
        title: "Artiklar",
        items: [
          {
            title: "TODO",
            text: "Migrer nyheitsliste, datoar, ingressar, bilete og eventuelle artikkelsider.",
          },
        ],
      },
    ],
    todo: ["Bygg `newsArticle` schema og kortvisning."],
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
      "Personvernteksten skal migrerast nøyaktig frå gammal nettstad før lansering.",
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
            title: "TODO",
            text: "Importer full tekst frå gammal personvernerklæring utan omskriving.",
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
      "Informasjon knytt til Openheitslova skal migrerast nøyaktig frå gammal nettstad.",
    description: "Openheitslova-informasjon for Fresvik Produkt.",
    pageType: "legal",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/openheitslova",
    cards: [],
    sections: [
      {
        title: "Juridisk tekst og dokument",
        items: [
          {
            title: "TODO",
            text: "Importer full tekst og eventuelle PDF-ar frå gammal side.",
          },
        ],
      },
    ],
    todo: ["Må kvalitetssikrast før domene flyttast."],
  },
];

export function getContentPage(slug: string) {
  return contentPages.find((page) => page.slug === slug);
}

export function getAllContentPages() {
  return contentPages;
}
