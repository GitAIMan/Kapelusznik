import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { DISCIPLINES, DISCIPLINE_DETAILS } from "@/lib/constants";

export async function generateStaticParams() {
  return DISCIPLINES.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const discipline = DISCIPLINES.find((d) => d.id === id);
  if (!discipline) return {};
  return {
    title: `${discipline.name} — Kapelusznik`,
    description: discipline.description,
  };
}

export default async function DisciplinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const discipline = DISCIPLINES.find((d) => d.id === id);
  if (!discipline) notFound();

  const details = DISCIPLINE_DETAILS[id];
  const Icon = discipline.icon;

  const otherDisciplines = DISCIPLINES.filter((d) => d.id !== id).slice(0, 3);

  return (
    <>
        {/* HEADER */}
        <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
          {/* Decorative bg */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-violet/10 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-5xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-text-muted mb-12">
              <Link
                href="/"
                className="transition-colors hover:text-text"
              >
                Strona główna
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link
                href="/dyscypliny"
                className="transition-colors hover:text-text"
              >
                Dyscypliny
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-accent-gold">{discipline.name}</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent-violet/20 flex items-center justify-center ring-1 ring-white/10">
                <Icon className="h-8 w-8 text-accent-gold" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight">
                {discipline.name}
              </h1>
            </div>
            <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
              {discipline.description}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-0.5 w-12 bg-gradient-to-r from-accent-gold to-primary rounded-full" />
              <div className="h-0.5 w-3 bg-accent-gold/40 rounded-full" />
              <div className="h-0.5 w-1.5 bg-accent-gold/20 rounded-full" />
            </div>
          </div>
        </section>

        {/* CONTENT — asymetria 3:2 */}
        <section className="px-6 md:px-12 pb-24">
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Lewa — tekst (3/5) */}
            <div className="lg:col-span-3 space-y-12">
              <div>
                <h2 className="font-heading text-2xl font-bold text-text mb-6">
                  O dyscyplinie
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {details?.longDescription}
                </p>
              </div>

              {/* Blockquote */}
              {details?.quote && (
                <blockquote className="border-l-2 border-accent-gold pl-6 py-2">
                  <p className="text-text text-xl md:text-2xl font-light italic leading-relaxed">
                    &ldquo;{details.quote}&rdquo;
                  </p>
                  <cite className="block mt-4 text-text-muted text-sm not-italic">
                    — {details.quoteAuthor}
                  </cite>
                </blockquote>
              )}

              <div>
                <h2 className="font-heading text-2xl font-bold text-text mb-6">
                  Historia
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {details?.history}
                </p>
              </div>
            </div>

            {/* Prawa — galeria (2/5) */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-text mb-6">
                Galeria
              </h2>
              <div className="space-y-4">
                {(details?.galleryImages || []).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-xl bg-gradient-to-br from-bg-surface to-bg-surface-hover border border-white/5 flex items-center justify-center"
                  >
                    <span className="text-text-muted text-xs uppercase tracking-wider">
                      Zdjęcie {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ARTYŚCI */}
        <section className="px-6 md:px-12 pb-24">
          <div className="section-divider mx-auto max-w-5xl mb-16" />
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-2xl font-bold text-text mb-8">
              Nasi artyści
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {(details?.artists || []).map((artist, i) => (
                <div
                  key={i}
                  className="gradient-border rounded-xl bg-bg-surface/80 p-6 text-center"
                >
                  {/* Avatar placeholder */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bg-surface-hover to-bg-surface mx-auto mb-4 flex items-center justify-center border border-white/5">
                    <span className="text-text-muted text-xs">Foto</span>
                  </div>
                  <p className="font-heading font-bold text-text">
                    {artist.name}
                  </p>
                  <p className="text-text-muted text-sm mt-1">{artist.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INNE DYSCYPLINY */}
        <section className="px-6 md:px-12 pb-24">
          <div className="section-divider mx-auto max-w-5xl mb-16" />
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-2xl font-bold text-text mb-8">
              Inne dyscypliny
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherDisciplines.map((disc) => {
                const DiscIcon = disc.icon;
                return (
                  <Link
                    key={disc.id}
                    href={`/dyscypliny/${disc.id}`}
                    className="group card-hover rounded-xl bg-bg-surface border border-white/5 p-6 transition-all hover:border-white/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center mb-4">
                      <DiscIcon className="h-5 w-5 text-accent-gold" />
                    </div>
                    <h3 className="font-heading font-bold text-text mb-2">
                      {disc.name}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                      {disc.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-accent-gold text-sm font-semibold group-hover:text-primary-light transition-colors">
                      Zobacz
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* POWRÓT */}
        <section className="px-6 md:px-12 pb-24">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Wróć do strony głównej
            </Link>
          </div>
        </section>
    </>
  );
}
