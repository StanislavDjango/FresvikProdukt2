# Manual page migration audit: /tenester

Source URL: https://www.fresvik.no/tenester
Checked: 2026-06-13
Local route: /tenester
Status: redirect

## Rule

The live donor URL `https://www.fresvik.no/tenester` does not expose a standalone content page. A direct request returns `302` with `Location: /tenester/montasje`. Because of that, this menu item is closed as a redirect-only route, not as a migrated page.

## HTTP evidence

```text
HTTP/2 302
location: /tenester/montasje
server: Squarespace
```

## Coverage

| Old route | New route | Status | Notes |
| --- | --- | --- | --- |
| `/tenester` | `/tenester/montasje` | redirect | Matches live donor behavior observed on 2026-06-13. |
| `/tenester/montasje` | `/tenester/montasje` | migrated | See `MANUAL_PAGE_AUDITS/montasje.md`. |
| `/tenester/leveranse` | `/tenester/leveranse` | migrated | See `MANUAL_PAGE_AUDITS/leveranse.md`. |
| `/tenester/service-reservedeler` | `/tenester/service-reservedeler` | migrated | See `MANUAL_PAGE_AUDITS/service-reservedeler.md`. |

## Verification

- `curl -I -s https://www.fresvik.no/tenester`
- Result: `302`, `location: /tenester/montasje`.

## Notes

- The local route is represented by a Next.js redirect rule in `src/data/redirects.ts`.
- The existing local content skeleton for `/tenester` remains in source data for menu/index context, but runtime requests are redirected before page rendering.
