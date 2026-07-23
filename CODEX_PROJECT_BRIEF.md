# Codex Project Brief

Use this file as the starting context for any new Codex topic/session in VS Code.

## Project

Fresvik Produkt website rebuild.

Old donor site:

```text
https://www.fresvik.no/
```

New project:

```text
/home/stas/Norskkurs/fresvik-next
```

GitHub:

```text
StanislavDjango/FresvikProdukt2
```

## Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Sanity Studio and `next-sanity`
- Vercel deployment
- GitHub SSH workflow

The project uses Node 22. Run:

```bash
source ~/.nvm/nvm.sh
nvm use
```

## Main Goal Right Now

The migration skeleton and Sanity runtime are in place. The current goal is to
finish the project carefully: keep migrated content intact, remove migration
leftovers from public pages, clean obsolete planning files, and polish page
layouts only where the already migrated information needs clearer presentation.

## Important Rule

Every migrated item should preserve its source:

- page text should keep `sourceUrl`;
- images should keep `originalUrl`;
- PDFs/documents should keep `originalUrl`;
- unclear data must be marked `TODO`, `partial`, `missing`, or `needs-review`.

Do not invent content.

## Asset Policy

`public/assets/fresvik` is temporary migration cache only.

Local assets are allowed during fast migration because they help us build the
complete skeleton quickly. They are not the final storage.

Final goal:

- upload images to Sanity image assets;
- upload PDFs/documents to Sanity file assets;
- generate Sanity asset references;
- only later remove temporary local assets from GitHub.

Do not delete local assets until the cleanup plan confirms that production,
redirects, Sanity files, and source-traceability exports no longer need them.

## Important Files

Read these before doing work:

- `NEXT_PHASE_COMPLETION_PLAN.md`
- `CLEANUP_PLAN.md`
- `MIGRATION_AUDIT.md`
- `ASSET_MIGRATION_STATUS.md`
- `PRODUCTION_RUNTIME_VERIFICATION.md`
- `src/data/legacyRoutes.ts`
- `src/data/pages.ts`
- `src/data/oldSiteInventory.ts`
- `sanity/seed/migratedContent.ndjson`

Asset folders:

- `public/assets/fresvik/images`
- `public/assets/fresvik/documents`
- `public/assets/fresvik/logos`

## Existing Routes To Protect

- `/`
- `/kontakt`
- `/studio`
- `/produkt`
- `/tenester`
- `/dokumentasjon`
- `/monteringsanvisning`
- `/kundeservice/faq`
- `/om-oss`
- `/firmainfo`
- `/tilsette`
- `/aktuelt`
- `/referansar`
- `/personvernerklering`
- `/openheitslova`

## Current Direction

Work in phases:

1. Keep production and Sanity runtime stable.
2. Finish remaining page-by-page cleanup from `NEXT_PHASE_COMPLETION_PLAN.md`.
3. Remove only obsolete public migration labels and duplicate presentation blocks.
4. Keep `public/assets/fresvik` until `CLEANUP_PLAN.md` acceptance criteria pass.
5. After source-traceability export and production verification, plan final asset
   cache/backup-field cleanup.

## Useful Commands

```bash
cd ~/Norskkurs/fresvik-next
source ~/.nvm/nvm.sh
nvm use
npm run dev -- --hostname 0.0.0.0
npm run build
npm run check:migration
npm run check:links
git status --short --branch
```

## How To Report Progress

When finishing a cleanup step, report:

- what pages were touched;
- what public migration leftovers were removed;
- what assets/PDFs/links were verified;
- what remains risky or unresolved;
- what checks passed;
- whether anything still uses local asset paths.

Keep reports short but concrete.
