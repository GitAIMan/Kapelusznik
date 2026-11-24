import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import YouTubeLite from "@/components/ui/YouTubeLite";
import Gallery, { type Photo } from "@/components/ui/Gallery";
import { Castle, Drama, Tent, Speaker } from "lucide-react";

const REALIZATIONS: { title: string; place?: string; youtubeId?: string }[] = [
  {
    title: "Bielska Scena Ognia",
    place: "Realizacja wydarzenia",
    youtubeId: "-xRMzKOXYgo",
  },
  {
    title: "Przegląd Artystów Ulicznych „BBusking”",
    place: "Bielsko-Biała",
    youtubeId: "d1b-5nlGC3g",
  },
  {
    title: "Cyrkowy Dzień Dziecka",
    place: "Ośrodek Promocji Gminy Jaworze",
    youtubeId: "oZ9G8nreJ78",
  },
  {
    title: "Dzień Harry’ego Pottera",
    place: "Biblioteka Gminna w Pleszewie",
    // TODO: youtubeId — klient doda film (coming soon)
  },
];

const IMG = "/images/home";

const ABOUT_MAIN: Photo[] = [
  { src: `${IMG}/onas-korowod.webp`, alt: "Artyści Kapelusznika w kostiumach na ulicy miasta" },
];

const ABOUT_STRIP: Photo[] = [
  { src: `${IMG}/onas-ogien.webp`, alt: "Pokaz ognia z iskrami nocą" },
  { src: `${IMG}/onas-motyl.webp`, alt: "Artystka w kostiumie motyla na ulicy", position: "center 30%" },
  { src: `${IMG}/onas-lalkarze.webp`, alt: "Lalkarze z marionetką", position: "center 35%" },
];

const WORKSHOP_PHOTOS: Photo[] = [
  { src: `${IMG}/warsztaty-1.webp`, alt: "Dzieci z podniesionymi rękami na warsztatach" },
  { src: `${IMG}/warsztaty-2.webp`, alt: "Dzieci uczą się żonglerki, siedząc na podłodze" },
  { src: `${IMG}/warsztaty-3.webp`, alt: "Dzieci przy grach zręcznościowych w sali" },
  { src: `${IMG}/warsztaty-5.webp`, alt: "Ćwiczenia z kołem hula-hoop na warsztatach", position: "center 35%" },
];

const OWN_EVENTS: { name: string; photos: Photo[] }[] = [
  {
    name: "Bielska Scena Ognia",
    photos: [{ src: `${IMG}/imprezy-2.webp`, alt: "Pokaz ognia z fajerwerkami nad wodą" }],
  },
  {
    name: "Przegląd Artystów Ulicznych „BBusking”",
    photos: [
      { src: `${IMG}/bbusking-1.webp`, alt: "Taniec z ogniem na BBuskingu" },
      { src: `${IMG}/bbusking-2.webp`, alt: "Artystka ze świecącymi skrzydłami na BBuskingu" },
    ],
  },
];

const EVENT_GALLERY: Photo[] = [
  { src: `${IMG}/imprezy-1.webp`, alt: "Szczudlarz na imprezie przy Książnicy Beskidzkiej" },
  { src: `${IMG}/imprezy-3.webp`, alt: "Artyści z ramą i kostiumem motyla w galerii handlowej" },
  { src: `${IMG}/imprezy-4.webp`, alt: "Wielkie bańki mydlane nad publicznością" },
  { src: `${IMG}/imprezy-5.webp`, alt: "Akrobatka na kole przed kamienicą" },
];

const SERVICES = [
  { icon: Castle, label: "Dmuchańce" },
  { icon: Drama, label: "Występy artystyczne" },
  { icon: Tent, label: "Atrakcje plenerowe" },
  { icon: Speaker, label: "Nagłośnienie i oświetlenie" },
];

const FACTS = [
  { year: "2019", text: "Teatr Ognia Tesserakt" },
  { year: "2023", text: "Kolektyw Artystyczny Kapelusznik" },
];

export default function AboutContent() {
  return (
    <>
      {/* O nas — tekst po lewej, zdjęcie po prawej */}
      <section className="relative px-6 md:px-12 py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[70px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left — text */}
            <div className="lg:col-span-6">
              <SectionLabel>O nas</SectionLabel>
              <SectionHeading className="mt-4">
                Kolektyw Artystyczny Kapelusznik
              </SectionHeading>
              <p className="text-text-secondary text-base leading-relaxed mt-6 max-w-xl">
                Działamy od 2023 roku, zrzeszając artystów cyrkowych, ulicznych
                i&nbsp;wszystkich tych, którzy zajmują się sztuką niezależną.
                Kapelusznik powstał po rozwinięciu działalności Teatru Ognia
                Tesserakt, który funkcjonuje na rynku od 2019 roku.
              </p>
              <p className="text-text-secondary text-base leading-relaxed mt-4 max-w-xl">
                Założycielem Kolektywu jest Miłosz Goślicki — kuglarz, tancerz
                ognia, warsztatowiec i&nbsp;pedagog cyrkowy.
              </p>
              <p className="text-text-muted text-base leading-relaxed mt-4 max-w-xl">
                Naszą misją jest szerzenie ruchu Nowego Cyrku i&nbsp;krzewienie
                idei cyrku bez zwierząt. W&nbsp;naszej pracy opieramy się
                o&nbsp;metodykę pedagogiki cyrku i&nbsp;pedagogiki zabawy.
              </p>
            </div>

            {/* Right — zdjęcie + daty */}
            <div className="lg:col-span-6 relative">
              <Gallery
                photos={ABOUT_MAIN}
                className="-rotate-1"
                itemClassName="h-72 md:h-96 rounded-2xl"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />

              <div className="relative -mt-14 ml-6 mr-2 md:ml-12 grid grid-cols-2 gap-px rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.06] z-10">
                {FACTS.map((f) => (
                  <div key={f.year} className="bg-bg/95 p-5">
                    <div className="font-heading text-2xl md:text-3xl font-bold text-accent-gold">
                      od {f.year}
                    </div>
                    <div className="mt-1 text-text-secondary text-sm leading-snug">
                      {f.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pasek 3 zdjęć — Zamieniamy ulice w sceny */}
      <section className="relative px-6 md:px-12 py-4">
        <Gallery
          photos={ABOUT_STRIP}
          className="section-reveal mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
          itemClassName="h-64 md:h-80"
          sizes="(min-width: 640px) 33vw, 100vw"
        />
      </section>

      {/* Warsztaty — wyróżnienie */}
      <section className="relative px-6 md:px-12 py-20">
        <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

        <div className="section-reveal mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <SectionLabel>Warsztaty cyrkowe</SectionLabel>
            <SectionHeading className="mt-4">
              Jedyne takie warsztaty na&nbsp;południu Polski
            </SectionHeading>
            <p className="text-text-secondary text-base leading-relaxed mt-6 max-w-2xl">
              Prowadzimy kompleksowe warsztaty cyrkowe dla dzieci. Rozwijamy
              motorykę małą i&nbsp;dużą, uczymy równowagi, pracujemy nad
              błędnikiem i&nbsp;koordynacją półkul mózgowych. Jedyne takie
              warsztaty w&nbsp;naszym regionie, które są inkluzywne
              i&nbsp;dostępne dla każdego!
            </p>

            <div className="mt-8 max-w-2xl rounded-xl border border-accent-gold/25 bg-accent-gold/[0.05] p-6">
              <p className="font-heading text-lg font-semibold text-accent-gold">
                Żonglerka funkcjonalna
              </p>
              <p className="mt-2 text-text-secondary text-sm leading-relaxed">
                Specjalizujemy się w&nbsp;zajęciach wspomagających terapię dzieci
                w&nbsp;spektrum autyzmu i&nbsp;ADHD.
              </p>
            </div>

            <div className="mt-8">
              <Button variant="ghost" href="/dyscypliny">
                Zobacz warsztaty
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Gallery
              photos={WORKSHOP_PHOTOS}
              className="grid grid-cols-2 grid-rows-2 gap-3 h-[26rem] md:h-[30rem]"
              itemClassName="h-full"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Kompleksowa realizacja imprez */}
      <section className="relative px-6 md:px-12 py-20">
        <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

        <div className="section-reveal mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <SectionLabel>Organizacja wydarzeń</SectionLabel>
            <SectionHeading className="mt-4">
              Kompleksowa realizacja imprez
            </SectionHeading>
            <p className="text-text-secondary text-base leading-relaxed mt-6">
              Kapelusznik jest twórcą i&nbsp;organizatorem dwóch własnych imprez
              w&nbsp;Bielsku-Białej. Oprócz tego możemy podjąć się kompleksowej
              realizacji wydarzenia pod kątem animacyjnym — nie tylko
              w&nbsp;klimacie cyrkowym.
            </p>
          </div>

          {/* Co zapewniamy */}
          <p className="mt-10 font-heading text-lg font-semibold text-text">
            Wszystko w&nbsp;jednym miejscu:
          </p>
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-3 rounded-xl border border-white/[0.06] bg-bg-surface/40 p-6"
              >
                <Icon className="h-7 w-7 text-accent-gold" />
                <span className="text-text-secondary text-sm leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Własne imprezy */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {OWN_EVENTS.map((e) => (
              <div
                key={e.name}
                className="card-hover rounded-2xl overflow-hidden border border-white/[0.06] bg-bg-surface/60"
              >
                <Gallery
                  photos={e.photos}
                  className={e.photos.length > 1 ? "grid grid-cols-[3fr_2fr] gap-1" : ""}
                  itemClassName="h-56 md:h-72 rounded-none border-0"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-gold/80 font-medium">
                    Nasza impreza
                  </p>
                  <h3 className="mt-2 font-heading text-xl md:text-2xl font-semibold text-text">
                    {e.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Galeria z imprez */}
          <Gallery
            photos={EVENT_GALLERY}
            className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
            itemClassName="aspect-[4/3]"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />

          <div className="mt-10">
            <Button variant="ghost" href="/dla-organizatorow">
              Zorganizujmy Twoje wydarzenie
            </Button>
          </div>
        </div>
      </section>

      {/* Nasze realizacje — filmy YouTube (lekkie: miniatura → odtwarzacz po kliknięciu) */}
      <section className="relative px-6 md:px-12 py-20">
        <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

        <div className="section-reveal mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <SectionLabel>Zobacz nas w akcji</SectionLabel>
            <SectionHeading className="mt-4 flex flex-col items-center">
              Nasze realizacje
            </SectionHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {REALIZATIONS.map((r) => (
              <div key={r.title} className="group/card">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.06] bg-bg-surface">
                  {r.youtubeId ? (
                    <YouTubeLite id={r.youtubeId} title={r.title} />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-bg-surface-hover via-accent-violet/20 to-bg-surface">
                      <span className="rounded-full border border-accent-gold/30 bg-accent-gold/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-accent-gold font-medium">
                        Wkrótce
                      </span>
                      <span className="text-text-muted/50 text-xs uppercase tracking-[0.2em]">
                        Film w przygotowaniu
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="mt-4 font-heading text-lg md:text-xl font-semibold text-text leading-snug">
                  {r.title}
                </h3>
                {r.place && (
                  <p className="mt-1 text-text-muted text-sm">{r.place}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 md:px-12 py-16">
        <div className="section-reveal mx-auto max-w-2xl text-center">
          <p className="text-text-secondary text-base mb-6">
            Chcesz nas zobaczyć na żywo?
          </p>
          <Button variant="gold" href="/kontakt">
            Zamów występ
          </Button>
        </div>
      </section>
    </>
  );
}
