import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {gtmEvent} from '../../lib/gtm'
import {usePlausible} from 'next-plausible'
import {logStructuredError} from '../../lib/logging'
import clsx from 'clsx'
import {CheckIcon} from '../icons/check-icon'

// Campi "a linea" su calce: solo filetto inferiore, 48px di altezza. Il focus
// è l'outline globale fiamma-testo (styles/revamp.css), già AA su chiaro.
// L'ombra inset sovrascrive il fondo grigio che globals.css dà all'autofill.
const field =
  'block h-12 w-full rounded-none border-0 border-b border-ghisa/30 bg-transparent px-0 text-lg text-ghisa transition-colors placeholder:text-acciaio hover:border-ghisa/60 focus:border-ghisa aria-[invalid=true]:border-red-600 autofill:!shadow-[inset_0_0_0_999px_var(--calce)]'
const label = 'block text-sm font-medium text-acciaio'

export default function NewsletterForm({hasAutoFocus, groups}) {
  const plausible = usePlausible()

  const [form, setForm] = useState({
    email: '',
    newsletterGroupId: '101815183615198233',
  })
  const {email, newsletterGroupId} = form

  const [isCheckedTerms, setIsCheckedTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [notification, setNotification] = useState({
    text: '',
    isError: false,
  })

  const inputName = useRef(null)

  const handleChange = e => {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value,
    })
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

    // Anti-spam check
    if (honeypot) {
      setNotification({
        text: 'Rilevato tentativo di spam',
        isError: true,
      })
      return
    }

    if (email === '') {
      return setNotification({
        text: 'Non dimenticare la mail',
        isError: true,
      })
    }

    if (isCheckedTerms === false) {
      return setNotification({
        text: 'Accetta i termini e le condizioni',
        isError: true,
      })
    }

    setLoading(true)
    try {
      const resSubscription = await fetch('/api/subscribe', {
        body: JSON.stringify({
          email: email,
          groupId: newsletterGroupId,
          honeypot,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const data = await resSubscription.json()

      if (!resSubscription.ok) {
        throw new Error(data.error || "Errore durante l'iscrizione")
      }

      plausible('Iscrizione Newsletter', {
        props: {form_location: 'footer', groupId: newsletterGroupId},
      })
      gtmEvent('new_subscriber', {formLocation: 'footer'})

      setNotification({
        text: data.message || 'Iscrizione effettuata con successo',
        isError: false,
      })

      setForm({
        ...form,
        email: '',
      })
    } catch (err) {
      logStructuredError('Newsletter subscription failed', err, {
        email: email,
        groupId: newsletterGroupId,
        location: 'footer',
      })
      setNotification({
        text:
          err.message ||
          "Si è verificato un errore durante l'iscrizione. Riprova più tardi.",
        isError: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const done = !notification.isError && Boolean(notification.text)
  const termsError =
    notification.isError && notification.text.includes('termini')
  const emailError = notification.isError && !termsError

  return (
    <form onSubmit={submitContactForm}>
      <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
        <div>
          <label htmlFor="newsletter-email" className={label}>
            Email
          </label>
          <input
            ref={inputName}
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={handleChange}
            placeholder="nome@azienda.it"
            aria-invalid={emailError}
            aria-describedby={
              notification.isError ? 'newsletter-error' : undefined
            }
            className={field}
          />
        </div>

        <div>
          <label htmlFor="industry" className={label}>
            {/* copy da approvare */}
            Il tuo settore
          </label>
          <div className="relative">
            <select
              id="industry"
              value={newsletterGroupId}
              name="newsletterGroupId"
              onChange={handleChange}
              className={clsx(
                field,
                'cursor-pointer appearance-none truncate pr-8',
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
      </div>

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

      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <label className="flex min-h-12 cursor-pointer items-center gap-3 text-base text-acciaio">
          <input
            type="checkbox"
            className="h-5 w-5 shrink-0 cursor-pointer accent-ghisa"
            name="conditions"
            checked={isCheckedTerms}
            onChange={() => setIsCheckedTerms(!isCheckedTerms)}
            aria-invalid={termsError}
            aria-describedby={termsError ? 'newsletter-error' : undefined}
          />
          <span>
            Accetto il{' '}
            <Link
              href="/privacy-policy"
              className="text-fiamma-testo underline decoration-fiamma-testo/40 underline-offset-4 transition-colors hover:decoration-fiamma-testo"
              target="_blank"
            >
              trattamento dei dati e condizioni *
            </Link>
          </span>
        </label>

        {/* Pulsante e conferma nella stessa cella: a iscrizione riuscita il
            pulsante sparisce (e si disattiva, niente reinvio con Invio) e il
            messaggio entra con una dissolvenza; senza movimento se ridotto. */}
        <div className="grid shrink-0 [&>*]:[grid-area:1/1]">
          <button
            type="submit"
            disabled={loading || done}
            aria-hidden={done || undefined}
            className={clsx(
              'group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm bg-ghisa px-7 text-base font-medium text-calce transition-[background-color,opacity,visibility] duration-300 hover:bg-grafite disabled:cursor-wait md:w-auto motion-reduce:transition-none',
              done && 'invisible opacity-0',
            )}
          >
            {loading ? 'Invio…' : 'Iscriviti'}
            {loading ? (
              <span
                aria-hidden="true"
                className="h-4 w-4 rounded-full border-2 border-calce/30 border-t-calce motion-safe:animate-spin"
              />
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
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
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ghisa text-calce">
                  <CheckIcon />
                </span>
                {notification.text}
              </>
            )}
          </p>
        </div>
      </div>

      {notification.isError && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-4 text-base font-medium text-red-600"
        >
          {notification.text}
        </p>
      )}
    </form>
  )
}
