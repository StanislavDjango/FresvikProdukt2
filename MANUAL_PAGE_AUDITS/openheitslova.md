# Manual page migration audit: /openheitslova

Source URL: https://www.fresvik.no/openheitslova
Checked: 2026-06-14
Local route: /openheitslova
Status: migrated

## Rule

The transparency act page is treated as migrated for visible donor content: Openheitslova intro, donor explanation text, 2025 PDF download links, privacy link, Lovdata link, contact footer, newsletter/footer text, certification images, PDF links and external certification links.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Openheitslova intro | Hero and text section | Donor intro and explanation text copied | none | none | migrated |
| 2025 documents | Dokument og eksterne kjelder | Download labels copied | none | `/s/Aktsemdvurderingar-2025.pdf`, `/s/Fresvik-Produkt-rutine-for-oppfylling-av-plikter-etter-Openheitslova-5e5n.pdf`, `/s/2025-Utgreiing-signert.pdf` preserved and redirected to local PDFs | migrated |
| Personvernerklæring | Tekst frå gammal Openheitslova-side | Privacy reference copied | none | `/personvernerklering` preserved | migrated |
| Meir om openheitslova | Tekst frå gammal Openheitslova-side | Lovdata text copied | none | `https://lovdata.no/dokument/NL/lov/2021-06-18-99` preserved | migrated |
| Contact footer | Kontakt | Address, phone, post e-mail and sales departments copied | none | old mailto targets preserved | migrated |
| Newsletter/footer text | Motta nyheitsbrev | Newsletter/privacy text copied | `flake.png` | `/personvernerklering` preserved | migrated |
| Supplier/footer link | Dokumentasjon og sertifikat | `PersonvernerklæringOpenheitslovaNettside levert av GASTA` copied | none | `https://www.gasta.no/` preserved | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Verification

- `npm run migration:crawl-page -- https://www.fresvik.no/openheitslova`
- `npm run migration:compare-page -- https://www.fresvik.no/openheitslova /openheitslova --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- The live donor page now links to 2025 PDFs; these were downloaded into `public/assets/fresvik/documents` and old `/s/...` paths redirect to local files.
- `/openheitslova` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by Sanity content.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
