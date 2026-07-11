# Manual Page Audit: Bunnpris Hammerfest

## Summary

- Old URL: `https://www.fresvik.no/referansar/bunnpris-hammerfest`
- New route: `/referansar/bunnpris-hammerfest`
- Content type: `referenceProject`
- Status: `migrated`
- Runtime source: Sanity document `referenceProject-referansar-bunnpris-hammerfest`

## Old Page Evidence

- Evidence folder: `migration/evidence/www.fresvik.no/referansar/bunnpris-hammerfest`
- Comparison folder: `migration/comparisons/www.fresvik.no/referansar/bunnpris-hammerfest`
- Old crawl counts: 27 text blocks, 20 images, 2 documents, 99 links.

## Content Migration

The page-specific project text was migrated from the old page without marketing rewrite:

- `Bunnpris Hammerfest har fått seg nye rom fra Fresvik Produkt.`
- `Langt nord i vårt vakre land har vi levert eit fryserom og eit kjølerom til meierivarer.`
- `I tillegg til romleveranse, har vi levert innestengningsalarm, frysedør og PVC-gardin til fryserommet.`
- `Takk til Plug-in Norge AS for eit godt samarbeid!`

The old gallery helper text `(Klikk for stor visning)` was intentionally removed from visible runtime content.

## Images

Page-specific project images migrated:

- `/assets/fresvik/images/migrated/1000024746.jpg`
- `/assets/fresvik/images/old-site/1000024748-b7ff43e043.jpg`
- `/assets/fresvik/images/old-site/1000024750-95c1c49ec6.jpg`

All three images have Sanity asset refs in `migratedContent.withAssets.ndjson` and in the runtime Sanity document.

## Links

Page-specific old reference navigation preserved:

- Previous: `/referansar/bjerkreim-legekontor-vikesaa`
- Next: `/referansar/kjolerom-kjoledor-bunnpris-volda`

Global navigation, footer, author profile and old Squarespace utility links were not treated as page-specific content.

## Verification

- Sanity runtime document updated with `3` migration sections.
- Runtime image section contains `3` image items.
- `description` no longer contains `(Klikk for stor visning)`.

