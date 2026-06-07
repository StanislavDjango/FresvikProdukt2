# Fresvik Transfer Handoff

This file is for moving the Fresvik Next/Sanity project to another computer and
for quickly bringing another Codex/VS Code session into the project context.

## What To Copy

Copy the whole project folder:

```bash
/home/strengerst/Norskkurs/fresvik-next
```

From Windows, the same folder is visible as:

```text
\\wsl$\Ubuntu\home\strengerst\Norskkurs\fresvik-next
```

Keep the hidden `.git` folder. It contains the Git history and connection to the
GitHub repository. Also copy `.env.local` separately if it exists on the old
machine, because it contains local Sanity/Vercel configuration and is normally
not committed to Git.

Do not rely on `node_modules` during transfer. It can be copied, but the cleaner
Linux setup is to reinstall dependencies with `npm install`.

## Recommended Location On New Linux Computer

Put the project here:

```bash
mkdir -p ~/Norskkurs
cp -a /path/to/fresvik-next ~/Norskkurs/fresvik-next
cd ~/Norskkurs/fresvik-next
```

If using Git instead of copying files:

```bash
mkdir -p ~/Norskkurs
cd ~/Norskkurs
git clone git@github.com:StanislavDjango/FresvikProdukt2.git fresvik-next
cd fresvik-next
```

Then restore `.env.local` from the old machine if needed.

## Required Tools

- Linux shell
- Git
- Node.js 22.x
- npm 10 or newer
- VS Code or Cursor/Codex-enabled editor

Check versions:

```bash
node -v
npm -v
git --version
```

The project `package.json` declares:

```json
"engines": {
  "node": "22.x",
  "npm": ">=10"
}
```

## First Setup Commands

Run from the project root:

```bash
cd ~/Norskkurs/fresvik-next
npm install
npm run lint
npm run build
npm run dev
```

Open:

```text
http://localhost:3000
http://localhost:3000/kontakt
http://localhost:3000/studio
```

If port `3000` is busy, Next.js may choose another port. Use the URL printed in
the terminal.

## Environment Variables

There is an `.env.example` file with the public Sanity variables:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-30
```

Create or restore `.env.local`:

```bash
cp .env.example .env.local
```

Then fill the real values if Sanity should be connected. Without Sanity values,
the site should still use local fallback content for some pages, but CMS editing
and live Sanity reads will not be fully active.

Do not commit private tokens. Vercel tokens, GitHub tokens, and Sanity auth
tokens should stay outside Git.

## Current Project Status

This is a modern rebuild of `https://www.fresvik.no/` using:

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Sanity Studio and `next-sanity`
- Vercel deployment
- GitHub SSH workflow

Existing important routes include:

- `/`
- `/kontakt`
- `/studio`
- `/produkt`
- `/produkt/fresvik-pir-panel`
- `/produkt/fresvik-pur-panel`
- `/produkt/kjole-fryseportar`
- `/produkt/kjole-frysedorer`
- `/produkt/fasadepanel`
- `/produkt/frysetunnel`
- `/tilleggsutstyr`
- `/tenester`
- `/dokumentasjon`
- `/monteringsanvisning`
- `/kundeservice/faq`
- `/om-oss`
- `/firmainfo`
- `/tilsette`
- `/aktuelt`
- `/stillingledig`
- `/referansar`
- `/personvernerklering`
- `/openheitslova`

Important project documents:

- `CONTENT_MIGRATION_PLAN.md` - migration plan from the old site
- `MIGRATION_REPORT.md` - current migration status and remaining TODOs
- `README.md` - basic setup notes
- `TRANSFER_HANDOFF.md` - this transfer/runbook file

## Verification Commands

Run these before and after moving the project:

```bash
npm run lint
npm run build
npm run check:migration
```

For internal link checks, start the dev server first:

```bash
npm run dev
```

In another terminal:

```bash
LINK_CHECK_BASE_URL=http://127.0.0.1:3000 npm run check:links
```

Visual smoke checks are also available:

```bash
VISUAL_CHECK_BASE_URL=http://127.0.0.1:3000 npm run check:visual
```

Depending on browser availability on the new Linux machine, the visual script
may need Chromium/Chrome/Edge installed.

## Sanity Notes

Sanity files are already present:

- `sanity.config.ts`
- `sanity.cli.ts`
- `src/sanity/env.ts`
- `src/sanity/client.ts`
- `src/sanity/queries.ts`
- `src/sanity/contactPage.ts`
- `sanity/seed/contactPage.ndjson`
- `sanity/seed/migratedContent.ndjson`

Starter import command:

```bash
npx sanity dataset import sanity/seed/contactPage.ndjson production --replace
```

Full migrated content seed exists at:

```bash
sanity/seed/migratedContent.ndjson
```

Import it only when the correct Sanity project/dataset is confirmed.

## Deployment Notes

The project is intended for Vercel first. The GitHub repository is:

```text
StanislavDjango/FresvikProdukt2
```

Normal deploy flow:

1. Push changes to GitHub `main`.
2. Vercel detects the push and deploys.
3. If Sanity variables changed, update them in Vercel Project Settings.
4. Redeploy from Vercel if needed.

Local Git SSH should be tested on the new computer:

```bash
ssh -T git@github.com
git status
git pull
git push
```

If Git asks for credentials over HTTPS, switch the remote to SSH:

```bash
git remote set-url origin git@github.com:StanislavDjango/FresvikProdukt2.git
```

## Notes For The Next Codex Session

Read these files first:

```bash
sed -n '1,220p' MIGRATION_REPORT.md
sed -n '1,220p' CONTENT_MIGRATION_PLAN.md
git status --short
```

Work inside:

```bash
~/Norskkurs/fresvik-next
```

Do not work from a Windows UNC path. On Linux, use normal Linux paths.

Do not break:

- `/kontakt`
- Sanity env wiring
- Vercel deployment
- GitHub SSH workflow
- existing migrated assets under `public/assets/fresvik/`

Current remaining high-level TODOs are expected to be documented in
`MIGRATION_REPORT.md`. In particular, Sanity live import and legal/person data
review should not be marked complete unless they are actually verified.

## Quick Recovery Checklist

If something does not start on the new machine:

1. Confirm you are in `~/Norskkurs/fresvik-next`.
2. Run `node -v`; use Node 22.
3. Run `npm install`.
4. Restore `.env.local` if Sanity is needed.
5. Run `npm run lint`.
6. Run `npm run build`.
7. Run `npm run dev`.
8. Check `MIGRATION_REPORT.md` before continuing migration work.
