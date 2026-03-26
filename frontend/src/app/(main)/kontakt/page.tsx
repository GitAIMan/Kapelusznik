import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Contact from "@/components/sections/Contact";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Kontakt — Kapelusznik | Kolektyw Artystyczny",
  description:
    "Skontaktuj się z kolektywem Kapelusznik. Zamów występ artystów ulicznych na swoje wydarzenie.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="px-6 md:px-12 mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" />
          Strona główna
        </Link>
      </div>

      {/* Header */}
      <section className="relative px-6 md:px-12 pb-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel>Kontakt</SectionLabel>
          <SectionHeading className="mt-4 flex flex-col items-center">
            Porozmawiajmy
          </SectionHeading>
          <p className="text-text-secondary text-base mt-4 max-w-lg mx-auto">
            Opisz swoje wydarzenie — wrócimy z propozycją programu. Odpowiadamy
            w ciągu 48 godzin.
          </p>
        </div>
      </section>

      {/* IMAGE PLACEHOLDER: Wide cinematic band — Bielsko-Biała vibe */}
      <section className="px-6 md:px-12 pb-8">
        <div className="mx-auto max-w-5xl relative rounded-2xl overflow-hidden h-40 md:h-52 bg-gradient-to-r from-accent-violet/20 via-bg-surface-hover to-primary/10 border border-white/[0.04]">
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/30 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <span className="text-text-muted/25 text-xs uppercase tracking-[0.25em]">
              Bielsko-Biała — siedziba kolektywu
            </span>
          </div>
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#caa775 0.5px, transparent 0.5px)", backgroundSize: "16px 16px" }} />
        </div>
      </section>

      {/* Reuse existing Contact component */}
      <Contact />
    </div>
  );
}
