# Manual Page Audit: `/aktuelt/agnar-er-snart-pensjonistnbsp`

## Status

- Final status: `migrated`
- Checked: 2026-07-15
- Old URL: `https://www.fresvik.no/aktuelt/agnar-er-snart-pensjonistnbsp`
- New route: `/aktuelt/agnar-er-snart-pensjonistnbsp`
- Sanity document: `newsArticle-aktuelt-agnar-er-snart-pensjonistnbsp`
- Evidence: `migration/evidence/www.fresvik.no/aktuelt/agnar-er-snart-pensjonistnbsp`
- Comparison: `migration/comparisons/www.fresvik.no/aktuelt/agnar-er-snart-pensjonistnbsp`

## Old Page Content

Recovered page-specific content from old page:

- title: `Agnar er snart pensjonist`
- date: `2023-12-20`
- author: `Gyda Bøtun`
- intro: `Etter 44 år med dedikert arbeid, er Agnar Bøtun klar for pensjonisttilværelsen - eller er han?`
- previous link: `/aktuelt/ein-investering-for-henga-med-i-tidanbsp`
- next link: `/aktuelt/to-ledige-stillingar-i-haust`

## Text Coverage

Strict content audit result:

- old page-specific paragraph count: `16`
- matched page-specific paragraph count: `16`
- migrated Sanity body blocks: `21`
- missing page-specific paragraphs: `0`

The Sanity document preserves the old article text, including:

- `Vore med på heile reisa`
- `Lager, pakking og sending`
- `Ikkje heilt klar endå`
- the pull quote: `“Eg føler meg veldig privilegert som har hatt ein så god arbeidsplass så lenge.”`

## Image Coverage

Main article image:

- Old image URL: `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1702900160938-N8DQTB537FIXPAT24N89/Agnar3.jpeg`
- Local migration cache: `/assets/fresvik/images/migrated/agnar3.jpeg`
- Sanity asset ref: `image-fe7cad4fa092199f341bbb13b15db8a8c2f3436b-2500x3500-jpg`
- Status: `migrated`

Secondary article image:

- Old image URL: `https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1eebf1d8-e081-49b6-b35d-51ca6400c18c/Agnar+i+Truck-resized.jpeg`
- Local migration cache: `/assets/fresvik/images/old-site/agnar-i-truck-resized-cf74378d40.jpeg`
- Sanity asset ref: `image-a6ae3781174464edbacdcf5d6f78c5775c4d8112-2500x1786-jpg`
- Status: `migrated`

## Documents

The old page includes site-wide footer/certificate document links:

- `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf`
- `https://www.fresvik.no/s/PUR-ce-merke.pdf`

These are handled globally through documentation/document sections and are not counted as missing page-specific documents.

## Links

Migrated page-specific links:

- Previous: `/aktuelt/ein-investering-for-henga-med-i-tidanbsp`
- Next: `/aktuelt/to-ledige-stillingar-i-haust`

Global old footer/header links are handled globally and are not page-specific blockers.

## Verification Notes

- Runtime Sanity document was updated with `2` migration sections: main article content/images and old-page navigation.
- `migration:compare-page` may report `partial` because the generic comparer also counts old Squarespace footer/newsletter/certificate blocks and CDN variant images. Those items are global/site-wide and handled outside this news article.
