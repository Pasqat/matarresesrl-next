import {Fragment, useEffect, useState} from 'react'
import Link from 'next/link'

import {Dialog, Transition} from '@headlessui/react'
import clsx from 'clsx'

import {sendContactMail} from '../../actions/networking/mailApi'
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
}) {
  let [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    surname: '',
    mail: '',
    tel: '',
    formContent: '',
    participants: null,
  })
  const {name, surname, mail, tel, formContent, participants} = form
  const [isChecked, setIsChecked] = useState(false)

  const [formButtonDisabled, setFormButtonDisabled] = useState(false)
  const [notification, setNotification] = useState({
    text: '',
    isError: false,
  })

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
  }

  useEffect(() => {
    setFormButtonDisabled(false)
    setForm(form => ({...form, name: '', surname: '', mail: '', tel: ''}))
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

    if (name === '' || surname === '') {
      return setNotification({
        ...notification,
        text: 'Per favore compila tutti i campi',
        isError: true,
      })
    }

    if (type === 'reservation') {
      if (participants === null || participants === '') {
        return setNotification({
          ...notification,
          text: 'Per favore compila tutti i campi',
          isError: true,
        })
      }
    }

    if (type !== 'reservation') {
      if (formContent === '') {
        return setNotification({
          ...notification,
          text: 'Per favore compila tutti i campi',
          isError: true,
        })
      }
    }

    if (mail === '' && tel === '') {
      return setNotification({
        ...notification,
        text: 'Per favore inserisci un numero valido o una email valida',
        isError: true,
      })
    }

    if (!isChecked) {
      return setNotification({
        ...notification,
        text: 'Non dimenticare di accettare i termini e le condizioni',
        isError: true,
      })
    }

    const res = await sendContactMail({
      name,
      surname,
      senderMail: mail,
      tel,
      formContent,
      participants,
      title,
    })
    if (res.status < 300) {
      setFormButtonDisabled(true)
      setNotification({
        ...notification,
        text: 'Grazie, ti ricontatteremo al più presto',
        isError: false,
      })
      setForm({
        ...form,
        name: '',
        surname: '',
        tel: '',
        mail: '',
        formContent: '',
        participants: '',
      })
      setIsChecked(false)
      setTimeout(() => {
        closeModal()
      }, 2000)
    } else {
      setNotification({
        ...notification,
        text: 'Per favore compila tutti i campi',
        isError: true,
      })
    }
  }
  return (
    <>
      <Button size={size} onClick={openModal}>
        {buttonText}
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[51] overflow-y-auto"
          onClose={closeModal}
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
                      Hai un&apos;idea che vorresti realizzare, o hai bisogno di
                      informazioni?
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
                        htmlFor="name"
                      >
                        Nome
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Nome"
                        name="name"
                        value={name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-2 block text-xs font-bold uppercase text-gray-600"
                        htmlFor="surname"
                      >
                        Cognome
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Cognome"
                        name="surname"
                        value={surname}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="relative w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-600"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Email"
                      name="mail"
                      value={mail}
                      onChange={handleChange}
                    />
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
                      className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Telefono"
                      name="tel"
                      value={tel}
                      onChange={handleChange}
                    />
                  </div>
                  {type === 'reservation' ? (
                    <div className="relative w-full">
                      <label
                        className="mb-2 block text-xs font-bold uppercase text-gray-600"
                        htmlFor="messaggio"
                      >
                        Numero Partecipanti
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Numero partecipanti"
                        name="participants"
                        value={participants}
                        onChange={handleChange}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <label
                        className="mb-2 block text-xs font-bold uppercase text-gray-600"
                        htmlFor="messaggio"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow focus:outline-none focus:ring"
                        placeholder="Scrivi la tua richiesta..."
                        name="formContent"
                        value={formContent}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  <div className="mt-5 text-right text-gray-600">
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
                      </span>
                    </label>
                  </div>
                  <div className="mt-6 flex flex-wrap justify-between text-center">
                    <div className="mt-4">
                      <button
                        type="button"
                        className="bg-transparent focus-visible:ring-blue-500 inline-flex justify-center rounded-sm border border-red-600 px-4 py-2 text-sm text-red-600 shadow-md hover:ring-2 hover:ring-red-400 hover:ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Chiudi
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        className="border-transparent focus-visible:ring-blue-500 hover:ring-green-400 inline-flex rounded-sm border bg-green-500 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-opacity-90 hover:ring-2 hover:ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:bg-gray-600 disabled:pointer-events-none disabled:bg-green-600 disabled:opacity-50"
                        type="submit"
                        disabled={formButtonDisabled}
                      >
                        Invia
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
