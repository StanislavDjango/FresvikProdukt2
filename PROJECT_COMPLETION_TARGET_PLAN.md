# Fresvik Project Target Plan

Дата: 2026-07-05

## Цель

Довести Fresvik Next до состояния, где сайт можно уверенно показывать владельцу:

- старый контент перенесён и не потерян;
- страницы меню выглядят цельно и современно;
- PDF и ссылки открываются напрямую;
- Sanity runtime работает на production;
- локальный asset cache сохранён до отдельного cleanup;
- дизайн можно продолжать уже поверх стабильной структуры.

## Главный Принцип

Не закрываем страницу только потому, что она “открывается”.

Страница готова только если:

- нет дублирующих карточек;
- нет служебных миграционных подписей;
- текст соответствует старому источнику;
- изображения видны и не выглядят случайно обрезанными;
- PDF/документы открываются;
- связанные страницы существуют или имеют redirect;
- header/footer остаются едиными для всего сайта;
- страница нормально читается на desktop и mobile.

## Этап 1: Документация

Страницы:

- `/dokumentasjon`
- `/monteringsanvisning`
- `/monteringsanvisningar-fresvik-skyveport`

Что сделать:

- заменить видимые старые `/s/...` PDF-ссылки на прямые локальные или Sanity-ссылки;
- сохранить redirects для старых URL;
- проверить, что каждый PDF открывается;
- убрать любые служебные подписи, если они видны пользователю;
- отметить очередь закрытой в `NEXT_PHASE_COMPLETION_PLAN.md`.

## Этап 2: Reference Pages

Приоритет:

- `/referansar/2014/7/8/interfrukt-vrt-strste-prosjekt`
- `/referansar/celsa-steel-sotra`

Дальше пройти остальные `/referansar` из `NEXT_PHASE_COMPLETION_PLAN.md`.

Что сделать:

- восстановить полный текст проекта;
- показать фото проекта;
- убрать пересказ там, где есть старый полный текст;
- оформить как страницу проекта, а не как карточку;
- проверить входящие ссылки с product pages.

## Этап 3: News Pages

Приоритет:

- `/aktuelt/samaneh-shakeri-ny-teknisk-sjef`
- `/aktuelt/ny-teknisk-teiknar-havard-berdal`
- `/aktuelt/john-bothun-blir-pensjonist`

Что сделать:

- дата, фото и полный body обязательны;
- список `/aktuelt` должен выглядеть аккуратно;
- карточки сотрудников делать равными по значимости;
- не оставлять “title + summary” как готовую новость.

## Этап 4: Company, Contact, Legal

Страницы:

- `/om-oss`
- `/firmainfo`
- `/tilsette`
- `/stillingledig`
- `/kontakt`
- `/personvernerklering`
- `/openheitslova`

Что сделать:

- проверить телефоны, email, адреса и внешние ссылки;
- legal-тексты не переписывать;
- контактные блоки оформить спокойно и понятно;
- не ломать `/kontakt` и `/studio`.

## Этап 5: Global Polish

Что привести к одному стилю:

- общий header;
- общий footer;
- compact page intro для внутренних страниц;
- product/document/reference/news cards;
- кнопки `Les meir`, `Opne`, `Kontakt oss`;
- изображения в карточках и detail sections.

Что не делать:

- не менять главный hero без отдельной задачи;
- не вводить мультиязычность в этой фазе;
- не удалять `public/assets/fresvik`;
- не удалять migration backup-поля;
- не делать Sanity cleanup.

## Этап 6: Финальные Проверки

Локально:

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
LINK_CHECK_BASE_URL=http://127.0.0.1:3060 npm run check:links
```

Production:

```bash
LINK_CHECK_BASE_URL=https://fresvik-produkt2.vercel.app npm run check:links
```

## Acceptance Criteria

Фаза считается закрытой, когда:

- все пункты в `NEXT_PHASE_COMPLETION_PLAN.md` закрыты;
- broken links = 0;
- основные PDF открываются;
- production routes открываются;
- на страницах нет видимого migration/debug текста;
- нет старых Squarespace asset links в видимом HTML без причины;
- изменения закоммичены и отправлены в GitHub.

## Следующий Практический Шаг

Начать с этапа 1:

```text
/dokumentasjon
/monteringsanvisning
/monteringsanvisningar-fresvik-skyveport
```

Главная задача этого шага: убрать видимые старые `/s/...` PDF-ссылки и проверить документы.
