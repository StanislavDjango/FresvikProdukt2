# Asset Migration Status

Generated from local migration cache and source data.

## Summary

| Metric | Count |
| --- | ---: |
| Total assets found | 318 |
| Images | 291 |
| PDFs/documents | 27 |
| Other assets | 0 |
| Used assets | 190 |
| Unused assets | 120 |
| Missing assets | 0 |
| Duplicate assets | 6 |
| Ready for Sanity | 10 |
| Uploaded to Sanity | 182 |
| Failed or needs review | 0 |
| TODO original URLs | 14 |

## Status Counts

- `duplicate`: 6
- `ready-for-sanity`: 10
- `unused`: 120
- `uploaded-to-sanity`: 182

## Local Path Usage

85 routes/documents still use local `/assets/fresvik` paths while assets wait for Sanity import.

- `/`
- `/aktuelt`
- `/aktuelt/40-aars-jubileum`
- `/aktuelt/agnar-er-snart-pensjonistnbsp`
- `/aktuelt/arne-olav-ny-salskonsulent`
- `/aktuelt/ein-investering-for-henga-med-i-tidanbsp`
- `/aktuelt/fasade-element-og-takplater-ruukki`
- `/aktuelt/fresvik-kjolerom-til-fruktbonde`
- `/aktuelt/gladhistorie-fresvik-kjole-fryserom`
- `/aktuelt/innfesting-mot-golv`
- `/aktuelt/john-bothun-blir-pensjonist`
- `/aktuelt/jul-2020`
- `/aktuelt/montasje-prosjekt`
- `/aktuelt/ny-teknisk-teiknar-havard-berdal`
- `/aktuelt/nye-monteringsanvisningar`
- `/aktuelt/orklafoods-stranda`
- `/aktuelt/portproduksjon`
- `/aktuelt/samaneh-shakeri-ny-teknisk-sjef`
- `/aktuelt/skjererom`
- `/aktuelt/tomas-kruvellis-vaar-nye-mann`
- `/aktuelt/vi-er-blitt-sertifisert-miljofyrtarn`
- `/andre-produkter/2014/7/9/industri-slagdor`
- `/andre-produkter/2014/7/9/skipsdrer`
- `/andre-produkter/2014/7/9/standard-drer`
- `/andre-produkter/beslag`
- `/andre-produkter/diktator-dortiltrekker`
- `/andre-produkter/elebar-ventil`
- `/andre-produkter/kjlerampe`
- `/andre-produkter/maxielebar-ventil`
- `/andre-produkter/pego-innestengningsalarm`
- `/andre-produkter/pvc-gardiner`
- `/andre-produkter/standard-handtak`
- `/dokumentasjon`
- `/firmainfo`
- `/home`
- `/kjolerom-fryserom-butikk`
- `/kjolerom-fryserom-offshore`
- `/kjolerom-fryserom-storkjokken`
- `/kundeservice/faq`
- `/monteringsanvisning`
- `/monteringsanvisningar-fresvik-skyveport`
- `/openheitslova`
- `/personvernerklering`
- `/produkt`
- `/produkt/fasadepanel`
- `/produkt/fresvik-panel`
- `/produkt/fresvik-pir-panel`
- `/produkt/fresvik-pur-panel`
- `/produkt/frysetunnel`
- `/produkt/kjole-frysedorer`
- `/produkt/kjole-fryseportar`
- `/referansar`
- `/referansar/2014/7/8/coop-extra-sogndal`
- `/referansar/2014/7/8/interfrukt-vrt-strste-prosjekt`
- `/referansar/bjerke-spekemat`
- `/referansar/bjerkreim-legekontor-vikesaa`
- `/referansar/bunnpris-hammerfest`
- `/referansar/buskerud-storcash`
- `/referansar/celsa-steel-sotra`
- `/referansar/fiskehallen`
- `/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar`
- `/referansar/fryse-og-kjolerom-kiwi-otta`
- `/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront`
- `/referansar/fryserom-baza-fredrikstad`
- `/referansar/fryserom-coop-obs-alnabru`
- `/referansar/fryserom-fryseport-rentokil`
- `/referansar/fryserom-med-fryseport-til-coop-extra-naustdal`
- `/referansar/fryseromsportar-til-rema-1000-i-narvik`
- `/referansar/historisk-leveranse-pir-panel-spar-lund-torv`
- `/referansar/karlsoybruket`
- `/referansar/kjolerom-kjoledor-bunnpris-volda`
- `/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark`
- `/referansar/nye-leveransar-til-rema-1000-ya-i-larvik`
- `/referansar/omfattande-leveranse-til-bakehuset-trondheim`
- `/referansar/restauranthuset-malin`
- `/referansar/spesialloysing-torkerom-drageboden-kaupanger`
- `/referansar/vik-helse-og-omsorgssenter`
- `/stillingledig`
- `/tenester`
- `/tenester/leveranse`
- `/tenester/montasje`
- `/tenester/service-reservedeler`
- `/tilleggsutstyr`
- `/tilsette`
- `/transportskade`


## Old Sitemap Image Coverage

| Metric | Count |
| --- | ---: |
| Baseline old sitemap image count | 325 |
| Live sitemap image entries | 322 |
| Live sitemap unique image URLs | 275 |
| Local migrated image assets | 291 |
| Sitemap images classified migrated | 271 |
| Sitemap duplicate image entries | 47 |
| Sitemap thumbnail/variant unresolved | 0 |
| Sitemap images missing local match | 0 |
| Local-only images without recovered originalUrl | 0 |

Source drift note: `src/data/legacyRoutes.ts` stores the earlier baseline, while `MACHINE_READABLE_MIGRATION_AUDIT.json` stores the latest live sitemap audit.


## Notes

- `public/assets/fresvik` remains a temporary migration cache.
- `originalUrl` is marked `TODO: unknown original URL` where the exact old remote asset URL was not retained in local source data.
- Real Sanity upload requires `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, and `SANITY_AUTH_TOKEN`.
- `sanity/seed/migratedContent.ndjson` remains the baseline; generate `sanity/seed/migratedContent.withAssets.ndjson` after uploads instead of overwriting it.
- Do not delete local files until Sanity upload, reference generation, and production verification are complete.
