import { ArrowRight, LockKeyhole } from "lucide-react";
import Image from "next/image";

type AccessPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    returnTo?: string | string[];
  }>;
};

export default async function PrototypeAccessPage({
  searchParams,
}: AccessPageProps) {
  const params = await searchParams;
  const returnTo =
    typeof params.returnTo === "string" && params.returnTo.startsWith("/")
      ? params.returnTo
      : "/";
  const isEnglish = returnTo === "/en" || returnTo.startsWith("/en/");
  const hasError = params.error === "invalid";

  const copy = isEnglish
    ? {
        eyebrow: "Private preview",
        title: "Enter the site",
        description:
          "This unofficial design prototype is available to invited viewers.",
        password: "Password",
        submit: "Unlock site",
        error: "The password is incorrect. Please try again.",
      }
    : {
        eyebrow: "Privat førehandsvising",
        title: "Opne nettsida",
        description:
          "Denne uoffisielle designprototypen er tilgjengeleg for inviterte personar.",
        password: "Passord",
        submit: "Lås opp nettsida",
        error: "Passordet er feil. Prøv på nytt.",
      };

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 sm:px-6">
      <Image
        src="/assets/fresvik/brand/fresvik-factory-hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/60" />

      <section className="w-full max-w-md overflow-hidden rounded-[8px] border border-white/20 bg-white shadow-2xl shadow-slate-950/30">
        <div className="h-1.5 bg-cyan-700" />
        <div className="p-6 sm:p-8">
          <div className="mb-7 flex items-center gap-3">
            <Image
              src="/assets/fresvik/brand/fresvik-fp-logo-transparent.png"
              alt="Fresvik Produkt"
              width={890}
              height={898}
              className="size-11 object-contain"
            />
            <div className="leading-none">
              <p className="text-base font-black tracking-[0.16em] text-slate-950">
                FRESVIK
              </p>
              <p className="mt-1 text-xs font-black tracking-[0.3em] text-cyan-800">
                PRODUKT
              </p>
            </div>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-800">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">
            {copy.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {copy.description}
          </p>

          <form
            action="/api/prototype-access"
            method="post"
            className="mt-7"
          >
            <input type="hidden" name="returnTo" value={returnTo} />
            <label
              htmlFor="prototype-password"
              className="text-sm font-semibold text-slate-900"
            >
              {copy.password}
            </label>
            <div className="relative mt-2">
              <LockKeyhole
                aria-hidden="true"
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                id="prototype-password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                aria-invalid={hasError}
                aria-describedby={hasError ? "prototype-password-error" : undefined}
                className="h-12 w-full rounded-[6px] border border-slate-300 bg-white pl-11 pr-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/20"
              />
            </div>

            {hasError ? (
              <p
                id="prototype-password-error"
                role="alert"
                className="mt-2 text-sm font-medium text-red-700"
              >
                {copy.error}
              </p>
            ) : null}

            <button
              type="submit"
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
            >
              {copy.submit}
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

