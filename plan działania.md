# Plan działania — przebudowa strony Kapelusznik

Start: 2026-11-24 · Gałąź: **staging** (nie main)

## Zasady
- 1 rozmowa = 1 część planu.
- Po skończeniu części → oznacz `[x]` + data.
- Plan to zarys. Szczegóły podaje użytkownik w trakcie danej części.
- Kolejność ustala użytkownik.
- Materiały klienta: `Plik_klienta/` (oryginały — tylko lokalnie, ignorowane przez git).

## 3. Strona główna — ✅ GOTOWE (2026-11-24), czekamy na 2 rzeczy od klienta

### ⏳ Czekamy na klienta
- [ ] **Opinie Google** — klient się zastanawia. Potrzebny link do wizytówki Google → wtedy przycisk „Wystaw nam opinię”.
- [ ] **Harry Potter** — link do filmu YT „Dzień Harry’ego Pottera w Bibliotece Gminnej w Pleszewie”. Teraz kafelek „Wkrótce” (`REALIZATIONS` w `AboutContent.tsx` → dopisać `youtubeId`).

### Zrobione
- [x] 3.1 Zaufali Nam — 22 loga, wąski przewijany pasek zaraz pod filmem (`frontend/public/images/zaufali/`)
- [x] 3.2 Zdjęcia — 15 zdjęć wg nazw od klienta (`frontend/public/images/home/`), galeria z powiększaniem. Odrzucone: „Jedyne takie warsztaty… 4” (Dawid)
- [x] 3.3 Read Me / 3.4 Zamysł:
  - usunięta „Droga Kapelusznika”
  - tło: film BBusking 0:10–2:32.6 (komputer, R2 `Video/bbusking_tlo_v3.mp4` — v3: gitarzysta na końcu max 3 s, bez białego błysku) / zdjęcie z porożem (telefon) — zmiana wizji użytkownika zamiast filmów+zdjęć
  - napis „Zamieniamy ulice w sceny” + tekst „Potrafimy zaskoczyć…”
  - O nas (tekst klienta), Warsztaty + żonglerka funkcjonalna
  - Kompleksowa realizacja imprez (kafelki usług, Bielska Scena Ognia, BBusking, galeria)
  - Nasze realizacje — 3 filmy YT (miniatura + ▶)
  - przycisk „Zamów występ” na dole
  - stopka: logo, dane firmy (NIP/REGON/KRS), kontakt, Facebook + YouTube

### Dodatkowo zrobione
- Film z ogniem przeniesiony na Tesserakt Ognia
- Pisownia „Tesserakt” (2×s) + adres `/tesserakt-ognia` (stary przekierowuje)
- Prawdziwy mail/telefon/adres też na /kontakt i w menu mobilnym
- Czcionki: nagłówki Fraunces, tekst Hanken Grotesk
- Stopka przebudowana wg dobrych praktyk: 4 kolumny równo od góry (logo+opis / Kontakt / Dane firmy: NIP, REGON, KRS w kolumnie / Social: Facebook, YouTube, Instagram), na dole ©

### Na później (zapas)
- Wszystkie 34 oryginalne zdjęcia z `Plik_klienta/strona główna/Zdjęcia/` są też na R2: `Zdjecia/strona-glowna/` (2026-11-24, 21 MB). Strona na razie korzysta ze zmniejszonych kopii w projekcie.
- 18 zdjęć bez opisu w `Plik_klienta/strona główna/Zdjęcia/` — do wykorzystania na innych podstronach.

## Dziennik
| Data | Część | Co zrobione |
|---|---|---|
| 2026-11-24 | 3. Strona główna | Cała strona główna wg materiałów klienta. Ostatni commit: c2b56ff (staging). |
