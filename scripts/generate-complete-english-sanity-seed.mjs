import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { withStableSectionIdentities } from "../src/i18n/contentStructure.shared.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourceSeedPath = path.join(root, "sanity", "seed", "migratedContent.ndjson");
const englishSeedPath = path.join(root, "sanity", "seed", "migratedContent.en.ndjson");
const translationCatalogPath = path.join(
  root,
  "sanity",
  "seed",
  "englishTranslations.chatgpt.json",
);
const translationWorkPath = path.join(root, ".tmp", "english-translations");
const translationSourcePath = path.join(translationWorkPath, "source");
const translationResultPath = path.join(translationWorkPath, "translated");
const routeMap = JSON.parse(
  fs.readFileSync(path.join(root, "src", "i18n", "routeMap.json"), "utf8"),
);

const contentTypes = new Set([
  "page",
  "product",
  "service",
  "newsArticle",
  "referenceProject",
]);

const translatedStringFields = new Set([
  "alt",
  "applications",
  "caption",
  "category",
  "customerType",
  "ctaText",
  "description",
  "excerpt",
  "features",
  "imageAlt",
  "intro",
  "label",
  "meta",
  "seoDescription",
  "seoTitle",
  "shortDescription",
  "text",
  "title",
  "value",
]);

const sourceAliases = new Map([
  ["/produkt/fresvik-panel", "/produkt/fresvik-pur-panel"],
]);

const dynamicEnglishRules = [
  ["/aktuelt/", "/about/news/"],
  ["/referansar/", "/references/"],
  ["/andre-produkter/", "/products/accessories/"],
];

const glossary = [
  ["Fresvik Produkt", "Fresvik Produkt"],
  ["Fresvik PIR-Panel", "Fresvik PIR Panel"],
  ["Fresvik PUR-Panel", "Fresvik PUR Panel"],
  ["Fresvik PIR Panel", "Fresvik PIR Panel"],
  ["Fresvik PUR Panel", "Fresvik PUR Panel"],
  ["kjøle- og fryserom", "cold and freezer rooms"],
  ["kjøle- og fryseromsportar", "cold and freezer room gates"],
  ["kjøle- og fryseportar", "cold and freezer room gates"],
  ["kjøle- og frysedører", "cold and freezer room doors"],
  ["kjøle- og frysedører", "cold and freezer room doors"],
  ["kjølerom", "cold rooms"],
  ["fryserom", "freezer rooms"],
  ["frysetunnel", "freezing tunnel"],
  ["fasadepanel", "facade panels"],
  ["skyveport", "sliding gate"],
  ["slagdør", "hinged door"],
  ["tilleggsutstyr", "accessories"],
  ["reservedeler", "spare parts"],
  ["Openheitslova", "Transparency Act"],
  ["openheitslova", "Transparency Act"],
  ["Miljøfyrtårn", "Eco-Lighthouse"],
  ["SINTEF", "SINTEF"],
  ["StartBANK", "StartBANK"],
  ["MaxiElebar", "MaxiElebar"],
  ["Elebar", "Elebar"],
  ["PEGO", "PEGO"],
  ["PIR", "PIR"],
  ["PUR", "PUR"],
  ["FDV", "FDV"],
  ["CAD", "CAD"],
];

function readNdjson(filePath) {
  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function normalizePath(value) {
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function sourcePathForDoc(doc) {
  let sourcePath;

  try {
    sourcePath = new URL(doc.sourceUrl).pathname;
  } catch {
    sourcePath = `/${doc.slug?.current || ""}`;
  }

  const normalized = normalizePath(sourcePath);
  return sourceAliases.get(normalized) || normalized;
}

function englishPathForSourcePath(sourcePath) {
  const normalized = normalizePath(sourcePath);
  const exact = routeMap[normalized];
  if (exact) return exact;

  for (const [sourcePrefix, englishPrefix] of dynamicEnglishRules) {
    if (normalized.startsWith(sourcePrefix)) {
      return `${englishPrefix}${normalized.slice(sourcePrefix.length)}`;
    }
  }

  return normalized;
}

function idSafe(value) {
  return (
    value
      .replace(/^\/+|\/+$/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "home"
  );
}

function englishSlugForSourcePath(sourcePath) {
  const englishPath = englishPathForSourcePath(sourcePath);
  return englishPath === "/" ? "home" : englishPath.replace(/^\/+|\/+$/g, "");
}

function sourcePathForManualDoc(doc) {
  if (doc.sourceUrl) return sourcePathForDoc(doc);

  const routeEntry = Object.entries(routeMap).find(
    ([sourcePath, englishPath]) =>
      doc.translationGroup === `fresvik:${idSafe(sourcePath)}` ||
      doc.slug?.current === englishSlugForSourcePath(sourcePath) ||
      doc.slug?.current === englishPath.replace(/^\/+|\/+$/g, ""),
  );

  return routeEntry?.[0];
}

function withRecoveredSourceUrl(doc) {
  if (doc.sourceUrl) return doc;

  const sourcePath = sourcePathForManualDoc(doc);
  if (!sourcePath) return doc;

  return {
    ...doc,
    sourceUrl: `https://www.fresvik.no${sourcePath === "/" ? "/" : sourcePath}`,
  };
}

function localizeHref(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("/assets/") ||
    value.startsWith("/s/")
  ) {
    return value;
  }

  const [pathname, suffix = ""] = value.split(/(?=[?#])/u, 2);
  const englishPath = englishPathForSourcePath(pathname);
  return `/en${englishPath === "/" ? "" : englishPath}${suffix}`;
}

function shouldTranslate(value) {
  if (typeof value !== "string") return false;
  const text = value.trim();
  if (!text || /^https?:\/\//i.test(text) || /^[\w.+-]+@[\w.-]+$/i.test(text)) {
    return false;
  }
  if (/^[\d\s.,:;()[\]/+%-]+$/u.test(text)) return false;
  if (/^[\w.-]+\.(?:pdf|png|jpe?g|webp|svg)$/iu.test(text)) return false;
  return /[A-Za-zÆØÅæøå]/u.test(text);
}

function collectStrings(value, parentKey, output) {
  if (typeof value === "string") {
    if (translatedStringFields.has(parentKey) && shouldTranslate(value)) {
      output.add(value);
    }
    return;
  }

  if (Array.isArray(value)) {
    for (const entry of value) collectStrings(entry, parentKey, output);
    return;
  }

  if (!value || typeof value !== "object") return;
  for (const [key, nestedValue] of Object.entries(value)) {
    collectStrings(nestedValue, key, output);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function protectGlossary(text) {
  const replacements = [];
  let protectedText = text;

  for (const [source, target] of glossary.sort(
    ([left], [right]) => right.length - left.length,
  )) {
    const pattern = new RegExp(escapeRegExp(source), "giu");
    protectedText = protectedText.replace(pattern, () => {
      const token = `ZXQTERM${replacements.length}ZXQ`;
      replacements.push([token, target]);
      return token;
    });
  }

  return { protectedText, replacements };
}

function readChatGptTranslations() {
  const cache = {};
  const catalogs = [];

  if (fs.existsSync(translationCatalogPath)) {
    catalogs.push([
      path.basename(translationCatalogPath),
      JSON.parse(fs.readFileSync(translationCatalogPath, "utf8")),
    ]);
  }
  if (fs.existsSync(translationResultPath)) {
    for (const file of fs
      .readdirSync(translationResultPath)
      .filter((entry) => entry.endsWith(".json"))
      .sort()) {
      catalogs.push([
        file,
        JSON.parse(
          fs.readFileSync(path.join(translationResultPath, file), "utf8"),
        ),
      ]);
    }
  }

  for (const [file, entries] of catalogs) {
    for (const entry of entries) {
      if (
        typeof entry.source !== "string" ||
        typeof entry.translation !== "string" ||
        !entry.translation.trim()
      ) {
        throw new Error(`Invalid ChatGPT translation entry in ${file}.`);
      }
      if (
        Object.hasOwn(cache, entry.source) &&
        cache[entry.source] !== entry.translation
      ) {
        if (file !== path.basename(translationCatalogPath)) {
          continue;
        }
        throw new Error(`Conflicting ChatGPT translation for: ${entry.source}`);
      }
      cache[entry.source] = entry.translation.trim();
    }
  }

  return cache;
}

function writeTranslationSourceBatches(strings, cache) {
  const missing = [...strings].filter((text) => !cache[text]);
  const batchSize = 250;

  fs.rmSync(translationSourcePath, { recursive: true, force: true });
  fs.mkdirSync(translationSourcePath, { recursive: true });

  for (let index = 0; index < missing.length; index += batchSize) {
    const batchNumber = Math.floor(index / batchSize) + 1;
    const entries = missing.slice(index, index + batchSize).map((source) => {
      const { protectedText, replacements } = protectGlossary(source);
      return { source, protectedText, replacements };
    });
    fs.writeFileSync(
      path.join(
        translationSourcePath,
        `batch-${String(batchNumber).padStart(2, "0")}.json`,
      ),
      `${JSON.stringify(entries, null, 2)}\n`,
    );
  }

  console.log(`ChatGPT translations: ${strings.size - missing.length}/${strings.size}`);
  console.log(`Missing ChatGPT translations: ${missing.length}`);
  return missing.length;
}

function translatedClone(value, parentKey, cache) {
  if (typeof value === "string") {
    if (parentKey === "href") return localizeHref(value);
    if (translatedStringFields.has(parentKey) && cache[value]) return cache[value];
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => translatedClone(entry, parentKey, cache));
  }

  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      translatedClone(nestedValue, key, cache),
    ]),
  );
}

function uniqueSectionMatch(section, sections) {
  const byTranslationKey = sections.find(
    (candidate) =>
      section.translationKey &&
      candidate.translationKey === section.translationKey,
  );
  if (byTranslationKey) return byTranslationKey;

  const byKey = sections.find(
    (candidate) => section._key && candidate._key === section._key,
  );
  if (byKey) return byKey;

  const kindMatches = sections.filter(
    (candidate) => section.kind && candidate.kind === section.kind,
  );
  return kindMatches.length === 1 ? kindMatches[0] : undefined;
}

function canonicalCardHref(value) {
  if (typeof value !== "string" || !value.startsWith("/")) return value;
  return value
    .replace(/^\/en\/about\/news\//, "/aktuelt/")
    .replace(/^\/en\/references\//, "/referansar/")
    .replace(/^\/en\/products\/accessories\//, "/andre-produkter/")
    .replace(/^\/en/, "");
}

function overlayManualCard(baseCard, manualCards) {
  const baseHref = canonicalCardHref(baseCard.href);
  const hrefMatches = baseHref
    ? manualCards.filter(
        (candidate) => canonicalCardHref(candidate.href) === baseHref,
      )
    : [];
  const keyMatch = manualCards.find(
    (candidate) => baseCard._key && candidate._key === baseCard._key,
  );
  const manual = keyMatch || (hrefMatches.length === 1 ? hrefMatches[0] : undefined);
  if (!manual) return baseCard;

  return {
    ...baseCard,
    title: manual.title || baseCard.title,
    text: manual.text || baseCard.text,
    meta: manual.meta || baseCard.meta,
    imageAlt: manual.imageAlt || baseCard.imageAlt,
  };
}

function overlayManualTranslation(generated, manual) {
  if (!manual) return generated;

  const manualSections = manual.migrationSections || [];
  const migrationSections = (generated.migrationSections || []).map((section) => {
    const translatedSection = uniqueSectionMatch(section, manualSections);
    if (!translatedSection) return section;

    return {
      ...section,
      title: translatedSection.title || section.title,
      intro: translatedSection.intro || section.intro,
      items: (section.items || []).map((item) =>
        overlayManualCard(item, translatedSection.items || []),
      ),
    };
  });

  return {
    ...generated,
    title: manual.title || generated.title,
    intro: manual.intro || generated.intro,
    seoTitle: manual.seoTitle || generated.seoTitle,
    seoDescription: manual.seoDescription || generated.seoDescription,
    body: manual.body?.length ? manual.body : generated.body,
    migrationSections,
  };
}

function englishDocFromSource(sourceDoc, cache, manual) {
  const sourcePath = sourcePathForDoc(sourceDoc);
  const sourceSections = withStableSectionIdentities(
    sourceDoc.migrationSections || [],
    sourcePath,
  );
  const sourceWithIdentities = {
    ...sourceDoc,
    migrationSections: sourceSections,
  };
  const translated = translatedClone(sourceWithIdentities, "", cache);

  delete translated._createdAt;
  delete translated._updatedAt;
  delete translated._rev;

  const generated = {
    ...translated,
    _id: `drafts.${sourceDoc._type}-en-${idSafe(sourcePath)}`,
    slug: {
      _type: "slug",
      current: englishSlugForSourcePath(sourcePath),
    },
    language: "en",
    sourceLanguage: "nn",
    translationGroup: `fresvik:${idSafe(sourcePath)}`,
  };

  return overlayManualTranslation(generated, manual);
}

const sourceDocs = readNdjson(sourceSeedPath).filter((doc) =>
  contentTypes.has(doc._type),
);
const manualDocs = readNdjson(englishSeedPath);
const manualBySourcePath = new Map(
  manualDocs.map((doc) => [sourcePathForDoc(doc), doc]),
);
const sourcePaths = new Set(sourceDocs.map(sourcePathForDoc));
const manualOnlyDocs = manualDocs.filter(
  (doc) => !sourcePaths.has(sourcePathForDoc(doc)),
);
const cache = readChatGptTranslations();
const strings = new Set();

for (const doc of sourceDocs) collectStrings(doc, "", strings);
const missingTranslationCount = writeTranslationSourceBatches(strings, cache);

if (missingTranslationCount > 0) {
  throw new Error(
    `Complete English seed requires ${missingTranslationCount} ChatGPT translations. ` +
      `Translate the batches in ${path.relative(root, translationSourcePath)} first.`,
  );
}

const translatedDocs = sourceDocs.map((sourceDoc) => {
  const sourcePath = sourcePathForDoc(sourceDoc);
  return englishDocFromSource(
    sourceDoc,
    cache,
    manualBySourcePath.get(sourcePath),
  );
});
const docs = [
  ...translatedDocs,
  ...manualOnlyDocs,
]
  .map(withRecoveredSourceUrl)
  .sort((left, right) => left._id.localeCompare(right._id));
const ids = new Set(docs.map((doc) => doc._id));
const groups = new Set(docs.map((doc) => doc.translationGroup));

if (ids.size !== docs.length) {
  throw new Error("Complete English seed contains duplicate document IDs.");
}
if (groups.size !== docs.length) {
  throw new Error("Complete English seed contains duplicate translation groups.");
}

fs.writeFileSync(
  englishSeedPath,
  `${docs.map((doc) => JSON.stringify(doc)).join("\n")}\n`,
);

console.log(
  `Wrote ${docs.length} complete English draft documents to ${path.relative(root, englishSeedPath)}.`,
);
