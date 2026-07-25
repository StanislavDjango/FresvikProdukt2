import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { withStableSectionIdentities } from "../src/i18n/contentStructure.shared.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const routeMapPath = path.join(root, "src", "i18n", "routeMap.json");
const outputPath = path.join(
  root,
  "sanity",
  "seed",
  "migratedContent.en.ndjson",
);
const sourceSeedPath = path.join(
  root,
  "sanity",
  "seed",
  "migratedContent.ndjson",
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
  return portableTextBlocks([text], "english-translation-status");
}

function portableTextBlocks(paragraphs, keyPrefix = "english-body") {
  return paragraphs.map((text, index) => ({
    _type: "block",
    _key: `${keyPrefix}-${index}`,
    style: "normal",
    children: [
      {
        _type: "span",
        _key: `${keyPrefix}-${index}-span`,
        text,
      },
    ],
  }));
}

function sectionBlock(section, sectionIndex) {
  return {
    _type: "migrationSection",
    _key: `${idSafe(section.title)}-${sectionIndex}`,
    title: section.title,
    intro: section.intro,
    items: section.items.map((item, itemIndex) => ({
      _type: "migrationCard",
      _key: `${idSafe(item.title)}-${sectionIndex}-${itemIndex}`,
      title: item.title,
      text: item.text,
      href: item.href,
    })),
  };
}

const priorityEnglishContent = {
  "/": {
    body: [
      "Fresvik Produkt is the only Norwegian producer of insulated panels for cold rooms and freezer rooms, with more than 45 years of experience.",
      "The company supplies panels, doors, gates, accessories, documentation and practical follow-up for refrigeration contractors, shops, food industry facilities, commercial kitchens, institutions, ships and offshore installations.",
      "Fresvik PIR Panel is a fire-safe panel solution with PIR foam, smart design and eccentric locks. Fresvik-panel is developed and produced in Norway, SINTEF approved, flexible on site and designed for efficient installation.",
    ],
    migrationSections: [
      {
        title: "Products and solutions",
        intro: "Selected products and solutions from Fresvik Produkt.",
        items: [
          {
            title: "Fresvik PIR Panel",
            text:
              "Fire-safe PIR foam panels with smart design, eccentric locks and SINTEF approval for modern cold and freezer rooms.",
            href: "/en/products/fresvik-pir-panel",
          },
          {
            title: "Fresvik-panel",
            text:
              "Developed and produced in Norway. Flexible on site, simple to install and designed to reduce waste and delivery time.",
            href: "/en/products/fresvik-pur-panel",
          },
          {
            title: "Cold and freezer room gates",
            text:
              "Gates for professional cold and freezer room projects, adapted to demanding commercial and industrial use.",
            href: "/en/products/cold-freezer-room-gates",
          },
          {
            title: "Cold and freezer room doors",
            text:
              "Insulated doors for cold and freezer rooms, produced for quality, reliable operation and fast delivery.",
            href: "/en/products/cold-freezer-doors",
          },
          {
            title: "Facade panels",
            text:
              "Exterior facade panels for warehouses, industrial buildings and food industry projects.",
            href: "/en/products/facade-panels",
          },
        ],
      },
      {
        title: "Customer areas",
        intro:
          "Fresvik builds tailored cold and freezer room solutions for several professional markets.",
        items: [
          {
            title: "Retail",
            text:
              "Market-leading cold and freezer room deliveries for grocery stores, service stations and convenience stores.",
            href: "/kjolerom-fryserom-butikk",
          },
          {
            title: "Ship and offshore",
            text:
              "Norwegian-produced polyurethane sandwich panels approved for maritime use according to DIN 4102-B2.",
            href: "/kjolerom-fryserom-offshore",
          },
          {
            title: "Commercial kitchens and institutions",
            text:
              "Cold rooms, freezer rooms and accessories for commercial kitchens and institutions throughout Norway.",
            href: "/kjolerom-fryserom-storkjokken",
          },
        ],
      },
      {
        title: "Contact",
        intro:
          "Contact Fresvik Produkt for product selection, documentation, technical clarification or a concrete offer.",
        items: [
          {
            title: "Fresvik Produkt AS",
            text:
              "Fresvikvegen 995, 6896 Fresvik. Tel: +47 57 69 83 00. Email: post@fresvik.no.",
            href: "mailto:post@fresvik.no",
          },
          {
            title: "Sales department Fresvik",
            text:
              "Arne-Olav Lien Bardølsgård. Mobile: +47 99 55 25 49. arnbar@fresvik.no.",
            href: "mailto:arnbar@fresvik.no",
          },
          {
            title: "Sales department Drammen",
            text:
              "Lars Erling Livrud. Mobile: +47 40 47 79 12. larliv@fresvik.no.",
            href: "mailto:larliv@fresvik.no",
          },
        ],
      },
    ],
  },
  "/produkt": {
    body: [
      "Fresvik Produkt develops and produces panels, doors, gates and accessories for cold rooms, freezer rooms and professional buildings.",
      "The Fresvik-panel is developed and produced in Norway, SINTEF approved, flexible on site, easy to install with eccentric locks and designed with module dimensions that reduce waste.",
    ],
    migrationSections: [
      {
        title: "Fresvik-panel",
        intro:
          "Developed and produced in Norway for professional cold and freezer room projects.",
        items: [
          {
            title: "Flexible on site",
            text:
              "A flexible module system makes the panels practical to adapt during construction and installation.",
          },
          {
            title: "Simple installation",
            text:
              "Eccentric locks make assembly efficient and help create tight, hygienic transitions.",
          },
          {
            title: "Reduced waste",
            text:
              "Module dimensions help reduce material waste and support short design, production and delivery times.",
          },
        ],
      },
      {
        title: "Product range",
        intro: "Core product pages in the Fresvik range.",
        items: [
          {
            title: "Fresvik PIR Panel",
            text:
              "Fire-safe insulated panels with PIR foam for cold and freezer rooms.",
            href: "/en/products/fresvik-pir-panel",
          },
          {
            title: "Cold and freezer room gates",
            text:
              "Sliding and hinged gates for cold and freezer rooms, warehouses and industrial buildings.",
            href: "/en/products/cold-freezer-room-gates",
          },
          {
            title: "Cold and freezer room doors",
            text:
              "Insulated door models adapted to different cold and freezer room applications.",
            href: "/en/products/cold-freezer-doors",
          },
          {
            title: "Facade panels",
            text:
              "Facade panels for warehouses, industrial buildings and food industry projects.",
            href: "/en/products/facade-panels",
          },
          {
            title: "Freezing tunnel",
            text:
              "Tailor-made freezing tunnels built with Fresvik panels and adapted doors.",
            href: "/en/products/freezing-tunnel",
          },
        ],
      },
    ],
  },
  "/produkt/fresvik-pir-panel": {
    body: [
      "Fresvik Produkt has produced cold rooms and freezer rooms since 1980 and is today the only Norwegian producer of insulated panels for cold rooms and freezer rooms.",
      "Fresvik cold rooms and freezer rooms are supplied with walls, floors, ceilings and doors or gates. The company’s size, combined with a clear commitment to flexible production solutions, makes it possible to supply customer-adapted solutions.",
      "Fresvik PIR Panel is a sandwich element with foamed PIR foam (polyisocyanurate foam) as the core, enclosed between two steel sheets. It is the first Norwegian producer of adapted PIR panels with a simple eccentric lock.",
    ],
    migrationSections: [
      {
        title: "Technical data",
        intro: "Key technical information for Fresvik PIR Panel.",
        items: [
          {
            title: "PIR foam core",
            text:
              "Fire class: B-s1,d0. Thickness: 75, 100, 125, 150 and 175 mm. Density: 43 (+/-3) kg/m3. Approximate weight: 14-18.5 kg/m2.",
          },
          {
            title: "U-value and temperature",
            text:
              "U-value/thermal transmittance: 0.14-0.29 W/(m2K). Temperature range: -40°C to +70°C.",
          },
          {
            title: "Construction",
            text:
              "Fresvik-panel is based on a flexible module system with eccentric locks in the transitions. The panels have a hygienic surface.",
          },
          {
            title: "Surface",
            text:
              "Standard surface in 0.55 mm galvanized steel sheet with 25 micrometre polyester, FoodSafe type. Stainless steel, acid-resistant steel, glass-fibre reinforced polyester and other sheet types can also be supplied.",
          },
        ],
      },
      {
        title: "Documents",
        intro: "Product sheets and installation guides connected to the PIR page.",
        items: [
          {
            title: "PIR Panel product sheet",
            text: "Product sheet for Fresvik PIR Panel.",
            href: "/assets/fresvik/documents/pir-panel.pdf",
          },
          {
            title: "PIR Panel installation guide",
            text: "Installation guide for Fresvik PIR panels.",
            href: "/assets/fresvik/documents/fp-pir-paneler-montasjeanvisning-nov-2025.pdf",
          },
          {
            title: "SINTEF Technical Approval TG 2135",
            text: "External SINTEF certification page for TG 2135.",
            href: "https://www.sintefcertification.no/Product/Index/129",
          },
        ],
      },
      {
        title: "Accessories",
        intro: "Related accessories linked from the old PIR page.",
        items: [
          {
            title: "Elebar valve",
            text: "Accessory for cold and freezer room projects.",
            href: "/andre-produkter/elebar-ventil",
          },
          {
            title: "MaxiElebar valve",
            text: "Valve solution for larger freezer rooms.",
            href: "/andre-produkter/maxielebar-ventil",
          },
          {
            title: "PEGO entrapment alarm",
            text: "Entrapment alarm with emergency alarm button.",
            href: "/andre-produkter/pego-innestengningsalarm",
          },
          {
            title: "Flashings",
            text: "Adapted flashings supplied as part of a complete delivery.",
            href: "/andre-produkter/beslag",
          },
        ],
      },
    ],
  },
  "/produkt/fresvik-pur-panel": {
    body: [
      "Fresvik PUR Panel is a sandwich element for cold rooms and freezer rooms, developed and produced in Norway.",
      "The panels are based on a flexible module system with eccentric locks in the transitions and a hygienic surface. The solution is practical on building sites and supports efficient design, production and delivery.",
      "PUR panels are made with high-pressure polyurethane foam, approximately 40-45 kg/m3, and meet current environmental requirements.",
    ],
    migrationSections: [
      {
        title: "Technical data",
        intro: "Key technical information for Fresvik PUR Panel.",
        items: [
          {
            title: "Core and thickness",
            text:
              "Sandwich element with foamed PUR foam core. Typical thicknesses include 75, 100, 125, 150 and 175 mm.",
          },
          {
            title: "Surface",
            text:
              "Standard surface in galvanized steel sheet with polyester coating, FoodSafe type. Other steel and sheet qualities can be supplied when required.",
          },
          {
            title: "Flexible dimensions",
            text:
              "Flexible room height in 50 mm steps up to 8000 mm, with flexible module widths in 300 mm steps.",
          },
        ],
      },
      {
        title: "Documents",
        intro: "Documents connected to Fresvik PUR Panel.",
        items: [
          {
            title: "PUR product sheet",
            text: "Product sheet for Fresvik PUR Panel.",
            href: "/assets/fresvik/documents/pur-produktbladfp.pdf",
          },
          {
            title: "PUR CE marking",
            text: "CE documentation for PUR panel.",
            href: "/assets/fresvik/documents/pur-ce-merke.pdf",
          },
        ],
      },
    ],
  },
  "/produkt/kjole-frysedorer": {
    body: [
      "Fresvik Produkt is a significant supplier of cold and freezer room doors. The company offers three models for different applications.",
      "All doors have a galvanized steel sheet surface with 25 micrometre polyester lacquer. The doors can be supplied in several versions depending on use, size and temperature requirements.",
      "Standard stock doors provide fast delivery. Fresvik keeps standard cold room doors with drag seals in stock, with common clear opening widths and standard height including the drag seal.",
    ],
    migrationSections: [
      {
        title: "Standard delivery",
        intro: "Elements included in the standard door delivery.",
        items: [
          {
            title: "Door leaf with gaskets",
            text:
              "Door leaf with gaskets mounted on a surface-mounted frame in 2 mm powder-coated galvanized steel.",
          },
          {
            title: "Heating cable for freezer doors",
            text:
              "Freezer room doors are delivered with a self-regulating heating cable, 230V, 16W/m.",
          },
          {
            title: "Lift hinges",
            text: "Lift hinges with pre-tensioning.",
          },
        ],
      },
      {
        title: "Door models",
        intro: "Door models linked from the original door page.",
        items: [
          {
            title: "Standard doors",
            text: "Standard cold and freezer room doors.",
            href: "/andre-produkter/2014/7/9/standard-drer",
          },
          {
            title: "Ship doors",
            text: "Door models for maritime applications.",
            href: "/andre-produkter/2014/7/9/skipsdrer",
          },
          {
            title: "Industrial hinged door",
            text: "Larger doors for industrial cold and freezer room use.",
            href: "/andre-produkter/2014/7/9/industri-slagdor",
          },
        ],
      },
    ],
  },
  "/produkt/kjole-fryseportar": {
    body: [
      "Fresvik Produkt has long experience producing cold and freezer room gates for the food industry, wholesale warehouses and storage buildings.",
      "Sliding gates are often exposed to heavy wear and are therefore built for reliable operation, good sealing and strong insulation. They can be supplied as manual or electric solutions and are produced to customer measurements.",
      "The gate leaf uses galvanized steel sheet with a polyester-lacquered FoodSafe surface. Freezer gates can be supplied with threshold and integrated self-regulating heating cable.",
    ],
    migrationSections: [
      {
        title: "Product information",
        intro: "Technical and practical information from the original gate page.",
        items: [
          {
            title: "Gate leaf",
            text:
              "Galvanized steel sheet with polyester-lacquered FoodSafe surface.",
          },
          {
            title: "Insulation",
            text:
              "Freezer: 100 and 125 mm foamed polyurethane, approx. 40 kg/m3. Cold room: 75 and 100 mm foamed polyurethane, approx. 40 kg/m3.",
          },
          {
            title: "Frame and sealing",
            text:
              "Surface-mounted seawater-resistant anodized aluminium frame. EPDM rubber gaskets and the lifting mechanism help provide good sealing.",
          },
          {
            title: "Extra options",
            text:
              "Automatic electric opening and closing, radio control, cylinder lock, and gate leaf or fittings in stainless steel.",
          },
        ],
      },
      {
        title: "Documents",
        intro: "Product sheet and installation documentation for Fresvik gates.",
        items: [
          {
            title: "Fresvik sliding gate product sheet",
            text: "Product sheet for Fresvik sliding gate.",
            href: "/assets/fresvik/documents/produktblad-fresvik-skyveport.pdf",
          },
          {
            title: "Manual gate installation guide",
            text: "Installation guide for manual Fresvik gate.",
            href: "/assets/fresvik/documents/fresvik-port-montasjeanvisning.pdf",
          },
          {
            title: "Electric gate documentation",
            text: "Documentation for electric control of Fresvik sliding gates.",
            href: "/en/documentation/electric-sliding-door",
          },
        ],
      },
    ],
  },
  "/tenester": {
    body: [
      "Fresvik Produkt provides practical project support through delivery, installation, service and spare parts.",
      "The services are connected to Fresvik’s panel, door, gate and accessory deliveries, so customers can get technical clarification and follow-up from the same supplier.",
    ],
    migrationSections: [
      {
        title: "Services",
        intro: "Main service areas from Fresvik Produkt.",
        items: [
          {
            title: "Installation",
            text:
              "Planning and professional installation of panels, facade panels, cold and freezer room gates, doors, windows and flashings.",
            href: "/en/services/installation",
          },
          {
            title: "Delivery",
            text:
              "Coordinated deliveries to projects with practical follow-up from Fresvik Produkt.",
            href: "/en/services/delivery",
          },
          {
            title: "Service and spare parts",
            text:
              "Help with service, replacement parts and follow-up after delivery.",
            href: "/en/services/service-spare-parts",
          },
        ],
      },
    ],
  },
  "/tenester/montasje": {
    body: [
      "Fresvik Produkt offers professional installation of insulated panels, facade panels and cold and freezer room gates.",
      "Installation is carried out in cooperation with experienced installers. Fresvik Produkt is centrally approved, documenting competence, experience and quality systems adapted to customers in the construction industry.",
      "Fresvik can install Fresvik panels for cold and freezer rooms, sandwich panels for facades, cold and freezer room gates, cold and freezer room doors, windows and flashings.",
    ],
    migrationSections: [
      {
        title: "Fresvik installs",
        intro: "Products and solutions covered by the installation service.",
        items: [
          {
            title: "Fresvik panels",
            text: "Fresvik panels for cold rooms and freezer rooms.",
            href: "/en/products/fresvik-pir-panel",
          },
          {
            title: "Facade sandwich panels",
            text: "Sandwich panels for facade projects.",
            href: "/en/products/facade-panels",
          },
          {
            title: "Cold and freezer room gates",
            text: "Installation of gate solutions for cold and freezer rooms.",
            href: "/en/products/cold-freezer-room-gates",
          },
          {
            title: "Cold and freezer room doors",
            text: "Installation of insulated door solutions.",
            href: "/en/products/cold-freezer-doors",
          },
          {
            title: "Flashings",
            text: "Adapted flashings installed as part of complete deliveries.",
            href: "/andre-produkter/beslag",
          },
        ],
      },
      {
        title: "Central approval",
        intro:
          "Central approval documents competence and routines for construction work.",
        items: [
          {
            title: "Competence and experience",
            text:
              "Fresvik has relevant competence and experience from the professional area.",
          },
          {
            title: "Quality assurance routines",
            text:
              "Documented quality routines support installation work and customer follow-up.",
          },
          {
            title: "Taxes and fees",
            text:
              "Central approval also documents that taxes and public fees are handled correctly.",
          },
          {
            title: "Central approval document",
            text: "Download the central approval document.",
            href: "/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf",
          },
        ],
      },
    ],
  },
  "/dokumentasjon": {
    body: [
      "Here you can find technical approvals, environmental documents, delivery terms, central approval documents and installation guides.",
      "The documentation page gathers the most important product documents in one place, so customers and partners can quickly find the correct PDF or external approval link.",
      "Contact Fresvik Produkt if you cannot find the documentation you need, or if you need help choosing the right product sheet, approval document or installation guide for a specific project.",
    ],
    migrationSections: [
      {
        title: "Documentation",
        intro: "Important document links from the documentation page.",
        items: [
          {
            title: "Environmental document",
            text: "Download environmental documentation.",
            href: "/assets/fresvik/documents/miljodokument-fresvik-produkt.pdf",
          },
          {
            title: "Performance certificate",
            text: "Download Fresvik PIR Panel CPR certificate.",
            href: "/assets/fresvik/documents/sintef-produktsertifikat-7060s.pdf",
          },
          {
            title: "Technical approval",
            text: "Download SINTEF Technical Approval.",
            href: "/assets/fresvik/documents/sintef-teknisk-godkjenning-2135g.pdf",
          },
          {
            title: "SINTEF approval page",
            text: "Open the SINTEF approval document page.",
            href: "https://sintefcertification.no/Product/Index/129",
          },
          {
            title: "Installation guides",
            text: "Open the installation guides page.",
            href: "/en/documentation/installation-guide",
          },
          {
            title: "Delivery terms",
            text: "Download Fresvik Produkt delivery terms.",
            href: "/assets/fresvik/documents/leveringsvilkar-fresvik-produkt-2023.pdf",
          },
        ],
      },
    ],
  },
  "/kontakt": {
    body: [
      "Contact Fresvik Produkt if you want to discuss a project, product selection, documentation, technical clarification or delivery planning.",
      "The company can be contacted at post@fresvik.no or by phone at +47 57 69 83 00.",
      "For sales and project follow-up, the contact information includes the Fresvik sales department and the Drammen sales contacts, so customers can reach the right person directly.",
    ],
    migrationSections: [
      {
        title: "Contact Fresvik Produkt",
        intro: "Main contact details and sales contacts.",
        items: [
          {
            title: "Fresvik Produkt AS",
            text:
              "Fresvikvegen 995, 6896 Fresvik. Tel: +47 57 69 83 00. Email: post@fresvik.no.",
            href: "mailto:post@fresvik.no",
          },
          {
            title: "Sales department Fresvik",
            text:
              "Arne-Olav Lien Bardølsgård. Mobile: +47 99 55 25 49. arnbar@fresvik.no.",
            href: "mailto:arnbar@fresvik.no",
          },
          {
            title: "Sales department Drammen",
            text:
              "Lars Erling Livrud. Mobile: +47 40 47 79 12. larliv@fresvik.no.",
            href: "mailto:larliv@fresvik.no",
          },
          {
            title: "Sales department Drammen",
            text:
              "Frode Winther. Mobile: +47 91 38 39 49. frowin@fresvik.no.",
            href: "mailto:frowin@fresvik.no",
          },
        ],
      },
    ],
  },
  "/produkt/fasadepanel": {
    body: [
      "Fresvik Produkt has long experience with buildings for the food industry and can supply exterior facade panels for warehouses and industrial buildings.",
      "The panels can be supplied with polyurethane foam or mineral wool as the core. Polyurethane foam panels are preferred where a low price and strong insulation properties are important.",
      "The facade panel solution highlights good energy economy, short construction time and good total project economy as key benefits.",
    ],
    migrationSections: [
      {
        title: "Facade panel benefits",
        intro: "Important facade panel benefits.",
        items: [
          {
            title: "Good energy economy",
            text: "Insulated panel solutions help reduce heat loss and support efficient building operation.",
          },
          {
            title: "Short construction time",
            text: "Panel-based construction can shorten the building process and simplify installation on site.",
          },
          {
            title: "Good total economy",
            text: "The combination of insulation performance, construction speed and price gives a strong overall project economy.",
          },
        ],
      },
      {
        title: "Panel core",
        intro: "Facade panels can be supplied with different cores depending on the project.",
        items: [
          {
            title: "Polyurethane core",
            text:
              "Polyurethane foam can be preferred because of price and strong insulation properties.",
          },
          {
            title: "Mineral wool core",
            text: "Mineral wool can also be supplied where that core is required for the building.",
          },
        ],
      },
      {
        title: "References",
        intro: "Reference links connected to the facade panel page.",
        items: [
          {
            title: "Celsa Steel Service, Sotra",
            text: "Reference project for facade panel deliveries.",
            href: "/referansar/celsa-steel-sotra",
          },
          {
            title: "Interfrukt",
            text: "Reference project for facade panel deliveries.",
            href: "/referansar/2014/7/8/interfrukt-vrt-strste-prosjekt",
          },
        ],
      },
    ],
  },
  "/produkt/frysetunnel": {
    body: [
      "Fresvik freezing tunnels are tailored to each production environment and are used where controlled freezing is important for product quality and capacity.",
      "The tunnel is built with custom PIR panels produced by Fresvik Produkt in Sogn. The panels are SINTEF approved, FoodSafe and available in several thicknesses.",
      "Doors, panel dimensions and technical details are adapted to the production line, hygiene requirements and the product flow in each project.",
    ],
    migrationSections: [
      {
        title: "Controlled freezing",
        intro: "The freezing tunnel is designed around the production process.",
        items: [
          {
            title: "Custom production flow",
            text:
              "The tunnel is adapted to the customer's production environment and freezing requirements.",
          },
          {
            title: "Product quality",
            text: "Controlled freezing supports stable product quality and predictable capacity.",
          },
        ],
      },
      {
        title: "Construction and use",
        intro: "Key construction points for the freezing tunnel solution.",
        items: [
          {
            title: "Custom PIR panels",
            text:
              "Fresvik PIR panels are produced in Sogn and can be supplied in thicknesses from 75 to 175 mm.",
          },
          {
            title: "Specially adapted doors",
            text: "Doors and openings can be adapted to the production equipment and room layout.",
          },
          {
            title: "Industrial use",
            text: "The solution is relevant for food production and other environments where rapid freezing is required.",
          },
        ],
      },
      {
        title: "References",
        intro: "Reference links connected to freezing tunnel projects.",
        items: [
          {
            title: "Spar Lund Torv",
            text: "Reference project connected to the freezing tunnel page.",
            href: "/referansar/historisk-leveranse-pir-panel-spar-lund-torv",
          },
          {
            title: "Baza Fredrikstad",
            text: "Reference project connected to the freezing tunnel page.",
            href: "/referansar/fryserom-baza-fredrikstad",
          },
        ],
      },
    ],
  },
  "/tilleggsutstyr": {
    body: [
      "Fresvik Produkt supplies accessories, components and spare parts for cold rooms and freezer rooms.",
      "The page keeps practical product names and item numbers, so customers can identify the correct part when ordering or asking for advice.",
      "If you are unsure which accessory fits your room, contact Fresvik Produkt with the product name, item number or a photo of the part.",
    ],
    migrationSections: [
      {
        title: "Accessory item numbers",
        intro: "Examples of accessories for cold and freezer room deliveries.",
        items: [
          {
            title: "Door closer / Diktator 23001",
            text: "Accessory item number from the original page.",
          },
          {
            title: "Entrapment alarm 3069",
            text: "Alarm accessory for cold and freezer room safety.",
          },
          {
            title: "Self-closing hinge 24600",
            text: "Door hinge accessory preserved with its item number.",
          },
          {
            title: "Elbar pressure relief valve 30651",
            text: "Pressure relief valve for smaller freezer rooms.",
          },
          {
            title: "MaxiElbar pressure relief valve 30652",
            text: "Pressure relief valve for larger freezer rooms.",
          },
          {
            title: "Composite stainless automatic lock 24083",
            text: "Lock accessory listed on the original accessories page.",
          },
        ],
      },
      {
        title: "Contact for ordering",
        intro: "Use the contact details when you need help choosing parts.",
        items: [
          {
            title: "Fresvik Produkt",
            text: "Email post@fresvik.no or call +47 57 69 83 00.",
            href: "mailto:post@fresvik.no",
          },
        ],
      },
    ],
  },
  "/tenester/leveranse": {
    body: [
      "Fresvik Produkt focuses on delivery reliability for facade elements, standard cold and freezer rooms and custom cold and freezer room solutions.",
      "The customer should be able to know that the delivery arrives at the agreed time. The company delivers packages with the necessary parts, visibly labelled so installation can be handled efficiently.",
      "Installation guides are available from the website, so installers and customers can find practical guidance during the project.",
    ],
    migrationSections: [
      {
        title: "Delivery follow-up",
        intro: "Practical delivery points for Fresvik projects.",
        items: [
          {
            title: "Delivery reliability",
            text: "Fresvik Produkt emphasises predictable delivery at the right time.",
          },
          {
            title: "Complete packages",
            text: "Deliveries include the necessary parts for the agreed solution.",
          },
          {
            title: "Visible marking",
            text: "Packages are visibly labelled to make installation work easier.",
          },
          {
            title: "Installation guides online",
            text: "Mounting instructions can be downloaded from the website.",
            href: "/en/documentation/installation-guide",
          },
        ],
      },
    ],
  },
  "/tenester/service-reservedeler": {
    body: [
      "If something goes wrong, Fresvik Produkt can help with service and spare parts.",
      "The company keeps spare parts for doors and gates in stock and can deliver specific parts when customers need quick replacement.",
      "Together with partners and its own spare-part stock, Fresvik Produkt can keep delivery times short when urgent service needs arise.",
    ],
    migrationSections: [
      {
        title: "Service and spare parts",
        intro: "Support points for service and spare parts.",
        items: [
          {
            title: "Spare parts in stock",
            text: "Fresvik Produkt stocks spare parts for doors and gates.",
          },
          {
            title: "Fast delivery",
            text: "Spare-part stock and partners help reduce delivery time when parts are needed quickly.",
          },
          {
            title: "Service request",
            text: "Contact Fresvik Produkt with details about the product and the part you need.",
            href: "/en/contact",
          },
        ],
      },
    ],
  },
  "/monteringsanvisning": {
    body: [
      "This page gathers installation guides for Fresvik Produkt products.",
      "The document links collect installation guides and product documentation in one place. Some PDFs may be available only in Norwegian.",
      "Use the guide that matches the product: freezer room, cold room, door, gate or electrical gate control.",
    ],
    migrationSections: [
      {
        title: "Installation guides",
        intro: "Installation and product document links.",
        items: [
          {
            title: "Freezer room installation guide",
            text: "PDF document.",
            href: "/assets/fresvik/documents/fresvik-fryserom-montasjeanvisning.pdf",
          },
          {
            title: "Gate installation guide",
            text: "PDF document.",
            href: "/assets/fresvik/documents/fresvik-port-montasjeanvisning.pdf",
          },
          {
            title: "Cold room installation guide",
            text: "PDF document.",
            href: "/assets/fresvik/documents/fresvik-kjolerom-montasjeanvisning.pdf",
          },
          {
            title: "Electric gate guide",
            text: "Open the electric sliding gate documentation page.",
            href: "/en/documentation/electric-sliding-door",
          },
          {
            title: "Door installation guide",
            text: "PDF document.",
            href: "/assets/fresvik/documents/fresvik-dor-montasjeanvisning.pdf",
          },
        ],
      },
    ],
  },
  "/monteringsanvisningar-fresvik-skyveport": {
    body: [
      "This page gathers documentation for electrical control of the Fresvik sliding gate.",
      "This page includes wiring diagrams, Fermod 5010 installation guides, a quick start document, direction-change instructions and options or kit documentation.",
      "The document links gather practical files for installation and configuration.",
    ],
    migrationSections: [
      {
        title: "Electric sliding gate files",
        intro: "Sliding gate document links.",
        items: [
          {
            title: "Fermod 5010 wiring diagram",
            text: "PDF document.",
            href: "/assets/fresvik/documents/koblingsskjema-fermod-5010.pdf",
          },
          {
            title: "Installation guide 5010 for 2150",
            text: "PDF document.",
            href: "/assets/fresvik/documents/montasjeanvisning-5010-for-2150.pdf",
          },
          {
            title: "Installation guide 5010 for 3530/7530",
            text: "PDF document.",
            href: "/assets/fresvik/documents/montasjeanvisning-5010-for-3530-og-7530.pdf",
          },
          {
            title: "Quick Start 5010 EXP",
            text: "PDF document.",
            href: "/assets/fresvik/documents/quick-start-5010exp.pdf",
          },
          {
            title: "Change sliding direction",
            text: "PDF document.",
            href: "/assets/fresvik/documents/endre-skyveretning.pdf",
          },
          {
            title: "Accessories and option kits",
            text: "PDF document.",
            href: "/assets/fresvik/documents/tilleggsutstyr-nmoptions-kits5010exp.pdf",
          },
        ],
      },
    ],
  },
  "/kundeservice/faq": {
    body: [
      "The FAQ page answers practical questions about PIR and PUR panels, doors, gates, PVC curtains, dimensions, temperature ranges and custom production.",
      "The FAQ gives practical answers about panel types, insulation values, dimensions, accessories and installation.",
      "Contact Fresvik Produkt if a project requires exact technical clarification, certification references or product-specific advice.",
    ],
    migrationSections: [
      {
        title: "Frequently asked questions",
        intro: "Practical FAQ answers.",
        items: [
          {
            title: "What is the main difference between PIR and PUR panels?",
            text:
              "The main difference is fire performance. PIR has better fire resistance and lower smoke development, while both materials provide good insulation.",
          },
          {
            title: "When should PIR panels be preferred?",
            text:
              "PIR is often preferred where fire requirements, insurance requirements, large cold or freezer warehouses, industrial buildings or high-value stored goods make fire performance especially important.",
          },
          {
            title: "Why can the U-value be similar while fire performance differs?",
            text:
              "PIR has higher thermal stability and protects the surface better during fire, even when the insulation value is close to PUR.",
          },
          {
            title: "Do PIR and PUR panels use the same locking mechanism?",
            text:
              "PIR and PUR panels use the same design and locking principle in joints and corners.",
          },
          {
            title: "What is a PVC curtain used for?",
            text:
              "Flexible PVC strips can be mounted in openings to reduce heat loss and draught, stabilise temperature and improve comfort.",
          },
          {
            title: "What is the difference between cold room and freezer room doors?",
            text:
              "Freezer room doors normally include heating cable in the frame and are adapted for lower temperatures.",
          },
          {
            title: "How do PIR and PUR compare in weight and density?",
            text:
              "PUR is about 40 kg/m3 and PIR about 42 kg/m3, with PIR panels slightly heavier per square metre.",
          },
          {
            title: "Can PIR be used at the same temperatures as PUR?",
            text:
              "PIR panels are specified for -40°C to +70°C, while PUR panels are specified for -40°C to +120°C.",
          },
          {
            title: "Can Fresvik deliver custom dimensions?",
            text:
              "Yes. Fresvik Produkt supplies standard and customised solutions, with dimensions adapted to the customer's project.",
          },
        ],
      },
    ],
  },
  "/referansar": {
    body: [
      "Fresvik Produkt delivers cold rooms, freezer rooms, doors, gates and facade panel solutions for food production, retail, institutions, commercial kitchens, laboratories, ships and offshore installations.",
      "The reference overview shows selected projects where Fresvik Produkt has delivered tailored solutions with an emphasis on delivery reliability, quality and practical installation.",
      "The references overview presents selected projects and delivery areas from Fresvik Produkt.",
    ],
    migrationSections: [
      {
        title: "Reference overview",
        intro: "Selected reference projects.",
        items: [
          {
            title: "Coop Extra Sogndal",
            text:
              "Fresvik Produkt delivered and installed cold and freezer rooms for the entire Coop Extra Sogndal store, with about 800 m2 of panels.",
            href: "/referansar/2014/7/8/coop-extra-sogndal",
          },
          {
            title: "Interfrukt",
            text:
              "Fresvik Produkt supplied 16,500 m2 of cold and freezer panels for Interfrukt SA at Langhus in Ski municipality.",
            href: "/referansar/2014/7/8/interfrukt-vrt-strste-prosjekt",
          },
          {
            title: "Baza Fredrikstad",
            text:
              "A tailored freezer room for Baza Nordic in Fredrikstad, developed for efficient and reliable frozen-goods storage.",
            href: "/referansar/fryserom-baza-fredrikstad",
          },
          {
            title: "Spar Lund Torv",
            text:
              "A historic PIR delivery with a new freezer room, three cold rooms, dividing walls, alarm, PVC curtain and swing doors.",
            href: "/referansar/historisk-leveranse-pir-panel-spar-lund-torv",
          },
          {
            title: "Celsa Steel Service, Sotra",
            text:
              "Fresvik delivered and installed facade panels with mineral wool core, flashing and windows for a new production facility.",
            href: "/referansar/celsa-steel-sotra",
          },
        ],
      },
      {
        title: "Reference categories",
        intro: "Main project categories from the Norwegian overview.",
        items: [
          {
            title: "Retail cold and freezer rooms",
            text: "Projects for grocery stores, energy stations and kiosk environments.",
          },
          {
            title: "Commercial kitchens and restaurants",
            text: "Cold and freezer rooms for kitchens, restaurants and institutions.",
          },
          {
            title: "Facade panels",
            text: "Exterior panel deliveries for industrial and warehouse buildings.",
          },
        ],
      },
    ],
  },
  "/om-oss": {
    body: [
      "Fresvik Produkt combines Norwegian production, experienced specialists and documented solutions for cold rooms and freezer rooms.",
      "The about page points visitors onward to company information, employees, news and available positions, while keeping Fresvik Produkt's production and expertise as the main context.",
      "The about section guides visitors to company information, employees, news and available positions while keeping production and expertise in focus.",
    ],
    migrationSections: [
      {
        title: "About Fresvik Produkt",
        intro: "Company context and practical links.",
        items: [
          {
            title: "Norwegian production",
            text: "Fresvik Produkt produces insulated panels, doors and gates for cold and freezer rooms in Norway.",
          },
          {
            title: "Documented solutions",
            text: "The company presents product documentation, certificates and installation guides as part of the customer follow-up.",
            href: "/en/documentation",
          },
          {
            title: "Contact points",
            text: "Customers can find company details, employees and contact information through the about section.",
            href: "/en/contact",
          },
        ],
      },
      {
        title: "Further information",
        intro: "Useful company links gathered in one place.",
        items: [
          {
            title: "Company information",
            text: "Company facts, contact points and key information about Fresvik Produkt.",
            href: "/en/about/company-info",
          },
          {
            title: "Employees",
            text: "Overview of contact persons and departments.",
            href: "/en/about/employees",
          },
          {
            title: "News",
            text: "News and updates from Fresvik Produkt.",
            href: "/en/about/news",
          },
          {
            title: "Careers",
            text: "Information about current vacancies and the application process.",
            href: "/en/about/careers",
          },
        ],
      },
    ],
  },
  "/firmainfo": {
    body: [
      "Fresvik Produkt is a Norwegian producer of insulated panels, doors and gates for cold rooms and freezer rooms, with production in Fresvik in Sogn.",
      "The company presents itself as the only Norwegian producer of insulated panels, doors and gates for cold and freezer rooms, with a strong position in grocery stores, energy stations and convenience retail.",
      "Company facts, contact details and legal identifiers are presented clearly for customers and partners.",
    ],
    migrationSections: [
      {
        title: "Company facts",
        intro: "Key company information.",
        items: [
          {
            title: "Norwegian producer",
            text: "Fresvik Produkt produces insulated panels, doors and gates for cold and freezer rooms.",
          },
          {
            title: "Production in Fresvik",
            text: "Production in Fresvik in Sogn supports short-travelled products and delivery reliability.",
          },
          {
            title: "Head office and sales office",
            text: "The head office and production facility are in Fresvik, with a sales office in Drammen.",
          },
          {
            title: "Organisation number",
            text: "NO 922 582 270.",
          },
        ],
      },
      {
        title: "Expertise and cooperation",
        intro: "Business positioning.",
        items: [
          {
            title: "Partner for refrigeration contractors",
            text: "The company aims to be a strong cooperation partner for refrigeration contractors.",
          },
          {
            title: "Flexible production",
            text:
              "Flexible production solutions make it possible to supply customised solutions with reduced waste on the building site.",
          },
          {
            title: "Eccentric lock installation",
            text: "Insulated panels are supplied with eccentric locks for quick and simple installation.",
          },
        ],
      },
    ],
  },
  "/tilsette": {
    body: [
      "The employees page gives customers and partners an overview of contact persons and departments at Fresvik Produkt.",
      "Names, phone numbers and email addresses are kept clear so visitors can contact the right person directly.",
      "The page helps customers and partners find the right contact person or department.",
    ],
    migrationSections: [
      {
        title: "Employee contact overview",
        intro: "Use the page to find the right contact person or department.",
        items: [
          {
            title: "Sales department Fresvik",
            text: "Contact point for sales and project follow-up in Fresvik.",
            href: "mailto:post@fresvik.no",
          },
          {
            title: "Sales department Drammen",
            text: "Contact point for sales and project follow-up in Drammen.",
            href: "mailto:post@fresvik.no",
          },
          {
            title: "Main switchboard",
            text: "Call +47 57 69 83 00 or email post@fresvik.no if you are unsure who to contact.",
            href: "mailto:post@fresvik.no",
          },
        ],
      },
      {
        title: "Contact detail guidance",
        intro: "Contact details and department labels.",
        items: [
          {
            title: "Names",
            text: "Employee names are shown as contact details.",
          },
          {
            title: "Contact details",
            text: "Phone numbers and email addresses make it easy to reach the right department.",
          },
          {
            title: "Department labels",
            text: "Department labels help visitors choose the correct contact point.",
          },
        ],
      },
    ],
  },
  "/aktuelt": {
    body: [
      "The news page gathers updates from Fresvik Produkt, including employee news, company updates, project stories and trade-fair participation.",
      "The news overview presents selected company updates, project news and employee stories.",
      "Visitors can follow selected updates from Fresvik Produkt and continue to the relevant articles for more detail.",
    ],
    migrationSections: [
      {
        title: "News overview",
        intro: "Selected news items.",
        items: [
          {
            title: "Meet our new technical manager",
            text: "Company update about a new technical manager joining Fresvik Produkt.",
          },
          {
            title: "New technical drafter in place",
            text: "Company update about a new technical drafter joining the office.",
          },
          {
            title: "John Bøthun retires",
            text: "News item about a long-serving employee retiring from Fresvik Produkt.",
          },
          {
            title: "Fresvik Produkt at Nor-Fishing",
            text: "Trade-fair news item.",
          },
        ],
      },
      {
        title: "What you will find",
        intro: "News content and company updates.",
        items: [
          {
            title: "Company updates",
            text: "Updates about people, production, certification and daily work at Fresvik Produkt.",
          },
          {
            title: "Projects and deliveries",
            text: "Stories connected to cold rooms, freezer rooms, products and customer deliveries.",
          },
          {
            title: "Trade fairs and events",
            text: "News from industry events, exhibitions and other places where Fresvik Produkt meets customers and partners.",
          },
        ],
      },
    ],
  },
  "/stillingledig": {
    body: [
      "Fresvik Produkt AS is looking for a proactive salesperson who can build strong customer relationships and combine commercial work with technical understanding.",
      "Since 1980, Fresvik Produkt has worked with insulation elements, doors and gates for cold rooms and freezer rooms. The company presents itself as Norway's only producer in this market and as a supplier of tailored, durable solutions for everyday use.",
      "The position can be based in Drammen or Fresvik. Applications should be sent to ts@personalhuset.no and marked \"Sales position\". Questions can be directed to Thomas Skogheim on +47 95 76 12 19.",
    ],
    migrationSections: [
      {
        title: "Available position",
        intro: "Current vacancy information.",
        items: [
          {
            title: "Role",
            text: "Fresvik Produkt is looking for a salesperson who can develop customer relationships and support technical dialogue with customers.",
          },
          {
            title: "Workplace",
            text: "The position can be based in Drammen or Fresvik, depending on the candidate.",
          },
          {
            title: "Tasks",
            text: "The role includes proactive work with new and existing customers, trade fairs, new markets, quotations and project-phase advice.",
          },
          {
            title: "Application",
            text: "Send the application to ts@personalhuset.no and mark it \"Sales position\".",
          },
        ],
      },
      {
        title: "Workplace and contact",
        intro: "Workplace and application information.",
        items: [
          {
            title: "What Fresvik offers",
            text: "The page highlights a stable workplace, an informal and inclusive working environment, and good insurance and pension arrangements.",
          },
          {
            title: "Who they are looking for",
            text: "Fresvik is looking for a structured relationship builder with technical understanding, good attitude, willingness to learn and fluent Norwegian.",
          },
          {
            title: "Contact person",
            text: "Questions can be directed to Thomas Skogheim by phone at +47 95 76 12 19.",
          },
          {
            title: "Fresvik as a place",
            text: "Fresvik is described as an active agricultural village by the fjord, with a safe upbringing environment, organisations, music festival, industry and outdoor life.",
          },
        ],
      },
    ],
  },
  "/personvernerklering": {
    body: [
      "This privacy policy explains how Fresvik Produkt handles personal data for website visitors, customers and contacts.",
      "Fresvik Produkt AS is identified as the owner of the website, with company address, email address and organisation number, and the policy describes how personal data is processed in customer relationships.",
      "The policy also covers disclosure to third parties, customer records, cookies, newsletter signup, contact forms, social sharing, access, correction, deletion and responsibility for processing personal data.",
    ],
    migrationSections: [
      {
        title: "Privacy policy",
        intro: "Main privacy topics.",
        items: [
          {
            title: "1. About Fresvik Produkt AS",
            text:
              "Website owner: Fresvik Produkt AS, Fresvikvegen 995, 6896 Fresvik. Email: post@fresvik.no. Organisation number: NO 922 582 270.",
          },
          {
            title: "2. Purpose of processing personal data",
            text:
              "Customer relationship data can include name, address, email, telephone number, organisation number and other necessary information used to manage the customer relationship.",
          },
          {
            title: "3. Disclosure to third parties",
            text:
              "Personal data is not disclosed to third parties unless there is a legal obligation to provide information to public authorities.",
          },
          {
            title: "4. Cookies and analytics",
            text:
              "Fresvik.no uses cookies. Cookies are standard internet technology and can be disabled in the browser, but that may affect how websites work.",
          },
          {
            title: "5. Customer register",
            text:
              "The customer register can contain customer name, address, telephone number, company name, contact persons and information about purchased services and products.",
          },
          {
            title: "6. Newsletter",
            text:
              "Newsletter signup stores name and email address so Fresvik Produkt AS can send relevant information. Mailchimp is used for email distribution.",
          },
          {
            title: "7. Contact forms",
            text:
              "Information submitted through contact forms is stored in the CRM system so Fresvik Produkt can provide better customer service.",
          },
          {
            title: "8. Social sharing",
            text:
              "Articles can be shared on social media. Further handling of data shared through social platforms is regulated by the user's agreement with the relevant platform.",
          },
          {
            title: "9. Access, correction and deletion",
            text:
              "Users may request access to registered information and ask for correction or deletion by contacting Fresvik Produkt AS at post@fresvik.no.",
          },
          {
            title: "10. Data controller",
            text:
              "The general manager of Fresvik Produkt AS is responsible for personal data processing and related internal controls.",
          },
        ],
      },
      {
        title: "Website privacy details",
        intro: "Practical privacy details.",
        items: [
          {
            title: "Cookies and analytics",
            text: "Cookie, analytics, newsletter and contact-form information explains how visitor and contact data is handled on the website.",
          },
          {
            title: "Rights",
            text: "Visitors and contacts can request access, correction or deletion of registered personal information.",
          },
          {
            title: "Company details",
            text: "Address, email and organisation number are listed with the company details.",
          },
        ],
      },
    ],
  },
  "/openheitslova": {
    body: [
      "The Norwegian Transparency Act promotes respect for fundamental human rights and decent working conditions, and gives the public access to information.",
      "Fresvik Produkt states that it is aware of this responsibility and continuously works to meet the requirements of the Act.",
      "Under section 5 of the Transparency Act, Fresvik Produkt publishes a statement. The available due diligence, routine and statement documents can be downloaded from the links below.",
    ],
    migrationSections: [
      {
        title: "Transparency Act",
        intro: "Transparency Act information.",
        items: [
          {
            title: "Company commitment",
            text:
              "Fresvik Produkt states that it continuously works to satisfy the requirements of the Transparency Act.",
          },
          {
            title: "Privacy policy",
            text: "See the privacy policy for how personal data is processed.",
            href: "/en/privacy-policy",
          },
          {
            title: "Read the Act",
            text:
              "The full Act is available on Lovdata under the Norwegian title 'Lov om virksomheters åpenhet og arbeid med grunnleggende menneskerettigheter og anstendige arbeidsforhold'.",
            href: "https://lovdata.no/dokument/NL/lov/2021-06-18-99",
          },
        ],
      },
      {
        title: "Documents and external sources",
        intro: "Transparency Act document links.",
        items: [
          {
            title: "Download due diligence assessment",
            text: "Due diligence assessment PDF for 2025.",
            href: "/assets/fresvik/documents/openheitslova-aktsemdvurderingar-2025.pdf",
          },
          {
            title: "Download routine for fulfilling obligations",
            text: "Routine document connected to Transparency Act obligations.",
            href: "/assets/fresvik/documents/openheitslova-rutine-plikter-2025.pdf",
          },
          {
            title: "Download statement 2025",
            text: "Signed Transparency Act statement for 2025.",
            href: "/assets/fresvik/documents/openheitslova-utgreiing-2025-signert.pdf",
          },
          {
            title: "Transparency Act on Lovdata",
            text: "External legal source.",
            href: "https://lovdata.no/dokument/NL/lov/2021-06-18-99",
          },
        ],
      },
      {
        title: "Compliance information",
        intro: "Transparency Act information and documents.",
        items: [
          {
            title: "Document set",
            text: "The available PDF files include due diligence, routines and the signed statement for 2025.",
          },
          {
            title: "Latest statement",
            text: "Transparency Act statements should be updated when new signed files are approved and available.",
          },
          {
            title: "Legal terminology",
            text: "The wording presents the Norwegian Transparency Act in practical English for website visitors.",
          },
        ],
      },
    ],
  },
};

function migrationSectionsFor(sourcePath) {
  const priorityContent = priorityEnglishContent[sourcePath];

  if (!priorityContent) {
    return withStableSectionIdentities([
      {
        _type: "migrationSection",
        _key: "english-page-support",
        title: "English page support",
        intro: "Contact Fresvik Produkt for more information about this topic.",
        items: [
          {
            _type: "migrationCard",
            _key: "contact-fresvik",
            title: "Contact Fresvik Produkt",
            text: "Contact Fresvik Produkt if you need information about this page.",
            href: sourcePath,
          },
        ],
      },
    ], sourcePath);
  }

  return withStableSectionIdentities(
    priorityContent.migrationSections.map(sectionBlock),
    sourcePath,
  );
}

const docs = Object.entries(englishCopy).map(([sourcePath, copy]) => {
  const englishPath = routeMap[sourcePath];
  if (!englishPath) {
    throw new Error(`Missing routeMap entry for ${sourcePath}`);
  }

  const type = typeForSourcePath(sourcePath);
  const slug = slugForEnglishPath(englishPath);

  const priorityContent = priorityEnglishContent[sourcePath];
  const body = priorityContent
    ? portableTextBlocks(priorityContent.body, `english-${idSafe(sourcePath)}`)
    : bodyBlock(
        "Contact Fresvik Produkt if you need information about this topic in English.",
      );

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
    body,
    migrationSections: migrationSectionsFor(sourcePath),
  };
});

const sourceDocs = fs
  .readFileSync(sourceSeedPath, "utf8")
  .split(/\n+/)
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => JSON.parse(line));
const sourceByUrl = new Map(
  sourceDocs
    .filter((doc) => doc.sourceUrl)
    .map((doc) => [doc.sourceUrl.replace(/\/$/, ""), doc]),
);

for (const doc of docs) {
  const sourceDoc = sourceByUrl.get(doc.sourceUrl.replace(/\/$/, ""));
  if (!sourceDoc?.migrationSections?.length) continue;

  const sourcePath = new URL(doc.sourceUrl).pathname || "/";
  const sourceSections = withStableSectionIdentities(
    sourceDoc.migrationSections,
    sourcePath,
  );
  const englishSections = withStableSectionIdentities(
    doc.migrationSections,
    sourcePath,
  );

  doc.migrationSections = englishSections.map((section) => {
    const sourceKindMatches = sourceSections.filter(
      (candidate) => candidate.kind === section.kind,
    );
    const englishKindMatches = englishSections.filter(
      (candidate) => candidate.kind === section.kind,
    );
    const sourceSection =
      sourceSections.find(
        (candidate) => candidate.translationKey === section.translationKey,
      ) ??
      (sourceKindMatches.length === 1 && englishKindMatches.length === 1
        ? sourceKindMatches[0]
        : undefined);

    return sourceSection
      ? {
          ...section,
          kind: sourceSection.kind,
          translationKey: sourceSection.translationKey,
        }
      : section;
  });
}

fs.writeFileSync(outputPath, `${docs.map((doc) => JSON.stringify(doc)).join("\n")}\n`);

console.log(`Wrote ${docs.length} English draft documents to ${path.relative(root, outputPath)}.`);
