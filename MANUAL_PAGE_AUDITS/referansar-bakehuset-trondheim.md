# Manual Page Audit: Bakehuset Trondheim

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/omfattande-leveranse-til-bakehuset-trondheim`
- New route: `/referansar/omfattande-leveranse-til-bakehuset-trondheim`
- Sanity document: `referenceProject-referansar-omfattande-leveranse-til-bakehuset-trondheim`
- Evidence: `migration/evidence/www.fresvik.no/referansar/omfattande-leveranse-til-bakehuset-trondheim`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/omfattande-leveranse-til-bakehuset-trondheim`

## Source Content

The old page content was re-crawled on 2026-07-12 from the live Fresvik site.

Text migrated without rewriting:

```text
Fresvik Produkt har via vår kunde Carrier Refrigeration Norway produsert ein stor leveranse med fryserom, kjølerom og porter til Bakehuset Trondheim.

Bakehuset Trondheim har røter langt tilbake i det førre århundre, og opna nytt bakeri på Tiller i 2022. Vi er glade for at dei valde løysinger frå Fresvik Produkt til det nye bakeriet.

Totalt består leveransen av over 1250 kvadratmeter med panel.

Vi har levert:

2 stk fryserom

3 stk fryseporter med PVC-gardiner

4 stk kjølerom

5 stk pendeldører frå Kvanne Industrier

Takk for eit kjekt oppdrag!
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/20220616-152720-1.jpg`
- `/assets/fresvik/images/old-site/20220616-153035-1-ca797d1273.jpg`
- `/assets/fresvik/images/old-site/20220616-175155-1-67567f4fc5.jpg`
- `/assets/fresvik/images/old-site/20220616-152821-1-44fd99581b.jpg`

All four project images are uploaded to Sanity and referenced by the runtime seed.

## Links

Page-specific links preserved:

- Previous: `/referansar/spesialloysing-torkerom-drageboden-kaupanger`
- Next: `/referansar/fryseromsportar-til-rema-1000-i-narvik`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 4
- hero image ref: `image-5b9ded94bf25be1ffe965cfe0a6ba3d659d70424-2096x2796-jpg`
- gallery refs:
  - `image-5b9ded94bf25be1ffe965cfe0a6ba3d659d70424-2096x2796-jpg`
  - `image-4c56ea7fa65abe18e2dc5f9190f3c1c90d6d0b47-2035x2713-webp`
  - `image-03edcdeb3e53429a00d1a538bba8da8607d879ce-2431x3241-webp`
  - `image-b145d312b750d998be4052b8a12507f2acfb933c-2500x3333-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Certification PDF links remain handled globally through the document/certificate sections, not duplicated as page body text.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images and prev/next links are migrated and verified separately above.
