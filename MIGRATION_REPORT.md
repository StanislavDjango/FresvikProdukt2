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

## Still TODO

- Pull exact body copy, images, PDFs, document titles, alt text and legal text
  from the old website.
- Import or seed real Sanity documents for the new schemas.
- Download or import real assets into `public/assets/fresvik/...` or Sanity
  assets. Current news/reference images are linked from the old Squarespace CDN
  and rendered through Next Image.
- Replace TODO migration placeholders on FAQ, employee and legal pages.
- Replace FAQ answer placeholders with verified answers from Sanity/manual
  source.
- Verify current employee consent/persondata before production domain switch.
- Import Openheitslova PDFs into Sanity assets or `public/assets` instead of
  linking to old Squarespace file URLs.
- Provide approved full privacy policy text for `/personvernerklering`; the
  automated old-site extraction only confirmed the page/title, not reliable
  body text.
- Replace product, service, documentation and accessory placeholder body text
  with full body content from old pages.
- Replace news/reference placeholder body text with full article/project body
  content from old pages.
- Add final redirects in `next.config.ts` if old URLs are renamed, especially
  after confirming `/produkt/fresvik-panel` to `/produkt/fresvik-pur-panel`.
- Run visual browser checks on desktop and mobile. The in-app browser connection
  failed during this pass because the local Node browser bridge could not start.
