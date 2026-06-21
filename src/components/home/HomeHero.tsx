import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { ContentPage } from "@/data/pages";

type HomeHeroProps = {
  page: ContentPage;
};

export function HomeHero({ page }: HomeHeroProps) {
  return (
    <section className="relative isolate flex min-h-[34rem] overflow-hidden bg-slate-950 text-white sm:min-h-[38rem] lg:min-h-[calc(100svh-8rem)] lg:max-h-[48rem]">
      <Image
        src="/assets/fresvik/brand/fresvik-factory-hero.webp"
        alt="Fresvik Produkt sitt produksjonsanlegg mellom fjell og fjord"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[62%_center] sm:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.74)_42%,rgba(2,6,23,0.24)_70%,rgba(2,6,23,0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-slate-950/55 to-transparent" />

      <Container className="flex w-full items-center py-14 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-[6px] border border-white/25 bg-slate-950/35 px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            <CheckCircle2 aria-hidden="true" size={17} />
            {page.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 drop-shadow-md">
            {page.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] bg-white px-5 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Kontakt oss <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              href="/produkt"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] border border-white/60 bg-slate-950/25 px-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-slate-950/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Sjå produkta <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
