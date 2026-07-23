# Cleanup Plan

Generated: 2026-06-17

## Summary

The Fresvik site now runs the audited public content through Sanity runtime on
production. Cleanup must be a separate phase because local migration paths are
still useful as source-traceability evidence and legacy redirects still serve
old PDF URLs.

Do not delete `public/assets/fresvik` or migration backup fields until every
check in this plan passes.

## Housekeeping Completed

2026-07-23:

- Removed ignored local build/check caches: `.next` and `.generated`.
- Removed obsolete root planning/handoff documents that were superseded by this
  cleanup plan and `NEXT_PHASE_COMPLETION_PLAN.md`.
- Kept migration audits, source evidence, Sanity seed files, and
  `public/assets/fresvik` because they are still needed for traceability and
  safe final cleanup.

## Keep For Now

- `public/assets/fresvik`: temporary migration cache and legacy PDF redirect
  target storage.
- `migrationBackupLocalPath`: source-traceability backup after Sanity asset
  references were generated.
- `migratedImagePath`: original local image path used by the seed workflow.
- `migrationLocalDocumentPath`: original local document path used by migrated
  cards and sections.
- `assetManifest.json`: audit trail for original URLs, local paths, hashes,
  Sanity asset IDs, duplicate status, and source pages.

## Cleanup Sequence

1. **Redirect dependency audit**
   - Inspect all redirects that still point to `/assets/fresvik/documents/*`.
   - Decide whether each old `/s/...` URL should continue serving a local file
     or be redirected to a Sanity file URL.
   - Do not remove any local document while a redirect depends on it.

2. **Runtime dependency audit**
   - Verify production HTML for audited runtime routes has `0`
     `/assets/fresvik` refs.
   - Verify `check:links` passes against production.
   - Verify all Sanity file URLs used by production return `200
     application/pdf`.

3. **Source-traceability export**
   - Export a stable JSON/Markdown mapping from `assetManifest.json` before
     deleting any local files or backup fields.
   - The export must preserve `originalUrl`, `localPath`, `sha256`,
     `sanityAssetId`, `sanityReference`, `usedBy`, and `sourcePages`.

4. **Backup field cleanup**
   - Remove backup fields only after the source-traceability export is committed.
   - Regenerate `sanity/seed/migratedContent.withAssets.ndjson`.
   - Import into Sanity and re-run production runtime checks.

5. **Local cache cleanup**
   - Delete only files that have no runtime use and no redirect dependency.
   - Keep any local PDF needed for legacy redirects unless a replacement
     redirect to a Sanity file URL is implemented and verified.
   - Re-run `npm run check:assets`, `npm run check:migration`, `npm run build`,
     and production `check:links`.

## Acceptance Criteria

- Production still returns `200` for audited runtime routes.
- Production runtime pages still have `0` local `/assets/fresvik` refs.
- Legacy document URLs still work.
- Sanity image/file refs remain present.
- A committed source-traceability export exists before any destructive cleanup.
- `public/assets/fresvik` is removed or reduced only after the checks above
  prove no required file is lost.

## Out Of Scope

- Visual redesign.
- Text rewriting.
- Removing source evidence without export.
- Deleting local assets in the same commit as the cleanup plan.
