# Manual page migration audit: /aktuelt

Source URL: https://www.fresvik.no/aktuelt
Checked: 2026-06-14
Local route: /aktuelt
Status: migrated

## Rule

The news index is treated as migrated for the visible donor index content: news titles, card summaries, donor card images, preserved internal/external links, contact footer, newsletter/footer text and certification links. Individual news detail pages remain separate migration targets from the sitemap.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Aktuelt index | Aktuelt | Donor news titles and card summaries copied | 18 donor news index images plus `flake.png` | all visible news links preserved | migrated |
| Old source links | Lenker frå gammal aktuelt-side | External/reference link labels copied | none | `sogn.no` and old `/referansar-list/...` links preserved | migrated |
| Company/contact footer | Kontakt | Address, phone, post e-mail and sales departments copied | none | old mailto targets preserved | migrated |
| Newsletter/footer text | Dokumentasjon og sertifikat | Newsletter/privacy/GASTA footer text copied | none | `https://www.gasta.no/` | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Downloaded/source images

These donor index images were copied into the temporary local migration cache under `/assets/fresvik/images/old-site/` and are used by `/aktuelt`:

- `Samaneh+Shakeri+bannerbilde.jpg`
- `Håvard+Berdal.jpeg`
- `John+Bøthun_Fresvik+Produkt.jpg`
- `Fresvik+Produkt+NY-4.jpeg`
- `Agnar3.jpeg`
- `prod8.jpg`
- `Fresvik+Toppledere+sogn.no.jpeg`
- `Miljøfyrtårn_Fresvik+Produkt.jpg`
- `IMG_2589.jpg`
- `prod1.jpg`
- `Fresvik+produkt+julehjarte+dekorasjon.jpg`
- `Fresvik+produikt+seljar+Arne-Olav.jpg`
- `image-asset.jpeg`
- `frå+produksjonen++Kopi+(002).jpg`
- `Fresvik+ionnfesting+mot+golv.jpg`
- `Fresvik_illustrasjon-1.jpg`
- `tomas+kruvelis+20180315_121307.jpg`
- `DSC_2670.JPG`
- `flake.png`

## Preserved links

Internal:

- all visible old `/aktuelt/...` article links
- `/referansar-list/fryse-og-kjolerom-til-sogn-frukt-og-gront`
- `/referansar-list/celsa-steel-sotra`

Redirects added:

- `/referansar-list/fryse-og-kjolerom-til-sogn-frukt-og-gront` -> `/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront`
- `/referansar-list/celsa-steel-sotra` -> `/referansar/celsa-steel-sotra`

Mail:

- `mailto:post@fresvik.no`
- `mailto:arnbar@fresvik.no`
- `mailto:larliv@fresvik.no`
- `mailto:frowin@fresvik.no`

Documents/external:

- `/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf`
- `/assets/fresvik/documents/pur-ce-merke.pdf`
- `https://www.sogn.no/bu-i-sogn-artiklar/fresvik-ein-god-jobb-og-eit-godt-liv`
- `https://www.sintefcertification.no/Product/Index/129`
- `https://rapportering.miljofyrtarn.no/stats/176324`
- `https://www.gasta.no/`

## Verification

- `npm run migration:crawl-page -- https://www.fresvik.no/aktuelt`
- `npm run migration:compare-page -- https://www.fresvik.no/aktuelt /aktuelt --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/aktuelt` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by the current Sanity news index.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
