export type MigratedListItem = {
  title: string;
  href: string;
  lastmod?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type MigratedEmployee = MigratedListItem & {
  role: string;
  phone?: string;
  mobile?: string;
  email?: string;
  location?: string;
};

export const oldSiteNews: MigratedListItem[] = [
  {
    title: "Møt vår nye tekniske sjef",
    href: "/aktuelt/samaneh-shakeri-ny-teknisk-sjef",
    lastmod: "2024-12-17",
    imageUrl:
      "/assets/fresvik/images/migrated/samaneh-shakeri.jpg",
    imageAlt: "Samaneh Shakeri, ny teknisk sjef i Fresvik Produkt.",
  },
  {
    title: "Ny teknisk teiknar på plass",
    href: "/aktuelt/ny-teknisk-teiknar-havard-berdal",
    lastmod: "2024-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/havard-berdal.jpg",
    imageAlt: "Håvard Berdal er ny teknisk teiknar.",
  },
  {
    title: "John Bøthun blir pensjonist",
    href: "/aktuelt/john-bothun-blir-pensjonist",
    lastmod: "2024-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/john-bthun-fresvik-produkt.jpg",
    imageAlt:
      "John Bøthun har jobba 42 år i Fresvik Produkt men blir no pensjonist.",
  },
  {
    title: "Ein investering for å henga med i tida",
    href: "/aktuelt/ein-investering-for-henga-med-i-tidanbsp",
    lastmod: "2023-12-20",
    imageUrl:
      "/assets/fresvik/images/migrated/fresvik-produkt-ny-4.jpeg",
  },
  {
    title: "Agnar er snart pensjonist",
    href: "/aktuelt/agnar-er-snart-pensjonistnbsp",
    lastmod: "2024-08-26",
    imageUrl:
      "/assets/fresvik/images/migrated/agnar3.jpeg",
    imageAlt: "Agnar",
  },
  {
    title: "To ledige stillingar i haust",
    href: "/aktuelt/to-ledige-stillingar-i-haust",
    lastmod: "2023-12-20",
  },
  {
    title: "Fresvik: ein god jobb og eit godt liv",
    href: "/aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv",
    lastmod: "2023-10-25",
  },
  {
    title: "Vi er blitt sertifisert Miljøfyrtårn",
    href: "/aktuelt/vi-er-blitt-sertifisert-miljofyrtarn",
    lastmod: "2023-08-30",
    imageUrl:
      "/assets/fresvik/images/migrated/miljfyrtarn-fresvik-produkt.jpg",
  },
  {
    title: "Fryse- og kjølerom til Sogn Frukt og Grønt",
    href: "/aktuelt/fryse-og-kjlerom-til-sogn-frukt-og-grnt",
    lastmod: "2023-08-28",
  },
  {
    title: "Ledig stilling som produksjonsmedarbeidar",
    href: "/aktuelt/ledig-stilling-som-produksjonsmedarbeidar",
    lastmod: "2023-08-28",
  },
  {
    title: "God jul og godt nytt år",
    href: "/aktuelt/jul-2020",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/fresvik-produkt-julehjarte-dekorasjon.jpg",
  },
  {
    title: "Møt Arne-Olav, vår nye salskonsulent",
    href: "/aktuelt/arne-olav-ny-salskonsulent",
    lastmod: "2023-08-30",
    imageUrl:
      "/assets/fresvik/images/migrated/fresvik-produikt-seljar-arne-olav.jpg",
    imageAlt: "Arne-Olav Lien Bardølsgård",
  },
  {
    title: "Kjølerom til fruktbonde",
    href: "/aktuelt/fresvik-kjolerom-til-fruktbonde",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/fresvik-kj-c3-b8lerom-ivar-slinde.jpg",
    imageAlt: "Montasjelag med fruktbonde Ivar Slinde.",
  },
  {
    title: "40 år med isolasjonspanel til kjøle- og fryserom",
    href: "/aktuelt/40-aars-jubileum",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/fresvik-produkt-40-aar.jpg",
  },
  {
    title: "Innfesting mot golv",
    href: "/aktuelt/innfesting-mot-golv",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/fresvik-ionnfesting-mot-golv.jpg",
  },
  {
    title: "Ei gladhistorie frå Fresvik Produkt",
    href: "/aktuelt/gladhistorie-fresvik-kjole-fryserom",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/fresvik-illustrasjon-1.jpg",
    imageAlt: "Illustrasjon: Emma Kenny",
  },
  {
    title: "Tomas Kruvelis, vår nye mann på innkjøp",
    href: "/aktuelt/tomas-kruvellis-vaar-nye-mann",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/tomas-kruvelis-20180315-121307.jpg",
  },
  {
    title: "Fasadeprosjekt for Celsa Steel Service Sotra",
    href: "/aktuelt/fasadeprosjekt-for-celsa-steel-service-sotra",
    lastmod: "2023-08-28",
  },
  {
    title: "Fresvik hengsel",
    href: "/aktuelt/fresvik-hengsel",
    lastmod: "2023-08-28",
  },
  {
    title: "Stor leveranse til Buskerud Storcash",
    href: "/aktuelt/stor-leveranse-til-buskerud-storcash",
    lastmod: "2023-08-28",
  },
  {
    title: "Fresvik kan ta heile pakken",
    href: "/aktuelt/montasje-prosjekt",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/dsc-0608.jpg",
  },
  {
    title: "Skjererom for eit betre arbeidsmiljø",
    href: "/aktuelt/skjererom",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/image-asset.jpeg",
  },
  {
    title: "Deleveggar, dører og portar til nytt lefsebakeri på Stranda",
    href: "/aktuelt/orklafoods-stranda",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/image-asset-13.jpeg",
  },
  {
    title: "Nye monteringsanvisningar",
    href: "/aktuelt/nye-monteringsanvisningar",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/k6r3776-07032013.jpg",
  },
  {
    title: "Fasade-element og takplater frå Ruukki",
    href: "/aktuelt/fasade-element-og-takplater-ruukki",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/image-asset-15.jpeg",
  },
  {
    title: "Fresvik skyveport",
    href: "/aktuelt/portproduksjon",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/port1-fresvik.jpg",
  },
];

export const oldSiteReferences: MigratedListItem[] = [
  {
    title: "Coop Extra Sogndal",
    href: "/referansar/2014/7/8/coop-extra-sogndal",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/coop-extra-sogndal.jpeg",
    imageAlt: "Coop Extra Sogndal",
  },
  {
    title: "Interfrukt, vårt største prosjekt",
    href: "/referansar/2014/7/8/interfrukt-vrt-strste-prosjekt",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/interfrukt-langhus.webp",
    imageAlt: "Interfrukt Langhus",
  },
  {
    title: "Skreddarsydd fryserom til Baza i Fredrikstad",
    href: "/referansar/fryserom-baza-fredrikstad",
    lastmod: "2026-02-16",
    imageUrl:
      "/assets/fresvik/images/migrated/baza-fryserom-1.jpeg",
  },
  {
    title: "Historisk leveranse til Spar Lund Torv",
    href: "/referansar/historisk-leveranse-pir-panel-spar-lund-torv",
    lastmod: "2025-09-30",
    imageUrl:
      "/assets/fresvik/images/migrated/spar-lund-torv-fresvik-produkt-1.jpeg",
  },
  {
    title: "Bjerkreim Legekontor: fryselager og kjølerom",
    href: "/referansar/bjerkreim-legekontor-vikesaa",
    lastmod: "2025-09-30",
    imageUrl:
      "/assets/fresvik/images/migrated/bjerkreim-legekontor-1.jpeg",
  },
  {
    title: "Kjøle- og fryserom til Bunnpris Hammerfest",
    href: "/referansar/bunnpris-hammerfest",
    lastmod: "2025-05-19",
    imageUrl:
      "/assets/fresvik/images/migrated/1000024746.jpg",
  },
  {
    title: "Bunnpris Volda: nytt kjølerom med isolert kjøledør",
    href: "/referansar/kjolerom-kjoledor-bunnpris-volda",
    lastmod: "2025-05-19",
    imageUrl:
      "/assets/fresvik/images/migrated/kjlerom-bunnpris-volda-3.jpg",
  },
  {
    title: "Nytt stort fryserom til Coop Obs Alnabru",
    href: "/referansar/fryserom-coop-obs-alnabru",
    lastmod: "2025-03-20",
    imageUrl:
      "/assets/fresvik/images/migrated/fryserom-obs-alna-3-red.jpg",
  },
  {
    title: "Kjøle- og fryserom til nye Vik helse- og omsorgssenter",
    href: "/referansar/vik-helse-og-omsorgssenter",
    lastmod: "2024-12-10",
    imageUrl:
      "/assets/fresvik/images/migrated/vik-helse-og-sjukeheim-1.jpg",
  },
  {
    title: "Nok ein Kiwi-butikk får nye fryse- og kjølerom",
    href: "/referansar/fryse-og-kjolerom-kiwi-otta",
    lastmod: "2024-12-10",
    imageUrl:
      "/assets/fresvik/images/migrated/kiwi-otta-1.jpeg",
  },
  {
    title: "Nye leveransar til Rema 1000 Øya i Larvik",
    href: "/referansar/nye-leveransar-til-rema-1000-ya-i-larvik",
    lastmod: "2024-12-09",
    imageUrl:
      "/assets/fresvik/images/migrated/1715599204491-upscale.jpeg",
  },
  {
    title: "Ny leveranse til Dyreparken Safaricamp i Kristiansand Dyrepark",
    href: "/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark",
    lastmod: "2024-12-09",
    imageUrl:
      "/assets/fresvik/images/migrated/fp-dyreparken.jpg",
  },
  {
    title: "Spesialløysing til tørkerom hjå Drageboden Kaupanger",
    href: "/referansar/spesialloysing-torkerom-drageboden-kaupanger",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/dsc03066.jpg",
  },
  {
    title: "Omfattande leveranse til Bakehuset Trondheim",
    href: "/referansar/omfattande-leveranse-til-bakehuset-trondheim",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/20220616-152720-1.jpg",
  },
  {
    title: "Fryseromsportar til Rema 1000 i Narvik",
    href: "/referansar/fryseromsportar-til-rema-1000-i-narvik",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/img-6262.jpg",
  },
  {
    title: "Fryse- og kjølerom til Sogn Frukt og Grønt",
    href: "/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/img-2589.jpg",
  },
  {
    title: "Fryserom og fryseport til Rentokil, Skjetten",
    href: "/referansar/fryserom-fryseport-rentokil",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/resvik-fryserom-innvendig-2.jpg",
    imageAlt: "Fryserom innvendig",
  },
  {
    title: "Fresvik kjøle- og fryserom i miljøvennlege daglegvarebutikkar",
    href: "/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/kiwi-skollenborg-2018-06-18-1-redigert-4-gang.jpg",
    imageAlt: "Kiwi Skollenborg, Kongsberg",
  },
  {
    title: "Karlsøybruket",
    href: "/referansar/karlsoybruket",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/img-7324.jpg",
  },
  {
    title: "Fiskehallen",
    href: "/referansar/fiskehallen",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/fiskehallen1.jpg",
  },
  {
    title: "Celsa Steel Service, Sotra",
    href: "/referansar/celsa-steel-sotra",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/dsc-2579.jpg",
  },
  {
    title: "Buskerud Storcash",
    href: "/referansar/buskerud-storcash",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/image-asset-35.jpeg",
  },
  {
    title: "Bjerke spekemat og delikatesse",
    href: "/referansar/bjerke-spekemat",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/fresvik-aks-montering1.jpg",
  },
  {
    title: "Restauranthuset Malin",
    href: "/referansar/restauranthuset-malin",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/image2.jpg",
  },
  {
    title: "Coop Extra Naustdal",
    href: "/referansar/fryserom-med-fryseport-til-coop-extra-naustdal",
    lastmod: "2023-09-11",
    imageUrl:
      "/assets/fresvik/images/migrated/20151021-174754.jpg",
  },
];

export const oldSiteProducts: MigratedListItem[] = [
  {
    title: "Fresvik PIR Panel",
    href: "/produkt/fresvik-pir-panel",
    lastmod: "2026-05-11",
    imageUrl:
      "/assets/fresvik/images/migrated/flake-black.png",
  },
  {
    title: "Fresvik Panel",
    href: "/produkt/fresvik-panel",
    lastmod: "2026-03-10",
    imageUrl:
      "/assets/fresvik/images/migrated/flake-black.png",
  },
  {
    title: "Kjøle- og fryseportar",
    href: "/produkt/kjole-fryseportar",
    lastmod: "2026-03-10",
    imageUrl:
      "/assets/fresvik/images/migrated/flake-black.png",
  },
  {
    title: "Kjøle- og frysedører",
    href: "/produkt/kjole-frysedorer",
    lastmod: "2026-03-10",
    imageUrl:
      "/assets/fresvik/images/migrated/flake-black.png",
  },
  {
    title: "Fasadepanel",
    href: "/produkt/fasadepanel",
    lastmod: "2026-03-10",
    imageUrl:
      "/assets/fresvik/images/migrated/flake-black.png",
  },
  {
    title: "Frysetunnel",
    href: "/produkt/frysetunnel",
    lastmod: "2026-05-07",
    imageUrl:
      "/assets/fresvik/images/migrated/new-logo-design-2024-made-with-postermywall-15.png",
  },
];

export const oldSiteServices: MigratedListItem[] = [
  {
    title: "Montasje",
    href: "/tenester/montasje",
    lastmod: "2026-03-10",
    imageUrl:
      "/assets/fresvik/images/migrated/k6r3776-07032013.jpg",
  },
  {
    title: "Leveranse",
    href: "/tenester/leveranse",
    lastmod: "2026-03-10",
    imageUrl:
      "/assets/fresvik/images/migrated/port1web.jpg",
  },
  {
    title: "Service og reservedeler",
    href: "/tenester/service-reservedeler",
    lastmod: "2026-03-10",
    imageUrl:
      "/assets/fresvik/images/migrated/flake-left.png",
  },
];

export const oldSiteDocuments: MigratedListItem[] = [
  {
    title: "Dokumentasjon",
    href: "/dokumentasjon",
    lastmod: "2026-03-10",
    imageUrl:
      "/assets/fresvik/images/migrated/flake-left.png",
  },
  {
    title: "Monteringsanvisning",
    href: "/monteringsanvisning",
    lastmod: "2026-03-10",
    imageUrl:
      "/assets/fresvik/images/migrated/flake-left.png",
  },
  {
    title: "Monteringsanvisningar Fresvik skyveport",
    href: "/monteringsanvisningar-fresvik-skyveport",
    lastmod: "2026-02-04",
    imageUrl:
      "/assets/fresvik/images/migrated/flake-left.png",
  },
];

export const oldSiteAccessories: MigratedListItem[] = [
  {
    title: "Tilleggsutstyr",
    href: "/tilleggsutstyr",
    lastmod: "2026-03-10",
    imageUrl:
      "/assets/fresvik/images/migrated/1463-fr-plata-instal.png",
  },
  {
    title: "Standard håndtak",
    href: "/andre-produkter/standard-handtak",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/handtak-standard-web.jpg",
  },
  {
    title: "Elebar ventil",
    href: "/andre-produkter/elebar-ventil",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/elebar-ventil-inne-web.jpg",
  },
  {
    title: "MaxiElebar ventil",
    href: "/andre-produkter/maxielebar-ventil",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/maxielebar-ventil-inne-web.jpg",
  },
  {
    title: "PEGO innestengningsalarm",
    href: "/andre-produkter/pego-innestengningsalarm",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/pego-innestengningsalarm-web.jpg",
    imageAlt: "PEGO innestengningsalarm.",
  },
  {
    title: "PVC-gardiner",
    href: "/andre-produkter/pvc-gardiner",
    lastmod: "2024-06-25",
    imageUrl:
      "/assets/fresvik/images/migrated/pvc-gardin-web.jpg",
    imageAlt: "PVC-gardin.",
  },
  {
    title: "Diktator dørtiltrekker",
    href: "/andre-produkter/diktator-dortiltrekker",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/diktator-web.jpg",
  },
  {
    title: "Køyrerampe",
    href: "/andre-produkter/kjlerampe",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/rampe1-copy.jpg",
  },
  {
    title: "Beslag",
    href: "/andre-produkter/beslag",
    lastmod: "2023-08-28",
    imageUrl:
      "/assets/fresvik/images/migrated/profil1-copy.jpg",
  },
  {
    title: "Standard dører",
    href: "/andre-produkter/2014/7/9/standard-drer",
    lastmod: "2024-01-05",
    imageUrl:
      "/assets/fresvik/images/migrated/dor-ny.jpg",
  },
  {
    title: "Skipsdører",
    href: "/andre-produkter/2014/7/9/skipsdrer",
    lastmod: "2024-10-02",
    imageUrl:
      "/assets/fresvik/images/migrated/skipsdr-fresvik-produkt.jpg",
  },
  {
    title: "Industri slagdør",
    href: "/andre-produkter/2014/7/9/industri-slagdor",
    lastmod: "2025-01-20",
    imageUrl:
      "/assets/fresvik/images/migrated/industri-slagdr-fresvik-produkt.jpg",
  },
];

export const oldSiteSupportPages: MigratedListItem[] = [
  {
    title: "Kjølerom og fryserom butikk",
    href: "/kjolerom-fryserom-butikk",
    lastmod: "2026-02-04",
    imageUrl:
      "/assets/fresvik/images/migrated/coop-extra-sogndal.jpeg",
  },
  {
    title: "Kjølerom og fryserom offshore",
    href: "/kjolerom-fryserom-offshore",
    lastmod: "2026-02-24",
    imageUrl:
      "/assets/fresvik/images/migrated/image-asset-39.jpeg",
  },
  {
    title: "Kjølerom og fryserom storkjøkken",
    href: "/kjolerom-fryserom-storkjokken",
    lastmod: "2026-02-04",
    imageUrl:
      "/assets/fresvik/images/migrated/image-asset-42.jpeg",
  },
  {
    title: "Transportskade",
    href: "/transportskade",
    lastmod: "2026-02-04",
    imageUrl:
      "/assets/fresvik/images/migrated/transportskade-fresvik-produkt.jpg",
  },
  {
    title: "Send førespørsel",
    href: "/send-foresporsel",
    lastmod: "2026-02-04",
  },
];

export const oldSiteFaqItems: MigratedListItem[] = [
  {
    title: "Kva er hovudforskjellen mellom PIR og PUR i kjøle- og fryserom?",
    href: "/kundeservice/faq",
  },
  {
    title: "I kva prosjekt bør PIR føretrekkjast framfor PUR?",
    href: "/kundeservice/faq",
  },
  {
    title:
      "Kvifor har PIR-panel nesten same U-verdi som PUR-panel, men betre branneigenskapar?",
    href: "/kundeservice/faq",
  },
  {
    title:
      "Har PIR-panela låsemekanisme i skøytane og hjørna, slik som PUR-panela?",
    href: "/kundeservice/faq",
  },
  {
    title:
      "Kva er PVC-gardin, og når bør ein bruke PVC-gardiner i kjølerom eller fryserom?",
    href: "/kundeservice/faq",
  },
  {
    title: "Kva er forskjellen på ein kjøleromsdør og ein fryseromsdør?",
    href: "/kundeservice/faq",
  },
  {
    title: "Korleis er vekta/densiteten på PIR-panel samanlikna med PUR-panel?",
    href: "/kundeservice/faq",
  },
  {
    title: "Kan PIR-panel brukast ved same temperaturar som PUR-panel?",
    href: "/kundeservice/faq",
  },
  {
    title: "Kan PIR-panela produserast i same storleik som PUR-panela?",
    href: "/kundeservice/faq",
  },
  {
    title: "Kan de produsere dører og portar med PIR-skum?",
    href: "/kundeservice/faq",
  },
  {
    title:
      "Kva er kjøleromspanel, og kva tjukkleik bør ein velje til kjøl og fryserom?",
    href: "/kundeservice/faq",
  },
  {
    title:
      "Kan Fresvik Produkt levere kjøle- og fryserom på spesialmål eller for skreddarsydde prosjekt?",
    href: "/kundeservice/faq",
  },
];

export const oldSiteEmployees: MigratedEmployee[] = [
  {
    title: "Lars Erling Livrud",
    role: "Sals- og marknadssjef",
    href: "/tilsette",
    phone: "32 20 82 00",
    mobile: "404 77 912",
    email: "larliv@fresvik.no",
    imageUrl:
      "/assets/fresvik/images/migrated/lars-erling-livrud.jpeg",
    imageAlt: "Lars Erling Livrud, sals- og marknadssjef.",
  },
  {
    title: "Frode Winther",
    role: "Sal, avdeling Drammen",
    href: "/tilsette",
    phone: "32 20 82 00",
    mobile: "913 83 949",
    email: "frowin@fresvik.no",
    location: "Drammen",
    imageUrl:
      "/assets/fresvik/images/migrated/frode-winther.jpg",
    imageAlt: "Frode Winther, sal avdeling Drammen.",
  },
  {
    title: "Arne-Olav Lien Bardølsgård",
    role: "Sal, avdeling Fresvik",
    href: "/tilsette",
    mobile: "995 52 549",
    email: "arnbar@fresvik.no",
    location: "Fresvik",
    imageUrl:
      "/assets/fresvik/images/migrated/arne-olav-lien-bardlsgard.jpg",
    imageAlt: "Arne-Olav Lien Bardølsgård, sal avdeling Fresvik.",
  },
  {
    title: "Ove Fedje",
    role: "Teknisk teikning og sal skip/offshore",
    href: "/tilsette",
    mobile: "911 76 599",
    email: "ovefed@fresvik.no",
    imageUrl:
      "/assets/fresvik/images/migrated/ove-fedje.jpeg",
    imageAlt: "Ove Fedje, teknisk teikning og sal skip/offshore.",
  },
  {
    title: "Tomas Kruvelis",
    role: "Delesal/innkjøp",
    href: "/tilsette",
    mobile: "465 81 422",
    email: "tomkru@fresvik.no",
    imageUrl:
      "/assets/fresvik/images/migrated/tomas-kruvelis.jpg",
    imageAlt: "Tomas Kruvelis, delesal og innkjøp.",
  },
  {
    title: "Gyda Bøtun",
    role: "Adm dir",
    href: "/tilsette",
    mobile: "992 27 516",
    email: "gydbot@fresvik.no",
    imageUrl:
      "/assets/fresvik/images/migrated/gyda-bthun.jpeg",
    imageAlt: "Gyda Bøtun, administrerande direktør.",
  },
  {
    title: "Sigmund Hauglum",
    role: "Lager og logistikk",
    href: "/tilsette",
    mobile: "954 68 212",
    email: "sighau@fresvik.no",
    imageUrl:
      "/assets/fresvik/images/migrated/sigmund-hauglum.jpg",
    imageAlt: "Sigmund Hauglum, lager og logistikk.",
  },
  {
    title: "Siv Settevik",
    role: "Produksjonsleiar",
    href: "/tilsette",
    mobile: "416 60 685",
    email: "sivset@fresvik.no",
    imageUrl:
      "/assets/fresvik/images/migrated/siv-settevik.jpeg",
    imageAlt: "Siv Settevik, produksjonsleiar.",
  },
  {
    title: "Håvard Berdal",
    role: "Teknisk teikning",
    href: "/tilsette",
    mobile: "909 12 476",
    email: "havber@fresvik.no",
    imageUrl:
      "/assets/fresvik/images/migrated/havard-berdal-71.jpg",
    imageAlt: "Håvard Berdal, teknisk teikning.",
  },
  {
    title: "Oddrun Time",
    role: "Administrasjonskoordinator",
    href: "/tilsette",
    mobile: "907 46 651",
    email: "oddtim@fresvik.no",
    imageUrl:
      "/assets/fresvik/images/migrated/oddrun-time.jpeg",
    imageAlt: "Oddrun Time, administrasjonskoordinator.",
  },
  {
    title: "Siri Otterhjell",
    role: "Transportansvarleg",
    href: "/tilsette",
    mobile: "977 72 856",
    email: "sirott@fresvik.no",
    imageUrl:
      "/assets/fresvik/images/migrated/siri-otterhjell.jpeg",
    imageAlt: "Siri Otterhjell, transportansvarleg.",
  },
  {
    title: "Ragnvald Grov Sørdal",
    role: "Lønnsansvarleg",
    href: "/tilsette",
    mobile: "909 77 331",
    email: "ragsor@fresvik.no",
    imageUrl:
      "/assets/fresvik/images/migrated/ragnvald-grov-srdal.jpeg",
    imageAlt: "Ragnvald Grov Sørdal, lønnsansvarleg.",
  },
  {
    title: "Nils Gunnar Finne",
    role: "Produktutvikling",
    href: "/tilsette",
    mobile: "915 13 117",
    imageUrl:
      "/assets/fresvik/images/migrated/nils-gunnar-finne.jpeg",
    imageAlt: "Nils Gunnar Finne, produktutvikling.",
  },
  {
    title: "Samaneh Shakeri",
    role: "Teknisk sjef",
    href: "/tilsette",
    mobile: "480 98 928",
    email: "samsha@fresvik.no",
    imageUrl:
      "/assets/fresvik/images/migrated/samaneh-shakeri.jpg",
    imageAlt: "Samaneh Shakeri, teknisk sjef.",
  },
];

export const oldSiteLegalDocuments: MigratedListItem[] = [
  {
    title: "Aktsemdvurdering 2024",
    href: "/assets/fresvik/documents/openheitslova-aktsemdvurderingar-2024.pdf",
  },
  {
    title: "Rutine for oppfylling av plikter etter Openheitslova",
    href: "/assets/fresvik/documents/openheitslova-rutine-plikter.pdf",
  },
  {
    title: "Utgreiing 2024",
    href: "/assets/fresvik/documents/openheitslova-utgreiing-2024-signert.pdf",
  },
  {
    title: "Openheitslova på Lovdata",
    href: "https://lovdata.no/dokument/NL/lov/2021-06-18-99",
  },
];

export const oldSiteCompanyFacts: MigratedListItem[] = [
  {
    title: "Norsk produsent",
    href: "/firmainfo",
  },
  {
    title: "Marknadsleiar i daglegvare, energistasjonar og storkioskar",
    href: "/firmainfo",
  },
  {
    title: "Produksjon i Fresvik i Sogn",
    href: "/firmainfo",
  },
  {
    title: "Hovudkontor i Fresvik og salskontor i Drammen",
    href: "/firmainfo",
  },
];

export const oldSiteAssetStats = {
  sitemapUrl: "https://www.fresvik.no/sitemap.xml",
  newsCount: oldSiteNews.length,
  referenceCount: oldSiteReferences.length,
  productCount: oldSiteProducts.length,
  serviceCount: oldSiteServices.length,
  documentCount: oldSiteDocuments.length,
  accessoryCount: oldSiteAccessories.length,
  supportPageCount: oldSiteSupportPages.length,
  faqCount: oldSiteFaqItems.length,
  employeeCount: oldSiteEmployees.length,
  legalDocumentCount: oldSiteLegalDocuments.length,
  imageCountInSitemap: 325,
};

export function getOldSiteInventoryItem(href: string) {
  return [
    ...oldSiteNews,
    ...oldSiteReferences,
    ...oldSiteProducts,
    ...oldSiteServices,
    ...oldSiteDocuments,
    ...oldSiteAccessories,
    ...oldSiteSupportPages,
    ...oldSiteFaqItems,
    ...oldSiteEmployees,
    ...oldSiteLegalDocuments,
    ...oldSiteCompanyFacts,
  ].find((item) => item.href === href);
}
