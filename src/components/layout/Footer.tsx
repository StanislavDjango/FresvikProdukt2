import {
  ArrowUpRight,
  Building2,
  FileText,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { footerNavigation, mainNavigation, type NavigationItem } from "@/data/navigation";

const productLinks =
  mainNavigation.find((item) => item.href === "/produkt")?.children ?? [];
const serviceLinks =
  mainNavigation.find((item) => item.href === "/tenester")?.children ?? [];
const documentationLinks =
  mainNavigation.find((item) => item.href === "/dokumentasjon")?.children ?? [];
const companyLinks =
  mainNavigation.find((item) => item.href === "/om-oss")?.children ?? [];

const footerGroups: Array<{
  title: string;
  href: string;
  links: NavigationItem[];
}> = [
  {
    title: "Produkt",
    href: "/produkt",
    links: productLinks,
  },
  {
    title: "Tenester",
    href: "/tenester",
    links: serviceLinks,
  },
  {
    title: "Dokumentasjon",
    href: "/dokumentasjon",
    links: documentationLinks,
  },
  {
    title: "Selskap",
    href: "/om-oss",
    links: companyLinks,
  },
];

function FooterLink({ item }: { item: NavigationItem }) {
  return (
    <Link
      href={item.href}
      className="group inline-flex min-h-8 items-center justify-between gap-3 rounded-[6px] text-sm font-medium text-slate-300 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      <span>{item.label}</span>
      <ArrowUpRight
        aria-hidden="true"
        size={14}
        className="opacity-0 transition group-hover:opacity-100"
      />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-12 lg:px-8">
        <div className="grid gap-8 rounded-[8px] border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-slate-950/20 sm:p-6 lg:grid-cols-[1.05fr_1.8fr] lg:p-8">
          <div className="grid content-between gap-8">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                aria-label="Fresvik Produkt framside"
              >
                <span className="grid size-12 place-items-center rounded-[8px] bg-cyan-700 text-sm font-bold text-white shadow-lg shadow-cyan-950/30">
                  FP
                </span>
                <span className="leading-tight">
                  <span className="block text-lg font-semibold uppercase tracking-[0.08em]">
                    Fresvik
                  </span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    Produkt
                  </span>
                </span>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
                Norsk produsent av isolerte panel, dører og portar til kjøle-
                og fryserom, med produksjon i Fresvik og sal frå Fresvik og
                Drammen.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-300">
              <a
                href="https://maps.google.com/?q=Fresvikvegen+995,+6896+Fresvik"
                className="group flex min-h-11 items-start gap-3 rounded-[8px] border border-white/10 bg-slate-900/80 px-3 py-3 transition hover:border-cyan-300/40 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <MapPin aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                <span>
                  <span className="block font-semibold text-white">
                    Fresvik Produkt AS
                  </span>
                  <span className="block">Fresvikvegen 995, 6896 Fresvik</span>
                </span>
              </a>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a
                  href="mailto:post@fresvik.no"
                  className="inline-flex min-h-11 items-center gap-3 rounded-[8px] border border-white/10 bg-slate-900/80 px-3 py-3 font-semibold text-white transition hover:border-cyan-300/40 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <Mail aria-hidden="true" size={18} className="text-cyan-300" />
                  post@fresvik.no
                </a>
                <a
                  href="tel:+4757698300"
                  className="inline-flex min-h-11 items-center gap-3 rounded-[8px] bg-cyan-600 px-3 py-3 font-semibold text-white transition hover:bg-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <Phone aria-hidden="true" size={18} />
                  57 69 83 00
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {footerGroups.map((group) => (
              <nav
                key={group.href}
                aria-label={group.title}
                className="grid content-start gap-2"
              >
                <Link
                  href={group.href}
                  className="mb-1 inline-flex min-h-9 items-center gap-2 rounded-[6px] text-sm font-semibold text-white transition hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {group.title}
                  <ArrowUpRight aria-hidden="true" size={14} />
                </Link>
                {group.links.map((item) => (
                  <FooterLink key={item.href} item={item} />
                ))}
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-[8px] border border-white/10 bg-slate-900/80 p-5 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <div className="flex items-start gap-3">
            <Building2 aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-cyan-300" />
            <div>
              <p className="text-sm font-semibold text-white">
                Treng du pris eller teknisk avklaring?
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                Send førespurnad, så finn salsavdelinga rett kontaktpunkt.
              </p>
            </div>
          </div>

          <Link
            href="/kontakt"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Kontakt oss
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>

          <Link
            href="/dokumentasjon"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] border border-white/15 px-4 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <FileText aria-hidden="true" size={16} />
            Dokumentasjon
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fresvik Produkt AS</p>
          <nav
            aria-label="Juridiske lenker"
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            {footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
