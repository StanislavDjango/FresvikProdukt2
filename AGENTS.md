<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Fresvik Project Instructions For Codex

## Current Mission

We are rebuilding `https://www.fresvik.no/` as a modern Next.js/Sanity project.
The fast migration phase is largely complete: content, images, PDF/documents,
redirects, Sanity runtime, and production checks have been built around the old
site inventory.

The current priority is **final cleanup and controlled page polish**:

- keep old URLs represented as pages or redirects;
- preserve migrated text, images, PDFs/documents, and links;
- keep source/original URL traceability in migration data and asset manifests;
- remove visible migration/debug labels from public pages;
- improve page presentation only where it helps display already migrated content;
- do not delete local migration assets or backup fields until the cleanup plan
  allows it.

## Read First

Before starting project work, read:

1. `CODEX_PROJECT_BRIEF.md`
2. `NEXT_PHASE_COMPLETION_PLAN.md`
3. `CLEANUP_PLAN.md`
4. `MIGRATION_AUDIT.md`
5. `ASSET_MIGRATION_STATUS.md`
6. `PRODUCTION_RUNTIME_VERIFICATION.md`

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

Use quick checks while changing migrated content:

```bash
npm run check:migration
```

When asset checks exist:

```bash
npm run check:assets
```

At the end of a page/design cleanup batch, run:

```bash
npm run build
npm run check:migration
npm run check:links
```

Avoid heavy visual checks unless a visual regression is the actual task.

## Do Not Break

- `/kontakt`
- `/studio`
- Sanity env wiring
- Vercel deployment assumptions
- GitHub SSH workflow
- existing local assets under `public/assets/fresvik`

Do not delete local assets until Sanity asset upload and verification are complete.
