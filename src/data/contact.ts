export type Office = {
  name: string;
  label: string;
  address: string[];
  phone: string;
  email: string;
  mapUrl: string;
};

export type ContactPerson = {
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
};

export type ContactPageContent = {
  heroEyebrow: string;
  title: string;
  intro: string;
  mainEmail: string;
  primaryPhone: string;
  responseNote: string;
  officeHours: string;
  locationsLabel: string;
  salesEyebrow: string;
  salesTitle: string;
  salesIntro: string;
  formEyebrow: string;
  formTitle: string;
  formIntro: string;
  footerText: string;
  offices: Office[];
  salesContacts: ContactPerson[];
};

const offices: Office[] = [
  {
    name: "Fresvik",
    label: "Hovudkontor",
    address: ["Fresvikvegen 995", "6896 Fresvik"],
    phone: "+47 57 69 83 00",
    email: "post@fresvik.no",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=6.8377%2C61.0669%2C6.9498%2C61.1074&layer=mapnik&marker=61.0872%2C6.8938",
  },
  {
    name: "Drammen",
    label: "Salskontor",
    address: ["Tollbugata 105", "3041 Drammen"],
    phone: "+47 32 20 82 00",
    email: "post@fresvik.no",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=10.1814%2C59.7191%2C10.2329%2C59.7542&layer=mapnik&marker=59.7367%2C10.2056",
  },
];

const salesContacts: ContactPerson[] = [
  {
    name: "Arne-Olav Lien Bardølsgård",
    role: "Salsavdeling",
    location: "Fresvik",
    phone: "+47 99 55 25 49",
    email: "arnbar@fresvik.no",
  },
  {
    name: "Lars Erling Livrud",
    role: "Salsavdeling",
    location: "Drammen",
    phone: "+47 40 47 79 12",
    email: "larliv@fresvik.no",
  },
  {
    name: "Frode Winther",
    role: "Prosjekt og sal",
    location: "Noreg",
    phone: "+47 91 38 39 49",
    email: "frowin@fresvik.no",
  },
];

export const navigation = [
  "Produkt",
  "Tenester",
  "Dokumentasjon",
  "Referansar",
  "Om oss",
];

export const fallbackContactPage: ContactPageContent = {
  heroEyebrow: "Prosjekt, sal og teknisk avklaring",
  title: "Kontakt Fresvik Produkt",
  intro:
    "Har du eit prosjekt du vil diskutere? Vi hjelper med isolerte panel, kjøle- og fryseløysingar, levering, montasje og service.",
  mainEmail: "post@fresvik.no",
  primaryPhone: "+47 57 69 83 00",
  responseNote:
    "Eller finn rett salskontakt under. Vi svarar normalt innan ein arbeidsdag.",
  officeHours: "Man-fre 08-16",
  locationsLabel: "Fresvik og Drammen",
  salesEyebrow: "Salsavdeling",
  salesTitle: "Kom direkte i kontakt med ein av oss",
  salesIntro:
    "Vel personen som passar best for prosjektet ditt, eller send førespørselen til felles innboks.",
  formEyebrow: "Send førespørsel",
  formTitle: "Fortel kort om behovet, så tek vi kontakt",
  formIntro:
    "Skjemaet opnar ein ferdig e-post til Fresvik. Neste steg blir å koble dette til Sanity og ein server action/API for direkte sending.",
  footerText: "Fresvik Produkt AS, Fresvikvegen 995, 6896 Fresvik",
  offices,
  salesContacts,
};
