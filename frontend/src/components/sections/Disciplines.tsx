import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { DISCIPLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Disciplines() {
  return (
    <section id="nasze-sztuki" className="relative py-32 px-6 md:px-12 overflow-hidden">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

      {/* Decorative bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent-violet/6 blur-[150px]" />
      </div>

      <div className="section-reveal relative mx-auto max-w-7xl">
        {/* Layout: description left + grid right */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
          {/* Left — description */}
          <div className="lg:w-[280px] lg:shrink-0 lg:sticky lg:top-32">
            <SectionLabel>Dyscypliny</SectionLabel>
            <SectionHeading className="mt-4">Co robimy</SectionHeading>
            <p className="text-text-secondary text-sm leading-relaxed mt-4">
              Sześć dziedzin, jeden kolektyw. Każda dyscyplina ma własną historię,
              artystów i styl — kliknij, żeby poznać szczegóły.
            </p>
          </div>

          {/* Right — card grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {DISCIPLINES.map((disc) => {
              const Icon = disc.icon;

              return (
                <Link
                  key={disc.id}
                  href={`/dyscypliny/${disc.id}`}
                  className={cn(
                    "group block rounded-xl p-6",
                    "bg-bg-surface border border-white/[0.07]",
                    "hover:border-accent-gold/30 transition-all duration-200",
                    "card-hover"
                  )}
                >
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-lg bg-accent-violet/40 flex items-center justify-center mb-4">
                    <Icon className="h-4 w-4 text-accent-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-[15px] font-semibold text-text mb-2">
                    {disc.name}
                  </h3>

                  {/* Description — 2 lines */}
                  <p className="text-text-muted text-xs leading-relaxed line-clamp-2 mb-4">
                    {disc.description}
                  </p>

                  {/* Link */}
                  <span className="inline-flex items-center gap-1.5 text-xs text-accent-gold font-medium group-hover:gap-2.5 transition-all">
                    Zobacz więcej
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
