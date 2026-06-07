# Migration Audit

Generated: 2026-06-07T22:29:33.316Z

## Summary

| Metric | Count |
| --- | ---: |
| Local baseline old URL count | 105 |
| Live sitemap URL count | 104 |
| Local baseline old image count | 325 |
| Live sitemap image entries | 322 |
| Live sitemap unique image URLs | 275 |
| Migrated page count | 13 |
| Redirect count | 29 |
| Partial count | 50 |
| Missing count | 0 |
| Needs-review count | 13 |
| Inventory-only count | 0 |
| Local image assets | 76 |
| Local document/PDF assets | 22 |
| Asset originalUrls recovered in manifest | 60 |

Do not treat the migration as complete while any route, asset, document or link remains `partial`, `missing`, `needs-review`, `inventory-only`, `thumbnail-or-variant` or `local-only`.

## Old sitemap coverage

The project baseline in `src/data/legacyRoutes.ts` records 105 URLs and 325 image entries checked earlier. The live donor sitemap currently returns 104 URLs and 322 image entries (275 unique image URLs). The difference must be treated as source drift until manually reviewed.

## Route coverage

| oldPath | newRoute | status | type | title | intro | body | images | docs | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| /aktuelt | /aktuelt | needs-review | news | yes | yes | no | 26/0 | no | Contains TODO/verification markers or unresolved migration text. |
| /aktuelt/40-aars-jubileum | /aktuelt/40-aars-jubileum | partial | news | yes | yes | no | 1/4 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/agnar-er-snart-pensjonistnbsp | /aktuelt/agnar-er-snart-pensjonistnbsp | partial | news | yes | yes | no | 1/2 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/arne-olav-ny-salskonsulent | /aktuelt/arne-olav-ny-salskonsulent | partial | news | yes | yes | no | 1/1 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/ein-investering-for-henga-med-i-tidanbsp | /aktuelt/ein-investering-for-henga-med-i-tidanbsp | partial | news | yes | yes | no | 1/3 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/fasade-element-og-takplater-ruukki | /aktuelt/fasade-element-og-takplater-ruukki | partial | news | yes | yes | no | 1/6 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/fasadeprosjekt-for-celsa-steel-service-sotra | /aktuelt/fasadeprosjekt-for-celsa-steel-service-sotra | partial | news | yes | yes | no | 0/0 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv | /aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv | partial | news | yes | yes | no | 0/0 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/fresvik-hengsel | /aktuelt/fresvik-hengsel | partial | news | yes | yes | no | 0/0 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/fresvik-kjolerom-til-fruktbonde | /aktuelt/fresvik-kjolerom-til-fruktbonde | partial | news | yes | yes | no | 1/4 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/fryse-og-kjlerom-til-sogn-frukt-og-grnt | /aktuelt/fryse-og-kjlerom-til-sogn-frukt-og-grnt | partial | news | yes | yes | no | 0/0 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/gladhistorie-fresvik-kjole-fryserom | /aktuelt/gladhistorie-fresvik-kjole-fryserom | partial | news | yes | yes | no | 1/1 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/innfesting-mot-golv | /aktuelt/innfesting-mot-golv | partial | news | yes | yes | no | 1/1 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/john-bothun-blir-pensjonist | /aktuelt/john-bothun-blir-pensjonist | partial | news | yes | yes | no | 1/2 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/jul-2020 | /aktuelt/jul-2020 | partial | news | yes | yes | no | 1/1 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/ledig-stilling-som-produksjonsmedarbeidar | /aktuelt/ledig-stilling-som-produksjonsmedarbeidar | partial | news | yes | yes | no | 0/0 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/montasje-prosjekt | /aktuelt/montasje-prosjekt | partial | news | yes | yes | no | 1/10 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/ny-teknisk-teiknar-havard-berdal | /aktuelt/ny-teknisk-teiknar-havard-berdal | partial | news | yes | yes | no | 1/1 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/nye-monteringsanvisningar | /aktuelt/nye-monteringsanvisningar | partial | news | yes | yes | no | 1/1 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/orklafoods-stranda | /aktuelt/orklafoods-stranda | partial | news | yes | yes | no | 1/9 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/portproduksjon | /aktuelt/portproduksjon | partial | news | yes | yes | no | 1/2 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/samaneh-shakeri-ny-teknisk-sjef | /aktuelt/samaneh-shakeri-ny-teknisk-sjef | partial | news | yes | yes | no | 1/1 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/skjererom | /aktuelt/skjererom | partial | news | yes | yes | no | 1/6 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/stor-leveranse-til-buskerud-storcash | /aktuelt/stor-leveranse-til-buskerud-storcash | needs-review | news | yes | yes | no | 0/0 | no | Contains TODO/verification markers or unresolved migration text. |
| /aktuelt/to-ledige-stillingar-i-haust | /aktuelt/to-ledige-stillingar-i-haust | partial | news | yes | yes | no | 0/0 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/tomas-kruvellis-vaar-nye-mann | /aktuelt/tomas-kruvellis-vaar-nye-mann | partial | news | yes | yes | no | 1/1 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /aktuelt/vi-er-blitt-sertifisert-miljofyrtarn | /aktuelt/vi-er-blitt-sertifisert-miljofyrtarn | partial | news | yes | yes | no | 1/1 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /andre-produkter | /tilleggsutstyr | redirect | product | no | no | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/2014/7/9/industri-slagdor | /tilleggsutstyr | redirect | product | no | no | no | 0/1 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/2014/7/9/skipsdrer | /tilleggsutstyr | redirect | product | no | no | no | 0/1 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/2014/7/9/standard-drer | /tilleggsutstyr | redirect | product | no | no | no | 0/1 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/beslag | /tilleggsutstyr | redirect | product | no | no | no | 0/6 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/Andre+produkt | /tilleggsutstyr | redirect | product | no | no | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/Dør | /tilleggsutstyr | redirect | product | no | no | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/dører | /tilleggsutstyr | redirect | product | no | no | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/Fasadepanel | /tilleggsutstyr | redirect | product | no | no | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/Port | /tilleggsutstyr | redirect | product | no | no | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/Tilleggsutstyr+kjølerom | /tilleggsutstyr | redirect | product | no | no | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/diktator-dortiltrekker | /tilleggsutstyr | redirect | product | no | no | no | 0/1 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/elebar-ventil | /tilleggsutstyr | redirect | product | no | no | no | 0/2 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/kjlerampe | /tilleggsutstyr | redirect | product | no | no | no | 0/3 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/maxielebar-ventil | /tilleggsutstyr | redirect | product | no | no | no | 0/2 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/pego-innestengningsalarm | /tilleggsutstyr | redirect | product | no | no | no | 0/2 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/pvc-gardiner | /tilleggsutstyr | redirect | product | no | no | no | 0/2 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/standard-handtak | /tilleggsutstyr | redirect | product | no | no | no | 0/1 | no | Redirects to /tilleggsutstyr. |
| /dokumentasjon | /dokumentasjon | needs-review | document | yes | yes | no | 8/1 | yes | Contains TODO/verification markers or unresolved migration text. |
| /firmainfo | /firmainfo | page | page | yes | yes | yes | 0/1 | no | Covered as migrated page in local data. |
| /kjolerom-fryserom-butikk | /kjolerom-fryserom-butikk | page | support | yes | yes | yes | 2/2 | no | Covered as migrated page in local data. |
| /kjolerom-fryserom-offshore | /kjolerom-fryserom-offshore | page | support | yes | yes | yes | 2/18 | no | Covered as migrated page in local data. |
| /kjolerom-fryserom-offshore-1 | /kjolerom-fryserom-offshore | redirect | support | no | no | no | 0/0 | no | Present in local legacyRoutes baseline but not present in current live sitemap. |
| /kjolerom-fryserom-storkjokken | /kjolerom-fryserom-storkjokken | page | support | yes | yes | yes | 2/3 | no | Covered as migrated page in local data. |
| /kontakt | /kontakt | page | page | yes | yes | yes | 0/1 | no | Covered as migrated page in local data. |
| /kundeservice/faq | /kundeservice/faq | page | support | yes | yes | yes | 0/5 | no | Covered as migrated page in local data. |
| /monteringsanvisning | /monteringsanvisning | needs-review | document | yes | yes | no | 3/6 | yes | Contains TODO/verification markers or unresolved migration text. |
| /monteringsanvisningar-fresvik-skyveport | /monteringsanvisningar-fresvik-skyveport | page | document | yes | yes | yes | 0/1 | yes | Covered as migrated page in local data. |
| /personvernerklering | /personvernerklering | page | legal | yes | yes | yes | 0/0 | no | Covered as migrated page in local data. |
| /produkt | /produkt | needs-review | product | yes | yes | no | 16/6 | no | Contains TODO/verification markers or unresolved migration text. |
| /produkt/fasadepanel | /produkt/fasadepanel | needs-review | product | yes | yes | no | 2/3 | no | Contains TODO/verification markers or unresolved migration text. |
| /produkt/fresvik-panel | /produkt/fresvik-pur-panel | redirect | product | no | no | no | 0/6 | no | Redirects to /produkt/fresvik-pur-panel. |
| /produkt/fresvik-pir-panel | /produkt/fresvik-pir-panel | needs-review | product | yes | yes | no | 2/7 | yes | Contains TODO/verification markers or unresolved migration text. |
| /produkt/frysetunnel | /produkt/frysetunnel | needs-review | product | yes | yes | no | 2/8 | no | Contains TODO/verification markers or unresolved migration text. |
| /produkt/kjole-frysedorer | /produkt/kjole-frysedorer | needs-review | product | yes | yes | no | 2/2 | no | Contains TODO/verification markers or unresolved migration text. |
| /produkt/kjole-fryseportar | /produkt/kjole-fryseportar | needs-review | product | yes | yes | no | 2/8 | yes | Contains TODO/verification markers or unresolved migration text. |
| /produktfoto | /produkt | redirect | product | no | no | no | 0/6 | no | Redirects to /produkt. |
| /referansar | /referansar | page | reference | yes | yes | yes | 35/0 | no | Covered as migrated page in local data. |
| /referansar/2014/7/8/coop-extra-sogndal | /referansar/2014/7/8/coop-extra-sogndal | partial | reference | yes | yes | no | 1/3 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/2014/7/8/interfrukt-vrt-strste-prosjekt | /referansar/2014/7/8/interfrukt-vrt-strste-prosjekt | partial | reference | yes | yes | no | 1/4 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/bjerke-spekemat | /referansar/bjerke-spekemat | partial | reference | yes | yes | no | 1/4 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/bjerkreim-legekontor-vikesaa | /referansar/bjerkreim-legekontor-vikesaa | partial | reference | yes | yes | no | 1/5 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/bunnpris-hammerfest | /referansar/bunnpris-hammerfest | partial | reference | yes | yes | no | 1/3 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/buskerud-storcash | /referansar/buskerud-storcash | partial | reference | yes | yes | no | 1/5 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/category/Fasadepanel | /referansar | redirect | reference | no | no | no | 0/0 | no | Redirects to /referansar. |
| /referansar/category/Framside-referansar | /referansar | redirect | reference | no | no | no | 0/0 | no | Redirects to /referansar. |
| /referansar/category/Kjøle-+fryserom+butikk | /referansar | redirect | reference | no | no | no | 0/0 | no | Redirects to /referansar. |
| /referansar/category/Storkjøkken-restaurant | /referansar | redirect | reference | no | no | no | 0/0 | no | Redirects to /referansar. |
| /referansar/celsa-steel-sotra | /referansar/celsa-steel-sotra | partial | reference | yes | yes | no | 1/4 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/fiskehallen | /referansar/fiskehallen | partial | reference | yes | yes | no | 1/3 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar | /referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar | partial | reference | yes | yes | no | 1/1 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/fryse-og-kjolerom-kiwi-otta | /referansar/fryse-og-kjolerom-kiwi-otta | partial | reference | yes | yes | no | 1/7 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront | /referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront | partial | reference | yes | yes | no | 1/4 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/fryserom-baza-fredrikstad | /referansar/fryserom-baza-fredrikstad | partial | reference | yes | yes | no | 1/4 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/fryserom-coop-obs-alnabru | /referansar/fryserom-coop-obs-alnabru | partial | reference | yes | yes | no | 1/3 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/fryserom-fryseport-rentokil | /referansar/fryserom-fryseport-rentokil | partial | reference | yes | yes | no | 1/9 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/fryserom-med-fryseport-til-coop-extra-naustdal | /referansar/fryserom-med-fryseport-til-coop-extra-naustdal | partial | reference | yes | yes | no | 1/4 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/fryseromsportar-til-rema-1000-i-narvik | /referansar/fryseromsportar-til-rema-1000-i-narvik | partial | reference | yes | yes | no | 1/5 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/historisk-leveranse-pir-panel-spar-lund-torv | /referansar/historisk-leveranse-pir-panel-spar-lund-torv | partial | reference | yes | yes | no | 1/6 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/karlsoybruket | /referansar/karlsoybruket | partial | reference | yes | yes | no | 1/3 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/kjolerom-kjoledor-bunnpris-volda | /referansar/kjolerom-kjoledor-bunnpris-volda | partial | reference | yes | yes | no | 1/3 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark | /referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark | partial | reference | yes | yes | no | 1/2 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/nye-leveransar-til-rema-1000-ya-i-larvik | /referansar/nye-leveransar-til-rema-1000-ya-i-larvik | partial | reference | yes | yes | no | 1/3 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/omfattande-leveranse-til-bakehuset-trondheim | /referansar/omfattande-leveranse-til-bakehuset-trondheim | partial | reference | yes | yes | no | 1/4 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/restauranthuset-malin | /referansar/restauranthuset-malin | partial | reference | yes | yes | no | 1/5 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/spesialloysing-torkerom-drageboden-kaupanger | /referansar/spesialloysing-torkerom-drageboden-kaupanger | partial | reference | yes | yes | no | 1/9 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /referansar/vik-helse-og-omsorgssenter | /referansar/vik-helse-og-omsorgssenter | partial | reference | yes | yes | no | 1/5 | no | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| /send-foresporsel | /kontakt | redirect | unknown | no | no | no | 0/0 | no | Redirects to /kontakt. |
| /startside | / | redirect | unknown | no | no | no | 0/13 | no | Redirects to /. |
| /stillingledig | /stillingledig | page | page | yes | yes | yes | 0/4 | no | Covered as migrated page in local data. |
| /store | /tilleggsutstyr | redirect | product | no | no | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /store/p/dr-tiltrekker-diktator | /tilleggsutstyr | redirect | product | no | no | no | 0/1 | no | Redirects to /tilleggsutstyr. |
| /tenester/leveranse | /tenester/leveranse | needs-review | service | yes | yes | no | 2/2 | no | Contains TODO/verification markers or unresolved migration text. |
| /tenester/montasje | /tenester/montasje | needs-review | service | yes | yes | no | 2/2 | no | Contains TODO/verification markers or unresolved migration text. |
| /tenester/service-reservedeler | /tenester/service-reservedeler | needs-review | service | yes | yes | no | 2/1 | no | Contains TODO/verification markers or unresolved migration text. |
| /tilleggsutstyr | /tilleggsutstyr | page | unknown | yes | yes | yes | 19/12 | no | Covered as migrated page in local data. |
| /tilsette | /tilsette | page | employee | yes | yes | yes | 21/14 | no | Covered as migrated page in local data. |
| /transportskade | /transportskade | page | support | yes | yes | yes | 2/2 | no | Covered as migrated page in local data. |

## Content completeness

- News pages: 27
- Reference pages: 30
- Product pages/routes: 28
- Service pages/routes: 3
- Legal/support/company pages/routes: 14

Any old news/reference detail with only a short migrated summary is marked `partial` or `needs-review`.

## Asset coverage

| Metric | Count |
| --- | ---: |
| Live sitemap image entries | 322 |
| Live sitemap unique image URLs | 275 |
| Local migrated image assets | 76 |
| Sitemap images classified migrated | 219 |
| Sitemap duplicate image entries | 36 |
| Sitemap thumbnail/variant unresolved | 11 |
| Sitemap images missing local match | 56 |
| Local-only images without recovered originalUrl | 16 |

## PDF/document coverage

| localPath | title | status | routeAvailable | fileSize | oldUrl | notes |
| --- | --- | --- | --- | --- | --- | --- |
| /assets/fresvik/documents/endre-skyveretning.pdf | Endre skyveretning | migrated | yes | 174280 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/fresvik-dor-montasjeanvisning.pdf | Dør | migrated | yes | 4217580 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/fresvik-fryserom-montasjeanvisning.pdf | Fryserom, Norsk/English | migrated | yes | 1929048 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/fresvik-kjolerom-montasjeanvisning.pdf | Kjølerom, Norsk/English | migrated | yes | 1596484 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/fresvik-port-montasjeanvisning.pdf | Monteringsanvisning manuell port | migrated | yes | 6789859 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/koblingsskjema-fermod-5010.pdf | Koblingskjema Fermod 5010 | migrated | yes | 2166231 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/leveringsvilkar-fresvik-produkt-2023.pdf | Leveringsbetingelser | migrated | yes | 350922 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/miljodokument-fresvik-produkt.pdf | Miljødokument | migrated | yes | 38764 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/montasjeanvisning-5010-for-2150.pdf | Montasjeanvisning 5010 for 2150 | migrated | yes | 3418684 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/montasjeanvisning-5010-for-3530-og-7530.pdf | Montasjeanvisning 5010 for 3530 og 7530 | migrated | yes | 3531249 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/openheitslova-aktsemdvurderingar-2024.pdf | Aktsemdvurdering 2024 | migrated | yes | 201642 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/openheitslova-rutine-plikter.pdf | Rutine for oppfylling av plikter etter Openheitslova | migrated | yes | 276631 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/openheitslova-utgreiing-2024-signert.pdf | Utgreiing 2024 | migrated | yes | 268546 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/pir-panel-montasjeanvisning.pdf | PIR-Paneler montasjeanvisning | migrated | yes | 1031884 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/pir-panel.pdf | PIR-Paneler produktblad | migrated | yes | 302439 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/produktblad-fresvik-skyveport.pdf | Produktblad Fresvik Skyveport | migrated | yes | 1648458 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/quick-start-5010exp.pdf | Quick Start 5010Exp | migrated | yes | 1001335 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf | Sentral godkjenning | migrated | yes | 58526 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/sintef-produktsertifikat.pdf | Teknisk godkjenning | migrated | yes | 439904 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/sintef-teknisk-godkjenning.pdf | Fresvik PIR-Panel CPR | migrated | yes | 253758 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/tilleggsutstyr-nmoptions-kits5010exp.pdf | Tilleggsutstyr NMOptions kits 5010Exp | migrated | yes | 2177053 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/ytelseserklaring-fresvik-produkt.pdf | Ytelseserklæring | migrated | yes | 882067 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |

## Internal links

| Metric | Count |
| --- | ---: |
| Internal link references | 391 |
| OK routes | 204 |
| Redirect links | 0 |
| Asset links OK | 185 |
| Broken links | 2 |

| href | sourceFile | status | notes |
| --- | --- | --- | --- |
| /kjolerom-fryserom | src/data/pages.ts:491 | broken | No page or redirect found for this internal link. |
| /jobbmodell | src/data/pages.ts:1697 | broken | No page or redirect found for this internal link. |

## External links

| url | sourcePage | purpose | status |
| --- | --- | --- | --- |
| https://sintefcertification.no/Product/Index/129 | src/data/pages.ts: | certification/documentation | keep |
| https://www.fresvik.no/ | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/produkt/fresvik-pir-panel | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/produkt/fresvik-panel | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/produkt/kjole-fryseportar | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/produkt/kjole-frysedorer | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/produkt/fasadepanel | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/produkt/frysetunnel | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/tilleggsutstyr | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/kjolerom-fryserom-butikk | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/kjolerom-fryserom-offshore | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/kjolerom-fryserom-storkjokken | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/transportskade | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/tenester/montasje | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/tenester/leveranse | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/tenester/service-reservedeler | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/dokumentasjon | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/monteringsanvisning | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/monteringsanvisningar-fresvik-skyveport | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/kundeservice/faq | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/referansar | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/firmainfo | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/tilsette | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/aktuelt | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/stillingledig | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/personvernerklering | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no/openheitslova | src/data/pages.ts: | source-url | keep |
| https://www.fresvik.no${slug} | src/data/pages.ts: | source-url | keep |
| https://lovdata.no/dokument/NL/lov/2021-06-18-99 | src/data/oldSiteInventory.ts: | legal-reference | keep |
| https://www.fresvik.no/sitemap.xml | src/data/oldSiteInventory.ts: | source-url | keep |

## Products and services focus

| path | status | body | images | docs | notes |
| --- | --- | --- | --- | --- | --- |
| /produkt/fasadepanel | needs-review | no | 2/3 | no | Contains TODO/verification markers or unresolved migration text. |
| /produkt/fresvik-panel | redirect | no | 0/6 | no | Redirects to /produkt/fresvik-pur-panel. |
| /produkt/fresvik-pir-panel | needs-review | no | 2/7 | yes | Contains TODO/verification markers or unresolved migration text. |
| /produkt/frysetunnel | needs-review | no | 2/8 | no | Contains TODO/verification markers or unresolved migration text. |
| /produkt/kjole-frysedorer | needs-review | no | 2/2 | no | Contains TODO/verification markers or unresolved migration text. |
| /produkt/kjole-fryseportar | needs-review | no | 2/8 | yes | Contains TODO/verification markers or unresolved migration text. |
| /tenester/leveranse | needs-review | no | 2/2 | no | Contains TODO/verification markers or unresolved migration text. |
| /tenester/montasje | needs-review | no | 2/2 | no | Contains TODO/verification markers or unresolved migration text. |
| /tenester/service-reservedeler | needs-review | no | 2/1 | no | Contains TODO/verification markers or unresolved migration text. |

## Missing / partial / needs-review

| type | target | status | task |
| --- | --- | --- | --- |
| route | /aktuelt | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /aktuelt/40-aars-jubileum | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/agnar-er-snart-pensjonistnbsp | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/arne-olav-ny-salskonsulent | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/ein-investering-for-henga-med-i-tidanbsp | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/fasade-element-og-takplater-ruukki | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/fasadeprosjekt-for-celsa-steel-service-sotra | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/fresvik-hengsel | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/fresvik-kjolerom-til-fruktbonde | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/fryse-og-kjlerom-til-sogn-frukt-og-grnt | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/gladhistorie-fresvik-kjole-fryserom | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/innfesting-mot-golv | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/john-bothun-blir-pensjonist | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/jul-2020 | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/ledig-stilling-som-produksjonsmedarbeidar | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/montasje-prosjekt | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/ny-teknisk-teiknar-havard-berdal | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/nye-monteringsanvisningar | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/orklafoods-stranda | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/portproduksjon | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/samaneh-shakeri-ny-teknisk-sjef | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/skjererom | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/stor-leveranse-til-buskerud-storcash | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /aktuelt/to-ledige-stillingar-i-haust | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/tomas-kruvellis-vaar-nye-mann | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /aktuelt/vi-er-blitt-sertifisert-miljofyrtarn | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /dokumentasjon | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /monteringsanvisning | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /produkt | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /produkt/fasadepanel | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /produkt/fresvik-pir-panel | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /produkt/frysetunnel | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /produkt/kjole-frysedorer | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /produkt/kjole-fryseportar | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /referansar/2014/7/8/coop-extra-sogndal | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/2014/7/8/interfrukt-vrt-strste-prosjekt | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/bjerke-spekemat | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/bjerkreim-legekontor-vikesaa | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/bunnpris-hammerfest | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/buskerud-storcash | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/celsa-steel-sotra | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/fiskehallen | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/fryse-og-kjolerom-kiwi-otta | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/fryserom-baza-fredrikstad | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/fryserom-coop-obs-alnabru | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/fryserom-fryseport-rentokil | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/fryserom-med-fryseport-til-coop-extra-naustdal | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/fryseromsportar-til-rema-1000-i-narvik | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/historisk-leveranse-pir-panel-spar-lund-torv | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/karlsoybruket | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/kjolerom-kjoledor-bunnpris-volda | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/nye-leveransar-til-rema-1000-ya-i-larvik | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/omfattande-leveranse-til-bakehuset-trondheim | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/restauranthuset-malin | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/spesialloysing-torkerom-drageboden-kaupanger | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /referansar/vik-helse-og-omsorgssenter | partial | Local content appears shorter than a full old detail page and/or not all sitemap images are represented. |
| route | /tenester/leveranse | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /tenester/montasje | needs-review | Contains TODO/verification markers or unresolved migration text. |
| route | /tenester/service-reservedeler | needs-review | Contains TODO/verification markers or unresolved migration text. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1eebf1d8-e081-49b6-b35d-51ca6400c18c/Agnar+i+Truck-resized.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228723604-E7710XDI3PJENLQGF6M5/P1011308.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228725039-5ORZ1B872SJ3WA6PT58G/P1011304.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228726844-Z25NTILFGAGC706B0A2L/P1011301.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228728430-V5ILE0UJOLHUPYHC4P8D/P1011303.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228729943-6MM69ZZK0984XFA2N9B7/P1011299.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428971823-YEHNKJ0MQMYS6AVGRWHZ/Port+Karls%C3%B8ybruket+2017.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/c9b5403a-bfc1-4fde-9c6b-c448d7c8e9e0/Flag_of_Norway_with_proportions.svg.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/de58b233-c5b5-4348-8494-72c6df72a6dd/Blue+3D+Cube+Icon+Logo+Template+Square+-+Made+with+PosterMyWall+%285%29.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/2f0fa235-c925-4a25-954e-eddda22388b1/aaa.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/13922f08-1a26-4996-98ca-874c87c1d3cb/flake.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/c8dc8a03-e4f0-4407-bbdd-7844fac31bdc/Fresvik%2Bskyveport.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/67e1460b-fd80-4be3-98d1-1fa26118af4c/FP+Produkt+23.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1c0b8495-5976-420a-b7a9-eb2f88e17b74/image-asset+%281%29.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/b806d454-5edc-4d8a-a9d1-67dfb6b34618/1715599204491.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/5736240f-7b74-4bca-a556-1c4cf313614e/image-asset+%282%29.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/6d63789a-8276-4fa7-ac6e-3767cc054fae/1733820776326.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/5fc55087-b42c-48d7-9587-0811aa56c942/Fresvik+Produkt+-+Fabrikk-27.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/339870db-e604-492a-a688-fbc917a03d26/notfjaer1.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/3ab6632b-c2d4-46ea-9f59-3674e266916e/image-asset+%284%29.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/ce3eb664-c398-48ec-bcab-3acefac67026/aaa.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/95302e49-96ee-4a63-b4b8-71c8b5fde81d/file.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/274b289f-83c3-4317-9b12-479b670803da/video-file.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/95302e49-96ee-4a63-b4b8-71c8b5fde81d/file.png | thumbnail-or-variant | Looks like a duplicate thumbnail/variant, but no confident local match. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/95302e49-96ee-4a63-b4b8-71c8b5fde81d/file.png | thumbnail-or-variant | Looks like a duplicate thumbnail/variant, but no confident local match. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/95302e49-96ee-4a63-b4b8-71c8b5fde81d/file.png | thumbnail-or-variant | Looks like a duplicate thumbnail/variant, but no confident local match. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/5a6e06c4-282a-434c-8ba5-3d15e713ab30/Fasadepanel+Nortura+Herland.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/edb3073f-4d52-4f2b-bcc8-eccccb3d364b/Fryserom.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/34a43d9f-90b0-4bd3-af63-a116052ad983/Port.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/ad4e5e8c-1d47-4b54-aef7-ed7c423a5755/Kj%C3%B8lerom.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/17f574d6-7d71-483d-ba5b-14108ce48d91/Elektrisk+port.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/33cd3f9d-cf72-4271-8f61-52108209b9b9/D%C3%B8r.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/13922f08-1a26-4996-98ca-874c87c1d3cb/flake.png | thumbnail-or-variant | Looks like a duplicate thumbnail/variant, but no confident local match. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/01c192a0-dbab-49e5-b8fd-629244295ab4/prod8.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/45de53c6-9a74-44c2-9a4d-c8e9563832aa/Fresvik+fra%CC%8A+BJ%C3%98NNSTIGEN+2017+SS.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1698216874163-KLN7EVX53DHNZV3JNUXG/Fresvik+Toppledere+sogn.no.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/61ebde5c-0774-4dc1-92c8-4ed21efb4114/Gyda+B%C3%B8thun.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d1e8ab46-e86a-4e94-a140-75a4bf64054d/aaa.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/13922f08-1a26-4996-98ca-874c87c1d3cb/flake.png | thumbnail-or-variant | Looks like a duplicate thumbnail/variant, but no confident local match. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/5aab7eed-051d-445b-b821-a6d81571f361/Fresvik%2Baks%2Bmontering2.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/b405b8f4-c0fa-4090-a6a3-3af3f5ded4e7/fresvik-fryse-dor_ny.jpg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/2d39e8b6-054d-4780-a231-bac837ea8926/Ha%CC%8Andtak+Fresvik.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/6f232bd4-29d6-45a0-b5d4-2b61dfc92fb8/Pakning+til+kj%C3%B8le-+og+frysed%C3%B8r.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/eb9ae19e-edcf-41a9-be74-461e6e203327/Fresvik+Hengsle.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/f93d7dc8-0b74-49f8-bc45-1cb5054f1490/Snitt+gjennom+pakning.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/33c761f4-41ab-48f2-8ef1-4711d3827183/Slepelist+til+kj%C3%B8le-+og+frysed%C3%B8r.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/13922f08-1a26-4996-98ca-874c87c1d3cb/flake.png | thumbnail-or-variant | Looks like a duplicate thumbnail/variant, but no confident local match. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/b806d454-5edc-4d8a-a9d1-67dfb6b34618/1715599204491.jpg | thumbnail-or-variant | Looks like a duplicate thumbnail/variant, but no confident local match. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/5736240f-7b74-4bca-a556-1c4cf313614e/image-asset+%282%29.jpeg | thumbnail-or-variant | Looks like a duplicate thumbnail/variant, but no confident local match. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/6d63789a-8276-4fa7-ac6e-3767cc054fae/1733820776326.jpg | thumbnail-or-variant | Looks like a duplicate thumbnail/variant, but no confident local match. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/97325d4f-52eb-4793-b596-69bbe7d3070e/alarm.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/f152d606-3742-407e-99fc-8e412f82cab6/Skjermbilde+2026-02-27+110131.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/bb85c1ec-830f-451e-afb1-a7d1eef82bd9/valve.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/08771da3-ee6f-416a-9369-ff384ef62aba/fermod.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/3e67dc93-31ab-4ea9-9e88-2277be7198bb/sika.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/33b9b91b-e0d9-4d5f-b1e3-72e6932ea2f6/soudal.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/e4cbf21e-a956-4d47-9fb5-3a7a2924b91e/soudal+II.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/01d5327d-ae87-45d4-9431-4787da924aa4/sika+II.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/c1a5b7bc-5c62-421d-931a-65dcb0cc86fd/glassplate.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/4a4c209a-5fec-496f-80da-a49a9d68e75b/Skjermbilde+2026-02-27+114255.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/90003639-b348-4c7a-a713-286ffa59c3e3/IK.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d7b7a341-353c-4260-afe7-8858187c72fd/Fryst+Laks.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/d04658e0-dce8-4c18-ba78-e00e6440b419/b12b5d19-2424-48de-bdea-c83b503c880c+%281%29.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/339870db-e604-492a-a688-fbc917a03d26/notfjaer1.jpg | thumbnail-or-variant | Looks like a duplicate thumbnail/variant, but no confident local match. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/e0a96aed-bc93-4a20-95d0-cd042af1bb3b/Fresvik+Hengsle.jpeg | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/70099be8-6751-41f7-aea3-d4501ff3c09a/Spar+Lund+Torv+FP+1.png | missing | No confident local asset match found. |
| image | https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1771241168352-9XAEM8D0U1DJA7JIBNLP/Baza+fryserom+-+4.jpeg | thumbnail-or-variant | Looks like a duplicate thumbnail/variant, but no confident local match. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| image | TODO: unknown original URL | local-only | Local image is used by migrated data, but no exact sitemap originalUrl was recovered. |
| internal-link | /kjolerom-fryserom | broken | No page or redirect found for this internal link. |
| internal-link | /jobbmodell | broken | No page or redirect found for this internal link. |

## Final TODO list

- route: /aktuelt [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /aktuelt/40-aars-jubileum [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/agnar-er-snart-pensjonistnbsp [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/arne-olav-ny-salskonsulent [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/ein-investering-for-henga-med-i-tidanbsp [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/fasade-element-og-takplater-ruukki [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/fasadeprosjekt-for-celsa-steel-service-sotra [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/fresvik-hengsel [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/fresvik-kjolerom-til-fruktbonde [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/fryse-og-kjlerom-til-sogn-frukt-og-grnt [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/gladhistorie-fresvik-kjole-fryserom [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/innfesting-mot-golv [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/john-bothun-blir-pensjonist [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/jul-2020 [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/ledig-stilling-som-produksjonsmedarbeidar [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/montasje-prosjekt [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/ny-teknisk-teiknar-havard-berdal [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/nye-monteringsanvisningar [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/orklafoods-stranda [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/portproduksjon [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/samaneh-shakeri-ny-teknisk-sjef [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/skjererom [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/stor-leveranse-til-buskerud-storcash [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /aktuelt/to-ledige-stillingar-i-haust [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/tomas-kruvellis-vaar-nye-mann [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /aktuelt/vi-er-blitt-sertifisert-miljofyrtarn [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /dokumentasjon [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /monteringsanvisning [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /produkt [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /produkt/fasadepanel [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /produkt/fresvik-pir-panel [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /produkt/frysetunnel [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /produkt/kjole-frysedorer [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /produkt/kjole-fryseportar [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /referansar/2014/7/8/coop-extra-sogndal [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/2014/7/8/interfrukt-vrt-strste-prosjekt [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/bjerke-spekemat [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/bjerkreim-legekontor-vikesaa [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/bunnpris-hammerfest [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/buskerud-storcash [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/celsa-steel-sotra [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/fiskehallen [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/fryse-og-kjolerom-kiwi-otta [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/fryserom-baza-fredrikstad [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/fryserom-coop-obs-alnabru [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/fryserom-fryseport-rentokil [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/fryserom-med-fryseport-til-coop-extra-naustdal [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/fryseromsportar-til-rema-1000-i-narvik [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/historisk-leveranse-pir-panel-spar-lund-torv [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/karlsoybruket [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/kjolerom-kjoledor-bunnpris-volda [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/nye-leveransar-til-rema-1000-ya-i-larvik [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/omfattande-leveranse-til-bakehuset-trondheim [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/restauranthuset-malin [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/spesialloysing-torkerom-drageboden-kaupanger [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /referansar/vik-helse-og-omsorgssenter [partial] - Local content appears shorter than a full old detail page and/or not all sitemap images are represented.
- route: /tenester/leveranse [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /tenester/montasje [needs-review] - Contains TODO/verification markers or unresolved migration text.
- route: /tenester/service-reservedeler [needs-review] - Contains TODO/verification markers or unresolved migration text.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1eebf1d8-e081-49b6-b35d-51ca6400c18c/Agnar+i+Truck-resized.jpeg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228723604-E7710XDI3PJENLQGF6M5/P1011308.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228725039-5ORZ1B872SJ3WA6PT58G/P1011304.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228726844-Z25NTILFGAGC706B0A2L/P1011301.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228728430-V5ILE0UJOLHUPYHC4P8D/P1011303.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1693228729943-6MM69ZZK0984XFA2N9B7/P1011299.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1694428971823-YEHNKJ0MQMYS6AVGRWHZ/Port+Karls%C3%B8ybruket+2017.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/c9b5403a-bfc1-4fde-9c6b-c448d7c8e9e0/Flag_of_Norway_with_proportions.svg.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/de58b233-c5b5-4348-8494-72c6df72a6dd/Blue+3D+Cube+Icon+Logo+Template+Square+-+Made+with+PosterMyWall+%285%29.png [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/2f0fa235-c925-4a25-954e-eddda22388b1/aaa.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/13922f08-1a26-4996-98ca-874c87c1d3cb/flake.png [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/c8dc8a03-e4f0-4407-bbdd-7844fac31bdc/Fresvik%2Bskyveport.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/67e1460b-fd80-4be3-98d1-1fa26118af4c/FP+Produkt+23.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1c0b8495-5976-420a-b7a9-eb2f88e17b74/image-asset+%281%29.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/b806d454-5edc-4d8a-a9d1-67dfb6b34618/1715599204491.jpg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/5736240f-7b74-4bca-a556-1c4cf313614e/image-asset+%282%29.jpeg [missing] - No confident local asset match found.
- image: https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/6d63789a-8276-4fa7-ac6e-3767cc054fae/1733820776326.jpg [missing] - No confident local asset match found.
