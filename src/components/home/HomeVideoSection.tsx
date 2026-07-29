import { Container } from "@/components/ui/Container";
import { officialHomeVideo } from "@/data/homeMedia";
import type { Locale } from "@/i18n/config";

type HomeVideoSectionProps = {
  locale: Locale;
};

const copy = {
  nn: {
    eyebrow: "Film frå produksjonen",
    title: "Sjå Fresvik Produkt i arbeid",
    description:
      "Eit kort innblikk i verksemda og produksjonen i Fresvik.",
    ariaLabel: "Film frå Fresvik Produkt sin produksjon",
  },
  en: {
    eyebrow: "Inside production",
    title: "See Fresvik Produkt at work",
    description:
      "A short look at the company and production facilities in Fresvik.",
    ariaLabel: "Film from Fresvik Produkt's production facilities",
  },
} as const;

export function HomeVideoSection({ locale }: HomeVideoSectionProps) {
  const labels = copy[locale];

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-10 sm:py-12 lg:py-16">
        <div className="mb-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              {labels.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-3xl">
              {labels.title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600 md:justify-self-end sm:text-base">
            {labels.description}
          </p>
        </div>

        <div className="aspect-[400/142] overflow-hidden rounded-[8px] border border-slate-200 bg-slate-950 shadow-lg shadow-slate-950/10">
          <video
            className="block h-full w-full object-cover"
            aria-label={labels.ariaLabel}
            poster={officialHomeVideo.posterPath}
            preload="metadata"
            autoPlay
            loop
            muted
            playsInline
            controls
          >
            <source src={officialHomeVideo.localPath} type="video/mp4" />
          </video>
        </div>
      </Container>
    </section>
  );
}
