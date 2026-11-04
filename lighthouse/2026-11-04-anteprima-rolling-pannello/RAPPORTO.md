# Lighthouse — anteprima `rolling` con il pannello

- **Data:** 4 novembre 2026, sera
- **URL:** https://matarresesrl-next-git-rolling-pasquales-projects-931008a0.vercel.app (anteprima Vercel del ramo `rolling`, contenuti dal pannello `cms.matarrese.it`)
- **Strumento:** Lighthouse 12, Chrome headless, una run per pagina (home mobile ripetuta: 68 / LCP 8,2 s, conferma)
- **Nota di rete:** `cms.matarrese.it` forzato su 88.198.25.210 (il DNS dell'ufficio non lo conosce)
- **File:** `<pagina>-<mobile|desktop>.json` in questa cartella

## Punteggi (prestazioni / accessibilità / buone pratiche / SEO)

| Pagina | Mobile | LCP / CLS / TBT mobile | Desktop |
|---|---|---|---|
| `/` | 72 / 97 / 100 / 69 | 9,1 s / 0 / 50 ms | 95 / 97 / 100 / 69 |
| `/news` | 79 / 100 / 96 / 69 | 5,3 s / 0 / 110 ms | 97 / 100 / 96 / 69 |
| `/news/abbattitore-…` | 80 / 99 / 100 / 69 | 5,0 s / 0 / 40 ms | 97 / 99 / 100 / 69 |
| `/eventi` | 87 / 100 / 100 / 69 | 4,0 s / 0 / 20 ms | 98 / 100 / 100 / 69 |
| `/realizzazioni/macelleria-tropiano` | non misurata (504) | – | non misurata (504) |
| `/settori/ristoranti-pizzerie` | 82 / 100 / 100 / 69 | 4,6 s / 0 / 30 ms | 97 / 100 / 100 / 69 |
| `/contatti` | 85 / 100 / 100 / 69 | 4,3 s / 0 / 70 ms | 98 / 100 / 100 / 69 |

**SEO 69** solo per l'anteprima: Vercel invia `x-robots-tag: noindex` (audit `is-crawlable`). Nessun altro audit SEO fallisce.

**504** su realizzazioni e alcune news: il deploy misurato era costruito con `NEXT_PUBLIC_KIRBY_URL` solo su Production, quindi leggeva WordPress, che sotto la raffica del test superava i 10 s di Vercel. Sul deploy corretto (5/11) le stesse pagine rispondono in 0,7–1 s.

## Cosa pesa

1. **LCP = testo del banner cookie** su 5 pagine mobile su 6 (`div.cookie-banner > div`): render delay 93% (home 8,5 s, altre 3,4–4,4 s). Su `/news` l'LCP è la foto dell'articolo in evidenza.
2. **Foto più grandi del necessario** (unoptimized): risparmio stimato home 1.287 KiB mobile / 1.609 desktop, news 250 / 1.561, settore 246 / 845, contatti 137 / 147.
3. **Video in apertura:** `sede-960.mp4` 1.349 KiB su mobile; `sede-1920.mp4` ~4.770 KiB su desktop (home ed eventi).
4. **Nessuna cache sulle foto di `cms.matarrese.it/media`** (TTL 0): risparmio ripetuto home 375 KiB mobile, news 382 / 1.760.
5. **Manca il preconnect** a `https://cms.matarrese.it`: 250–360 ms mobile.
6. **Accessibilità:** pulsanti del banner cookie con `aria-label` inglese diverso dal testo («Declino», «Accetto tutti i cookies»); `span.cin-num` in home con contrasto 2,6 (#de7c00 su #f3eee6); alt ripetuti nelle card realizzazioni in home; `h4` dopo `h2` in un articolo.
7. **Minori:** foto LCP con `loading="lazy"` su contatti desktop; 18 KiB di CSS inutilizzato; 15 KiB di JS legacy.

Effetti della sola anteprima (non problemi del sito): toolbar `vercel.live` (preconnect, listener non passivi, cache).
