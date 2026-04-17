"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { DISCIPLINE_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { DisciplineItem } from "@/types";

function getGridClass(count: number): string {
  if (count === 1) return "grid-cols-1";
  if (count === 3) return "grid-cols-1 md:grid-cols-3";
  return "grid-cols-1 md:grid-cols-2";
}

export default function DisciplinesPage() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="pt-28 pb-20">
      <div className="px-6 md:px-12 mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" />
          Strona główna
        </Link>
      </div>

      {/* Header */}
      <section className="relative px-6 md:px-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent-violet/6 blur-[70px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <SectionLabel>Dyscypliny</SectionLabel>
          <SectionHeading className="mt-4 flex flex-col items-center">
            Co dla Ciebie robimy
          </SectionHeading>
          <p className="text-text-secondary text-base mt-4 max-w-lg mx-auto">
            Trzy filary naszej oferty — kliknij kategorię, by rozwinąć.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="relative px-6 md:px-12">
        <div className="mx-auto max-w-5xl space-y-4">
          {DISCIPLINE_CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            const isOpen = open.has(cat.id);
            return (
              <div
                key={cat.id}
                className={cn(
                  "rounded-2xl border overflow-hidden transition-colors",
                  isOpen
                    ? "bg-bg-surface border-accent-gold/25"
                    : "bg-bg-surface/60 border-white/[0.06] hover:border-white/[0.12]"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(cat.id)}
                  className="w-full flex items-center gap-5 p-5 md:p-7 text-left"
                >
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                    <CatIcon className="h-7 w-7 text-accent-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-text">
                      {cat.name}
                    </h2>
                    <p className="text-text-muted text-sm mt-1">
                      {cat.subtitle}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "shrink-0 h-5 w-5 text-text-muted transition-transform duration-300",
                      isOpen && "rotate-180 text-accent-gold"
                    )}
                  />
                </button>

                {/* Content — animowane grid-template-rows */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-7 pb-6 md:pb-8 pt-2">
                      <div className={cn("grid gap-4", getGridClass(cat.items.length))}>
                        {cat.items.map((item) => (
                          <DisciplineCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function DisciplineCard({ item }: { item: DisciplineItem }) {
  const Icon = item.icon;
  const href = item.href ?? `/dyscypliny/${item.id}`;

  return (
    <Link
      href={href}
      className={cn(
        "group relative block rounded-xl overflow-hidden p-6 md:p-7 card-hover transition-colors",
        item.highlight
          ? "bg-gradient-to-br from-accent-gold/[0.12] via-accent-gold/[0.06] to-bg-surface border border-accent-gold/40 hover:border-accent-gold/60"
          : "bg-bg-surface border border-white/[0.06] hover:border-accent-gold/25"
      )}
    >
      <div className="flex items-start gap-4 mb-3">
        <div
          className={cn(
            "shrink-0 w-11 h-11 rounded-lg flex items-center justify-center",
            item.highlight
              ? "bg-accent-gold/20 border border-accent-gold/40"
              : "bg-accent-gold/10"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5 text-accent-gold",
              item.highlight && "animate-icon-pulse"
            )}
          />
        </div>
        <h3
          className={cn(
            "font-heading font-bold text-text text-lg md:text-xl leading-tight pt-1",
            item.highlight && "text-accent-gold"
          )}
        >
          {item.name}
        </h3>
      </div>

      <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
        {item.description}
      </p>

      <span className="inline-flex items-center gap-2 text-sm text-accent-gold font-medium group-hover:gap-3 transition-all">
        Poznaj szczegóły
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
