"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { DISCIPLINES } from "@/lib/constants";
import { useDisciplineWheel } from "@/hooks/useDisciplineWheel";
import FloatingEmbers from "@/components/ui/FloatingEmbers";
import { cn } from "@/lib/utils";

export default function DisciplineWheelSection() {
  const {
    rotation,
    activeIndex,
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    selectDiscipline,
  } = useDisciplineWheel(DISCIPLINES.length);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Triple-click Flame → /admin
  const flameClickCount = useRef(0);
  const flameClickTimer = useRef<NodeJS.Timeout | null>(null);

  const handleFlameClick = useCallback(() => {
    flameClickCount.current += 1;
    if (flameClickCount.current >= 3) {
      flameClickCount.current = 0;
      if (flameClickTimer.current) clearTimeout(flameClickTimer.current);
      localStorage.removeItem("admin_token");
      window.location.href = "/admin";
      return;
    }
    if (flameClickTimer.current) clearTimeout(flameClickTimer.current);
    flameClickTimer.current = setTimeout(() => {
      flameClickCount.current = 0;
    }, 600);
  }, []);

  const active = DISCIPLINES[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="relative px-6 md:px-12 py-20 overflow-hidden">
      <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

      {/* Decorative bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-violet/5 blur-[180px]" />
      </div>

      <div className="section-reveal relative mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <SectionLabel>Wybierz dyscypliny</SectionLabel>
          <SectionHeading className="mt-4 flex flex-col items-center">
            Dobierz program na swój event
          </SectionHeading>
          <p className="text-text-muted text-sm mt-3 max-w-md mx-auto">
            Obróć koło i odkryj dyscypliny, które możesz zamówić na swoje wydarzenie.
          </p>
        </div>

        {/* Desktop — wheel + description */}
        {mounted ? (
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
            {/* Wheel */}
            <div className="flex justify-center">
              <div
                ref={containerRef}
                className="relative w-[620px] h-[620px] select-none touch-none"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              >
                {/* Decorative orbits */}
                <div className="absolute inset-[40px] rounded-full border border-white/[0.04]" />
                <div className="absolute inset-[80px] rounded-full border border-white/[0.03]" />
                <div className="absolute inset-[140px] rounded-full border border-accent-gold/[0.04]" />

                {/* Subtle outer glow ring */}
                <div className="absolute inset-[-20px] rounded-full bg-accent-gold/[0.02] blur-[30px]" />

                {/* Center — Flame */}
                <div
                  onClick={handleFlameClick}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center shadow-xl shadow-primary/25 cursor-default z-10"
                >
                  <Flame className="h-10 w-10 text-text" />
                  <FloatingEmbers />
                </div>

                {/* Discipline icons on orbit */}
                {DISCIPLINES.map((disc, i) => {
                  const angle = (i * 360) / DISCIPLINES.length + rotation;
                  const radius = 250;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  const Icon = disc.icon;
                  const isActive = i === activeIndex;

                  return (
                    <button
                      key={disc.id}
                      onClick={() => selectDiscipline(i)}
                      className={cn(
                        "absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer z-10",
                        isActive
                          ? "bg-gradient-to-br from-accent-gold to-primary text-bg scale-110 shadow-lg shadow-accent-gold/30 ring-2 ring-accent-gold/20"
                          : "bg-bg-surface border border-white/10 text-text-secondary hover:border-white/25 hover:scale-105"
                      )}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      title={disc.name}
                    >
                      <Icon className="h-6 w-6" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description panel */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center">
                  <ActiveIcon className="h-6 w-6 text-accent-gold" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-text">
                  {active.name}
                </h3>
              </div>

              <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-md">
                {active.description}
              </p>

              <Link
                href={`/dyscypliny/${active.id}`}
                className="inline-flex items-center gap-2 text-accent-gold font-semibold text-sm hover:text-primary-light transition-colors hover:gap-3"
              >
                Poznaj szczegóły
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="hidden lg:block h-[620px]" />
        )}

        {/* Mobile — simple list */}
        <div className="lg:hidden space-y-3">
          {DISCIPLINES.map((disc, i) => {
            const Icon = disc.icon;
            const isActive = i === activeIndex;

            return (
              <div key={disc.id}>
                <button
                  onClick={() => selectDiscipline(i)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl transition-colors text-left cursor-pointer",
                    isActive
                      ? "bg-bg-surface-hover border border-accent-gold/20"
                      : "bg-bg-surface border border-white/[0.05] hover:bg-bg-surface-hover"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      isActive ? "bg-accent-gold/15" : "bg-white/5"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-accent-gold" : "text-text-secondary"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "font-heading font-semibold",
                      isActive ? "text-text" : "text-text-secondary"
                    )}
                  >
                    {disc.name}
                  </span>
                </button>

                {isActive && (
                  <div className="mt-3 pl-4 border-l-2 border-accent-gold/30 ml-5">
                    <p className="text-text-secondary text-sm leading-relaxed mb-3">
                      {disc.description}
                    </p>
                    <Link
                      href={`/dyscypliny/${disc.id}`}
                      className="inline-flex items-center gap-2 text-accent-gold font-semibold text-sm hover:text-primary-light transition-colors"
                    >
                      Poznaj szczegóły
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
