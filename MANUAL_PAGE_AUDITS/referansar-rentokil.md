# Manual Page Audit: Rentokil

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/fryserom-fryseport-rentokil`
- New route: `/referansar/fryserom-fryseport-rentokil`
- Sanity document: `referenceProject-referansar-fryserom-fryseport-rentokil`
- Evidence: `migration/evidence/www.fresvik.no/referansar/fryserom-fryseport-rentokil`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/fryserom-fryseport-rentokil`

## Source Content

The old page content was re-crawled on 2026-07-13 from the live Fresvik site.

Text migrated without rewriting:

```text
Fresvik Produkt AS har levert og montert fryserom for Kelvin AS til Rentokil på Lahaugmoen i Skjetten kommune.

Rentokil skal bruke rommet til å fryse ned møbler og klær/tekstiler som er infisert av skadedyr, veggdyr, skjeggkre o.l.

Størrelse på rom: 14600 x 11750 x 3725 mm

Fryseport: 2700 x 2700 mm.

Som vanleg med alle Fresvik fryserom, blir alle rom levert ferdig tilpassa med eksenterlås i alle overganger. Dette forkortar monteringstida og gir minimalt med avfall på byggeplass.

I tillegg til rom og fryseport, har vi i dette prosjektet levert ei spesialbygd rampe.

Vite meir om våre produkt? Ta kontakt med vår salsavdeling
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/resvik-fryserom-innvendig-2.jpg`
- `/assets/fresvik/images/old-site/innvendig-m-bler-kl-r-7ee2829374.jpg`
- `/assets/fresvik/images/old-site/innvendig-port-f20899ab4a.jpg`
- `/assets/fresvik/images/old-site/utvendig-liggende-efe87a655e.jpg`
- `/assets/fresvik/images/old-site/utvendig-port-med-rampe-1810c8dd34.jpg`
- `/assets/fresvik/images/old-site/utvendig-portdetalj-709e934be3.jpg`
- `/assets/fresvik/images/old-site/utvendig-rampe-a594c8609a.jpg`
- `/assets/fresvik/images/old-site/utvendig-staende-7e43a93c88.jpg`
- `/assets/fresvik/images/old-site/utvendig-ventiler-ec0949f672.jpg`

All nine project images are uploaded to Sanity and referenced by the runtime seed.

## Documents

The two documents found in the old page evidence are global footer/certification documents:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

They are handled globally through the document/certificate migration and are not duplicated as project-specific documents.

## Links

Page-specific links preserved:

- Kelvin AS: `http://kelvinas.no/`
- Rentokil: `http://www.rentokil.no/`
- Sales contact: `/tilsette`
- Previous: `/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront`
- Next: `/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 9
- hero image ref: `image-29db69b6613f633a653315d6e7ae275b33de95c6-2500x1118-jpg`
- gallery refs:
  - `image-29db69b6613f633a653315d6e7ae275b33de95c6-2500x1118-jpg`
  - `image-7ae06b93714355e1f61c76bd6aa493092761a46d-1600x1067-webp`
  - `image-4ffa01c58307ce44502ba4022f84775c1ee5c9ed-1600x1067-webp`
  - `image-bba72cb7be5a2e0acfbe247557b83625d8a7768f-1600x1067-webp`
  - `image-ddd5bce61c814359c001a208be0fb5399bad6b4b-1067x1600-webp`
  - `image-327e163ba3dff17c841d27bf8eec4274b4a0c302-1067x1600-webp`
  - `image-fce2fcedbe2789ea4188391d077de6d9646ca868-1600x1067-webp`
  - `image-8f071b5aba64d59b161ab62601f64108d1ada2c4-1067x1600-webp`
  - `image-0934952e558ef4b36884825549d5238704030d20-1600x1067-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images and prev/next/project links are migrated and verified separately above.
