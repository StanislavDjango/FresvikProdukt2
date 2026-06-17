# Sanity Runtime Parity Audit

Generated: 2026-06-17T13:47:03.600Z

## Summary

- Audited runtime candidate routes: 23
- Still protected by local fallback: 16
- Already switched to Sanity runtime: 7
- Ready for Sanity runtime: 23
- Still requiring local fallback: 0
- Fallback source: `src/sanity/lib/contentPages.ts localMigrationStructurePaths`

This audit does not change runtime behavior. It checks whether removing a route
from `localMigrationStructurePaths` would lose local migrated text, images,
PDFs/documents, or links.

## Route Parity

| Route | Runtime mode | Status | Local words | Sanity words | Text % | Local images | Sanity images | Local PDFs | Sanity files | Notes |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `/` | local-fallback-protected | ready-for-sanity-runtime | 1136 | 2131 | 100% | 20 | 40 | 2 | 4 | 22 local backup asset ref(s) kept for source traceability |
| `/aktuelt` | local-fallback-protected | ready-for-sanity-runtime | 1493 | 3335 | 100% | 31 | 76 | 2 | 4 | 33 local backup asset ref(s) kept for source traceability |
| `/dokumentasjon` | local-fallback-protected | ready-for-sanity-runtime | 726 | 2141 | 100% | 9 | 16 | 7 | 48 | 36 local backup asset ref(s) kept for source traceability |
| `/firmainfo` | local-fallback-protected | ready-for-sanity-runtime | 792 | 1503 | 100% | 9 | 16 | 2 | 4 | 11 local backup asset ref(s) kept for source traceability |
| `/kundeservice/faq` | local-fallback-protected | ready-for-sanity-runtime | 2123 | 4805 | 100% | 16 | 28 | 2 | 4 | 18 local backup asset ref(s) kept for source traceability |
| `/monteringsanvisning` | local-fallback-protected | ready-for-sanity-runtime | 774 | 1546 | 100% | 19 | 36 | 6 | 14 | 27 local backup asset ref(s) kept for source traceability |
| `/monteringsanvisningar-fresvik-skyveport` | local-fallback-protected | ready-for-sanity-runtime | 738 | 1344 | 100% | 9 | 16 | 8 | 16 | 17 local backup asset ref(s) kept for source traceability |
| `/openheitslova` | local-fallback-protected | ready-for-sanity-runtime | 525 | 937 | 100% | 7 | 14 | 2 | 4 | 9 local backup asset ref(s) kept for source traceability |
| `/personvernerklering` | local-fallback-protected | ready-for-sanity-runtime | 1736 | 3395 | 100% | 7 | 14 | 2 | 4 | 9 local backup asset ref(s) kept for source traceability |
| `/produkt` | local-fallback-protected | ready-for-sanity-runtime | 742 | 1486 | 100% | 29 | 62 | 2 | 4 | 31 local backup asset ref(s) kept for source traceability |
| `/produkt/fasadepanel` | sanity-runtime-switched | ready-for-sanity-runtime | 461 | 553 | 100% | 14 | 28 | 2 | 4 | 16 local backup asset ref(s) kept for source traceability |
| `/produkt/fresvik-pir-panel` | sanity-runtime-switched | ready-for-sanity-runtime | 773 | 1026 | 100% | 12 | 24 | 5 | 8 | 17 local backup asset ref(s) kept for source traceability |
| `/produkt/fresvik-pur-panel` | sanity-runtime-switched | ready-for-sanity-runtime | 675 | 902 | 100% | 12 | 24 | 3 | 6 | 15 local backup asset ref(s) kept for source traceability |
| `/produkt/frysetunnel` | sanity-runtime-switched | ready-for-sanity-runtime | 757 | 832 | 100% | 15 | 28 | 2 | 4 | 17 local backup asset ref(s) kept for source traceability |
| `/produkt/kjole-frysedorer` | sanity-runtime-switched | ready-for-sanity-runtime | 543 | 623 | 100% | 14 | 28 | 2 | 4 | 16 local backup asset ref(s) kept for source traceability |
| `/produkt/kjole-fryseportar` | sanity-runtime-switched | ready-for-sanity-runtime | 636 | 727 | 100% | 13 | 26 | 4 | 8 | 17 local backup asset ref(s) kept for source traceability |
| `/referansar` | local-fallback-protected | ready-for-sanity-runtime | 1812 | 5543 | 100% | 32 | 82 | 2 | 4 | 34 local backup asset ref(s) kept for source traceability |
| `/stillingledig` | local-fallback-protected | ready-for-sanity-runtime | 1132 | 2158 | 100% | 15 | 28 | 2 | 4 | 17 local backup asset ref(s) kept for source traceability |
| `/tenester/leveranse` | local-fallback-protected | ready-for-sanity-runtime | 582 | 1502 | 100% | 11 | 18 | 2 | 4 | 13 local backup asset ref(s) kept for source traceability |
| `/tenester/montasje` | local-fallback-protected | ready-for-sanity-runtime | 665 | 1710 | 100% | 11 | 18 | 2 | 4 | 13 local backup asset ref(s) kept for source traceability |
| `/tenester/service-reservedeler` | local-fallback-protected | ready-for-sanity-runtime | 574 | 1463 | 100% | 9 | 16 | 2 | 4 | 11 local backup asset ref(s) kept for source traceability |
| `/tilleggsutstyr` | sanity-runtime-switched | ready-for-sanity-runtime | 942 | 1026 | 100% | 31 | 60 | 2 | 4 | 33 local backup asset ref(s) kept for source traceability |
| `/tilsette` | local-fallback-protected | ready-for-sanity-runtime | 479 | 1047 | 100% | 21 | 42 | 2 | 4 | 23 local backup asset ref(s) kept for source traceability |

## Blockers

No blockers found.

## Next Actions

- 7 route(s) are already running through Sanity runtime without parity blockers.
- Next step: remove the next small batch from `localMigrationStructurePaths`, run build/link checks, and compare rendered pages before removing the full fallback list.
- Keep `migrationBackupLocalPath`, `migratedImagePath`, and `migrationLocalDocumentPath` until final source-traceability cleanup.
