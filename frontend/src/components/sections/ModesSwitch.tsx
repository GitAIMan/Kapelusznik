"use client";

import { useState } from "react";
import Gallery from "@/components/ui/Gallery";
import type { AnimacjaPage } from "@/lib/animacje";
import { cn } from "@/lib/utils";

type Items = NonNullable<AnimacjaPage["modes"]>["items"];

/** Przełącznik dwóch trybów (np. Kuglarze w tłumie / Warsztaty). Bez bibliotek. */
export default function ModesSwitch({ items }: { items: Items }) {
  const [active, setActive] = useState(0);
  const m = items[active];

  return (
    <>
      <div className="flex justify-center mb-10">
        <div role="tablist" className="inline-flex flex-wrap justify-center p-1.5 rounded-full border border-white/[0.08] bg-bg-surface">
          {items.map((it, i) => (
            <button
              key={it.tab}
              role="tab"
              type="button"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "px-5 md:px-7 py-3 rounded-full text-sm md:text-base font-semibold transition-colors cursor-pointer",
                active === i ? "bg-accent-gold text-bg" : "text-text-secondary hover:text-text"
              )}
            >
              {it.tab}
            </button>
          ))}
        </div>
      </div>

      <div
        key={active}
        role="tabpanel"
        className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] overflow-hidden rounded-3xl border border-white/[0.08] bg-bg-surface animate-[fadeUp_.35s_ease] motion-reduce:animate-none"
      >
        <Gallery
          photos={[m.photo]}
          itemClassName="h-64 md:h-80 lg:h-full lg:min-h-[460px] rounded-none border-0"
          sizes="(min-width: 1024px) 55vw, 100vw"
        />
        <div className="flex flex-col justify-center p-7 md:p-11">
          <span className="self-start mb-4 px-3.5 py-1 rounded-full border border-accent-gold/40 text-accent-gold text-xs font-bold uppercase tracking-wider">
            {m.badge}
          </span>
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">{m.title}</h3>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">{m.text}</p>
          {m.verbs && (
            <div className="flex flex-wrap gap-2 mt-7">
              {m.verbs.map((v) => (
                <span key={v} className="font-heading italic text-lg md:text-xl px-4 py-1.5 rounded-full border border-accent-gold/25 text-text">
                  {v}
                </span>
              ))}
            </div>
          )}
          {m.benefits && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-7">
              {m.benefits.map((b) => (
                <div key={b.title} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <b className="block font-heading text-lg text-accent-gold">{b.title}</b>
                  <span className="text-sm text-text-secondary">{b.sub}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
