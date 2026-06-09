# Ручной аудит страницы `/produkt/fresvik-pur-panel`

Дата ручной проверки: 2026-06-10  
Старый URL: `https://www.fresvik.no/produkt/fresvik-panel`  
Новый route: `/produkt/fresvik-pur-panel`  
Источник: live HTML старой страницы, локальный `src/data/oldSiteContentExtract.ts`, локальные assets/PDF.

## Summary

Страница `/produkt/fresvik-pur-panel` вручную перенесена из старой страницы `/produkt/fresvik-panel`. Старый URL остаётся redirect на новый route. Текущий Sanity-документ для этой страницы может быть устаревшим/сжатым, поэтому runtime использует локальную migration structure как источник истины до Sanity re-import.

Статус после ручной правки: `migrated`, с оговоркой `visual-layout-not-verified`, потому что дизайн не является задачей этой фазы.

## Section coverage

| Секция старой страницы | Есть на старом сайте | Есть в новом проекте | Точный текст | Фото | Ссылки/PDF | Статус | Notes |
|---|---:|---:|---:|---:|---:|---|---|
| Hero/H1: `Fresvik PUR-Panel til kjøle- og fryserom` | yes | yes | yes | yes | n/a | migrated | Заголовок и intro перенесены в page title/intro и `Full tekst frå gammal side`. |
| Main body about Fresvik production since 1980 | yes | yes | yes | yes | n/a | migrated | Три старых абзаца перенесены без пересказа. |
| Benefit list | yes | yes | yes | n/a | n/a | migrated | Перенесены: `Utvikla og produsert i Norge`, `SINTEF-godkjent`, `Fleksibelt på byggeplass`, `Enkel montasje med eksenterlås`, `Modulmål gir mindre svinn`, `Kort design-, produksjons- og leveringstid`. |
| Technical data | yes | yes | yes | n/a | n/a | migrated | Brannklasse, tykkelse, densitet, vekt, U-verdi, temperatur, romhøgde og modulbredde перенесены как строки старой страницы. |
| `Konstruksjon` | yes | yes | yes | yes | n/a | migrated | Текст и фото перенесены. Фото: `/assets/fresvik/images/old-site/notfjaer1-65fa348e3a.jpg`. |
| `Isolasjon` | yes | yes | yes | yes | n/a | migrated | Текст и фото перенесены. Фото: `/assets/fresvik/images/old-site/image-asset-4-8d1e9d773c.jpeg`. |
| `Overflate` | yes | yes | yes | yes | n/a | migrated | Текст и фото перенесены. Фото: `/assets/fresvik/images/old-site/aaa-e82ae393b0.jpg`. |
| Product PDF | yes | yes | yes | yes | yes | migrated | `/s/PUR-ProduktbladFP.pdf` скачан локально как `/assets/fresvik/documents/pur-produktbladfp.pdf`. |
| CTA `Har du eit prosjekt du vil diskutere med oss?` | yes | yes | yes | n/a | yes | migrated | Ссылка ведёт на `/kontakt`. |
| Contact blocks | yes | yes | yes | n/a | n/a | migrated | Fresvik Produkt AS, Salsavdeling Fresvik, Salsavdeling Drammen, Frode Winther перенесены. |
| Newsletter/footer links | yes | yes | yes | n/a | yes | migrated | Personvernerklæring, Openheitslova, GASTA перенесены. |
| Footer/certificate links | yes | yes | yes | yes | yes | migrated | Sentral godkjenning, SINTEF, Polyurethan, StartBANK, Miljøfyrtårn, PUR CE-merke перенесены. |

## Documents

| Old URL | Local path | Status | Notes |
|---|---|---|---|
| `https://www.fresvik.no/s/PUR-ProduktbladFP.pdf` | `/assets/fresvik/documents/pur-produktbladfp.pdf` | migrated | Скачан 2026-06-10 из live old site, 2 pages. |
| `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf` | `/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf` | migrated | Нижняя ссылка старой страницы. |
| `https://www.fresvik.no/s/PUR-ce-merke.pdf` | `/assets/fresvik/documents/pur-ce-merke.pdf` | migrated | Нижняя ссылка старой страницы. |

## Images

| Old page image role | Local path | Status | Notes |
|---|---|---|---|
| Hero/decor snowflake | `/assets/fresvik/images/old-site/flake-black-3b186da893.png` | migrated | Извлечено из старой PUR-страницы. |
| Konstruksjon | `/assets/fresvik/images/old-site/notfjaer1-65fa348e3a.jpg` | migrated | Извлечено из старой PUR-страницы. |
| Isolasjon | `/assets/fresvik/images/old-site/image-asset-4-8d1e9d773c.jpeg` | migrated | Извлечено из старой PUR-страницы. |
| Overflate | `/assets/fresvik/images/old-site/aaa-e82ae393b0.jpg` | migrated | Извлечено из старой PUR-страницы. |
| Productblad icon/video-file image | `/assets/fresvik/images/old-site/pur-video-file.png` | migrated | Скачано из старой PUR-страницы; сохранено как local cache. |
| Download icon | `/assets/fresvik/images/old-site/file-f5f844b125.png` | migrated | Используется для product PDF. |
| Certificate images | `/assets/fresvik/images/old-site/home-sentral-godkjent.png`, `/assets/fresvik/images/old-site/tg-2135-78cb0925dd.jpg`, `/assets/fresvik/images/old-site/home-poly.png`, `/assets/fresvik/images/old-site/home-startbank.png`, `/assets/fresvik/images/migrated/miljfyrtarn-fresvik-produkt.jpg`, `/assets/fresvik/images/old-site/ce-logo-png-transparent-e6364eebb9.png` | migrated | Нижние сертификаты/мерки старой страницы. |

## Links

| Link | Type | Status | Notes |
|---|---|---|---|
| `/produkt/fresvik-panel` | redirect | migrated | Старый route redirect на `/produkt/fresvik-pur-panel`. |
| `/s/PUR-ProduktbladFP.pdf` | document redirect | migrated | Redirect на `/assets/fresvik/documents/pur-produktbladfp.pdf`. |
| `/kontakt` | internal | migrated | CTA. |
| `/personvernerklering` | internal | migrated | Footer. |
| `/openheitslova` | internal | migrated | Footer. |
| `https://www.gasta.no/` | external | keep | Footer. |
| `https://www.sintefcertification.no/Product/Index/129` | external | keep | Старая внешняя ссылка сохранена. |
| `https://rapportering.miljofyrtarn.no/stats/176324` | external | keep | Старая внешняя ссылка сохранена. |

## Final TODO

Нет content-TODO для этой страницы. Следующий ручной шаг: `/produkt/kjole-fryseportar`.
