import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ContentPage } from "@/data/pages";

type ContentPageViewProps = {
  page: ContentPage;
};

export function ContentPageView({ page }: ContentPageViewProps) {
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
              {page.sourceUrl ? (
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

      {page.cards.length > 0 ? (
        <section className="border-b border-slate-200 bg-white">
          <Container className="py-12">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {page.cards.map((card) => (
                <Card key={card.title} className="flex flex-col">
                  {card.imageUrl ? (
                    <Image
                      src={card.imageUrl}
                      alt={card.imageAlt || card.title}
                      width={720}
                      height={420}
                      className="-mx-5 -mt-5 mb-5 h-48 w-[calc(100%+2.5rem)] rounded-t-[8px] object-cover"
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
                  {card.href ? (
                    <Link
                      href={card.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-800 transition hover:text-slate-950"
                    >
                      Les meir <ArrowRight aria-hidden="true" size={17} />
                    </Link>
                  ) : null}
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {page.sections.map((section) => (
        <section key={section.title} className="py-14">
          <Container>
            <SectionHeader title={section.title} intro={section.intro} />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <Card key={item.title}>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      width={720}
                      height={420}
                      className="-mx-5 -mt-5 mb-5 h-48 w-[calc(100%+2.5rem)] rounded-t-[8px] object-cover"
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
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-800 transition hover:text-slate-950"
                    >
                      Opne <ArrowRight aria-hidden="true" size={17} />
                    </Link>
                  ) : null}
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ))}

      {page.todo && page.todo.length > 0 ? (
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

      <CTASection />
    </main>
  );
}
