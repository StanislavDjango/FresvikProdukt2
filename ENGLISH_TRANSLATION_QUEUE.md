# English Translation Queue

Status date: 2026-07-24

This file tracks the remaining content work for the English version. The `/en` routing, UI messages, SEO alternates, Sanity language metadata and validation scripts are in place. These rows are not approved English content yet unless explicitly marked otherwise.

## Rules

- Norwegian pages without a prefix remain the source of truth.
- English pages use `/en/...` URLs from `src/i18n/routeMap.json`.
- `sanity/seed/migratedContent.en.ndjson` contains draft English documents only.
- Public `/en` fallback pages must stay English-only: show translation status and a Norwegian source link, but do not render Norwegian body sections as English content.
- Do not auto-translate technical claims without review.
- Keep product names, Fresvik, PIR, PUR, SINTEF and CE unchanged.
- Norwegian-only PDFs may be linked from English pages, but label them as Norwegian PDFs.
- A page is ready only after its English Sanity document has approved title, intro, body, documents and links.

## Priority 1

| Norwegian source | English URL | Sanity type | Current status | Required action |
| --- | --- | --- | --- | --- |
| `/` | `/en` | `page` | draft summary | Translate and approve homepage sections, CTA text, document/certificate labels and main links. |
| `/produkt` | `/en/products` | `page` | draft summary | Translate product overview text and product card descriptions. |
| `/produkt/fresvik-pir-panel` | `/en/products/fresvik-pir-panel` | `product` | draft summary | Translate full product body, technical data, benefits, document labels and related accessory links. |
| `/produkt/fresvik-pur-panel` | `/en/products/fresvik-pur-panel` | `product` | draft summary | Translate full product body, technical data, image captions and PDF labels. |
| `/produkt/kjole-frysedorer` | `/en/products/cold-freezer-doors` | `product` | draft summary | Translate door descriptions, construction/specification text and related documents. |
| `/produkt/kjole-fryseportar` | `/en/products/cold-freezer-ports` | `product` | draft summary | Translate gate descriptions, model text, PDF labels and related links. |
| `/tenester` | `/en/services` | `page` | draft summary | Translate service overview and cards. |
| `/tenester/montasje` | `/en/services/installation` | `service` | draft summary | Translate installation process, responsibilities and CTA text. |
| `/dokumentasjon` | `/en/documentation` | `page` | draft summary | Translate document categories and label Norwegian PDFs clearly. |
| `/kontakt` | `/en/contact` | `page` | draft summary | Translate contact page text and preserve all contact details exactly. |

## Priority 2

| Norwegian source | English URL | Sanity type | Current status | Required action |
| --- | --- | --- | --- | --- |
| `/produkt/fasadepanel` | `/en/products/facade-panels` | `product` | draft summary | Translate product information and reference links. |
| `/produkt/frysetunnel` | `/en/products/freezing-tunnel` | `product` | draft summary | Translate construction/use cases and related solution text. |
| `/tilleggsutstyr` | `/en/products/accessories` | `page` | draft summary | Translate accessory overview and item descriptions. |
| `/tenester/leveranse` | `/en/services/delivery` | `service` | draft summary | Translate delivery page text. |
| `/tenester/service-reservedeler` | `/en/services/service-spare-parts` | `service` | draft summary | Translate service/spare parts page text. |
| `/monteringsanvisning` | `/en/documentation/installation-guide` | `page` | draft summary | Translate guide labels and mark PDFs as Norwegian/English where applicable. |
| `/monteringsanvisningar-fresvik-skyveport` | `/en/documentation/electric-sliding-door` | `page` | draft summary | Translate electrical sliding gate document labels. |
| `/kundeservice/faq` | `/en/documentation/faq` | `page` | draft summary | Translate FAQ questions and answers. |

## Priority 3

| Norwegian source | English URL | Sanity type | Current status | Required action |
| --- | --- | --- | --- | --- |
| `/referansar` | `/en/references` | `page` | draft summary | Translate references overview and project card text. |
| `/om-oss` | `/en/about` | `page` | draft summary | Translate company overview and internal links. |
| `/firmainfo` | `/en/about/company-info` | `page` | draft summary | Translate company facts without changing legal details. |
| `/tilsette` | `/en/about/employees` | `page` | draft summary | Translate role labels only; preserve names, phone numbers and emails. |
| `/aktuelt` | `/en/about/news` | `page` | draft summary | Translate news overview and decide whether individual news articles need English URLs. |
| `/stillingledig` | `/en/about/careers` | `page` | draft summary | Translate career text and current position details if active. |
| `/personvernerklering` | `/en/privacy-policy` | `page` | draft summary | Legal translation requires manual review. |
| `/openheitslova` | `/en/transparency-act` | `page` | draft summary | Legal/compliance translation requires manual review. |

## Validation After Each Translation Batch

```bash
source ~/.nvm/nvm.sh
nvm use
npm run check:i18n
npm run lint
npm run build
LINK_CHECK_BASE_URL=http://127.0.0.1:3060 npm run check:links
```

Production after push:

```bash
I18N_CHECK_BASE_URL=https://fresvik-produkt2.vercel.app npm run check:i18n
LINK_CHECK_BASE_URL=https://fresvik-produkt2.vercel.app npm run check:links
```
