"use client";

import { useState } from "react";
import Image from "next/image";
import Gallery from "@/components/ui/Gallery";
import type { Realizacja } from "@/lib/animacje";
import { cn } from "@/lib/utils";

/**
 * „Gotowe realizacje” — panele rozwijane.
 * Komputer: najechanie rozwija panel (poziomo). Telefon: stuknięcie (pionowo).
 * Tylko CSS transitions (flex-grow / height) — lekkie.
 */
export default function RealizacjePanels({ items }: { items: Realizacja[] }) {
  const [active, setActive] = useState(0);

  const hoverOpen = (i: number) => {
    if (window.matchMedia("(hover: hover)").matches) setActive(i);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2.5 lg:h-[520px]">
      {items.map((item, i) => {
        const on = active === i;
        const cover = item.photos[0];
        return (
          <div
            key={item.title}
            role="button"
            tabIndex={0}
            aria-expanded={on}
            onMouseEnter={() => hoverOpen(i)}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={cn(
              "group relative min-w-0 overflow-hidden rounded-2xl border bg-bg-surface cursor-pointer outline-none",
              "transition-[flex-grow,height,border-color] duration-500 ease-out motion-reduce:transition-none",
              "lg:h-auto lg:flex-1",
              on
                ? cn(item.photos.length ? "h-[500px]" : "h-[200px]", "lg:grow-[4] border-accent-gold/40")
                : "h-[84px] border-white/[0.08] focus-visible:border-accent-gold/40"
            )}
          >
            {cover ? (
              <Image
                src={cover.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: cover.position ?? "center" }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-accent-violet to-bg" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

            {/* Zwinięty: tytuł (komputer — pionowo, telefon — poziomo) */}
            <span
              className={cn(
                "absolute z-10 font-heading text-xl text-text whitespace-nowrap transition-opacity duration-300",
                "left-5 top-1/2 -translate-y-1/2",
                "lg:left-1/2 lg:top-auto lg:bottom-7 lg:translate-y-0 lg:-translate-x-1/2 lg:rotate-180 lg:[writing-mode:vertical-rl]",
                on && "opacity-0"
              )}
            >
              {item.title}
              <span className="lg:hidden text-accent-gold"> ▾</span>
            </span>

            {/* Rozwinięty: treść */}
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 z-10 p-5 md:p-7 transition-[opacity,transform] duration-300 motion-reduce:transition-none",
                on ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-3 pointer-events-none"
              )}
              onClick={(e) => on && e.stopPropagation()}
            >
              {item.tag && (
                <span className="inline-block mb-3 px-3 py-1 rounded-full border border-accent-gold/40 text-accent-gold text-xs font-semibold uppercase tracking-wider">
                  {item.tag}
                </span>
              )}
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-text mb-4">{item.title}</h3>
              {item.photos.length > 0 && (
                <Gallery
                  photos={item.photos}
                  className="grid grid-cols-3 sm:grid-cols-4 gap-2"
                  itemClassName="aspect-square"
                  sizes="(min-width: 1024px) 12vw, 45vw"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
