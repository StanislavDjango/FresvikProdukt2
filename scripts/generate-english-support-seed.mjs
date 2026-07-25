import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourcePath = path.join(root, "sanity", "seed", "migratedContent.ndjson");
const outputPath = path.join(root, "sanity", "seed", "migratedSupport.en.ndjson");

function readNdjson(filePath) {
  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`Invalid NDJSON at line ${index + 1}: ${error.message}`);
      }
    });
}

function idSafe(value) {
  return String(value)
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "item";
}

function englishId(doc) {
  return `drafts.en-${doc._type}-${idSafe(doc._id.replace(/^drafts\./, ""))}`;
}

function translationGroup(doc) {
  return `fresvik:${doc._type}:${doc._id.replace(/^drafts\./, "")}`;
}

function textFromBlocks(blocks = []) {
  return blocks
    .filter((block) => block._type === "block")
    .map((block) => (block.children || []).map((child) => child.text || "").join(""))
    .map((text) => text.trim())
    .filter(Boolean)
    .join("\n\n");
}

function portableText(paragraphs, keyPrefix) {
  return paragraphs.map((text, index) => ({
    _key: `${keyPrefix}-${index}`,
    _type: "block",
    style: "normal",
    children: [
      {
        _key: `${keyPrefix}-${index}-span`,
        _type: "span",
        text,
        marks: [],
      },
    ],
    markDefs: [],
  }));
}

const categoryMap = new Map([
  ["Produktdokumentasjon", "Product documentation"],
  ["Monteringsanvisning", "Installation guide"],
  ["Sertifikat", "Certificate"],
  ["Juridisk", "Legal"],
  ["Anna", "Other"],
  ["Kundeservice", "Customer service"],
]);

const documentTitleMap = new Map([
  ["Endre skyveretning", "Change sliding direction"],
  ["PIR-Paneler montasjeanvisning", "PIR panel installation guide"],
  ["Dør", "Door installation guide"],
  ["Fryserom", "Freezer room installation guide"],
  ["Kjølerom", "Cold room installation guide"],
  ["Monteringsanvisning manuell port", "Manual gate installation guide"],
  ["Koblingskjema Fermod 5010", "Fermod 5010 wiring diagram"],
  ["Levering", "Delivery terms"],
  ["Miljøfyrtårn", "Eco-Lighthouse documentation"],
  [
    "Montasjeanvisning for Fermod 5010 på manuelt beslag 2150",
    "Installation guide for Fermod 5010 on manual fitting 2150",
  ],
  [
    "Montasjeanvisning for Fermod 5010 på manuelt beslag 3530 og 7530",
    "Installation guide for Fermod 5010 on manual fitting 3530 and 7530",
  ],
  [
    "PIR-Paneler montasjeanvisning (legacy duplicate)",
    "PIR panel installation guide (legacy duplicate)",
  ],
  ["PIR-Paneler produktblad", "PIR panel product sheet"],
  ["Produktblad Fresvik Skyveport", "Fresvik sliding gate product sheet"],
  ["CE", "CE marking"],
  ["Poly", "PUR product sheet"],
  ["Quick Start", "Quick start"],
  ["Sentral godkjent", "Central approval"],
  ["Samsvarssertifikat", "Certificate of conformity"],
  ["TG-2135", "TG 2135 technical approval"],
  ["Tilleggsutstyr", "Accessories"],
  ["Ytelseserklæring", "Declaration of performance"],
]);

const documentDescriptionMap = new Map([
  ["Endre skyveretning", "Guide for changing sliding direction."],
  ["PIR-Paneler montasjeanvisning", "Installation guide for Fresvik PIR panels."],
  ["Dør", "Download the door installation guide."],
  ["Fryserom", "Download the freezer room installation guide. Norwegian/English PDF."],
  ["Kjølerom", "Download the cold room installation guide. Norwegian/English PDF."],
  ["Monteringsanvisning manuell port", "Installation guide for manual sliding gate."],
  ["Koblingskjema Fermod 5010", "Wiring diagram for Fermod 5010."],
  ["Levering", "Download Fresvik Produkt delivery terms."],
  ["Miljøfyrtårn", "Eco-Lighthouse documentation from Fresvik Produkt."],
  [
    "Montasjeanvisning for Fermod 5010 på manuelt beslag 2150",
    "Installation guide for Fermod 5010 on manual fitting 2150.",
  ],
  [
    "Montasjeanvisning for Fermod 5010 på manuelt beslag 3530 og 7530",
    "Installation guide for Fermod 5010 on manual fitting 3530 and 7530.",
  ],
  [
    "PIR-Paneler montasjeanvisning (legacy duplicate)",
    "Legacy duplicate retained for traceability until final asset cleanup.",
  ],
  ["PIR-Paneler produktblad", "Product sheet for Fresvik PIR panels."],
  ["Produktblad Fresvik Skyveport", "Product sheet for Fresvik sliding gate."],
  ["CE", "CE documentation for Fresvik Produkt."],
  ["Poly", "Product documentation for Fresvik PUR panels."],
  ["Quick Start", "Quick start guide."],
  ["Sentral godkjent", "Central approval certificate."],
  ["Samsvarssertifikat", "Certificate of conformity for consistent performance."],
  ["TG-2135", "SINTEF technical approval TG 2135."],
  ["Tilleggsutstyr", "Accessory documentation."],
  ["Ytelseserklæring", "Download the declaration of performance."],
]);

const roleMap = new Map([
  ["Sal, avdeling Fresvik", "Sales, Fresvik department"],
  ["Sal, avdeling Drammen", "Sales, Drammen department"],
  ["Adm dir", "Managing director"],
  ["Teknisk teikning", "Technical drawing"],
  ["Sals- og marknadssjef", "Sales and marketing manager"],
  ["Produktutvikling", "Product development"],
  ["Administrasjonskoordinator", "Administration coordinator"],
  ["Teknisk teikning og sal skip/offshore", "Technical drawing and ship/offshore sales"],
  ["Lønnsansvarleg", "Payroll manager"],
  ["Teknisk sjef", "Technical manager"],
  ["Lager og logistikk", "Warehouse and logistics"],
  ["Transportansvarleg", "Transport manager"],
  ["Produksjonsleiar", "Production manager"],
  ["Delesal/innkjøp", "Parts sales/purchasing"],
]);

const faqMap = new Map([
  [
    "Kva er hovudforskjellen mellom PIR og PUR i kjøle- og fryserom?",
    {
      question: "What is the main difference between PIR and PUR in cold and freezer rooms?",
      answer:
        "The main difference is in the fire properties. PIR generally has better fire resistance and lower smoke development than PUR, while both materials have very good insulation properties.",
    },
  ],
  [
    "I kva prosjekt bør PIR føretrekkjast framfor PUR?",
    {
      question: "In which projects should PIR be preferred over PUR?",
      answer:
        "PIR should be preferred in projects where fire safety and risk reduction are especially important. This applies particularly to large cold and freezer stores, buildings with strict fire requirements, industrial and commercial buildings, projects where insurance companies have additional requirements, and facilities with high-value stored goods. If you are unsure which material is best, PIR is a safe choice because it provides extra fire safety while maintaining strong insulation performance.",
    },
  ],
  [
    "Kvifor har PIR-panel nesten same U-verdi som PUR-panel, men betre branneigenskapar?",
    {
      question: "Why does a PIR panel have almost the same U-value as a PUR panel, but better fire properties?",
      answer:
        "Although PIR and PUR panels have almost the same U-value, PIR has better fire properties because the foam reacts by protecting the surface during fire and has higher thermal stability. PIR insulates well, but tolerates heat and fire significantly better than PUR. This is why PIR achieves fire class B, while PUR has class C.",
    },
  ],
  [
    "Har PIR-panela låsemekanisme i skøytane og hjørna, slik som PUR-panela?",
    {
      question: "Do PIR panels have locking mechanisms in joints and corners, like PUR panels?",
      answer:
        "Fresvik PIR and PUR panels have the same design and the same locking mechanism in joints and corners.",
    },
  ],
  [
    "Kva er PVC-gardin, og når bør ein bruke PVC-gardiner i kjølerom eller fryserom?",
    {
      question: "What is a PVC curtain, and when should PVC curtains be used in cold rooms or freezer rooms?",
      answer:
        "PVC curtains are flexible PVC strips mounted in door openings to reduce heat loss and draught when the door is opened. They are often used in cold rooms and freezer rooms with frequent traffic. PVC curtains help reduce energy loss, maintain stable temperature, limit warm-air leakage and improve working comfort. For freezer rooms, low-temperature PVC is used. Fresvik supplies both fixed and sliding PVC curtains.",
    },
  ],
  [
    "Kva er forskjellen på ein kjøleromsdør og ein fryseromsdør?",
    {
      question: "What is the difference between a cold room door and a freezer room door?",
      answer:
        "For standard cold and freezer room doors, the main difference is that the freezer room door has a heating cable in the frame. For industrial doors, the difference is in insulation and construction: a cold room door is designed for moderate temperatures, while a freezer room door is built for low freezing temperatures with thicker insulation, double gaskets and a heating cable in the frame to prevent gaskets from freezing.",
    },
  ],
  [
    "Korleis er vekta/densiteten på PIR-panel samanlikna med PUR-panel?",
    {
      question: "How does the weight/density of PIR panels compare with PUR panels?",
      answer:
        "PUR panels have a density of 40 +/-2 kg/m3 and weigh approximately 13-17 kg/m2. PIR panels have a density of 42 +/-2 kg/m3 and weigh approximately 14-18.5 kg/m2.",
    },
  ],
  [
    "Kan PIR-panel brukast ved same temperaturar som PUR-panel?",
    {
      question: "Can PIR panels be used at the same temperatures as PUR panels?",
      answer:
        "PIR has a temperature range from -40 °C to +70 °C, while PUR tolerates -40 °C to +120 °C.",
    },
  ],
  [
    "Kan PIR-panela produserast i same storleik som PUR-panela?",
    {
      question: "Can PIR panels be produced in the same sizes as PUR panels?",
      answer:
        "Yes. Fresvik offers flexible room heights in 50 mm steps up to 8000 mm, with panel thicknesses of 75, 100, 125, 150 and 175 mm.",
    },
  ],
  [
    "Kan de produsere dører og portar med PIR-skum?",
    {
      question: "Can you produce doors and gates with PIR foam?",
      answer:
        "Yes. Fresvik supplies both doors and gates with PIR foam, using the same design as the PUR products.",
    },
  ],
  [
    "Kva er kjøleromspanel, og kva tjukkleik bør ein velje til kjøl og fryserom?",
    {
      question: "What are cold room panels, and which thickness should be chosen for cold and freezer rooms?",
      answer:
        "Cold room panels are insulated sandwich panels used for walls, ceilings and sometimes floors in cold and freezer rooms. The right thickness depends on room temperature and energy requirements. Cold rooms from 2 °C to 6 °C usually use 75-100 mm. Freezer rooms from 0 °C to -40 °C usually use 100-175 mm, depending on U-value and energy-efficiency requirements.",
    },
  ],
  [
    "Kan Fresvik Produkt levere kjøle- og fryserom på spesialmål eller for skreddarsydde prosjekt?",
    {
      question: "Can Fresvik Produkt deliver cold and freezer rooms to custom dimensions or tailor-made projects?",
      answer:
        "Yes. Fresvik Produkt delivers cold and freezer rooms adapted to each project. Panels and solutions can be produced to special dimensions so the room fits existing buildings, production premises or specific customer requirements. Solutions are adapted to special dimensions, technical requirements and larger or more complex facilities.",
    },
  ],
]);

function supportBase(doc) {
  return {
    _id: englishId(doc),
    _type: doc._type,
    language: "en",
    sourceLanguage: "nn",
    translationGroup: translationGroup(doc),
    translatedFrom: {
      _type: "reference",
      _ref: doc._id,
      _weak: true,
    },
  };
}

function translateDocumentFile(doc) {
  return {
    ...supportBase(doc),
    title: documentTitleMap.get(doc.title) || doc.title,
    category: categoryMap.get(doc.category) || doc.category,
    description:
      documentDescriptionMap.get(doc.title) ||
      doc.description ||
      "Document from Fresvik Produkt.",
    localPath: doc.localPath,
    externalUrl: doc.externalUrl,
  };
}

function translateFaqItem(doc) {
  const translated = faqMap.get(doc.question);
  if (!translated) {
    throw new Error(`Missing FAQ translation for: ${doc.question}`);
  }

  return {
    ...supportBase(doc),
    question: translated.question,
    answer: portableText([translated.answer], `en-${idSafe(doc._id)}-answer`),
    category: categoryMap.get(doc.category) || doc.category,
    order: doc.order,
  };
}

function translateEmployee(doc) {
  return {
    ...supportBase(doc),
    name: doc.name,
    role: roleMap.get(doc.role) || doc.role,
    location: doc.location,
    phone: doc.phone,
    email: doc.email,
    migratedImagePath: doc.migratedImagePath,
    order: doc.order,
  };
}

const sourceDocs = readNdjson(sourcePath);
const supportDocs = sourceDocs
  .filter((doc) => ["documentFile", "faqItem", "employee"].includes(doc._type))
  .map((doc) => {
    if (doc._type === "documentFile") return translateDocumentFile(doc);
    if (doc._type === "faqItem") return translateFaqItem(doc);
    return translateEmployee(doc);
  });

const ids = new Set();
for (const doc of supportDocs) {
  if (ids.has(doc._id)) throw new Error(`Duplicate support document id: ${doc._id}`);
  ids.add(doc._id);
}

fs.writeFileSync(outputPath, `${supportDocs.map((doc) => JSON.stringify(doc)).join("\n")}\n`);

const counts = supportDocs.reduce((acc, doc) => {
  acc[doc._type] = (acc[doc._type] || 0) + 1;
  return acc;
}, {});

console.log(`Wrote ${path.relative(root, outputPath)}`);
console.log(`Support documents: ${supportDocs.length}`);
console.log(`Types: ${JSON.stringify(counts)}`);
console.log(`FAQ answer source paragraphs read: ${sourceDocs.filter((doc) => doc._type === "faqItem").map((doc) => textFromBlocks(doc.answer).length).filter(Boolean).length}`);
