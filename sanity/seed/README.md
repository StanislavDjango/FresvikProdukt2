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

The migrated seed keeps local asset references in temporary fields:

- `migratedImagePath` for images under `public/assets/fresvik/images/...`
- `localPath` for documents under `public/assets/fresvik/documents/...`

These fields are intended as a bridge before files are uploaded as managed
Sanity assets.
