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

function sourceReviewSection(sourcePath) {
  return {
    _type: "migrationSection",
    _key: "translation-review",
    title: "Translation review",
    intro:
      "Priority English draft prepared from migrated Norwegian content. Technical terms, certificates and legal wording must be reviewed before publishing.",
    items: [
      {
        _type: "migrationCard",
        _key: "norwegian-source",
        title: "Norwegian source page",
        text: "Use the Norwegian page as the source of truth while reviewing this English draft.",
        href: sourcePath,
      },
    ],
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
        intro:
          "Selected products and solutions from the original front page, translated for the English draft.",
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
            href: "/en/products/cold-freezer-ports",
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
            href: "/en/products/cold-freezer-ports",
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
        intro: "Key technical information from the migrated PIR page.",
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
        intro: "Key technical information from the migrated PUR panel content.",
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
            href: "/en/products/cold-freezer-ports",
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
      "The documentation page keeps the same practical purpose as the Norwegian source page: it gathers the most important product documents in one place, so customers and partners can quickly find the correct PDF or external approval link.",
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
      "For sales and project follow-up, the migrated contact information includes the Fresvik sales department and the Drammen sales contacts, so customers can reach the right person directly.",
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
};

function migrationSectionsFor(sourcePath) {
  const priorityContent = priorityEnglishContent[sourcePath];

  if (!priorityContent) {
    return [
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
    ];
  }

  return [
    ...priorityContent.migrationSections.map(sectionBlock),
    sourceReviewSection(sourcePath),
  ];
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
        "English translation draft. The Norwegian source page remains the approved complete content until this document is reviewed.",
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

fs.writeFileSync(outputPath, `${docs.map((doc) => JSON.stringify(doc)).join("\n")}\n`);

console.log(`Wrote ${docs.length} English draft documents to ${path.relative(root, outputPath)}.`);
