"use client";

import { ArrowRight, ExternalLink, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState, useSyncExternalStore } from "react";

const storageKey = "fresvik-unofficial-prototype-notice-v2";
const oldSiteUrl = "https://www.fresvik.no/";

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getClientSnapshot() {
  try {
    return localStorage.getItem(storageKey) !== "dismissed";
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  return false;
}

export function DevelopmentNotice() {
  const t = useTranslations("DevelopmentNotice");
  const pathname = usePathname();
  const shouldShowStoredNotice = useSyncExternalStore(
    subscribeToStorage,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [dismissedInSession, setDismissedInSession] = useState(false);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(storageKey, "dismissed");
    } catch {
      // Ignore storage errors; closing the notice should still work.
    }

    setDismissedInSession(true);
  }, []);

  const isOpen =
    shouldShowStoredNotice &&
    !dismissedInSession &&
    !pathname?.startsWith("/studio");

  if (!isOpen || pathname?.startsWith("/studio")) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end bg-slate-950/35 p-3 backdrop-blur-[2px] sm:items-center sm:justify-center sm:p-6"
      role="presentation"
    >
      <section
        aria-labelledby="development-notice-title"
        aria-describedby="development-notice-description"
        className="relative w-full max-w-xl overflow-hidden rounded-[14px] border border-white/70 bg-white shadow-2xl shadow-slate-950/25"
        role="dialog"
        aria-modal="true"
      >
        <div className="h-1.5 bg-gradient-to-r from-cyan-700 via-sky-400 to-orange-500" />

        <div className="grid gap-5 p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-cyan-50 text-cyan-800 ring-1 ring-cyan-100">
              <Info className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800">
                {t("eyebrow")}
              </p>
              <h2
                id="development-notice-title"
                className="mt-2 text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl"
              >
                {t("title")}
              </h2>
            </div>
          </div>

          <p
            id="development-notice-description"
            className="text-base leading-7 text-slate-600"
          >
            {t("description")}
          </p>

          <div className="rounded-[10px] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <strong className="font-semibold text-slate-950">
              {t("officialSite")}
            </strong>{" "}
            <span className="break-all">www.fresvik.no</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={oldSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
            >
              {t("openOldSite")}
              <ExternalLink className="size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-950 transition hover:border-cyan-700 hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
            >
              {t("continue")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
