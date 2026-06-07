# Sanity Seed Files

Seed files are newline-delimited JSON files that can be imported with the
Sanity CLI.

```bash
npx sanity dataset import sanity/seed/contactPage.ndjson production --replace
npx sanity dataset import sanity/seed/migratedContent.ndjson production --replace
```

`migratedContent.ndjson` is generated from the current static migration data:

```bash
node scripts/generate-sanity-seed.mjs
```

Keep `migratedContent.ndjson` as the baseline migration seed. Do not overwrite
it with Sanity asset references. After local assets have been uploaded to
Sanity, generate the asset-backed copy instead:

```bash
npm run assets:seed
```

This writes:

```text
sanity/seed/migratedContent.withAssets.ndjson
```

The migrated seed keeps local asset references in temporary fields:

- `migratedImagePath` for images under `public/assets/fresvik/images/...`
- `localPath` for documents under `public/assets/fresvik/documents/...`

These fields are intended as a bridge before files are uploaded as managed
Sanity assets.

Sanity asset upload is managed through `sanity/seed/assetManifest.json`:

```bash
npm run assets:upload
npm run assets:upload:apply
```

`assets:upload` is a dry run. `assets:upload:apply` performs real uploads and
requires these environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_AUTH_TOKEN`

Local files under `public/assets/fresvik` remain a temporary migration cache
until Sanity upload, seed generation, import, and production verification are
complete.
