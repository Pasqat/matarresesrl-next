import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {gtmEvent} from '../../lib/gtm'
import {usePlausible} from 'next-plausible'
import {logStructuredError} from '../../lib/logging'
import {ArrowButton} from '../arrow-button'

import {Paragraph} from '../typography'
import {Field} from '../form-element'
import clsx from 'clsx'
import {CheckIcon} from '../icons/check-icon'

export default function NewsletterForm({
  hasAutoFocus,
  featured,
  groups,
  title = 'Iscriviti alla nostra newsletter',
}) {
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

  return (
    <div className="mx-10vw">
      <form
        className="col-span-full mx-auto max-w-7xl "
        onSubmit={submitContactForm}
      >
        <div className="grid w-full grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12">
          <Paragraph className="col-span-full flex items-center lg:col-span-4">
            {title}
          </Paragraph>
          <Field
            name="email"
            // label="Email"
            autoComplete="email"
            error={notification.isError ? notification.text : null}
            required
            value={email}
            onChange={handleChange}
            className="col-span-full lg:col-span-4"
            featured={featured}
            placeholder="e-mail"
          />
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

          <div className="col-span-full mb-4 lg:col-span-4">
            <div className="mb-2 flex items-baseline justify-between gap-2">
              {/* <Label htmlFor="industry">Settore</Label> */}
            </div>
            <select
              id="industry"
              value={newsletterGroupId}
              name="newsletterGroupId"
              onChange={handleChange}
              className={clsx(
                'focus-ring w-full rounded-lg bg-white px-8 py-[1.17rem] text-lg font-medium text-black placeholder-gray-500 caret-yellow-500 disabled:bg-gray-100 disabled:text-gray-400',
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
        </div>
        <div className="flex-end col-span-full ml-auto">
          <label className="flex w-full items-center justify-end">
            <input
              type="checkbox"
              className="cursor-pointer border-2 border-solid border-gray-400 text-yellow-500 checked:bg-yellow-500"
              name="conditions"
              checked={isCheckedTerms}
              onChange={() => setIsCheckedTerms(!isCheckedTerms)}
            />
            <span className="ml-2">
              Accetto il{' '}
              <Link href="/privacy-policy" className="text-yellow-500" target="_blank">
                
                  trattamento dei dati e condizioni *
                
              </Link>
            </span>
          </label>
        </div>

        <div className="text-right">
          {!notification.isError && notification.text ? (
            <div className="flex justify-end">
              <CheckIcon />
              <p className="text-secondary text-lg">{notification.text}</p>
            </div>
          ) : (
            <ArrowButton
              className="pt-4"
              type="submit"
              direction="right"
              disabled={loading}
            >
              {loading ? 'Invio...' : 'Iscriviti'}
            </ArrowButton>
          )}
        </div>
      </form>
    </div>
  );
}
