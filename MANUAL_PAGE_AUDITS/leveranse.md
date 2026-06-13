# Manual page migration audit: /tenester/leveranse

Source URL: https://www.fresvik.no/tenester/leveranse
Checked: 2026-06-13
Local route: /tenester/leveranse
Status: migrated

## Rule

This service page was migrated manually because the earlier local version had a shortened service summary and a TODO note. The page is treated as migrated for visible donor content, images, footer contact blocks, PDF links and certification/external links. Generic Squarespace mechanics such as cart count and menu toggle text are not counted as page content.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Service intro | Leveranse | `Fokus på leveransesikkerheit` copied | `port1web.jpg` | none | migrated |
| Delivery text | Leveranse | Delivery timing, package, visible marking and mounting instruction text copied | `port1web.jpg`, `flake.png` | `/kontakt` for project CTA | migrated |
| Company/contact footer | Kontakt | Address, phone, post e-mail and sales departments copied | `flake-black.png` | old mailto targets preserved | migrated |
| Newsletter/footer text | Dokumentasjon og sertifikat | Newsletter/privacy/GASTA footer text copied | none | `https://www.gasta.no/` | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Downloaded/source images

| Local file | Original old URL | Use |
| --- | --- | --- |
| `/assets/fresvik/images/old-site/port1web.jpg` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/3c01276b-1589-49c6-9503-8cd8519959d9/port1web.jpg` | delivery/service image |
| `/assets/fresvik/images/old-site/flake-black.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/00a09d9e-82d6-404a-ac83-38ed77ef6990/flake-black.png` | old footer/decorative service image |
| `/assets/fresvik/images/old-site/flake.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/13922f08-1a26-4996-98ca-874c87c1d3cb/flake.png` | old decorative service image |
| `/assets/fresvik/images/old-site/sentral+godkjent.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385862366-SQTJIQF8X2Y8LT02Z2UT/sentral%2Bgodkjent.png` | certification badge |
| `/assets/fresvik/images/old-site/TG-2135.jpg` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385867638-53S21SMAIEM6JIMC4IZ7/TG-2135.jpg` | SINTEF badge |
| `/assets/fresvik/images/old-site/Poly.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385870865-8TDYDXKTA92N3SV2CI5E/Poly.png` | Poly badge |
| `/assets/fresvik/images/old-site/Startbarnk.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385876430-SF9NN179JLHLSGSAMMMQ/Startbarnk.png` | StartBANK badge |
| `/assets/fresvik/images/old-site/wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385879029-1G9MX2OPCNVO7N0PMHZF/wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png` | Miljøfyrtårn badge |
| `/assets/fresvik/images/old-site/ce-logo-png-transparent.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1700040185087-O7K1UNJLYM01IO9TVQT5/ce-logo-png-transparent.png` | CE badge |

## Preserved links

Internal:

- `/kontakt`
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

- `npm run migration:crawl-page -- https://www.fresvik.no/tenester/leveranse`
- `npm run migration:compare-page -- https://www.fresvik.no/tenester/leveranse /tenester/leveranse --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/tenester/leveranse` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by the current Sanity service fallback.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
