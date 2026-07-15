# Manual Page Audit: `/aktuelt/john-bothun-blir-pensjonist`

## Status

- Final status: `migrated`
- Checked: 2026-07-15
- Old URL: `https://www.fresvik.no/aktuelt/john-bothun-blir-pensjonist`
- New route: `/aktuelt/john-bothun-blir-pensjonist`
- Sanity document: `newsArticle-aktuelt-john-bothun-blir-pensjonist`
- Evidence: `migration/evidence/www.fresvik.no/aktuelt/john-bothun-blir-pensjonist`
- Comparison: `migration/comparisons/www.fresvik.no/aktuelt/john-bothun-blir-pensjonist`

## Old Page Content

Recovered page-specific content from old page:

- title: `John Bøthun blir pensjonist`
- date: `2024-08-27`
- intro: `Den som i dag har vore lengst tilsett i Fresvik Produkt vil pensjonere seg frå 1. september.`
- main image caption: `John Bøthun har jobba 42 år i Fresvik Produkt men blir no pensjonist.`
- secondary image caption: `Håvard Berdal følger i John Bøthun sine fotspor som teknisk teiknar.`
- previous link: `/aktuelt/ny-teknisk-teiknar-havard-berdal`
- next link: `/aktuelt/ein-investering-for-henga-med-i-tidanbsp`

## Text Coverage

Strict content audit result:

- old paragraph count: `12`
- matched paragraph count: `12`
- text coverage: `1`
- missing page-specific paragraphs: `0`

The Sanity document contains `14` Portable Text body blocks, including the original article headings:

- `Ti år i produksjon og oppdrag over heile landet`
- `Teikning som ny hovudoppgåve`
- `Kjærleik til arbeidsplassen og bygda`

## Image Coverage

Main article image:

- Old image URL: `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/dc7a35a3-51fe-4a8a-aac6-32c13c72b7ad/John+B%C3%B8thun_Fresvik+Produkt.jpg`
- Local migration cache: `/assets/fresvik/images/migrated/john-bthun-fresvik-produkt.jpg`
- Sanity asset ref: `image-3fab2fa12ba0817c623efc654cc441e81734efa1-1920x1280-jpg`
- Status: `migrated`

Secondary article image:

- Old image URL: `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/0ca2b5b0-b1dd-43b2-ad60-2e41bc82682f/John+og+Ha%CC%8Avard-2-1.jpg`
- Local migration cache: `/assets/fresvik/images/old-site/john-og-havard-2-1-ab95ada79b.jpg`
- Sanity asset ref: `image-4842d324c0c776b0bb776aab94d07897c457836b-2500x1667-webp`
- Status: `migrated`

## Documents

The old page includes site-wide footer/certificate document links:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

These are handled globally through documentation/document sections and are not counted as missing page-specific documents.

## Links

Migrated page-specific links:

- Previous: `/aktuelt/ny-teknisk-teiknar-havard-berdal`
- Next: `/aktuelt/ein-investering-for-henga-med-i-tidanbsp`

Global old footer links are handled globally and are not page-specific blockers.

## Verification Notes

- `MACHINE_READABLE_PAGE_CONTENT_AUDIT.json` already marks this route as `migrated`.
- Runtime Sanity document was updated with `2` migration sections: main article content/images and old-page navigation.
- `migration:compare-page` may report `partial` because the generic comparer also counts old Squarespace footer/newsletter/certificate blocks and CDN variant images. Those items are global/site-wide and handled outside this news article.
