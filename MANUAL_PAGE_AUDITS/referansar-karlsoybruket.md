# Manual Page Audit: Karlsøybruket

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/karlsoybruket`
- New route: `/referansar/karlsoybruket`
- Sanity document: `referenceProject-referansar-karlsoybruket`
- Evidence: `migration/evidence/www.fresvik.no/referansar/karlsoybruket`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/karlsoybruket`

## Source Content

The old page content was re-crawled on 2026-07-13 from the live Fresvik site.

Text migrated without rewriting:

```text
På førjulsvinteren 2017 har Fresvik Produkt levert og montert deler av eit større anlegg til Isowest AS.

Karlsøybruket bygger nye produksjonslokaler for kvitfisk, og vi har levert vegger til sluser, kjølerom og produksjonskontor, samt kjøleport og glassfiberdører i inner- og yttervegger.

Over nyttår skal vi til same anlegget levere og montere fasadepanel til nytt bygg for renseanlegg mm.

Prosjektet har gått som planlagt, og vi ser fram til fortsettelsen på nyåret.
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/img-7324.jpg`
- `/assets/fresvik/images/old-site/img-7326-a7f540f769.jpg`
- `/assets/fresvik/images/old-site/port-karls-ybruket-2017-a668d7c80d.jpg`

All three project images are uploaded to Sanity and referenced by the runtime seed.

## Documents

The two documents found in the old page evidence are global footer/certification documents:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

They are handled globally through the document/certificate migration and are not duplicated as project-specific documents.

## Links

Page-specific links preserved:

- Isowest AS: `http://www.isowest.no/`
- Previous: `/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar`
- Next: `/referansar/fiskehallen`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 3
- hero image ref: `image-f1d4f8c714b25cdaad7e271020721c585561c75c-1224x1632-jpg`
- gallery refs:
  - `image-f1d4f8c714b25cdaad7e271020721c585561c75c-1224x1632-jpg`
  - `image-4036432820169cb3c691afa7fc831ea639ac7626-1632x1224-webp`
  - `image-07d5f40f888d4c4e7b0ee866e81d739665f3698e-1632x1224-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images and prev/next/project links are migrated and verified separately above.
