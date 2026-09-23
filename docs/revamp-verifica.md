# Revamp Matarrese — verifica locale

Branch: `codex/revamp-matarrese`, creato da `main` aggiornato a `b42620f`.
Merge preesistente riconciliato in `559b164`, riportato sul branch dedicato in `e48083a`.
Nessun push e nessuna pubblicazione. Le credenziali restano in `.env.local`, escluso da Git.

## Implementazione

- Home fotografica, navigazione desktop/mobile, footer e sistema comune di tipografia, pulsanti, immagini e moduli.
- Pagine interne, archivi, dettagli di realizzazioni/news/eventi, accesso e anteprime allineati al sistema grafico.
- Pages Router, Tailwind, WordPress headless, URL, redirect, metadati e dati strutturati conservati. Sitemap rigenerata.
- Filtri disponibili anche su mobile; paginazione corretta; stato vuoto e immagini assenti gestiti.
- Ricerca allineata al centro. Condivisione sempre visibile, quadrato trasparente da 44 px che si espande in hover/focus; conferma o errore della copia annunciati.
- Nessuna variazione dei contratti di contatto, Resend/Odoo, MailerLite e prenotazioni eventi.
- Fotografie esistenti. Percorso e qualità degli ulteriori materiali dell’utente: `// da verificare`.

## Controlli eseguiti

```powershell
node node_modules/eslint/bin/eslint.js .
node scripts/check-revamp.cjs
node node_modules/next/dist/bin/next build
node node_modules/next-sitemap/bin/next-sitemap.mjs
```

Build di produzione: 210 pagine generate. Il backend WordPress viene interrogato con un solo worker per evitare il limite di risorse dell’hosting.

Lo script di verifica usa Node, React e il compilatore già installati, senza dipendenze aggiuntive. Simula tutte le chiamate esterne: validazione, errori e conferme dei moduli contatto, newsletter, assistenza e prenotazioni; Resend, Odoo e MailerLite; copia negli appunti riuscita/rifiutata; archivi vuoti; immagine assente; mappa senza chiave; anteprima senza sessione o senza articolo. Non effettua richieste esterne. È una verifica dei flussi applicativi con hook simulati, non un test completo del browser.

Controllo nel browser sulle 13 pagine principali a 390, 768, 1440 e 1920 px: nessuno scorrimento orizzontale. Ispezionate visivamente home, prodotti, servizi, azienda, contatti e archivio realizzazioni; controllati ricerca senza risultati, filtro per titolo, galleria, menu mobile, chiusura con Escape e ritorno del focus. Un solo landmark principale; corretto il titolo h1 duplicato nei prodotti. Focus visibile e riduzione delle animazioni con `prefers-reduced-motion`.

Ricerca realizzazioni: margini misurati 72/72 px a 1440 e 22/22 px a 390. Pulsante condivisione: 44 px a riposo, 188 px al focus, sfondo trasparente.

## Confronto dimensioni

Dimensioni non compresse degli artefatti della build, prima/dopo; non sono misure di Core Web Vitals.

| Pagina | HTML prima | HTML dopo | JSON prima | JSON dopo |
| --- | ---: | ---: | ---: | ---: |
| Home | 136.632 B | 57.982 B | 29.558 B | 7.224 B |
| Realizzazioni | 134.171 B | 103.781 B | 78.059 B | 29.037 B |
| News | 268.805 B | 157.483 B | 204.971 B | 71.254 B |

Valori puntuali: `artifacts/build-comparison.json`. La baseline non aveva gruppi MailerLite disponibili: l’aumento di circa 1,2 KB dei JSON prodotti/servizi deriva dai gruppi ora caricati con le chiavi fornite. Immagini responsive ottimizzate da Next, priorità all’immagine iniziale, proporzioni e spazi riservati per limitare gli spostamenti del layout. LCP/CLS su dispositivo e rete reali: `// da verificare`; non è stata effettuata una misurazione comparativa controllata dei Core Web Vitals.

## Graphify

Graphify 0.9.56, estrazione AST locale `--code-only`, senza chiamate LLM.

- Prima del merge: 165 file di codice, 403 nodi, 1.001 relazioni; 22 file con errori di parsing dovuti ai conflitti. Grafo parziale conservato in `graphify-out/premerge/graph.json`.
- Base riconciliata: 164 file di codice, 533 nodi, 1.334 relazioni, senza gli errori sintattici dei conflitti.
- Grafo aggiornato del codice finale: `graphify-out/graph.json`, `graphify-out/GRAPH_REPORT.md`, `graphify-out/graph.html`.

Il grafo copre il codice supportato dal parser, non l’interpretazione semantica di foto, font e documenti, né lo stato remoto di WordPress e dei servizi. I collegamenti dinamici possono restare incompleti; i nodi isolati sono dichiarati nel report. Gli artefatti di analisi sono locali e ignorati da Git.

## Limiti ambientali

Google Maps non autentica nell’anteprima locale: il componente mostra indirizzo e collegamento alle indicazioni senza lasciare un riquadro di errore visibile. Configurazione della chiave e autorizzazione del dominio locale nel progetto Google: `// da verificare`. Gestione dell’errore tramite la callback documentata da [Google Maps](https://developers.google.com/maps/documentation/javascript/events#auth-errors).

Accesso WordPress e anteprime autenticate non esercitati con credenziali utente; verificati guard e rendering, preservata l’integrazione esistente. Invii reali deliberatamente esclusi. In una fase l’approvazione automatica dell’avvio locale è fallita per quota; il successivo avvio autorizzato è riuscito.

Avvio anteprima: `pnpm dev` oppure, dopo la build, `pnpm start` su `http://localhost:3000`.
