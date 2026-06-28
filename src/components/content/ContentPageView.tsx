import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CTASection } from "@/components/CTASection";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ContentPage } from "@/data/pages";
import { cn } from "@/lib/utils";

type ContentPageViewProps = {
  page: ContentPage;
  hero?: ReactNode;
};

function isExternalHref(href: string) {
  return /^(https?:\/\/|mailto:|tel:)/.test(href);
}

function isPdfHref(href: string) {
  return /\.pdf($|\?)/i.test(href);
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

function CertificationBadgeLink({
  item,
  itemIndex,
  scope,
}: {
  item: ContentPage["sections"][number]["items"][number];
  itemIndex: number;
  scope: string;
}) {
  const href = item.href || certificationFallbackHref(item.title) || "/dokumentasjon";
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
        Opne {item.title}
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

function FAQAccordion({ page }: ContentPageViewProps) {
  const questions = page.sections[0]?.items || [];

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12">
        <SectionHeader
          eyebrow="FAQ"
          title="Ofte stilte spørsmål"
          intro={page.sections[0]?.intro || page.description}
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
                {item.text}
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

function ContentSections({ sections }: { sections: ContentPage["sections"] }) {
  return sections.map((section, sectionIndex) => (
    <section key={`${section.title}-${sectionIndex}`} className="py-14">
      <Container>
        <SectionHeader title={section.title} intro={section.intro} />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, itemIndex) => (
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
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.text}
              </p>
              {item.href ? <CardLink href={item.href} label="Opne" /> : null}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  ));
}

function labelFromHref(href: string) {
  try {
    const url = new URL(href, "https://www.fresvik.no");
    const path = url.pathname === "/" ? url.hostname : url.pathname;

    return path
      .split("/")
      .filter(Boolean)
      .at(-1)
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase()) || path;
  } catch {
    return href
      .split("/")
      .filter(Boolean)
      .at(-1)
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase()) || href;
  }
}

function HomeSection({
  section,
  sectionIndex,
}: {
  section: ContentPage["sections"][number];
  sectionIndex: number;
}) {
  const isProducts = section.title.includes("Produktteaserar");
  const isCustomers = section.title === "Våre kundar";
  const isNews = section.title === "Aktuelt";
  const isJob = section.title === "Vil du jobbe hjå oss?";
  const isContact = section.title === "Kontakt";
  const isNewsletter = section.title === "Motta nyheitsbrev";
  const isBadges = section.title === "Footer sertifikat og merker";
  const isFullTextArchive = section.title === "Full tekst frå gammal side";
  const isImageArchive = section.title === "Bilde frå gammal side";
  const isDocumentArchive =
    section.title === "Dokumentlenker frå gammal side" ||
    section.items.every((item) => item.title === "Dokument");
  const isLinkArchive =
    section.title === "Lenker frå gammal side" ||
    section.items.every((item) => item.title === "Ekstern lenke");
  const background = isProducts || isNews || isBadges ? "bg-slate-50" : "bg-white";
  const displayTitle = isProducts ? "Produkt og løysingar" : section.title;
  const displayIntro = isProducts
    ? "Utvalde produkt og løysingar frå Fresvik Produkt, bevart frå den gamle framsida og rydda for rask oversikt."
    : section.intro;

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
              Dokumentert
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Godkjenningar og sertifikat
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Sertifikat, godkjenningar og dokumentasjon frå Fresvik Produkt
              samla som raske dokumentlenker.
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
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (isFullTextArchive) {
    const text = section.items.map((item) => item.text).join("\n\n");
    const paragraphs = text.split(/\n{2,}/).filter(Boolean);

    return (
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <SectionHeader
              eyebrow="Kjeldetekst"
              title="Tekst frå gammal framside"
              intro={section.intro}
            />
            <article className="rounded-[8px] border border-slate-200 bg-slate-50 p-5 text-base leading-8 text-slate-700 sm:p-6">
              {paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${section.title}-paragraph-${paragraphIndex}`} className="mt-4 first:mt-0">
                  {paragraph}
                </p>
              ))}
            </article>
          </div>
        </Container>
      </section>
    );
  }

  if (isImageArchive) {
    return (
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-12">
          <SectionHeader
            eyebrow="Migrerte bilde"
            title="Bilde frå gammal side"
            intro="Bilete og merke som vart funne i gammal framside-extract, bevart for kontroll og vidare bruk."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item, itemIndex) => (
              <article
                key={contentCardKey(item, itemIndex, `${section.title}-${sectionIndex}`)}
                className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.03]"
              >
                {item.imageUrl ? (
                  <div className="grid h-48 place-items-center bg-slate-50 p-6">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      width={420}
                      height={260}
                      className="max-h-36 w-auto object-contain"
                    />
                  </div>
                ) : null}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-slate-950">
                    Bilde {itemIndex + 1}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (isDocumentArchive) {
    return (
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-12">
          <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/[0.03] sm:p-6">
            <SectionHeader
              eyebrow="Dokument"
              title="Dokument frå gammal side"
              intro="PDF- og dokumentlenker som vart funne på den gamle framsida, samla i ei kompakt liste."
            />
            <div className="mt-6 grid gap-2 md:grid-cols-2">
              {section.items.map((item, itemIndex) => {
                const href = item.href || item.text;
                const label = labelFromHref(item.text);

                return isExternalHref(href) ? (
                  <a
                    key={contentCardKey(item, itemIndex, `${section.title}-${sectionIndex}`)}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-12 items-center justify-between gap-3 rounded-[8px] border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-200 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
                  >
                    <span className="truncate">{label}</span>
                    <ExternalLink
                      aria-hidden="true"
                      size={16}
                      className="shrink-0 text-cyan-800 transition group-hover:translate-x-0.5"
                    />
                  </a>
                ) : (
                  <Link
                    key={contentCardKey(item, itemIndex, `${section.title}-${sectionIndex}`)}
                    href={href}
                    className="group flex min-h-12 items-center justify-between gap-3 rounded-[8px] border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-200 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
                  >
                    <span className="truncate">{label}</span>
                    <ArrowRight
                      aria-hidden="true"
                      size={16}
                      className="shrink-0 text-cyan-800 transition group-hover:translate-x-0.5"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (isLinkArchive) {
    return (
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-12">
          <div className="rounded-[8px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                eyebrow="Migrerte lenker"
                title="Bevarte lenker frå gammal side"
                intro="Lenker som vart funne på den gamle framsida. Dei er samla kompakt her, slik at migrert informasjon framleis kan kontrollerast utan å dominere sida."
              />
              <Link
                href="/kontakt"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
              >
                Kontakt oss
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={contentCardKey(item, itemIndex, `${section.title}-${sectionIndex}`)}
                  href={item.href || item.text}
                  className="group flex min-h-12 items-center justify-between gap-3 rounded-[8px] border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-200 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
                >
                  <span className="truncate">{labelFromHref(item.text)}</span>
                  <ArrowRight
                    aria-hidden="true"
                    size={16}
                    className="shrink-0 text-cyan-800 transition group-hover:translate-x-0.5"
                  />
                </Link>
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
                Arbeid i Fresvik
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
                  Sjå ledige stillingar
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

  if (isNewsletter) {
    return (
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-12">
          <div className="grid gap-6 rounded-[8px] border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-6 sm:p-8 lg:grid-cols-[1fr_1.3fr]">
            <SectionHeader title={section.title} intro={section.intro} />
            <div className="grid content-start gap-3 sm:grid-cols-2">
              {section.items.map((item, itemIndex) => (
                <article
                  key={contentCardKey(item, itemIndex, `${section.title}-${sectionIndex}`)}
                  className="rounded-[8px] border border-white bg-white/75 p-4 shadow-sm shadow-slate-950/[0.03]"
                >
                  <h3 className="text-sm font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                  {item.href ? <CardLink href={item.href} label="Opne" /> : null}
                </article>
              ))}
            </div>
          </div>
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
              eyebrow="Bruksområde"
              title={section.title}
              intro={section.intro}
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
                    Bruksområde
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-normal">
                    {accentItem.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-200">
                    {accentItem.text}
                  </p>
                  {accentItem.href ? (
                    <Link
                      href={accentItem.href}
                      className="mt-6 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      Les meir
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
                      {item.text}
                    </p>
                    {item.href ? <CardLink href={item.href} label="Les meir" /> : null}
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
              eyebrow="Nyheiter"
              title={section.title}
              intro={section.intro}
            />
            <Link
              href="/aktuelt"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              Alle saker
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
                    {item.text}
                  </p>
                  {item.href ? <CardLink href={item.href} label="Les meir" /> : null}
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
                ? "Produkt"
                : isCustomers
                ? "Bruksområde"
                : isNews
                ? "Aktuelt"
                : isContact
                ? "Ta kontakt"
                : undefined
            }
            title={displayTitle}
            intro={displayIntro}
          />
          {isProducts ? (
            <Link
              href="/produkt"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              Alle produkt
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          ) : isNews ? (
            <Link
              href="/aktuelt"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              Alle saker
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
                    {item.text}
                  </p>
                  {item.href ? (
                    <CardLink
                      href={item.href}
                      label={isContact ? "Kontakt" : "Les meir"}
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

function HomeContent({ page }: { page: ContentPage }) {
  return (
    <>
      {page.sections.map((section, sectionIndex) => (
        <HomeSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          sectionIndex={sectionIndex}
        />
      ))}
    </>
  );
}

function PirPanelHero({ page }: { page: ContentPage }) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <h1 className="sr-only">{page.title}</h1>
      <p className="sr-only">{page.intro}</p>
      <Image
        src="/assets/fresvik/images/generated/fresvik-pir-panel-hero.png"
        alt="Fresvik PIR-Panel: brannsikre panel med PIR-skum, utvikla og produsert i Norge, SINTEF-godkjent og enkel montasje med eksenterlås."
        width={1916}
        height={821}
        preload
        sizes="100vw"
        className="h-auto w-full"
      />
    </section>
  );
}

export function ContentPageView({ page, hero }: ContentPageViewProps) {
  const showMigrationDetails = page.showMigrationDetails === true;
  const isFaqPage = page.slug === "/kundeservice/faq";
  const isHomePage = page.pageType === "home";
  const customHero =
    hero ??
    (page.slug === "/produkt/fresvik-pir-panel" ? (
      <PirPanelHero page={page} />
    ) : null);
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
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-cyan-950/70 to-transparent" />
          <Container className="relative py-16 lg:py-24">
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-[6px] border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-cyan-50">
                <CheckCircle2 aria-hidden="true" size={17} />
                {page.eyebrow}
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
                {page.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                {page.intro}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/kontakt"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50"
                >
                  Kontakt oss <ArrowRight aria-hidden="true" size={18} />
                </Link>
                {showMigrationDetails && page.sourceUrl ? (
                  <a
                    href={page.sourceUrl}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] border border-white/25 px-5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Gammal kjelde <ExternalLink aria-hidden="true" size={18} />
                  </a>
                ) : null}
              </div>
            </div>
          </Container>
        </section>
      )}

      {isHomePage ? (
        <HomeContent page={page} />
      ) : !isFaqPage && page.cards.length > 0 ? (
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
                  {card.href ? <CardLink href={card.href} label="Les meir" /> : null}
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {isHomePage ? null : isFaqPage ? (
        <>
          <FAQAccordion page={page} />
          <ContentSections sections={page.sections.slice(1)} />
        </>
      ) : (
        <ContentSections sections={page.sections} />
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

      {isHomePage ? null : <CTASection />}
    </main>
  );
}
