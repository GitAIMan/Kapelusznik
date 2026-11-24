"use client";

import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import BackgroundVideo from "@/components/ui/BackgroundVideo";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Tło: film z BBuskingu (komputer) / zdjęcie (telefon) */}
      <div className="absolute inset-0">
        <BackgroundVideo
          src="/Video/bbusking_tlo.mp4"
          mobileImage={{
            src: "/images/hero-mobile.jpg",
            alt: "Artystka Kapelusznika w kostiumie z porożem w lesie",
            position: "42% center",
          }}
        />
        {/* Radial glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/15 blur-[60px] z-[5]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-violet/10 blur-[60px] z-[5]" />
      </div>

      {/* Decorative geometric lines */}
      <div className="absolute inset-0 z-[11] pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/10 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-20 right-12 w-24 h-24 border border-white/[0.03] rounded-full" />
        <div className="absolute bottom-32 left-16 w-16 h-16 border border-accent-gold/[0.06] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-text mb-6 leading-[1.1] tracking-tight">
          Zamieniamy ulice w&nbsp;sceny
        </h1>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Potrafimy zaskoczyć i&nbsp;zachwycić w&nbsp;czasach, gdy wszystko można
          zobaczyć w&nbsp;sieci. Szokujące widowiska żonglerskie, akrobatyczne,
          fireshow, pokazy iluzji i&nbsp;wiele więcej!
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

      {/* Scroll indicator — do sekcji zapowiedzi poniżej */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <ChevronDown className="h-5 w-5 text-text-muted animate-bounce-subtle" />
      </div>
    </section>
  );
}
