import {useEffect, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Layout from '../components/Layout'
import ContactModal from '../components/Form/ContactModal'
import Magnetic from '../components/Magnetic'

// La 404 è una comanda di cucina: il piatto chiesto è esaurito, le portate disponibili sono i link.
// Il campanello da banco è l'easter egg: a ogni colpo lo chef risponde, all'ultimo ristampa la comanda.
const PORTATE = [
  ['/', 'Home'],
  ['/servizi', 'Servizi'],
  ['/realizzazioni', 'Realizzazioni'],
  ['/assistenza', 'Assistenza'],
]
const CHEF = [
  'Servizio!',
  'Arriva, arriva…',
  'Lo chef la sta cercando in cella frigo.',
  'Niente, è proprio finita. Ti ristampiamo la comanda.',
]

export default function NonTrovata() {
  const [ora, setOra] = useState('--:--')
  const [colpi, setColpi] = useState(0)
  const [stampa, setStampa] = useState(0)

  // L'ora si legge solo nel browser: l'HTML statico non sa quando arrivi
  useEffect(() => {
    setOra(
      new Date().toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    )
  }, [])

  function suona() {
    const n = colpi + 1
    setColpi(n)
    if (n === CHEF.length) setStampa(s => s + 1)
  }

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
          <div className="site-shell grid items-start gap-14 pb-20 pt-36 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:pb-28 lg:pt-44">
            <div>
              <h1
                id="page-title"
                className="cin-titolo type-display max-w-[16ch] text-[clamp(40px,6vw,96px)] !leading-none"
              >
                <span>Questa pagina</span>{' '}
                <span className="type-accento">è uscita dal menu.</span>
              </h1>
              <p className="mt-7 max-w-[46ch] text-lg text-[rgb(243_238_230/.75)] lg:text-xl">
                Forse l’indirizzo è cambiato, forse il piatto non c’è più. In
                cucina però il resto è pronto: scegli dalla comanda, o chiedi a
                noi.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-5">
                <Magnetic>
                  <ContactModal
                    variant="info"
                    className="cta-fiamma focus-visible:outline-white"
                    title="Dicci cosa cercavi."
                    subtitle="Ti aiutiamo a trovarlo, o ti ricontatta un nostro consulente."
                  >
                    Chiedi alla sala
                  </ContactModal>
                </Magnetic>
                <button
                  type="button"
                  className="nf-campanello"
                  onClick={suona}
                  aria-describedby="nf-chef"
                >
                  <svg viewBox="0 0 48 40" aria-hidden="true" key={colpi}>
                    <path d="M24 6v4M8 32a16 16 0 0 1 32 0Z" />
                    <path d="M3 36h42" />
                    <circle cx="24" cy="5" r="2.5" />
                  </svg>
                  Suona il campanello
                </button>
              </div>
              <p id="nf-chef" className="nf-chef" aria-live="polite">
                {colpi ? CHEF[(colpi - 1) % CHEF.length] : ' '}
              </p>
            </div>

            <div className="nf-stampante">
              <div className="nf-fessura" aria-hidden="true" />
              <div className="nf-comanda" key={stampa}>
                <p className="nf-testa">
                  <span>Comanda n. 404</span>
                  <span>{ora}</span>
                </p>
                <p className="nf-riga">Tavolo: ?</p>
                <p className="nf-riga nf-esaurito">
                  <span>1× la pagina che cercavi</span>
                  <b>esaurita</b>
                </p>
                <p className="nf-sotto">Disponibili oggi</p>
                <ul>
                  {PORTATE.map(([href, label]) => (
                    <li key={href} className="nf-riga">
                      <Link href={href}>
                        <span>1× {label}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="nf-piede">Grazie e torna presto</p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
