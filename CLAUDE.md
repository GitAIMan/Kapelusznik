# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for **Kolektyw Artystyczny Kapelusznik** — street artists collective from Bielsko-Biała, Poland. Dark theme with fire videos, warm color palette based on their brand logo.

## Commands

### Frontend (Next.js)
```bash
cd frontend && npm run dev    # Dev server → localhost:3000
cd frontend && npm run build  # Production build (validates TS + generates static pages)
cd frontend && npm run lint   # ESLint
```

### Backend (Express placeholder)
```bash
cd backend && npm run dev     # Dev server → localhost:3001
cd backend && npm run build   # TypeScript compile
```

## Architecture

**Monorepo** with `frontend/` (Next.js 16 App Router) and `backend/` (Express + Zod, contact form placeholder).

### Frontend stack
- **Next.js 16** (App Router, `src/` dir) + **React 19** + **TypeScript**
- **Tailwind CSS 4** — config in `@theme inline` block in `globals.css` (NOT `tailwind.config`)
- **framer-motion** — used minimally (only `FloatingEmbers.tsx`)
- **lucide-react** for icons, **clsx + tailwind-merge** via `cn()` in `lib/utils.ts`
- Fonts: **Space Grotesk** (headings, `--font-heading`) + **Inter** (body, `--font-body`) via `next/font/google`

### Color palette (brand-based, warm dark theme)
All color tokens defined in `globals.css` `@theme inline`. Key tokens:
- `bg: #1A1210` (warm black), `primary: #caa775` (brand gold-brown from logo), `accent-gold: #caa775`, `accent-violet: #3e1011` (dark brown)
- `text: #faf1b7` (cream from logo), `text-secondary: #B8A88E`
- Backup of previous "Ember" palette saved in `frontend/globals-backup-ember.css`

### Key patterns

**Data-driven sections:** All content (disciplines, timeline steps, stats, contact info, blog posts) lives in `lib/constants.ts`. Components read from these arrays. Types in `types/index.ts`.

**Video dip-to-black:** Hero, About, and Disciplines sections have background `<video>` elements with JS-controlled opacity via `timeupdate` event listener. Fade-out triggers 0.5s before video ends for seamless looping. Video files in `public/video/`.

**Discipline wheel (desktop):** `useDisciplineWheel` hook handles drag-to-rotate via pointer events + `Math.atan2`. Wrapped in `mounted` state guard to avoid SSR hydration mismatch from floating-point precision differences.

**Section reveal:** Lightweight IntersectionObserver via `SectionRevealProvider` client component (loaded in `layout.tsx`) adds `.visible` class to `.section-reveal` elements. CSS transition handles the animation.

**Premium CSS utilities** in `globals.css`: `.card-hover` (lift + shadow), `.gradient-border` (mask trick), `.section-divider` (gradient line), `.animate-bounce-subtle`.

### Routing
- `/` — main one-page site (7 sections: Hero, About, Disciplines, ForOrganizers, Blog, Contact + Navbar/Footer)
- `/dyscypliny/[id]` — discipline subpages (statically generated via `generateStaticParams`)

## Critical constraints

1. **Performance is absolute priority.** Previous version of this site crashed the user's laptop 15 times. No heavy animations, no canvas/WebGL, no particle systems. Max lightweight CSS transitions + framer-motion on tiny elements only.
2. **No generic "gold premium" styling.** Colors must come from client's brand logo (`#caa775`, `#faf1b7`, `#3e1011`).
3. **Next.js 16 breaking change:** `params` in dynamic routes is a `Promise` — must be `await`ed.
4. **Tailwind CSS 4:** Configuration is in CSS `@theme` block, not in `tailwind.config.ts`.
5. **`prefers-reduced-motion`** must be respected — all animations have reduced-motion fallbacks in `globals.css`.

## Deployment (Railway)

**Hosting:** Railway — 2 separate services (kafelki): `Frontend` and `Backend`.
- **Frontend:** Build command `npm run build`, Start command `npm run start` (uses `next start`). Do NOT use `output: "standalone"` — Railway nie kopiuje `public/` i `.next/static/` automatycznie.
- **Backend:** Standard `npm run start` → Express on port 8080.
- Railway auto-deploys on push to GitHub `main`.
- Section reveal moved from inline `<Script>` to `SectionRevealProvider` client component.

## Project docs
- `Specyfikacja projektu - Kapelusznik.md` — full spec with all sections, colors, SEO
- `Potrzebne animacje na później.md` — deferred animation ideas (fire intro, custom cursor, parallax)
- `wstęp_do_strony.md` — analysis of current kapelusznik.com.pl site
