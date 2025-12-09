import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import * as fbq from '../../lib/fpixel'
import {gtmEvent} from '../../lib/gtm'
import {usePlausible} from 'next-plausible'
import {logStructuredError} from '../../lib/logging'

import {H2} from '../typography'

import {Field, NotificationPanel} from '../form-element'
import {Grid} from '../grid'
import {Spacer} from '../spacer'
import {ArrowButton} from '../arrow-button'
import {CheckIcon} from '../icons/check-icon'
import {ChevronLeftIcon} from '../icons/chevron-left-icon'

export default function ContactForm({hasAutoFocus, featured, groups}) {
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
  const {referente, email, tel, formContent, company, newsletterGroupId, source} = form

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

  return (
    <Grid featured={featured}>
      <form
        className="col-span-full mt-8 space-y-4"
        onSubmit={submitContactForm}
        aria-busy={loading}
      >
        <H2 as="h4">
          Hai un progetto da realizzare o hai bisogno di informazioni?
        </H2>
        <H2 as="p" variant="secondary">
          Completa questo modulo, un nostro consulente ti ricontatterà.
        </H2>
        <Spacer size="2xs" />
        <Grid nested>
          <Field
            name="referente"
            label="Nome*"
            error={fieldErrors.referente}
            autoComplete="given-name"
            required
            disabled={formButtonDisabled || loading}
            value={referente}
            onChange={handleChange}
            className="col-span-full lg:col-span-6"
            featured={featured}
          />
          <Field
            name="email"
            label="Email"
            autoComplete="email"
            error={fieldErrors.email}
            disabled={formButtonDisabled || loading}
            value={email}
            onChange={handleChange}
            className="col-span-full lg:col-span-6"
            featured={featured}
          />
          <Field
            name="tel"
            label="Tel"
            autoComplete="tel"
            error={fieldErrors.tel}
            disabled={formButtonDisabled || loading}
            value={tel}
            onChange={handleChange}
            className="col-span-full lg:col-span-6"
            featured={featured}
          />
          <Field
            name="company"
            label="Denominazione Aziendale"
            autoComplete="company"
            // error={notification.isError ? notification.text : null}
            disabled={formButtonDisabled || loading}
            value={company}
            onChange={handleChange}
            className="col-span-full lg:col-span-6"
            featured={featured}
          />
        </Grid>
        <Field
          name="formContent"
          label="Messaggio"
          error={fieldErrors.formContent}
          required
          disabled={formButtonDisabled || loading}
          value={formContent}
          onChange={handleChange}
          type="textarea"
          featured={featured}
        />
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
        <div className="relative mt-5 grid grid-cols-4 gap-x-4 text-gray-600 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="col-span-full mb-2 text-lg lg:col-span-6">
            <label className="mb-2 inline-flex w-full items-center leading-tight">
              <input
                type="checkbox"
                className="cursor-pointer border-2 border-solid border-gray-400 text-yellow-600 checked:bg-yellow-500"
                name="newsletter"
                checked={isCheckedNewsletter}
                onChange={() => setIsCheckedNewsletter(!isCheckedNewsletter)}
              />
              <span className="ml-2">
                Voglio rimanere aggiornato su novità e promozioni
              </span>
            </label>
            {isCheckedNewsletter ? (
              <div className="my-2 ml-4 flex items-center lg:my-6">
                <select
                  value={newsletterGroupId}
                  name="newsletterGroupId"
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white px-2 py-4 text-lg font-medium disabled:text-gray-400 lg:w-auto lg:px-8"
                >
                  {groups.map(group => {
                    return (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    )
                  })}
                </select>
                <ChevronLeftIcon />
                <label className="text-xs lg:text-lg">
                  scegli il tuo settore
                </label>
              </div>
            ) : null}
          </div>
          <div className="col-span-full text-lg lg:col-span-6">
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
                <Link href="/privacy-policy" className="text-yellow-500" target="_blank">
                  
                    trattamento dei dati e condizioni
                  
                </Link>
              </span>
              *
            </label>
          </div>
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
              disabled={loading || formButtonDisabled}
            >
              {loading ? 'Invio...' : 'Invia'}
            </ArrowButton>
          )}
        </div>
      </form>
    </Grid>
  );
}
