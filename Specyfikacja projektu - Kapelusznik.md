# Specyfikacja projektu: Strona Kapelusznik
### Dokument dla nowego dewelopera — budowa od zera

---

## O projekcie
Nowa strona internetowa dla **Kolektywu Artystycznego Kapelusznik** z Bielska-Białej (artyści uliczni). Obecna strona (kapelusznik.com.pl) to generyczny szablon Colorlib na Bootstrap 4 — bez tożsamości wizualnej, bez kontaktu, bez wideo. Nowa strona ma przyciągać organizatorów eventów i oddawać energię artystów ulicznych.

---

## Klient
- **Nazwa:** Kolektyw Artystyczny Kapelusznik
- **Miasto:** Bielsko-Biała
- **Facebook:** facebook.com/kolektyw.kapelusznik
- **Email:** kontakt@kapelusznik.com.pl
- **Domena docelowa:** kapelusznik.com.pl
- **Telefon:** do potwierdzenia z klientem (placeholder: +48 123 456 789)

---

## ETAP 1 — Szkielet strony (BEZ animacji)

Na start strona musi być statyczna, lekka, działać na słabych komputerach. Zero bibliotek animacji. Tylko CSS transitions na hover/focus.

### Stack technologiczny
- **Next.js** + **Tailwind CSS 4** + **TypeScript**
- Fonty Google: **Space Grotesk** (nagłówki, `--font-heading`) + **Inter** (body, `--font-body`)
- Ikony: **lucide-react**
- Utility: **clsx** + **tailwind-merge** (funkcja `cn()` do łączenia klas)

### Paleta kolorów (dark theme)

| Token | Hex | Użycie |
|-------|-----|--------|
| `bg` | `#0A0A0F` | Tło strony (prawie czarne) |
| `bg-surface` | `#141420` | Karty, panele |
| `bg-surface-hover` | `#1E1E30` | Hover na kartach |
| `primary` | `#E63946` | Czerwony główny (ogień) |
| `primary-light` | `#FF6B6B` | Jasny czerwony |
| `accent-gold` | `#FFB703` | Złoty akcent (labele sekcji, podpisy) |
| `accent-orange` | `#FB8500` | Pomarańczowy |
| `accent-violet` | `#7B2FBE` | Fioletowy (gradienty przycisków) |
| `text` | `#F5F5F7` | Tekst główny (prawie biały) |
| `text-secondary` | `#A0A0B0` | Tekst drugorzędny (opisy) |
| `text-muted` | `#6B6B7B` | Tekst wyciszony (podpisy, hinty) |

### Gradienty (powtarzające się w projekcie)
- **CTA główny:** `linear-gradient(135deg, #E63946, #7B2FBE)` — czerwono-fioletowy
- **CTA złoty:** `linear-gradient(135deg, #FFB703, #FB8500)` — złoto-pomarańczowy
- **Tekst logo:** `linear-gradient(135deg, #FFB703, #E63946)` — złoto-czerwony
- **Liczby/statystyki:** `linear-gradient(135deg, #FFB703, #E63946)` — złoto-czerwony
- **Linia timeline:** `linear-gradient(to bottom, #FFB703, #E63946)`
- **Dekoracyjna kreska:** `linear-gradient(90deg, #FFB703, #E63946)`

### Detale CSS
- Custom scrollbar: czerwony thumb (`#E63946`) na ciemnym tle
- `::selection` — czerwone zaznaczenie tekstu
- `scroll-behavior: smooth`
- `overflow-x: hidden` na body
- `@media (prefers-reduced-motion: reduce)` — wyłącza animacje (dostępność)

---

## Struktura strony (one-page, 7 elementów)

### 1. NAVBAR
- **Zawsze hamburger** (nawet na desktopie — to decyzja designowa)
- Logo "Kapelusznik" po lewej (gradient złoto-czerwony, font heading, bold)
- Hamburger po prawej (3 kreski, animacja CSS na X po otwarciu)
- Po scrollu >50px: tło navbara = `rgba(10,10,15,0.9)` + `backdrop-filter: blur(20px)`
- **Menu fullscreen overlay** po kliknięciu:
  - Czarne tło z subtelnymi radial gradientami (czerwony + złoty, opacity 10%)
  - 4 linki na środku (duży font, bold): O nas, Nasze sztuki, Dla organizatorów, Kontakt
  - Na dole: linki Facebook + Email (mały font, uppercase, tracking)
  - Hover na linkach: kolor zmienia się na złoty (`#FFB703`)
  - `body overflow: hidden` gdy menu otwarte

### 2. HERO (fullscreen, 100vh)
- **Wideo ognia w tle** (autoplay, muted, loop, playsInline)
  - Plik: `/video/fire-stock.mp4` (stock do dostarczenia)
  - Poster: `/images/hero-poster.jpg`
- Gradient overlay na wideo: ciemny od dołu (`rgba(10,10,15,0.3)` → `rgba(10,10,15,0.8)`), opacity 0.6
- Czerwony radial glow (opacity 30%)
- Treść wycentrowana:
  - "Kolektyw Artystyczny" — złoty, uppercase, letter-spacing 0.4em, mały font
  - "Kapelusznik" — ogromny (6xl→9xl responsive), bold, gradient biało-szary na tekście
  - Opis: "Zamieniamy ulice w sceny. Ogień, akrobatyka, magia — przeżyj sztukę, która nie zna granic." — szary `#A0A0B0`
  - CTA "Odkryj nasze sztuki" — rounded-full, gradient czerwono-fioletowy, hover z overlay
- Strzałka ChevronDown na dole (kolor `#6B6B7B`)

### 3. O NAS (`#o-nas`)
- Padding: `py-32 px-6 md:px-12`
- Subtlene radial gradienty w tle (złoty + czerwony, opacity 5%)
- Grid 2 kolumny (1 na mobile):
  - **Lewa:** label "Poznaj nas" (złoty) → nagłówek "Kim jesteśmy" → 2 akapity
  - **Prawa:** grid 2x2 ze statystykami w kartach
- **Statystyki:**
  - 10+ Lat doświadczenia
  - 200+ Wydarzeń
  - 6 Dyscyplin
  - 50k+ Widzów rocznie
- Karty statystyk: `background: rgba(20,20,32,0.8)`, border `rgba(255,255,255,0.05)`, liczby gradient złoto-czerwony

### 4. NASZE SZTUKI / DYSCYPLINY (`#nasze-sztuki`)
- Label "Dyscypliny" (złoty) → nagłówek "Nasze sztuki" → podpis "Obróć koło i odkryj nasze dyscypliny"
- **Desktop: interaktywne koło (orbita)**
  - Centralna ikona płomienia w kole z gradientem czerwono-fioletowym + glow
  - 2 okręgi dekoracyjne (border 1px, subtelne)
  - 6 ikon-buttonów rozmieszczonych na orbicie (radius ~260px)
  - **Drag to rotate** — pointer events, obliczanie kąta od centrum, setRotation
  - Kliknięcie ikony → aktywna ikona zmienia styl (gradient złoto-czerwony, większa, glow)
  - Po prawej stronie pojawia się opis wybranej dyscypliny + placeholder na zdjęcie
- **Mobile: lista buttonów** z ikoną + nazwą (flex-wrap)
- **6 dyscyplin z opisami:**
  1. **Żywe Rzeźby** (ikona: Sparkles) — "Nieruchomi artyści, którzy ożywają w najmniej spodziewanym momencie. Mistrzowskie kostiumy i charakteryzacja przenoszą widzów w inny świat."
  2. **Żonglerka** (ikona: Flame) — "Wirujące maczugi, płonące pochodnie i hipnotyzujące LED-y. Precyzja, rytm i widowiskowa energia, która elektryzuje tłumy."
  3. **Akrobatyka Powietrzna** (ikona: Wind) — "Taniec w powietrzu na szarfach i trapezach. Gracja, siła i odwaga — spektakl, który zapiera dech w piersiach."
  4. **Highline** (ikona: MountainSnow) — "Spacer po taśmie rozpiętej nad ziemią. Balans na granicy możliwości — tam, gdzie niebo spotyka odwagę."
  5. **Lalkarstwo** (ikona: Drama) — "Wielkoformatowe lalki i marionetki ożywające na ulicach. Teatr, który przemawia do wyobraźni dzieci i dorosłych."
  6. **Scena Sztukmistrzów** (ikona: Sparkles) — "Magia, komedia i interakcja z publicznością. Sztukmistrze, którzy zamieniają ulicę w scenę pełną śmiechu i zachwytu."
- Zdjęcia dyscyplin: `/images/disciplines/{id}.jpg` (do dostarczenia)

### 5. DLA ORGANIZATORÓW (`#dla-organizatorow`)
- Label "Współpraca" (złoty) → nagłówek "Dla organizatorów" → podtytuł "Twoje wydarzenie zasługuje na niezapomniane emocje"
- **Timeline (4 kroki)** z pionową linią gradientową po lewej:
  1. **01 — Kontakt** — "Napisz do nas — opowiedz o swoim wydarzeniu, a my zaproponujemy idealny program."
  2. **02 — Planowanie** — "Dobierzemy artystów i dyscypliny dopasowane do charakteru Twojego eventu."
  3. **03 — Występ** — "Przyjeżdżamy z pełnym zapleczem technicznym — Ty cieszysz się widowiskiem."
  4. **04 — Magia!** — "Twoi goście zapamiętają ten dzień na długo. Gwarantujemy niezapomniane emocje."
- Numer kroku w kole (w-16 h-16), ostatni krok wyróżniony gradientem złoto-czerwonym + glow
- Karty kroków: ciemne tło, subtelny border
- CTA na dole: "Zamów występ" (gradient złoto-pomarańczowy, rounded-full)

### 6. KONTAKT (`#kontakt`)
- Label "Napisz do nas" (złoty) → nagłówek "Porozmawiajmy"
- Grid 2 kolumny:
  - **Lewa — formularz:**
    - Pola: imię i nazwisko, email, wiadomość (textarea)
    - **Floating labels** — label przesuwa się w górę gdy pole aktywne/wypełnione (CSS transition)
    - Focus: border zmienia się na złoty + subtelny glow
    - Submit button: "Wyślij wiadomość" + ikona Send, gradient czerwono-fioletowy, pełna szerokość
    - Backend: TODO (formularz na razie bez wysyłki)
  - **Prawa — dane kontaktowe (4 karty):**
    - Email: kontakt@kapelusznik.com.pl (link mailto)
    - Telefon: +48 123 456 789 (link tel)
    - Lokalizacja: Bielsko-Biała, Polska (bez linku)
    - Facebook: link do profilu (target _blank)
    - Każda karta: ikona w kwadracie (złote tło 10%), label + wartość, strzałka ArrowRight przy hover

### 7. FOOTER
- Border top (`border-white/5`)
- 3 kolumny (1 na mobile):
  - Logo + krótki opis
  - Kontakt (email, telefon, lokalizacja z ikonami)
  - Social media (Facebook z ikoną)
- Copyright na dole: "© {rok} Kapelusznik Kolektyw Artystyczny. Wszystkie prawa zastrzeżone."

---

## SEO / Meta tagi
```html
<title>Kapelusznik — Kolektyw Artystyczny | Artyści Uliczni z Bielska-Białej</title>
<meta name="description" content="Kolektyw artystów ulicznych z Bielska-Białej. Żywe rzeźby, żonglerka, akrobatyka powietrzna, highline, lalkarstwo i scena sztukmistrzów. Zamieniamy ulice w sceny." />
<meta name="keywords" content="artyści uliczni, Bielsko-Biała, żonglerka, akrobatyka powietrzna, żywe rzeźby, kolektyw artystyczny, Kapelusznik, sztuka uliczna, busking, festiwal" />
<meta property="og:title" content="Kapelusznik — Kolektyw Artystyczny" />
<meta property="og:description" content="Zamieniamy ulice w sceny. Ogień, akrobatyka, magia — przeżyj sztukę, która nie zna granic." />
<meta property="og:url" content="https://kapelusznik.com.pl" />
<meta property="og:site_name" content="Kapelusznik" />
<meta property="og:locale" content="pl_PL" />
<meta property="og:type" content="website" />
<html lang="pl">
```

---

## Zasoby graficzne (do dostarczenia)
- `/video/fire-stock.mp4` — stock wideo ognia do hero
- `/images/hero-poster.jpg` — poster/fallback dla wideo
- `/images/disciplines/zywe-rzezby.jpg`
- `/images/disciplines/zonglerka.jpg`
- `/images/disciplines/akrobatyka.jpg`
- `/images/disciplines/highline.jpg`
- `/images/disciplines/lalkarstwo.jpg`
- `/images/disciplines/scena.jpg`
- Stare zdjęcia z obecnej strony mogą posłużyć jako baza (16 plików JPG w folderze `zdjecia/`)

---

## ETAP 2 — Animacje (PÓŹNIEJ, po zatwierdzeniu szkieletu)

**ZASADA: dodawać pojedynczo, testując wydajność po każdej. NIE dodawać wszystkich na raz. Strona musi działać na słabych laptopach.**

### 2a. Scroll Reveal (FadeInView) — najlżejsza, dodać pierwszą
- Sekcje pojawiają się płynnie przy scrollowaniu (fade in + przesunięcie w górę ~60px)
- Trigger: element wchodzi w viewport (margin -80px)
- Raz na element (`once: true`)

### 2b. Custom Cursor — płomyk za myszą
- Złoty dot (8px, `#FFB703`, glow) + ring (40px, border złoty 40% opacity) podążający z lagiem (lerp 0.15)
- **BEZ particle trail** (za ciężkie)
- Ukrycie standardowego kursora (`cursor: none`)
- Wyłączony na urządzeniach dotykowych (`ontouchstart` check)
- Z-index: 9999

### 2c. Parallax przy scrollowaniu
- Elementy (zdjęcia, statystyki) poruszają się z różną prędkością tworząc głębię
- Parametry: speed (0.15-0.3), direction (up/down)
- **Ostrożnie** — scroll-based transforms mogą obciążać CPU

### 2d. Fire Intro — logo reveal z ogniem
- Czarny ekran → ognisty efekt (CSS gradienty radialne, **NIE canvas**) → logo "Kapelusznik" z gradientem + "Kolektyw Artystyczny" → fade out → hero
- Czas: 5-10 sekund
- Przycisk "Pomiń" na dole (kolor wyciszony, hover złoty)
- **Bezwzględnie BEZ canvas particle systems**
- Fixed, z-index 100

### 2e. Ogniowa zasłona — page transitions (razem z ETAPEM 3)
- Kliknięcie w dyscyplinę → ekran "spłonie" animacją → podstrona dyscypliny
- Do zrobienia dopiero gdy będą podstrony

---

## ETAP 3 — Podstrony (przyszłość)
- Osobne strony dla każdej dyscypliny (galeria, opis rozszerzony)
- Portfolio/galeria zrealizowanych wydarzeń
- Rozbudowany formularz ofertowy dla organizatorów

---

## Uwagi końcowe
1. **Wydajność jest absolutnym priorytetem** — strona musi działać płynnie na słabych komputerach
2. Framer Motion z wieloma komponentami + useScroll + useTransform na jednej stronie potrafi zamrozić słabsze laptopy — uważać
3. Treści kontaktowe (telefon) to placeholdery — potwierdzić z klientem przed deployem
4. Koło dyscyplin z drag-to-rotate to kluczowa interakcja — zachować
5. Język strony: **polski**
