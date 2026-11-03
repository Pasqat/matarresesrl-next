// Prodotti sul modello di /assistenza: apertura, famiglie in card che si impilano, i passi dalla
// scelta all'installazione, marchi, chiusura su foto. I testi delle famiglie vengono dalla pagina
// precedente, raggruppati; i passi usano solo fatti confermati da Pasquale (03/11/2026).
import {useRef} from 'react'
import Head from 'next/head'
import Image from 'next/image'

import ContactModal from '../../components/Form/ContactModal'
import Layout from '../../components/Layout'
import Magnetic from '../../components/Magnetic'
import BrandMarquee from '../../components/home/BrandMarquee'
import StructuredData from '../../components/StructuredData'
import HeroCinema from '../../components/cinema/HeroCinema'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import PilaCard from '../../components/cinema/PilaCard'
import Passi from '../../components/cinema/Passi'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import useRivela from '../../components/cinema/useRivela'

import {logos} from '../../data/partner-logo'
import {itemListSchema, breadcrumbSchema} from '../../lib/seo/schema'

import heroImg from '../../public/img/prodotti/apertura-cottura.webp'
import cotturaImg from '../../public/img/prodotti/cottura.webp'
import refrigerazioneImg from '../../public/img/prodotti/refrigerazione.webp'
import agroImg from '../../public/img/prodotti/agroalimentare.webp'
import barImg from '../../public/img/prodotti/bar.webp'
import arrediImg from '../../public/img/prodotti/arredi-su-misura.webp'
import aspirazioneImg from '../../public/img/prodotti/aspirazione.webp'
import showroomImg from '../../public/img/azienda/showroom-attrezzature.webp'
import chiusuraImg from '../../public/img/prodotti/arredi-piazza-grande.webp'

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

const famiglie = [
  {
    titolo: 'Cottura e preparazione',
    testo:
      'La cucina professionale è il cuore di ogni attività ristorativa. Blocchi cottura e soluzioni modulari per lavorare meglio e sfruttare ogni metro, lasciando spazio a estro e creatività.',
    voci: [
      'Blocchi cottura e soluzioni modulari',
      'Preparazione dinamica: tritacarne, affettatrici, utensili',
      'Preparazione statica: tavoli, lavelli, taglieri',
    ],
    immagine: cotturaImg,
    alt: 'Blocco cottura con fuochi e piastre sotto la cappa di aspirazione',
  },
  {
    titolo: 'Refrigerazione e conservazione',
    testo:
      'La sicurezza alimentare passa dalla conservazione. La temperatura giusta per ogni prodotto, anche in vetrine belle da vedere.',
    voci: [
      'Armadi e tavoli refrigerati',
      'Vetrine per esporre e conservare',
      'Conservazione per laboratori e cucine',
    ],
    immagine: refrigerazioneImg,
    alt: 'Armadi refrigerati in acciaio in una cucina professionale',
  },
  {
    titolo: 'Macchinari per l’agroalimentare',
    testo:
      'Dalla progettazione alla realizzazione di laboratori di trasformazione alimenti per le materie prime in tavola. Macchinari moderni per lavorare meglio e con meno fatica.',
    voci: [
      'Laboratori di trasformazione',
      'Macchinari per la lavorazione',
      'Conservazione del prodotto finito',
    ],
    immagine: agroImg,
    alt: 'Laboratorio di gastronomia con impastatrice, armadi frigo e piani in acciaio',
  },
  {
    titolo: 'Bar, sala e hotellerie',
    testo:
      'Banconi bar attrezzati, moduli refrigerati e vetrine per accogliere i clienti; utensili, porcellane e accessori per la mise en place; forniture per hotel e strutture ricettive.',
    voci: [
      'Banconi bar e attrezzature per cocktail e caffetteria',
      'Pentole, porcellane, abbigliamento e accessori',
      'Forniture alberghiere e buffet',
    ],
    immagine: barImg,
    alt: 'Bancone bar rivestito in ceramica con cristalleria sospesa',
  },
  {
    titolo: 'Arredi su misura e dehors',
    testo:
      'Qualunque sia il tuo stile di arredo, noi lo realizziamo su misura dei tuoi spazi: sedie, tavoli e complementi scelti per l’ho.re.ca., anche per gli spazi esterni.',
    voci: [
      'Arredi realizzati nel nostro laboratorio',
      'Sedie, tavolini e complementi',
      'Dehors per ristoranti, bar e pasticcerie',
    ],
    immagine: arrediImg,
    alt: 'Banconi su misura in lavorazione nel laboratorio Matarrese',
  },
  {
    titolo: 'Aria, lavaggio e igiene',
    testo:
      'Gestiamo il microclima di cucine, locali e laboratori: aspirazione, reintegro e depurazione dell’aria, climatizzazione, lavaggio e sanificazione degli ambienti.',
    voci: [
      'Aspirazione, reintegro e depurazione',
      'Climatizzazione estiva e invernale',
      'Lavaggio, lavanderia e sanificazione',
    ],
    immagine: aspirazioneImg,
    alt: 'Cappe e canalizzazioni di aspirazione in una cucina professionale',
  },
]

const passi = [
  [
    'Prova in showroom',
    'Vieni ad Alberobello e vedi le attrezzature al lavoro, prima di scegliere.',
  ],
  [
    'Scelta guidata',
    'Un consulente ti aiuta a scegliere modello e misura su menù, volumi e spazi.',
  ],
  [
    'La formula giusta',
    'Acquisto, noleggio, leasing o rate; e ti aiutiamo a capire quali agevolazioni puoi usare.',
  ],
  [
    'Installazione e formazione',
    'Le nostre squadre installano, e alla consegna formiamo il tuo personale.',
  ],
  [
    'Assistenza diretta',
    'Dopo, l’assistenza la fanno i nostri tecnici, formati dai produttori.',
  ],
]

export default function Prodotti() {
  const rivela = useRef(null)
  useRivela(rivela)
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
          image={heroImg}
          alt="Linea di cottura in acciaio sotto la cappa, nella cucina di un albergo"
          objectPosition="50% 50%"
          eyebrow="Attrezzature · Arredi · Impianti · Showroom ad Alberobello"
          riga="Ogni strumento,"
          accento="al posto giusto."
          sottotitolo="Attrezzature, arredi e impianti per cucine professionali, laboratori e locali ho.re.ca., scelti tra i marchi con cui lavoriamo ogni giorno. Nel nostro showroom li vedi dal vivo."
          voci={[
            ['Cottura e refrigerazione', '#famiglie'],
            ['Bar, sala e arredi', '#famiglie'],
            ['Aria e igiene', '#famiglie'],
            ['Dalla scelta all’installazione', '#come-scegliere'],
          ]}
        >
          <Magnetic>
            <ContactModal variant="progetto" className="cin-btn">
              Parla con un consulente
              <Freccia />
            </ContactModal>
          </Magnetic>
          <a href="#famiglie" className="cin-link whitespace-nowrap">
            Cosa trovi da noi
          </a>
        </HeroCinema>

        <div ref={rivela}>
          <section
            id="famiglie"
            className="scroll-mt-20 bg-[#0d0e0f] text-white"
            data-header="dark"
            aria-labelledby="famiglie-title"
          >
            <div className="site-shell pt-24 text-center md:pt-36">
              <span className="eyebrow-cinema" data-cin-reveal>
                Cosa trovi da noi
              </span>
              <TitoloDueTempi
                id="famiglie-title"
                riga="Dalla cucina alla sala,"
                accento="tutto in un posto."
                className="mx-auto mt-6 max-w-[18ch] text-[clamp(36px,5vw,72px)] !leading-none"
                data-cin-reveal
                style={{'--y': '40px'}}
              />
            </div>
            <PilaCard card={famiglie} />
          </section>

          <section
            id="come-scegliere"
            className="relative z-[1] -mt-12 scroll-mt-20 rounded-t-[32px] bg-[#121315] py-24 text-white md:rounded-t-[48px] md:py-36"
            data-header="dark"
            aria-labelledby="come-scegliere-title"
          >
            <div className="site-shell grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <span className="eyebrow-cinema" data-cin-reveal>
                  Come lavoriamo
                </span>
                <TitoloDueTempi
                  id="come-scegliere-title"
                  riga="Dalla scelta"
                  accento="all’installazione."
                  className="mt-6 text-[clamp(36px,5vw,72px)] !leading-none"
                  data-cin-reveal
                  style={{'--y': '40px'}}
                />
                <figure className="relative mt-9 aspect-[4/3] overflow-hidden rounded-[28px]">
                  <Image
                    src={showroomImg}
                    alt="Forni e attrezzature in esposizione nello showroom"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                  <figcaption className="cin-didascalia">
                    Lo showroom di Alberobello
                  </figcaption>
                </figure>
              </div>
              <div className="lg:col-span-7">
                <Passi passi={passi} />
                <dl className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow-cinema">Showroom</dt>
                    <dd className="mt-3 max-w-[40ch] text-inox">
                      Contrada Popoleto, n.c., 70011 Alberobello (BA)
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow-cinema">Orari</dt>
                    <dd className="mt-3 max-w-[40ch] text-inox">
                      Lunedì – venerdì, 09:00 – 13:00 / 15:00 – 18:30
                    </dd>
                  </div>
                </dl>
                <div className="mt-10">
                  <ContactModal
                    variant="info"
                    className="cin-btn"
                    title="Vieni a trovarci in showroom."
                    subtitle="Dicci quando preferisci passare ad Alberobello: ti facciamo trovare un consulente e le attrezzature che ti interessano."
                  >
                    Visita lo showroom
                    <Freccia />
                  </ContactModal>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Marchi: su bianco, la fascia usa mix-blend-multiply */}
        <section
          className="bg-[var(--carta)] py-16 text-ghisa lg:py-24"
          data-header="light"
          aria-labelledby="marchi-title"
        >
          <div className="site-shell">
            <div className="overflow-hidden rounded-[28px] bg-white">
              <div className="px-8 pb-8 pt-12 md:px-12 lg:px-16">
                <TitoloDueTempi
                  id="marchi-title"
                  tono="chiaro"
                  riga="I marchi con cui"
                  accento="lavoriamo ogni giorno."
                  className="text-[clamp(30px,3.2vw,48px)] !leading-none"
                />
              </div>
              <div className="pb-12">
                <BrandMarquee logos={logos} />
              </div>
            </div>
          </div>
        </section>

        {/* Chiusura su foto, come nelle altre pagine */}
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
