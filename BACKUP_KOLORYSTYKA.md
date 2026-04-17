# Backup kolorystyki — stan z 2026-04-17

Paleta zdefiniowana w `frontend/src/app/globals.css` w bloku `@theme inline`.
Gdyby nowe zmiany się nie podobały — skopiuj poniższe wartości z powrotem.

## Zmienne CSS (Tailwind 4 @theme)

```css
@theme inline {
  --color-bg: #1A1210;                    /* ciepła czerń — tło całej strony */
  --color-bg-surface: #251E1B;            /* tło kart, paneli */
  --color-bg-surface-hover: #332820;      /* tło kart na hover */
  --color-primary: #caa775;               /* złoto-brąz (z logo) — główny akcent */
  --color-primary-light: #d4b88a;         /* jaśniejsze złoto — hover stanu */
  --color-accent-gold: #caa775;           /* złoto — przyciski, highlight */
  --color-accent-orange: #b8895a;         /* pomarańczowy brąz — dodatkowy akcent */
  --color-accent-violet: #3e1011;         /* ciemny bordo — mocny akcent, gradient */
  --color-text: #faf1b7;                  /* kremowy (z logo) — główny tekst */
  --color-text-secondary: #B8A88E;        /* złamany beż — tekst poboczny */
  --color-text-muted: #7A6E60;            /* przygaszony brąz — tekst drugoplanowy */
  --font-heading: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

## Znaczenie / gdzie użyte

| Token | HEX | Użycie |
|-------|-----|--------|
| `bg` | `#1A1210` | tło całej strony, navbar overlay mobile |
| `bg-surface` | `#251E1B` | karty, bloki admin, kontener bloga |
| `bg-surface-hover` | `#332820` | gradienty kart, hover |
| `primary` / `accent-gold` | `#caa775` | CTA, linki, highlight, ikonki, paski |
| `primary-light` | `#d4b88a` | hover na złocistych elementach |
| `accent-orange` | `#b8895a` | gradient kart dyscyplin |
| `accent-violet` | `#3e1011` | gradient tła, ciemne akcenty |
| `text` | `#faf1b7` | główny tekst, tytuły |
| `text-secondary` | `#B8A88E` | opisy, wtórny tekst |
| `text-muted` | `#7A6E60` | podpisy, placeholdery |

## Stan aktualny

- Motyw: ciemny, ciepły (brązy + złoto + kremy — barwy z logo klienta)
- Zakres: wszystkie strony używają tych samych tokenów
- `::selection` → `#caa775` na `#1A1210`
- Scrollbar: `#caa775` thumb, `#1A1210` track

## Jak przywrócić

Wklej blok `@theme inline` z góry do `frontend/src/app/globals.css` (linie 3-17).

## Notatki (wypełnij gdy będziesz zmieniać)

- Data zmiany: _
- Powód: _
- Co zostało zmienione: _
