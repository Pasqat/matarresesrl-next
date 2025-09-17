import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {gtmEvent} from '../../lib/gtm'
import {usePlausible} from 'next-plausible'
import {logStructuredError} from '../../lib/logging'

import {H2} from '../typography'

import {Field, Label, NotificationPanel} from '../form-element'
import {Grid} from '../grid'
import {Spacer} from '../spacer'
import {ArrowButton} from '../arrow-button'
import {CheckIcon} from '../icons/check-icon'
import clsx from 'clsx'

export default function NewsletterForm({
  hasAutoFocus,
  featured,
  groups,
  title = 'Iscriviti alla nostra newsletter',
  subtitle = '',
  nested,
}) {
  const plausible = usePlausible()

  const [form, setForm] = useState({
    email: '',
    newsletterGroupId: '101815183615198233',
    honeypot: '',
  })
  const {email, newsletterGroupId, honeypot} = form

  const [isCheckedTerms, setIsCheckedTerms] = useState(false)
  const [formButtonDisabled, setFormButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
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

    if (email === '') {
      return setNotification({
        ...notification,
        text: 'Per favore inserisci la tua mail',
        isError: true,
      })
    }

    if (isCheckedTerms === false) {
      return setNotification({
        ...notification,
        text: 'Non dimenticare di accettare i termini e le condizioni',
        isError: true,
      })
    }

    setLoading(true)
    try {
      // Send request with honeypot
      const resSubscription = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          groupId: newsletterGroupId,
          honeypot,
        }),
      })

      const data = await resSubscription.json().catch(() => ({}))

      if (!resSubscription.ok) {
        throw new Error(data.error || "Errore durante l'iscrizione")
      }

      gtmEvent('new_subscriber', {formLocation: 'page'})
      plausible('Iscrizione Newsletter', {
        props: {form_location: 'page', groupId: newsletterGroupId},
      })

      setFormButtonDisabled(true)
      setNotification({
        text: 'Grazie per la tua iscrizione!',
        isError: false,
      })

      setForm({
        ...form,
        email: '',
        honeypot: '',
      })

      setIsCheckedTerms(false)
    } catch (err) {
      logStructuredError('newsletter-form-submit', err, {
        email,
        groupId: newsletterGroupId,
        error: err.message || "Errore durante l'iscrizione",
      })

      setNotification({
        text: err.message || "Errore durante l'iscrizione",
        isError: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid nested={nested} featured={featured}>
      <form className="col-span-full space-y-4" onSubmit={submitContactForm}>
        <H2 as="h4">{title}</H2>
        <H2 as="p" variant="secondary">
          {subtitle}
        </H2>
        <Spacer size="3xs" />
        <Grid nested>
          <Field
            name="email"
            label="Email"
            autoComplete="email"
            // error={notification.isError ? notification.text : null}
            required
            disabled={formButtonDisabled}
            value={email}
            onChange={handleChange}
            className="col-span-full lg:col-span-6"
            featured={featured}
          />
          <div className="col-span-full mb-4 lg:col-span-6">
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <Label htmlFor="industry">Settore</Label>
              {/* {notification.isError ? (
                <InputError id="industry-error">{notification.text}</InputError>
              ) : null} */}
            </div>
            <select
              id="industry"
              value={newsletterGroupId}
              name="newsletterGroupId"
              onChange={handleChange}
              className={clsx(
                'focus-ring focus-ring w-full rounded-lg px-8 py-[1.17rem] text-lg font-medium text-black placeholder-gray-500 caret-yellow-500 disabled:bg-gray-100 disabled:text-gray-400 ',
                featured ? 'bg-white' : 'bg-gray-100',
              )}
              aria-describedby={
                notification.isError ? 'industry-error' : undefined
              }
            >
              {groups.map(group => {
                return (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                )
              })}
            </select>
          </div>
        </Grid>
        {/* Honeypot anti-spam field (hidden from users) */}
        <input
          type="text"
          name="honeypot"
          value={honeypot}
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

        <div className="col-span-full text-base">
          <label className="flex-end inline-flex w-full items-center">
            <input
              type="checkbox"
              className="cursor-pointer border-2 border-solid border-gray-400 text-yellow-500 checked:bg-yellow-500"
              name="conditions"
              checked={isCheckedTerms}
              onChange={() => setIsCheckedTerms(!isCheckedTerms)}
            />
            <span className="ml-2">
              Accetto il{' '}
              <Link href="/privacy-policy">
                <a className="text-yellow-500" target="_blank">
                  trattamento dei dati e condizioni *
                </a>
              </Link>
            </span>
          </label>
        </div>

        {notification.isError ? (
          <NotificationPanel isError={notification.isError}>
            {notification.text}
          </NotificationPanel>
        ) : null}

        <div className="text-right">
          {formButtonDisabled ? (
            <div className="flex justify-end">
              <CheckIcon />
              <p className="text-secondary text-lg">
                {!notification.text
                  ? `Grazie, ti ricontatteremo al più presto`
                  : notification.text}
              </p>
            </div>
          ) : (
            <ArrowButton
              className="pt-4"
              type="submit"
              direction="right"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Invio...' : 'Invia'}
            </ArrowButton>
          )}
        </div>
      </form>
    </Grid>
  )
}
