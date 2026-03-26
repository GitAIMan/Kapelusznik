import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "O nas — Kapelusznik | Kolektyw Artystyczny",
  description:
    "Poznaj historię Kapelusznika — kolektywu artystów ulicznych z Bielska-Białej. Ponad dekada doświadczeń na scenach całej Polski.",
};

const MILESTONES = [
  { year: "2012", text: "Pierwsze wspólne występy na ulicach Bielska-Białej" },
  { year: "2015", text: "Oficjalne powstanie Kolektywu Kapelusznik" },
  { year: "2018", text: "Pierwszy duży festiwal — Carnaval Sztukmistrzów w Lublinie" },
  { year: "2020", text: "Rozszerzenie o akrobatykę powietrzną i highline" },
  { year: "2023", text: "Ponad 200 wydarzeń na koncie w całej Polsce" },
  { year: "2025", text: "Nowe pokolenie artystów dołącza do kolektywu" },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="px-6 md:px-12 mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" />
          Strona główna
        </Link>
      </div>

      {/* Hero — asymmetric: text left, overlapping image + quote right */}
      <section className="relative px-6 md:px-12 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left — text */}
            <div className="lg:col-span-6">
              <SectionLabel>O nas</SectionLabel>
              <SectionHeading className="mt-4">
                Kolektyw, który zamienia ulice w&nbsp;sceny
              </SectionHeading>
              <p className="text-text-secondary text-base leading-relaxed mt-6 max-w-xl">
                Jesteśmy grupą artystów ulicznych z Bielska-Białej. Od ponad
                dekady łączymy żonglerkę, akrobatykę powietrzną, sztukę lalkarską,
                highline i wiele więcej — tworząc spektakle, które publiczność
                pamięta latami.
              </p>
              <p className="text-text-muted text-sm leading-relaxed mt-4 max-w-xl">
                Nasz zespół to pasjonaci, dla których sztuka uliczna jest sposobem
                na życie. Każdy występ to unikalne doświadczenie, które tworzymy
                wspólnie z publicznością — bo najlepsze spektakle rodzą się
                w&nbsp;interakcji.
              </p>
            </div>

            {/* Right — stacked: image with overlapping quote */}
            <div className="lg:col-span-6 relative">
              {/* IMAGE PLACEHOLDER 1: Hero group photo — replace div with <Image> */}
              <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 bg-gradient-to-br from-bg-surface-hover via-accent-violet/20 to-bg-surface border border-white/[0.06] -rotate-1">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-text-muted/40 text-xs uppercase tracking-[0.2em]">
                    Zdjęcie zespołu
                  </span>
                </div>
                {/* Subtle diagonal lines decoration */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, #caa775 20px, #caa775 21px)" }} />
              </div>

              {/* Quote overlay — floating on image */}
              <blockquote className="relative -mt-16 ml-6 mr-2 md:ml-12 bg-bg/90 backdrop-blur-sm border border-white/[0.08] rounded-xl p-6 z-10">
                <p className="text-text font-heading text-lg md:text-xl font-medium leading-snug italic">
                  &ldquo;Najpiękniejszy moment to ten, gdy publiczność zapomina,
                  że stoi na ulicy.&rdquo;
                </p>
                <cite className="block mt-3 text-text-muted text-sm not-italic">
                  — Założyciel Kapelusznika
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Panoramic image band — full width, cinematic */}
      <section className="relative px-6 md:px-12 py-4">
        {/* IMAGE PLACEHOLDER 2: Wide performance shot — replace div with <Image> */}
        <div className="section-reveal mx-auto max-w-7xl relative rounded-2xl overflow-hidden h-48 md:h-64 bg-gradient-to-r from-accent-violet/30 via-bg-surface to-accent-violet/20 border border-white/[0.04]">
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-bg/40 z-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-text-muted/30 text-xs uppercase tracking-[0.2em]">
              Panorama — Kapelusznik na scenie
            </span>
          </div>
          {/* Decorative gradient mesh */}
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-accent-gold/[0.03] blur-[60px]" />
        </div>
      </section>

      {/* Timeline */}
      <section className="relative px-6 md:px-12 py-20">
        <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

        <div className="section-reveal mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <SectionLabel>Nasza historia</SectionLabel>
            <SectionHeading className="mt-4 flex flex-col items-center">
              Droga Kapelusznika
            </SectionHeading>
          </div>

          <div className="relative">
            <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-gold/30 via-accent-gold/10 to-transparent hidden md:block" />

            <div className="space-y-8">
              {MILESTONES.map((m) => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="shrink-0 w-20 text-right">
                    <span className="font-heading text-lg font-bold text-accent-gold">
                      {m.year}
                    </span>
                  </div>
                  <div className="hidden md:block shrink-0 w-3 h-3 mt-2 rounded-full bg-accent-gold/40 ring-4 ring-bg" />
                  <p className="text-text-secondary text-sm leading-relaxed pt-0.5">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values + image */}
      <section className="relative px-6 md:px-12 py-20">
        <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

        <div className="section-reveal mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Values cards */}
            {[
              { title: "Pasja", text: "Sztuka uliczna to nasz sposób na życie. Każdy występ jest pełen energii i autentyczności." },
              { title: "Wspólnota", text: "Kolektyw to więcej niż zespół. To rodzina artystów, która wspiera się nawzajem na scenie i poza nią." },
              { title: "Interakcja", text: "Najlepsze spektakle powstają w dialogu z publicznością. Zapraszamy widzów do wspólnej zabawy." },
            ].map((v, i) => (
              <div key={v.title} className="bg-bg-surface/60 border border-white/[0.06] rounded-xl p-8">
                <h3 className="font-heading text-lg font-semibold text-text mb-3">
                  {v.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>

          {/* IMAGE PLACEHOLDER 3: Offset photo below values — artsy placement */}
          <div className="mt-8 flex justify-end">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden h-52 bg-gradient-to-bl from-bg-surface via-primary/10 to-bg-surface-hover border border-white/[0.06] rotate-1">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-text-muted/30 text-xs uppercase tracking-[0.2em]">
                  Za kulisami
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 md:px-12 py-16">
        <div className="section-reveal mx-auto max-w-2xl text-center">
          <p className="text-text-secondary text-base mb-6">
            Chcesz nas zobaczyć na żywo?
          </p>
          <Button variant="gold" href="/kontakt">
            Zamów występ
          </Button>
        </div>
      </section>
    </div>
  );
}
