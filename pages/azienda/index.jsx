import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Layout from '../../components/Layout'
import ContactModal from '../../components/Form/ContactModal'
import HeroCinema from '../../components/cinema/HeroCinema'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import heroImg from '../../public/img/azienda/showroom.webp'
import Magnetic from '../../components/Magnetic'
import Soci from '../../components/azienda/Soci'
import BrandMarquee from '../../components/home/BrandMarquee'
import ProjectGrid from '../../components/home/ProjectGrid'
import StructuredData from '../../components/StructuredData'
import {aboutPageSchema, breadcrumbSchema} from '../../lib/seo/schema'
import {getLastTwoProjects} from '../../lib/query/project'
import {logos} from '../../data/partner-logo'
import logoAssogi from '../../public/img/logos/Assogi_logo-300x119.png'
import fotoVito from '../../public/img/vito_matarrese.webp'
import fotoPasquale from '../../public/img/azienda/soci/pasquale-matarrese.webp'

const fatti = [
  ['1983', 'l’anno in cui abbiamo iniziato, ad Alberobello'],
  ['5.000 m²', 'la superficie della nostra sede'],
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
    'Ci impegniamo nella selezione delle migliori attrezzature per la ristorazione prediligendo il Made in Italy. Offriamo ai nostri clienti gli strumenti più innovativi per dare il meglio in cucina.',
  ],
  [
    'Consulenza',
    'L’esperienza tecnica e l’ascolto delle diverse esigenze ci permettono di trovare soluzioni su misura per realizzare progetti e idee che favoriscono l’efficienza e l’ottimizzazione del lavoro.',
  ],
  [
    'Affidabilità',
    'Da quarant’anni operiamo al fianco dei professionisti della ristorazione, li seguiamo passo passo garantendo la sicurezza di potersi affidare a un partner competente e qualificato.',
  ],
  // Fonte delle card che seguono: intervista a Pasquale, 03/11/2026. Non scrivere "chiavi in
  // mano": gas, elettrico e allacci (ciò che richiede la firma di un abilitato) non li facciamo.
  [
    'Assistenza diretta',
    'L’assistenza la fanno tecnici Matarrese, formati dai produttori delle attrezzature che installiamo.',
  ],
  [
    'Montaggio con squadre nostre',
    'Arredi e attrezzature li installano le nostre squadre: chi ha progettato il locale sa come va montato.',
  ],
  [
    'Sopralluogo e preventivo gratuiti',
    'Il primo sopralluogo e il preventivo non costano nulla. La progettazione si paga, ma se poi ordini da noi il suo costo ti viene scalato.',
  ],
  [
    'Noleggio, leasing e rate',
    'Oltre all’acquisto, puoi scegliere noleggio, leasing o pagamenti dilazionati: troviamo la formula che regge il tuo investimento.',
  ],
  [
    'Agevolazioni e crediti d’imposta',
    'Ti aiutiamo a capire quali bandi e crediti d’imposta puoi usare per le nuove attrezzature, prima di decidere.',
  ],
  [
    'Formazione sulle attrezzature',
    'Alla consegna insegniamo al tuo personale a usare le attrezzature, e nel laboratorio della nostra sede organizziamo corsi e dimostrazioni.',
  ],
]

// Ritratti: Pasquale dalla cartella "sito web-2026/Azienda"; Vito è la foto del sito pubblicato
// (600x300, scatto d'evento: `posizione` tiene il volto nel riquadro verticale).
// Gianni resta con le iniziali finché non arriva il suo ritratto.
const soci = [
  {
    nome: 'Vito Matarrese',
    iniziali: 'VM',
    foto: fotoVito,
    posizione: '42% center',
    ruolo: 'Socio fondatore, Direzione',
    bio: 'Vito, da sempre incuriosito dalle tecnologie innovative, studia i grandi impianti della ristorazione professionale per scegliere le soluzioni migliori e tecnologicamente all’avanguardia.',
    email: 'vito.matarrese@matarrese.it',
  },
  {
    nome: 'Pasquale Matarrese',
    iniziali: 'PM',
    foto: fotoPasquale,
    posizione: 'center 30%',
    ruolo: 'Socio, gestione interna e service',
    // bio scelta da Pasquale il 03/11/2026
    bio: 'Pasquale cura l’organizzazione interna e il service: procedure, persone e strumenti digitali che permettono all’azienda di rispondere in fretta e bene. Segue in prima persona l’assistenza tecnica e gli impianti di aspirazione.',
    email: 'pasquale.matarrese@matarrese.it',
  },
  {
    nome: 'Gianni Matarrese',
    iniziali: 'GM',
    ruolo: 'Socio, commerciale e sviluppo nuovi mercati',
    bio: 'Gianni opera con dimestichezza nel campo della trasformazione alimentare, ottimizzando i processi di lavorazione e trovando soluzioni ottimali declinabili anche nel campo della ristorazione professionale.',
    email: 'gianni.matarrese@matarrese.it',
  },
]

const linkChiaro =
  'shrink-0 self-start border-b border-ghisa py-2 transition-colors hover:text-fiamma-testo'
// Chiusura: nessuna sezione contatto propria, la fa già il footer ("Hai un progetto? Parliamone.").

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
          content="Dal 1983 progettiamo e allestiamo cucine professionali e locali commerciali. 5.000 mq tra laboratorio, showroom e officina ricambi ad Alberobello."
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
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/og/home.jpg`}
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
        <HeroCinema
          image={heroImg}
          alt="Lo showroom Matarrese ad Alberobello, con la scala che porta al piano superiore"
          objectPosition="55% 60%"
          eyebrow="Dal 1983, ad Alberobello"
          riga="Un partner affidabile"
          accento="per la tua attività."
          sottotitolo="Dal 1983 operiamo al fianco di ristoratori, imprenditori e professionisti del settore ricettivo e alberghiero aiutandoli a realizzare i loro progetti."
          voci={[
            ['La nostra storia', '#storia'],
            ['La sede', '#sede'],
            ['Le persone', '#soci'],
            ['Il consorzio ASSOGI', '#assogi'],
          ]}
        >
          <Magnetic>
            <ContactModal variant="progetto" className="cin-btn">
              Parla con un progettista
              <Freccia />
            </ContactModal>
          </Magnetic>
          <Link href="#soci" className="cin-link whitespace-nowrap">
            Conosci i soci
          </Link>
        </HeroCinema>

        {/* Capitolo chiaro: il racconto */}
        <section
          id="storia"
          className="scroll-mt-20 bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="storia-title"
        >
          <div className="site-shell grid gap-10 py-24 lg:grid-cols-12 lg:py-32">
            {/* da verificare: "40 anni" dal 1983 sono 43 nel 2026 */}
            <TitoloDueTempi
              id="storia-title"
              tono="chiaro"
              riga="Da oltre 40 anni"
              accento="al fianco di chi fa ristorazione."
              className="text-[clamp(36px,4.4vw,64px)] !leading-none lg:col-span-5"
            />
            <div className="type-editorial space-y-6 text-[clamp(20px,1.7vw,26px)] leading-snug lg:col-span-6 lg:col-start-7">
              <p>
                In tanti anni abbiamo imparato ad ascoltare chi fa impresa nella
                ristorazione: capiamo in fretta cosa ti serve e ti aiutiamo a
                lavorare meglio, con processi più semplici e più qualità.
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
            <TitoloDueTempi
              id="perche-comprare-da-noi"
              tono="chiaro"
              riga="I nostri"
              accento="punti di forza."
              className="text-[clamp(30px,3vw,44px)] !leading-none"
            />
            <ul className="mt-10 grid gap-3 md:grid-cols-3">
              {puntiDiForza.map(([titolo, testo]) => (
                <li key={titolo} className="rounded-[28px] bg-white p-8">
                  <h3 className="type-display text-[24px] leading-tight">
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
          id="sede"
          className="scroll-mt-20 bg-[#121315] text-white [&_:focus-visible]:outline-fiamma"
          data-header="dark"
          aria-labelledby="sede-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <TitoloDueTempi
                id="sede-title"
                riga="Dove le soluzioni"
                accento="si toccano con mano."
                className="text-[clamp(36px,4.4vw,64px)] !leading-none"
              />
              <Link
                href="/contatti#showroom"
                className="cin-link shrink-0 self-start lg:self-auto"
              >
                Come raggiungerci
              </Link>
            </div>

            <dl className="mt-16 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
              {fatti.map(([dato, spiegazione]) => (
                <div key={dato} className="border-t border-inox/25 pt-6">
                  <dt className="font-[family-name:var(--font-accent)] text-[clamp(40px,4vw,60px)] italic leading-none text-fiamma">
                    {dato}
                  </dt>
                  <dd className="mt-4 max-w-[30ch] text-[rgb(243_238_230/.7)]">
                    {spiegazione}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-20 grid gap-8 md:grid-cols-2">
              <figure>
                <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
                  <Image
                    src="/img/azienda/showroom-attrezzature.webp"
                    alt="Forni e attrezzature in esposizione nello showroom"
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-inox-muted">
                  Showroom, attrezzature per la cucina
                </figcaption>
              </figure>
              <figure className="md:mt-24">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
                  <Image
                    src="/img/azienda/showroom-arredi.webp"
                    alt="Tavoli apparecchiati, sedute e complementi nello showroom"
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-inox-muted">
                  Showroom, arredi e tavola
                </figcaption>
              </figure>
            </div>

            <div className="mt-20 grid gap-10 lg:grid-cols-12">
              <h3 className="type-display text-2xl lg:col-span-4">
                Gli spazi della sede
              </h3>
              <ul className="lg:col-span-7 lg:col-start-6">
                {spazi.map(spazio => (
                  <li
                    key={spazio}
                    className="group relative border-t border-inox/25 py-5 last:border-b"
                  >
                    <span
                      className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-fiamma transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
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
          className="scroll-mt-20 bg-[var(--carta)] text-ghisa"
          data-header="light"
          id="soci"
          aria-labelledby="soci-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <TitoloDueTempi
              id="soci-title"
              tono="chiaro"
              riga="Le persone"
              accento="dietro Matarrese."
              className="text-[clamp(36px,4.4vw,64px)] !leading-none"
            />
            <Soci soci={soci} />
          </div>
        </section>

        {/* Consorzio e marchi: card bianca su fascia scura (la fascia marchi usa mix-blend-multiply, serve il bianco) */}
        <section
          id="assogi"
          className="scroll-mt-20 bg-[#121315] py-16 text-ghisa lg:py-24"
          data-header="dark"
          aria-labelledby="assogi-title"
        >
          <div className="site-shell">
            <div className="overflow-hidden rounded-[28px] bg-white">
              <div className="grid gap-12 px-8 py-14 md:px-12 lg:grid-cols-12 lg:px-16 lg:py-20">
                <div className="lg:col-span-5">
                  <TitoloDueTempi
                    id="assogi-title"
                    tono="chiaro"
                    riga="Parte del consorzio"
                    accento="ASSOGI dal 2010."
                    className="text-[clamp(32px,3.6vw,52px)] !leading-none"
                  />
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
                      Da trenta anni ASSOGI rappresenta la qualità italiana
                      nelle cucine professionali per ristoranti, nei grandi
                      impianti di ristorazione, nelle cucine per comunità e per
                      mense. ASSOGI assicura che i prodotti e le soluzioni
                      fornite dai propri soci vadano oltre le norme e
                      rappresentino al meglio la qualità italiana che da sempre
                      distingue la ristorazione nel nostro Paese.
                    </p>
                  </div>
                  <div>
                    <h3 className="type-display text-[22px] leading-tight">
                      La forza della rete nazionale
                    </h3>
                    <p className="mt-4 max-w-prose text-acciaio">
                      ASSOGI ha un ruolo di primo piano nel tessuto distributivo
                      del settore e si è imposta come l’unica rete di vendita
                      nazionale indipendente specializzata in grandi impianti di
                      ristorazione: cucine professionali, cucine per ristoranti,
                      impianti per bar, pizzerie, take away, pasticcerie, mense
                      e cucine industriali. Per queste attività ASSOGI propone
                      delle soluzioni personalizzate, che valorizzano i locali
                      con la qualità italiana che contraddistingue i nostri
                      prodotti.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-ghisa/10 px-8 pb-8 pt-12 md:flex-row md:items-end md:justify-between md:px-12 lg:px-16">
                <div>
                  <h2 className="type-display text-[clamp(24px,2.4vw,36px)]">
                    I partner con cui realizziamo la tua idea.
                  </h2>
                  <p className="mt-3 text-acciaio">
                    Tecnologie e attrezzature per il lavoro di ogni giorno.
                  </p>
                </div>
              </div>
              <div className="pb-14">
                <BrandMarquee logos={logos} />
              </div>
            </div>
          </div>
        </section>

        {/* Capitolo chiaro: le prove */}
        {progetti.length > 0 && (
          <section
            className="bg-[var(--carta)] text-ghisa"
            data-header="light"
            aria-labelledby="progetti-title"
          >
            <div className="site-shell py-24 lg:py-32">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <TitoloDueTempi
                  id="progetti-title"
                  tono="chiaro"
                  riga="Le nostre"
                  accento="realizzazioni."
                  className="text-[clamp(36px,4.4vw,64px)] !leading-none"
                />
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
    // le realizzazioni mostrate seguono WordPress senza aspettare un nuovo deploy
    revalidate: 86400,
  }
}
