import {Fragment, useState} from 'react'

import Head from 'next/head'
import {Transition} from '@headlessui/react'
import clsx from 'clsx'
import {XIcon} from '@heroicons/react/outline'

import ContactForm from '../../components/Form/ContactForm'
import Layout from '../../components/Layout'
import Map from '../../components/Maps/Map'
import Header from '../../components/Header/Header'
import {H6} from '../../components/typography'

import {getGroups} from '../../lib/newsletter'

export default function Contatti({groups}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Head>
        <title>Cantatti | Matarrese srl</title>
      </Head>
      <Layout>
        <section className="mb-24 mx-10vw text-gray-600 lg:mb-48">
          <Header>
            Fatti ispirare dalle nostre soluzioni. Visita il nostro showroom!
          </Header>
          <div className="min-h-[25rem] md:min-h-[30rem] relative flex items-end justify-start mb-24 bg-gray-300 rounded-lg overflow-hidden lg:mb-48">
            <Map />
            {/*
              <iframe
                width="100%"
                height="100%"
                className="absolute inset-0"
                scrolling="no"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12082.632673991144!2d17.236210260625526!3d40.79152858268904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347b28ac399465b%3A0xe5e7513c50d3197f!2sMatarrese%20Srl!5e0!3m2!1sit!2sit!4v1625668065795!5m2!1sit!2sit"
              ></iframe>
              */}

            <Transition
              appear
              show={isOpen}
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              className="relative flex flex-wrap m-8 py-6 w-full bg-white rounded shadow-md"
            >
              <div
                className={clsx(
                  {hidden: !isOpen},
                  'relative flex flex-wrap py-6 w-full bg-white rounded shadow-md',
                )}
              >
                <XIcon
                  className="absolute right-2 top-2 ml-auto w-5 h-5 cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                />
                <div className="flex flex-col justify-between px-6 lg:w-1/2">
                  <div>
                    <H6 as="h2" variant="secondary">
                      Indirizzo
                    </H6>
                    <p className="mt-1">
                      contrada popoleto,n.c. {'\n'} Alberobello (BA) 70011
                    </p>
                  </div>
                  <div>
                    <H6 className="mt-4" as="h2" variant="secondary">
                      email
                    </H6>
                    <a
                      className="text-yellow-500 leading-relaxed"
                      href="mailto:matarrese@matarrese.it"
                    >
                      matarrese@matarrese.it
                    </a>
                  </div>
                </div>
                <div className="flex flex-col justify-between mt-4 px-6 lg:mt-0 lg:w-1/2">
                  <div>
                    <H6 as="h2" variant="secondary">
                      Telefono
                    </H6>
                    <a href="tel:000804323431" className="leading-relaxed">
                      +39 080 4323 431
                    </a>
                  </div>
                  <div>
                    <H6 as="h2" variant="secondary" className="mt-4">
                      Assistenza
                    </H6>
                    <a href="tel:00390804323651" className="leading-relaxed">
                      +39 080 4323 651
                    </a>
                  </div>
                </div>
              </div>
            </Transition>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={clsx(
                isOpen && 'hidden',
                'absolute flex items-center justify-center m-8 w-10 h-10 text-white text-2xl font-bold bg-yellow-500 rounded-full hover:shadow-lg shadow-md cursor-pointer ring-8 ring-black ring-opacity-50 ',
              )}
            >
              +
            </div>
          </div>
        </section>
        <section className="mb-24 lg:mb-48" id="contatti">
          <ContactForm groups={groups}/>
          {/* TODO: aggingungere termini e condizioni */}
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
    }
  }
}

