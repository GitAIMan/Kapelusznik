"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Flame } from "lucide-react";
import BackgroundVideo from "@/components/ui/BackgroundVideo";

export default function TesseraktOgniaPage() {
  return (
    <div className="pb-20">
      {/* HERO — film z ogniem w tle */}
      <section
        id="hero"
        className="relative flex min-h-[85vh] flex-col px-6 md:px-12 pt-28 pb-24 overflow-hidden"
      >
        <BackgroundVideo src="/Video/film_ogie%C5%84.mp4" />

        {/* Back link */}
        <div className="relative z-20 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Strona główna
          </Link>
        </div>

        <div className="relative z-20 mx-auto my-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/25 bg-accent-gold/5 text-accent-gold text-xs uppercase tracking-[0.2em] font-medium mb-8">
            <Flame className="h-3.5 w-3.5" />
            Projekt specjalny
          </div>

          <h1 className="font-heading text-4xl md:text-7xl font-bold text-text leading-[1.05] tracking-tight mb-6">
            Tesserakt Ognia
          </h1>

          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            {/* TODO: wstawić opis projektu */}
            Miejsce na krótki opis projektu. Tu pojawi się wprowadzenie, które opowie
            czym jest Tesserakt Ognia.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#o-projekcie"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-accent-gold/15 text-accent-gold border border-accent-gold/30 hover:bg-accent-gold/25 transition-all"
            >
              Dowiedz się więcej
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg text-text-secondary border border-white/10 hover:border-white/25 hover:text-text transition-all"
            >
              Zamów występ
            </Link>
          </div>
        </div>
      </section>

      {/* O PROJEKCIE */}
      <section id="o-projekcie" className="px-6 md:px-12 py-20 border-t border-white/[0.04]">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-accent-gold/70 font-medium">
            O projekcie
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-text mt-3 mb-8 leading-tight">
            Czym jest Tesserakt Ognia?
          </h2>

          <div className="space-y-6 text-text-secondary leading-[1.85]">
            {/* TODO: treść */}
            <p>
              Sekcja z dłuższym opisem, historia, idea, inspiracje. Tu klient wstawi
              przygotowane treści.
            </p>
            <p>
              Można opowiedzieć o genezie projektu, kim są twórcy, co odróżnia Tesserakt
              od klasycznego fire show.
            </p>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="px-6 md:px-12 py-20 border-t border-white/[0.04]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-accent-gold/70 font-medium">
              Galeria
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-text mt-3 leading-tight">
              Zobacz Tesserakt w akcji
            </h2>
          </div>

          {/* TODO: zastąpić prawdziwymi zdjęciami */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-bg-surface-hover to-bg-surface border border-white/[0.04] flex items-center justify-center"
              >
                <span className="text-text-muted/25 text-xs uppercase tracking-widest">
                  Zdjęcie {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECYFIKACJA / LICZBY */}
      <section id="info" className="px-6 md:px-12 py-20 border-t border-white/[0.04]">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "Wkrótce", label: "Czas trwania" },
              { value: "Wkrótce", label: "Liczba artystów" },
              { value: "Wkrótce", label: "Wymiary sceny" },
              { value: "Wkrótce", label: "Wymogi techniczne" },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-xl bg-bg-surface border border-white/[0.04]"
              >
                <div className="font-heading text-3xl md:text-4xl font-bold text-accent-gold mb-2">
                  {item.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-text-muted">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA KOŃCOWE */}
      <section id="cta" className="px-6 md:px-12 py-20 border-t border-white/[0.04]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-text mb-6 leading-tight">
            Zainteresowany pokazem?
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Skontaktuj się z nami, dopasujemy Tesserakt Ognia do Twojego wydarzenia.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-bg hover:bg-primary-light transition-all"
          >
            Zamów występ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
