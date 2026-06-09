# Ручной аудит страницы `/produkt/fresvik-pir-panel`

Дата ручной проверки: 2026-06-10  
Старый URL: `https://www.fresvik.no/produkt/fresvik-pir-panel`  
Новый route: `/produkt/fresvik-pir-panel`  
Источник: live HTML старой страницы, локальный `src/data/oldSiteContentExtract.ts`, локальные assets/PDF.

## Summary

Страница была исправлена вручную после обнаружения, что предыдущий статус `migrated` был слишком мягким: часть данных была перенесена как summary/каркас. Теперь страница в `src/data/pages.ts` содержит старый H1, основной текст, преимущества, технические данные, документы, ссылки на tilleggsutstyr, CTA, контактные блоки и нижние сертификатные ссылки из старой страницы.

Статус после ручной правки: `migrated`, но с оговоркой `visual-layout-not-verified`, потому что дизайн не является задачей этой фазы.

## Section coverage

| Секция старой страницы | Есть на старом сайте | Есть в новом проекте | Точный текст | Фото | Ссылки/PDF | Статус | Notes |
|---|---:|---:|---:|---:|---:|---|---|
| Hero/H1: `Fresvik PIR-Panel til kjøle- og fryserom` | yes | yes | yes | yes | n/a | migrated | Заголовок и intro перенесены в page title/intro и `Full tekst frå gammal side`. |
| Main body about Fresvik production since 1980 | yes | yes | yes | yes | n/a | migrated | Три старых абзаца перенесены без пересказа. |
| Benefit list | yes | yes | yes | n/a | n/a | migrated | Перенесены: `Utvikla og produsert i Norge`, `SINTEF-godkjent`, `Fleksibelt på byggeplass`, `Enkel montasje med eksenterlås`, `Modulmål gir mindre svinn`, `Kort design-, produksjons- og leveringstid`. |
| Promo block: `Den første norske produsenten av tilpassa PIR-Panel med enkel eksenterlås` | yes | yes | yes | yes | n/a | migrated | Добавлен отдельным блоком. |
| Technical data | yes | yes | yes | n/a | n/a | migrated | Brannklasse, tykkelse, densitet, vekt, U-verdi, temperatur, romhøgde og modulbredde перенесены как строки старой страницы. |
| `Konstruksjon` | yes | yes | yes | n/a | n/a | migrated | Перенесён старый текст. |
| `Isolasjon` | yes | yes | yes | n/a | n/a | migrated | Перенесено как на старой странице, включая формулировку `polyuretan`. |
| `Overflate` | yes | yes | yes | n/a | n/a | migrated | Перенесены обе старые строки. |
| Product PDF links | yes | yes | yes | n/a | yes | migrated | `/s/PIR.pdf`, `/s/PIR-ProduktbladFP.pdf`, `/s/FP-PIR-Paneler_Montasjeanvisning-nov-2025.pdf` представлены локальными PDF. |
| Footer/certificate document links | yes | yes | yes | yes | yes | migrated | `Sentral-Godkjenning-Fresvik-Produkt.pdf`, SINTEF external, `PUR-ce-merke.pdf`, Miljøfyrtårn external добавлены в отдельную секцию. |
| Tilleggsutstyr teaser links | yes | yes | yes | yes | yes | migrated | `Elebar`, `MaxiElebar`, `PEGO`, `Beslag` представлены с локальными изображениями и старыми/new route ссылками. |
| CTA `Har du eit prosjekt du vil diskutere med oss?` | yes | yes | yes | n/a | yes | migrated | Ссылка ведёт на `/kontakt`. |
| Contact blocks | yes | yes | yes | n/a | n/a | migrated | Fresvik Produkt AS, Salsavdeling Fresvik, Salsavdeling Drammen, Frode Winther перенесены. |

## Documents

| Old URL | Local path | Status | Notes |
|---|---|---|---|
| `https://www.fresvik.no/s/PIR.pdf` | `/assets/fresvik/documents/pir-panel.pdf` | migrated | Старый product PDF. |
| `https://www.fresvik.no/s/PIR-ProduktbladFP.pdf` | `/assets/fresvik/documents/pir-panel.pdf` | migrated | В manifest/redirect map сопоставлен с тем же локальным product PDF. |
| `https://www.fresvik.no/s/FP-PIR-Paneler_Montasjeanvisning-nov-2025.pdf` | `/assets/fresvik/documents/fp-pir-paneler-montasjeanvisning-nov-2025.pdf` | migrated | Точная локальная копия есть. |
| `https://www.fresvik.no/s/FP-PIR-Paneler_Montasjeanvisning-nov-2025.pdf` | `/assets/fresvik/documents/pir-panel-montasjeanvisning.pdf` | duplicate | Локальный duplicate cache того же PDF сохранён для traceability до Sanity asset verification. |
| `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf` | `/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf` | migrated | Нижняя ссылка старой страницы. |
| `https://www.fresvik.no/s/PUR-ce-merke.pdf` | `/assets/fresvik/documents/pur-ce-merke.pdf` | migrated | Нижняя ссылка старой страницы. |

## Images

| Old page image role | Local path | Status | Notes |
|---|---|---|---|
| Product/room image | `/assets/fresvik/images/old-site/notfjaer1-65fa348e3a.jpg` | migrated | Извлечено из старой PIR-страницы. |
| PIR/product block image | `/assets/fresvik/images/old-site/image-asset-4-8d1e9d773c.jpeg` | migrated | Извлечено из старой PIR-страницы. |
| Beslag teaser image | `/assets/fresvik/images/old-site/file-f5f844b125.png` | migrated | Извлечено из старой PIR-страницы. |
| Elebar teaser | `/assets/fresvik/images/migrated/elebar-ventil-inne-web.jpg` | migrated | Используется для старой teaser-ссылки. |
| MaxiElebar teaser | `/assets/fresvik/images/migrated/maxielebar-ventil-inne-web.jpg` | migrated | Используется для старой teaser-ссылки. |
| PEGO teaser | `/assets/fresvik/images/migrated/pego-innestengningsalarm-web.jpg` | migrated | Используется для старой teaser-ссылки. |
| Certificate images | `/assets/fresvik/images/old-site/home-sentral-godkjent.png`, `/assets/fresvik/images/old-site/tg-2135-78cb0925dd.jpg`, `/assets/fresvik/images/old-site/ce-logo-png-transparent-e6364eebb9.png`, `/assets/fresvik/images/migrated/miljfyrtarn-fresvik-produkt.jpg` | migrated | Нижние сертификаты/мерки старой страницы. |

## Links

| Link | Type | Status | Notes |
|---|---|---|---|
| `/kontakt` | internal | migrated | CTA. |
| `/andre-produkter/elebar-ventil` | internal | migrated | Старый route представлен в проекте/redirect logic. |
| `/andre-produkter/maxielebar-ventil` | internal | migrated | Старый route представлен в проекте/redirect logic. |
| `/andre-produkter/pego-innestengningsalarm` | internal | migrated | Старый route представлен в проекте/redirect logic. |
| `/andre-produkter/beslag` | internal | migrated | Старый route представлен в проекте/redirect logic. |
| `https://www.sintefcertification.no/Product/Index/129` | external | keep | Старая внешняя ссылка сохранена. |
| `https://rapportering.miljofyrtarn.no/stats/176324` | external | keep | Старая внешняя ссылка сохранена. |

## Final TODO

Нет content-TODO для этой страницы. Следующий ручной шаг: перейти к `/produkt/fresvik-pur-panel` и повторить такую же проверку.
