# Manual page migration audit: /dokumentasjon

Source URL: https://www.fresvik.no/dokumentasjon
Checked: 2026-06-13
Local route: /dokumentasjon
Status: migrated

## Rule

This documentation page was migrated manually because the earlier local version used normalized document labels and some local PDF paths that did not preserve the old donor link identity. The page is treated as migrated for visible donor text, document links, internal support links, images, footer contact blocks and certification/external links. Generic Squarespace mechanics such as cart count and menu toggle text are not counted as page content.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Intro | Dokumentasjon / Noko du savnar? | Old intro and contact CTA copied | `flake-left.png`, `flake.png` | `/kontakt` | migrated |
| Miljødokument | Dokumentasjon | `Last ned miljødokument` copied | none | `/s/Miljdokument-Fresvik-Produkt.pdf` redirect preserved | migrated |
| Samsvarssertifikat | Dokumentasjon | `Samsvarssertifikat`, `for konsistent ytelse`, `Last ned Fresvik PIR-Panel CPR` copied | none | `/s/7060s-fnfz.pdf` redirect preserved | migrated |
| Monterings-anvisningar | Dokumentasjon | `Sjå eiga side for monteringsanvisningar` copied | none | `/monteringsanvisning` | migrated |
| Teknisk godkjenning | Dokumentasjon | `Last ned teknisk godkjenning`, `Godkjenningsdokument hjå SINTEF` copied | none | `/s/2135g-5.pdf`, SINTEF external link | migrated |
| Levering | Dokumentasjon | `Last ned leveringsbetingelser`, `Transportskade` copied | none | `/s/Leveringsvilkar-Fresvik-Produkt_rev2023.pdf`, `/transportskade` | migrated |
| Sentral godkjenning | Dokumentasjon | `Last ned sentral godkjenning` copied | certification badge available in footer block | `/s/Sentral-Godkjenning-Fresvik-Produkt.pdf` redirect preserved | migrated |
| Ytelseserklæring | Dokumentasjon | `Last ned ytelseserklæring` copied | none | `/s/Ytelseserklring-Fresvik-Produkt.pdf` redirect preserved | migrated |
| Company/contact footer | Kontakt | Address, phone, post e-mail and sales departments copied | `flake-left.png` | old mailto targets preserved | migrated |
| Newsletter/footer text | Dokumentasjon og sertifikat | Newsletter/privacy/GASTA footer text copied | none | `https://www.gasta.no/` | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Preserved documents

| Old URL | Local redirected target | Status |
| --- | --- | --- |
| `/s/Miljdokument-Fresvik-Produkt.pdf` | `/assets/fresvik/documents/miljodokument-fresvik-produkt.pdf` | migrated |
| `/s/7060s-fnfz.pdf` | `/assets/fresvik/documents/sintef-produktsertifikat-7060s.pdf` | migrated |
| `/s/2135g-5.pdf` | `/assets/fresvik/documents/sintef-teknisk-godkjenning-2135g.pdf` | migrated |
| `/s/Leveringsvilkar-Fresvik-Produkt_rev2023.pdf` | `/assets/fresvik/documents/leveringsvilkar-fresvik-produkt-2023.pdf` | migrated |
| `/s/Sentral-Godkjenning-Fresvik-Produkt.pdf` | `/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf` | migrated |
| `/s/Ytelseserklring-Fresvik-Produkt.pdf` | `/assets/fresvik/documents/ytelseserklaring-fresvik-produkt.pdf` | migrated |
| `/s/PUR-ce-merke.pdf` | `/assets/fresvik/documents/pur-ce-merke.pdf` | migrated |

## Source images

| Local file | Original old URL | Use |
| --- | --- | --- |
| `/assets/fresvik/images/old-site/flake-left.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d9eb7ec0-de12-4f73-8ef4-a1676022fbfb/flake-left.png` | old intro/contact image |
| `/assets/fresvik/images/old-site/flake.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/13922f08-1a26-4996-98ca-874c87c1d3cb/flake.png` | old decorative image |
| `/assets/fresvik/images/old-site/sentral+godkjent.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385862366-SQTJIQF8X2Y8LT02Z2UT/sentral%2Bgodkjent.png` | certification badge |
| `/assets/fresvik/images/old-site/TG-2135.jpg` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385867638-53S21SMAIEM6JIMC4IZ7/TG-2135.jpg` | SINTEF badge |
| `/assets/fresvik/images/old-site/Poly.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385870865-8TDYDXKTA92N3SV2CI5E/Poly.png` | Poly badge |
| `/assets/fresvik/images/old-site/Startbarnk.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385876430-SF9NN179JLHLSGSAMMMQ/Startbarnk.png` | StartBANK badge |
| `/assets/fresvik/images/old-site/wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693385879029-1G9MX2OPCNVO7N0PMHZF/wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png` | Miljøfyrtårn badge |
| `/assets/fresvik/images/old-site/ce-logo-png-transparent.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1700040185087-O7K1UNJLYM01IO9TVQT5/ce-logo-png-transparent.png` | CE badge |

## Verification

- `npm run migration:crawl-page -- https://www.fresvik.no/dokumentasjon`
- `npm run migration:compare-page -- https://www.fresvik.no/dokumentasjon /dokumentasjon --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/dokumentasjon` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by the current Sanity document index.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
