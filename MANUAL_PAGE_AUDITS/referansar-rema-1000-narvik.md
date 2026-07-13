# Manual Page Audit: Rema 1000 Narvik

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/fryseromsportar-til-rema-1000-i-narvik`
- New route: `/referansar/fryseromsportar-til-rema-1000-i-narvik`
- Sanity document: `referenceProject-referansar-fryseromsportar-til-rema-1000-i-narvik`
- Evidence: `migration/evidence/www.fresvik.no/referansar/fryseromsportar-til-rema-1000-i-narvik`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/fryseromsportar-til-rema-1000-i-narvik`

## Source Content

The old page content was re-crawled on 2026-07-12 from the live Fresvik site.

Text migrated without rewriting:

```text
Fresvik Produkt har levert fryseromsportar til vår kunde Relog AS. Dei er no komne på plass hjå Rema 1000 i Narvik.

Leveransen består totalt av tre store fryseromsportar og fem fryseromsdører. Fresvik skyveportar er kjende for sin kvalitet og gode isoleringsevne, og er skreddarsydd til kunde ved vår fabrikk.

Vi valgte Fresvik Produkt på grunnlag av anbefaling og pris. Vi kommer nok til å bruke dem igjen ved en senere anledning også!

- Lars Skjetne, prosjektleder i Relog AS

Fleire bilde frå leveransen:

Klikk på bilda for stor visning.
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/img-6262.jpg`
- `/assets/fresvik/images/old-site/image002-0cccfb9d1c.jpg`
- `/assets/fresvik/images/old-site/image003-ae909e6bb8.jpg`
- `/assets/fresvik/images/old-site/img-6262-7fe02e1c0b.jpg`
- `/assets/fresvik/images/old-site/img-6263-356dfec01d.jpg`

All five project images are uploaded to Sanity and referenced by the runtime seed.

## Links

Page-specific links preserved:

- Previous: `/referansar/omfattande-leveranse-til-bakehuset-trondheim`
- Next: `/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 5
- hero image ref: `image-8b23d86c3b247e2685e7d452e656a5d13a8a8058-2016x1134-jpg`
- gallery refs:
  - `image-8b23d86c3b247e2685e7d452e656a5d13a8a8058-2016x1134-jpg`
  - `image-ae677221eb0badc5ecea9a03a2301423ade94289-1512x2016-webp`
  - `image-6c5a13488008e0a386e4dffbff5453ea4a77b5c8-1512x2016-webp`
  - `image-635d4700e5199d7b930783a331be90cbafe061eb-2016x1512-webp`
  - `image-759b73924158c757884d00a028ceb62bd23f46dd-2016x1512-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Certification PDF links in the old footer remain handled globally through the document/certificate sections, not duplicated as page body text.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images and prev/next links are migrated and verified separately above.
