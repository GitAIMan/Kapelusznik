import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { DISCIPLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dyscypliny — Kapelusznik | Kolektyw Artystyczny",
  description:
    "Sześć dziedzin sztuki ulicznej: żonglerka, akrobatyka powietrzna, żywe rzeźby, highline, lalkarstwo i scena sztukmistrzów.",
};

// Unique gradient per discipline for visual variety
const CARD_GRADIENTS = [
  "from-accent-orange/20 via-accent-violet/15 to-bg-surface",
  "from-primary/15 via-bg-surface to-accent-violet/20",
  "from-accent-violet/25 via-bg-surface-hover to-primary/10",
  "from-bg-surface via-accent-gold/8 to-accent-violet/15",
  "from-primary/10 via-accent-violet/20 to-bg-surface",
  "from-accent-gold/12 via-bg-surface to-accent-orange/15",
];

export default function DisciplinesPage() {
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent-violet/6 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <SectionLabel>Dyscypliny</SectionLabel>
          <SectionHeading className="mt-4 flex flex-col items-center">
            Co robimy
          </SectionHeading>
          <p className="text-text-secondary text-base mt-4 max-w-lg mx-auto">
            Sześć dziedzin, jeden kolektyw. Każda dyscyplina ma własną historię,
            artystów i styl — kliknij, żeby poznać szczegóły.
          </p>
        </div>
      </section>

      {/* Discipline grid — cards with image banners */}
      <section className="relative px-6 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DISCIPLINES.map((disc, i) => {
              const Icon = disc.icon;
              const isLarge = i < 2;

              return (
                <Link
                  key={disc.id}
                  href={`/dyscypliny/${disc.id}`}
                  className={cn(
                    "group relative block rounded-xl overflow-hidden",
                    "bg-bg-surface border border-white/[0.06]",
                    "hover:border-accent-gold/30 transition-all duration-200",
                    "card-hover"
                  )}
                >
                  {/* IMAGE PLACEHOLDER: Discipline action shot — replace with <Image> */}
                  <div className={cn(
                    "relative w-full bg-gradient-to-br",
                    CARD_GRADIENTS[i],
                    isLarge ? "h-48 md:h-56" : "h-32 md:h-40"
                  )}>
                    {/* Overlay pattern */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #caa775 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className={cn("text-text-muted/20", isLarge ? "h-12 w-12" : "h-8 w-8")} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={cn("relative", isLarge ? "p-8 md:p-10" : "p-6 md:p-7")}>
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-accent-gold/0 group-hover:bg-accent-gold/5 blur-[80px] transition-all duration-500" />

                    <h3 className={cn(
                      "font-heading font-bold text-text mb-2",
                      isLarge ? "text-2xl" : "text-lg"
                    )}>
                      {disc.name}
                    </h3>

                    <p className={cn(
                      "text-text-muted leading-relaxed mb-4",
                      isLarge ? "text-sm max-w-md" : "text-xs line-clamp-2"
                    )}>
                      {disc.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm text-accent-gold font-medium group-hover:gap-3 transition-all">
                      Poznaj szczegóły
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
