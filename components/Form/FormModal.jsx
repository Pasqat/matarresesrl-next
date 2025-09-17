import {Fragment, useEffect, useState} from 'react'
import Link from 'next/link'
import * as fbq from '../../lib/fpixel'
import {gtmEvent} from '../../lib/gtm'
import {usePlausible} from 'next-plausible'
import {logStructuredError} from '../../lib/logging'

import {Dialog, Transition} from '@headlessui/react'
import clsx from 'clsx'

import {Button} from '../../components/button'

/**
 * @param buttonText default "Contattaci"
 * @param {string} type "contacts" | "reservation"
 * @param {'stirng'} title usefull to pass event title to the email subject
 */

export default function FormModal({
  buttonText = 'Contattaci',
  type = 'contacts',
  title = null,
  size = 'medium',
  variant = 'primary',
  withButton,
}) {
  const plausible = usePlausible()

  let [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({
    referente: '',
    surname: '',
    mail: '',
    tel: '',
    formContent: '',
    participants: null,
    honeypot: '',
  })
  const {referente, surname, mail, tel, formContent, participants, honeypot} =
    form
  const [isChecked, setIsChecked] = useState(false)

  const [formButtonDisabled, setFormButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({
    text: '',
    isError: false,
  })
  const [missingFields, setMissingFields] = useState([])
  const [fieldErrors, setFieldErrors] = useState({})

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

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
    setFormButtonDisabled(false)
    setForm(form => ({
      ...form,
      referente: '',
      surname: '',
      mail: '',
      tel: '',
    }))
    setIsChecked(false)
    setNotification({text: '', isError: false})
  }, [isOpen])

  useEffect(() => {
    if (isChecked && notification.text.includes('termini')) {
      setNotification({text: '', isError: false})
    }
  }, [isChecked, notification.text])

  async function submitContactForm(event) {
    event.preventDefault()
    
    // Clear previous errors
    setFieldErrors({})
    setMissingFields([])

    // Validation logic
    const errors = {}
    const missing = []
    
    if (!referente) {
      errors.referente = 'Nome è obbligatorio'
      missing.push('referente')
    }
    if (!surname) {
      errors.surname = 'Cognome è obbligatorio'
      missing.push('surname')
    }
    if (!mail && !tel) {
      errors.mail = 'Inserisci almeno uno tra Email o Telefono'
      errors.tel = 'Inserisci almeno uno tra Email o Telefono'
      missing.push('mail')
    }
    if (type === 'reservation' && (!participants || participants === '')) {
      errors.participants = 'Numero partecipanti è obbligatorio'
      missing.push('participants')
    }
    if (type !== 'reservation' && !formContent) {
      errors.formContent = 'Messaggio è obbligatorio'
      missing.push('formContent')
    }
    if (!isChecked) {
      errors.conditions = 'Accettazione termini è obbligatoria'
      missing.push('conditions')
    }

    setFieldErrors(errors)
    setMissingFields(missing)
    
    if (Object.keys(errors).length > 0) {
      setNotification({
        text: 'Controlla i campi evidenziati',
        isError: true,
      })
      return
    }

    setLoading(true)
    try {
      const payload = {
        referente: `${referente} ${surname}`,
        senderMail: mail,
        tel,
        company: '',
        formContent:
          type === 'reservation'
            ? `${title}\nNumero partecipanti: ${participants}\n${formContent}`
            : formContent,
        honeypot,
        source: type === 'reservation' ? 'modal-reservation' : 'modal-contact',
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

      setFormButtonDisabled(true)

      if (type === 'reservation') {
        plausible('Prenotazione', {
          props: {title: title, partecipanti: participants},
        })
        fbq.event('CompleteRegistration', {
          content_name: title,
          value: participants,
        })
        gtmEvent('complete_registration', {
          content_name: title,
          value: participants,
        })
      } else {
        plausible('Contatti', {props: {form_location: 'Modal Form'}})
        fbq.event('Contact')
        gtmEvent('contact', {formLocation: 'Modal form'})
      }

      setNotification({
        text: 'Grazie, ti ricontatteremo al più presto',
        isError: false,
      })

      setForm({
        ...form,
        referente: '',
        surname: '',
        tel: '',
        mail: '',
        formContent: '',
        participants: '',
        honeypot: '',
      })

      setIsChecked(false)

      setTimeout(() => {
        closeModal()
      }, 2000)
    } catch (err) {
      logStructuredError('modal-form-submit', err, {
        referente,
        surname,
        mail,
        type,
        title,
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
    <>
      {withButton ? (
        <Button variant={variant} size={size} onClick={openModal}>
          {buttonText}
        </Button>
      ) : (
        <a
          onClick={openModal}
          className="text-accent group mt-4 inline-flex cursor-pointer items-center text-lg no-underline md:mb-2 lg:mb-0"
        >
          {buttonText}
          <svg
            className="ml-2 h-4 w-4 animate-bounceX"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[51] overflow-y-auto"
          onClose={() => {}}
        >
          <div className="absolute inset-0 -z-2 h-full w-full bg-black opacity-95" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                {type === 'contacts' ? (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="leading-tigth text-lg font-medium text-gray-900"
                    >
                      {title ??
                        `Hai un'idea che vorresti realizzare, o hai bisogno di informazioni?`}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Completa questo modulo, un nostro consulente ti
                        contatterà
                      </p>
                    </div>
                  </>
                ) : (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                )}

                <form
                  className="mt-8 flex-auto space-y-8"
                  onSubmit={submitContactForm}
                >
                  <div className="relative grid w-full grid-cols-2 gap-2">
                    <div className="w-full">
                      <label
                        className="mb-2 block text-xs font-bold uppercase text-gray-600"
                        htmlFor="referente"
                      >
                        Nome <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={clsx(
                          'w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring',
                          missingFields.includes('referente') &&
                            'border-red-500 ring-2 ring-red-400',
                        )}
                        placeholder="Nome"
                        name="referente"
                        value={referente}
                        onChange={handleChange}
                        required
                      />
                      {fieldErrors.referente && (
                        <span className="text-xs text-red-500">
                          {fieldErrors.referente}
                        </span>
                      )}
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-2 block text-xs font-bold uppercase text-gray-600"
                        htmlFor="surname"
                      >
                        Cognome <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={clsx(
                          'w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring',
                          missingFields.includes('surname') &&
                            'border-red-500 ring-2 ring-red-400',
                        )}
                        placeholder="Cognome"
                        name="surname"
                        value={surname}
                        onChange={handleChange}
                      />
                      {fieldErrors.surname && (
                        <span className="text-xs text-red-500">
                          {fieldErrors.surname}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="relative w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-600"
                      htmlFor="mail"
                    >
                      Email o Telefono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className={clsx(
                        'w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring',
                        missingFields.includes('mail') &&
                          'border-red-500 ring-2 ring-red-400',
                      )}
                      placeholder="Email"
                      name="mail"
                      value={mail}
                      onChange={handleChange}
                      required
                    />
                    {fieldErrors.mail && (
                      <span className="text-xs text-red-500">
                        {fieldErrors.mail}
                      </span>
                    )}
                  </div>
                  <div className="relative w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-600"
                      htmlFor="tel"
                    >
                      Telefono
                    </label>
                    <input
                      type="tel"
                      className={clsx(
                        'w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring',
                        missingFields.includes('tel') &&
                          'border-red-500 ring-2 ring-red-400',
                      )}
                      placeholder="Telefono"
                      name="tel"
                      value={tel}
                      onChange={handleChange}
                    />
                    {fieldErrors.tel && (
                      <span className="text-xs text-red-500">
                        {fieldErrors.tel}
                      </span>
                    )}
                  </div>
                  {type === 'reservation' ? (
                    <div className="relative w-full">
                      <label
                        className="mb-2 block text-xs font-bold uppercase text-gray-600"
                        htmlFor="participants"
                      >
                        Numero Partecipanti{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        className={clsx(
                          'w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring',
                          missingFields.includes('participants') &&
                            'border-red-500 ring-2 ring-red-400',
                        )}
                        placeholder="Numero partecipanti"
                        name="participants"
                        value={participants}
                        onChange={handleChange}
                      />
                      {fieldErrors.participants && (
                        <span className="text-xs text-red-500">
                          {fieldErrors.participants}
                        </span>
                      )}
                    </div>
                  ) : null}
                  <div className="relative w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-600"
                      htmlFor="formContent"
                    >
                      Messaggio <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="4"
                      cols="80"
                      className={clsx(
                        'w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow focus:outline-none focus:ring',
                        missingFields.includes('formContent') &&
                          'border-red-500 ring-2 ring-red-400',
                      )}
                      placeholder="Scrivi la tua richiesta..."
                      name="formContent"
                      value={formContent}
                      onChange={handleChange}
                    />
                    {fieldErrors.formContent && (
                      <span className="text-xs text-red-500">
                        {fieldErrors.formContent}
                      </span>
                    )}
                  </div>
                  <div className="relative mt-5 text-right text-gray-600">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox cursor-pointer border-2 border-solid border-gray-400 text-yellow-500"
                        name="conditions"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                      />
                      <span className="ml-2 text-sm">
                        accetto il{' '}
                        <Link href="/privacy-policy">
                          <a className="text-yellow-500" target="_blank">
                            trattamento dei dati e condizioni
                          </a>
                        </Link>
                        <span className="text-red-500"> *</span>
                      </span>
                      {fieldErrors.conditions && (
                        <div className="mt-1 text-xs text-red-500">
                          {fieldErrors.conditions}
                        </div>
                      )}
                    </label>
                  </div>
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

                  <div className="relative mt-6 flex flex-wrap justify-between text-center">
                    <div className="mt-4">
                      <button
                        type="button"
                        className="bg-transparent focus-visible:ring-blue-500 inline-flex cursor-pointer justify-center rounded-sm border border-red-600 px-4 py-2 text-sm text-red-600 shadow-md hover:ring-2 hover:ring-red-400 hover:ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Chiudi
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        className="border-transparent inline-flex cursor-pointer rounded-sm border bg-yellow-500 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-opacity-90 hover:ring-2 hover:ring-yellow-400 hover:ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 active:bg-gray-600 disabled:pointer-events-none disabled:bg-green-600 disabled:opacity-50"
                        type="submit"
                        disabled={formButtonDisabled || loading}
                        aria-busy={loading}
                      >
                        {loading ? 'Invio...' : 'Invia'}
                      </button>
                    </div>
                  </div>
                </form>
                <div
                  className={clsx(
                    'px-4 text-center',
                    notification.isError ? 'text-red-600' : 'text-green-600',
                  )}
                >
                  {notification.text}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
