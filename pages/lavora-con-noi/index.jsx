import Head from 'next/head'
import Link from 'next/link'

import {getAnnunci} from '../../lib/query/annuncio'
import {dettagliAnnuncio as dettagli, ogni} from '../../lib/pannello'

import Layout from '../../components/Layout'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import ContactModal from '../../components/Form/ContactModal'

const DESCRIZIONE =
  'Le posizioni aperte in Matarrese srl, ad Alberobello: leggi gli annunci e candidati con il tuo curriculum, oppure mandaci una candidatura spontanea.'

export default function LavoraConNoi({annunci}) {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/lavora-con-noi`
  return (
    <>
      <Head>
        <title>Lavora con noi: posizioni aperte | Matarrese srl</title>
        <link rel="canonical" href={url} />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="description" content={DESCRIZIONE} />
        <meta property="og:title" content="Lavora con noi" />
        <meta property="og:description" content={DESCRIZIONE} />
        <meta property="og:url" content={url} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/og/home.jpg`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Layout navbarTransparent>
        <section
          className="bg-[#0d0e0f] text-white [&_:focus-visible]:outline-fiamma"
          data-header="dark"
          aria-labelledby="page-title"
        >
          <div className="site-shell pb-20 pt-36 lg:pb-28 lg:pt-44">
            <span className="eyebrow-cinema">Alberobello · dal 1983</span>
            <TitoloDueTempi
              as="h1"
              id="page-title"
              riga="Lavora"
              accento="con noi."
              className="mt-6 text-[clamp(44px,6vw,96px)] !leading-[0.98]"
            />
            <p className="mt-8 max-w-[52ch] text-lg text-[rgb(243_238_230/.75)]">
              Dal 1983 progettiamo e realizziamo cucine e locali per chi fa
              ristorazione. Se ti piace il lavoro fatto bene, c’è posto anche
              per te.
            </p>
          </div>
        </section>

        {/* Qui, tra apertura e annunci, andrà «Come si lavora da noi» quando ci saranno i testi (Pasquale, 25/11/2026) */}

        <section
          className="bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="posizioni-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <TitoloDueTempi
              id="posizioni-title"
              tono="chiaro"
              riga="Posizioni"
              accento="aperte."
              className="text-[clamp(36px,4.4vw,64px)] !leading-none"
            />
            {annunci.length ? (
              <ul className="mt-12 grid gap-3">
                {annunci.map(a => (
                  <li key={a.slug}>
                    <Link
                      href={`/lavora-con-noi/${a.slug}`}
                      className="group flex flex-col items-start gap-5 rounded-[24px] bg-white p-6 transition-shadow hover:shadow-[0_0_0_1px_rgb(30_34_38/.2)] md:flex-row md:items-center md:justify-between md:gap-8 md:p-8"
                    >
                      <div>
                        <h3 className="type-display text-[clamp(20px,2.2vw,32px)] leading-tight transition-colors group-hover:text-fiamma-testo">
                          {a.titolo}
                        </h3>
                        <span className="mt-2 block text-sm text-acciaio">
                          {dettagli(a)}
                        </span>
                      </div>
                      <span className="cin-btn shrink-0">
                        Leggi l’annuncio
                        <Freccia />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 max-w-[48ch] text-lg text-acciaio">
                In questo momento non abbiamo posizioni aperte. Puoi comunque
                mandarci il tuo curriculum.
              </p>
            )}

            <div className="mt-3 flex flex-col items-start gap-6 rounded-[24px] border border-dashed border-acciaio p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-8">
              <div>
                <h2 className="type-display text-[clamp(20px,2.2vw,32px)] leading-tight">
                  Non trovi la tua posizione?
                </h2>
                <p className="mt-2 max-w-[56ch] text-acciaio">
                  Mandaci il curriculum e raccontaci cosa sai fare: quando
                  cerchiamo una figura come la tua, partiamo da qui.
                </p>
              </div>
              <ContactModal
                variant="info"
                candidatura={{}}
                className="cin-btn shrink-0"
              >
                Invia il curriculum
                <Freccia />
              </ContactModal>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return {props: {annunci: await getAnnunci()}, revalidate: ogni(900)}
}
