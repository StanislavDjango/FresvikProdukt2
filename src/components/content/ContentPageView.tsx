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

function formatNorwegianDate(value?: string) {
  if (!value) return undefined;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("nn-NO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

const technicalMigrationSectionTitles = new Set([
  "Full tekst frå gammal side",
  "Bilde frå gammal side",
  "Dokumentlenker frå gammal side",
  "Lenker frå gammal side",
]);

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
}: {
  section: ContentPage["sections"][number];
  sectionIndex: number;
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 lg:py-14">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {section.items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, `${section.title}-${sectionIndex}`)}
              href={item.href || "/om-oss"}
              className="group flex min-h-48 flex-col rounded-[8px] border border-slate-200 bg-slate-50 p-5 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-xl hover:shadow-slate-950/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-800">
                Fresvik Produkt
              </p>
              <h2 className="mt-4 text-xl font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-3 grow text-sm leading-6 text-slate-600">
                {item.text}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 self-end text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                Opne <ArrowRight aria-hidden="true" size={17} />
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
}: {
  section: ContentPage["sections"][number];
}) {
  const imageItem = section.items.find((item) => item.imageUrl);
  const textItems = section.items.filter((item) => item !== imageItem);
  const intro = section.intro?.toLowerCase().includes("gammal")
    ? "Nøkkelopplysningar om Fresvik Produkt og produksjonen i Fresvik."
    : section.intro;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="grid gap-8 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:py-16">
        <div>
          <SectionHeader
            eyebrow="Selskapsinformasjon"
            title="Norsk produsent i Fresvik"
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
                {item.text}
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
}: {
  section: ContentPage["sections"][number];
}) {
  const intro =
    section.intro?.toLowerCase().includes("gammal") ||
    section.intro?.toLowerCase().includes("persondata")
      ? "Finn rett kontaktperson for sal, teknisk avklaring, logistikk og administrasjon."
      : section.intro || "Finn rett kontaktperson hos Fresvik Produkt.";

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 lg:py-16">
        <SectionHeader
          eyebrow="Kontaktpersonar"
          title="Tilsette"
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
}: {
  section: ContentPage["sections"][number];
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
                Karriere
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal">
                {mainItem?.title || introItem?.title || section.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {mainItem?.text || introItem?.text}
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

function LegalTextSection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  const title =
    section.title === "Personverntekst frå gammal side"
      ? "Personverntekst"
      : section.title === "Tekst frå gammal Openheitslova-side"
        ? "Openheitslova"
        : section.title;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Juridisk informasjon"
            title={title}
            intro={section.intro}
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
                {item.href ? <CardLink href={item.href} label="Opne" /> : null}
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
}: {
  section: ContentPage["sections"][number];
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-12 lg:py-16">
        <SectionHeader
          eyebrow="Dokument"
          title={section.title}
          intro={section.intro}
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {section.items.map((item, itemIndex) => {
            const href = item.href || "/openheitslova";
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
                    {item.text}
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
          eyebrow="Kundeservice"
          title="Svar på vanlege spørsmål"
          intro="Praktisk informasjon om produkt, materialval, dimensjonering og løysingar frå Fresvik Produkt."
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
                {item.text || "Ta kontakt med Fresvik Produkt for meir informasjon."}
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
    imageUrl: "/assets/fresvik/images/old-site/Industri+slagdør+Fresvik+Produkt.jpg",
    imageAlt: "Industri slagdør",
  },
];

function ProductIntroSection({
  section,
  highlight,
}: {
  section: ContentPage["sections"][number];
  highlight?: string;
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
              Produktinformasjon
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

function FacadeCoreSection({
  section,
}: {
  section: ContentPage["sections"][number];
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
              Kjerne og materiale
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              {section.title}
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
  const isTechnicalData = section.title === "Tekniske data";

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
            title={section.title}
            intro={showIntro ? section.intro : undefined}
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

function ReferenceIntroSection({
  section,
}: {
  section: ContentPage["sections"][number];
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
                alt={item.imageAlt || item.title}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          ) : null}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              Prosjektinformasjon
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              {item.title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
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
}: {
  section: ContentPage["sections"][number];
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-14 lg:py-16">
        <SectionHeader eyebrow="Referanse" title="Bilete frå prosjektet" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {section.items.map((item, itemIndex) => (
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
}: {
  section: ContentPage["sections"][number];
}) {
  const items = section.items.filter((item) => item.href);

  if (items.length === 0) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-10 lg:py-12">
        <div className="rounded-[8px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                Relaterte lenker
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
                Referansar frå gammal side
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Page-specific lenker frå den gamle referansesida er bevart her for
              kontroll og vidare navigasjon.
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, itemIndex) => (
              <Link
                key={contentCardKey(item, itemIndex, section.title)}
                href={item.href || "/referansar"}
                className="group flex min-h-24 flex-col justify-between rounded-[8px] border border-slate-200 bg-white p-4 text-slate-950 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-950/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
              >
                <span>
                  <span className="block text-base font-semibold">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {item.text}
                  </span>
                </span>
                <span className="mt-4 inline-flex items-center gap-2 self-end text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  Opne
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
}: {
  section: ContentPage["sections"][number];
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="mb-8">
          <SectionHeader title="Bilete" />
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
}: {
  section: ContentPage["sections"][number];
  imageSection?: ContentPage["sections"][number];
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
              Produktinformasjon
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
                href="/kontakt"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
              >
                Kontakt oss <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <Link
                href="/tilleggsutstyr"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
              >
                Alt tilleggsutstyr <ArrowRight aria-hidden="true" size={17} />
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
              {imageItems.map((imageItem, imageIndex) => (
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
                      src={imageItem.imageUrl || item.imageUrl || ""}
                      alt={imageItem.imageAlt || imageItem.title}
                      fill
                      sizes="(min-width: 1024px) 44vw, 100vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  {imageItems.length > 1 ? (
                    <figcaption className="border-t border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                      {imageItem.title}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : null}
        </article>
      </Container>
    </section>
  );
}

function AccessoryNavigationSection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  const previous = section.items.find((item) => item.title === "Førre");
  const overview = section.items.find((item) => item.title === "Alle tilleggsutstyr");
  const next = section.items.find((item) => item.title === "Neste");

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-10">
        <nav
          aria-label="Vidare i tilleggsutstyr"
          className="grid gap-3 md:grid-cols-3"
        >
          {previous?.href ? (
            <Link
              href={previous.href}
              className="group flex min-h-24 flex-col justify-center rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-950/[0.06]"
            >
              <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-800">
                Førre
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
                Oversikt
              </span>
              <span className="mt-2 font-semibold">
                Alle tilleggsutstyr
              </span>
            </Link>
          ) : null}

          {next?.href ? (
            <Link
              href={next.href}
              className="group flex min-h-24 flex-col justify-center rounded-[8px] border border-slate-200 bg-white p-5 text-right shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-950/[0.06]"
            >
              <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-800">
                Neste
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
}: {
  section: ContentPage["sections"][number];
  showIndex?: boolean;
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-12 lg:py-14">
        <div className="grid gap-8 rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.04] sm:p-8 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              Fordelar
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
              {section.title.replace(" frå gammal side", "")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {section.intro}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {section.items.map((item, itemIndex) => (
              <article
                key={contentCardKey(item, itemIndex, section.title)}
                className="rounded-[8px] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-lg hover:shadow-slate-950/[0.06]"
              >
                {showIndex ? (
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-800">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </p>
                ) : null}
                <h3 className="mt-2 text-base font-semibold leading-snug text-slate-950">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductImageGallerySection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  const [featuredItem, ...secondaryItems] = section.items;

  if (!featuredItem) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Detaljar"
            title="Port, motor og lås"
            intro={section.intro}
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
                {featuredItem.text}
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
                    {item.text}
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
}: {
  section: ContentPage["sections"][number];
}) {
  const linkedItems = section.items.filter(
    (item): item is typeof item & { href: string } => Boolean(item.href),
  );

  if (linkedItems.length === 0) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              Nedlasting
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              {section.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Produktblad, monteringsinformasjon og dokumentasjon samla som
              raske dokumentlenker.
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
                      {item.text}
                    </span>
                  </span>
                  <span className="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition group-hover:border-cyan-800 group-hover:text-cyan-800">
                    Opne
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
}: {
  section: ContentPage["sections"][number];
}) {
  const descriptions: Record<string, string> = {
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
            eyebrow="Nedlasting"
            title="Dokument og godkjenningar"
            intro="Produktdokumentasjon, godkjenningar og praktiske skjema samla på ein stad."
          />
          <Link
            href="/monteringsanvisning"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            Monteringsanvisningar
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
                      {descriptions[item.title] || item.text}
                    </p>
                  </div>
                </div>
                {href ? (
                  <span className="mt-6 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                    Opne
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

function DocumentationContactSection() {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-5 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/[0.04] sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              Manglar du noko?
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
              Ta kontakt for rett dokumentasjon
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Vi hjelper med produktblad, godkjenningar og tekniske avklaringar
              for prosjektet ditt.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
          >
            Kontakt oss
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function MountingDownloadsSection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Nedlasting"
            title="Monteringsanvisningar"
            intro="Monteringsrettleiingar for rom, dører og portar samla som raske dokumentlenker."
          />
          <Link
            href="/dokumentasjon"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            All dokumentasjon
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
                        {item.text}
                      </p>
                    </div>
                  </div>
                  {href ? (
                    <span className="mt-6 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                      Opne
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

function MountingDocumentationCta() {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-5 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/[0.04] sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              Dokumentasjon
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
              Ute etter sertifikat eller produktblad?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Teknisk godkjenning, miljødokumentasjon, leveringsvilkår og
              sentral godkjenning ligg samla på dokumentasjonssida.
            </p>
          </div>
          <Link
            href="/dokumentasjon"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
          >
            Gå til dokumentasjon
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function ElectricSkyveportDownloadsSection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  const descriptions: Record<string, string> = {
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
            eyebrow="Elektrisk skyveport"
            title="Filer for Fermod 5010"
            intro="Koblingsskjema, montasjeanvisningar og praktiske PDF-filer for elektrisk styring av Fresvik Skyveport."
          />
          <Link
            href="/monteringsanvisning"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            Alle monteringsanvisningar
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
                      {descriptions[item.title] || item.text}
                    </p>
                  </div>
                </div>
                {href ? (
                  <span className="mt-6 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                    Opne
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
}: {
  section: ContentPage["sections"][number];
}) {
  const title = section.title.includes("Tilleggsprodukt")
    ? "Tilleggsprodukt"
    : "Tilleggsutstyr";
  const ctaLabel = section.title.includes("Tilleggsprodukt")
    ? "Alt tilleggsutstyr"
    : "Alt tilleggsutstyr";

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Relaterte løysingar"
            title={title}
            intro={section.intro}
          />
          <Link
            href="/tilleggsutstyr"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            {ctaLabel}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {section.items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, section.title)}
              href={item.href || "/tilleggsutstyr"}
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
                  {item.text}
                </p>
                <span className="mt-5 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  Les meir <ArrowRight aria-hidden="true" size={17} />
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
}: {
  section: ContentPage["sections"][number];
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Dørmodellar"
            title="Tre dørtypar til ulike bruksområde"
            intro="Vel mellom standarddører, skipsdører og større industri-slagdører etter behovet i kjøle- eller fryserommet."
          />
          <Link
            href="/tilleggsutstyr"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            Sjå tilleggsutstyr
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {section.items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, section.title)}
              href={item.href || "/tilleggsutstyr"}
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
                  Les meir <ArrowRight aria-hidden="true" size={17} />
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
}: {
  section: ContentPage["sections"][number];
}) {
  return (
    <ProductRelatedSection
      section={{
        ...section,
        title: "Tilleggsutstyr",
        intro:
          "Utstyr som ofte blir brukt saman med kjøle- og fryseromsdører.",
      }}
    />
  );
}

function ServiceMontasjeSection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  const descriptions: Record<string, string> = {
    "Fresvik-panel til kjølerom og fryserom":
      "Montering av isolerte panel for komplette kjøle- og fryserom.",
    "Sandwhich-panel for fasade":
      "Montasje av fasadepanel til lager- og industribygg.",
    "Kjøle- og fryseportar":
      "Portløysingar tilpassa kjøle- og fryserom, lager og industri.",
    "Kjøle- og frysedører":
      "Dører til kjøle- og fryserom levert som del av komplett løysing.",
    Vindu: "Vindu og tilhøyrande detaljar som del av rom- og panelløysing.",
    Beslag: "Tilpassa beslag for tett, ryddig og komplett montasje.",
  };

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Montasje"
            title="Fresvik Produkt tilbyr montasje av"
            intro="Vi kan levere montasje for panel, portar, dører og tilhøyrande løysingar gjennom erfarne samarbeidspartnarar."
          />
          <Link
            href="/kontakt"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
          >
            Avklar montasje
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item, itemIndex) => {
            const imageUrl =
              item.imageUrl &&
              !item.imageUrl.includes("flake") &&
              !item.imageUrl.includes("snø")
                ? item.imageUrl
                : undefined;
            const displayTitle = item.title.replace("Sandwhich", "Sandwich");
            const displayText = descriptions[item.title] || item.text;
            const content = (
              <>
                {imageUrl ? (
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <Image
                      src={imageUrl}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="grid h-48 place-items-center bg-slate-950 text-cyan-200">
                    <Wrench aria-hidden="true" size={42} strokeWidth={1.7} />
                  </div>
                )}
                <span className="relative h-1 overflow-hidden bg-gradient-to-r from-cyan-700 via-sky-400 to-orange-500 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/70 before:opacity-0 before:blur-sm before:transition group-hover:before:left-full group-hover:before:opacity-100 group-hover:before:duration-700" />
                <div className="flex grow flex-col p-5">
                  <h3 className="text-lg font-semibold text-slate-950">
                    {displayTitle}
                  </h3>
                  <p className="mt-3 grow text-sm leading-6 text-slate-600">
                    {displayText}
                  </p>
                  <span className="mt-5 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                    {item.href ? "Les meir" : "Kontakt oss"}
                    <ArrowRight aria-hidden="true" size={17} />
                  </span>
                </div>
              </>
            );

            if (item.href) {
              return (
                <Link
                  key={contentCardKey(item, itemIndex, section.title)}
                  href={item.href}
                  className="group flex min-h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
                >
                  {content}
                </Link>
              );
            }

            return (
              <Link
                key={contentCardKey(item, itemIndex, section.title)}
                href="/kontakt"
                className="group flex min-h-full flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-950/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
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

function ServiceDeliverySection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  const [featuredItem, ...secondaryItems] = section.items;
  const ctaItem = secondaryItems.find((item) => item.href);
  const detailItems = secondaryItems.filter((item) => !item.href);
  const detailText: Record<string, string> = {
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
            eyebrow="Leveranse"
            title="Fokus på leveransesikkerheit"
            intro="Leveransen skal vere komplett, tydeleg merka og kome fram til avtalt tid."
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
                  Trygg leveranse
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
                  {featuredItem.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  {featuredItem.text}
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
                      {detailText[item.title] || item.text}
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
                  Kontakt oss
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
}: {
  section: ContentPage["sections"][number];
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
                  Service
                </p>
                <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                  {introItem?.title || "Viss noko går gale, stiller vi opp."}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                  Vi hjelper med service og reservedeler til dører og portar når
                  det hastar.
                </p>
              </div>

              {ctaItem?.href ? (
                <Link
                  href={ctaItem.href}
                  className="mt-8 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  Kontakt service
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
                  {item.text}
                </p>
              </article>
            ))}

            <div className="rounded-[8px] border border-cyan-100 bg-cyan-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                  Kontakt
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">
                  {ctaItem?.title || "Treng du service eller deler?"}
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
}: {
  section: ContentPage["sections"][number];
}) {
  const serviceDescriptions: Record<string, string> = {
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
              eyebrow="Tenester"
              title="Frå avklaring til ferdig leveranse"
              intro="Fresvik Produkt hjelper med montasje, leveranse og oppfølging av kjøle-, fryse- og panelløysingar."
            />
            <Link
              href="/kontakt"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
            >
              Kontakt oss
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>

          <div className="grid gap-4">
            {section.items.map((item, itemIndex) => {
              const icon =
                item.title === "Montasje" ? (
                  <Wrench aria-hidden="true" size={23} />
                ) : item.title === "Leveranse" ? (
                  <CheckCircle2 aria-hidden="true" size={23} />
                ) : (
                  <ShieldCheck aria-hidden="true" size={23} />
                );

              return (
                <Link
                  key={contentCardKey(item, itemIndex, section.title)}
                  href={item.href || "/tenester"}
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
                      {serviceDescriptions[item.title] || item.text}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                    Les meir
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
}: {
  section: ContentPage["sections"][number];
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
                Godkjenning
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                Sentral godkjenning
              </h2>
              {introItem ? (
                <p className="mt-5 text-base leading-8 text-slate-300">
                  {introItem.text}
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
                Opne godkjenning
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            ) : null}
          </div>

          <div className="bg-white p-6 sm:p-8">
            {documentItem ? (
              <div>
                <h3 className="text-xl font-semibold text-slate-950">
                  Kompetanse dokumentert
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  {documentItem.text}
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

function ServiceContactCtaSection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  const text = section.items[0]?.text || "Ta kontakt for meir informasjon.";

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12">
        <div className="grid gap-5 rounded-[8px] border border-cyan-100 bg-cyan-50 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              Montasje
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
              Meir informasjon om montasje?
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
              {text}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
            >
              Kontakt oss
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <a
              href="tel:+4757698300"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
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

function AccessoryOverviewSection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  const items = section.items.some((item) => item.href?.startsWith("/andre-produkter/"))
    ? section.items
    : tilleggsutstyrOverviewItems;

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Tilleggsutstyr"
            title="Utstyr og reservedelar"
            intro={section.intro}
          />
          <Link
            href="/kontakt"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
          >
            Spør oss om rett del
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, section.title)}
              href={item.href || "/tilleggsutstyr"}
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
                  {item.text}
                </p>
                <span className="mt-5 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  Les meir <ArrowRight aria-hidden="true" size={17} />
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
}: {
  section: ContentPage["sections"][number];
}) {
  const intro =
    section.intro ||
    "For bestilling av tilbehøyr og reservedelar, send oss ein e-post eller ring innkjøparen vår.";

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Reservedelar"
            title="Tilleggsutstyr og reservedelar"
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
          {section.items.map((item, itemIndex) => {
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

function AccessoryContactSection() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12">
        <div className="grid gap-6 rounded-[8px] border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/[0.08] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
              Reservedelar
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal sm:text-3xl">
              Treng du hjelp til å finne rett del?
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
              Send oss ein førespurnad, så hjelper vi deg med tilbehøyr,
              reservedelar og praktiske avklaringar før bestilling.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:post@fresvik.no"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              post@fresvik.no
              <ExternalLink aria-hidden="true" size={16} />
            </a>
            <a
              href="tel:+4757698300"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-white/20 px-4 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              57 69 83 00
              <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductReferenceSection({
  section,
  eyebrow = "Referansar",
  title = "Utvalde fasadeprosjekt",
  badge = "Fasadepanel",
}: {
  section: ContentPage["sections"][number];
  eyebrow?: string;
  title?: string;
  badge?: string;
}) {
  const items = section.items.filter((item) => item.href !== "/referansar");

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            intro={section.intro}
          />
          <Link
            href="/referansar"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            Alle referansar
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, section.title)}
              href={item.href || "/referansar"}
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
                    ? "Referanse frå gammal fasadepanel-side."
                    : item.text}
                </p>
                <span className="mt-6 inline-flex self-start items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  Les meir <ArrowRight aria-hidden="true" size={17} />
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
}: {
  section: ContentPage["sections"][number];
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 lg:py-14">
        <div className="grid gap-8 rounded-[8px] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-950/[0.04] sm:p-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-center">
          <SectionHeader
            eyebrow="Erfaring"
            title="Leveransar til butikk, industri, storkjøken og offshore"
          />
          <p className="text-base leading-8 text-slate-700">
            {section.intro}
          </p>
        </div>
      </Container>
    </section>
  );
}

function ReferenceIndexGridSection({
  section,
}: {
  section: ContentPage["sections"][number];
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-14 lg:py-16">
        <SectionHeader
          eyebrow="Prosjekt"
          title="Utvalde referansar"
          intro="Prosjekt frå ulike bruksområde, bevart frå den gamle referansesida og rydda for rask oversikt."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, "reference-index")}
              href={item.href || "/referansar"}
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
                  {item.text}
                </p>
                <span className="mt-5 inline-flex self-end items-center gap-2 text-sm font-semibold text-cyan-800 transition group-hover:text-slate-950">
                  Les meir <ArrowRight aria-hidden="true" size={17} />
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
}: {
  section: ContentPage["sections"][number];
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12">
        <div className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.04] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Kategoriar"
              title="Finn referansar etter bruksområde"
              intro="Snarvegar til dei gamle referansekategoriane."
            />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {section.items.map((item, itemIndex) => (
              <Link
                key={contentCardKey(item, itemIndex, "reference-categories")}
                href={item.href || "/referansar"}
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
}: {
  section: ContentPage["sections"][number];
}) {
  const items = section.items.filter(
    (item) => item.href && item.title !== "Aktuelt",
  );

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-14 lg:py-16">
        <SectionHeader
          eyebrow="Nyheiter"
          title="Siste frå Fresvik"
          intro="Nyheiter, leveransar og oppdateringar frå Fresvik Produkt."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, itemIndex) => (
            <Link
              key={contentCardKey(item, itemIndex, "news-index")}
              href={item.href || "/aktuelt"}
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
                  Les meir <ArrowRight aria-hidden="true" size={17} />
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
}: {
  page: ContentPage;
  section: ContentPage["sections"][number];
}) {
  const paragraphs = section.items
    .flatMap((item) => item.text.split(/\n{2,}/))
    .map((text) => text.trim())
    .filter(Boolean);
  const heroImage = page.cards.find((card) => card.imageUrl);
  const formattedDate = formatNorwegianDate(page.publishedAt);

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 lg:py-16">
        <article className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04]">
          <div className="grid gap-0 lg:grid-cols-[0.58fr_0.42fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                  Aktuelt
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
                    Kort melding frå arkivet
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
}: {
  section: ContentPage["sections"][number];
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12">
        <div className="grid gap-6 rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.04] sm:p-8 lg:grid-cols-[0.34fr_0.66fr]">
          <SectionHeader
            eyebrow="Vidare lesing"
            title="Lenker knytt til saker"
            intro="Nokre saker peikar vidare til tilhøyrande referansar og eksterne artiklar."
          />
          <div className="grid gap-3">
            {section.items.map((item, itemIndex) => {
              const href = item.href || "/aktuelt";
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
                        ? "Referanseprosjekt knytt til aktuell sak."
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
}: {
  section: ContentPage["sections"][number];
}) {
  const items = section.items.filter(
    (item) => !item.title.toLowerCase().includes("gasta"),
  );
  const displayIntro = section.intro?.toLowerCase().includes("gammal")
    ? "Sertifikat, godkjenningar og dokumentasjon samla som raske lenker."
    : section.intro;

  return (
    <section className="border-b border-slate-200 bg-slate-50 py-12">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Dokumentert"
            title="Sertifikat og godkjenningar"
            intro={displayIntro}
          />
          <Link
            href="/dokumentasjon"
            className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
          >
            Dokumentasjon
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, itemIndex) => {
            const href =
              item.href || certificationFallbackHref(item.title) || "/dokumentasjon";
            const isExternal = isExternalHref(href);
            const displayText = item.text.toLowerCase().includes("gammal")
              ? isExternal
                ? "Ekstern sertifikatlenke."
                : "Sertifikat og dokumentasjon."
              : item.text;
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
                    Opne
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
}: {
  sections: ContentPage["sections"];
  pageSlug?: string;
  page?: ContentPage;
}) {
  const isPirPage = pageSlug === "/produkt/fresvik-pir-panel";
  const isPurPage = pageSlug === "/produkt/fresvik-pur-panel";
  const isPortPage = pageSlug === "/produkt/kjole-fryseportar";
  const isDoorPage = pageSlug === "/produkt/kjole-frysedorer";
  const isFacadePage = pageSlug === "/produkt/fasadepanel";
  const isFrysetunnelPage = pageSlug === "/produkt/frysetunnel";
  const isDocumentationPage = pageSlug === "/dokumentasjon";
  const isMountingPage = pageSlug === "/monteringsanvisning";
  const isElectricSkyveportPage =
    pageSlug === "/monteringsanvisningar-fresvik-skyveport";
  const isServiceIndexPage = pageSlug === "/tenester";
  const isMontasjeServicePage = pageSlug === "/tenester/montasje";
  const isLeveranseServicePage = pageSlug === "/tenester/leveranse";
  const isServicePartsPage = pageSlug === "/tenester/service-reservedeler";
  const isReferenceIndexPage = pageSlug === "/referansar";
  const isNewsIndexPage = pageSlug === "/aktuelt";
  const isNewsDetailPage =
    (pageSlug?.startsWith("/aktuelt/") ?? false) && pageSlug !== "/aktuelt";
  const isProductIndexPage = pageSlug === "/produkt";
  const isTransportDamagePage = pageSlug === "/transportskade";
  const isCompanyOverviewPage = pageSlug === "/om-oss";
  const isFirmainfoPage = pageSlug === "/firmainfo";
  const isEmployeesPage = pageSlug === "/tilsette";
  const isJobPage = pageSlug === "/stillingledig";
  const isPrivacyPage = pageSlug === "/personvernerklering";
  const isTransparencyPage = pageSlug === "/openheitslova";
  const isLegalPage = isPrivacyPage || isTransparencyPage;
  const isCompanyUtilityPage =
    isCompanyOverviewPage || isFirmainfoPage || isEmployeesPage || isJobPage;
  const isStyledServicePage =
    isServiceIndexPage ||
    isMontasjeServicePage ||
    isLeveranseServicePage ||
    isServicePartsPage;
  const isAccessoryIndexPage = pageSlug === "/tilleggsutstyr";
  const isDesignedProductPage =
    isPirPage ||
    isPurPage ||
    isPortPage ||
    isDoorPage ||
    isFacadePage ||
    isFrysetunnelPage;
  const isAccessoryPage = pageSlug?.startsWith("/andre-produkter/") ?? false;
  const isReferenceDetailPage =
    (pageSlug?.startsWith("/referansar/") ?? false) && pageSlug !== "/referansar";
  const accessoryImagesSection = isAccessoryPage
    ? sections.find((section) => section.title === "Bilde frå gammal side")
    : undefined;
  const pirProducerSection = isPirPage
    ? sections.find((section) =>
        section.title.startsWith("Den første norske produsenten"),
      )
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
              (section.title === "Kontakt" ||
                section.title === "Dokumentasjon og sertifikat" ||
                section.title === "Motta nyheitsbrev" ||
                technicalMigrationSectionTitles.has(section.title))
            ) &&
            !(
              isPirPage &&
              section.title === "Produktfordelar frå gammal side"
            ) &&
            !(
              isPirPage &&
              section.title.startsWith("Den første norske produsenten")
            ) &&
            !(
              isDesignedProductPage &&
              section.title === "For samarbeidspartnarar"
            ) &&
            !(
              isFacadePage &&
              section.title === "Kontaktinformasjon frå gammal side"
            ) &&
            !(
              isReferenceDetailPage &&
              section.title === "Referanse frå gammal side"
            ) &&
            !(
              isReferenceDetailPage &&
              section.title === "Dokumentlenker frå gammal side"
            ) &&
            !(
              isDocumentationPage &&
              (section.title === "Dokumentasjon og sertifikat" ||
                section.title === "Kontakt" ||
                section.title === "Full tekst frå gammal side" ||
                section.title === "Bilde frå gammal side" ||
                section.title === "Dokumentlenker frå gammal side" ||
                section.title === "Lenker frå gammal side")
            ) &&
            !(
              isElectricSkyveportPage &&
              (section.title ===
                "Monteringsanvisningar for elektrisk styring av Fresvik Skyveport" ||
                section.title === "Dokumentasjon og sertifikat" ||
                section.title === "Kontakt" ||
                section.title === "Full tekst frå gammal side" ||
                section.title === "Bilde frå gammal side" ||
                section.title === "Dokumentlenker frå gammal side" ||
                section.title === "Lenker frå gammal side")
            ) &&
            !(
              isMountingPage &&
              (section.title === "Dokumentasjon og sertifikat" ||
                section.title === "Kontakt" ||
                section.title === "Full tekst frå gammal side" ||
                section.title === "Bilde frå gammal side" ||
                section.title === "Dokumentlenker frå gammal side" ||
                section.title === "Lenker frå gammal side")
            ) &&
            !(
              isAccessoryIndexPage &&
              (section.title === "Full tekst frå gammal side" ||
                section.title === "Bilde frå gammal side" ||
                section.title === "Tilleggsutstyr og reservedelar" ||
                section.title === "Tilleggsutstyr til kjøle- og fryserom")
            ) &&
            !(
              isAccessoryPage &&
              section.title === "Bilde frå gammal side"
            ) &&
            !(
              isStyledServicePage &&
              (section.title === "Full tekst frå gammal side" ||
                section.title === "Bilde frå gammal side" ||
                section.title === "Dokumentlenker frå gammal side" ||
                section.title === "Lenker frå gammal side")
            ) &&
            !(
              isTransportDamagePage &&
              (section.title === "Full tekst frå gammal side" ||
                section.title === "Bilde frå gammal side" ||
                section.title === "Dokumentlenker frå gammal side" ||
                section.title === "Lenker frå gammal side")
            ) &&
            !(
              isReferenceIndexPage &&
              (section.title === "Kontakt" ||
                section.title === "Dokumentasjon og sertifikat")
            ) &&
            !(
              isNewsIndexPage &&
              (section.title === "Kontakt" ||
                section.title === "Dokumentasjon og sertifikat")
            ) &&
            !(
              isNewsDetailPage &&
              (section.title === "Kontakt" ||
                section.title === "Dokumentasjon og sertifikat" ||
                technicalMigrationSectionTitles.has(section.title))
            ) &&
            !(
              isServiceIndexPage &&
              section.title === "Teneste-URL-ar frå gammal sitemap"
            ) &&
            section.title !== "Nyheitsbrev og footerlenker frå gammal side",
        )
      : sections;

  return visibleSections.map((section, sectionIndex) => {
    if (isCompanyOverviewPage && section.title === "Vidare informasjon") {
      return (
        <CompanyOverviewSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          sectionIndex={sectionIndex}
        />
      );
    }

    if (isFirmainfoPage && section.title === "Om Fresvik Produkt") {
      return (
        <CompanyInfoSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isEmployeesPage &&
      (section.title === "Tilsette frå Sanity" ||
        section.title === "Kontaktpersonar")
    ) {
      return (
        <EmployeeGridSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isJobPage &&
      (section.title === "Ledig stilling" ||
        section.title === "Ledig stilling frå gammal side")
    ) {
      return (
        <JobOpeningSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isLegalPage &&
      (section.title === "Personverntekst" ||
        section.title === "Personverntekst frå gammal side" ||
        section.title === "Tekst frå gammal Openheitslova-side" ||
        section.title === "Openheitslova")
    ) {
      return (
        <LegalTextSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isLegalPage && section.title === "Dokument og eksterne kjelder") {
      return (
        <LegalDocumentsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isNewsIndexPage &&
      (section.title === "Aktuelt" || section.title === "Nyheiter frå Sanity")
    ) {
      return (
        <NewsIndexSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isNewsIndexPage &&
      section.title === "Lenker frå gammal aktuelt-side"
    ) {
      return (
        <NewsSourceLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isNewsDetailPage && page && section.title === "Innhald frå Sanity") {
      return (
        <NewsArticleBodySection
          key={`${section.title}-${sectionIndex}`}
          page={page}
          section={section}
        />
      );
    }

    if (
      isReferenceIndexPage &&
      section.title === "Ein leiande leverandør av kjølerom og fryserom"
    ) {
      return (
        <ReferenceIndexIntroSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isReferenceIndexPage && section.title === "Referansar") {
      return (
        <ReferenceIndexGridSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isReferenceIndexPage && section.title === "Kategoriar") {
      return (
        <ReferenceCategorySection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isElectricSkyveportPage &&
      section.title === "Filer frå gammal skyveportside"
    ) {
      return (
        <ElectricSkyveportDownloadsSection
          key={`electric-skyveport-downloads-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isMountingPage && section.title === "Monteringsanvisningar") {
      return (
        <MountingDownloadsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isMountingPage && section.title === "Ute etter dokumentasjon?") {
      return <MountingDocumentationCta key={`${section.title}-${sectionIndex}`} />;
    }

    if (isDocumentationPage && section.title === "Dokumentasjon") {
      return (
        <DocumentationDownloadsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isDocumentationPage && section.title === "Noko du savnar?") {
      return <DocumentationContactSection key={`${section.title}-${sectionIndex}`} />;
    }

    if (isAccessoryPage && section.title === "Produktinformasjon") {
      return (
        <AccessoryDetailSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          imageSection={accessoryImagesSection}
        />
      );
    }

    if (isAccessoryPage && section.title === "Vidare i tilleggsutstyr") {
      return (
        <AccessoryNavigationSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isAccessoryIndexPage &&
      (section.title === "Tilleggsutstyr og reservedelar" ||
        section.title === "Tilleggsutstyr til kjøle- og fryserom")
    ) {
      return (
        <AccessoryOverviewSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isAccessoryIndexPage && section.title === "Artikkelnummer") {
      return (
        <AccessoryOrderSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isAccessoryIndexPage && section.title === "Kontakt") {
      return <AccessoryContactSection key={`${section.title}-${sectionIndex}`} />;
    }

    if (
      isProductIndexPage &&
      section.title === "Dokumentasjon og sertifikat"
    ) {
      return (
        <ProductCertificateLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={{
            ...section,
            intro:
              "Sertifikat, godkjenningar og dokumentasjon samla som raske lenker.",
          }}
        />
      );
    }

    if (
      isAccessoryIndexPage &&
      section.title === "Dokumentasjon og sertifikat"
    ) {
      return (
        <ProductCertificateLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={{
            ...section,
            intro:
              "Sertifikat, godkjenningar og dokumentasjon samla som raske lenker.",
          }}
        />
      );
    }

    if (isServiceIndexPage && section.title === "Tenesteområde") {
      return (
        <ServiceIndexSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isLeveranseServicePage && section.title === "Leveranse") {
      return (
        <ServiceDeliverySection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isServicePartsPage &&
      section.title === "Service og reservedeler"
    ) {
      return (
        <ServicePartsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isMontasjeServicePage &&
      section.title === "Fresvik produkt tilbyr montasje av:"
    ) {
      return (
        <ServiceMontasjeSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isMontasjeServicePage && section.title === "Sentral godkjenning") {
      return (
        <ServiceApprovalSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isMontasjeServicePage &&
      section.title === "Meir informasjon om montasje?"
    ) {
      return (
        <ServiceContactCtaSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isMontasjeServicePage && section.title === "Kontakt") {
      return null;
    }

    if (isLeveranseServicePage && section.title === "Kontakt") {
      return null;
    }

    if (isServicePartsPage && section.title === "Kontakt") {
      return null;
    }

    if (
      isStyledServicePage &&
      section.title === "Dokumentasjon og sertifikat"
    ) {
      return (
        <ProductCertificateLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={{
            ...section,
            intro:
              "Sertifikat, godkjenningar og dokumentasjon samla som raske lenker.",
          }}
        />
      );
    }

    const isPirIntro =
      isPirPage &&
      (section.title === "Full tekst frå gammal side" ||
        section.title === "Fresvik PIR-Panel til kjøle- og fryserom");
    const isPurIntro =
      isPurPage &&
      (section.title === "Full tekst frå gammal side" ||
        section.title === "Fresvik PUR-Panel til kjøle- og fryserom");
    const isPortIntro =
      isPortPage &&
      (section.title === "Full tekst frå gammal side" ||
        section.title === "Skyveport til kjøle- og fryserom");
    const isDoorIntro =
      isDoorPage &&
      (section.title === "Full tekst frå gammal side" ||
        section.title === "Dører til kjøle- og fryserom");
    const isFacadeIntro =
      isFacadePage && section.title === "Full tekst frå gammal side";
    const isFrysetunnelIntro =
      isFrysetunnelPage && section.title === "Full tekst frå gammal side";

    if (
      isPirIntro ||
      isPurIntro ||
      isPortIntro ||
      isDoorIntro ||
      isFacadeIntro ||
      isFrysetunnelIntro
    ) {
      return (
        <ProductIntroSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          highlight={isPirIntro ? pirProducerHighlight : undefined}
        />
      );
    }

    if (
      isReferenceDetailPage &&
      (section.title === "Full tekst frå gammal side" ||
        section.title === "Prosjekttekst")
    ) {
      return (
        <ReferenceIntroSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isFacadePage && section.title === "Fasadepanel med polyuretan-kjerne") {
      return (
        <FacadeCoreSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isFacadePage &&
      section.title === "Isolasjonspanelpanel gir"
    ) {
      return (
        <ProductBenefitsSection
          key={`${section.title}-${sectionIndex}`}
          section={{
            ...section,
            title: "Isolasjonspanel gir",
            intro:
              "Tre praktiske grunnar til å bruke isolasjonspanel i lager- og industribygg.",
          }}
          showIndex={false}
        />
      );
    }

    if (
      (isPurPage || isPortPage || isDoorPage || isFacadePage) &&
      section.title === "Produktfordelar frå gammal side"
    ) {
      return (
        <ProductBenefitsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          showIndex={isPortPage}
        />
      );
    }

    if (isDoorPage && section.title === "Våre dører") {
      return (
        <DoorModelsSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isFacadePage && section.title === "Referansar") {
      return (
        <ProductReferenceSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isFrysetunnelPage &&
      section.title === "Sjå kva vi har levert til andre kundar"
    ) {
      return (
        <ProductReferenceSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
          eyebrow="Referansar"
          title="Fryseprosjekt og leveransar"
          badge="Frysetunnel"
        />
      );
    }

    if (isPortPage && section.title === "Produktbilete frå gammal side") {
      return (
        <ProductImageGallerySection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isDesignedProductPage && section.title === "Dokument") {
      return (
        <ProductDocumentSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isDesignedProductPage &&
      (section.title.startsWith("Tilleggsutstyr") ||
        section.title.startsWith("Tilleggsprodukt"))
    ) {
      if (isDoorPage) {
        return (
          <DoorAccessorySection
            key={`${section.title}-${sectionIndex}`}
            section={section}
          />
        );
      }

      return (
        <ProductRelatedSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (isReferenceDetailPage && section.title === "Lenker frå gammal side") {
      return (
        <ReferenceLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isDesignedProductPage &&
      section.title === "Sertifikat- og botnlenker frå gammal side"
    ) {
      return (
        <ProductCertificateLinksSection
          key={`${section.title}-${sectionIndex}`}
          section={section}
        />
      );
    }

    if (
      isDesignedProductPage &&
      section.title === "Kontaktinformasjon frå gammal side"
    ) {
      return null;
    }

    if (isDesignedProductPage && section.title === "For samarbeidspartnarar") {
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
                  Samarbeid
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
                  For samarbeidspartnarar
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
                  Kontakt oss
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
      if (isAccessoryPage && section.title === "Bilde frå gammal side") {
        return (
          <AccessoryImageGallerySection
            key={`${section.title}-${sectionIndex}`}
            section={section}
          />
        );
      }

      if (isReferenceDetailPage && section.title === "Bilde frå gammal side") {
        return (
          <ReferenceImageGallerySection
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
    );
  });
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

export function ContentPageView({ page, hero }: ContentPageViewProps) {
  const showMigrationDetails = page.showMigrationDetails === true;
  const isFaqPage = page.slug === "/kundeservice/faq";
  const isHomePage = page.pageType === "home";
  const isAccessoryPage = page.slug.startsWith("/andre-produkter/");
  const isReferenceDetailPage =
    page.slug.startsWith("/referansar/") && page.slug !== "/referansar";
  const isCompanyOrLegalPage =
    page.pageType === "company" || page.pageType === "legal";
  const suppressTopCards =
    isCompanyOrLegalPage ||
    page.slug === "/produkt/fresvik-pir-panel" ||
    page.slug === "/produkt/fresvik-pur-panel" ||
    page.slug === "/produkt/kjole-fryseportar" ||
    page.slug === "/produkt/kjole-frysedorer" ||
    page.slug === "/produkt/fasadepanel" ||
    page.slug === "/produkt/frysetunnel" ||
    page.slug === "/tenester" ||
    page.slug === "/tenester/montasje" ||
    page.slug === "/tenester/leveranse" ||
    page.slug === "/tenester/service-reservedeler" ||
    page.slug === "/dokumentasjon" ||
    page.slug === "/monteringsanvisning" ||
    page.slug === "/monteringsanvisningar-fresvik-skyveport" ||
    page.slug === "/tilleggsutstyr" ||
    page.slug === "/referansar" ||
    page.slug === "/aktuelt" ||
    isReferenceDetailPage ||
    isAccessoryPage;
  const showTopCards =
    !isFaqPage &&
    page.cards.length > 0 &&
    !suppressTopCards;
  const customHero = hero ?? null;
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
                    {page.intro}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <Link
                    href="/kontakt"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
                  >
                    Kontakt oss <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                  {showMigrationDetails && page.sourceUrl ? (
                    <a
                      href={page.sourceUrl}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Gammal kjelde <ExternalLink aria-hidden="true" size={17} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {isHomePage ? (
        <HomeContent page={page} />
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
                  {card.href ? <CardLink href={card.href} label="Les meir" /> : null}
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {isHomePage ? null : isFaqPage ? (
        <FAQAccordion page={page} />
      ) : (
        <ContentSections
          sections={page.sections}
          pageSlug={page.slug}
          page={page}
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

      {isHomePage ? null : <CTASection />}
    </main>
  );
}
