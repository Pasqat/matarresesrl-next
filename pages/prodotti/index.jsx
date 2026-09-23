import Head from 'next/head'
import Link from 'next/link'

import ContactForm from '../../components/Form/ContactForm'
import FormModal from '../../components/Form/FormModal'
import Layout from '../../components/Layout'
import Magnetic from '../../components/Magnetic'
import PageHero from '../../components/PageHero'
import BrandMarquee from '../../components/home/BrandMarquee'
import Testimonials from '../../components/home/Testimonials'
import CategoryChapter from '../../components/prodotti/CategoryChapter'
import PhotoCards from '../../components/prodotti/PhotoCards'
import StructuredData from '../../components/StructuredData'

import {logos} from '../../data/partner-logo'
import testimonials from '../../data/testimonials'
import {getGroups} from '../../lib/newsletter'
import {itemListSchema, breadcrumbSchema} from '../../lib/seo/schema'

const CATEGORIE_PRODOTTO = [
  'Cottura professionale',
  'Refrigerazione',
  'Macchinari agroalimentari',
  'Attrezzature per ristorazione',
  'Arredi su misura',
  'Forniture alberghiere e hotellerie',
  'Impianti di aspirazione',
  'Impianti di climatizzazione',
  'Sanificazione',
  'Lavaggio e lavanderia',
]

// Foto reali dei lavori esportate con scripts/media-export.mjs (public/img/prodotti).
// I testi delle categorie sono quelli della pagina precedente; gli alt sono copy da approvare.
const lavorazione = [
  {
    nome: 'Cottura',
    testo:
      'La cucina professionale è il cuore di ogni attività ristorativa. Estro, creatività e passione espressi attraverso soluzioni modulari e blocchi cottura per l’ottimizzazione del lavoro e degli spazi.',
    foto: '/img/prodotti/cottura.webp',
    alt: 'Blocco cottura con fuochi e piastre sotto la cappa di aspirazione',
  },
  {
    nome: 'Attrezzature',
    testo:
      'Piccole, medie e grandi attrezzature, selezionate tra i migliori marchi, sia per la preparazione dinamica (tritacarne, affettatrici, utensili, ecc) che per la preparazione statica (tavoli, lavelli, taglieri, ecc.) dei piatti',
    foto: '/img/prodotti/attrezzature.webp',
    alt: 'Cutter, taglieri e piano di lavoro in acciaio in un laboratorio',
  },
  {
    nome: 'Macchinari per l’agroalimentare',
    testo:
      'Dalla progettazione alla realizzazione di laboratori di trasformazione alimenti per le materie prime in tavola. Facilitiamo l’efficientamento del lavoro attraverso macchinari e soluzioni tecnologicamente avanzate.',
    foto: '/img/prodotti/agroalimentare.webp',
    alt: 'Laboratorio di gastronomia con impastatrice, armadi frigo e piani in acciaio',
  },
  {
    nome: 'Refrigerazione',
    testo:
      'La sicurezza alimentare passa dalla conservazione. Soluzioni altamente innovative per refrigerare a temperature differenziate si combinano perfettamente con il design di soluzioni espositive refrigerate.',
    foto: '/img/prodotti/refrigerazione.webp',
    alt: 'Armadi refrigerati in acciaio in una cucina professionale',
  },
]

const accoglienza = [
  {
    nome: 'Forniture alberghiere',
    testo:
      'Raffinati ed eleganti oppure dallo stile minimal, il nostro showroom è ricco dei migliori utensili, accessori o dettagli per il tuo hotel. Dagli arredi su misura all’allestimento della cucina professionale, aiutiamo la tua struttura ricettiva ad esprimere ospitalità ed accoglienza attraverso l’innovazione tecnologica e il design.',
    foto: '/img/prodotti/forniture-alberghiere.webp',
    alt: 'Banco buffet illuminato nella sala colazioni di un hotel',
  },
  {
    nome: 'Attrezzature per bar',
    testo:
      'Una vasta gamma di utensili, attrezzature e strumenti necessari per la realizzazione di cocktail, colazioni e aperitivi di prim’ordine. Progettiamo e realizziamo i tuoi spazi per accogliere i clienti allestendo con tecnologia e design banconi bar attrezzati, moduli refrigerati, vetrine ecc.',
    foto: '/img/prodotti/bar.webp',
    alt: 'Bancone bar rivestito in ceramica con cristalleria sospesa',
  },
  {
    nome: 'Forniture per ristoranti, pizzerie e pasticcerie',
    testo:
      'Abbigliamento, pentole, porcellane, accessori per cucina, attrezzature elettriche e tanto altro per arredare ed equipaggiare la tua attività. Vieni a scoprire i dettagli speciali per una mise en place ed un arredamento che rispecchia il tuo stile.',
    foto: '/img/prodotti/pasticcerie.webp',
    alt: 'Banco vetrina e scaffali di una pasticceria',
  },
]

const arredi = [
  {
    nome: 'Arredi e complementi',
    testo:
      'Sedie, tavolini e decorazioni per interno o esterno, tutti scelti per il settore Ho.Re.Ca.',
    foto: '/img/prodotti/arredi-complementi.webp',
    alt: 'Sala di un bistrot con tavoli in legno e sedie colorate',
  },
  {
    nome: 'Arredi su misura',
    testo:
      'Qualunque sia il tuo stile di arredo, noi lo realizziamo su misura dei tuoi spazi.',
    foto: '/img/prodotti/arredi-su-misura.webp',
    alt: 'Banconi su misura in lavorazione nel laboratorio Matarrese',
  },
  {
    nome: 'Dehors',
    testo:
      'Soluzioni d’arredo pensate per gli spazi esterni del tuo ristorante, bar, pasticceria, pizzeria o gastronomia d’asporto.',
    foto: '/img/prodotti/dehors.webp',
    alt: 'Dehors con sgabelli e tavoli alti davanti a un locale',
  },
]

const aria = [
  {
    nome: 'Aspirazione',
    testo:
      'Riduci l’emissione di fumi e odori in cucina con impianti di aspirazione, reintegro e depurazione nel rispetto dei più alti standard qualitativi.',
    foto: '/img/prodotti/aspirazione.webp',
    alt: 'Cappe e canalizzazioni di aspirazione in una cucina professionale',
  },
  {
    nome: 'Climatizzazione',
    testo:
      'Impianti di climatizzazione estivi e invernali a fluido ed espansione diretta di qualsiasi dimensione, per ogni ambiente commerciale.',
    // ponytail: foto del vecchio sito a 1000 px; da sostituire con uno scatto recente di impianto finito.
    foto: '/img/climatizzazione-prodotti.jpg',
    alt: 'Unità esterne di climatizzazione su un tetto',
  },
]

// Sanificazione e lavanderia non hanno ancora foto reali nell'archivio: restano senza.
const igiene = [
  {
    nome: 'Sanificazione',
    testo:
      'Per i tuoi ambienti di lavoro scegli una sanificazione ambientale totale, sia dell’aria che delle superfici.',
  },
  {
    nome: 'Lavaggio',
    testo:
      'Soluzioni di lavaggio dal piccolo bar sino alla ristorazione collettiva. Macchine affidabili e tecnologiche, lavabicchieri, lavaoggetti, lavavassoi di ogni forma e dimensione.',
    foto: '/img/prodotti/lavaggio.webp',
    alt: 'Lavastoviglie a capote in acciaio con cestello',
  },
  {
    nome: 'Lavanderia',
    testo:
      'Allestiamo lavanderie professionali per hotel, residence, ristoranti, case di riposo, cliniche e ovunque si debba offrire un trattamento dei tessuti.',
  },
]

const salti = [
  ['#lavorazione', 'Lavorazione e conservazione'],
  ['#accoglienza', 'Accoglienza'],
  ['#trattamento-aria', 'Trattamento dell’aria'],
  ['#igiene', 'Igiene'],
]

export default function ProductsHome({groups}) {
  return (
    <>
      <Head>
        <title>Attrezzature horeca e forniture alberghiere</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/prodotti`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Cucine industriali, cucine professionali, arredamento per bar e ristoranti, impianti di aspirazione, attrezzature ristorazione e hotellerie"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Prodotti" />
        <meta
          property="og:description"
          content="Cucine professionali, arredamento bar, attrezzature, hotellerie"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/prodotti_og.webp`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/prodotti`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <StructuredData
        data={itemListSchema(
          'Categorie prodotto Matarrese srl',
          CATEGORIE_PRODOTTO,
        )}
      />
      <StructuredData
        data={breadcrumbSchema([{name: 'Prodotti', path: '/prodotti'}])}
      />
      <Layout navbarTransparent>
        {/* copy da approvare: sottotitolo e alt della foto di apertura */}
        <PageHero
          title="Ogni strumento, al posto giusto."
          intro="Attrezzature, arredi e impianti per cucine professionali, laboratori e locali ho.re.ca., scelti tra i marchi che conosciamo a fondo. Nel nostro showroom li vedi dal vivo."
          image={{
            src: '/img/prodotti/apertura-cottura.webp',
            alt: 'Linea di cottura in acciaio sotto la cappa, nella cucina di un albergo',
          }}
        >
          <Magnetic>
            <Link
              href="#contatti"
              className="cta-fiamma focus-visible:outline-fiamma"
            >
              Parla con un consulente
            </Link>
          </Magnetic>
          <nav
            aria-label="Categorie di prodotto"
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {salti.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="border-b border-inox/40 py-2 text-inox transition-colors hover:border-white hover:text-white focus-visible:outline-fiamma"
              >
                {label}
              </Link>
            ))}
          </nav>
        </PageHero>

        <CategoryChapter
          id="lavorazione"
          title="Prodotti per la lavorazione e conservazione degli alimenti"
          items={lavorazione}
        />

        <CategoryChapter
          id="accoglienza"
          titleId="perche-comprare-da-noi"
          title="Tutto per l’accoglienza"
          items={accoglienza}
          dark
          reverse
        >
          <div className="mt-24 border-t border-inox/25 pt-16 lg:mt-32">
            <h2 className="type-display max-w-[20ch] text-[clamp(30px,3.2vw,52px)]">
              Qualità e stile anche nei dettagli
            </h2>
            <PhotoCards items={arredi} dark className="mt-12" />
            <div className="mt-16">
              <Magnetic>
                <Link
                  href="/contatti"
                  className="cta-fiamma focus-visible:outline-fiamma"
                >
                  Visita il nostro showroom
                </Link>
              </Magnetic>
            </div>
          </div>
        </CategoryChapter>

        <section
          id="trattamento-aria"
          className="bg-calce text-ghisa"
          data-header="light"
          aria-labelledby="trattamento-aria-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <h2
              id="trattamento-aria-title"
              className="type-display max-w-[20ch] text-[clamp(32px,3.6vw,56px)]"
            >
              Lavora in un ambiente sano e confortevole
            </h2>
            <p className="mt-6 max-w-[56ch] text-lg text-acciaio">
              Gestiamo il microclima di cucine professionali, locali
              commerciali, laboratori alimentari e laboratori industriali
            </p>
            <PhotoCards items={aria} className="mt-14" />
            <div className="mt-16">
              <Magnetic>
                <FormModal
                  buttonText="Parla con un consulente"
                  size="medium"
                  withButton
                />
              </Magnetic>
            </div>
          </div>
        </section>

        <CategoryChapter
          id="igiene"
          title="Igiene e sanificazione"
          intro="Possiamo aiutarti a mantenere i tuoi ambienti puliti ed igienizzati"
          items={igiene}
          dark
        />

        {/* Fascia marchi */}
        <section
          className="border-b border-ghisa/10 bg-white text-ghisa"
          data-header="light"
          aria-labelledby="marchi-title"
        >
          <div className="site-shell pb-8 pt-16">
            {/* copy da approvare */}
            <h2
              id="marchi-title"
              className="type-display text-[clamp(24px,2.4vw,36px)]"
            >
              I marchi che trattiamo.
            </h2>
          </div>
          <div className="pb-16">
            <BrandMarquee logos={logos} />
          </div>
        </section>

        <section
          className="bg-calce text-ghisa"
          data-header="light"
          aria-labelledby="recensioni-title"
        >
          <div className="site-shell py-24 lg:py-32">
            {/* copy da approvare */}
            <h2
              id="recensioni-title"
              className="type-display text-[clamp(24px,2.4vw,36px)]"
            >
              Cosa dicono i clienti.
            </h2>
            <div className="mt-8">
              <Testimonials items={testimonials} />
            </div>
          </div>
        </section>

        <section
          className="bg-white text-ghisa"
          data-header="light"
          id="contatti"
          aria-labelledby="contatto-title"
        >
          <div className="site-shell grid gap-6 pb-10 pt-24 lg:grid-cols-12 lg:pt-32">
            <h2
              id="contatto-title"
              className="type-display text-[clamp(32px,3.6vw,56px)] lg:col-span-7"
            >
              Hai un progetto da realizzare o hai bisogno di informazioni?
            </h2>
            <p className="max-w-[40ch] text-acciaio lg:col-span-4 lg:col-start-9 lg:self-end">
              Completa questo modulo, un nostro consulente ti ricontatterà.
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
