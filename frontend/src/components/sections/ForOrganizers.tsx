import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { TIMELINE_STEPS } from "@/lib/constants";

export default function ForOrganizers() {
  return (
    <section id="dla-organizatorow" className="relative py-32 px-6 md:px-12">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

      {/* Decorative bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[150px]" />
      </div>

      <div className="section-reveal relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14">
          <SectionLabel>Współpraca</SectionLabel>
          <SectionHeading className="mt-4 flex flex-col items-center">
            Jak to działa
          </SectionHeading>
          <p className="text-text-secondary text-sm mt-3 max-w-md mx-auto">
            Od kontaktu do owacji — cztery kroki.
          </p>
        </div>

        {/* Process grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.04]">
          {TIMELINE_STEPS.map((step, i) => (
            <div
              key={step.number}
              className="bg-bg p-7 md:p-8"
            >
              <span className="text-xs font-medium text-accent-gold/60 tracking-[0.1em] uppercase">
                {step.number}
              </span>
              <h3 className="font-heading text-base font-semibold text-text mt-3 mb-2">
                {step.title}
              </h3>
              <p className="text-text-muted text-xs leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Button variant="gold" href="/kontakt">
            Zamów występ
          </Button>
        </div>
      </div>
    </section>
  );
}
