# Manual page migration audit: /kontakt

Source URL: https://www.fresvik.no/kontakt
Checked: 2026-06-14
Local route: /kontakt
Status: migrated

## Rule

The contact page is treated as migrated for visible donor content: contact intro, office names, office/contact details, sales department contacts, newsletter/privacy text, footer supplier link, certification images, PDF links and external certification links.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Contact intro | Kontakt oss | Donor contact/project text copied | `flake-left.png` | `/tilsette` preserved as local route | migrated |
| Offices | Office cards | `Fresvik - Hovudkontor` and `Drammen - Salskontor` labels covered | maps retained from existing route | phone, e-mail and maps retained | migrated |
| Sales departments | Direct sales cards and legacy footer cards | Donor sales names, phone numbers and e-mails copied | none | mailto targets preserved | migrated |
| Newsletter/footer text | Legacy contact footer | Newsletter/privacy text copied | `flake.png` | `/personvernerklering` preserved | migrated |
| Supplier/footer link | Legacy contact footer | `PersonvernerklæringOpenheitslovaNettside levert av GASTA` copied | none | `https://www.gasta.no/` preserved | migrated |
| Certification/footer badges | Legacy certification cards | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Verification

- `npm run migration:crawl-page -- https://www.fresvik.no/kontakt`
- `npm run migration:compare-page -- https://www.fresvik.no/kontakt /kontakt --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/kontakt` remains the existing dedicated App Router page; legacy donor blocks were added without replacing the contact form.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
