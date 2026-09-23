// Settori serviti. `inEvidenza` = settori da spingere (meno saturi di offerta).
// Le frasi sono bozze da approvare con Pasquale; le pagine /settori/<slug> arrivano nella fase Settori.
const settori = [
  {
    slug: 'dark-kitchen',
    foto: '/img/settori/dark-kitchen.webp', // ponytail: segnaposto (cucina Viù), serve una foto di dark kitchen vera
    nome: 'Dark kitchen',
    frase: 'Tecnologia e organizzazione per chi entra nel delivery.',
    inEvidenza: true,
    // copy da approvare. Fonte: intervista 23/09/2026. Nessun caso realizzato: non citare clienti.
    pagina: {
      titolo: 'Dark kitchen pensate per il delivery.',
      intro:
        'Una cucina che lavora solo per le consegne ha ritmi, spazi e numeri diversi da un ristorante. La progettiamo attorno ai picchi degli ordini: disposizione, tecnologie, organizzazione e assistenza.',
      hero: '/img/settori/dk-linea-cottura.webp',
      capitolo: {
        titolo: 'Cosa cambia quando si cucina solo per le consegne.',
        foto: '/img/settori/dk-ritiro.webp',
        voci: [
          [
            'Picchi concentrati',
            'Gli ordini arrivano in poche ore: la cucina deve reggere il venerdì sera senza essere sovradimensionata il resto della settimana.',
          ],
          [
            'Più menù, uno spazio',
            'Nello stesso locale possono convivere più marchi e più piattaforme di consegna, ognuno con i suoi tempi.',
          ],
          [
            'Spazi ridotti',
            'Locali piccoli, a volte senza affaccio: aspirazione e climatizzazione diventano decisive per chi ci lavora.',
          ],
          [
            'Il piatto deve viaggiare',
            'Preparazione anticipata e rigenerazione contano quanto la cottura, perché il piatto arrivi come è uscito.',
          ],
        ],
      },
      offerta: {
        titolo: 'Cosa facciamo per una dark kitchen.',
        voci: [
          [
            'Layout e flussi',
            'Postazioni per marchi e piattaforme, percorsi separati per rider e cucina, spazi dimensionati sui picchi degli ordini.',
          ],
          [
            'Cottura rapida',
            'Forni combinati, cottura accelerata, abbattitori, sottovuoto e rigenerazione: produci in anticipo e servi in pochi minuti.',
          ],
          [
            'Organizzazione e formazione',
            'Processi di produzione e formazione del personale sulle tecnologie, per aprire con un servizio già rodato.',
          ],
          [
            'Impianti e assistenza',
            'Aspirazione, climatizzazione e impianti; poi manutenzione programmata e ricambi disponibili in sede.',
          ],
        ],
      },
      prova: {
        titolo: 'Vedi le tecnologie al lavoro prima di scegliere.',
        testo:
          'Nel nostro showroom di Alberobello trovi in funzione forni combinati e sistemi di cottura rapida. Portaci il tuo menù: ragioniamo insieme su cosa ti serve davvero.',
        foto: '/img/settori/dk-showroom-forni.webp',
      },
    },
  },
  {
    slug: 'laboratori',
    foto: '/img/settori/laboratori.webp',
    nome: 'Laboratori di trasformazione alimentare',
    frase:
      'Layout, flussi di lavoro, conservazione e confezionamento per chi trasforma materie prime.',
    inEvidenza: true,
    // copy da approvare. Fonte: intervista 23/09/2026. NO supporto autorizzazioni sanitarie, NO sanificazione.
    pagina: {
      titolo: 'Laboratori di trasformazione, progettati per produrre.',
      intro:
        'Dal layout delle zone di lavorazione alla conservazione del prodotto finito: progettiamo e attrezziamo laboratori per chi trasforma materie prime.',
      hero: '/img/settori/laboratori.webp',
      capitolo: {
        titolo: 'Per chi trasforma.',
        elenco: [
          'Carne e salumi',
          'Pasticceria e panificazione',
          'Gastronomia e ittico',
          'Agroalimentare e conserve',
        ],
        nota: 'Stiamo iniziando a lavorare anche con frantoi e settore oleario.',
      },
      offerta: {
        titolo: 'Cosa facciamo per un laboratorio.',
        voci: [
          [
            'Progetto del layout',
            'Zone di lavorazione, percorsi delle materie prime e del prodotto finito, spazi per lavaggio e stoccaggio: il laboratorio disegnato attorno alla tua produzione.',
          ],
          [
            'Flussi di lavoro',
            'Consulenza per ottimizzare i passaggi tra ricevimento, lavorazione, cottura e confezionamento.',
          ],
          [
            'Conservazione e confezionamento',
            'Abbattimento, celle, sottovuoto e atmosfera protettiva, etichettatura del prodotto finito.',
          ],
          [
            'Prove in sede',
            'Prove e showcooking nel nostro showroom di Alberobello, per vedere le attrezzature al lavoro prima di sceglierle.',
          ],
        ],
      },
      // Nomi dalle cartelle clienti in OneDrive: da verificare prima di pubblicarli.
      galleria: [
        {
          src: '/img/settori/lab-bufano-forno.webp',
          didascalia: 'Azienda agricola Bufano, laboratorio',
        },
        {
          src: '/img/settori/lab-conte.webp',
          didascalia: 'Laboratorio Conte, Alberobello',
        },
        {
          src: '/img/settori/lab-bufano-preparazione.webp',
          didascalia: 'Azienda agricola Bufano, zona preparazione',
        },
      ],
    },
  },
  {
    slug: 'ristoranti-pizzerie',
    foto: '/img/settori/ristoranti-pizzerie.webp',
    nome: 'Ristoranti e pizzerie',
  },
  {
    slug: 'bar-gelaterie-pasticcerie',
    foto: '/img/settori/bar-gelaterie-pasticcerie.webp',
    nome: 'Bar, gelaterie e pasticcerie',
  },
  {
    slug: 'hotel-ricevimenti',
    foto: '/img/settori/hotel-ricevimenti.webp',
    nome: 'Hotel e sale ricevimenti',
  },
  {
    slug: 'collettiva',
    foto: '/img/settori/collettiva.webp',
    nome: 'Ristorazione collettiva',
  },
  {
    slug: 'gdo-pescherie-macellerie',
    foto: '/img/settori/gdo-pescherie-macellerie.webp',
    nome: 'GDO, pescherie e macellerie',
  },
]

export default settori
