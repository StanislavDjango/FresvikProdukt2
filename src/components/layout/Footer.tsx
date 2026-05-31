import Link from "next/link";
import { footerNavigation, mainNavigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-[6px] bg-cyan-700 text-sm font-bold text-white">
              FP
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold tracking-[0.08em]">
                FRESVIK
              </span>
              <span className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Produkt
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
            Fresvik Produkt AS leverer isolerte panel, kjøle- og
            fryseløysingar, montasje og service til norske prosjekt.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Fresvikvegen 995, 6896 Fresvik
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <nav aria-label="Hovudlenker" className="grid content-start gap-3">
            <p className="text-sm font-semibold text-white">Nettstad</p>
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Sekundære lenker" className="grid content-start gap-3">
            <p className="text-sm font-semibold text-white">Informasjon</p>
            {footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="mailto:post@fresvik.no"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              post@fresvik.no
            </a>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© Fresvik Produkt AS</p>
          <p>Modernisert med Next.js, Sanity og Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
