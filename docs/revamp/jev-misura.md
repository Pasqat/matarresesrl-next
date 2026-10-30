# Jev sulle foto del revamp: prima misura (30/10/2026)

**Esito: `usabile` non separa le foto scartate da quelle tenute, quindi il giro completo sull'indice
è fermo e `/dev/media` non è stato toccato.** `settore` e `tipo` invece funzionano, e `hero` ordina bene
le foto già tenute. Per andare avanti va ridisegnato l'uso, non rilanciato lo stesso giro.

## Come è stata fatta

- Campione: le 409 scelte di Pasquale in `data/media-selection.json` (363 scarta, 39 sezione, 7 hero;
  36 con settore). Nessun video.
- `node scripts/media-jev.mjs --solo-scelte`: anteprima di `/dev/media` → JPEG baseline (lato lungo
  ≤ 1568, bordo bianco sotto i 280 px) → una chiamata a `typesafe/jev-1.14` con cinque domande in
  italiano (`settore`, `tipo`, `usabile`, `hero`, `soggetto`).
- Lo state è l'immagine più un contesto fisso («foto dall'archivio di Matarrese S.r.l., attrezzature per
  la ristorazione professionale…»): **niente nome file né cartella**, che porterebbero il nome del
  cliente o le parole SEO e misurerebbero il nome, non la foto.
- «Tenuta» = hero o sezione (46). Base rate dello scarto: 363/409 = **0,888**.

## `usabile` contro scarta/tenuta

Si scarta se `usabile < soglia`. Precisione e richiamo sono calcolati sullo scarto.

| soglia | sotto soglia | precisione scarto | richiamo scarto | tenute (46) sotto soglia |
|---|---|---|---|---|
| 0,3 | 147 | 0,905 | 0,37 | 14 |
| 0,4 | 217 | 0,908 | 0,54 | 20 |
| 0,5 | 279 | 0,903 | 0,69 | 27 |
| 0,6 | 329 | 0,903 | 0,82 | 32 |
| 0,7 | 371 | 0,895 | 0,92 | 39 |
| 0,8 | 403 | 0,888 | 0,99 | 45 |

- Nessuna soglia batte il base rate di 0,888 (il massimo in tutto l'intervallo 0,2–0,8 è 0,916 a 0,35):
  ogni soglia che toglie foto scartate toglie foto tenute nella stessa proporzione.
- AUC (quota di coppie tenuta/scartata ordinate bene): **0,57** in tutto, **0,51 sulle locali** (come
  tirare una moneta), 0,60 sulle WordPress, 0,61 sulle sole fotografie (ambiente, persone, attrezzatura,
  evento).
- **Soglia consigliata: nessuna.** Un valore di `JEV_SOGLIA` scelto da questa tabella nasconderebbe
  foto buone quanto foto da scartare.

Perché fallisce: `usabile` misura la qualità tecnica (nitida, ben esposta, professionale), mentre lo
scarto di Pasquale riguarda soprattutto rilevanza, foto da catalogo, doppioni e marchio. Le scartate con
`usabile` più alto sono foto tecnicamente perfette ma da catalogo o di prova (esempi 5–7 sotto).
È la domanda a non corrispondere al criterio, più che il modello a non vedere.

## `settore` contro i 36 con settore

- **28 su 36 esatti**, **33 su 36** con il settore giusto fra i primi due.
- La confidenza discrimina: media 0,83 sui giusti, 0,66 sugli sbagliati.
- Confusioni: 3 degli 8 errori finiscono su «Bar, gelaterie, pasticcerie» (da hotel, GDO ed eventi); gli
  altri sono prodotti→GDO, prodotti→laboratori, bar→ristoranti, azienda→ristoranti e ristoranti→azienda.
  Gli errori verso il bar sono casi in cui il contesto non si vede: un bancone bar dentro un hotel, un
  bistrò dentro un supermercato, un corso di pasticceria. Lì l'etichetta di Jev è visivamente
  difendibile.

## `hero` sui 7 hero contro le 39 sezioni

La scala di `score` è a base zero (`legend` 0…4): il voto 1–5 è `score + 1`.

| voto (1–5, arrotondato) | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| hero (7) | 0 | 0 | 7 | 0 | 0 |
| sezione (39) | 0 | 17 | 22 | 0 | 0 |
| scarta (363) | 5 | 180 | 175 | 3 | 0 |

- I 7 hero stanno fra 2,7 e 3,3; le sezioni fra 1,5 e 3,4 (mediana 2,6).
- **Nessuna delle 409 arriva a 4** (massimo 3,73, una scartata): un filtro «hero ≥ 4» resterebbe vuoto.
- Fra le tenute `hero` ordina bene (hero contro sezione: AUC 0,83), ma fra tutte non trova le buone
  (tenute contro scartate: AUC 0,57).

## `tipo` a colpo d'occhio

| tipo | hero | sezione | scarta |
|---|---|---|---|
| ambiente | 5 | 14 | 83 |
| persone | 2 | 12 | 130 |
| attrezzatura | 0 | 10 | 57 |
| evento | 0 | 2 | 16 |
| prodotto | 0 | 0 | 42 |
| grafica | 0 | 1 | 26 |
| documento | 0 | 0 | 9 |

`prodotto`, `grafica` e `documento` insieme: 78 foto, **77 scartate** (precisione 0,99, ma solo il 21%
dello scarto). È il segnale di scarto più pulito della misura.

`soggetto` (box): confidenza mediana 0,12 e 83 box su 411 coprono quasi tutto il quadro: non serve.

## Esempi di errori

| # | id | scelta di Pasquale | Jev | cosa si vede |
|---|---|---|---|---|
| 1 | `wp:5614` | hero, hotel | bar (0,94) | bancone bar in acciaio e mosaico nella hall di un hotel |
| 2 | `local:26b49b1f9bea992f` | hero, GDO | bar (0,72) | bancone «Bistrò» dentro un supermercato Famila |
| 3 | `wp:2314` | sezione, eventi | bar (0,75) | corso di pasticceria: chef in toque che preparano macaron |
| 4 | `wp:3457` | sezione, prodotti | `usabile` 0,11 | dettaglio di un mobile con la targhetta Matarrese, foto un po' morbida |
| 5 | `local:5c43f1a35187c649` | sezione, ristoranti | `usabile` 0,12 | foto da telefono: attrezzi su una terrazza a strapiombo sul mare (Polignano) |
| 6 | `wp:2846` | scarta | `usabile` 0,82 | sgabello da catalogo su fondo bianco |
| 7 | `local:0d8403a3155000da` | scarta | `usabile` 0,82 | tavolino e sedia allestiti, cartella «prove» |
| 8 | `wp:2476` | scarta | `usabile` 0,81, hero 3,3, tipo attrezzatura | banner con il logo Matarrese sovrapposto: Jev non lo legge come grafica |

## Costo e tempo

- 411 chiamate, 0 errori, **$0,047** in tutto (circa $0,00011 a immagine, 2.700 token di media).
- 406 immagini in 2,1 minuti con 4 chiamate in parallelo.
- Giro completo stimato (circa 6.000 immagini restanti): circa $0,68 e un quarto d'ora; il collo di
  bottiglia sono i circa 1.400 download WordPress restanti, in serie con pausa, non Jev.

## Domande aperte

- Il giro completo ha senso solo con un uso diverso da quello previsto: scarto suggerito da `tipo`
  (prodotto, grafica, documento) invece che da `usabile`, `hero` come ordinamento relativo invece della
  soglia ≥ 4, `settore` con la sua confidenza.
- Le domande sono in italiano; Jev è addestrato soprattutto in inglese. Non è misurato quanto pesi.
- `usabile` andrebbe riformulato verso il criterio vero di Pasquale («adatta al revamp»: foto reale di
  un cliente, niente catalogo, niente logo sovrapposto) prima di ripetere la misura.
