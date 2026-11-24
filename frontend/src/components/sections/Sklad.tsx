"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * „Złóż swój skład”: odwiedzający zaznacza artystów (RosterPicker),
 * a przycisk pod kafelkami (po zaznaczeniu min. 1) prowadzi do /kontakt?sklad=… z gotową wiadomością.
 */

type Ctx = { selected: string[]; toggle: (n: string) => void; setAll: (names: string[]) => void };
const SkladContext = createContext<Ctx | null>(null);

export function SkladProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (n: string) =>
    setSelected((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));
  return (
    <SkladContext.Provider value={{ selected, toggle, setAll: setSelected }}>{children}</SkladContext.Provider>
  );
}

const useSklad = () => {
  const ctx = useContext(SkladContext);
  if (!ctx) throw new Error("useSklad poza SkladProvider");
  return ctx;
};

export function RosterPicker({ items }: { items: { name: string; desc: string }[] }) {
  const { selected, toggle, setAll } = useSklad();
  const allOn = selected.length === items.length;

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
        {items.map((item, i) => {
          const on = selected.includes(item.name);
          return (
            <button
              key={item.name}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(item.name)}
              className={cn(
                "relative text-left p-5 md:p-7 transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-gold/60",
                on ? "bg-gradient-to-br from-accent-violet/70 to-bg-surface" : "bg-bg hover:bg-bg-surface"
              )}
            >
              <span className="text-xs font-semibold tracking-widest text-accent-gold/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "block font-heading text-xl md:text-2xl font-semibold mt-1 mb-1 pr-8 transition-colors",
                  on ? "text-accent-gold" : "text-text"
                )}
              >
                {item.name}
              </span>
              <span className="hidden md:block text-sm text-text-secondary">{item.desc}</span>
              <span
                className={cn(
                  "absolute top-5 right-5 md:top-6 md:right-6 flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] transition-colors",
                  on ? "bg-accent-gold border-accent-gold text-bg" : "border-accent-gold/40 text-transparent"
                )}
                aria-hidden
              >
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-accent-gold/25 bg-accent-gold/[0.05] px-5 py-4">
        <p className="text-text" aria-live="polite">
          Wybrano: <b className="text-accent-gold">{selected.length}</b> z {items.length}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setAll(allOn ? [] : items.map((i) => i.name))}
            className="px-5 py-2.5 rounded-lg border border-accent-gold/40 text-accent-gold font-semibold text-sm hover:bg-accent-gold/10 transition-colors cursor-pointer"
          >
            {allOn ? "Wyczyść wybór" : "Wszyscy naraz!"}
          </button>
          {/* Pojawia się dopiero po zaznaczeniu min. 1 artysty */}
          {selected.length > 0 && (
            <Link
              href={`/kontakt?sklad=${encodeURIComponent(selected.join(","))}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm bg-gradient-to-br from-accent-gold to-accent-orange text-bg shadow-lg shadow-accent-gold/20 hover:shadow-xl hover:shadow-accent-gold/30 transition-shadow animate-[fadeUp_.3s_ease] motion-reduce:animate-none"
            >
              Zapytaj o ten skład
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
