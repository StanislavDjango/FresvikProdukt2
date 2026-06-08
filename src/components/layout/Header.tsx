"use client";

import {
  ArrowRight,
  ChevronDown,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNavigation, type NavigationItem } from "@/data/navigation";

function isActivePath(pathname: string, item: NavigationItem) {
  if (pathname === item.href) return true;
  return item.children?.some((child) => pathname === child.href) || false;
}

function linkClass(active: boolean) {
  return [
    "inline-flex h-11 items-center gap-1.5 rounded-[6px] px-3 text-sm font-semibold transition",
    active
      ? "bg-cyan-50 text-cyan-900"
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
  ].join(" ");
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
    <div className="rounded-[8px] border border-slate-200 bg-white">
      <Link
        href={item.href}
        onClick={onNavigate}
        className={[
          "flex min-h-[3.25rem] items-center justify-between gap-3 rounded-[8px] px-4 py-3 text-base font-semibold transition",
          active ? "text-cyan-900" : "text-slate-950 hover:text-cyan-900",
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
                "rounded-[6px] px-3 py-2.5 text-sm font-medium transition",
                pathname === child.href
                  ? "bg-cyan-50 text-cyan-900"
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

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-950/[0.03] backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-5 lg:px-8">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex min-w-0 items-center"
          aria-label="Fresvik Produkt framside"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-cyan-800 text-sm font-bold text-white shadow-sm shadow-cyan-950/20">
            FP
          </span>
          <span className="ml-3 min-w-0 leading-tight">
            <span className="block text-base font-semibold uppercase tracking-[0.08em] text-slate-950 sm:text-lg">
              Fresvik
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800">
              Produkt
            </span>
          </span>
        </Link>

        <nav
          aria-label="Hovudmeny"
          className="hidden items-center gap-1 rounded-[8px] border border-slate-200 bg-slate-50/80 p-1 lg:flex"
        >
          {mainNavigation.map((item) => {
            const active = isActivePath(pathname, item);

            return (
              <div key={item.href} className="group relative">
                <Link href={item.href} className={linkClass(active)}>
                  {item.label}
                  {item.children ? (
                    <ChevronDown
                      aria-hidden="true"
                      size={15}
                      className="transition group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  ) : null}
                </Link>

                {item.children ? (
                  <div className="invisible absolute left-0 top-full z-30 min-w-72 translate-y-2 opacity-0 transition group-hover:visible group-hover:translate-y-3 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-3 group-focus-within:opacity-100">
                    <div className="rounded-[8px] border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/10">
                      <Link
                        href={item.href}
                        className="mb-1 flex items-center justify-between rounded-[6px] px-3 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 hover:text-cyan-900"
                      >
                        Alle {item.label.toLowerCase()}
                        <ArrowRight aria-hidden="true" size={16} />
                      </Link>
                      <div className="grid gap-1 border-t border-slate-100 pt-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={[
                              "rounded-[6px] px-3 py-2.5 text-sm font-medium transition",
                              pathname === child.href
                                ? "bg-cyan-50 text-cyan-900"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                            ].join(" ")}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
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

        <button
          type="button"
          aria-label={mobileOpen ? "Lukk meny" : "Opne meny"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="grid size-11 shrink-0 place-items-center rounded-[6px] border border-slate-300 bg-white text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 lg:hidden"
        >
          {mobileOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Lukk meny"
            className="fixed inset-0 top-[4.5rem] z-40 bg-slate-950/20 backdrop-blur-[2px] sm:top-20"
            onClick={closeMobileMenu}
          />
          <div className="absolute inset-x-0 top-full z-50 border-t border-slate-200 bg-slate-50 shadow-2xl shadow-slate-950/15">
            <nav
              aria-label="Mobilmeny"
              className="mx-auto grid max-h-[calc(100dvh-4.5rem)] max-w-7xl gap-3 overflow-y-auto px-4 py-4 sm:max-h-[calc(100dvh-5rem)] sm:px-5"
            >
              {mainNavigation.map((item) => (
                <MobileLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onNavigate={closeMobileMenu}
                />
              ))}

              <div className="grid gap-2 rounded-[8px] border border-slate-200 bg-white p-3 sm:grid-cols-2">
                <a
                  href="mailto:post@fresvik.no"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] border border-slate-300 px-4 text-sm font-semibold text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800"
                >
                  <Mail aria-hidden="true" size={17} />
                  post@fresvik.no
                </a>
                <a
                  href="tel:+4757698300"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800"
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
