"use client";

import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNavigation, type NavigationItem } from "@/data/navigation";

function isActivePath(pathname: string, item: NavigationItem) {
  if (pathname === item.href) return true;
  return item.children?.some((child) => pathname === child.href) || false;
}

function linkClass(active: boolean) {
  return [
    "inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-[7px] px-3.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 focus:ring-offset-white",
    active
      ? "bg-cyan-50 text-cyan-950 shadow-sm shadow-cyan-950/[0.04]"
      : "text-slate-700 hover:bg-white hover:text-slate-950",
  ].join(" ");
}

const menuMeta: Record<
  string,
  {
    eyebrow: string;
    title: string;
    intro: string;
  }
> = {
  "/produkt": {
    eyebrow: "Produkt",
    title: "Produktfamiliane",
    intro: "Panel, dører, portar og utstyr samla etter bruksområde.",
  },
  "/tenester": {
    eyebrow: "Tenester",
    title: "Frå levering til service",
    intro: "Praktisk oppfølging gjennom prosjekt og ettermarknad.",
  },
  "/dokumentasjon": {
    eyebrow: "Dokumentasjon",
    title: "Underlag og rettleiing",
    intro: "Finn monteringsanvisningar, tekniske dokument og FAQ.",
  },
  "/om-oss": {
    eyebrow: "Om oss",
    title: "Fresvik Produkt",
    intro: "Firmainfo, tilsette, nyheiter og ledige stillingar.",
  },
};

function DesktopMenuItem({
  item,
  pathname,
  openMenu,
  setOpenMenu,
}: {
  item: NavigationItem;
  pathname: string;
  openMenu: string | null;
  setOpenMenu: (href: string | null) => void;
}) {
  const active = isActivePath(pathname, item);
  const isOpen = openMenu === item.href;
  const hasChildren = Boolean(item.children?.length);
  const meta = menuMeta[item.href] ?? {
    eyebrow: item.label,
    title: item.label,
    intro: "Gå vidare til relevante sider i denne delen av nettstaden.",
  };
  const isWideMenu = (item.children?.length ?? 0) > 4;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(item.href)}
      onMouseLeave={() => setOpenMenu(null)}
      onFocus={() => setOpenMenu(item.href)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpenMenu(null);
        }
      }}
    >
      <Link
        href={item.href}
        className={linkClass(active)}
        aria-current={active ? "page" : undefined}
        aria-haspopup={hasChildren ? "menu" : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
      >
        {item.label}
        {hasChildren ? (
          <ChevronDown
            aria-hidden="true"
            size={15}
            className={["transition", isOpen ? "rotate-180" : ""].join(" ")}
          />
        ) : null}
      </Link>

      {hasChildren ? (
        <div
          className={[
            "absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3 transition duration-150",
            isWideMenu ? "w-[39rem]" : "w-[31rem]",
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1 opacity-0",
          ].join(" ")}
          onFocus={() => setOpenMenu(item.href)}
        >
          <div className="relative overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-2xl shadow-slate-950/15 ring-1 ring-slate-950/[0.03]">
            <div className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-slate-200 bg-white" />
            <div className="grid grid-cols-[12.5rem_1fr]">
              <div className="relative overflow-hidden bg-slate-950 p-4 text-white">
                <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />
                <div className="relative flex h-full min-h-56 flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                    {meta.eyebrow}
                  </p>
                  <p className="mt-4 text-xl font-semibold leading-tight">
                    {meta.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {meta.intro}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex h-10 items-center justify-between gap-3 rounded-[8px] bg-white px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    onClick={() => setOpenMenu(null)}
                  >
                    Alle {item.label.toLowerCase()}
                    <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                </div>
              </div>

              <div
                className={[
                  "grid content-start gap-2 bg-white p-3",
                  isWideMenu ? "grid-cols-2" : "grid-cols-1",
                ].join(" ")}
              >
                {item.children?.map((child) => {
                  const childActive = pathname === child.href;

                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpenMenu(null)}
                      className={[
                        "group flex min-h-[3.35rem] items-center justify-between gap-3 rounded-[10px] border px-3.5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2",
                        childActive
                          ? "border-cyan-200 bg-cyan-50 text-cyan-950"
                          : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950",
                      ].join(" ")}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={[
                            "grid size-7 shrink-0 place-items-center rounded-[7px] transition",
                            childActive
                              ? "bg-cyan-700 text-white"
                              : "bg-slate-100 text-cyan-800 group-hover:bg-cyan-50",
                          ].join(" ")}
                        >
                          {childActive ? (
                            <CheckCircle2 aria-hidden="true" size={15} />
                          ) : (
                            <ArrowRight aria-hidden="true" size={15} />
                          )}
                        </span>
                        {child.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileLink({
  item,
  onNavigate,
  pathname,
}: {
  item: NavigationItem;
  onNavigate: () => void;
  pathname: string;
}) {
  const active = isActivePath(pathname, item);

  return (
    <div className="rounded-[10px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.03]">
      <Link
        href={item.href}
        onClick={onNavigate}
        className={[
          "flex min-h-[3.25rem] items-center justify-between gap-3 rounded-[10px] px-4 py-3 text-base font-semibold transition",
          active
            ? "bg-cyan-50 text-cyan-950"
            : "text-slate-950 hover:text-cyan-900",
        ].join(" ")}
      >
        {item.label}
        <ArrowRight aria-hidden="true" size={18} className="shrink-0" />
      </Link>
      {item.children ? (
        <div className="grid gap-1 border-t border-slate-100 p-2">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className={[
                "rounded-[8px] px-3 py-2.5 text-sm font-semibold transition",
                pathname === child.href
                  ? "bg-cyan-50 text-cyan-950"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
              ].join(" ")}
            >
              {child.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/96 shadow-sm shadow-slate-950/[0.03] backdrop-blur-xl">
      <div className="hidden border-b border-slate-200/70 bg-slate-950 text-white lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-8 text-xs font-semibold">
          <p className="text-white/80">
            Norsk produksjon av panel, dører og portar til kjøle- og fryserom.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:post@fresvik.no"
              className="inline-flex items-center gap-2 text-white/85 transition hover:text-white"
            >
              <Mail aria-hidden="true" size={14} />
              post@fresvik.no
            </a>
            <a
              href="tel:+4757698300"
              className="inline-flex items-center gap-2 text-white/85 transition hover:text-white"
            >
              <Phone aria-hidden="true" size={14} />
              57 69 83 00
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-5 lg:px-8">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center rounded-[12px] bg-white px-2.5 py-1.5 shadow-sm shadow-slate-950/10 ring-1 ring-slate-200 transition hover:shadow-md hover:shadow-slate-950/10 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          aria-label="Fresvik Produkt framside"
        >
          <Image
            src="/assets/fresvik/brand/fresvik-logo-on-white.png"
            alt="Fresvik Produkt"
            width={1738}
            height={449}
            priority
            className="h-11 w-auto max-w-[11.5rem] object-contain sm:h-14 sm:max-w-[15rem] xl:h-[3.75rem] xl:max-w-[16rem]"
          />
        </Link>

        <nav
          aria-label="Hovudmeny"
          className="hidden items-center gap-1 rounded-[10px] border border-slate-200 bg-slate-50/90 p-1 lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {mainNavigation.map((item) => (
            <DesktopMenuItem
              key={item.href}
              item={item}
              pathname={pathname}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <a
            href="mailto:post@fresvik.no"
            className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[8px] border border-slate-300 px-4 text-sm font-semibold text-slate-900 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            <Mail aria-hidden="true" size={17} />
            post@fresvik.no
          </a>
          <a
            href="tel:+4757698300"
            className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            <Phone aria-hidden="true" size={17} />
            Ring oss
          </a>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Lukk meny" : "Opne meny"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="grid size-11 shrink-0 place-items-center rounded-[8px] border border-slate-300 bg-white text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 lg:hidden"
        >
          {mobileOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden">
          <div className="absolute inset-x-0 top-full z-50 border-t border-slate-200 bg-slate-50 shadow-2xl shadow-slate-950/15">
            <nav
              aria-label="Mobilmeny"
              className="mx-auto grid max-h-[calc(100dvh-4.5rem)] max-w-7xl content-start gap-3 overflow-y-auto px-4 py-4 sm:max-h-[calc(100dvh-5rem)] sm:px-5"
            >
              {mainNavigation.map((item) => (
                <MobileLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onNavigate={closeMobileMenu}
                />
              ))}

              <div className="grid gap-2 rounded-[10px] border border-slate-200 bg-white p-3 shadow-sm shadow-slate-950/[0.03] sm:grid-cols-2">
                <a
                  href="mailto:post@fresvik.no"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-slate-300 px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800"
                >
                  <Mail aria-hidden="true" size={17} />
                  post@fresvik.no
                </a>
                <a
                  href="tel:+4757698300"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800"
                >
                  <Phone aria-hidden="true" size={17} />
                  Ring oss
                </a>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
