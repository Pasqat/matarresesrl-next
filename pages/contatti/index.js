import { Fragment, useState } from 'react'
import clsx from 'clsx'

import { sendContactMail } from '../../actions/networking/mailApi'
import ContactForm from '../../components/Form/ContactForm'

export default function Contatti() {
  const [form, setForm] = useState({ name: '', mail: '', formContent: '' })
  const { name, mail, formContent } = form

  const [formButtonDisabled, setFormButtonDisabled] = useState(false)
  const [notification, setNotification] = useState({ text: '', isError: false })

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
      <div className="container flex flex-wrap px-5 py-24 mx-auto sm:flex-nowrap">
        <div className="relative flex items-end justify-start p-10 overflow-hidden bg-gray-300 rounded-lg lg:w-2/3 md:w-1/2 sm:mr-10">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            frameborder="0"
            title="map"
            marginheight="0"
            marginwidth="0"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
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
          <ContactForm />
          {/* TODO: aggingungere termini e condizioni */}
          <p className="ml-auto text-xs text-left">
            accetto i termini e le condizioni
          </p>
        </div>
      </div>
    </section>
  )
}
