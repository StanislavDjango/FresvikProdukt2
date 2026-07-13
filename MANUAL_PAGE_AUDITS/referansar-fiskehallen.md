# Manual Page Audit: Fiskehallen

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/fiskehallen`
- New route: `/referansar/fiskehallen`
- Sanity document: `referenceProject-referansar-fiskehallen`
- Evidence: `migration/evidence/www.fresvik.no/referansar/fiskehallen`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/fiskehallen`

## Source Content

The old page content was re-crawled on 2026-07-13 from the live Fresvik site.

Text migrated without rewriting:

```text
Fresvik Produkt har gjennom åra levert mykje til Fiskehallen, og til mange ulike kundar der.

Siste del av året har vi hatt leveransar til Sjømat AS, som også held til her. Bileta viser litt av dette anlegget.

Dette prosjektet har bestått av både takflate, vegger og portar.

Også på Fiskehallen er det AKS Montering som er den føretrekte montøren.
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/fiskehallen1.jpg`
- `/assets/fresvik/images/old-site/fiskehallen2-14ed360ecf.jpg`
- `/assets/fresvik/images/old-site/fiskehallen3-97fbee8985.jpg`

All three project images are uploaded to Sanity and referenced by the runtime seed.

## Documents

The two documents found in the old page evidence are global footer/certification documents:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

They are handled globally through the document/certificate migration and are not duplicated as project-specific documents.

## Links

Page-specific links preserved:

- Category: `/referansar/category/Storkj%C3%B8kken-restaurant`
- Previous: `/referansar/karlsoybruket`
- Next: `/referansar/celsa-steel-sotra`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 3
- hero image ref: `image-7454f1f8e0f55af558d87d681f3e7e68f480857e-320x240-jpg`
- gallery refs:
  - `image-7454f1f8e0f55af558d87d681f3e7e68f480857e-320x240-jpg`
  - `image-9b25bc649510f59550f2e3a4ea427f34c2ba23af-320x240-webp`
  - `image-67bab82e6affc00d3fabd8ab6f9ed91d164b387a-320x240-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images and prev/next/category links are migrated and verified separately above.
