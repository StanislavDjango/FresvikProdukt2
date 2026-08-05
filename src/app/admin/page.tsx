import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { adminSessionCookie, isValidAdminSession } from "@/lib/adminSession";

export const metadata: Metadata = {
  title: "Administrator",
  robots: { index: false, follow: false },
};

type AdminPageProps = {
  searchParams: Promise<{
    error?: string;
    locale?: string;
    returnTo?: string;
  }>;
};

function safeReturnPath(value?: string) {
  if (!value?.startsWith("/") || value.startsWith("//")) return "/admin";
  return value;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const locale = params.locale === "en" ? "en" : "nn";
  const returnTo = safeReturnPath(params.returnTo);
  const cookieStore = await cookies();
  const isAdmin = await isValidAdminSession(
    cookieStore.get(adminSessionCookie)?.value,
  );
  const copy = locale === "en"
    ? {
        eyebrow: "Administration",
        title: "Administrator login",
        intro: "Sign in to open administrator mode. On-site editing will be connected in a later phase.",
        username: "Username",
        password: "Password",
        submit: "Sign in",
        error: "Incorrect username or password.",
        activeTitle: "Administrator mode is active",
        activeIntro: "The secure administrator session is ready. Editing tools will be connected here later.",
        returnLabel: "Return to the website",
      }
    : {
        eyebrow: "Administrasjon",
        title: "Administratorinnlogging",
        intro: "Logg inn for å opne administratormodus. Redigering direkte på nettstaden blir kopla til i ein seinare fase.",
        username: "Brukarnamn",
        password: "Passord",
        submit: "Logg inn",
        error: "Feil brukarnamn eller passord.",
        activeTitle: "Administratormodus er aktiv",
        activeIntro: "Den sikre administratorsesjonen er klar. Redigeringsverktøy blir kopla til her seinare.",
        returnLabel: "Tilbake til nettstaden",
      };

  return (
    <main className="border-b border-slate-200 bg-slate-50 px-4 py-12 sm:px-5 sm:py-16 lg:px-8">
      <section className="mx-auto max-w-xl overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-lg shadow-slate-950/[0.06]">
        <div className="h-1 bg-gradient-to-r from-cyan-700 via-sky-400 to-orange-500" />
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-[8px] bg-cyan-50 text-cyan-800">
            {isAdmin ? <ShieldCheck aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            {isAdmin ? copy.activeTitle : copy.title}
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            {isAdmin ? copy.activeIntro : copy.intro}
          </p>

          {isAdmin ? (
            <a
              href={returnTo === "/admin" ? (locale === "en" ? "/en" : "/") : returnTo}
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-[8px] bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-cyan-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
            >
              {copy.returnLabel}
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          ) : (
            <form action="/api/admin/login" method="post" className="mt-7 space-y-5">
              <input type="hidden" name="returnTo" value={returnTo} />
              <input type="hidden" name="locale" value={locale} />
              <label className="block text-sm font-semibold text-slate-800">
                {copy.username}
                <input
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  autoFocus
                  className="mt-2 h-12 w-full rounded-[8px] border border-slate-300 bg-white px-4 font-normal outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/20"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                {copy.password}
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-2 h-12 w-full rounded-[8px] border border-slate-300 bg-white px-4 font-normal outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/20"
                />
              </label>
              {params.error === "invalid" ? (
                <p role="alert" className="text-sm font-semibold text-red-700">
                  {copy.error}
                </p>
              ) : null}
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-cyan-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
              >
                {copy.submit}
                <ArrowRight aria-hidden="true" size={17} />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
