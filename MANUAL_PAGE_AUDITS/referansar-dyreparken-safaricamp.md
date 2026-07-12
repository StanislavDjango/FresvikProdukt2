# Manual Page Audit: Dyreparken Safaricamp

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark`
- New route: `/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark`
- Sanity document: `referenceProject-referansar-ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark`
- Evidence: `migration/evidence/www.fresvik.no/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark`

## Source Content

The old page content was re-crawled on 2026-07-12 from the live Fresvik site.

Text migrated without rewriting:

```text
Fresvik Produkt har levert eit fryserom, fem kjølerom, innestengingsalarm, PVC-gardin og sju dører til Dyreparken Safaricamp i Kristiansand Dyrepark. Dørene er levert med sjølvlukkande hengsler – Fresvik Hengsler, som garanterer at døra aldri blir ståande åpen meir enn den trenger.

Som einaste norske produsent av isolasjonspanel, dører og portar til kjøle- og fryserom, tilbyr me skreddarsydde løysingar som sikrar funksjonalitet og tryggleik. Produkta er kortreiste og av høg kvalitet, med enkel montering takka vere eksenterlås og med smarte løysingar som Fresvik Hengsle. Med hovudkontor og produksjonsanlegg i Fresvik i Sogn og salgsavdeling i Drammen, leverer me påliteleg og effektivt over heile Noreg.
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/fp-dyreparken.jpg`
- `/assets/fresvik/images/old-site/fp-dyreparken-1-d75e447c80.jpg`

Both project images are uploaded to Sanity and referenced by the runtime seed.

## Links

Page-specific links preserved:

- Previous: `/referansar/nye-leveransar-til-rema-1000-ya-i-larvik`
- Next: `/referansar/spesialloysing-torkerom-drageboden-kaupanger`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 2
- hero image ref: `image-62110a9c09ba5d178d265fc71d070a46fa602dd4-2500x1875-jpg`
- gallery refs:
  - `image-62110a9c09ba5d178d265fc71d070a46fa602dd4-2500x1875-jpg`
  - `image-01e452dccc8f7e864033b8e75d9b5e925cc17e53-2500x3333-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Certification PDF links remain handled globally through the document/certificate sections, not duplicated as page body text.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images and prev/next links are migrated and verified separately above.
