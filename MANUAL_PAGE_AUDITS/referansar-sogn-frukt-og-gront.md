# Manual Page Audit: Sogn Frukt og Grønt

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront`
- New route: `/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront`
- Sanity document: `referenceProject-referansar-fryse-og-kjolerom-til-sogn-frukt-og-gront`
- Evidence: `migration/evidence/www.fresvik.no/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront`

## Source Content

The old page content was re-crawled on 2026-07-13 from the live Fresvik site.

Text migrated without rewriting:

```text
I årets første månedar har vi hatt gleda av å levere fryse- og kjølerom til Fellespakkeriet på Håbakken i Lærdal, Sogn Frukt og Grønt.

Vår leveranse bestod av 3 700 m2 panel i tjukkelsar frå 75 mm til 175 mm, produsert til 3 fryserom og 10 kjølerom.

11 spesialportar blei levert av nederlandske Salco.

Montasje blei utført av AKS Montering.

Har du spørsmål om Fresvik kjølerom - ta kontakt med vår salsavdeling

Bilder frå leveransen:
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/img-2589.jpg`
- `/assets/fresvik/images/old-site/img-0650-b498a58520.jpeg`
- `/assets/fresvik/images/old-site/img-1340-a8752cb661.jpeg`
- `/assets/fresvik/images/old-site/img-1679-ee1a28ad1e.jpeg`

All four project images are uploaded to Sanity and referenced by the runtime seed.

## Links

Page-specific links preserved:

- Previous: `/referansar/fryseromsportar-til-rema-1000-i-narvik`
- Next: `/referansar/fryserom-fryseport-rentokil`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 4
- hero image ref: `image-d04792ce4f6360ebb55cb7d3b746d87cf9ca1ab6-2048x1152-jpg`
- gallery refs:
  - `image-d04792ce4f6360ebb55cb7d3b746d87cf9ca1ab6-2048x1152-jpg`
  - `image-f528bfc1354ce359516a7747df33c799daec21cd-2048x1536-webp`
  - `image-ac01d354e14994488aacd54c99a5772e51db56ce-2048x1536-webp`
  - `image-ed11bec2dea3d4bb9b07855588b30247875d094f-2048x1536-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Certification PDF links in the old footer remain handled globally through the document/certificate sections, not duplicated as page body text.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images and prev/next links are migrated and verified separately above.
