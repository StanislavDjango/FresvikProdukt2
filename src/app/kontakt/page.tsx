import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { getContactPage } from "@/sanity/lib/contactPage";

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

function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export default async function ContactPage() {
  const page = await getContactPage();
  const primaryOffice = page.offices[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fresvik Produkt AS",
    url: "https://www.fresvik.no",
    email: page.mainEmail,
    telephone: page.primaryPhone,
    address: primaryOffice
      ? {
          "@type": "PostalAddress",
          streetAddress: primaryOffice.address[0],
          postalCode: primaryOffice.address[1]?.split(" ")[0],
          addressLocality: primaryOffice.name,
          addressCountry: "NO",
        }
      : undefined,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cyan-950/70 to-transparent" />
        <Container className="relative grid gap-10 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-[6px] border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-cyan-50">
              <ShieldCheck aria-hidden="true" size={17} />
              {page.heroEyebrow}
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              {page.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#foresporsel"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50"
              >
                Send førespørsel <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a
                href={telHref(page.primaryPhone)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] border border-white/25 px-5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                <Phone aria-hidden="true" size={18} />
                {page.primaryPhone}
              </a>
            </div>
          </div>

          <aside className="grid content-end gap-4">
            <div className="rounded-[8px] border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-medium text-cyan-100">
                Direkte kontakt
              </p>
              <a
                href={`mailto:${page.mainEmail}`}
                className="mt-2 block text-2xl font-semibold text-white transition hover:text-cyan-100"
              >
                {page.mainEmail}
              </a>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                {page.responseNote}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[8px] border border-white/15 bg-white/10 p-4 backdrop-blur">
                <Clock3 aria-hidden="true" className="text-cyan-200" size={20} />
                <p className="mt-3 text-sm text-slate-200">Kontortid</p>
                <p className="mt-1 font-semibold text-white">
                  {page.officeHours}
                </p>
              </div>
              <div className="rounded-[8px] border border-white/15 bg-white/10 p-4 backdrop-blur">
                <Building2
                  aria-hidden="true"
                  className="text-cyan-200"
                  size={20}
                />
                <p className="mt-3 text-sm text-slate-200">Lokasjonar</p>
                <p className="mt-1 font-semibold text-white">
                  {page.locationsLabel}
                </p>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <Container className="grid gap-5 py-12 lg:grid-cols-2">
        {page.offices.map((office) => (
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
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-cyan-800"
                    size={18}
                  />
                  <span>
                    {office.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
                <a
                  className="flex gap-3 font-medium hover:text-cyan-800"
                  href={telHref(office.phone)}
                >
                  <Phone
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-cyan-800"
                    size={18}
                  />
                  {office.phone}
                </a>
                <a
                  className="flex gap-3 font-medium hover:text-cyan-800"
                  href={`mailto:${office.email}`}
                >
                  <Mail
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-cyan-800"
                    size={18}
                  />
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
      </Container>

      <section className="border-y border-slate-200 bg-white">
        <Container className="grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-800">
              {page.salesEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
              {page.salesTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {page.salesIntro}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {page.salesContacts.map((person) => (
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
                  <a
                    className="inline-flex items-center gap-2 hover:text-cyan-800"
                    href={telHref(person.phone)}
                  >
                    <Phone aria-hidden="true" size={17} />
                    {person.phone}
                  </a>
                  <a
                    className="inline-flex items-center gap-2 break-all hover:text-cyan-800"
                    href={`mailto:${person.email}`}
                  >
                    <Mail aria-hidden="true" size={17} />
                    {person.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container
        className="grid gap-8 py-14 lg:grid-cols-[0.9fr_1.1fr]"
        id="foresporsel"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-800">
            {page.formEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
            {page.formTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {page.formIntro}
          </p>
        </div>
        <ContactForm recipientEmail={page.mainEmail} />
      </Container>
    </main>
  );
}
