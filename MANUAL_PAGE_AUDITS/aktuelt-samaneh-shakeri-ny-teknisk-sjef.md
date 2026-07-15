# Manual Page Audit: Møt vår nye tekniske sjef

Status: migrated

## Routes

- Old URL: `https://www.fresvik.no/aktuelt/samaneh-shakeri-ny-teknisk-sjef`
- New route: `/aktuelt/samaneh-shakeri-ny-teknisk-sjef`
- Sanity document: `newsArticle-aktuelt-samaneh-shakeri-ny-teknisk-sjef`
- Evidence: `migration/evidence/www.fresvik.no/aktuelt/samaneh-shakeri-ny-teknisk-sjef`

## Source Content

The old page content was re-crawled on 2026-07-15 from the live Fresvik site.

Text migrated without rewriting:

```text
Den nye tekniske sjefen har allereie sett sitt preg på arbeidet.

Vi har gleda av å presentere vår nye tekniske sjef ved Fresvik Produkt.

Samaneh (Sam) Shakeri tok til i stillinga 1. oktober 2024. Ho har alt gjort seg godt kjent i organisasjonen vår, og har sett sitt preg på arbeidet.

Sam er utdanna ingeniør med master i Industriell teknologi.

Ho er fødd i Iran, men har utdanninga si frå UiT- The Arctic University of Norway og Texas A&M universitet i USA.

Sam har 15 års erfaring i ulike ingeniørrollar og har ekspertise innan industriell design.

Berre etter denne korte tida Sam har vore i Fresvik Produkt har vi hatt stor nytte av kunnskapane og effektiviteten til Sam i mange av dei utviklingsprosjekta som vi driv.

Vi ser med store glede fram til samarbeidet i åra framover.
```

## Date

- Old page date: `16. desember 2024`
- Migrated date: `2024-12-16`

## Images

Page-specific image from old page:

- Old image URL: `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/e6a1706c-a13b-41d3-8e62-479cbae3fa46/Samaneh+Shakeri.jpg`
- Local migration cache: `/assets/fresvik/images/migrated/samaneh-shakeri.jpg`
- Sanity asset ref: `image-dd58a0dd9a10b12f205ddb6bceb7103badea491f-2500x3214-jpg`
- Caption preserved: `Samaneh Shakeri, ny teknisk sjef i Fresvik Produkt.`

## Author

Old author block preserved in `migrationSections`:

- Name: `Ingvild Hagen`
- Email: `ingvild@gasta.no`
- Bio: `Ingvild er digital marknadsførar i Gasta design & kommunikasjon. Ho jobbar fast med mange av kundane våre, og er eksperten vår på digital annonsering.`

## Documents

The two documents found in the old page evidence are global footer/certification documents:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

They are handled globally through the document/certificate migration and are not duplicated as news-specific documents.

## Links

Page-specific navigation preserved:

- Previous: `/aktuelt/ledig-stilling-seljar-arbeidsstad-fresvik-2026`
- Next: `/aktuelt/ny-teknisk-teiknar-havard-berdal`

Global Squarespace navigation, newsletter, GASTA footer, and cookie links are handled through shared site navigation/footer and are not counted as page-specific news content.

## Runtime Verification

Sanity runtime document was updated after the seed rewrite.

- `migrationSections`: 3
- main image ref: `image-dd58a0dd9a10b12f205ddb6bceb7103badea491f-2500x3214-jpg`
- section image ref: `image-dd58a0dd9a10b12f205ddb6bceb7103badea491f-2500x3214-jpg`

## Notes

- The page is treated as migrated for page-specific news content visible on the old donor page: title, date, excerpt, full body text, main image, caption, author block, and previous/next article links.
- Automated compare may still report partial because it counts old global Squarespace footer/newsletter/decor assets and compares old Squarespace asset URLs against new Sanity CDN references.
