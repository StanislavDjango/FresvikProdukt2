# Fresvik Multilingual Implementation Plan

## Status

Norwegian remains the canonical language and existing Norwegian URLs must stay unchanged.
English is implemented as a controlled `/en` layer with translated public URL slugs.

Current implementation:

- Norwegian routes stay unchanged, for example `/produkt/fresvik-pir-panel`.
- English routes use readable translated paths from `src/i18n/routeMap.json`, for example `/en/products/fresvik-pir-panel`.
- Temporary old English paths such as `/en/produkt/fresvik-pir-panel` are redirected to the canonical English path.
- `/studio` is excluded from locale canonical redirects.
- Header, footer and the development notice use `next-intl` UI messages from `src/i18n/messages`.
- English pages first look for an English Sanity document and fall back to a clear temporary English page when translation is missing.
- `npm run seed:sanity:en` writes `sanity/seed/migratedContent.en.ndjson` as draft English documents without overwriting the Norwegian baseline.
- Sanity document schemas include language metadata for document-level translations.
- `npm run check:i18n` validates route mapping, message key parity and the `/studio` proxy exclusion.

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

## Remaining Work

1. Translate approved English content in Sanity, page by page.
2. Translate document titles/descriptions, while Norwegian PDFs may remain marked as Norwegian PDF.
3. Replace temporary fallback notices once each English Sanity document is approved.
4. Add any missing English route mappings before linking to those pages.
5. Run full checks before exposing English navigation more prominently.

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
LINK_CHECK_BASE_URL=http://127.0.0.1:3061 npm run check:links
```
