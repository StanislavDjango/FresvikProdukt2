# Manual Page Audit: Ledig stilling: Seljar - arbeidsstad Fresvik

Status: needs-review

## Routes

- Old URL: `https://www.fresvik.no/aktuelt/ledig-stilling-seljar-arbeidsstad-fresvik-2026`
- New route: `/aktuelt/ledig-stilling-seljar-arbeidsstad-fresvik-2026`
- Sanity document: `newsArticle-aktuelt-ledig-stilling-seljar-arbeidsstad-fresvik-2026`
- Evidence: `migration/evidence/www.fresvik.no/aktuelt/ledig-stilling-seljar-arbeidsstad-fresvik-2026`

## Source Content

The old page content was re-crawled on 2026-07-15 from the live Fresvik site.

Recovered from live HTML:

- title: `Ledig stilling: Seljar - arbeidsstad Fresvik`
- published date: `2026-07-10T09:32:54+0200`
- modified date: `2026-07-10T09:32:57+0200`
- author: `Ingvild Hagen`
- next link: `/aktuelt/samaneh-shakeri-ny-teknisk-sjef`
- article image from structured data

Not recovered:

- article body text

The visible old HTML only contains the title, author/global footer content and the next article link. The route is therefore preserved, but it must remain `needs-review` until a Squarespace backup, editor export, or external archive provides the missing job advert text.

## Images

Page-specific image from old structured data:

- Old image URL: `https://static1.squarespace.com/static/64ec79dc5754e2533112d764/64ec9e577ba92b3c083153b8/6a509f77584ea804e3bc2664/1783668777223/Fresvik+Produkt+Utv.+-3.jpg?format=1500w`
- Local migration cache: `/assets/fresvik/images/old-site/fresvik-produkt-utv-3.webp`
- Sanity asset ref: `image-41f2dc0f2591761322a100b96c13cccddcc239df-1500x844-webp`

## Author

Old author block preserved in `migrationSections`:

- Name: `Ingvild Hagen`
- Email: `ingvild@gasta.no`
- Bio: `Ingvild er digital marknadsførar i Gasta design & kommunikasjon. Ho jobbar fast med mange av kundane våre, og er eksperten vår på digital annonsering.`

## Documents

The two documents found in the old page evidence are global footer/certification documents:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

They are handled globally through the document/certificate migration and are not duplicated as news-specific documents.

## Links

Page-specific navigation preserved:

- Next: `/aktuelt/samaneh-shakeri-ny-teknisk-sjef`

## Runtime Verification

Sanity runtime document was created after the seed rewrite.

- `migrationSections`: 3
- main image ref: `image-41f2dc0f2591761322a100b96c13cccddcc239df-1500x844-webp`

## Notes

- This page was added because the old Samaneh page links to it as the previous article.
- The new route intentionally avoids invented job advert copy.
- Keep this audit row as `needs-review` until the missing body text can be recovered.
