# English Review-Only Pages

Status date: 2026-07-25

These English Sanity documents exist as drafts and are imported to Sanity, but they are intentionally not published by the safe batch. They require manual approval because the content can affect hiring, privacy/legal wording or compliance communication.

2026-07-25 update: draft wording was strengthened to follow the Norwegian source
pages more closely. The pages remain unpublished until the checks below are
completed.

## Summary

| Source page | English route | Sanity draft | Public status | Reason |
| --- | --- | --- | --- | --- |
| `/stillingledig` | `/en/about/careers` | `drafts.page-en-stillingledig` | unpublished | Current vacancy text can become outdated and must be checked before publishing. |
| `/personvernerklering` | `/en/privacy-policy` | `drafts.page-en-personvernerklering` | unpublished | Legal/privacy wording requires manual approval. |
| `/openheitslova` | `/en/transparency-act` | `drafts.page-en-openheitslova` | unpublished | Compliance wording and document set require manual approval. |

## Careers

Source URL: `https://www.fresvik.no/stillingledig`

Draft route: `/en/about/careers`

Check before publishing:

- Confirm whether the vacancy is still active.
- Confirm role title, workplace, contact person, email and phone number.
- Confirm whether application instructions should point to Fresvik Produkt or an external recruiter.
- Remove or update any stale deadline/current-position wording.

## Privacy Policy

Source URL: `https://www.fresvik.no/personvernerklering`

Draft route: `/en/privacy-policy`

Check before publishing:

- Confirm company details: `Fresvik Produkt AS`, `Fresvikvegen 995, 6896 Fresvik`, `post@fresvik.no`, organisation number `NO 922 582 270`.
- Confirm cookie, analytics, newsletter and contact-form wording matches the actual new website setup.
- Confirm access, correction and deletion rights wording is legally acceptable in English.
- Confirm no Norwegian legal nuance was simplified too aggressively.

## Transparency Act

Source URL: `https://www.fresvik.no/openheitslova`

Draft route: `/en/transparency-act`

Check before publishing:

- Confirm the English wording around the Norwegian Transparency Act.
- Confirm document links point to the latest approved files.
- Confirm the following local document URLs are correct:
  - `/assets/fresvik/documents/openheitslova-aktsemdvurderingar-2025.pdf`
  - `/assets/fresvik/documents/openheitslova-rutine-plikter-2025.pdf`
  - `/assets/fresvik/documents/openheitslova-utgreiing-2025-signert.pdf`
- Confirm the Lovdata external link is appropriate for the English page.

## Publish Commands

Keep using the safe publish batch for normal content:

```bash
npm run seed:sanity:en:publish:safe
```

Only publish all English documents after these review-only pages are approved:

```bash
npm run seed:sanity:en:publish -- --batch=all
npm run seed:sanity:en:publish -- --batch=all --apply
```
