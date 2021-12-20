import Head from 'next/head'
import Image from 'next/image'

import ContactForm from '../../components/Form/ContactForm'
import Layout from '../../components/Layout'
import ProductSection from '../../components/sections/product-section'
import {Grid} from '../../components/grid'
import {FeatureCard} from '../../components/feature-card'
import {H2, H6, Paragraph} from '../../components/typography'
import {TestimonialSection} from '../../components/sections/testimonial-section'
import {HeroSection} from '../../components/sections/hero-section'

import {BriefCaseIcon} from '../../components/icons/briefcase-icon'

import testimonials from '../../data/testimonials'
import cotturaProdotti from '../../public/img/cottura-prodotti.png'
import arredoSuMisura from '../../public/img/arredo-su-misura-prodotti.jpg'
// image="/img/climatizzazione-prodotti.jpg"

export default function Home() {
  return (
    <>
      <Head>
        <title>Matarrese srl | Prodotti</title>
        <link rel="canonical" href="https://www.matarrese.it/" />
        <meta
          name="description"
          content="Traduttori di Idee, creatori di Spazi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="mb-24 lg:mb-48">
          <ProductSection />
        </div>
        <main>
          <section className="relative" id="lavorazione">
            <Grid className="mb-24 lg:mb-48">
              <div className="col-span-full lg:col-span-6 lg:col-start-1">
                <div className="aspect-h-6 aspect-w-4 mb-12 lg:mb-0">
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
                  {`Ecco alcuni dei motivi perchè dovreste comprare da noi`}
                </H2>
                <H6 as="h3" className="mb-4">
                  {`Qualità`}
                </H6>
                <Paragraph className="mb-12">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}</Paragraph>
                <H6 as="h3" className="mb-4">{`Consulenza`}</H6>
                <Paragraph className="mb-12">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}</Paragraph>
                <H6 as="h3" className="mb-4">{`Affidabilità`}</H6>
                <Paragraph className="mb-12">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}</Paragraph>
              </div>
            </Grid>

            <Grid className="mb-24 lg:mb-48">
              <div className="col-span-full">
                <H2 className="mb-3 lg:mt-6">{`Prodotti per la lavorazione e conservazione degli alimenti`}</H2>
                <H2 as="p" variant="secondary" className="mb-14">
                  {`Lorem ipsum dolor sit amet`}
                </H2>
              </div>

              <div className="col-span-full">
                <Grid rowGap nested>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Cottura"
                      description="Aprire un'attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione."
                      url="/prodotti/cottura"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Attrezzature"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus vehicula quam ipsum, at aliquam tellus mollis
                    varius. Integer nisi urna, vulputate non risus ac, imperdiet
                    vestibulum dolor. Proin rutrum nunc id pellentesque semper."
                      url="/prodotti/attrezzature"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Macchinari per l'agroalimentare"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus vehicula quam ipsum, at aliquam tellus mollis
                    varius. Integer nisi urna, vulputate non risus ac, imperdiet
                    vestibulum dolor. Proin rutrum nunc id pellentesque semper."
                      url="/prodotti/macchinari-agroalimentare"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Refrigerazione"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus vehicula quam ipsum, at aliquam tellus mollis
                    varius. Integer nisi urna, vulputate non risus ac, imperdiet
                    vestibulum dolor. Proin rutrum nunc id pellentesque semper."
                      url="/prodotti/refrigerazione"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                </Grid>
              </div>
            </Grid>
          </section>

          <section className="relative" id="accoglienza">
            <Grid className="mb-24 lg:mb-48">
              <div className="col-span-full lg:col-span-6 lg:col-start-1">
                <H2 id="perche-comprare-da-noi" className="mb-10">
                  {`Tutto per l'Accoglienza`}
                </H2>
                <H6 as="h3" className="mb-4">
                  {`Titolo 1`}
                </H6>
                <Paragraph className="mb-12">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}</Paragraph>
                <H6 as="h3" className="mb-4">{`Titolo 2`}</H6>
                <Paragraph className="mb-12">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}</Paragraph>
              </div>
              <div className="col-span-full lg:col-span-5 lg:col-start-8 lg:row-start-1">
                <div className="aspect-h-6 aspect-w-4 mb-12 lg:mb-0">
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
            <Grid className="mb-24 lg:mb-48" rowGap>
              <div className="col-span-full">
                <H2 className="mb-3 lg:mt-6">{`Qualità e stile anche nei dettagli`}</H2>
                <H2 as="p" variant="secondary" className="mb-14">
                  {`Lascia i tuoi clienti a bocca aperta`}
                </H2>
              </div>

              <div className="col-span-full">
                <Grid rowGap nested>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Arredi e complementi"
                      description="Aprire un'attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle."
                      url="/prodotti/cottura"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Arredi su misura"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                      url="/prodotti/attrezzature"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Forniture alberghiere"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula quam ipsum, at aliquam tellus mollis
                    varius."
                      url="/prodotti/macchinari-agroalimentare"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                </Grid>
              </div>
            </Grid>
          </section>

          <HeroSection
            title="Lorem Ipsum Dolor sit"
            subtitle="Bla bla bla"
            image="/img/climatizzazione-prodotti.jpg"
            imageSize="large"
          />
          <section className="relative" id="trattamento-aria">
            <Grid className="mb-24 lg:mb-48">
              <div className="col-span-full">
                <H2 className="mb-3 lg:mt-6">{`Trattamento dell'aria`}</H2>
                <H2 as="p" variant="secondary" className="mb-14">
                  {`Lorem ipsum dolor sit amet`}
                </H2>
              </div>

              <div className="col-span-full">
                <Grid rowGap nested>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Aspirazione"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus vehicula quam ipsum, at aliquam tellus mollis
                    varius. Integer nisi urna, vulputate non risus ac, imperdiet
                    vestibulum dolor. Proin rutrum nunc id pellentesque semper."
                      url="/prodotti/macchinari-agroalimentare"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-6">
                    <FeatureCard
                      title="Climatizzazione"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus vehicula quam ipsum, at aliquam tellus mollis
                    varius. Integer nisi urna, vulputate non risus ac, imperdiet
                    vestibulum dolor. Proin rutrum nunc id pellentesque semper."
                      url="/prodotti/refrigerazione"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                </Grid>
              </div>
            </Grid>
          </section>

          <section className="relative mb-24 bg-gray-800 lg:mb-48" id="igiene">
            <Grid className="py-24">
              <div className="col-span-full">
                <H2 className="mb-3 text-gray-100 lg:mt-6">{`Negli ultimi anni l'igiene ha assunto sempre più importanza`}</H2>
                <H2 as="p" className="mb-14 text-gray-300">
                  {`Possiamo aiutarti a mantenere i tuoi ambienti puliti ed igenizzati`}
                </H2>
              </div>

              <div className="col-span-full mb-12">
                <Grid rowGap nested>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Sanificazione"
                      description="Aprire un'attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle."
                      url="/prodotti/cottura"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Lavaggio"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                      url="/prodotti/attrezzature"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                  <div className="col-span-full lg:col-span-4">
                    <FeatureCard
                      title="Lavanderia"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula quam ipsum, at aliquam tellus mollis
                    varius."
                      url="/prodotti/macchinari-agroalimentare"
                      urlText="Scopri di più"
                      icon={<BriefCaseIcon size={48} />}
                    />
                  </div>
                </Grid>
              </div>
            </Grid>
          </section>

          <div className="mb-24 lg:mb-48">
            {/* TODO: make an utility function to parse testimonials based on
            category or topic */}
            <TestimonialSection
              testimonials={testimonials}
              className="mb-24 lg:mb-64"
            />
          </div>
          <section className="mb-24 lg:mb-48" id="contatti">
            <ContactForm featured />
          </section>
        </main>
      </Layout>
    </>
  )
}
