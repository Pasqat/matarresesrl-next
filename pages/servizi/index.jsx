import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import ContactForm from '../../components/Form/ContactForm'
import FormModal from '../../components/Form/FormModal'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Magnetic from '../../components/Magnetic'
import MetodoFasi from '../../components/servizi/MetodoFasi'

import {getGroups} from '../../lib/newsletter'
import StructuredData from '../../components/StructuredData'
import {serviceListSchema, breadcrumbSchema} from '../../lib/seo/schema'

import heroImg from '../../public/img/servizi/cucina-movenpick.webp'
import gdoImg from '../../public/img/servizi/gdo-bistrot.webp'
import logoConsip from '../../public/img/logos/Consip_Logo.webp'
import logoAcquistinrete from '../../public/img/logos/acquistinrete.webp'
import logoMEF from '../../public/img/logos/Logo_mef.webp'

const SERVIZI = [
  {
    name: 'Consulenza',
    description:
      'I nostri esperti ti guidano nella scelta delle migliori soluzioni Ho.Re.Ca disponibili sul mercato.',
  },
  {
    name: 'Progettazione tecnica attività commerciali',
    description:
      'Ascoltiamo le tue idee e condividiamo la loro progettazione in anteprima.',
  },
  {
    name: 'Realizzazione arredi su misura',
    description:
      'Adattiamo gli arredi e scegliamo le attrezzature migliori per i tuoi ambienti.',
  },
  {
    name: 'Progettazione cucine professionali',
    description:
      "Organizziamo gli spazi della tua cucina per garantire l'ottimizzazione del lavoro e dei tempi di preparazione.",
  },
  {
    name: 'Formazione',
    description:
      'Offriamo soluzioni di formazione finanziata per la tua crescita professionale e quella dei tuoi collaboratori.',
  },
  {
    name: 'Assistenza tecnica e manutenzione',
    description:
      'Garantiamo assistenza tecnica qualificata e manutenzione delle attrezzature che scegli per la tua attività.',
  },
  {
    name: 'Progettazione impianti di climatizzazione',
    description:
      "Caldo o freddo, impostiamo la temperatura giusta all'interno della tua attività per il comfort tuo e dei tuoi clienti.",
  },
  {
    name: 'Progettazione impianti aspirazione',
    description:
      'Non sottovalutiamo la qualità negli ambienti di lavoro e ti proponiamo le soluzioni più innovative.',
  },
  {
    name: 'Consulenza su nuove tecnologie',
    description:
      'Da partner di progetti di Ricerca e Sviluppo studiamo le innovazioni in cucina, condividiamo e diffondiamo le nostre conoscenze.',
  },
]

// Il metodo è una sequenza vera: la numerazione è informazione (DESIGN.md).
// Gli id restano quelli della pagina precedente per non rompere eventuali link.
const FASI = [
  {
    id: 'consulenza-tecnica',
    titolo: 'Consulenza tecnica',
    testo: (
      <>
        <p>
          Ascoltiamo le idee del cliente per trasformarle in{' '}
          <strong>progetti reali.</strong>
        </p>
        <p>
          Che tu voglia <strong>aprire un ristorante</strong>, un{' '}
          <strong>bar</strong>, una <strong>gelateria</strong>, una{' '}
          <strong>pasticceria</strong>, una <strong>struttura ricettiva</strong>
          , noi ci impegniamo nella progettazione ottimizzando gli spazi,
          rendendoli funzionali e fruibili e adattando prodotti e tecnologie a
          qualsiasi esigenza.
        </p>
        <p>
          Dal laboratorio di 30 mq alla struttura ricettiva di 7800 posti letto,
          traduciamo le idee in opere finite delineando soluzioni
          personalizzate, dall’<strong>interior design</strong> alle
          attrezzature.
        </p>
      </>
    ),
  },
  {
    id: 'il-progetto',
    titolo: 'Il progetto',
    testo: (
      <>
        <p>
          Realizziamo disegni, calcoli e relazioni che determinano le forme e le
          dimensioni dell’arredo completo.
        </p>
        <p>
          Stabiliamo insieme a te i{' '}
          <strong>
            materiali, il modo di esecuzione, le esigenze costruttive
          </strong>
          , i reciproci impegni tra committente e costruttore, ne stimiamo il
          costo.
        </p>
        <p>
          Elaboriamo un <strong>rendering progettuale</strong> per darti una
          visione tridimensionale di come verrà eseguito il progetto prima di
          iniziare a operare.
        </p>
      </>
    ),
  },
  {
    id: 'iter-operativo',
    titolo: 'Iter operativo',
    testo: (
      <>
        <p>
          L’iter operativo da seguire per aprire un ristorante, un bar, una
          gelateria, una pasticceria o qualsiasi altra attività di ristorazione
          prevede:
        </p>
        <ol>
          <li>Pianta dettagliata del locale o sopralluogo</li>
          <li>Verifica della destinazione d’uso del locale</li>
          {/* Il tecnico sanitario lo incarica il cliente: non è un servizio Matarrese. */}
          <li>
            Incontro con il tuo tecnico sanitario di fiducia per il rilascio
            delle autorizzazioni
          </li>
          <li>Appuntamento con i nostri esperti per la progettazione</li>
        </ol>
      </>
    ),
  },
  {
    id: 'arredi-su-misura',
    titolo: 'Arredi su misura',
    testo: (
      <>
        <p>
          Per <strong>l’arredamento di ogni struttura</strong> ristorativa o
          alberghiera, nel nostro laboratorio tecnico un team di esperti
          sviluppa il progetto ideato da professionisti dell’
          <strong>interior design</strong> che puoi anche scegliere tu.
        </p>
        {/* copy da approvare: riscritta per coerenza (prima mescolava "tu" e "suoi") */}
        <p>
          Puoi seguire l’avanzamento dei lavori mentre l’idea diventa realtà e
          vedere realizzato, come lo desideri, il bar, il ristorante, la
          pasticceria, la gelateria o la struttura alberghiera che vuoi avviare.
        </p>
      </>
    ),
  },
  {
    id: 'coordinamento-lavori',
    titolo: 'Coordinamento lavori',
    testo: (
      <p>
        La realizzazione di un progetto è seguita costantemente dai tecnici
        supervisori che si occupano del coordinamento dei lavori affinché siano
        rispettati tutti i particolari nella fase di{' '}
        <strong>produzione di ogni elemento.</strong>
      </p>
    ),
  },
  {
    id: 'collaudo',
    titolo: 'Collaudo',
    testo: (
      <p>
        L’arredo viene consegnato e collocato nella sua destinazione operativa e
        collaudato prima dell’apertura dell’attività.
      </p>
    ),
  },
  {
    id: 'apertura',
    titolo: 'Apertura',
    // copy da approvare: prima era solo "Congratulazioni!"
    testo: (
      <p>Il locale è pronto ad accogliere i primi clienti. Congratulazioni!</p>
    ),
  },
]

const mepaLogos = [
  [logoAcquistinrete, 'Acquisti in rete PA', 'h-7'],
  [logoConsip, 'Consip', 'h-14'],
  [logoMEF, 'Ministero dell’Economia e delle Finanze', 'h-12'],
]

export default function Servizi({groups}) {
  return (
    <>
      <Head>
        <title>Servizi per le attività horeca</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/servizi/`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Progettazione tecnica, realizzazione arredi, impianti di climatizzazione, attrezzature ristorazione, assistenza tecnica, formazione"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Servizi" />
        <meta
          property="og:description"
          content="Progettazione tecnica, assistenza, formazione"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/prodotti_og.webp`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/servizi/`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <StructuredData data={serviceListSchema(SERVIZI)} />
      <StructuredData
        data={breadcrumbSchema([{name: 'Servizi', path: '/servizi'}])}
      />
      <Layout navbarTransparent>
        {/* copy da approvare: titolo e sottotitolo dell'apertura */}
        <PageHero
          title="Dal progetto all’assistenza."
          intro="Consulenza, progettazione, arredi su misura, impianti, formazione e assistenza tecnica per ristoranti, bar, pasticcerie, hotel, laboratori e GDO."
          image={{
            src: heroImg,
            alt: 'Cucina professionale in acciaio inox con cappa a isola',
            position: '50% 40%',
          }}
        >
          <Magnetic>
            <Link
              href="#contatti"
              className="cta-fiamma focus-visible:outline-white"
            >
              Parla con un progettista
            </Link>
          </Magnetic>
          <Link
            href="#metodo"
            className="border-b border-inox/60 py-2 text-inox hover:text-white focus-visible:outline-white"
          >
            Come lavoriamo
          </Link>
        </PageHero>

        {/* Capitolo chiaro: i servizi */}
        <section
          id="panoramica"
          className="bg-calce text-ghisa"
          data-header="light"
          aria-labelledby="servizi-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              {/* copy da approvare: titolo e introduzione */}
              <h2
                id="servizi-title"
                className="type-display text-[clamp(32px,3.6vw,56px)] lg:col-span-7"
              >
                Cosa facciamo per la tua attività.
              </h2>
              <p className="max-w-[48ch] text-acciaio lg:col-span-5">
                Le competenze che servono per aprire e far lavorare un locale
                ho.re.ca., dalla prima consulenza alla manutenzione.
              </p>
            </div>
            <ul className="mt-16 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
              {SERVIZI.map(s => (
                <li
                  key={s.name}
                  className="group relative border-t border-ghisa/15 pb-12 pt-7"
                >
                  <span
                    className="absolute -top-px left-0 h-0.5 w-10 bg-fiamma-testo transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                  <h3 className="type-display hyphens-auto text-[clamp(20px,1.8vw,26px)] leading-tight transition-transform duration-500 ease-out group-hover:translate-x-1.5 motion-reduce:transition-none">
                    {s.name}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-acciaio">
                    {s.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Capitolo scuro: il metodo in sequenza */}
        <MetodoFasi
          id="metodo"
          title="Il nostro metodo, fase per fase."
          intro="Dalla prima idea al collaudo: ogni progetto segue lo stesso percorso, con i nostri tecnici a seguirlo fino all’apertura."
          fasi={FASI}
        >
          {/* copy da approvare: titolo, introduzione e CTA del metodo */}
          <Link
            href="#contatti"
            className="inline-block border-b border-fiamma py-2 text-fiamma hover:text-white"
          >
            Inizia dalla consulenza
          </Link>
        </MetodoFasi>

        {/* Capitolo chiaro: demo delle attrezzature */}
        <section
          className="bg-calce text-ghisa"
          data-header="light"
          aria-labelledby="demo-title"
        >
          <div className="site-shell grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
            <div className="lg:col-span-8">
              {/* copy da approvare: titolo (il testo è quello di prima) */}
              <h2
                id="demo-title"
                className="type-display text-[clamp(28px,3.6vw,56px)]"
              >
                Prova le attrezzature prima di sceglierle.
              </h2>
              <p className="mt-6 max-w-[52ch] text-lg text-acciaio">
                Ti offriamo la possibilità di vedere in funzione le attrezzature
                ho.re.ca. che desideri conoscere.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Magnetic>
                <FormModal
                  buttonText="Richiedi una demo personalizzata"
                  withButton
                  title="Richiedi una demo personalizzata"
                />
              </Magnetic>
            </div>
          </div>
        </section>

        {/* Capitolo scuro: GDO */}
        <section
          id="gdo"
          className="bg-ghisa text-white [&_:focus-visible]:outline-fiamma"
          data-header="dark"
          aria-labelledby="gdo-title"
        >
          <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:items-center lg:py-32">
            <div className="lg:col-span-5">
              <h2
                id="gdo-title"
                className="type-display text-[clamp(32px,3.6vw,56px)]"
              >
                Servizi e allestimenti per la GDO
              </h2>
              <div className="mt-8 max-w-[48ch] space-y-5 text-lg text-inox">
                <p>
                  Progettiamo le aree ristoro dei grandi supermercati, librerie
                  e negozi.
                </p>
                <p>
                  Allestiamo il bar, arrediamo la sala, progettiamo e
                  realizziamo cucine per la grande distribuzione organizzata.
                </p>
                <p>
                  Mettiamo il cliente al centro garantendo le attrezzature più
                  innovative e gli arredi più confortevoli.
                </p>
              </div>
              {/* copy da approvare */}
              <Link
                href="#contatti"
                className="mt-10 inline-block border-b border-fiamma py-2 text-fiamma hover:text-white"
              >
                Parliamo del tuo punto vendita
              </Link>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-grafite lg:col-span-7">
              <Image
                src={gdoImg}
                alt="Area ristoro con bancone bar e tavoli all’interno di un supermercato"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Capitolo chiaro: pubblica amministrazione */}
        <section
          className="bg-calce text-ghisa"
          data-header="light"
          aria-labelledby="mepa-title"
        >
          <div className="site-shell grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
            <div className="lg:col-span-6">
              <h2
                id="mepa-title"
                className="type-display text-[clamp(28px,3vw,44px)]"
              >
                Siamo presenti anche su MePA.
              </h2>
              <p className="mt-5 max-w-[48ch] text-acciaio">
                Mercato Elettronico della Pubblica Amministrazione.
              </p>
            </div>
            <ul className="flex flex-wrap items-center gap-x-12 gap-y-8 lg:col-span-6 lg:justify-end">
              {mepaLogos.map(([src, alt, h]) => (
                <li key={alt}>
                  <Image src={src} alt={alt} className={`${h} w-auto`} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Chiusura: la chiamata al progetto */}
        <section
          id="contatti"
          className="bg-white text-ghisa"
          data-header="light"
          aria-labelledby="contatto-title"
        >
          <div className="site-shell grid gap-6 pb-10 pt-24 lg:grid-cols-12 lg:pt-32">
            <h2
              id="contatto-title"
              className="type-display text-[clamp(36px,4.4vw,72px)] lg:col-span-7"
            >
              {/* copy da approvare: titolo e testo di chiusura */}
              Raccontaci il tuo progetto.
            </h2>
            <p className="max-w-[40ch] text-acciaio lg:col-span-4 lg:col-start-9 lg:self-end">
              Completa il modulo: un nostro consulente ti ricontatterà.
            </p>
          </div>
          <div className="pb-24">
            <ContactForm groups={groups} compact />
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const groups = await getGroups()
  return {
    props: {
      groups,
    },
  }
}
