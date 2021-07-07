import React, { useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline'

import Navbar from '../components/Navbars/Navbar'

import { sendContactMail } from '../actions/networking/mailApi'
import HeaderBig from '../components/Header/HeaderBig'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', mail: '', formContent: '' })
  const { name, mail, formContent } = form

  const [formButtonDisabled, setFormButtonDisabled] = useState(false)
  const [formButtonText, setFormButtonText] = useState('Invia')

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

    setLoading(true)
    const res = await sendContactMail(recipientMail, name, mail, formContent)
    if (res.status < 300) {
      // NOTE: here you will reset the state like:
      setFormButtonDisabled(true)
      setFormButtonText('Grazie, ti ricontatteremo al più presto')
      setLoading(false)
      setForm({ ...form, name: '', mail: '', formContent: '' })
    } else {
      setLoading(false)
      setFormButtonText('Per favore compila tutti i campi')
    }
  }

  return (
    <div>
      <Head>
        <title>Matarrese srl | Home</title>
        <link rel="canonical" href="https://www.matarrese.it/" />
        <meta
          name="description"
          content="Traduttori di Idee, creatori di Spazi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        <HeaderBig
          title="Specialisti della Ristorazione"
          subtitle="Dal design dell'arredo alla formazione del personale per realizzare i tuoi progetti"
          noButton
        />
        <section className="pb-20 -mt-24 bg-gray-200">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg hover:shadow-xl ">
                  <div className="flex-auto px-4 py-5">
                    {/* TODO: use higher resolution image. Find them in ../uploads/2015/03 */}
                    <div className="inline-flex items-center justify-center mb-5 text-center text-white bg-yellow-500 rounded-lg shadow-lg">
                      <img
                        src="/img/servizio-completo1-150x150.jpg"
                        className="w-full align-middle rounded-lg"
                      />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Dall'idea al progetto reale
                    </h6>
                    <p className="mt-2 mb-4 text-gray-500">
                      Aprire un'attività, rinnovare un locale, avere una guida
                      per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della <strong>ristorazione.</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 text-center md:w-4/12">
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center mb-5 text-center text-white bg-yellow-500 rounded-lg shadow-lg">
                      <img
                        src="/img/prodotti-qualita-150x150.jpg"
                        className="object-fill w-full align-middle rounded-lg shadow-md"
                      />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Marchi e attrezzature di qualità
                    </h6>
                    <p className="mt-2 mb-4 text-gray-500">
                      Selezioniamo i migliori marchi del settore al fine di
                      fornire sempre un vasto assortimento di attrezzature e
                      prodotti di alta qualità, per soddisfare ogni esigenza dei
                      nostri clienti.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 pt-6 text-center md:w-4/12">
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center mb-5 text-center text-white bg-yellow-500 rounded-lg shadow-lg">
                      <img
                        src="/img/info-e-supporto-150x150.jpg"
                        className="object-scale-down w-full align-middle rounded-lg shadow-md"
                      />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Supporto pre e post intervento
                    </h6>
                    <p className="mt-2 mb-4 text-gray-500">
                      Promuoviamo la cultura, la professionalità, la conoscenza
                      nel mondo dell'enogastronomia, aiutiamo le idee a
                      diventare progetti reali, forniamo{' '}
                      <strong>assistenza tecnica</strong>,
                      <strong>riparazione</strong> e{' '}
                      <strong>manutenzione.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-gray-500 bg-white rounded-full shadow-lg">
                  <HeartIcon className="text-xl text-yellow-500" />
                </div>
                <h3 className="mb-2 text-3xl font-semibold leading-normal">
                  Da oltre 30 anni partner degli operatori del settore
                </h3>
                <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-gray-600">
                  Offriamo prodotti di alta qualità e servizi professionali:
                  interior design, consulenza per trasformare l’idea in un reale
                  progetto, realizzazione arredo e complementi d’arredo su
                  misura.
                </p>
                <p className="mt-0 mb-4 text-lg font-light leading-relaxed text-gray-600">
                  Forniture di attrezzature, tra cui attrezzature per
                  ristorazione e cucine professionali, impianti, assistenza
                  tecnica post vendita, manutenzione e riparazione, consulenza
                  professionale continua.
                </p>
                <Link href="#contatti">
                  <a className="mt-8 font-bold text-gray-700 underline hover:drop-shadow-lg">
                    Realizza il tuo sogno!
                  </a>
                </Link>
              </div>

              <div className="w-full px-4 ml-auto mr-auto md:w-4/12">
                <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-yellow-600 rounded-lg shadow-lg">
                  <img
                    alt="vicini al cliente"
                    src="/img/vicini-al-cliente.jpg"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-[95px] top-[-94px]"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-yellow-600 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Vicini al Cliente
                    </h4>
                    <p className="mt-2 font-light text-white text-md">
                      Dalla progettazione alla realizzazione, i nostri esperti
                      seguono il cliente per trasformare le idee in realtà
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-full px-4 ml-auto mr-auto md:w-4/12">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="/img/attrezzature-esposizione.jpg"
                />
              </div>
              <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                <div className="md:pr-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-gray-500 bg-gray-200 rounded-full shadow-lg">
                    <ShoppingCartIcon className="text-xl text-yellow-600" />
                  </div>
                  <h3 className="text-3xl font-semibold">
                    Tutto per il settore food
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-500">
                    In una struttura aziendale di <strong>5000 mq</strong>{' '}
                    uniamo il laboratorio di produzione di arredi su misura,
                    l’officina e magazzino ricambi, il laboratorio di formazione
                    e un ampio showroom in cui potrai trovare:
                  </p>
                  <ul className="mt-6 list-none">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
                        </div>
                        <div>
                          <h4 className="text-gray-500">
                            Attrezzature per ristorazione
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
                        </div>
                        <div>
                          <h4 className="text-gray-500">Arredamenti</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
                        </div>
                        <div>
                          <h4 className="text-gray-500">Utensili da cucina</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
                        </div>
                        <div>
                          <h4 className="text-gray-500">
                            Forniture alberghiere
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
                        </div>
                        <div>
                          <h4 className="text-gray-500">Hotellerie</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
                        </div>
                        <div>
                          <h4 className="text-gray-500">...e tanto altro</h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-48">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-center mb-24 text-center">
              <div className="w-full px-4 lg:w-6/12">
                <h2 className="text-4xl font-semibold">Here are our heroes</h2>
                <p className="m-4 text-lg leading-relaxed text-gray-500">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record maximum.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6">
                  <img
                    alt="..."
                    src="/img/team-1-800x800.jpg"
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Ryan Tompson</h5>
                    <p className="mt-1 text-sm font-semibold text-gray-400 uppercase">
                      Web Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-600 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-pink-500 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6">
                  <img
                    alt="..."
                    src="/img/team-2-800x800.jpg"
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Romina Hadid</h5>
                    <p className="mt-1 text-sm font-semibold text-gray-400 uppercase">
                      Marketing Specialist
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-600 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6">
                  <img
                    alt="..."
                    src="/img/team-3-800x800.jpg"
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Alexa Smith</h5>
                    <p className="mt-1 text-sm font-semibold text-gray-400 uppercase">
                      UI/UX Designer
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-gray-700 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6">
                  <img
                    alt="..."
                    src="/img/team-4-470x470.png"
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Jenna Kardi</h5>
                    <p className="mt-1 text-sm font-semibold text-gray-400 uppercase">
                      Founder and CEO
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-pink-500 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-gray-700 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative block pb-20 bg-gray-800">
          <div
            className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container px-4 mx-auto lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap justify-center text-center">
              <div className="w-full px-4 lg:w-6/12">
                <h2 className="text-4xl font-semibold text-white">
                  Build something
                </h2>
                <p className="mt-4 mb-4 text-lg leading-relaxed text-gray-400">
                  Put the potentially record low maximum sea ice extent tihs
                  year down to low ice. According to the National Oceanic and
                  Atmospheric Administration, Ted, Scambos.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center mt-12">
              <div className="w-full px-4 text-center lg:w-3/12">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-gray-800 bg-white rounded-full shadow-lg">
                  <i className="text-xl fas fa-medal"></i>
                </div>
                <h6 className="mt-5 text-xl font-semibold text-white">
                  Excelent Services
                </h6>
                <p className="mt-2 mb-4 text-gray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full px-4 text-center lg:w-3/12">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-gray-800 bg-white rounded-full shadow-lg">
                  <i className="text-xl fas fa-poll"></i>
                </div>
                <h5 className="mt-5 text-xl font-semibold text-white">
                  Grow your market
                </h5>
                <p className="mt-2 mb-4 text-gray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full px-4 text-center lg:w-3/12">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-gray-800 bg-white rounded-full shadow-lg">
                  <i className="text-xl fas fa-lightbulb"></i>
                </div>
                <h5 className="mt-5 text-xl font-semibold text-white">
                  Launch time
                </h5>
                <p className="mt-2 mb-4 text-gray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="relative block py-24 bg-gray-800 lg:pt-0"
          id="#contatti"
        >
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-center -mt-48 lg:-mt-64">
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-gray-200 rounded-lg shadow-lg">
                  <form
                    className="flex-auto p-5 lg:p-10"
                    onSubmit={submitContactForm}
                  >
                    <h4 className="text-2xl font-semibold">
                      Hai una idea che vorresti realizzare, o hai bisogno di
                      informazioni?
                    </h4>
                    <p className="mt-1 mb-4 leading-relaxed text-gray-500">
                      Completa questo form, ti risponderemo entro 24 ore
                      (escluso festivi)
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
                    <div className="mt-6 text-center">
                      <button
                        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-gray-800 rounded shadow outline-none disabled:bg-green-600 disabled:opacity-50 disabled:pointer-events-none active:bg-gray-600 hover:shadow-lg focus:outline-none"
                        type="submit"
                        disabled={formButtonDisabled}
                      >
                        {formButtonText}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-5">
        {/* TODO: change with portfolio link          */}
        <div className="flex flex-wrap items-center justify-end mr-4 text-right">
          <p>
            Build By <span className="font-bold">Pasquale Matarrese</span>
          </p>
          <a
            href="https://www.github.com/pasqat"
            target="_blank"
            rel="noopener noreferrer"
            className="pl-3"
          >
            <i className="text-xl fab fa-github" />
          </a>
          <a
            href="https://www.linkedin.com/in/pasquale-matarrese/"
            target="_blank"
            rel="noopener noreferrer"
            className="pl-3"
          >
            <i className="text-xl text-blue-900 fab fa-linkedin" />
          </a>
          <a
            href="https://www.linkedin.com/in/pasquale-matarrese/"
            target="_blank"
            rel="noopener noreferrer"
            className="pl-3"
          >
            <i className="text-xl text-green-600 fas fa-house-user" />
          </a>
        </div>
      </footer>
    </div>
  )
}
