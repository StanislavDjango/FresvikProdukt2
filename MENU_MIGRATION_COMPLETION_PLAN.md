# План завершения точной миграции страниц меню Fresvik

Дата создания: 2026-06-12

## Summary

Цель этого плана: закончить точный перенос страниц из меню Fresvik page-by-page. Каждая строка ниже является отдельной рабочей целью, которую можно брать в работу отдельно.

Миграция здесь означает не новый красивый пересказ, а информационное соответствие старой странице:

- старые заголовки, тексты и смысловые блоки перенесены;
- изображения перенесены или имеют явный статус `duplicate`, `ignored-with-reason`, `external-only`, `missing`;
- PDF/документы перенесены или имеют явный проверяемый статус;
- внутренние и внешние ссылки сохранены через новые route/redirect или явно объяснены;
- `TODO`, `needs-review`, `må verifiserast`, `migrate final` не допускаются для статуса `migrated`.

Дизайн, Tailwind-polish, SEO-polish и Sanity upload в этом плане не трогаем.

## Definition Of Done Для Одной Страницы

Страница считается закрытой только если:

- есть свежий crawl старой страницы в `migration/evidence/...`;
- есть сравнение старой и новой страницы в `migration/comparisons/...`;
- создан или обновлён ручной audit в `MANUAL_PAGE_AUDITS/<slug>.md`;
- старая видимая информация перенесена в локальные data/seed sources;
- все изображения, PDF и ссылки имеют проверяемый статус;
- `npm run migration:compare-page` показывает `migrated` или остаются только явно документированные исключения;
- быстрые проверки проходят;
- изменения закоммичены и запушены.

## Рабочий Процесс Для Каждой Цели

Перед началом:

```bash
git status --short --branch
source ~/.nvm/nvm.sh
nvm use
```

Собрать доказательства старой страницы:

```bash
npm run migration:crawl-page -- https://www.fresvik.no/<old-path>
```

Сравнить старую страницу с новой:

```bash
npm run migration:compare-page -- https://www.fresvik.no/<old-path> /<new-route> --new-base http://127.0.0.1:3060 --allow-partial
```

После правок:

```bash
npm run assets:manifest
npm run audit:migration
npm run audit:content
npm run validate:data
npm run check:assets
npm run check:migration
npm run lint
npm run build
```

Для ссылок:

```bash
LINK_CHECK_BASE_URL=http://127.0.0.1:3060 npm run check:links
```

## Уже Закрыто Вручную

- [x] Цель: `/produkt/fresvik-pir-panel` — oldUrl: `https://www.fresvik.no/produkt/fresvik-pir-panel`; audit: `MANUAL_PAGE_AUDITS/fresvik-pir-panel.md`; commit: `d31910f`, `d98494e`.
- [x] Цель: `/produkt/fresvik-pur-panel` — oldUrl: `https://www.fresvik.no/produkt/fresvik-pur-panel`; audit: `MANUAL_PAGE_AUDITS/fresvik-pur-panel.md`; commit: `0cc595e`.
- [x] Цель: `/produkt/kjole-fryseportar` — oldUrl: `https://www.fresvik.no/produkt/kjole-fryseportar`; audit: `MANUAL_PAGE_AUDITS/kjole-fryseportar.md`; commit: `34a0d5d`.
- [x] Цель: `/produkt/kjole-frysedorer` — oldUrl: `https://www.fresvik.no/produkt/kjole-frysedorer`; audit: `MANUAL_PAGE_AUDITS/kjole-frysedorer.md`; commit: `7a01084`.
- [x] Цель: `/produkt/fasadepanel` — oldUrl: `https://www.fresvik.no/produkt/fasadepanel`; audit: `MANUAL_PAGE_AUDITS/fasadepanel.md`; commit: `caf36c8`.
- [x] Цель: `/produkt/frysetunnel` — oldUrl: `https://www.fresvik.no/produkt/frysetunnel`; audit: `MANUAL_PAGE_AUDITS/frysetunnel.md`; commit: `940214e`.

## Очередь 1: Закрыть Раздел Produkt

- [x] Цель: `/tilleggsutstyr` — oldUrl: `https://www.fresvik.no/tilleggsutstyr`; audit: `MANUAL_PAGE_AUDITS/tilleggsutstyr.md`; статус: `migrated`; compare: `0 text / 0 images / 0 links missing`.
- [ ] Цель: `/produkt` — oldUrl: `https://www.fresvik.no/produkt`; audit: `MANUAL_PAGE_AUDITS/produkt.md`; статус: `pending`; примечание: индексная страница закрывается после проверки карточек/ссылок на все продуктовые страницы.

## Очередь 2: Tenester

- [ ] Цель: `/tenester/montasje` — oldUrl: `https://www.fresvik.no/tenester/montasje`; audit: `MANUAL_PAGE_AUDITS/montasje.md`; статус: `pending`.
- [ ] Цель: `/tenester/leveranse` — oldUrl: `https://www.fresvik.no/tenester/leveranse`; audit: `MANUAL_PAGE_AUDITS/leveranse.md`; статус: `pending`.
- [ ] Цель: `/tenester/service-reservedeler` — oldUrl: `https://www.fresvik.no/tenester/service-reservedeler`; audit: `MANUAL_PAGE_AUDITS/service-reservedeler.md`; статус: `pending`.
- [ ] Цель: `/tenester` — oldUrl: `https://www.fresvik.no/tenester`; audit: `MANUAL_PAGE_AUDITS/tenester.md`; статус: `pending`; примечание: индексная страница закрывается после проверки трёх service pages.

## Очередь 3: Dokumentasjon И Kundeservice

- [ ] Цель: `/dokumentasjon` — oldUrl: `https://www.fresvik.no/dokumentasjon`; audit: `MANUAL_PAGE_AUDITS/dokumentasjon.md`; статус: `pending`; примечание: проверить все PDF/product sheets.
- [ ] Цель: `/monteringsanvisning` — oldUrl: `https://www.fresvik.no/monteringsanvisning`; audit: `MANUAL_PAGE_AUDITS/monteringsanvisning.md`; статус: `pending`; примечание: проверить все монтажные PDF.
- [ ] Цель: `/monteringsanvisningar-fresvik-skyveport` — oldUrl: `https://www.fresvik.no/monteringsanvisningar-fresvik-skyveport`; audit: `MANUAL_PAGE_AUDITS/monteringsanvisningar-fresvik-skyveport.md`; статус: `pending`.
- [ ] Цель: `/kundeservice/faq` — oldUrl: `https://www.fresvik.no/kundeservice/faq`; audit: `MANUAL_PAGE_AUDITS/faq.md`; статус: `pending`.

## Очередь 4: Referansar, Aktuelt И Om Oss

- [ ] Цель: `/referansar` — oldUrl: `https://www.fresvik.no/referansar`; audit: `MANUAL_PAGE_AUDITS/referansar.md`; статус: `pending`; примечание: проверить ссылки/карточки на все reference pages.
- [ ] Цель: `/aktuelt` — oldUrl: `https://www.fresvik.no/aktuelt`; audit: `MANUAL_PAGE_AUDITS/aktuelt.md`; статус: `pending`; примечание: проверить список новостей и ссылки на все news pages.
- [ ] Цель: `/om-oss` — oldUrl: `https://www.fresvik.no/om-oss`; audit: `MANUAL_PAGE_AUDITS/om-oss.md`; статус: `pending`.
- [ ] Цель: `/firmainfo` — oldUrl: `https://www.fresvik.no/firmainfo`; audit: `MANUAL_PAGE_AUDITS/firmainfo.md`; статус: `pending`.
- [ ] Цель: `/tilsette` — oldUrl: `https://www.fresvik.no/tilsette`; audit: `MANUAL_PAGE_AUDITS/tilsette.md`; статус: `pending`; примечание: проверить сотрудников, фото, e-mail, phone.
- [ ] Цель: `/stillingledig` — oldUrl: `https://www.fresvik.no/stillingledig`; audit: `MANUAL_PAGE_AUDITS/stillingledig.md`; статус: `pending`.

## Очередь 5: Kontakt И Footer Pages

- [ ] Цель: `/kontakt` — oldUrl: `https://www.fresvik.no/kontakt`; audit: `MANUAL_PAGE_AUDITS/kontakt.md`; статус: `pending`; примечание: не ломать существующий route `/kontakt`.
- [ ] Цель: `/personvernerklering` — oldUrl: `https://www.fresvik.no/personvernerklering`; audit: `MANUAL_PAGE_AUDITS/personvernerklering.md`; статус: `pending`.
- [ ] Цель: `/openheitslova` — oldUrl: `https://www.fresvik.no/openheitslova`; audit: `MANUAL_PAGE_AUDITS/openheitslova.md`; статус: `pending`.

## После Закрытия Всех Пунктов Меню

- [ ] Пересобрать `MIGRATION_AUDIT.md`.
- [ ] Пересобрать `MACHINE_READABLE_MIGRATION_AUDIT.json`.
- [ ] Пересобрать `PAGE_CONTENT_MIGRATION_AUDIT.md`.
- [ ] Пересобрать `MACHINE_READABLE_PAGE_CONTENT_AUDIT.json`.
- [ ] Проверить, что `partial`, `missing`, `needs-review` остались только с явной внешней причиной.
- [ ] Проверить, что broken internal links = `0`.
- [ ] Проверить, что все PDF имеют `oldUrl`, `localPath`, `title`, `sourcePage`, `fileSize`, `usedBy`, `status`.
- [ ] Проверить, что все sitemap/HTML images имеют статус `migrated`, `duplicate`, `thumbnail-or-variant`, `ignored-with-reason`, `external-only` или `missing`.

## Финальный Checkpoint Перед Следующей Фазой

```bash
npm run migration:checkpoint
LINK_CHECK_BASE_URL=http://127.0.0.1:3060 npm run check:links
```

Переходить к дизайну, Sanity asset upload или UI-polish можно только после того, как этот план закрыт или все оставшиеся пункты имеют честный внешний блокер.
