import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  Mail,
  PhoneCall,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CTASection } from "@/components/CTASection";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ContentPage } from "@/data/pages";
import { sectionIs } from "@/i18n/contentStructure";
import {
  localeFromPathname,
  stripLocalePrefix,
  withLocale,
  type Locale,
} from "@/i18n/config";
import { messages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

type ContentPageViewProps = {
  page: ContentPage;
  hero?: ReactNode;
  locale: Locale;
};

type ContentLabels = (typeof messages)[Locale]["Content"] & {
  locale: Locale;
};

function getContentLabels(locale: Locale = "nn"): ContentLabels {
  return {
    ...messages[locale].Content,
    locale,
  };
}

function localizedContentHref(href: string, labels: ContentLabels) {
  return withLocale(href, labels.locale);
}

function isExternalHref(href: string) {
  return /^(https?:\/\/|mailto:|tel:)/.test(href);
}

function isPdfHref(href: string) {
  return /\.pdf($|\?)/i.test(href);
}

function formatContentDate(value: string | undefined, locale: Locale) {
  if (!value) return undefined;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "nn-NO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function cleanMigrationIntro(text?: string) {
  if (!text) return undefined;

  const normalizedText = text.toLowerCase();
  const migrationMarkers = [
    "gammal side",
    "gammal",
    "gamle",
    "utan omskriving",
    "kjeldetekst",
    "bevart frå",
    "bevart med",
    "source text obtained",
    "source text retrieved",
    "from the old site",
    "from the old page",
    "from the old front page",
    "preserved from the old",
    "retained from the old",
    "migration",
    "migrert",
  ];

  if (migrationMarkers.some((marker) => normalizedText.includes(marker))) {
    return undefined;
  }

  return text;
}

function cleanCardText(text: string | undefined, fallback: string) {
  return cleanMigrationIntro(text) || fallback;
}

function hasPublicMigrationMarker(value?: string) {
  const text = value?.toLowerCase() || "";

  return (
    text.includes("frå gammal") ||
    text.includes("fra gammal") ||
    text.includes("gammal side") ||
    text.includes("gammal sitemap") ||
    text.includes("gamle framside") ||
    text.includes("utan omskriving") ||
    text.includes("kjeldetekst") ||
    text.includes("tekst henta") ||
    text.includes("full tekst") ||
    text.includes("bilde frå") ||
    text.includes("dokumentlenker") ||
    text.includes("lenker frå") ||
    text.includes("migrert innhald") ||
    text.includes("migration extract") ||
    text.includes("source text obtained") ||
    text.includes("source text retrieved") ||
    text.includes("from the old site") ||
    text.includes("from the old page") ||
    text.includes("from the old front page") ||
    text.includes("image from the old") ||
    text.includes("document links from the old") ||
    text.includes("links from the old") ||
    text.includes("full text from the old") ||
    text.includes("preserved from the old") ||
    text.includes("retained from the old") ||
    text.includes("news item from the old") ||
    text.includes("navigation from the old")
  );
}

function certificationDisplayText(
  item: ContentPage["sections"][number]["items"][number],
  labels: ContentLabels,
) {
  const fallbackByTitle =
    labels.locale === "en"
      ? new Map([
          ["Central approval", "Central approval documentation."],
          ["Sentral godkjenning", "Central approval documentation."],
          [
            "SINTEF Technical Approval",
            "SINTEF Technical Approval TG 2135.",
          ],
          [
            "SINTEF Teknisk Godkjenning",
            "SINTEF Technical Approval TG 2135.",
          ],
          ["Poly", "Polyurethane documentation."],
          ["StartBANK", "StartBANK registration."],
          ["Eco-Lighthouse", "Eco-Lighthouse certification."],
          ["Miljøfyrtårn", "Eco-Lighthouse certification."],
          ["CE", "CE documentation."],
        ])
      : new Map([
          ["Sentral godkjenning", "Sentral godkjenning."],
          [
            "SINTEF Teknisk Godkjenning",
            "Ekstern lenke til SINTEF Teknisk Godkjenning TG 2135.",
          ],
          ["Poly", "Polyuretan-dokumentasjon."],
          ["StartBANK", "StartBANK-registrering."],
          ["Miljøfyrtårn", "Miljøfyrtårn-sertifisering."],
          ["CE", "CE-dokumentasjon."],
        ]);
  const text = item.text || fallbackByTitle.get(item.title);
  const looksLikeFilename = /\.(png|jpe?g|webp|svg)$/i.test(text || "");

  if (looksLikeFilename) {
    return fallbackByTitle.get(item.title) || labels.fresvikDocsFallback;
  }

  return cleanCardText(
    text,
    fallbackByTitle.get(item.title) || labels.fresvikDocsFallback,
  );
}

function cleanMigrationTitle(title: string) {
  return title
    .replace(" frå gammal aktuelt-side", "")
    .replace(" frå gammal skyveportside", "")
    .replace(" frå gammal sitemap", "")
    .replace(" frå gammal framside", "")
    .replace(" frå gammal side", "")
    .replace(" frå Sanity", "")
    .replace(" from the old news page", "")
    .replace(" from the old sliding gate page", "")
    .replace(" from the old sitemap", "")
    .replace(" from the old front page", "")
    .replace(" from the old site", "")
    .replace(" from the old page", "")
    .replace(" from Sanity", "");
}

function isLegacyFullTextSection(
  section: ContentPage["sections"][number],
) {
  const title = cleanMigrationTitle(section.title).trim().toLowerCase();

  return (
    sectionIs(section, "archive-full-text") ||
    title === "full tekst" ||
    title === "full text"
  );
}

function isProductBenefitsContentSection(
  section: ContentPage["sections"][number],
) {
  const title = cleanMigrationTitle(section.title).trim().toLowerCase();

  return (
    title === "produktfordelar" ||
    title === "product benefits" ||
    (sectionIs(section, "product-benefits") &&
      title !== "tekniske data" &&
      title !== "technical data")
  );
}

function isTechnicalDataContentSection(
  section: ContentPage["sections"][number],
) {
  const title = cleanMigrationTitle(section.title).trim().toLowerCase();

  return (
    title === "tekniske data" ||
    title === "technical data" ||
    (sectionIs(section, "technical-data") &&
      title !== "produktfordelar" &&
      title !== "product benefits")
  );
}

function isProductDocumentsContentSection(
  section: ContentPage["sections"][number],
) {
  const title = cleanMigrationTitle(section.title).trim().toLowerCase();

  return (
    title === "dokument" ||
    title === "document" ||
    title === "documents" ||
    (sectionIs(section, "documents") &&
      !title.startsWith("dokumentlenker") &&
      !title.startsWith("document links"))
  );
}

function isRelatedAccessoriesContentSection(
  section: ContentPage["sections"][number],
) {
  const title = cleanMigrationTitle(section.title).trim().toLowerCase();

  return (
    title === "tilleggsutstyr" ||
    title === "accessories" ||
    (sectionIs(section, "related-accessories") &&
      title !== "tekniske data" &&
      title !== "technical data")
  );
}

function isPartnersContentSection(
  section: ContentPage["sections"][number],
) {
  const title = cleanMigrationTitle(section.title).trim().toLowerCase();

  return (
    title === "for samarbeidspartnarar" ||
    title === "for partners" ||
    (sectionIs(section, "partners") &&
      title !== "dokument" &&
      title !== "document" &&
      title !== "documents")
  );
}

function isContactInformationContentSection(
  section: ContentPage["sections"][number],
) {
  const title = cleanMigrationTitle(section.title).trim().toLowerCase();
  const hasLegacyCompanyContact = section.items.some((item) => {
    const itemTitle = item.title.trim().toLowerCase();
    const itemText = item.text.trim().toLowerCase();

    return (
      itemTitle === "fresvik produkt as" &&
      (itemText.includes("fresvikvegen 995") ||
        itemText.includes("57 69 83 00") ||
        itemText.includes("post@fresvik.no"))
    );
  });

  return (
    hasLegacyCompanyContact ||
    title === "kontaktinformasjon" ||
    title === "contact information" ||
    (sectionIs(section, "contact-information") &&
      title !== "tilleggsutstyr" &&
      title !== "accessories")
  );
}

function isCertificateLinksContentSection(
  section: ContentPage["sections"][number],
) {
  const title = cleanMigrationTitle(section.title).trim().toLowerCase();

  return (
    title.startsWith("sertifikat- og botnlenker") ||
    title.startsWith("certificates and bottom links") ||
    (sectionIs(section, "certificate-links") &&
      title !== "for samarbeidspartnarar" &&
      title !== "for partners")
  );
}

function productCardFallback(title: string, labels: ContentLabels) {
  if (title.toLowerCase().includes("fleksibelt")) {
    return labels.locale === "en"
      ? "Custom solutions that can be adapted on site."
      : "Kundetilpassa løysingar som kan tilpassast byggjeplassen.";
  }

  return labels.locale === "en"
    ? "Product and solution from Fresvik Produkt."
    : "Produkt og løysing frå Fresvik Produkt.";
}

function isPublicArchiveOnlySection(section: ContentPage["sections"][number]) {
  return (
    sectionIs(section, "archive-full-text") ||
    sectionIs(section, "archive-images") ||
    sectionIs(section, "archive-documents") ||
    sectionIs(section, "archive-links") ||
    sectionIs(section, "archive-newsletter") ||
    sectionIs(section, "archive-service-urls")
  );
}

function isPublicArchiveOnlyItem(
  item: ContentPage["sections"][number]["items"][number],
) {
  const title = item.title.toLowerCase();
  const text = item.text?.toLowerCase() || "";

  // Migration wording is cleaned before rendering. It must not hide a usable
  // document or destination that was preserved from the old site.
  if (item.href) {
    return false;
  }

  return (
    hasPublicMigrationMarker(item.title) ||
    hasPublicMigrationMarker(item.text) ||
    title.includes("produktblad-ikon") ||
    text.includes("bildeelement frå gammal")
  );
}

function certificationFallbackHref(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("sentral")) {
    return "/assets/fresvik/documents/sentral-godkjenning-fresvik-produkt.pdf";
  }

  if (
    normalizedTitle.includes("tg-2135") ||
    normalizedTitle.includes("sintef")
  ) {
    return "/assets/fresvik/documents/sintef-teknisk-godkjenning-2135g.pdf";
  }

  if (normalizedTitle.includes("poly")) {
    return "/assets/fresvik/documents/pur-produktbladfp.pdf";
  }

  if (normalizedTitle.includes("miljø")) {
    return "/assets/fresvik/documents/miljodokument-fresvik-produkt.pdf";
  }

  if (normalizedTitle.includes("ce")) {
    return "/assets/fresvik/documents/pur-ce-merke.pdf";
  }

  return undefined;
}

function CardLink({ href, label }: { href: string; label: string }) {
  const className =
    "mt-5 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition hover:text-slate-950";

  if (isExternalHref(href)) {
    const isWebUrl = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={className}
        target={isWebUrl ? "_blank" : undefined}
        rel={isWebUrl ? "noreferrer" : undefined}
      >
        {label} <ExternalLink aria-hidden="true" size={17} />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label} <ArrowRight aria-hidden="true" size={17} />
    </Link>
  );
}

function CompanyOverviewSection({
  section,
  sectionIndex,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  sectionIndex: number;
  labels?: ContentLabels;
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 lg:py-14">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {section.items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, `${section.title}-${sectionIndex}`)}
              href={item.href || localizedContentHref("/om-oss", labels)}
              className="group flex min-h-48 flex-col rounded-[8px] border border-slate-200 bg-slate-50 p-5 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-xl hover:shadow-slate-950/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-800">
                Fresvik Produkt
              </p>
              <h2 className="mt-4 text-xl font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-3 grow text-sm leading-6 text-slate-600">
                {cleanCardText(
                  item.text,
                  labels.companyCardFallback,
                )}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 self-end text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                {labels.open} <ArrowRight aria-hidden="true" size={17} />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CompanyInfoSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const imageItem = section.items.find((item) => item.imageUrl);
  const textItems = section.items.filter((item) => item !== imageItem);
  const intro =
    cleanMigrationIntro(section.intro) ||
    labels.companyInfoIntroFallback;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="grid gap-8 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:py-16">
        <div>
          <SectionHeader
            eyebrow={labels.companyInfoEyebrow}
            title={labels.companyInfoTitle}
            intro={intro}
          />
          {imageItem?.imageUrl ? (
            <div className="relative mt-7 overflow-hidden rounded-[8px] border border-slate-200 bg-slate-100 shadow-sm shadow-slate-950/[0.04]">
              <Image
                src={imageItem.imageUrl}
                alt={imageItem.imageAlt || imageItem.title}
                width={820}
                height={520}
                className="h-72 w-full object-cover object-center"
              />
            </div>
          ) : null}
        </div>
        <div className="grid gap-4">
          {textItems.map((item, itemIndex) => (
            <article
              key={contentCardKey(item, itemIndex, section.title)}
              className="rounded-[8px] border border-slate-200 bg-slate-50 p-5"
            >
              <h3 className="text-lg font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {cleanCardText(
                  item.text,
                  labels.companyInfoItemFallback,
                )}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function EmployeeGridSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const intro =
    cleanMigrationIntro(section.intro) ||
    labels.employeesIntroFallback;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 lg:py-16">
        <SectionHeader
          eyebrow={labels.employeesEyebrow}
          title={labels.employeesTitle}
          intro={intro}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {section.items.map((item, itemIndex) => {
            const parts = item.text.split("|").map((part) => part.trim()).filter(Boolean);
            const role = parts[0] || item.text;
            const location = parts[1];
            const phone = parts.find((part) => /\d/.test(part));
            const email = parts.find((part) => part.includes("@"));

            return (
              <article
                key={contentCardKey(item, itemIndex, section.title)}
                className="group overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08]"
              >
                {item.imageUrl ? (
                  <div className="relative h-64 bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <div className="p-5">
                  <h3 className="text-lg font-semibold leading-snug text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-cyan-800">
                    {role}
                  </p>
                  {location ? (
                    <p className="mt-2 text-sm text-slate-500">{location}</p>
                  ) : null}
                  <div className="mt-5 grid gap-2 text-sm font-semibold text-slate-700">
                    {phone ? (
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="hover:text-cyan-800"
                      >
                        {phone}
                      </a>
                    ) : null}
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="break-all hover:text-cyan-800"
                      >
                        {email}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function JobOpeningSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const [introItem, mainItem, ...details] = section.items;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
            {introItem?.imageUrl ? (
              <Image
                src={introItem.imageUrl}
                alt={introItem.imageAlt || introItem.title}
                width={900}
                height={580}
                className="h-72 w-full object-cover object-center opacity-90"
              />
            ) : null}
            <div className="p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                {labels.careerEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal">
                {mainItem?.title || introItem?.title || section.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {cleanCardText(
                  mainItem?.text || introItem?.text,
                  labels.careerIntroFallback,
                )}
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {details.map((item, itemIndex) => (
              <article
                key={contentCardKey(item, itemIndex, section.title)}
                className="rounded-[8px] border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {cleanCardText(
                    item.text,
                    labels.careerItemFallback,
                  )}
                </p>
                {item.href ? <CardLink href={item.href} label={labels.open} /> : null}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function LegalTextSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const title = sectionIs(section, "privacy-text")
    ? labels.privacyTextTitle
    : sectionIs(section, "transparency-text")
      ? labels.transparencyTextTitle
      : section.title;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={labels.legalInfoEyebrow}
            title={title}
            intro={cleanMigrationIntro(section.intro)}
          />
          <div className="mt-8 grid gap-3">
            {section.items.map((item, itemIndex) => (
              <article
                key={contentCardKey(item, itemIndex, section.title)}
                className="rounded-[8px] border border-slate-200 bg-slate-50 p-5"
              >
                <h2 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                  {item.text}
                </p>
                {item.href ? <CardLink href={item.href} label={labels.open} /> : null}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function LegalDocumentsSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-12 lg:py-16">
        <SectionHeader
          eyebrow={labels.legalDocumentEyebrow}
          title={section.title}
          intro={section.intro}
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {section.items.map((item, itemIndex) => {
            const href =
              item.href || localizedContentHref("/openheitslova", labels);
            const isExternal = isExternalHref(href) || isPdfHref(href);
            const className =
              "group flex min-h-20 items-center justify-between gap-4 rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.07]";
            const content = (
              <>
                <span>
                  <span className="block font-semibold text-slate-950">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">
                    {cleanCardText(
                      item.text,
                      labels.legalDocumentFallback,
                    )}
                  </span>
                </span>
                <ExternalLink
                  aria-hidden="true"
                  size={18}
                  className="shrink-0 text-cyan-800 transition group-hover:translate-x-0.5"
                />
              </>
            );

            return isExternal ? (
              <a
                key={contentCardKey(item, itemIndex, section.title)}
                href={href}
                className={className}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
              >
                {content}
              </a>
            ) : (
              <Link
                key={contentCardKey(item, itemIndex, section.title)}
                href={href}
                className={className}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function CertificationBadgeLink({
  item,
  itemIndex,
  scope,
  labels = getContentLabels(),
}: {
  item: ContentPage["sections"][number]["items"][number];
  itemIndex: number;
  scope: string;
  labels?: ContentLabels;
}) {
  const href =
    item.href ||
    certificationFallbackHref(item.title) ||
    localizedContentHref("/dokumentasjon", labels);
  const isExternal = isExternalHref(href);
  const isPdf = isPdfHref(href);
  const className =
    "group flex min-h-28 items-center justify-center rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700";
  const content = (
    <>
      {item.imageUrl ? (
        <Image
          src={item.imageUrl}
          alt={item.imageAlt || item.title}
          width={280}
          height={180}
          className="max-h-16 w-auto max-w-full object-contain transition duration-300 group-hover:scale-[1.04]"
        />
      ) : (
        <span className="text-sm font-semibold text-slate-700">
          {item.title}
        </span>
      )}
      <span className="sr-only">
        {labels.open} {item.title}
      </span>
    </>
  );

  if (isExternal || isPdf) {
    return (
      <a
        key={contentCardKey(item, itemIndex, scope)}
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      key={contentCardKey(item, itemIndex, scope)}
      href={href}
      className={className}
    >
      {content}
    </Link>
  );
}

function FAQAccordion({
  page,
  labels,
}: {
  page: ContentPage;
  labels: ContentLabels;
}) {
  const questions = page.sections[0]?.items || [];

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12">
        <SectionHeader
          eyebrow={labels.faqEyebrow}
          title={labels.faqTitle}
          intro={labels.faqIntro}
        />
        <div className="mt-8 divide-y divide-slate-200 rounded-[8px] border border-slate-200 bg-white">
          {questions.map((item, index) => (
            <details key={`${item.title}-${index}`} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left font-semibold text-slate-950 transition hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <ChevronDown
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-cyan-800 transition group-open:rotate-180"
                  size={20}
                />
              </summary>
              <p className="px-5 pb-5 text-sm leading-7 text-slate-600">
                {item.text || labels.faqAnswerFallback}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function contentCardKey(
  item: ContentPage["cards"][number],
  index: number,
  scope: string,
) {
  return [scope, item.href, item.imageUrl, item.title, index]
    .filter(Boolean)
    .join("-");
}

function splitLeadingLabel(paragraph: string) {
  const colonIndex = paragraph.indexOf(":");

  if (colonIndex <= 0 || colonIndex > 28) {
    return undefined;
  }

  const label = paragraph.slice(0, colonIndex).trim();
  const text = paragraph.slice(colonIndex + 1).trim();

  if (!label || !text || /[.!?]/.test(label)) {
    return undefined;
  }

  return { label, text };
}

const tilleggsutstyrOverviewItems: ContentPage["cards"] = [
  {
    title: "Standard håndtak",
    text: "Standard håndtak for kjøle- og fryseromsdører.",
    href: "/andre-produkter/standard-handtak",
    imageUrl: "/assets/fresvik/images/old-site/Håndtak+standard_web.jpg",
    imageAlt: "Standard håndtak",
  },
  {
    title: "Elebar ventil",
    text: "Ventil for mindre fryserom som hjelper mot vakuum.",
    href: "/andre-produkter/elebar-ventil",
    imageUrl: "/assets/fresvik/images/old-site/Elebar+ventil_web.jpg",
    imageAlt: "Elebar ventil",
  },
  {
    title: "MaxiElebar ventil",
    text: "Ventil for større fryserom der trykkutjamning er nødvendig.",
    href: "/andre-produkter/maxielebar-ventil",
    imageUrl: "/assets/fresvik/images/old-site/MaxiElebar+ventli_web.jpg",
    imageAlt: "MaxiElebar ventil",
  },
  {
    title: "PEGO innestengningsalarm",
    text: "Alarm og nødalarmknapp for naudstilfelle inne i fryserom.",
    href: "/andre-produkter/pego-innestengningsalarm",
    imageUrl: "/assets/fresvik/images/old-site/PEGO+innestengningsalarm_web.jpg",
    imageAlt: "PEGO innestengningsalarm",
  },
  {
    title: "PVC-gardiner",
    text: "Reduserer kuldetap ved mykje trafikk gjennom opne portar.",
    href: "/andre-produkter/pvc-gardiner",
    imageUrl: "/assets/fresvik/images/old-site/PVC-gardin_web.jpg",
    imageAlt: "PVC-gardiner",
  },
  {
    title: "Diktator dørtiltrekker",
    text: "Dørtiltrekker som kan monterast der lukking må sikrast.",
    href: "/andre-produkter/diktator-dortiltrekker",
    imageUrl: "/assets/fresvik/images/old-site/Diktator_web.jpg",
    imageAlt: "Diktator dørtiltrekker",
  },
  {
    title: "Køyrerampe",
    text: "Køyreramper i aluminium til kjøle- og fryserom.",
    href: "/andre-produkter/kjlerampe",
    imageUrl: "/assets/fresvik/images/old-site/rampe3+copy.jpg",
    imageAlt: "Køyrerampe",
  },
  {
    title: "Beslag",
    text: "Tilpassa beslag produsert av same stål som panela.",
    href: "/andre-produkter/beslag",
    imageUrl: "/assets/fresvik/images/old-site/profil3+copy.jpg",
    imageAlt: "Beslag",
  },
  {
    title: "Standard dører",
    text: "Standard kjøle- og fryseromsdører for mindre og mellomstore rom.",
    href: "/andre-produkter/2014/7/9/standard-drer",
    imageUrl: "/assets/fresvik/images/old-site/Standard+Dør+Fresvik+Produkt.jpg",
    imageAlt: "Standard dører",
  },
  {
    title: "Skipsdører",
    text: "Slagdører utvikla for kjøle- og fryserom om bord i skip.",
    href: "/andre-produkter/2014/7/9/skipsdrer",
    imageUrl: "/assets/fresvik/images/old-site/Skipsdør+Fresvik+Produkt.jpg",
    imageAlt: "Skipsdører",
  },
  {
    title: "Industri slagdør",
    text: "Større slagdør for kjøle- og fryserom i industrimiljø.",
    href: "/andre-produkter/2014/7/9/industri-slagdor",
    imageUrl: "/assets/fresvik/images/generated/industri-slagdor-cold-room-collage.png",
    imageAlt: "Industri slagdør",
  },
];

function accessoryOverviewItems(locale: Locale): ContentPage["cards"] {
  if (locale === "nn") return tilleggsutstyrOverviewItems;

  const englishCopy: Array<{ title: string; text: string }> = [
    {
      title: "Standard handles",
      text: "Standard handles for cold and freezer room doors.",
    },
    {
      title: "Elebar valve",
      text: "Valve for smaller freezer rooms that helps prevent vacuum.",
    },
    {
      title: "MaxiElebar valve",
      text: "Valve for larger freezer rooms where pressure equalisation is required.",
    },
    {
      title: "PEGO entrapment alarm",
      text: "Alarm and emergency button for incidents inside freezer rooms.",
    },
    {
      title: "PVC strip curtains",
      text: "Reduce cold loss where there is frequent traffic through open gates.",
    },
    {
      title: "Dictator door closer",
      text: "Door closer for applications where reliable closing is required.",
    },
    {
      title: "Access ramp",
      text: "Aluminium access ramps for cold and freezer rooms.",
    },
    {
      title: "Flashings",
      text: "Custom flashings made from the same steel as the panels.",
    },
    {
      title: "Standard doors",
      text: "Standard cold and freezer room doors for small and medium-sized rooms.",
    },
    {
      title: "Marine doors",
      text: "Swing doors developed for cold and freezer rooms on board vessels.",
    },
    {
      title: "Industrial swing door",
      text: "Large swing door for cold and freezer rooms in industrial environments.",
    },
  ];

  return tilleggsutstyrOverviewItems.map((item, index) => ({
    ...item,
    title: englishCopy[index]?.title || item.title,
    text: englishCopy[index]?.text || item.text,
    imageAlt: englishCopy[index]?.title || item.imageAlt,
  }));
}

function ProductIntroSection({
  section,
  highlight,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  highlight?: string;
  labels?: ContentLabels;
}) {
  const item = section.items[0];
  const paragraphs = item?.text.split(/\n{2,}/).filter(Boolean) || [];

  if (!item) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <article className="grid overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.06] lg:grid-cols-[0.92fr_1.08fr]">
          {item.imageUrl ? (
            <div className="relative min-h-72 bg-slate-100 lg:min-h-full">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt || item.title}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          ) : null}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              {labels.productInformation}
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              {item.title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
              {paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${item.title}-paragraph-${paragraphIndex}`}>
                  {paragraph}
                </p>
              ))}
            </div>
            {highlight ? (
              <div className="mt-7 rounded-[8px] border border-cyan-100 bg-cyan-50 px-5 py-4 text-base font-semibold leading-7 text-slate-950">
                {highlight}
              </div>
            ) : null}
          </div>
        </article>
      </Container>
    </section>
  );
}

function isFrysetunnelFeatureSection(
  section: ContentPage["sections"][number],
) {
  return (
    sectionIs(section, "frysetunnel-feature") ||
    sectionIs(section, "section-spesialtilpassa-d-rer")
  );
}

function FrysetunnelControlledSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const item = section.items[0];
  const paragraphs = item?.text.split(/\n{2,}/).filter(Boolean) || [];

  if (!item) return null;

  return (
    <section className="border-b border-slate-800 bg-slate-950 text-white">
      <Container className="py-12 lg:py-16">
        <article className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
              {labels.freezingTunnel}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
              {item.title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
              {paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${item.title}-controlled-${paragraphIndex}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {item.imageUrl ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] border border-white/15 bg-slate-900">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt || item.title}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          ) : null}
        </article>
      </Container>
    </section>
  );
}

function FrysetunnelFeatureRow({
  sections,
  labels = getContentLabels(),
}: {
  sections: ContentPage["sections"];
  labels?: ContentLabels;
}) {
  const features = sections
    .filter(isFrysetunnelFeatureSection)
    .map((section) => ({
      section,
      item: section.items[0],
    }))
    .filter(({ item }) => Boolean(item));

  if (features.length === 0) return null;

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-12 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={labels.freezingTunnel}
            title={labels.constructionSolution}
            intro={labels.constructionSolutionIntro}
          />
          <Link
            href={localizedContentHref("/kontakt", labels)}
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
          >
            {labels.clarifySolution}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {features.map(({ section, item }, featureIndex) => {
            if (!item) return null;
            const paragraphs = item.text.split(/\n{2,}/).filter(Boolean);
            const sectionLabel =
              section.title.trim().toLocaleLowerCase() ===
              item.title.trim().toLocaleLowerCase()
                ? labels.freezingTunnel
                : section.title;

            return (
              <article
                key={`${section.title}-${featureIndex}`}
                className="group flex min-h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08]"
              >
                {item.imageUrl ? (
                  <>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt || item.title}
                        fill
                        sizes="(min-width: 1024px) 28vw, 100vw"
                        className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <span className="relative h-1 overflow-hidden bg-gradient-to-r from-cyan-700 via-sky-400 to-orange-500 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/70 before:opacity-0 before:blur-sm before:transition group-hover:before:left-full group-hover:before:opacity-100 group-hover:before:duration-700" />
                  </>
                ) : null}

                <div className="flex grow flex-col p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-800">
                    {sectionLabel}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug text-slate-950">
                    {item.title}
                  </h3>
                  <div className="mt-4 grow space-y-3 text-sm leading-6 text-slate-600">
                    {paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={`${section.title}-feature-${paragraphIndex}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="mt-5 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
                    >
                      {labels.readMore}
                      <ArrowRight aria-hidden="true" size={17} />
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function FacadeCoreSection({
  section,
  eyebrow,
}: {
  section: ContentPage["sections"][number];
  eyebrow: string;
}) {
  const item = section.items[0];
  const paragraphs = item?.text.split(/\n{2,}/).filter(Boolean) || [];

  if (!item) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <article className="grid overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.06] lg:grid-cols-[0.95fr_1.05fr]">
          {item.imageUrl ? (
            <div className="relative min-h-72 bg-slate-100 lg:min-h-full">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt || section.title}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          ) : null}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              {eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              {item.title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
              {paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${section.title}-paragraph-${paragraphIndex}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}

function ProductDetailTextSection({
  section,
  productName = "Fresvik-panel",
  showIndex = true,
  showIntro = true,
}: {
  section: ContentPage["sections"][number];
  productName?: string;
  showIndex?: boolean;
  showIntro?: boolean;
}) {
  const isTechnicalData = isTechnicalDataContentSection(section);

  if (isTechnicalData) {
    const [primaryItem, ...detailItems] = section.items;
    const primaryValues =
      primaryItem?.text.split(/\n{2,}/).filter(Boolean) || [];

    return (
      <section className="border-b border-slate-200 bg-slate-50">
        <Container className="py-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                Spesifikasjonar
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Viktige tekniske data for {productName}, samla for rask
                vurdering av brannklasse, dimensjonar, vekt, U-verdi og
                materialval.
              </p>
            </div>

            <div className="grid gap-4">
              {primaryItem ? (
                <article className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04]">
                  <div className="border-b border-slate-200 bg-slate-950 px-5 py-4 text-white sm:px-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                      Kjerne
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">
                      {primaryItem.title}
                    </h3>
                  </div>
                  <dl className="grid gap-px bg-slate-200 sm:grid-cols-2">
                    {primaryValues.map((value, valueIndex) => {
                      const [label, ...rest] = value.split(":");
                      const hasLabel = rest.length > 0;

                      return (
                        <div
                          key={`${primaryItem.title}-${valueIndex}`}
                          className="bg-white px-5 py-4"
                        >
                          <dt className="text-xs font-black uppercase tracking-[0.14em] text-cyan-800">
                            {hasLabel ? label.trim() : `Punkt ${valueIndex + 1}`}
                          </dt>
                          <dd className="mt-1 text-base font-semibold leading-7 text-slate-950">
                            {hasLabel ? rest.join(":").trim() : value}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </article>
              ) : null}

              <div className="grid gap-4 md:grid-cols-3">
                {detailItems.map((item, itemIndex) => (
                  <article
                    key={contentCardKey(item, itemIndex, section.title)}
                    className="group overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08]"
                  >
                    {item.imageUrl ? (
                      <div className="relative h-40 overflow-hidden bg-slate-100">
                        <Image
                          src={item.imageUrl}
                          alt={item.imageAlt || item.title}
                          fill
                          sizes="(min-width: 768px) 20vw, 100vw"
                          className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : null}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-950">
                        {item.title}
                      </h3>
                      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
                        {item.text
                          .split(/\n{2,}/)
                          .filter(Boolean)
                          .map((paragraph, paragraphIndex) => (
                            <p key={`${item.title}-${paragraphIndex}`}>
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
          <SectionHeader
            title={cleanMigrationTitle(section.title)}
            intro={showIntro ? cleanMigrationIntro(section.intro) : undefined}
          />
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {section.items.map((item, itemIndex) => {
              const paragraphs = item.text.split(/\n{2,}/).filter(Boolean);

              return (
                <article
                  key={contentCardKey(item, itemIndex, section.title)}
                  className="grid gap-6 py-7 md:grid-cols-[1fr_auto]"
                >
                  <div>
                    {showIndex ? (
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </p>
                    ) : null}
                    <h3 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
                      {item.title}
                    </h3>
                    <div className="mt-4 space-y-3 text-base leading-8 text-slate-700">
                      {paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={`${item.title}-text-${paragraphIndex}`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  {item.imageUrl ? (
                    <div className="relative min-h-52 overflow-hidden rounded-[8px] border border-slate-200 bg-slate-100 md:w-80">
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt || item.title}
                        fill
                        sizes="(min-width: 768px) 20rem, 100vw"
                        className="object-cover object-center"
                      />
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductInformationMatrixSection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  const title = cleanMigrationTitle(section.title) || section.title;
  const intro = cleanMigrationIntro(section.intro);

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-14 lg:py-16">
        <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.05]">
          <div className="bg-slate-950 px-6 py-7 text-white sm:px-8 lg:px-10">
            <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">
              {title}
            </h2>
            {intro ? (
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                {intro}
              </p>
            ) : null}
          </div>

          <div className="grid gap-px bg-slate-200 md:grid-cols-2 xl:grid-cols-3">
            {section.items.map((item, itemIndex) => {
              const paragraphs = item.text.split(/\n{2,}/).filter(Boolean);
              const shouldSpanLastItem =
                (section.items.length === 1 ||
                  (section.items.length > 3 &&
                    section.items.length % 3 === 1)) &&
                itemIndex === section.items.length - 1;
              const showItemTitle =
                section.items.length > 1 ||
                item.title.trim().toLocaleLowerCase() !==
                  title.trim().toLocaleLowerCase();

              return (
                <article
                  key={contentCardKey(item, itemIndex, section.title)}
                  className={cn(
                    "group relative bg-white px-6 py-7 transition-colors hover:bg-cyan-50/40 sm:px-8",
                    shouldSpanLastItem &&
                      "md:col-span-2 xl:col-span-3 xl:grid xl:grid-cols-[0.28fr_0.72fr] xl:gap-10",
                  )}
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-cyan-700 opacity-0 transition-opacity group-hover:opacity-100" />
                  {showItemTitle ? (
                    <h3 className="text-xl font-semibold tracking-normal text-slate-950">
                      {item.title}
                    </h3>
                  ) : null}
                  <div
                    className={cn(
                      "space-y-3 text-sm leading-7 text-slate-600 sm:text-base",
                      showItemTitle && "mt-3",
                      shouldSpanLastItem && "xl:mt-0 xl:max-w-4xl",
                    )}
                  >
                    {paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={`${item.title}-gate-info-${paragraphIndex}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ReferenceIntroSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const item = section.items[0];
  const paragraphs = item?.text.split(/\n{2,}/).filter(Boolean) || [];

  if (!item) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <article className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.06]">
          {item.imageUrl ? (
            <div className="relative aspect-[16/7] overflow-hidden bg-slate-100">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt || item.title}
                fill
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="object-cover object-center"
              />
            </div>
          ) : null}
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.32fr_0.68fr] lg:gap-12 lg:p-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                {labels.projectInformation}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
                {item.title}
              </h2>
              {item.meta ? (
                <p className="mt-4 inline-flex rounded-[6px] bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-900">
                  {item.meta}
                </p>
              ) : null}
            </div>
            <div className="space-y-4 text-base leading-8 text-slate-700">
              {paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${item.title}-reference-${paragraphIndex}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}

function ReferenceImageGallerySection({
  section,
  primaryImageUrl,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  primaryImageUrl?: string;
  labels?: ContentLabels;
}) {
  const items = section.items.filter(
    (item) => item.imageUrl && item.imageUrl !== primaryImageUrl,
  );

  if (items.length === 0) return null;

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-14 lg:py-16">
        <SectionHeader
          eyebrow={labels.referenceEyebrow}
          title={labels.projectImages}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, itemIndex) => (
            <article
              key={contentCardKey(item, itemIndex, section.title)}
              className="group overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08]"
            >
              {item.imageUrl ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ReferenceLinksSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const items = section.items.filter(
    (item) =>
      item.href &&
      item.href !== "/kontakt" &&
      item.href !== "/en/contact",
  );

  if (items.length === 0) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-10 lg:py-12">
        <div className="rounded-[8px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                {labels.relatedLinks}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
                {labels.relatedReferences}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              {labels.referenceLinksIntro}
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, itemIndex) => (
              <Link
                key={contentCardKey(item, itemIndex, section.title)}
                href={
                  item.href || localizedContentHref("/referansar", labels)
                }
                className="group flex min-h-24 flex-col justify-between rounded-[8px] border border-slate-200 bg-white p-4 text-slate-950 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-950/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
              >
                <span>
                  <span className="block text-base font-semibold">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {cleanMigrationIntro(item.text) ||
                      labels.relatedReferenceFallback}
                  </span>
                </span>
                <span className="mt-4 inline-flex items-center gap-2 self-end text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  {labels.open}
                  <ArrowRight aria-hidden="true" size={17} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function AccessoryImageGallerySection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="mb-8">
          <SectionHeader title={labels.images} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {section.items.map((item, itemIndex) => (
            <article
              key={contentCardKey(item, itemIndex, section.title)}
              className="group overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08]"
            >
              {item.imageUrl ? (
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(min-width: 1024px) 42rem, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function AccessoryDetailSection({
  section,
  imageSection,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  imageSection?: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const item = section.items[0];
  const paragraphs = item?.text.split(/\n{2,}/).filter(Boolean) || [];
  const introParagraphs: string[] = [];
  const detailParagraphs: Array<{ label: string; text: string }> = [];
  const imageItems =
    imageSection?.items.filter((imageItem) => imageItem.imageUrl) ||
    section.items.filter((sectionItem) => sectionItem.imageUrl);

  if (!item) return null;

  paragraphs.forEach((paragraph) => {
    const splitParagraph = splitLeadingLabel(paragraph);

    if (splitParagraph) {
      detailParagraphs.push(splitParagraph);
      return;
    }

    introParagraphs.push(paragraph);
  });

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <article className="grid overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.06] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              {labels.productInformation}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              {item.title}
            </h2>
            {introParagraphs.length > 0 ? (
              <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
                {introParagraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${item.title}-accessory-${paragraphIndex}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
            {detailParagraphs.length > 0 ? (
              <div className="mt-6 grid gap-3">
                {detailParagraphs.map((detail, detailIndex) => (
                  <div
                    key={`${item.title}-detail-${detail.label}-${detailIndex}`}
                    className="rounded-[8px] border border-slate-200 bg-slate-50 p-4"
                  >
                    <h3 className="text-sm font-black uppercase tracking-[0.14em] text-cyan-800">
                      {detail.label}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-slate-700">
                      {detail.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={localizedContentHref("/kontakt", labels)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
              >
                {labels.contactUs} <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <Link
                href={localizedContentHref("/tilleggsutstyr", labels)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
              >
                {labels.allAccessories} <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>

          {imageItems.length > 0 ? (
            <div
              className={cn(
                "grid gap-px bg-slate-200 p-px",
                imageItems.length > 1 && "sm:grid-cols-2",
              )}
            >
              {imageItems.map((imageItem, imageIndex) => {
                const imageSrc = imageItem.imageUrl || item.imageUrl || "";
                const isTallIndustriSlagdorImage = imageSrc.includes(
                  "industri-slagdor-cold-room-collage",
                );

                return (
                  <figure
                    key={contentCardKey(
                      imageItem,
                      imageIndex,
                      `${section.title}-accessory-images`,
                    )}
                    className="group overflow-hidden bg-slate-50"
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden",
                        imageItems.length > 1
                          ? "aspect-[4/3] min-h-52"
                          : "aspect-[16/11] min-h-64",
                      )}
                    >
                      <Image
                        src={imageSrc}
                        alt={imageItem.imageAlt || imageItem.title}
                        fill
                        sizes="(min-width: 1024px) 44vw, 100vw"
                        className={cn(
                          "object-cover transition duration-500 group-hover:scale-[1.03]",
                          isTallIndustriSlagdorImage
                            ? "object-top"
                            : "object-center",
                        )}
                      />
                    </div>
                    {imageItems.length > 1 ? (
                      <figcaption className="border-t border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                        {imageItem.title}
                      </figcaption>
                    ) : null}
                  </figure>
                );
              })}
            </div>
          ) : null}
        </article>
      </Container>
    </section>
  );
}

function AccessoryNavigationSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const previous = section.items.find((item) =>
    ["førre", "previous"].includes(item.title.toLocaleLowerCase()),
  );
  const overview = section.items.find((item) =>
    ["alle tilleggsutstyr", "all accessories"].includes(
      item.title.toLocaleLowerCase(),
    ),
  );
  const next = section.items.find((item) =>
    ["neste", "next"].includes(item.title.toLocaleLowerCase()),
  );

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-10">
        <nav
          aria-label={labels.accessoryNavigationLabel}
          className="grid gap-3 md:grid-cols-3"
        >
          {previous?.href ? (
            <Link
              href={previous.href}
              className="group flex min-h-24 flex-col justify-center rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-950/[0.06]"
            >
              <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-800">
                {labels.accessoryPrevious}
              </span>
              <span className="mt-2 font-semibold text-slate-950">
                {previous.text}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {overview?.href ? (
            <Link
              href={overview.href}
              className="group flex min-h-24 flex-col justify-center rounded-[8px] border border-slate-950 bg-slate-950 p-5 text-white shadow-lg shadow-slate-950/[0.12] transition hover:-translate-y-0.5 hover:bg-cyan-900"
            >
              <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
                {labels.accessoryOverview}
              </span>
              <span className="mt-2 font-semibold">
                {labels.allAccessories}
              </span>
            </Link>
          ) : null}

          {next?.href ? (
            <Link
              href={next.href}
              className="group flex min-h-24 flex-col justify-center rounded-[8px] border border-slate-200 bg-white p-5 text-right shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-950/[0.06]"
            >
              <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-800">
                {labels.accessoryNext}
              </span>
              <span className="mt-2 font-semibold text-slate-950">
                {next.text}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </Container>
    </section>
  );
}

function ProductBenefitsSection({
  section,
  showIndex = true,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  showIndex?: boolean;
  labels?: ContentLabels;
}) {
  const displayIntro = cleanMigrationIntro(section.intro);

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-14 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
            {labels.benefits}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            {cleanMigrationTitle(section.title)}
          </h2>
          {displayIntro ? (
            <p className="mt-4 text-base leading-7 text-slate-600">
              {displayIntro}
            </p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, itemIndex) => (
            <article
              key={contentCardKey(item, itemIndex, section.title)}
              className="group flex min-h-28 items-start gap-4 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-950/[0.06]"
            >
              {showIndex ? (
                <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-800">
                  {String(itemIndex + 1).padStart(2, "0")}
                </p>
              ) : (
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-800 transition group-hover:bg-cyan-800 group-hover:text-white">
                  <CheckCircle2 aria-hidden="true" size={18} />
                </span>
              )}
              <h3
                className={cn(
                  "text-base font-semibold leading-snug text-slate-950",
                  showIndex && "mt-2",
                )}
              >
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductImageGallerySection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const [featuredItem, ...secondaryItems] = section.items;

  if (!featuredItem) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={labels.details}
            title={labels.gateMotorLock}
            intro={cleanMigrationIntro(section.intro)}
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="group overflow-hidden rounded-[8px] border border-slate-200 bg-slate-950 text-white shadow-xl shadow-slate-950/[0.08]">
            {featuredItem.imageUrl ? (
              <div className="relative min-h-[22rem] overflow-hidden bg-slate-900">
                <Image
                  src={featuredItem.imageUrl}
                  alt={featuredItem.imageAlt || featuredItem.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/90 to-transparent" />
              </div>
            ) : null}
            <div className="p-5 sm:p-6">
              <h3 className="text-2xl font-semibold tracking-normal">
                {featuredItem.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {cleanCardText(
                  featuredItem.text,
                  labels.productImageFallback,
                )}
              </p>
            </div>
          </article>

          <div className="grid gap-4">
            {secondaryItems.map((item, itemIndex) => (
              <article
                key={contentCardKey(item, itemIndex, `${section.title}-secondary`)}
                className="group grid overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] sm:grid-cols-[0.92fr_1.08fr]"
              >
                <div className="flex min-h-40 flex-col justify-center p-5">
                  <h3 className="text-xl font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {cleanCardText(item.text, labels.productImageFallback)}
                  </p>
                </div>
                {item.imageUrl ? (
                  <div className="relative min-h-44 overflow-hidden bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(min-width: 1024px) 22vw, 100vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent" />
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductDocumentSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const linkedItems = section.items.filter(
    (item): item is typeof item & { href: string } =>
      Boolean(item.href) && !isPublicArchiveOnlyItem(item),
  );

  if (linkedItems.length === 0) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              {labels.downloads}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              {section.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {labels.documentsIntro}
            </p>
          </div>

          <div className="grid gap-3">
            {linkedItems.map((item, itemIndex) => {
              const href = item.href;
              const isExternal = isExternalHref(href);
              const isPdf = isPdfHref(href);
              const className =
                "group grid gap-4 rounded-[8px] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-xl hover:shadow-slate-950/[0.08] sm:grid-cols-[auto_1fr_auto] sm:items-center";
              const content = (
                <>
                  <span className="grid size-12 place-items-center rounded-[8px] bg-white text-cyan-800 shadow-sm shadow-slate-950/[0.04] ring-1 ring-slate-200">
                    {isPdf || isExternal ? (
                      <Download aria-hidden="true" size={21} />
                    ) : (
                      <FileText aria-hidden="true" size={21} />
                    )}
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-slate-950">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {cleanCardText(
                        item.text,
                        isPdf
                          ? labels.productPdfFallback
                          : labels.technicalInfoFallback,
                      )}
                    </span>
                  </span>
                  <span className="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition group-hover:border-cyan-800 group-hover:text-cyan-800">
                    {labels.open}
                    {isExternal || isPdf ? (
                      <ExternalLink aria-hidden="true" size={16} />
                    ) : (
                      <ArrowRight aria-hidden="true" size={16} />
                    )}
                  </span>
                </>
              );

              if (isExternal || isPdf) {
                return (
                  <a
                    key={contentCardKey(item, itemIndex, section.title)}
                    href={href}
                    className={className}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link
                  key={contentCardKey(item, itemIndex, section.title)}
                  href={href}
                  className={className}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function DocumentationDownloadsSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const isEnglish = labels.locale === "en";
  const descriptions: Record<string, string> = isEnglish
    ? {
        "Environmental document":
          "Environmental documentation for Fresvik Produkt.",
        "Certificate of conformity":
          "Certificate of conformity and CPR documentation.",
        "Technical approval": "SINTEF Technical Approval TG 2135.",
        "Approval document at SINTEF":
          "External link to the SINTEF approval register.",
        "Installation guides":
          "Installation guides for products and gates collected in one place.",
        Delivery: "Delivery terms and practical delivery information.",
        "Transport damage":
          "How to report and document transport damage.",
        "Central approval": "Documentation for central approval.",
        "Declaration of performance":
          "Declaration of performance for Fresvik Produkt.",
      }
    : {
        Miljødokument: "Miljødokumentasjon for Fresvik Produkt.",
        Samsvarssertifikat: "Samsvarssertifikat og CPR-dokumentasjon.",
        "Teknisk godkjenning": "SINTEF Teknisk Godkjenning TG 2135.",
        "Godkjenningsdokument hjå SINTEF":
          "Ekstern lenke til SINTEF sitt godkjenningsregister.",
        "Monterings-anvisningar":
          "Samla side for monteringsanvisningar til produkt og portar.",
        Levering: "Leveringsvilkår og praktisk informasjon om levering.",
        Transportskade:
          "Informasjon om korleis transportskade skal meldast og dokumenterast.",
        "Sentral godkjenning": "Dokumentasjon for sentral godkjenning.",
        Ytelseserklæring: "Ytelseserklæring for Fresvik Produkt.",
      };

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={labels.downloads}
            title={labels.documentsAndApprovals}
            intro={
              isEnglish
                ? "Product documentation, approvals and practical forms gathered in one place."
                : "Produktdokumentasjon, godkjenningar og praktiske skjema samla på ein stad."
            }
          />
          <Link
            href={withLocale("/monteringsanvisning", isEnglish ? "en" : "nn")}
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            {labels.installationGuides}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item, itemIndex) => {
            const href = item.href;
            const isExternal = href ? isExternalHref(href) : false;
            const isPdf = href ? isPdfHref(href) : false;
            const className =
              "group flex min-h-full flex-col rounded-[8px] border border-slate-200 bg-slate-50 p-5 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700";
            const content = (
              <>
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-[8px] bg-white text-cyan-800 shadow-sm shadow-slate-950/[0.04] ring-1 ring-slate-200 transition group-hover:bg-cyan-50">
                    {isExternal ? (
                      <ExternalLink aria-hidden="true" size={21} />
                    ) : isPdf ? (
                      <Download aria-hidden="true" size={21} />
                    ) : (
                      <FileText aria-hidden="true" size={21} />
                    )}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-slate-950">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {descriptions[item.title] ||
                        cleanCardText(
                          item.text,
                          labels.fresvikDocsFallback,
                        )}
                    </p>
                  </div>
                </div>
                {href ? (
                  <span className="mt-6 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                    {labels.open}
                    {isExternal || isPdf ? (
                      <ExternalLink aria-hidden="true" size={16} />
                    ) : (
                      <ArrowRight aria-hidden="true" size={16} />
                    )}
                  </span>
                ) : null}
              </>
            );

            if (!href) {
              return (
                <article
                  key={contentCardKey(item, itemIndex, section.title)}
                  className={className}
                >
                  {content}
                </article>
              );
            }

            if (isExternal || isPdf) {
              return (
                <a
                  key={contentCardKey(item, itemIndex, section.title)}
                  href={href}
                  className={className}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={contentCardKey(item, itemIndex, section.title)}
                href={href}
                className={className}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function DocumentationContactSection({
  labels = getContentLabels(),
}: {
  labels?: ContentLabels;
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-5 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/[0.04] sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              {labels.missingDocumentsEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
              {labels.missingDocumentsTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              {labels.missingDocumentsIntro}
            </p>
          </div>
          <Link
            href={localizedContentHref("/kontakt", labels)}
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
          >
            {labels.contactUs}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function MountingDownloadsSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={labels.downloads}
            title={labels.installationGuides}
            intro={labels.mountingGuidesIntro}
          />
          <Link
            href={localizedContentHref("/dokumentasjon", labels)}
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            {labels.allDocumentation}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item, itemIndex) => {
            const href = item.href;
            const isPdf = href ? isPdfHref(href) : false;
            const isExternal = href ? isExternalHref(href) : false;
            const className =
              "group flex min-h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700";
            const content = (
              <>
                {item.imageUrl ? (
                  <div className="relative h-44 overflow-hidden border-b border-slate-100 bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="fresvik-card-divider absolute inset-x-0 bottom-0"
                    />
                  </div>
                ) : null}
                <div className="flex grow flex-col p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-[8px] bg-cyan-50 text-cyan-800 ring-1 ring-cyan-100">
                      {isPdf || isExternal ? (
                        <Download aria-hidden="true" size={19} />
                      ) : (
                        <FileText aria-hidden="true" size={19} />
                      )}
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {cleanCardText(
                          item.text,
                          labels.mountingGuideFallback,
                        )}
                      </p>
                    </div>
                  </div>
                  {href ? (
                    <span className="mt-6 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                      {labels.open}
                      {isPdf || isExternal ? (
                        <ExternalLink aria-hidden="true" size={16} />
                      ) : (
                        <ArrowRight aria-hidden="true" size={16} />
                      )}
                    </span>
                  ) : null}
                </div>
              </>
            );

            if (!href) {
              return (
                <article
                  key={contentCardKey(item, itemIndex, section.title)}
                  className={className}
                >
                  {content}
                </article>
              );
            }

            if (isPdf || isExternal) {
              return (
                <a
                  key={contentCardKey(item, itemIndex, section.title)}
                  href={href}
                  className={className}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={contentCardKey(item, itemIndex, section.title)}
                href={href}
                className={className}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function MountingDocumentationCta({
  labels = getContentLabels(),
}: {
  labels?: ContentLabels;
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-5 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/[0.04] sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              {labels.documentation}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
              {labels.documentationCtaTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              {labels.documentationCtaIntro}
            </p>
          </div>
          <Link
            href={localizedContentHref("/dokumentasjon", labels)}
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
          >
            {labels.goToDocumentation}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function ElectricSkyveportDownloadsSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const isEnglish = labels.locale === "en";
  const descriptions: Record<string, string> = isEnglish
    ? {
        "Wiring diagram Fermod 5010":
          "Wiring diagram for the Fermod 5010 electric control.",
        "Installation guide for Fermod 5010 with manual fitting 2150":
          "Installation of Fermod 5010 with manual fitting 2150.",
        "Installation guide for Fermod 5010 with manual fittings 3530 and 7530":
          "Installation of Fermod 5010 with manual fittings 3530 and 7530.",
        "Quick Start": "Quick start guide for 5010Exp.",
        "Change sliding direction":
          "Instructions for changing the sliding direction.",
        Accessories: "Accessories and options kit for 5010Exp.",
      }
    : {
        "Koblingskjema Fermod 5010":
          "Koblingsskjema for elektrisk styring Fermod 5010.",
        "Montasjeanvisning for Fermod 5010 på manuelt beslag 2150":
          "Montasje av Fermod 5010 på manuelt beslag 2150.",
        "Montasjeanvisning for Fermod 5010 på manuelt beslag 3530 og 7530":
          "Montasje av Fermod 5010 på manuelt beslag 3530 og 7530.",
        "Quick Start": "Hurtigstart for 5010Exp.",
        "Endre skyveretning": "Rettleiing for å endre skyveretning.",
        Tilleggsutstyr: "Tilleggsutstyr og options kit for 5010Exp.",
      };

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={labels.electricSlidingGate}
            title={labels.filesForFermod}
            intro={labels.electricFilesIntro}
          />
          <Link
            href={localizedContentHref("/monteringsanvisning", labels)}
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            {labels.allInstallationGuides}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item, itemIndex) => {
            const href = item.href;
            const isPdf = href ? isPdfHref(href) : false;
            const isExternal = href ? isExternalHref(href) : false;
            const keyScope = "electric-skyveport-downloads";
            const className =
              "group flex min-h-full flex-col rounded-[8px] border border-slate-200 bg-slate-50 p-5 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700";
            const content = (
              <>
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-[8px] bg-white text-cyan-800 shadow-sm shadow-slate-950/[0.04] ring-1 ring-slate-200 transition group-hover:bg-cyan-50">
                    <FileText aria-hidden="true" size={21} />
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {descriptions[item.title] ||
                        cleanCardText(
                          item.text,
                          labels.electricGateDocsFallback,
                        )}
                    </p>
                  </div>
                </div>
                {href ? (
                  <span className="mt-6 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                    {labels.open}
                    {isPdf || isExternal ? (
                      <ExternalLink aria-hidden="true" size={16} />
                    ) : (
                      <ArrowRight aria-hidden="true" size={16} />
                    )}
                  </span>
                ) : null}
              </>
            );

            if (!href) {
              return (
                <article
                  key={contentCardKey(item, itemIndex, keyScope)}
                  className={className}
                >
                  {content}
                </article>
              );
            }

            if (isPdf || isExternal) {
              return (
                <a
                  key={contentCardKey(item, itemIndex, keyScope)}
                  href={href}
                  className={className}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={contentCardKey(item, itemIndex, keyScope)}
                href={href}
                className={className}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ProductRelatedSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const title = labels.accessories;
  const ctaLabel = labels.allAccessories;

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={labels.relatedSolutions}
            title={title}
            intro={cleanMigrationIntro(section.intro)}
          />
          <Link
            href={localizedContentHref("/tilleggsutstyr", labels)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            {ctaLabel}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {section.items
            .filter((item) => Boolean(item.href))
            .map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, section.title)}
              href={
                item.href || localizedContentHref("/tilleggsutstyr", labels)
              }
              className="group flex min-h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              {item.imageUrl ? (
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(min-width: 1280px) 18rem, (min-width: 768px) 45vw, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <div className="flex grow flex-col p-5">
                <h3 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 grow text-sm leading-6 text-slate-600">
                  {cleanCardText(
                    item.text,
                    labels.accessoryFallback,
                  )}
                </p>
                <span className="mt-5 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  {labels.readMore} <ArrowRight aria-hidden="true" size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function DoorModelsSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={labels.doorModelsEyebrow}
            title={labels.doorModelsTitle}
            intro={labels.doorModelsIntro}
          />
          <Link
            href={localizedContentHref("/tilleggsutstyr", labels)}
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            {labels.seeAccessories}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {section.items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, section.title)}
              href={
                item.href || localizedContentHref("/tilleggsutstyr", labels)
              }
              className="group flex min-h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              {item.imageUrl ? (
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <span className="relative h-1 overflow-hidden bg-gradient-to-r from-cyan-700 via-sky-400 to-orange-500 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/70 before:opacity-0 before:blur-sm before:transition group-hover:before:left-full group-hover:before:opacity-100 group-hover:before:duration-700" />
              <div className="flex grow flex-col p-5">
                <h3 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 grow text-sm leading-6 text-slate-600">
                  {item.text.replace(/\.$/, "")}
                </p>
                <span className="mt-5 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  {labels.readMore} <ArrowRight aria-hidden="true" size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function DoorAccessorySection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  return (
    <ProductRelatedSection
      labels={labels}
      section={{
        ...section,
        title: labels.accessoriesEyebrow,
        intro: labels.accessoryFallback,
      }}
    />
  );
}

function ServiceMontasjeSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const visualItem = section.items.find((item) => item.imageUrl);
  const visualImage =
    visualItem?.imageUrl || "/assets/fresvik/images/old-site/_K6R3776_07032013.jpg";

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid overflow-hidden rounded-[8px] border border-slate-200 bg-slate-50 shadow-sm shadow-slate-950/[0.04] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[18rem] overflow-hidden bg-slate-950 sm:min-h-[24rem]">
            <Image
              src={visualImage}
              alt={visualItem?.imageAlt || labels.installationImageAlt}
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <SectionHeader
              eyebrow={labels.installationEyebrow}
              title={labels.installationTitle}
              intro={labels.installationIntro}
            />

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {section.items.map((item, itemIndex) => {
                const content = (
                  <>
                    <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-cyan-50 text-cyan-800 ring-1 ring-cyan-100">
                      <CheckCircle2 aria-hidden="true" size={19} />
                    </span>
                    <span className="min-w-0">
                      <h3 className="text-sm font-semibold leading-snug text-slate-950">
                        {item.title}
                      </h3>
                      {item.href ? (
                        <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-800">
                          {labels.readMore}
                          <ArrowRight aria-hidden="true" size={14} />
                        </span>
                      ) : null}
                    </span>
                  </>
                );

                if (item.href) {
                  return (
                    <Link
                      key={contentCardKey(item, itemIndex, section.title)}
                      href={item.href}
                      className="group flex items-center gap-3 rounded-[8px] border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-950/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <div
                    key={contentCardKey(item, itemIndex, section.title)}
                    className="flex items-center gap-3 rounded-[8px] border border-slate-200 bg-white p-4"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={localizedContentHref("/kontakt", labels)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
              >
                {labels.clarifyInstallation}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <Link
                href={localizedContentHref("/monteringsanvisning", labels)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
              >
                {labels.installationGuides}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServiceDeliverySection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const [featuredItem, ...secondaryItems] = section.items;
  const ctaItem = secondaryItems.find((item) => item.href);
  const detailItems = secondaryItems.filter((item) => !item.href);
  const detailText: Record<string, string> =
    labels.locale === "en"
      ? {
          "Clear labelling":
            "Parts are clearly labelled to simplify receiving and installation.",
          "Installation guides online":
            "Installation guides are easy to download when the delivery is ready to be installed.",
        }
      : {
          "Synleg merking":
            "Delar blir godt og synleg merka, slik at mottak og montering blir ryddigare.",
          "Gode monteringsansvisningar på nett":
            "Monteringsanvisningar er enkle å laste ned frå nettsida når leveransen skal monterast.",
        };

  if (!featuredItem) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <SectionHeader
            eyebrow={labels.deliveryEyebrow}
            title={labels.deliveryTitle}
            intro={labels.deliveryIntro}
          />

          <article className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.06]">
            {featuredItem.imageUrl ? (
              <div className="relative min-h-72 bg-slate-100">
                <Image
                  src={featuredItem.imageUrl}
                  alt={featuredItem.imageAlt || featuredItem.title}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/80 to-transparent" />
              </div>
            ) : null}
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                  {labels.safeDelivery}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
                  {featuredItem.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  {cleanCardText(
                    featuredItem.text,
                    labels.deliveryFallback,
                  )}
                </p>
              </div>

              <div className="grid gap-3">
                {detailItems.map((item, itemIndex) => (
                  <article
                    key={contentCardKey(item, itemIndex, section.title)}
                    className="rounded-[8px] border border-slate-200 bg-slate-50 p-4"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="text-cyan-800"
                      size={20}
                    />
                    <h3 className="mt-3 text-base font-semibold leading-snug text-slate-950">
                      {item.title.replace(
                        "monteringsansvisningar",
                        "monteringsanvisningar",
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {detailText[item.title] ||
                        cleanCardText(
                          item.text,
                          labels.deliveryInfoFallback,
                        )}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {ctaItem?.href ? (
              <div className="border-t border-slate-200 bg-slate-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-4">
                <p className="text-sm font-semibold text-slate-950">
                  {ctaItem.title}
                </p>
                <Link
                  href={ctaItem.href}
                  className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2 sm:mt-0"
                >
                  {labels.contactUs}
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </div>
            ) : null}
          </article>
        </div>
      </Container>
    </section>
  );
}

function ServicePartsSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const [introItem, ...secondaryItems] = section.items;
  const ctaItem = secondaryItems.find((item) => item.href);
  const detailItems = secondaryItems.filter((item) => !item.href);

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid overflow-hidden rounded-[8px] border border-slate-900 bg-slate-950 shadow-xl shadow-slate-950/[0.12] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-80 p-6 text-white sm:p-8 lg:p-10">
            {introItem?.imageUrl ? (
              <Image
                src={introItem.imageUrl}
                alt={introItem.imageAlt || introItem.title}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center opacity-20"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/95 to-cyan-950/70" />
            <div className="relative z-10 flex min-h-64 flex-col justify-between">
              <div>
                <span className="grid size-12 place-items-center rounded-[8px] bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-200/20">
                  <Wrench aria-hidden="true" size={25} />
                </span>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                  {labels.serviceEyebrow}
                </p>
                <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                  {introItem?.title || labels.serviceFallbackTitle}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                  {labels.serviceIntro}
                </p>
              </div>

              {ctaItem?.href ? (
                <Link
                  href={ctaItem.href}
                  className="mt-8 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {labels.contactService}
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 bg-white p-6 sm:p-8">
            {detailItems.map((item, itemIndex) => (
              <article
                key={contentCardKey(item, itemIndex, section.title)}
                className="rounded-[8px] border border-slate-200 bg-slate-50 p-5"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="text-cyan-800"
                  size={21}
                />
                <h3 className="mt-4 text-xl font-semibold tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {cleanCardText(
                    item.text,
                    labels.servicePartsFallback,
                  )}
                </p>
              </article>
            ))}

            <div className="rounded-[8px] border border-cyan-100 bg-cyan-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                  {labels.contact}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">
                  {ctaItem?.title || labels.needServiceParts}
                </h3>
              </div>
              <a
                href="tel:+4757698300"
                className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 sm:mt-0"
              >
                <PhoneCall aria-hidden="true" size={17} />
                57 69 83 00
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServiceIndexSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const isEnglish = labels.locale === "en";
  const serviceDescriptions: Record<string, string> = isEnglish
    ? {
        Installation:
          "Planning and installation of panels, gates, doors and related solutions.",
        Delivery:
          "Coordination of complete deliveries to projects, with safe delivery and clear marking.",
        "Service and spare parts":
          "Follow-up after delivery, service and spare parts for doors and gates when something is urgent.",
      }
    : {
        Montasje:
          "Planlegging og gjennomføring av montasje for panel, portar, dører og tilhøyrande løysingar.",
        Leveranse:
          "Koordinering av komplette leveransar til prosjekt, med vekt på sikker levering og tydeleg merking.",
        "Service og reservedeler":
          "Oppfølging etter levering, service og reservedeler til dører og portar når noko hastar.",
      };

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <SectionHeader
              eyebrow={isEnglish ? "Services" : "Tenester"}
              title={
                isEnglish
                  ? "From clarification to completed delivery"
                  : "Frå avklaring til ferdig leveranse"
              }
              intro={
                isEnglish
                  ? "Fresvik Produkt helps with installation, delivery and follow-up of cold, freezer and panel solutions."
                  : "Fresvik Produkt hjelper med montasje, leveranse og oppfølging av kjøle-, fryse- og panelløysingar."
              }
            />
            <Link
              href={withLocale("/kontakt", isEnglish ? "en" : "nn")}
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
            >
              {labels.contactUs}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>

          <div className="grid gap-4">
            {section.items.map((item, itemIndex) => {
              const icon =
                ["Montasje", "Installation"].includes(item.title) ? (
                  <Wrench aria-hidden="true" size={23} />
                ) : ["Leveranse", "Delivery"].includes(item.title) ? (
                  <CheckCircle2 aria-hidden="true" size={23} />
                ) : (
                  <ShieldCheck aria-hidden="true" size={23} />
                );

              return (
                <Link
                  key={contentCardKey(item, itemIndex, section.title)}
                  href={item.href || withLocale("/tenester", isEnglish ? "en" : "nn")}
                  className="group grid gap-4 rounded-[8px] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                >
                  <span className="grid size-12 place-items-center rounded-[8px] bg-white text-cyan-800 shadow-sm shadow-slate-950/[0.04] ring-1 ring-slate-200 transition group-hover:bg-cyan-50">
                    {icon}
                  </span>
                  <span>
                    <span className="block text-lg font-semibold text-slate-950">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600">
                      {serviceDescriptions[item.title] ||
                        cleanCardText(
                          item.text,
                          isEnglish
                            ? "Service from Fresvik Produkt."
                            : "Teneste frå Fresvik Produkt.",
                        )}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                    {labels.readMore}
                    <ArrowRight aria-hidden="true" size={17} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServiceApprovalSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const introItem = section.items[0];
  const documentItem = section.items.find((item) => item.href);
  const bulletItems = section.items.filter(
    (item) => item !== introItem && item !== documentItem,
  );

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-14 lg:py-16">
        <div className="grid overflow-hidden rounded-[8px] border border-slate-900 bg-slate-950 shadow-xl shadow-slate-950/[0.12] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 p-6 text-white sm:p-8 lg:border-b-0 lg:border-r">
            <div>
              <span className="grid size-12 place-items-center rounded-[8px] bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-200/20">
                <ShieldCheck aria-hidden="true" size={25} />
              </span>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                {labels.approvalEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                {labels.centralApproval}
              </h2>
              {introItem ? (
                <p className="mt-5 text-base leading-8 text-slate-300">
                  {cleanCardText(
                    introItem.text,
                    labels.approvalIntroFallback,
                  )}
                </p>
              ) : null}
            </div>

            {documentItem?.href ? (
              <a
                href={documentItem.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {labels.openApproval}
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            ) : null}
          </div>

          <div className="bg-white p-6 sm:p-8">
            {documentItem ? (
              <div>
                <h3 className="text-xl font-semibold text-slate-950">
                  {labels.documentedExpertise}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  {cleanCardText(
                    documentItem.text,
                    labels.centralApprovalDocumentFallback,
                  )}
                </p>
              </div>
            ) : null}

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {bulletItems.map((item, itemIndex) => (
                <article
                  key={contentCardKey(item, itemIndex, section.title)}
                  className="rounded-[8px] border border-slate-200 bg-slate-50 p-4"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="text-cyan-800"
                    size={20}
                  />
                  <h4 className="mt-4 text-base font-semibold leading-snug text-slate-950">
                    {item.title}
                  </h4>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServiceInformationSection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  const item = section.items[0];

  if (!item) return null;

  const paragraphs = (item.text || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .filter((paragraph) => {
      const normalized = paragraph.toLowerCase();

      return ![
        "more information about installation",
        "contact our sales department",
        "meir informasjon om montasje",
        "ta kontakt med vår salsavdeling",
      ].some((marker) => normalized.includes(marker));
    });
  const [intro, ...content] = paragraphs;
  const installationTypes = content.slice(0, 2);
  const serviceDetails = content.slice(2, 4);
  const qualifications = content.slice(4);
  const title =
    cleanMigrationTitle(item.title).split("|")[0]?.trim() ||
    cleanMigrationTitle(section.title);

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              {cleanMigrationTitle(section.title)}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              {title}
            </h2>
            {intro ? (
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-700">
                {intro}
              </p>
            ) : null}
          </div>

          <div className="border-y border-slate-200">
            {installationTypes.length > 0 ? (
              <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-slate-200">
                {installationTypes.map((text, index) => (
                  <div
                    key={`${section.title}-installation-type-${index}`}
                    className="flex gap-4 border-b border-slate-200 py-5 last:border-b-0 sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:pr-0"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-cyan-50 text-cyan-800">
                      <Wrench aria-hidden="true" size={20} />
                    </span>
                    <p className="pt-2 text-sm font-semibold leading-6 text-slate-950">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {serviceDetails.length > 0 ? (
              <div className="space-y-4 border-t border-slate-200 py-6">
                {serviceDetails.map((text, index) => (
                  <p
                    key={`${section.title}-service-detail-${index}`}
                    className="max-w-3xl text-base leading-7 text-slate-700"
                  >
                    {text}
                  </p>
                ))}
              </div>
            ) : null}

            {qualifications.length > 0 ? (
              <div className="grid border-t border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-slate-200">
                {qualifications.map((text, index) => (
                  <div
                    key={`${section.title}-qualification-${index}`}
                    className="flex gap-3 border-b border-slate-200 py-5 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-cyan-800"
                      size={19}
                    />
                    <p className="text-sm font-semibold leading-6 text-slate-950">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

function AccessoryOverviewSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const items = section.items.some((item) => item.href?.startsWith("/andre-produkter/"))
    ? section.items
    : accessoryOverviewItems(labels.locale);

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={labels.accessoriesEyebrow}
            title={labels.equipmentAndSpareParts}
            intro={cleanMigrationIntro(section.intro)}
          />
          <Link
            href={localizedContentHref("/kontakt", labels)}
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
          >
            {labels.askForRightPart}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, section.title)}
              href={
                item.href || localizedContentHref("/tilleggsutstyr", labels)
              }
              className="group flex min-h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              {item.imageUrl ? (
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(min-width: 1280px) 25rem, (min-width: 768px) 45vw, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <span className="relative h-1 overflow-hidden bg-gradient-to-r from-cyan-700 via-sky-400 to-orange-500 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/70 before:opacity-0 before:blur-sm before:transition group-hover:before:left-full group-hover:before:opacity-100 group-hover:before:duration-700" />
              <div className="flex grow flex-col p-5">
                <h3 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 grow text-sm leading-6 text-slate-600">
                  {cleanCardText(
                    item.text,
                    labels.accessoryPartFallback,
                  )}
                </p>
                <span className="mt-5 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  {labels.readMore} <ArrowRight aria-hidden="true" size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function accessoryArticleNumber(text: string) {
  return text.match(/Artikkelnr\s+\S+/i)?.[0];
}

function AccessoryOrderSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const items = section.items.filter(
    (item) => !item.title.toLowerCase().includes("intertecnica hengsel"),
  );
  const intro =
    section.intro ||
    labels.orderAccessoriesIntro;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={labels.sparePartsEyebrow}
            title={labels.equipmentAndSpareParts}
            intro={intro}
          />
          <div className="flex flex-col gap-2 rounded-[8px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm shadow-slate-950/[0.03] sm:flex-row sm:items-center">
            <span className="font-semibold text-slate-950">Tomas Kruvelis</span>
            <span className="hidden text-slate-300 sm:inline">/</span>
            <a
              href="mailto:tomkru@fresvik.no"
              className="inline-flex items-center gap-1.5 font-semibold text-cyan-800 transition hover:text-slate-950"
            >
              <Mail aria-hidden="true" size={15} />
              Tomkru@fresvik.no
            </a>
            <span className="hidden text-slate-300 sm:inline">/</span>
            <a
              href="tel:+4746581422"
              className="inline-flex items-center gap-1.5 font-semibold text-cyan-800 transition hover:text-slate-950"
            >
              <PhoneCall aria-hidden="true" size={15} />
              46 58 14 22
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, itemIndex) => {
            const articleNumber = accessoryArticleNumber(item.text);

            return (
              <article
                key={contentCardKey(item, itemIndex, section.title)}
                className="group flex min-h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08]"
              >
                {item.imageUrl ? (
                  <div className="relative aspect-[4/3] bg-slate-50 p-3">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(min-width: 1280px) 18rem, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-contain object-center p-3 transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <span className="relative h-1 overflow-hidden bg-gradient-to-r from-cyan-700 via-sky-400 to-orange-500 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/70 before:opacity-0 before:blur-sm before:transition group-hover:before:left-full group-hover:before:opacity-100 group-hover:before:duration-700" />
                <div className="flex grow flex-col p-5">
                  <h3 className="text-base font-semibold leading-snug text-slate-950">
                    {item.title}
                  </h3>
                  {articleNumber ? (
                    <p className="mt-3 w-fit rounded-[8px] bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-800">
                      {articleNumber}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ProductIndexContactSection({
  labels = getContentLabels(),
}: {
  labels?: ContentLabels;
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12">
        <div className="grid gap-6 rounded-[8px] border border-slate-800 bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/[0.08] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
              {labels.productSelectionEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal sm:text-3xl">
              {labels.helpFindSolution}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
              {labels.productContactIntro}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:post@fresvik.no"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <Mail aria-hidden="true" size={17} />
              post@fresvik.no
            </a>
            <a
              href="tel:+4757698300"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-white/20 px-4 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <PhoneCall aria-hidden="true" size={17} />
              57 69 83 00
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductReferenceSection({
  section,
  eyebrow,
  title,
  badge = "Fasadepanel",
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  eyebrow?: string;
  title?: string;
  badge?: string;
  labels?: ContentLabels;
}) {
  const displayEyebrow = eyebrow || labels.referencesEyebrow;
  const displayTitle = title || labels.selectedFacadeProjects;
  const items = section.items.filter((item) => {
    if (!item.href) return true;
    const path = stripLocalePrefix(item.href);
    return path !== "/referansar" && path !== "/references";
  });

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={displayEyebrow}
            title={displayTitle}
            intro={cleanMigrationIntro(section.intro)}
          />
          <Link
            href={localizedContentHref("/referansar", labels)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            {labels.allReferences}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, section.title)}
              href={
                item.href || localizedContentHref("/referansar", labels)
              }
              className="group grid min-h-full overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 lg:grid-cols-[1.08fr_0.92fr]"
            >
              <div className="flex flex-col justify-center p-5 sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                  {badge}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {item.text === "Featured."
                    ? labels.projectFallback
                    : cleanCardText(
                        item.text,
                        labels.projectFallback,
                      )}
                </p>
                <span className="mt-6 inline-flex self-start items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  {labels.readMore} <ArrowRight aria-hidden="true" size={17} />
                </span>
              </div>
              {item.imageUrl ? (
                <div className="relative min-h-64 overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(min-width: 1024px) 28rem, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-white to-transparent lg:block" />
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ReferenceIndexIntroSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const isEnglish = labels.locale === "en";

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 lg:py-14">
        <div className="grid gap-8 rounded-[8px] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-950/[0.04] sm:p-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-center">
          <SectionHeader
            eyebrow={isEnglish ? "Experience" : "Erfaring"}
            title={
              isEnglish
                ? "Deliveries for retail, industry, commercial kitchens and offshore"
                : "Leveransar til butikk, industri, storkjøken og offshore"
            }
          />
          <p className="text-base leading-8 text-slate-700">
            {cleanCardText(
              section.intro,
              isEnglish
                ? "Fresvik Produkt delivers solutions for retail, industry, commercial kitchens and offshore."
                : "Fresvik Produkt leverer løysingar til butikk, industri, storkjøken og offshore.",
            )}
          </p>
        </div>
      </Container>
    </section>
  );
}

function ReferenceIndexGridSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const isEnglish = labels.locale === "en";

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-14 lg:py-16">
        <SectionHeader
          eyebrow={isEnglish ? "Projects" : "Prosjekt"}
          title={isEnglish ? "Selected references" : "Utvalde referansar"}
          intro={
            isEnglish
              ? "Projects from different application areas, gathered for a quick overview."
              : "Prosjekt frå ulike bruksområde, samla for rask oversikt."
          }
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, "reference-index")}
              href={
                item.href || localizedContentHref("/referansar", labels)
              }
              className="group flex min-h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              {item.imageUrl ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(min-width: 1280px) 27vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <span className="relative h-1 overflow-hidden bg-gradient-to-r from-cyan-700 via-sky-400 to-orange-500 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/70 before:opacity-0 before:blur-sm before:transition group-hover:before:left-full group-hover:before:opacity-100 group-hover:before:duration-700" />
              <div className="flex grow flex-col p-5">
                <h3 className="text-lg font-semibold leading-snug text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 grow text-sm leading-6 text-slate-600">
                  {cleanCardText(
                    item.text,
                    labels.projectFallback,
                  )}
                </p>
                <span className="mt-5 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  {labels.readMore} <ArrowRight aria-hidden="true" size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ReferenceCategorySection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const isEnglish = labels.locale === "en";

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12">
        <div className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.04] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow={isEnglish ? "Categories" : "Kategoriar"}
              title={
                isEnglish
                  ? "Find references by application area"
                  : "Finn referansar etter bruksområde"
              }
              intro={
                isEnglish
                  ? "Shortcuts to references by application area."
                  : "Snarvegar til referansar etter bruksområde."
              }
            />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {section.items.map((item, itemIndex) => (
              <Link
                key={contentCardKey(item, itemIndex, "reference-categories")}
                href={
                  item.href || localizedContentHref("/referansar", labels)
                }
                className="group flex min-h-24 items-center justify-between gap-4 rounded-[8px] border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
              >
                <span>{item.title}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="shrink-0 text-cyan-800 transition group-hover:translate-x-0.5"
                  size={17}
                />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function NewsIndexSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const isEnglish = labels.locale === "en";
  const items = section.items.filter(
    (item) =>
      item.href && !["aktuelt", "news"].includes(item.title.toLocaleLowerCase()),
  );

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-14 lg:py-16">
        <SectionHeader
          eyebrow={isEnglish ? "News" : "Nyheiter"}
          title={isEnglish ? "Latest from Fresvik" : "Siste frå Fresvik"}
          intro={
            isEnglish
              ? "News, deliveries and updates from Fresvik Produkt."
              : "Nyheiter, leveransar og oppdateringar frå Fresvik Produkt."
          }
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, "news-index")}
              href={item.href || localizedContentHref("/aktuelt", labels)}
              className="group flex min-h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              {item.imageUrl ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(min-width: 1280px) 27vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <span className="relative h-1 overflow-hidden bg-gradient-to-r from-cyan-700 via-sky-400 to-orange-500 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/70 before:opacity-0 before:blur-sm before:transition group-hover:before:left-full group-hover:before:opacity-100 group-hover:before:duration-700" />
              <div className="flex grow flex-col p-5">
                {item.meta ? (
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-800">
                    {item.meta}
                  </p>
                ) : null}
                <h3 className="text-lg font-semibold leading-snug text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 grow text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
                <span className="mt-5 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  {labels.readMore} <ArrowRight aria-hidden="true" size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function NewsArticleBodySection({
  page,
  section,
  labels = getContentLabels(),
}: {
  page: ContentPage;
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const paragraphs = section.items
    .flatMap((item) => item.text.split(/\n{2,}/))
    .map((text) => text.trim())
    .filter(Boolean);
  const heroImage = page.cards.find((card) => card.imageUrl);
  const formattedDate = formatContentDate(page.publishedAt, labels.locale);

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 lg:py-16">
        <article className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04]">
          <div className="grid gap-0 lg:grid-cols-[0.58fr_0.42fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                  {labels.newsEyebrow}
                </span>
                {formattedDate ? (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                    {formattedDate}
                  </span>
                ) : null}
              </div>

              <h2 className="mt-5 max-w-3xl text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
                {page.title}
              </h2>

              <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-slate-700">
                {(paragraphs.length > 0 ? paragraphs : [page.intro]).map(
                  (paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ),
                )}
              </div>

            </div>

            {heroImage?.imageUrl ? (
              <div className="relative min-h-72 border-t border-slate-200 bg-slate-100 lg:border-l lg:border-t-0">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.imageAlt || heroImage.title}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <div className="flex min-h-72 items-center justify-center border-t border-slate-200 bg-slate-950 p-10 text-white lg:border-l lg:border-t-0">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                    Fresvik Produkt
                  </p>
                  <p className="mt-4 max-w-sm text-2xl font-semibold leading-tight">
                    {labels.archiveShortMessage}
                  </p>
                </div>
              </div>
            )}
          </div>
        </article>
      </Container>
    </section>
  );
}

function NewsSourceLinksSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12">
        <div className="grid gap-6 rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.04] sm:p-8 lg:grid-cols-[0.34fr_0.66fr]">
          <SectionHeader
            eyebrow={labels.furtherReading}
            title={labels.articleLinksTitle}
            intro={labels.articleLinksIntro}
          />
          <div className="grid gap-3">
            {section.items.map((item, itemIndex) => {
              const href =
                item.href || localizedContentHref("/aktuelt", labels);
              const LinkElement = isExternalHref(href) ? "a" : Link;
              const linkProps = isExternalHref(href)
                ? { href, target: "_blank", rel: "noreferrer" }
                : { href };

              return (
                <LinkElement
                  key={contentCardKey(item, itemIndex, "news-source-links")}
                  {...linkProps}
                  className="group flex items-center justify-between gap-4 rounded-[8px] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
                >
                  <span>
                    <span className="block text-sm font-semibold text-slate-950">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {item.text.toLowerCase().includes("gammal")
                        ? labels.relatedNewsReferenceFallback
                        : item.text}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="shrink-0 text-cyan-800 transition group-hover:translate-x-0.5"
                    size={17}
                  />
                </LinkElement>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductCertificateLinksSection({
  section,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  labels?: ContentLabels;
}) {
  const items = section.items.filter(
    (item) =>
      !item.title.toLowerCase().includes("gasta") &&
      !isPublicArchiveOnlyItem(item),
  );
  const displayIntro =
    cleanMigrationIntro(section.intro) ||
    labels.certificatesIntro;

  return (
    <section className="border-b border-slate-200 bg-slate-50 py-12">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow={labels.certified}
            title={labels.certificatesAndApprovals}
            intro={displayIntro}
          />
          <Link
            href={localizedContentHref("/dokumentasjon", labels)}
            className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            {labels.documentation}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, itemIndex) => {
            const href =
              item.href ||
              certificationFallbackHref(item.title) ||
              localizedContentHref("/dokumentasjon", labels);
            const isExternal = isExternalHref(href);
            const displayText = certificationDisplayText(item, labels);
            const LinkElement = isExternal || isPdfHref(href) ? "a" : Link;
            const linkProps =
              isExternal || isPdfHref(href)
                ? { href, target: "_blank", rel: "noreferrer" }
                : { href };

            return (
              <LinkElement
                key={contentCardKey(item, itemIndex, section.title)}
                {...linkProps}
                className="group flex min-h-[11.5rem] flex-col rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
              >
                <div className="flex h-24 items-center justify-center border-b border-slate-100 bg-white p-4">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      width={220}
                      height={120}
                      className="max-h-16 w-auto max-w-full object-contain transition duration-300 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <FileText aria-hidden="true" className="text-cyan-800" size={30} />
                  )}
                </div>
                <div className="flex grow flex-col p-4">
                  <h3 className="text-base font-semibold leading-snug text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 grow text-xs leading-5 text-slate-600">
                    {displayText}
                  </p>
                  <span className="mt-3 inline-flex self-end items-center gap-1.5 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                    {labels.open}
                    <ExternalLink aria-hidden="true" size={15} />
                  </span>
                </div>
              </LinkElement>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ContentSections({
  sections,
  pageSlug,
  page,
  labels,
}: {
  sections: ContentPage["sections"];
  pageSlug?: string;
  page?: ContentPage;
  labels: ContentLabels;
}) {
  const sourceSlug = stripLocalePrefix(pageSlug || page?.slug || "/");
  const isPirPage = sourceSlug === "/produkt/fresvik-pir-panel";
  const isPurPage = sourceSlug === "/produkt/fresvik-pur-panel";
  const isPortPage = sourceSlug === "/produkt/kjole-fryseportar";
  const isDoorPage = sourceSlug === "/produkt/kjole-frysedorer";
  const isFacadePage = sourceSlug === "/produkt/fasadepanel";
  const isFrysetunnelPage = sourceSlug === "/produkt/frysetunnel";
  const isDocumentationPage = sourceSlug === "/dokumentasjon";
  const isMountingPage = sourceSlug === "/monteringsanvisning";
  const isElectricSkyveportPage =
    sourceSlug === "/monteringsanvisningar-fresvik-skyveport";
  const isServiceIndexPage = sourceSlug === "/tenester";
  const isMontasjeServicePage = sourceSlug === "/tenester/montasje";
  const isLeveranseServicePage = sourceSlug === "/tenester/leveranse";
  const isServicePartsPage = sourceSlug === "/tenester/service-reservedeler";
  const isReferenceIndexPage = sourceSlug === "/referansar";
  const isNewsIndexPage = sourceSlug === "/aktuelt";
  const isNewsDetailPage =
    sourceSlug.startsWith("/aktuelt/") && sourceSlug !== "/aktuelt";
  const isProductIndexPage = sourceSlug === "/produkt";
  const isTransportDamagePage = sourceSlug === "/transportskade";
  const isCompanyOverviewPage = sourceSlug === "/om-oss";
  const isFirmainfoPage = sourceSlug === "/firmainfo";
  const isEmployeesPage = sourceSlug === "/tilsette";
  const isJobPage = sourceSlug === "/stillingledig";
  const isPrivacyPage = sourceSlug === "/personvernerklering";
  const isTransparencyPage = sourceSlug === "/openheitslova";
  const isLegalPage = isPrivacyPage || isTransparencyPage;
  const isCompanyUtilityPage =
    isCompanyOverviewPage || isFirmainfoPage || isEmployeesPage || isJobPage;
  const isStyledServicePage =
    isServiceIndexPage ||
    isMontasjeServicePage ||
    isLeveranseServicePage ||
    isServicePartsPage;
  const isAccessoryIndexPage = sourceSlug === "/tilleggsutstyr";
  const isDesignedProductPage =
    isPirPage ||
    isPurPage ||
    isPortPage ||
    isDoorPage ||
    isFacadePage ||
    isFrysetunnelPage;
  const isAccessoryPage = sourceSlug.startsWith("/andre-produkter/");
  const isReferenceDetailPage =
    sourceSlug.startsWith("/referansar/") && sourceSlug !== "/referansar";
  const referencePrimaryImageUrl = isReferenceDetailPage
    ? sections
        .find(
          (section) =>
            sectionIs(section, "archive-full-text") ||
            sectionIs(section, "project-body"),
        )
        ?.items.find((item) => item.imageUrl)?.imageUrl
    : undefined;
  const accessoryImagesSection = isAccessoryPage
    ? sections.find((section) => sectionIs(section, "accessory-images"))
    : undefined;
  const pirProducerSection = isPirPage
    ? sections.find((section) => sectionIs(section, "pir-producer"))
    : undefined;
  const pirProducerHighlight =
    pirProducerSection?.items[0]?.text ||
    (pirProducerSection
      ? `${pirProducerSection.title} ${pirProducerSection.intro || ""}.`
      : "Den første norske produsenten av tilpassa PIR-Panel med enkel eksenterlås.");
  const visibleSections =
    isDesignedProductPage ||
    isProductIndexPage ||
    isTransportDamagePage ||
    isReferenceDetailPage ||
    isDocumentationPage ||
    isMountingPage ||
    isElectricSkyveportPage ||
    isAccessoryIndexPage ||
    isAccessoryPage ||
    isStyledServicePage ||
    isReferenceIndexPage ||
    isNewsIndexPage ||
    isNewsDetailPage ||
    isCompanyUtilityPage ||
    isLegalPage
      ? sections.filter(
          (section) =>
            !(
              (isCompanyUtilityPage || isLegalPage) &&
              (sectionIs(section, "contact") ||
                sectionIs(section, "certificates") ||
                sectionIs(section, "newsletter") ||
                isPublicArchiveOnlySection(section))
            ) &&
            !(
              isProductIndexPage &&
              isPublicArchiveOnlySection(section)
            ) &&
            !(
              isPirPage &&
              sectionIs(section, "product-benefits")
            ) &&
            !(
              isPirPage &&
              sectionIs(section, "pir-producer")
            ) &&
            !(
              isDesignedProductPage &&
              isPartnersContentSection(section)
            ) &&
            !(
              isFrysetunnelPage &&
              isFrysetunnelFeatureSection(section)
            ) &&
            !(
              isFacadePage &&
              sectionIs(section, "contact-information")
            ) &&
            !(
              isReferenceDetailPage &&
              sectionIs(section, "archive-reference")
            ) &&
            !(
              isReferenceDetailPage &&
              sectionIs(section, "archive-documents")
            ) &&
            !(
              isDocumentationPage &&
              (sectionIs(section, "certificates") ||
                sectionIs(section, "contact") ||
                isPublicArchiveOnlySection(section))
            ) &&
            !(
              isElectricSkyveportPage &&
              (sectionIs(section, "electric-downloads") ||
                sectionIs(section, "certificates") ||
                sectionIs(section, "contact") ||
                isPublicArchiveOnlySection(section))
            ) &&
            !(
              isMountingPage &&
              (sectionIs(section, "certificates") ||
                sectionIs(section, "contact") ||
                isPublicArchiveOnlySection(section))
            ) &&
            !(
              isAccessoryIndexPage &&
              (isPublicArchiveOnlySection(section) ||
                sectionIs(section, "accessory-overview") ||
                sectionIs(section, "contact"))
            ) &&
            !(
              isAccessoryPage &&
              sectionIs(section, "accessory-images")
            ) &&
            !(
              isStyledServicePage &&
              isPublicArchiveOnlySection(section)
            ) &&
            !(
              isTransportDamagePage &&
              isPublicArchiveOnlySection(section)
            ) &&
            !(
              isReferenceIndexPage &&
              (sectionIs(section, "contact") ||
                sectionIs(section, "certificates"))
            ) &&
            !(
              isNewsIndexPage &&
              (sectionIs(section, "contact") ||
                sectionIs(section, "certificates"))
            ) &&
            !(
              isNewsDetailPage &&
              (sectionIs(section, "contact") ||
                sectionIs(section, "certificates") ||
                isPublicArchiveOnlySection(section))
            ) &&
            !(
              isServiceIndexPage &&
              sectionIs(section, "archive-service-urls")
            ) &&
            !sectionIs(section, "archive-newsletter"),
        )
      : sections.filter((section) => !isPublicArchiveOnlySection(section));

  const montasjeServiceDetailsSection = isMontasjeServicePage
    ? visibleSections.find((section) => sectionIs(section, "service-details"))
    : undefined;
  const montasjeServiceCtaSection = isMontasjeServicePage
    ? visibleSections.find((section) => sectionIs(section, "installation-cta"))
    : undefined;

  return visibleSections.map((section, sectionIndex) => {
    if (isCompanyOverviewPage && sectionIs(section, "company-overview")) {
      return (
        <CompanyOverviewSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          sectionIndex={sectionIndex}
          labels={labels}
        />
      );
    }

    if (isFirmainfoPage && sectionIs(section, "company-info")) {
      return (
        <CompanyInfoSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isEmployeesPage &&
      sectionIs(section, "employees")
    ) {
      return (
        <EmployeeGridSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isJobPage &&
      sectionIs(section, "job-opening")
    ) {
      return (
        <JobOpeningSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isLegalPage &&
      sectionIs(section, "legal-text")
    ) {
      return (
        <LegalTextSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (isLegalPage && sectionIs(section, "legal-documents")) {
      return (
        <LegalDocumentsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isNewsIndexPage &&
      sectionIs(section, "news")
    ) {
      return (
        <NewsIndexSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (isNewsIndexPage && sectionIs(section, "article-links")) {
      return (
        <NewsSourceLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (isNewsDetailPage && page && sectionIs(section, "article-body")) {
      return (
        <NewsArticleBodySection
          key={`${section.title}-${sectionIndex}`}
          page={page}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isReferenceIndexPage &&
      sectionIs(section, "reference-intro")
    ) {
      return (
        <ReferenceIndexIntroSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isReferenceIndexPage &&
      sectionIs(section, "references")
    ) {
      return (
        <ReferenceIndexGridSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isReferenceIndexPage &&
      sectionIs(section, "categories")
    ) {
      return (
        <ReferenceCategorySection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isElectricSkyveportPage &&
      sectionIs(section, "electric-downloads")
    ) {
      return (
        <ElectricSkyveportDownloadsSection
          key={`electric-skyveport-downloads-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (isMountingPage && sectionIs(section, "mounting-downloads")) {
      return (
        <MountingDownloadsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (isMountingPage && sectionIs(section, "mounting-cta")) {
      return (
        <MountingDocumentationCta
          key={`${section.title}-${sectionIndex}`}
          labels={labels}
        />
      );
    }

    if (
      isDocumentationPage &&
      sectionIs(section, "documents")
    ) {
      return (
        <DocumentationDownloadsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (isDocumentationPage && sectionIs(section, "documentation-cta")) {
      return (
        <DocumentationContactSection
          key={`${section.title}-${sectionIndex}`}
          labels={labels}
        />
      );
    }

    if (isAccessoryPage && sectionIs(section, "accessory-info")) {
      return (
        <AccessoryDetailSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          imageSection={accessoryImagesSection}
          labels={labels}
        />
      );
    }

    if (isAccessoryPage && sectionIs(section, "accessory-navigation")) {
      return (
        <AccessoryNavigationSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isAccessoryIndexPage &&
      sectionIs(section, "accessory-overview")
    ) {
      return (
        <AccessoryOverviewSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (isAccessoryIndexPage && sectionIs(section, "accessory-order")) {
      return (
        <AccessoryOrderSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (isProductIndexPage && sectionIs(section, "contact")) {
      return (
        <ProductIndexContactSection
          key={`${section.title}-${sectionIndex}`}
          labels={labels}
        />
      );
    }

    if (
      isProductIndexPage &&
      sectionIs(section, "products")
    ) {
      return (
        <HomeSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          sectionIndex={sectionIndex}
          labels={labels}
        />
      );
    }

    if (
      isProductIndexPage &&
      sectionIs(section, "certificates")
    ) {
      return (
        <ProductCertificateLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={{
            ...section,
            intro: labels.certificatesIntro,
          }}
          labels={labels}
        />
      );
    }

    if (
      isAccessoryIndexPage &&
      sectionIs(section, "certificates")
    ) {
      return (
        <ProductCertificateLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={{
            ...section,
            intro: labels.certificatesIntro,
          }}
          labels={labels}
        />
      );
    }

    if (
      isServiceIndexPage &&
      sectionIs(section, "services")
    ) {
      return (
        <ServiceIndexSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (isLeveranseServicePage && sectionIs(section, "delivery")) {
      return (
        <ServiceDeliverySection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isServicePartsPage &&
      sectionIs(section, "service-parts")
    ) {
      return (
        <ServicePartsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isMontasjeServicePage &&
      sectionIs(section, "installation")
    ) {
      return (
        <ServiceMontasjeSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (isMontasjeServicePage && sectionIs(section, "approval")) {
      return (
        <ServiceApprovalSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isMontasjeServicePage &&
      sectionIs(section, "installation-cta")
    ) {
      return montasjeServiceDetailsSection ? (
        <ServiceInformationSection
          key={`${section.title}-${sectionIndex}`}
          section={montasjeServiceDetailsSection}
        />
      ) : null;
    }

    if (isMontasjeServicePage && sectionIs(section, "service-details")) {
      return montasjeServiceCtaSection ? null : (
        <ServiceInformationSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isMontasjeServicePage && sectionIs(section, "contact")) {
      return null;
    }

    if (isLeveranseServicePage && sectionIs(section, "contact")) {
      return null;
    }

    if (isServicePartsPage && sectionIs(section, "contact")) {
      return null;
    }

    if (
      isStyledServicePage &&
      sectionIs(section, "certificates")
    ) {
      return (
        <ProductCertificateLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={{
            ...section,
            intro: labels.certificatesIntro,
          }}
          labels={labels}
        />
      );
    }

    const isLegacyFullText = isLegacyFullTextSection(section);
    const isPirIntro =
      isPirPage &&
      (isLegacyFullText ||
        (sectionIs(section, "product-intro-pir") &&
          !isContactInformationContentSection(section)));
    const isPurIntro =
      isPurPage &&
      (isLegacyFullText ||
        sectionIs(section, "product-intro-pur"));
    const isPortIntro =
      isPortPage &&
      (isLegacyFullText ||
        sectionIs(section, "product-intro-gates"));
    const isDoorIntro =
      isDoorPage &&
      (isLegacyFullText ||
        sectionIs(section, "product-intro-doors"));
    const isFacadeIntro =
      isFacadePage && isLegacyFullText;
    const isFrysetunnelIntro =
      isFrysetunnelPage &&
      (isLegacyFullText ||
        sectionIs(section, "product-intro-freezing-tunnel"));

    if (
      isPirIntro ||
      isPurIntro ||
      isPortIntro ||
      isDoorIntro ||
      isFacadeIntro ||
      isFrysetunnelIntro
    ) {
      if (isFrysetunnelIntro) {
        return (
          <ProductIntroSection
            key={`${section.title}-${sectionIndex}`}
            section={section}
            labels={labels}
          />
        );
      }

      return (
        <ProductIntroSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          highlight={isPirIntro ? pirProducerHighlight : undefined}
          labels={labels}
        />
      );
    }

    if (
      isFrysetunnelPage &&
      sectionIs(section, "section-kontrollert-innfrysing")
    ) {
      return [
        <FrysetunnelControlledSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />,
        <FrysetunnelFeatureRow
          key="frysetunnel-feature-row"
          sections={sections}
          labels={labels}
        />,
      ];
    }

    if (
      isDesignedProductPage &&
      isProductBenefitsContentSection(section)
    ) {
      return (
        <ProductBenefitsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          showIndex={false}
          labels={labels}
        />
      );
    }

    if (
      isReferenceDetailPage &&
      (sectionIs(section, "archive-full-text") ||
        sectionIs(section, "project-body"))
    ) {
      return (
        <ReferenceIntroSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isFacadePage &&
      (sectionIs(section, "product-intro-facade") ||
        sectionIs(section, "facade-core"))
    ) {
      return (
        <FacadeCoreSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          eyebrow={
            sectionIs(section, "product-intro-facade")
              ? labels.productInformation
              : labels.facadeCoreEyebrow
          }
        />
      );
    }

    if (
      isFacadePage &&
      sectionIs(section, "facade-benefits")
    ) {
      return (
        <ProductBenefitsSection
          key={`${section.title}-${sectionIndex}`}
          section={{
            ...section,
            title: labels.facadeBenefitsTitle,
            intro: labels.facadeBenefitsIntro,
          }}
          showIndex={false}
          labels={labels}
        />
      );
    }

    if (
      (isPurPage || isPortPage || isDoorPage || isFacadePage) &&
      sectionIs(section, "product-benefits")
    ) {
      return (
        <ProductBenefitsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          showIndex={isPortPage}
          labels={labels}
        />
      );
    }

    if (isDoorPage && sectionIs(section, "door-models")) {
      return (
        <DoorModelsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (isFacadePage && sectionIs(section, "references")) {
      return (
        <ProductReferenceSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isFrysetunnelPage &&
      sectionIs(section, "product-references")
    ) {
      return (
        <ProductReferenceSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          eyebrow={labels.referencesEyebrow}
          title={labels.freezingProjectsTitle}
          badge={labels.freezingTunnel}
          labels={labels}
        />
      );
    }

    if (isPortPage && sectionIs(section, "product-images")) {
      return (
        <ProductImageGallerySection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isDesignedProductPage &&
      isTechnicalDataContentSection(section)
    ) {
      return (
        <ProductDetailTextSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          productName={isPurPage ? "Fresvik PUR-Panel" : undefined}
          showIndex={false}
        />
      );
    }

    if (
      isDesignedProductPage &&
      isProductDocumentsContentSection(section)
    ) {
      return (
        <ProductDocumentSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isDesignedProductPage &&
      isRelatedAccessoriesContentSection(section)
    ) {
      if (isDoorPage) {
        return (
          <DoorAccessorySection
            key={`${section.title}-${sectionIndex}`}
            section={section}
            labels={labels}
          />
        );
      }

      return (
        <ProductRelatedSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isReferenceDetailPage &&
      (sectionIs(section, "archive-links") ||
        sectionIs(section, "reference-navigation"))
    ) {
      return (
        <ReferenceLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isDesignedProductPage &&
      isCertificateLinksContentSection(section)
    ) {
      return (
        <ProductCertificateLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          labels={labels}
        />
      );
    }

    if (
      isDesignedProductPage &&
      isContactInformationContentSection(section)
    ) {
      return null;
    }

    if (isDesignedProductPage && sectionIs(section, "partners")) {
      const item = section.items[0];

      return (
        <section
          key={`${section.title}-${sectionIndex}`}
          className="border-b border-slate-200 bg-white"
        >
          <Container className="py-12">
            <div className="grid gap-6 rounded-[8px] border border-cyan-100 bg-cyan-50 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                  {labels.cooperationEyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
                  {labels.partnersTitle}
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
                  {section.intro}
                </p>
              </div>
              {item?.href ? (
                <Link
                  href={item.href}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
                >
                  {labels.contactUs}
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              ) : null}
            </div>
          </Container>
        </section>
      );
    }

    if (
      (isDesignedProductPage || isAccessoryPage || isReferenceDetailPage) &&
      section.items.every((item) => !item.href)
    ) {
      if (isAccessoryPage && sectionIs(section, "archive-images")) {
        return (
          <AccessoryImageGallerySection
            key={`${section.title}-${sectionIndex}`}
            section={section}
            labels={labels}
          />
        );
      }

      if (
        isReferenceDetailPage &&
        (sectionIs(section, "archive-images") ||
          sectionIs(section, "project-images"))
      ) {
        return (
          <ReferenceImageGallerySection
            key={`${section.title}-${sectionIndex}`}
            section={section}
            primaryImageUrl={referencePrimaryImageUrl}
            labels={labels}
          />
        );
      }

      const usesInformationMatrix =
        isDesignedProductPage &&
        !isTechnicalDataContentSection(section) &&
        section.items.length > 0 &&
        section.items.every((item) => !item.imageUrl);

      if (usesInformationMatrix) {
        return (
          <ProductInformationMatrixSection
            key={`${section.title}-${sectionIndex}`}
            section={section}
          />
        );
      }

      return (
        <ProductDetailTextSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          productName={isPurPage ? "Fresvik PUR-Panel" : undefined}
          showIndex={
            !(isAccessoryPage || isDoorPage || isFacadePage || isFrysetunnelPage)
          }
          showIntro={!isAccessoryPage}
        />
      );
    }

    return (
      <section key={`${section.title}-${sectionIndex}`} className="py-14">
        <Container>
          <SectionHeader
            title={cleanMigrationTitle(section.title)}
            intro={cleanMigrationIntro(section.intro)}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item, itemIndex) => {
              const displayText = cleanMigrationIntro(item.text);

              return (
                <Card
                  key={contentCardKey(
                    item,
                    itemIndex,
                    `${section.title}-${sectionIndex}`,
                  )}
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      width={720}
                      height={420}
                      className="-mx-5 -mt-5 mb-5 h-52 w-[calc(100%+2.5rem)] rounded-t-[8px] object-cover object-center"
                    />
                  ) : null}
                  {item.meta ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-800">
                      {item.meta}
                    </p>
                  ) : null}
                  <h3 className="text-lg font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  {displayText ? (
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {displayText}
                    </p>
                  ) : null}
                  {item.href ? <CardLink href={item.href} label={labels.open} /> : null}
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    );
  });
}

function HomeSection({
  section,
  sectionIndex,
  labels = getContentLabels(),
}: {
  section: ContentPage["sections"][number];
  sectionIndex: number;
  labels?: ContentLabels;
}) {
  const isEnglish = labels.locale === "en";
  const isProducts = sectionIs(section, "products");
  const isCustomers = sectionIs(section, "customer-areas");
  const isNews = sectionIs(section, "news");
  const isJob = sectionIs(section, "job-opening");
  const isContact = sectionIs(section, "contact");
  const isNewsletter = sectionIs(section, "newsletter");
  const isBadges = sectionIs(section, "trust-badges");
  const isFullTextArchive = sectionIs(section, "archive-full-text");
  const isImageArchive = sectionIs(section, "archive-images");
  const isDocumentArchive = sectionIs(section, "archive-documents");
  const isLinkArchive = sectionIs(section, "archive-links");
  const background = isProducts || isNews || isBadges ? "bg-slate-50" : "bg-white";
  const displayTitle = isProducts
    ? isEnglish
      ? "Products and solutions"
      : "Produkt og løysingar"
    : section.title;
  const displayIntro = isProducts
    ? isEnglish
      ? "Selected products and solutions from Fresvik Produkt."
      : "Utvalde produkt og løysingar frå Fresvik Produkt samla for rask oversikt."
    : isContact
      ? isEnglish
        ? "Contact Fresvik Produkt for product selection, documentation, technical clarification or a concrete offer."
        : "Ta kontakt med Fresvik Produkt for produktval, dokumentasjon, teknisk avklaring eller eit konkret tilbod."
    : cleanMigrationIntro(section.intro);

  if (
    isNewsletter ||
    isFullTextArchive ||
    isImageArchive ||
    isDocumentArchive ||
    isLinkArchive
  ) {
    return null;
  }

  if (isBadges) {
    const badgeItems = section.items.filter((item) => item.imageUrl);

    return (
      <section className="border-b border-slate-900 bg-slate-950 text-white">
        <Container className="py-14 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
              {labels.certified}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              {labels.certificatesAndApprovals}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              {labels.certificatesIntro}
            </p>
          </div>
          <div className="mt-8 rounded-[8px] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-slate-950/20">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {badgeItems.map((item, itemIndex) => (
                <CertificationBadgeLink
                  key={contentCardKey(
                    item,
                    itemIndex,
                    `${section.title}-${sectionIndex}`,
                  )}
                  item={item}
                  itemIndex={itemIndex}
                  scope={`${section.title}-${sectionIndex}`}
                  labels={labels}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (isJob) {
    const item = section.items[0];

    return (
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-14 lg:py-16">
          <article className="grid overflow-hidden rounded-[8px] border border-slate-200 bg-slate-950 text-white shadow-xl shadow-slate-950/10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                {labels.workInFresvik}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
                {item.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                {item.text}
              </p>
              {item.href ? (
                <Link
                  href={item.href}
                  className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {labels.seeVacancies}
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              ) : null}
            </div>
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.imageAlt || item.title}
                width={900}
                height={620}
                className="h-72 w-full object-cover lg:h-full"
              />
            ) : null}
          </article>
        </Container>
      </section>
    );
  }

  const visibleItems = isCustomers
    ? section.items.filter((item) => !item.title.toLowerCase().includes("dekor"))
    : section.items;

  if (isCustomers) {
    const accentItem =
      visibleItems.find((item) => item.title.toLowerCase().includes("skip")) ||
      visibleItems[0];
    const secondaryItems = visibleItems.filter((item) => item !== accentItem);

    return (
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-14 lg:py-16">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow={isEnglish ? "Application areas" : "Bruksområde"}
              title={section.title}
              intro={cleanMigrationIntro(section.intro)}
            />
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            {accentItem ? (
              <article className="group relative min-h-[360px] overflow-hidden rounded-[8px] border border-slate-800 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
                {accentItem.imageUrl ? (
                  <Image
                    src={accentItem.imageUrl}
                    alt={accentItem.imageAlt || accentItem.title}
                    fill
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/10" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="relative flex min-h-[360px] max-w-md flex-col justify-end p-6 sm:p-8">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                    {isEnglish ? "Application area" : "Bruksområde"}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-normal">
                    {accentItem.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-200">
                    {cleanCardText(
                      accentItem.text,
                      isEnglish
                        ? "Solutions from Fresvik Produkt for professional cold and freezer rooms."
                        : "Løysingar frå Fresvik Produkt for profesjonelle kjøle- og fryserom.",
                    )}
                  </p>
                  {accentItem.href ? (
                    <Link
                      href={accentItem.href}
                      className="mt-6 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      {labels.readMore}
                      <ArrowRight aria-hidden="true" size={17} />
                    </Link>
                  ) : null}
                </div>
              </article>
            ) : null}

            <div className="grid gap-4">
              {secondaryItems.map((item, itemIndex) => (
                <article
                  key={contentCardKey(item, itemIndex, `${section.title}-${sectionIndex}-secondary`)}
                  className="group grid min-h-[220px] overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] sm:min-h-[178px] sm:grid-cols-[0.95fr_1.05fr]"
                >
                  <div className="flex min-h-[220px] flex-col justify-center p-5 sm:min-h-[178px] sm:p-6">
                    <h3 className="text-xl font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {cleanCardText(
                      item.text,
                        isEnglish
                          ? "Solutions from Fresvik Produkt for professional cold and freezer rooms."
                          : "Løysingar frå Fresvik Produkt for profesjonelle kjøle- og fryserom.",
                      )}
                    </p>
                    {item.href ? <CardLink href={item.href} label={labels.readMore} /> : null}
                  </div>
                  {item.imageUrl ? (
                    <div className="relative min-h-44 overflow-hidden bg-slate-100 sm:min-h-full">
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt || item.title}
                        fill
                        sizes="(min-width: 1024px) 24vw, 100vw"
                        className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent" />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (isNews) {
    return (
      <section className="border-b border-slate-200 bg-slate-50">
        <Container className="py-14 lg:py-16">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow={isEnglish ? "News" : "Nyheiter"}
              title={section.title}
              intro={cleanMigrationIntro(section.intro)}
            />
            <Link
              href={withLocale("/aktuelt", labels.locale)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              {labels.allCases}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {visibleItems.map((item, itemIndex) => (
              <article
                key={contentCardKey(item, itemIndex, `${section.title}-${sectionIndex}-news`)}
                className="group flex min-h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08]"
              >
                {item.imageUrl ? (
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <div className="flex grow flex-col p-5">
                  {item.meta ? (
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-800">
                      {item.meta}
                    </p>
                  ) : null}
                  <h3 className="text-lg font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 grow text-sm leading-6 text-slate-600">
                    {cleanCardText(
                      item.text,
                      labels.latestNewsFallback,
                    )}
                  </p>
                  {item.href ? <CardLink href={item.href} label={labels.readMore} /> : null}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={`border-b border-slate-200 ${background}`}>
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={
              isProducts
                ? isEnglish
                  ? "Products"
                  : "Produkt"
                : isCustomers
                ? isEnglish
                  ? "Application areas"
                  : "Bruksområde"
                : isNews
                ? isEnglish
                  ? "News"
                  : "Aktuelt"
                : isContact
                ? isEnglish
                  ? "Contact"
                  : "Ta kontakt"
                : undefined
            }
            title={displayTitle}
            intro={displayIntro}
          />
          {isProducts ? (
            <Link
              href={withLocale("/produkt", labels.locale)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              {labels.allProducts}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          ) : isNews ? (
            <Link
              href={withLocale("/aktuelt", labels.locale)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              {labels.allCases}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          ) : null}
        </div>

        <div
          className={
            isContact
              ? "mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
              : "mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          }
        >
          {visibleItems.map((item, itemIndex) => {
            const isDecorativeCard = item.title.toLowerCase().includes("dekor");

            return (
              <article
                key={contentCardKey(item, itemIndex, `${section.title}-${sectionIndex}`)}
                className={cn(
                  "group flex min-h-full flex-col overflow-hidden rounded-[8px] border shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08]",
                  isDecorativeCard
                    ? "border-slate-800 bg-slate-950 text-white"
                    : "border-slate-200 bg-white",
                )}
              >
                {item.imageUrl ? (
                  <>
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      width={720}
                      height={430}
                      className={
                        isContact
                          ? "hidden"
                          : isDecorativeCard
                          ? "h-48 w-full object-contain p-8 opacity-80"
                          : "h-52 w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                      }
                    />
                    {isProducts && !isDecorativeCard ? (
                      <div
                        aria-hidden="true"
                        className="fresvik-card-divider"
                      />
                    ) : null}
                  </>
                ) : null}
                <div className="flex grow flex-col p-5">
                  {item.meta ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-800">
                      {item.meta}
                    </p>
                  ) : null}
                  <h3
                    className={cn(
                      "text-lg font-semibold",
                      isDecorativeCard ? "text-white" : "text-slate-950",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 grow text-sm leading-6",
                      isDecorativeCard ? "text-slate-300" : "text-slate-600",
                    )}
                  >
                    {cleanCardText(
                      item.text,
                      isProducts
                        ? productCardFallback(item.title, labels)
                        : isCustomers
                        ? isEnglish
                          ? "Solutions from Fresvik Produkt for professional cold and freezer rooms."
                          : "Løysingar frå Fresvik Produkt for profesjonelle kjøle- og fryserom."
                        : isContact
                        ? isEnglish
                          ? "Contact point at Fresvik Produkt."
                          : "Kontaktpunkt hos Fresvik Produkt."
                        : isEnglish
                          ? "Information from Fresvik Produkt."
                          : "Informasjon frå Fresvik Produkt.",
                    )}
                  </p>
                  {item.href ? (
                    <CardLink
                      href={item.href}
                      label={isContact ? labels.contact : labels.readMore}
                    />
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function HomeContent({
  page,
  labels,
}: {
  page: ContentPage;
  labels: ContentLabels;
}) {
  return (
    <>
      {page.sections.map((section, sectionIndex) => (
        <HomeSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          sectionIndex={sectionIndex}
          labels={labels}
        />
      ))}
    </>
  );
}

export function ContentPageView({ page, hero, locale }: ContentPageViewProps) {
  const labels = getContentLabels(locale);
  const showMigrationDetails = page.showMigrationDetails === true;
  const sourceSlug = stripLocalePrefix(page.slug);
  const isFaqPage = sourceSlug === "/kundeservice/faq";
  const isHomePage = page.pageType === "home";
  const isAccessoryPage = sourceSlug.startsWith("/andre-produkter/");
  const isReferenceDetailPage =
    sourceSlug.startsWith("/referansar/") && sourceSlug !== "/referansar";
  const isCompanyOrLegalPage =
    page.pageType === "company" || page.pageType === "legal";
  const suppressTopCards =
    isCompanyOrLegalPage ||
    sourceSlug === "/produkt" ||
    sourceSlug === "/produkt/fresvik-pir-panel" ||
    sourceSlug === "/produkt/fresvik-pur-panel" ||
    sourceSlug === "/produkt/kjole-fryseportar" ||
    sourceSlug === "/produkt/kjole-frysedorer" ||
    sourceSlug === "/produkt/fasadepanel" ||
    sourceSlug === "/produkt/frysetunnel" ||
    sourceSlug === "/tenester" ||
    sourceSlug === "/tenester/montasje" ||
    sourceSlug === "/tenester/leveranse" ||
    sourceSlug === "/tenester/service-reservedeler" ||
    sourceSlug === "/dokumentasjon" ||
    sourceSlug === "/monteringsanvisning" ||
    sourceSlug === "/monteringsanvisningar-fresvik-skyveport" ||
    sourceSlug === "/tilleggsutstyr" ||
    sourceSlug === "/referansar" ||
    sourceSlug === "/aktuelt" ||
    isReferenceDetailPage ||
    isAccessoryPage;
  const showTopCards =
    !isFaqPage &&
    page.cards.length > 0 &&
    !suppressTopCards;
  const customHero = hero ?? null;
  const heroIntro =
    isReferenceDetailPage && page.intro.includes("\n")
      ? page.intro
          .split(/\n+/)
          .map((paragraph) => paragraph.trim())
          .find(Boolean) || page.intro
      : page.intro;
  const jsonLd =
    page.pageType === "product"
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: page.title,
          description: page.description,
          brand: {
            "@type": "Brand",
            name: "Fresvik Produkt",
          },
        }
      : null;

  return (
    <main>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      {customHero ?? (
        <section className="border-b border-slate-200 bg-slate-50">
          <Container className="py-8 lg:py-10">
            <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04]">
              <div className="h-1 bg-gradient-to-r from-cyan-700 via-sky-400 to-orange-500" />
              <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end lg:p-8">
                <div className="max-w-4xl">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                    {page.eyebrow}
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
                    {page.title}
                  </h1>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    {heroIntro}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <Link
                    href={withLocale("/kontakt", localeFromPathname(page.slug))}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
                  >
                    {labels.contactUs} <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                  {showMigrationDetails && page.sourceUrl ? (
                    <a
                      href={page.sourceUrl}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {labels.oldSource} <ExternalLink aria-hidden="true" size={17} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {isHomePage ? (
        <HomeContent page={page} labels={labels} />
      ) : showTopCards ? (
        <section className="border-b border-slate-200 bg-white">
          <Container className="py-12">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {page.cards.map((card, cardIndex) => (
                <Card
                  key={contentCardKey(card, cardIndex, `${page.slug}-cards`)}
                  className="flex flex-col"
                >
                  {card.imageUrl ? (
                    <Image
                      src={card.imageUrl}
                      alt={card.imageAlt || card.title}
                      width={720}
                      height={420}
                      className="-mx-5 -mt-5 mb-5 h-52 w-[calc(100%+2.5rem)] rounded-t-[8px] object-cover object-center"
                    />
                  ) : null}
                  {card.meta ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-800">
                      {card.meta}
                    </p>
                  ) : null}
                  <h2 className="text-xl font-semibold text-slate-950">
                    {card.title}
                  </h2>
                  <p className="mt-3 grow text-sm leading-6 text-slate-600">
                    {card.text}
                  </p>
                  {card.href ? <CardLink href={card.href} label={labels.readMore} /> : null}
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {isHomePage ? null : isFaqPage ? (
        <FAQAccordion page={page} labels={labels} />
      ) : (
        <ContentSections
          sections={page.sections}
          pageSlug={page.slug}
          page={page}
          labels={labels}
        />
      )}

      {showMigrationDetails && page.todo && page.todo.length > 0 ? (
        <section className="border-y border-slate-200 bg-white">
          <Container className="py-12">
            <SectionHeader
              eyebrow="Migreringsstatus"
              title="Gjenstår å kvalitetssikre"
              intro="Desse punkta er bevisst merka som TODO fordi innhaldet må verifiserast mot gammal nettstad eller Sanity før endeleg lansering."
            />
            <ul className="mt-6 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              {page.todo.map((item) => (
                <li
                  key={item}
                  className="rounded-[8px] border border-slate-200 bg-slate-50 p-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {isHomePage ? null : (
        <CTASection
          title={labels.ctaTitle}
          text={labels.ctaText}
          contactLabel={labels.contactUs}
          contactHref={withLocale("/kontakt", localeFromPathname(page.slug))}
        />
      )}
    </main>
  );
}
