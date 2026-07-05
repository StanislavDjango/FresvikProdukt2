# Fresvik Next Phase Completion Plan

Дата создания: 2026-07-05

## Summary

Цель следующей фазы: довести оставшиеся страницы до состояния, где сайт выглядит цельно и при этом не теряет миграционную точность. Мы продолжаем идти page-by-page: сначала закрываем вложенные страницы `andre-produkter`, затем продуктовые/сервисные страницы, затем референсы, новости и финальную production-проверку.

Важно: дизайн улучшаем только там, где он помогает нормально показать уже перенесённый контент. Текст, фото, PDF и ссылки не переписываем “красиво” от себя. Если старый контент есть, он должен быть сохранён. Если чего-то нет, ставим понятный статус и причину.

## Текущее Состояние

Уже закрыто в текущем визуальном подходе:

- `/produkt/fresvik-pir-panel`
- `/produkt/fasadepanel`
- `/tilleggsutstyr`
- `/andre-produkter/standard-handtak`
- `/andre-produkter/elebar-ventil`
- `/andre-produkter/maxielebar-ventil`
- `/andre-produkter/pego-innestengningsalarm`
- `/andre-produkter/pvc-gardiner`
- `/andre-produkter/beslag`
- `/andre-produkter/diktator-dortiltrekker`
- `/andre-produkter/kjlerampe`
- `/andre-produkter/2014/7/9/standard-drer`
- `/andre-produkter/2014/7/9/skipsdrer`
- `/andre-produkter/2014/7/9/industri-slagdor`

Общий шаблон, который сохраняем:

- общий header/footer не ломаем;
- главный hero на `/` не трогаем без отдельного решения;
- для внутренних страниц используем компактный page-intro вместо огромных hero-баннеров;
- для detail-страниц контент идёт как полноценная статья/раздел, а не как карточка-пересказ;
- карточки используем только для переходов на другие страницы или для списков;
- дублирующие блоки удаляем;
- служебные подписи вроде `Tekst henta frå gammal side utan omskriving` не показываем пользователю.

## Definition Of Done Для Страницы

Страница считается готовой, если:

- весь старый текст перенесён без пересказа;
- изображения перенесены и видимы;
- PDF/документы открываются;
- внутренние ссылки ведут на существующие страницы или redirects;
- нет дублирующих карточек с тем же контентом, который уже раскрыт ниже;
- нет служебных миграционных текстов на странице;
- страница адаптивна на desktop/mobile;
- `npm run lint` и `npm run build` проходят;
- после пачки страниц проходит `npm run check:links`.

## Очередь 1: Закрыть Оставшиеся `andre-produkter`

Эти страницы идут первыми, потому что они уже связаны с блоком `Tilleggsutstyr` и нижней навигацией.

- [x] `/andre-produkter/diktator-dortiltrekker`
  - Проверить старый текст и фото.
  - Убрать карточный дубль, если он есть.
  - Оформить как detail page.
  - Проверить previous/next навигацию.
  - Статус: закрыто через общий accessory detail шаблон; smoke `200`, top cards `false`, служебные подписи `false`.

- [x] `/andre-produkter/kjlerampe`
  - Проверить все 3 изображения рампы.
  - Оформить изображения аккуратной галереей внутри product information.
  - Проверить spelling: старый route `kjlerampe` сохраняем ради URL, но в UI пишем `Køyrerampe`.
  - Статус: закрыто через общий accessory detail шаблон; 3 изображения показываются внутри product information, route сохранён.

- [x] `/andre-produkter/2014/7/9/standard-drer`
  - Перенести/проверить полный технический текст.
  - Сделать длинный текст читаемым: разделы `Konstruksjon`, `Standardleveranse`, `Ekstraleveranse`, `Kort leveringstid`.
  - Проверить фото двери.
  - Статус: закрыто; технические абзацы автоматически оформлены как отдельные секции.

- [x] `/andre-produkter/2014/7/9/skipsdrer`
  - Проверить полный текст.
  - Оформить технические пункты как читаемый список/секции.
  - Проверить фото.
  - Статус: закрыто; технические абзацы автоматически оформлены как отдельные секции.

- [x] `/andre-produkter/2014/7/9/industri-slagdor`
  - Проверить полный текст.
  - Оформить технические пункты как читаемый список/секции.
  - Проверить фото.
  - Статус: закрыто; технические абзацы автоматически оформлены как отдельные секции.

## Очередь 2: Продуктовые Страницы

Цель: привести все продуктовые страницы к одному спокойному шаблону.

- [x] `/produkt/fresvik-pur-panel`
  - Проверить, нет ли дублей заголовков.
  - Проверить документы и сертификаты.
  - Оформить технические данные в стиле PIR/Fasade.
  - Статус: закрыто; smoke `200`, служебные подписи `false`, документы/сертификаты отображаются только как реальные ссылки.

- [x] `/produkt/kjole-fryseportar`
  - Убрать лишнюю верхнюю карточку, если она осталась.
  - Проверить PDF product sheet.
  - Проверить связанные страницы и документы.
  - Статус: закрыто; smoke `200`, верхний карточный дубль скрыт, PDF/сертификаты доступны.

- [x] `/produkt/kjole-frysedorer`
  - То же правило: не карточка внутри самой страницы, а раскрытый контент.
  - Проверить PDF и изображения.
  - Статус: закрыто; smoke `200`, служебные подписи `false`, документы/сертификаты доступны.

- [x] `/produkt/frysetunnel`
  - Проверить old content/images.
  - Если контента мало, не выдумывать, а оформить честно и компактно.
  - Статус: закрыто; smoke `200`, контент оформлен компактно без выдуманного расширения, документы/сертификаты доступны.

- [x] `/produkt`
  - Проверить сетку карточек после всех изменений.
  - Убедиться, что `Les meir` стоит справа и карточки имеют единый стиль.
  - Статус: закрыто; smoke `200`, сертификаты выводятся через общий компонент без старого newsletter/GASTA-хвоста.

## Очередь 3: Tenester И Kundeservice

- [ ] `/tenester/montasje`
- [ ] `/tenester/leveranse`
- [ ] `/tenester/service-reservedeler`
- [ ] `/kundeservice/faq`
- [ ] `/transportskade`
- [ ] `/send-foresporsel`

Для каждой:

- сохранить точный старый смысл;
- убрать служебные миграционные подписи;
- проверить CTA и контактные ссылки;
- проверить, что страница не выглядит как черновой склад.

## Очередь 4: Dokumentasjon

- [ ] `/dokumentasjon`
- [ ] `/monteringsanvisning`
- [ ] `/monteringsanvisningar-fresvik-skyveport`

Фокус:

- PDF должны открываться;
- документы должны быть подписаны понятно;
- не должно быть битых `/s/...`;
- локальные redirects должны сохраняться;
- не удалять local asset cache.

## Очередь 5: Referansar

Сначала страницы, которые уже всплыли из `fasadepanel`:

- [ ] `/referansar/2014/7/8/interfrukt-vrt-strste-prosjekt`
- [ ] `/referansar/celsa-steel-sotra`

Потом остальные reference pages из inventory:

- [ ] `/referansar/2014/7/8/coop-extra-sogndal`
- [ ] `/referansar/fryserom-baza-fredrikstad`
- [ ] `/referansar/historisk-leveranse-pir-panel-spar-lund-torv`
- [ ] `/referansar/bjerkreim-legekontor-vikesaa`
- [ ] `/referansar/bunnpris-hammerfest`
- [ ] `/referansar/kjolerom-kjoledor-bunnpris-volda`
- [ ] `/referansar/fryserom-coop-obs-alnabru`
- [ ] `/referansar/vik-helse-og-omsorgssenter`
- [ ] `/referansar/fryse-og-kjolerom-kiwi-otta`
- [ ] `/referansar/nye-leveransar-til-rema-1000-ya-i-larvik`
- [ ] `/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark`
- [ ] `/referansar/spesialloysing-torkerom-drageboden-kaupanger`
- [ ] `/referansar/omfattande-leveranse-til-bakehuset-trondheim`
- [ ] `/referansar/fryseromsportar-til-rema-1000-i-narvik`
- [ ] `/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront`
- [ ] `/referansar/fryserom-fryseport-rentokil`
- [ ] `/referansar/fresvik-kjole-og-fryserom-i-miljovennlege-daglegvarebutikkar`
- [ ] `/referansar/karlsoybruket`
- [ ] `/referansar/fiskehallen`
- [ ] `/referansar/buskerud-storcash`
- [ ] `/referansar/bjerke-spekemat`
- [ ] `/referansar/restauranthuset`

Для reference pages:

- это не должны быть только title + summary;
- нужны фото, если они были на старой странице;
- нужен клиент/проект/описание поставки;
- если old body невозможно восстановить, ставим `needs-review` с причиной.

## Очередь 6: Aktuelt

Сначала 3 новости, которые видны на главной:

- [ ] `/aktuelt/samaneh-shakeri-ny-teknisk-sjef`
- [ ] `/aktuelt/ny-teknisk-teiknar-havard-berdal`
- [ ] `/aktuelt/john-bothun-blir-pensjonist`

Потом остальные новости из inventory:

- [ ] `/aktuelt/ein-investering-for-henga-med-i-tidanbsp`
- [ ] `/aktuelt/agnar-er-snart-pensjonistnbsp`
- [ ] `/aktuelt/to-ledige-stillingar-i-haust`
- [ ] `/aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv`
- [ ] `/aktuelt/vi-er-blitt-sertifisert-miljofyrtarn`
- [ ] `/aktuelt/fryse-og-kjlerom-til-sogn-frukt-og-grnt`
- [ ] `/aktuelt/ledig-stilling-som-produksjonsmedarbeidar`
- [ ] `/aktuelt/jul-2020`
- [ ] `/aktuelt/arne-olav-ny-salskonsulent`
- [ ] `/aktuelt/fresvik-kjolerom-til-fruktbonde`
- [ ] `/aktuelt/40-aars-jubileum`
- [ ] `/aktuelt/skjererom`
- [ ] `/aktuelt/orklafoods-stranda`
- [ ] `/aktuelt/nye-monteringsanvisningar`
- [ ] `/aktuelt/fasade-element-og-takplater-ruukki`
- [ ] `/aktuelt/portproduksjon`

Для news pages:

- дата должна быть сохранена;
- фото должны быть сохранены;
- полный body важнее красивой карточки;
- на `/aktuelt` нужна нормальная сетка списка новостей.

## Очередь 7: Om Oss, Kontakt, Legal

- [ ] `/om-oss`
- [ ] `/firmainfo`
- [ ] `/tilsette`
- [ ] `/stillingledig`
- [ ] `/kontakt`
- [ ] `/personvernerklering`
- [ ] `/openheitslova`

Фокус:

- эти страницы не должны выглядеть как технический перенос;
- контакты, e-mail, телефоны и внешние ссылки должны быть рабочими;
- legal pages не переписывать.

## Очередь 8: Финальная Проверка И Production

После закрытия всех очередей:

```bash
source ~/.nvm/nvm.sh
nvm use
npm run assets:manifest
npm run audit:migration
npm run audit:content
npm run validate:data
npm run check:assets
npm run check:migration
npm run lint
npm run build
```

Потом link check:

```bash
LINK_CHECK_BASE_URL=http://127.0.0.1:3060 npm run check:links
```

После push:

```bash
LINK_CHECK_BASE_URL=https://fresvik-produkt2.vercel.app npm run check:links
```

## Что Не Делаем В Этой Фазе

- не трогаем главный hero без отдельной задачи;
- не делаем мультиязычность;
- не удаляем `public/assets/fresvik`;
- не удаляем backup-поля Sanity/migration;
- не делаем Sanity cleanup;
- не меняем структуру проекта ради красоты;
- не переписываем старый текст маркетингово.

## Ближайшая Рабочая Цель

Следующая конкретная страница:

```text
/andre-produkter/diktator-dortiltrekker
```

После неё:

```text
/andre-produkter/kjlerampe
/andre-produkter/2014/7/9/standard-drer
/andre-produkter/2014/7/9/skipsdrer
/andre-produkter/2014/7/9/industri-slagdor
```

Когда эта очередь будет закрыта, раздел `Tilleggsutstyr / andre-produkter` можно считать визуально и контентно выровненным.
