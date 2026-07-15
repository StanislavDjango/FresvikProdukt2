# Manual Page Audit: `/aktuelt/ny-teknisk-teiknar-havard-berdal`

## Status

- Final status: `migrated`
- Checked: 2026-07-15
- Old URL: `https://www.fresvik.no/aktuelt/ny-teknisk-teiknar-havard-berdal`
- New route: `/aktuelt/ny-teknisk-teiknar-havard-berdal`
- Sanity document: `newsArticle-aktuelt-ny-teknisk-teiknar-havard-berdal`
- Evidence: `migration/evidence/www.fresvik.no/aktuelt/ny-teknisk-teiknar-havard-berdal`
- Comparison: `migration/comparisons/www.fresvik.no/aktuelt/ny-teknisk-teiknar-havard-berdal`

## Old Page Content

Recovered page-specific content from old page:

- title: `Ny teknisk teiknar på plass`
- date: `2024-08-28`
- intro: `Den nye teiknaren vår har arbeidd på kontoret sidan nyttår og er alt komen godt inn i funksjonen.`
- author: `Ingvild Hagen`
- article image: `Håvard+Berdal.jpg`
- previous link: `/aktuelt/samaneh-shakeri-ny-teknisk-sjef`
- next link: `/aktuelt/john-bothun-blir-pensjonist`

## Text Coverage

Strict content audit result:

- old paragraph count: `4`
- matched paragraph count: `4`
- text coverage: `1`
- missing page-specific paragraphs: `0`

Migrated body:

1. `Håvard Berdal er ny teknisk teiknar i Fresvik Produkt.`
2. `Vi har vore så heldige å få Håvard i stillinga som teknisk teiknar etter at John Bøthun pensjonerer seg frå 1. september 2024.`
3. `Håvard Berdal har arbeidd på kontoret sidan nyttår og er alt komen godt inn i funksjonen. Før dette var han tilsett i produksjonen vår, og han kjenner difor bedrifta godt frå før.`
4. `Vi er sikre på at han vil gjere ein utmerka jobb som teiknar. Velkomen i staben vår!`

## Image Coverage

- Old image URL: `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d9765834-5b4b-45a2-a9fc-819876dc6672/Ha%CC%8Avard+Berdal.jpg`
- Local migration cache: `/assets/fresvik/images/migrated/havard-berdal.jpg`
- Sanity asset ref: `image-900520169b3effaa569cb8c86d9f9f15b32e8680-1667x1667-jpg`
- Status: `migrated`

## Documents

The old page includes site-wide footer document links:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

These are handled globally through documentation/document sections and are not counted as missing page-specific documents.

## Links

Migrated page-specific links:

- Previous: `/aktuelt/samaneh-shakeri-ny-teknisk-sjef`
- Next: `/aktuelt/john-bothun-blir-pensjonist`
- Author email: `mailto:ingvild@gasta.no`

Global old footer links are handled globally and are not page-specific blockers.

## Verification Notes

- `MACHINE_READABLE_PAGE_CONTENT_AUDIT.json` marks this route as `migrated`.
- `migration:compare-page` reports `partial` because the generic comparer still counts old Squarespace footer/newsletter/certificate blocks and CDN variant images as missing. Those items are global/site-wide and already handled outside this news article.
- Runtime Sanity document was updated with `3` migration sections: main article, author, and old-page navigation.

