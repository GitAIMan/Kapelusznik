"use client";

import { useRef, useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

type Props = {
  /** Ścieżka względem CDN, np. "/Video/bbusking_tlo.mp4" */
  src: string;
  /**
   * Zdjęcie zamiast filmu na telefonie (oszczędza dane komórkowe).
   * Bez niego film gra też na telefonie.
   */
  mobileImage?: { src: string; alt: string; position?: string };
};

/**
 * Film w tle (dip-to-black na końcu pętli).
 * Pauzuje się, gdy jest poza ekranem — oszczędza GPU/CPU.
 * Rodzic musi mieć `relative` + `overflow-hidden`.
 */
export default function BackgroundVideo({ src, mobileImage }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  // Na serwerze i do czasu sprawdzenia ekranu: brak filmu (telefon nic nie pobiera)
  const isDesktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );
  const showVideo = !mobileImage || isDesktop;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => {
      clearTimeout(startTimeout);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      observer.disconnect();
    };
  }, [showVideo]);

  return (
    <div className="absolute inset-0">
      {mobileImage && (
        <Image
          src={mobileImage.src}
          alt={mobileImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
          style={{ objectPosition: mobileImage.position ?? "center" }}
        />
      )}

      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoOpacity, transition: "opacity 0.5s ease-in-out" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={`${process.env.NEXT_PUBLIC_CDN_URL || ""}${src}`} type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay — czytelność tekstu */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-bg/65 to-bg z-10" />
      {/* Płynne przejście od menu (góra) w film — jak na dole */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-bg via-bg/80 to-transparent z-10" />
    </div>
  );
}
