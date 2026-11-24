# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for **Kolektyw Artystyczny Kapelusznik** — street artists collective from Bielsko-Biała, Poland. Dark theme with fire video on hero, warm color palette based on brand logo. Multi-page architecture with separate subpages.

## Commands

### Frontend (Next.js)
```bash
cd frontend && npm run dev    # Dev server → localhost:3000
cd frontend && npm run build  # Production build (validates TS + generates static pages)
cd frontend && npm run lint   # ESLint
```

### Backend (Express + PostgreSQL)
```bash
cd backend && npm run dev     # Dev server → localhost:3001 (works without DATABASE_URL — graceful start)
cd backend && npm run build   # TypeScript compile
```

## Architecture

**Monorepo** with `frontend/` (Next.js 16 App Router) and `backend/` (Express + Zod + PostgreSQL).

### Frontend stack
- **Next.js 16** (App Router, `src/` dir) + **React 19** + **TypeScript**
- **Tailwind CSS 4** — config in `@theme inline` block in `globals.css` (NOT `tailwind.config`)
- **framer-motion** — used minimally (only `FloatingEmbers.tsx` in discipline wheel)
- **embla-carousel-react** — blog carousel on homepage (coverflow 3D effect)
- **react-easy-crop** — image cropper in admin panel (16:9, 9:16, 1:1 aspect ratios)
- **lucide-react** for icons, **clsx + tailwind-merge** via `cn()` in `lib/utils.ts`
- Fonts: **Space Grotesk** (headings, `--font-heading`) + **Inter** (body, `--font-body`) via `next/font/google`

### Color palette (brand-based, warm dark theme)
All color tokens defined in `globals.css` `@theme inline`. Key tokens:
- `bg: #1A1210` (warm black), `primary: #caa775` (brand gold-brown from logo), `accent-gold: #caa775`, `accent-violet: #3e1011` (dark brown)
- `text: #faf1b7` (cream from logo), `text-secondary: #B8A88E`

### Key patterns

**Multi-page architecture:** Site uses route group `(main)` with shared layout (Navbar + Footer). Each section is a separate subpage with its own URL, metadata, and unique layout. NOT a one-page site.

**Data-driven sections:** Disciplines, timeline steps, contact info live in `lib/constants.ts`. Blog posts are dynamic — stored in PostgreSQL, fetched via API (`/api/blog`), with `BLOG_POSTS` in constants as fallback (includes `content` field).

**Video dip-to-black:** Fire video lives ONLY on `/tesserakt-ognia` hero (moved from homepage 2026-11-24), component `components/ui/FireVideo.tsx` — background `<video>` with JS-controlled opacity via `timeupdate` event. Fade-out triggers 0.5s before video end. Homepage Hero has classic background (no video). Files locally in `public/Video/`, on production served from Cloudflare R2.

**Discipline wheel:** Interactive drag-to-rotate wheel on `/dla-organizatorow` page. `useDisciplineWheel` hook handles pointer events + `Math.atan2`. Center Flame icon with `FloatingEmbers`. Triple-click Flame → `/admin` (secret admin entry). Desktop only — mobile shows expandable list.

**Blog carousel (homepage):** `BlogCarousel` component using embla-carousel-react. 3D coverflow effect — center card straight, side cards rotated ±10° and scaled down. Drag to scroll, loop, navigation arrows. Fetches posts from API.

**Blog post images:** Admin uploads images via cropper (react-easy-crop) with 3 aspect ratio options (Poziome 16:9, Pionowe 9:16, Kwadrat 1:1). Images stored in Cloudflare R2. Displayed on blog listing (object-cover, fixed height) and post page (object-contain, natural proportions, max-h-600px).

**Block editor (blog):** `PostEditor` + `BlockEditor` + `GalleryEditor` w `components/admin/`. Post ma pola: title, subtitle (lead), blocks (heading/paragraph/image/quote, z drag-reorder ↑↓), gallery (dodatkowe zdjęcia kadrowane). Backend: DB kolumny `subtitle TEXT`, `blocks JSONB`, `gallery JSONB` (migracja idempotentna). Frontend `/blog/[slug]`: kolejność **tytuł → lead → zdjęcie główne → bloki → galeria → related** (zdjęcie POD tytułem, nie nad). Lightbox własny, bez biblioteki. Fallback: brak bloków → renderuje `content` jak przedtem (stare posty działają).

**Dyscypliny accordion:** `/dyscypliny` to 3 rozwijane panele (Pokazy / Animacje cyrkowe / Warsztaty). Struktura w `DISCIPLINE_CATEGORIES` w `constants.ts`. Dyscyplina może mieć `href` (Tesserakt → `/tesserakt-ognia`) i `highlight` (złota obwódka + pulsująca ikonka). `generateStaticParams` filtruje pozycje z `href` żeby nie generować duplikatów. Accordion: CSS-only `grid-template-rows 0fr → 1fr` (bez biblioteki, GPU-friendly).

**Section reveal:** IntersectionObserver via `SectionRevealProvider` client component adds `.visible` class to `.section-reveal` elements. CSS transition handles animation.

**Back navigation:** Every subpage has "← Strona główna" link at top. `/dyscypliny/[id]` has "← Wróć do dyscyplin". `/blog/[slug]` has breadcrumbs + "← Wróć do bloga".

**Premium CSS utilities** in `globals.css`: `.card-hover` (lift + shadow), `.gradient-border` (mask trick), `.section-divider` (gradient line), `.animate-bounce-subtle`, `.hide-scrollbar`.

### Routing

```
/                    → Homepage = O nas (Hero z wideo + AboutContent). /o-nas USUNIĘTE
/dyscypliny          → Accordion 3 kategorii (Pokazy / Animacje / Warsztaty)
/dyscypliny/[id]     → Discipline detail (Tesserakt filtered — linkuje do /tesserakt-ognia)
/tesserakt-ognia      → Dedykowana strona flagowego projektu (onepage, placeholders)
/dla-organizatorow   → For organizers (process steps, offer checklist, discipline wheel, event gallery)
/blog                → Blog listing
/blog/[slug]         → Blog post detail (bloki, galeria, lightbox)
/kontakt             → Formularz (górą) + mapa Google (pod spodem). RouteCalculator zakomentowany (brak klucza ORS)
/admin               → Hidden admin panel
/admin/new           → Create blog post (PostEditor — subtitle, bloki, galeria, cropper)
/admin/edit/[id]     → Edit blog post (PostEditor)
```

**Route group:** `app/(main)/` wraps all public pages with shared `layout.tsx` (Navbar + Footer). Admin pages are outside this group.

### Navbar
- **Linki:** Dyscypliny, Tesserakt Ognia, Dla organizatorów, Blog, Kontakt (O nas usunięte — jest na `/`)
- **Wyróżnione linki (`highlight: true` w `NAV_LINKS`):** Dyscypliny (ikonka Sparkles) i Tesserakt Ognia (ikonka Flame). Złoty tekst, gradient-tło, `animate-nav-glow` na ramce + `animate-icon-pulse` na ikonce. Reszta linków neutralna.
- **Desktop (lg+):** Visible nav links in row + CTA "Zamów występ" button
- **Mobile:** Hamburger menu with fullscreen overlay. Solid bg (`bg-bg/95`, BEZ `backdrop-blur` — usunięte dla performance).
- Logo (round, `/images/logo.jpg`) links to `/`

### Secret admin panel
- **Entry:** Triple-click Flame icon in discipline wheel on `/dla-organizatorow` → clears token → redirects to `/admin`
- **Auth:** Password from `ADMIN_PASSWORD` env var → SHA-256 hash compared → JWT token (24h)
- **Features:** CRUD blog posts, image upload with cropper (3 aspect ratios) to Cloudflare R2
- **Auto excerpt:** Zajawka field removed from forms — excerpt auto-generated from first 150 chars of content
- **Backend routes:** `/api/auth` (login/verify), `/api/blog` (CRUD), `/api/upload` (images → R2)
- **DB:** PostgreSQL on Railway, table `blog_posts`, auto-migrates on backend start

### Backend security
- **Rate limiting:** Global 100 req/15min, login 5/15min, contact 5/hour (express-rate-limit)
- **Helmet:** Security headers (X-Content-Type-Options, X-Frame-Options, CSP etc.)
- **Input validation:** Zod schemas with max lengths + `.strict()` (rejects unknown fields)
- **HTML sanitization:** `sanitize-html` strips all HTML tags from blog content (XSS protection)
- **ID validation:** PUT/DELETE routes validate numeric ID params
- **Env vars required in production:** `ADMIN_PASSWORD`, `JWT_SECRET` (throws on missing)
- **Request body limit:** 1MB

## Performance optimizations (2026-04-17)

- **Blury zredukowane:** wszystkie `blur-[120-180px]` → `blur-[60-80px]` (kilkukrotnie szybsze na GPU)
- **Navbar:** usunięto `backdrop-blur-2xl` — teraz `bg-bg/95` solid (było widoczne na starych laptopach)
- **Wideo (FireVideo):** IntersectionObserver pauzuje `<video>` gdy sekcja jest poza ekranem
- **Nieużywane komponenty:** `SectionsPreview.tsx`, `BlogCarousel.tsx`, `About.tsx` zostają w repo (martwy kod) — do ewentualnego powrotu

## Hidden / planned features

- **RouteCalculator** (`components/sections/RouteCalculator.tsx` + `RouteMap.tsx`) — gotowy, zakomentowany w `/kontakt`. Wymaga klucza `ORS_API_KEY` (OpenRouteService, darmowe 2000/dzień). Backend proxy `/api/route`. Leaflet + react-leaflet już zainstalowane. Odkomentować gdy klient dostarczy klucz.

## Color backup

Kopia palety HEX zapisana w `BACKUP_KOLORYSTYKA.md` w root (do cofnięcia zmian kolorystyki).

## Critical constraints

1. **Performance is absolute priority.** Previous version crashed the user's laptop 15 times. No heavy animations, no canvas/WebGL, no particle systems. Max lightweight CSS transitions + framer-motion on tiny elements only.
2. **No generic "gold premium" styling.** Colors must come from client's brand logo (`#caa775`, `#faf1b7`, `#3e1011`).
3. **Next.js 16 breaking change:** `params` in dynamic routes is a `Promise` — must be `await`ed.
4. **Next.js 16:** `ssr: false` in `next/dynamic` not allowed in Server Components — use client wrapper component.
5. **Tailwind CSS 4:** Configuration is in CSS `@theme` block, not in `tailwind.config.ts`.
6. **`prefers-reduced-motion`** must be respected — all animations have reduced-motion fallbacks in `globals.css`.
7. **Commits only with user approval.** Never commit without explicit permission.
8. **Accessibility:** Site must be navigable by older users — clear navigation, readable text, predictable layout.

## Deployment

### Railway — 2 environments: Production + Staging
- **Production:** auto-deploys from `main` branch
- **Staging:** auto-deploys from `staging` branch
- **Frontend:** Build `npm run build`, Start `npm run start`. Do NOT use `output: "standalone"`.
- **Backend:** Build `npm run build`, Start `npm run start` → Express on port 8080.

### Backend env vars (required)
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — JWT signing secret (required in production)
- `ADMIN_PASSWORD` — Admin panel password (required in production)
- `FRONTEND_URL` — CORS allowed origin (set per environment!)
- `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_ACCOUNT_ID` — Cloudflare R2

### Frontend env vars
- `NEXT_PUBLIC_CDN_URL` — Cloudflare R2 public URL (for videos). Empty locally → falls back to `/Video/`
- `NEXT_PUBLIC_API_URL` — Backend URL. Must point to correct environment (staging backend for staging frontend!)

### CORS gotcha
Staging frontend must talk to staging backend (not production!). Set `FRONTEND_URL` on staging backend to staging frontend URL, and `NEXT_PUBLIC_API_URL` on staging frontend to staging backend URL.

## Video CDN (Cloudflare R2)

Background fire video hosted on **Cloudflare R2** (bucket: `kapelusznik-assets`).
- **Public URL:** `https://pub-c80345f06600456890a96b515fec6e54.r2.dev`
- **Env var:** `NEXT_PUBLIC_CDN_URL` — set in Railway Variables.
- **Files in R2** (folder `Video/`): `film_ogień.mp4` — tło hero na `/tesserakt-ognia`.
- Video only on `/tesserakt-ognia` hero. Homepage has no video.

## Project docs
- `Specyfikacja projektu - Kapelusznik.md` — full spec with all sections, colors, SEO
- `Potrzebne animacje na później.md` — deferred animation ideas (fire intro, custom cursor, parallax)
- `wstęp_do_strony.md` — analysis of current kapelusznik.com.pl site
- `kapelusznik_homepage_mockup.html` — HTML mockup of homepage layout (inspiration reference)
