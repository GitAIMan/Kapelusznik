import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Gallery from "@/components/ui/Gallery";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import RealizacjePanels from "@/components/sections/RealizacjePanels";
import { NAV_LINKS } from "@/lib/constants";
import { ANIMACJE_PAGES, type AnimacjaPage } from "@/lib/animacje";
import YouTubeLite from "@/components/ui/YouTubeLite";
import { cn } from "@/lib/utils";

/** Strona startowa działu (tu prowadzi klik „Animacje” w menu) */
const HUB = "/animacje/o-nowym-cyrku";

/** Wspólny układ podstron „Animacje dla dzieci”. Sekcje bez danych się nie renderują. */
export default function AnimacjaTemplate({ page }: { page: AnimacjaPage }) {
  const all = NAV_LINKS.find((l) => l.children && l.href.startsWith("/animacje"))?.children ?? [];
  const others = all.filter((l) => l.href !== `/animacje/${page.slug}`);
  const isHub = `/animacje/${page.slug}` === HUB;

  return (
    <div className="pt-28">
      {/* 1. Nagłówek + lead + zdjęcie główne */}
      <section className="relative px-6 md:px-12 pb-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href={isHub ? "/" : HUB}
            className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {isHub ? "Strona główna" : "Wszystkie animacje"}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <SectionLabel>{page.name}</SectionLabel>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-text leading-[1.05] tracking-tight mt-4 mb-6">
                {page.heading}
              </h1>
              {page.lead && (
                <p className="text-text-secondary text-base md:text-lg leading-relaxed">{page.lead}</p>
              )}
              {!page.lead && page.quote && (
                <figure className="border-l-2 border-accent-gold/60 pl-6">
                  <blockquote className="text-text text-base md:text-lg leading-relaxed italic">
                    „{page.quote.text}”
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-text-muted">— {page.quote.source}</figcaption>
                </figure>
              )}
            </div>
            {page.videoId ? (
              <div className="lg:col-span-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.08] bg-bg-surface">
                  <YouTubeLite id={page.videoId} title={page.heading} />
                </div>
              </div>
            ) : page.cover && (
              <div className="lg:col-span-6">
                <Gallery
                  photos={[page.cover]}
                  itemClassName="aspect-[4/3] rounded-2xl"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            )}
          </div>

          {page.strip && page.strip.length > 0 && (
            <Gallery
              photos={page.strip}
              className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
              itemClassName="h-64 md:h-72"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
          )}
        </div>
      </section>

      {/* 2. Opis */}
      {page.body && page.body.length > 0 && (
        <section className="relative px-6 md:px-12 py-20">
          <div className="section-divider absolute top-0 left-[10%] right-[10%]" />
          <div
            className={cn(
              "section-reveal mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center",
              page.bodyPhoto ? "max-w-7xl" : "max-w-4xl"
            )}
          >
            <div
              className={cn(
                "space-y-6 text-text-secondary text-base md:text-lg leading-[1.85]",
                page.bodyPhoto ? "lg:col-span-7" : "lg:col-span-12"
              )}
            >
              {page.body.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
              {page.features && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                  {page.features.map((f) => (
                    <li
                      key={f.title}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-base leading-relaxed"
                    >
                      <span className="block font-heading text-lg font-semibold text-accent-gold mb-1">{f.title}</span>
                      {f.text}
                    </li>
                  ))}
                </ul>
              )}
              {page.bodyAfter?.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
            {page.bodyPhoto && (
              <div className="lg:col-span-5">
                <Gallery
                  photos={[page.bodyPhoto]}
                  itemClassName="aspect-[3/4] rounded-2xl"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Galeria */}
      {page.gallery && page.gallery.length > 0 && (
        <section className="relative px-6 md:px-12 py-20">
          <div className="section-divider absolute top-0 left-[10%] right-[10%]" />
          <div className="section-reveal mx-auto max-w-7xl">
            <SectionHeading>Zdjęcia</SectionHeading>
            <Gallery
              photos={page.gallery}
              className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              itemClassName="aspect-[4/3]"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          </div>
        </section>
      )}

      {/* 3. Gotowe realizacje — panele */}
      {page.realizacje && page.realizacje.length > 0 && (
        <section className="relative px-6 md:px-12 py-20">
          <div className="section-divider absolute top-0 left-[10%] right-[10%]" />
          <div className="section-reveal mx-auto max-w-7xl">
            <SectionHeading>Gotowe realizacje</SectionHeading>
            <p className="text-text-secondary mt-3 mb-10">
              <span className="hidden lg:inline">Najedź na panel, żeby zobaczyć zdjęcia.</span>
              <span className="lg:hidden">Stuknij w panel, żeby zobaczyć zdjęcia.</span>
            </p>
            <RealizacjePanels items={page.realizacje} />
          </div>
        </section>
      )}

      {/* 4. Tym się chwalimy */}
      {page.chwalimy && page.chwalimy.length > 0 && (
        <section className="relative px-6 md:px-12 py-20">
          <div className="section-divider absolute top-0 left-[10%] right-[10%]" />
          <div className="section-reveal mx-auto max-w-5xl">
            <SectionHeading>Tym się chwalimy</SectionHeading>
            <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {page.chwalimy.map((item) => (
                <li
                  key={item.slice(0, 30)}
                  className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
                >
                  <Star className="h-5 w-5 shrink-0 mt-1 text-accent-gold" />
                  <p className="text-text-secondary text-base leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 5. Zobacz też */}
      {others.length > 0 && (
        <section className="relative px-6 md:px-12 py-20">
          <div className="section-divider absolute top-0 left-[10%] right-[10%]" />
          <div className="section-reveal mx-auto max-w-7xl">
            <SectionHeading className={cn(isHub && "text-center md:text-5xl")}>
              {page.tilesHeading ?? "Zobacz też"}
            </SectionHeading>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {others.map((o) => {
                const data = ANIMACJE_PAGES.find((p) => `/animacje/${p.slug}` === o.href);
                const img = data?.cover ?? data?.gallery?.[0];
                return (
                  <Link
                    key={o.href}
                    href={o.href}
                    className="card-hover group overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-surface"
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-accent-violet to-bg">
                      {img && (
                        <Image
                          src={img.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 20vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          style={{ objectPosition: img.position ?? "center" }}
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2 p-4">
                      <span className="font-semibold text-text text-sm md:text-base leading-snug">{o.label}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-accent-gold transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. Zamów — tylko na dole */}
      <section className="relative px-6 md:px-12 py-20">
        <div className="section-divider absolute top-0 left-[10%] right-[10%]" />
        <div className="section-reveal mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-8">{page.ctaTitle}</h2>
          <Button variant="gold" href="/kontakt">
            Zamów występ
          </Button>
        </div>
      </section>
    </div>
  );
}
