# Manual Page Audit: Fresvik kjøle- og fryserom i miljøvennlege daglegvarebutikkar

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar`
- New route: `/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar`
- Sanity document: `referenceProject-referansar-fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar`
- Evidence: `migration/evidence/www.fresvik.no/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar`
- Comparison: `migration/comparisons/www.fresvik.no/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar`

## Source Content

The old page content was re-crawled on 2026-07-13 from the live Fresvik site.

Text migrated without rewriting:

```text
Kiwi Skollenborg, Kongsberg

Nye Kiwi Skollenborg er bygd av NorgesGruppen Eiendom AS, og er del av ein trend vi no ser på bygging av meir miljøvennlege butikkar i daglegvarebransjen.

På Kiwi Skollenborg ved Kongsberg har dei med dette bygget redusert CO2-fotavtrykket med over 50 %, samanlikna med ein vanleg Kiwi-butikk.

Les meir om dette prosjektet i Dagbladet

Vi har levert fire kjølerom og eit fryserom til vår kunde Carrier Refrigation Norway, ein leveranse på ca 300 m2. Monteringa er gjort av AKS Montering.

Les meir om Kiwi Skollenborg i Bygg.no
```

## Images

Project image from old page:

- `/assets/fresvik/images/migrated/kiwi-skollenborg-2018-06-18-1-redigert-4-gang.jpg`

The project image is uploaded to Sanity and referenced by the runtime seed.

## Documents

The two documents found in the old page evidence are global footer/certification documents:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

They are handled globally through the document/certificate migration and are not duplicated as project-specific documents.

## Links

Page-specific links preserved:

- Dagbladet article: `https://www.dagbladet.no/mat/du-ser-ikke-hva-som-er-annerledes-med-denne-butikken-men-den-forandrer-norge/69898221`
- Carrier Refrigation Norway: `https://www.carrier.com/commercial-refrigeration/en/no/`
- Bygg.no article: `http://www.bygg.no/article/1344870`
- Previous: `/referansar/fryserom-fryseport-rentokil`
- Next: `/referansar/karlsoybruket`

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- project gallery items: 1
- hero image ref: `image-53b15cd83588261645addb3a6c8c0fcb3b4aeb71-1200x450-jpg`
- gallery refs:
  - `image-53b15cd83588261645addb3a6c8c0fcb3b4aeb71-1200x450-jpg`

## Notes

- Old footer/global contact/newsletter/GASTA content is intentionally not duplicated inside the reference detail page because the new site has shared header/footer.
- Automated compare may report `partial` because it counts old global Squarespace footer/newsletter/author/decor assets and compares old Squarespace image URLs against new Sanity CDN references. The page-specific project text, project image and prev/next/project links are migrated and verified separately above.
