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
    <section className="relative isolate flex min-h-[32rem] overflow-hidden bg-slate-100 text-slate-950 sm:min-h-[34rem] lg:min-h-[36rem]">
      <Image
        src="/assets/fresvik/brand/fresvik-factory-hero.webp"
        alt="Fresvik Produkt sitt produksjonsanlegg mellom fjell og fjord"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[64%_center] sm:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.72)_54%,rgba(255,255,255,0.05)_84%)] sm:bg-[linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.78)_36%,rgba(255,255,255,0.16)_62%,rgba(255,255,255,0)_78%)]" />

      <Container className="flex w-full items-end pb-8 pt-32 sm:items-center sm:py-12">
        <div className="max-w-2xl sm:max-w-[58%]">
          <p className="mb-4 inline-flex items-center gap-2 rounded-[6px] border border-cyan-900/20 bg-white/75 px-3 py-2 text-sm font-semibold text-cyan-950 backdrop-blur-sm">
            <CheckCircle2 aria-hidden="true" size={17} />
            {page.eyebrow}
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
            {page.intro}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex">
            <Link
              href="/kontakt"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] bg-cyan-800 px-5 text-sm font-semibold text-white shadow-lg transition hover:bg-cyan-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-800"
            >
              Kontakt oss <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              href="/produkt"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] border border-slate-400 bg-white/65 px-5 text-sm font-semibold text-slate-950 backdrop-blur-sm transition hover:border-cyan-800 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-800"
            >
              Sjå produkta <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
