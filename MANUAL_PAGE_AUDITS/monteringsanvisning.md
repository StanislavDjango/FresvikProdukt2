# Manual page migration audit: /monteringsanvisning

Source URL: https://www.fresvik.no/monteringsanvisning
Checked: 2026-06-13
Local route: /monteringsanvisning
Status: migrated

## Rule

This mounting-instructions page was migrated manually because the earlier local version used normalized PDF labels and local paths that did not preserve the donor page's visible labels, old `/s/...` document URLs and image set. The page is treated as migrated for visible donor text, document links, internal links, images, footer contact blocks and certification/external links. Generic Squarespace mechanics such as cart count and menu toggle text are not counted as page content.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Intro | Monteringsanvisningar | `Her finn du monteringsanvisningar på våre produkt.` copied | `flake-left.png`, `flake.png` | none | migrated |
| Fryserom | Monteringsanvisningar | `Last ned monteringsanvisning for fryserom, Norsk/English` copied | `Fryserom.png` | `/s/Fresvik-Fryserom-Montasjeanvisning.pdf` redirect preserved | migrated |
| Port | Monteringsanvisningar | `Last ned monteringsanvisning for manuell port` copied | `Port.jpeg` | `/s/Fresvik-Port-Montasjeanvisning.pdf` redirect preserved | migrated |
| Kjølerom | Monteringsanvisningar | `Last ned monteringsanvisning for kjølerom, Norsk/English` copied | `Kjølerom.jpeg` | `/s/Fresvik-Kjlerom-Montasjeanvisning.pdf` redirect preserved | migrated |
| Elektrisk port | Monteringsanvisningar | `Monteringsanvisning for elektrisk port.` copied | `Elektrisk+port.jpeg` | `/monteringsanvisningar-fresvik-skyveport` | migrated |
| Dør | Monteringsanvisningar | `Last ned monteringsanvisning for dør` copied | `Dør.jpeg` | `/s/Fresvik-Dr-Montasjeanvisning.pdf` redirect preserved | migrated |
| Ute etter dokumentasjon? | Ute etter dokumentasjon? | Documentation CTA copied | `flake-left.png`, `flake.png` | `/dokumentasjon` | migrated |
| Company/contact footer | Kontakt | Address, phone, post e-mail and sales departments copied | `flake-left.png` | old mailto targets preserved | migrated |
| Newsletter/footer text | Dokumentasjon og sertifikat | Newsletter/privacy/GASTA footer text copied | none | `https://www.gasta.no/` | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Preserved documents

| Old URL | Local redirected target | Status |
| --- | --- | --- |
| `/s/Fresvik-Fryserom-Montasjeanvisning.pdf` | `/assets/fresvik/documents/fresvik-fryserom-montasjeanvisning.pdf` | migrated |
| `/s/Fresvik-Port-Montasjeanvisning.pdf` | `/assets/fresvik/documents/fresvik-port-montasjeanvisning.pdf` | migrated |
| `/s/Fresvik-Kjlerom-Montasjeanvisning.pdf` | `/assets/fresvik/documents/fresvik-kjolerom-montasjeanvisning.pdf` | migrated |
| `/s/Fresvik-Dr-Montasjeanvisning.pdf` | `/assets/fresvik/documents/fresvik-dor-montasjeanvisning.pdf` | migrated |
| `/s/Sentral-Godkjenning-Fresvik-Produkt.pdf` | `/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf` | migrated |
| `/s/PUR-ce-merke.pdf` | `/assets/fresvik/documents/pur-ce-merke.pdf` | migrated |

## Downloaded/source images

| Local file | Original old URL | Use |
| --- | --- | --- |
| `/assets/fresvik/images/old-site/Fryserom.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/edb3073f-4d52-4f2b-bcc8-eccccb3d364b/Fryserom.png` | mounting card |
| `/assets/fresvik/images/old-site/Port.jpeg` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/34a43d9f-90b0-4bd3-af63-a116052ad983/Port.jpeg` | mounting card |
| `/assets/fresvik/images/old-site/Kjølerom.jpeg` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/ad4e5e8c-1d47-4b54-aef7-ed7c423a5755/Kj%C3%B8lerom.jpeg` | mounting card |
| `/assets/fresvik/images/old-site/Elektrisk+port.jpeg` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/17f574d6-7d71-483d-ba5b-14108ce48d91/Elektrisk+port.jpeg` | mounting card |
| `/assets/fresvik/images/old-site/Dør.jpeg` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/33cd3f9d-cf72-4271-8f61-52108209b9b9/D%C3%B8r.jpeg` | mounting card |
| `/assets/fresvik/images/old-site/flake-left.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d9eb7ec0-de12-4f73-8ef4-a1676022fbfb/flake-left.png` | old intro/contact image |
| `/assets/fresvik/images/old-site/flake.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/13922f08-1a26-4996-98ca-874c87c1d3cb/flake.png` | old decorative image |

## Verification

- `npm run migration:crawl-page -- https://www.fresvik.no/monteringsanvisning`
- `npm run migration:compare-page -- https://www.fresvik.no/monteringsanvisning /monteringsanvisning --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/monteringsanvisning` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by the current Sanity document index.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
