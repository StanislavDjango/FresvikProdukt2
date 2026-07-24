# English Translation Queue

Status date: 2026-07-25

This file tracks the remaining content work for the English version. The `/en` routing, UI messages, SEO alternates, Sanity language metadata and validation scripts are in place. These rows are imported as English Sanity drafts unless explicitly marked otherwise.

## Rules

- Norwegian pages without a prefix remain the source of truth.
- English pages use `/en/...` URLs from `src/i18n/routeMap.json`.
- `sanity/seed/migratedContent.en.ndjson` contains draft English documents only.
- `npm run seed:sanity:en:publish` dry-runs the default Priority 1 publish batch.
- `npm run seed:sanity:en:publish:p1` publishes Priority 1 only.
- `npm run seed:sanity:en:publish:safe` publishes Priority 1, Priority 2 and safe Priority 3 pages, but not careers/legal/compliance pages.
- Public `/en` fallback pages must stay English-only: show translation status and a Norwegian source link, but do not render Norwegian body sections as English content.
- Do not auto-translate technical claims without review.
- Keep product names, Fresvik, PIR, PUR, SINTEF and CE unchanged.
- Norwegian-only PDFs may be linked from English pages, but label them as Norwegian PDFs.
- A page is ready only after its English Sanity document has approved title, intro, body, documents and links.

## Priority 1

| Norwegian source | English URL | Sanity type | Current status | Required action |
| --- | --- | --- | --- | --- |
| `/` | `/en` | `page` | published 2026-07-25 | Monitor production runtime and visual content after Vercel deploy. |
| `/produkt` | `/en/products` | `page` | published 2026-07-25 | Monitor production runtime and product card descriptions after Vercel deploy. |
| `/produkt/fresvik-pir-panel` | `/en/products/fresvik-pir-panel` | `product` | published 2026-07-25 | Monitor product body, technical data, documents and related accessory links after Vercel deploy. |
| `/produkt/fresvik-pur-panel` | `/en/products/fresvik-pur-panel` | `product` | published 2026-07-25 | Monitor product body, technical data, image captions and PDF labels after Vercel deploy. |
| `/produkt/kjole-frysedorer` | `/en/products/cold-freezer-doors` | `product` | published 2026-07-25 | Monitor door descriptions, construction/specification text and related documents after Vercel deploy. |
| `/produkt/kjole-fryseportar` | `/en/products/cold-freezer-ports` | `product` | published 2026-07-25 | Monitor gate descriptions, model text, PDF labels and related links after Vercel deploy. |
| `/tenester` | `/en/services` | `page` | published 2026-07-25 | Monitor service overview and cards after Vercel deploy. |
| `/tenester/montasje` | `/en/services/installation` | `service` | published 2026-07-25 | Monitor installation process, responsibilities and CTA text after Vercel deploy. |
| `/dokumentasjon` | `/en/documentation` | `page` | published 2026-07-25 | Monitor document categories and Norwegian PDF labels after Vercel deploy. |
| `/kontakt` | `/en/contact` | `page` | published 2026-07-25 | Monitor contact text and exact contact details after Vercel deploy. |

## Priority 2

| Norwegian source | English URL | Sanity type | Current status | Required action |
| --- | --- | --- | --- | --- |
| `/produkt/fasadepanel` | `/en/products/facade-panels` | `product` | published 2026-07-25 | Monitor facade panel benefits, reference links and technical wording after Vercel deploy. |
| `/produkt/frysetunnel` | `/en/products/freezing-tunnel` | `product` | published 2026-07-25 | Monitor construction/use cases, panel details and reference links after Vercel deploy. |
| `/tilleggsutstyr` | `/en/products/accessories` | `page` | published 2026-07-25 | Monitor accessory names, item numbers and ordering text after Vercel deploy. |
| `/tenester/leveranse` | `/en/services/delivery` | `service` | published 2026-07-25 | Monitor delivery reliability, package marking and installation guide wording after Vercel deploy. |
| `/tenester/service-reservedeler` | `/en/services/service-spare-parts` | `service` | published 2026-07-25 | Monitor spare-part/service wording after Vercel deploy. |
| `/monteringsanvisning` | `/en/documentation/installation-guide` | `page` | published 2026-07-25 | Monitor guide labels and Norwegian/English PDF labels after Vercel deploy. |
| `/monteringsanvisningar-fresvik-skyveport` | `/en/documentation/electric-sliding-door` | `page` | published 2026-07-25 | Monitor electrical sliding gate document labels after Vercel deploy. |
| `/kundeservice/faq` | `/en/documentation/faq` | `page` | published 2026-07-25 | Monitor FAQ technical answers after Vercel deploy. |

## Priority 3

| Norwegian source | English URL | Sanity type | Current status | Required action |
| --- | --- | --- | --- | --- |
| `/referansar` | `/en/references` | `page` | published 2026-07-25 | Monitor references overview and decide whether individual reference pages need English routes. |
| `/om-oss` | `/en/about` | `page` | published 2026-07-25 | Monitor company overview and about-section links after Vercel deploy. |
| `/firmainfo` | `/en/about/company-info` | `page` | published 2026-07-25 | Monitor company facts after Vercel deploy. |
| `/tilsette` | `/en/about/employees` | `page` | published 2026-07-25 | Monitor role labels and verify all names, phone numbers and emails from current source. |
| `/aktuelt` | `/en/about/news` | `page` | published 2026-07-25 | Monitor news overview and decide whether individual news articles need English URLs. |
| `/stillingledig` | `/en/about/careers` | `page` | priority-3 draft | Review whether vacancy text is current before publishing. |
| `/personvernerklering` | `/en/privacy-policy` | `page` | priority-3 draft, legal review required | Legal translation requires manual review before approval. |
| `/openheitslova` | `/en/transparency-act` | `page` | priority-3 draft, legal review required | Compliance translation and old `/s/` document links require manual review before approval. |

## Validation After Each Translation Batch

```bash
source ~/.nvm/nvm.sh
nvm use
npm run check:i18n
npm run check:i18n:sanity
npm run lint
npm run build
LINK_CHECK_BASE_URL=http://127.0.0.1:3060 npm run check:links
```

Production after push:

```bash
I18N_CHECK_BASE_URL=https://fresvik-produkt2.vercel.app npm run check:i18n
LINK_CHECK_BASE_URL=https://fresvik-produkt2.vercel.app npm run check:links
```
