import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { H2 } from '../typography'
import { Button } from '../button'

import { sendContactMail } from '../../actions/networking/mailApi'
import { NotificationPanel, Field } from '../form-element'
import { Grid } from '../grid'
import { Spacer } from '../spacer'

export default function ContactForm({ hasAutoFocus, featured, groups }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    formContent: '',
    newsletterGroupId: 107688379,
  })
  const { name, email, formContent, newsletterGroupId } = form

  const [isCheckedTerms, setIsCheckedTerms] = useState(false)
  const [isCheckedNewsletter, setIsCheckedNewsletter] = useState(false)
  const [formButtonDisabled, setFormButtonDisabled] = useState(false)
  const [notification, setNotification] = useState({
    text: '',
    isError: false,
  })

  const inputName = useRef(null)

  const handleChange = e => {
    const { name, value } = e.target
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
      setNotification({ text: '', isError: false })
    }
  }, [isCheckedTerms, notification.text])

  async function submitContactForm(event) {
    event.preventDefault()

    if (name === '' || email === '' || formContent === '') {
      return setNotification({
        ...notification,
        text: 'Per favore compila tutti i campi',
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

    const res = await sendContactMail(name, email, formContent)
    if (res.status < 300) {
      setFormButtonDisabled(true)
      setNotification({
        ...notification,
        text: 'Grazie, ti ricontatteremo al più presto',
        isError: false,
      })
      setForm({ ...form, name: '', email: '', formContent: '' })
      setIsCheckedTerms(false)
    } else {
      setNotification({
        ...notification,
        text: 'Per favore compila tutti i campi',
        isError: true,
      })
    }
  }

  return (
    <Grid featured={featured}>
      <form
        className="col-span-full mt-8 space-y-4"
        onSubmit={submitContactForm}
      >
        <H2 as="h4">
          Hai un&apos;idea che vorresti realizzare, o hai bisogno di
          informazioni?
        </H2>
        <H2 as="p" variant="secondary">
          Completa questo form, ti risponderemo entro 24 ore (escluso festivi)
        </H2>
        <Spacer size="2xs" />
        <Grid nested>
          <Field
            name="name"
            label="Nome e cognome"
            // error={notification.isError ? notification.text : null}
            autoComplete="given-name"
            required
            disabled={formButtonDisabled}
            value={name}
            onChange={handleChange}
            className="col-span-full lg:col-span-6"
            featured={featured}
            />
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
        </Grid>
        <Field
          name="formContent"
          label="Messaggio"
          // error={notification.isError ? notification.text : null}
          required
          disabled={formButtonDisabled}
          value={formContent}
          onChange={handleChange}
          type="textarea"
          featured={featured}
          />
        <div className="relative grid gap-x-4 grid-cols-4 md:grid-cols-8 lg:gap-x-6 lg:grid-cols-12 mt-5 text-gray-600">
          <div className="col-span-full lg:col-span-6 mb-2 text-lg">
            <label className="inline-flex items-center w-full mb-2  leading-tight">
              <input
                type="checkbox"
                className="checked:bg-yellow-500 text-yellow-600 border-2 border-gray-400 border-solid cursor-pointer"
                name="newsletter"
                checked={isCheckedNewsletter}
                onChange={() => setIsCheckedNewsletter(!isCheckedNewsletter)}
                />
              <span className="ml-2">
              voglio rimanere aggiornato su novità e promozioni
              </span>
            </label>
            {isCheckedNewsletter ? (
              <div className="ml-6">
                <label>Scegli il tuo settore:</label>
                <select value={newsletterGroupId} onChange={handleChange} name="newsletterGroup" id="settore" className="w-full lg:w-auto lg:ml-2 bg-white">
                  {groups.map(group => {
                    return (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    )
                  })}
                </select>
                </div>
            ) : null}
          </div>
          <div className="col-span-full lg:col-span-6">
            <label className="flex-end inline-flex items-center w-full">
              <input
                type="checkbox"
                className="checked:bg-yellow-500 text-yellow-500 border-2 border-solid border-gray-400 cursor-pointer"
                name="conditions"
                checked={isCheckedTerms}
                onChange={() => setIsCheckedTerms(!isCheckedTerms)}
                />
              <span className="ml-2">
                accetto il{' '}
                <Link href="/privacy-policy">
                  <a className="text-yellow-500" target="_blank">
                  trattamento dei dati e condizioni
                  </a>
                </Link>
              </span>
              *
            </label>
          </div>
        </div>

        {notification.text ? (
          <NotificationPanel isError={notification.isError}>
            {notification.text}
          </NotificationPanel>
        ) : null}

        <div className="text-right">
          <Button type="submit" disabled={formButtonDisabled} size="medium">
          Invia
          </Button>
        </div>
      </form>
    </Grid>
  )
}
