import type { Photo } from "@/components/ui/Gallery";

/**
 * Podstrony działu „Animacje dla dzieci” — wspólny szablon (AnimacjaTemplate),
 * każda podstrona = jeden wpis tutaj. Brak pola → sekcja się nie pokazuje.
 */

export type Realizacja = {
  title: string;
  /** Rodzaj występu, np. „Interakcja”, „Pantomima” */
  tag?: string;
  photos: Photo[];
};

export type AnimacjaPage = {
  slug: string;
  /** Nazwa w menu / kafelkach */
  name: string;
  /** Duży nagłówek na górze */
  heading: string;
  /** Tekst pod nagłówkiem. Brak → w tym miejscu pokazuje się `quote` */
  lead?: string;
  cover?: Photo;
  /** Film YT zamiast zdjęcia głównego (id z linku) */
  videoId?: string;
  /** Zdjęcia pod nagłówkiem (pasek) */
  strip?: Photo[];
  /** Cytat (z podpisem) — pokazywany pod nagłówkiem */
  quote?: { text: string; source: string };
  /** Akapity opisu + zdjęcie obok */
  body?: string[];
  /** Lista cech (pogrubiony tytuł + tekst) pod akapitami */
  features?: { title: string; text: string }[];
  /** Akapity po liście cech */
  bodyAfter?: string[];
  bodyPhoto?: Photo;
  /** Galeria zdjęć (siatka + powiększanie) */
  gallery?: Photo[];
  realizacje?: Realizacja[];
  chwalimy?: string[];
  /** Nagłówek nad kafelkami innych podstron (domyślnie „Zobacz też”) */
  tilesHeading?: string;
  /** Tekst nad przyciskiem na dole */
  ctaTitle: string;
};

/** Zdjęcia z R2 (produkcja). Lokalnie NEXT_PUBLIC_CDN_URL puste → pliki z public/ (ignorowane przez git). */
const CDN = process.env.NEXT_PUBLIC_CDN_URL ?? "";
const A = `${CDN}/images/animacje/aktorskie`;
const ph = (file: string, alt: string, position?: string): Photo => ({ src: `${A}/${file}.webp`, alt, position });

/** nowy-cyrk-01 … 18 (01, 08, 10 = pionowe) */
const NC_PORTRAIT = [1, 8, 10];
const nowyCyrkGallery: Photo[] = Array.from({ length: 18 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `${CDN}/images/animacje/nowy-cyrk/nowy-cyrk-${n}.webp`,
    alt: `Nowy cyrk — Kolektyw Kapelusznik, zdjęcie ${i + 1}`,
    position: NC_PORTRAIT.includes(i + 1) ? "center 30%" : undefined,
  };
});

export const ANIMACJE_PAGES: AnimacjaPage[] = [
  {
    slug: "o-nowym-cyrku",
    name: "O nowym cyrku",
    heading: "Nowy Cyrk",
    videoId: "oZ9G8nreJ78",
    quote: {
      text: "To nowoczesna forma sztuki performatywnej, łącząca techniki cyrkowe z teatrem, tańcem i muzyką. Charakteryzuje się brakiem tresury zwierząt, fabułą, spójną narracją oraz występami w teatrach lub przestrzeni miejskiej. Skupia się na emocjach, metaforze i artystycznym wyrazie, odchodząc od popisów siły na rzecz opowiadania historii.",
      source: "Próba definicji nowego cyrku według AI",
    },
    body: [
      "Tak wygląda próba zdefiniowania nowego cyrku przez AI. Choć tak naprawdę nie ma jednej definicji, odpowiedzi na to, czym on jest — na pewno możemy wskazać cechy wspólne spektakli.",
    ],
    features: [
      { title: "Brak zwierząt", text: "Skupienie wyłącznie na ludzkich umiejętnościach." },
      { title: "Narracja i teatr", text: "Spektakle mają motyw przewodni, tematykę społeczną lub osobistą, często rezygnując z tradycyjnego wodzireja." },
      { title: "Estetyka", text: "Wykorzystanie światła, muzyki i scenografii, podobnie jak w teatrze lub teatrze ulicznym." },
      { title: "Miejsce występów", text: "Teatry, sale widowiskowe, przestrzeń publiczna i ulice — zamiast tradycyjnego namiotu." },
      { title: "Interdyscyplinarność", text: "Połączenie z tańcem współczesnym, pantomimą, iluzją, nowymi mediami czy niszowymi dyscyplinami sportowymi." },
    ],
    bodyAfter: [
      "Pedagogika Cyrku to nowatorska metoda wielokierunkowej pracy i animacji dzieci, młodzieży, ale także dorosłych. W odróżnieniu od cyrku klasycznego artyści nie zamykają się w formie występu pod namiotem — lecz wychodzą z cyrkiem do ludzi! Z przyjemnością odwiedzamy imprezy plenerowe, letnie i zimowe warsztaty artystyczne czy imprezy gminne!",
    ],
    gallery: nowyCyrkGallery,
    tilesHeading: "Zaproś nowy cyrk na swoje wydarzenie!",
    ctaTitle: "Porozmawiajmy o Twoim wydarzeniu",
  },
  {
    slug: "animacje-aktorskie",
    name: "Animacje aktorskie",
    heading: "Brama do dowolnej krainy",
    lead:
      "Artyści kolektywu podejmują się również animacji aktorskiej — przenosząc uczestników wydarzenia do dowolnej, wybranej przez klienta krainy. Realizujemy wszystkie projekty indywidualne, ze szczególnym uwzględnieniem wymagań klienta. Pochylamy się nad potrzebami, problemami i wymaganiami każdej realizacji. Przebieramy się za postacie z bajek, malujemy się cali na złoto, doklejamy sobie rogi i tworzymy blizny — istnieje pełna dowolność zamówienia.",
    cover: ph("inne-1", "Animacja aktorska Kolektywu Kapelusznik"),
    strip: [
      ph("inne-2", "Aktor w kostiumie podczas animacji", "center 30%"),
      ph("inne-3", "Animacja aktorska na wydarzeniu"),
      ph("inne-4", "Postacie z bajek wśród publiczności"),
    ],
    body: [
      "Usługom tym mogą, lecz nie muszą towarzyszyć rekwizyty kuglarskie. Aktorzy rozchodzą się po wydarzeniu, by wchodzić w interakcję z uczestnikami: robić z nimi zdjęcia, wchodzić w improwizowane dialogi czy po prostu zaczepiać i bawić się, korzystając z atrakcji dostępnych na terenie eventu. Nie mamy zahamowań — „ofiarami” aktorów może być każdy: rodzic, dziecko, handlarz na wydarzeniu czy pracownicy ośrodka.",
      "Potrafimy bawić, edukować — a nawet straszyć, jeśli takie jest życzenie klienta. Naszym umiejętnościom zaufały największe trupy uliczne i teatry, m.in. Lufcik na korbkę, Teatr Zły, Teatr Lalek Banialuka czy Grupa Locomotora.",
    ],
    bodyPhoto: ph("inne-5", "Aktor Kolektywu Kapelusznik w charakteryzacji", "center 30%"),
    realizacje: [
      {
        title: "Alicja w krainie czarów",
        tag: "Interakcja",
        photos: [
          ph("alicja-1", "Alicja w krainie czarów — 1", "center 30%"),
          ph("alicja-2", "Alicja w krainie czarów — 2"),
          ph("alicja-3", "Alicja w krainie czarów — 3", "center 30%"),
          ph("alicja-4", "Alicja w krainie czarów — 4"),
        ],
      },
      {
        title: "Horror",
        tag: "Straszenie",
        photos: [
          ph("horror-1", "Horror — 1", "center 30%"),
          ph("horror-2", "Horror — 2"),
          ph("horror-3", "Horror — 3"),
          ph("horror-4", "Horror — 4", "center 30%"),
        ],
      },
      {
        title: "Maski weneckie i motyle",
        tag: "Pantomima",
        photos: [
          ph("wenecja-1", "Maski weneckie i motyle — 1"),
          ph("wenecja-2", "Maski weneckie i motyle — 2"),
          ph("wenecja-3", "Maski weneckie i motyle — 3"),
          ph("wenecja-4", "Maski weneckie i motyle — 4"),
        ],
      },
      {
        title: "Świąteczne Elfy",
        tag: "Interakcja",
        photos: [
          ph("swieta-1", "Świąteczne Elfy — 1", "center 30%"),
          ph("swieta-2", "Świąteczne Elfy — 2"),
          ph("swieta-3", "Świąteczne Elfy — 3", "center 30%"),
        ],
      },
      {
        title: "Szkoła Magii i Czarodziejstwa",
        photos: [
          ph("potter-1", "Szkoła Magii i Czarodziejstwa — 1"),
          ph("potter-2", "Szkoła Magii i Czarodziejstwa — 2"),
          ph("potter-3", "Szkoła Magii i Czarodziejstwa — 3"),
          ph("potter-4", "Szkoła Magii i Czarodziejstwa — 4"),
          ph("kleks-1", "Szkoła Magii i Czarodziejstwa — 5"),
          ph("kleks-2", "Szkoła Magii i Czarodziejstwa — 6"),
          ph("kleks-3", "Szkoła Magii i Czarodziejstwa — 7"),
        ],
      },
    ],
    chwalimy: [
      "Realizacja aktorska wraz z pokazem fireshow w ramach promocji jubileuszowego 30. Międzynarodowego Festiwalu Sztuki Lalkarskiej organizowanego przez Teatr Lalek Banialuka w 2024 r. i ponowienie współpracy przy 31. Festiwalu w roku 2026.",
      "Współpraca z teatrem Lufcik na korbkę oraz Teatrem Złym przy realizacji cyrkowego Horror Party w zabytkowej kopalni Guido oraz udział w Nocy Horrorów w Górnośląskim Parku Etnograficznym w Chorzowie.",
      "Trzykrotnie kompleksowa realizacja Dnia Harry’ego Pottera w Bibliotece Publicznej w Pleszewie, gdzie kolektyw przekształcał całą bibliotekę w szkołę magii i czarodziejstwa. Zorganizowanie zajęć takich jak zielarstwo, alchemia, obrona przed czarną magią — przeprowadzenie konkursów tematycznych, escape roomów i pokazów iluzji oraz fireshow.",
      "„A niech to piórko!” — udział w interaktywnym spektaklu dla dzieci w reż. Lufcika na korbkę, bazującym na powieści „Ptaki” Mirry Foss i inspirowanym twórczością polskich poetów, m.in. Juliana Tuwima. Sztuka wyczerpywała wszystkie walory artystyczne: muzykę mechaniczną, muzykę na żywo, teatr, taniec, film, akrobacje, kuglarstwo, kaskaderstwo i pełną interakcję z publicznością przed spektaklem, w jego trakcie i po. Na PreZero Arena Gliwice spektakl oglądało 1500 dzieci w wieku przedszkolnym.",
    ],
    ctaTitle: "Chcesz przenieść swoich gości do innej krainy?",
  },
];

export const getAnimacja = (slug: string) => ANIMACJE_PAGES.find((p) => p.slug === slug);
