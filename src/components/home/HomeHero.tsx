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
    <section className="relative isolate flex min-h-[34rem] overflow-hidden bg-slate-100 text-slate-950 sm:min-h-[38rem] lg:min-h-[calc(100svh-8rem)] lg:max-h-[48rem]">
      <Image
        src="/assets/fresvik/brand/fresvik-factory-hero.webp"
        alt="Fresvik Produkt sitt produksjonsanlegg mellom fjell og fjord"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[62%_center] sm:object-center"
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[78%] bg-[linear-gradient(0deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.9)_72%,rgba(255,255,255,0.18)_100%)] sm:inset-y-0 sm:right-auto sm:h-auto sm:w-[78%] sm:bg-white/85 sm:backdrop-blur-[2px] sm:[clip-path:polygon(0_0,82%_0,100%_50%,82%_100%,0_100%)] lg:w-[62%]" />

      <Container className="flex w-full items-end pb-12 pt-40 sm:items-center sm:py-16 lg:py-20">
        <div className="max-w-3xl sm:max-w-[62%] lg:max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-[6px] border border-cyan-900/20 bg-white/70 px-3 py-2 text-sm font-semibold text-cyan-950 backdrop-blur-sm">
            <CheckCircle2 aria-hidden="true" size={17} />
            {page.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            {page.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
