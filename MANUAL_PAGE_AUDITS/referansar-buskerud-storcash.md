# Manual Page Audit: Buskerud Storcash

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/buskerud-storcash`
- New route: `/referansar/buskerud-storcash`
- Sanity document: `referenceProject-referansar-buskerud-storcash`
- Evidence: `migration/evidence/www.fresvik.no/referansar/buskerud-storcash`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/buskerud-storcash`

## Source Content

The old page content was re-crawled on 2026-07-13 from the live Fresvik site.

Text migrated without rewriting:

```text
I oktober i år opna Buskerud storcash sitt nye bygg i Kobbervikdalen i Drammen.

Storcash er ein del av ASKO og NorgesGruppen og det nye bygget på 2300 kvadratmeter blir eit av dei mest miljøvennlege stormarknadane i landet.

Vår samarbeidspartnar, Kelvin AS , har hatt ansvar for at varme fra kuldeanlegget på Storcash i Kobber blir gjenvunne og utnytta til oppvarming av bygget. Og på sommartid sørgjer kuldeanlegget for nedkjøling av ventilasjonslufta.

Vi i Fresvik Produkt leverte 1650 kvm med Fresvik isolasjonspanel , sju kjøle- og frysedørar og ein fryseport, alle produsert ved vår fabrikk i Fresvik.

Inne i butikken leverte Schott Termofrost heile 42 glassdørar til fryserommet, som vist på foto.
```

## Images

Project images from old page:

- `/assets/fresvik/images/migrated/image-asset-35.jpeg`
- `/assets/fresvik/images/old-site/dorer2-web-23779e7371.jpg`
- `/assets/fresvik/images/old-site/dorer4-web-67d1d45a02.jpg`
- `/assets/fresvik/images/old-site/dorer5-web-fa6b64e0ea.jpg`
- `/assets/fresvik/images/old-site/haandtak-web-7f81b0c34f.jpg`

All five project images are uploaded to Sanity and referenced by the runtime seed.

## Documents

The two documents found in the old page evidence are global footer/certification documents:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

They are handled globally through the document/certificate migration and are not duplicated as project-specific documents.

## Links

Page-specific links preserved:

- Category: `/referansar/category/Kj%C3%B8le-+fryserom+butikk`
- Kelvin AS: `http://kelvinas.no/`
- Fresvik isolasjonspanel old link `/kjlerom-fryserom-butikk/` mapped to `/produkt`
- Previous: `/referansar/celsa-steel-sotra`
- Next: `/referansar/bjerke-spekemat`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 5
- hero image ref: `image-441a925a460b47375bea7198df110c7fea2997b4-1500x1000-jpg`
- gallery refs:
  - `image-441a925a460b47375bea7198df110c7fea2997b4-1500x1000-jpg`
  - `image-b4f5e5a3169dbf57bcd7a6ad173c3406f85aa192-1500x925-webp`
  - `image-fba5bc97a7b521b4e51a0bf1e1b42eb704f4a450-1500x879-webp`
  - `image-79b2183649ab29323ad44ae58b896fc72e1f29cd-1500x896-webp`
  - `image-7483ada2aaa4db776d075c45502dd5a273f65249-1500x2651-webp`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, gallery images, Kelvin link, category and prev/next links are migrated and verified separately above.
