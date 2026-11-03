import Head from 'next/head'

import ContactModal from '../../components/Form/ContactModal'
import Layout from '../../components/Layout'
import Magnetic from '../../components/Magnetic'
import HeroCinema from '../../components/cinema/HeroCinema'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import Image from 'next/image'
import chiusuraImg from '../../public/img/servizi/chiusura-cuoco.webp'
import BrandMarquee from '../../components/home/BrandMarquee'
import Testimonials from '../../components/home/Testimonials'
import CategoryChapter from '../../components/prodotti/CategoryChapter'
import PhotoCards from '../../components/prodotti/PhotoCards'
import StructuredData from '../../components/StructuredData'

import {logos} from '../../data/partner-logo'
import testimonials from '../../data/testimonials'
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
// I testi delle categorie sono quelli della pagina precedente.
const lavorazione = [
  {
    nome: 'Cottura',
    testo:
      'La cucina professionale è il cuore di ogni attività ristorativa. Blocchi cottura e soluzioni modulari per lavorare meglio e sfruttare ogni metro, lasciando spazio a estro e creatività.',
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
      'Dalla progettazione alla realizzazione di laboratori di trasformazione alimenti per le materie prime in tavola. Macchinari moderni per lavorare meglio e con meno fatica.',
    foto: '/img/prodotti/agroalimentare.webp',
    alt: 'Laboratorio di gastronomia con impastatrice, armadi frigo e piani in acciaio',
  },
  {
    nome: 'Refrigerazione',
    testo:
      'La sicurezza alimentare passa dalla conservazione. La temperatura giusta per ogni prodotto, anche in vetrine belle da vedere.',
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

export default function ProductsHome() {
  return (
    <>
      <Head>
        <title>
          Attrezzature horeca e forniture alberghiere | Matarrese srl
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/prodotti`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Attrezzature per cottura, refrigerazione, lavaggio e conservazione, forniture alberghiere e arredo bar. Marchi selezionati e assistenza post-vendita."
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
      <Layout navbarTransparent footerInvito={false}>
        <HeroCinema
          image="/img/prodotti/apertura-cottura.webp"
          alt="Linea di cottura in acciaio sotto la cappa, nella cucina di un albergo"
          objectPosition="50% 50%"
          eyebrow="Attrezzature · Arredi · Impianti · Showroom ad Alberobello"
          riga="Ogni strumento,"
          accento="al posto giusto."
          sottotitolo="Attrezzature, arredi e impianti per cucine professionali, laboratori e locali ho.re.ca., scelti tra i marchi con cui lavoriamo ogni giorno. Nel nostro showroom li vedi dal vivo."
          voci={salti.map(([href, label]) => [label, href])}
        >
          <Magnetic>
            <ContactModal variant="progetto" className="cin-btn">
              Parla con un consulente
              <Freccia />
            </ContactModal>
          </Magnetic>
        </HeroCinema>

        <CategoryChapter
          id="lavorazione"
          title={
            <>
              Prodotti per la lavorazione{' '}
              <span className="type-accento">
                e conservazione degli alimenti.
              </span>
            </>
          }
          items={lavorazione}
        />

        <CategoryChapter
          id="accoglienza"
          titleId="perche-comprare-da-noi"
          title={
            <>
              Tutto per <span className="type-accento">l’accoglienza.</span>
            </>
          }
          items={accoglienza}
          dark
          reverse
        >
          <div className="mt-24 border-t border-inox/25 pt-16 lg:mt-32">
            <TitoloDueTempi
              riga="Qualità e stile"
              accento="anche nei dettagli."
              className="text-[clamp(32px,3.6vw,52px)] !leading-none"
            />
            <PhotoCards items={arredi} dark className="mt-12" />
            <div className="mt-16">
              <Magnetic>
                <ContactModal
                  variant="info"
                  className="cin-btn"
                  title="Vieni a trovarci in showroom."
                  subtitle="Dicci quando preferisci passare ad Alberobello: ti facciamo trovare un consulente e le attrezzature che ti interessano."
                >
                  Visita il nostro showroom
                  <Freccia />
                </ContactModal>
              </Magnetic>
            </div>
          </div>
        </CategoryChapter>

        <section
          id="trattamento-aria"
          className="scroll-mt-20 bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="trattamento-aria-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <TitoloDueTempi
              id="trattamento-aria-title"
              tono="chiaro"
              riga="Lavora in un ambiente"
              accento="sano e confortevole."
              className="text-[clamp(36px,4.4vw,64px)] !leading-none"
            />
            <p className="mt-6 max-w-[56ch] text-lg text-acciaio">
              Gestiamo il microclima di cucine professionali, locali
              commerciali, laboratori alimentari e laboratori industriali
            </p>
            <PhotoCards items={aria} className="mt-14" />
            <div className="mt-16">
              <Magnetic>
                <ContactModal variant="progetto" className="cta-ghisa">
                  Parla con un consulente
                </ContactModal>
              </Magnetic>
            </div>
          </div>
        </section>

        <CategoryChapter
          id="igiene"
          title={
            <>
              Igiene <span className="type-accento">e sanificazione.</span>
            </>
          }
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
            <TitoloDueTempi
              id="marchi-title"
              tono="chiaro"
              riga="I marchi con cui"
              accento="lavoriamo ogni giorno."
              className="text-[clamp(30px,3.2vw,48px)] !leading-none"
            />
          </div>
          <div className="pb-16">
            <BrandMarquee logos={logos} />
          </div>
        </section>

        <section
          className="bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="recensioni-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <TitoloDueTempi
              id="recensioni-title"
              tono="chiaro"
              riga="Cosa dicono"
              accento="i clienti."
              className="text-[clamp(32px,3.6vw,56px)] !leading-none"
            />
            <div className="mt-8">
              <Testimonials items={testimonials} />
            </div>
          </div>
        </section>

        {/* Chiusura su foto, come nelle altre pagine: il modulo a passi sostituisce quello lungo */}
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
              riga="Hai un progetto"
              accento="o ti serve un’informazione?"
              className="text-[clamp(36px,5vw,72px)] !leading-none"
            />
            <div className="mt-10 flex flex-wrap justify-center gap-3.5">
              <ContactModal
                variant="progetto"
                source="prodotti-chiusura"
                className="cin-btn"
              >
                Parla con un consulente
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
