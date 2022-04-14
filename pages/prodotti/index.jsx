import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import ContactForm from '../../components/Form/ContactForm'
import Layout from '../../components/Layout'
import ProductSection from '../../components/sections/product-section'
import {Grid} from '../../components/grid'
import {FeatureCard} from '../../components/feature-card'
import {H2, H3, H6, Paragraph} from '../../components/typography'
import {TestimonialSection} from '../../components/sections/testimonial-section'
import {HeroSection} from '../../components/sections/hero-section'

import IconCucineProfessionali from '../../public/img/icons/icon-cucine-professionali.png'
import IconMacchineAgro from '../../public/img/icons/icon-macchine-agroalimentare.png'
import IconProdotti from '../../public/img/icons/icon-prodotti.png'
import IconRefrigerazione from '../../public/img/icons/icon-regrigerazione.png'

import testimonials from '../../data/testimonials'
import cotturaProdotti from '../../public/img/cottura-prodotti.png'
import arredoSuMisura from '../../public/img/arredo-su-misura-prodotti.jpg'
// image="/img/climatizzazione-prodotti.jpg"

import {getGroups} from '../../lib/newsletter'
import FormModal from '../../components/Form/FormModal'
import {Button} from '../../components/button'

export default function ProductsHome({groups}) {
  return (
    <>
      <Head>
        <title>Attrezzature horeca e forniture alberghiere</title>
        <link rel="canonical" href="https://www.matarrese.it/" />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Cucine industriali, cucine professionali, arredamento per bar e ristoranti, impianti di aspirazione, attrezzature ristorazione e hotellerie"
        />
        <link rel="icon" href="/public/img/favicon/favicon.ico" />
      </Head>

      <Layout>
        <div className="mb-12 lg:mb-24 xl:mb-48">
          <ProductSection />
        </div>
        <main>
          <section className="relative">
            <Grid className="mb-12 lg:mb-24 xl:mb-48">
              <div className="col-span-full lg:col-span-6 lg:col-start-1">
                <div className="aspect-w-4 aspect-h-6 mb-12 lg:mb-0">
                  <Image
                    alt="prodotti per la cucina professionale"
                    className="max-w-full rounded-lg shadow-lg"
                    src={cotturaProdotti}
                    // width="1000"
                    // height="1300"
                    objectFit="cover"
                    layout="fill"
                    placeholder="blur"
                  />
                </div>
              </div>
              <div className="col-span-full lg:col-span-5 lg:col-start-8 lg:row-start-1">
                <H2 id="perche-comprare-da-noi" className="mb-10">
                  {`I nostri punti di forza`}
                </H2>
                <H6 as="h3" className="mb-4">
                  {`Qualità`}
                </H6>
                <Paragraph className="mb-12">{`Ci impegnamo nella selezione delle migliori attrezzature per la ristorazione prediligendo il Made in Italy. Offriamo ai nostri clienti gli stumenti più tecnologici e innovativi per creare esplosioni di colori e gusto in cucina`}</Paragraph>
                <H6 as="h3" className="mb-4">{`Consulenza`}</H6>
                <Paragraph className="mb-12">{`L'esperienza tecnica e l'ascolto delle diverse esigenze ci permette di trovare soluzioni su misura per realizzare progetti e idee che favoriscono l'efficienza e l'ottimizzazione del lavoro.`}</Paragraph>
                <H6 as="h3" className="mb-4">{`Affidabilità`}</H6>
                <Paragraph className="mb-12">{`Da quarant'anni operiamo al fianco dei professionisti della ristorazione, li seguiamo passo passo garantendo la sicurezza di potersi affidare ad un partner competente e qualificato.`}</Paragraph>
              </div>
            </Grid>

            <Grid className="mb-12 lg:mb-24 xl:mb-48">
              {/* NOTE: `-mt-20 pt-20 for anchor link and sticky navbar` */}
              <div className="col-span-full -mt-20 pt-20" id="lavorazione">
                <H2 className="mb-14">{`Prodotti per la lavorazione e conservazione degli alimenti`}</H2>
              </div>

              <div className="col-span-full">
                <Grid rowGap nested>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Cottura"
                      description="La cucina professionale è il cuore di ogni attività ristorativa.
                      Estro, creatività e passione espressi attraverso soluzioni
                      modulari e blocchi cottura per l'ottimizzazione del lavoro
                      e degli spazi."
                      // url="/prodotti/cottura"
                      // urlText="Scopri di più"
                      icon={
                        <Image
                          src={IconCucineProfessionali}
                          alt="icona cottura"
                          layout="intrinsic"
                          placeholder="blur"
                        />
                      }
                    />
                  </div>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Attrezzature"
                      description="Piccole, medie e grandi attrezzature, selezionate
                      tra i migliori marchi, sia per la preparazione dinamica
                      (tritacarne, affettatrici, utensili, ecc) che per la preparazione statica
                      (tavoli, lavelli, taglieri, ecc.) dei piatti"
                      // url="/prodotti/attrezzature"
                      // urlText="Scopri di più"
                      icon={
                        <Image
                          src={IconProdotti}
                          alt="icona attrezzature"
                          layout="intrinsic"
                          placeholder="blur"
                        />
                      }
                    />
                  </div>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Macchinari per l'agroalimentare"
                      description="Dalla progettazione alla realizzazione di laboratori di trasformazione alimenti per
                      le materie prime in tavola. Facilitiamo l'efficientamento del lavoro attraverso macchinare e
                      soluzioni tecnologicamente avanzate."
                      // urlText="Scopri di più"
                      icon={
                        <Image
                          src={IconMacchineAgro}
                          alt="icona macchine agroalimentari"
                          layout="intrinsic"
                          placeholder="blur"
                        />
                      }
                    />
                  </div>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Refrigerazione"
                      description="La sicurezza alimentare passa dalla conservazione. Soluzioni altamente innovative per
                      refrigerare a temperature differenziate si cominano perfettamente con il design di soluzioni espositive
                      refrigerate."
                      // url="/prodotti/refrigerazione"
                      // urlText="Scopri di più"
                      icon={
                        <Image
                          src={IconRefrigerazione}
                          alt="icona refrigerazione"
                          layout="intrinsic"
                          placeholder="blur"
                        />
                      }
                    />
                  </div>
                </Grid>
              </div>
            </Grid>
          </section>

          <section className="relative -mt-20 pt-20" id="accoglienza">
            <Grid className="mb-12 lg:mb-24 xl:mb-48">
              <div className="col-span-full lg:col-span-6 lg:col-start-1">
                <H2 id="perche-comprare-da-noi" className="mb-10">
                  {`Tutto per l'accoglienza`}
                </H2>
                <H6 as="h3" className="mb-4">
                  {`Forniture alberghiere`}
                </H6>
                <Paragraph className="mb-12">{`Raffinati ed eleganti oppure dallo stile minimal, il nostro showroom è ricco dei
                migliori utensili, accessori o dettagli per il tuo hotel. Dagli arredi su misura all'allestimento della cucina professionale, aiutiamo la tua struttura ricettiva ad esprimere ospitalità ed accoglienza
                 attraverso l'innovazione tecnologica e il design.`}</Paragraph>
                <H6 as="h3" className="mb-4">{`Attrezzature per bar`}</H6>
                <Paragraph className="mb-12">{`Una vasta gamma di utensili, attrezzature e strumenti necessari per la
                realizzazione di cocktail, colazioni e aperitivi di prim'ordine. Progettiamo e realizziamo i tuoi spazi
                per accogliere i clienti allestendo con tecnologia e design banconi bar attrezzati, moduli refrigerati,
                vetrine ecc.`}</Paragraph>
                <H6
                  as="h3"
                  className="mb-4"
                >{`Forniture per ristoranti, pizzerie e pasticcerie`}</H6>
                <Paragraph className="mb-12">{`Abbigliamento, pentole, porcellane, accessori per cucina, attrezzature
                elettriche e tanto altro per arredare ed equipaggiare la tua attività. Vieni a scoprire i dettagli speciali
                per una mise en place ed un arredamento che rispecchia il tuo stile.`}</Paragraph>
              </div>
              <div className="col-span-full lg:col-span-5 lg:col-start-8 lg:row-start-1">
                <div className="aspect-w-4 aspect-h-6 mb-12 lg:mb-0">
                  <Image
                    alt="prodotti per la cucina professionale"
                    className="max-w-full rounded-lg shadow-lg"
                    src={arredoSuMisura}
                    // width="1000"
                    // height="1300"
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
              </div>
            </Grid>
            <Grid className="mb-12 lg:mb-24 xl:mb-48" rowGap>
              <div className="col-span-full">
                <H2 className="mb-14">{`Qualità e stile anche nei dettagli`}</H2>
                {/* <H2 as="p" variant="secondary" className="mb-14">
                  {`Lascia i tuoi clienti a bocca aperta`}
                </H2> */}
              </div>

              <div className="col-span-full">
                <Grid rowGap nested>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Arredi e complementi"
                      description="Sedie, tavolini e decorazioni per interno o esterno, tutti scelti per il settore Ho.Re.Ca."
                      // url="/prodotti/cottura"
                      // urlText="Scopri di più"
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Arredi su misura"
                      description="Qualunque sia il tuo stile di arredo, noi lo realizziamo su misura dei tuoi spazi."
                      // url="/prodotti/attrezzature"
                      // urlText="Scopri di più"
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Dehors"
                      description="Soluzioni d'arredo pensate per gli spazi esterni del tuo ristornate, bar, pasticceria, pizzeria o gastronomia d'asporto."
                      // url="/prodotti/macchinari-agroalimentare"
                      // urlText="Scopri di più"
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                </Grid>
              </div>
            </Grid>
          </section>

          <section className="mb-12 lg:mb-24 xl:mb-48">
            <div className="mx-auto text-center">
              <Link href="/contatti" passHref>
                <Button size="medium">Visita il nostro showroom</Button>
              </Link>
            </div>
          </section>

          <section className="relative -mt-20 pt-20" id="trattamento-aria">
            <Grid className="mb-12 lg:mb-24 xl:mb-48">
              <div className="col-span-full">
                <H2>{`Lavora in un ambiente sano e confortevole`}</H2>
                <H3 as="p" variant="secondary" className="mb-14">
                  {`Gestiamo il microclima di cucine professionali, 
                    locali commerciali, laboratori alimentari e laboratori industriali`}
                </H3>
              </div>

              <div className="col-span-full">
                <Grid rowGap nested>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Aspirazione"
                      description="Riduci l'emissione di fumi e odori in cucina con impianti di aspirazione, reintegro e depurazione nel rispetto dei più alti stardard qualitativi."
                      // urlText="Scopri di più"
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Climatizzazione"
                      description="Impianti di climatizzazione estivi e invernali a fluido ed espansione diretta di qualsiasi dimensione, per ogni ambiente commerciale."
                      // url="/prodotti/refrigerazione"
                      // urlText="Scopri di più"
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                </Grid>
              </div>
            </Grid>
          </section>

          <section className="mb-12 lg:mb-24 xl:mb-48">
            <div className="mx-auto text-center">
              <FormModal
                buttonText="Parla con un consulente"
                size="medium"
                withButton
              />
            </div>
          </section>

          <section
            className="relative mb-12 bg-gray-800 lg:mb-24 xl:mb-48"
            id="igiene"
          >
            <Grid className="py-24">
              <div className="col-span-full">
                <H2 className="mb-3 text-gray-100 lg:mt-6">{`Igiene e sanificazione`}</H2>
                <H2 as="p" className="mb-14 text-gray-300">
                  {`Possiamo aiutarti a mantenere i tuoi ambienti puliti ed igienizzati`}
                </H2>
              </div>

              <div className="col-span-full mb-12">
                <Grid rowGap nested>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Sanificazione"
                      description="Per i tuoi ambienti di lavoro scegli una sanificazione ambientale totale, sia dell'aria che delle superfici."
                      // url="/prodotti/cottura"
                      // urlText="Scopri di più"
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Lavaggio"
                      description="Soluzioni di lavaggio dal piccolo bar sino alla ristorazione collettiva. Macchine affidabili e tecnologiche, lavabicchieri, lavaoggetti, lavavassoi di ogni forma e dimensione."
                      // url="/prodotti/attrezzature"
                      // urlText="Scopri di più"
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Lavanderia"
                      description="Allestiamo lavanderie professionali per hotel, residence, ristoranti, case di riposo, cliniche e ovunque si debba offrire un trattamento dei tessuti."
                      // url="/prodotti/macchinari-agroalimentare"
                      // urlText="Scopri di più"
                      // icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                </Grid>
              </div>
            </Grid>
          </section>

          <div className="mb-12 lg:mb-24 xl:mb-48">
            {/* TODO: make an utility function to parse testimonials based on
            category or topic */}
            <TestimonialSection
              testimonials={testimonials}
              className="mb-24 lg:mb-64"
            />
          </div>
          <section className="mb-12 lg:mb-24 xl:mb-48" id="contatti">
            <ContactForm featured groups={groups} />
          </section>
        </main>
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
