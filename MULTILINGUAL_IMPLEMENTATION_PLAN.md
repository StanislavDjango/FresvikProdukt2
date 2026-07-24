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
- The Priority 1 translation batch now contains structured English draft body/sections for `/`, `/produkt`, `/produkt/fresvik-pir-panel`, `/produkt/fresvik-pur-panel`, `/produkt/kjole-frysedorer`, `/produkt/kjole-fryseportar`, `/tenester`, `/tenester/montasje`, `/dokumentasjon` and `/kontakt`; these are still drafts and need human/technical review before import/publishing.
- The Priority 2 translation batch now contains structured English draft body/sections for `/produkt/fasadepanel`, `/produkt/frysetunnel`, `/tilleggsutstyr`, `/tenester/leveranse`, `/tenester/service-reservedeler`, `/monteringsanvisning`, `/monteringsanvisningar-fresvik-skyveport` and `/kundeservice/faq`; these are also drafts and need human/technical review before import/publishing.
- The Priority 3 translation batch now contains structured English draft body/sections for `/referansar`, `/om-oss`, `/firmainfo`, `/tilsette`, `/aktuelt`, `/stillingledig`, `/personvernerklering` and `/openheitslova`; legal/compliance pages are explicitly marked for manual review before approval.
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

1. Review/import the Priority 1, Priority 2 and Priority 3 English Sanity draft batches. Current `/en` fallback pages remain intentionally temporary until approved translations are imported, without mixing in Norwegian page body content.
2. Translate document titles/descriptions, while Norwegian PDFs may remain marked as Norwegian PDF.
3. Replace temporary fallback notices once each English Sanity document is approved.
4. Add any missing English route mappings before linking to those pages.
5. Re-enable the public English language switch only after the first approved English content batch is imported and visually checked.
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
I18N_CHECK_BASE_URL=http://127.0.0.1:3061 npm run check:i18n
LINK_CHECK_BASE_URL=http://127.0.0.1:3061 npm run check:links
```
