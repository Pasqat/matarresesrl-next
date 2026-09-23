# DESIGN.md — direzione visiva matarrese.it

Riferimento per ogni pagina del revamp premium (settembre 2026). Se una scelta qui non torna più, si
cambia qui prima che nel codice.

## Obiettivo
Alzare il prezzo percepito e far chiamare per un progetto. Pubblico: tutto l'ho.re.ca. (ristoranti,
pizzerie, bar, gelaterie, pasticcerie, hotel, sale ricevimenti, collettiva, GDO, pescherie) e in
evidenza **laboratori di trasformazione alimentare** e **dark kitchen**.

## Direzione: industriale tecnico di lusso, con respiro editoriale
- **Scuro** (ghisa) per aperture, tecnologia, dati: ingegneria, precisione, acciaio.
- **Chiaro** (calce) per progetti, storie, persone: luoghi finiti, luce, materia.
- L'alternanza scuro/chiaro è il ritmo della pagina. Mai due sezioni scure consecutive senza motivo.
- Il carattere viene dai materiali veri del mestiere (ghisa, inox satinato, fiamma, calce dei
  trulli), non da effetti decorativi.

## Colori (token in `styles/globals.css`, classi Tailwind tra parentesi)
| Token | Hex | Uso |
|---|---|---|
| `--ghisa` (`ghisa`) | #1e2226 | fondo scuro |
| `--grafite` (`grafite`) | #2b3136 | superfici rialzate su scuro |
| `--inox` (`inox`) | #c9ced2 | testo e filetti su scuro |
| `--inox-muted` (`inox-muted`) | #9aa3aa | testo secondario su scuro (6.2:1) |
| `--calce` (`calce`) | #f4f5f3 | fondo chiaro |
| `--acciaio-testo` (`acciaio`) | #5b646b | testo secondario su chiaro (5.5:1) |
| `--fiamma` (`fiamma`) | #de7c00 | arancio di brand: **solo su scuro** (5.3:1) o come fondo con testo ghisa |
| `--fiamma-testo` (`fiamma-testo`) | #995200 | arancio per testo su chiaro (5.4:1) |

Mai testo bianco su arancio (3:1). L'arancio è un segnale, non una superficie: una chiamata
all'azione per vista, qualche dettaglio.

## Tipografia
- **Display — Archivo, larghezza espansa** (`font-display`, `font-stretch: 125%`): titoli come le
  targhe incise delle attrezzature. Peso 500–600, interlinea stretta, maiuscole/minuscole normali.
- **Editoriale — Newsreader** (`font-serif`): citazioni dei clienti, racconti di progetto, pagina
  azienda. Mai per i titoli tecnici.
- **Testo — Matter** (`font-sans`): corpo e interfaccia.
- Scala (px, desktop → mobile via `clamp`): 14 · 16 · 18 · 21 · 24 · 32 · 44 · 64 · 96 · 128.
- Righe di testo sotto gli 80 caratteri (`max-w-prose` / `ch`).
- Da evitare: etichette in maiuscolo spaziato sopra ogni titolo, una parola del titolo in corsivo o
  colorata, numerazioni 01/02/03 su contenuti che non sono sequenze, `→` appeso a ogni link.

## Layout
- Contenitore: `.site-shell` (margini `--gutter`), griglia 12 colonne di `components/grid.jsx`.
- Breakpoint unici per il codice nuovo: Tailwind `md` 640 · `lg` 1024 · `xl` 1500.
  I media query di `styles/revamp.css` (760/1000/1150) sono legacy e spariscono man mano che le
  pagine vengono rifatte.
- Allineamento a sinistra; il centrato solo per brevi chiamate all'azione.
- Ogni pagina segue il racconto a capitoli: apertura → problema → come lavoriamo → prove (progetti)
  → chiamata al progetto. Una CTA leggera alla fine di ogni capitolo, una forte in fondo.

## Movimento (GSAP + `@gsap/react`, Lenis per lo scroll)
- Un solo momento orchestrato per pagina (l'apertura). Niente fade-in su ogni sezione.
- Video di apertura: loop corto, muto, compresso (mp4/webm) con poster, servito da Next/Vercel e
  caricato in modo differito; con `prefers-reduced-motion` solo il poster.
- Il movimento che risponde a un'azione (aprire, espandere, confermare) è sempre benvenuto.
- **Interazioni col puntatore** (richiesta di Pasquale, 23/09/2026): il sito deve "rispondere al
  mouse". Componenti già pronti da riusare: `components/Magnetic.jsx` (CTA che segue il cursore),
  luce che segue il cursore nell'apertura (`HomeHero`), anteprima foto che segue il cursore
  sugli elenchi (`home/SectorList`), cerchio "Scopri" sulle foto dei progetti (`home/ProjectGrid`),
  fascia marchi che si ferma al passaggio (`home/BrandMarquee`), "text roll" sulle voci di menu.
  Sempre solo con `(hover: hover) and (pointer: fine)` e senza movimento ridotto; su touch il
  contenuto deve restare completo (es. miniature al posto dell'anteprima che segue il cursore).
- Sempre rispettare `prefers-reduced-motion`: parallax, scrub e pin disattivati.

## Media
- Foto reali dei lavori (WordPress e archivio OneDrive, selezione in `data/media-selection.json`
  tramite `/dev/media`). Immagini AI solo per atmosfere e texture, mai presentate come lavori.
- Hero: minimo 1920 px di larghezza.

## Vincoli
- Il logo non si modifica senza approvazione esplicita di Pasquale.
- Form, API route, schema SEO e redirect non fanno parte del revamp visivo.
