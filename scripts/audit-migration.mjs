import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const tempDir = path.join(root, ".generated", "migration-audit-cjs");
const oldBaseUrl = "https://www.fresvik.no";
const sitemapUrl = `${oldBaseUrl}/sitemap.xml`;
const markdownPath = path.join(root, "MIGRATION_AUDIT.md");
const jsonPath = path.join(root, "MACHINE_READABLE_MIGRATION_AUDIT.json");
const statusPath = path.join(root, "ASSET_MIGRATION_STATUS.md");
const homepageAuditPath = path.join(root, "HOMEPAGE_MIGRATION_AUDIT.md");
const sourceFilesForLinks = [
  "src/data/pages.ts",
  "src/data/oldSiteInventory.ts",
  "src/data/navigation.ts",
  "sanity/seed/migratedContent.ndjson",
];

function compileTs(sourceFile, outputFile) {
  const source = readFileSync(sourceFile, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;

  mkdirSync(path.dirname(outputFile), { recursive: true });
  writeFileSync(outputFile, output);
}

function loadDataModules() {
  compileTs(
    path.join(root, "src", "data", "oldSiteInventory.ts"),
    path.join(tempDir, "node_modules", "@", "data", "oldSiteInventory.js"),
  );
  compileTs(
    path.join(root, "src", "data", "oldSiteContentExtract.ts"),
    path.join(tempDir, "node_modules", "@", "data", "oldSiteContentExtract.js"),
  );
  compileTs(
    path.join(root, "src", "data", "pages.ts"),
    path.join(tempDir, "pages.js"),
  );
  compileTs(
    path.join(root, "src", "data", "legacyRoutes.ts"),
    path.join(tempDir, "legacyRoutes.js"),
  );
  compileTs(
    path.join(root, "src", "data", "redirects.ts"),
    path.join(tempDir, "redirects.js"),
  );

  return {
    inventory: require(path.join(
      tempDir,
      "node_modules",
      "@",
      "data",
      "oldSiteInventory.js",
    )),
    contentExtract: require(path.join(
      tempDir,
      "node_modules",
      "@",
      "data",
      "oldSiteContentExtract.js",
    )),
    pages: require(path.join(tempDir, "pages.js")),
    legacy: require(path.join(tempDir, "legacyRoutes.js")),
    redirects: require(path.join(tempDir, "redirects.js")),
  };
}

function fetchText(url) {
  return execFileSync("curl", ["-L", "--silent", "--show-error", url], {
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
  });
}

function decodeXml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalizePathname(value) {
  try {
    const url = value.startsWith("http") ? new URL(value) : new URL(value, oldBaseUrl);
    return decodeURI(url.pathname).replace(/\/$/, "") || "/";
  } catch {
    return decodeURI(value).replace(/\/$/, "") || "/";
  }
}

function normalizeRoute(value) {
  if (!value) return "";
  return normalizePathname(value.split("#")[0].split("?")[0]);
}

function normalizeText(value = "") {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  return decoded
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokens(value = "") {
  return new Set(
    normalizeText(value)
      .split(/\s+/)
      .filter((token) => token.length >= 3),
  );
}

function tokenScore(a, b) {
  const aTokens = tokens(a);
  const bTokens = tokens(b);
  if (aTokens.size === 0 || bTokens.size === 0) return 0;
  let intersection = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) intersection += 1;
  }
  return intersection / Math.max(aTokens.size, bTokens.size);
}

function filenameStem(urlOrPath = "") {
  const clean = decodeURIComponent(urlOrPath.split("?")[0]).replace(/\+/g, " ");
  const basename = clean.split("/").pop() || clean;
  return basename.replace(/\.[a-z0-9]+$/i, "");
}

function words(value = "") {
  return normalizeText(value).split(/\s+/).filter(Boolean);
}

function pageText(page) {
  if (!page) return "";
  return [
    page.title,
    page.intro,
    page.description,
    ...(page.cards || []).flatMap((card) => [card.title, card.text, card.meta]),
    ...(page.sections || []).flatMap((section) => [
      section.title,
      section.intro,
      ...(section.items || []).flatMap((item) => [item.title, item.text, item.meta]),
    ]),
    ...(page.todo || []),
  ]
    .filter(Boolean)
    .join("\n");
}

function pageImages(page) {
  if (!page) return [];
  return [
    ...(page.cards || []).map((card) => card.imageUrl),
    ...(page.sections || []).flatMap((section) =>
      (section.items || []).map((item) => item.imageUrl),
    ),
  ].filter(Boolean);
}

function pageDocuments(page) {
  if (!page) return [];
  return [
    ...(page.cards || []).map((card) => card.href),
    ...(page.sections || []).flatMap((section) =>
      (section.items || []).map((item) => item.href),
    ),
  ].filter((href) => href?.startsWith("/assets/fresvik/documents/"));
}

function pageLinks(page) {
  if (!page) return [];
  return [
    ...(page.cards || []).map((card) => card.href),
    ...(page.sections || []).flatMap((section) =>
      (section.items || []).map((item) => item.href),
    ),
  ].filter(Boolean);
}

const homepageSectionRequirements = [
  {
    section: "hero",
    oldText:
      "Leiande fagfolk på kjøle- og fryserom i Norge. Den einaste norske produsenten av isolasjonspanel, med over 45 års erfaring, som tilbyr kvalitet og kunnskap til deg som kjøleentreprenør.",
    requiredTexts: [
      "Leiande fagfolk på kjøle- og fryserom i Norge",
      "Den einaste norske produsenten av isolasjonspanel",
      "over 45 års erfaring",
    ],
    requiredImages: ["/assets/fresvik/images/old-site/home-flag-of-norway.jpg"],
    requiredLinks: [],
  },
  {
    section: "PIR-panel promo block",
    oldText:
      "Fresvik PIR Panel. Brannsikre panel med PIR skum. Med smart design og eksenterslås, tilbyr Fresvik Produkt sine nye PIR-Panel.",
    requiredTexts: [
      "Fresvik PIR Panel",
      "Brannsikre panel med PIR skum",
      "Med smart design og eksenterslås",
      "B-s1, d0",
    ],
    requiredImages: ["/assets/fresvik/images/old-site/home-pir-fire-illustration.png"],
    requiredLinks: ["/produkt/fresvik-pir-panel"],
  },
  {
    section: "Fresvik-panel benefits",
    oldText:
      "Fresvik-panel. Utvikla og produsert i Norge. SINTEF-godkjent. Fleksibelt på byggeplass. Enkel montasje med eksenterlås. Modulmål gir mindre svinn. Kort design-, produksjons- og leveringstid.",
    requiredTexts: [
      "Fresvik-panel",
      "Utvikla og produsert i Norge",
      "SINTEF-godkjent",
      "Fleksibelt på byggeplass",
      "Enkel montasje med eksenterlås",
      "Modulmål gir mindre svinn",
      "Kort design-, produksjons- og leveringstid",
    ],
    requiredImages: ["/assets/fresvik/images/old-site/home-fresvik-panel-room.jpg"],
    requiredLinks: ["/produkt/fresvik-pur-panel"],
  },
  {
    section: "product teaser links",
    oldText: "Kjøle- og fryseportar. Kjøle- og frysedører. Fasadepanel.",
    requiredTexts: ["Kjøle- og fryseportar", "Kjøle- og frysedører", "Fasadepanel"],
    requiredImages: [
      "/assets/fresvik/images/old-site/home-kjole-fryseportar.jpg",
      "/assets/fresvik/images/old-site/home-kjole-frysedorer.jpg",
      "/assets/fresvik/images/old-site/home-fasadepanel.webp",
    ],
    requiredLinks: [
      "/produkt/kjole-fryseportar",
      "/produkt/kjole-frysedorer",
      "/produkt/fasadepanel",
    ],
  },
  {
    section: "Våre kundar",
    oldText:
      "Basert på modular, skreddarsyr vi kjøle- og fryserom for butikk, næringsmiddelindustri, institusjonar, storkjøken, skip og offshoreinstallasjonar.",
    requiredTexts: [
      "Våre kundar",
      "Basert på modular",
      "butikk, næringsmiddelindustri, institusjonar, storkjøken, skip og offshoreinstallasjonar",
      "Vi er marknadsleiar på kjøle- og fryserom til daglegvarehandel",
      "Vi er einaste norske produsent av polyuretan sandwich-panel godkjend for maritimt bruk",
      "Vi leverer kjøle- fryserom og tilleggsprodukt til storkjøken",
    ],
    requiredImages: [
      "/assets/fresvik/images/migrated/flake-left.png",
      "/assets/fresvik/images/old-site/1715599204491-06f69a318b.jpg",
      "/assets/fresvik/images/old-site/image-asset-2-59c753eb14.jpeg",
      "/assets/fresvik/images/old-site/1733820776326-534d12e99d.jpg",
    ],
    requiredLinks: [
      "/kjolerom-fryserom-butikk",
      "/kjolerom-fryserom-offshore",
      "/kjolerom-fryserom-storkjokken",
    ],
  },
  {
    section: "Aktuelt",
    oldText:
      "Aktuelt. Møt vår nye tekniske sjef. Ny teknisk teiknar på plass. John Bøthun blir pensjonist.",
    requiredTexts: [
      "Aktuelt",
      "Møt vår nye tekniske sjef",
      "Ny teknisk teiknar på plass",
      "Den nye teiknaren vår har arbeidd på kontoret sidan nyttår",
      "John Bøthun blir pensjonist",
      "Den som i dag har vore lengst tilsett",
    ],
    requiredImages: [
      "/assets/fresvik/images/migrated/samaneh-shakeri.jpg",
      "/assets/fresvik/images/migrated/havard-berdal.jpg",
      "/assets/fresvik/images/migrated/john-bthun-fresvik-produkt.jpg",
    ],
    requiredLinks: [
      "/aktuelt/samaneh-shakeri-ny-teknisk-sjef",
      "/aktuelt/ny-teknisk-teiknar-havard-berdal",
      "/aktuelt/john-bothun-blir-pensjonist",
    ],
  },
  {
    section: "job CTA",
    oldText:
      "Vil du jobbe hjå oss? Fresvik Produkt sine 45 tilsette utgjer det fremste miljøet i landet på produksjon av kjøle- og fryserom. Vi er stadig på jakt etter flinke kollegaer.",
    requiredTexts: [
      "Vil du jobbe hjå oss?",
      "Fresvik Produkt sine 45 tilsette",
      "Vi er stadig på jakt etter flinke kollegaer",
    ],
    requiredImages: ["/assets/fresvik/images/old-site/home-job-factory.jpg"],
    requiredLinks: ["/stillingledig"],
  },
  {
    section: "contact section",
    oldText:
      "Fresvik Produkt AS. Fresvikvegen 995, 6896 Fresvik. Tel: 57 69 83 00. E-post: post@fresvik.no.",
    requiredTexts: [
      "Fresvik Produkt AS",
      "Fresvikvegen 995",
      "6896 Fresvik",
      "57 69 83 00",
      "post@fresvik.no",
    ],
    requiredImages: [],
    requiredLinks: ["mailto:post@fresvik.no"],
  },
  {
    section: "sales departments",
    oldText:
      "Salsavdeling Fresvik: Arne-Olav Lien Bardølsgård. Salsavdeling Drammen: Lars Erling Livrud. Frode Winther.",
    requiredTexts: [
      "Salsavdeling Fresvik:",
      "Arne-Olav Lien Bardølsgård",
      "Salsavdeling Drammen:",
      "Lars Erling Livrud",
      "Frode Winther",
    ],
    requiredImages: [],
    requiredLinks: [
      "mailto:arnbar@fresvik.no",
      "mailto:larliv@fresvik.no",
      "mailto:frowin@fresvik.no",
    ],
  },
  {
    section: "newsletter",
    oldText:
      "Motta nyheitsbrev. Meld deg på vårt nyheitsbrev og få tips og inspirasjon frå bransjen. Sjå vår personvernerklæring.",
    requiredTexts: [
      "Motta nyheitsbrev",
      "Meld deg på vårt nyheitsbrev og få tips og inspirasjon frå bransjen",
      "Sjå vår personvernerklæring",
      "Email Address",
      "Sign Up",
    ],
    requiredImages: [],
    requiredLinks: ["/personvernerklering"],
  },
  {
    section: "footer links",
    oldText: "Personvernerklæring. Openheitslova. Nettside levert av GASTA.",
    requiredTexts: ["Personvernerklæring", "Openheitslova", "GASTA"],
    requiredImages: [
      "/assets/fresvik/images/old-site/home-sentral-godkjent.png",
      "/assets/fresvik/images/old-site/tg-2135-78cb0925dd.jpg",
      "/assets/fresvik/images/old-site/home-poly.png",
      "/assets/fresvik/images/old-site/home-startbank.png",
      "/assets/fresvik/images/migrated/miljfyrtarn-fresvik-produkt.jpg",
      "/assets/fresvik/images/old-site/ce-logo-png-transparent-e6364eebb9.png",
    ],
    requiredLinks: ["/personvernerklering", "/openheitslova", "https://www.gasta.no"],
  },
];

function hrefMatches(actual, expected) {
  if (actual === expected) return true;
  if (expected === "/produkt/fresvik-pur-panel") {
    return actual === "/produkt/fresvik-panel" || actual === "/produkt/fresvik-pur-panel";
  }
  return false;
}

function homepageSectionAudit(page, seedDoc) {
  const text = [pageText(page), JSON.stringify(seedDoc || {})].join("\n");
  const normalizedText = normalizeText(text);
  const imageSet = new Set([...pageImages(page), seedDoc?.migratedImagePath].filter(Boolean));
  const links = pageLinks(page);

  return homepageSectionRequirements.map((requirement) => {
    const missingTexts = requirement.requiredTexts.filter(
      (required) => !normalizedText.includes(normalizeText(required)),
    );
    const missingImages = requirement.requiredImages.filter((image) => !imageSet.has(image));
    const missingLinks = requirement.requiredLinks.filter(
      (href) => !links.some((actual) => hrefMatches(actual, href)),
    );
    const existsOnNew =
      missingTexts.length < requirement.requiredTexts.length ||
      missingImages.length < requirement.requiredImages.length ||
      missingLinks.length < requirement.requiredLinks.length;
    const status =
      missingTexts.length === 0 && missingImages.length === 0 && missingLinks.length === 0
        ? "migrated"
        : existsOnNew
          ? "partial"
          : "missing";

    return {
      section: requirement.section,
      existsOnOld: "yes",
      existsOnNew: existsOnNew ? "yes" : "no",
      exactTextMigrated: missingTexts.length === 0 ? "yes" : "no",
      imagesMigrated: missingImages.length === 0 ? "yes" : "no",
      linksMigrated: missingLinks.length === 0 ? "yes" : "no",
      status,
      oldText: requirement.oldText,
      missingTexts,
      missingImages,
      missingLinks,
      notes:
        status === "migrated"
          ? "Required old homepage section content is present in local migration data."
          : [
              missingTexts.length ? `Missing text: ${missingTexts.join("; ")}` : "",
              missingImages.length ? `Missing images: ${missingImages.join("; ")}` : "",
              missingLinks.length ? `Missing links: ${missingLinks.join("; ")}` : "",
            ]
              .filter(Boolean)
              .join(" "),
    };
  });
}

function parseSitemap(xml) {
  return [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map((match) => {
    const block = match[0];
    const oldUrl = decodeXml(block.match(/<loc>([^<]+)<\/loc>/)?.[1] || "");
    const images = [...block.matchAll(/<image:image>[\s\S]*?<\/image:image>/g)].map(
      (imageMatch) => {
        const imageBlock = imageMatch[0];
        return {
          originalUrl: decodeXml(
            imageBlock.match(/<image:loc>([^<]+)<\/image:loc>/)?.[1] || "",
          ),
          title: decodeXml(
            imageBlock.match(/<image:title>([^<]*)<\/image:title>/)?.[1] || "",
          ),
          caption: decodeXml(
            imageBlock.match(/<image:caption>([^<]*)<\/image:caption>/)?.[1] || "",
          ),
        };
      },
    );

    return {
      oldUrl,
      oldPath: normalizePathname(oldUrl),
      lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
      images,
    };
  });
}

function readNdjson(filePath) {
  if (!existsSync(filePath)) return [];
  return readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function readJson(filePath, fallback) {
  if (!existsSync(filePath)) return fallback;
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function contentTypeFor(pathname) {
  if (pathname === "/") return "page";
  if (pathname.startsWith("/aktuelt/")) return "news";
  if (pathname === "/aktuelt") return "news";
  if (pathname.startsWith("/referansar/")) return "reference";
  if (pathname === "/referansar") return "reference";
  if (pathname.startsWith("/produkt")) return "product";
  if (pathname.startsWith("/tenester")) return "service";
  if (pathname.includes("monterings") || pathname === "/dokumentasjon") return "document";
  if (pathname === "/tilsette") return "employee";
  if (
    pathname === "/kundeservice/faq" ||
    pathname.startsWith("/kjolerom-fryserom") ||
    pathname === "/transportskade"
  ) {
    return "support";
  }
  if (pathname === "/personvernerklering" || pathname === "/openheitslova") return "legal";
  if (pathname === "/firmainfo" || pathname === "/kontakt" || pathname === "/stillingledig") {
    return "page";
  }
  if (pathname.startsWith("/andre-produkter") || pathname.startsWith("/store")) {
    return "product";
  }
  return "unknown";
}

function isDetailPath(pathname) {
  return (
    pathname.startsWith("/aktuelt/") ||
    pathname.startsWith("/referansar/") ||
    pathname.startsWith("/produkt/") ||
    pathname.startsWith("/tenester/")
  );
}

function hasTodoMarkers(text) {
  return /TODO|partial|missing|needs-review|needs review|må verifiserast|verifiserast|må verifiseres|skal importerast|skal flyttast/i.test(
    text,
  );
}

function bodyComplete(pathname, page, seedDoc, status) {
  if (status === "redirect") return false;
  const text = [pageText(page), JSON.stringify(seedDoc || {})].join("\n");
  const wordCount = words(text).length;
  if (!page && !seedDoc) return false;
  if (hasTodoMarkers(text)) return false;
  if (pathname.startsWith("/aktuelt/") || pathname.startsWith("/referansar/")) {
    return wordCount >= 180;
  }
  if (pathname.startsWith("/produkt/") || pathname.startsWith("/tenester/")) {
    return wordCount >= 140;
  }
  return wordCount >= 80 || !isDetailPath(pathname);
}

function routeStatus({
  pathname,
  page,
  seedDoc,
  redirect,
  sitemapImages,
  localImages,
  localDocuments,
  extract,
}) {
  if (redirect) return "redirect";
  if (!page && !seedDoc) return "missing";
  const text = [pageText(page), JSON.stringify(seedDoc || {})].join("\n");
  if (hasTodoMarkers(text)) return "needs-review";
  if (pathname === "/") {
    return homepageSectionAudit(page, seedDoc).every((section) => section.status === "migrated")
      ? "page"
      : "partial";
  }
  if (extract?.extractionStatus === "unrecoverable") return "needs-review";
  if ((pathname.startsWith("/aktuelt/") || pathname.startsWith("/referansar/")) && !extract) {
    return "partial";
  }
  if (
    (pathname.startsWith("/aktuelt/") || pathname.startsWith("/referansar/")) &&
    words(text).length < 180 &&
    !bodyComplete(pathname, page, seedDoc, "page")
  ) {
    return "partial";
  }
  const uniqueSitemapImageCount = new Set(sitemapImages.map((image) => image.originalUrl)).size;
  if (uniqueSitemapImageCount > localImages.length && isDetailPath(pathname)) return "partial";
  if ((extract?.documentUrls || []).length > 0 && localDocuments.length === 0) return "partial";
  if (!bodyComplete(pathname, page, seedDoc, "page")) return "partial";
  return "page";
}

function redirectFor(pathname, redirectRules) {
  return redirectRules.find((rule) => {
    if (normalizeRoute(rule.source) === pathname) return true;
    if (!rule.source.includes(":slug*")) return false;
    return pathname.startsWith(normalizeRoute(rule.source.replace("/:slug*", "")));
  });
}

function routeFromSeedDoc(doc) {
  if (!doc.slug?.current) return null;
  return doc.slug.current === "home" ? "/" : `/${doc.slug.current}`;
}

function collectExternalAndInternalLinks(files) {
  const internal = new Map();
  const external = new Map();
  const urlPattern = /["'`](https?:\/\/[^"'`\s<>]+|\/[^"'`\s<>]*)["'`]/g;
  const internalFieldPattern =
    /\b(?:href|source|destination|imageUrl|localPath|migratedImagePath)\s*:\s*["'`](\/[^"'`\s<>]*)["'`]/g;
  const externalFieldPattern =
    /\b(?:href|sourceUrl|originalUrl|url)\s*:\s*["'`](https?:\/\/[^"'`\s<>]+)["'`]/g;

  for (const file of files) {
    const text = readFileSync(path.join(root, file), "utf8");
    const lines = text.split(/\r?\n/);
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const line = lines[lineIndex];
      const internalMatches = file.endsWith(".ndjson")
        ? line.matchAll(urlPattern)
        : line.matchAll(internalFieldPattern);
      for (const match of internalMatches) {
        const raw = match[1].replace(/[),.;]+$/, "");
        if (!raw.startsWith("/")) continue;
        const normalized = normalizeRoute(raw);
        if (!normalized) continue;
        const key = `${normalized}|${file}`;
        if (!internal.has(key)) {
          internal.set(key, {
            href: raw,
            normalized,
            sourceFile: file,
            line: lineIndex + 1,
            status: "unchecked",
            notes: "",
          });
        }
      }

      for (const match of line.matchAll(externalFieldPattern)) {
        const raw = match[1].replace(/[),.;]+$/, "");
        const key = `${raw}|${file}`;
        if (!external.has(key)) {
          external.set(key, {
            url: raw,
            sourceFile: file,
            line: lineIndex + 1,
            purpose: raw.includes("fresvik.no")
              ? "source-url"
              : raw.includes("sintef")
                ? "certification/documentation"
                : raw.includes("lovdata")
                  ? "legal-reference"
                  : "external-reference",
            status: raw.includes("images.squarespace-cdn.com")
              ? "replace"
              : raw.includes("fresvik.no")
                ? "keep"
                : "keep",
          });
        }
      }
    }
  }

  return {
    internal: [...internal.values()],
    external: [...external.values()],
  };
}

function classifyInternalLinks(links, routeSet, redirectRules) {
  return links.map((link) => {
    if (link.href === "#" || link.normalized === "#") {
      return { ...link, status: "broken", notes: "Placeholder href is not allowed." };
    }
    if (link.normalized.startsWith("/assets/fresvik/")) {
      const exists = existsSync(path.join(root, "public", link.normalized));
      return {
        ...link,
        status: exists ? "asset-ok" : "broken",
        notes: exists ? "Local migration asset exists." : "Local asset file is missing.",
      };
    }
    if (routeSet.has(link.normalized)) {
      return { ...link, status: "ok", notes: "Internal route exists." };
    }
    const redirect = redirectFor(link.normalized, redirectRules);
    if (redirect) {
      return {
        ...link,
        status: "redirect",
        notes: `Redirects to ${redirect.destination}.`,
      };
    }
    return {
      ...link,
      status: "broken",
      notes: "No page or redirect found for this internal link.",
    };
  });
}

function bestImageMatch(sitemapImage, localImages, sourcePath) {
  const remoteStem = filenameStem(sitemapImage.originalUrl);
  const remoteText = [
    remoteStem,
    sitemapImage.title,
    sitemapImage.caption,
    sourcePath,
  ].join(" ");
  let best = null;

  for (const local of localImages) {
    if (local.originalUrl === sitemapImage.originalUrl) {
      return { local, score: 1.5, exactStem: true };
    }

    const sourceMatch = local.sourcePages.some((page) => normalizePathname(page) === sourcePath);
    const localText = [
      filenameStem(local.localPath),
      local.localPath,
      local.usedBy.join(" "),
      local.sourcePages.join(" "),
    ].join(" ");
    const score =
      tokenScore(remoteText, localText) + (sourceMatch ? 0.35 : 0) +
      (normalizeText(remoteStem) === normalizeText(filenameStem(local.localPath)) ? 0.5 : 0);
    if (!best || score > best.score) {
      best = { local, score };
    }
  }

  if (!best) return null;
  return {
    ...best,
    exactStem:
      normalizeText(remoteStem) === normalizeText(filenameStem(best.local.localPath)),
  };
}

function classifySitemapImages(sitemapEntries, localImageAssets, redirectRules) {
  const imageRows = [];
  const matchedLocals = new Map();
  const seenOriginals = new Set();

  for (const entry of sitemapEntries) {
    const redirect = redirectFor(entry.oldPath, redirectRules);
    for (const image of entry.images) {
      const duplicateOriginal = seenOriginals.has(image.originalUrl);
      seenOriginals.add(image.originalUrl);
      const best = bestImageMatch(image, localImageAssets, entry.oldPath);
      const likelyThumbnail =
        /thumbnail|thumb|w=\d+|format=|fit=|crop=/i.test(image.originalUrl) ||
        duplicateOriginal;
      let status = "missing";
      let localPath = null;
      let confidence = best?.score || 0;
      let notes = "";

      if (best && confidence >= 0.55) {
        status = duplicateOriginal ? "duplicate" : "migrated";
        localPath = best.local.localPath;
        if (best.exactStem) {
          matchedLocals.set(localPath, image.originalUrl);
        }
        notes = `Matched by filename/source similarity (${confidence.toFixed(2)}).`;
      } else if (redirect) {
        status = "ignored-with-reason";
        notes = `Old URL redirects to ${redirect.destination}; sitemap image is not required on a redirect-only route.`;
      } else if (likelyThumbnail) {
        status = "thumbnail-or-variant";
        notes = "Looks like a duplicate thumbnail/variant, but no confident local match.";
      } else {
        notes = "No confident local asset match found.";
      }

      imageRows.push({
        originalUrl: image.originalUrl,
        oldPath: entry.oldPath,
        title: image.title,
        caption: image.caption,
        localPath,
        status,
        confidence: Number(confidence.toFixed(3)),
        notes,
      });
    }
  }

  for (const local of localImageAssets) {
    if (matchedLocals.has(local.localPath)) continue;
    imageRows.push({
      originalUrl: local.originalUrl?.startsWith("TODO")
        ? "TODO: unknown original URL"
        : local.originalUrl,
      oldPath: local.sourcePages.map(normalizePathname).join(", "),
      title: "",
      caption: "",
      localPath: local.localPath,
      status: local.originalUrl?.startsWith("TODO") ? "unrecoverable" : "ignored-with-reason",
      confidence: 0,
      notes:
        local.originalUrl?.startsWith("TODO")
          ? "Local migration cache image is used, but exact remote originalUrl is unrecoverable from current sitemap/HTML; sourcePages are retained."
          : "Local image is used by migrated data and has originalUrl, but that URL is absent from the current live sitemap; kept as source drift cache.",
    });
  }

  return { imageRows, matchedLocals };
}

function bestDocumentMatch(documentAsset, remotePdfUrls) {
  const localStem = filenameStem(documentAsset.localPath);
  let best = null;
  for (const remote of remotePdfUrls) {
    const score =
      tokenScore(localStem, filenameStem(remote.url)) +
      (documentAsset.sourcePages.some((page) => normalizePathname(page) === remote.sourcePath)
        ? 0.35
        : 0);
    if (!best || score > best.score) best = { remote, score };
  }
  return best;
}

function collectRemotePdfUrls(sitemapEntries) {
  const urls = [];
  const textFiles = [
    "src/data/pages.ts",
    "src/data/oldSiteInventory.ts",
    "src/data/oldSiteContentExtract.ts",
    "sanity/seed/migratedContent.ndjson",
  ];
  for (const file of textFiles) {
    const text = readFileSync(path.join(root, file), "utf8");
    for (const match of text.matchAll(/https?:\/\/[^"'\s<>]+\.pdf/gi)) {
      urls.push({
        url: match[0],
        sourcePath: "unknown",
        sourceFile: file,
      });
    }
  }
  for (const entry of sitemapEntries) {
    for (const image of entry.images) {
      if (/\.pdf($|\?)/i.test(image.originalUrl)) {
        urls.push({ url: image.originalUrl, sourcePath: entry.oldPath, sourceFile: "sitemap" });
      }
    }
  }
  return urls;
}

function documentRowsFromAssets(documentAssets, seedDocs, sitemapEntries) {
  const seedByLocalPath = new Map(
    seedDocs.filter((doc) => doc.localPath).map((doc) => [doc.localPath, doc]),
  );
  const remotePdfUrls = collectRemotePdfUrls(sitemapEntries);

  return documentAssets.map((asset) => {
    const seedDoc = seedByLocalPath.get(asset.localPath);
    const fileExists = existsSync(path.join(root, asset.filePath));
    const best = bestDocumentMatch(asset, remotePdfUrls);
    const recoveredOldUrl =
      asset.originalUrl && !asset.originalUrl.startsWith("TODO")
        ? asset.originalUrl
        : best && best.score >= 0.55
          ? best.remote.url
          : "TODO: unknown original URL";
    return {
      oldUrl: recoveredOldUrl,
      localPath: asset.localPath,
      title: seedDoc?.title || filenameStem(asset.localPath),
      sourcePages: asset.sourcePages,
      fileSize: asset.fileSize,
      usedBy: asset.usedBy,
      routeAvailable: asset.usedBy.some((route) => route.startsWith("/")),
      status: fileExists && asset.usedBy.length > 0 ? "migrated" : "needs-review",
      notes:
        recoveredOldUrl.startsWith("TODO")
          ? "Exact old PDF URL was not recoverable from sitemap/local source data."
          : `Recovered likely old URL with confidence ${best?.score.toFixed(2) || "1.00"}.`,
    };
  });
}

function updateManifestOriginalUrls(manifest, matchedImages, documentRows) {
  const docsByLocalPath = new Map(documentRows.map((doc) => [doc.localPath, doc.oldUrl]));
  let updated = 0;
  const nextManifest = manifest.map((entry) => {
    if (entry.assetType === "image") {
      const matched = matchedImages.get(entry.localPath);
      if (matched) {
        updated += 1;
        return {
          ...entry,
          originalUrl: matched,
          notes: String(entry.notes || "").replace(
            "TODO: exact original remote asset URL was not retained in local data; sourcePages records known old pages.",
            "Recovered originalUrl from old sitemap by exact filename match.",
          ),
        };
      }
    }
    if (entry.assetType === "document") {
      const matched = docsByLocalPath.get(entry.localPath);
      if (matched && !matched.startsWith("TODO") && entry.originalUrl?.startsWith("TODO")) {
        updated += 1;
        return {
          ...entry,
          originalUrl: matched,
          notes: String(entry.notes || "").replace(
            "TODO: exact original remote asset URL was not retained in local data; sourcePages records known old pages.",
            "Recovered likely originalUrl from local source data.",
          ),
        };
      }
    }
    return entry;
  });

  if (updated > 0) {
    writeFileSync(
      path.join(root, "sanity", "seed", "assetManifest.json"),
      `${JSON.stringify(nextManifest, null, 2)}\n`,
    );
  }

  return { manifest: nextManifest, updated };
}

function markdownTable(headers, rows) {
  const escape = (value) =>
    String(value ?? "")
      .replace(/\|/g, "\\|")
      .replace(/\n/g, "<br>");
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${headers.map((header) => escape(row[header])).join(" | ")} |`),
  ].join("\n");
}

function listItems(items) {
  if (items.length === 0) return "- Ingen.";
  return items.map((item) => `- ${item}`).join("\n");
}

function summarizeStatuses(rows) {
  return rows.reduce((acc, row) => {
    acc[row.status] = (acc[row.status] || 0) + 1;
    return acc;
  }, {});
}

const modules = loadDataModules();
const { createLegacyContentPage, getAllContentPages, getContentPage } = modules.pages;
const { getOldSiteContentExtract } = modules.contentExtract;
const {
  legacyRoutes,
  oldSiteSitemapStats,
} = modules.legacy;
const { redirectRules } = modules.redirects;
const sitemapXml = fetchText(sitemapUrl);
const sitemapEntries = parseSitemap(sitemapXml);
const contentPages = getAllContentPages();
const contentPageBySlug = new Map(contentPages.map((page) => [page.slug, page]));
const appRoutePages = new Map(
  [
    {
      slug: "/kontakt",
      title: "Kontakt",
      intro: "Sanity-backed contact route with local fallback content.",
      description: "Protected App Router page outside src/data/pages.ts.",
      cards: [],
      sections: [],
      todo: [],
    },
  ].map((page) => [page.slug, page]),
);
const manifest = readJson(path.join(root, "sanity", "seed", "assetManifest.json"), []);
const seedDocs = readNdjson(path.join(root, "sanity", "seed", "migratedContent.ndjson"));
const seedByRoute = new Map(seedDocs.map((doc) => [routeFromSeedDoc(doc), doc]).filter(([route]) => route));
const routeSet = new Set([
  "/",
  ...contentPages.map((page) => page.slug),
  ...appRoutePages.keys(),
  ...legacyRoutes.map(normalizeRoute),
  ...seedDocs.map(routeFromSeedDoc).filter(Boolean),
]);

function pageForOldPath(oldPath) {
  return (
    contentPageBySlug.get(oldPath) ||
    getContentPage(oldPath) ||
    createLegacyContentPage(oldPath)
  );
}

const sitemapByPath = new Map(sitemapEntries.map((entry) => [entry.oldPath, entry]));
const homeSourceEntry = sitemapByPath.get("/") || sitemapByPath.get("/startside");
const routeSitemapEntries = sitemapByPath.has("/")
  ? sitemapEntries
  : [
      {
        oldUrl: `${oldBaseUrl}/`,
        oldPath: "/",
        lastmod: homeSourceEntry?.lastmod,
        images: homeSourceEntry?.images || [],
      },
      ...sitemapEntries,
    ];
const localImageAssets = manifest.filter((entry) => entry.assetType === "image");
const documentAssets = manifest.filter((entry) => entry.assetType === "document");
const { imageRows, matchedLocals } = classifySitemapImages(
  sitemapEntries,
  localImageAssets,
  redirectRules,
);
const documentRows = documentRowsFromAssets(documentAssets, seedDocs, sitemapEntries);
const { manifest: updatedManifest } = updateManifestOriginalUrls(
  manifest,
  matchedLocals,
  documentRows,
);
const localImageAssetsAfterUpdate = updatedManifest.filter((entry) => entry.assetType === "image");
const originalUrlsRecovered = updatedManifest.filter(
  (entry) => !String(entry.originalUrl || "").startsWith("TODO"),
).length;

const routeRows = routeSitemapEntries.map((entry) => {
  const redirect = redirectFor(entry.oldPath, redirectRules);
  const page = pageForOldPath(entry.oldPath) || appRoutePages.get(entry.oldPath);
  const seedDoc = seedByRoute.get(entry.oldPath);
  const localImages = [
    ...new Set([...pageImages(page), seedDoc?.migratedImagePath].filter(Boolean)),
  ];
  const docs = pageDocuments(page);
  const extract = getOldSiteContentExtract(entry.oldPath);
  const status = routeStatus({
    pathname: entry.oldPath,
    page,
    seedDoc,
    redirect,
    sitemapImages: entry.images,
    localImages,
    localDocuments: docs,
    extract,
  });
  const fullBody = bodyComplete(entry.oldPath, page, seedDoc, status);
  return {
    oldUrl: entry.oldUrl,
    oldPath: entry.oldPath,
    newRoute: redirect?.destination || entry.oldPath,
    status,
    contentType: contentTypeFor(entry.oldPath),
    hasTitle: Boolean(page?.title || seedDoc?.title),
    hasIntro: Boolean(page?.intro || seedDoc?.intro || seedDoc?.excerpt || seedDoc?.description),
    hasFullBody: fullBody,
    hasImages: localImages.length > 0 || Boolean(seedDoc?.migratedImagePath),
    hasDocuments: docs.length > 0 || Boolean(seedDoc?.localPath),
    hasInternalLinks: pageLinks(page).some((href) => href.startsWith("/")) || docs.length > 0,
    hasExternalLinks: pageLinks(page).some((href) => /^(https?:\/\/|mailto:|tel:)/.test(href)),
    oldImageCount: entry.images.length,
    localImageCount: localImages.length,
    notes:
      status === "redirect"
        ? `Redirects to ${redirect.destination}.`
        : status === "partial"
          ? entry.oldPath === "/"
            ? "Homepage is checked section-by-section in HOMEPAGE_MIGRATION_AUDIT.md; one or more old sections are incomplete."
            : "Strict audit: local content appears shorter than a full old detail page, lacks reliable extracted body evidence, documents, or not all sitemap images are represented."
          : status === "needs-review"
            ? "Contains TODO/verification markers or unresolved migration text."
            : status === "missing"
              ? "No local page, seed document, or redirect found."
              : "Covered as migrated page in local data.",
  };
});

const legacyOnlyRows = legacyRoutes
  .map(normalizeRoute)
  .filter((route) => !sitemapByPath.has(route))
  .map((oldPath) => {
    const redirect = redirectFor(oldPath, redirectRules);
    const page = pageForOldPath(oldPath) || appRoutePages.get(oldPath);
    const seedDoc = seedByRoute.get(oldPath);
    const status = redirect ? "redirect" : page || seedDoc ? "inventory-only" : "missing";
    return {
      oldUrl: `${oldBaseUrl}${oldPath}`,
      oldPath,
      newRoute: redirect?.destination || oldPath,
      status,
      contentType: contentTypeFor(oldPath),
      hasTitle: Boolean(page?.title || seedDoc?.title),
      hasIntro: Boolean(page?.intro || seedDoc?.intro || seedDoc?.excerpt || seedDoc?.description),
      hasFullBody: bodyComplete(oldPath, page, seedDoc, status),
      hasImages: pageImages(page).length > 0 || Boolean(seedDoc?.migratedImagePath),
      hasDocuments: pageDocuments(page).length > 0 || Boolean(seedDoc?.localPath),
      hasInternalLinks: pageDocuments(page).length > 0,
      hasExternalLinks: /https?:\/\//.test(pageText(page)),
      oldImageCount: 0,
      localImageCount: [
        ...new Set([...pageImages(page), seedDoc?.migratedImagePath].filter(Boolean)),
      ].length,
      notes: "Present in local legacyRoutes baseline but not present in current live sitemap.",
    };
  });

const routes = [...routeRows, ...legacyOnlyRows].sort((a, b) =>
  a.oldPath.localeCompare(b.oldPath),
);

const links = collectExternalAndInternalLinks(sourceFilesForLinks);
const internalLinks = classifyInternalLinks(links.internal, routeSet, redirectRules);
const externalLinks = links.external.map((link) => ({
  sourcePage: link.sourceFile,
  url: link.url,
  purpose: link.purpose,
  status: link.status,
}));

const homepagePage = pageForOldPath("/");
const homepageSeedDoc = seedByRoute.get("/");
const homepageAuditRows = homepageSectionAudit(homepagePage, homepageSeedDoc);
const routeStatusCounts = summarizeStatuses(routes);
const assetStatusCounts = summarizeStatuses(imageRows);
const documentStatusCounts = summarizeStatuses(documentRows);
const todos = [
  ...routes
    .filter((route) => ["partial", "missing", "needs-review", "inventory-only"].includes(route.status))
    .map((route) => ({
      type: "route",
      target: route.oldPath,
      status: route.status,
      task: route.notes,
    })),
  ...imageRows
    .filter((asset) => ["missing", "thumbnail-or-variant", "local-only"].includes(asset.status))
    .slice(0, 120)
    .map((asset) => ({
      type: "image",
      target: asset.originalUrl || asset.localPath,
      status: asset.status,
      task: asset.notes,
    })),
  ...documentRows
    .filter((document) => document.status !== "migrated")
    .map((document) => ({
      type: "document",
      target: document.localPath,
      status: document.status,
      task: document.notes,
    })),
  ...internalLinks
    .filter((link) => link.status === "broken")
    .map((link) => ({
      type: "internal-link",
      target: link.href,
      status: link.status,
      task: link.notes,
    })),
];

const audit = {
  summary: {
    generatedAt: new Date().toISOString(),
    sourceSitemap: sitemapUrl,
    localBaselineUrlCount: oldSiteSitemapStats.urlCount,
    localBaselineImageCount: oldSiteSitemapStats.imageCount,
    liveSitemapUrlCount: sitemapEntries.length,
    liveSitemapImageEntries: sitemapEntries.reduce((sum, entry) => sum + entry.images.length, 0),
    liveSitemapUniqueImageUrls: new Set(
      sitemapEntries.flatMap((entry) => entry.images.map((image) => image.originalUrl)),
    ).size,
    migratedPageCount: routes.filter((route) => route.status === "page").length,
    redirectCount: routes.filter((route) => route.status === "redirect").length,
    partialCount: routes.filter((route) => route.status === "partial").length,
    missingCount: routes.filter((route) => route.status === "missing").length,
    needsReviewCount: routes.filter((route) => route.status === "needs-review").length,
    inventoryOnlyCount: routes.filter((route) => route.status === "inventory-only").length,
    localImageAssets: localImageAssetsAfterUpdate.length,
    localDocumentAssets: documentAssets.length,
    originalUrlsRecovered,
    routeStatusCounts,
    assetStatusCounts,
    documentStatusCounts,
  },
  homepage: homepageAuditRows,
  routes,
  assets: imageRows,
  documents: documentRows,
  internalLinks,
  externalLinks,
  todos,
};

writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);

const homepageMarkdown = `# Homepage Migration Audit

Generated: ${audit.summary.generatedAt}

Source old URL: https://www.fresvik.no/

Sitemap source row used for images: https://www.fresvik.no/startside

## Summary

The homepage is considered migrated only when every old section below has exact text, image and link coverage. A generic hero, summary text or TODO marker is not enough.

${markdownTable(
  [
    "section",
    "existsOnOld",
    "existsOnNew",
    "exactTextMigrated",
    "imagesMigrated",
    "linksMigrated",
    "status",
    "notes",
  ],
  homepageAuditRows,
)}

## Old Section Text Evidence

${homepageAuditRows
  .map((row) => `### ${row.section}\n\n${row.oldText}\n`)
  .join("\n")}

## Final TODO

${listItems(
  homepageAuditRows
    .filter((row) => row.status !== "migrated")
    .map((row) => `${row.section}: ${row.notes}`),
)}
`;

writeFileSync(homepageAuditPath, homepageMarkdown);

const routeTableRows = routes.map((route) => ({
  oldPath: route.oldPath,
  newRoute: route.newRoute,
  status: route.status,
  type: route.contentType,
  title: route.hasTitle ? "yes" : "no",
  intro: route.hasIntro ? "yes" : "no",
  body: route.hasFullBody ? "yes" : "no",
  images: `${route.localImageCount}/${route.oldImageCount}`,
  docs: route.hasDocuments ? "yes" : "no",
  notes: route.notes,
}));

const productServiceRows = routes
  .filter(
    (route) =>
      route.oldPath.startsWith("/produkt/") || route.oldPath.startsWith("/tenester/"),
  )
  .map((route) => ({
    path: route.oldPath,
    status: route.status,
    body: route.hasFullBody ? "yes" : "no",
    images: `${route.localImageCount}/${route.oldImageCount}`,
    docs: route.hasDocuments ? "yes" : "no",
    notes: route.notes,
  }));

const markdown = `# Migration Audit

Generated: ${audit.summary.generatedAt}

## Summary

| Metric | Count |
| --- | ---: |
| Local baseline old URL count | ${audit.summary.localBaselineUrlCount} |
| Live sitemap URL count | ${audit.summary.liveSitemapUrlCount} |
| Local baseline old image count | ${audit.summary.localBaselineImageCount} |
| Live sitemap image entries | ${audit.summary.liveSitemapImageEntries} |
| Live sitemap unique image URLs | ${audit.summary.liveSitemapUniqueImageUrls} |
| Migrated page count | ${audit.summary.migratedPageCount} |
| Redirect count | ${audit.summary.redirectCount} |
| Partial count | ${audit.summary.partialCount} |
| Missing count | ${audit.summary.missingCount} |
| Needs-review count | ${audit.summary.needsReviewCount} |
| Inventory-only count | ${audit.summary.inventoryOnlyCount} |
| Local image assets | ${audit.summary.localImageAssets} |
| Local document/PDF assets | ${audit.summary.localDocumentAssets} |
| Asset originalUrls recovered in manifest | ${audit.summary.originalUrlsRecovered} |

Do not treat the migration as complete while any route, asset, document or link remains \`partial\`, \`missing\`, \`needs-review\`, \`inventory-only\`, \`thumbnail-or-variant\` or \`local-only\`.

The root homepage \`https://www.fresvik.no/\` is audited as its own route even though the live sitemap exposes the same homepage inventory as \`/startside\`. Detailed homepage section coverage is written to \`HOMEPAGE_MIGRATION_AUDIT.md\`.

## Homepage strict audit

${markdownTable(
  [
    "section",
    "existsOnOld",
    "existsOnNew",
    "exactTextMigrated",
    "imagesMigrated",
    "linksMigrated",
    "status",
    "notes",
  ],
  homepageAuditRows,
)}

## Old sitemap coverage

The project baseline in \`src/data/legacyRoutes.ts\` records ${audit.summary.localBaselineUrlCount} URLs and ${audit.summary.localBaselineImageCount} image entries checked earlier. The live donor sitemap currently returns ${audit.summary.liveSitemapUrlCount} URLs and ${audit.summary.liveSitemapImageEntries} image entries (${audit.summary.liveSitemapUniqueImageUrls} unique image URLs). The difference must be treated as source drift until manually reviewed.

## Route coverage

${markdownTable(
  ["oldPath", "newRoute", "status", "type", "title", "intro", "body", "images", "docs", "notes"],
  routeTableRows,
)}

## Content completeness

- News pages: ${routes.filter((route) => route.contentType === "news").length}
- Reference pages: ${routes.filter((route) => route.contentType === "reference").length}
- Product pages/routes: ${routes.filter((route) => route.contentType === "product").length}
- Service pages/routes: ${routes.filter((route) => route.contentType === "service").length}
- Legal/support/company pages/routes: ${
  routes.filter((route) =>
    ["legal", "support", "employee", "page", "document"].includes(route.contentType),
  ).length
}

Any old news/reference detail with only a short migrated summary is marked \`partial\` or \`needs-review\`.

## Asset coverage

| Metric | Count |
| --- | ---: |
| Live sitemap image entries | ${audit.summary.liveSitemapImageEntries} |
| Live sitemap unique image URLs | ${audit.summary.liveSitemapUniqueImageUrls} |
| Local migrated image assets | ${audit.summary.localImageAssets} |
| Sitemap images classified migrated | ${assetStatusCounts.migrated || 0} |
| Sitemap duplicate image entries | ${assetStatusCounts.duplicate || 0} |
| Sitemap thumbnail/variant unresolved | ${assetStatusCounts["thumbnail-or-variant"] || 0} |
| Sitemap images missing local match | ${assetStatusCounts.missing || 0} |
| Local-only images without recovered originalUrl | ${assetStatusCounts["local-only"] || 0} |

## PDF/document coverage

${markdownTable(
  ["localPath", "title", "status", "routeAvailable", "fileSize", "oldUrl", "notes"],
  documentRows.map((document) => ({
    localPath: document.localPath,
    title: document.title,
    status: document.status,
    routeAvailable: document.routeAvailable ? "yes" : "no",
    fileSize: document.fileSize,
    oldUrl: document.oldUrl,
    notes: document.notes,
  })),
)}

## Internal links

| Metric | Count |
| --- | ---: |
| Internal link references | ${internalLinks.length} |
| OK routes | ${internalLinks.filter((link) => link.status === "ok").length} |
| Redirect links | ${internalLinks.filter((link) => link.status === "redirect").length} |
| Asset links OK | ${internalLinks.filter((link) => link.status === "asset-ok").length} |
| Broken links | ${internalLinks.filter((link) => link.status === "broken").length} |

${markdownTable(
  ["href", "sourceFile", "status", "notes"],
  internalLinks
    .filter((link) => link.status === "broken" || link.status === "redirect")
    .map((link) => ({
      href: link.href,
      sourceFile: `${link.sourceFile}:${link.line}`,
      status: link.status,
      notes: link.notes,
    })),
)}

## External links

${markdownTable(
  ["url", "sourcePage", "purpose", "status"],
  externalLinks.map((link) => ({
    url: link.url,
    sourcePage: `${link.sourcePage}:${link.line || ""}`,
    purpose: link.purpose,
    status: link.status,
  })),
)}

## Products and services focus

${markdownTable(["path", "status", "body", "images", "docs", "notes"], productServiceRows)}

## Missing / partial / needs-review

${markdownTable(
  ["type", "target", "status", "task"],
  todos.slice(0, 180).map((todo) => ({
    type: todo.type,
    target: todo.target,
    status: todo.status,
    task: todo.task,
  })),
)}

## Final TODO list

${listItems(
  todos.slice(0, 80).map((todo) => `${todo.type}: ${todo.target} [${todo.status}] - ${todo.task}`),
)}
`;

writeFileSync(markdownPath, markdown);

execFileSync(process.execPath, ["scripts/generate-asset-manifest.mjs"], {
  cwd: root,
  stdio: "inherit",
});

console.log(`Wrote ${path.relative(root, markdownPath)}`);
console.log(`Wrote ${path.relative(root, jsonPath)}`);
console.log(`Updated ${path.relative(root, statusPath)}`);
