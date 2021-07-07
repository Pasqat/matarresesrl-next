import { Dialog, Transition } from '@headlessui/react'
import { ChatIcon } from '@heroicons/react/outline'
import { Fragment, useEffect, useState } from 'react'
import clsx from 'clsx'

import { sendContactMail } from '../../actions/networking/mailApi'

/**
 * @param buttonClassName default value: "px-4 py-2 text-sm text-white
 * bg-yellow-600 hover:bg-yellow-500 "
 * if it is falsy the button will have a `ChatIcon` and will be centered in a div
 */
export default function ContactFormModal({
  buttonText = 'Contattaci',
  buttonClassName,
}) {
  let [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({ name: '', mail: '', formContent: '' })
  const { name, mail, formContent } = form

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  useEffect(() => {
    setFormButtonDisabled(false)
    setForm({ ...form, name: '', mail: '' })
    setNotification({ text: '', isError: false })
  }, [isOpen])

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
      <div
        className={clsx(
          buttonClassName ? null : 'inset-0 flex items-center justify-center'
        )}
      >
        <button
          type="button"
          onClick={openModal}
          className={clsx(
            buttonClassName ??
              'px-4 py-2 text-sm text-white bg-yellow-600 hover:bg-yellow-500 ',
            'font-medium rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
          )}
        >
          {buttonClassName ? null : (
            <ChatIcon className="inline-block w-5 h-5 mr-1" />
          )}
          {buttonText}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[51] overflow-y-auto bg-black bg-opacity-60"
          onClose={closeModal}
        >
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Hai una idea che vorresti realizzare, o hai bisogno di
                  informazioni?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Completa questo form, ti risponderemo entro 24 ore (escluso
                    festivi)
                  </p>
                </div>

                <form
                  className="flex-auto p-5 lg:p-10"
                  onSubmit={submitContactForm}
                >
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
                      Message
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
                  <div className="flex flex-wrap justify-between mt-6 text-center">
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 transition-all duration-150 ease-linear bg-red-100 border border-transparent rounded-sm hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                      >
                        Chiudi
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        className="inline-flex px-4 py-2 text-sm font-medium text-green-900 transition-all duration-150 ease-linear bg-green-100 border border-transparent rounded-sm hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:bg-green-600 disabled:opacity-50 disabled:pointer-events-none active:bg-gray-600 "
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
                    notification.isError ? 'text-red-700' : 'text-green-700'
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
