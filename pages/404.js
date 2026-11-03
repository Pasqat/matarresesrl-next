import {useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Layout from '../components/Layout'
import ContactModal from '../components/Form/ContactModal'
import Magnetic from '../components/Magnetic'

// La 404 è il pannello di un forno combinato in errore: i programmi sono i link.
// Easter egg: ogni «Reset» prova a ripartire, al terzo il display chiede il nostro service.
const PROGRAMMI = [
  ['/', 'P1', 'Home'],
  ['/servizi', 'P2', 'Servizi'],
  ['/realizzazioni', 'P3', 'Realizzazioni'],
  ['/assistenza', 'P4', 'Assistenza'],
]
const DISPLAY = [
  ['E-404', 'Pagina non trovata'],
  ['E-404', 'Riavviato. L’errore resta.'],
  ['CL-02', 'Ciclo di pulizia: non è servito.'],
  ['SErv', 'Qui serve il nostro service.'],
]

export default function NonTrovata() {
  const [reset, setReset] = useState(0)
  const [codice, messaggio] = DISPLAY[Math.min(reset, DISPLAY.length - 1)]
  const service = reset >= DISPLAY.length - 1

  return (
    <>
      <Head>
        <title>Pagina non trovata | Matarrese srl</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Layout navbarTransparent footerInvito={false}>
        <section
          className="relative overflow-hidden bg-[#0d0e0f] text-white [&_:focus-visible]:outline-fiamma"
          data-header="dark"
          aria-labelledby="page-title"
        >
          <div className="site-shell grid items-center gap-14 pb-20 pt-36 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pb-28 lg:pt-44">
            <div>
              <h1
                id="page-title"
                className="cin-titolo type-display max-w-[16ch] text-[clamp(40px,6vw,96px)] !leading-none"
              >
                <span>Questa pagina</span>{' '}
                <span className="type-accento">è andata in errore.</span>
              </h1>
              <p className="mt-7 max-w-[44ch] text-lg text-[rgb(243_238_230/.75)] lg:text-xl">
                Capita anche alle macchine migliori. I programmi però funzionano:
                scegline uno dal pannello.
              </p>
              <div className="mt-10">
                <Magnetic>
                  <ContactModal
                    variant="info"
                    className="cta-fiamma focus-visible:outline-white"
                    title="Dicci cosa cercavi."
                    subtitle="Ti aiutiamo a trovarlo, o ti ricontatta un nostro consulente."
                  >
                    Segnala il problema
                  </ContactModal>
                </Magnetic>
              </div>
            </div>

            <div className="nf-forno">
              <div className="nf-display" role="status" aria-live="polite">
                <span className="nf-codice" key={reset}>
                  {codice}
                </span>
                <span className="nf-temp" aria-hidden="true">
                  0°C
                </span>
                <span className="nf-msg">{messaggio}</span>
              </div>

              <nav aria-label="Programmi" className="nf-programmi">
                {PROGRAMMI.map(([href, p, label]) => (
                  <Link key={href} href={href} className="nf-tasto">
                    <b>{p}</b>
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="nf-piede">
                {service ? (
                  <Link href="/assistenza" className="nf-service">
                    Chiama il service
                  </Link>
                ) : (
                  <span className="nf-sigla" aria-hidden="true">
                    Matarrese · combi 404
                  </span>
                )}
                <button
                  type="button"
                  className="nf-reset"
                  onClick={() => setReset(r => r + 1)}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
