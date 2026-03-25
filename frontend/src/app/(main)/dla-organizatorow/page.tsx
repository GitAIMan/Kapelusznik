import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { TIMELINE_STEPS } from "@/lib/constants";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Dla organizatorów — Kapelusznik | Kolektyw Artystyczny",
  description:
    "Zamów występ artystów ulicznych na swoje wydarzenie. Cztery kroki do niezapomnianego spektaklu.",
};

const WHAT_WE_OFFER = [
  "Fire show i pokazy żonglerki ogniem",
  "Akrobatyka powietrzna na szarfach i trapezach",
  "Żywe rzeźby i interaktywne instalacje",
  "Pokazy highline nad publicznością",
  "Wielkoformatowe lalki i teatr uliczny",
  "Scena sztukmistrzów — magia i komedia",
  "Pełne zaplecze techniczne (nagłośnienie, oświetlenie)",
  "Program dopasowany do charakteru wydarzenia",
];

export default function ForOrganizersPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero — 2 columns: text left, image right */}
      <section className="relative px-6 md:px-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Dla organizatorów</SectionLabel>
              <SectionHeading className="mt-4">
                Twoje wydarzenie zasługuje na niezapomniane emocje
              </SectionHeading>
              <p className="text-text-secondary text-base leading-relaxed mt-6">
                Od kameralnych imprez firmowych po wielotysięczne festiwale —
                dopasowujemy program do każdego wydarzenia. Przyjeżdżamy z pełnym
                zapleczem technicznym i gwarantujemy profesjonalną obsługę od
                pierwszego kontaktu po finałowe brawa.
              </p>
              <div className="mt-8">
                <Button variant="gold" href="/kontakt">
                  Zapytaj o wycenę
                </Button>
              </div>
            </div>

            {/* IMAGE PLACEHOLDER 1: Event performance shot */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-72 md:h-96 bg-gradient-to-br from-accent-violet/25 via-bg-surface-hover to-primary/15 border border-white/[0.06] shadow-2xl shadow-black/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-text-muted/30 text-xs uppercase tracking-[0.2em]">
                    Występ na evencie
                  </span>
                </div>
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold/[0.06] blur-[40px]" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/[0.08] blur-[50px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process — 4 steps */}
      <section className="relative px-6 md:px-12 py-20">
        <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

        <div className="section-reveal mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <SectionLabel>Proces</SectionLabel>
            <SectionHeading className="mt-4 flex flex-col items-center">
              Jak to działa
            </SectionHeading>
            <p className="text-text-muted text-sm mt-3">
              Od kontaktu do owacji — cztery kroki.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.04]">
            {TIMELINE_STEPS.map((step) => (
              <div key={step.number} className="bg-bg p-7 md:p-8">
                <span className="text-xs font-medium text-accent-gold/60 tracking-[0.1em] uppercase">
                  {step.number}
                </span>
                <h3 className="font-heading text-base font-semibold text-text mt-3 mb-2">
                  {step.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="relative px-6 md:px-12 py-20">
        <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

        <div className="section-reveal mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <SectionLabel>Oferta</SectionLabel>
            <SectionHeading className="mt-4 flex flex-col items-center">
              Co oferujemy
            </SectionHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHAT_WE_OFFER.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-lg bg-bg-surface/50 border border-white/[0.04]"
              >
                <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-accent-gold/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-accent-gold" />
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event gallery — staggered 3 images */}
      <section className="relative px-6 md:px-12 py-16">
        <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

        <div className="section-reveal mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <SectionLabel>Realizacje</SectionLabel>
            <SectionHeading className="mt-4 flex flex-col items-center">
              Nasze eventy
            </SectionHeading>
          </div>

          {/* IMAGE PLACEHOLDERS 2-3: Staggered gallery — middle taller */}
          <div className="grid grid-cols-3 gap-3 items-end">
            <div className="rounded-xl overflow-hidden h-40 md:h-52 bg-gradient-to-b from-bg-surface-hover to-accent-violet/15 border border-white/[0.06]">
              <div className="h-full flex items-center justify-center">
                <span className="text-text-muted/25 text-[10px] uppercase tracking-[0.2em]">
                  Event #1
                </span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden h-52 md:h-72 bg-gradient-to-b from-primary/12 via-bg-surface to-accent-violet/20 border border-white/[0.06]">
              <div className="h-full flex items-center justify-center">
                <span className="text-text-muted/25 text-[10px] uppercase tracking-[0.2em]">
                  Event #2
                </span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden h-44 md:h-56 bg-gradient-to-b from-accent-gold/8 to-bg-surface-hover border border-white/[0.06]">
              <div className="h-full flex items-center justify-center">
                <span className="text-text-muted/25 text-[10px] uppercase tracking-[0.2em]">
                  Event #3
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative px-6 md:px-12 py-16">
        <div className="section-reveal mx-auto max-w-3xl">
          <div className="rounded-2xl bg-gradient-to-br from-bg-surface to-bg-surface-hover border border-white/[0.06] p-10 md:p-14 text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-text mb-4">
              Gotowy na niezapomniany event?
            </h3>
            <p className="text-text-secondary text-sm mb-8 max-w-md mx-auto">
              Opisz swoje wydarzenie — wrócimy z propozycją programu
              i&nbsp;wyceny w ciągu 48 godzin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="gold" href="/kontakt">
                Zamów występ
              </Button>
              <Button variant="ghost" href="/dyscypliny">
                Zobacz dyscypliny
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
