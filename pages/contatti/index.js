import { Fragment, useState } from 'react'
import clsx from 'clsx'

import { sendContactMail } from '../../actions/networking/mailApi'
import ContactForm from '../../components/Form/ContactForm'
import ContactFormModal from '../../components/Form/ContactFormModal'

export default function Contatti() {
  const [form, setForm] = useState({ name: '', mail: '', formContent: '' })
  const { name, mail, formContent } = form

  const [formButtonDisabled, setFormButtonDisabled] = useState(false)
  const [notification, setNotification] = useState({ text: '', isError: false })

  const defaultMapProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

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
    <section className="relative text-gray-600 body-font">
      <ContactFormModal />
      <div className="container flex flex-wrap px-5 py-24 mx-auto sm:flex-nowrap">
        <div className="relative flex items-end justify-start p-10 overflow-hidden bg-gray-300 rounded-lg lg:w-2/3 md:w-1/2 sm:mr-10">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            scrolling="no"
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12082.632673991144!2d17.236210260625526!3d40.79152858268904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347b28ac399465b%3A0xe5e7513c50d3197f!2sMatarrese%20Srl!5e0!3m2!1sen!2sus!4v1625668065795!5m2!1sen!2sus"
          ></iframe>
          <div className="relative flex flex-wrap py-6 bg-white rounded shadow-md">
            <div className="px-6 lg:w-1/2">
              <h2 className="text-xs font-semibold tracking-widest text-gray-900 title-font">
                INDIRIZZO
              </h2>
              <p className="mt-1">
                contrada popoleto,n.c. {'\n'} Alberobello (BA) 70011
              </p>
            </div>
            <div className="px-6 mt-4 lg:w-1/2 lg:mt-0">
              <h2 className="text-xs font-semibold tracking-widest text-gray-900 title-font">
                EMAIL
              </h2>
              <a
                className="leading-relaxed text-yellow-500"
                href="mailto:matarrese@matarrese.it"
              >
                matarrese@matarrese.it
              </a>
              <h2 className="mt-4 text-xs font-semibold tracking-widest text-gray-900 title-font">
                TELEFONO
              </h2>
              <p className="leading-relaxed">+39 080 4323 431</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full mt-8 bg-white lg:w-1/3 md:w-1/2 md:ml-auto md:py-8 md:mt-0">
          <ContactForm hasAutoFocus />
          {/* TODO: aggingungere termini e condizioni */}
          <div className="ml-auto">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="text-yellow-600 border-2 border-gray-400 border-solid cursor-pointer form-checkbox"
              />
              <span className="ml-2">accetto i termini e le condizioni</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}
