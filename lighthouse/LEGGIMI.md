# Rapporti Lighthouse

Una cartella per ogni misura: `RAPPORTO.md` (nel repo) e i JSON di Lighthouse (solo in locale, esclusi da git).

| Cartella | Cosa | Contenuti da |
|---|---|---|
| `2026-11-04-anteprima-rolling-pannello` | anteprima Vercel di `rolling` | pannello `cms.matarrese.it` |
| `2026-11-04-live-wordpress` | sito pubblico www.matarrese.it, **prima** del passaggio | WordPress |

**Prossimo confronto:** dopo il passaggio al pannello, rifare lo stesso giro sul sito pubblico
(stesse 7 pagine, mobile e desktop, Lighthouse 12, una run per pagina) in una cartella
`AAAA-MM-GG-live-pannello` e confrontarla con `2026-11-04-live-wordpress`.

Pagine: `/`, `/news`, `/news/abbattitore-di-temperatura-quale-scegliere-e-perche-e-utile`, `/eventi`,
`/realizzazioni/macelleria-tropiano`, `/settori/ristoranti-pizzerie`, `/contatti`.

Una sola run per pagina: differenze di 5–8 punti nelle prestazioni mobile possono essere variabilità.
