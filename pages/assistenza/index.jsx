import {useState, useEffect} from 'react'
import Link from 'next/link'
import * as fbq from '../../lib/fpixel'
import {gtmEvent} from '../../lib/gtm'
import {usePlausible} from 'next-plausible'

import Head from 'next/head'

import Layout from '../../components/Layout'
import Header from '../../components/Header/Header'

import {getGroups} from '../../lib/newsletter'

import {sendContactMail} from '../../actions/networking/mailApi'
import {NotificationPanel, Field} from '../../components/form-element'
import {Grid} from '../../components/grid'
import {ArrowButton} from '../../components/arrow-button'
import {CheckIcon} from '../../components/icons/check-icon'

export default function Assistenza() {
  const plausible = usePlausible()
  const [form, setForm] = useState({
    ragione_sociale: '',
    tel: '',
    email: '',
    referente: '',
    indirizzo: '',
    formContent: '',
  })
  const {ragione_sociale, tel, email, formContent, referente, indirizzo} = form

  const [isCheckedTerms, setIsCheckedTerms] = useState(false)
  const [formButtonDisabled, setFormButtonDisabled] = useState(false)
  const [notification, setNotification] = useState({
    text: '',
    isError: false,
  })

  const handleChange = e => {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  useEffect(() => {
    if (isCheckedTerms && notification.text.includes('termini')) {
      setNotification({text: '', isError: false})
    }
  }, [isCheckedTerms, notification.text])

  async function submitContactForm(event) {
    event.preventDefault()

    if (
      ragione_sociale === '' ||
      email === '' ||
      formContent === '' ||
      tel === '' ||
      referente === '' ||
      indirizzo === ''
    ) {
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

    const res = await sendContactMail({
      ragione_sociale,
      senderMail: email,
      tel,
      referente,
      indirizzo,
      formContent,
    })
    if (res.status < 300) {
      setFormButtonDisabled(true)
      setNotification({
        ...notification,
        text: 'Grazie, ti ricontatteremo al più presto',
        isError: false,
      })
      fbq.event('Contact')
      gtmEvent('contact')
      plausible('Contatti', {props: {form_location: 'Assistenza'}})
      setForm({
        ...form,
        ragione_sociale: '',
        email: '',
        tel: '',
        referente: '',
        indirizzo: '',
        formContent: '',
      })
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
    <>
      <Head>
        <title>Assistenza | Matarrese srl</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/assistenza/`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Hai bisogno di assistenza tecnica? Compila il form"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Assistenza" />
        <meta property="og:description" content="Richiedi assistenza tecnica" />
        {/*  change image */}
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/assistenza/`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout>
        <section className="mx-10vw text-gray-600">
          <div className="mx-auto max-w-7xl">
            <Header>
              Hai bisogno di Assistenza tecnica? Scrivici, ti ricontatteremo al
              più presto!
            </Header>
          </div>
        </section>

        <section id="assistenza">
          <Grid featured>
            <form
              className="col-span-full mt-8 space-y-4"
              onSubmit={submitContactForm}
            >
              {/*
              <H2 as="h4">
                Hai un progetto da realizzare o hai bisogno di informazioni?
              </H2>
              <H2 as="p" variant="secondary">
                Completa questo modulo, un nostro consulente ti ricontatterà.
              </H2>
              <Spacer size="2xs" />

            */}
              <Grid nested>
                <Field
                  name="ragione_sociale"
                  label="Ragione Sociale*"
                  // error={notification.isError ? notification.text : null}
                  autoComplete="company"
                  required
                  disabled={formButtonDisabled}
                  value={ragione_sociale}
                  onChange={handleChange}
                  className="col-span-full"
                  placeholder="Matarrese srl"
                  featured
                />
                <Field
                  name="indirizzo"
                  label="Indirizzo*"
                  // error={notification.isError ? notification.text : null}
                  autoComplete="address"
                  required
                  disabled={formButtonDisabled}
                  value={indirizzo}
                  onChange={handleChange}
                  className="col-span-full lg:col-span-6"
                  featured
                  placeholder="contrada popoleto, nc Alberobello (BA)"
                />
                <Field
                  name="email"
                  label="Email*"
                  autoComplete="email"
                  // error={notification.isError ? notification.text : null}
                  required
                  disabled={formButtonDisabled}
                  value={email}
                  onChange={handleChange}
                  className="col-span-full lg:col-span-6"
                  featured
                  placeholder="name@example.it"
                />
                <Field
                  name="tel"
                  label="Tel*"
                  autoComplete="tel"
                  // error={notification.isError ? notification.text : null}
                  disabled={formButtonDisabled}
                  value={tel}
                  onChange={handleChange}
                  className="col-span-full lg:col-span-6"
                  featured
                  placeholder="0804323431"
                />
                <Field
                  name="referente"
                  label="Referente*"
                  autoComplete="given_name"
                  // error={notification.isError ? notification.text : null}
                  disabled={formButtonDisabled}
                  value={referente}
                  onChange={handleChange}
                  className="col-span-full lg:col-span-6"
                  featured
                  placeholder="Nome Cognome"
                />
              </Grid>
              <Field
                name="formContent"
                label="Descrizione del problema*"
                // error={notification.isError ? notification.text : null}
                required
                disabled={formButtonDisabled}
                value={formContent}
                onChange={handleChange}
                type="textarea"
                featured
              />
              <div className="relative mt-5 grid grid-cols-4 gap-x-4 text-gray-600 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
                <div className="col-span-full mb-2 text-lg lg:col-span-6"></div>
                <div className="col-span-full lg:col-span-6">
                  <label className="flex-end inline-flex w-full items-center">
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
              </div>
            </form>
          </Grid>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const groups = await getGroups()
  return {
    props: {
      groups,
    },
  }
}
