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

export default function Disciplines() {
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

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startTimeout = setTimeout(() => setVideoOpacity(1), 500);

    const handleTimeUpdate = () => {
      const timeLeft = video.duration - video.currentTime;
      if (timeLeft <= 0.5) {
        setVideoOpacity(0);
      } else if (video.currentTime > 0.1) {
        setVideoOpacity(1);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      clearTimeout(startTimeout);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

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
    <section id="nasze-sztuki" className="relative py-40 px-6 md:px-12 overflow-hidden">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: videoOpacity, transition: "opacity 0.5s ease-in-out" }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={`${process.env.NEXT_PUBLIC_CDN_URL || ""}/Video/Film_ogie%C5%84_3.mp4`} type="video/mp4" />
      </video>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/60 to-bg/80" />

      {/* Decorative bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent-violet/8 blur-[150px]" />
      </div>

      <div className="section-reveal relative mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <SectionLabel>Dyscypliny</SectionLabel>
          <SectionHeading
            className="mt-4 flex flex-col items-center"
            subtitle="Obróć koło i odkryj nasze dyscypliny"
          >
            Nasze sztuki
          </SectionHeading>
        </div>

        {/* Desktop — wheel + description (client-only to avoid hydration mismatch from Math.cos/sin precision) */}
        {mounted ? (
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
            {/* Wheel */}
            <div className="flex justify-center">
              <div
                ref={containerRef}
                className="relative w-[540px] h-[540px] select-none touch-none"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              >
                {/* Decorative orbits */}
                <div className="absolute inset-[60px] rounded-full border border-white/5" />
                <div className="absolute inset-[120px] rounded-full border border-white/5" />

                {/* Center icon */}
                <div
                  onClick={handleFlameClick}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center shadow-lg shadow-primary/30 cursor-default"
                >
                  <Flame className="h-8 w-8 text-text" />
                  <FloatingEmbers />
                </div>

                {/* Discipline icons on orbit */}
                {DISCIPLINES.map((disc, i) => {
                  const angle = (i * 360) / DISCIPLINES.length + rotation;
                  const radius = 220;
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
                        "absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 rounded-full flex items-center justify-center transition-all cursor-pointer",
                        isActive
                          ? "bg-gradient-to-br from-accent-gold to-primary text-bg scale-110 shadow-lg shadow-accent-gold/30"
                          : "bg-bg-surface border border-white/10 text-text-secondary hover:border-white/20"
                      )}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      title={disc.name}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center">
                  <ActiveIcon className="h-5 w-5 text-accent-gold" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-text">
                  {active.name}
                </h3>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6">
                {active.description}
              </p>
              <Link
                href={`/dyscypliny/${active.id}`}
                className="inline-flex items-center gap-2 text-accent-gold font-semibold text-sm hover:text-primary-light transition-colors mb-8"
              >
                Czytaj więcej
                <ArrowRight className="h-4 w-4" />
              </Link>
              {/* Image placeholder */}
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-bg-surface to-bg-surface-hover border border-white/5 shadow-inner flex items-center justify-center">
                <span className="text-text-muted text-sm">
                  Zdjęcie — {active.name}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:block h-[540px]" />
        )}

        {/* Mobile — button list */}
        <div className="lg:hidden space-y-4">
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
                      : "bg-bg-surface border border-white/5 hover:bg-bg-surface-hover"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      isActive ? "bg-accent-gold/20" : "bg-white/5"
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
                      Czytaj więcej
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
