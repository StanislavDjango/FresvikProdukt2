# Manual page migration audit: /stillingledig

Source URL: https://www.fresvik.no/stillingledig
Checked: 2026-06-14
Local route: /stillingledig
Status: migrated

## Rule

The job page is treated as migrated for visible donor content: job heading, selling points, seller vacancy text, application/contact text, Fresvik village CTA, source links, images, contact footer, newsletter/footer text and certification links.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Job intro | Ledig stilling frå gammal side | Donor job intro and selling points copied | `prod8.jpg`, `flake-black.png` | mailto application link preserved | migrated |
| Seller vacancy | Ledig stilling frå gammal side | Main vacancy content covered | none | mailto/application text preserved | migrated |
| Spørsmål om stillinga | Ledig stilling frå gammal side | Contact question text copied | `flake.png` | none | migrated |
| Bu og jobbe i Fresvik | Ledig stilling frå gammal side | Fresvik village text copied | `Fresvik+frå+BJØNNSTIGEN+2017+SS.jpg`, `Fresvik+Toppledere+sogn.no.jpeg` | `sogn.no` links preserved | migrated |
| Company/contact footer | Kontakt | Address, phone, post e-mail and sales departments copied | none | old mailto targets preserved | migrated |
| Newsletter/footer text | Dokumentasjon og sertifikat | Newsletter/privacy/GASTA footer text copied | none | `https://www.gasta.no/` | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Verification

- `npm run migration:crawl-page -- https://www.fresvik.no/stillingledig`
- `npm run migration:compare-page -- https://www.fresvik.no/stillingledig /stillingledig --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/stillingledig` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by Sanity content.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
