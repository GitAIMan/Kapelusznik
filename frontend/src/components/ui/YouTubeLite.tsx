"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Lekki odtwarzacz YouTube: najpierw tylko miniatura + przycisk ▶.
 * Prawdziwy odtwarzacz ładuje się dopiero po kliknięciu — strona zostaje szybka.
 */
export default function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full cursor-pointer"
      aria-label={`Odtwórz film: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-bg shadow-lg shadow-black/40 ring-4 ring-primary/25 transition-transform duration-300 group-hover:scale-110">
        <Play className="ml-1 h-7 w-7 fill-current" />
      </span>
    </button>
  );
}
