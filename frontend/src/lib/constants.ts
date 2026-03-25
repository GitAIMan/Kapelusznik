import {
  Sparkles,
  Flame,
  Wind,
  MountainSnow,
  Drama,
  Mail,
  Phone,
  MapPin,
  Facebook,
} from "lucide-react";
import type { Discipline, TimelineStep, StatItem, ContactInfo, NavLink, BlogPost, DisciplineDetails } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "O nas", href: "/o-nas" },
  { label: "Dyscypliny", href: "/dyscypliny" },
  { label: "Dla organizatorów", href: "/dla-organizatorow" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];

export const DISCIPLINES: Discipline[] = [
  {
    id: "zywe-rzezby",
    name: "Żywe Rzeźby",
    icon: Sparkles,
    description:
      "Nieruchomi artyści, którzy ożywają w najmniej spodziewanym momencie. Mistrzowskie kostiumy i charakteryzacja przenoszą widzów w inny świat.",
    image: "/images/disciplines/zywe-rzezby.jpg",
  },
  {
    id: "zonglerka",
    name: "Żonglerka",
    icon: Flame,
    description:
      "Wirujące maczugi, płonące pochodnie i hipnotyzujące LED-y. Precyzja, rytm i widowiskowa energia, która elektryzuje tłumy.",
    image: "/images/disciplines/zonglerka.jpg",
  },
  {
    id: "akrobatyka",
    name: "Akrobatyka Powietrzna",
    icon: Wind,
    description:
      "Taniec w powietrzu na szarfach i trapezach. Gracja, siła i odwaga — spektakl, który zapiera dech w piersiach.",
    image: "/images/disciplines/akrobatyka.jpg",
  },
  {
    id: "highline",
    name: "Highline",
    icon: MountainSnow,
    description:
      "Spacer po taśmie rozpiętej nad ziemią. Balans na granicy możliwości — tam, gdzie niebo spotyka odwagę.",
    image: "/images/disciplines/highline.jpg",
  },
  {
    id: "lalkarstwo",
    name: "Lalkarstwo",
    icon: Drama,
    description:
      "Wielkoformatowe lalki i marionetki ożywające na ulicach. Teatr, który przemawia do wyobraźni dzieci i dorosłych.",
    image: "/images/disciplines/lalkarstwo.jpg",
  },
  {
    id: "scena",
    name: "Scena Sztukmistrzów",
    icon: Sparkles,
    description:
      "Magia, komedia i interakcja z publicznością. Sztukmistrze, którzy zamieniają ulicę w scenę pełną śmiechu i zachwytu.",
    image: "/images/disciplines/scena.jpg",
  },
];

export const STATS: StatItem[] = [
  { value: "10+", label: "Lat doświadczenia" },
  { value: "200+", label: "Wydarzeń" },
  { value: "6", label: "Dyscyplin" },
  { value: "50k+", label: "Widzów rocznie" },
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    number: "01",
    title: "Kontakt",
    description:
      "Napisz do nas — opowiedz o swoim wydarzeniu, a my zaproponujemy idealny program.",
  },
  {
    number: "02",
    title: "Planowanie",
    description:
      "Dobierzemy artystów i dyscypliny dopasowane do charakteru Twojego eventu.",
  },
  {
    number: "03",
    title: "Występ",
    description:
      "Przyjeżdżamy z pełnym zapleczem technicznym — Ty cieszysz się widowiskiem.",
  },
  {
    number: "04",
    title: "Magia!",
    description:
      "Twoi goście zapamiętają ten dzień na długo. Gwarantujemy niezapomniane emocje.",
  },
];

export const CONTACT_INFO: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "kontakt@kapelusznik.com.pl",
    href: "mailto:kontakt@kapelusznik.com.pl",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+48 123 456 789",
    href: "tel:+48123456789",
  },
  {
    icon: MapPin,
    label: "Lokalizacja",
    value: "Bielsko-Biała, Polska",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "kolektyw.kapelusznik",
    href: "https://www.facebook.com/kolektyw.kapelusznik",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Festiwal Ognia w Bielsku-Białej 2025",
    excerpt: "Relacja z naszego największego występu tego roku. Trzy dni pełne ognia, akrobatyki i niezapomnianych emocji.",
    date: "2025-09-15",
    image: "/images/blog/placeholder-1.jpg",
    slug: "festiwal-ognia-2025",
  },
  {
    id: "2",
    title: "Nowi artyści w kolektywie",
    excerpt: "Poznajcie nowych członków Kapelusznika — utalentowanych akrobatów i żonglerów, którzy dołączyli do naszej ekipy.",
    date: "2025-08-02",
    image: "/images/blog/placeholder-2.jpg",
    slug: "nowi-artysci",
  },
  {
    id: "3",
    title: "Za kulisami: jak przygotowujemy pokaz",
    excerpt: "Zaglądamy za kulisy naszych przygotowań. Od pierwszych prób po finałowy występ — jak wygląda nasza praca.",
    date: "2025-06-20",
    image: "/images/blog/placeholder-3.jpg",
    slug: "za-kulisami",
  },
];

export const DISCIPLINE_DETAILS: Record<string, DisciplineDetails> = {
  "zywe-rzezby": {
    longDescription: "Żywe rzeźby to jedna z najstarszych i najbardziej fascynujących form sztuki ulicznej. Nasi artyści potrafią stać nieruchomo godzinami, zaskakując przechodniów nagłym ożywaniem. Każdy kostium jest ręcznie tworzony, a charakteryzacja wymaga wielu godzin pracy. To sztuka cierpliwości, precyzji i niezwykłej samodyscypliny.",
    quote: "Najpiękniejszy moment to ten, gdy dziecko patrzy z niedowierzaniem — i nagle rzeźba mruga.",
    quoteAuthor: "Artysta Kapelusznika",
    history: "Tradycja żywych rzeźb sięga starożytnego Egiptu, gdzie kapłani odgrywali role posągów w świątyniach. Współcześnie żywe rzeźby stały się symbolem sztuki ulicznej w całej Europie. W Kapeluszniaku rozwijamy tę tradycję od samego początku naszej działalności.",
    galleryImages: ["/images/disciplines/zywe-rzezby.jpg", "/images/disciplines/zywe-rzezby.jpg", "/images/disciplines/zywe-rzezby.jpg"],
    artists: [
      { name: "Anna K.", role: "Główna artystka", image: "" },
      { name: "Tomek R.", role: "Charakteryzator", image: "" },
    ],
  },
  "zonglerka": {
    longDescription: "Żonglerka w Kapeluszniaku to nie tylko rzucanie piłeczkami — to spektakl ognia, światła i precyzji. Nasi żonglerzy pracują z płonącymi pochodniami, maczugami LED i klasycznymi rekwizytami. Każdy występ to połączenie techniki cyrkowej z choreografią i muzyką na żywo.",
    quote: "Ogień nie wybacza błędów. Dlatego każdy ruch musi być doskonały.",
    quoteAuthor: "Artysta Kapelusznika",
    history: "Żonglerka ma ponad 4000 lat historii — najstarsze wizerunki żonglerów pochodzą ze starożytnego Egiptu. W Kapeluszniaku łączymy klasyczne techniki z nowoczesnym fire show, tworząc widowiska, które zachwycają publiczność na festiwalach w całej Polsce.",
    galleryImages: ["/images/disciplines/zonglerka.jpg", "/images/disciplines/zonglerka.jpg", "/images/disciplines/zonglerka.jpg"],
    artists: [
      { name: "Marek W.", role: "Fire performer", image: "" },
      { name: "Kasia L.", role: "Żonglerka LED", image: "" },
    ],
  },
  "akrobatyka": {
    longDescription: "Akrobatyka powietrzna to taniec na wysokości — na szarfach, trapezach i linach. Nasze artystki łączą siłę gimnastyczki z gracją tancerki, tworząc spektakle, które zapierają dech w piersiach. Każdy występ to opowieść opowiedziana ciałem, zawieszona między niebem a ziemią.",
    quote: "W powietrzu nie ma miejsca na strach — jest tylko ruch i zaufanie.",
    quoteAuthor: "Artystka Kapelusznika",
    history: "Akrobatyka powietrzna wywodzi się z tradycji cyrkowej XIX wieku, ale współcześnie przekroczyła granice cyrku. Na ulicach miast staje się formą sztuki publicznej, dostępnej dla każdego. W Kapeluszniaku rozwijamy ten gatunek od ponad 8 lat.",
    galleryImages: ["/images/disciplines/akrobatyka.jpg", "/images/disciplines/akrobatyka.jpg", "/images/disciplines/akrobatyka.jpg"],
    artists: [
      { name: "Ola M.", role: "Szarfy powietrzne", image: "" },
      { name: "Natalia S.", role: "Trapez", image: "" },
    ],
  },
  "highline": {
    longDescription: "Highline to spacer po taśmie rozpiętej na wysokości — nad ulicami, między budynkami, nad rzekami. To dyscyplina wymagająca absolutnej koncentracji, równowagi i odwagi. Nasi highlinerzy regularnie trenują w górach, a na festiwalach prezentują pokazy, które trzymają widzów w napięciu od pierwszego do ostatniego kroku.",
    quote: "Na taśmie jesteś sam ze sobą. Nie ma gdzie uciec — musisz iść naprzód.",
    quoteAuthor: "Artysta Kapelusznika",
    history: "Highline narodził się w latach 80. w Yosemite Valley jako ekstremalna forma slackline. Od tamtej pory stał się globalną dyscypliną łączącą sport, sztukę i medytację. W Kapeluszniaku highline jest jednym z naszych najbardziej spektakularnych elementów pokazów.",
    galleryImages: ["/images/disciplines/highline.jpg", "/images/disciplines/highline.jpg", "/images/disciplines/highline.jpg"],
    artists: [
      { name: "Piotr B.", role: "Highliner", image: "" },
      { name: "Jakub T.", role: "Highliner", image: "" },
    ],
  },
  "lalkarstwo": {
    longDescription: "Lalkarstwo uliczne to teatr wielkiego formatu — nasze lalki mierzą nawet 3 metry wysokości i poruszają się po ulicach jak żywe stworzenia. Każda marionetka jest ręcznie budowana w naszym warsztacie. Spektakle lalkowe angażują publiczność niezależnie od wieku — dzieci patrzą z zachwytem, dorośli ze wzruszeniem.",
    quote: "Dobra lalka nie potrzebuje słów — wystarczy jej jeden gest, żeby opowiedzieć całą historię.",
    quoteAuthor: "Artysta Kapelusznika",
    history: "Lalkarstwo uliczne ma tradycje sięgające średniowiecza, kiedy wędrowni lalkarze przemierzali Europę z teatrzykami na plecach. Współcześnie wielkoformatowe lalki stały się symbolem największych festiwali sztuki ulicznej. W Kapeluszniaku budujemy lalki od podstaw.",
    galleryImages: ["/images/disciplines/lalkarstwo.jpg", "/images/disciplines/lalkarstwo.jpg", "/images/disciplines/lalkarstwo.jpg"],
    artists: [
      { name: "Ewa D.", role: "Lalkarka / konstruktorka", image: "" },
      { name: "Michał K.", role: "Animator lalek", image: "" },
    ],
  },
  "scena": {
    longDescription: "Scena Sztukmistrzów to nasz format łączący magię, komedię i interakcję z publicznością. Sztukmistrze wychodzą na ulicę i tworzą spektakl z niczego — zapraszając widzów do wspólnej zabawy. To najbardziej interaktywna z naszych dyscyplin, gdzie granica między artystą a publicznością zaciera się kompletnie.",
    quote: "Najlepszy występ to taki, gdzie publiczność nie wie, czy się śmiać, czy klaskać — więc robi jedno i drugie.",
    quoteAuthor: "Artysta Kapelusznika",
    history: "Tradycja sztukmistrzów sięga jarmarków i festynów średniowiecznych, gdzie komedianci, magicy i kuglarze zarabiali na życie swoim talentem. W Kapeluszniaku kontynuujemy tę tradycję, dodając do niej współczesny humor i profesjonalną magię sceniczną.",
    galleryImages: ["/images/disciplines/scena.jpg", "/images/disciplines/scena.jpg", "/images/disciplines/scena.jpg"],
    artists: [
      { name: "Adam Z.", role: "Sztukmiszcz / magik", image: "" },
      { name: "Bartek N.", role: "Komik uliczny", image: "" },
    ],
  },
};
