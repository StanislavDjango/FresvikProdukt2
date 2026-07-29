function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const sectionKinds = [
  ["products", ["produkt", "products", "produkt fra sanity", "products from sanity", "products and solutions", "produktteaserar fra gammal framside", "fresvik panel", "vare produkt", "tilbehor"]],
  ["services", ["tenesteomrade", "tenester fra sanity", "services", "services from sanity"]],
  ["news", ["aktuelt", "nyheiter fra sanity", "news", "news from sanity"]],
  ["references", ["referansar", "referansar fra sanity", "references", "references from sanity"]],
  ["categories", ["kategoriar", "categories"]],
  ["customer-areas", ["vare kundar", "customer areas"]],
  ["documents", ["dokument", "dokumentasjon", "dokument fra sanity", "documentation", "documents from sanity"]],
  ["employees", ["tilsette fra sanity", "kontaktpersonar", "employees", "contact people"]],
  ["company-overview", ["vidare informasjon", "further information"]],
  ["company-info", ["om fresvik produkt", "about fresvik produkt"]],
  ["job-opening", ["ledig stilling", "ledig stilling fra gammal side", "vil du jobbe hja oss", "available position", "available positions"]],
  ["legal-text", ["personverntekst", "personverntekst fra gammal side", "tekst fra gammal openheitslova side", "openheitslova", "privacy text", "transparency act"]],
  ["legal-documents", ["dokument og eksterne kjelder", "documents and external sources"]],
  ["article-body", ["innhald fra sanity", "content from sanity"]],
  ["article-links", ["lenker fra gammal aktuelt side", "article links"]],
  ["project-body", ["prosjekttekst", "project text"]],
  ["project-images", ["prosjektbilete", "project images"]],
  ["reference-navigation", ["referanselenker", "reference links"]],
  ["technical-data", ["tekniske data", "technical data"]],
  ["applications", ["bruksomrade", "applications"]],
  ["features", ["eigenskapar", "features"]],
  ["process", ["prosess", "process"]],
  ["contact", ["kontakt", "contact"]],
  ["certificates", ["dokumentasjon og sertifikat", "documentation and certificates"]],
  ["trust-badges", ["footer sertifikat og merker", "certificates and marks"]],
  ["mounting-downloads", ["monteringsanvisningar", "installation guides"]],
  ["mounting-cta", ["ute etter dokumentasjon", "looking for documentation"]],
  ["documentation-cta", ["noko du savnar", "missing something"]],
  ["accessory-info", ["produktinformasjon", "product information"]],
  ["accessory-navigation", ["vidare i tilleggsutstyr", "more accessories"]],
  ["accessory-images", ["produktbilete", "accessory images"]],
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
  ["electric-downloads", ["filer fra gammal skyveportside", "electric sliding door files", "monteringsanvisningar for elektrisk styring av fresvik skyveport"]],
  ["newsletter", ["motta nyheitsbrev", "receive newsletter"]],
  ["archive-newsletter", ["nyheitsbrev og footerlenker fra gammal side"]],
  ["archive-service-urls", ["teneste url ar fra gammal sitemap"]],
];

const kindByTitle = new Map(
  sectionKinds.flatMap(([kind, titles]) =>
    titles.map((title) => [normalize(title), kind]),
  ),
);

export const migrationArchiveKinds = new Set([
  "archive-full-text",
  "archive-images",
  "archive-documents",
  "archive-links",
  "archive-reference",
  "archive-author",
  "archive-navigation",
  "archive-newsletter",
  "archive-service-urls",
]);

export function sectionKindFromTitleValue(title = "") {
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
  if (
    normalized === "forfattar" ||
    normalized === "author" ||
    normalized.includes("forfattar fra gammal side") ||
    normalized.includes("author from the old")
  ) {
    return "archive-author";
  }
  if (
    normalized === "navigasjon" ||
    normalized === "navigation" ||
    normalized.includes("navigasjon fra gammal side") ||
    normalized.includes("navigation from the old")
  ) {
    return "archive-navigation";
  }

  return undefined;
}

export function semanticSectionKind(sourcePath, section) {
  const persistedKind = section.kind;
  const titleKind = sectionKindFromTitleValue(section.title);
  const generatedKind =
    persistedKind?.startsWith("section-")
      ? sectionKindFromTitleValue(
          persistedKind.slice("section-".length).replace(/-/g, " "),
        )
      : undefined;
  const inferredKind =
    (persistedKind && !persistedKind.startsWith("section-")
      ? persistedKind
      : undefined) ||
    titleKind ||
    generatedKind ||
    persistedKind;
  const normalizedTitle = normalize(section.title || "");

  if (
    sourcePath.startsWith("/aktuelt/") &&
    (inferredKind === "news" ||
      persistedKind === "section-nyheit" ||
      persistedKind === "section-news" ||
      normalizedTitle === "nyheit" ||
      normalizedTitle === "news")
  ) {
    return "article-body";
  }

  if (inferredKind === "legal-text") {
    if (sourcePath === "/personvernerklering") return "privacy-text";
    if (sourcePath === "/openheitslova") return "transparency-text";
  }

  if (inferredKind === "archive-full-text") {
    if (sourcePath === "/produkt/fresvik-pir-panel") return "product-intro-pir";
    if (sourcePath === "/produkt/fresvik-pur-panel") return "product-intro-pur";
    if (sourcePath === "/produkt/kjole-fryseportar") return "product-intro-gates";
    if (sourcePath === "/produkt/kjole-frysedorer") return "product-intro-doors";
    if (sourcePath === "/produkt/fasadepanel") return "product-intro-facade";
    if (sourcePath === "/produkt/frysetunnel") return "product-intro-freezing-tunnel";
    if (sourcePath.startsWith("/referansar/")) return "project-body";
    if (sourcePath.startsWith("/aktuelt/")) return "article-body";
    if (sourcePath.startsWith("/andre-produkter/")) return "accessory-info";
    if (sourcePath.startsWith("/tenester/")) return "service-details";
    if (sourcePath === "/firmainfo" || sourcePath === "/om-oss") return "company-info";
    if (sourcePath === "/personvernerklering") return "privacy-text";
    if (sourcePath === "/openheitslova") return "transparency-text";
  }

  if (inferredKind === "archive-images") {
    if (sourcePath.startsWith("/andre-produkter/")) return "accessory-images";
    if (sourcePath.startsWith("/referansar/")) return "project-images";
    if (sourcePath.startsWith("/aktuelt/")) return "article-images";
  }

  if (inferredKind === "archive-links") {
    if (sourcePath.startsWith("/referansar/")) return "reference-navigation";
    if (sourcePath.startsWith("/aktuelt/")) return "article-links";
    if (sourcePath.startsWith("/andre-produkter/")) return "accessory-navigation";
  }

  if (inferredKind === "archive-documents") {
    return "documents";
  }

  return inferredKind;
}

export function withStableSectionIdentities(sections, sourcePath = "/") {
  const counts = new Map();

  return sections.map((section) => {
    const inferredKind = semanticSectionKind(sourcePath, section);
    const normalizedTitle = normalize(section.title || "");
    const kind =
      inferredKind ||
      (normalizedTitle
        ? `section-${normalizedTitle.replace(/\s+/g, "-")}`
        : "section");
    const occurrence = (counts.get(kind) || 0) + 1;
    counts.set(kind, occurrence);

    return {
      ...section,
      kind,
      translationKey:
        section.translationKey ||
        `${kind}:${occurrence}`,
    };
  });
}
