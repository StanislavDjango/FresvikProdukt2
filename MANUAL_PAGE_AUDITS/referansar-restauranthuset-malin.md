# Manual Page Audit: Restauranthuset Malin

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/restauranthuset-malin`
- New route: `/referansar/restauranthuset-malin`
- Sanity document: `referenceProject-referansar-restauranthuset-malin`
- Evidence: `migration/evidence/www.fresvik.no/referansar/restauranthuset-malin`

## Source Content

The old page content was re-crawled on 2026-07-13 from the live Fresvik site.

Text migrated without rewriting:

```text
China House AS har i haust opna det nye Restauranthuset Malin i Sogndal Kulturhus.

Restauranten har blitt ein stor suksess, og Fresvik Produkt har levert både kjøle- og fryserom. I tillegg har vi levert vegger til grovkjøkken og oppvask, alt i tråd med ynskje frå oppdragsgivar.

Fresvik Produkt har tilsvarande leveransar rundt i heile landet, men tykkjer det er ekstra kjekt at våre produkt i høve kvalitet og hygiene vert verdsatt lokalt.

Prosjektet vart levert ferdig montert i løpet av nokre få veker. Dette var avgjerande for kunden, og Fresvik Produkt fekk det til i samarbeid med byggherre og ikkje minst ved hjelp av dyktige montørar som viste stor fleksibilitet.

Fresvik Produkt ynskjer Resturanthuset Malin lukke til med drifta!

Restauranthuset Malin i Sogndal, med 230 sitjeplassar.

«Fresvik Produkt vart vald som leverandør på grunn av kvalitet/kompetanse og kort leveringstid. »
— Per Rygg, prosjektleiar Via Nor as
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/image2.jpg`
- `/assets/fresvik/images/old-site/image3-1dcfcdfc38.jpg`
- `/assets/fresvik/images/old-site/image4-ed22cf6c20.jpg`
- `/assets/fresvik/images/old-site/image7-9d70827c73.jpg`
- `/assets/fresvik/images/migrated/image-asset.jpeg`

All five project images are uploaded to Sanity and referenced by the runtime seed.

## Documents

The two documents found in the old page evidence are global footer/certification documents:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

They are handled globally through the document/certificate migration and are not duplicated as project-specific documents.

## Links

Page-specific links preserved:

- Category: `/referansar/category/Framside-referansar`
- Category: `/referansar/category/Storkj%C3%B8kken-restaurant`
- Previous: `/referansar/bjerke-spekemat`
- Next: `/referansar/fryserom-med-fryseport-til-coop-extra-naustdal`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 4
- project gallery items: 5
- hero image ref: `image-50a66d6078ef00aa410b862964f117eae22d523e-480x640-jpg`
- gallery refs:
  - `image-50a66d6078ef00aa410b862964f117eae22d523e-480x640-jpg`
  - `image-53e115524bd54cc9dbd7c4c2ba554704ab8a9844-480x640-webp`
  - `image-2ec00f4bb0b983ca6b1ff184b8022184fd881f8a-480x640-webp`
  - `image-cdef5ffd6240bc7617600e6f83d585bf2c23daaa-480x640-webp`
  - `image-93c2687c8be3782ee1a99290c6c502c85b692c6f-1496x830-jpg`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, quote, gallery images, category and prev/next links are migrated and verified separately above.
