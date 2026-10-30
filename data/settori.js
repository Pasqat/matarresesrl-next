// Settori serviti. `inEvidenza` = settori da spingere (meno saturi di offerta).
// Frasi e pagine sono bozze da approvare con Pasquale; ogni settore con `pagina` ha /settori/<slug>.
const settori = [
  {
    slug: 'dark-kitchen',
    foto: '/img/settori/dk-ritiro.webp', // ponytail: cucina con ritiro (Coppino), non un caso dark kitchen: sostituire con una foto vera quando c'è
    nome: 'Dark kitchen',
    frase: 'Tecnologia e organizzazione per chi entra nel delivery.',
    inEvidenza: true,
    // Fonte: intervista 23/09/2026. Nessun caso realizzato: non citare clienti.
    pagina: {
      titolo: 'La tua dark kitchen, pronta per il delivery.',
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
    // Fonte: intervista 23/09/2026. NO supporto autorizzazioni sanitarie, NO sanificazione.
    pagina: {
      titolo: 'Laboratori di trasformazione su misura della tua produzione.',
      intro:
        'Dalle zone di lavorazione alla conservazione del prodotto finito: progettiamo e attrezziamo il tuo laboratorio, qualunque materia prima trasformi.',
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
      // Clienti citabili: autorizzato da Pasquale il 24/09/2026.
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

// Pagine degli altri settori. Clienti citati: autorizzati da Pasquale il 23/09/2026.
// L'offerta usa solo servizi già dichiarati sul sito (progettazione, arredi su misura,
// attrezzature, aspirazione e climatizzazione, formazione, assistenza e ricambi).
const altrePagine = {
  'ristoranti-pizzerie': {
    titolo: 'Cucine per ristoranti e pizzerie, a misura del tuo servizio.',
    intro:
      'Dalla linea calda al banco pizza, dalla sala al lavaggio: progettiamo la cucina attorno al tuo menù e al ritmo del tuo servizio.',
    hero: '/img/settori/ristoranti-pizzerie.webp',
    capitolo: {
      titolo: 'Ogni menù chiede una cucina diversa.',
      voci: [
        [
          'Il passe è il cuore',
          'Dalla disposizione delle partite dipendono i tempi di uscita dei piatti e il lavoro della brigata.',
        ],
        [
          'Il forno detta i tempi',
          'In pizzeria il forno e il banco di stesura decidono quante pizze escono nell’ora di punta.',
        ],
        [
          'Sala e cucina parlano',
          'Percorsi di servizio e lavaggio pensati insieme evitano incroci e attese.',
        ],
      ],
    },
    offerta: {
      titolo: 'Cosa facciamo per un ristorante o una pizzeria.',
      voci: [
        [
          'Progetto della cucina',
          'Layout delle partite, del passe e del lavaggio, con disegni tecnici e rendering prima di costruire.',
        ],
        [
          'Attrezzature',
          'Cottura, refrigerazione, forni per pizza e lavaggio, scelti tra i marchi con cui lavoriamo ogni giorno.',
        ],
        [
          'Arredi su misura',
          'Banchi, sala e dehors realizzati nel nostro laboratorio.',
        ],
        [
          'Assistenza',
          'Installazione, collaudo, manutenzione e ricambi in sede.',
        ],
      ],
    },
    galleria: [
      {
        src: '/img/settori/rist-viu.webp',
        didascalia: 'Viù restaurant, Martina Franca',
      },
      {
        src: '/img/settori/rist-la-strega.webp',
        didascalia: 'La Strega ristorante',
      },
      {
        src: '/img/settori/rist-happy-burger.webp',
        didascalia: 'Happy Burger, Palagianello',
      },
    ],
  },
  'bar-gelaterie-pasticcerie': {
    titolo: 'Banconi bar e laboratori su misura per gelaterie e pasticcerie.',
    intro:
      'Il banco che accoglie i clienti e il laboratorio dove nasce il prodotto: li progettiamo insieme, perché l’uno regge l’altro.',
    hero: '/img/settori/bar-gelaterie-pasticcerie.webp',
    capitolo: {
      titolo: 'Vetrina davanti, produzione dietro.',
      voci: [
        [
          'Il banco vende',
          'Esposizione, temperature e ergonomia del banco fanno la differenza su ogni scontrino.',
        ],
        [
          'Il laboratorio produce',
          'Forni, abbattitori e piani di lavoro dimensionati sulla produzione di ogni giorno.',
        ],
        [
          'Tutto in pochi metri',
          'Spesso lo spazio è poco: ogni centimetro va disegnato.',
        ],
      ],
    },
    offerta: {
      titolo: 'Cosa facciamo per bar, gelaterie e pasticcerie.',
      voci: [
        [
          'Progetto',
          'Banco, laboratorio e percorsi, con rendering del locale finito.',
        ],
        [
          'Arredi su misura',
          'Banchi bar e vetrine realizzati nel nostro laboratorio.',
        ],
        [
          'Attrezzature',
          'Forni, abbattitori, refrigerazione e attrezzature per bar dei marchi che trattiamo.',
        ],
        [
          'Assistenza',
          'Installazione, collaudo, manutenzione e ricambi in sede.',
        ],
      ],
    },
    galleria: [
      {
        src: '/img/settori/bar-nardelli.webp',
        didascalia: 'Pasticceria Nardelli, Locorotondo',
      },
      {
        src: '/img/settori/bar-eniliva.webp',
        didascalia: 'Eniliva caffè, Bengasi',
      },
      {
        src: '/img/settori/bar-birroteca.webp',
        didascalia: 'Birroteca Pugliese',
      },
    ],
  },
  'hotel-ricevimenti': {
    titolo: 'Cucine e servizi per hotel, masserie e sale ricevimenti.',
    intro:
      'Colazioni, ristorante, banchetti: ogni giorno i numeri cambiano. Progettiamo cucine e spazi di servizio che ti accompagnano per tutta la stagione.',
    hero: '/img/settori/hotel-ricevimenti.webp',
    capitolo: {
      titolo: 'Più servizi sotto lo stesso tetto.',
      voci: [
        [
          'Volumi variabili',
          'Dalla colazione al banchetto da centinaia di coperti: la cucina deve adattarsi senza sprechi.',
        ],
        [
          'Tempi di servizio',
          'Preparazione anticipata, abbattimento e rigenerazione tengono insieme qualità e tempi.',
        ],
        [
          'Immagine dell’ospite',
          'Bar, sala e buffet sono parte dell’esperienza: arredi e attrezzature si vedono.',
        ],
      ],
    },
    offerta: {
      titolo: 'Cosa facciamo per un hotel.',
      voci: [
        ['Progetto', 'Cucine, office, bar e aree buffet progettati insieme.'],
        [
          'Attrezzature e forniture',
          'Cottura, refrigerazione, lavaggio, lavanderia e forniture alberghiere.',
        ],
        [
          'Impianti',
          'Aspirazione e climatizzazione per cucine e spazi comuni.',
        ],
        [
          'Assistenza',
          'Manutenzione programmata e ricambi in sede, per non fermarsi in alta stagione.',
        ],
      ],
    },
    galleria: [
      {
        src: '/img/settori/hotel-movenpick-cucina.webp',
        didascalia: 'Mövenpick Hotel, Bari',
      },
      {
        src: '/img/settori/hotel-palazzo-ceraselli.webp',
        didascalia: 'Palazzo Ceraselli, Martina Franca',
      },
      {
        src: '/img/settori/hotel-masseria-calongo.webp',
        didascalia: 'Masseria Calongo, Cisternino',
      },
    ],
    nota: 'Tra i lavori recenti anche Alvino Resort, Matera.',
  },
  collettiva: {
    titolo: 'Cucine per la ristorazione collettiva.',
    intro:
      'Mense, centri cottura, strutture che servono molti pasti ogni giorno: progettiamo cucine affidabili e semplici da gestire, giorno dopo giorno.',
    hero: '/img/settori/collettiva.webp',
    capitolo: {
      titolo: 'Molti pasti, ogni giorno.',
      voci: [
        [
          'Produzione in serie',
          'Grandi volumi e orari fissi: servono attrezzature pensate per produrre in quantità.',
        ],
        [
          'Percorsi netti',
          'Flussi separati tra materie prime, preparazione, distribuzione e lavaggio.',
        ],
        [
          'Continuità',
          'I pasti devono uscire ogni giorno: manutenzione e ricambi fanno la differenza.',
        ],
      ],
    },
    offerta: {
      titolo: 'Cosa facciamo per la ristorazione collettiva.',
      voci: [
        [
          'Progetto',
          'Layout della cucina e dei percorsi, con disegni tecnici e rendering.',
        ],
        [
          'Attrezzature',
          'Cottura, refrigerazione, abbattimento e lavaggio per grandi volumi.',
        ],
        ['Impianti', 'Aspirazione e climatizzazione.'],
        ['Assistenza', 'Manutenzione programmata e ricambi in sede.'],
      ],
    },
  },
  'gdo-pescherie-macellerie': {
    titolo: 'Banchi e laboratori per GDO, pescherie e macellerie.',
    intro:
      'Dal banco servito al laboratorio retrostante, fino alle aree ristoro dentro i punti vendita: progettiamo spazi dove il fresco si vende bene e si lavora meglio.',
    hero: '/img/settori/gdo-pescherie-macellerie.webp',
    capitolo: {
      titolo: 'Il fresco si vende con gli occhi.',
      voci: [
        [
          'Il banco vende',
          'Esposizione, luce e temperature del banco servito fanno la scelta del cliente.',
        ],
        [
          'Il laboratorio lavora',
          'Dietro il banco: sezionamento, preparazione e conservazione.',
        ],
        [
          'Ristoro nel punto vendita',
          'Bistrò e aree ristoro portano nuove occasioni di consumo in negozio.',
        ],
      ],
    },
    offerta: {
      titolo: 'Cosa facciamo per un punto vendita.',
      voci: [
        ['Progetto', 'Banchi, laboratori e aree ristoro progettati insieme.'],
        [
          'Banchi e refrigerazione',
          'Banchi refrigerati, celle e attrezzature per la lavorazione.',
        ],
        [
          'Arredi su misura',
          'Arredi e complementi realizzati nel nostro laboratorio.',
        ],
        ['Assistenza', 'Manutenzione e ricambi in sede.'],
      ],
    },
    galleria: [
      {
        src: '/img/settori/gdo-famila-bistro.webp',
        didascalia: 'Famila Bistrò, Bari',
      },
      {
        src: '/img/settori/gdo-pupillo.webp',
        didascalia: 'Pupillo gastronomia ittica, Bari',
      },
      {
        src: '/img/settori/gdo-macelleria-ivone.webp',
        didascalia: 'Macelleria Ivone',
      },
    ],
    nota: 'Tra le realizzazioni anche la Macelleria Tropiano.',
  },
}
// Title e meta description: separati dall'introduzione, che resta nel tono del sito.
// Una keyword principale per pagina, scelta sulle query di Search Console (maggio-ottobre 2026).
// `faq`: domande visibili in pagina e marcate come FAQPage. Solo fatti già dichiarati sul sito.
// `categorie`: slug delle categorie portfolio di WordPress da cui prendere le realizzazioni.
// `articoli`: [slug, titolo] delle news collegate (titoli verificati su WordPress il 29/10/2026).
const seo = {
  'dark-kitchen': {
    titolo: 'Progettazione di dark kitchen per il delivery',
    descrizione:
      'Dark kitchen progettate sui picchi degli ordini: layout per più marchi, cottura rapida, aspirazione e formazione. Prova i forni ad Alberobello.',
    faq: [
      [
        "Cos'è una dark kitchen?",
        'Una cucina che lavora solo per le consegne, senza sala: spesso ospita più marchi e più piattaforme nello stesso spazio.',
      ],
      [
        'Quali attrezzature servono?',
        'Forni combinati, cottura accelerata, abbattitori, sottovuoto e rigenerazione, per produrre in anticipo e servire in pochi minuti.',
      ],
    ],
    articoli: [
      [
        'levoluzione-delle-dark-kitchen-da-delivery-a-fornitori-per-la-ristorazione-moderna',
        'L’evoluzione delle dark kitchen: da delivery a fornitori per la ristorazione moderna',
      ],
      [
        'forno-senza-canna-fumaria-a-cottura-accelerata-cose-e-come-funziona',
        'Forno senza canna fumaria a cottura accelerata, cos’è e come funziona',
      ],
    ],
  },
  laboratori: {
    descrizione:
      'Progettiamo e attrezziamo laboratori di trasformazione alimentare per carne, pasticceria, conserve e prodotti agricoli: layout, flussi, abbattimento.',
    faq: [
      [
        'Per quali produzioni progettate laboratori?',
        'Carne e salumi, pasticceria e panificazione, gastronomia e ittico, agroalimentare e conserve. Stiamo iniziando a lavorare anche con i frantoi.',
      ],
      [
        'Vi occupate delle autorizzazioni sanitarie?',
        'No: progettiamo layout, flussi e attrezzature del laboratorio. Le pratiche sanitarie restano al consulente del cliente.',
      ],
    ],
    // da verificare: in WordPress la categoria laboratori-trasformazione-alimentare è vuota
    categorie: [
      'laboratori-trasformazione-alimentare',
      'caseifici',
      'panetterie',
    ],
    articoli: [
      [
        'laboratorio-trasformazione-alimenti-quali-macchinari-scegliere',
        'Laboratorio trasformazione alimenti: quali macchinari scegliere',
      ],
      [
        'abbattitore-di-temperatura-quale-scegliere-e-perche-e-utile',
        'Abbattitore di temperatura, quale scegliere e perché è utile',
      ],
      [
        'taglieri-haccp-nelle-cucine-professionali-e-nei-laboratori-alimentari-quali-scegliere',
        'Taglieri HACCP nelle cucine professionali e nei laboratori alimentari',
      ],
    ],
  },
  'ristoranti-pizzerie': {
    titolo: 'Progettazione di cucine per ristoranti e pizzerie',
    descrizione:
      'Progettiamo cucine professionali per ristoranti e pizzerie in Puglia: layout, forni, attrezzature, arredi su misura e assistenza in sede.',
    faq: [
      [
        'Potete progettare anche il banco pizza e scegliere il forno?',
        "Sì: disegniamo il banco di stesura attorno al forno, perché sono loro a decidere quante pizze escono nell'ora di punta. I forni si possono vedere in funzione nello showroom di Alberobello.",
      ],
      [
        'Realizzate anche gli arredi della sala?',
        'Sì: banchi, sala e dehors si fanno nel nostro laboratorio, insieme al progetto della cucina.',
      ],
      [
        "Cosa succede dopo l'apertura?",
        "Installazione, collaudo, manutenzione e ricambi in sede. In Puglia l'assistenza risponde di solito entro 48 ore dalla richiesta.",
      ],
    ],
    categorie: ['ristoranti', 'pizzerie'],
    articoli: [
      [
        'progettare-un-ristorante-come-gestire-gli-spazi',
        'Progettare un ristorante: come gestire gli spazi',
      ],
      [
        'progettazione-pizzeria-come-gestire-gli-spazi',
        'Progettazione pizzeria: come gestire gli spazi',
      ],
      [
        'samare-la-progettazione-di-una-cucina-dove-bonta-e-freschezza-sono-di-casa',
        'Samarè: la progettazione di una cucina dove bontà e freschezza sono di casa',
      ],
    ],
  },
  'bar-gelaterie-pasticcerie': {
    titolo: 'Banconi bar e arredi per gelaterie e pasticcerie',
    descrizione:
      'Banconi bar, vetrine e laboratori per gelaterie e pasticcerie, progettati e costruiti su misura nel nostro laboratorio di Alberobello.',
    faq: [
      [
        'Il bancone bar lo costruite voi?',
        'Sì: banconi bar e vetrine si realizzano nel nostro laboratorio, sul progetto del locale.',
      ],
      [
        'Ho poco spazio: riuscite a far stare banco e laboratorio?',
        'Nei locali piccoli ogni centimetro va disegnato: progettiamo banco, laboratorio e percorsi insieme e mostriamo il rendering del locale finito prima di costruire.',
      ],
      [
        'Posso provare forni e abbattitori prima di comprarli?',
        'Sì, nello showroom di Alberobello, con prove dedicate su appuntamento.',
      ],
    ],
    categorie: ['bar', 'gelaterie', 'pasticcerie'],
    articoli: [
      [
        'rivestire-un-bancone-bar-quali-materiali-scegliere',
        'Rivestire un bancone bar, quali materiali scegliere?',
      ],
      [
        'progettazione-e-arredamento-bar-su-misura',
        'Progettazione e arredamento bar su misura',
      ],
      [
        'attrezzature-per-bar-in-spazi-ridotti-come-scegliere-le-soluzioni-giuste',
        'Attrezzature per bar in spazi ridotti: come scegliere le soluzioni giuste',
      ],
      [
        'banco-gelateria-a-pozzetti-o-vetrina-a-vista',
        'Banco gelateria a pozzetti o vetrina a vista?',
      ],
    ],
  },
  'hotel-ricevimenti': {
    titolo: 'Attrezzature alberghiere e cucine per hotel',
    descrizione:
      'Attrezzature alberghiere, cucine, bar e aree buffet per hotel, masserie e sale ricevimenti in Puglia, con assistenza anche in alta stagione.',
    faq: [
      [
        'Seguite anche le masserie?',
        'Sì: tra i lavori ci sono Masseria Calongo a Cisternino e Masseria Auraterrae a Polignano a Mare.',
      ],
      [
        'Come regge la cucina il passaggio dalla colazione al banchetto?',
        'Con preparazione anticipata, abbattimento e rigenerazione: la cucina si dimensiona sul servizio più pesante senza sprechi nei giorni normali.',
      ],
      [
        "In alta stagione come funziona l'assistenza?",
        'Manutenzione programmata prima della stagione e ricambi in sede, per non fermarsi quando la struttura è piena.',
      ],
    ],
    categorie: ['masseria', 'sale-ricevimenti', 'bb', 'banqueting-catering'],
    articoli: [
      [
        'riqualificazione-hotel-bari-movenpick',
        'Far convivere storia e tecnologia: la sfida dietro il nuovo Mövenpick Hotel Bari',
      ],
      [
        'case-history-masseria-montenapoleone',
        'Case history: Masseria Montenapoleone',
      ],
      [
        'relais-il-santissimo-dove-i-sogni-diventano-realta-anche-in-cucina',
        'Relais Il Santissimo, dove i sogni diventano realtà anche in cucina',
      ],
    ],
  },
  collettiva: {
    titolo: 'Attrezzature per la ristorazione collettiva',
    descrizione:
      'Cucine per mense, RSA, scuole, ospedali e centri cottura: progetto dei flussi, attrezzature per grandi volumi, manutenzione programmata. Anche su MePA.',
    faq: [
      [
        'Vendete alla pubblica amministrazione?',
        'Sì, siamo presenti sul MePA.',
      ],
      [
        'Come si organizzano i flussi in una cucina collettiva?',
        'Con percorsi separati tra materie prime, preparazione, distribuzione e lavaggio, disegnati nel progetto prima di scegliere le attrezzature.',
      ],
      [
        'Se una macchina si ferma?',
        "Ricambi in magazzino e tecnici specializzati: in Puglia l'assistenza risponde di solito entro 48 ore.",
      ],
    ],
    articoli: [
      [
        'attrezzature-per-ristorazione-collettiva-guida-per-rsa-scuole-ospedali-e-centri-cottura',
        'Attrezzature per ristorazione collettiva: guida per RSA, scuole, ospedali e centri cottura',
      ],
    ],
  },
  'gdo-pescherie-macellerie': {
    titolo: 'Arredamento per macellerie, pescherie e supermercati',
    descrizione:
      'Arredamento per macellerie, pescherie e supermercati: banchi refrigerati, laboratori di sezionamento e aree ristoro, progettati e allestiti in Puglia.',
    faq: [
      [
        'Seguite anche il restyling di una macelleria storica?',
        'Sì: per esempio la Macelleria Ivone, passata da attività storica a punto vendita moderno.',
      ],
      [
        "Si può aggiungere un'area ristoro in negozio?",
        'Sì: progettiamo bistrò e aree ristoro dentro i punti vendita, come il Famila Bistrò di Bari.',
      ],
    ],
    categorie: ['macellerie', 'pescherie', 'gdo', 'bracerie', 'salumerie'],
    articoli: [
      [
        'arredamento-supermercati-e-gdo-novita-e-tendenze',
        'Arredamento supermercati, novità e tendenze',
      ],
      [
        'progettazione-e-arredamento-fish-bar-o-risto-pescherie',
        'Progettazione e arredamento fish bar o risto-pescherie',
      ],
      [
        'da-attivita-storica-a-punto-vendita-moderno-il-restyling-di-macelleria-ivone',
        'Da attività storica a punto vendita moderno: il restyling di Macelleria Ivone',
      ],
      [
        'trend-da-conoscere-prima-di-aprire-una-macelleria-moderna',
        'Trend da conoscere prima di aprire una macelleria moderna',
      ],
    ],
  },
}
for (const s of settori) {
  s.pagina ??= altrePagine[s.slug]
  s.seo = seo[s.slug] ?? {}
}

export default settori
