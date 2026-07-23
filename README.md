# Fresvik Next

Modern Next.js/Sanity front end for Fresvik Produkt.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity Studio and `next-sanity`
- React Hook Form + Zod
- Lucide icons

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Sanity

Copy `.env.example` to `.env.local` and fill in the Sanity project settings:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-30
```

The Studio route is available at `/studio`. Runtime pages read migrated content
from Sanity, with local migration data kept as backup/source traceability.

To regenerate the import-ready seed after content or asset changes:

```bash
npm run assets:seed
```

Do not remove `public/assets/fresvik` until `CLEANUP_PLAN.md` is complete.

## Verification

```bash
npm run lint
npm run build
npm run check:migration
npm run check:assets
```

## Deployment

Vercel is the simplest target for this stack. Import the repository, set the
project root to `fresvik-next`, add the Sanity environment variables, and deploy.

A traditional server is also possible, but it needs Node.js, a process manager
such as PM2 or systemd, reverse proxy configuration, HTTPS certificates, and
environment variables. For this project, Vercel is the cleaner first release
path unless there is a strict hosting requirement.
