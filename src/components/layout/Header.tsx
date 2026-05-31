import { Mail, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { mainNavigation } from "@/data/navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-[6px] bg-cyan-800 text-sm font-bold text-white">
            FP
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold tracking-[0.08em] text-slate-950">
              FRESVIK
            </span>
            <span className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Produkt
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-cyan-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="mailto:post@fresvik.no"
            className="inline-flex h-11 items-center gap-2 rounded-[6px] border border-slate-300 px-4 text-sm font-semibold text-slate-900 transition hover:border-cyan-800 hover:text-cyan-800"
          >
            <Mail aria-hidden="true" size={17} />
            post@fresvik.no
          </a>
          <a
            href="tel:+4757698300"
            className="inline-flex h-11 items-center gap-2 rounded-[6px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800"
          >
            <Phone aria-hidden="true" size={17} />
            Ring oss
          </a>
        </div>

        <details className="relative lg:hidden">
          <summary
            className="grid size-11 cursor-pointer list-none place-items-center rounded-[6px] border border-slate-300 [&::-webkit-details-marker]:hidden"
            aria-label="Opne meny"
          >
            <Menu aria-hidden="true" size={20} />
          </summary>
          <nav className="absolute right-0 top-13 z-20 grid w-72 gap-1 rounded-[8px] border border-slate-200 bg-white p-2 text-sm font-medium text-slate-700 shadow-xl">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[6px] px-3 py-2 transition hover:bg-slate-100 hover:text-cyan-800"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="mailto:post@fresvik.no"
              className="rounded-[6px] px-3 py-2 transition hover:bg-slate-100 hover:text-cyan-800"
            >
              post@fresvik.no
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
