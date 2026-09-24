import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'

import FBMlogo from '../../public/img/logos/FBM_LOGO-High-Res.png'
import UEfundedLogo from '../../public/img/logos/funded-eu-blue.png'
import PrimaLogo from '../../public/img/logos/prima-logo-hor.png'
import FBM_ReD_page from '../../public/img/FBM-ReS_page.webp'
import OHOWOW from '../../public/img/progetto_carni_2025.jpg'

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>Ricerca e Sviluppo | Matarrese srl</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/ricerca`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="I progetti di Ricerca e Sviluppo di Matarrese srl: innovazione nella ristorazione professionale, dal progetto europeo Flat Bread Mine alle nuove tecnologie in cucina."
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Ricerca e Sviluppo" />
        <meta
          property="og:description"
          content="Innovazione nella ristorazione professionale: i progetti di Ricerca e Sviluppo di Matarrese srl."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/ricerca`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout navbarTransparent>
        <PageHero
          title="Esperienza e tecnologia al servizio del futuro"
          intro="Collaboriamo con università e centri specializzati per sviluppare soluzioni innovative che rispondono alle sfide di domani."
          tall={false}
        >
          <a
            href="#flat-bread-mine"
            className="border-b border-inox/60 py-2 text-white transition-colors hover:border-white focus-visible:outline-white"
          >
            Flat Bread Mine
          </a>
          <a
            href="#one-health"
            className="border-b border-inox/60 py-2 text-white transition-colors hover:border-white focus-visible:outline-white"
          >
            One Health, One Welfare, One World
          </a>
        </PageHero>

        {/* Il secondo paragrafo della vecchia apertura, come dichiarazione */}
        <section
          className="bg-calce text-ghisa"
          data-header="light"
          aria-label="Il nostro approccio alla ricerca"
        >
          <div className="site-shell py-20 lg:py-28">
            <p className="type-editorial max-w-[38ch] text-[clamp(24px,2.6vw,40px)] leading-snug">
              Crediamo fermamente che il progresso nasca dalla combinazione di
              conoscenze accademiche ed esperienza pratica, pilastri
              fondamentali per affrontare il futuro e creare tecnologie
              all&apos;avanguardia.
            </p>
          </div>
        </section>

        {/* Fondo bianco: il logo UE ha il fondo bianco nel file */}
        <section
          id="flat-bread-mine"
          className="bg-white text-ghisa"
          data-header="light"
          aria-labelledby="fbm-title"
        >
          <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-6">
              <h2
                id="fbm-title"
                className="type-display text-[clamp(30px,3.4vw,52px)]"
              >
                Flat Bread Mine
              </h2>
              <div className="mt-8 max-w-[60ch] space-y-5 text-lg text-acciaio">
                <p>
                  Il progetto Flat Bread Mine nasce per valorizzare il pane
                  piatto, simbolo delle tradizioni culinarie mediterranee,
                  attraverso un approccio innovativo. Con la collaborazione di
                  18 partner tra istituti di ricerca, università e aziende di 10
                  Paesi, il progetto punta a sviluppare nuove ricette e
                  tecnologie per realizzare pani piatti più digeribili,
                  nutrizionalmente arricchiti e adatti a esigenze specifiche,
                  come la produzione senza glutine.
                </p>
                <p>
                  Dalla focaccia italiana alla pita greca, dal baladi egiziano
                  alla ftira maltese, Flat Bread Mine celebra la diversità
                  culturale, preservando le radici storiche di questi alimenti.
                  Allo stesso tempo, promuove la ricerca scientifica per
                  ottimizzare i processi produttivi e migliorare la qualità del
                  prodotto, rendendolo accessibile e sostenibile per il mercato
                  globale. Un impegno concreto per innovare nel rispetto della
                  tradizione.
                </p>
                <p>
                  Scopri di più sulla pagina ufficiale del progetto:{' '}
                  <a
                    href="https://flatbreadmine.eu/it/"
                    className="border-b border-ghisa py-1 text-ghisa transition-colors hover:text-fiamma-testo"
                  >
                    flatbreadmine.eu
                  </a>
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Image
                src={FBM_ReD_page}
                alt="Pane piatto appena sfornato su un canovaccio a righe"
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full"
              />
              <ul
                className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-6 md:grid-cols-3"
                aria-label="Loghi del progetto"
              >
                <li>
                  <Image
                    src={UEfundedLogo}
                    alt="Funded by the European Union"
                    placeholder="blur"
                    sizes="200px"
                    className="h-auto w-full max-w-[200px]"
                  />
                </li>
                <li>
                  <Image
                    src={PrimaLogo}
                    alt="PRIMA, Partnership for Research and Innovation in the Mediterranean Area"
                    placeholder="blur"
                    sizes="200px"
                    className="h-auto w-full max-w-[200px]"
                  />
                </li>
                <li>
                  <Image
                    src={FBMlogo}
                    alt="Flat Bread Mine logo"
                    placeholder="blur"
                    sizes="200px"
                    className="h-auto w-full max-w-[200px]"
                  />
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="one-health"
          className="bg-ghisa text-white [&_:focus-visible]:outline-fiamma"
          data-header="dark"
          aria-labelledby="one-health-title"
        >
          <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-6">
              {/* Immagine intera, mai ritagliata: in basso ci sono i loghi dei
                  finanziatori (UE, MUR, PON Ricerca e Innovazione, FSC). */}
              <Image
                src={OHOWOW}
                alt="Presentazione dei risultati del progetto One Health, One Welfare, One World. In basso i loghi di Unione Europea – Fondo Sociale Europeo, Ministero dell’Università e della Ricerca, PON Ricerca e Innovazione 2014-2020 e FSC – Fondo per lo Sviluppo e la Coesione"
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <h2
                id="one-health-title"
                className="type-display text-[clamp(30px,3.4vw,52px)]"
              >
                One Health, One Welfare, One World
              </h2>
              <div className="mt-8 max-w-[60ch] space-y-5 text-lg text-inox">
                <p>
                  Il progetto “One health-one welfare-one world” nasce per
                  innovare le filiere del latte e della carne al fine di
                  migliorare il benessere dell’uomo.
                </p>
                <p>
                  Grazie alla collaborazione tra le Università di Bari,
                  dipartimento di Veterinaria, del Molise, di Teramo e imprese
                  agro-zootecniche pugliesi, il progetto ha sviluppato dei
                  protocolli per la produzione di carni e prodotti caseari con
                  contenuto lipidico ridotto, maggiore sicurezza e una
                  shelf-life più lunga.
                </p>
                <p>
                  Il progetto dimostra come, con l’introduzione di foraggi
                  idroponici di orzo e piselli, e un mix di oli essenziali
                  estratti da alloro e carciofi, si possa aiutare anche la
                  sostenibilità ambientale e tutelare la salute del bestiame e
                  dei consumatori. Il campione di 100 volontari ha mostrato che,
                  l’assunzione di prodotti lavorati secondo i protocolli del
                  progetto ha generato un maggiore beneficio per i batteri buoni
                  dell’intestino. I risultati del progetto sono stati presentati
                  giovedì 11 dicembre 2025 nell’azienda Matarrese ad
                  Alberobello.
                </p>
                <p>
                  Scopri di più sulla pagina ufficiale del progetto:{' '}
                  <a
                    href="https://www.ponricerca.gov.it"
                    className="border-b border-inox/60 py-1 text-white transition-colors hover:border-white"
                  >
                    ponricerca.gov.it
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-white text-ghisa"
          data-header="light"
          aria-labelledby="collabora-title"
        >
          <div className="site-shell flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between lg:py-24">
            <h2
              id="collabora-title"
              className="type-display max-w-[20ch] text-[clamp(28px,3vw,44px)]"
            >
              {/* copy da approvare */}
              Hai un progetto di ricerca da proporci?
            </h2>
            <Link href="/contatti" className="cta-ghisa shrink-0 self-start">
              {/* copy da approvare */}
              Scrivici
            </Link>
          </div>
        </section>
      </Layout>
    </>
  )
}
