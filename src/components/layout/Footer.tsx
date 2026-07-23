"use client";

import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getFooterNavigation,
  getMainNavigation,
  type NavigationItem,
} from "@/data/navigation";
import { NorwayFlag } from "@/components/ui/NorwayFlag";
import { localeFromPathname, withLocale } from "@/i18n/config";

function buildFooterGroups(locale: "nn" | "en"): Array<{
  title: string;
  href: string;
  links: NavigationItem[];
}> {
  const navigation = getMainNavigation(locale);

  return [
    {
      title: locale === "en" ? "Products" : "Produkt",
      href: withLocale("/produkt", locale),
      links: navigation.find((item) => item.href === withLocale("/produkt", locale))?.children ?? [],
    },
    {
      title: locale === "en" ? "Services" : "Tenester",
      href: withLocale("/tenester", locale),
      links: navigation.find((item) => item.href === withLocale("/tenester", locale))?.children ?? [],
    },
    {
      title: locale === "en" ? "Documentation" : "Dokumentasjon",
      href: withLocale("/dokumentasjon", locale),
      links: navigation.find((item) => item.href === withLocale("/dokumentasjon", locale))?.children ?? [],
    },
    {
      title: locale === "en" ? "Company" : "Selskap",
      href: withLocale("/om-oss", locale),
      links: navigation.find((item) => item.href === withLocale("/om-oss", locale))?.children ?? [],
    },
  ];
}

function FooterLink({ item }: { item: NavigationItem }) {
  return (
    <Link
      href={item.href}
      className="inline-flex min-h-8 items-center rounded-[6px] text-sm font-medium text-slate-300 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      {item.label}
    </Link>
  );
}

export function Footer() {
  const pathname = usePathname();
  const t = useTranslations("Footer");
  const locale = localeFromPathname(pathname);
  const footerGroups = buildFooterGroups(locale);
  const footerNavigation = getFooterNavigation(locale);
  const trustItems = [
    {
      icon: CheckCircle2,
      label: t("trustExperience"),
    },
    {
      icon: ShieldCheck,
      label: t("trustProduction"),
    },
    {
      icon: FileText,
      label: t("trustDocuments"),
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 lg:px-8">
        <section className="grid gap-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/[0.06] sm:p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-800">
              Fresvik Produkt
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              {t("headline")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {t("intro")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-cyan-700 px-5 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
              >
                {t("sendRequest")}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <a
                href="tel:+4757698300"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] border border-slate-300 px-5 text-sm font-semibold text-slate-950 transition hover:border-cyan-700 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
              >
                <Phone aria-hidden="true" size={17} />
                57 69 83 00
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex min-h-16 items-center gap-3 rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-[6px] bg-cyan-50 text-cyan-800">
                    <Icon aria-hidden="true" size={19} />
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-[8px] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/15 sm:p-6 lg:p-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.8fr]">
            <div className="grid content-between gap-8">
              <div>
                <Link
                  href="/"
                  aria-label={t("homeLabel")}
                  className="inline-flex items-center gap-3 rounded-[8px] py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
                >
                  <Image
                    src="/assets/fresvik/brand/fresvik-fp-logo-transparent.png"
                    alt="Fresvik Produkt"
                    width={890}
                    height={898}
                    className="size-12 object-contain"
                  />
                  <span className="leading-none">
                    <span className="block text-lg font-black tracking-[0.16em] text-white">
                      FRESVIK
                    </span>
                    <span className="mt-1 block text-[0.8rem] font-black tracking-[0.32em] text-cyan-300">
                      PRODUKT
                    </span>
                  </span>
                </Link>
                <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
                  {t("description")}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-200">
                  <NorwayFlag />
                  {t("norwegianProducer")}
                </div>
              </div>

              <div className="grid gap-3 text-sm">
                <a
                  href="https://maps.google.com/?q=Fresvikvegen+995,+6896+Fresvik"
                  className="flex gap-3 rounded-[8px] border border-white/10 bg-white/[0.03] px-3 py-3 text-slate-300 transition hover:border-cyan-300/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <MapPin aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                  <span>
                    <span className="block font-semibold text-white">
                      Fresvik Produkt AS
                    </span>
                    Fresvikvegen 995, 6896 Fresvik
                  </span>
                </a>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <a
                    href="mailto:post@fresvik.no"
                    className="inline-flex min-h-11 items-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.03] px-3 font-semibold text-white transition hover:border-cyan-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <Mail aria-hidden="true" size={17} className="text-cyan-300" />
                    post@fresvik.no
                  </a>
                  <a
                    href="https://www.linkedin.com/company/fresvik-produkt-as/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.03] px-3 font-semibold text-white transition hover:border-cyan-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <span className="grid size-5 place-items-center rounded-[4px] bg-cyan-300 text-xs font-bold text-slate-950">
                      in
                    </span>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
              {footerGroups.map((group) => (
                <nav
                  key={group.href}
                  aria-label={group.title}
                  className="grid content-start gap-2"
                >
                  <Link
                    href={group.href}
                    className="mb-1 inline-flex min-h-9 items-center rounded-[6px] text-sm font-semibold text-white transition hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    {group.title}
                  </Link>
                  {group.links.map((item) => (
                    <FooterLink key={item.href} item={item} />
                  ))}
                </nav>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Fresvik Produkt AS</p>
            <nav
              aria-label={t("legalLinks")}
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
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
            <Link
              href="#top"
              aria-label={t("backToTop")}
              className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition hover:border-cyan-300 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <ArrowUp aria-hidden="true" size={18} />
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
}
