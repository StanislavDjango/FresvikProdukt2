# Manual page migration audit: /personvernerklering

Source URL: https://www.fresvik.no/personvernerklering
Checked: 2026-06-14
Local route: /personvernerklering
Status: migrated

## Rule

The privacy page is treated as migrated for visible donor content: privacy heading, all numbered privacy sections, contact footer, newsletter/privacy footer text, certification images, PDF links and external certification links.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Personvernerklæring | Personverntekst frå gammal side | Donor heading and sections 1-11 copied | none | `mailto:post@fresvik.no` text preserved | migrated |
| Contact footer | Kontakt | Address, phone, post e-mail and sales departments copied | none | old mailto targets preserved | migrated |
| Newsletter/footer text | Motta nyheitsbrev | Newsletter/privacy text copied | `flake.png` | `/personvernerklering` preserved | migrated |
| Supplier/footer link | Dokumentasjon og sertifikat | `PersonvernerklæringOpenheitslovaNettside levert av GASTA` copied | none | `https://www.gasta.no/` preserved | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Verification

- `npm run migration:crawl-page -- https://www.fresvik.no/personvernerklering`
- `npm run migration:compare-page -- https://www.fresvik.no/personvernerklering /personvernerklering --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/personvernerklering` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by Sanity content.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
