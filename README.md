# Fresvik Next

Modern Next.js front end for Fresvik Produkt.

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

Open `http://localhost:3000/kontakt`.

## Sanity

Copy `.env.example` to `.env.local` and fill in the Sanity project id when the
real CMS project is created:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-30
```

The Studio route is available at `/studio`.

## Verification

```bash
npm run lint
npm run build
```

## Deployment

Vercel is the simplest target for this stack. Import the repository, set the
project root to `fresvik-next`, add the Sanity environment variables, and deploy.

A traditional server is also possible, but it needs Node.js, a process manager
such as PM2 or systemd, reverse proxy configuration, HTTPS certificates, and
environment variables. For this project, Vercel is the cleaner first release
path unless there is a strict hosting requirement.
