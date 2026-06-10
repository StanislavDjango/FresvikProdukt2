# Ручной аудит страницы `/produkt/kjole-fryseportar`

Дата ручной проверки: 2026-06-10  
Старый URL: `https://www.fresvik.no/produkt/kjole-fryseportar`  
Новый route: `/produkt/kjole-fryseportar`  
Источник: live HTML старой страницы, локальный `src/data/oldSiteContentExtract.ts`, локальные assets/PDF.

## Summary

Страница `/produkt/kjole-fryseportar` вручную перенесена из старой страницы `https://www.fresvik.no/produkt/kjole-fryseportar`. Текущий Sanity-документ может быть устаревшим/сжатым, поэтому runtime использует локальную migration structure как источник истины до Sanity re-import.

Статус после ручной правки: `migrated`, с оговоркой `visual-layout-not-verified`, потому что дизайн не является задачей этой фазы.

## Section coverage

| Секция старой страницы | Есть на старом сайте | Есть в новом проекте | Точный текст | Фото | Ссылки/PDF | Статус | Notes |
|---|---:|---:|---:|---:|---:|---|---|
| Hero/H1: `Skyveport til kjøle- og fryserom` | yes | yes | yes | yes | n/a | migrated | Заголовок и intro перенесены в page title/intro и `Full tekst frå gammal side`. |
| Main body about experience, slitasje, skreddarsøm | yes | yes | yes | yes | n/a | migrated | Три старых абзаца перенесены без пересказа. |
| Benefit list | yes | yes | yes | n/a | n/a | migrated | `Manuell eller elektrisk`, `Utvikla og produsert i Norge`, `Skreddarsydd etter mål`, `Høg kvalitet og god isoleringsevne`. |
| Product images: `Kjøle/fryseport`, `Motor`, `Lås` | yes | yes | yes | yes | n/a | migrated | Три product image blocks перенесены. |
| `Produktinformasjon` | yes | yes | yes | n/a | n/a | migrated | `Dørblad`, `Isolering`, `Beslag`, `Karm`, `Tetning`, `Mål`, `Ekstra` перенесены как старые строки. |
| Product PDF | yes | yes | yes | yes | yes | migrated | `/s/Produktblad-Fresvik-Skyveport.pdf` представлен локальным PDF. |
| Manual port montage PDF | yes | yes | yes | yes | yes | migrated | `/s/Fresvik-Port-Montasjeanvisning.pdf` представлен локальным PDF. |
| Electric port mounting page link | yes | yes | yes | n/a | yes | migrated | `/monteringsanvisningar-fresvik-skyveport` сохранён. |
| CTA `Har du eit prosjekt du vil diskutere med oss?` | yes | yes | yes | n/a | yes | migrated | Ссылка ведёт на `/kontakt`. |
| Tilleggsprodukt | yes | yes | yes | yes | yes | migrated | `PVC-gardiner` и `Køyrerampe` перенесены с фото и ссылками. |
| Contact blocks | yes | yes | yes | n/a | n/a | migrated | Fresvik Produkt AS, Salsavdeling Fresvik, Salsavdeling Drammen, Frode Winther перенесены. |
| Newsletter/footer links | yes | yes | yes | n/a | yes | migrated | Personvernerklæring, Openheitslova, GASTA перенесены. |
| Footer/certificate links | yes | yes | yes | yes | yes | migrated | Sentral godkjenning, SINTEF, Polyurethan, StartBANK, Miljøfyrtårn, PUR CE-merke перенесены. |

## Documents

| Old URL | Local path | Status | Notes |
|---|---|---|---|
| `https://www.fresvik.no/s/Produktblad-Fresvik-Skyveport.pdf` | `/assets/fresvik/documents/produktblad-fresvik-skyveport.pdf` | migrated | Product PDF from old port page. |
| `https://www.fresvik.no/s/Fresvik-Port-Montasjeanvisning.pdf` | `/assets/fresvik/documents/fresvik-port-montasjeanvisning.pdf` | migrated | Manual port mounting PDF from old port page. |
| `https://www.fresvik.no/s/Sentral-Godkjenning-Fresvik-Produkt.pdf` | `/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf` | migrated | Footer document link. |
| `https://www.fresvik.no/s/PUR-ce-merke.pdf` | `/assets/fresvik/documents/pur-ce-merke.pdf` | migrated | Footer document link. |

## Images

| Old page image role | Local path | Status | Notes |
|---|---|---|---|
| Hero/product production image | `/assets/fresvik/images/old-site/fresvik-port-hero.jpeg` | migrated | Скачано 2026-06-10 из live old page. |
| Kjøle/fryseport | `/assets/fresvik/images/old-site/fresvik-skyveport-cedbd2620d.jpeg` | migrated | Извлечено из старой страницы. |
| Motor | `/assets/fresvik/images/old-site/motor-fresvik-elektrisk-skyveport-4124d9ef0b.jpeg` | migrated | Извлечено из старой страницы. |
| Lås | `/assets/fresvik/images/old-site/laas-fresvik-skyveport-217ddc424b.jpeg` | migrated | Извлечено из старой страницы. |
| Download icon | `/assets/fresvik/images/old-site/file-f5f844b125.png` | migrated | Используется для PDF-карточек. |
| PVC-gardiner teaser | `/assets/fresvik/images/old-site/pvc-gardin-web-port.jpg` | migrated | Скачано 2026-06-10 из live old page. |
| Køyrerampe teaser | `/assets/fresvik/images/old-site/rampe3-copy-port.jpg` | migrated | Скачано 2026-06-10 из live old page. |
| Certificate images | `/assets/fresvik/images/old-site/home-sentral-godkjent.png`, `/assets/fresvik/images/old-site/tg-2135-78cb0925dd.jpg`, `/assets/fresvik/images/old-site/home-poly.png`, `/assets/fresvik/images/old-site/home-startbank.png`, `/assets/fresvik/images/migrated/miljfyrtarn-fresvik-produkt.jpg`, `/assets/fresvik/images/old-site/ce-logo-png-transparent-e6364eebb9.png` | migrated | Нижние сертификаты/мерки старой страницы. |

## Links

| Link | Type | Status | Notes |
|---|---|---|---|
| `/s/Produktblad-Fresvik-Skyveport.pdf` | document redirect | migrated | Redirect/local path already exists. |
| `/s/Fresvik-Port-Montasjeanvisning.pdf` | document redirect | migrated | Redirect/local path already exists. |
| `/monteringsanvisningar-fresvik-skyveport` | internal | migrated | Electric port mounting page. |
| `/andre-produkter/pvc-gardiner` | internal | migrated | Tilleggsprodukt link. |
| `/andre-produkter/kjlerampe` | internal | migrated | Tilleggsprodukt link. |
| `/kontakt` | internal | migrated | CTA. |
| `/personvernerklering` | internal | migrated | Footer. |
| `/openheitslova` | internal | migrated | Footer. |
| `https://www.gasta.no/` | external | keep | Footer. |
| `https://www.sintefcertification.no/Product/Index/129` | external | keep | Старая внешняя ссылка сохранена. |
| `https://rapportering.miljofyrtarn.no/stats/176324` | external | keep | Старая внешняя ссылка сохранена. |

## Final TODO

Нет content-TODO для этой страницы. Следующий ручной шаг: `/produkt/kjole-frysedorer`.
