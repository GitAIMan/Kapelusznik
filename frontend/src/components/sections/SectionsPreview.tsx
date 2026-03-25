import Link from "next/link";
import { ArrowRight, Users, Flame, Handshake, Newspaper, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    title: "O nas",
    description: "Poznaj kolektyw artystów ulicznych z Bielska-Białej. Ponad dekada doświadczeń na scenach całej Polski.",
    href: "/o-nas",
    icon: Users,
    span: "md:col-span-2",
  },
  {
    title: "Dyscypliny",
    description: "Żonglerka, akrobatyka, highline, żywe rzeźby, lalkarstwo i scena sztukmistrzów.",
    href: "/dyscypliny",
    icon: Flame,
    span: "",
  },
  {
    title: "Dla organizatorów",
    description: "Cztery kroki do niezapomnianego wydarzenia. Zamów występ.",
    href: "/dla-organizatorow",
    icon: Handshake,
    span: "",
  },
  {
    title: "Blog",
    description: "Relacje z wydarzeń, kulisy przygotowań i nowości z kolektywu.",
    href: "/blog",
    icon: Newspaper,
    span: "",
  },
  {
    title: "Kontakt",
    description: "Napisz do nas — opowiedz o swoim wydarzeniu, a my zaproponujemy program.",
    href: "/kontakt",
    icon: Mail,
    span: "",
  },
];

export default function SectionsPreview() {
  return (
    <section className="relative py-24 px-6 md:px-12">
      <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

      <div className="section-reveal mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className={cn(
                  "group relative block rounded-xl p-7 md:p-8",
                  "bg-bg-surface/60 border border-white/[0.06]",
                  "hover:border-accent-gold/25 hover:bg-bg-surface transition-all duration-200",
                  "card-hover",
                  section.span
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-gold/8 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent-gold/70" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-accent-gold group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="font-heading text-lg font-semibold text-text mb-2">
                  {section.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {section.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
