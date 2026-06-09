# Migration Audit

Generated: 2026-06-09T06:18:25.381Z

## Summary

| Metric | Count |
| --- | ---: |
| Local baseline old URL count | 105 |
| Live sitemap URL count | 104 |
| Local baseline old image count | 325 |
| Live sitemap image entries | 322 |
| Live sitemap unique image URLs | 275 |
| Migrated page count | 71 |
| Redirect count | 29 |
| Partial count | 0 |
| Missing count | 0 |
| Needs-review count | 0 |
| Unrecoverable documented | 6 |
| Inventory-only count | 0 |
| Local image assets | 259 |
| Local document/PDF assets | 26 |
| Asset originalUrls recovered in manifest | 275 |

Do not treat the migration as complete while any route, asset, document or link remains `partial`, `missing`, `needs-review`, `inventory-only`, `thumbnail-or-variant` or `local-only`.

The root homepage `https://www.fresvik.no/` is audited as its own route even though the live sitemap exposes the same homepage inventory as `/startside`. Detailed homepage section coverage is written to `HOMEPAGE_MIGRATION_AUDIT.md`.

## Homepage strict audit

| section | existsOnOld | existsOnNew | exactTextMigrated | imagesMigrated | linksMigrated | status | notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| hero | yes | yes | yes | yes | yes | migrated | Required old homepage section content is present in local migration data. |
| PIR-panel promo block | yes | yes | yes | yes | yes | migrated | Required old homepage section content is present in local migration data. |
| Fresvik-panel benefits | yes | yes | yes | yes | yes | migrated | Required old homepage section content is present in local migration data. |
| product teaser links | yes | yes | yes | yes | yes | migrated | Required old homepage section content is present in local migration data. |
| Våre kundar | yes | yes | yes | yes | yes | migrated | Required old homepage section content is present in local migration data. |
| Aktuelt | yes | yes | yes | yes | yes | migrated | Required old homepage section content is present in local migration data. |
| job CTA | yes | yes | yes | yes | yes | migrated | Required old homepage section content is present in local migration data. |
| contact section | yes | yes | yes | yes | yes | migrated | Required old homepage section content is present in local migration data. |
| sales departments | yes | yes | yes | yes | yes | migrated | Required old homepage section content is present in local migration data. |
| newsletter | yes | yes | yes | yes | yes | migrated | Required old homepage section content is present in local migration data. |
| footer links | yes | yes | yes | yes | yes | migrated | Required old homepage section content is present in local migration data. |

## Old sitemap coverage

The project baseline in `src/data/legacyRoutes.ts` records 105 URLs and 325 image entries checked earlier. The live donor sitemap currently returns 104 URLs and 322 image entries (275 unique image URLs). The difference must be treated as source drift until manually reviewed.

## Route coverage

| oldPath | newRoute | status | type | title | intro | body | images | docs | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / | / | page | page | yes | yes | yes | 20/13 | yes | Covered as migrated page in local data. |
| /aktuelt | /aktuelt | page | news | yes | yes | yes | 19/0 | no | Covered as migrated page in local data. |
| /aktuelt/40-aars-jubileum | /aktuelt/40-aars-jubileum | page | news | yes | yes | yes | 4/4 | yes | Covered as migrated page in local data. |
| /aktuelt/agnar-er-snart-pensjonistnbsp | /aktuelt/agnar-er-snart-pensjonistnbsp | page | news | yes | yes | yes | 2/2 | yes | Covered as migrated page in local data. |
| /aktuelt/arne-olav-ny-salskonsulent | /aktuelt/arne-olav-ny-salskonsulent | page | news | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /aktuelt/ein-investering-for-henga-med-i-tidanbsp | /aktuelt/ein-investering-for-henga-med-i-tidanbsp | page | news | yes | yes | yes | 3/3 | yes | Covered as migrated page in local data. |
| /aktuelt/fasade-element-og-takplater-ruukki | /aktuelt/fasade-element-og-takplater-ruukki | page | news | yes | yes | yes | 6/6 | yes | Covered as migrated page in local data. |
| /aktuelt/fasadeprosjekt-for-celsa-steel-service-sotra | /aktuelt/fasadeprosjekt-for-celsa-steel-service-sotra | unrecoverable | news | yes | yes | yes | 0/0 | no | Documented external blocker: live old-site body is empty/unusable, no usable Wayback snapshot was found, and checked external hints did not recover full body. |
| /aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv | /aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv | unrecoverable | news | yes | yes | yes | 0/0 | no | Documented external blocker: live old-site body is empty/unusable, no usable Wayback snapshot was found, and checked external hints did not recover full body. |
| /aktuelt/fresvik-hengsel | /aktuelt/fresvik-hengsel | page | news | yes | yes | yes | 0/0 | yes | Covered as migrated page in local data. |
| /aktuelt/fresvik-kjolerom-til-fruktbonde | /aktuelt/fresvik-kjolerom-til-fruktbonde | page | news | yes | yes | yes | 4/4 | yes | Covered as migrated page in local data. |
| /aktuelt/fryse-og-kjlerom-til-sogn-frukt-og-grnt | /aktuelt/fryse-og-kjlerom-til-sogn-frukt-og-grnt | unrecoverable | news | yes | yes | yes | 0/0 | no | Documented external blocker: live old-site body is empty/unusable, no usable Wayback snapshot was found, and checked external hints did not recover full body. |
| /aktuelt/gladhistorie-fresvik-kjole-fryserom | /aktuelt/gladhistorie-fresvik-kjole-fryserom | page | news | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /aktuelt/innfesting-mot-golv | /aktuelt/innfesting-mot-golv | page | news | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /aktuelt/john-bothun-blir-pensjonist | /aktuelt/john-bothun-blir-pensjonist | page | news | yes | yes | yes | 2/2 | yes | Covered as migrated page in local data. |
| /aktuelt/jul-2020 | /aktuelt/jul-2020 | page | news | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /aktuelt/ledig-stilling-som-produksjonsmedarbeidar | /aktuelt/ledig-stilling-som-produksjonsmedarbeidar | unrecoverable | news | yes | yes | yes | 0/0 | no | Documented external blocker: live old-site body is empty/unusable, no usable Wayback snapshot was found, and checked external hints did not recover full body. |
| /aktuelt/montasje-prosjekt | /aktuelt/montasje-prosjekt | page | news | yes | yes | yes | 10/10 | yes | Covered as migrated page in local data. |
| /aktuelt/ny-teknisk-teiknar-havard-berdal | /aktuelt/ny-teknisk-teiknar-havard-berdal | page | news | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /aktuelt/nye-monteringsanvisningar | /aktuelt/nye-monteringsanvisningar | page | news | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /aktuelt/orklafoods-stranda | /aktuelt/orklafoods-stranda | page | news | yes | yes | yes | 9/9 | yes | Covered as migrated page in local data. |
| /aktuelt/portproduksjon | /aktuelt/portproduksjon | page | news | yes | yes | yes | 2/2 | yes | Covered as migrated page in local data. |
| /aktuelt/samaneh-shakeri-ny-teknisk-sjef | /aktuelt/samaneh-shakeri-ny-teknisk-sjef | page | news | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /aktuelt/skjererom | /aktuelt/skjererom | page | news | yes | yes | yes | 6/6 | yes | Covered as migrated page in local data. |
| /aktuelt/stor-leveranse-til-buskerud-storcash | /aktuelt/stor-leveranse-til-buskerud-storcash | unrecoverable | news | yes | yes | yes | 0/0 | no | Documented external blocker: live old-site body is empty/unusable, no usable Wayback snapshot was found, and checked external hints did not recover full body. |
| /aktuelt/to-ledige-stillingar-i-haust | /aktuelt/to-ledige-stillingar-i-haust | unrecoverable | news | yes | yes | yes | 0/0 | no | Documented external blocker: live old-site body is empty/unusable, no usable Wayback snapshot was found, and checked external hints did not recover full body. |
| /aktuelt/tomas-kruvellis-vaar-nye-mann | /aktuelt/tomas-kruvellis-vaar-nye-mann | page | news | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /aktuelt/vi-er-blitt-sertifisert-miljofyrtarn | /aktuelt/vi-er-blitt-sertifisert-miljofyrtarn | page | news | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /andre-produkter | /tilleggsutstyr | redirect | product | yes | yes | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/2014/7/9/industri-slagdor | /tilleggsutstyr | redirect | product | yes | yes | no | 1/1 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/2014/7/9/skipsdrer | /tilleggsutstyr | redirect | product | yes | yes | no | 1/1 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/2014/7/9/standard-drer | /tilleggsutstyr | redirect | product | yes | yes | no | 1/1 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/beslag | /tilleggsutstyr | redirect | product | yes | yes | no | 1/6 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/Andre+produkt | /tilleggsutstyr | redirect | product | yes | yes | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/Dør | /tilleggsutstyr | redirect | product | yes | yes | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/dører | /tilleggsutstyr | redirect | product | yes | yes | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/Fasadepanel | /tilleggsutstyr | redirect | product | yes | yes | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/Port | /tilleggsutstyr | redirect | product | yes | yes | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/category/Tilleggsutstyr+kjølerom | /tilleggsutstyr | redirect | product | yes | yes | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/diktator-dortiltrekker | /tilleggsutstyr | redirect | product | yes | yes | no | 1/1 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/elebar-ventil | /tilleggsutstyr | redirect | product | yes | yes | no | 1/2 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/kjlerampe | /tilleggsutstyr | redirect | product | yes | yes | no | 1/3 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/maxielebar-ventil | /tilleggsutstyr | redirect | product | yes | yes | no | 1/2 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/pego-innestengningsalarm | /tilleggsutstyr | redirect | product | yes | yes | no | 1/2 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/pvc-gardiner | /tilleggsutstyr | redirect | product | yes | yes | no | 1/2 | no | Redirects to /tilleggsutstyr. |
| /andre-produkter/standard-handtak | /tilleggsutstyr | redirect | product | yes | yes | no | 1/1 | no | Redirects to /tilleggsutstyr. |
| /dokumentasjon | /dokumentasjon | page | document | yes | yes | yes | 5/1 | yes | Covered as migrated page in local data. |
| /firmainfo | /firmainfo | page | page | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /kjolerom-fryserom-butikk | /kjolerom-fryserom-butikk | page | support | yes | yes | yes | 2/2 | yes | Covered as migrated page in local data. |
| /kjolerom-fryserom-offshore | /kjolerom-fryserom-offshore | page | support | yes | yes | yes | 17/18 | yes | Covered as migrated page in local data. |
| /kjolerom-fryserom-offshore-1 | /kjolerom-fryserom-offshore | redirect | support | yes | yes | no | 0/0 | no | Present in local legacyRoutes baseline but not present in current live sitemap. |
| /kjolerom-fryserom-storkjokken | /kjolerom-fryserom-storkjokken | page | support | yes | yes | yes | 3/3 | yes | Covered as migrated page in local data. |
| /kontakt | /kontakt | page | page | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /kundeservice/faq | /kundeservice/faq | page | support | yes | yes | yes | 5/5 | yes | Covered as migrated page in local data. |
| /monteringsanvisning | /monteringsanvisning | page | document | yes | yes | yes | 6/6 | yes | Covered as migrated page in local data. |
| /monteringsanvisningar-fresvik-skyveport | /monteringsanvisningar-fresvik-skyveport | page | document | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /personvernerklering | /personvernerklering | page | legal | yes | yes | yes | 0/0 | yes | Covered as migrated page in local data. |
| /produkt | /produkt | page | product | yes | yes | yes | 11/6 | yes | Covered as migrated page in local data. |
| /produkt/fasadepanel | /produkt/fasadepanel | page | product | yes | yes | yes | 3/3 | yes | Covered as migrated page in local data. |
| /produkt/fresvik-panel | /produkt/fresvik-pur-panel | redirect | product | yes | yes | no | 1/6 | no | Redirects to /produkt/fresvik-pur-panel. |
| /produkt/fresvik-pir-panel | /produkt/fresvik-pir-panel | page | product | yes | yes | yes | 6/7 | yes | Covered as migrated page in local data. |
| /produkt/frysetunnel | /produkt/frysetunnel | page | product | yes | yes | yes | 9/8 | yes | Covered as migrated page in local data. |
| /produkt/kjole-frysedorer | /produkt/kjole-frysedorer | page | product | yes | yes | yes | 2/2 | yes | Covered as migrated page in local data. |
| /produkt/kjole-fryseportar | /produkt/kjole-fryseportar | page | product | yes | yes | yes | 6/8 | yes | Covered as migrated page in local data. |
| /produktfoto | /produkt | redirect | product | yes | yes | no | 0/6 | no | Redirects to /produkt. |
| /referansar | /referansar | page | reference | yes | yes | yes | 25/0 | yes | Covered as migrated page in local data. |
| /referansar/2014/7/8/coop-extra-sogndal | /referansar/2014/7/8/coop-extra-sogndal | page | reference | yes | yes | yes | 4/3 | yes | Covered as migrated page in local data. |
| /referansar/2014/7/8/interfrukt-vrt-strste-prosjekt | /referansar/2014/7/8/interfrukt-vrt-strste-prosjekt | page | reference | yes | yes | yes | 4/4 | yes | Covered as migrated page in local data. |
| /referansar/bjerke-spekemat | /referansar/bjerke-spekemat | page | reference | yes | yes | yes | 4/4 | yes | Covered as migrated page in local data. |
| /referansar/bjerkreim-legekontor-vikesaa | /referansar/bjerkreim-legekontor-vikesaa | page | reference | yes | yes | yes | 5/5 | yes | Covered as migrated page in local data. |
| /referansar/bunnpris-hammerfest | /referansar/bunnpris-hammerfest | page | reference | yes | yes | yes | 3/3 | yes | Covered as migrated page in local data. |
| /referansar/buskerud-storcash | /referansar/buskerud-storcash | page | reference | yes | yes | yes | 5/5 | yes | Covered as migrated page in local data. |
| /referansar/category/Fasadepanel | /referansar | redirect | reference | yes | yes | no | 0/0 | no | Redirects to /referansar. |
| /referansar/category/Framside-referansar | /referansar | redirect | reference | yes | yes | no | 0/0 | no | Redirects to /referansar. |
| /referansar/category/Kjøle-+fryserom+butikk | /referansar | redirect | reference | yes | yes | no | 0/0 | no | Redirects to /referansar. |
| /referansar/category/Storkjøkken-restaurant | /referansar | redirect | reference | yes | yes | no | 0/0 | no | Redirects to /referansar. |
| /referansar/celsa-steel-sotra | /referansar/celsa-steel-sotra | page | reference | yes | yes | yes | 4/4 | yes | Covered as migrated page in local data. |
| /referansar/fiskehallen | /referansar/fiskehallen | page | reference | yes | yes | yes | 3/3 | yes | Covered as migrated page in local data. |
| /referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar | /referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar | page | reference | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /referansar/fryse-og-kjolerom-kiwi-otta | /referansar/fryse-og-kjolerom-kiwi-otta | page | reference | yes | yes | yes | 7/7 | yes | Covered as migrated page in local data. |
| /referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront | /referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront | page | reference | yes | yes | yes | 4/4 | yes | Covered as migrated page in local data. |
| /referansar/fryserom-baza-fredrikstad | /referansar/fryserom-baza-fredrikstad | page | reference | yes | yes | yes | 4/4 | yes | Covered as migrated page in local data. |
| /referansar/fryserom-coop-obs-alnabru | /referansar/fryserom-coop-obs-alnabru | page | reference | yes | yes | yes | 3/3 | yes | Covered as migrated page in local data. |
| /referansar/fryserom-fryseport-rentokil | /referansar/fryserom-fryseport-rentokil | page | reference | yes | yes | yes | 9/9 | yes | Covered as migrated page in local data. |
| /referansar/fryserom-med-fryseport-til-coop-extra-naustdal | /referansar/fryserom-med-fryseport-til-coop-extra-naustdal | page | reference | yes | yes | yes | 4/4 | yes | Covered as migrated page in local data. |
| /referansar/fryseromsportar-til-rema-1000-i-narvik | /referansar/fryseromsportar-til-rema-1000-i-narvik | page | reference | yes | yes | yes | 5/5 | yes | Covered as migrated page in local data. |
| /referansar/historisk-leveranse-pir-panel-spar-lund-torv | /referansar/historisk-leveranse-pir-panel-spar-lund-torv | page | reference | yes | yes | yes | 6/6 | yes | Covered as migrated page in local data. |
| /referansar/karlsoybruket | /referansar/karlsoybruket | page | reference | yes | yes | yes | 3/3 | yes | Covered as migrated page in local data. |
| /referansar/kjolerom-kjoledor-bunnpris-volda | /referansar/kjolerom-kjoledor-bunnpris-volda | page | reference | yes | yes | yes | 3/3 | yes | Covered as migrated page in local data. |
| /referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark | /referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark | page | reference | yes | yes | yes | 2/2 | yes | Covered as migrated page in local data. |
| /referansar/nye-leveransar-til-rema-1000-ya-i-larvik | /referansar/nye-leveransar-til-rema-1000-ya-i-larvik | page | reference | yes | yes | yes | 3/3 | yes | Covered as migrated page in local data. |
| /referansar/omfattande-leveranse-til-bakehuset-trondheim | /referansar/omfattande-leveranse-til-bakehuset-trondheim | page | reference | yes | yes | yes | 4/4 | yes | Covered as migrated page in local data. |
| /referansar/restauranthuset-malin | /referansar/restauranthuset-malin | page | reference | yes | yes | yes | 5/5 | yes | Covered as migrated page in local data. |
| /referansar/spesialloysing-torkerom-drageboden-kaupanger | /referansar/spesialloysing-torkerom-drageboden-kaupanger | page | reference | yes | yes | yes | 9/9 | yes | Covered as migrated page in local data. |
| /referansar/vik-helse-og-omsorgssenter | /referansar/vik-helse-og-omsorgssenter | page | reference | yes | yes | yes | 5/5 | yes | Covered as migrated page in local data. |
| /send-foresporsel | /kontakt | redirect | unknown | yes | yes | no | 0/0 | no | Redirects to /kontakt. |
| /startside | / | redirect | unknown | yes | yes | no | 0/13 | no | Redirects to /. |
| /stillingledig | /stillingledig | page | page | yes | yes | yes | 4/4 | yes | Covered as migrated page in local data. |
| /store | /tilleggsutstyr | redirect | product | yes | yes | no | 0/0 | no | Redirects to /tilleggsutstyr. |
| /store/p/dr-tiltrekker-diktator | /tilleggsutstyr | redirect | product | yes | yes | no | 0/1 | no | Redirects to /tilleggsutstyr. |
| /tenester/leveranse | /tenester/leveranse | page | service | yes | yes | yes | 2/2 | yes | Covered as migrated page in local data. |
| /tenester/montasje | /tenester/montasje | page | service | yes | yes | yes | 2/2 | yes | Covered as migrated page in local data. |
| /tenester/service-reservedeler | /tenester/service-reservedeler | page | service | yes | yes | yes | 1/1 | yes | Covered as migrated page in local data. |
| /tilleggsutstyr | /tilleggsutstyr | page | unknown | yes | yes | yes | 23/12 | yes | Covered as migrated page in local data. |
| /tilsette | /tilsette | page | employee | yes | yes | yes | 14/14 | no | Covered as migrated page in local data. |
| /transportskade | /transportskade | page | support | yes | yes | yes | 2/2 | yes | Covered as migrated page in local data. |

## Content completeness

- News pages: 27
- Reference pages: 30
- Product pages/routes: 28
- Service pages/routes: 3
- Legal/support/company pages/routes: 15

Any old news/reference detail with only a short migrated summary is marked `partial` or `needs-review`.

## Asset coverage

| Metric | Count |
| --- | ---: |
| Live sitemap image entries | 322 |
| Live sitemap unique image URLs | 275 |
| Local migrated image assets | 259 |
| Sitemap images classified migrated | 269 |
| Sitemap duplicate image entries | 47 |
| Sitemap thumbnail/variant unresolved | 0 |
| Sitemap images missing local match | 0 |
| Local-only images without recovered originalUrl | 0 |

## PDF/document coverage

| localPath | title | status | routeAvailable | fileSize | oldUrl | notes |
| --- | --- | --- | --- | --- | --- | --- |
| /assets/fresvik/documents/endre-skyveretning.pdf | Endre skyveretning | migrated | yes | 174280 | https://www.fresvik.no/s/Endre-Skyveretning.pdf | Recovered likely old URL with confidence 1.00. |
| /assets/fresvik/documents/fp-pir-paneler-montasjeanvisning-nov-2025.pdf | Dokument | migrated | yes | 1031884 | https://www.fresvik.no/s/FP-PIR-Paneler_Montasjeanvisning-nov-2025.pdf | Recovered likely old URL with confidence 1.00. |
| /assets/fresvik/documents/fresvik-dor-montasjeanvisning.pdf | Dør | migrated | yes | 4217580 | https://www.fresvik.no/s/Fresvik-Fryserom-Montasjeanvisning.pdf | Recovered likely old URL with confidence 0.67. |
| /assets/fresvik/documents/fresvik-fryserom-montasjeanvisning.pdf | Fryserom, Norsk/English | migrated | yes | 1929048 | https://www.fresvik.no/s/Fresvik-Fryserom-Montasjeanvisning.pdf | Recovered likely old URL with confidence 1.00. |
| /assets/fresvik/documents/fresvik-kjolerom-montasjeanvisning.pdf | Kjølerom, Norsk/English | migrated | yes | 1596484 | https://www.fresvik.no/s/Fresvik-Fryserom-Montasjeanvisning.pdf | Recovered likely old URL with confidence 0.67. |
| /assets/fresvik/documents/fresvik-port-montasjeanvisning.pdf | Monteringsanvisning manuell port | migrated | yes | 6789859 | https://www.fresvik.no/s/Fresvik-Port-Montasjeanvisning.pdf | Recovered likely old URL with confidence 1.00. |
| /assets/fresvik/documents/koblingsskjema-fermod-5010.pdf | Koblingskjema Fermod 5010 | migrated | yes | 2166231 | https://www.fresvik.no/s/Koblingsskjema-Fermod-5010.pdf | Recovered likely old URL with confidence 1.00. |
| /assets/fresvik/documents/leveringsvilkar-fresvik-produkt-2023.pdf | Leveringsbetingelser | migrated | yes | 350922 | https://www.fresvik.no/s/Leveringsvilkar-Fresvik-Produkt_rev2023.pdf | Recovered likely old URL with confidence 0.75. |
| /assets/fresvik/documents/miljodokument-fresvik-produkt.pdf | Miljødokument | migrated | yes | 38764 | https://www.fresvik.no/s/Miljdokument-Fresvik-Produkt.pdf | Recovered likely old URL with confidence 0.67. |
| /assets/fresvik/documents/montasjeanvisning-5010-for-2150.pdf | Montasjeanvisning 5010 for 2150 | migrated | yes | 3418684 | https://www.fresvik.no/s/Montasjeanvisning-5010-for-2150.pdf | Recovered likely old URL with confidence 1.00. |
| /assets/fresvik/documents/montasjeanvisning-5010-for-3530-og-7530.pdf | Montasjeanvisning 5010 for 3530 og 7530 | migrated | yes | 3531249 | https://www.fresvik.no/s/Montasjeanvisning-5010-for-3530-og-7530.pdf | Recovered likely old URL with confidence 1.00. |
| /assets/fresvik/documents/openheitslova-aktsemdvurderingar-2024.pdf | Aktsemdvurdering 2024 | migrated | yes | 201642 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/openheitslova-rutine-plikter.pdf | Rutine for oppfylling av plikter etter Openheitslova | migrated | yes | 276631 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/openheitslova-utgreiing-2024-signert.pdf | Utgreiing 2024 | migrated | yes | 268546 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/pir-panel-montasjeanvisning.pdf | PIR-Paneler montasjeanvisning | migrated | yes | 1031884 | https://www.fresvik.no/s/Fresvik-Fryserom-Montasjeanvisning.pdf | Recovered likely old URL with confidence 0.40. |
| /assets/fresvik/documents/pir-panel.pdf | PIR-Paneler produktblad | migrated | yes | 302439 | https://www.fresvik.no/s/PIR.pdf | Recovered likely old URL with confidence 0.50. |
| /assets/fresvik/documents/produktblad-fresvik-skyveport.pdf | Produktblad Fresvik Skyveport | migrated | yes | 1648458 | https://www.fresvik.no/s/Produktblad-Fresvik-Skyveport.pdf | Recovered likely old URL with confidence 1.00. |
| /assets/fresvik/documents/pur-ce-merke.pdf | Dokument | migrated | yes | 150364 | https://www.fresvik.no/s/PUR-ce-merke.pdf | Recovered likely old URL with confidence 1.00. |
| /assets/fresvik/documents/quick-start-5010exp.pdf | Quick Start 5010Exp | migrated | yes | 1001335 | https://www.fresvik.no/s/Quick-Start-5010Exp-indB.pdf | Recovered likely old URL with confidence 0.75. |
| /assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf | Dokument | migrated | yes | 58526 | https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf | Recovered likely old URL with confidence 1.00. |
| /assets/fresvik/documents/sintef-produktsertifikat-7060s.pdf | Dokument | migrated | yes | 253758 | https://www.fresvik.no/s/7060s-fnfz.pdf | Recovered likely old URL with confidence 0.33. |
| /assets/fresvik/documents/sintef-produktsertifikat.pdf | Teknisk godkjenning | migrated | yes | 439904 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/sintef-teknisk-godkjenning-2135g.pdf | Dokument | migrated | yes | 439904 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/sintef-teknisk-godkjenning.pdf | Fresvik PIR-Panel CPR | migrated | yes | 253758 | TODO: unknown original URL | Exact old PDF URL was not recoverable from sitemap/local source data. |
| /assets/fresvik/documents/tilleggsutstyr-nmoptions-kits5010exp.pdf | Tilleggsutstyr NMOptions kits 5010Exp | migrated | yes | 2177053 | https://www.fresvik.no/s/Tilleggsutstyr-NMoptions-kits5010Exp-A_NOR.pdf | Recovered likely old URL with confidence 0.75. |
| /assets/fresvik/documents/ytelseserklaring-fresvik-produkt.pdf | Ytelseserklæring | migrated | yes | 882067 | https://www.fresvik.no/s/Miljdokument-Fresvik-Produkt.pdf | Recovered likely old URL with confidence 0.67. |

## Internal links

| Metric | Count |
| --- | ---: |
| Internal link references | 292 |
| OK routes | 156 |
| Redirect links | 0 |
| Asset links OK | 136 |
| Broken links | 0 |

| href | sourceFile | status | notes |
| --- | --- | --- | --- |

## External links

| url | sourcePage | purpose | status |
| --- | --- | --- | --- |
| https://sintefcertification.no/Product/Index/129 | src/data/pages.ts: | certification/documentation | keep |
| https://www.fresvik.no/ | src/data/pages.ts: | source-url | keep |
| https://www.gasta.no | src/data/pages.ts: | external-reference | keep |
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

## Products and services focus

| path | status | body | images | docs | notes |
| --- | --- | --- | --- | --- | --- |
| /produkt/fasadepanel | page | yes | 3/3 | yes | Covered as migrated page in local data. |
| /produkt/fresvik-panel | redirect | no | 1/6 | no | Redirects to /produkt/fresvik-pur-panel. |
| /produkt/fresvik-pir-panel | page | yes | 6/7 | yes | Covered as migrated page in local data. |
| /produkt/frysetunnel | page | yes | 9/8 | yes | Covered as migrated page in local data. |
| /produkt/kjole-frysedorer | page | yes | 2/2 | yes | Covered as migrated page in local data. |
| /produkt/kjole-fryseportar | page | yes | 6/8 | yes | Covered as migrated page in local data. |
| /tenester/leveranse | page | yes | 2/2 | yes | Covered as migrated page in local data. |
| /tenester/montasje | page | yes | 2/2 | yes | Covered as migrated page in local data. |
| /tenester/service-reservedeler | page | yes | 1/1 | yes | Covered as migrated page in local data. |

## Missing / partial / needs-review

| type | target | status | task |
| --- | --- | --- | --- |

## Final TODO list

- Ingen.
