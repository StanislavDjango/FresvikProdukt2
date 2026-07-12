# Manual Page Audit: Kiwi Otta

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/fryse-og-kjolerom-kiwi-otta`
- New route: `/referansar/fryse-og-kjolerom-kiwi-otta`
- Sanity document: `referenceProject-referansar-fryse-og-kjolerom-kiwi-otta`
- Evidence: `migration/evidence/www.fresvik.no/referansar/fryse-og-kjolerom-kiwi-otta`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/fryse-og-kjolerom-kiwi-otta`

## Source Content

The old page content was re-crawled on 2026-07-12 from the live Fresvik site.

Text migrated without rewriting:

```text
Fresvik Produkt har levert fryse- og kjølerom til nok ein Kiwi-butikk, denne gongen i flotte Otta, nord i Gudbrandsdalen.
Her har vi levert eitt fryserom med frysedør, innestengningsalarm og PVC-gardin, samt 4 kjølerom med både våre eigne dører og pendeldører frå Kvanne Industrier.
Vi takkar Carrier for eit godt samarbeid!
```

The old visible helper text `Sjå fleire bilde frå prosjektet:` is represented by the gallery section title instead of being duplicated inside the project body.

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/kiwi-otta-1.jpeg`
- `/assets/fresvik/images/old-site/kiwi-otta-2-bcce8cf47d.jpeg`
- `/assets/fresvik/images/old-site/kiwi-otta-3-91dee182be.jpeg`
- `/assets/fresvik/images/old-site/kiwi-otta-4-dea768e669.jpeg`
- `/assets/fresvik/images/old-site/kiwi-otta-5-9a1569c04c.jpeg`
- `/assets/fresvik/images/old-site/kiwi-otta-6-374399c9c5.jpeg`
- `/assets/fresvik/images/old-site/kiwi-otta-7-09c22d5667.jpg`

All seven images are expected to be uploaded to Sanity and referenced by the runtime seed.

## Links

Page-specific links preserved:

- Previous: `/referansar/vik-helse-og-omsorgssenter`
- Next: `/referansar/nye-leveransar-til-rema-1000-ya-i-larvik`

Carrier and Kvanne Industrier are mentioned in the old text but were not linked on the old page.

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 7
- hero image ref: `image-ef84ff4a1886e6279cd9e98e9e8cc83accf823f2-1707x2276-jpg`
- gallery refs:
  - `image-ef84ff4a1886e6279cd9e98e9e8cc83accf823f2-1707x2276-jpg`
  - `image-81bc5d134a9f6597bb84dc00540fb5219212694b-1707x2276-webp`
  - `image-0edad00a6ad76c6b950998ff52df568db2d5a05c-1707x2276-webp`
  - `image-e10ad385e259b2954059d7c7695d2e9f4f87d063-1280x960-webp`
  - `image-8b08021b1da9671fa4d63c048697388e59e9cfba-1707x2276-webp`
  - `image-58953448c92086b53d528cff2a236ce6767afb5c-1707x2276-webp`
  - `image-1083325c5d86a4859763d465c606fc72798a727e-1707x2276-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Certification PDF links remain handled globally through the document/certificate sections, not duplicated as page body text.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images and prev/next links are migrated and verified separately above.
