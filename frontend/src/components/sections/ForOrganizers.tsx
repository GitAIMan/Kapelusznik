import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { TIMELINE_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ForOrganizers() {
  return (
    <section id="dla-organizatorow" className="relative py-40 px-6 md:px-12">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

      {/* Decorative bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[150px]" />
      </div>

      <div className="section-reveal relative mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <SectionLabel>Współpraca</SectionLabel>
          <SectionHeading
            className="mt-4 flex flex-col items-center"
            subtitle="Twoje wydarzenie zasługuje na niezapomniane emocje"
          >
            Dla organizatorów
          </SectionHeading>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical gradient line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-gold via-primary to-accent-violet" />

          <div className="space-y-14">
            {TIMELINE_STEPS.map((step, i) => {
              const isLast = i === TIMELINE_STEPS.length - 1;

              return (
                <div key={step.number} className="relative flex gap-6">
                  {/* Number circle */}
                  <div
                    className={cn(
                      "relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-heading font-bold text-lg",
                      isLast
                        ? "bg-gradient-to-br from-accent-gold to-primary text-bg shadow-lg shadow-accent-gold/30"
                        : "bg-bg-surface border border-white/10 text-text-secondary"
                    )}
                  >
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="flex-1 card-hover rounded-xl bg-bg-surface/80 border border-white/[0.07] p-7 backdrop-blur-sm">
                    <h3 className="font-heading text-lg font-bold text-text mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button variant="gold" href="#kontakt">
            Zamów występ
          </Button>
        </div>
      </div>
    </section>
  );
}
