import { isLegacyRoute } from "@/data/legacyRoutes";
import {
  createLegacyContentPage,
  getContentPage,
  type ContentPage,
} from "@/data/pages";

const pageCopy: Record<
  string,
  {
    title: string;
    eyebrow: string;
    intro: string;
    description: string;
  }
> = {
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
    description:
      "Cold and freezer room doors from Fresvik Produkt.",
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
    intro:
      "Delivery, installation, service and spare parts for Fresvik projects.",
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
    intro:
      "Service, maintenance and spare parts after delivery.",
    description: "Service and spare parts from Fresvik Produkt.",
  },
  "/dokumentasjon": {
    title: "Documentation",
    eyebrow: "Documentation",
    intro:
      "Product sheets, installation guides, certificates and practical documentation.",
    description: "Documentation from Fresvik Produkt.",
  },
  "/referansar": {
    title: "References",
    eyebrow: "References",
    intro:
      "Selected projects and deliveries from Fresvik Produkt.",
    description: "Reference projects from Fresvik Produkt.",
  },
  "/om-oss": {
    title: "About Fresvik Produkt",
    eyebrow: "Company",
    intro:
      "Company information, employees, news and available positions.",
    description: "About Fresvik Produkt AS.",
  },
  "/kontakt": {
    title: "Contact Fresvik Produkt",
    eyebrow: "Contact",
    intro:
      "Contact Fresvik Produkt for sales, projects, service and technical clarification.",
    description: "Contact Fresvik Produkt.",
  },
};

function englishNotice(path: string) {
  return {
    title: "English content status",
    intro:
      "The English version is being prepared. The Norwegian source content is kept available until the approved English translation is complete.",
    items: [
      {
        title: "Norwegian source page",
        text: "Open the complete Norwegian page with migrated text, images, documents and links.",
        href: path,
      },
    ],
  };
}

export function getEnglishContentPage(path: string): ContentPage | null {
  const source = getContentPage(path) ?? (isLegacyRoute(path) ? createLegacyContentPage(path) : null);
  const copy = pageCopy[path];

  if (!source && !copy) return null;

  const base: ContentPage =
    source ??
    ({
      slug: path,
      title: copy?.title ?? "Fresvik Produkt",
      eyebrow: copy?.eyebrow ?? "Fresvik Produkt",
      intro: copy?.intro ?? "English content is being prepared.",
      description: copy?.description ?? "English content is being prepared.",
      pageType: "index",
      priority: "low",
      sourceUrl: `https://www.fresvik.no${path === "/" ? "" : path}`,
      cards: [],
      sections: [],
    } satisfies ContentPage);

  return {
    ...base,
    slug: path === "/" ? "/en" : `/en${path}`,
    title: copy?.title ?? base.title,
    eyebrow: copy?.eyebrow ?? "Fresvik Produkt",
    intro: copy?.intro ?? base.intro,
    description: copy?.description ?? base.description,
    cards: base.cards,
    sections: [englishNotice(path), ...base.sections],
    showMigrationDetails: false,
    suppressExtractCards: true,
  };
}
