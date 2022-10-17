import {Fragment, useState} from 'react'

import Head from 'next/head'
import {Transition} from '@headlessui/react'
import clsx from 'clsx'
import {XIcon} from '@heroicons/react/outline'

import ContactForm from '../../components/Form/ContactForm'
import Layout from '../../components/Layout'
import Map from '../../components/Maps/Map'
import Header from '../../components/Header/Header'
import {H6, H2} from '../../components/typography'
import {FacebookIcon} from '../../components/icons/facebook-icon'
import {LinkedInIcon} from '../../components/icons/linkedin-icon'
import {InstagramIcon} from '../../components/icons/instagram-icon'

import {getGroups} from '../../lib/newsletter'

export default function Contatti({groups}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Head>
        <title>Contatti | Matarrese srl</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/contatti/`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Fatti ispirare dalle nostre soluzioni. Visita il nostro showroom!"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Contatti" />
        <meta property="og:description" content="Visita il nostro showroom!" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/contatti/`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout>
        <section className="mx-10vw mb-12 text-gray-600 lg:mb-24 xl:mb-40">
          <div className="mx-auto max-w-7xl">
            <Header>
              Fatti ispirare dalle nostre soluzioni. Visita il nostro showroom!
            </Header>
            <div className="relative mb-12 flex min-h-[25rem] items-end justify-start overflow-hidden rounded-lg bg-gray-300 md:min-h-[30rem] lg:mb-24 xl:mb-48">
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
                className="relative m-8 flex w-full flex-wrap rounded bg-white py-6 shadow-md"
              >
                <div
                  className={clsx(
                    {hidden: !isOpen},
                    'relative flex w-full flex-wrap rounded bg-white py-6 shadow-md',
                  )}
                >
                  <XIcon
                    className="absolute top-2 right-2 ml-auto h-5 w-5 cursor-pointer"
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
                        className="leading-relaxed text-yellow-500"
                        href="mailto:matarrese@matarrese.it"
                      >
                        matarrese@matarrese.it
                      </a>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col justify-between px-6 lg:mt-0 lg:w-1/2">
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
                  'absolute m-8 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-yellow-500 text-2xl font-bold text-white shadow-md ring-8 ring-black ring-opacity-50 hover:shadow-lg',
                )}
              >
                +
              </div>
            </div>
          </div>
        </section>

        <section className="mx-10vw mb-24 lg:mb-48" id="social-links">
          <div className="relative mx-auto max-w-7xl ">
            <H2 as="h4" className="mb-12 lg:mb-24">
              Seguici sui social e rimani aggironato sulle novità del settore
            </H2>
            <div className="grid gap-6 lg:grid-cols-3">
              <a
                href="https://www.facebook.com/matarresesrl"
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-xl"
              >
                <button className="font-normal" type="button">
                  <FacebookIcon size="100" />
                </button>
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/company/matarrese-srl/"
                rel="noreferrer"
                target="_blank"
                className="flex items-center text-xl lg:justify-center"
              >
                <button className="font-normal" type="button">
                  <LinkedInIcon size="100" />
                </button>
                Linkedin
              </a>
              <a
                rel="noreferrer"
                href="https://www.instagram.com/matarrese.srl/"
                target="_blank"
                className="flex items-center text-xl lg:justify-end"
              >
                <button className="mr-2 font-normal" type="button">
                  <InstagramIcon size="100" />
                </button>
                Instagram
              </a>
            </div>
          </div>
        </section>
        <section className="mb-24 lg:mb-48" id="contatti">
          <ContactForm groups={groups} />
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const groups = await getGroups()

  console.log(groups)
  return {
    props: {
      groups,
    },
  }
}
