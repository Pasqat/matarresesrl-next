import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {gtmEvent} from '../../lib/gtm'

import {Paragraph} from '../typography'

import {Field} from '../form-element'
import clsx from 'clsx'

export default function NewsletterForm({
  hasAutoFocus,
  featured,
  groups,
  title = 'Iscriviti alla nostra newsletter',
}) {
  const [form, setForm] = useState({
    email: '',
    newsletterGroupId: 107688379,
  })
  const {email, newsletterGroupId} = form

  const [isCheckedTerms, setIsCheckedTerms] = useState(false)
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
        text: 'Non dimenticare la mail',
        isError: true,
      })
    }

    if (isCheckedTerms === false) {
      return setNotification({
        ...notification,
        text: 'Accetta i termini e le condizioni',
        isError: true,
      })
    }

    // 3. Send a request to our API with the user's email address.
    const resSubscription = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: email,
        groupId: newsletterGroupId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    gtmEvent('new_subscriber', {formLocation: 'footer'})
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
                'focus-ring w-full rounded-lg bg-white py-[1.17rem] px-8 text-lg font-medium text-black placeholder-gray-500 caret-yellow-500 disabled:bg-gray-100 disabled:text-gray-400',
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
              accetto il{' '}
              <Link href="/privacy-policy">
                <a className="text-yellow-500" target="_blank">
                  trattamento dei dati e condizioni *
                </a>
              </Link>
            </span>
          </label>
        </div>

        {/* <div className="text-right">
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
            <ArrowButton className="pt-4" type="submit" direction="right">
              Invia
            </ArrowButton>
          )}
        </div> */}
      </form>
    </div>
  )
}
