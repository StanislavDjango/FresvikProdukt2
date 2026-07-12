# Manual Page Audit: Vik helse- og omsorgssenter

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/vik-helse-og-omsorgssenter`
- New route: `/referansar/vik-helse-og-omsorgssenter`
- Sanity document: `referenceProject-referansar-vik-helse-og-omsorgssenter`
- Evidence: `migration/evidence/www.fresvik.no/referansar/vik-helse-og-omsorgssenter`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/vik-helse-og-omsorgssenter`

## Source Content

The old page content was re-crawled on 2026-07-12 from the live Fresvik site.

Text migrated without rewriting:

```text
Fresvik Produkt har hittil levert 5 kjølerom og 1 fryserom med tilhøyrande dørar.
Ei stor utbygging er på gang i Vik når det nye helse- og omsorgssenteret er under bygging. Etter planen skal bygginga pågå heilt til 2026, men ein del er ferdigstilt og teke i bruk.
Fresvik Produkt er stolt leverandør av kjøle- og fryserom til dette anlegget. Hittil har vi levert 5 kjølerom og 1 fryserom med tilhøyrande dørar.
Dette har vi levert gjennom Sogn Kjøleservice, takk for godt samarbeid.
Fresvik Produkt er stolte over å kunne produsere og levere dette i eigen kommune.
```

The old visible helper text `Sjå fleire bilde frå prosjektet:` is represented by the gallery section title instead of being duplicated inside the project body.

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/vik-helse-og-sjukeheim-1.jpg`
- `/assets/fresvik/images/old-site/vik-helse-og-sjukeheim-2-9d84f6c72a.jpg`
- `/assets/fresvik/images/old-site/vik-helse-og-sjukeheim-3-741bbf0fef.jpg`
- `/assets/fresvik/images/old-site/vik-helse-og-sjukeheim-4-f1a14468b8.jpg`
- `/assets/fresvik/images/old-site/vik-helse-og-sjukeheim-5-549411dc5b.jpg`

All five images are expected to be uploaded to Sanity and referenced by the runtime seed.

## Links

Page-specific links preserved:

- External partner: `https://www.sognkulde.no/`
- Previous: `/referansar/fryserom-coop-obs-alnabru`
- Next: `/referansar/fryse-og-kjolerom-kiwi-otta`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 5
- hero image ref: `image-89521047913acc09957fdce9407330398ce70a29-1280x960-jpg`
- gallery refs:
  - `image-89521047913acc09957fdce9407330398ce70a29-1280x960-jpg`
  - `image-a9c26accc803cf712671f60c4f257742e9e9f999-1280x1707-webp`
  - `image-dd3166d67d0afd40ec2d7129523d1042cca40ec8-1280x1707-webp`
  - `image-90a8d2689cc33869976c82b94bd49283172f1550-1280x1707-webp`
  - `image-143cd43d0d5a66f39d9d6e924095a3fed946743c-1280x1707-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Certification PDF links remain handled globally through the document/certificate sections, not duplicated as page body text.
- Automated compare reports `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images, partner link and prev/next links are migrated and verified separately above.
