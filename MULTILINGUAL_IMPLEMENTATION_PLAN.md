# Fresvik Multilingual Implementation Plan

## Status

Norwegian remains the canonical language and existing Norwegian URLs must stay unchanged.
English is implemented as a controlled `/en` layer with translated public URL slugs.

Current implementation:

- Norwegian routes stay unchanged, for example `/produkt/fresvik-pir-panel`.
- English routes use readable translated paths from `src/i18n/routeMap.json`, for example `/en/products/fresvik-pir-panel`.
- Temporary old English paths such as `/en/produkt/fresvik-pir-panel` are redirected to the canonical English path.
- `/studio` is excluded from locale canonical redirects.
- Header, footer, mega-menu descriptions and the development notice use localized UI messages from `src/i18n/messages`.
- English pages first look for an English Sanity document and fall back to a clear temporary English page when translation is missing.
- Temporary English fallback pages do not render Norwegian body sections or Norwegian product cards; they show English status copy and link to the Norwegian source page until an approved English Sanity document exists.
- `npm run seed:sanity:en` writes `sanity/seed/migratedContent.en.ndjson` as draft English documents without overwriting the Norwegian baseline; the current seed covers all 26 entries in `src/i18n/routeMap.json`.
- The Priority 1 translation batch for `/`, `/produkt`, `/produkt/fresvik-pir-panel`, `/produkt/fresvik-pur-panel`, `/produkt/kjole-frysedorer`, `/produkt/kjole-fryseportar`, `/tenester`, `/tenester/montasje`, `/dokumentasjon` and `/kontakt` was published to Sanity on 2026-07-25.
- The Priority 2 translation batch for `/produkt/fasadepanel`, `/produkt/frysetunnel`, `/tilleggsutstyr`, `/tenester/leveranse`, `/tenester/service-reservedeler`, `/monteringsanvisning`, `/monteringsanvisningar-fresvik-skyveport` and `/kundeservice/faq` was published to Sanity on 2026-07-25.
- The safe Priority 3 batch for `/referansar`, `/om-oss`, `/firmainfo`, `/tilsette` and `/aktuelt` was published to Sanity on 2026-07-25; `/stillingledig`, `/personvernerklering` and `/openheitslova` stay review-only because careers, legal and compliance content should not be published automatically.
- `npm run seed:sanity:en:publish` dry-runs the default Priority 1 publish batch; `npm run seed:sanity:en:publish:p1` applies Priority 1; `npm run seed:sanity:en:publish:safe` applies Priority 1, Priority 2 and safe Priority 3.
- `npm run check:i18n:sanity` verifies that all English seed draft IDs exist in Sanity and reports how many matching English documents are published. Use `npm run check:i18n:sanity:published` only after approved English documents are expected to be public.
- Sanity document schemas include language metadata for document-level translations.
- `npm run check:i18n` validates route mapping, bidirectional language switch paths, message key parity, required content UI labels, English seed slug/sourceUrl coverage, Priority 1 draft completeness and the `/studio` proxy exclusion.
- Production `/en` routes are live on `https://fresvik-produkt2.vercel.app`.
- Production canonical and `hreflang` alternates are verified for Norwegian and English public pages, including the separate `/kontakt` route.
- The public header does not offer an English switch from Norwegian pages until approved English Sanity content is ready; direct `/en` pages still show a return link back to Norwegian.

Production verification on 2026-07-24 15:39 CEST:

- `https://fresvik-produkt2.vercel.app/en` returns `lang="en"` and canonical `/en`.
- `https://fresvik-produkt2.vercel.app/en/products/fresvik-pir-panel` returns `lang="en"`, canonical `/en/products/fresvik-pir-panel`, `nn-NO` alternate `/produkt/fresvik-pir-panel` and `en` alternate `/en/products/fresvik-pir-panel`.
- `https://fresvik-produkt2.vercel.app/kontakt` returns canonical `/kontakt`, `nn-NO` alternate `/kontakt` and `en` alternate `/en/contact`.
- `LINK_CHECK_BASE_URL=https://fresvik-produkt2.vercel.app npm run check:links` passes for 182 pages and 220 internal URLs.
- `I18N_CHECK_BASE_URL=http://127.0.0.1:3060 npm run check:i18n` validates rendered `lang`, canonical and `hrefLang` output against the configured production canonical host.
- Reusable `ContentPageView` labels for company, legal, FAQ, documentation CTA, accessory navigation and partner CTAs are now covered by `src/i18n/messages/{nn,en}.json` and guarded by `npm run check:i18n`.

Sanity publication status on 2026-07-25:

- English seed drafts: `26/26`.
- Published English documents: `23/26`.
- Published batch: Priority 1, Priority 2 and safe Priority 3.
- Remaining unpublished English documents: `3/26`: `/stillingledig`, `/personvernerklering` and `/openheitslova`.

## Translation Model

Use one Sanity document per language:

- `language`: `nn` or `en`.
- `translationGroup`: stable shared key across all translations of the same page.
- `sourceLanguage`: optional migration marker, usually `nn` for English documents translated from Norwegian.
- `translatedFrom`: optional reference to the Norwegian source document.

Existing Sanity documents without `language` are treated as Norwegian (`nn`) so the current site keeps working.

## Route Rules

- Default language: Norwegian, no prefix.
- English: `/en`.
- Public English slugs are mapped in `src/i18n/routeMap.json`.
- Old donor redirects remain Norwegian-only unless a separate English redirect is intentionally added.
- The language switcher must map between equivalent pages, not only swap a prefix.

## First English Route Batch

Priority routes:

- `/en`
- `/en/products`
- `/en/products/fresvik-pir-panel`
- `/en/products/fresvik-pur-panel`
- `/en/products/cold-freezer-ports`
- `/en/products/cold-freezer-doors`
- `/en/products/facade-panels`
- `/en/products/freezing-tunnel`
- `/en/products/accessories`
- `/en/services`
- `/en/services/installation`
- `/en/services/delivery`
- `/en/services/service-spare-parts`
- `/en/documentation`
- `/en/references`
- `/en/about`
- `/en/contact`

The temporary fallback/seed layer also covers secondary menu pages such as `/en/documentation/installation-guide`, `/en/documentation/faq`, `/en/about/company-info`, `/en/about/employees`, `/en/about/news`, `/en/privacy-policy` and `/en/transparency-act`.

## Remaining Work

1. Keep `/stillingledig`, `/personvernerklering` and `/openheitslova` unpublished until careers/legal/compliance wording is manually approved.
2. Verify the published English runtime on production after Vercel deploy.
3. Decide whether individual news/reference detail pages need English routes or should remain Norwegian-only from the English overview pages.
4. Translate document titles/descriptions further where needed, while Norwegian PDFs may remain marked as Norwegian PDF.
5. Re-enable the public English language switch only after the first approved English content batch is published and visually checked.
6. Continue auditing page-specific hard-coded public UI strings before publishing English navigation broadly; the reusable `ContentPageView` labels are now message-backed.
7. Run full checks after each approved translation batch and before exposing English navigation more prominently.

## Checks

Run after each translation batch:

```bash
source ~/.nvm/nvm.sh
nvm use
npm run lint
npm run build
npm run check:migration
npm run check:assets
npm run check:i18n
npm run check:i18n:sanity
I18N_CHECK_BASE_URL=http://127.0.0.1:3061 npm run check:i18n
LINK_CHECK_BASE_URL=http://127.0.0.1:3061 npm run check:links
```
