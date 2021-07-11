import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

import { sendContactMail } from '../../actions/networking/mailApi'

export default function ContactForm({ hasAutoFocus }) {
  const [form, setForm] = useState({ name: '', mail: '', formContent: '' })
  const { name, mail, formContent } = form
  const inputName = useRef(null)

  const [formButtonDisabled, setFormButtonDisabled] = useState(false)
  const [notification, setNotification] = useState({
    text: '',
    isError: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  useEffect(() => {
    hasAutoFocus && inputName.current.focus()
  }, [])

  async function submitContactForm(event) {
    event.preventDefault()

    const recipientMail = 'pasquale.matarrese@gmail.com'

    const res = await sendContactMail(recipientMail, name, mail, formContent)
    if (res.status < 300) {
      setFormButtonDisabled(true)
      setNotification({
        ...notification,
        text: 'Grazie, ti ricontatteremo al più presto',
        isError: false,
      })
      setForm({ ...form, name: '', mail: '', formContent: '' })
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
      <form className="flex-auto p-5 lg:p-10" onSubmit={submitContactForm}>
        <h4 className="text-2xl font-semibold">
          Hai un' idea che vorresti realizzare, o hai bisogno di informazioni?
        </h4>
        <p className="mt-1 mb-4 leading-relaxed text-gray-500">
          Completa questo form, ti risponderemo entro 24 ore (escluso festivi)
        </p>
        <div className="relative w-full mt-8 mb-3">
          <label
            className="block mb-2 text-xs font-bold text-gray-600 uppercase"
            htmlFor="full-name"
          >
            Nome Completo
          </label>
          <input
            type="text"
            className="w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-300 transition-all duration-150 ease-linear bg-white border-0 rounded shadow focus:outline-none focus:ring"
            placeholder="Nome Completo"
            name="name"
            value={name}
            onChange={handleChange}
            ref={inputName}
          />
        </div>

        <div className="relative w-full mb-3">
          <label
            className="block mb-2 text-xs font-bold text-gray-600 uppercase"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-300 transition-all duration-150 ease-linear bg-white border-0 rounded shadow focus:outline-none focus:ring"
            placeholder="Email"
            name="mail"
            value={mail}
            onChange={handleChange}
          />
        </div>

        <div className="relative w-full mb-3">
          <label
            className="block mb-2 text-xs font-bold text-gray-600 uppercase"
            htmlFor="messaggio"
          >
            Messaggio
          </label>
          <textarea
            rows="4"
            cols="80"
            className="w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-300 bg-white border-0 rounded shadow focus:outline-none focus:ring"
            placeholder="Scrivi la tua richiesta..."
            name="formContent"
            value={formContent}
            onChange={handleChange}
          />
        </div>
        <div className="mt-6 text-center">
          <button
            className="inline-flex px-4 py-2 text-sm font-medium text-white transition-all duration-150 ease-linear bg-yellow-600 border border-transparent rounded-sm hover:bg-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none active:bg-gray-600 "
            type="submit"
            disabled={formButtonDisabled}
          >
            Invia
          </button>
        </div>
          {/* TODO: aggingungere termini e condizioni */}
          <div className="mt-5 text-right text-gray-600">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="text-yellow-600 border-2 border-gray-400 border-solid cursor-pointer form-checkbox"
              />
              <span className="ml-2">accetto i termini e le condizioni</span>
            </label>
          </div>
      </form>
      <div
        className={clsx(
          'px-4 mb-8 text-center',
          notification.isError ? 'text-red-700' : 'text-green-700'
        )}
      >
        {notification.text}
      </div>
    </>
  )
}
