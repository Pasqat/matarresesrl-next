import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Magnetic from '../../components/Magnetic'
import Soci from '../../components/azienda/Soci'
import BrandMarquee from '../../components/home/BrandMarquee'
import ProjectGrid from '../../components/home/ProjectGrid'
import StructuredData from '../../components/StructuredData'
import {aboutPageSchema, breadcrumbSchema} from '../../lib/seo/schema'
import {getLastTwoProjects} from '../../lib/query/project'
import {logos} from '../../data/partner-logo'
import logoAssogi from '../../public/img/logos/Assogi_logo-300x119.png'

// copy da approvare (dalla home, capitolo "Dove le soluzioni si toccano con mano")
const fatti = [
  ['1983', 'l’anno in cui abbiamo iniziato, ad Alberobello'],
  ['5.000 m²', 'la superficie della nostra sede'], // copy da approvare
  ['ASSOGI', 'parte del consorzio nazionale dal 2010'],
  ['MEPA', 'fornitori abilitati per la pubblica amministrazione'],
]

// Gli spazi della sede (dalla home: showroom, laboratorio arredi, officina, magazzino ricambi, formazione).
const spazi = [
  'Showroom',
  'Laboratorio arredi',
  'Officina',
  'Magazzino ricambi',
  'Spazi per la formazione',
]

const puntiDiForza = [
  [
    'Qualità',
    'Ci impegniamo nella selezione delle migliori attrezzature per la ristorazione prediligendo il Made in Italy. Offriamo ai nostri clienti gli strumenti più tecnologici e innovativi per creare esplosioni di colori e gusto in cucina.',
  ],
  [
    'Consulenza',
    'L’esperienza tecnica e l’ascolto delle diverse esigenze ci permettono di trovare soluzioni su misura per realizzare progetti e idee che favoriscono l’efficienza e l’ottimizzazione del lavoro.',
  ],
  [
    'Affidabilità',
    'Da quarant’anni operiamo al fianco dei professionisti della ristorazione, li seguiamo passo passo garantendo la sicurezza di potersi affidare a un partner competente e qualificato.',
  ],
]

// Ritratti: li sceglie il cliente. Per metterne uno, aggiungere `foto` (es. import da public/img).
// La foto attuale di Vito (public/img/vito_matarrese.webp, 600x300, scatto d'evento) resta
// disponibile ma non è usata: in un riquadro verticale si taglia male.
const soci = [
  {
    nome: 'Vito Matarrese',
    iniziali: 'VM',
    ruolo: 'Socio fondatore, Direzione',
    bio: 'Vito, da sempre incuriosito dalle tecnologie innovative, studia i grandi impianti della ristorazione professionale per scegliere le soluzioni migliori e tecnologicamente all’avanguardia.',
    email: 'vito.matarrese@matarrese.it',
  },
  {
    nome: 'Pasquale Matarrese',
    iniziali: 'PM',
    ruolo: 'Socio', // da verificare: ruolo e bio da chiedere al cliente — copy da approvare
    email: 'pasquale.matarrese@matarrese.it',
  },
  {
    nome: 'Giovanni “Gianni” Matarrese',
    iniziali: 'GM',
    ruolo: 'Socio', // da verificare: ruolo da chiedere al cliente
    // copy da approvare (bozza esistente)
    bio: 'Gianni opera con dimestichezza nel campo della trasformazione alimentare, ottimizzando i processi di lavorazione e trovando soluzioni ottimali declinabili anche nel campo della ristorazione professionale.',
    email: 'gianni.matarrese@matarrese.it',
  },
]

const linkChiaro =
  'shrink-0 self-start border-b border-ghisa py-2 transition-colors hover:text-fiamma-testo'
const linkScuro =
  'shrink-0 self-start border-b border-inox/60 py-2 text-white transition-colors hover:border-white focus-visible:outline-white'
// Chiusura: nessuna sezione contatto propria, la fa già il footer ("Hai un progetto? Parliamone.").
const ctaFiamma = 'cta-fiamma focus-visible:outline-white'

export default function AboutUs({lastTwoProjects = []}) {
  const progetti = lastTwoProjects.slice(2, 4)
  return (
    <>
      <Head>
        <title>
          Chi siamo | Matarrese srl | Attrezzature e arredi per ristorazione
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/azienda`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Matarrese srl supporta ristoranti, hotel e professionisti della ristorazione con cucine professionali, arredi su misura, attrezzature e consulenza tecnica."
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Chi siamo | Matarrese srl" />
        <meta
          property="og:description"
          content="Partner affidabile per cucine professionali, arredi su misura, attrezzature per ristorazione e servizi post-vendita."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/azienda`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <StructuredData data={aboutPageSchema()} />
      <StructuredData
        data={breadcrumbSchema([{name: 'Azienda', path: '/azienda'}])}
      />
      <Layout navbarTransparent>
        <PageHero
          title="Un partner affidabile per la tua attività"
          intro="Dal 1983 operiamo al fianco di ristoratori, imprenditori e professionisti del settore ricettivo e alberghiero aiutandoli a realizzare i loro progetti."
          image={{
            src: '/img/azienda/showroom.webp',
            alt: 'Lo showroom Matarrese ad Alberobello, con la scala che porta al piano superiore',
            position: '55% 60%',
          }}
        >
          <Magnetic>
            {/* copy da approvare */}
            <Link href="/contatti" className={ctaFiamma}>
              Parla con un progettista
            </Link>
          </Magnetic>
          <Link href="#soci" className={linkScuro}>
            {/* copy da approvare */}
            Conosci i soci
          </Link>
        </PageHero>

        {/* Capitolo chiaro: il racconto */}
        <section
          className="bg-calce text-ghisa"
          data-header="light"
          aria-labelledby="storia-title"
        >
          <div className="site-shell grid gap-10 py-24 lg:grid-cols-12 lg:py-32">
            {/* da verificare: "40 anni" dal 1983 sono 43 nel 2026 */}
            <h2
              id="storia-title"
              className="type-display text-[clamp(32px,3.6vw,56px)] lg:col-span-5"
            >
              Da 40 anni partner degli operatori ho.re.ca.
            </h2>
            <div className="type-editorial space-y-6 text-[clamp(20px,1.7vw,26px)] leading-snug lg:col-span-6 lg:col-start-7">
              <p>
                Grazie all’esperienza acquisita negli anni, oggi, noi di
                Matarrese srl comprendiamo facilmente le esigenze degli
                imprenditori e offriamo servizi e prodotti in grado di rendere
                la loro idea di business più competitiva sia a livello di
                processi che di qualità.
              </p>
              <p>
                Creiamo spazi su misura dei professionisti. Dalla dimensione
                delle attrezzature professionali agli arredi su misura, ci
                impegniamo a cercare la soluzione ottimale per i tuoi spazi e
                più efficiente per il tuo lavoro.
              </p>
              <p className="text-acciaio">
                L’innovazione e la tecnologia sono componenti essenziali nella
                scelta di attrezzature per la ristorazione, di cucine
                professionali e di impianti di aerazione e climatizzazione. La
                professionalità e la qualità ci caratterizzano nella consulenza
                professionale e nell’assistenza tecnica post vendita.
              </p>
            </div>
          </div>

          <div className="site-shell pb-24 lg:pb-32">
            <h2
              id="perche-comprare-da-noi"
              className="type-display text-[clamp(24px,2.4vw,36px)]"
            >
              I nostri punti di forza
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
              {puntiDiForza.map(([titolo, testo]) => (
                <li
                  key={titolo}
                  className="group relative border-t border-ghisa/20 pt-6"
                >
                  <span
                    className="absolute -top-px left-0 h-px w-0 bg-fiamma-testo transition-all duration-700 ease-out group-hover:w-full motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                  <h3 className="type-display text-[22px] leading-tight">
                    {titolo}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-acciaio">{testo}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Capitolo scuro: la sede e i numeri */}
        <section
          className="bg-ghisa text-white"
          data-header="dark"
          aria-labelledby="sede-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="sede-title"
                className="type-display max-w-[16ch] text-[clamp(32px,3.6vw,56px)]"
              >
                {/* copy da approvare */}
                Dove le soluzioni si toccano con mano.
              </h2>
              <Link href="/contatti" className={linkScuro}>
                Come raggiungerci
              </Link>
            </div>

            <dl className="mt-16 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
              {fatti.map(([dato, spiegazione]) => (
                <div key={dato} className="border-t border-inox/25 pt-6">
                  <dt className="type-display text-[clamp(32px,3vw,44px)]">
                    {dato}
                  </dt>
                  <dd className="mt-3 max-w-[30ch] text-inox-muted">
                    {spiegazione}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-20 grid gap-8 md:grid-cols-2">
              <figure>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src="/img/azienda/showroom-attrezzature.webp"
                    alt="Forni e attrezzature in esposizione nello showroom"
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-inox-muted">
                  {/* copy da approvare */}
                  Showroom, attrezzature per la cucina
                </figcaption>
              </figure>
              <figure className="md:mt-24">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src="/img/azienda/showroom-arredi.webp"
                    alt="Tavoli apparecchiati, sedute e complementi nello showroom"
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-inox-muted">
                  {/* copy da approvare */}
                  Showroom, arredi e tavola
                </figcaption>
              </figure>
            </div>

            <div className="mt-20 grid gap-10 lg:grid-cols-12">
              <h3 className="type-display text-2xl lg:col-span-4">
                {/* copy da approvare */}
                Gli spazi della sede
              </h3>
              <ul className="lg:col-span-7 lg:col-start-6">
                {spazi.map(spazio => (
                  <li
                    key={spazio}
                    className="group relative border-t border-inox/25 py-5 last:border-b"
                  >
                    <span
                      className="absolute -top-px left-0 h-px w-0 bg-fiamma transition-all duration-700 ease-out group-hover:w-full motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                    <span className="type-display text-[clamp(20px,1.8vw,26px)] text-inox transition-colors group-hover:text-white">
                      {spazio}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <address className="mt-12 not-italic text-inox-muted">
              Contrada Popoleto, n.c., 70011 Alberobello (BA)
            </address>
          </div>
        </section>

        {/* Capitolo chiaro: le persone */}
        <section
          className="bg-calce text-ghisa"
          data-header="light"
          id="soci"
          aria-labelledby="soci-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <h2
              id="soci-title"
              className="type-display text-[clamp(32px,3.6vw,56px)]"
            >
              {/* copy da approvare */}
              Le persone dietro Matarrese.
            </h2>
            <Soci soci={soci} />
          </div>
        </section>

        {/* Consorzio e marchi (fondo bianco: la fascia marchi usa mix-blend-multiply) */}
        <section
          className="border-t border-ghisa/10 bg-white text-ghisa"
          data-header="light"
          aria-labelledby="assogi-title"
        >
          <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-5">
              <h2
                id="assogi-title"
                className="type-display text-[clamp(32px,3.6vw,56px)]"
              >
                {/* copy da approvare */}
                Parte del consorzio ASSOGI dal 2010.
              </h2>
              <a
                href="https://www.assogi.it"
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-block"
              >
                <Image
                  src={logoAssogi}
                  alt="ASSOGI (sito del consorzio, si apre in una nuova scheda)"
                  className="h-auto w-48"
                />
              </a>
            </div>
            <div className="space-y-10 lg:col-span-6 lg:col-start-7">
              <div>
                <h3 className="type-display text-[22px] leading-tight">
                  Qualità italiana
                </h3>
                <p className="mt-4 max-w-prose text-acciaio">
                  Da trenta anni ASSOGI rappresenta la qualità italiana nelle
                  cucine professionali per ristoranti, nei grandi impianti di
                  ristorazione, nelle cucine per comunità e per mense. ASSOGI
                  assicura che i prodotti e le soluzioni fornite dai propri soci
                  vadano oltre le norme e rappresentino al meglio la qualità
                  italiana che da sempre distingue la ristorazione nel nostro
                  Paese.
                </p>
              </div>
              <div>
                <h3 className="type-display text-[22px] leading-tight">
                  La forza della rete nazionale
                </h3>
                <p className="mt-4 max-w-prose text-acciaio">
                  ASSOGI ha un ruolo di primo piano nel tessuto distributivo del
                  settore e si è imposta come l’unica rete di vendita nazionale
                  indipendente specializzata in grandi impianti di ristorazione:
                  cucine professionali, cucine per ristoranti, impianti per bar,
                  pizzerie, take away, pasticcerie, mense e cucine industriali.
                  Per queste attività ASSOGI propone delle soluzioni
                  personalizzate, che valorizzano i locali con la qualità
                  italiana che contraddistingue i nostri prodotti.
                </p>
              </div>
            </div>
          </div>

          <div className="site-shell flex flex-col gap-4 border-t border-ghisa/10 pb-8 pt-16 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="type-display text-[clamp(24px,2.4vw,36px)]">
                I marchi che scegliamo.
              </h2>
              <p className="mt-3 text-acciaio">
                Tecnologie e attrezzature per il lavoro di ogni giorno.
              </p>
            </div>
            <Link href="/prodotti" className={linkChiaro}>
              Prodotti e marchi
            </Link>
          </div>
          <div className="pb-16">
            <BrandMarquee logos={logos} />
          </div>
        </section>

        {/* Capitolo chiaro: le prove */}
        {progetti.length > 0 && (
          <section
            className="border-t border-ghisa/10 bg-calce text-ghisa"
            data-header="light"
            aria-labelledby="progetti-title"
          >
            <div className="site-shell py-24 lg:py-32">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <h2
                  id="progetti-title"
                  className="type-display text-[clamp(32px,3.6vw,56px)]"
                >
                  Le nostre realizzazioni
                </h2>
                <Link href="/realizzazioni" className={linkChiaro}>
                  Tutte le realizzazioni
                </Link>
              </div>
              <ProjectGrid projects={progetti} />
            </div>
          </section>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const lastTwoProjects = await getLastTwoProjects()

  return {
    props: {
      lastTwoProjects: lastTwoProjects,
    },
  }
}
