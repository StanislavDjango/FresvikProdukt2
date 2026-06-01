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

## Still TODO

- Continue pulling exact long-form body copy, document titles and alt text from
  the old website where pages still contain TODOs.
- Import or seed real Sanity documents for the new schemas.
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
- Continue replacing remaining news/reference placeholder body text with
  verified article/project summaries or full Sanity documents.
- Keep reviewing redirects as more legacy routes are consolidated or deleted.
- Run visual browser checks on desktop and mobile. The in-app browser connection
  failed during this pass because the local Node browser bridge could not start.
