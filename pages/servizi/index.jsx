import {useRef} from 'react'
import Head from 'next/head'
import Link from 'next/link'
// import clsx from 'clsx'

import ContactForm from '../../components/Form/ContactForm'
import Layout from '../../components/Layout'
import {H2, H3, Paragraph} from '../../components/typography'
import {HeroSection} from '../../components/sections/hero-section'
import {FeatureCard} from '../../components/feature-card'
import {Grid} from '../../components/grid'
import {MepaSection} from '../../components/sections/mepa-section'
import FormModal from '../../components/Form/FormModal'
import SectionProgress from '../../components/scroll-progress/section-progress.jsx'

import {getGroups} from '../../lib/newsletter'
import {Spacer} from '../../components/spacer'

export default function Servizi({groups}) {
  const section1 = useRef(null)
  const section2 = useRef(null)
  const section3 = useRef(null)
  const section4 = useRef(null)
  const section5 = useRef(null)
  const section6 = useRef(null)
  const section7 = useRef(null)

  return (
    <div>
      <Head>
        <title>Servizi per le attività horeca</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/servizi/`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Progettazione tecnica, realizzazione arredi, impianti di climatizzazione, attrezzature ristorazione, assistenza tecnica, formazione"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Servizi" />
        <meta
          property="og:description"
          content="Progettazione tecnica, assistenza, formazione"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/prodotti_og.webp`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/servizi/`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Layout>
        <div className="mb-12 lg:mb-24 xl:mb-48">
          <HeroSection
            title="Esperienza e professionalità per l'ho.re.ca."
            subtitle="Servizi"
            // action={
            //   <div className="text-xl">
            //     Comprendiamo le esigenze più disparate dei nostri clienti e
            //     offriamo le migliori soluzioni per le vostre richieste
            //   </div>
            // }
            arrowUrl="#panoramica"
            image="/img/progettazione-e-design-800x800.jpg"
            imageSize="large"
          />
        </div>
        <main>
          <section id="panoramica">
            <Grid className="mb-12 lg:mb-24 xl:mb-48">
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
                      description="Caldo o freddo impostiamo la temperatura giusta all'interno della tua attività per il comfort tuo e dei tuoi clienti."
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Progettazione impianti aspirazione"
                      description="Non sottovalutiamo la qualità negli ambienti di lavoro e ti proponiamo le soluzioni più innovative."
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

          <section className="mx-10vw mb-12 lg:mb-24 xl:mb-48">
            <div className="mx-auto max-w-7xl">
              <H2 as="p">
                {`Ti offriamo la possibilità di vedere in funzione le attrezzature ho.re.ca. che desideri conoscere`}
              </H2>
              <Spacer size="2xs" />
              <FormModal
                buttonText="Richiedi una demo personalizzata"
                withButton
                title="Richiedi una demo personalizzata"
              />
            </div>
          </section>

          <section className="mx-10vw mb-12 lg:mb-24 xl:mb-48">
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
                <div className="sticky top-32 hidden w-full md:col-span-4 lg:block">
                  <div className="lg:pr-16">
                    <div className="flex">
                      <SectionProgress sectionRef={section1} />
                      <div className="pt-1 pb-8">
                        <Link href="#consulenza-tecnica">
                          <a className="mb-2 text-lg font-bold">
                            Consulenza Tecnica
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex">
                      <SectionProgress sectionRef={section2} />
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
                      <SectionProgress sectionRef={section3} />
                      <div className="pt-1 pb-8">
                        <Link href="#iter-operativo">
                          <a className="mb-2 text-lg font-bold">
                            Iter Operativo
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex">
                      <SectionProgress sectionRef={section4} />
                      <div className="pt-1 pb-8">
                        <Link href="#arredi-su-misura">
                          <a className="mb-2 text-lg font-bold">
                            Realizzazione arredi su misura
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex">
                      <SectionProgress sectionRef={section5} />
                      <div className="pt-1 pb-8">
                        <Link href="#coordinamento-lavori">
                          <a className="mb-2 text-lg font-bold">
                            Coordinamento lavori
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex">
                      <SectionProgress sectionRef={section6} />
                      <div className="pt-1 pb-8">
                        <Link href="#collaudo">
                          <a className="mb-2 text-lg font-bold">Collaudo</a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex">
                      <SectionProgress sectionRef={section6} endOfProgress />
                      <div className="pt-1">
                        <p className="mb-2 text-lg font-bold">
                          Congratulazioni!
                        </p>
                        <p className="text-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8">
                  <div className="flex">
                    <SectionProgress sectionRef={section1} lgHidden />
                    <div
                      ref={section1}
                      className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16"
                    >
                      <H3 className="-mt-20 pt-20" id="consulenza-tecnica">
                        Consulenza tecnica
                      </H3>
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
                    <SectionProgress sectionRef={section2} lgHidden />
                    <div
                      ref={section2}
                      className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16"
                    >
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
                    <SectionProgress sectionRef={section3} lgHidden />
                    <div
                      ref={section3}
                      className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16"
                    >
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
                    <SectionProgress sectionRef={section4} lgHidden />
                    <div
                      ref={section4}
                      className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16"
                    >
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
                    <SectionProgress sectionRef={section5} lgHidden />
                    <div
                      ref={section5}
                      className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16"
                    >
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
                    <SectionProgress sectionRef={section6} lgHidden />
                    <div
                      ref={section6}
                      className="bg-secondary mb-8 rounded-lg p-12 text-lg lg:mb-16"
                    >
                      <H3 id="collaudo">Collaudo</H3>
                      <p className="mt-4 leading-relaxed text-gray-500">
                        L’arredo viene consegnato e collocato nella sua
                        destinazione operativa e collaudato prima dell’apertura
                        dell’attività
                      </p>
                    </div>
                  </div>
                  <div className="flex lg:hidden">
                    <SectionProgress
                      sectionRef={section6}
                      lgHidden
                      endOfProgress
                    />
                    <div ref={section7} className="pt-1">
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

          <section
            className="relative mb-12 bg-gray-800 lg:mb-24 xl:mb-48"
            id="igiene"
          >
            <Grid className="py-24">
              <div className="col-span-full">
                <H2 variant="light-gray" className="mb-3 font-medium lg:mt-6">{`Servizi e allestimenti per GDO`}</H2>
                <H3 as="p" variant="light-gray" className="mt-14 mb-7">
                  Progettiamo le{' '}
                  <span className="font-medium italic text-white">
                    aree ristoro{' '}
                  </span>
                  dei grandi supermercati, librerie e negozi.{' '}
                </H3>
                <H3  variant="light-gray" as="p" className="my-7 ">
                  <span className="font-medium italic text-white">
                    Allestiamo{' '}
                  </span>
                  il bar,{' '}
                  <span className="font-medium italic text-white">
                    arrediamo{' '}
                  </span>
                  la sala,{' '}
                  <span className="font-medium italic text-white">
                    progettiamo e realizziamo
                  </span>{' '}
                  cucine per la grande distribuzione organizzata.
                </H3>
                <H3  variant="light-gray" as="p" className="my-7">
                  Mettiamo il cliente al centro garantendo le{' '}
                  <span className="font-medium italic text-white">
                    attrezzature più innovative{' '}
                  </span>
                  e gli{' '}
                  <span className="font-medium italic text-white">
                    arredi più confortevoli.
                  </span>{' '}
                </H3>
              </div>
            </Grid>
          </section>

          <section className="mx-auto mb-12 max-w-8xl lg:mb-24 xl:mb-48">
            <MepaSection />
          </section>

          <section className="mb-12 lg:mb-24 xl:mb-48" id="contatti">
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
