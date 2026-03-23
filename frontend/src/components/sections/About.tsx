"use client";

import { useRef, useState, useEffect } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/ui/StatCard";
import { STATS } from "@/lib/constants";

export default function About() {
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

  return (
    <section id="o-nas" className="relative py-40 px-6 md:px-12 overflow-hidden">
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
        <source src={`${process.env.NEXT_PUBLIC_CDN_URL || ""}/video/fire-about.mp4`} type="video/mp4" />
      </video>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/60 to-bg/80" />

      {/* Decorative bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-gold/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="section-reveal relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <div>
          <SectionLabel>Poznaj nas</SectionLabel>
          <SectionHeading className="mt-4">Kim jesteśmy</SectionHeading>
          <p className="text-text-secondary text-base leading-relaxed mb-6">
            Jesteśmy kolektywem artystów ulicznych z Bielska-Białej. Od ponad
            dekady zamieniamy ulice, place i festiwale w przestrzenie pełne
            magii. Łączymy żonglerki, akrobatykę powietrzną, sztukę
            lalkarską i wiele więcej.
          </p>
          <p className="text-text-muted text-sm leading-relaxed">
            Nasz zespół to pasjonaci, dla których sztuka uliczna jest sposobem
            na życie. Każdy występ to unikalne doświadczenie, które tworzymy
            wspólnie z publicznością — bo najlepsze spektakle rodzą się w
            interakcji.
          </p>
        </div>

        {/* Right — stats grid */}
        <div className="grid grid-cols-2 gap-5">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
