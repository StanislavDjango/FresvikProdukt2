# Fast Content Skeleton Plan

## Main Goal

Stop design and UI work for now.

The current priority is to migrate the old Fresvik site content and assets as
quickly and clearly as possible from `https://www.fresvik.no/` into the new
Next.js/Sanity project.

The goal of this phase is not perfect design, perfect schemas, or final asset
hosting. The goal is to build a complete content skeleton that contains all
available pages, links, text, photos, PDFs, documents, and source references, so
we can continue working with the full material inside the new project.

## Core Rule

Build the full information structure first. Clean Sanity models, final asset
hosting, templates, and design come after the content skeleton is complete.

## What Must Be Preserved

For every migrated text, image, PDF, document, and external link, preserve the
source:

- `sourceUrl` for page text.
- `originalUrl` for images and PDF/document files.
- The old page URL where the content or asset was found.
- The new route where it is used.

If the source is not known, mark it clearly as `TODO` or `unknown`; do not
invent missing data.

## Required Markers

Any incomplete or uncertain migration item must be explicitly marked:

- `TODO`
- `partial`
- `missing`
- `needs-review`

This applies to pages, text blocks, images, PDF files, external links, employee
data, legal text, product claims, and any content copied from unclear sources.

## Temporary Asset Cache

GitHub must not be the final long-term storage for photos and PDFs.

For this phase, local files under `public/assets/fresvik` are allowed as a
temporary migration cache only:

- `public/assets/fresvik/images`
- `public/assets/fresvik/documents`
- `public/assets/fresvik/logos`

Do not delete local assets until all of these are true:

1. Assets have been uploaded to the correct Sanity project/dataset.
2. Sanity asset references have been written into the migrated content.
3. The site has been checked using Sanity references.
4. Production no longer depends on local `localPath` values.
5. We explicitly decide to remove local assets from GitHub in a separate step.

## Phase 1: Full Content Skeleton Fast

Create or verify a complete skeleton for the old site:

- All old URLs are represented in `src/data/legacyRoutes.ts` or redirects.
- Every old URL has one of:
  - a migrated page;
  - a redirect to a relevant new page;
  - a TODO/partial page if content is unavailable.
- All available text is migrated with `sourceUrl`.
- All found images are copied locally and connected to their pages.
- All found PDFs/documents are copied locally and connected to their pages.
- All internal links are mapped to new routes or redirects.
- All external links are preserved and marked with source context.
- All missing/partial content is clearly visible in data and reports.

During this phase, it is acceptable to use `src/data` and local assets directly.
Sanity upload must not slow down the initial content capture.

## Phase 2: Asset Manifest And Status

Create or update an asset manifest:

```text
sanity/seed/assetManifest.json
```

Each asset entry should include:

```json
{
  "originalUrl": "...",
  "localPath": "/assets/fresvik/...",
  "filePath": "public/assets/fresvik/...",
  "assetType": "image",
  "usedBy": ["..."],
  "sourcePages": ["..."],
  "sha256": "...",
  "fileSize": 12345,
  "sanityAssetId": null,
  "sanityReference": null,
  "status": "ready-for-sanity",
  "targetSanityType": "image asset",
  "notes": "..."
}
```

Allowed statuses:

- `local-only`
- `ready-for-sanity`
- `uploaded-to-sanity`
- `missing`
- `unused`
- `duplicate`
- `external-only`
- `needs-review`

Also create or update:

```text
ASSET_MIGRATION_STATUS.md
```

This document should summarize:

- total assets found;
- total images;
- total PDFs/documents;
- total other assets;
- used assets;
- unused assets;
- missing assets;
- duplicate assets;
- ready-for-sanity assets;
- uploaded-to-sanity assets;
- failed or needs-review assets.

## Phase 3: Quick Checks During Collection

Do not disable checks completely, but do not run heavy checks every few minutes.

During collection, run quick checks when useful:

```bash
npm run check:assets
npm run check:migration
```

The quick checks should verify:

- JSON is valid.
- NDJSON is valid.
- `assetManifest.json` has no duplicate `localPath`.
- referenced local files exist.
- known PDFs begin with `%PDF`.
- no unexpected old Squarespace CDN references remain where local copies should
  already exist.
- local assets used by data are present.

Do not run heavy visual checks in this phase unless there is a specific visual
bug to verify.

## Phase 4: End-Of-Phase Checks

At the end of the content skeleton phase, run:

```bash
npm run build
npm run check:migration
npm run check:links
```

If asset checks have been added:

```bash
npm run check:assets
```

The site should build, core routes should work, and migrated files should be
accounted for.

## Phase 5: Sanity Asset Upload

Only after the content skeleton is complete, prepare and run Sanity asset upload.

The upload script should:

- read `sanity/seed/assetManifest.json`;
- support `--dry-run`;
- upload images as Sanity image assets;
- upload PDFs/documents as Sanity file assets;
- save `sanityAssetId` and `sanityReference` back into the manifest;
- skip already uploaded assets;
- avoid duplicates where possible using `sha256`;
- log skipped, uploaded, failed, and needs-review items;
- fail clearly if Sanity project ID, dataset, or token is missing.

Do not overwrite the original migrated content file first. Instead generate:

```text
sanity/seed/migratedContent.withAssets.ndjson
```

Keep the original:

```text
sanity/seed/migratedContent.ndjson
```

as the backup and baseline.

## Phase 6: Later Cleanup

After successful Sanity upload and verification:

- update render code to prefer Sanity asset references;
- keep `migrationBackupLocalPath` temporarily where useful;
- verify production no longer depends on local files;
- remove temporary local assets from GitHub only as a separate, explicit task.

## Do Not Do In This Phase

- Do not redesign pages.
- Do not polish UI components unless required to display migrated content.
- Do not rebuild templates unless the current template blocks content migration.
- Do not delete local assets.
- Do not overwrite `migratedContent.ndjson` without a verified generated copy.
- Do not invent missing content.

## Final Report Requirements

At the end of this phase, report:

- how many old URLs are represented;
- how many pages are migrated;
- how many pages are partial/TODO;
- how many images were found;
- how many PDFs/documents were found;
- how many assets are used;
- how many assets are unused;
- how many assets are missing;
- how many assets are duplicates;
- how many assets are ready for Sanity;
- how many assets were uploaded to Sanity, if upload was run;
- how many failed or need review;
- which pages still use `localPath` instead of Sanity references;
- which checks passed;
- what remains before local assets can be removed from GitHub.

## Definition Of Done For This Phase

- All known old URLs are migrated, redirected, or explicitly marked TODO.
- All available page text has a `sourceUrl`.
- All found images and PDFs/documents have source information.
- Local assets are connected to pages as temporary migration cache.
- Missing/partial content is clearly marked.
- Asset manifest exists or is ready to be generated.
- `npm run build` passes.
- `npm run check:migration` passes.
- `npm run check:links` passes at the end of the phase.
- No design/UI work was mixed into the migration unless it was required to show
  content.
