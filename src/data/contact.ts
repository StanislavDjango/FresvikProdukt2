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

export const offices: Office[] = [
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

export const salesContacts: ContactPerson[] = [
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
