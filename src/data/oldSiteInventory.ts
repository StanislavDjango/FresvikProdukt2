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
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/e6a1706c-a13b-41d3-8e62-479cbae3fa46/Samaneh+Shakeri.jpg",
    imageAlt: "Samaneh Shakeri, ny teknisk sjef i Fresvik Produkt.",
  },
  {
    title: "Ny teknisk teiknar på plass",
    href: "/aktuelt/ny-teknisk-teiknar-havard-berdal",
    lastmod: "2024-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d9765834-5b4b-45a2-a9fc-819876dc6672/Ha%CC%8Avard+Berdal.jpg",
    imageAlt: "Håvard Berdal er ny teknisk teiknar.",
  },
  {
    title: "John Bøthun blir pensjonist",
    href: "/aktuelt/john-bothun-blir-pensjonist",
    lastmod: "2024-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/dc7a35a3-51fe-4a8a-aac6-32c13c72b7ad/John+B%C3%B8thun_Fresvik+Produkt.jpg",
    imageAlt:
      "John Bøthun har jobba 42 år i Fresvik Produkt men blir no pensjonist.",
  },
  {
    title: "Ein investering for å henga med i tida",
    href: "/aktuelt/ein-investering-for-henga-med-i-tidanbsp",
    lastmod: "2023-12-20",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/18003c2c-f3da-4a01-a9fa-f0d7d2ebcadb/Fresvik+Produkt+NY-4.jpeg",
  },
  {
    title: "Agnar er snart pensjonist",
    href: "/aktuelt/agnar-er-snart-pensjonistnbsp",
    lastmod: "2024-08-26",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1702900160938-N8DQTB537FIXPAT24N89/Agnar3.jpeg",
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
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228635452-TD8HXP8YZNIQPVPFCRI7/Milj%C3%B8fyrta%CC%8Arn_Fresvik+Produkt.jpg",
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
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228641721-HC1VC12XNP8F4MWVOMZY/Fresvik+produkt+julehjarte+dekorasjon.jpg",
  },
  {
    title: "Møt Arne-Olav, vår nye salskonsulent",
    href: "/aktuelt/arne-olav-ny-salskonsulent",
    lastmod: "2023-08-30",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228646223-GCFAL7J1Z7CDSTH66PBD/Fresvik+produikt+seljar+Arne-Olav.jpg",
    imageAlt: "Arne-Olav Lien Bardølsgård",
  },
  {
    title: "Kjølerom til fruktbonde",
    href: "/aktuelt/fresvik-kjolerom-til-fruktbonde",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228649404-20IRVX8C4AZ399L0LMWC/Fresvik%2Bkj%25C3%25B8lerom%2BIvar%2BSlinde.jpg",
    imageAlt: "Montasjelag med fruktbonde Ivar Slinde.",
  },
  {
    title: "40 år med isolasjonspanel til kjøle- og fryserom",
    href: "/aktuelt/40-aars-jubileum",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228658301-7HXO4YTJZXT4SGA9VFEE/Fresvik+Produkt+40+aar.jpg",
  },
  {
    title: "Innfesting mot golv",
    href: "/aktuelt/innfesting-mot-golv",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228667833-NZJ6X5474K8R1NHEWNHD/Fresvik+ionnfesting+mot+golv.jpg",
  },
  {
    title: "Ei gladhistorie frå Fresvik Produkt",
    href: "/aktuelt/gladhistorie-fresvik-kjole-fryserom",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228671867-44XDBXP74FZLKTE9Y39G/Fresvik_illustrasjon-1.jpg",
    imageAlt: "Illustrasjon: Emma Kenny",
  },
  {
    title: "Tomas Kruvelis, vår nye mann på innkjøp",
    href: "/aktuelt/tomas-kruvellis-vaar-nye-mann",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228676756-0Q8RRY50I1SGJ18G8H55/tomas+kruvelis+20180315_121307.jpg",
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
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228694667-LDWF0LUE9BEO9MWMQX43/DSC_0608.JPG",
  },
  {
    title: "Skjererom for eit betre arbeidsmiljø",
    href: "/aktuelt/skjererom",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228721557-MJMS3CUPRLWRIEQBF6GC/image-asset.jpeg",
  },
  {
    title: "Deleveggar, dører og portar til nytt lefsebakeri på Stranda",
    href: "/aktuelt/orklafoods-stranda",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228737620-U24419ZEMK9CIOTL4PAW/image-asset.jpeg",
  },
  {
    title: "Nye monteringsanvisningar",
    href: "/aktuelt/nye-monteringsanvisningar",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228769500-4TTIXKAO1JNS9J2G51MG/_K6R3776_07032013.jpg",
  },
  {
    title: "Fasade-element og takplater frå Ruukki",
    href: "/aktuelt/fasade-element-og-takplater-ruukki",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228773263-FLXJ27Z301QXVPYB3V5H/image-asset.jpeg",
  },
  {
    title: "Fresvik skyveport",
    href: "/aktuelt/portproduksjon",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228806054-QGL0LMRK543ILT2T3XK3/Port1_fresvik.jpg",
  },
];

export const oldSiteReferences: MigratedListItem[] = [
  {
    title: "Skreddarsydd fryserom til Baza i Fredrikstad",
    href: "/referansar/fryserom-baza-fredrikstad",
    lastmod: "2026-02-16",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1771241166920-U2FPLWGLYNB9M3NT7Z1J/Baza+fryserom+-+1.jpeg",
  },
  {
    title: "Historisk leveranse til Spar Lund Torv",
    href: "/referansar/historisk-leveranse-pir-panel-spar-lund-torv",
    lastmod: "2025-09-30",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1759222151377-Y2600X4366PYP2EVYBJ9/Spar+Lund+Torv+-+Fresvik+Produkt+1+.jpeg",
  },
  {
    title: "Bjerkreim Legekontor: fryselager og kjølerom",
    href: "/referansar/bjerkreim-legekontor-vikesaa",
    lastmod: "2025-09-30",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1757502389661-0NT1K8HKOIMI3JAQC92D/Bjerkreim+Legekontor+1.jpeg",
  },
  {
    title: "Kjøle- og fryserom til Bunnpris Hammerfest",
    href: "/referansar/bunnpris-hammerfest",
    lastmod: "2025-05-19",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1747635709094-QZ1DMKF9F7N73IKHN7JA/1000024746.jpg",
  },
  {
    title: "Bunnpris Volda: nytt kjølerom med isolert kjøledør",
    href: "/referansar/kjolerom-kjoledor-bunnpris-volda",
    lastmod: "2025-05-19",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1742460548045-IK0PV2OD0TE4E6PHMPW0/Kj%C3%B8lerom+Bunnpris+Volda+3.jpg",
  },
  {
    title: "Nytt stort fryserom til Coop Obs Alnabru",
    href: "/referansar/fryserom-coop-obs-alnabru",
    lastmod: "2025-03-20",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1734082729594-BHFB3R5YE0O1JKAXEDM9/Fryserom+OBS+Alna+3_red.jpg",
  },
  {
    title: "Kjøle- og fryserom til nye Vik helse- og omsorgssenter",
    href: "/referansar/vik-helse-og-omsorgssenter",
    lastmod: "2024-12-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1733749159320-QFVQ5BDRGRH74139ILFZ/Vik+helse-+og+sjukeheim+1.jpg",
  },
  {
    title: "Nok ein Kiwi-butikk får nye fryse- og kjølerom",
    href: "/referansar/fryse-og-kjolerom-kiwi-otta",
    lastmod: "2024-12-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1733820354075-093JAT4O9XRFJQLFQLUX/Kiwi+Otta+1.jpeg",
  },
  {
    title: "Nye leveransar til Rema 1000 Øya i Larvik",
    href: "/referansar/nye-leveransar-til-rema-1000-ya-i-larvik",
    lastmod: "2024-12-09",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1719842659307-NIRBLOIHY5ZWCFKW4BE2/1715599204491_upscale.jpeg",
  },
  {
    title: "Ny leveranse til Dyreparken Safaricamp i Kristiansand Dyrepark",
    href: "/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark",
    lastmod: "2024-12-09",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1719344562160-Z9D12R6FJ09COTBFIC4B/FP+Dyreparken.jpg",
  },
  {
    title: "Spesialløysing til tørkerom hjå Drageboden Kaupanger",
    href: "/referansar/spesialloysing-torkerom-drageboden-kaupanger",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428886618-XIC3VIN5W5LENA25WU9H/DSC03066.jpg",
  },
  {
    title: "Omfattande leveranse til Bakehuset Trondheim",
    href: "/referansar/omfattande-leveranse-til-bakehuset-trondheim",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428910621-3R8YJSUP8CFWMUKDYQGP/20220616_152720_1.jpg",
  },
  {
    title: "Fryseromsportar til Rema 1000 i Narvik",
    href: "/referansar/fryseromsportar-til-rema-1000-i-narvik",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428921988-GSQLH7E9ACJ9DPWSSGRW/IMG_6262.jpg",
  },
  {
    title: "Fryse- og kjølerom til Sogn Frukt og Grønt",
    href: "/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428934426-54STKYSMZXBLZUQT1Y69/IMG_2589.jpg",
  },
  {
    title: "Fryserom og fryseport til Rentokil, Skjetten",
    href: "/referansar/fryserom-fryseport-rentokil",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428945151-2DYHLD6R7EHJRUKRCWUI/Resvik-fryserom-Innvendig%2B2.jpg",
    imageAlt: "Fryserom innvendig",
  },
  {
    title: "Fresvik kjøle- og fryserom i miljøvennlege daglegvarebutikkar",
    href: "/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428963306-KUA0I3B9YO1LP7PZUI11/kiwi-skollenborg-2018-06-18-1-redigert-4-gang.jpg",
    imageAlt: "Kiwi Skollenborg, Kongsberg",
  },
  {
    title: "Karlsøybruket",
    href: "/referansar/karlsoybruket",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428967167-613IZJTMJEAGG6Q80CY9/IMG_7324.JPG",
  },
  {
    title: "Fiskehallen",
    href: "/referansar/fiskehallen",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428975164-E7SJ2PMIFU8D45RMVPPO/fiskehallen1.jpg",
  },
  {
    title: "Celsa Steel Service, Sotra",
    href: "/referansar/celsa-steel-sotra",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428982293-NKH2SU6F4RGFUQLJJGCN/DSC_2579.JPG",
  },
  {
    title: "Buskerud Storcash",
    href: "/referansar/buskerud-storcash",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428993712-UDHHY88O8YUFDULR9G1L/image-asset.jpeg",
  },
  {
    title: "Bjerke spekemat og delikatesse",
    href: "/referansar/bjerke-spekemat",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694429005299-7QZOS5OLK4T6ST48KDUX/Fresvik+aks+montering1.jpg",
  },
  {
    title: "Restauranthuset Malin",
    href: "/referansar/restauranthuset-malin",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694429019721-ZC32AVBAD55JGSWMPAE0/image2.JPG",
  },
  {
    title: "Coop Extra Naustdal",
    href: "/referansar/fryserom-med-fryseport-til-coop-extra-naustdal",
    lastmod: "2023-09-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694429028144-41EYQYWQAK95BAZNN3Y4/20151021_174754.jpg",
  },
];

export const oldSiteProducts: MigratedListItem[] = [
  {
    title: "Fresvik PIR Panel",
    href: "/produkt/fresvik-pir-panel",
    lastmod: "2026-05-11",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/00a09d9e-82d6-404a-ac83-38ed77ef6990/flake-black.png",
  },
  {
    title: "Fresvik Panel",
    href: "/produkt/fresvik-panel",
    lastmod: "2026-03-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/00a09d9e-82d6-404a-ac83-38ed77ef6990/flake-black.png",
  },
  {
    title: "Kjøle- og fryseportar",
    href: "/produkt/kjole-fryseportar",
    lastmod: "2026-03-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/00a09d9e-82d6-404a-ac83-38ed77ef6990/flake-black.png",
  },
  {
    title: "Kjøle- og frysedører",
    href: "/produkt/kjole-frysedorer",
    lastmod: "2026-03-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/00a09d9e-82d6-404a-ac83-38ed77ef6990/flake-black.png",
  },
  {
    title: "Fasadepanel",
    href: "/produkt/fasadepanel",
    lastmod: "2026-03-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/00a09d9e-82d6-404a-ac83-38ed77ef6990/flake-black.png",
  },
  {
    title: "Frysetunnel",
    href: "/produkt/frysetunnel",
    lastmod: "2026-05-07",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/506e6a44-7853-4159-83ac-0bfffd486b1c/New+Logo+Design+2024+-+Made+with+PosterMyWall+%2815%29.png",
  },
];

export const oldSiteServices: MigratedListItem[] = [
  {
    title: "Montasje",
    href: "/tenester/montasje",
    lastmod: "2026-03-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228769500-4TTIXKAO1JNS9J2G51MG/_K6R3776_07032013.jpg",
  },
  {
    title: "Leveranse",
    href: "/tenester/leveranse",
    lastmod: "2026-03-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/3c01276b-1589-49c6-9503-8cd8519959d9/port1web.jpg",
  },
  {
    title: "Service og reservedeler",
    href: "/tenester/service-reservedeler",
    lastmod: "2026-03-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d9eb7ec0-de12-4f73-8ef4-a1676022fbfb/flake-left.png",
  },
];

export const oldSiteDocuments: MigratedListItem[] = [
  {
    title: "Dokumentasjon",
    href: "/dokumentasjon",
    lastmod: "2026-03-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d9eb7ec0-de12-4f73-8ef4-a1676022fbfb/flake-left.png",
  },
  {
    title: "Monteringsanvisning",
    href: "/monteringsanvisning",
    lastmod: "2026-03-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d9eb7ec0-de12-4f73-8ef4-a1676022fbfb/flake-left.png",
  },
  {
    title: "Monteringsanvisningar Fresvik skyveport",
    href: "/monteringsanvisningar-fresvik-skyveport",
    lastmod: "2026-02-04",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d9eb7ec0-de12-4f73-8ef4-a1676022fbfb/flake-left.png",
  },
];

export const oldSiteAccessories: MigratedListItem[] = [
  {
    title: "Tilleggsutstyr",
    href: "/tilleggsutstyr",
    lastmod: "2026-03-10",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/5416085d-ec3b-4270-bef9-0b20706ad193/1463-fr-plata-instal.webp",
  },
  {
    title: "Standard håndtak",
    href: "/andre-produkter/standard-handtak",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228902945-AQM2H33O29539I7FSA3I/Ha%CC%8Andtak+standard_web.jpg",
  },
  {
    title: "Elebar ventil",
    href: "/andre-produkter/elebar-ventil",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228906304-EALH1BMIZQ4OMLY1L00P/Elebar+ventil+inne_web.jpg",
  },
  {
    title: "MaxiElebar ventil",
    href: "/andre-produkter/maxielebar-ventil",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228910970-GA9J3XJZ7A746P0MBQJ4/MaxiElebar+ventil+inne_web.jpg",
  },
  {
    title: "PEGO innestengningsalarm",
    href: "/andre-produkter/pego-innestengningsalarm",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228916130-S0DQVN00OYIZASC3CQKV/PEGO+innestengningsalarm_web.jpg",
    imageAlt: "PEGO innestengningsalarm.",
  },
  {
    title: "PVC-gardiner",
    href: "/andre-produkter/pvc-gardiner",
    lastmod: "2024-06-25",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228921336-E5VWZTJBSCS1W0PVW8TB/PVC-gardin_web.jpg",
    imageAlt: "PVC-gardin.",
  },
  {
    title: "Diktator dørtiltrekker",
    href: "/andre-produkter/diktator-dortiltrekker",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228926673-R5XLINLC97ZQFF7EP91Y/Diktator_web.jpg",
  },
  {
    title: "Køyrerampe",
    href: "/andre-produkter/kjlerampe",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228933067-LHLZ30AMNKXNVOYEUTGA/rampe1+copy.jpg",
  },
  {
    title: "Beslag",
    href: "/andre-produkter/beslag",
    lastmod: "2023-08-28",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228943559-L0SXG2I29YLNU5JDWJP5/profil1+copy.jpg",
  },
  {
    title: "Standard dører",
    href: "/andre-produkter/2014/7/9/standard-drer",
    lastmod: "2024-01-05",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228959146-O18ZOPO4ZJZA3KCU13SL/dor_ny.jpg",
  },
  {
    title: "Skipsdører",
    href: "/andre-produkter/2014/7/9/skipsdrer",
    lastmod: "2024-10-02",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694429912105-GUXVAQLQO6L6XRSJ0NYV/Skipsd%C3%B8r+Fresvik+Produkt.jpg",
  },
  {
    title: "Industri slagdør",
    href: "/andre-produkter/2014/7/9/industri-slagdor",
    lastmod: "2025-01-20",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694429948521-DGRCHMLC0A18PBW3X2E0/Industri+slagd%C3%B8r+Fresvik+Produkt.jpg",
  },
];

export const oldSiteSupportPages: MigratedListItem[] = [
  {
    title: "Kjølerom og fryserom butikk",
    href: "/kjolerom-fryserom-butikk",
    lastmod: "2026-02-04",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/e6cfec2d-4a38-4f29-be2c-653e5ba2d797/Coop+Extra+Sogndal.jpeg",
  },
  {
    title: "Kjølerom og fryserom offshore",
    href: "/kjolerom-fryserom-offshore",
    lastmod: "2026-02-24",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694429051200-R0UVYZO6J6WM4KZN512O/image-asset.jpeg",
  },
  {
    title: "Kjølerom og fryserom storkjøkken",
    href: "/kjolerom-fryserom-storkjokken",
    lastmod: "2026-02-04",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694500125082-6JC19LMQZ08K1B9WF07S/image-asset.jpeg",
  },
  {
    title: "Transportskade",
    href: "/transportskade",
    lastmod: "2026-02-04",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/028353e9-eb2c-4f44-9fab-f6f895bb2476/Transportskade+Fresvik+Produkt.jpg",
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
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/6462fe9f-f6d3-4ea6-ba4c-7e1e22feaaa6/Lars-Erling-Livrud.jpeg",
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
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/3b7cf69c-95a8-4c92-bc6a-e8e78147c29b/Frode-Winther.jpg",
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
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/93b9ca60-337d-4e73-b309-95730a7b81fa/Arne-Olav-Lien-Bard%C3%B8lsga%CC%8Ard.jpg",
    imageAlt: "Arne-Olav Lien Bardølsgård, sal avdeling Fresvik.",
  },
  {
    title: "Ove Fedje",
    role: "Teknisk teikning og sal skip/offshore",
    href: "/tilsette",
    mobile: "911 76 599",
    email: "ovefed@fresvik.no",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/8cb3117f-86e2-4a0a-b333-5722d9c1946a/Ove+Fedje.jpeg",
    imageAlt: "Ove Fedje, teknisk teikning og sal skip/offshore.",
  },
  {
    title: "Tomas Kruvelis",
    role: "Delesal/innkjøp",
    href: "/tilsette",
    mobile: "465 81 422",
    email: "tomkru@fresvik.no",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/dbba98a8-e809-46c8-b875-ce3ef3aee28a/Tomas-Kruvelis.jpg",
    imageAlt: "Tomas Kruvelis, delesal og innkjøp.",
  },
  {
    title: "Gyda Bøtun",
    role: "Adm dir",
    href: "/tilsette",
    mobile: "992 27 516",
    email: "gydbot@fresvik.no",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/61ebde5c-0774-4dc1-92c8-4ed21efb4114/Gyda+B%C3%B8thun.jpeg",
    imageAlt: "Gyda Bøtun, administrerande direktør.",
  },
  {
    title: "Sigmund Hauglum",
    role: "Lager og logistikk",
    href: "/tilsette",
    mobile: "954 68 212",
    email: "sighau@fresvik.no",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/b8b854bc-2ce5-4194-beff-1f375dec6407/Sigmund+Hauglum.jpg",
    imageAlt: "Sigmund Hauglum, lager og logistikk.",
  },
  {
    title: "Siv Settevik",
    role: "Produksjonsleiar",
    href: "/tilsette",
    mobile: "416 60 685",
    email: "sivset@fresvik.no",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/573f8aab-6b3e-4c90-86e0-797986364f58/Siv+Settevik.jpeg",
    imageAlt: "Siv Settevik, produksjonsleiar.",
  },
  {
    title: "Håvard Berdal",
    role: "Teknisk teikning",
    href: "/tilsette",
    mobile: "909 12 476",
    email: "havber@fresvik.no",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/dc41dc96-71bb-4347-b2f8-bf0658a7d73e/Ha%CC%8Avard+Berdal.jpg",
    imageAlt: "Håvard Berdal, teknisk teikning.",
  },
  {
    title: "Oddrun Time",
    role: "Administrasjonskoordinator",
    href: "/tilsette",
    mobile: "907 46 651",
    email: "oddtim@fresvik.no",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/dff2816f-bc5c-43f7-a06b-91c0427e1f50/Oddrun+Time.jpeg",
    imageAlt: "Oddrun Time, administrasjonskoordinator.",
  },
  {
    title: "Siri Otterhjell",
    role: "Transportansvarleg",
    href: "/tilsette",
    mobile: "977 72 856",
    email: "sirott@fresvik.no",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/a7e012d5-b583-472d-85c0-a3d3eb0d24aa/Siri+Otterhjell.jpeg",
    imageAlt: "Siri Otterhjell, transportansvarleg.",
  },
  {
    title: "Ragnvald Grov Sørdal",
    role: "Lønnsansvarleg",
    href: "/tilsette",
    mobile: "909 77 331",
    email: "ragsor@fresvik.no",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/425b8a7b-7d36-4709-b058-61a730bd2e74/Ragnvald+Grov+S%C3%B8rdal.jpeg",
    imageAlt: "Ragnvald Grov Sørdal, lønnsansvarleg.",
  },
  {
    title: "Nils Gunnar Finne",
    role: "Produktutvikling",
    href: "/tilsette",
    mobile: "915 13 117",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/cf2c17a5-1e90-4ab0-96e9-0d4052afeb4a/Nils+Gunnar+Finne.jpeg",
    imageAlt: "Nils Gunnar Finne, produktutvikling.",
  },
  {
    title: "Samaneh Shakeri",
    role: "Teknisk sjef",
    href: "/tilsette",
    mobile: "480 98 928",
    email: "samsha@fresvik.no",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/e6a1706c-a13b-41d3-8e62-479cbae3fa46/Samaneh+Shakeri.jpg",
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
