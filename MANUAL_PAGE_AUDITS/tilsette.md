# Manual page migration audit: /tilsette

Source URL: https://www.fresvik.no/tilsette
Checked: 2026-06-14
Local route: /tilsette
Status: migrated

## Rule

The employees page is treated as migrated for visible donor content: employee names, roles, phone/mobile/e-mail text, employee photos, contact footer, newsletter/footer text and certification links.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Salsavdeling | Kontaktpersonar | Donor employee text copied | donor employee photos copied | `/tilsette` self links preserved | migrated |
| Andre tilsette | Kontaktpersonar | Donor employee text copied | donor employee photos copied | `/tilsette` self links preserved | migrated |
| Company/contact footer | Kontakt | Address, phone, post e-mail and sales departments copied | `flake.png` | old mailto targets preserved | migrated |
| Newsletter/footer text | Dokumentasjon og sertifikat | Newsletter/privacy/GASTA footer text copied | none | `https://www.gasta.no/` | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Downloaded/source images

- `Lars-Erling-Livrud.jpeg`
- `Frode-Winther.jpg`
- `Arne-Olav-Lien-Bardølsgård.jpg`
- `Ove+Fedje.jpeg`
- `Tomas-Kruvelis.jpg`
- `Gyda+Bøthun.jpeg`
- `Sigmund+Hauglum.jpg`
- `Siv+Settevik.jpeg`
- `Håvard+Berdal.jpg`
- `Oddrun+Time.jpeg`
- `Siri+Otterhjell.jpeg`
- `Ragnvald+Grov+Sørdal.jpeg`
- `Nils+Gunnar+Finne.jpeg`
- `Samaneh+Shakeri.jpg`

## Preserved links

Mail:

- `mailto:post@fresvik.no`
- `mailto:arnbar@fresvik.no`
- `mailto:larliv@fresvik.no`
- `mailto:frowin@fresvik.no`

Documents/external:

- `/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf`
- `/assets/fresvik/documents/pur-ce-merke.pdf`
- `https://www.sintefcertification.no/Product/Index/129`
- `https://rapportering.miljofyrtarn.no/stats/176324`
- `https://www.gasta.no/`

## Verification

- `npm run migration:crawl-page -- https://www.fresvik.no/tilsette`
- `npm run migration:compare-page -- https://www.fresvik.no/tilsette /tilsette --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/tilsette` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by Sanity employee index.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
