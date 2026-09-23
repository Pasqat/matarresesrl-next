// Settori serviti. `inEvidenza` = settori da spingere (meno saturi di offerta).
// Frasi e pagine sono bozze da approvare con Pasquale; ogni settore con `pagina` ha /settori/<slug>.
const settori = [
  {
    slug: 'dark-kitchen',
    foto: '/img/settori/dk-ritiro.webp', // ponytail: cucina con ritiro (Coppino), non un caso dark kitchen: sostituire con una foto vera quando c'è
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

// Pagine degli altri settori. copy da approvare. Clienti citati: autorizzati da Pasquale il 23/09/2026.
// L'offerta usa solo servizi già dichiarati sul sito (progettazione, arredi su misura,
// attrezzature, aspirazione e climatizzazione, formazione, assistenza e ricambi).
const altrePagine = {
  'ristoranti-pizzerie': {
    titolo: 'Cucine per ristoranti e pizzerie che reggono il servizio.',
    intro:
      'Dalla linea calda al banco pizza, dalla sala al lavaggio: progettiamo la cucina attorno al tuo menù e al ritmo del tuo servizio.',
    hero: '/img/settori/ristoranti-pizzerie.webp',
    capitolo: {
      titolo: 'Ogni menù chiede una cucina diversa.',
      voci: [
        [
          'Il passe è il cuore',
          'Dalla disposizione delle partite dipendono i tempi di uscita dei piatti e la fatica della brigata.',
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
      titolo: 'Cosa facciamo per un ristorante.',
      voci: [
        [
          'Progetto della cucina',
          'Layout delle partite, del passe e del lavaggio, con disegni tecnici e rendering prima di costruire.',
        ],
        [
          'Attrezzature',
          'Cottura, refrigerazione, forni per pizza e lavaggio, scelti tra i marchi che conosciamo a fondo.',
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
    titolo: 'Banchi e laboratori per bar, gelaterie e pasticcerie.',
    intro:
      'Il banco che vende e il laboratorio che produce: li progettiamo insieme, perché l’uno regge l’altro.',
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
      titolo: 'Cosa facciamo per un bar o una pasticceria.',
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
    titolo: 'Cucine e servizi per hotel e sale ricevimenti.',
    intro:
      'Colazioni, ristorante, banchetti: volumi che cambiano ogni giorno. Progettiamo cucine e spazi di servizio che reggono tutto il calendario.',
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
      'Mense, centri cottura, strutture che servono molti pasti ogni giorno: progettiamo cucine affidabili, efficienti e semplici da gestire.',
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
          'Una cucina ferma lascia senza pasto chi aspetta: manutenzione e ricambi contano.',
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
      'Dal banco servito al laboratorio retrostante, fino alle aree ristoro dentro i punti vendita: progettiamo spazi che vendono e producono.',
    hero: '/img/settori/gdo-pescherie-macellerie.webp',
    capitolo: {
      titolo: 'Il prodotto fresco va mostrato e protetto.',
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
for (const s of settori) s.pagina ??= altrePagine[s.slug]

export default settori
