"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Photo = { src: string; alt: string; position?: string };

type Props = {
  photos: Photo[];
  /** Układ siatki (np. "grid grid-cols-3 gap-3") */
  className?: string;
  /** Klasy każdego kafelka — rozmiar/kształt (np. "aspect-[4/3]", "h-64") */
  itemClassName?: string;
  /** Podpowiedź rozmiaru dla next/image */
  sizes?: string;
};

/**
 * Zdjęcia w dowolnym układzie + lekki lightbox (bez bibliotek).
 * Klik → pełny ekran, strzałki/Esc z klawiatury.
 */
export default function Gallery({ photos, className, itemClassName, sizes = "(min-width: 1024px) 33vw, 100vw" }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <div className={className}>
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className={cn(
              "group relative block w-full overflow-hidden rounded-xl border border-white/[0.06] bg-bg-surface cursor-zoom-in",
              itemClassName
            )}
            aria-label={`Powiększ zdjęcie: ${p.alt}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ objectPosition: p.position ?? "center" }}
            />
          </button>
        ))}
      </div>

      {/* Portal do <body>: rodzic z transform (np. .card-hover) nie zamyka lightboxa w swoich granicach */}
      {current && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
        >
          <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-text hover:bg-white/20 transition-colors"
            aria-label="Zamknij"
          >
            <X className="h-6 w-6" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-text hover:bg-white/20 transition-colors"
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-text hover:bg-white/20 transition-colors"
                aria-label="Następne zdjęcie"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-text-secondary">
                {(open ?? 0) + 1} / {photos.length}
              </p>
            </>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
