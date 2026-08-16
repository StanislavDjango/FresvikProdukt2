import { createHash } from "node:crypto";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "next-sanity";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

for (const filename of [".env.local", ".env"]) {
  const envPath = path.join(root, filename);
  if (!existsSync(envPath)) continue;

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

const required = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "SANITY_AUTH_TOKEN",
];

for (const name of required) {
  if (!process.env[name]) throw new Error(`Manglar miljøvariabel: ${name}`);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const sourceUrl =
  "https://www.facebook.com/permalink.php?story_fbid=pfbid02GmoHd8JBKY5X5HKh7LEt31KBoUZwst6gweTkTS4QoQBipvffKB2fmViQYYwmt3P9l&id=100057316063120";
const assetDir = path.join(root, "public/assets/fresvik/news/nytt-utstyr-naermar-seg");
const imageFiles = ["01.jpeg", "02.jpeg", "03.jpeg", "04.jpeg", "05.jpeg"];

async function uploadImage(filename) {
  const filePath = path.join(assetDir, filename);
  const sha1 = createHash("sha1").update(readFileSync(filePath)).digest("hex");
  const existingId = await client.fetch(
    '*[_type == "sanity.imageAsset" && sha1hash == $sha1][0]._id',
    { sha1 },
  );

  if (existingId) return existingId;

  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: `fresvik-nytt-utstyr-${filename}`,
  });
  return asset._id;
}

const imageIds = [];
for (const filename of imageFiles) imageIds.push(await uploadImage(filename));

function imageReference(assetId) {
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

function cards(language) {
  return imageIds.map((assetId, index) => ({
    _type: "migrationCard",
    _key: `facebook-equipment-image-${index + 1}`,
    title:
      language === "en"
        ? `New equipment at Fresvik Produkt, image ${index + 1}`
        : `Nytt utstyr hos Fresvik Produkt, bilete ${index + 1}`,
    text: "",
    image: imageReference(assetId),
    imageAlt:
      language === "en"
        ? `Installation and commissioning of new equipment at Fresvik Produkt, image ${index + 1}`
        : `Installasjon og testing av nytt utstyr hos Fresvik Produkt, bilete ${index + 1}`,
    migratedImagePath: `/assets/fresvik/news/nytt-utstyr-naermar-seg/${imageFiles[index]}`,
    migrationBackupLocalPath: `/assets/fresvik/news/nytt-utstyr-naermar-seg/${imageFiles[index]}`,
  }));
}

function article({ language, id, title, slug, excerpt, paragraphs, sourceLabel }) {
  return {
    _id: id,
    _type: "newsArticle",
    language,
    title,
    slug: { _type: "slug", current: slug },
    date: "2026-08-11",
    excerpt,
    sourceUrl,
    image: imageReference(imageIds[0]),
    migratedImagePath: `/assets/fresvik/news/nytt-utstyr-naermar-seg/${imageFiles[0]}`,
    migrationCards: cards(language),
    migrationSections: [
      {
        _type: "migrationSection",
        _key: "news-article-main",
        kind: "article-body",
        translationKey: "news-article-main",
        title,
        intro: excerpt,
        items: [
          {
            _type: "migrationCard",
            _key: "article-copy",
            title,
            text: paragraphs.join("\n\n"),
          },
        ],
      },
      {
        _type: "migrationSection",
        _key: "news-source-links",
        kind: "source-links",
        translationKey: "news-source-links",
        title: "Facebook",
        intro: "",
        items: [
          {
            _type: "migrationCard",
            _key: "facebook-source",
            title: sourceLabel,
            text: "Fresvik Produkt",
            href: sourceUrl,
          },
        ],
      },
    ],
    seoTitle: title,
    seoDescription: excerpt,
  };
}

const norwegian = article({
  language: "nn",
  id: "newsArticle-facebook-new-equipment-nn",
  title: "Nytt utstyr nærmar seg oppstart",
  slug: "aktuelt/nytt-utstyr-naermar-seg",
  excerpt: "Mykje skal testast før nytt utstyr kan køyrast i gang.",
  paragraphs: [
    "Mykje som skal testast før ein kan køyra i gang nytt utstyr.",
    "Mange meter med røyr er hengt opp og sveisa, mange meter med kabel er på plass, innsprøytingspistol på plass, skjerm mm. 👍🙂👏",
    "Nærmar seg.",
  ],
  sourceLabel: "Sjå originalinnlegget på Facebook",
});

const english = article({
  language: "en",
  id: "newsArticle-facebook-new-equipment-en",
  title: "New equipment nearing commissioning",
  slug: "about/news/nytt-utstyr-naermar-seg",
  excerpt: "A lot needs to be tested before new equipment can be put into operation.",
  paragraphs: [
    "A lot needs to be tested before new equipment can be put into operation.",
    "Many metres of pipe have been installed and welded, many metres of cable are in place, and the injection gun, display and more are ready. 👍🙂👏",
    "We are getting close.",
  ],
  sourceLabel: "View the original post on Facebook",
});

await client.transaction().createOrReplace(norwegian).createOrReplace(english).commit();

console.log("Publisert i Sanity:");
console.log("/aktuelt/nytt-utstyr-naermar-seg");
console.log("/en/about/news/nytt-utstyr-naermar-seg");
