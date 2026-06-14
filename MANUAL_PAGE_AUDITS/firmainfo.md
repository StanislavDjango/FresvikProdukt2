# Manual page migration audit: /firmainfo

Source URL: https://www.fresvik.no/firmainfo
Checked: 2026-06-14
Local route: /firmainfo
Status: migrated

## Rule

The company information page is treated as migrated for visible donor content: main company text, factory image, contact block, newsletter/footer text and certification links.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Om Fresvik Produkt | Om Fresvik Produkt | Donor company text covered | `Fresvik+Produkt+-+Fabrikk-24.jpg` | `/tilsette` text preserved where present in donor text | migrated |
| Project/contact CTA | Kontakt | Donor CTA and contact details copied | `flake.png` | mailto targets preserved | migrated |
| Newsletter/footer text | Dokumentasjon og sertifikat | Newsletter/privacy/GASTA footer text copied | none | `https://www.gasta.no/` | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Downloaded/source images

- `/assets/fresvik/images/old-site/Fresvik+Produkt+-+Fabrikk-24.jpg`
- `/assets/fresvik/images/old-site/flake.png`
- `/assets/fresvik/images/old-site/sentral+godkjent.png`
- `/assets/fresvik/images/old-site/TG-2135.jpg`
- `/assets/fresvik/images/old-site/Poly.png`
- `/assets/fresvik/images/old-site/Startbarnk.png`
- `/assets/fresvik/images/old-site/wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`
- `/assets/fresvik/images/old-site/ce-logo-png-transparent.png`

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

- `npm run migration:crawl-page -- https://www.fresvik.no/om-oss`
- Donor redirects to `https://www.fresvik.no/firmainfo`, evidence stored under `migration/evidence/www.fresvik.no/firmainfo`.
- `npm run migration:compare-page -- https://www.fresvik.no/firmainfo /firmainfo --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/firmainfo` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by Sanity content.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
