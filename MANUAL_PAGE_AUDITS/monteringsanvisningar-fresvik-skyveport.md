# Manual page migration audit: /monteringsanvisningar-fresvik-skyveport

Source URL: https://www.fresvik.no/monteringsanvisningar-fresvik-skyveport
Checked: 2026-06-13
Local route: /monteringsanvisningar-fresvik-skyveport
Status: migrated

## Rule

This page was migrated manually because the earlier local version used normalized local PDF paths and omitted the donor footer/contact/certification blocks. The page is treated as migrated for visible donor text, document links, images, footer contact blocks and certification/external links. Generic Squarespace mechanics such as cart count and menu toggle text are not counted as page content.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Intro | Monteringsanvisningar for elektrisk styring av Fresvik Skyveport | Old title copied | `flake-left.png`, `flake.png` | none | migrated |
| Electric skyveport documents | Filer frå gammal skyveportside | All six old document labels copied | none | old `/s/...` PDF URLs preserved through redirects | migrated |
| Company/contact footer | Kontakt | Address, phone, post e-mail and sales departments copied | `flake-left.png` | old mailto targets preserved | migrated |
| Newsletter/footer text | Dokumentasjon og sertifikat | Newsletter/privacy/GASTA footer text copied | none | `https://www.gasta.no/` | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Preserved documents

| Old URL | Local redirected target | Status |
| --- | --- | --- |
| `/s/Koblingsskjema-Fermod-5010.pdf` | `/assets/fresvik/documents/koblingsskjema-fermod-5010.pdf` | migrated |
| `/s/Montasjeanvisning-5010-for-2150.pdf` | `/assets/fresvik/documents/montasjeanvisning-5010-for-2150.pdf` | migrated |
| `/s/Montasjeanvisning-5010-for-3530-og-7530.pdf` | `/assets/fresvik/documents/montasjeanvisning-5010-for-3530-og-7530.pdf` | migrated |
| `/s/Quick-Start-5010Exp-indB.pdf` | `/assets/fresvik/documents/quick-start-5010exp.pdf` | migrated |
| `/s/Endre-Skyveretning.pdf` | `/assets/fresvik/documents/endre-skyveretning.pdf` | migrated |
| `/s/Tilleggsutstyr-NMoptions-kits5010Exp-A_NOR.pdf` | `/assets/fresvik/documents/tilleggsutstyr-nmoptions-kits5010exp.pdf` | migrated |
| `/s/Sentral-Godkjenning-Fresvik-Produkt.pdf` | `/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf` | migrated |
| `/s/PUR-ce-merke.pdf` | `/assets/fresvik/documents/pur-ce-merke.pdf` | migrated |

## Source images

| Local file | Original old URL | Use |
| --- | --- | --- |
| `/assets/fresvik/images/old-site/flake-left.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d9eb7ec0-de12-4f73-8ef4-a1676022fbfb/flake-left.png` | old intro/contact image |
| `/assets/fresvik/images/old-site/flake.png` | `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/13922f08-1a26-4996-98ca-874c87c1d3cb/flake.png` | old decorative image |

## Verification

- `npm run migration:crawl-page -- https://www.fresvik.no/monteringsanvisningar-fresvik-skyveport`
- `npm run migration:compare-page -- https://www.fresvik.no/monteringsanvisningar-fresvik-skyveport /monteringsanvisningar-fresvik-skyveport --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/monteringsanvisningar-fresvik-skyveport` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by the current Sanity document index.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
