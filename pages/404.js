import Head from 'next/head'
import Link from 'next/link'

import Layout from '../components/Layout'
import Magnetic from '../components/Magnetic'

// Lottie tolta: l'illustrazione (azzurri, verdi, giallo) è fuori palette su
// ghisa e caricava react-lottie-player solo per questa pagina.
const LINKS = [
  ['/', 'Home'],
  ['/servizi', 'Servizi'],
  ['/realizzazioni', 'Realizzazioni'],
  ['/assistenza', 'Assistenza'],
]

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>Matarrese srl</title>
        <meta name="author" content="Matarrese srl" />
        <meta name="robots" content="noindex" />
      </Head>

      <Layout navbarTransparent>
        <section
          className="flex min-h-[80svh] flex-col justify-end bg-ghisa text-white [&_:focus-visible]:outline-fiamma"
          data-header="dark"
          aria-labelledby="page-title"
        >
          <div className="site-shell pb-16 pt-40 lg:pb-24">
            {/* Numero decorativo: il messaggio è nell'h1 */}
            <p
              aria-hidden="true"
              className="type-display text-[clamp(64px,14vw,200px)] text-inox/20"
            >
              404
            </p>
            <h1
              id="page-title"
              className="type-display mt-6 max-w-[18ch] text-[clamp(36px,5vw,80px)]"
            >
              {/* copy da approvare */}
              Questa pagina non esiste.
            </h1>
            <p className="mt-7 max-w-[52ch] text-lg text-inox lg:text-xl">
              {/* copy da approvare */}
              Forse l’indirizzo è cambiato. Riparti da qui o scrivici: ti
              aiutiamo a trovare quello che cerchi.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Magnetic>
                <Link
                  href="/contatti"
                  className="cta-fiamma focus-visible:outline-white"
                >
                  Contattaci
                </Link>
              </Magnetic>
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                {LINKS.map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="border-b border-inox/60 py-2 text-white transition-colors hover:border-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
