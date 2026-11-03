import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as fbq from '../../lib/fpixel'
import {gtmEvent} from '../../lib/gtm'
import {usePlausible} from 'next-plausible'
import {logStructuredError} from '../../lib/logging'

import Head from 'next/head'

import clsx from 'clsx'

import Layout from '../../components/Layout'
import ContactModal from '../../components/Form/ContactModal'
import Magnetic from '../../components/Magnetic'
import HeroCinema from '../../components/cinema/HeroCinema'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import PilaCard from '../../components/cinema/PilaCard'
import Passi from '../../components/cinema/Passi'
import BottoneFreccia, {Freccia} from '../../components/cinema/BottoneFreccia'
import useRivela from '../../components/cinema/useRivela'
import heroImg from '../../public/img/home/assistenza-tecnica.webp'
import tecnicoImg from '../../public/img/assistenza/tecnico-cucina.webp'
import manutenzioneImg from '../../public/img/assistenza/manutenzione.webp'
import schedaImg from '../../public/img/assistenza/scheda-elettronica.webp'
import mareImg from '../../public/img/assistenza/intervento-sul-mare.webp'
import chiusuraImg from '../../public/img/homeBackground.webp'

import {getGroups} from '../../lib/newsletter'
import {CheckIcon} from '../../components/icons/check-icon'

// Foto dalla selezione "assistenza" di /dev/media (Foto servizi/1.assistenza tecnica).
const servizi = [
  {
    titolo: 'Intervento su guasto',
    testo:
      'Diagnosi e riparazione delle attrezzature per cottura, lavaggio, refrigerazione e aspirazione. Risposta di norma entro 48 ore su tutta la regione.',
    voci: [
      'Tecnici specializzati',
      'Urgenze nei festivi: risposta entro 24 ore, tariffa dedicata',
      'Ricambi dal nostro magazzino',
    ],
    immagine: tecnicoImg,
    alt: 'Tecnico Matarrese che ripara il circuito gas di una cucina professionale',
    posizione: '50% 45%',
    didascalia: 'Riparazione di una cucina a gas',
  },
  {
    titolo: 'Manutenzione programmata',
    testo:
      'Visite periodiche per controllare, pulire e regolare le macchine prima che si fermino. Frequenza e contenuto li definiamo insieme, sulla vostra cucina.',
    voci: [
      'Contratto su misura delle vostre attrezzature',
      'Controlli e regolazioni a scadenza',
      'Meno fermi durante il servizio',
    ],
    immagine: manutenzioneImg,
    alt: 'Tecnico Matarrese che fissa un componente con il cacciavite',
    posizione: '50% 40%',
  },
  {
    titolo: 'Ricambi',
    testo:
      'Un ampio magazzino ricambi per chiudere l’intervento il prima possibile, anche sulle parti elettroniche.',
    voci: [
      'Ampio magazzino ricambi',
      'Ricambi per le attrezzature che installiamo',
      'Richieste anche dal modulo qui sotto',
    ],
    immagine: schedaImg,
    alt: 'Mano del tecnico sulla scheda elettronica di un forno',
    posizione: '50% 35%',
  },
]

const passi = [
  [
    'Richiesta',
    'Ci scrivete dal modulo o chiamate la linea assistenza: marca, modello e cosa succede alla macchina.',
  ],
  [
    'Presa in carico',
    'Un tecnico valuta il problema e vi richiama per fissare l’intervento, di norma entro 48 ore.',
  ],
  [
    'Intervento',
    'Diagnosi e riparazione nel locale, con i ricambi del nostro magazzino.',
  ],
  [
    'Prevenzione',
    'Se la macchina lo chiede, vi proponiamo un contratto di manutenzione programmata per evitare il prossimo fermo.',
  ],
]

// Campi "a linea" come LineField di components/Form/ContactForm.jsx, qui su
// carta: sostituiscono `Field` con gli stessi name/required/placeholder.
// Il focus è l'outline globale fiamma-testo di revamp.css, AA su chiaro.
const field =
  'block w-full rounded-none border-0 border-b border-ghisa/25 bg-transparent px-0 text-lg text-ghisa transition-colors placeholder:text-acciaio hover:border-ghisa/60 focus:border-ghisa disabled:cursor-not-allowed disabled:border-ghisa/10 disabled:text-acciaio autofill:!shadow-[inset_0_0_0_999px_var(--carta)]'

function LineField({id, label, textarea, className, ...props}) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-acciaio">
        {label}
      </label>
      <Tag
        {...props}
        id={id}
        rows={textarea ? 5 : undefined}
        className={clsx(
          field,
          textarea ? 'min-h-[9rem] resize-y py-3' : 'h-12',
        )}
      />
    </div>
  )
}

export default function Assistenza() {
  const rivela = useRef(null)
  useRivela(rivela)
  const plausible = usePlausible()
  const [form, setForm] = useState({
    company: '',
    tel: '',
    senderMail: '',
    referente: '',
    indirizzo: '',
    formContent: '',
  })
  const {company, tel, senderMail, formContent, referente, indirizzo} = form

  const [isCheckedTerms, setIsCheckedTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [notification, setNotification] = useState({
    text: '',
    isError: false,
  })

  const handleChange = e => {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  useEffect(() => {
    if (isCheckedTerms && notification.text.includes('termini')) {
      setNotification({text: '', isError: false})
    }
  }, [isCheckedTerms, notification.text])

  const done = !notification.isError && Boolean(notification.text)
  const termsError =
    notification.isError && notification.text.includes('termini')

  async function submitContactForm(event) {
    event.preventDefault()

    // Anti-spam check
    if (honeypot) {
      setNotification({
        text: 'Rilevato tentativo di spam',
        isError: true,
      })
      return
    }

    if (
      company === '' ||
      senderMail === '' ||
      formContent === '' ||
      tel === '' ||
      referente === '' ||
      indirizzo === ''
    ) {
      return setNotification({
        text: 'Per favore compila tutti i campi',
        isError: true,
      })
    }

    if (isCheckedTerms === false) {
      return setNotification({
        text: 'Non dimenticare di accettare i termini e le condizioni',
        isError: true,
      })
    }

    setLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          company,
          senderMail,
          tel,
          referente,
          indirizzo,
          formContent,
          honeypot,
          privacy: true,
          source: 'assistenza',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Errore durante l'invio del messaggio",
        )
      }

      setNotification({
        text: 'Grazie, ti ricontatteremo al più presto',
        isError: false,
      })

      fbq.event('Contact')
      gtmEvent('contact')
      plausible('Contatti', {props: {form_location: 'Assistenza'}})

      setForm({
        company: '',
        senderMail: '',
        tel: '',
        referente: '',
        indirizzo: '',
        formContent: '',
      })
      setIsCheckedTerms(false)
    } catch (err) {
      logStructuredError('Contact form submission failed', err, {
        formLocation: 'Assistenza',
        senderMail,
      })
      setNotification({
        text:
          err.message ||
          "Si è verificato un errore durante l'invio. Riprova più tardi.",
        isError: true,
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Head>
        <title>
          Assistenza tecnica, manutenzione e ricambi per cucine professionali |
          Matarrese srl
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/assistenza`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Assistenza tecnica, manutenzione programmata e ricambi per attrezzature da ristorazione in Puglia: risposta di norma entro 48 ore, linea dedicata e tecnici specializzati."
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Assistenza tecnica | Matarrese" />
        <meta
          property="og:description"
          content="La cucina non si ferma. Noi nemmeno: intervento su guasto, manutenzione programmata e ricambi."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/home/assistenza-tecnica.webp`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/assistenza`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout navbarTransparent headerCta={{href: '#richiesta'}}>
        <HeroCinema
          image={heroImg}
          alt="Tecnico Matarrese al lavoro su una friggitrice professionale"
          eyebrow="Assistenza tecnica · Manutenzione · Ricambi · Puglia"
          riga="La cucina non si ferma."
          accento="Noi nemmeno."
          sottotitolo="Tecnici specializzati, magazzino ricambi e risposta di norma entro 48 ore su tutta la regione. Per riparare un guasto, o per non averne."
          voci={['Intervento su guasto', 'Manutenzione programmata', 'Ricambi']}
        >
          <Magnetic>
            <BottoneFreccia href="#richiesta">
              Richiedi un intervento
            </BottoneFreccia>
          </Magnetic>
          <a href="tel:+390804323651" className="cin-link whitespace-nowrap">
            Chiama +39 080 4323 651
          </a>
        </HeroCinema>

        <div ref={rivela}>
          <section
            className="bg-[#0d0e0f] text-white"
            data-header="dark"
            aria-labelledby="servizi-assistenza"
          >
            <div className="site-shell pt-24 text-center md:pt-36">
              <span className="eyebrow-cinema" data-cin-reveal>
                Cosa facciamo
              </span>
              <TitoloDueTempi
                id="servizi-assistenza"
                riga="Un guasto, una revisione, un ricambio."
                accento="Un solo numero."
                className="mx-auto mt-6 max-w-[18ch] text-[clamp(36px,5vw,72px)] !leading-none"
                data-cin-reveal
                style={{'--y': '40px'}}
              />
            </div>
            <PilaCard card={servizi} />
          </section>

          <section
            className="relative z-[1] -mt-12 rounded-t-[32px] bg-[#121315] py-24 text-white md:rounded-t-[48px] md:py-36"
            data-header="dark"
            aria-labelledby="come-funziona"
          >
            <div className="site-shell grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <span className="eyebrow-cinema" data-cin-reveal>
                  Come funziona
                </span>
                <TitoloDueTempi
                  id="come-funziona"
                  riga="Dalla chiamata"
                  accento="alla cucina che riparte."
                  className="mt-6 text-[clamp(36px,5vw,72px)] !leading-none"
                  data-cin-reveal
                  style={{'--y': '40px'}}
                />
                <figure className="relative mt-9 aspect-[4/3] overflow-hidden rounded-[28px]">
                  <Image
                    src={mareImg}
                    alt="Attrezzi del tecnico su una terrazza a strapiombo sul mare"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    placeholder="blur"
                    className="object-cover"
                    style={{objectPosition: '50% 60%'}}
                  />
                  <figcaption className="cin-didascalia">
                    Dove serve, anche sul mare
                  </figcaption>
                </figure>
              </div>
              <div className="lg:col-span-7">
                <Passi passi={passi} />
                <dl className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow-cinema">Linea assistenza</dt>
                    <dd className="mt-3">
                      <a
                        href="tel:+390804323651"
                        className="type-display whitespace-nowrap text-[clamp(24px,2.4vw,32px)] text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-fiamma"
                      >
                        +39 080 4323 651
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow-cinema">Orari</dt>
                    <dd className="mt-3 max-w-[40ch] text-inox">
                      Lun–ven, 08:30–13:00 / 15:00–17:30. Nei festivi risposta
                      alle urgenze entro 24 ore; eventuale intervento con
                      tariffa dedicata.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>

        <section
          id="richiesta"
          className="scroll-mt-24 bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="richiesta-title"
        >
          <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-4">
              <TitoloDueTempi
                id="richiesta-title"
                tono="chiaro"
                riga="Raccontateci il guasto."
                accento="Ci pensiamo noi."
                className="text-[clamp(32px,3.6vw,56px)] !leading-none"
              />
              <p className="mt-6 max-w-[40ch] text-acciaio">
                Indicate marca e modello della macchina e cosa succede: il
                tecnico arriva già con un’idea del problema e, se serve, con il
                ricambio.
              </p>
            </div>

            <form
              className="lg:col-span-7 lg:col-start-6"
              onSubmit={submitContactForm}
              aria-busy={loading}
            >
              {/* Honeypot field */}
              <div style={{display: 'none'}}>
                <label>
                  Non compilare questo campo se sei umano
                  <input
                    type="text"
                    name="honeypot"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
                <LineField
                  id="assistenza-company"
                  name="company"
                  label="Ragione Sociale*"
                  autoComplete="organization"
                  required
                  disabled={loading}
                  value={company}
                  onChange={handleChange}
                  className="md:col-span-2"
                  placeholder="Matarrese srl"
                />
                <LineField
                  id="assistenza-indirizzo"
                  name="indirizzo"
                  label="Indirizzo Completo*"
                  autoComplete="street-address"
                  required
                  disabled={loading}
                  value={indirizzo}
                  onChange={handleChange}
                  placeholder="contrada popoleto, nc Alberobello (BA)"
                />
                <LineField
                  id="assistenza-senderMail"
                  name="senderMail"
                  label="Email*"
                  autoComplete="email"
                  inputMode="email"
                  required
                  disabled={loading}
                  value={senderMail}
                  onChange={handleChange}
                  placeholder="name@example.it"
                />
                <LineField
                  id="assistenza-tel"
                  name="tel"
                  label="Tel*"
                  autoComplete="tel"
                  inputMode="tel"
                  disabled={loading}
                  value={tel}
                  onChange={handleChange}
                  placeholder="0804323431"
                />
                <LineField
                  id="assistenza-referente"
                  name="referente"
                  label="Referente*"
                  autoComplete="name"
                  disabled={loading}
                  value={referente}
                  onChange={handleChange}
                  placeholder="Nome Cognome"
                />
                <LineField
                  id="assistenza-formContent"
                  name="formContent"
                  label="Descrizione del problema*"
                  required
                  disabled={loading}
                  value={formContent}
                  onChange={handleChange}
                  textarea
                  className="md:col-span-2"
                />
              </div>

              <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <label className="flex min-h-12 cursor-pointer items-center gap-3 text-base text-acciaio">
                  <input
                    type="checkbox"
                    className="h-5 w-5 shrink-0 cursor-pointer !accent-ghisa"
                    name="conditions"
                    checked={isCheckedTerms}
                    onChange={() => setIsCheckedTerms(!isCheckedTerms)}
                    aria-invalid={termsError}
                    aria-describedby={
                      termsError ? 'assistenza-error' : undefined
                    }
                  />
                  <span>
                    Accetto il{' '}
                    <Link
                      href="/privacy-policy"
                      className="text-fiamma-testo underline decoration-fiamma-testo/40 underline-offset-4 transition-colors hover:decoration-fiamma-testo"
                      target="_blank"
                    >
                      trattamento dei dati e condizioni
                    </Link>
                    &nbsp;*
                  </span>
                </label>

                {/* Come ContactForm: a invio riuscito il pulsante sparisce e
                    la conferma entra con una dissolvenza (niente movimento se
                    ridotto). */}
                <div className="grid shrink-0 [&>*]:[grid-area:1/1]">
                  <button
                    type="submit"
                    disabled={loading || done}
                    aria-hidden={done || undefined}
                    className={clsx(
                      'cta-ghisa group w-full justify-center gap-3 rounded-full text-base transition-[background-color,opacity,visibility] duration-300 disabled:cursor-wait md:w-auto motion-reduce:transition-none',
                      done && 'invisible opacity-0',
                    )}
                  >
                    {loading ? 'Invio...' : 'Invia la richiesta'}
                    {loading ? (
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white motion-safe:animate-spin"
                      />
                    ) : (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0"
                      >
                        <path
                          d="M2 8h11M9 4l4 4-4 4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                  </button>
                  <p
                    role="status"
                    className={clsx(
                      'flex items-center gap-3 text-lg font-medium text-ghisa transition-[opacity,transform] delay-100 duration-500 ease-out motion-reduce:transition-none',
                      done
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-2 opacity-0 motion-reduce:translate-y-0',
                    )}
                  >
                    {done && (
                      <>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ghisa text-white">
                          <CheckIcon />
                        </span>
                        {notification.text}
                      </>
                    )}
                  </p>
                </div>
              </div>

              {notification.isError ? (
                <p
                  id="assistenza-error"
                  role="alert"
                  className="mt-6 text-base font-medium text-red-600"
                >
                  {notification.text}
                </p>
              ) : null}
            </form>
          </div>
        </section>

        <section
          className="relative overflow-hidden py-28 text-center text-white md:py-40"
          data-header="dark"
          aria-labelledby="sopralluogo-title"
        >
          <Image
            src={chiusuraImg}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0d0e0f]/[.82]" />
          <div className="site-shell relative max-w-[820px]">
            <TitoloDueTempi
              id="sopralluogo-title"
              riga="Una cucina da rifare?"
              accento="Partiamo dal sopralluogo."
              className="text-[clamp(36px,5.4vw,80px)] !leading-none"
            />
            <p className="mx-auto mt-6 max-w-[34rem] text-[rgb(243_238_230/.75)]">
              Se le attrezzature sono a fine corsa o la cucina non regge più il
              lavoro, un nostro progettista viene nel locale, misura spazi e
              impianti e vi propone la soluzione.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3.5">
              <ContactModal
                variant="progetto"
                title="Richiedi un sopralluogo."
                subtitle="Tre domande, meno di un minuto. Poi ti ricontattiamo per fissare il sopralluogo nel locale."
                source="assistenza-sopralluogo"
                className="cin-btn"
              >
                Richiedi un sopralluogo
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

export async function getStaticProps() {
  const groups = await getGroups()
  return {
    props: {
      groups,
    },
  }
}
