"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background — fire video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoOpacity, transition: "opacity 0.5s ease-in-out" }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={`${process.env.NEXT_PUBLIC_CDN_URL || ""}/Video/film_ogie%C5%84.mp4`} type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/60 to-bg z-10" />
        {/* Radial glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/15 blur-[120px] z-[5]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-violet/10 blur-[100px] z-[5]" />
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
        <p className="text-accent-gold text-xs uppercase tracking-[0.14em] mb-6 font-medium">
          Kolektyw artystyczny · Bielsko-Biała
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-text mb-6 leading-[1.1] tracking-tight">
          Zamieniamy ulice w&nbsp;sceny
        </h1>
        <p className="text-text-secondary text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Ogień, akrobatyka, magia — spektakle, które publiczność pamięta latami.
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
