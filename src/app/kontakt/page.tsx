import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { navigation, offices, salesContacts } from "@/data/contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt Fresvik Produkt for prosjekt, sal, service og leveranse av isolerte panel, portar og dører.",
  alternates: {
    canonical: "/kontakt",
  },
  openGraph: {
    title: "Kontakt Fresvik Produkt",
    description:
      "Snakk med Fresvik Produkt om prosjekt, sal, service og leveranse.",
    url: "/kontakt",
    siteName: "Fresvik Produkt",
    locale: "nn_NO",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fresvik Produkt AS",
  url: "https://www.fresvik.no",
  email: "post@fresvik.no",
  telephone: "+47 57 69 83 00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Fresvikvegen 995",
    postalCode: "6896",
    addressLocality: "Fresvik",
    addressCountry: "NO",
  },
};

function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="/kontakt" className="flex items-center gap-3">
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
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 lg:flex">
            {navigation.map((item) => (
              <a key={item} href="#" className="transition hover:text-cyan-800">
                {item}
              </a>
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
              href={telHref("+47 57 69 83 00")}
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
            <nav className="absolute right-0 top-13 z-20 grid w-64 gap-1 rounded-[8px] border border-slate-200 bg-white p-2 text-sm font-medium text-slate-700 shadow-xl">
              {navigation.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="rounded-[6px] px-3 py-2 transition hover:bg-slate-100 hover:text-cyan-800"
                >
                  {item}
                </a>
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

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cyan-950/70 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-[6px] border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-cyan-50">
              <ShieldCheck aria-hidden="true" size={17} />
              Prosjekt, sal og teknisk avklaring
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              Kontakt Fresvik Produkt
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Har du eit prosjekt du vil diskutere? Vi hjelper med isolerte
              panel, kjøle- og fryseløysingar, levering, montasje og service.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#foresporsel"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50"
              >
                Send førespørsel <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a
                href={telHref("+47 57 69 83 00")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] border border-white/25 px-5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                <Phone aria-hidden="true" size={18} />
                +47 57 69 83 00
              </a>
            </div>
          </div>

          <aside className="grid content-end gap-4">
            <div className="rounded-[8px] border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-medium text-cyan-100">Direkte kontakt</p>
              <a
                href="mailto:post@fresvik.no"
                className="mt-2 block text-2xl font-semibold text-white transition hover:text-cyan-100"
              >
                post@fresvik.no
              </a>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                Eller finn rett salskontakt under. Vi svarar normalt innan ein
                arbeidsdag.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[8px] border border-white/15 bg-white/10 p-4 backdrop-blur">
                <Clock3 aria-hidden="true" className="text-cyan-200" size={20} />
                <p className="mt-3 text-sm text-slate-200">Kontortid</p>
                <p className="mt-1 font-semibold text-white">Man-fre 08-16</p>
              </div>
              <div className="rounded-[8px] border border-white/15 bg-white/10 p-4 backdrop-blur">
                <Building2 aria-hidden="true" className="text-cyan-200" size={20} />
                <p className="mt-3 text-sm text-slate-200">Lokasjonar</p>
                <p className="mt-1 font-semibold text-white">Fresvik og Drammen</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 lg:grid-cols-2 lg:px-8">
        {offices.map((office) => (
          <article
            key={office.name}
            className="grid overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-800">
                {office.label}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                {office.name}
              </h2>
              <div className="mt-5 grid gap-4 text-sm text-slate-700">
                <p className="flex gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-cyan-800" size={18} />
                  <span>
                    {office.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
                <a className="flex gap-3 font-medium hover:text-cyan-800" href={telHref(office.phone)}>
                  <Phone aria-hidden="true" className="mt-0.5 shrink-0 text-cyan-800" size={18} />
                  {office.phone}
                </a>
                <a className="flex gap-3 font-medium hover:text-cyan-800" href={`mailto:${office.email}`}>
                  <Mail aria-hidden="true" className="mt-0.5 shrink-0 text-cyan-800" size={18} />
                  {office.email}
                </a>
              </div>
            </div>
            <iframe
              title={`${office.name} kart`}
              src={office.mapUrl}
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </article>
        ))}
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-800">
              Salsavdeling
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
              Kom direkte i kontakt med ein av oss
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Vel personen som passar best for prosjektet ditt, eller send
              førespørselen til felles innboks.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {salesContacts.map((person) => (
              <article
                key={person.email}
                className="rounded-[8px] border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-800">
                  {person.location}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-slate-950">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{person.role}</p>
                <div className="mt-5 grid gap-3 text-sm font-medium">
                  <a className="inline-flex items-center gap-2 hover:text-cyan-800" href={telHref(person.phone)}>
                    <Phone aria-hidden="true" size={17} />
                    {person.phone}
                  </a>
                  <a className="inline-flex items-center gap-2 break-all hover:text-cyan-800" href={`mailto:${person.email}`}>
                    <Mail aria-hidden="true" size={17} />
                    {person.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="foresporsel"
        className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-800">
            Send førespørsel
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
            Fortel kort om behovet, så tek vi kontakt
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Skjemaet opnar ein ferdig e-post til Fresvik. Neste steg blir å
            koble dette til Sanity og ein server action/API for direkte sending.
          </p>
        </div>
        <ContactForm />
      </section>

      <footer className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Fresvik Produkt AS, Fresvikvegen 995, 6896 Fresvik</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              Personvernerklæring
            </a>
            <a href="#" className="hover:text-white">
              Openheitslova
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
