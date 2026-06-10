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
import { getOldSiteContentExtract } from "@/data/oldSiteContentExtract";

export type ContentCard = {
  title: string;
  text: string;
  href?: string;
  meta?: string;
  imageUrl?: string;
  imageAlt?: string;
};

type Section = {
  title: string;
  intro?: string;
  items: ContentCard[];
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
  showMigrationDetails?: boolean;
  cards: ContentCard[];
  sections: Section[];
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
    text: "Panel for kjøle-, fryse- og industribygg med kjeldetekst bevart frå gammal produktside.",
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
    title: "Frysetunnel",
    text: "Frysetunnelar for rask, jamn og kontrollert innfrysing i krevjande produksjonsmiljø.",
    href: "/produkt/frysetunnel",
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

const homeProductCards: ContentCard[] = [
  {
    title: "Fresvik PIR Panel",
    text:
      "Brannsikre panel med PIR skum. Med smart design og eksenterslås, tilbyr Fresvik Produkt sine nye PIR-Panel. Ein komplett og skreddarsydd løysing for kjøle- og fryserom. Panela kombinerer framifrå branneigenskapar og godkjenning i klasse B-s1, d0 med enkel og rask montering. Desse SINTEF-godkjente PIR-panela gir ei trygg, effektiv og moderne løysing tilpassa dagens krav.",
    href: "/produkt/fresvik-pir-panel",
    imageUrl: "/assets/fresvik/images/old-site/home-pir-fire-illustration.png",
    imageAlt: "Illustrasjon av forskjellen i brannsikkerhet mellom PIR og PUR paneler.",
  },
  {
    title: "Fresvik-panel",
    text:
      "Utvikla og produsert i Norge. SINTEF-godkjent. Fleksibelt på byggeplass. Enkel montasje med eksenterlås. Modulmål gir mindre svinn. Kort design-, produksjons- og leveringstid.",
    href: "/produkt/fresvik-pur-panel",
    imageUrl: "/assets/fresvik/images/old-site/home-fresvik-panel-room.jpg",
    imageAlt: "Et industrilokale med hvite vegger, rada med dører, og takbelysning.",
  },
  {
    title: "Kjøle- og fryseportar",
    text: "Produktteaser frå den gamle framsida for kjøle- og fryseportar.",
    href: "/produkt/kjole-fryseportar",
    imageUrl: "/assets/fresvik/images/old-site/home-kjole-fryseportar.jpg",
    imageAlt: "Bilde av en fryseport produsert av Fresvik Produkt.",
  },
  {
    title: "Kjøle- og frysedører",
    text: "Produktteaser frå den gamle framsida for kjøle- og frysedører.",
    href: "/produkt/kjole-frysedorer",
    imageUrl: "/assets/fresvik/images/old-site/home-kjole-frysedorer.jpg",
    imageAlt: "Bildet viser en åpen fryseport med metallfeste på bunnen.",
  },
  {
    title: "Fasadepanel",
    text: "Produktteaser frå den gamle framsida for fasadepanel.",
    href: "/produkt/fasadepanel",
    imageUrl: "/assets/fresvik/images/old-site/home-fasadepanel.webp",
    imageAlt: "En stor, moderne lagerbygning med flere lastebildeporter utenfor og en klar blå himmel.",
  },
];

const homeCustomerCards: ContentCard[] = [
  {
    title: "Butikk",
    text:
      "Vi er marknadsleiar på kjøle- og fryserom til daglegvarehandel, energistasjonar og storkioskar.",
    href: "/kjolerom-fryserom-butikk",
    imageUrl: "/assets/fresvik/images/old-site/1715599204491-06f69a318b.jpg",
    imageAlt: "Meieriavdelingen i en dagligvarebutikk.",
  },
  {
    title: "Skip/offshore",
    text:
      "Vi er einaste norske produsent av polyuretan sandwich-panel godkjend for maritimt bruk - DIN 4102-B2.",
    href: "/kjolerom-fryserom-offshore",
    imageUrl: "/assets/fresvik/images/old-site/image-asset-2-59c753eb14.jpeg",
    imageAlt: "En stor rød og hvit offshore supply skip seiler i vannet.",
  },
  {
    title: "Storkjøkken/institusjon",
    text:
      "Vi leverer kjøle- fryserom og tilleggsprodukt til storkjøken og institusjonar over heile landet.",
    href: "/kjolerom-fryserom-storkjokken",
    imageUrl: "/assets/fresvik/images/old-site/1733820776326-534d12e99d.jpg",
    imageAlt: "Et tomt rom med hvite vegger, grå gulv og taklys.",
  },
];

const homeNewsCards: ContentCard[] = [
  {
    title: "Møt vår nye tekniske sjef",
    text: "Aktuelt-sak vist på den gamle framsida.",
    href: "/aktuelt/samaneh-shakeri-ny-teknisk-sjef",
    imageUrl: "/assets/fresvik/images/migrated/samaneh-shakeri.jpg",
    imageAlt: "Møt vår nye tekniske sjef",
  },
  {
    title: "Ny teknisk teiknar på plass",
    text:
      "Den nye teiknaren vår har arbeidd på kontoret sidan nyttår og er alt komen godt inn i funksjonen.",
    href: "/aktuelt/ny-teknisk-teiknar-havard-berdal",
    imageUrl: "/assets/fresvik/images/migrated/havard-berdal.jpg",
    imageAlt: "Ny teknisk teiknar på plass",
  },
  {
    title: "John Bøthun blir pensjonist",
    text:
      "Den som i dag har vore lengst tilsett i Fresvik Produkt vil pensjonere seg frå 1. september.",
    href: "/aktuelt/john-bothun-blir-pensjonist",
    imageUrl: "/assets/fresvik/images/migrated/john-bthun-fresvik-produkt.jpg",
    imageAlt: "John Bøthun blir pensjonist",
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
    text: "Oversikt over kontaktpersonar og avdelingar frå gammal Fresvik-side.",
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

const faqTextByTitle: Record<string, string> = {
  "Kva er hovudforskjellen mellom PIR og PUR i kjøle- og fryserom?":
    "Den største forskjellen ligg i branneigenskapane. PIR har generelt betre brannmotstand og lågare røykutvikling enn PUR, samtidig som begge materiala har svært gode isolasjonseigenskapar.",
  "I kva prosjekt bør PIR føretrekkjast framfor PUR?":
    "PIR bør føretrekkjast i prosjekt der brannsikkerheit og risikoreduksjon er særleg viktig, til dømes store kjøle- og fryselager, bygg med strenge brannkrav, industri- og næringsbygg, prosjekt med særlege forsikringskrav og anlegg med høg verdi på lagra varer.",
  "Kvifor har PIR-panel nesten same U-verdi som PUR-panel, men betre branneigenskapar?":
    "PIR og PUR har nesten lik U-verdi, men PIR-skummet har betre branneigenskapar fordi det reagerer med å verne overflata ved brann og har høgare termisk stabilitet. PIR får brannklasse B, medan PUR har klasse C.",
  "Har PIR-panela låsemekanisme i skøytane og hjørna, slik som PUR-panela?":
    "Ja. Fresvik oppgir at PIR- og PUR-panel har same design og same låsemekanisme i skøytane og hjørna.",
  "Kva er PVC-gardin, og når bør ein bruke PVC-gardiner i kjølerom eller fryserom?":
    "PVC-gardiner er fleksible PVC-strimlar i døropningar som reduserer varmetap og trekk når døra blir opna. Dei blir ofte brukt i rom med mykje trafikk for å halde stabil temperatur, redusere energitap og betre arbeidskomfort. Fresvik produserer både faste og skyvbare PVC-gardiner.",
  "Kva er forskjellen på ein kjøleromsdør og ein fryseromsdør?":
    "For vanlege kjøle- og fryseromsdører ligg forskjellen i at fryseromsdøra har varmekabel i karmen. Industridører skil seg også på isolasjon, konstruksjon, tetting og løysingar for låge minusgrader.",
  "Korleis er vekta/densiteten på PIR-panel samanlikna med PUR-panel?":
    "PUR-panel har densitet 40 +/- 2 kg/m3 og vekt om lag 13-17 kg/m2. PIR-panel har densitet 42 +/- 2 kg/m3 og vekt om lag 14-18,5 kg/m2.",
  "Kan PIR-panel brukast ved same temperaturar som PUR-panel?":
    "PIR har temperaturområde frå -40 °C til +70 °C, medan PUR toler -40 °C til +120 °C.",
  "Kan PIR-panela produserast i same storleik som PUR-panela?":
    "Ja. Fresvik tilbyr fleksibel romhøgd i trinn på 50 mm, opptil 8000 mm, og tjukkleikar på 75, 100, 125, 150 og 175 mm.",
  "Kan de produsere dører og portar med PIR-skum?":
    "Ja. Fresvik leverer både dører og portar med PIR-skum, med same design som PUR-produkta.",
  "Kva er kjøleromspanel, og kva tjukkleik bør ein velje til kjøl og fryserom?":
    "Kjøleromspanel er isolerte sandwichpanel til veggar, tak og eventuelt golv i kjøle- og fryserom. For kjølerom på 2-6 °C er 75-100 mm vanleg, medan fryserom frå 0 til -40 °C vanlegvis brukar 100-175 mm avhengig av U-verdi og energikrav.",
  "Kan Fresvik Produkt levere kjøle- og fryserom på spesialmål eller for skreddarsydde prosjekt?":
    "Ja. Fresvik Produkt leverer kjøle- og fryserom tilpassa prosjektet sine behov, med panel og løysingar på spesialmål for eksisterande bygg, produksjonslokale og større eller meir komplekse anlegg.",
};

function inventoryCards(
  items: MigratedListItem[],
  fallbackText: string,
  textByHref: Record<string, string> = {},
): ContentCard[] {
  return items.map((item) => ({
    title: item.title,
    text: textByHref[item.href] || fallbackText,
    href: item.href,
    meta: item.lastmod,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt || item.title,
  }));
}

const faqCards = oldSiteFaqItems.map((item) => ({
  title: item.title,
  text: faqTextByTitle[item.title],
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

const newsTextByHref: Record<string, string> = {
  "/aktuelt/samaneh-shakeri-ny-teknisk-sjef":
    "Samaneh Shakeri tok til som teknisk sjef 1. oktober 2024. Ho er ingeniør med master i industriell teknologi, har utdanning frå UiT og Texas A&M, og har 15 års erfaring frå ingeniørrollar og industriell design.",
  "/aktuelt/ny-teknisk-teiknar-havard-berdal":
    "Håvard Berdal er ny teknisk teiknar etter at John Bøthun pensjonerer seg. Han har arbeidd på kontoret sidan nyttår, kjenner bedrifta frå produksjonen og er alt komen godt inn i funksjonen.",
  "/aktuelt/john-bothun-blir-pensjonist":
    "John Bøthun blir pensjonist etter 42 år i Fresvik Produkt. Artikkelen fortel om starten i produksjonen i 1982, monteringsoppdrag rundt i landet, overgangen til teknisk teikning og mange år med produksjonsplanlegging.",
  "/aktuelt/ein-investering-for-henga-med-i-tidanbsp":
    "Fresvik starta sommaren 2022 arbeidet med å automatisere pakkinga i produksjonen. Roboten og kaos-lageret skal gi betre og tryggare arbeidsplassar, betre produkt for kundane og meir effektiv handtering av element.",
  "/aktuelt/agnar-er-snart-pensjonistnbsp":
    "Agnar Bøtun har 44 år bak seg i Fresvik Produkt og har vore med på utviklinga sidan 1980. Artikkelen fortel om lager, pakking, sending, transport, arbeidsformannrolla og kvifor han held fram litt til før full pensjon.",
  "/aktuelt/to-ledige-stillingar-i-haust":
    "Den gamle artikkelen annonserte ledige stillingar som reinhaldar og produksjonsmedarbeidar hos Fresvik Produkt.",
  "/aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv":
    "Artikkelen løfta Fresvik som ei idyllisk fjordbygd med moglegheiter for arbeid på skule, i barnehage, butikk og hos Fresvik Produkt, med lenke vidare til full artikkel på sogn.no.",
  "/aktuelt/vi-er-blitt-sertifisert-miljofyrtarn":
    "Fresvik Produkt er sertifisert som Miljøfyrtårn. Artikkelen løftar berekraft, grøne verdiar, trygg arbeidsplass, lågt sjukefråvær, redusert energibruk og mindre bruk av papp og plast.",
  "/aktuelt/fryse-og-kjlerom-til-sogn-frukt-og-grnt":
    "Fresvik Produkt hadde gleda av å levere fryse- og kjølerom til Fellespakkeriet på Håbakken i Lærdal, Sogn Frukt og Grønt.",
  "/aktuelt/ledig-stilling-som-produksjonsmedarbeidar":
    "Den gamle artikkelen annonserte ledig stilling som produksjonsmedarbeidar hos Fresvik Produkt, med opplæring oppgitt som del av stillinga.",
  "/aktuelt/jul-2020":
    "Fresvik Produkt ønskte kundar og samarbeidspartnarar god jul og godt nytt år, informerte om stengd fabrikk i romjula og opne salskontordagar 28.-30. desember, med direkte mobilnummer til Lars, Dag og Arne-Olav.",
  "/aktuelt/arne-olav-ny-salskonsulent":
    "Arne-Olav Lien Bardølsgård starta som ny salskonsulent 1. mai. Han kjem frå Saksumdal, har bakgrunn som tømrar og bonde, og flytta til Fresvik med familien.",
  "/aktuelt/fresvik-kjolerom-til-fruktbonde":
    "Fresvik Produkt leverte og monterte kjølerom til bær- og fruktprodusent Ivar Slinde på Indre Slinde i Sogndal. Prosjektet inkluderte panel, kjøledør og spesialtilpassa køyrerampe.",
  "/aktuelt/40-aars-jubileum":
    "Fresvik Produkt markerte 40 år sidan første produksjon av sandwich-panel med ope hus, omvising i fabrikken, kaffi og jubileumskake. Artikkelen omtalar jubileumsdagen og historia frå oppstarten.",
  "/aktuelt/innfesting-mot-golv":
    "Artikkelen forklarer Fresvik si skjulte innfesting mot golv og sokkel med firkantrøyr. Løysinga gir færre kantar der smuss kan feste seg og er særleg relevant for næringsmiddelindustrien.",
  "/aktuelt/gladhistorie-fresvik-kjole-fryserom":
    "Ein person vart stengd inne i eit kjølerom, men fekk hjelp då han fann telefonnummeret til Fresvik Produkt på døra. Fresvik fekk tak i folk på senteret og hjelpte til med å løyse situasjonen.",
  "/aktuelt/tomas-kruvellis-vaar-nye-mann":
    "Tomas Kruvelis tok over fleire innkjøps- og delesalsoppgåver då Ronny Bjørneklett skulle trekkje seg tilbake. Tomas hadde vore tilsett sidan 2012 og hadde allereie kontakt med mange kundar.",
  "/aktuelt/fasadeprosjekt-for-celsa-steel-service-sotra":
    "Fresvik Produkt omtala ein leveranse av 1600 m2 fasadepanel til Brødrene Ulveseth sitt prosjekt for Celsa Steel Service på Sotra.",
  "/aktuelt/fresvik-hengsel":
    "Fresvik Produkt lanserte eigenutvikla sjølvlukkande Fresvik hengsel for kjøle- og frysedører. Hengsla skal redusere kuldetap, vere slitesterke, krevje mindre vedlikehald og halde døra open ved stor vinkel.",
  "/aktuelt/montasje-prosjekt":
    "Fresvik kan ta ansvar for heile pakken med produksjon, levering og montasje. Artikkelen nemner montasjeprosjekt hos Fatland slakteri, Helgesen Tekniske Bygg og Gjeraldstveit Mekaniske.",
  "/aktuelt/skjererom":
    "Fresvik Produkt bygde eit nytt skjererom for å isolere støyande panelskjering frå produksjonslokala. Rommet skulle gi betre arbeidsmiljø, mindre støy og betre ergonomi med løftebord og vakuumløftar.",
  "/aktuelt/orklafoods-stranda":
    "Fresvik Produkt leverte deleveggar, dører, portar, 1150 m2 mineralullspanel og 60 m2 EI60-brannvegg til nytt lefsebakeri for Orkla Foods på Stranda, som underleverandør i eit hektisk prosjekt.",
  "/aktuelt/nye-monteringsanvisningar":
    "Fresvik forklarte at panel og rom er enkle å montere og at mange kundar monterer sjølve. Nye monteringsanvisningar på norsk og engelsk for kjølerom og fryserom vart lagde ut for nedlasting.",
  "/aktuelt/fasade-element-og-takplater-ruukki":
    "Fresvik Produkt leverte og monterte 930 m2 fasadeelement med mineralullisolasjon og 1390 m2 Ruukki takplater til ny Spar-butikk på Forland i Sund kommune.",
  "/aktuelt/portproduksjon":
    "Artikkelen omtalar vekst i Fresvik si produksjon av skreddarsydde skyveportar, inkludert portblad i Foodsafe-overflate, rustfritt eller syrefast stål, fryseport med terskel og varmekabel, gangdører og autoportar.",
};

const referenceTextByHref: Record<string, string> = {
  "/referansar/2014/7/8/coop-extra-sogndal":
    "Fresvik Produkt leverte og monterte kjøle- og fryserom til heile Coop Extra Sogndal-butikken, totalt om lag 800 m2 panel.",
  "/referansar/2014/7/8/interfrukt-vrt-strste-prosjekt":
    "På Langhus i Ski kommune bygde Anthon B. Nilsen nytt grossistlager for Interfrukt SA. Fresvik Produkt vart valt som leverandør av frys- og kjøleveggar, med ei leveranse på heile 16 500 m2 kjøle- og frysepanelar.",
  "/referansar/fryserom-baza-fredrikstad":
    "Fresvik Produkt leverte eit skreddarsydd fryserom til Baza Nordic i Fredrikstad, utvikla for effektiv og driftssikker lagring av frosne varer. Løysinga gir auka kapasitet, betre logistikkflyt og stabile lagringsforhold året rundt.",
  "/referansar/historisk-leveranse-pir-panel-spar-lund-torv":
    "Spar Lund Torv fekk nytt fryserom, tre nye kjølerom og deleveggar i det første PIR-prosjektet produsert i Norge. Leveransen inkluderte også innestengingsalarm, PVC-gardin og pendeldører frå Kvanne Industrier.",
  "/referansar/bjerkreim-legekontor-vikesaa":
    "Fresvik Produkt leverte fryselager, kjølerom og dører til Bjerkreim Legekontor i Vikeså. Prosjektet var knytt til omsorgsbustadar med 46 leilegheiter, ferdigstilt i juni 2025.",
  "/referansar/bunnpris-hammerfest":
    "Bunnpris Hammerfest fekk fryserom og kjølerom til meierivarer. Fresvik leverte også innestengningsalarm, frysedør og PVC-gardin til fryserommet.",
  "/referansar/kjolerom-kjoledor-bunnpris-volda":
    "Fresvik Produkt leverte nytt kjølerom med kjøledør til Bunnpris Volda. Produkta er levert med standard FoodSafe Polyester-overflater for enkelt reinhald og redusert bakterievekst.",
  "/referansar/fryserom-coop-obs-alnabru":
    "Fresvik Produkt leverte eit nytt stort fryserom til Coop Obs Alnabru. Leveransen inkluderte også fryseport, PVC-gardin og innestengningsalarm, i samarbeid med Coolteam.",
  "/referansar/vik-helse-og-omsorgssenter":
    "Til nye Vik helse- og omsorgssenter har Fresvik hittil levert fem kjølerom og eitt fryserom med tilhøyrande dørar, gjennom Sogn Kjøleservice.",
  "/referansar/fryse-og-kjolerom-kiwi-otta":
    "Fresvik Produkt leverte fryserom med frysedør, innestengningsalarm og PVC-gardin, samt fire kjølerom med eigne dører og pendeldører frå Kvanne Industrier til Kiwi Otta.",
  "/referansar/nye-leveransar-til-rema-1000-ya-i-larvik":
    "Rema 1000 Øya i Larvik fekk nye kjøle- og fryserom frå Fresvik Produkt. Leveransen inkluderte fryserom, kjølerom, dører, innestengingsalarm, PVC-gardin og køyrerampe.",
  "/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark":
    "Fresvik Produkt leverte fryserom, fem kjølerom, innestengingsalarm, PVC-gardin og sju dører til Dyreparken Safaricamp i Kristiansand Dyrepark. Dørene vart levert med sjølvlukkande Fresvik Hengsler.",
  "/referansar/spesialloysing-torkerom-drageboden-kaupanger":
    "Drageboden på Kaupanger fekk skreddarsydde panel frå Fresvik Produkt til to tørkerom for trevirke. Romma fekk rustfri overflate på innsida på grunn av høg varme, og laus vegg slik at pallar kan køyrast inn.",
  "/referansar/omfattande-leveranse-til-bakehuset-trondheim":
    "Bakehuset Trondheim fekk ei omfattande leveranse via Carrier Refrigeration Norway. Fresvik produserte over 1250 m2 panel, fryserom, kjølerom, tre fryseportar med PVC-gardiner og fem pendeldører frå Kvanne Industrier.",
  "/referansar/fryseromsportar-til-rema-1000-i-narvik":
    "Rema 1000 i Narvik fekk tre store fryseromsportar og fem fryseromsdører levert via Relog AS. Portane er skreddarsydde ved Fresvik-fabrikken og valt på grunnlag av anbefaling og pris.",
  "/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront":
    "Fresvik leverte 3 700 m2 panel i tjukkelsar frå 75 til 175 mm til Fellespakkeriet på Håbakken i Lærdal, Sogn Frukt og Grønt. Leveransen gjekk til 3 fryserom og 10 kjølerom, med 11 spesialportar frå Salco.",
  "/referansar/fryserom-fryseport-rentokil":
    "Fresvik leverte og monterte fryserom for Kelvin AS til Rentokil på Lahaugmoen i Skjetten. Rommet blir brukt til nedfrysing av møblar og tekstilar infisert av skadedyr, og leveransen inkluderte fryseport og spesialbygd rampe.",
  "/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar":
    "Fresvik leverte fire kjølerom og eitt fryserom, om lag 300 m2, til Kiwi Skollenborg ved Kongsberg gjennom Carrier Refrigeration Norway. Prosjektet var del av ein meir miljøvennleg butikk med redusert CO2-fotavtrykk.",
  "/referansar/karlsoybruket":
    "Fresvik Produkt leverte og monterte delar av eit større anlegg til Karlsøybruket, med veggar til sluser, kjølerom og produksjonskontor, kjøleport og glassfiberdører. Vidare arbeid omfatta fasadepanel til nytt bygg.",
  "/referansar/fiskehallen":
    "Fresvik Produkt har levert mykje til Fiskehallen over tid. I denne leveransen til Sjømat AS inngjekk takflate, veggar og portar, montert med AKS Montering som føretrekt montør.",
  "/referansar/celsa-steel-sotra":
    "Fresvik leverte og monterte 2600 m2 fasadepanel med mineralull-kjerne, beslag og 16 vindauge til Celsa Steel Service sitt nye produksjonsanlegg på Straume/Sotra, med Brødrene Ulveseth som hovudentreprenør.",
  "/referansar/buskerud-storcash":
    "Buskerud Storcash i Kobbervikdalen i Drammen fekk 1650 m2 Fresvik-panel, sju kjøle- og frysedører og ein fryseport til eit nytt og energieffektivt stormarknadsbygg.",
  "/referansar/bjerke-spekemat":
    "Bjerke Spekemat og Delikatesser AS investerte i nytt produksjonslokale, der Fresvik installerte typiske næringsmiddelløysingar. Monteringa vart gjennomført av AKS Montering.",
  "/referansar/restauranthuset-malin":
    "Fresvik Produkt leverte kjøle- og fryserom, veggar til grovkjøkken og oppvask til Restauranthuset Malin i Sogndal Kulturhus. Prosjektet vart levert ferdig montert på få veker.",
  "/referansar/fryserom-med-fryseport-til-coop-extra-naustdal":
    "Coop Extra Naustdal fekk kjøle- og fryserom, fryseport og fleire kjølerom frå Fresvik Produkt gjennom samarbeidspartnar. Leveransen var skreddartilpassa mål og skråtak, og montert av AKS Montering.",
};

const newsCards = inventoryCards(
  oldSiteNews,
  "Nyheit registrert frå gammal sitemap med kjeldeside bevart for migrering.",
  newsTextByHref,
);

const referenceCards = inventoryCards(
  oldSiteReferences,
  "Referanse registrert frå gammal sitemap med kjeldeside bevart for migrering.",
  referenceTextByHref,
);

const oldProductCards = inventoryCards(
  oldSiteProducts,
  "Produkt registrert frå gammal sitemap med kjeldetekst, tekniske data og dokument bevart.",
);

const oldServiceCards = inventoryCards(
  oldSiteServices,
  "Teneste registrert frå gammal sitemap med kjeldetekst, prosess og lenker bevart.",
);

const oldDocumentCards = inventoryCards(
  oldSiteDocuments,
  "Dokumentasjonsside registrert frå gammal sitemap med PDF-ar og eksterne dokument bevart.",
);

const accessoryTextByHref: Record<string, string> = {
  "/tilleggsutstyr":
    "Oversikt over tilleggsutstyr og reservedelar som kan følgje kjøle- og fryserom frå Fresvik, inkludert handtak, ventilar, alarmar, PVC-gardiner, ramper, beslag og ulike dørtypar.",
  "/andre-produkter/standard-handtak":
    "Standard håndtak blir levert på utsida av døra, og kan også monterast på innsida.",
  "/andre-produkter/elebar-ventil":
    "Elebar ventil passar til mindre fryserom og blir brukt for å hindre vakuum i fryserom.",
  "/andre-produkter/maxielebar-ventil":
    "MaxiElebar ventil passar til større fryserom og blir brukt for å hindre vakuum.",
  "/andre-produkter/pego-innestengningsalarm":
    "PEGO innestengningsalarm har nødalarmknapp for naudstilfelle inne i fryserom. Fresvik tek automatisk med alarm i tilbod ved førespurnad på fryserom, med mindre noko anna er spesifisert.",
  "/andre-produkter/pvc-gardiner":
    "PVC-gardiner reduserer kuldetap når porten står open ved hyppig trafikk. Dei kan også nyttast til inndeling av mindre rom og innkleding av maskiner og utstyr.",
  "/andre-produkter/diktator-dortiltrekker":
    "Dørtiltrekker kan vere nødvendig å montere i nokre tilfelle, og kan også ettermonterast.",
  "/andre-produkter/kjlerampe":
    "Fresvik Produkt produserer køyreramper i aluminium både til kjøl og fryserom.",
  "/andre-produkter/beslag":
    "Fresvik sender nødvendige beslag saman med panela. Beslaga blir produserte av same stål som panela, og blir tilpassa for tett og pen montasje.",
  "/andre-produkter/2014/7/9/standard-drer":
    "Standard kjøle- og fryseromsdør for mindre og mellomstore rom. Blir også brukt til inspeksjonsluker og nødutgangsluker i større anlegg.",
  "/andre-produkter/2014/7/9/skipsdrer":
    "Slagdør spesielt utvikla for kjøle- og fryserom om bord i skip. Døra blir produsert etter kundemål, med kraftige hengsler, nødåpner, utskiftbar pakning og karm som kan monterast på stålskott, trevegg eller isolasjonspanel.",
  "/andre-produkter/2014/7/9/industri-slagdor":
    "Større slagdør for kjøle- eller fryserom i industrimiljø som slakteri, meieri og engroslager. Løysinga kan leverast for kjøl eller frys, med solide hengsler, dobbel pakning og måltilpassa dørblad.",
};

const accessoryDetailCards = oldSiteAccessories.map((item) => ({
  title: item.title,
  text:
    accessoryTextByHref[item.href] ||
    "Denne tilbehørssida er funnen i gammal sitemap. Brødtekst må hentast i ein seinare migreringspass.",
  href: item.href,
  meta: item.lastmod,
  imageUrl: item.imageUrl,
  imageAlt: item.imageAlt || item.title,
}));

const accessoryOrderCards: ContentCard[] = [
  {
    title: "Dørtiltrekker / Diktator",
    text: "Artikkelnr 23001",
  },
  {
    title: "Innestengningsalarm",
    text: "Artikkelnr 3069",
  },
  {
    title: "Selvlukkende hengsel",
    text: "Artikkelnr 24600",
  },
  {
    title: "Trykkavlastarventil Elbar",
    text: "Artikkelnr 30651",
  },
  {
    title: "Trykkavlastarventil Maxi Elbar",
    text: "Artikkelnr 30652",
  },
  {
    title: "Automatisk kompositt-lås rustfri",
    text: "Artikkelnr 24083",
  },
  {
    title: "Brannklassifisert fugemasse Sikasil-670",
    text: "Artikkelnr 3004",
  },
  {
    title: "Nøytralherdende sanitær byggsilikon fugemasse",
    text: "Artikkelnr 3000",
  },
  {
    title: "Soudal fugeskum all season premium",
    text: "Artikkelnr 3021",
  },
  {
    title: "PU-skum Sika Boom-420 Fire",
    text: "Artikkelnr 3006",
  },
  {
    title: "Flexibelt glasfiber overflate",
    text: "Artikkelnr 10261",
  },
  {
    title: "Plywood dørkplate med belegg",
    text: "Artikkelnr 1103",
  },
  {
    title: "Intertecnica hengsel 2640",
    text: "Artikkelnr 10409",
  },
];

const supportTextByHref: Record<string, string> = {
  "/kjolerom-fryserom-butikk":
    "Fresvik Produkt er marknadsleiar på kjøle- og fryserom til daglegvarehandel, bensinstasjonar og storkioskar, og leverer gjerne totalpakke med panel, portar, glassfrontar, hylleinnreiing, beslag, ventilar, festemateriell og montasje gjennom samarbeidande montasjeselskap.",
  "/kjolerom-fryserom-offshore":
    "Fresvik har lang erfaring med proviantrom til skip og offshore. Romma blir tilpassa frå modular, og Fresvik PIR-panel er godkjende for maritim bruk med klasse B-s1,d0 etter EN ISO 11925-2:2020 og EN 13823+A1:2022.",
  "/kjolerom-fryserom-storkjokken":
    "Fresvik leverer tilpassa kjøle- og fryserom til storkjøkken, restaurant og institusjon. Modulbaserte rom kan tilpassast ulike lokale, med slette overflater og tette fuger for enkel reingjering.",
  "/transportskade":
    "Ved transportskade anbefaler Fresvik at folk er til stades ved mottak og sjekkar leveransen. Eventuelle skadar må førast på fraktbrev før signering og rapporterast til Fresvik omgåande med bilete.",
  "/send-foresporsel":
    "Gammal førespørsels-URL er registrert i sitemap og bør før lansering vurderast som redirect til `/kontakt` eller eit Sanity-styrt skjema.",
};

const supportDetailCards = oldSiteSupportPages.map((item) => ({
  title: item.title,
  text:
    supportTextByHref[item.href] ||
    "Support- eller kundesegment-side funnen i gammal sitemap. Brødtekst skal kvalitetssikrast før endeleg lansering.",
  href: item.href,
  meta: item.lastmod,
  imageUrl: item.imageUrl,
  imageAlt: item.imageAlt || item.title,
}));

const customerSegmentCards = supportDetailCards.filter((item) =>
  item.href?.startsWith("/kjolerom-fryserom"),
);

const transportDamageCards: ContentCard[] = [
  {
    title: "Kontroller leveransen ved mottak",
    text:
      "Fresvik anbefaler å ha folk til stades ved mottak som sjekkar leveransen.",
  },
  {
    title: "Før skade på fraktbrev",
    text:
      "Eventuelle skadar må førast på fraktbrev før signering.",
  },
  {
    title: "Rapporter omgåande",
    text:
      "Skaden skal rapporterast til post@fresvik.no omgåande, med bilete.",
  },
  {
    title: "Frist på 6 dagar",
    text:
      "Skaderapportering må Fresvik ha innan 6 dagar fordi transportør har kort innrapporteringsfrist.",
  },
];

const butikkSections: Section[] = [
  {
    title: "Daglegvare, drivstoffstasjon og storkiosk",
    intro:
      "Frosne og nedkjølte varer utgjer ein stadig større del av dagleg handel. Den gamle sida løftar fram behovet for tilstrekkelege installasjonar for presentasjon, lagring og behandling av denne varegruppa.",
    items: [
      {
        title: "Totalpakke",
        text:
          "Fresvik leverer gjerne totalpakke med kjøle- og frysepanel, portar, glassfrontar, hylleinnreiing, beslag, ventilar og festemateriell.",
      },
      {
        title: "Montasje",
        text:
          "Montasje kan leverast gjennom samarbeidande montasjeselskap.",
      },
      {
        title: "Tilberedning og delikatesse",
        text:
          "Fresvik-panel blir også brukt til veggar og himlingar i tilberedningsrom og delikatesseavdelingar.",
      },
    ],
  },
];

const offshoreSections: Section[] = [
  {
    title: "Skip og offshore",
    intro:
      "Fresvik har lang erfaring med leveransar av proviantrom til skip og offshore, der tilpassa rom og modular er ein nøkkelfaktor.",
    items: [
      {
        title: "Tilpassa rom basert på modular",
        text:
          "Produktspekteret er basert på modular, med eit fleksibelt system for å gi gode løysingar for kunden.",
      },
      {
        title: "Maritim godkjenning",
        text:
          "Fresvik oppgir å vere den einaste norske produsenten som leverer PIR-panel godkjende for maritim bruk.",
      },
      {
        title: "Brannklasse",
        text:
          "Fresvik PIR-panel tilfredsstiller krava til klasse B-s1,d0 etter EN ISO 11925-2:2020 og EN 13823+A1:2022, samt øvrige spesifikasjonar etter NS-EN 14509:2013.",
      },
    ],
  },
];

const storkjokkenSections: Section[] = [
  {
    title: "Storkjøkken, restaurant og institusjon",
    intro:
      "Fresvik har lang erfaring med kjøle- og fryserom til storkjøkken og institusjon, der tilpassa rom ofte er avgjerande.",
    items: [
      {
        title: "Modulbaserte rom",
        text:
          "Kjøle- og fryseromma er basert på modular og kan tilpassast ulike lokale.",
      },
      {
        title: "Overflater",
        text:
          "Overflatene kan vere FoodSafe polyesterlakk, syrefast, rustfritt eller glassfiber.",
      },
      {
        title: "Reingjering",
        text:
          "Slette flater og tette fuger gir enkel reingjering av element.",
      },
    ],
  },
];

const transportDamageSections: Section[] = [
  {
    title: "Slik gjer du ved transportskade",
    intro:
      "Dette er prosedyretekst frå gammal transportskade-side. Den bør kvalitetssikrast juridisk mot leveringsvilkår før endeleg lansering.",
    items: transportDamageCards,
  },
];

const pirDocuments: ContentCard[] = [
  {
    title: "PIR-Paneler produktblad",
    text:
      "Produktblad frå gammal PIR-side. Gammal URL: https://www.fresvik.no/s/PIR.pdf.",
    href: "/assets/fresvik/documents/pir-panel.pdf",
  },
  {
    title: "PIR-ProduktbladFP.pdf",
    text:
      "Ekstra produktbladlenke funnen på gammal PIR-side. Gammal URL: https://www.fresvik.no/s/PIR-ProduktbladFP.pdf. Lokal fil peikar til same migrerte produktblad.",
    href: "/assets/fresvik/documents/pir-panel.pdf",
  },
  {
    title: "PIR-Paneler montasjeanvisning",
    text:
      "Montasjeanvisning funne på gammal PIR-side. Gammal URL: https://www.fresvik.no/s/FP-PIR-Paneler_Montasjeanvisning-nov-2025.pdf.",
    href: "/assets/fresvik/documents/fp-pir-paneler-montasjeanvisning-nov-2025.pdf",
  },
  {
    title: "PIR-Paneler montasjeanvisning (legacy duplicate)",
    text:
      "Duplikat i lokal migration cache av same montasjeanvisning. Behalde for sporbarheit fram til Sanity asset-verifisering er ferdig.",
    href: "/assets/fresvik/documents/pir-panel-montasjeanvisning.pdf",
  },
  {
    title: "Sentral Godkjenning Fresvik Produkt",
    text:
      "Dokumentlenke frå gammal PIR-side. Gammal URL: https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf.",
    href: "/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf",
  },
  {
    title: "PUR-ce-merke.pdf",
    text:
      "CE-dokumentlenke vist i botn av gammal PIR-side. Gammal URL: https://www.fresvik.no/s/PUR-ce-merke.pdf.",
    href: "/assets/fresvik/documents/pur-ce-merke.pdf",
  },
];

const purDocuments: ContentCard[] = [
  {
    title: "Last ned produktblad",
    text:
      "Produktblad frå gammal PUR-side. Gammal URL: https://www.fresvik.no/s/PUR-ProduktbladFP.pdf.",
    href: "/assets/fresvik/documents/pur-produktbladfp.pdf",
    imageUrl: "/assets/fresvik/images/old-site/file-f5f844b125.png",
    imageAlt: "Last ned produktblad",
  },
  {
    title: "Produktblad-ikon frå gammal side",
    text:
      "Bildeelement frå gammal PUR-side i området ved produktblad-nedlasting.",
    imageUrl: "/assets/fresvik/images/old-site/pur-video-file.png",
    imageAlt: "Produktblad-ikon frå gammal PUR-side",
  },
  {
    title: "Sentral Godkjenning Fresvik Produkt",
    text:
      "Dokumentlenke frå gammal PUR-side. Gammal URL: https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf.",
    href: "/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf",
  },
  {
    title: "PUR-ce-merke.pdf",
    text:
      "CE-dokumentlenke vist i botn av gammal PUR-side. Gammal URL: https://www.fresvik.no/s/PUR-ce-merke.pdf.",
    href: "/assets/fresvik/documents/pur-ce-merke.pdf",
  },
];

const portDocuments: ContentCard[] = [
  {
    title: "Produktblad Fresvik Skyveport",
    text:
      "Produktblad for skyveport frå gammal portside. Gammal URL: https://www.fresvik.no/s/Produktblad-Fresvik-Skyveport.pdf.",
    href: "/assets/fresvik/documents/produktblad-fresvik-skyveport.pdf",
    imageUrl: "/assets/fresvik/images/old-site/file-f5f844b125.png",
    imageAlt: "Last ned produktblad",
  },
  {
    title: "Monteringsanvisning manuell port",
    text:
      "PDF for manuell portmontasje frå gammal portside. Gammal URL: https://www.fresvik.no/s/Fresvik-Port-Montasjeanvisning.pdf.",
    href: "/assets/fresvik/documents/fresvik-port-montasjeanvisning.pdf",
    imageUrl: "/assets/fresvik/images/old-site/file-f5f844b125.png",
    imageAlt: "Monteringsanvisning manuell port",
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
    href: "/assets/fresvik/documents/miljodokument-fresvik-produkt.pdf",
  },
  {
    title: "Fresvik PIR-Panel CPR",
    text: "CPR-dokument for Fresvik PIR-Panel.",
    href: "/assets/fresvik/documents/sintef-teknisk-godkjenning.pdf",
  },
  {
    title: "Teknisk godkjenning",
    text: "Teknisk godkjenning frå gammal dokumentasjonsside.",
    href: "/assets/fresvik/documents/sintef-produktsertifikat.pdf",
  },
  {
    title: "Godkjenningsdokument hjå SINTEF",
    text: "Ekstern SINTEF Certification-side.",
    href: "https://sintefcertification.no/Product/Index/129",
  },
  {
    title: "Leveringsbetingelser",
    text: "Leveringsvilkår for Fresvik Produkt.",
    href: "/assets/fresvik/documents/leveringsvilkar-fresvik-produkt-2023.pdf",
  },
  {
    title: "Sentral godkjenning",
    text: "Sentral godkjenning frå gammal dokumentasjonsside.",
    href: "/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf",
  },
  {
    title: "Ytelseserklæring",
    text: "Ytelseserklæring for Fresvik Produkt.",
    href: "/assets/fresvik/documents/ytelseserklaring-fresvik-produkt.pdf",
  },
];

const mountingDownloads: ContentCard[] = [
  {
    title: "Fryserom, Norsk/English",
    text: "Monteringsanvisning for fryserom.",
    href: "/assets/fresvik/documents/fresvik-fryserom-montasjeanvisning.pdf",
  },
  {
    title: "Manuell port",
    text: "Monteringsanvisning for manuell port.",
    href: "/assets/fresvik/documents/fresvik-port-montasjeanvisning.pdf",
  },
  {
    title: "Kjølerom, Norsk/English",
    text: "Monteringsanvisning for kjølerom.",
    href: "/assets/fresvik/documents/fresvik-kjolerom-montasjeanvisning.pdf",
  },
  {
    title: "Dør",
    text: "Monteringsanvisning for dør.",
    href: "/assets/fresvik/documents/fresvik-dor-montasjeanvisning.pdf",
  },
];

const electricSkyveportDownloads: ContentCard[] = [
  {
    title: "Koblingskjema Fermod 5010",
    text: "Koblingsskjema for elektrisk styring av Fresvik Skyveport.",
    href: "/assets/fresvik/documents/koblingsskjema-fermod-5010.pdf",
  },
  {
    title: "Montasjeanvisning 5010 for 2150",
    text: "Montasjeanvisning for Fermod 5010 på manuelt beslag 2150.",
    href: "/assets/fresvik/documents/montasjeanvisning-5010-for-2150.pdf",
  },
  {
    title: "Montasjeanvisning 5010 for 3530 og 7530",
    text: "Montasjeanvisning for Fermod 5010 på manuelt beslag 3530 og 7530.",
    href: "/assets/fresvik/documents/montasjeanvisning-5010-for-3530-og-7530.pdf",
  },
  {
    title: "Quick Start 5010Exp",
    text: "Quick Start-dokument for 5010Exp.",
    href: "/assets/fresvik/documents/quick-start-5010exp.pdf",
  },
  {
    title: "Endre skyveretning",
    text: "Rettleiing for å endre skyveretning.",
    href: "/assets/fresvik/documents/endre-skyveretning.pdf",
  },
  {
    title: "Tilleggsutstyr NMOptions kits 5010Exp",
    text: "Tilleggsutstyrsdokument for 5010Exp.",
    href: "/assets/fresvik/documents/tilleggsutstyr-nmoptions-kits5010exp.pdf",
  },
];

const pirSections = [
  {
    title: "Full tekst frå gammal side",
    intro:
      "Kjeldetekst henta manuelt frå https://www.fresvik.no/produkt/fresvik-pir-panel 2026-06-10.",
    items: [
      {
        title: "Fresvik PIR-Panel til kjøle- og fryserom",
        text:
          "Fresvik Produkt har produsert kjøle- og fryserom sidan 1980, og er i dag den einaste norske produsenten av isolasjonspanel til kjøle- og fryserom.\n\nFresvik kjøle- og fryserom blir levert med veggar, golv, tak og dørar eller portar. Vår storleik, kombinert med ei bevisst satsing på fleksible produksjonsløysingar, set oss i stand til å levere kundetilpassa løysingar.\n\nFresvik PIR-Panel er eit sandwichelement med oppskumma PIR-skum (Polyisocyanurat-skum) som kjerne, innkapsla mellom to stålplater.",
        imageUrl: "/assets/fresvik/images/old-site/notfjaer1-65fa348e3a.jpg",
        imageAlt: "Fresvik PIR-Panel til kjøle- og fryserom",
      },
    ],
  },
  {
    title: "Produktfordelar frå gammal side",
    intro:
      "Fordelane er henta frå gammal PIR-side utan omskriving.",
    items: [
      {
        title: "Utvikla og produsert i Norge",
        text: "Utvikla og produsert i Norge.",
      },
      {
        title: "SINTEF-godkjent",
        text: "SINTEF-godkjent.",
      },
      {
        title: "Fleksibelt på byggeplass",
        text: "Fleksibelt på byggeplass.",
      },
      {
        title: "Enkel montasje med eksenterlås",
        text: "Enkel montasje med eksenterlås.",
      },
      {
        title: "Modulmål gir mindre svinn",
        text: "Modulmål gir mindre svinn.",
      },
      {
        title: "Kort design-, produksjons- og leveringstid",
        text: "Kort design-, produksjons- og leveringstid.",
      },
    ],
  },
  {
    title: "Den første norske produsenten av",
    intro: "tilpassa PIR-Panel med enkel eksenterlås",
    items: [
      {
        title: "PIR-Panel",
        text:
          "Den første norske produsenten av tilpassa PIR-Panel med enkel eksenterlås.",
        imageUrl: "/assets/fresvik/images/old-site/logo-orginal-ce990b3ca3.png",
        imageAlt: "PIR-Panel B-s1,d0",
      },
    ],
  },
  {
    title: "Tekniske data",
    items: [
      {
        title: "Høgtrykkskum av PIR (polyisocyanurat)",
        text:
          "Brannklasse: B-s1, d0\n\nTykkelse: 75, 100, 125, 150 og 175 mm\n\nDensitet: 43 (+/-3) kg/m3\n\nVekt (ca.): 14 - 18.5 kg/m2\n\nU-verdi/termisk transmittans: 0.14 - 0.29 W/(m²K)\n\nTemperatur: -40°C til +70°C\n\nFleksibel romhøgde (trinn på 50 mm, opptil 8000 mm)\n\nFleksibel modulbredde (trinn på 300 mm)",
      },
      {
        title: "Konstruksjon",
        text:
          "Fresvik-panel er basert på eit fleksibelt modulsystem med eksenterlås i overgangane. Panela har ei hygienisk overflate.",
        imageUrl: "/assets/fresvik/images/old-site/notfjaer1-65fa348e3a.jpg",
        imageAlt: "Konstruksjon av Fresvik PIR-Panel",
      },
      {
        title: "Isolasjon",
        text:
          "Høytrykkskumma polyuretan, ca. 40-45 kg/m3. Tilfredsstiller gjeldande miljøkrav.",
        imageUrl: "/assets/fresvik/images/old-site/image-asset-4-8d1e9d773c.jpeg",
        imageAlt: "Isolasjon i Fresvik PIR-Panel",
      },
      {
        title: "Overflate",
        text:
          "Standard overflate i 0,55 mm galvanisert stålplate med 25 µm polyester, type FoodSafe.\n\nOverflate kan leverast i rustfritt stål, syrefast stål, glassfiber-armert polyester eller andre platetypar.",
        imageUrl: "/assets/fresvik/images/old-site/aaa-e82ae393b0.jpg",
        imageAlt: "Overflate på Fresvik PIR-Panel",
      },
    ],
  },
  {
    title: "Dokument",
    items: pirDocuments,
  },
  {
    title: "Tilleggsutstyr frå gammal side",
    intro:
      "Gammal PIR-side lenka vidare til desse produkta under innhaldssida.",
    items: [
      {
        title: "Elebar ventil",
        text: "Lenke frå gammal PIR-side.",
        href: "/andre-produkter/elebar-ventil",
        imageUrl: "/assets/fresvik/images/migrated/elebar-ventil-inne-web.jpg",
        imageAlt: "Elebar ventil",
      },
      {
        title: "MaxiElebar ventil",
        text: "Lenke frå gammal PIR-side.",
        href: "/andre-produkter/maxielebar-ventil",
        imageUrl: "/assets/fresvik/images/migrated/maxielebar-ventil-inne-web.jpg",
        imageAlt: "MaxiElebar ventil",
      },
      {
        title: "PEGO innestengningsalarm",
        text: "Lenke frå gammal PIR-side.",
        href: "/andre-produkter/pego-innestengningsalarm",
        imageUrl: "/assets/fresvik/images/migrated/pego-innestengningsalarm-web.jpg",
        imageAlt: "PEGO innestengningsalarm",
      },
      {
        title: "Beslag",
        text: "Lenke frå gammal PIR-side.",
        href: "/andre-produkter/beslag",
        imageUrl: "/assets/fresvik/images/old-site/file-f5f844b125.png",
        imageAlt: "Beslag",
      },
    ],
  },
  {
    title: "For samarbeidspartnarar",
    intro:
      "Vår visjon er å vere den beste samarbeidspartnaren for deg som kjøleentreprenør. Ønskjer du meir informasjon om produkta våre, ta gjerne kontakt med oss.",
    items: [
      {
        title: "Har du eit prosjekt du vil diskutere med oss?",
        text: "Ta kontakt.",
        href: "/kontakt",
      },
    ],
  },
  {
    title: "Kontaktinformasjon frå gammal side",
    intro:
      "Kontaktblokkane under låg synleg på den gamle PIR-sida.",
    items: [
      {
        title: "Fresvik Produkt AS",
        text:
          "Fresvikvegen 995,\n6896 Fresvik\nTel: 57 69 83 00\nE-post: post@fresvik.no",
      },
      {
        title: "Salsavdeling Fresvik",
        text:
          "Arne-Olav Lien Bardølsgård\nMob: 99 55 25 49\narnbar@fresvik.no",
      },
      {
        title: "Salsavdeling Drammen",
        text:
          "Lars Erling Livrud\nMob: 40 47 79 12\nlarliv@fresvik.no",
      },
      {
        title: "Frode Winther",
        text: "Frode Winther\nMob: 91 38 39 49\nfrowin@fresvik.no",
      },
    ],
  },
  {
    title: "Sertifikat- og botnlenker frå gammal side",
    intro:
      "Lenker og merke som låg i botnområdet på gammal PIR-side.",
    items: [
      {
        title: "Sentral godkjenning",
        text: "Dokument frå gammal PIR-side.",
        href: "/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf",
        imageUrl: "/assets/fresvik/images/old-site/home-sentral-godkjent.png",
        imageAlt: "Sentral godkjenning",
      },
      {
        title: "SINTEF Certification TG 2135",
        text: "Ekstern lenke frå gammal PIR-side.",
        href: "https://www.sintefcertification.no/Product/Index/129",
        imageUrl: "/assets/fresvik/images/old-site/tg-2135-78cb0925dd.jpg",
        imageAlt: "TG 2135",
      },
      {
        title: "PUR CE-merke",
        text: "Dokument frå gammal PIR-side.",
        href: "/assets/fresvik/documents/pur-ce-merke.pdf",
        imageUrl: "/assets/fresvik/images/old-site/ce-logo-png-transparent-e6364eebb9.png",
        imageAlt: "CE-logo",
      },
      {
        title: "Miljøfyrtårn",
        text: "Ekstern lenke frå gammal PIR-side.",
        href: "https://rapportering.miljofyrtarn.no/stats/176324",
        imageUrl: "/assets/fresvik/images/migrated/miljfyrtarn-fresvik-produkt.jpg",
        imageAlt: "Miljøfyrtårn",
      },
    ],
  },
];

const purSections = [
  {
    title: "Full tekst frå gammal side",
    intro:
      "Kjeldetekst henta manuelt frå https://www.fresvik.no/produkt/fresvik-panel 2026-06-10.",
    items: [
      {
        title: "Fresvik PUR-Panel til kjøle- og fryserom",
        text:
          "Fresvik Produkt har produsert kjøle- og fryserom sidan 1980, og er i dag den einaste norske produsenten av isolasjonspanel til kjøle- og fryserom.\n\nFresvik kjøle- og fryserom blir levert med veggar, golv, tak og dørar eller portar. Vår storleik, kombinert med ei bevisst satsing på fleksible produksjonsløysingar, set oss i stand til å levere kundetilpassa løysingar.\n\nFresvik PUR-Panel er eit sandwichelement med oppskumma polyuretan som kjerne, innkapsla mellom to stålplater.",
        imageUrl: "/assets/fresvik/images/old-site/flake-black-3b186da893.png",
        imageAlt: "Fresvik PUR-Panel",
      },
    ],
  },
  {
    title: "Produktfordelar frå gammal side",
    intro: "Fordelane er henta frå gammal PUR-side utan omskriving.",
    items: [
      {
        title: "Utvikla og produsert i Norge",
        text: "Utvikla og produsert i Norge.",
      },
      {
        title: "SINTEF-godkjent",
        text: "SINTEF-godkjent.",
      },
      {
        title: "Fleksibelt på byggeplass",
        text: "Fleksibelt på byggeplass.",
      },
      {
        title: "Enkel montasje med eksenterlås",
        text: "Enkel montasje med eksenterlås.",
      },
      {
        title: "Modulmål gir mindre svinn",
        text: "Modulmål gir mindre svinn.",
      },
      {
        title: "Kort design-, produksjons- og leveringstid",
        text: "Kort design-, produksjons- og leveringstid.",
      },
    ],
  },
  {
    title: "Tekniske data",
    items: [
      {
        title: "Høgtrykkskum av PUR (polyuretan)",
        text:
          "Brannklasse: C-s3, d0\n\nTykkelse: 75, 100, 125, 150 og 175 mm\n\nDensitet: 40 (+/-3) kg/m3\n\nVekt (ca.): 13 - 17 kg/m2\n\nU-verdi/termisk transmittans: 0.13 - 0.29 W/(m²K)\n\nTemperatur: -40°C til +120°C\n\nFleksibel romhøgde (trinn på 50 mm, opptil 8000 mm)\n\nFleksibel modulbredde (trinn på 300 mm)",
      },
      {
        title: "Konstruksjon",
        text:
          "Fresvik-panel er basert på eit fleksibelt modulsystem med eksenterlås i overgangane. Panela har ei hygienisk overflate.",
        imageUrl: "/assets/fresvik/images/old-site/notfjaer1-65fa348e3a.jpg",
        imageAlt: "Konstruksjon av Fresvik PUR-Panel",
      },
      {
        title: "Isolasjon",
        text:
          "Høytrykkskumma polyuretan, ca. 40-45 kg/m3. Tilfredsstiller gjeldande miljøkrav.",
        imageUrl: "/assets/fresvik/images/old-site/image-asset-4-8d1e9d773c.jpeg",
        imageAlt: "Isolasjon i Fresvik PUR-Panel",
      },
      {
        title: "Overflate",
        text:
          "Standard overflate i 0,55 mm galvanisert stålplate med 25 µm polyester, type FoodSafe.\n\nOverflate kan leverast i rustfritt stål, syrefast stål, glassfiber-armert polyester eller andre platetypar.",
        imageUrl: "/assets/fresvik/images/old-site/aaa-e82ae393b0.jpg",
        imageAlt: "Overflate på Fresvik PUR-Panel",
      },
    ],
  },
  {
    title: "Dokument",
    items: purDocuments,
  },
  {
    title: "For samarbeidspartnarar",
    intro:
      "Vår visjon er å vere den beste samarbeidspartnaren for deg som kjøleentreprenør. Ønskjer du meir informasjon om produkta våre, ta gjerne kontakt med oss.",
    items: [
      {
        title: "Har du eit prosjekt du vil diskutere med oss?",
        text: "Ta kontakt.",
        href: "/kontakt",
      },
    ],
  },
  {
    title: "Kontaktinformasjon frå gammal side",
    intro: "Kontaktblokkane under låg synleg på den gamle PUR-sida.",
    items: [
      {
        title: "Fresvik Produkt AS",
        text:
          "Fresvikvegen 995,\n6896 Fresvik\nTel: 57 69 83 00\nE-post: post@fresvik.no",
      },
      {
        title: "Salsavdeling Fresvik",
        text:
          "Arne-Olav Lien Bardølsgård\nMob: 99 55 25 49\narnbar@fresvik.no",
      },
      {
        title: "Salsavdeling Drammen",
        text:
          "Lars Erling Livrud\nMob: 40 47 79 12\nlarliv@fresvik.no",
      },
      {
        title: "Frode Winther",
        text: "Frode Winther\nMob: 91 38 39 49\nfrowin@fresvik.no",
      },
    ],
  },
  {
    title: "Nyheitsbrev og footerlenker frå gammal side",
    intro:
      "Motta nyheitsbrev. Meld deg på vårt nyheitsbrev og få tips og inspirasjon frå bransjen. Sjå vår personvernerklæring.",
    items: [
      {
        title: "Personvernerklæring",
        text: "Footer-lenke frå gammal PUR-side.",
        href: "/personvernerklering",
      },
      {
        title: "Openheitslova",
        text: "Footer-lenke frå gammal PUR-side.",
        href: "/openheitslova",
      },
      {
        title: "Nettside levert av GASTA",
        text: "Ekstern footer-lenke frå gammal PUR-side.",
        href: "https://www.gasta.no/",
      },
    ],
  },
  {
    title: "Sertifikat- og botnlenker frå gammal side",
    intro: "Lenker og merke som låg i botnområdet på gammal PUR-side.",
    items: [
      {
        title: "Sentral godkjenning",
        text: "Dokument frå gammal PUR-side.",
        href: "/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf",
        imageUrl: "/assets/fresvik/images/old-site/home-sentral-godkjent.png",
        imageAlt: "Sentral godkjenning",
      },
      {
        title: "SINTEF Certification TG 2135",
        text: "Ekstern lenke frå gammal PUR-side.",
        href: "https://www.sintefcertification.no/Product/Index/129",
        imageUrl: "/assets/fresvik/images/old-site/tg-2135-78cb0925dd.jpg",
        imageAlt: "TG 2135",
      },
      {
        title: "Polyurethan",
        text: "Merke frå gammal PUR-side.",
        imageUrl: "/assets/fresvik/images/old-site/home-poly.png",
        imageAlt: "Polyurethan isolerer betre",
      },
      {
        title: "StartBANK",
        text: "Merke frå gammal PUR-side.",
        imageUrl: "/assets/fresvik/images/old-site/home-startbank.png",
        imageAlt: "StartBANK",
      },
      {
        title: "Miljøfyrtårn",
        text: "Ekstern lenke frå gammal PUR-side.",
        href: "https://rapportering.miljofyrtarn.no/stats/176324",
        imageUrl: "/assets/fresvik/images/migrated/miljfyrtarn-fresvik-produkt.jpg",
        imageAlt: "Miljøfyrtårn",
      },
      {
        title: "PUR CE-merke",
        text: "Dokument frå gammal PUR-side.",
        href: "/assets/fresvik/documents/pur-ce-merke.pdf",
        imageUrl: "/assets/fresvik/images/old-site/ce-logo-png-transparent-e6364eebb9.png",
        imageAlt: "CE-logo",
      },
    ],
  },
];

const portSections = [
  {
    title: "Full tekst frå gammal side",
    intro:
      "Kjeldetekst henta manuelt frå https://www.fresvik.no/produkt/kjole-fryseportar 2026-06-10.",
    items: [
      {
        title: "Skyveport til kjøle- og fryserom",
        text:
          "Fresvik Produkt har lang erfaring med å produsere kjøle- og fryseportar til næringsmiddelbransjen, engroslager og lagerbygg.\n\nSkyveportar er ofte utsett for stor slitasje og må tåle tøff behandling. Fresvik skyveportar er kjende for sin kvalitet og gode isoleringsevne.\n\nVi skreddarsyr portar ved vår fabrikk etter spesifikasjon frå kunde.Skyveporten kan vere manuell eller elektrisk driven, etter behov.",
        imageUrl: "/assets/fresvik/images/old-site/fresvik-port-hero.jpeg",
        imageAlt: "Skyveport til kjøle- og fryserom",
      },
    ],
  },
  {
    title: "Produktfordelar frå gammal side",
    intro:
      "Fordelane er henta frå gammal side for kjøle- og fryseportar utan omskriving.",
    items: [
      {
        title: "Manuell eller elektrisk",
        text: "Manuell eller elektrisk.",
      },
      {
        title: "Utvikla og produsert i Norge",
        text: "Utvikla og produsert i Norge.",
      },
      {
        title: "Skreddarsydd etter mål",
        text: "Skreddarsydd etter mål.",
      },
      {
        title: "Høg kvalitet og god isoleringsevne",
        text: "Høg kvalitet og god isoleringsevne.",
      },
    ],
  },
  {
    title: "Produktbilete frå gammal side",
    intro: "Bileta låg i produktområdet på den gamle port-sida.",
    items: [
      {
        title: "Kjøle/fryseport",
        text: "Kjøle/fryseport.",
        imageUrl: "/assets/fresvik/images/old-site/fresvik-skyveport-cedbd2620d.jpeg",
        imageAlt: "Kjøle/fryseport",
      },
      {
        title: "Motor",
        text: "Motor.",
        imageUrl:
          "/assets/fresvik/images/old-site/motor-fresvik-elektrisk-skyveport-4124d9ef0b.jpeg",
        imageAlt: "Motor Fresvik elektrisk skyveport",
      },
      {
        title: "Lås",
        text: "Lås.",
        imageUrl: "/assets/fresvik/images/old-site/laas-fresvik-skyveport-217ddc424b.jpeg",
        imageAlt: "Lås Fresvik skyveport",
      },
    ],
  },
  {
    title: "Produktinformasjon",
    items: [
      {
        title: "Dørblad",
        text: "Galvansiert stålplate i polyesterlakkert overflate i Foodsafe kvalitet.",
      },
      {
        title: "Isolering",
        text:
          "Frys: 100 og 125 mm skumma polyurethane, ca. 40 kg./m3.\n\nKjøl: 75 og 100 mm skumma polyurethane, ca. 40 kg./m3.",
      },
      {
        title: "Beslag",
        text: "Heve/skyvebeslag. Inn- og utvendig åpnar.",
      },
      {
        title: "Karm",
        text:
          "Utanpåliggende sjøvannsbestandig, eloksert aluminium. Fryseport leverast med terskel og innlagt sjølvregulerande varmekabel 230V. Effekt varmekabel = 51 W/meter. Skifting av varmekabel kan skje utan å demontera porten.",
      },
      {
        title: "Tetning",
        text:
          "Beslagets løftemekanisme og gummipakninger i EPDM-kvalitet, sørger for god tetting. Doble pakningar på fryseport.",
      },
      {
        title: "Mål",
        text: "Produserast etter mål frå kunde.",
      },
      {
        title: "Ekstra",
        text:
          "Automatisk (elektrisk) åpning/stenging med trykknapp-/snortrekkbrytar som standard.\n\nRadio-styring.\n\nSylinderlås.\n\nDørblad og beslag i rustfritt stål.",
      },
    ],
  },
  {
    title: "Dokument",
    items: portDocuments,
  },
  {
    title: "For samarbeidspartnarar",
    intro:
      "Vår visjon er å vere den beste samarbeidspartnaren for deg som kjøleentreprenør. Ønskjer du meir informasjon om produkta våre, ta gjerne kontakt med oss.",
    items: [
      {
        title: "Har du eit prosjekt du vil diskutere med oss?",
        text: "Ta kontakt.",
        href: "/kontakt",
      },
    ],
  },
  {
    title: "Tilleggsprodukt",
    intro: "Gammal portside lenka vidare til desse tilleggsprodukta.",
    items: [
      {
        title: "PVC-gardiner",
        text: "Tilleggsprodukt frå gammal portside.",
        href: "/andre-produkter/pvc-gardiner",
        imageUrl: "/assets/fresvik/images/old-site/pvc-gardin-web-port.jpg",
        imageAlt: "PVC-gardiner",
      },
      {
        title: "Køyrerampe",
        text: "Tilleggsprodukt frå gammal portside.",
        href: "/andre-produkter/kjlerampe",
        imageUrl: "/assets/fresvik/images/old-site/rampe3-copy-port.jpg",
        imageAlt: "Køyrerampe",
      },
    ],
  },
  {
    title: "Kontaktinformasjon frå gammal side",
    intro: "Kontaktblokkane under låg synleg på den gamle port-sida.",
    items: [
      {
        title: "Fresvik Produkt AS",
        text:
          "Fresvikvegen 995,\n6896 Fresvik\nTel: 57 69 83 00\nE-post: post@fresvik.no",
      },
      {
        title: "Salsavdeling Fresvik",
        text:
          "Arne-Olav Lien Bardølsgård\nMob: 99 55 25 49\narnbar@fresvik.no",
      },
      {
        title: "Salsavdeling Drammen",
        text:
          "Lars Erling Livrud\nMob: 40 47 79 12\nlarliv@fresvik.no",
      },
      {
        title: "Frode Winther",
        text: "Frode Winther\nMob: 91 38 39 49\nfrowin@fresvik.no",
      },
    ],
  },
  {
    title: "Nyheitsbrev og footerlenker frå gammal side",
    intro:
      "Motta nyheitsbrev. Meld deg på vårt nyheitsbrev og få tips og inspirasjon frå bransjen. Sjå vår personvernerklæring.",
    items: [
      {
        title: "Personvernerklæring",
        text: "Footer-lenke frå gammal portside.",
        href: "/personvernerklering",
      },
      {
        title: "Openheitslova",
        text: "Footer-lenke frå gammal portside.",
        href: "/openheitslova",
      },
      {
        title: "Nettside levert av GASTA",
        text: "Ekstern footer-lenke frå gammal portside.",
        href: "https://www.gasta.no/",
      },
    ],
  },
  {
    title: "Sertifikat- og botnlenker frå gammal side",
    intro: "Lenker og merke som låg i botnområdet på gammal portside.",
    items: [
      {
        title: "Sentral godkjenning",
        text: "Dokument frå gammal portside.",
        href: "/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf",
        imageUrl: "/assets/fresvik/images/old-site/home-sentral-godkjent.png",
        imageAlt: "Sentral godkjenning",
      },
      {
        title: "SINTEF Certification TG 2135",
        text: "Ekstern lenke frå gammal portside.",
        href: "https://www.sintefcertification.no/Product/Index/129",
        imageUrl: "/assets/fresvik/images/old-site/tg-2135-78cb0925dd.jpg",
        imageAlt: "TG 2135",
      },
      {
        title: "Polyurethan",
        text: "Merke frå gammal portside.",
        imageUrl: "/assets/fresvik/images/old-site/home-poly.png",
        imageAlt: "Polyurethan isolerer betre",
      },
      {
        title: "StartBANK",
        text: "Merke frå gammal portside.",
        imageUrl: "/assets/fresvik/images/old-site/home-startbank.png",
        imageAlt: "StartBANK",
      },
      {
        title: "Miljøfyrtårn",
        text: "Ekstern lenke frå gammal portside.",
        href: "https://rapportering.miljofyrtarn.no/stats/176324",
        imageUrl: "/assets/fresvik/images/migrated/miljfyrtarn-fresvik-produkt.jpg",
        imageAlt: "Miljøfyrtårn",
      },
      {
        title: "PUR CE-merke",
        text: "Dokument frå gammal portside.",
        href: "/assets/fresvik/documents/pur-ce-merke.pdf",
        imageUrl: "/assets/fresvik/images/old-site/ce-logo-png-transparent-e6364eebb9.png",
        imageAlt: "CE-logo",
      },
    ],
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

const frysetunnelSections = [
  {
    title: "Kontrollert innfrysing",
    intro:
      "Gamle Fresvik-tekstar legg vekt på at innfrysing i næringsmiddelproduksjon handlar om meir enn temperatur aleine.",
    items: [
      {
        title: "Rask og jamn prosess",
        text:
          "Frysetunnelar frå Fresvik Produkt er utvikla for rask, jamn og kontrollert innfrysing i krevjande produksjonsmiljø.",
      },
      {
        title: "Kvalitet gjennom verdikjeda",
        text:
          "Når råvarer og ferdigvarer blir frosne raskt og kontrollert, blir kvaliteten betre teken vare på gjennom heile verdikjeda.",
      },
      {
        title: "Mindre krystalldanning",
        text:
          "Ein effektiv frysetunnel bidreg til å avgrense krystalldanning, bevare struktur og redusere tap av smak, tekstur og haldbarheit.",
      },
    ],
  },
  {
    title: "Konstruksjon og bruksområde",
    intro:
      "Fresvik Produkt sine frysetunnelar er konstruerte med skreddarsydde PIR-panel og robuste detaljar.",
    items: [
      {
        title: "PIR-panel frå Fresvik",
        text:
          "Frysetunnelen blir bygd opp av prefabrikkerte PIR-panel produsert i Fresvik i Sogn, med brannklasse B-s1,d0 og hygienisk FoodSafe-overflate som standard.",
      },
      {
        title: "Maritimt og landbasert",
        text:
          "Løysingane er tilpassa både maritime og landbaserte applikasjonar, inkludert skip, offshoreinstallasjonar og industrielle næringsmiddelanlegg.",
      },
      {
        title: "Tilpassa dimensjonar",
        text:
          "Frysetunnelane kan leverast i ulike dimensjonar og konfigurasjonar basert på kapasitet og bruksområde.",
      },
    ],
  },
  {
    title: "Detaljar frå gammal produktside",
    items: [
      {
        title: "Overflater og tjukkleikar",
        text:
          "Standard FoodSafe-overflate blir oppgitt saman med tjukkleikar frå 75 til 175 mm. Rustfritt eller syrefast stål kan leverast på førespurnad.",
      },
      {
        title: "Dører etter mål",
        text:
          "Kvar frysetunnel blir levert med dører produsert etter mål og tilpassa lysmål, drift og bruksområde.",
      },
      {
        title: "Referansebruk",
        text:
          "Frysetunnelar blir brukt i næringsmiddelindustrien til rask innfrysing av fisk, kjøt, bakerivarer og meieriprodukt.",
      },
    ],
  },
];

export const contentPages: ContentPage[] = [
  {
    slug: "/",
    title: "Leiande fagfolk på kjøle- og fryserom i Norge",
    eyebrow: "Fresvik Produkt",
    intro:
      "Den einaste norske produsenten av isolasjonspanel, med over 45 års erfaring, som tilbyr kvalitet og kunnskap til deg som kjøleentreprenør.",
    description:
      "Vi har produsert isolasjonspanel, dører og portar til kjøle- og fryserom i Fresvik sidan 1980. Våre fagfolk gir kvalitet og kunnskap.",
    pageType: "home",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/",
    cards: [
      {
        title: "Norsk produsent",
        text:
          "Norges flagg vart vist i hero-området på den gamle framsida saman med bodskapen om norsk produksjon og over 45 års erfaring.",
        imageUrl: "/assets/fresvik/images/old-site/home-flag-of-norway.jpg",
        imageAlt: "Norges flagg, rød med blått kors omgitt av hvit kant.",
      },
      ...homeProductCards.slice(0, 2),
    ],
    sections: [
      {
        title: "Produktteaserar frå gammal framside",
        intro:
          "Desse produktlenkene og tekstane låg på den gamle framsida og skal bevarast før vidare designarbeid.",
        items: homeProductCards,
      },
      {
        title: "Våre kundar",
        intro:
          "Basert på modular, skreddarsyr vi kjøle- og fryserom for butikk, næringsmiddelindustri, institusjonar, storkjøken, skip og offshoreinstallasjonar.",
        items: [
          {
            title: "Våre kundar dekor",
            text:
              "Snøkrystallgrafikk frå kundeseksjonen på den gamle framsida.",
            imageUrl: "/assets/fresvik/images/migrated/flake-left.png",
            imageAlt: "En snøkrystall med komplekse mønstre.",
          },
          ...homeCustomerCards,
        ],
      },
      {
        title: "Aktuelt",
        items: homeNewsCards,
      },
      {
        title: "Vil du jobbe hjå oss?",
        items: [
          {
            title: "Vil du jobbe hjå oss?",
            text:
              "Fresvik Produkt sine 45 tilsette utgjer det fremste miljøet i landet på produksjon av kjøle- og fryserom. Vi er stadig på jakt etter flinke kollegaer.",
            href: "/stillingledig",
            imageUrl: "/assets/fresvik/images/old-site/home-job-factory.jpg",
            imageAlt:
              "En mann står ved en kontrollpult på fabrikken vår i Fresvik, omgitt av maskiner og produksjonsutstyr.",
          },
        ],
      },
      {
        title: "Kontakt",
        items: [
          {
            title: "Fresvik Produkt AS",
            text:
              "Fresvikvegen 995, 6896 Fresvik. Tel: 57 69 83 00. E-post: post@fresvik.no.",
            href: "mailto:post@fresvik.no",
          },
          {
            title: "Salsavdeling Fresvik:",
            text: "Arne-Olav Lien Bardølsgård. Mob: 99 55 25 49. arnbar@fresvik.no.",
            href: "mailto:arnbar@fresvik.no",
          },
          {
            title: "Salsavdeling Drammen:",
            text: "Lars Erling Livrud. Mob: 40 47 79 12. larliv@fresvik.no.",
            href: "mailto:larliv@fresvik.no",
          },
          {
            title: ":",
            text: "Frode Winther. Mob: 91 38 39 49. frowin@fresvik.no.",
            href: "mailto:frowin@fresvik.no",
          },
        ],
      },
      {
        title: "Motta nyheitsbrev",
        intro:
          "Meld deg på vårt nyheitsbrev og få tips og inspirasjon frå bransjen. Sjå vår personvernerklæring.",
        items: [
          {
            title: "Email Address",
            text: "Sign Up",
          },
          {
            title: "Personvernerklæring",
            text: "Footer-lenke frå gammal framside.",
            href: "/personvernerklering",
          },
          {
            title: "Openheitslova",
            text: "Footer-lenke frå gammal framside.",
            href: "/openheitslova",
          },
          {
            title: "Nettside levert av GASTA",
            text: "GASTA",
            href: "https://www.gasta.no",
          },
        ],
      },
      {
        title: "Footer sertifikat og merker",
        intro:
          "Bileta låg i footer-området på den gamle framsida og blir bevart som migrerte assets.",
        items: [
          {
            title: "Sentral godkjent",
            text: "Sertifikatmerke frå gammal framside.",
            imageUrl: "/assets/fresvik/images/old-site/home-sentral-godkjent.png",
            imageAlt: "sentral+godkjent.png",
          },
          {
            title: "TG-2135",
            text: "Sertifikatmerke frå gammal framside.",
            imageUrl: "/assets/fresvik/images/old-site/tg-2135-78cb0925dd.jpg",
            imageAlt: "TG-2135.jpg",
          },
          {
            title: "Poly",
            text: "Merke frå gammal framside.",
            imageUrl: "/assets/fresvik/images/old-site/home-poly.png",
            imageAlt: "Poly.png",
          },
          {
            title: "Startbank",
            text: "Merke frå gammal framside.",
            imageUrl: "/assets/fresvik/images/old-site/home-startbank.png",
            imageAlt: "Startbarnk.png",
          },
          {
            title: "Miljøfyrtårn",
            text: "Merke frå gammal framside.",
            imageUrl: "/assets/fresvik/images/migrated/miljfyrtarn-fresvik-produkt.jpg",
            imageAlt: "Miljøfyrtårn",
          },
          {
            title: "CE",
            text: "CE-logo frå gammal framside.",
            imageUrl: "/assets/fresvik/images/old-site/ce-logo-png-transparent-e6364eebb9.png",
            imageAlt: "ce-logo-png-transparent.png",
          },
        ],
      },
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
          "Segment-sidene frå gammal nettstad viser korleis produkt og tenester blir brukt i butikk, offshore og storkjøkken/institusjon.",
        items: customerSegmentCards,
      },
    ],
    todo: ["Importer produktbilete og PDF-dokument frå gammal nettstad."],
  },
  {
    slug: "/produkt/fresvik-pir-panel",
    title: "Fresvik PIR-Panel til kjøle- og fryserom",
    eyebrow: "Produkt",
    intro:
      "Fresvik Produkt har produsert kjøle- og fryserom sidan 1980, og er i dag den einaste norske produsenten av isolasjonspanel til kjøle- og fryserom.",
    description:
      "Fresvik PIR-panel er et innovativt isolasjonsmateriale som gir bedre isolasjonsevne per kvadratmeter, og bedre brannsikkerhet enn PUR paneler.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/fresvik-pir-panel",
    cards: [],
    sections: pirSections,
  },
  {
    slug: "/produkt/fresvik-pur-panel",
    title: "Fresvik PUR-Panel til kjøle- og fryserom",
    eyebrow: "Produkt",
    intro:
      "Fresvik Produkt har produsert kjøle- og fryserom sidan 1980, og er i dag den einaste norske produsenten av isolasjonspanel til kjøle- og fryserom.",
    description:
      "Fresvik PUR-Panel tilbyr isolasjonspanel til kjøle- og fryserom, produsert i Norge med fleksible løsninger, enkel montering og miljøvennlig design.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/fresvik-panel",
    cards: [],
    sections: purSections,
  },
  {
    slug: "/produkt/kjole-fryseportar",
    title: "Skyveport til kjøle- og fryserom",
    eyebrow: "Produkt",
    intro:
      "Fresvik Produkt har lang erfaring med å produsere kjøle- og fryseportar til næringsmiddelbransjen, engroslager og lagerbygg.",
    description:
      "Fresvik Produkt tilbyr skreddersydde kjøle- og fryseportar av høy kvalitet, med god isolasjon og tilpasning etter behov. Perfekt for næringsmiddelindustri og lagerbygg.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/kjole-fryseportar",
    cards: [],
    sections: portSections,
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
    slug: "/produkt/frysetunnel",
    title: "Fresvik Frysetunnel",
    eyebrow: "Produkt",
    intro:
      "Frysetunnelar frå Fresvik Produkt er utvikla for rask, jamn og kontrollert innfrysing i krevjande produksjonsmiljø.",
    description:
      "Fresvik Frysetunnel for kontrollert innfrysing i næringsmiddelproduksjon, maritime miljø og landbaserte industrianlegg.",
    pageType: "product",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/produkt/frysetunnel",
    cards: oldProductCards.filter((item) => item.href === "/produkt/frysetunnel"),
    sections: frysetunnelSections,
    todo: [
      "Kvalitetssikre kapasitetsdata og eventuelle tekniske mål mot Fresvik før endeleg lansering.",
      "Importer frysetunnel-bilete til Sanity assets når mediaforvaltninga er klar.",
    ],
  },
  {
    slug: "/tilleggsutstyr",
    title: "Tilleggsutstyr",
    eyebrow: "Produkt",
    intro:
      "Tilbehøyr og reservedelar til kjøle- og fryserom, med hjelp frå Fresvik til å finne rett løysing.",
    description:
      "Tilleggsutstyr og relaterte produkt for Fresvik-produkt.",
    pageType: "product",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/tilleggsutstyr",
    cards: accessoryDetailCards.slice(0, 6),
    sections: [
      {
        title: "Tilbehøyr og reservedelar",
        intro:
          "Den gamle sida seier at Fresvik har det meste ein treng av tilbehøyr og reservedelar, og hjelper kundar å finne rett del.",
        items: accessoryDetailCards,
      },
      {
        title: "Artikkelnummer frå gammal side",
        intro:
          "Dette er varelinjer funne på gammal tilleggsutstyrside. Dei bør kvalitetssikrast og flyttast til Sanity som strukturerte reservedelar før endeleg lansering.",
        items: accessoryOrderCards,
      },
    ],
    todo: [
      "Avgjer om tilleggsutstyr skal vere eigne produkt, reservedelar eller sideblokker i Sanity.",
      "Kvalitetssikre artikkelnummer og sortiment før endeleg lansering.",
    ],
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
    slug: "/kjolerom-fryserom-butikk",
    title: "Kjøle- og fryserom til butikk",
    eyebrow: "Kundesegment",
    intro:
      "Marknadsleiar på kjøle- og fryserom til daglegvarehandel, drivstoffstasjon og storkiosk.",
    description:
      "Kjøle- og fryserom til butikk, daglegvarehandel, drivstoffstasjon og storkiosk.",
    pageType: "support",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/kjolerom-fryserom-butikk",
    cards: supportDetailCards.filter(
      (item) => item.href === "/kjolerom-fryserom-butikk",
    ),
    sections: butikkSections,
    todo: [
      "Importer relevante butikkbilete og referansar til Sanity.",
      "Kvalitetssikre marknadsleiar-formulering før endeleg lansering.",
    ],
  },
  {
    slug: "/kjolerom-fryserom-offshore",
    title: "Kjøle- og fryserom til skip og offshore",
    eyebrow: "Kundesegment",
    intro:
      "Tilpassa proviantrom basert på modular, med PIR-panel godkjende for maritim bruk.",
    description:
      "Kjøle- og fryserom til skip og offshore frå Fresvik Produkt.",
    pageType: "support",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/kjolerom-fryserom-offshore",
    cards: supportDetailCards.filter(
      (item) => item.href === "/kjolerom-fryserom-offshore",
    ),
    sections: offshoreSections,
    todo: [
      "Importer maritime referansar, bilete og eventuell dokumentasjon.",
      "Kvalitetssikre brannklasse og standardreferansar mot gjeldande dokument.",
    ],
  },
  {
    slug: "/kjolerom-fryserom-storkjokken",
    title: "Kjøle- og fryserom til storkjøkken",
    eyebrow: "Kundesegment",
    intro:
      "Tilpassa kjøle- og fryserom til storkjøkken, restaurant og institusjon.",
    description:
      "Kjøle- og fryserom til storkjøkken, restaurant og institusjon.",
    pageType: "support",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/kjolerom-fryserom-storkjokken",
    cards: supportDetailCards.filter(
      (item) => item.href === "/kjolerom-fryserom-storkjokken",
    ),
    sections: storkjokkenSections,
    todo: [
      "Importer relevante storkjøkkenbilete og referansar.",
      "Kvalitetssikre material- og overflatebeskrivingar.",
    ],
  },
  {
    slug: "/transportskade",
    title: "Transportskade",
    eyebrow: "Kundeservice",
    intro:
      "Slik rapporterer du transportskade raskt og med nødvendig dokumentasjon.",
    description:
      "Informasjon om kontroll og rapportering ved transportskade på Fresvik-leveransar.",
    pageType: "support",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/transportskade",
    cards: supportDetailCards.filter((item) => item.href === "/transportskade"),
    sections: transportDamageSections,
    todo: [
      "Kvalitetssikre DAP-/leveringsvilkår-referanse mot gjeldande leveringsbetingelser.",
      "Vurder om sida skal lenkje direkte til leveringsvilkår-PDF.",
    ],
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
        items: supportDetailCards,
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
          "Dokumenta er henta frå gammal Fresvik-side og ligg mellombels som lokale filer fram til dei blir flytta til Sanity assets.",
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
    slug: "/monteringsanvisningar-fresvik-skyveport",
    title: "Monteringsanvisningar for elektrisk styring av Fresvik Skyveport",
    eyebrow: "Dokumentasjon",
    intro:
      "Teknisk dokumentasjon og monteringsfiler for elektrisk styring av Fresvik Skyveport.",
    description:
      "Monteringsanvisningar og teknisk dokumentasjon for elektrisk styring av Fresvik Skyveport.",
    pageType: "support",
    priority: "medium",
    sourceUrl: "https://www.fresvik.no/monteringsanvisningar-fresvik-skyveport",
    cards: electricSkyveportDownloads.slice(0, 3),
    sections: [
      {
        title: "Filer frå gammal skyveportside",
        intro:
          "Dokumenta er lasta ned frå gammal Fresvik-side og kopla som lokale PDF-filer for trygg gjennomgang i ny nettstad.",
        items: electricSkyveportDownloads,
      },
      {
        title: "Relatert dokumentasjon",
        items: portDocuments.filter((item) =>
          item.href?.includes("assets/fresvik/documents"),
        ),
      },
    ],
    todo: [
      "Kvalitetssikre at alle elektriske styringsdokument framleis er gjeldande før endeleg lansering.",
      "Flytt PDF-ane til Sanity assets når dokumentmodellen er i bruk.",
    ],
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
        title: "Spørsmål og svar frå gammal FAQ",
        intro:
          "Spørsmåla og svara er henta frå den gamle FAQ-sida og er samla her som grunnlag for vidare Sanity-import.",
        items: faqCards,
      },
    ],
    todo: [
      "Importer og vedlikehald spørsmåla og svara som `faqItem`-dokument i Sanity.",
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
          "Dette er faktiske nyheits-URL-ar, datoar, bilete og kjeldetekst frå den gamle nettstaden.",
        items: newsCards,
      },
    ],
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
    cards: [
      {
        title: "Seljar",
        text:
          "Fresvik Produkt søkjer ein offensiv og relasjonsbyggjande seljar med teknisk innsikt og interesse for gode løysingar.",
        href: "mailto:ts@personalhuset.no",
      },
      {
        title: "Arbeidsstad",
        text:
          "Stillinga kan ha base i Drammen eller Fresvik, etter kandidaten sitt val.",
      },
      {
        title: "Kontakt",
        text:
          "Søknad skal sendast til ts@personalhuset.no og merkast med Seljar stilling. Spørsmål kan rettast til Thomas Skogheim på telefon 95 76 12 19.",
        href: "mailto:ts@personalhuset.no",
      },
    ],
    sections: [
      {
        title: "Ledig stilling frå gammal side",
        items: [
          {
            title: "Vil du vere med på å halde Noreg kaldt?",
            text:
              "Fresvik Produkt AS søkjer ein offensiv og relasjonsbyggjande seljar. Kandidaten bør like kundekontakt, ha teknisk forståing og vere motivert for å finne gode løysingar for kundane.",
          },
          {
            title: "Kvifor velje Fresvik Produkt?",
            text:
              "Den gamle stillingssida framhevar ei solid hjørnesteinsbedrift med hovudkontor i Fresvik og salskontor i Drammen, sunn økonomi, uformelt og inkluderande arbeidsmiljø og gode forsikrings- og pensjonsordningar.",
          },
          {
            title: "Arbeidsoppgåver",
            text:
              "Rolla skal vere proaktiv mot nye og eksisterande kundar, vise fram løysingar på messer, utforske nye marknader, vere rådgivar i tilbods- og prosjektfasar og samarbeide internt om framtidige produkt.",
          },
          {
            title: "Profil",
            text:
              "Fresvik ser etter ein relasjonsbyggjar med teknisk forståing, struktur, økonomisk forståing, gode haldningar, lærevilligheit og flytande norsk.",
          },
          {
            title: "Bu og jobbe i Fresvik",
            text:
              "Sida løftar Fresvik som ei aktiv jordbruksbygd ved fjorden, med trygg oppvekst, lag og organisasjonar, musikkfestival, industri og rikt friluftsliv.",
          },
        ],
      },
    ],
    todo: [
      "Verifiser om stillinga framleis er open før produksjonsdomene blir flytta.",
      "Flytt stillinga til Sanity som redigerbart innhald eller `newsArticle`/jobbmodell.",
    ],
  },
  {
    slug: "/personvernerklering",
    title: "Personvernerklæring",
    eyebrow: "Juridisk",
    intro:
      "Personvernerklæringa frå gammal Fresvik-side er flytta inn som strukturert innhald for vidare kvalitetssikring.",
    description: "Personvernerklæring for Fresvik Produkt.",
    pageType: "legal",
    priority: "high",
    sourceUrl: "https://www.fresvik.no/personvernerklering",
    cards: [],
    sections: [
      {
        title: "Personverntekst frå gammal side",
        items: [
          {
            title: "1. Om Fresvik Produkt AS",
            text:
              "Eigar av nettsida er Fresvik Produkt AS, Fresvikvegen 995, 6896 Fresvik. E-post: post@fresvik.no. Organisasjonsnummer: NO 922 582 270.",
          },
          {
            title: "2. Føremålet med handsaming av personopplysningar",
            text:
              "I samband med kundeforhold kan Fresvik innhente namn, adresse, e-post, telefonnummer, organisasjonsnummer og anna nødvendig informasjon. Opplysningane blir brukte til å handtere kundeforholdet, og kunden har rett til innsyn, retting og sletting av lagra data.",
          },
          {
            title: "3. Utlevering til tredjepart",
            text:
              "Personopplysningar blir ikkje utleverte til tredjepart med mindre det ligg føre lovbestemt opplysningsplikt ovanfor offentlege myndigheiter.",
          },
          {
            title: "4. Kunderegister",
            text:
              "Kunderegisteret inneheld opplysningar som namn, adresse, telefon, eventuelt selskapsnamn, kontaktpersonar og informasjon om kjøpte tenester og produkt. Opplysningane blir lagra så lenge det er tenleg for Fresvik.",
          },
          {
            title: "5-6. Informasjonskapslar",
            text:
              "Sida opplyser at Squarespace og Google Analytics blir brukt til å samle anonymisert informasjon om korleis besøkande brukar nettsida, mellom anna tal besøkande, kvar dei kjem frå og kva sider dei besøker. Informasjonen blir brukt til rapportar og for å betre nettsida.",
          },
          {
            title: "Nyheitsbrev",
            text:
              "Ved påmelding til nyheitsbrev samtykker brukaren til lagring av namn og e-postadresse. Fresvik brukar Mailchimp til utsendingar og opplyser at informasjonen blir lagra til brukaren melder seg av.",
          },
          {
            title: "8. Kontaktskjema",
            text:
              "Når ein fyller ut kontaktskjema på nettsida, blir informasjonen lagra i Fresvik sitt CRM-system for å kunne yte betre kundeservice. Fresvik opplyser at dei ikkje ønskjer å ta vare på detaljar lenger enn nødvendig.",
          },
          {
            title: "10. Innsyn, retting og sletting",
            text:
              "Etter personopplysningsloven § 18 kan privatpersonar krevje innsyn i registrerte opplysningar ved å kontakte Fresvik Produkt AS på post@fresvik.no. Uriktige, ufullstendige eller uønskte opplysningar kan krevjast retta eller sletta.",
          },
          {
            title: "11. Ansvarleg databehandlar",
            text:
              "Dagleg leiar i Fresvik Produkt AS er ansvarleg for handsaming av personopplysningar, internkontroll og at eventuelle avvik frå gjeldande lovverk blir meldt inn og retta. Spørsmål kan sendast til post@fresvik.no.",
          },
        ],
      },
    ],
    todo: [
      "Juridisk tekst er henta frå gammal side, men bør lesast av ansvarleg person før domene flyttast.",
      "Oppdater omtale av cookies/analytics etter ny teknisk løysing på Vercel/Sanity.",
    ],
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
  const page = contentPages.find((item) => item.slug === slug);
  return page ? withOldSiteExtract(page) : undefined;
}

export function getAllContentPages() {
  return contentPages.map((page) => withOldSiteExtract(page));
}

function titleFromSlug(slug: string) {
  const lastSegment = slug.split("/").filter(Boolean).at(-1) || "side";

  return lastSegment
    .replace(/-/g, " ")
    .replace(/nbps|nbsp/g, "")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function extractLinkCards(
  links: string[],
  sourceUrl: string,
  kind: "Intern lenke" | "Ekstern lenke" | "Dokument",
): ContentCard[] {
  return links
    .filter((href) => href !== sourceUrl)
    .slice(0, 24)
    .map((href) => ({
      title: kind,
      text: href,
      href: kind === "Dokument" ? localDocumentHrefFor(href) : href,
    }));
}

const legacyDocumentHrefMap: Record<string, string> = {
  "/s/7060s-fnfz.pdf": "/assets/fresvik/documents/sintef-produktsertifikat-7060s.pdf",
  "/s/2135g-5.pdf": "/assets/fresvik/documents/sintef-teknisk-godkjenning-2135g.pdf",
  "/s/Endre-Skyveretning.pdf": "/assets/fresvik/documents/endre-skyveretning.pdf",
  "/s/FP-PIR-Paneler_Montasjeanvisning-nov-2025.pdf":
    "/assets/fresvik/documents/fp-pir-paneler-montasjeanvisning-nov-2025.pdf",
  "/s/Fresvik-Dr-Montasjeanvisning.pdf":
    "/assets/fresvik/documents/fresvik-dor-montasjeanvisning.pdf",
  "/s/Fresvik-Fryserom-Montasjeanvisning.pdf":
    "/assets/fresvik/documents/fresvik-fryserom-montasjeanvisning.pdf",
  "/s/Fresvik-Kjlerom-Montasjeanvisning.pdf":
    "/assets/fresvik/documents/fresvik-kjolerom-montasjeanvisning.pdf",
  "/s/Fresvik-Port-Montasjeanvisning.pdf":
    "/assets/fresvik/documents/fresvik-port-montasjeanvisning.pdf",
  "/s/Koblingsskjema-Fermod-5010.pdf":
    "/assets/fresvik/documents/koblingsskjema-fermod-5010.pdf",
  "/s/Leveringsvilkar-Fresvik-Produkt_rev2023.pdf":
    "/assets/fresvik/documents/leveringsvilkar-fresvik-produkt-2023.pdf",
  "/s/Miljdokument-Fresvik-Produkt.pdf":
    "/assets/fresvik/documents/miljodokument-fresvik-produkt.pdf",
  "/s/Montasjeanvisning-5010-for-2150.pdf":
    "/assets/fresvik/documents/montasjeanvisning-5010-for-2150.pdf",
  "/s/Montasjeanvisning-5010-for-3530-og-7530.pdf":
    "/assets/fresvik/documents/montasjeanvisning-5010-for-3530-og-7530.pdf",
  "/s/PIR-ProduktbladFP.pdf": "/assets/fresvik/documents/pir-panel.pdf",
  "/s/PIR.pdf": "/assets/fresvik/documents/pir-panel.pdf",
  "/s/PUR-ProduktbladFP.pdf": "/assets/fresvik/documents/pur-produktbladfp.pdf",
  "/s/PUR-ce-merke.pdf": "/assets/fresvik/documents/pur-ce-merke.pdf",
  "/s/Produktblad-Fresvik-Skyveport.pdf":
    "/assets/fresvik/documents/produktblad-fresvik-skyveport.pdf",
  "/s/Quick-Start-5010Exp-indB.pdf":
    "/assets/fresvik/documents/quick-start-5010exp.pdf",
  "/s/Sentral-Godkjenning-Fresvik-Produkt.pdf":
    "/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf",
  "/s/Tilleggsutstyr-NMoptions-kits5010Exp-A_NOR.pdf":
    "/assets/fresvik/documents/tilleggsutstyr-nmoptions-kits5010exp.pdf",
  "/s/Ytelseserklring-Fresvik-Produkt.pdf":
    "/assets/fresvik/documents/ytelseserklaring-fresvik-produkt.pdf",
};

function localDocumentHrefFor(href: string) {
  try {
    const url = new URL(href, "https://www.fresvik.no");
    return legacyDocumentHrefMap[url.pathname] || href;
  } catch {
    return legacyDocumentHrefMap[href] || href;
  }
}

function extractImageCards(imageUrls: string[], title: string): ContentCard[] {
  return imageUrls.map((imageUrl, index) => ({
    title: `${title} bilde ${index + 1}`,
    text: `Bilde frå gammal side, bevart med sourceUrl i migration extract.`,
    imageUrl,
    imageAlt: `${title} bilde ${index + 1}`,
  }));
}

function extractBodyCards(paragraphs: string[], title: string): ContentCard[] {
  const bodyText = paragraphs.join("\n\n");
  return bodyText
    ? [
        {
          title,
          text: bodyText,
        },
      ]
    : [];
}

function hasExtractSection(page: ContentPage) {
  return page.sections.some((section) => section.title === "Full tekst frå gammal side");
}

const ignoredExtractInternalLinks = new Set([
  "/cart",
  "/produkt-mappe",
  "/kundeservice",
]);

function withOldSiteExtract(page: ContentPage): ContentPage {
  if (hasExtractSection(page)) return page;
  const extract = getOldSiteContentExtract(page.slug);
  if (!extract || extract.extractionStatus !== "extracted") return page;

  const extractSections: Section[] = [
    {
      title: "Full tekst frå gammal side",
      intro: `Kjeldetekst henta frå ${extract.sourceUrl}.`,
      items: extractBodyCards(extract.bodyParagraphs, extract.title || page.title),
    },
  ];

  if (extract.imageUrls.length > 0) {
    extractSections.push({
      title: "Bilde frå gammal side",
      items: extractImageCards(extract.imageUrls, extract.title || page.title),
    });
  }

  if (extract.documentUrls.length > 0) {
    extractSections.push({
      title: "Dokumentlenker frå gammal side",
      items: extractLinkCards(extract.documentUrls, extract.sourceUrl, "Dokument"),
    });
  }

  const sourceLinks = [
    ...extract.internalLinks.filter(
      (href) => href !== page.slug && !ignoredExtractInternalLinks.has(href),
    ),
    ...extract.externalLinks,
  ];
  if (sourceLinks.length > 0) {
    extractSections.push({
      title: "Lenker frå gammal side",
      items: extractLinkCards(sourceLinks, extract.sourceUrl, "Ekstern lenke"),
    });
  }

  return {
    ...page,
    intro: page.intro || extract.description || extract.bodyParagraphs[0] || page.title,
    description:
      page.description || extract.description || extract.bodyParagraphs[0] || page.title,
    cards:
      page.cards.length > 0
        ? page.cards.map((card) => ({
            ...card,
            imageUrl: card.imageUrl || extract.imageUrls[0],
            imageAlt: card.imageAlt || extract.title || page.title,
          }))
        : extractBodyCards(extract.bodyParagraphs.slice(0, 2), extract.title || page.title),
    sections: [...page.sections, ...extractSections],
    todo: undefined,
  };
}

export function createLegacyContentPage(slug: string): ContentPage {
  const isArticle = slug.startsWith("/aktuelt/");
  const isReference = slug.startsWith("/referansar/");
  const isAccessory = slug.startsWith("/andre-produkter/");
  const isSupportPage =
    slug.startsWith("/kjolerom-fryserom") || slug === "/transportskade";
  const inventoryItem = getOldSiteInventoryItem(slug);
  const migratedText =
    isAccessory && inventoryItem
      ? accessoryTextByHref[inventoryItem.href]
      : isSupportPage && inventoryItem
        ? supportTextByHref[inventoryItem.href]
        : isArticle && inventoryItem
          ? newsTextByHref[inventoryItem.href]
          : isReference && inventoryItem
            ? referenceTextByHref[inventoryItem.href]
            : undefined;
  const isPublicMigratedDetail =
    Boolean(migratedText) && (isArticle || isReference);
  const legacyEyebrow = isArticle
    ? "Aktuelt frå gammal nettstad"
    : isReference
      ? "Referanse frå gammal nettstad"
      : isAccessory
        ? "Tilleggsutstyr frå gammal nettstad"
        : isSupportPage
          ? "Kundesegment frå gammal nettstad"
          : "Gammal URL under migrering";

  return withOldSiteExtract({
    slug,
    title: inventoryItem?.title || titleFromSlug(slug),
    eyebrow: isPublicMigratedDetail
      ? isArticle
        ? "Aktuelt"
        : "Referanse"
      : legacyEyebrow,
    intro: isPublicMigratedDetail
      ? migratedText || ""
      : "Denne gamle Fresvik-sida er registrert i sitemap og blir halde levande medan innhaldet blir flytta til ny struktur.",
    description:
      isPublicMigratedDetail && migratedText
        ? migratedText
        : "Migreringsside for gammal Fresvik Produkt URL. Endeleg tekst, bilete og dokument skal hentast frå gammal nettstad.",
    pageType: isArticle
      ? "company"
      : isReference
        ? "company"
        : isAccessory
          ? "product"
          : isSupportPage
            ? "support"
            : "index",
    priority: "low",
    sourceUrl: `https://www.fresvik.no${slug}`,
    showMigrationDetails: !isPublicMigratedDetail,
    cards: inventoryItem
      ? [
          {
            title: inventoryItem.title,
            text:
              migratedText ||
              "Registrert frå gammal sitemap med kjeldeinformasjon bevart i migreringsdata.",
            href: isPublicMigratedDetail ? undefined : inventoryItem.href,
            meta: inventoryItem.lastmod,
            imageUrl: inventoryItem.imageUrl,
            imageAlt: inventoryItem.imageAlt || inventoryItem.title,
          },
        ]
      : [],
    sections: isPublicMigratedDetail
      ? [
          {
            title: isArticle ? "Artikkel frå gammal side" : "Referanse frå gammal side",
            intro:
              "Innhaldet er henta frå den gamle Fresvik-nettstaden og halde tilgjengeleg på same URL.",
            items: [
              {
                title: inventoryItem?.title || titleFromSlug(slug),
                text: migratedText || "",
                meta: inventoryItem?.lastmod,
                imageUrl: inventoryItem?.imageUrl,
                imageAlt: inventoryItem?.imageAlt || inventoryItem?.title,
              },
            ],
          },
        ]
      : [
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
                text: migratedText
                  ? "Kort brødtekst er henta frå gammal side. Neste steg er å flytte innhaldet til rett Sanity-type og kvalitetssikre bilete, metadata og eventuelle dokument."
                  : "Kjelde-URL, tittel, bilete, PDF-ar og metadata er registrert for vidare strukturering i rett innhaldstype.",
              },
            ],
          },
        ],
    todo: isPublicMigratedDetail
      ? undefined
      : [
          "Migrer nøyaktig tekst frå gammal side.",
          "Importer og kvalitetssikre bilete, dokument og alt-tekst.",
          "Avgjer om sida skal bli eiga side, nyheitsartikkel, referanse, produkt eller redirect.",
        ],
  });
}
