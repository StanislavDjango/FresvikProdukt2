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

Stop design/UI polishing for now.

The current goal is to move old Fresvik content into the new project as quickly
and clearly as possible, creating a full content skeleton:

- all old pages;
- all old URLs;
- all redirects;
- all product/service/document/support/company pages;
- all available text;
- all photos;
- all PDFs and documents;
- all internal and external links;
- clear TODO markers where data is missing or uncertain.

The first goal is not final CMS elegance. The first goal is to get all
information into the project so we can work with it.

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

Do not delete local assets now.

## Important Files

Read these before doing work:

- `FAST_CONTENT_SKELETON_PLAN.md`
- `MIGRATION_REPORT.md`
- `CONTENT_MIGRATION_PLAN.md`
- `TRANSFER_HANDOFF.md`
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

1. Complete fast content skeleton.
2. Build/update asset manifest and status.
3. Add quick checks for assets and links.
4. Upload assets to Sanity after the skeleton is complete.
5. Generate `migratedContent.withAssets.ndjson`.
6. Only after that improve schemas, templates, and design.

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

When finishing a migration step, report:

- what old URLs/pages were covered;
- what content was added;
- what images/PDFs were found;
- what remains `TODO` or `needs-review`;
- what checks passed;
- whether anything still uses local asset paths.

Keep reports short but concrete.
