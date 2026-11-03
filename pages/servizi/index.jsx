import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import ContactModal from '../../components/Form/ContactModal'
import Layout from '../../components/Layout'
import Magnetic from '../../components/Magnetic'
import MetodoFasi from '../../components/servizi/MetodoFasi'
import HeroCinema from '../../components/cinema/HeroCinema'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import StructuredData from '../../components/StructuredData'
import {serviceListSchema, breadcrumbSchema} from '../../lib/seo/schema'

import heroImg from '../../public/img/servizi/cucina-movenpick.webp'
import gdoImg from '../../public/img/servizi/gdo-bistrot.webp'
import chiusuraImg from '../../public/img/servizi/chiusura-cuoco.webp'
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
      'Meno fumi e odori in cucina: un ambiente più sano per te e per chi lavora con te.',
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
          , progettiamo spazi comodi da vivere e da lavorare, con prodotti e
          tecnologie scelti per le tue esigenze.
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
          Elaboriamo un <strong>rendering progettuale</strong>, così vedi il tuo
          locale in 3D prima che inizino i lavori.
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
      <p>Consegniamo, montiamo e collaudiamo l’arredo prima dell’apertura.</p>
    ),
  },
  {
    id: 'apertura',
    titolo: 'Apertura',
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

export default function Servizi() {
  return (
    <>
      <Head>
        <title>Progettazione e servizi per locali horeca | Matarrese srl</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/servizi`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Consulenza, progettazione del layout, arredi su misura, coordinamento lavori e collaudo: seguiamo il tuo locale dall’idea all’apertura."
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
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/servizi`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <StructuredData data={serviceListSchema(SERVIZI)} />
      <StructuredData
        data={breadcrumbSchema([{name: 'Servizi', path: '/servizi'}])}
      />
      <Layout navbarTransparent headerCta={{}} footerInvito={false}>
        <HeroCinema
          image={heroImg}
          alt="Cucina professionale in acciaio inox con cappa a isola"
          objectPosition="50% 40%"
          eyebrow="Consulenza · Progetto · Arredi · Impianti · Assistenza"
          riga="Dall’idea all’apertura,"
          accento="e anche dopo."
          sottotitolo="Consulenza, progettazione, arredi su misura, impianti, formazione e assistenza tecnica per ristoranti, bar, pasticcerie, hotel, laboratori, GDO e non solo."
          voci={[
            ['I servizi', '#panoramica'],
            ['Il metodo in 7 fasi', '#metodo'],
            ['Demo in showroom', '#demo'],
            ['GDO e pubblica amministrazione', '#gdo'],
          ]}
        >
          <Magnetic>
            <ContactModal variant="progetto" className="cin-btn">
              Parla con un progettista
              <Freccia />
            </ContactModal>
          </Magnetic>
          <Link href="#metodo" className="cin-link whitespace-nowrap">
            Come lavoriamo
          </Link>
        </HeroCinema>

        {/* Capitolo chiaro: i servizi */}
        <section
          id="panoramica"
          className="bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="servizi-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <TitoloDueTempi
                id="servizi-title"
                tono="chiaro"
                riga="Cosa facciamo"
                accento="per la tua attività."
                className="text-[clamp(36px,4.4vw,64px)] !leading-none lg:col-span-7"
              />
              <p className="max-w-[48ch] text-acciaio lg:col-span-5">
                Le competenze che servono per aprire e far lavorare un locale
                ho.re.ca., dalla prima consulenza alla manutenzione.
              </p>
            </div>
            <ul className="mt-16 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
              {SERVIZI.map((s, i) => (
                <li
                  key={s.name}
                  className="group relative border-t border-ghisa/15 pb-12 pt-7"
                >
                  <span
                    className="absolute -top-px left-0 h-0.5 w-10 bg-fiamma-testo transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                  <span className="cin-num text-lg" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="type-display mt-3 hyphens-auto text-[clamp(20px,1.8vw,26px)] leading-tight transition-transform duration-500 ease-out group-hover:translate-x-1.5 motion-reduce:transition-none">
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
          title={
            <>
              <span className="block">Come nasce il tuo locale,</span>{' '}
              <span className="type-accento">passo dopo passo.</span>
            </>
          }
          intro="Dalla prima idea al collaudo, ogni progetto fa lo stesso percorso: i nostri tecnici ti accompagnano fino all’apertura."
          fasi={FASI}
        >
          <ContactModal variant="progetto" className="cin-btn">
            Inizia dalla consulenza
            <Freccia />
          </ContactModal>
        </MetodoFasi>

        {/* Demo delle attrezzature: card scura su carta, come l'evento in home */}
        <section
          id="demo"
          className="bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="demo-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <div className="grid gap-10 rounded-[28px] bg-[#121315] p-8 text-white md:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
              <div className="lg:col-span-8">
                <span className="eyebrow-cinema">
                  Nello showroom di Alberobello
                </span>
                <TitoloDueTempi
                  id="demo-title"
                  riga="Prova le attrezzature"
                  accento="prima di sceglierle."
                  className="mt-6 text-[clamp(32px,4vw,56px)] !leading-none"
                />
                <p className="mt-6 max-w-[52ch] text-lg text-[rgb(243_238_230/.75)]">
                  Ti offriamo la possibilità di vedere in funzione le
                  attrezzature ho.re.ca. che desideri conoscere.
                </p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <Magnetic>
                  <ContactModal
                    variant="info"
                    className="cin-btn"
                    title="Richiedi una demo personalizzata."
                    subtitle="Scegli tu il giorno: ti mostriamo al lavoro le attrezzature che vuoi conoscere, nello showroom di Alberobello."
                  >
                    Richiedi una demo
                    <Freccia />
                  </ContactModal>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>

        {/* Capitolo scuro: GDO */}
        <section
          id="gdo"
          className="bg-[#0d0e0f] text-white [&_:focus-visible]:outline-fiamma"
          data-header="dark"
          aria-labelledby="gdo-title"
        >
          <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:items-center lg:py-32">
            <div className="lg:col-span-5">
              <TitoloDueTempi
                id="gdo-title"
                riga="Servizi e allestimenti"
                accento="per la GDO."
                className="text-[clamp(36px,4.4vw,64px)] !leading-none"
              />
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
              <ContactModal
                variant="progetto"
                settore="GDO, pescherie e macellerie"
                className="cin-btn mt-10"
              >
                Parliamo del tuo punto vendita
                <Freccia />
              </ContactModal>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-grafite lg:col-span-7">
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
          className="bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="mepa-title"
        >
          <div className="site-shell grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
            <div className="lg:col-span-6">
              <TitoloDueTempi
                id="mepa-title"
                tono="chiaro"
                riga="Siamo presenti"
                accento="anche su MePA."
                className="text-[clamp(32px,3.4vw,48px)] !leading-none"
              />
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

        {/* Chiusura su foto, come in home: il modulo progetto a passi sostituisce il modulo lungo */}
        <section
          id="contatti"
          className="relative overflow-hidden py-28 text-center text-white md:py-40"
          data-header="dark"
          aria-labelledby="contatto-title"
        >
          <Image
            src={chiusuraImg}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0d0e0f]/[.8]" />
          <div className="site-shell relative max-w-[860px]">
            <TitoloDueTempi
              id="contatto-title"
              riga="Raccontaci"
              accento="il tuo progetto."
              className="text-[clamp(40px,5.8vw,88px)] !leading-none"
            />
            <p className="mx-auto mt-6 max-w-[34rem] text-[rgb(243_238_230/.75)]">
              Tre domande, meno di un minuto: un nostro progettista ti
              ricontatta e, se serve, viene nel locale per il sopralluogo.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3.5">
              <ContactModal
                variant="progetto"
                source="servizi-chiusura"
                className="cin-btn"
              >
                Parla con un progettista
                <Freccia />
              </ContactModal>
              <a href="tel:+390804323431" className="cin-btn cin-btn--ghost">
                Chiama +39 080 4323 431
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
