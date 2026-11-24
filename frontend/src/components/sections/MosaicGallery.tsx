"use client";

import { useState } from "react";
import Gallery, { type Photo } from "@/components/ui/Gallery";
import { cn } from "@/lib/utils";

const VISIBLE = 8;

/**
 * Mozaika: 1 duże + 1 szerokie + reszta małe. Najpierw 8 zdjęć, „Pokaż wszystkie” odkrywa resztę.
 * Lightbox zawsze przewija WSZYSTKIE zdjęcia (ukryte są tylko kafelki).
 */
export default function MosaicGallery({ photos }: { photos: Photo[] }) {
  const [all, setAll] = useState(false);

  return (
    <>
      <Gallery
        photos={photos}
        sizes="(min-width: 1024px) 25vw, 50vw"
        itemClassName="h-full"
        className={cn(
          "mt-10 grid grid-cols-2 lg:grid-cols-4 auto-rows-[140px] md:auto-rows-[190px] gap-2.5",
          "[&>*:nth-child(1)]:col-span-2 [&>*:nth-child(1)]:row-span-2 [&>*:nth-child(2)]:col-span-2",
          !all && "[&>*:nth-child(n+9)]:hidden"
        )}
      />
      {photos.length > VISIBLE && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            className="px-6 py-3 rounded-xl border border-accent-gold/40 text-accent-gold font-semibold hover:bg-accent-gold/10 transition-colors cursor-pointer"
          >
            {all ? "Pokaż mniej" : `Pokaż wszystkie zdjęcia (${photos.length})`}
          </button>
        </div>
      )}
    </>
  );
}
