import type { ContentSection } from "@/data/pages";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const sectionKinds: Array<[string, string[]]> = [
  ["products", ["produkt", "products", "produkt fra sanity", "products from sanity", "products and solutions"]],
  ["services", ["tenesteomrade", "tenester fra sanity", "services", "services from sanity"]],
  ["news", ["aktuelt", "nyheiter fra sanity", "news", "news from sanity"]],
  ["references", ["referansar", "referansar fra sanity", "references", "references from sanity"]],
  ["categories", ["kategoriar", "categories"]],
  ["documents", ["dokument", "dokumentasjon", "dokument fra sanity", "documentation", "documents from sanity"]],
  ["employees", ["tilsette fra sanity", "kontaktpersonar", "employees", "contact people"]],
  ["company-overview", ["vidare informasjon", "further information"]],
  ["company-info", ["om fresvik produkt", "about fresvik produkt"]],
  ["job-opening", ["ledig stilling", "ledig stilling fra gammal side", "available position", "available positions"]],
  ["legal-text", ["personverntekst", "personverntekst fra gammal side", "tekst fra gammal openheitslova side", "openheitslova", "privacy text", "transparency act"]],
  ["legal-documents", ["dokument og eksterne kjelder", "documents and external sources"]],
  ["article-body", ["innhald fra sanity", "content from sanity"]],
  ["project-body", ["prosjekttekst", "project text"]],
  ["technical-data", ["tekniske data", "technical data"]],
  ["applications", ["bruksomrade", "applications"]],
  ["features", ["eigenskapar", "features"]],
  ["process", ["prosess", "process"]],
  ["contact", ["kontakt", "contact"]],
  ["certificates", ["dokumentasjon og sertifikat", "documentation and certificates"]],
  ["mounting-downloads", ["monteringsanvisningar", "installation guides"]],
  ["mounting-cta", ["ute etter dokumentasjon", "looking for documentation"]],
  ["documentation-cta", ["noko du savnar", "missing something"]],
  ["accessory-info", ["produktinformasjon", "product information"]],
  ["accessory-navigation", ["vidare i tilleggsutstyr", "more accessories"]],
  ["accessory-overview", ["tilleggsutstyr og reservedelar", "tilleggsutstyr til kjole og fryserom", "accessories and spare parts"]],
  ["accessory-order", ["artikkelnummer", "article number"]],
  ["delivery", ["leveranse", "delivery"]],
  ["service-parts", ["service og reservedeler", "service and spare parts"]],
  ["installation", ["fresvik produkt tilbyr montasje av", "fresvik produkt offers installation of"]],
  ["approval", ["sentral godkjenning", "central approval"]],
  ["installation-cta", ["meir informasjon om montasje", "more information about installation"]],
  ["product-intro-pir", ["fresvik pir panel til kjole og fryserom"]],
  ["product-intro-pur", ["fresvik pur panel til kjole og fryserom"]],
  ["product-intro-gates", ["skyveport til kjole og fryserom"]],
  ["product-intro-doors", ["dorer til kjole og fryserom"]],
  ["product-benefits", ["produktfordelar fra gammal side", "product benefits"]],
  ["product-images", ["produktbilete fra gammal side", "product images"]],
  ["related-accessories", ["tilleggsutstyr", "tilleggsprodukt", "related accessories"]],
  ["frysetunnel-feature", ["konstruksjon og bruksomrade", "skreddarsydde pir panel", "spesialtilpassa dorer", "construction and applications", "custom pir panels", "custom doors"]],
  ["facade-core", ["fasadepanel med polyuretan kjerne", "facade panels with a polyurethane core"]],
  ["facade-benefits", ["isolasjonspanelpanel gir", "isolasjonspanel gir", "insulated panels provide"]],
  ["door-models", ["vare dorer", "our doors"]],
  ["product-references", ["sja kva vi har levert til andre kundar", "see what we have delivered to other customers"]],
  ["partners", ["for samarbeidspartnarar", "for partners"]],
  ["certificate-links", ["sertifikat og botnlenker fra gammal side", "certificate and footer links"]],
  ["contact-information", ["kontaktinformasjon fra gammal side", "contact information"]],
  ["reference-intro", ["ein leiande leverandor av kjolerom og fryserom", "a leading supplier of cold and freezer rooms"]],
  ["electric-downloads", ["filer fra gammal skyveportside", "electric sliding door files"]],
  ["archive-newsletter", ["nyheitsbrev og footerlenker fra gammal side"]],
  ["archive-service-urls", ["teneste url ar fra gammal sitemap"]],
];

const kindByTitle = new Map(
  sectionKinds.flatMap(([kind, titles]) =>
    titles.map((title) => [normalize(title), kind] as const),
  ),
);

export function sectionKindFromTitle(title: string) {
  const normalized = normalize(title);
  const exact = kindByTitle.get(normalized);
  if (exact) return exact;

  if (normalized.startsWith("tilleggsutstyr") || normalized.startsWith("tilleggsprodukt")) {
    return "related-accessories";
  }
  if (normalized.startsWith("den forste norske produsenten")) {
    return "pir-producer";
  }
  if (normalized.includes("full tekst fra gammal side")) return "archive-full-text";
  if (normalized.includes("bilde fra gammal side")) return "archive-images";
  if (normalized.includes("dokumentlenker fra gammal side")) return "archive-documents";
  if (normalized.includes("lenker fra gammal")) return "archive-links";
  if (normalized.includes("referanse fra gammal side")) return "archive-reference";

  return undefined;
}

export function sectionKind(section: Pick<ContentSection, "kind" | "title">) {
  return section.kind || sectionKindFromTitle(section.title);
}

export function sectionIs(
  section: Pick<ContentSection, "kind" | "title">,
  kind: string,
) {
  return sectionKind(section) === kind;
}
