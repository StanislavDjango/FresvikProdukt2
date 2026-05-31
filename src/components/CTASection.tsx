import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type CTASectionProps = {
  title?: string;
  text?: string;
};

export function CTASection({
  title = "Klar for å diskutere prosjektet?",
  text = "Ta kontakt med Fresvik Produkt for teknisk avklaring, produktval og vidare planlegging.",
}: CTASectionProps) {
  return (
    <section className="bg-slate-950 text-white">
      <Container className="grid gap-6 py-12 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-normal">{title}</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
            {text}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/kontakt" variant="ghost">
            Kontakt oss <ArrowRight aria-hidden="true" size={18} />
          </Button>
          <Button href="tel:+4757698300" variant="ghost">
            <Phone aria-hidden="true" size={18} />
            +47 57 69 83 00
          </Button>
        </div>
      </Container>
    </section>
  );
}
