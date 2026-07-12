# Manual Page Audit: Rema 1000 Øya Larvik

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/nye-leveransar-til-rema-1000-ya-i-larvik`
- New route: `/referansar/nye-leveransar-til-rema-1000-ya-i-larvik`
- Sanity document: `referenceProject-referansar-nye-leveransar-til-rema-1000-ya-i-larvik`
- Evidence: `migration/evidence/www.fresvik.no/referansar/nye-leveransar-til-rema-1000-ya-i-larvik`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/nye-leveransar-til-rema-1000-ya-i-larvik`

## Source Content

The old page content was re-crawled on 2026-07-12 from the live Fresvik site.

Text migrated without rewriting:

```text
Tidlegare i år leverte Fresvik Produkt nye kjøle- og fryserom til Rema 1000 Øya i Gamle Kongevei 47 i Larvik. Leveransen inkluderte eit fryserom og eit kjølerom, komplett med dører, innestengingsalarm, PVC-gardin og kjørerampe.
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/1715599204491-upscale.jpeg`
- `/assets/fresvik/images/old-site/1715599206722-upscale-2137d27afe.jpeg`
- `/assets/fresvik/images/old-site/1715599204829-upscale-2-346667b36f.jpeg`

All three images are expected to be uploaded to Sanity and referenced by the runtime seed.

## Links

Page-specific links preserved:

- Previous: `/referansar/fryse-og-kjolerom-kiwi-otta`
- Next: `/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 3
- hero image ref: `image-973d38d17b2ba602568927e77f73ab86b90c9e04-2290x1636-jpg`
- gallery refs:
  - `image-973d38d17b2ba602568927e77f73ab86b90c9e04-2290x1636-jpg`
  - `image-acaba0d5fd29612de6b33a40c8a334755d544da6-1990x1422-webp`
  - `image-cd526e44d26267a854774de2af10e3f822f022ea-2018x1442-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Certification PDF links remain handled globally through the document/certificate sections, not duplicated as page body text.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images and prev/next links are migrated and verified separately above.
