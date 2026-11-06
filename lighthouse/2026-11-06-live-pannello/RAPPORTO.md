# Lighthouse — sito pubblico dopo il passaggio al pannello

- **Data:** 6 novembre 2026, mattina, subito dopo il passaggio (main = `a49acfa`)
- **URL:** https://www.matarrese.it, contenuti dal pannello `cms.matarrese.it`
- **Strumento:** Lighthouse 12, Chrome headless, una run per pagina, stesse 7 pagine del 4/11
- **Nota di rete:** `cms.matarrese.it` forzato su 88.198.25.210 (il DNS dell'ufficio non lo conosce). Un primo giro senza la regola giusta è stato scartato: le foto del pannello non si caricavano.
- **Confronto con:** `../2026-11-04-live-wordpress` (stesso sito, contenuti da WordPress)

## Punteggi mobile (prestazioni / accessibilità / buone pratiche / SEO) e desktop

| Pagina | WordPress 4/11 | Pannello 6/11 | LCP mobile WP → pannello | Desktop WP → pannello |
|---|---|---|---|---|
| `/` | 64 / 97 / 100 / 100 | 61 / 100 / 100 / 100 | 6,1 → 9,4 s | 94 → 93 |
| `/news` | 77 / 100 / 100 / 100 | 74 / 100 / 100 / 100 | 5,7 → 5,9 s | 97 → 97 |
| `/news/abbattitore-…` | 80 / 95 / 100 / 100 | 79 / 99 / 100 / 100 | 5,0 → 5,1 s | 97 → 97 |
| `/eventi` | 85 / 100 / 100 / 100 | 76 / 100 / 100 / 100 | 4,1 → 4,4 s | 98 → 99 |
| `/realizzazioni/macelleria-tropiano` | 73 / 100 / 100 / 100 | 73 / 100 / 100 / 100 | 7,1 → 7,2 s | 94 → 95 |
| `/settori/ristoranti-pizzerie` | 78 / 100 / 100 / 100 | 81 / 100 / 100 / 100 | 5,3 → 4,9 s | 99 → 97 |
| `/contatti` | 75 / 100 / 100 / 100 | **85** / 100 / 100 / 100 | 6,3 → **4,3 s** | 96 → 99 |

## Lettura

- **Il passaggio non ha peggiorato il sito.** Prestazioni sostanzialmente pari: una run per pagina, differenze di 5–8 punti mobile sono variabilità (eventi −9 con TBT 125 ms, settore +3). SEO 100 ovunque, nessun errore in console.
- **Migliorati:** contatti (+10, foto dello showroom caricata subito), accessibilità home 97 → 100 e articolo 95 → 99 (etichette cookie in italiano, contrasto dei numeri dei settori).
- **Foto del pannello in cache per 30 giorni** (prima TTL 0). Lighthouse le segnala ancora perché suggerisce un anno.
- **Resta il problema di sempre:** su mobile l'LCP della home è il testo del banner cookie (render tardivo dopo l'idratazione), non il contenuto. È la prossima cosa da sistemare per alzare la home; il valore 9,4 s di questa run oscilla con il banner.
