<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Fresvik Project Instructions For Codex

## Current Mission

We are rebuilding `https://www.fresvik.no/` as a modern Next.js/Sanity project.
The current priority is **fast content migration**, not design polish.

Build the complete content skeleton first:

- all old URLs represented as pages, redirects, or explicit TODO/partial pages;
- all available page text migrated with source URLs;
- all images, PDFs, documents, and links captured with source/original URLs;
- local files under `public/assets/fresvik` used only as temporary migration cache;
- missing or uncertain content marked clearly as `TODO`, `partial`, `missing`, or `needs-review`.

Do not spend time redesigning UI unless a small component change is required to show migrated content.

## Read First

Before starting migration work, read:

1. `CODEX_PROJECT_BRIEF.md`
2. `FAST_CONTENT_SKELETON_PLAN.md`
3. `MIGRATION_REPORT.md`
4. `CONTENT_MIGRATION_PLAN.md`
5. `TRANSFER_HANDOFF.md`

## Working Directory

On the Linux workstation, work here:

```bash
/home/stas/Norskkurs/fresvik-next
```

Use Node 22 through `nvm`:

```bash
source ~/.nvm/nvm.sh
nvm use
```

## Verification

Use quick checks while collecting content:

```bash
npm run check:migration
```

When asset checks exist:

```bash
npm run check:assets
```

At the end of a content migration phase, run:

```bash
npm run build
npm run check:migration
npm run check:links
```

Avoid heavy visual checks during the fast content skeleton phase unless a visual regression is the actual task.

## Do Not Break

- `/kontakt`
- `/studio`
- Sanity env wiring
- Vercel deployment assumptions
- GitHub SSH workflow
- existing local assets under `public/assets/fresvik`

Do not delete local assets until Sanity asset upload and verification are complete.
