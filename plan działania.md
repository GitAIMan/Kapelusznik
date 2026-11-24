# Plan działania — przebudowa strony Kapelusznik

Start: 2026-11-24 · Gałąź: **staging** (nie main)

## Zasady
- 1 rozmowa = 1 część planu.
- Po skończeniu części → oznacz `[x]` + data.
- Plan to zarys. Szczegóły podaje użytkownik w trakcie danej części.
- Kolejność ustala użytkownik.
- Materiały klienta: `Plik_klienta/strona główna/` (Readme.txt, Zamysł.txt).

## 3. Strona główna
- [x] 3.1 Zaufali Nam — 2026-11-24 (22 loga, przewijany pasek, pliki w `frontend/public/images/zaufali/`)
- [ ] 3.2 Zdjęcia
- [ ] 3.3 Read Me — w trakcie (lista niżej)
- [ ] 3.4 Zamysł — w trakcie (lista niżej)

### Lista z Read Me + Zamysł
| # | Punkt | Stan |
|---|---|---|
| 1 | Usunąć „Drogę Kapelusznika” | ✅ 2026-11-24 |
| 2 | Tło: filmy (Dzień Dziecka, BBusking — po ~1 min) na przemian ze zdjęciami. **BEZ DAWIDA.** Wymaga R2 Cloudflare | ⏳ na sam koniec (decyzja użytkownika) |
| 3 | Napis „Zamieniamy ulice w sceny” zostaje | ✅ jest |
| 4 | O nas: tekst klienta (historia, Miłosz, misja, „Potrafimy zaskoczyć…”, warsztaty + żonglerka funkcjonalna) | ✅ 2026-11-24 (zdjęcia = placeholdery, czekają na 3.2) |
| 5 | Sekcja „Kompleksowa realizacja imprez” (Bielska Scena Ognia, BBusking, dmuchańce, nagłośnienie…) | ✅ 2026-11-24 (zdjęcia imprez = placeholdery) |
| 6 | Sekcja „Nasze realizacje” — 4 filmy YT (Harry Potter = coming soon) | ✅ 2026-11-24 (miniatura + ▶, film ładuje się po kliknięciu; Harry Potter = „Wkrótce”, czeka na link) |
| 7 | Zaufali nam — pasek z logami (bez kategorii — decyzja użytkownika) | ✅ 2026-11-24 → 3.1 |
| 8 | Przycisk „Zamów występ” na dole zostaje | ✅ jest |
| 9 | Stopka: logo, dane firmy, kontakt, Facebook + YouTube | ✅ 2026-11-24 |
| 10 | Opinie Google (widget/przycisk) | ⏳ klient się zastanawia — potrzebny link do wizytówki |

### Dodatkowo zrobione
- ✅ Film z ogniem przeniesiony ze strony głównej na Tesserakt Ognia (commit 72edc11, staging)
- ✅ Pisownia „Tesserakt” (2×s) w całej stronie + adres `/tesserakt-ognia` (stary przekierowuje)
- ✅ Prawdziwy mail/telefon/adres też na /kontakt i w menu mobilnym

### Otwarte pytania
- (brak) — logo potwierdzone jako OK (2026-11-24)

### Do wysłania
- ⏳ Zmiany z pkt 4, 5, 6, 7, 9 i Tesserakt — tylko lokalnie, czekają na commit + push na staging.

## Dziennik
| Data | Część | Co zrobione |
|---|---|---|
| 2026-11-24 | 3.3 / 3.4 | Film → Tesserakt, usunięta Droga Kapelusznika, O nas, stopka, pisownia Tesserakt, Kompleksowa realizacja, Nasze realizacje (YT), Zaufali nam |
