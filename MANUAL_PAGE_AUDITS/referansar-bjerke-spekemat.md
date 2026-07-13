# Manual Page Audit: Bjerke spekemat og delikatesse

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/bjerke-spekemat`
- New route: `/referansar/bjerke-spekemat`
- Sanity document: `referenceProject-referansar-bjerke-spekemat`
- Evidence: `migration/evidence/www.fresvik.no/referansar/bjerke-spekemat`

## Source Content

The old page content was re-crawled on 2026-07-13 from the live Fresvik site.

Text migrated without rewriting:

```text
Bjerke Spekemat og Delikatesser AS i Helgeroa opplever fin vekst og har nettopp investert i nytt produksjonslokale.

Her har vi i Fresvik Produkt installert:

utvendige fasadepanel
innvendige skillevegger
himlinger
dører
portar

Eit ganske så typisk Fresvik Produkt-prosjekt i vår største bransje - næringsmiddelbransjen.

Monteringa er blitt gjennomført av våre gode partner, AKS Montering v/Anders Sætre, som også har teke foto.

Om Bjerke spekemat og delikatesse

Bjerke Spekemat og Delikatesse AS i Helgeroa i Vestfold er ei kombinert produksjons- og handelsbedrift med historie tilbake til 1975. Dei har 35 tilsette og ei årleg omsetning rundt 100 mill. kroner. Med eit veldig sterkt fokus på norske råvarer og høg kvalitet, er kvalitet på kjølerom og produksjonslokale ein viktig faktor for selskapet, og vi i Fresvik er glade for å vere ein samarbeidspartnar.
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/fresvik-aks-montering1.jpg`
- `/assets/fresvik/images/old-site/fresvik-aks-montering2-1b72163da7.jpg`
- `/assets/fresvik/images/old-site/fresvik-aks-montering4-969d79d1cf.jpg`
- `/assets/fresvik/images/old-site/fresvik-aks-montering5-55466bac4e.jpg`

All four project images are uploaded to Sanity and referenced by the runtime seed.

## Documents

The two documents found in the old page evidence are global footer/certification documents:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

They are handled globally through the document/certificate migration and are not duplicated as project-specific documents.

## Links

Page-specific links preserved:

- Category: `/referansar/category/Framside-referansar`
- Category: `/referansar/category/Storkj%C3%B8kken-restaurant`
- Bjerke Spekemat og Delikatesse AS: `https://www.bjerkemat.no/`
- Previous: `/referansar/buskerud-storcash`
- Next: `/referansar/restauranthuset-malin`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 4
- hero image ref: `image-fa4543d64a00fd29435f0277f6d1217e3845ca8b-2500x1867-jpg`
- gallery refs:
  - `image-fa4543d64a00fd29435f0277f6d1217e3845ca8b-2500x1867-jpg`
  - `image-e0ad131f57898a50f45cef79b55c51294c430b7f-2500x1867-webp`
  - `image-106588e0187aed62059946e1f73bdc484d2a71c9-2500x1867-webp`
  - `image-6f6377071419583e9f42605679fe58811e62f693-2500x1867-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images, category links, external Bjerke link and prev/next links are migrated and verified separately above.
