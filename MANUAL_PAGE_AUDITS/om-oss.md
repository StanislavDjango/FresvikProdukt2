# Manual page migration audit: /om-oss

Source URL: https://www.fresvik.no/om-oss
Checked: 2026-06-14
Local route: /om-oss
Status: redirect

## Finding

The old donor URL `https://www.fresvik.no/om-oss` returns `302` with `location: /firmainfo`.

## Local handling

The new project mirrors the donor behavior with a redirect:

- `/om-oss` -> `/firmainfo`

The actual page content is audited and migrated under `MANUAL_PAGE_AUDITS/firmainfo.md`.

## Verification

- `curl -I -L -s https://www.fresvik.no/om-oss`
- Donor result: `302 location: /firmainfo`, then `200`.
