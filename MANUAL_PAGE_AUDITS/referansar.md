# Manual page migration audit: /referansar

Source URL: https://www.fresvik.no/referansar
Checked: 2026-06-14
Local route: /referansar
Status: migrated

## Rule

The references index is treated as migrated only for the visible donor index content: page intro, reference cards, donor card images, category links, contact footer, newsletter/footer text and certification links. Individual reference detail pages remain separate migration targets from the sitemap.

## Section coverage

| Old section | New section | Text | Images | Links | Status |
| --- | --- | --- | --- | --- | --- |
| Intro | Ein leiande leverandør av kjølerom og fryserom | Donor title and intro copied | `flake.png` | `/om-oss/fresvik-produkt` via redirect | migrated |
| Reference cards | Referansar | Donor card titles and short texts copied | 17 donor reference index images | all reference detail links preserved | migrated |
| Reference categories | Kategoriar | Category labels copied | none | old category URLs preserved and redirected to `/referansar` | migrated |
| Company/contact footer | Kontakt | Address, phone, post e-mail and sales departments copied | none | old mailto targets preserved | migrated |
| Newsletter/footer text | Dokumentasjon og sertifikat | Newsletter/privacy/GASTA footer text copied | none | `https://www.gasta.no/` | migrated |
| Certification/footer badges | Dokumentasjon og sertifikat | Badge labels copied | `sentral+godkjent.png`, `TG-2135.jpg`, `Poly.png`, `Startbarnk.png`, `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`, `ce-logo-png-transparent.png` | local PDFs and external certification links preserved | migrated |

## Downloaded/source images

These donor index images were copied into the temporary local migration cache under `/assets/fresvik/images/old-site/` and are used by `/referansar`:

- `Baza+fryserom+-+2.jpeg`
- `Spar+Lund+Torv+-+Fresvik+Produkt+1+.jpeg`
- `Bjerkreim+Legekontor+1.jpeg`
- `Kjølerom+Bunnpris+Volda+3.jpg`
- `Fryserom+OBS+Alna+4_red.jpg`
- `Vik+helse-+og+sjukeheim+1.jpg`
- `Kiwi+Otta+1.jpeg`
- `1715599204491_upscale.jpeg`
- `FP+Dyreparken.jpg`
- `DSC03067.jpg`
- `20220616_152821_1.jpg`
- `IMG_6262.jpg`
- `IMG_2589.jpg`
- `image-asset.jpeg`
- `kiwi-skollenborg-2018-06-18-1-redigert-4-gang.jpg`
- `Port+Karlsøybruket+2017.jpg`
- `fiskehallen2.jpg`

Already cached footer/certification images used by the same donor page:

- `flake.png`
- `sentral+godkjent.png`
- `TG-2135.jpg`
- `Poly.png`
- `Startbarnk.png`
- `wp-wp-content_uploads_2017_06_Miljfyrtarn-norsk-farger.png`
- `ce-logo-png-transparent.png`

## Preserved links

Internal:

- `/om-oss/fresvik-produkt`
- `/referansar/category/Kj%C3%B8le-+fryserom+butikk`
- `/referansar/category/Storkj%C3%B8kken-restaurant`
- `/referansar/category/Fasadepanel`
- all visible reference detail links from the donor index

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

- `npm run migration:crawl-page -- https://www.fresvik.no/referansar`
- `npm run migration:compare-page -- https://www.fresvik.no/referansar /referansar --new-base http://127.0.0.1:3060 --allow-partial`
- Result: `migrated`, missing text/images/links = `0/0/0`.

## Notes

- `/referansar` was added to `localMigrationStructurePaths` so the exact local migration is not overwritten by the current Sanity reference index.
- Old reference category URLs are preserved as links and covered by redirects to `/referansar`.
- Local assets remain migration cache until Sanity asset upload and verification are completed.
