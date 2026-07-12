# Manual Page Audit: Coop Obs Alnabru

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/fryserom-coop-obs-alnabru`
- New route: `/referansar/fryserom-coop-obs-alnabru`
- Sanity document: `referenceProject-referansar-fryserom-coop-obs-alnabru`
- Evidence: `migration/evidence/www.fresvik.no/referansar/fryserom-coop-obs-alnabru`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/fryserom-coop-obs-alnabru`

## Source Content

The old page content was re-crawled on 2026-07-12 from the live Fresvik site.

Text migrated without rewriting:

```text
Fresvik Produkt fekk jobben med å levere eit nytt stort fryserom til Coop Obs Alnabru tidlegare i 2024.
I tillegg til fryserommet leverte vi fryseport, PVC-gardin og innestengningsalarm.
Vi takkar for oppdraget og godt samarbeid med Coolteam.
```

The old visible helper text `(Klikk for stor visning)` was not migrated because it only described Squarespace lightbox behavior.

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/fryserom-obs-alna-3-red.jpg`
- `/assets/fresvik/images/old-site/fryserom-obs-alna-4-red-2d87e8b63a.jpg`
- `/assets/fresvik/images/old-site/fryserom-obs-alna-5-red-f01c79a8c6.jpg`

All three images are uploaded to Sanity and referenced by the runtime seed.

## Links

Page-specific links preserved:

- External partner: `https://coolteam.no/`
- Previous: `/referansar/kjolerom-kjoledor-bunnpris-volda`
- Next: `/referansar/vik-helse-og-omsorgssenter`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 3
- hero image ref: `image-d164b76f3c45999ad3b47ccc7642cda7138be95f-1280x1706-jpg`
- gallery refs:
  - `image-d164b76f3c45999ad3b47ccc7642cda7138be95f-1280x1706-jpg`
  - `image-55457c24a3ac69fb8eb6f0f68cce6d9823d4d724-1280x1707-webp`
  - `image-c03d11ab3471f077011f06f2d5fec63fd32e388a-1280x1639-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Certification PDF links remain handled globally through the document/certificate sections, not duplicated as page body text.
- Automated compare status is `partial` because it counts old global Squarespace footer/newsletter/author/decor assets. The page-specific project text, gallery images, partner link and prev/next links are migrated and verified separately above.
