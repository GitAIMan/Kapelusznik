"use client";

import { useRef, useState, useEffect } from "react";

/**
 * Film z ogniem w tle (dip-to-black na końcu pętli).
 * Pauzuje się, gdy jest poza ekranem — oszczędza GPU/CPU.
 * Rodzic musi mieć `relative` + `overflow-hidden`.
 */
export default function FireVideo() {
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
  }, []);

  return (
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
      {/* Gradient overlay — czytelność tekstu */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/60 to-bg z-10" />
    </div>
  );
}
