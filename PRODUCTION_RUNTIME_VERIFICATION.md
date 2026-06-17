# Production Runtime Verification

Generated: 2026-06-17

## Summary

- Production alias: `https://fresvik-produkt2.vercel.app`
- Verified commit: `8e23c09 Fix desktop dropdown hover gap`
- Sanity runtime parity: `23/23` audited routes switched
- Local fallback routes: `0`
- Production internal links: passed
- Production runtime HTML refs: passed
- Production Sanity PDF links: passed

## Checks

| Check | Result |
| --- | --- |
| `curl -I -L https://fresvik-produkt2.vercel.app/` | `200` from Vercel |
| `LINK_CHECK_BASE_URL=https://fresvik-produkt2.vercel.app npm run check:links` | `79` pages, `122` internal URLs, passed |
| Runtime route HTML check | `23` routes checked, `0` failures |
| Runtime local asset refs | `0` `/assets/fresvik` refs on audited runtime pages |
| Runtime Sanity refs | `2066` Sanity CDN refs across audited runtime pages |
| Runtime Sanity PDF refs | `198` Sanity file refs across audited runtime pages |
| Unique Sanity PDF URL HEAD checks | `21` URLs, `0` failures |
| Desktop dropdown gap fix | Present on production; old `translate-y` gap class absent |

## Runtime Routes Checked

The production HTML check used the routes from
`MACHINE_READABLE_SANITY_RUNTIME_PARITY_AUDIT.json`.

Every checked route returned `200`, used Sanity CDN refs, and had no local
`/assets/fresvik` references in the rendered HTML.

## Notes

- `public/assets/fresvik` remains in the repository as temporary migration
  cache and must not be removed in this phase.
- `migrationBackupLocalPath`, `migratedImagePath`, and
  `migrationLocalDocumentPath` remain in Sanity seed data for source
  traceability and must not be removed until a separate cleanup phase.
- Cleanup and design work should start only after this production verification
  point.
