# Manual Page Audit: Drageboden Kaupanger

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/spesialloysing-torkerom-drageboden-kaupanger`
- New route: `/referansar/spesialloysing-torkerom-drageboden-kaupanger`
- Sanity document: `referenceProject-referansar-spesialloysing-torkerom-drageboden-kaupanger`
- Evidence: `migration/evidence/www.fresvik.no/referansar/spesialloysing-torkerom-drageboden-kaupanger`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/spesialloysing-torkerom-drageboden-kaupanger`

## Source Content

The old page content was re-crawled on 2026-07-12 from the live Fresvik site.

Text migrated without rewriting:

```text
Fresvik Produkt leverer så mangt! Drageboden på Kaupanger har no fått skreddarsydde panel som blir nytta som to tørkerom til trevirke.

Dageboden har mellom anna stått for prefabrikering og utsmykking av hytta Hugin/Ramnereiret på Kaupanger. Dei jobbar med treverk, og fekk behov for tørkerom til materialane. Panel frå Fresvik Produkt blei ei god løysing.

Her gjekk vi for ei rustfri overflate på innsida, på grunn av den høge varmen (opp til 60-70 gradar!). Vi leverte ein laus vegg på begge rom, slik at dei kan opne heile veggen og køyre inn pallar med treverk. Kunde har sjølv montert lås.

Takk for eit kjekt prosjekt litt utanom det vanlege!
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/dsc03066.jpg`
- `/assets/fresvik/images/old-site/img-4862-2f840ea519.jpeg`
- `/assets/fresvik/images/old-site/dsc03067-556655ed95.jpg`
- `/assets/fresvik/images/old-site/012ea3a01a484d6f8fb98e3ffb7f11bf-89343347bc.jpg`
- `/assets/fresvik/images/old-site/dsc03068-6b5d38613b.jpg`
- `/assets/fresvik/images/old-site/dsc03069-3979d8cacb.jpg`
- `/assets/fresvik/images/old-site/dsc03070-9fdfd3fbdd.jpg`
- `/assets/fresvik/images/old-site/dsc03071-873cd2675b.jpg`
- `/assets/fresvik/images/old-site/img-4867-bf46ca70a7.jpeg`

All nine project images are uploaded to Sanity and referenced by the runtime seed.

## Links

Page-specific links preserved:

- Previous: `/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark`
- Next: `/referansar/omfattande-leveranse-til-bakehuset-trondheim`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 9
- hero image ref: `image-8b815db6192592effdc7538f46b92da56353fddd-2500x1875-jpg`
- gallery refs:
  - `image-8b815db6192592effdc7538f46b92da56353fddd-2500x1875-jpg`
  - `image-e5f0e8c5883280b560b6a779107d0569a395aa79-2500x3333-webp`
  - `image-26e947016a801b108ba8eed11b058f0e2d3bf390-2500x1875-webp`
  - `image-8c7af38d6355b3d04cb6dcc3d47a4568f97fe872-935x702-webp`
  - `image-2f2bc3b9f3c12e3044ddcf42b2e7486ae43298b4-2500x1875-webp`
  - `image-996be721a8f87baedc1d9cd983215123e94951fb-2500x1875-webp`
  - `image-1f457b49a7644ba534b68de5201ab27bdb899b62-2500x1875-webp`
  - `image-944d9d52689dcd447b005cecfdec91aa0c05822e-2500x1875-webp`
  - `image-38f454f49b73bc2bc8b6fc1c4bc45d7d9001a4f7-2500x3333-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Certification PDF links remain handled globally through the document/certificate sections, not duplicated as page body text.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images and prev/next links are migrated and verified separately above.
