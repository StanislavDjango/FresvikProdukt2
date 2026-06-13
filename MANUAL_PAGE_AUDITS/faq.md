# Manual page migration audit: /kundeservice/faq

Source URL: https://www.fresvik.no/kundeservice/faq
Checked: 2026-06-13
Local route: /kundeservice/faq
Status: migrated

## Rule

This FAQ page was migrated manually because the earlier local version had shortened answers and the FAQ accordion markup was not visible to the content comparison script. The page is treated as migrated for visible donor FAQ text, customer segment cards, images, internal links, footer contact blocks and certification/external links. Generic Squarespace mechanics such as cart count and menu toggle text are not counted as page content.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| FAQ intro | Ofte Stilte Spørsmål | Old title copied | none | none | migrated |
| FAQ questions | Ofte Stilte Spørsmål | All 12 donor questions and full answer text copied | none | none | migrated |
| Våre kundar intro | Våre kundar | Customer intro copied | `flake.png` | none | migrated |
| Butikk | Våre kundar | Customer text copied | `1715599204491.jpg` | `/kjolerom-fryserom-butikk` | migrated |
| Skip/offshore | Våre kundar | Customer text copied | `image-asset+(2).jpeg` | `/kjolerom-fryserom-offshore` | migrated |
| Storkjøkken/institusjon | Våre kundar | Customer text copied | `1733820776326.jpg` | `/kjolerom-fryserom-storkjokken` | migrated |
| Company/contact footer | Kontakt | Address, phone, post e-mail and sales departments copied | `flake-left.png` | old mailto targets preserved | migrated |
| Newsletter/footer text | Dokumentasjon og sertifikat | Newsletter/privacy/GASTA footer text copied | none | `https://www.gasta.no/` | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Downloaded/source images

| Local file | Original old URL | Use |
| --- | --- | --- |
| `/assets/fresvik/images/old-site/1715599204491.jpg` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/b806d454-5edc-4d8a-a9d1-67dfb6b34618/1715599204491.jpg` | Butikk customer card |
| `/assets/fresvik/images/old-site/image-asset+(2).jpeg` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/5736240f-7b74-4bca-a556-1c4cf313614e/image-asset+%282%29.jpeg` | Skip/offshore customer card |
| `/assets/fresvik/images/old-site/1733820776326.jpg` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/6d63789a-8276-4fa7-ac6e-3767cc054fae/1733820776326.jpg` | Storkjøkken/institusjon customer card |
| `/assets/fresvik/images/old-site/flake.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/13922f08-1a26-4996-98ca-874c87c1d3cb/flake.png` | old decorative image |
| `/assets/fresvik/images/old-site/flake-left.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d9eb7ec0-de12-4f73-8ef4-a1676022fbfb/flake-left.png` | old contact image |

## Preserved links

Internal:

- `/kjolerom-fryserom-butikk`
- `/kjolerom-fryserom-offshore`
- `/kjolerom-fryserom-storkjokken`
- `/dokumentasjon`
- `/personvernerklering`
- `/openheitslova`

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

- `npm run migration:crawl-page -- https://www.fresvik.no/kundeservice/faq`
- `npm run migration:compare-page -- https://www.fresvik.no/kundeservice/faq /kundeservice/faq --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/kundeservice/faq` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by the current Sanity FAQ index.
- The FAQ accordion markup was adjusted to expose questions as headings and answers as paragraphs; this is required for auditability and accessible content extraction.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
