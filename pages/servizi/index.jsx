import {useState, useEffect, useRef} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import HeaderBig from '../../components/Header/HeaderBig'
import ContactForm from '../../components/Form/ContactForm'
import Layout from '../../components/Layout'
import {SlopeDivSection} from '../../ui/SlopeDivSection'

import Image from 'next/image'
import {H2, H3, H4} from '../../components/typography'
import logoAcquistinrete from '../../public/img/logos/acquistinrete.webp'
import logoMEF from '../../public/img/logos/Logo_mef.webp'
import logoConsip from '../../public/img/logos/Consip_Logo.webp'

export default function Servizi() {
  const [position, setPosition] = useState(0)
  const divProgettazione = useRef(null)

  function calculateScrollDistance() {
    const {offsetTop, offsetHeight} = divProgettazione.current
    const offsetBottom = offsetTop + offsetHeight
    // need to be rafactored. Not dynamic.
    const scrollPosition = Math.floor(
      ((window.scrollY - offsetTop * 0.8) / offsetBottom) * 100,
    )

    return setPosition(scrollPosition)
  }

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollDistance)

    return () => window.removeEventListener('scroll', calculateScrollDistance)
  })

  function positionReached(p) {
    return position > p
  }

  return (
    <div>
      <Head>
        <title>Matarrese srl | Servizi</title>
        <link rel="canonical" href="https://www.matarrese.it/" />
        <meta
          name="description"
          content="I servizi offerti dalla Matarrese srl. Progettazione tecnica, assistenza, manutenzione, formazione"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout navbarTransparent>
        <main>
          <HeaderBig
            title="Servizi"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In."
            noButton
            slopeSectionColor="text-white"
          />
          <section className="pb-20">
            <div className="container mx-auto pb-60 px-4">
              <div className="my-32 px-4 w-full">
                <H2 variant="secondary" className="text-center">
                  Progettazione tecnica e realizzazione arredi
                </H2>
                <H4 as="p" className="mt-2 text-center">
                  Grandi idee per prodotti di successo
                </H4>
              </div>

              <div className="flex items-start">
                {/* TODO: extract this in a component? name it like StepBlock */}
                <div className="sticky top-4 hidden ml-auto mr-auto px-4 w-full md:block md:w-4/12">
                  <div className="lg:pr-16">
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div>
                          <div
                            className={clsx(
                              'flex items-center justify-center w-10 h-10 border rounded-full',
                              positionReached(0) && 'bg-yellow-500',
                            )}
                          >
                            <svg
                              className={clsx(
                                'w-4',
                                positionReached(0)
                                  ? 'text-white'
                                  : 'text-gray-500',
                              )}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <line
                                fill="none"
                                strokeMiterlimit="10"
                                x1="12"
                                y1="2"
                                x2="12"
                                y2="22"
                              />
                              <polyline
                                fill="none"
                                strokeMiterlimit="10"
                                points="19,15 12,22 5,15"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="w-px h-full bg-gray-300" />
                      </div>
                      <div className="pb-8 pt-1">
                        <Link href="#consulenza-tecnica">
                          <a className="mb-2 text-lg font-bold">
                            Consulenza Tecnica
                          </a>
                        </Link>
                        <p className="text-gray-700">
                          Lorem ipsum dolor sit amet.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div>
                          <div
                            className={clsx(
                              positionReached(18) && 'bg-yellow-500',
                              'flex items-center justify-center w-10 h-10 border rounded-full',
                            )}
                          >
                            <svg
                              className={clsx(
                                'w-4',
                                positionReached(18)
                                  ? 'text-white'
                                  : 'text-gray-600',
                              )}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <line
                                fill="none"
                                strokeMiterlimit="10"
                                x1="12"
                                y1="2"
                                x2="12"
                                y2="22"
                              />
                              <polyline
                                fill="none"
                                strokeMiterlimit="10"
                                points="19,15 12,22 5,15"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="w-px h-full bg-gray-300" />
                      </div>
                      <div className="pb-8 pt-1">
                        <Link href="#il-progetto">
                          <a className="mb-2 text-lg font-bold">Il progetto</a>
                        </Link>
                        <p className="text-gray-700">
                          Lorem ipsum dolor sit amet consectetur adipisicing.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div>
                          <div
                            className={clsx(
                              positionReached(33) && 'bg-yellow-500',
                              'flex items-center justify-center w-10 h-10 border rounded-full',
                            )}
                          >
                            <svg
                              className={clsx(
                                'w-4',
                                positionReached(33)
                                  ? 'text-white'
                                  : 'text-gray-600',
                              )}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <line
                                fill="none"
                                strokeMiterlimit="10"
                                x1="12"
                                y1="2"
                                x2="12"
                                y2="22"
                              />
                              <polyline
                                fill="none"
                                strokeMiterlimit="10"
                                points="19,15 12,22 5,15"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="w-px h-full bg-gray-300" />
                      </div>
                      <div className="pb-8 pt-1">
                        <Link href="#iter-operativo">
                          <a className="mb-2 text-lg font-bold">
                            Iter Operativo
                          </a>
                        </Link>
                        <p className="text-gray-700">Lorem, ipsum dolor.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div>
                          <div
                            className={clsx(
                              positionReached(45) && 'bg-yellow-500',
                              'flex items-center justify-center w-10 h-10 border rounded-full',
                            )}
                          >
                            <svg
                              className={clsx(
                                'w-4',
                                positionReached(45)
                                  ? 'text-white'
                                  : 'text-gray-600',
                              )}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <line
                                fill="none"
                                strokeMiterlimit="10"
                                x1="12"
                                y1="2"
                                x2="12"
                                y2="22"
                              />
                              <polyline
                                fill="none"
                                strokeMiterlimit="10"
                                points="19,15 12,22 5,15"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="w-px h-full bg-gray-300" />
                      </div>
                      <div className="pb-8 pt-1">
                        <Link href="#arredi-su-misura">
                          <a className="mb-2 text-lg font-bold">
                            Realizzazione arredi su misura
                          </a>
                        </Link>
                        <p className="text-gray-700">
                          Lorem ipsum dolor sit amet.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div>
                          <div
                            className={clsx(
                              positionReached(54) && 'bg-yellow-500',
                              'flex items-center justify-center w-10 h-10 border rounded-full',
                            )}
                          >
                            <svg
                              className={clsx(
                                'w-4',
                                positionReached(54)
                                  ? 'text-white'
                                  : 'text-gray-600',
                              )}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <line
                                fill="none"
                                strokeMiterlimit="10"
                                x1="12"
                                y1="2"
                                x2="12"
                                y2="22"
                              />
                              <polyline
                                fill="none"
                                strokeMiterlimit="10"
                                points="19,15 12,22 5,15"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="w-px h-full bg-gray-300" />
                      </div>
                      <div className="pb-8 pt-1">
                        <Link href="#coordinamento-lavori">
                          <a className="mb-2 text-lg font-bold">
                            Coordinamento lavori
                          </a>
                        </Link>
                        <p className="text-gray-700">
                          Lorem ipsum dolor sit amet.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div>
                          <div
                            className={clsx(
                              positionReached(60) && 'bg-yellow-500',
                              'flex items-center justify-center w-10 h-10 border rounded-full',
                            )}
                          >
                            <svg
                              className={clsx(
                                'w-4',
                                positionReached(60)
                                  ? 'text-white'
                                  : 'text-gray-600',
                              )}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <line
                                fill="none"
                                strokeMiterlimit="10"
                                x1="12"
                                y1="2"
                                x2="12"
                                y2="22"
                              />
                              <polyline
                                fill="none"
                                strokeMiterlimit="10"
                                points="19,15 12,22 5,15"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="w-px h-full bg-gray-300" />
                      </div>
                      <div className="pb-8 pt-1">
                        <Link href="#collaudo">
                          <a className="mb-2 text-lg font-bold">Collaudo</a>
                        </Link>
                        <p className="text-gray-700">
                          Lorem ipsum dolor sit amet.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div>
                          <div
                            className={clsx(
                              positionReached(64) && 'bg-green-500',
                              'flex items-center justify-center w-10 h-10 border rounded-full',
                            )}
                          >
                            <svg
                              className={clsx(
                                'w-4',
                                positionReached(64)
                                  ? 'text-white'
                                  : 'text-gray-600',
                              )}
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <polyline
                                fill="none"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                points="6,12 10,16 18,8"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="mb-2 text-lg font-bold">
                          Congratulazioni 🎉
                        </p>
                        <p className="text-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ml-auto mr-auto md:w-6/12"
                  ref={divProgettazione}
                >
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4 md:hidden">
                      <div>
                        <div
                          className={clsx(
                            'flex items-center justify-center w-10 h-10 border rounded-full',
                            positionReached(0) && 'bg-yellow-500',
                          )}
                        >
                          <svg
                            className={clsx(
                              'w-4',
                              positionReached(0)
                                ? 'text-white'
                                : 'text-gray-500',
                            )}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <line
                              fill="none"
                              strokeMiterlimit="10"
                              x1="12"
                              y1="2"
                              x2="12"
                              y2="22"
                            />
                            <polyline
                              fill="none"
                              strokeMiterlimit="10"
                              points="19,15 12,22 5,15"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="w-px h-full bg-gray-300" />
                    </div>
                    <div className="pb-8 pt-1 text-lg">
                      <H3 id="consulenza-tecnica" variant="secondary">
                        Consulenza tecnica
                      </H3>
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        Ascoltiamo le idee del cliente per trasformarle in{' '}
                        <strong>progetti reali.</strong>
                      </p>
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        Per chi vuole <strong>aprire un ristorante</strong>, un{' '}
                        <strong>bar</strong>, una <strong>gelateria</strong>,
                        una
                        <strong>pasticceria</strong>, una{' '}
                        <strong>struttura ricettiva</strong>, lavoriamo per
                        l’ottimizzazione degli spazi,al fine di renderli
                        funzionali e fruibili, adattando prodotti e tecnologie a
                        qualsiasi esigenza.
                      </p>
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        Dal laboratorio di 30 mq alla struttura ricettiva di
                        7800 posti letto, traduciamo le idee in opere finite
                        delineando soluzioni personalizzate, dall’
                        <strong>interior design</strong> alle attrezzature.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4 md:hidden">
                      <div>
                        <div
                          className={clsx(
                            positionReached(18) && 'bg-yellow-500',
                            'flex items-center justify-center w-10 h-10 border rounded-full',
                          )}
                        >
                          <svg
                            className={clsx(
                              'w-4',
                              positionReached(18)
                                ? 'text-white'
                                : 'text-gray-600',
                            )}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <line
                              fill="none"
                              strokeMiterlimit="10"
                              x1="12"
                              y1="2"
                              x2="12"
                              y2="22"
                            />
                            <polyline
                              fill="none"
                              strokeMiterlimit="10"
                              points="19,15 12,22 5,15"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="w-px h-full bg-gray-300" />
                    </div>
                    <div className="pb-8 pt-1 text-lg">
                      <H3 variant="secondary" id="il-progetto">
                        Il progetto
                      </H3>
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        Realizziamo il complesso dei{' '}
                        <strong>disegni, calcoli e relazioni</strong>
                        che determinano le forme e le dimensioni dell’arredo
                        completo.
                      </p>
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        Stabiliamo con il cliente i{' '}
                        <strong>
                          materiali, il modo di esecuzione, le esigenze
                          costruttive
                        </strong>
                        , i reciproci impegni tra committente e costruttore, ne
                        stimiamo il costo.
                      </p>
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        Elaboriamo un <strong>rendering progettuale</strong> per
                        dare visione tridimensionale al cliente di come verrà
                        eseguito il progetto prima di iniziare ad operare.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4 md:hidden">
                      <div>
                        <div
                          className={clsx(
                            positionReached(33) && 'bg-yellow-500',
                            'flex items-center justify-center w-10 h-10 border rounded-full',
                          )}
                        >
                          <svg
                            className={clsx(
                              'w-4',
                              positionReached(33)
                                ? 'text-white'
                                : 'text-gray-600',
                            )}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <line
                              fill="none"
                              strokeMiterlimit="10"
                              x1="12"
                              y1="2"
                              x2="12"
                              y2="22"
                            />
                            <polyline
                              fill="none"
                              strokeMiterlimit="10"
                              points="19,15 12,22 5,15"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="w-px h-full bg-gray-300" />
                    </div>
                    <div className="pb-8 pt-1 text-lg">
                      <H3 variant="secondary" id="iter-operativo">
                        Iter Operativo
                      </H3>
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        L’iter operativo da seguire per aprire un ristorante,
                        aprire un bar, aprire una gelateria, aprire una
                        pasticceria e qualsiasi altra attività di ristorazione
                        prevede:
                      </p>
                      <ol className="ml-2 text-gray-500 list-inside list-decimal">
                        <li>Pianta dettagliata del locale o sopralluogo</li>
                        <li>Verifica della destinazione d’uso del locale</li>
                        <li>
                          Incontro con il tecnico sanitario per il rilascio
                          delle autorizzazioni
                        </li>
                        <li>
                          Appuntamento con i nostri esperti per la progettazione
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4 md:hidden">
                      <div>
                        <div
                          className={clsx(
                            positionReached(45) && 'bg-yellow-500',
                            'flex items-center justify-center w-10 h-10 border rounded-full',
                          )}
                        >
                          <svg
                            className={clsx(
                              'w-4',
                              positionReached(45)
                                ? 'text-white'
                                : 'text-gray-600',
                            )}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <line
                              fill="none"
                              strokeMiterlimit="10"
                              x1="12"
                              y1="2"
                              x2="12"
                              y2="22"
                            />
                            <polyline
                              fill="none"
                              strokeMiterlimit="10"
                              points="19,15 12,22 5,15"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="w-px h-full bg-gray-300" />
                    </div>
                    <div className="pb-8 pt-1 text-lg">
                      <H3 variant="secondary" id="arredi-su-misura">
                        Realizzazione Arredi su misura
                      </H3>
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        Per <strong>l’arredamento di ogni struttura</strong>{' '}
                        della ristorazione e alberghiera, nel nostro laboratorio
                        tecnico un team di esperti sviluppa il progetto ideato
                        da professionisti dell’<strong>interior design.</strong>
                      </p>
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        Il cliente ha la possibilità di seguire l’iter dei
                        lavori mentre l’idea diventa realtà e vedere così
                        realizzato secondo i suoi desideri il proprio bar,
                        ristorante, pasticceria, gelateria, attività
                        alberghiera.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4 md:hidden">
                      <div>
                        <div
                          className={clsx(
                            positionReached(54) && 'bg-yellow-500',
                            'flex items-center justify-center w-10 h-10 border rounded-full',
                          )}
                        >
                          <svg
                            className={clsx(
                              'w-4',
                              positionReached(54)
                                ? 'text-white'
                                : 'text-gray-600',
                            )}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <line
                              fill="none"
                              strokeMiterlimit="10"
                              x1="12"
                              y1="2"
                              x2="12"
                              y2="22"
                            />
                            <polyline
                              fill="none"
                              strokeMiterlimit="10"
                              points="19,15 12,22 5,15"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="w-px h-full bg-gray-300" />
                    </div>
                    <div className="pb-8 pt-1 text-lg">
                      <H3 id="coordinamento-lavori" variant="secondary">
                        Coordinamento lavori
                      </H3>
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        La realizzazione di un progetto è seguita costantemente
                        dai tecnici supervisori che si occupano del
                        coordinamento dei lavori affinché siano rispettati tutti
                        i particolari nella fase di{' '}
                        <strong>produzione di ogni elemento.</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4 md:hidden">
                      <div>
                        <div
                          className={clsx(
                            positionReached(60) && 'bg-yellow-500',
                            'flex items-center justify-center w-10 h-10 border rounded-full',
                          )}
                        >
                          <svg
                            className={clsx(
                              'w-4',
                              positionReached(60)
                                ? 'text-white'
                                : 'text-gray-600',
                            )}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <line
                              fill="none"
                              strokeMiterlimit="10"
                              x1="12"
                              y1="2"
                              x2="12"
                              y2="22"
                            />
                            <polyline
                              fill="none"
                              strokeMiterlimit="10"
                              points="19,15 12,22 5,15"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="w-px h-full bg-gray-300" />
                    </div>
                    <div className="pb-8 pt-1 text-lg">
                      <H3 id="collaudo" variant="secondary">
                        Collaudo
                      </H3>
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        L’arredo viene consegnato e collocato nella sua
                        destinazione operativa e collaudato prima dell’apertura
                        dell’attività
                      </p>
                    </div>
                  </div>
                  <div className="flex md:hidden">
                    <div className="flex flex-col items-center mr-4">
                      <div>
                        <div
                          className={clsx(
                            positionReached(64) && 'bg-green-500',
                            'flex items-center justify-center w-10 h-10 border rounded-full',
                          )}
                        >
                          <svg
                            className={clsx(
                              'w-4',
                              positionReached(64)
                                ? 'text-white'
                                : 'text-gray-600',
                            )}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <polyline
                              fill="none"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              points="6,12 10,16 18,8"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="mb-2 text-lg font-bold">
                        Congratulazioni 🎉
                      </p>
                      <p className="text-gray-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative py-20 bg-gray-200">
            <SlopeDivSection color="text-gray-200" />
            <div className="px-4 w-full">
              <H2 className="text-center" variant="secondary">
                Assistensa e manutenzione
              </H2>
            </div>
            <div className="container mx-auto px-4 lg:py-24">
              <div className="flex flex-wrap items-center space-y-8">
                <div className="bg-white lg:flex lg:mx-8 lg:max-w-5xl lg:rounded-lg lg:shadow-lg">
                  <div className="lg:w-1/2">
                    <div
                      className="h-64 bg-cover lg:h-full lg:rounded-lg"
                      style={{
                        backgroundImage: "url('/img/aspirazione-prodotti.jpg')",
                      }}
                    ></div>
                  </div>

                  <div className="px-6 py-12 max-w-xl lg:w-1/2 lg:max-w-5xl">
                    <H2 variant="secondary">Manutenzione</H2>
                    <p className="mt-4 dark:text-gray-400 text-gray-600">
                      Il servizio di assistenza tecnica consiste nelle attività
                      di: installazione, collaudo, messa in funzione e
                      manutenzione di grandi impianti di ogni genere:
                      attrezzature ristorazione, attrezzature bar, cucine
                      professionali, macchine alimentari, impianti di
                      riscaldamento, impianti di climatizzazione, trattamento
                      aria, attrezzature per gelaterie, forni per pizza, ovvero
                      tutto quanto fa parte di una struttura di ristorazione o
                      laboratorio alimentare.
                    </p>
                  </div>
                </div>

                <div className="bg-white lg:flex lg:mx-8 lg:max-w-5xl lg:rounded-lg lg:shadow-lg">
                  <div className="px-6 py-12 max-w-xl lg:w-1/2 lg:max-w-5xl">
                    <H2 variant="secondary">Valore Aggiunto</H2>
                    <p className="mt-4 dark:text-gray-400 text-gray-600">
                      La cura del cliente e la sua serenità lavorativa ci stanno
                      a cuore nel pieno interesse di assicurare l’efficienza di
                      funzionamento e mantenimento delle macchine. Il servizio
                      di assistenza tecnica post vendita da parte di tecnici
                      specializzati è un altro valore aggiunto alla semplice
                      fornitura di attrezzature per ristorazione poiché,
                      disponendo di un ampio magazzino con ricambi originali,
                      riusciamo a garantire un efficiente pronto intervento per
                      a manutenzione, riparazione e assistenza.
                    </p>
                  </div>
                  <div className="lg:w-1/2">
                    <div
                      className="h-64 bg-cover lg:h-full lg:rounded-lg"
                      style={{
                        backgroundImage: "url('/img/aspirazione-prodotti.jpg')",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white lg:flex lg:mx-8 lg:max-w-5xl lg:rounded-lg lg:shadow-lg">
                  <div className="lg:w-1/2">
                    <div
                      className="h-64 bg-cover lg:h-full lg:rounded-lg"
                      style={{
                        backgroundImage: "url('/img/aspirazione-prodotti.jpg')",
                      }}
                    ></div>
                  </div>

                  <div className="px-6 py-12 max-w-xl lg:w-1/2 lg:max-w-5xl">
                    <H2 variant="secondary">
                      <span className="text-yellow-600">Tempestività</span> del
                      pronto intervento
                    </H2>
                    <p className="mt-4 dark:text-gray-400 text-gray-600">
                      Il nostro team di tecnici specializzati – costantemente
                      aggiornato mediante corsi tecnici presso le aziende
                      fornitrici – opera con efficienza e professionalità per
                      garantire un tempestivo pronto intervento post vendita.
                    </p>
                    <p className="mt-4 text-gray-600">
                      Il servizio di risposta per assistenza tecnica è garantito
                      entro le 48 ore dalla richiesta di intervento su tutto il
                      territorio regionale grazie ai rapporti di esclusività per
                      la Puglia con i più prestigiosi marchi di aziende del
                      ttore (Panasonic, Lainox, Silko, Sirman, ecc.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative block pb-20 bg-gray-900">
            <SlopeDivSection color="text-gray-900" />

            <div className="container mx-auto px-4 lg:py-24">
              <div className="flex flex-wrap justify-center text-center">
                <div className="px-4 w-full lg:w-9/12">
                  <H2 className="text-center" variant="primary">
                    Formazione
                  </H2>
                  <div className="my-10 w-full text-center text-gray-100 text-xl">
                    La Formazione continua crea eccellenza
                  </div>
                  <div className="my-10 w-full text-center text-gray-100 text-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative block pb-20">
            <SlopeDivSection color="text-white" />
            <div className="container mx-auto px-24 lg:py-24">
              <H2 className="text-center" variant="secondary">
                MePA
              </H2>
              <div className="text-xl mt-8">
                Siamo presenti anche sul{' '}
                <span className="text-yellow-500">MePa</span>:{' '}
                <em>Mercato Elettronico della Pubblica Amministrazione</em>{' '}
                (MePA) è un mercato digitale in cui le Amministrazioni abilitate
                possono acquistare, per valori inferiori alla soglia
                comunitaria, i beni e servizi offerti da fornitori abilitati a
                presentare i propri cataloghi sul sistema. Consip definisce con
                appositi bandi le tipologie di beni e servizi e le condizioni
                generali di fornitura, gestisce l’abilitazione dei fornitori e
                la pubblicazione e l’aggiornamento dei cataloghi. Accedendo alla{' '}
                <strong>Vetrina del Mercato Elettronico</strong> o navigando sul
                catalogo prodotti, le Amministrazioni possono verificare
                l’offerta di beni e/o servizi e, una volta abilitate, effettuare
                acquisti on line, confrontando le proposte dei diversi fornitori
                e scegliendo più rispondente alle proprie esigenze.
              </div>
              <div className="grid grid-cols-3 mt-12 justify-center items-center">
                <div className="text-center">
                  <Image
                    src={logoAcquistinrete}
                    alt="logo acquistinrete"
                    layout="intrinsic"
                    placeholder="blur"
                  />
                </div>
                <div className="text-center">
                  <Image
                    src={logoConsip}
                    alt="logo consig"
                    layout="intrinsic"
                    placeholder="blur"
                  />
                </div>
                <div className="text-center">
                  <Image
                    src={logoMEF}
                    alt="logo ministero dell'economia"
                    layout="intrinsic"
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="relative py-20" id="contatti">
            <SlopeDivSection color="text-white" />
            <div className="container mb-12 mx-auto px-4">
              <div className="flex flex-wrap justify-center">
                <div className="px-4 w-full md:w-3/4">
                  <div className="relative flex flex-col mb-6 w-full min-w-0 break-words bg-gray-200 rounded-lg shadow-lg">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  )
}
