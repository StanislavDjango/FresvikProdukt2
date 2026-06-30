"use client";

import {
  ArrowRight,
  ChevronDown,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNavigation, type NavigationItem } from "@/data/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NorwayFlag } from "@/components/ui/NorwayFlag";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, item: NavigationItem) {
  if (pathname === item.href) return true;
  return item.children?.some((child) => pathname === child.href) || false;
}

function linkClass(active: boolean) {
  return [
    "inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-[8px] px-3.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    active
      ? "bg-[#EAF8FB] text-[#075F7A] shadow-[inset_0_-2px_0_#0891B2]"
      : "text-slate-800 hover:bg-[#F3F6F8] hover:text-[#075F7A]",
  ].join(" ");
}

const menuMeta: Record<
  string,
  {
    eyebrow: string;
    title: string;
    intro: string;
    actionLabel: string;
    ctaText?: string;
    ctaHref?: string;
    ctaLabel?: string;
  }
> = {
  "/produkt": {
    eyebrow: "Produkt",
    title: "Våre produkt",
    intro: "Isolerte panel, dører, portar og utstyr for kjøle- og fryserom.",
    actionLabel: "Sjå alle produkt",
    ctaText: "Treng du hjelp til å finne riktig produkt?",
    ctaHref: "/kontakt",
    ctaLabel: "Send førespørsel",
  },
  "/tenester": {
    eyebrow: "Tenester",
    title: "Våre tenester",
    intro: "Frå levering og montering til service, oppfølging og reservedeler.",
    actionLabel: "Les meir om tenester",
    ctaText: "Har du spørsmål om våre tenester?",
    ctaHref: "/kontakt",
    ctaLabel: "Kontakt oss",
  },
  "/dokumentasjon": {
    eyebrow: "Dokumentasjon",
    title: "Dokumentasjon",
    intro: "Finn produktunderlag, monteringsanvisningar og praktisk rettleiing.",
    actionLabel: "Til dokumentasjon",
    ctaText: "Finn du ikkje det du leitar etter?",
    ctaHref: "/kontakt",
    ctaLabel: "Kontakt oss",
  },
  "/om-oss": {
    eyebrow: "Om oss",
    title: "Fresvik Produkt",
    intro: "Firmainfo, tilsette, nyheiter og ledige stillingar.",
    actionLabel: "Om Fresvik",
  },
};

const menuItemDescriptions: Record<string, string> = {
  "/produkt/fresvik-pir-panel": "Høgeffektive isolerte PIR-panel for vegg og tak.",
  "/produkt/fresvik-pur-panel": "PUR-panel med framragande isolasjonsevne.",
  "/produkt/kjole-fryseportar": "Robuste skyve- og hengsleportar for kjøle- og fryserom.",
  "/produkt/kjole-frysedorer": "Dører med høg isolasjon og driftstryggleik.",
  "/produkt/fasadepanel": "Estetiske og slitesterke panel for fasadeløysingar.",
  "/produkt/frysetunnel": "Effektive frysetunnelar for rask og skånsam frysing.",
  "/tilleggsutstyr": "Komponentar og tilbehør som kompletterer løysinga.",
  "/tenester/montasje": "Profesjonell montering utført av erfarne fagfolk.",
  "/tenester/leveranse": "Sikker og effektiv levering til avtalt tid og stad.",
  "/tenester/service-reservedeler": "Service, vedlikehald og reservedeler for optimal drift.",
  "/monteringsanvisning": "Steg-for-steg rettleiing for montering og installasjon.",
  "/monteringsanvisningar-fresvik-skyveport": "Rettleiing for elektrisk skyveport.",
  "/kundeservice/faq": "Svar på vanlege spørsmål om produkt og dokumentasjon.",
  "/firmainfo": "Selskapsinformasjon og praktiske opplysningar.",
  "/tilsette": "Kontaktpersonar og fagfolk i Fresvik Produkt.",
  "/aktuelt": "Nyheiter, artiklar og oppdateringar frå Fresvik.",
  "/stillingledig": "Ledige stillingar og karrieremoglegheiter.",
};

function DesktopMenuItem({
  item,
  pathname,
  openMenu,
  toggleMenu,
  closeMenu,
}: {
  item: NavigationItem;
  pathname: string;
  openMenu: string | null;
  toggleMenu: (href: string) => void;
  closeMenu: () => void;
}) {
  const active = isActivePath(pathname, item);
  const isOpen = openMenu === item.href;
  const hasChildren = Boolean(item.children?.length);
  const meta = menuMeta[item.href] ?? {
    eyebrow: item.label,
    title: item.label,
    intro: "Gå vidare til relevante sider i denne delen av nettstaden.",
    actionLabel: `Alle ${item.label.toLowerCase()}`,
  };
  const isCompactMenu = item.href === "/om-oss";

  return (
    <NavigationMenuItem
      value={item.href}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeMenu();
        }
      }}
    >
      {hasChildren ? (
        <NavigationMenuTrigger
          data-active={active ? "" : undefined}
          aria-current={active ? "page" : undefined}
          aria-expanded={isOpen}
          onClick={() => toggleMenu(item.href)}
        >
          {item.label}
        </NavigationMenuTrigger>
      ) : (
        <NavigationMenuLink asChild>
          <Link
            href={item.href}
            className={linkClass(active)}
            aria-current={active ? "page" : undefined}
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        </NavigationMenuLink>
      )}

      {hasChildren ? (
        <NavigationMenuContent
          forceMount
          className={cn(
            "fixed inset-x-0 top-[7.25rem] z-30 px-4 transition-opacity duration-100",
            isOpen ? "visible opacity-100" : "invisible opacity-0",
          )}
        >
          <div
            className={cn(
              "mx-auto overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-2xl shadow-slate-950/14 ring-1 ring-slate-950/[0.02]",
              isCompactMenu ? "max-w-3xl" : "max-w-6xl",
            )}
          >
            <div
              className={cn(
                "grid gap-6 p-4",
                isCompactMenu
                  ? "lg:grid-cols-[15rem_1fr]"
                  : "lg:grid-cols-[16rem_1fr]",
              )}
            >
              <div className="rounded-[10px] border border-slate-100 bg-gradient-to-b from-cyan-50/70 to-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800">
                  {meta.eyebrow}
                </p>
                <p className="mt-8 text-xl font-semibold tracking-normal text-slate-950">
                  {meta.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {meta.intro}
                </p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
                  onClick={closeMenu}
                >
                  {meta.actionLabel}
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Link>
              </div>

              <div
                className={cn(
                  "grid content-start gap-x-8",
                  isCompactMenu ? "gap-y-1" : "gap-y-0 md:grid-cols-2",
                )}
              >
                {item.children?.map((child) => {
                  const childActive = pathname === child.href;
                  const description = menuItemDescriptions[child.href];

                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={closeMenu}
                      className={cn(
                        "group flex min-h-[4.25rem] items-start justify-between gap-4 border-b border-slate-100 px-1 py-4 transition last:border-b-0 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 md:last:border-b",
                        childActive
                          ? "text-cyan-950"
                          : "text-slate-900 hover:text-cyan-900",
                      )}
                    >
                      <span>
                        <span className="block text-sm font-semibold">
                          {child.label}
                        </span>
                        {description ? (
                          <span className="mt-1 block text-sm leading-6 text-slate-500">
                            {description}
                          </span>
                        ) : null}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-lg leading-none text-cyan-800 transition group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {!isCompactMenu && meta.ctaText && meta.ctaHref && meta.ctaLabel ? (
              <div className="border-t border-slate-100 bg-cyan-50/60 px-4 py-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-slate-950">
                    {meta.ctaText}
                    <span className="block font-normal text-slate-600">
                      Send oss ein førespørsel, så hjelper vi deg.
                    </span>
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link
                      href={meta.ctaHref}
                      className="inline-flex h-10 items-center justify-center rounded-[8px] border border-cyan-800 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
                      onClick={closeMenu}
                    >
                      {meta.ctaLabel}
                      <span aria-hidden="true" className="ml-2">
                        →
                      </span>
                    </Link>
                    <a
                      href="tel:+4757698300"
                      className="inline-flex h-10 items-center justify-center rounded-[8px] border border-cyan-800 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
                    >
                      +47 57 69 83 00
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </NavigationMenuContent>
      ) : null}
    </NavigationMenuItem>
  );
}

function MobileLink({
  item,
  onNavigate,
  pathname,
  openSection,
  onToggle,
}: {
  item: NavigationItem;
  onNavigate: () => void;
  pathname: string;
  openSection: string | null;
  onToggle: (href: string) => void;
}) {
  const active = isActivePath(pathname, item);
  const hasChildren = Boolean(item.children?.length);
  const isOpen = openSection === item.href;
  const meta = menuMeta[item.href];

  if (hasChildren) {
    const panelId = `mobile-menu-${item.href.replace(/[^a-z0-9]+/gi, "-")}`;

    return (
      <section className="overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04]">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(item.href)}
          className={cn(
            "flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-700",
            active
              ? "bg-cyan-50 text-cyan-950"
              : "text-slate-950 hover:bg-slate-50",
          )}
        >
          <span>
            {item.label}
            {meta?.intro ? (
              <span className="mt-1 block text-sm font-normal leading-5 text-slate-500">
                {meta.intro}
              </span>
            ) : null}
          </span>
          <ChevronDown
            aria-hidden="true"
            size={19}
            className={cn(
              "shrink-0 text-cyan-800 transition-transform duration-150",
              isOpen ? "rotate-180" : "rotate-0",
            )}
          />
        </button>

        <div
          id={panelId}
          hidden={!isOpen}
          className="border-t border-slate-100 bg-slate-50/70 p-2"
        >
          <Link
            href={item.href}
            onClick={onNavigate}
            className="mb-1 flex min-h-11 items-center justify-between rounded-[8px] bg-slate-950 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            {meta?.actionLabel ?? `Alle ${item.label.toLowerCase()}`}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>

          <div className="grid gap-1">
            {item.children?.map((child) => {
              const description = menuItemDescriptions[child.href];

              return (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className={cn(
                    "rounded-[8px] px-3.5 py-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2",
                    pathname === child.href
                      ? "bg-cyan-50 text-cyan-950"
                      : "text-slate-700 hover:bg-white hover:text-slate-950",
                  )}
                >
                  <span className="block font-semibold">{child.label}</span>
                  {description ? (
                    <span className="mt-1 block leading-5 text-slate-500">
                      {description}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04]">
      <Link
        href={item.href}
        onClick={onNavigate}
        className={cn(
          "flex min-h-14 items-center justify-between gap-3 px-4 py-3 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-700",
          active
            ? "bg-cyan-50 text-cyan-950"
            : "text-slate-950 hover:bg-slate-50 hover:text-cyan-900",
        )}
      >
        {item.label}
        <ArrowRight aria-hidden="true" size={18} className="shrink-0" />
      </Link>
    </section>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(
    null,
  );
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const mouseLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearMouseLeaveClose() {
    if (mouseLeaveTimer.current) {
      clearTimeout(mouseLeaveTimer.current);
      mouseLeaveTimer.current = null;
    }
  }

  function toggleDesktopMenu(href: string) {
    clearMouseLeaveClose();
    setOpenMenu((current) => (current === href ? null : href));
  }

  function closeDesktopMenu() {
    clearMouseLeaveClose();
    setOpenMenu(null);
  }

  function scheduleMouseLeaveClose() {
    if (!openMenu) return;

    clearMouseLeaveClose();
    mouseLeaveTimer.current = setTimeout(() => {
      setOpenMenu(null);
      mouseLeaveTimer.current = null;
    }, 120);
  }

  useEffect(() => {
    if (!mobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openMenu) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        headerRef.current?.contains(event.target)
      ) {
        return;
      }

      clearMouseLeaveClose();
      setOpenMenu(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        clearMouseLeaveClose();
        setOpenMenu(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  useEffect(() => clearMouseLeaveClose, []);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  function getDefaultMobileSection() {
    const activeItem = mainNavigation.find(
      (item) => item.children?.length && isActivePath(pathname, item),
    );

    return (
      activeItem?.href ??
      mainNavigation.find((item) => item.children?.length)?.href ??
      null
    );
  }

  function toggleMobileMenu() {
    if (mobileOpen) {
      setMobileOpen(false);
      return;
    }

    setMobileOpenSection(getDefaultMobileSection());
    setMobileOpen(true);
  }

  function toggleMobileSection(href: string) {
    setMobileOpenSection((current) => (current === href ? null : href));
  }

  return (
    <header
      ref={headerRef}
      onMouseEnter={clearMouseLeaveClose}
      onMouseLeave={scheduleMouseLeaveClose}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/96 shadow-sm shadow-slate-950/[0.03] backdrop-blur-xl"
    >
      <div className="hidden border-b border-slate-200/70 bg-slate-950 text-white lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-8 text-xs font-semibold">
          <p className="inline-flex items-center gap-2 text-white/80">
            <NorwayFlag className="h-3.5 w-5 ring-white/20" />
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
          className="flex shrink-0 items-center gap-2.5 rounded-[8px] py-1.5 transition opacity-95 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-4"
          aria-label="Fresvik Produkt framside"
        >
          <Image
            src="/assets/fresvik/brand/fresvik-fp-logo-transparent.png"
            alt="Fresvik Produkt"
            width={890}
            height={898}
            priority
            className="size-10 object-contain sm:size-12"
          />
          <span className="leading-none">
            <span className="block text-base font-black tracking-[0.16em] text-slate-950 sm:text-lg">
              FRESVIK
            </span>
            <span className="mt-1 block text-xs font-black tracking-[0.32em] text-cyan-800 sm:text-[0.8rem]">
              PRODUKT
            </span>
          </span>
        </Link>

        <NavigationMenu
          value={openMenu ?? ""}
          onValueChange={() => undefined}
          delayDuration={0}
          skipDelayDuration={0}
          aria-label="Hovudmeny"
          className="hidden items-center gap-1 rounded-[10px] border border-slate-200 bg-slate-50/90 p-1 lg:flex"
        >
          <NavigationMenuList>
            {mainNavigation.map((item) => (
              <DesktopMenuItem
                key={item.href}
                item={item}
                pathname={pathname}
                openMenu={openMenu}
                toggleMenu={toggleDesktopMenu}
                closeMenu={closeDesktopMenu}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 xl:flex">
          <a
            href="mailto:post@fresvik.no"
            className="inline-flex h-[3.25rem] items-center gap-2 whitespace-nowrap rounded-[10px] border border-slate-300 px-4 text-sm font-semibold text-slate-900 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            <Mail aria-hidden="true" size={17} />
            post@fresvik.no
          </a>
          <a
            href="tel:+4757698300"
            className="inline-flex h-[3.25rem] items-center gap-2 whitespace-nowrap rounded-[10px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            <Phone aria-hidden="true" size={17} />
            Ring oss
          </a>
          <span
            aria-label="Norsk produsent"
            className="inline-flex h-[3.25rem] w-20 shrink-0 items-center justify-center"
          >
            <NorwayFlag className="h-[2.8125rem] w-[4.5rem] rounded-[2px] shadow-none ring-0" />
          </span>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Lukk meny" : "Opne meny"}
          aria-expanded={mobileOpen}
          onClick={toggleMobileMenu}
          className="grid size-11 shrink-0 place-items-center rounded-[8px] border border-slate-300 bg-white text-slate-950 transition hover:border-cyan-800 hover:text-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 lg:hidden"
        >
          {mobileOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden">
          <div className="absolute inset-x-0 top-full z-50 border-t border-slate-200 bg-slate-50/98 shadow-2xl shadow-slate-950/15 backdrop-blur-xl">
            <nav
              aria-label="Mobilmeny"
              className="mx-auto grid max-h-[calc(100dvh-4.5rem)] max-w-7xl content-start gap-3 overflow-y-auto px-4 py-4 sm:max-h-[calc(100dvh-5rem)] sm:px-5"
            >
              <div className="rounded-[12px] border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-4">
                <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
                  <NorwayFlag />
                  Fresvik Produkt
                </p>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-700">
                  Finn produkt, tenester og dokumentasjon for kjøle- og
                  fryseløysingar.
                </p>
              </div>

              {mainNavigation.map((item) => (
                <MobileLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onNavigate={closeMobileMenu}
                  openSection={mobileOpenSection}
                  onToggle={toggleMobileSection}
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
