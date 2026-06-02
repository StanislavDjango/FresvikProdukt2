# MIGRATION REPORT

Status after the first implementation pass for the Fresvik Produkt public
content migration.

## Completed in this pass

- Added the migration plan in `CONTENT_MIGRATION_PLAN.md`.
- Added shared site navigation with real internal URLs and no placeholder
  `href="#"` menu links.
- Added shared layout components:
  - `Header`
  - `Footer`
  - `SiteShell`
- Added base UI components:
  - `Container`
  - `SectionHeader`
  - `Button`
  - `Card`
  - `CTASection`
- Replaced the home redirect with a real modern home page.
- Added generated content pages for the planned public URL structure:
  - `/produkt`
  - `/produkt/fresvik-pir-panel`
  - `/produkt/fresvik-pur-panel`
  - `/produkt/kjole-fryseportar`
  - `/produkt/kjole-frysedorer`
  - `/produkt/fasadepanel`
  - `/tilleggsutstyr`
  - `/tenester`
  - `/tenester/montasje`
  - `/tenester/leveranse`
  - `/tenester/service-reservedeler`
  - `/dokumentasjon`
  - `/monteringsanvisning`
  - `/kundeservice/faq`
  - `/referansar`
  - `/om-oss`
  - `/firmainfo`
  - `/tilsette`
  - `/aktuelt`
  - `/stillingledig`
  - `/personvernerklering`
  - `/openheitslova`
- Kept `/kontakt` connected to Sanity and removed its duplicate local
  header/footer.
- Updated `sitemap.ts` so the main public routes are included.
- Added page-level metadata for generated public pages.
- Added Product JSON-LD scaffolding for product routes.
- Audited the old Squarespace sitemap:
  - 105 public URLs found.
  - 325 image entries found.
  - Source: `https://www.fresvik.no/sitemap.xml`.
- Added known legacy routes from the old sitemap so old article, reference,
  accessory, product, support and store URLs can render an under-migration page
  instead of falling into a 404 while exact content is being moved.
- Added a structured old-site inventory for:
  - 26 news/article URLs under `/aktuelt`.
  - 23 reference project URLs under `/referansar`.
  - 6 product URLs under `/produkt`.
  - 3 service URLs under `/tenester`.
  - 3 documentation/mounting URLs.
  - 12 accessory/store/other-product URLs.
  - 5 support/customer-segment URLs.
  - 12 FAQ questions from `/kundeservice/faq`.
  - 14 employee/contact entries from `/tilsette`.
  - 4 Openheitslova document/external links.
  - image URLs and alt/caption text where the old sitemap exposed them.
- Updated `/aktuelt` and `/referansar` to show real migrated sitemap cards
  instead of empty TODO-only sections.
- Updated `/produkt`, `/tenester`, `/dokumentasjon`, `/monteringsanvisning`
  and `/tilleggsutstyr` with real sitemap-driven cards and image links.
- Individual old news/reference URLs now reuse the inventory title, date and
  image when the old sitemap exposed them.
- Individual old product/service/document/accessory/support URLs also reuse the
  inventory title, date and image where available.
- Connected old Squarespace image URLs through `next/image` with an explicit
  remote image allowlist for `images.squarespace-cdn.com`.
- Added Sanity schemas for the migration model:
  - `siteSettings`
  - `page`
  - `product`
  - `service`
  - `documentFile`
  - `employee`
  - `referenceProject`
  - `newsArticle`
  - `faqItem`
- Updated `/kundeservice/faq` with the extracted old FAQ questions. The old
  answers were not safely extracted, so they remain marked for verification
  instead of being invented.
- Updated `/tilsette` with employee names, roles, phone/mobile, email and
  portrait image URLs found on the old public page.
- Updated `/firmainfo` with verified company text from the old firmainfo page:
  Norwegian producer positioning, Fresvik production, market positioning,
  flexible production, excenter locks and Fresvik/Drammen locations.
- Updated `/openheitslova` with the old page text and links to:
  - `2024-Aktsemdvurderingar-Fresvik-Produkt.pdf`
  - `Fresvik-Produkt-rutine-for-oppfylling-av-plikter-etter-Openheitslova-5e5n.pdf`
  - `2024-Utgreiing-signert.pdf`
  - Lovdata Openheitslova page
- Added external-link handling for content cards so PDF/Lovdata links open as
  normal external links instead of internal Next routes.
- Replaced placeholder product sections with verified old-site content for:
  - `/produkt/fresvik-pir-panel`
  - `/produkt/fresvik-pur-panel`
  - `/produkt/kjole-fryseportar`
  - `/produkt/kjole-frysedorer`
  - `/produkt/fasadepanel`
- Added technical data found on the old product pages for PIR/PUR panels,
  including thickness, density, weight, U-values, temperature range and flexible
  module dimensions.
- Added old-site service content for:
  - `/tenester/montasje`
  - `/tenester/leveranse`
  - `/tenester/service-reservedeler`
- Added document download links found on the old documentation and mounting
  instruction pages, including SINTEF, leveringsbetingelser, sentral
  godkjenning, ytelseserklæring and mounting PDFs.
- Updated `/tilleggsutstyr` with old-site accessory intro text, extracted
  accessory descriptions and article numbers for common reserved parts.
- Old `/andre-produkter/...` accessory URLs now reuse extracted accessory copy
  in their migration cards when the old page text was safely available.
- Added full content pages for old customer/support URLs:
  - `/kjolerom-fryserom-butikk`
  - `/kjolerom-fryserom-offshore`
  - `/kjolerom-fryserom-storkjokken`
  - `/transportskade`
- Added verified old-site copy for the customer segments and transport damage
  procedure, including total-package delivery for stores, maritime/offshore
  approval notes, storkjøkken material/cleaning notes, and transport damage
  reporting steps.
- Added verified summary copy for the first batch of detailed news and
  reference pages:
  - `/aktuelt/samaneh-shakeri-ny-teknisk-sjef`
  - `/aktuelt/ny-teknisk-teiknar-havard-berdal`
  - `/aktuelt/john-bothun-blir-pensjonist`
  - `/referansar/fryserom-baza-fredrikstad`
  - `/referansar/historisk-leveranse-pir-panel-spar-lund-torv`
  - `/referansar/bjerkreim-legekontor-vikesaa`
  - `/referansar/bunnpris-hammerfest`
  - `/referansar/kjolerom-kjoledor-bunnpris-volda`
- `/aktuelt`, `/referansar` and the corresponding legacy detail pages now use
  these extracted summaries instead of generic migration placeholder text where
  available.
- Added a second verified summary batch for:
  - `/aktuelt/ein-investering-for-henga-med-i-tidanbsp`
  - `/aktuelt/agnar-er-snart-pensjonistnbsp`
  - `/referansar/fryserom-coop-obs-alnabru`
  - `/referansar/vik-helse-og-omsorgssenter`
  - `/referansar/fryse-og-kjolerom-kiwi-otta`
  - `/referansar/nye-leveransar-til-rema-1000-ya-i-larvik`
  - `/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark`
- `/aktuelt/to-ledige-stillingar-i-haust` was checked, but the automatic text
  extraction only returned minimal author/link noise, so it remains marked for
  later verification instead of being invented.
- Added a third verified summary batch for:
  - `/aktuelt/vi-er-blitt-sertifisert-miljofyrtarn`
  - `/referansar/spesialloysing-torkerom-drageboden-kaupanger`
  - `/referansar/omfattande-leveranse-til-bakehuset-trondheim`
  - `/referansar/fryseromsportar-til-rema-1000-i-narvik`
  - `/referansar/fryse-og-kjolerom-til-sogn-frukt-og-gront`
  - `/referansar/fryserom-fryseport-rentokil`
- `/aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv` and
  `/aktuelt/fryse-og-kjlerom-til-sogn-frukt-og-grnt` were checked, but the
  automatic extraction did not return reliable body text in this pass.
- Added explicit Next.js redirects for renamed and utility routes:
  - `/produkt/fresvik-panel` -> `/produkt/fresvik-pur-panel`
  - `/startside` -> `/`
  - `/send-foresporsel` -> `/kontakt`
  - `/store` and `/store/p/dr-tiltrekker-diktator` -> `/tilleggsutstyr`
  - `/andre-produkter` and `/andre-produkter/category/:slug*` -> `/tilleggsutstyr`
  - `/referansar/category/:slug*` -> `/referansar`
  - `/produktfoto` -> `/produkt`
  - `/kjolerom-fryserom-offshore-1` -> `/kjolerom-fryserom-offshore`
- Updated sitemap generation so redirected legacy sources, including category
  wildcard routes, are excluded from `/sitemap.xml`.
- Replaced the FAQ placeholder answers with verified answers extracted from
  the old `/kundeservice/faq` page, including PIR/PUR, PVC-gardiner, doors,
  temperature ranges, dimensions and custom-room questions.
- Replaced the `/stillingledig` TODO card with the current old-site seller
  vacancy content, including profile, tasks, location choice, application
  email and contact phone.
- Replaced the `/personvernerklering` placeholder with structured text
  extracted from the old privacy policy page, covering controller details,
  customer data, disclosure, customer register, cookies, newsletter,
  contact form, access/correction/deletion and responsible data processor.
- Downloaded 16 old-site PDF documents into
  `public/assets/fresvik/documents/` and switched product, documentation,
  mounting and Openheitslova document cards from old `www.fresvik.no/s/...`
  links to local `/assets/fresvik/documents/...` links.
- Localized documents now include PIR product/mounting PDFs, port product and
  mounting PDFs, miljø/SINTEF/levering/sentral godkjenning/ytelseserklæring
  PDFs, fryserom/kjølerom/dør mounting PDFs and the Openheitslova documents.
- Downloaded 75 old-site images into
  `public/assets/fresvik/images/migrated/` and switched the migrated old-site
  inventory from `images.squarespace-cdn.com` URLs to local image paths.
- Localized image coverage now includes news, references, product/service
  cards, documentation/support cards, accessories and employee portraits.
- Added shared SEO metadata generation for content pages, including canonical
  URLs, OpenGraph metadata, Twitter card metadata and page-specific image
  selection from migrated local assets.
- Legacy migration-only pages now get `noindex, follow` metadata so old URLs
  stay reachable during migration without encouraging search indexing of
  placeholder content.
- Root and contact metadata now include OpenGraph/Twitter images and richer
  site-level publisher/application metadata.
- Hid migration-only controls from primary public pages so normal visitors no
  longer see `Gammal kjelde`, `Migreringsstatus` or TODO quality-assurance
  panels. These details remain available on legacy migration-only routes.
- Expanded the mobile header menu to include nested navigation links for
  product, service, documentation and company subsections, with a constrained
  scrollable dropdown so the menu remains usable on small screens.
- Replaced the public FAQ card/grid rendering with an accessible accordion on
  `/kundeservice/faq`, using the verified migrated question and answer data.
- Added `scripts/generate-sanity-seed.mjs` and
  `sanity/seed/migratedContent.ndjson` so the migrated public content can be
  imported into Sanity as editable documents instead of living only in static
  TypeScript inventory.
- The migrated Sanity seed currently contains 119 documents: site settings,
  pages, products, services, document files, employees, FAQ items, news
  articles and reference projects.
- Added temporary `migratedImagePath` and `localPath` schema fields to keep
  local `public/assets` references visible in Studio until images/documents are
  uploaded as managed Sanity assets.
- Added another verified old-site content batch for 15 news pages and 8
  reference pages, replacing generic migration text with source-based summaries
  for older articles/projects such as Arne-Olav, fruit-farmer kjølerom, 40-year
  anniversary, Fresvik hengsel, mounting projects, Ruukki facade/takplater,
  port production, Kiwi Skollenborg, Karlsøybruket, Fiskehallen, Celsa Steel,
  Buskerud Storcash, Bjerke, Restauranthuset Malin and Coop Extra Naustdal.
- Promoted the old `/produkt/frysetunnel` route from legacy inventory to a
  full product page, added it to product navigation/public routes/sitemap, and
  migrated verified old-site copy about controlled freezing, PIR-panel
  construction, FoodSafe surfaces, tailored doors and food-industry use cases.
- Regenerated the Sanity seed after adding Frysetunnel; it now contains 120
  documents.
- Promoted `/monteringsanvisningar-fresvik-skyveport` from a legacy route to a
  normal documentation page, added it to documentation navigation/public
  routes/sitemap, and localized six old PDF files for electric Fresvik
  Skyveport/Fermod 5010 documentation.
- Updated the `/monteringsanvisning` copy so it correctly states that mounting
  PDFs are now local files awaiting Sanity asset import, not old Squarespace
  links.
- Regenerated the Sanity seed after adding the electric skyveport documents;
  it now contains 127 documents.
- Updated legacy news/reference detail rendering so old URLs with verified
  migrated summaries now appear as normal public article/reference pages
  without `Gammal kjelde`, `Migreringsstatus` or TODO panels. Legacy URLs
  without reliable migrated text still keep migration status and `noindex`.
- Consolidated all old `/andre-produkter/...` accessory/detail/category URLs
  into the new `/tilleggsutstyr` structure with a permanent wildcard redirect,
  so old links stay valid without exposing redundant legacy accessory pages.
- Added two old 2014 reference projects that were still only legacy URLs:
  `/referansar/2014/7/8/coop-extra-sogndal` and
  `/referansar/2014/7/8/interfrukt-vrt-strste-prosjekt`.
- Migrated verified source summaries and localized one main image for each of
  those reference projects. The Sanity seed now contains 129 documents.
- Added verified old-site metadata summaries for five remaining news URLs:
  `/aktuelt/to-ledige-stillingar-i-haust`,
  `/aktuelt/fresvik-ein-god-jobb-og-eit-godt-liv`,
  `/aktuelt/fryse-og-kjlerom-til-sogn-frukt-og-grnt`,
  `/aktuelt/ledig-stilling-som-produksjonsmedarbeidar`, and
  `/aktuelt/fasadeprosjekt-for-celsa-steel-service-sotra`.
- `/aktuelt/stor-leveranse-til-buskerud-storcash` was checked again, but the
  old page still exposed no reliable body or description text, so it remains a
  noindex migration TODO instead of invented content.
- Added `npm run check:links`, a reusable internal link checker that reads the
  generated sitemap, crawls internal page links/assets from a running local
  deployment, and fails on 4xx/5xx internal URLs.

## Verification

- `npm run lint` passed.
- `npm run build` passed.
- Build generated 116 app pages, including the new static content routes and
  known legacy routes from the old sitemap.
- Local dev server HTTP check returned `200` for all main public routes listed
  in the migration plan.
- Local dev server HTTP spot-check returned `200` for legacy routes including
  old news, reference, accessory, store, transport damage and mounting
  instruction URLs.
- Local `/aktuelt` and `/referansar` responses include old Squarespace image
  URLs rendered through Next Image.
- `npm run build` still generates 116 app pages after expanding the product,
  service, document and accessory inventory.
- Quick link scan found no menu placeholder links. The remaining `#foresporsel`
  link is an intentional same-page contact anchor.
- `npm run lint` passed after adding FAQ, employee, firmainfo and legal
  inventory.
- `npm run lint` and `npm run build` passed after adding product, service and
  documentation content. Build still generates 116 app pages.
- `npm run lint` passed after adding accessory descriptions and article
  numbers.
- `npm run lint` and `npm run build` passed after adding customer segment and
  transport damage pages.
- `npm run lint` and `npm run build` passed after adding the first news and
  reference summary batch.
- `npm run lint` and `npm run build` passed after adding the second news and
  reference summary batch.
- `npm run lint` and `npm run build` passed after adding the third news and
  reference summary batch.
- `npm run lint` and `npm run build` passed after adding legacy redirects and
  sitemap filtering. Build still generates 116 app pages.
- Local redirect check returned `308` for the explicit legacy redirect set and
  confirmed those redirected sources are no longer present in `/sitemap.xml`.
- `npm run lint` and `npm run build` passed after replacing FAQ, jobs and
  privacy placeholders. Build still generates 116 app pages.
- Local HTTP checks confirmed `/kundeservice/faq`, `/stillingledig` and
  `/personvernerklering` render the newly migrated source content.
- `npm run lint` and `npm run build` passed after localizing PDF documents.
  Build still generates 116 app pages.
- Local HTTP checks confirmed `/dokumentasjon`, `/monteringsanvisning`,
  `/openheitslova`, `/produkt/fresvik-pir-panel` and
  `/produkt/kjole-fryseportar` link to local document URLs, and sampled PDFs
  return `200` with a `%PDF` header.
- `npm run lint` and `npm run build` passed after localizing old-site images.
  Build still generates 116 app pages.
- Local HTTP checks confirmed `/aktuelt`, `/referansar`, `/tilsette`,
  `/tilleggsutstyr`, `/produkt` and `/tenester` render local migrated image
  paths and no longer include `images.squarespace-cdn.com` in the HTML.
- `npm run lint` and `npm run build` passed after adding shared SEO metadata.
  Build still generates 116 app pages.
- Local metadata and internal-link scan confirmed key public pages have
  description, OpenGraph title and OpenGraph image metadata, a legacy migration
  URL has `noindex`, and 86 sampled internal URLs return an expected HTTP
  status.
- `npm run lint` and `npm run build` passed after hiding public migration
  details. Local HTTP checks confirmed main public pages no longer render
  migration labels while a legacy migration page still shows migration status
  and keeps `noindex`.
- `npm run build` and `npm run lint` passed after the mobile navigation update.
  A local DOM/internal-link smoke check confirmed nested mobile menu links are
  present, public migration labels remain hidden and 87 sampled internal URLs
  return an expected HTTP status.
- `node scripts/generate-sanity-seed.mjs` writes 119 documents to
  `sanity/seed/migratedContent.ndjson`.
- `npm run lint` and `npm run build` passed after adding the migrated Sanity
  seed generator, seed file, asset-path schema bridge fields and seed README.
- `node scripts/generate-sanity-seed.mjs`, `npm run lint` and `npm run build`
  passed after adding the older news/reference summary batch. Build still
  generates 116 app pages.
- `npm run lint` and `npm run build` passed after replacing the public FAQ
  card layout with an accordion.
- Production HTTP smoke check for `/kundeservice/faq` on local port `3024`
  confirmed the built page renders `<details>/<summary>` FAQ items, includes
  migrated FAQ text, and does not expose migration-only labels.
- `node scripts/generate-sanity-seed.mjs`, `npm run lint` and `npm run build`
  passed after adding `/produkt/frysetunnel`.
- Production HTTP smoke check for `/produkt/frysetunnel` on local port `3025`
  confirmed the title, migrated source text, navigation link, metadata and
  sitemap entry are present, with migration-only labels hidden.
- `node scripts/generate-sanity-seed.mjs`, `npm run lint` and `npm run build`
  passed after adding `/monteringsanvisningar-fresvik-skyveport` and its local
  PDFs.
- Production HTTP smoke check for `/monteringsanvisningar-fresvik-skyveport`
  on local port `3026` confirmed the page title, migrated PDF links, sitemap
  entry and hidden migration labels. A sampled local PDF returned `200` with a
  `%PDF` header.
- `npm run lint` and `npm run build` passed after updating legacy
  news/reference detail rendering.
- Production HTTP smoke check on local port `3027` confirmed a migrated old
  news URL renders public content without migration labels, while an
  unverified old news URL still keeps migration TODO labels and `noindex`.
- `npm run lint` and `npm run build` passed after consolidating old
  `/andre-produkter/...` URLs.
- Production HTTP smoke check on local port `3028` confirmed sampled old
  accessory detail/category URLs return `308 -> /tilleggsutstyr`, `/tilleggsutstyr`
  returns `200`, and those old accessory URLs are absent from `/sitemap.xml`.
- `node scripts/generate-sanity-seed.mjs`, `npm run lint` and `npm run build`
  passed after adding the two old 2014 reference projects.
- Production HTTP smoke check on local port `3030` confirmed `/referansar`
  lists Coop Extra Sogndal and Interfrukt, both old detail URLs render migrated
  text and local images, and neither exposes migration labels.
- `node scripts/generate-sanity-seed.mjs`, `npm run lint` and `npm run build`
  passed after adding the remaining verified news metadata summaries.
- Production HTTP smoke check on local port `3031` confirmed sampled newly
  migrated news URLs render public summary text without migration labels, while
  the still-unverified Buskerud Storcash news URL keeps TODO labels and
  `noindex`.
- `npm run lint` and `npm run build` passed after adding the reusable internal
  link checker.
- `LINK_CHECK_BASE_URL=http://127.0.0.1:3032 npm run check:links` passed
  against a production local server, checking 81 pages and 117 internal URLs
  from the generated sitemap and rendered HTML.
- Added `npm run check:visual`, a reusable headless browser smoke check that
  captures desktop and mobile screenshots for the main public pages and fails
  if primary pages expose migration/TODO labels or miss core header, footer,
  main and H1 landmarks.
- `npm run lint`, `npm run build`,
  `LINK_CHECK_BASE_URL=http://127.0.0.1:3037 npm run check:links`, and
  `VISUAL_CHECK_BASE_URL=http://127.0.0.1:3037 VISUAL_CHECK_BROWSER_BASE_URL=http://172.25.109.121:3037 npm run check:visual`
  passed after adding the visual smoke checker and mobile overflow hardening.
  The Windows headless Edge CLI screenshots are useful smoke artifacts, but a
  final mobile design approval should still be done in an interactive browser
  or a DevTools-based viewport check.
- Strengthened `npm run check:visual` with a Chrome DevTools Protocol path
  that can enforce real desktop/mobile viewport metrics, including
  `scrollWidth <= innerWidth`, when the browser DevTools endpoint is reachable.
  On the current WSL + Windows Edge setup, the script safely falls back to
  browser CLI screenshot/DOM smoke checks and prints that CDP overflow checks
  were skipped.
- `npm run lint` and
  `VISUAL_CHECK_BASE_URL=http://127.0.0.1:3038 VISUAL_CHECK_BROWSER_BASE_URL=http://172.25.109.121:3038 VISUAL_CHECK_CDP_PORT=9238 npm run check:visual`
  passed after adding the CDP/fallback visual check flow.
- Added verified old-site accessory summaries for `Skipsdører` and
  `Industri slagdør`, replacing the remaining generic accessory card copy on
  `/tilleggsutstyr` with source-based descriptions while keeping the old
  `/andre-produkter/...` URLs consolidated into the new accessories page.
- `node scripts/generate-sanity-seed.mjs`, `npm run lint`, `npm run build`,
  `LINK_CHECK_BASE_URL=http://127.0.0.1:3040 npm run check:links`, and
  `VISUAL_CHECK_BASE_URL=http://127.0.0.1:3040 VISUAL_CHECK_BROWSER_BASE_URL=http://172.25.109.121:3040 VISUAL_CHECK_CDP_PORT=9240 npm run check:visual`
  passed after the accessory copy update. A production HTML smoke check
  confirmed `/tilleggsutstyr` renders the new `Skipsdører` and
  `Industri slagdør` text and no longer exposes the generic accessory fallback
  copy.
- Added `npm run check:migration`, a local migration audit that verifies
  `/assets/fresvik/...` references in source data and the Sanity seed exist in
  `public/`, checks local PDFs start with `%PDF`, rejects old Squarespace asset
  hosts, and fails on placeholder `href="#"` links. The first run passed for 98
  local Fresvik asset references.
- `node scripts/generate-sanity-seed.mjs`, `npm run check:migration`,
  `npm run lint`, `npm run build`,
  `LINK_CHECK_BASE_URL=http://127.0.0.1:3041 npm run check:links`, and
  `VISUAL_CHECK_BASE_URL=http://127.0.0.1:3041 VISUAL_CHECK_BROWSER_BASE_URL=http://172.25.109.121:3041 VISUAL_CHECK_CDP_PORT=9241 npm run check:visual`
  passed after adding the migration asset audit.

## Still TODO

- Continue pulling exact long-form body copy, document titles and alt text from
  the old website where pages still contain TODOs.
- Import `sanity/seed/migratedContent.ndjson` into the live Sanity dataset when
  ready, then move local asset references into real Sanity image/file assets.
- Later import localized images into Sanity assets if editors should manage
  them from Studio instead of `public/assets`.
- Replace remaining TODO migration placeholders on employee and legacy detail
  pages.
- Verify current employee consent/persondata before production domain switch.
- Later import localized Openheitslova PDFs into Sanity assets if documents
  should be managed from Studio instead of `public/assets`.
- Have a responsible person review `/personvernerklering` before production
  domain switch, especially cookie/analytics wording for the new Vercel/Sanity
  stack.
- Later import localized product, service and documentation PDFs into Sanity
  assets if documents should be managed from Studio instead of `public/assets`.
- Finish accessory pages and remaining long-form product/service body copy in
  Sanity.
- Import customer segment images/references and verify marketing claims,
  maritime standards, and transport damage terms against final source documents.
- Continue replacing the few remaining news/reference placeholder body texts
  where the old page still does not expose reliable body text.
- Keep reviewing redirects as more legacy routes are consolidated or deleted.
- Keep running desktop/mobile visual checks after each major design/content
  batch and inspect saved screenshots for polish, spacing and image framing.
