import {useEffect, useId, useRef, useState} from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import * as fbq from '../../lib/fpixel'
import {gtmEvent} from '../../lib/gtm'
import {usePlausible} from 'next-plausible'
import {logStructuredError} from '../../lib/logging'

import {H2} from '../typography'

import {Grid} from '../grid'
import {Spacer} from '../spacer'
import {CheckIcon} from '../icons/check-icon'

// Stesso linguaggio della newsletter nel footer: campi "a linea" (solo filetto
// inferiore), testo 18px, focus = outline globale fiamma-testo (revamp.css).
// Trasparenti, quindi reggono sia su bianco sia su calce.
const field =
  'block w-full rounded-none border-0 border-b border-ghisa/25 bg-transparent px-0 text-lg text-ghisa transition-colors placeholder:text-acciaio hover:border-ghisa/60 focus:border-ghisa disabled:cursor-not-allowed disabled:border-ghisa/10 disabled:text-acciaio aria-[invalid=true]:border-red-600'
// L'ombra inset copre il fondo che il browser dà all'autofill. Sul riquadro
// `featured` (gray-100) basta quella di globals.css, che è già gray-100.
const autofillOnWhite =
  'autofill:!shadow-[inset_0_0_0_999px_var(--color-white)]'
const labelClass = 'block text-sm font-medium text-acciaio'
const checkLabel =
  'flex min-h-12 cursor-pointer items-center gap-3 text-base text-acciaio'
// `!`: revamp.css forza accent fiamma-testo sui checkbox in .site-content form.
const checkbox = 'h-5 w-5 shrink-0 cursor-pointer !accent-ghisa'

// Sostituisce `Field` di form-element.jsx solo qui: stessi attributi (name,
// id, required, autoComplete, aria-invalid, aria-describedby).
function LineField({
  id,
  label,
  error,
  textarea,
  featured,
  className,
  ...props
}) {
  const errorId = `${id}-error`
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <Tag
        {...props}
        id={id}
        rows={textarea ? 4 : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={clsx(
          field,
          textarea ? 'min-h-[8rem] resize-y py-3' : 'h-12',
          !featured && autofillOnWhite,
        )}
      />
      {error ? (
        <p
          role="alert"
          id={errorId}
          className="mt-2 text-sm font-medium text-red-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default function ContactForm({
  compact = false,
  hasAutoFocus,
  featured,
  groups,
}) {
  const plausible = usePlausible()
  const [form, setForm] = useState({
    referente: '',
    email: '',
    tel: '',
    company: '',
    formContent: '',
    honeypot: '',
    newsletterGroupId: '101815183615198233',
  })
  const {
    referente,
    email,
    tel,
    formContent,
    company,
    newsletterGroupId,
    source,
  } = form

  const [isCheckedTerms, setIsCheckedTerms] = useState(false)
  const [isCheckedNewsletter, setIsCheckedNewsletter] = useState(false)
  const [formButtonDisabled, setFormButtonDisabled] = useState(false)
  const [notification, setNotification] = useState({
    text: '',
    isError: false,
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const inputName = useRef(null)
  const uid = useId()

  const handleChange = e => {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value,
    })
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({...prev, [name]: ''}))
    }
  }

  useEffect(() => {
    hasAutoFocus && inputName.current.focus()
  }, [hasAutoFocus])

  useEffect(() => {
    if (isCheckedTerms && notification.text.includes('termini')) {
      setNotification({text: '', isError: false})
    }
  }, [isCheckedTerms, notification.text])

  async function submitContactForm(event) {
    event.preventDefault()

    // Clear previous errors
    setFieldErrors({})

    // Required: Nome, Messaggio, Terms, and at least one of Email or Tel
    const errors = {}
    if (!referente) errors.referente = 'Nome è obbligatorio'
    if (!formContent) errors.formContent = 'Messaggio è obbligatorio'
    if (!email && !tel) {
      errors.email = 'Inserisci almeno uno tra Email o Telefono'
      errors.tel = 'Inserisci almeno uno tra Email o Telefono'
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return setNotification({
        text: 'Controlla i campi evidenziati',
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
      const payload = {
        referente,
        senderMail: email,
        tel,
        company,
        formContent,
        honeypot: form.honeypot,
      }
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })
      const data = await r.json().catch(() => ({}))

      if (!r.ok) {
        throw new Error(data.error || 'Errore invio form')
      }

      // success
      setFormButtonDisabled(true)
      setNotification({
        text: 'Grazie, ti ricontatteremo al più presto',
        isError: false,
      })
      fbq.event('Contact')
      gtmEvent('contact')
      plausible('Contatti', {props: {form_location: 'Contact Form'}})
      setForm({
        ...form,
        referente: '',
        email: '',
        tel: '',
        company: '',
        formContent: '',
        honeypot: '',
      })
      setIsCheckedTerms(false)

      // newsletter
      if (isCheckedNewsletter) {
        try {
          const resSubscription = await fetch('/api/subscribe', {
            body: JSON.stringify({
              email: email,
              groupId: newsletterGroupId,
              name: referente,
              company: company,
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
          })
          const {message, error} = await resSubscription.json()
          plausible('New subscriber', {props: {form_location: 'Contact Form'}})
          gtmEvent('new_subscriber', {formLocation: 'Contact Form'})
          if (error) setNotification({text: error, isError: true})
          if (message) setNotification({text: message, isError: false})
        } catch (err) {
          logStructuredError('subscribe', err, {
            email,
            newsletterGroupId,
            referente,
            company,
          })
        }
      }
    } catch (err) {
      logStructuredError('contact-form-submit', err, {
        referente,
        senderMail: email,
        company,
        error: err.message || "Errore durante l'invio",
      })
      setNotification({
        text: err.message || "Errore durante l'invio",
        isError: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const done = formButtonDisabled
  const termsError =
    notification.isError && notification.text.includes('termini')
  const errorId = `${uid}-error`

  return (
    <Grid featured={featured}>
      <form
        className="col-span-full mt-8"
        onSubmit={submitContactForm}
        aria-busy={loading}
      >
        {!compact && (
          <>
            <H2 as="h2">
              Hai un progetto da realizzare o hai bisogno di informazioni?
            </H2>
            <p className="form-description">
              Completa questo modulo, un nostro consulente ti ricontatterà.
            </p>
            <Spacer size="2xs" />
          </>
        )}
        <Grid nested className="gap-y-8">
          <LineField
            id={`${uid}-referente`}
            name="referente"
            label="Nome*"
            error={fieldErrors.referente}
            autoComplete="given-name"
            required
            disabled={formButtonDisabled || loading}
            value={referente}
            onChange={handleChange}
            className="col-span-full md:col-span-4 lg:col-span-6"
            featured={featured}
          />
          <LineField
            id={`${uid}-email`}
            name="email"
            label="Email"
            autoComplete="email"
            inputMode="email"
            error={fieldErrors.email}
            disabled={formButtonDisabled || loading}
            value={email}
            onChange={handleChange}
            className="col-span-full md:col-span-4 lg:col-span-6"
            featured={featured}
          />
          <LineField
            id={`${uid}-tel`}
            name="tel"
            label="Tel"
            autoComplete="tel"
            inputMode="tel"
            error={fieldErrors.tel}
            disabled={formButtonDisabled || loading}
            value={tel}
            onChange={handleChange}
            className="col-span-full md:col-span-4 lg:col-span-6"
            featured={featured}
          />
          <LineField
            id={`${uid}-company`}
            name="company"
            label="Denominazione Aziendale"
            autoComplete="organization"
            disabled={formButtonDisabled || loading}
            value={company}
            onChange={handleChange}
            className="col-span-full md:col-span-4 lg:col-span-6"
            featured={featured}
          />
          <LineField
            id={`${uid}-formContent`}
            name="formContent"
            label="Messaggio"
            error={fieldErrors.formContent}
            required
            disabled={formButtonDisabled || loading}
            value={formContent}
            onChange={handleChange}
            textarea
            className="col-span-full"
            featured={featured}
          />
        </Grid>
        {/* Honeypot anti-spam field (hidden from users) */}
        <input
          type="text"
          name="honeypot"
          value={form.honeypot}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden
          style={{
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        />

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-1">
            <label className={checkLabel}>
              <input
                type="checkbox"
                className={checkbox}
                name="newsletter"
                checked={isCheckedNewsletter}
                onChange={() => setIsCheckedNewsletter(!isCheckedNewsletter)}
              />
              <span>Voglio rimanere aggiornato su novità e promozioni</span>
            </label>
            {isCheckedNewsletter ? (
              <div className="mb-3 ml-8 max-w-sm">
                <label htmlFor={`${uid}-group`} className={labelClass}>
                  Scegli il tuo settore
                </label>
                <div className="relative">
                  <select
                    id={`${uid}-group`}
                    value={newsletterGroupId}
                    name="newsletterGroupId"
                    onChange={handleChange}
                    className={clsx(
                      field,
                      // `!`: revamp.css dà a `.site-content form select` un
                      // bordo pieno su 4 lati che batterebbe le classi.
                      'h-12 cursor-pointer appearance-none truncate pr-8 !rounded-none !border-0 !border-b !border-ghisa/25 hover:!border-ghisa/60 focus:!border-ghisa',
                    )}
                  >
                    {groups.map(group => {
                      return (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      )
                    })}
                  </select>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ghisa"
                  >
                    <path
                      d="m4 6 4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            ) : null}
            <label className={checkLabel}>
              <input
                type="checkbox"
                className={checkbox}
                name="conditions"
                checked={isCheckedTerms}
                onChange={() => setIsCheckedTerms(!isCheckedTerms)}
                aria-invalid={termsError}
                aria-describedby={termsError ? errorId : undefined}
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
          </div>

          {/* Pulsante e conferma nella stessa cella: a invio riuscito il
              pulsante sparisce (resta disattivato) e il messaggio entra con
              una dissolvenza; senza movimento se ridotto. */}
          <div className="grid shrink-0 [&>*]:[grid-area:1/1]">
            <button
              type="submit"
              disabled={loading || formButtonDisabled}
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
                  {!notification.text
                    ? `Grazie, ti ricontatteremo al più presto`
                    : notification.text}
                </>
              )}
            </p>
          </div>
        </div>

        {notification.isError ? (
          <p
            id={errorId}
            role="alert"
            className="mt-6 text-base font-medium text-red-600"
          >
            {notification.text}
          </p>
        ) : null}
      </form>
    </Grid>
  )
}
