# Strategia SEO & GEO — matarrese.it

Documento operativo per migliorare il posizionamento del sito nelle ricerche
tradizionali (Google/Bing) e la **citabilità nelle risposte AI** (ChatGPT,
Perplexity, Google AI Overviews, Gemini, Claude). Diviso in: (1) interventi già
fatti sul sito, (2) azioni off-site da svolgere manualmente, (3) note GEO,
(4) roadmap funzionalità.

> Aggiornato: branch `feat/seo-geo-performance`. Le azioni off-site sono compiti
> dell'utente, non automatizzabili via codice.

---

## 1. Interventi on-page già implementati

- **Dati strutturati globali** (`lib/seo/schema.js`, iniettati in `Layout`):
  `Organization` + `LocalBusiness` con indirizzo, geo-coordinate, telefono,
  email, P.IVA, orari di apertura, `sameAs` social, membership ASSOGI, e
  `WebSite` con SearchAction. È il segnale più importante per la ricerca locale
  e per far capire alle AI "chi è" l'azienda.
- **Schema per pagina**: `BlogPosting` + `FAQPage` (news), `Event` (eventi),
  `CreativeWork` (realizzazioni), `ItemList`/`Service` (prodotti/servizi),
  `BreadcrumbList` sulle pagine interne.
- **Fix bug SEO**: pagina `/ricerca` non punta più in canonical a `/azienda`;
  corretto il meta `robots` malformato su news/eventi/realizzazioni; canonical e
  Open Graph resi coerenti e basati su dominio env; aggiunti tag Twitter.
- **`public/llms.txt` potenziato**: dati aziendali, servizi, categorie prodotto,
  marchi, R&D, contatti — i "fatti citabili" dalle AI.
- **Sitemap dinamica** (`next-sitemap.js`) con priorità/lastmod per-rotta e
  **robots.txt che consente esplicitamente i crawler AI** (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, ecc.).
- **Feed RSS** su `/feed.xml`.
- **Pagina `/faq`** con `FAQPage` schema (ottima per le risposte dirette delle AI).
- **Performance/accessibilità**: ottimizzazione immagini riattivata, hero/slider
  migrati a `next/image`, preload font, fix gerarchia heading, alt text e
  aria-label.

### Da completare a mano (contenuti)
- Verificare/aggiornare gli **orari di apertura** in `lib/seo/schema.js` se
  cambiano (devono combaciare con Google Business Profile e footer).
- Mantenere allineati i **marchi** citati tra `/faq`, `llms.txt` e materiale
  commerciale.

---

## 2. Azioni off-site (priorità alta → bassa)

### 2.1 Google Business Profile — LA leva #1 per il locale
Profilo gratuito che alimenta Maps e il pannello a destra nelle ricerche.
1. Rivendicare/verificare l'attività su https://www.google.com/business
2. Categoria principale: *Fornitore di attrezzature per la ristorazione* (+
   categorie secondarie: arredamento commerciale, riparazione elettrodomestici).
3. NAP **identico** al sito: `Matarrese srl — Contrada Popoleto, 70011
   Alberobello (BA) — +39 080 4323 431`.
4. Orari, foto dello showroom e dei lavori, descrizione, link al sito.
5. Pubblicare **Post** periodici (eventi, novità) e rispondere alle **recensioni**.
6. Attivare la sezione **Prodotti/Servizi**.

### 2.2 Bing Places & Apple Business Connect
- **Bing Places** (https://www.bingplaces.com): può importare i dati da Google.
  Bing alimenta anche le risposte di Copilot/ChatGPT.
- **Apple Business Connect** (https://businessconnect.apple.com): mappe Apple,
  rilevante per utenti iPhone.

### 2.3 Strumenti per webmaster
- **Google Search Console**: verificare il dominio e **inviare la sitemap**
  (`https://www.matarrese.it/sitemap.xml`). Monitorare query, copertura, Core
  Web Vitals.
- **Bing Webmaster Tools**: stessa cosa lato Bing.

### 2.4 Directory e citazioni (NAP consistency)
Iscriversi con dati **identici** (nome/indirizzo/telefono). La coerenza NAP è un
fattore di ranking locale.
- Pagine Gialle e PagineBianche (https://www.paginegialle.it)
- Virgilio / Tuttocittà
- **Europages** e **Kompass** (directory B2B internazionali, utili nel settore)
- Cylex, Hotfrog, iGlobal, Misterimprese
- Portali di categoria ho.re.ca. / forniture per ristorazione

### 2.5 Backlink di qualità
- Pagina del **consorzio ASSOGI** (scheda azienda con link).
- Pagine dei **marchi partner** (Lainox, Unox, Rational, Silko, Pedrali, Ciam,
  Qucino…): chiedere di essere elencati come rivenditore/assistenza per la Puglia.
- Pagine dei **progetti UE** (Flat Bread Mine / programma PRIMA): link dal sito
  del progetto e dei partner.
- **Stampa locale** e associazioni di categoria (Confcommercio, ecc.).
- Camera di Commercio / registro imprese.

### 2.6 Recensioni & reputazione
- Chiedere ai clienti soddisfatti recensioni su Google (incidono su ranking
  locale e fiducia). In futuro si potrà aggiungere `Review`/`AggregateRating`
  schema sul sito (vedi roadmap).

### 2.7 Entità & knowledge graph
- **Wikidata**: creare una voce per "Matarrese srl" con dati strutturati aiuta le
  AI e Google a riconoscere l'entità.
- **LinkedIn**: ottimizzare la pagina aziendale (descrizione, sito, settore,
  dipendenti, post regolari).

---

## 3. GEO — farsi citare dalle AI

I motori generativi citano fonti **chiare, fattuali e ben strutturate**. Cosa
conta (gran parte già implementata):
- **Dati strutturati** (schema.org) e **`llms.txt`**: spiegano l'entità alle AI.
- **Crawler AI consentiti** nel `robots.txt` (fatto). Senza questo, ChatGPT/
  Perplexity non possono leggere il sito.
- **Pagine FAQ** e contenuti che rispondono a domande precise ("come aprire un
  ristorante", "che attrezzatura serve per una gelateria"): sono il formato che
  le AI citano più volentieri. → Espandere il blog in questa direzione.
- **E-E-A-T** (esperienza, competenza, autorevolezza, affidabilità): valorizzare
  autori, anni di attività (dal 1983), casi studio (realizzazioni), progetti di
  ricerca. Aggiungere bio autore agli articoli.
- **Dati e contenuti originali** (es. risultati R&D, guide pratiche): le AI
  premiano le fonti primarie.
- **Coerenza dei fatti** tra sito, llms.txt, Google Business, directory: nomi,
  indirizzo, telefono, marchi.

Monitoraggio: cercare periodicamente "fornitore attrezzature ristorazione
Puglia", "arredo ristorante Alberobello", ecc. su Google (AI Overviews),
ChatGPT e Perplexity per verificare se e come il sito viene citato.

---

## 4. Roadmap funzionalità (proposte, prioritizzate)

| Priorità | Funzionalità | Valore | Effort |
|---|---|---|---|
| Alta | **Anti-spam form** (Cloudflare Turnstile/reCAPTCHA v3): oggi solo honeypot + rate-limit in-memory | Riduce spam/lead falsi | Basso |
| Alta | **Revalidate on-demand** (webhook WordPress → `/api/revalidate`): oggi i contenuti si aggiornano solo ogni 12-24h (ISR) | Contenuti aggiornati subito | Medio |
| Alta | **Espansione contenuti/FAQ & blog** orientati alle domande (guide pratiche) | SEO + GEO | Continuo |
| Media | **Versione inglese** (i18n Next.js + contenuti WP tradotti + hreflang) | Visibilità internazionale/AI | Alto |
| Media | **Ricerca site-wide** (oggi solo client-side su news/realizzazioni, eventi senza ricerca) — valutare API interna o Algolia/Meilisearch | UX | Medio/Alto |
| Media | **Schema recensioni** (`Review`/`AggregateRating`) collegato a Google reviews | Rich result + fiducia | Medio |
| Media | **Contenuti correlati per tag** + tempo di lettura + bio autore negli articoli | Engagement + E-E-A-T | Basso/Medio |
| Bassa | **Monitoraggio Core Web Vitals** (Vercel Speed Insights) | Performance | Basso |
| Bassa | **Dark mode** | UX | Medio |
| Valutare | **Pagina "Marchi trattati"** strutturata (non un e-commerce: il modello è B2B di consulenza/integrazione, quindi un catalogo con prezzi NON è necessario) | SEO brand | Basso |

### Note tecniche residue
- **Immagini su Vercel**: con l'ottimizzazione riattivata, monitorare le quote di
  *Image Optimization* su Vercel dopo il deploy (eventualmente CDN/limiti).
- **Analytics dopo consenso cookie**: GA/Pixel partono solo dopo l'accettazione
  (corretto per privacy); Plausible è sempre attivo.
