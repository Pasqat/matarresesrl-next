import {Fragment, useEffect, useState} from 'react'
import Link from 'next/link'

import {Dialog, Transition} from '@headlessui/react'
import clsx from 'clsx'

import {sendContactMail} from '../../actions/networking/mailApi'
import {Button} from '../../components/button'

/**
 * @param buttonText default "Contattaci"
 *
 * @param {string} buttonClassName default: "px-4 py-2 text-sm text-white bg-yellow-600 hover:bg-yellow-500"
 * if it is falsy the button will have a `ChatIcon` and will be centered in a div
 *
 * @param {string} type "contacts" | "reservation"
 *
 * @param {stirng} title usefull to pass event title to the email subject
 */
export default function FormModal({
  buttonText = 'Contattaci',
  buttonClassName,
  type = 'contacts',
  title = null,
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
      if (typeof participants === null || participants === '') {
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

    const res = await sendContactMail(
      name,
      surname,
      mail,
      tel,
      formContent,
      participants,
      title,
    )
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
      <Button size="medium" onClick={openModal}>
        {buttonText}
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="z-[51] fixed inset-0 bg-yellow-500 bg-opacity-90 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="px-4 min-h-screen text-center">
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
              className="inline-block align-middle h-screen"
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
              <div className="inline-block align-middle my-8 p-10 w-full max-w-md text-left bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all">
                {type === 'contacts' ? (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="leading-tigth text-gray-900 text-lg font-medium"
                    >
                      Hai un&apos;idea che vorresti realizzare, o hai bisogno di
                      informazioni?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-gray-500 text-sm">
                        Completa questo form, ti risponderemo entro 24 ore
                        (escluso festivi)
                      </p>
                    </div>
                  </>
                ) : (
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-lg font-medium leading-6"
                  >
                    {title}
                  </Dialog.Title>
                )}

                <form
                  className="flex-auto mt-8 space-y-8"
                  onSubmit={submitContactForm}
                >
                  <div className="relative grid gap-2 grid-cols-2 w-full">
                    <div className="w-full">
                      <label
                        className="block mb-2 text-gray-600 text-xs font-bold uppercase"
                        htmlFor="name"
                      >
                        Nome
                      </label>
                      <input
                        type="text"
                        className="placeholder-gray-300 px-3 py-3 w-full text-gray-600 text-sm bg-white border-0 rounded focus:outline-none shadow transition-all duration-150 ease-linear focus:ring"
                        placeholder="Nome"
                        name="name"
                        value={name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="block mb-2 text-gray-600 text-xs font-bold uppercase"
                        htmlFor="surname"
                      >
                        Cognome
                      </label>
                      <input
                        type="text"
                        className="placeholder-gray-300 px-3 py-3 w-full text-gray-600 text-sm bg-white border-0 rounded focus:outline-none shadow transition-all duration-150 ease-linear focus:ring"
                        placeholder="Cognome"
                        name="surname"
                        value={surname}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="relative w-full">
                    <label
                      className="block mb-2 text-gray-600 text-xs font-bold uppercase"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="placeholder-gray-300 px-3 py-3 w-full text-gray-600 text-sm bg-white border-0 rounded focus:outline-none shadow transition-all duration-150 ease-linear focus:ring"
                      placeholder="Email"
                      name="mail"
                      value={mail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative w-full">
                    <label
                      className="block mb-2 text-gray-600 text-xs font-bold uppercase"
                      htmlFor="tel"
                    >
                      Telefono
                    </label>
                    <input
                      type="tel"
                      className="placeholder-gray-300 px-3 py-3 w-full text-gray-600 text-sm bg-white border-0 rounded focus:outline-none shadow transition-all duration-150 ease-linear focus:ring"
                      placeholder="Telefono"
                      name="tel"
                      value={tel}
                      onChange={handleChange}
                    />
                  </div>
                  {type === 'reservation' ? (
                    <div className="relative w-full">
                      <label
                        className="block mb-2 text-gray-600 text-xs font-bold uppercase"
                        htmlFor="messaggio"
                      >
                        Numero Partecipanti
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="placeholder-gray-300 px-3 py-3 w-full text-gray-600 text-sm bg-white border-0 rounded focus:outline-none shadow transition-all duration-150 ease-linear focus:ring"
                        placeholder="Numero partecipanti"
                        name="participants"
                        value={participants}
                        onChange={handleChange}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <label
                        className="block mb-2 text-gray-600 text-xs font-bold uppercase"
                        htmlFor="messaggio"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="placeholder-gray-300 px-3 py-3 w-full text-gray-600 text-sm bg-white border-0 rounded focus:outline-none shadow focus:ring"
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
                        className="form-checkbox text-yellow-500 border-2 border-solid border-gray-400 cursor-pointer"
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
                  <div className="flex flex-wrap justify-between mt-6 text-center">
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-red-600 text-sm bg-transparent border border-red-600 rounded-sm focus:outline-none shadow-md focus-visible:ring-2 hover:ring-2 focus-visible:ring-blue-500 hover:ring-red-400 focus-visible:ring-offset-2 hover:ring-offset-2"
                        onClick={closeModal}
                      >
                        Chiudi
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        className="inline-flex px-4 py-2 text-white text-sm font-bold active:bg-gray-600 bg-green-500 disabled:bg-green-600 hover:bg-opacity-90 border border-transparent rounded-sm focus:outline-none shadow-md disabled:opacity-50 disabled:pointer-events-none hover:ring-2 focus-visible:ring-2 focus-visible:ring-blue-500 hover:ring-green-400 hover:ring-offset-2 focus-visible:ring-offset-2"
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
