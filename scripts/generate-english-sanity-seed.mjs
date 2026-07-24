import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const routeMapPath = path.join(root, "src", "i18n", "routeMap.json");
const outputPath = path.join(
  root,
  "sanity",
  "seed",
  "migratedContent.en.ndjson",
);

const routeMap = JSON.parse(fs.readFileSync(routeMapPath, "utf8"));

const englishCopy = {
  "/": {
    title: "Norwegian cold and freezer room solutions",
    eyebrow: "Fresvik Produkt",
    intro:
      "Fresvik Produkt manufactures insulated panels, doors, gates and accessories for professional cold and freezer rooms.",
    description:
      "English overview of Fresvik Produkt, a Norwegian producer of insulated panels, doors, gates and accessories.",
  },
  "/produkt": {
    title: "Products and solutions",
    eyebrow: "Products",
    intro:
      "Insulated panels, doors, gates and accessories for cold rooms, freezer rooms and professional buildings.",
    description:
      "Product overview for Fresvik Produkt: PIR panels, PUR panels, doors, gates, facade panels and freezing tunnels.",
  },
  "/produkt/fresvik-pir-panel": {
    title: "Fresvik PIR Panel for cold and freezer rooms",
    eyebrow: "Product",
    intro:
      "Fire-safe insulated panels with PIR foam for modern cold and freezer room solutions.",
    description:
      "Fresvik PIR Panel with PIR foam core, developed and produced in Norway for cold and freezer rooms.",
  },
  "/produkt/fresvik-pur-panel": {
    title: "Fresvik PUR Panel for cold and freezer rooms",
    eyebrow: "Product",
    intro:
      "PUR sandwich panels with strong insulation performance for cold and freezer rooms.",
    description:
      "Fresvik PUR Panel for cold and freezer rooms, produced in Norway with flexible dimensions.",
  },
  "/produkt/kjole-fryseportar": {
    title: "Cold and freezer room gates",
    eyebrow: "Product",
    intro:
      "Sliding and hinged gates for cold and freezer rooms, warehouses and industrial buildings.",
    description:
      "Cold and freezer room gates from Fresvik Produkt for commercial and industrial use.",
  },
  "/produkt/kjole-frysedorer": {
    title: "Cold and freezer room doors",
    eyebrow: "Product",
    intro:
      "Insulated doors for cold and freezer rooms, adapted to professional use.",
    description: "Cold and freezer room doors from Fresvik Produkt.",
  },
  "/produkt/fasadepanel": {
    title: "Facade panels for warehouses and industrial buildings",
    eyebrow: "Product",
    intro:
      "Exterior facade panels for warehouses, industrial buildings and food industry projects.",
    description:
      "Facade panels from Fresvik Produkt for commercial and industrial buildings.",
  },
  "/produkt/frysetunnel": {
    title: "Freezing tunnel",
    eyebrow: "Product",
    intro:
      "Tailor-made freezing tunnels built with insulated panels and adapted doors.",
    description: "Freezing tunnel solutions from Fresvik Produkt.",
  },
  "/tilleggsutstyr": {
    title: "Accessories",
    eyebrow: "Accessories",
    intro:
      "Components and accessories that complete cold and freezer room deliveries.",
    description: "Accessories for Fresvik cold and freezer room solutions.",
  },
  "/tenester": {
    title: "Services",
    eyebrow: "Services",
    intro: "Delivery, installation, service and spare parts for Fresvik projects.",
    description: "Services from Fresvik Produkt.",
  },
  "/tenester/montasje": {
    title: "Installation",
    eyebrow: "Service",
    intro:
      "Professional installation of panels, doors, gates and related solutions.",
    description: "Installation services from Fresvik Produkt.",
  },
  "/tenester/leveranse": {
    title: "Delivery",
    eyebrow: "Service",
    intro:
      "Coordinated delivery to projects, with practical follow-up from Fresvik Produkt.",
    description: "Delivery services from Fresvik Produkt.",
  },
  "/tenester/service-reservedeler": {
    title: "Service and spare parts",
    eyebrow: "Service",
    intro: "Service, maintenance and spare parts after delivery.",
    description: "Service and spare parts from Fresvik Produkt.",
  },
  "/dokumentasjon": {
    title: "Documentation",
    eyebrow: "Documentation",
    intro:
      "Product sheets, installation guides, certificates and practical documentation.",
    description: "Documentation from Fresvik Produkt.",
  },
  "/monteringsanvisning": {
    title: "Installation guides",
    eyebrow: "Documentation",
    intro:
      "Installation guidance and practical documentation for Fresvik products.",
    description: "Installation guides from Fresvik Produkt.",
  },
  "/monteringsanvisningar-fresvik-skyveport": {
    title: "Electric sliding gate documentation",
    eyebrow: "Documentation",
    intro:
      "Documentation for electric control of Fresvik sliding gates.",
    description: "Electric sliding gate documentation from Fresvik Produkt.",
  },
  "/kundeservice/faq": {
    title: "Frequently asked questions",
    eyebrow: "Customer service",
    intro:
      "Answers to common questions about Fresvik products, documentation and deliveries.",
    description: "Frequently asked questions from Fresvik Produkt.",
  },
  "/referansar": {
    title: "References",
    eyebrow: "References",
    intro: "Selected projects and deliveries from Fresvik Produkt.",
    description: "Reference projects from Fresvik Produkt.",
  },
  "/aktuelt": {
    title: "News",
    eyebrow: "News",
    intro: "News, articles and updates from Fresvik Produkt.",
    description: "News and updates from Fresvik Produkt.",
  },
  "/om-oss": {
    title: "About Fresvik Produkt",
    eyebrow: "Company",
    intro: "Company information, employees, news and available positions.",
    description: "About Fresvik Produkt AS.",
  },
  "/firmainfo": {
    title: "Company information",
    eyebrow: "Company",
    intro: "Key company details for Fresvik Produkt AS.",
    description: "Company information for Fresvik Produkt AS.",
  },
  "/tilsette": {
    title: "Employees",
    eyebrow: "Company",
    intro: "Contact people and employees at Fresvik Produkt.",
    description: "Employees at Fresvik Produkt.",
  },
  "/stillingledig": {
    title: "Available positions",
    eyebrow: "Careers",
    intro: "Available positions and career information from Fresvik Produkt.",
    description: "Career information from Fresvik Produkt.",
  },
  "/kontakt": {
    title: "Contact Fresvik Produkt",
    eyebrow: "Contact",
    intro:
      "Contact Fresvik Produkt for sales, projects, service and technical clarification.",
    description: "Contact Fresvik Produkt.",
  },
  "/personvernerklering": {
    title: "Privacy policy",
    eyebrow: "Legal",
    intro: "Privacy information for visitors and contacts.",
    description: "Privacy policy for Fresvik Produkt.",
  },
  "/openheitslova": {
    title: "Transparency Act",
    eyebrow: "Legal",
    intro: "Information related to the Norwegian Transparency Act.",
    description: "Transparency Act information from Fresvik Produkt.",
  },
};

const typeByPrefix = [
  ["/produkt/", "product"],
  ["/tenester/", "service"],
  ["/referansar/", "referenceProject"],
  ["/aktuelt/", "newsArticle"],
];

function slugForEnglishPath(englishPath) {
  if (englishPath === "/") return "home";
  return englishPath.replace(/^\/+|\/+$/g, "");
}

function typeForSourcePath(sourcePath) {
  if (sourcePath === "/produkt") return "page";
  if (sourcePath === "/tenester") return "page";
  if (sourcePath === "/referansar") return "page";
  if (sourcePath === "/aktuelt") return "page";
  const match = typeByPrefix.find(([prefix]) => sourcePath.startsWith(prefix));
  return match?.[1] || "page";
}

function idSafe(value) {
  return value
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "home";
}

function bodyBlock(text) {
  return [
    {
      _type: "block",
      _key: "english-translation-status",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "english-translation-status-span",
          text,
        },
      ],
    },
  ];
}

const docs = Object.entries(englishCopy).map(([sourcePath, copy]) => {
  const englishPath = routeMap[sourcePath];
  if (!englishPath) {
    throw new Error(`Missing routeMap entry for ${sourcePath}`);
  }

  const type = typeForSourcePath(sourcePath);
  const slug = slugForEnglishPath(englishPath);

  return {
    _id: `drafts.${type}-en-${idSafe(sourcePath)}`,
    _type: type,
    title: copy.title,
    slug: { _type: "slug", current: slug },
    intro: copy.intro,
    seoTitle: copy.title,
    seoDescription: copy.description,
    language: "en",
    sourceLanguage: "nn",
    translationGroup: `fresvik:${idSafe(sourcePath)}`,
    sourceUrl: `https://www.fresvik.no${sourcePath === "/" ? "" : sourcePath}`,
    body: bodyBlock(
      "English translation draft. The Norwegian source page remains the approved complete content until this document is reviewed.",
    ),
    migrationSections: [
      {
        _type: "migrationSection",
        _key: "translation-status",
        title: "Translation status",
        intro:
          "Draft English document generated from the approved route map. Translate and review before publishing.",
        items: [
          {
            _type: "migrationCard",
            _key: "norwegian-source",
            title: "Norwegian source page",
            text: "Use this page as the source of truth for the English translation.",
            href: sourcePath,
          },
        ],
      },
    ],
  };
});

fs.writeFileSync(outputPath, `${docs.map((doc) => JSON.stringify(doc)).join("\n")}\n`);

console.log(`Wrote ${docs.length} English draft documents to ${path.relative(root, outputPath)}.`);
