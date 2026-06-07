# Codex Topic Prompt

Copy this into a new Codex topic in VS Code if you want to start a fresh session.

```text
Ты работаешь в проекте Fresvik Produkt:

/home/stas/Norskkurs/fresvik-next

Это rebuild старого сайта https://www.fresvik.no/ на Next.js App Router + TypeScript + Sanity.

Главная текущая цель: не дизайн, а быстрый полный перенос контента и assets.

Сначала прочитай:
- AGENTS.md
- CODEX_PROJECT_BRIEF.md
- FAST_CONTENT_SKELETON_PLAN.md
- MIGRATION_REPORT.md
- CONTENT_MIGRATION_PLAN.md
- TRANSFER_HANDOFF.md

Главное правило:
быстро построить полный контентный каркас сайта, где все старые URL представлены как страницы, redirects или TODO/partial страницы.

Нужно сохранять sourceUrl/originalUrl для текстов, картинок, PDF и документов.
Если данных нет или они сомнительные, явно ставить TODO, partial, missing или needs-review.
Не выдумывать контент.

public/assets/fresvik пока используется как temporary migration cache.
Локальные assets не удалять до успешного Sanity upload и проверки.

Не заниматься дизайном и UI-полировкой, если это не требуется для отображения контента.
Не запускать тяжелые visual checks во время быстрого сбора.

Работай через Node 22:

source ~/.nvm/nvm.sh
nvm use

Быстрые проверки:

npm run check:migration

Финальные проверки фазы:

npm run build
npm run check:migration
npm run check:links

Перед изменениями проверь:

git status --short --branch

Начни с анализа MIGRATION_REPORT.md и FAST_CONTENT_SKELETON_PLAN.md, затем предложи или сразу выполни следующий самый полезный шаг для завершения полного контентного каркаса.
```
