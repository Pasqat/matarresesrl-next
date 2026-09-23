import {useEffect, useState} from 'react'
import Link from 'next/link'
import * as fbq from '../../lib/fpixel'
import {gtmEvent} from '../../lib/gtm'
import {usePlausible} from 'next-plausible'
import {logStructuredError} from '../../lib/logging'

import Head from 'next/head'

import clsx from 'clsx'

import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'

import {getGroups} from '../../lib/newsletter'
import {CheckIcon} from '../../components/icons/check-icon'

// Campi "a linea" come LineField di components/Form/ContactForm.jsx, qui su
// bianco: sostituiscono `Field` con gli stessi name/required/placeholder.
// Il focus è l'outline globale fiamma-testo di revamp.css, AA su chiaro.
const field =
  'block w-full rounded-none border-0 border-b border-ghisa/25 bg-transparent px-0 text-lg text-ghisa transition-colors placeholder:text-acciaio hover:border-ghisa/60 focus:border-ghisa disabled:cursor-not-allowed disabled:border-ghisa/10 disabled:text-acciaio autofill:!shadow-[inset_0_0_0_999px_var(--color-white)]'

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
        <title>Assistenza | Matarrese srl</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/assistenza/`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Hai bisogno di assistenza tecnica? Compila il form"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Assistenza" />
        <meta property="og:description" content="Richiedi assistenza tecnica" />
        {/*  change image */}
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/assistenza/`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout navbarTransparent>
        <PageHero
          title="Hai bisogno di assistenza tecnica?"
          intro="Scrivici, ti ricontatteremo al più presto."
          tall={false}
        >
          <a
            href="#richiesta"
            className="cta-fiamma focus-visible:outline-white"
          >
            {/* copy da approvare */}
            Compila la richiesta
          </a>
          <a
            href="tel:+390804323651"
            className="whitespace-nowrap border-b border-inox/60 py-2 text-white transition-colors hover:border-white focus-visible:outline-white"
          >
            {/* copy da approvare */}
            Oppure chiama +39 080 4323 651
          </a>
        </PageHero>

        <section
          id="richiesta"
          className="bg-white text-ghisa"
          data-header="light"
          aria-labelledby="richiesta-title"
        >
          <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-4">
              <h2
                id="richiesta-title"
                className="type-display text-[clamp(30px,3.4vw,52px)]"
              >
                {/* copy da approvare */}
                Richiesta di intervento
              </h2>
              {/* Testo dalla FAQ "Offrite assistenza tecnica e manutenzione?" */}
              <p className="mt-6 max-w-[40ch] text-acciaio">
                Disponiamo di un ampio magazzino ricambi e di tecnici
                specializzati. Il servizio di risposta per l’assistenza tecnica
                è tipicamente entro 48 ore dalla richiesta su tutto il
                territorio regionale.
              </p>
              {/* Numero e orari dell'assistenza: gli stessi del footer */}
              <dl className="mt-8 border-t border-ghisa/15 pt-6">
                <dt className="text-sm text-acciaio">Linea assistenza</dt>
                <dd>
                  <a
                    href="tel:+390804323651"
                    className="type-display mt-1 inline-block whitespace-nowrap border-b border-ghisa/30 pb-1 text-[clamp(22px,2.2vw,30px)] transition-colors hover:border-ghisa"
                  >
                    +39 080 4323 651
                  </a>
                </dd>
                <dd className="mt-3 max-w-[40ch] text-acciaio">
                  Lun–ven, 08:30–13:00 / 15:00–17:30. Nei festivi risposta alle
                  urgenze entro 24 ore; eventuale intervento con tariffa
                  dedicata.
                </dd>
              </dl>
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
                      'cta-ghisa group w-full justify-center gap-3 text-base transition-[background-color,opacity,visibility] duration-300 disabled:cursor-wait md:w-auto motion-reduce:transition-none',
                      done && 'invisible opacity-0',
                    )}
                  >
                    {loading ? 'Invio...' : 'Invia'}
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
