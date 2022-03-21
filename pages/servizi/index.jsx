import {useState, useEffect, useRef} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import ContactForm from '../../components/Form/ContactForm'
import Layout from '../../components/Layout'
import {H2, H3, Paragraph} from '../../components/typography'
import {HeroSection} from '../../components/sections/hero-section'
import {FeatureCard} from '../../components/feature-card'
import {Grid} from '../../components/grid'
import {MepaSection} from '../../components/sections/mepa-section'

import {getGroups} from '../../lib/newsletter'

export default function Servizi({groups}) {
  const [position, setPosition] = useState(0)
  const divProgettazione = useRef(null)

  function calculateScrollDistance() {
    const {offsetTop, offsetHeight} = divProgettazione.current
    const offsetBottom = offsetTop + offsetHeight
    // TODO: need to be rafactored. Not dynamic.
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

      <Layout>
        <div className="mb-24 lg:mb-48">
          <HeroSection
            title="Servizi"
            subtitle="La nostra esperienza a tua disposizione"
            // action={
            //   <div className="text-xl">
            //     Comprendiamo le esigenze più disparate dei nostri clienti e
            //     offriamo le migliori soluzioni per le vostre richieste
            //   </div>
            // }
            arrowUrl="#panoramica"
            image="/img/blogging.svg"
            imageSize="large"
          />
        </div>
        <main>
          <section id="panoramica">
            <Grid className="mb-24 lg:mb-48">
              <div className="col-span-full">
                <H2 className="mb-14">{`Alcuni dei nostri servizi`}</H2>
                {/* <H2 as="p" variant="secondary" className="mb-14">
                  {`Lorem ipsum dolor sit amet`}
                </H2> */}
              </div>

              <div className="col-span-full">
                <Grid rowGap nested>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Consulenza commerciale"
                      description="I nostri esperti ti guidano nella scelta delle migliori soluzioni Ho.Re.Ca disponibili sul mercato."
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Progettazione tecnica attività commerciali"
                      description="Ascoltiamo le tue idee e condividiamo la loro progettazione in anteprima."
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Realizzazine arredi su misura"
                      description="Adattiamo gli arredi e scegliamo le attrezzature migliori per i tuoi ambienti."
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Progettazione cucine professionali"
                      description="Organizziamo gli spazi della tua cucina per garantire l'ottimizzazione del lavoro e dei tempi di preparazione."
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Formazione"
                      description="Offiramo soluzioni di formazione finanziata per la tua crescita professionale e quella dei tuoi collaboratori."
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Assistenza tecnica e manutenzione"
                      description="Garantiamo assistenza tecnica qualificata e manutenzione delle attrezzature che scegli per la tua attività."
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Progettazione impianti di climatizzazione"
                      description="Caldo o freddo impostiamo la temperatura giusta all'interno della tua attività per il comfort tuo e dei tuoi clienti"
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Progettazione impianti aspirazione"
                      description="Non sottovalutiamo la qualità negli ambienti di lavoro e ti proponiamo le soluzioni più innovative"
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Consulenza su nuove tecnologie"
                      description="Da partner di progetti di Ricerca e Sviluppo studiamo le innovazioni in cucina, condividiamo e diffondiamo le nostre conoscenze."
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                </Grid>
              </div>
            </Grid>
          </section>

          <section className="mx-10vw mb-24 lg:mb-48">
            <div className="mx-auto max-w-7xl">
              <H2 className="mb-14">
                {`
                Il nostro metodo per realizzare i tuoi progetti
                  `}
              </H2>
              {/* <H2 as="p" variant="secondary" className="mb-14">
                {`Grandi idee per prodotti di successo`}
              </H2> */}
              <div className="flex items-start justify-between">
                {/* NOTE: I really need to find a better way to calculate progress of the position and coloring icons */}
                <div className="sticky top-32 hidden w-full md:col-span-4 lg:block">
                  <div className="lg:pr-16">
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div>
                          <div
                            className={clsx(
                              'flex h-10 w-10 items-center justify-center rounded-full border',
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
                        <div className="h-full w-px bg-gray-300" />
                      </div>
                      <div className="pt-1 pb-8">
                        <Link href="#consulenza-tecnica">
                          <a className="mb-2 text-lg font-bold">
                            Consulenza Tecnica
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div>
                          <div
                            className={clsx(
                              positionReached(18) && 'bg-yellow-500',
                              'flex h-10 w-10 items-center justify-center rounded-full border',
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
                        <div className="h-full w-px bg-gray-300" />
                      </div>
                      <div className="pt-1 pb-8">
                        <Link href="#il-progetto">
                          <a className="mb-2 text-lg font-bold">Il progetto</a>
                        </Link>
                        {/* <p className="text-gray-700">
                          Lorem ipsum dolor sit amet consectetur adipisicing.
                        </p> */}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div>
                          <div
                            className={clsx(
                              positionReached(33) && 'bg-yellow-500',
                              'flex h-10 w-10 items-center justify-center rounded-full border',
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
                        <div className="h-full w-px bg-gray-300" />
                      </div>
                      <div className="pt-1 pb-8">
                        <Link href="#iter-operativo">
                          <a className="mb-2 text-lg font-bold">
                            Iter Operativo
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div>
                          <div
                            className={clsx(
                              positionReached(45) && 'bg-yellow-500',
                              'flex h-10 w-10 items-center justify-center rounded-full border',
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
                        <div className="h-full w-px bg-gray-300" />
                      </div>
                      <div className="pt-1 pb-8">
                        <Link href="#arredi-su-misura">
                          <a className="mb-2 text-lg font-bold">
                            Realizzazione arredi su misura
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div>
                          <div
                            className={clsx(
                              positionReached(54) && 'bg-yellow-500',
                              'flex h-10 w-10 items-center justify-center rounded-full border',
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
                        <div className="h-full w-px bg-gray-300" />
                      </div>
                      <div className="pt-1 pb-8">
                        <Link href="#coordinamento-lavori">
                          <a className="mb-2 text-lg font-bold">
                            Coordinamento lavori
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div>
                          <div
                            className={clsx(
                              positionReached(60) && 'bg-yellow-500',
                              'flex h-10 w-10 items-center justify-center rounded-full border',
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
                        <div className="h-full w-px bg-gray-300" />
                      </div>
                      <div className="pt-1 pb-8">
                        <Link href="#collaudo">
                          <a className="mb-2 text-lg font-bold">Collaudo</a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div>
                          <div
                            className={clsx(
                              positionReached(64) && 'bg-green-500',
                              'flex h-10 w-10 items-center justify-center rounded-full border',
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
                          Congratulazioni!
                        </p>
                        <p className="text-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8" ref={divProgettazione}>
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center lg:hidden">
                      <div>
                        <div
                          className={clsx(
                            'flex h-10 w-10 items-center justify-center rounded-full border',
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
                      <div className="h-full w-px bg-gray-300" />
                    </div>
                    <div className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16">
                      <H3 id="consulenza-tecnica">Consulenza tecnica</H3>
                      <Paragraph className="mt-4 leading-relaxed text-gray-500">
                        Ascoltiamo le idee del cliente per trasformarle in{' '}
                        <strong>progetti reali.</strong>
                      </Paragraph>
                      <Paragraph className="mt-4 leading-relaxed text-gray-500">
                        Che tu voglia <strong>aprire un ristorante</strong>, un{' '}
                        <strong>bar</strong>, una <strong>gelateria</strong>,
                        una
                        <strong>pasticceria</strong>, una{' '}
                        <strong>struttura ricettiva</strong>, noi ci impegniamo
                        nella progettazione ottimizzando gli spazi, rendendoli
                        funzionali e fruibili e adattando prodotti e tecnologie
                        a qualsiasi esigenza.
                      </Paragraph>
                      <Paragraph className="mt-4 leading-relaxed text-gray-500">
                        Dal laboratorio di 30 mq alla struttura ricettiva di
                        7800 posti letto, traduciamo le idee in opere finite
                        delineando soluzioni personalizzate, dall’
                        <strong>interior design</strong> alle attrezzature.
                      </Paragraph>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center lg:hidden">
                      <div>
                        <div
                          className={clsx(
                            positionReached(18) && 'bg-yellow-500',
                            'flex h-10 w-10 items-center justify-center rounded-full border',
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
                      <div className="h-full w-px bg-gray-300" />
                    </div>
                    <div className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16">
                      <H3 id="il-progetto">Il progetto</H3>
                      <p className="mt-4 leading-relaxed text-gray-500">
                        Realizziamo disegni, calcoli e relazioni che determinano
                        le forme e le dimensioni dell&apos;arredo completo.
                      </p>
                      <p className="mt-4 leading-relaxed text-gray-500">
                        Stabiliamo insieme a te i{' '}
                        <strong>
                          materiali, il modo di esecuzione, le esigenze
                          costruttive
                        </strong>
                        , i reciproci impegni tra committente e costruttore, ne
                        stimiamo il costo.
                      </p>
                      <p className="mt-4 leading-relaxed text-gray-500">
                        Elaboriamo un <strong>rendering progettuale</strong> per
                        darti una visione tridimensionale al cliente di come
                        verrà eseguito il progetto prima di iniziare ad operare.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center lg:hidden">
                      <div>
                        <div
                          className={clsx(
                            positionReached(33) && 'bg-yellow-500',
                            'flex h-10 w-10 items-center justify-center rounded-full border',
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
                      <div className="h-full w-px bg-gray-300" />
                    </div>
                    <div className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16">
                      <H3 id="iter-operativo">Iter Operativo</H3>
                      <p className="mt-4 leading-relaxed text-gray-500">
                        L’iter operativo da seguire per aprire un ristorante, un
                        bar, una gelateria, una pasticceria o qualsiasi altra
                        attività di ristorazione prevede:
                      </p>
                      <ol className="ml-2 list-inside list-decimal text-gray-500">
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
                    <div className="mr-4 flex flex-col items-center lg:hidden">
                      <div>
                        <div
                          className={clsx(
                            positionReached(45) && 'bg-yellow-500',
                            'flex h-10 w-10 items-center justify-center rounded-full border',
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
                      <div className="h-full w-px bg-gray-300" />
                    </div>
                    <div className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16">
                      <H3 id="arredi-su-misura">
                        Realizzazione Arredi su misura
                      </H3>
                      <p className="mt-4 leading-relaxed text-gray-500">
                        Per{' '}
                        <strong>l&apos;arredamento di ogni struttura</strong>{' '}
                        ristorativa o alberghiera, nel nostro laboratorio
                        tecnico un team di esperti sviluppa il progetto ideato
                        da professionisti dell&apos;
                        <strong>interior design</strong> che puoi anche
                        scegliere tu.
                      </p>
                      <p className="mt-4 leading-relaxed text-gray-500">
                        Ti offiramo la possibilità di seguire l’iter dei lavori
                        mentre l’idea diventa realtà e vedere, così, realizzato
                        secondo i suoi desideri il proprio bar, ristorante,
                        pasticceria, gelateria, attività alberghiera che vuoi
                        avviare.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center lg:hidden">
                      <div>
                        <div
                          className={clsx(
                            positionReached(54) && 'bg-yellow-500',
                            'flex h-10 w-10 items-center justify-center rounded-full border',
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
                      <div className="h-full w-px bg-gray-300" />
                    </div>
                    <div className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16">
                      <H3 id="coordinamento-lavori">Coordinamento lavori</H3>
                      <p className="mt-4 leading-relaxed text-gray-500">
                        La realizzazione di un progetto è seguita costantemente
                        dai tecnici supervisori che si occupano del
                        coordinamento dei lavori affinché siano rispettati tutti
                        i particolari nella fase di{' '}
                        <strong>produzione di ogni elemento.</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center lg:hidden">
                      <div>
                        <div
                          className={clsx(
                            positionReached(60) && 'bg-yellow-500',
                            'flex h-10 w-10 items-center justify-center rounded-full border',
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
                      <div className="h-full w-px bg-gray-300" />
                    </div>
                    <div className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16">
                      <H3 id="collaudo">Collaudo</H3>
                      <p className="mt-4 leading-relaxed text-gray-500">
                        L’arredo viene consegnato e collocato nella sua
                        destinazione operativa e collaudato prima dell’apertura
                        dell’attività
                      </p>
                    </div>
                  </div>
                  <div className="flex lg:hidden">
                    <div className="mr-4 flex flex-col items-center">
                      <div>
                        <div
                          className={clsx(
                            positionReached(64) && 'bg-green-500',
                            'flex h-10 w-10 items-center justify-center rounded-full border',
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
                      <p className="text-2xl font-bold">Congratulazioni 🎉</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <section>
            <Grid className="mb-24 lg:mb-64">
              <div className="col-span-full lg:col-span-6 lg:col-start-7">
                <div className="mb-12 lg:mb-0">
                  <Image
                    src="/img/vicini-al-cliente.jpg"
                    alt=""
                    className="max-w-full rounded-lg"
                    width="1000"
                    height="1300"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="col-span-full lg:col-span-5 lg:col-start-1 lg:row-start-1">
                <H2 className="mb-10">Assistenza e Manutenzione</H2>

                <H6 as="h3" className="mb-4">
                  {`Manutenzione`}
                </H6>
                <Paragraph className="mb-12">
                  Il servizio di assistenza tecnica consiste nelle attività di:
                  installazione, collaudo, messa in funzione e manutenzione di
                  grandi impianti di ogni genere: attrezzature ristorazione,
                  attrezzature bar, cucine professionali, macchine alimentari,
                  impianti di riscaldamento, impianti di climatizzazione,
                  trattamento aria, attrezzature per gelaterie, forni per pizza,
                  ovvero tutto quanto fa parte di una struttura di ristorazione
                  o laboratorio alimentare.
                </Paragraph>
                <H6 as="h3" className="mb-4">
                  {`Valore aggiunto`}
                </H6>
                <Paragraph className="mb-12">
                  La cura del cliente e la sua serenità lavorativa ci stanno a
                  cuore nel pieno interesse di assicurare l’efficienza di
                  funzionamento e mantenimento delle macchine. Il servizio di
                  assistenza tecnica post vendita da parte di tecnici
                  specializzati è un altro valore aggiunto alla semplice
                  fornitura di attrezzature per ristorazione poiché, disponendo
                  di un ampio magazzino con ricambi originali, riusciamo a
                  garantire un efficiente pronto intervento per a manutenzione,
                  riparazione e assistenza.
                </Paragraph>
                <H6 as="h3" className="mb-4">
                  {`Tempestività del pronto intervento`}
                </H6>
                <Paragraph className="mb-12">
                  Il nostro team di tecnici specializzati – costantemente
                  aggiornato mediante corsi tecnici presso le aziende fornitrici
                  – opera con efficienza e professionalità per garantire un
                  tempestivo pronto intervento post vendita.
                  <br />
                  Il servizio di risposta per assistenza tecnica è garantito
                  entro le 48 ore dalla richiesta di intervento su tutto il
                  territorio regionale grazie ai rapporti di esclusività per la
                  Puglia con i più prestigiosi marchi di aziende del ttore
                  (Panasonic, Lainox, Silko, Sirman, ecc.)
                </Paragraph>
              </div>
            </Grid>
          </section>

          <section className="py-12 mb-24 lg:mb-48 w-full bg-gray-900">
            <div className="flex flex-wrap justify-center mx-10vw text-center">
              <div className="px-4 w-full lg:w-9/12">
                <H2 className="text-center" variant="accent">
                  Formazione
                </H2>
                <div className="my-10 w-full text-xl text-center text-gray-100">
                  La Formazione continua crea eccellenza
                </div>
                <div className="my-10 w-full text-xl text-center text-gray-100">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </div>
          </section>

          <section className="mb-24 lg:mb-48">
            <MepaSection />
          </section> */}
          <section className="mx-auto mb-24 max-w-8xl lg:mb-48">
            <MepaSection />
          </section>

          <section className="mb-24 lg:mb-48" id="contatti">
            <ContactForm groups={groups} />
          </section>
        </main>
      </Layout>
    </div>
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
