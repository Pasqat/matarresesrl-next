import {useState, useEffect, useMemo, useRef} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import HeaderBig from '../../components/Header/HeaderBig'
import ContactForm from '../../components/Form/ContactForm'
import Layout from '../../components/Layout'
import {SlopeDivSection} from '../../ui/SlopeDivSection'

import Image from 'next/image'

export default function Servizi() {
  const [position, setPosition] = useState(0)
  const divProgettazione = useRef(null)

  function calculateScrollDistance() {
    const {offsetTop, offsetHeight} = divProgettazione.current
    const offsetBottom = offsetTop + offsetHeight
    const scrollPosition = Math.floor(
      ((window.scrollY - offsetTop * 0.8) / offsetBottom) * 100,
    )

    return setPosition(scrollPosition)
  }

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollDistance)

    return () => window.removeEventListener('scroll', calculateScrollDistance)
  })

  console.log(position)

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
                <h2 className="text-center text-gray-800 text-4xl font-semibold">
                  Progettazione tecnica e realizzazione arredi
                </h2>
                <p className="mt-2 text-center text-gray-400 text-xl font-medium">
                  Grandi idee per prodotti di successo
                </p>
              </div>

              <div className="flex items-start">
                <div className="sticky top-4 ml-auto mr-auto px-4 w-full md:w-4/12">
                  <div className="lg:pr-16 lg:py-6">
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
                  <div className="text-lg">
                    <h3
                      id="consulenza-tecnica"
                      className="text-3xl font-semibold"
                    >
                      Consulenza tecnica
                    </h3>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Ascoltiamo le idee del cliente per trasformarle in{' '}
                      <strong>progetti reali.</strong>
                    </p>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Per chi vuole <strong>aprire un ristorante</strong>, un{' '}
                      <strong>bar</strong>, una <strong>gelateria</strong>, una
                      <strong>pasticceria</strong>, una{' '}
                      <strong>struttura ricettiva</strong>, lavoriamo per
                      l’ottimizzazione degli spazi,al fine di renderli
                      funzionali e fruibili, adattando prodotti e tecnologie a
                      qualsiasi esigenza.
                    </p>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Dal laboratorio di 30 mq alla struttura ricettiva di 7800
                      posti letto, traduciamo le idee in opere finite delineando
                      soluzioni personalizzate, dall’
                      <strong>interior design</strong> alle attrezzature.
                    </p>
                  </div>

                  <div className="mt-12 text-lg">
                    <h3 className="text-3xl font-semibold" id="il-progetto">
                      Il progetto
                    </h3>
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

                  <div className="mt-12 text-lg">
                    <h3 className="text-3xl font-semibold" id="iter-operativo">
                      Iter Operativo
                    </h3>
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
                        Incontro con il tecnico sanitario per il rilascio delle
                        autorizzazioni
                      </li>
                      <li>
                        Appuntamento con i nostri esperti per la progettazione
                      </li>
                    </ol>
                  </div>

                  <div className="mt-12 text-lg">
                    <h3
                      id="arredi-su-misura"
                      className="text-3xl font-semibold"
                    >
                      Realizzazione Arredi su misura
                    </h3>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Per <strong>l’arredamento di ogni struttura</strong> della
                      ristorazione e alberghiera, nel nostro laboratorio tecnico
                      un team di esperti sviluppa il progetto ideato da
                      professionisti dell’<strong>interior design.</strong>
                    </p>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Il cliente ha la possibilità di seguire l’iter dei lavori
                      mentre l’idea diventa realtà e vedere così realizzato
                      secondo i suoi desideri il proprio bar, ristorante,
                      pasticceria, gelateria, attività alberghiera.
                    </p>
                  </div>

                  <div className="mt-12 text-lg">
                    <h3
                      id="coordinamento-lavori"
                      className="text-3xl font-semibold"
                    >
                      Coordinamento lavori
                    </h3>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      La realizzazione di un progetto è seguita costantemente
                      dai tecnici supervisori che si occupano del coordinamento
                      dei lavori affinché siano rispettati tutti i particolari
                      nella fase di{' '}
                      <strong>produzione di ogni elemento.</strong>
                    </p>
                  </div>

                  <div className="mt-12 text-lg">
                    <h3 id="collaudo" className="text-3xl font-semibold">
                      Collaudo
                    </h3>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      L’arredo viene consegnato e collocato nella sua
                      destinazione operativa e collaudato prima dell’apertura
                      dell’attività
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative py-20 bg-gray-200">
            <SlopeDivSection color="text-gray-200" />
            <div className="px-4 w-full">
              <h2 className="text-center text-gray-800 text-4xl font-semibold">
                Assistensa e manutenzione
              </h2>
            </div>
            <div className="container mx-auto px-4 lg:py-24">
              <div className="flex flex-wrap items-center">
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <div className="text-lg md:pr-12">
                    <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <h3 className="text-3xl font-semibold">Aspirazione</h3>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Altro testo a caso che possa avere un minimo di senso e di
                      keywords utili
                    </p>
                    <div className="mt-6">
                      <Link href="#">
                        <a className="text-yellow-600">Approfondisci</a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="ml-auto mr-auto px-4 w-full md:w-4/12">
                  <Image
                    alt="sistemi di aspirazione e trattamento dell'aria"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/aspirazione-prodotti.jpg"
                    width="1000"
                    height="1300"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center mt-36">
                <div className="ml-auto mr-auto px-4 w-full md:w-4/12">
                  <Image
                    alt="climatizzazione indutstriale"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/climatizzazione-prodotti.jpg"
                    width="1000"
                    height="1300"
                    objectFit="cover"
                  />
                </div>
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <div className="text-lg md:pr-12">
                    <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <h3 className="text-3xl font-semibold">Climatizzazione</h3>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Altro testo a caso che possa avere un minimo di senso e di
                      keywords utili
                    </p>
                    <div className="mt-6">
                      <Link href="#">
                        <a className="text-yellow-600">Approfondisci</a>
                      </Link>
                    </div>
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
                  <h2 className="text-gray-100 text-4xl font-semibold">
                    Formazione
                  </h2>
                  <div className="grid gap-24 grid-cols-3 justify-evenly my-10 w-full text-gray-200 text-lg">
                    <div>
                      <Image
                        width="400"
                        height="400"
                        objectFit="cover"
                        className="shadow-m rounded-lg"
                        src="/img/sanificatore-prodotti.png"
                        alt="Sanificatore"
                      />
                      <p className="mb-4 mt-6 text-2xl font-semibold">
                        Sanificazione
                      </p>
                      <Link href="#">
                        <a className="text-yellow-500">Scopri di più</a>
                      </Link>
                    </div>
                    <div>
                      <Image
                        width="400"
                        height="400"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                        src="/img/lavaggio-prodotti.jpg"
                        alt="lavastovigle professionali"
                      />
                      <p className="mb-4 mt-6 text-2xl font-semibold">
                        Lavaggio
                      </p>
                      <Link href="#">
                        <a className="text-yellow-500">Scopri di più</a>
                      </Link>
                    </div>
                    <div>
                      <Image
                        width="400"
                        height="400"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                        src="/img/lavanderia-prodotti.jpg"
                        alt="lavatrici indutriali"
                      />
                      <p className="mb-4 mt-6 text-2xl font-semibold">
                        Lavanderia
                      </p>
                      <Link href="#">
                        <a className="text-yellow-500">Scopri di più</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative block pb-20">
            <SlopeDivSection color="text-white" />
            <div className="container mx-auto px-4 lg:py-24">
              <div className="flex flex-wrap justify-center">
                <h2 className="text-center text-gray-800 text-4xl font-semibold">
                  MePA
                </h2>
                <div>
                  Siamo presenti anche sul Mepa: Mercato Elettronico della
                  Pubblica Amministrazione (MePA) è un mercato digitale in cui
                  le Amministrazioni abilitate possono acquistare, per valori
                  inferiori alla soglia comunitaria, i beni e servizi offerti da
                  fornitori abilitati a presentare i propri cataloghi sul
                  sistema. Consip definisce con appositi bandi le tipologie di
                  beni e servizi e le condizioni generali di fornitura, gestisce
                  l’abilitazione dei fornitori e la pubblicazione e
                  l’aggiornamento dei cataloghi. Accedendo alla Vetrina del
                  Mercato Elettronico o navigando sul catalogo prodotti, le
                  Amministrazioni possono verificare l’offerta di beni e/o
                  servizi e, una volta abilitate, effettuare acquisti on line,
                  confrontando le proposte dei diversi fornitori e scegliendo
                  più rispondente alle proprie esigenze.
                </div>
                <div className="flex flex-row flex-wrap justify-evenly mt-14 w-full text-xl">
                  <div>Logo1</div>
                  <div>Logo2</div>
                  <div>Logo3</div>
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
