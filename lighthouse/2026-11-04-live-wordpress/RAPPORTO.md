# Lighthouse — sito live (contenuti da WordPress)

## 1. Condizioni della misura

| Voce | Valore |
|---|---|
| Data/ora | 4 novembre 2026, 20:27–20:33 (ora italiana); cartella nominata 2026-11-05 come richiesto |
| URL | https://www.matarrese.it (produzione, Vercel; contenuti da be.matarrese.it) |
| Lighthouse | 12.8.2 (`npx lighthouse@12`), Chrome headless (`--headless=new`) |
| Profili | mobile (default, throttling simulato) e desktop (`--preset=desktop`) |
| Categorie | performance, accessibility, best-practices, seo |
| Run | una per pagina e profilo; prima di ogni pagina una richiesta curl di riscaldamento |
| Esito HTTP | tutte le 7 pagine 200 al riscaldamento, nessun retry; nessun `runtimeError` |
| Robots | nessun header `x-robots-tag`; `is-crawlable`, `robots-txt`, `http-status-code` superati su tutte le pagine |

## 2. Punteggi e metriche

| Pagina | M perf | M a11y | M BP | M SEO | LCP (m) | CLS (m) | TBT (m) | D perf | D a11y | D BP | D SEO |
|---|---|---|---|---|---|---|---|---|---|---|---|
| home | 64 | 97 | 100 | 100 | 6,1 s | 0 | 120 ms | 94 | 97 | 100 | 100 |
| news | 77 | 100 | 100 | 100 | 5,7 s | 0 | 170 ms | 97 | 100 | 100 | 100 |
| articolo | 80 | 95 | 100 | 100 | 5,0 s | 0 | 30 ms | 97 | 95 | 100 | 100 |
| eventi | 85 | 100 | 100 | 100 | 4,1 s | 0 | 40 ms | 98 | 100 | 100 | 100 |
| realizzazione | 73 | 100 | 100 | 100 | 7,1 s | 0 | 30 ms | 94 | 100 | 100 | 100 |
| settore | 78 | 100 | 100 | 100 | 5,3 s | 0 | 10 ms | 99 | 100 | 100 | 100 |
| contatti | 75 | 100 | 100 | 100 | 6,3 s | 0 | 70 ms | 96 | 100 | 100 | 100 |

LCP desktop: home 1,6 s · news 1,3 s · articolo 1,2 s · eventi 1,0 s · realizzazione 1,6 s · settore 0,9 s · contatti 1,3 s.

## 3. Elemento LCP (mobile) e fasi

| Pagina | Elemento LCP | TTFB | Load Delay | Load Time | Render Delay |
|---|---|---|---|---|---|
| home | testo del banner cookie («Questo sito web utilizza alcuni cookie…», `div` con `flex: 1 0 300px`) | 695 ms | 0 | 0 | 5415 ms |
| news | `<img>` «Cucina professionale in masseria e agriturismo» (be.matarrese.it/…/2026/10/Cucina-professionale-in-masseria-e-agriturismo.jpg, 251 KiB, `fetchpriority="high"`) | 628 ms | 732 ms | 3257 ms | 1063 ms |
| articolo | testo del banner cookie | 631 ms | 0 | 0 | 4402 ms |
| eventi | testo del banner cookie | 634 ms | 0 | 0 | 3508 ms |
| realizzazione | testo del banner cookie | 635 ms | 0 | 0 | 6513 ms |
| settore | testo del banner cookie | 632 ms | 0 | 0 | 4689 ms |
| contatti | testo del banner cookie | 631 ms | 0 | 0 | 5702 ms |

In 6 pagine su 7 l'LCP mobile è il testo del banner cookie: tutto il tempo è Render Delay (il banner è disegnato lato client).

## 4. Problemi principali (deduplicati)

### Immagini sovradimensionate / formato non moderno (servite da be.matarrese.it in JPG, senza ottimizzazione)

| Pagina | Risparmio stimato (m / d) | Risorse principali |
|---|---|---|
| home | 1645 / 2321 KiB (responsive), 391 / 748 KiB (formato) | attrezzature-macelleria.jpg 471 KiB (−421), arredo-macelleria.jpg 304 KiB (−273); anche locali `/img/settori/rist-auraterrae.webp` 201 KiB (−166), `gdo-famila-banco.webp` 203 KiB (−163) |
| news | 715 / 2622 KiB, formato 340 / 999 KiB | come-aprire-una-gastronomia-in-pescheria.jpg 355 KiB (−306), Cucina-professionale-in-masseria-e-agriturismo.jpg 251 KiB (−218, è l'LCP), Riqualificazione-hotel-Bari-Movenpick.jpg 221 KiB (−191) |
| realizzazione | 1704 / 2023 KiB, formato 1028 / 1230 KiB | armadi-tecnologia-4.0.jpg 419 KiB (−375), armadio-climatico-stagionatura.jpg 397 KiB (−356), armadi-climatici-macelleria-moderna.jpg 389 KiB (−349), armadio-stagionatura-salumi.jpg 380 KiB (−340) |
| settore | 498 / 1340 KiB, formato 262 / 384 KiB | arredo-sala-ristorante.jpg 296 KiB (−259), blocco-cottura-cucina-professionale.jpg 207 KiB (−167), `/img/settori/dk-coppino-cucina.webp` 119 KiB (−73) |
| contatti | 180 / 147 KiB | `_next/static/immutable/media/showroom…webp` 167 KiB (−137); tile Google Maps |
| articolo | 52 / 262 KiB | come-scegliere-un-abbattitore-di-temperatura.png 107 KiB (−52) |
| eventi | 50 / 39 KiB | `sede-poster…webp` 99 KiB (−50) |

### Peso del video
- `/video/sede-960.mp4` 1349 KiB su mobile (home, eventi); `/video/sede-1920.mp4` ~4,8–4,9 MiB su desktop (home, eventi).
- Peso totale pagina: home 3896 KiB mobile / 8177 KiB desktop; eventi 5424 KiB desktop.

### Cache TTL
- Tutte le pagine: `/_vercel/speed-insights/script.js` TTL 31 giorni (5 KiB).
- Contatti: anche immagine Static Map di Google (TTL 1 giorno, 30 KiB).

### Preconnect
- Tutte le pagine: `https://plausible.io`, risparmio stimato 236–320 ms (mobile), 100–160 ms (desktop).
- Contatti: anche `https://maps.gstatic.com` (300 ms) e `https://maps.googleapis.com` (249 ms).

### Altro performance
- CSS non usato ~17–19 KiB, JavaScript legacy ~15 KiB: tutte le pagine.
- Contatti: JS non usato di Google Maps (main.js 35 KiB, util.js 22 KiB); `font-display` per font Roboto di Google Maps (risparmio stimato 130 ms FCP mobile).
- Home: `forced-reflow-insight` segnalato; TBT mobile 120 ms; news TBT 170 ms, DOM 1409 elementi.

### Accessibilità
| Audit | Pagine | Elemento |
|---|---|---|
| `label-content-name-mismatch` | tutte | `button#rcc-decline-button` (aria-label «Decline cookies») e `button#rcc-confirm-button` («Accept cookies») del banner cookie: testo visibile non incluso nel nome accessibile. Contatti: anche i pulsanti «Mostra cartina stradale» / «Mostra immagini satellitari» di Google Maps |
| `color-contrast` | home | 7 × `span.cin-num` dentro `a.group` (numerazione elenco): contrasto 2,6 (#de7c00 su #f3eee6, 13,5 pt) |
| `link-name` | articolo | 3 link della galleria WordPress (`div.prosa > figure.wp-block-gallery > figure.wp-block-image > a`) verso abbattitore-5-teglie.png, abbattitore-10-teglie.png, abbattitore-multifunzio…: senza testo accessibile |
| `heading-order` | articolo | `h4.wp-block-heading` dentro `div.prosa` (salto di livello nel contenuto WP) |

### Errori pagina
Nessuno: tutte le pagine 200, nessun errore di runtime Lighthouse, Best Practices 100 ovunque.
