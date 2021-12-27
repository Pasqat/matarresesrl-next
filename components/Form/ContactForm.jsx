import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'

import {H2} from '../typography'
import {Button} from '../button'

import {sendContactMail} from '../../actions/networking/mailApi'
import {NotificationPanel, Field} from '../form-element'
import {Grid} from '../grid'
import {Spacer} from '../spacer'
import {ArrowButton} from '../arrow-button'
import {CheckIcon} from '../icons/check-icon'
import {ChevronLeftIcon} from '../icons/chevron-left-icon'

export default function ContactForm({hasAutoFocus, featured, groups}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    formContent: '',
    newsletterGroupId: 107688379,
  })
  const {name, email, formContent, newsletterGroupId} = form

  const [isCheckedTerms, setIsCheckedTerms] = useState(false)
  const [isCheckedNewsletter, setIsCheckedNewsletter] = useState(false)
  const [formButtonDisabled, setFormButtonDisabled] = useState(false)
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
      setForm({...form, name: '', email: '', formContent: ''})
      setIsCheckedTerms(false)
    } else {
      setNotification({
        ...notification,
        text: 'Per favore compila tutti i campi',
        isError: true,
      })
    }

    // 3. Send a request to our API with the user's email address.
    if (isCheckedNewsletter) {
      const resSubscription = await fetch('/api/subscribe', {
        body: JSON.stringify({
          email: email,
          groupId: newsletterGroupId,
          name: name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const {message, error} = await resSubscription.json()

      if (error) {
        // 4. If there was an error, update the message in state.
        setNotification({
          ...notification,
          text: error,
          isError: true,
        })
      }

      if (message) {
        setNotification({
          ...notification,
          text: message,
          isError: false,
        })
      }
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
            label="Nome"
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
        <div className="grid relative grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 lg:gap-x-6 mt-5 text-gray-600">
          <div className="col-span-full lg:col-span-6 mb-2 text-lg">
            <label className="inline-flex items-center mb-2 w-full leading-tight">
              <input
                type="checkbox"
                className="text-yellow-600 checked:bg-yellow-500 border-2 border-gray-400 border-solid cursor-pointer"
                name="newsletter"
                checked={isCheckedNewsletter}
                onChange={() => setIsCheckedNewsletter(!isCheckedNewsletter)}
              />
              <span className="ml-2">
                voglio rimanere aggiornato su novità e promozioni
              </span>
            </label>
            {isCheckedNewsletter ? (
              <div className="flex items-center my-2 lg:my-6 ml-4">
                <select
                  value={newsletterGroupId}
                  name="newsletterGroupId"
                  onChange={handleChange}
                  className="py-4 px-2 lg:px-8 w-full lg:w-auto text-lg font-medium disabled:text-gray-400 bg-white rounded-lg"
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
          <div className="col-span-full lg:col-span-6">
            <label className="inline-flex items-center w-full flex-end">
              <input
                type="checkbox"
                className="text-yellow-500 checked:bg-yellow-500 border-2 border-gray-400 border-solid cursor-pointer"
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

        {notification.isError ? (
          <NotificationPanel isError={notification.isError}>
            {notification.text}
          </NotificationPanel>
        ) : null}

        <div className="text-right">
          {formButtonDisabled ? (
            <div className="flex justify-end">
              <CheckIcon />
              <p className="text-lg text-secondary">
                {!notification.text
                  ? `Grazie, ti ricontatteremo al più presto`
                  : notification.text}
              </p>
            </div>
          ) : (
            <ArrowButton className="pt-4" type="submit" direction="right">
              Invia
            </ArrowButton>
          )}
        </div>
      </form>
    </Grid>
  )
}
