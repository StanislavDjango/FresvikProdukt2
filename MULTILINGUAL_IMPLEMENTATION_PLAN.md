# Fresvik Multilingual Implementation Plan

## Status

The Norwegian site remains the canonical production content source. English support starts as a controlled `/en` layer without changing existing Norwegian URLs.

Current implementation:

- Norwegian routes stay unchanged, for example `/produkt/fresvik-pir-panel`.
- English routes use the same source path under `/en`, for example `/en/produkt/fresvik-pir-panel`.
- Header and footer can switch labels and links based on the current route.
- English pages clearly state that full English copy is being prepared and link back to the complete Norwegian source page.
- Sanity document schemas now include language metadata for future document-level translations.

## Translation Model

Use one Sanity document per language:

- `language`: `nn` or `en`.
- `translationGroup`: stable shared key across all translations of the same page.
- `translatedFrom`: optional reference to the Norwegian source document.

Existing Sanity documents without `language` are treated as Norwegian (`nn`) so the current site keeps working.

## Route Rules

- Default language: Norwegian, no prefix.
- English: `/en`.
- Keep technical slugs stable for now to avoid breaking links during translation.
- Add translated slugs later only if the redirect and link audit is updated.

## Next Steps

1. Translate the main navigation pages first: `/`, `/produkt`, `/tenester`, `/dokumentasjon`, `/referansar`, `/om-oss`, `/kontakt`.
2. Translate product pages next, starting with high-value pages:
   - `/produkt/fresvik-pir-panel`
   - `/produkt/fresvik-pur-panel`
   - `/produkt/kjole-fryseportar`
   - `/produkt/kjole-frysedorer`
   - `/produkt/fasadepanel`
   - `/produkt/frysetunnel`
3. Translate documents and PDF titles/descriptions.
4. Add English Sanity documents and connect them with `translationGroup`.
5. Replace the temporary English status section once each English document is approved.
6. Run full checks before exposing English navigation more prominently.

## Checks

Run after each translation batch:

```bash
source ~/.nvm/nvm.sh
nvm use
npm run lint
npm run build
npm run check:migration
npm run check:links
```
