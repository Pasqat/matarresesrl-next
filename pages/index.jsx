import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import ContactForm from '../components/Form/ContactForm'
import HomeHero from '../components/home/HomeHero'
import SectorList from '../components/home/SectorList'
import ProjectGrid from '../components/home/ProjectGrid'
import BrandMarquee from '../components/home/BrandMarquee'
import Testimonials from '../components/home/Testimonials'
import {getGroups} from '../lib/newsletter'
import {getEvents} from '../lib/query/event'
import {getLastTwoProjects} from '../lib/query/project'
import {logos} from '../data/partner-logo'
import testimonials from '../data/testimonials'
import settori from '../data/settori'

// Foto dei lavori per l'apertura (scelte in /dev/media, esportate con scripts/media-export.mjs).
// ponytail: provvisorie, 4 su 5 precedenti al 2025; da sostituire con scelte recenti o col video della sede.
const heroSlides = [
  {
    src: '/img/home/piazza-grande.webp',
    caption: 'Piazza Grande',
    kind: 'bancone bar e arredi su misura',
    position: '60% 50%',
  },
  {
    src: '/img/home/pantaleo-cucina.webp',
    caption: 'Agrobistrot Pantaleo',
    kind: 'cucina professionale in servizio',
  },
  {
    src: '/img/home/masseria-paretano.webp',
    caption: 'Masseria Paretano',
    kind: 'progettazione della cucina',
  },
  {
    src: '/img/home/assistenza-tecnica.webp',
    caption: 'Assistenza tecnica',
    kind: 'manutenzione e ricambi',
    position: '70% 50%',
  },
  {
    src: '/img/home/salumeria-gourmet.webp',
    caption: 'La Salumeria Gourmet',
    kind: 'allestimento per la vendita',
    position: '50% 40%',
  },
]

// Il metodo è davvero una sequenza: qui la numerazione è informazione (DESIGN.md).
const metodo = [
  [
    'Ascolto e sopralluogo',
    'Partiamo da come lavorerà la tua brigata: menù, volumi, spazi, vincoli sanitari e impiantistici.',
  ],
  [
    'Progetto',
    'Disegni tecnici, calcoli e rendering: vedi il locale finito prima che si inizi a costruire.',
  ],
  [
    'Produzione e fornitura',
    'Arredi su misura dal nostro laboratorio, attrezzature scelte tra i marchi che conosciamo a fondo.',
  ],
  [
    'Consegna e assistenza',
    'Installazione, collaudo e formazione. Poi manutenzione e ricambi, per tutta la vita della cucina.',
  ],
]

const fatti = [
  [
    '5.000 m²',
    'showroom, laboratorio arredi, officina, magazzino ricambi e spazi per la formazione',
  ],
  ['1983', 'l’anno in cui abbiamo iniziato, ad Alberobello'],
  ['ASSOGI', 'parte del consorzio nazionale dal 2010'],
  ['MEPA', 'fornitori abilitati per la pubblica amministrazione'],
]

export default function Home({groups, lastTwoProjects = [], event}) {
  const upcoming = event?.futureEvent?.[0]
  // Le recensioni più descrittive tra quelle disponibili.
  const reviews = [0, 2, 3, 5].map(n => testimonials[n])
  return (
    <>
      <Head>
        <title>
          Matarrese srl | Attrezzature professionali per ristorazione e horeca
        </title>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Matarrese srl progetta e fornisce attrezzature professionali per ristorazione, cucine industriali, arredi su misura e soluzioni per bar, hotel e locali commerciali."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:title"
          content="Matarrese srl | Attrezzature professionali per ristorazione"
        />
        <meta
          property="og:description"
          content="Progettazione, attrezzature, arredi su misura e assistenza tecnica per i luoghi della ristorazione."
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout navbarTransparent>
        {/* copy da approvare: titolo, sottotitolo e testi dei capitoli */}
        <HomeHero
          slides={heroSlides}
          title="Costruiamo i luoghi dove il cibo diventa lavoro."
          intro="Progettiamo, costruiamo e assistiamo cucine professionali, laboratori e locali ho.re.ca., da Alberobello dal 1983."
          primary={{href: '#parliamone', label: 'Parla con un progettista'}}
          secondary={{href: '/realizzazioni', label: 'Guarda i progetti'}}
        />

        {/* Capitolo: per chi lavoriamo (la foto del settore diventa lo sfondo) */}
        <SectorList
          settori={settori}
          href={s => (s.pagina ? `/settori/${s.slug}` : '#parliamone')}
          title="Ogni cucina ha il suo mestiere."
          intro="Lavoriamo per chi cucina, serve, produce e vende cibo. Ogni settore ha flussi, norme e ritmi diversi: il progetto parte da lì."
        />

        {/* Capitolo scuro: come lavoriamo */}
        <section
          className="bg-ghisa text-white"
          data-header="dark"
          aria-labelledby="metodo-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="metodo-title"
                className="type-display max-w-[16ch] text-[clamp(32px,3.6vw,56px)]"
              >
                Un solo interlocutore, dal primo schizzo all’ultimo ricambio.
              </h2>
              <Link
                href="/servizi"
                className="shrink-0 self-start border-b border-inox/60 py-2 text-inox hover:text-white lg:self-auto"
              >
                Tutti i servizi
              </Link>
            </div>
            <ol className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
              {metodo.map(([titolo, testo], i) => (
                <li
                  key={titolo}
                  className="group relative border-t border-inox/25 pt-6"
                >
                  <span
                    className="absolute -top-px left-0 h-px w-0 bg-fiamma transition-all duration-700 ease-out group-hover:w-full motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                  <span
                    className="type-display inline-block text-4xl text-fiamma transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="type-display mt-6 text-[22px] leading-tight">
                    {titolo}
                  </h3>
                  <p className="mt-4 text-inox-muted">{testo}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Capitolo chiaro: prove */}
        <section
          className="bg-calce text-ghisa"
          data-header="light"
          aria-labelledby="progetti-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2
                id="progetti-title"
                className="type-display text-[clamp(32px,3.6vw,56px)]"
              >
                Luoghi finiti, pieni di clienti.
              </h2>
              <Link
                href="/realizzazioni"
                className="shrink-0 self-start border-b border-ghisa py-2 hover:text-fiamma-testo md:self-auto"
              >
                Tutte le realizzazioni
              </Link>
            </div>
            <ProjectGrid projects={lastTwoProjects} />
          </div>
        </section>

        {/* Capitolo scuro: dentro Matarrese */}
        <section
          className="bg-ghisa text-white"
          data-header="dark"
          aria-labelledby="azienda-title"
        >
          <div className="site-shell grid gap-14 py-24 lg:grid-cols-12 lg:items-center lg:py-32">
            <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7">
              <Image
                src="/img/home-attrezzature.jpg"
                alt="Lo showroom Matarrese ad Alberobello"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5">
              <h2
                id="azienda-title"
                className="type-display text-[clamp(32px,3.6vw,56px)]"
              >
                Dove le soluzioni si toccano con mano.
              </h2>
              <dl className="mt-10">
                {fatti.map(([dato, spiegazione]) => (
                  <div
                    key={dato}
                    className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-inox/25 py-4"
                  >
                    <dt className="type-display text-xl text-white">{dato}</dt>
                    <dd className="text-inox-muted">{spiegazione}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/azienda"
                className="mt-8 inline-block border-b border-fiamma py-2 text-fiamma hover:text-white"
              >
                Conosci l’azienda
              </Link>
            </div>
          </div>
        </section>

        {/* Fascia marchi: separata dalle recensioni */}
        <section
          className="border-y border-ghisa/10 bg-white text-ghisa"
          data-header="light"
          aria-labelledby="marchi-title"
        >
          <div className="site-shell flex flex-col gap-4 pb-8 pt-16 md:flex-row md:items-end md:justify-between">
            <h2
              id="marchi-title"
              className="type-display text-[clamp(24px,2.4vw,36px)]"
            >
              I marchi che conosciamo a fondo.
            </h2>
            <Link
              href="/prodotti"
              className="self-start border-b border-ghisa py-2 hover:text-fiamma-testo md:self-auto"
            >
              Prodotti e marchi
            </Link>
          </div>
          <div className="pb-16">
            <BrandMarquee logos={logos} />
          </div>
        </section>

        {/* Capitolo chiaro: la voce dei clienti */}
        <section
          className="bg-calce text-ghisa"
          data-header="light"
          aria-labelledby="recensioni-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <h2
              id="recensioni-title"
              className="type-display text-[clamp(24px,2.4vw,36px)]"
            >
              Cosa dicono i clienti.
            </h2>
            <div className="mt-8">
              <Testimonials items={reviews} />
            </div>
          </div>
        </section>

        {upcoming && (
          <section
            className="bg-calce text-ghisa"
            data-header="light"
            aria-labelledby="evento-title"
          >
            <div className="site-shell flex flex-col gap-6 border-t border-ghisa/15 py-14 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-acciaio">
                  Prossimo evento in sede, {upcoming.startDate}
                </p>
                <h2
                  id="evento-title"
                  className="type-display mt-2 text-[clamp(24px,2.4vw,36px)]"
                  dangerouslySetInnerHTML={{__html: upcoming.title}}
                />
              </div>
              <Link
                className="site-button shrink-0"
                href={`/eventi/${upcoming.slug}`}
              >
                Scopri l’evento
              </Link>
            </div>
          </section>
        )}

        {/* Chiusura: la chiamata al progetto */}
        <section
          className="bg-white text-ghisa"
          data-header="light"
          id="parliamone"
          aria-labelledby="contatto-title"
        >
          <div className="site-shell grid gap-6 pb-10 pt-24 lg:grid-cols-12 lg:pt-32">
            <h2
              id="contatto-title"
              className="type-display text-[clamp(36px,4.4vw,72px)] lg:col-span-7"
            >
              Il prossimo progetto inizia da qui.
            </h2>
            <p className="max-w-[40ch] text-acciaio lg:col-span-4 lg:col-start-9 lg:self-end">
              Raccontaci cosa hai in mente: ti risponde un progettista.
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
  const lastTwoProjects = await getLastTwoProjects()
  const event = await getEvents()
  return {
    props: {groups, lastTwoProjects, event: {futureEvent: event.futureEvent}},
    revalidate: 86400,
  }
}
