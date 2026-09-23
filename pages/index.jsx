import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import ContactForm from '../components/Form/ContactForm'
import {getGroups} from '../lib/newsletter'
import {getEvents} from '../lib/query/event'
import {getLastTwoProjects} from '../lib/query/project'
import {logos} from '../data/partner-logo'
import testimonials from '../data/testimonials'
import hero from '../public/img/matarrese_srl_home_01.webp'

const expertise = [
  {
    title: 'Dall’idea, allo spazio.',
    text: 'Ascoltiamo il tuo progetto. Disegniamo gli ambienti, organizziamo il lavoro e realizziamo arredi su misura.',
    image: '/img/home-box-arredo.jpg',
    alt: 'Arredi su misura per un locale',
    href: '/servizi',
    link: 'Progettazione e arredi',
  },
  {
    title: 'La tecnologia che serve.',
    text: 'Cucine professionali, attrezzature e forniture. Selezioniamo le soluzioni adatte al tuo modo di lavorare.',
    image: '/img/matarrese_srl_home_02.webp',
    alt: 'Una cucina professionale attrezzata',
    href: '/prodotti',
    link: 'Attrezzature e forniture',
  },
  {
    title: 'Al tuo fianco, ogni giorno.',
    text: 'Dalla messa in funzione alla manutenzione. La nostra assistenza continua anche dopo la consegna.',
    image: '/img/home-box-supporto.jpg',
    alt: 'Assistenza tecnica su un’attrezzatura professionale',
    href: '/assistenza',
    link: 'Assistenza tecnica',
  },
]

export default function Home({groups, lastTwoProjects = [], event}) {
  const upcoming = event?.futureEvent?.[0]
  return (
    <>
      <Head>
        <title>
          Matarrese srl | Attrezzature professionali per ristorazione e horeca
        </title>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Matarrese srl progetta e fornisce attrezzature professionali per ristorazione, cucine industriali, arredi su misura e soluzioni per bar, hotel e locali commerciali."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:title"
          content="Matarrese srl | Attrezzature professionali per ristorazione"
        />
        <meta
          property="og:description"
          content="Progettazione, attrezzature, arredi su misura e assistenza tecnica per i luoghi della ristorazione."
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout>
        <div className="home-page">
          <section className="home-hero" aria-labelledby="home-title">
            <div className="home-hero-photo">
              <Image
                src={hero}
                alt="Dettaglio del banco e degli arredi realizzati da Matarrese"
                fill
                priority
                sizes="100vw"
                quality={90}
              />
            </div>
            <div className="home-hero-shade" />
            <div className="home-hero-content">
              <p className="hero-location">Alberobello · Dal 1983</p>
              <h1 id="home-title">
                Diamo forma
                <br />
                ai luoghi della
                <br />
                ristorazione.
              </h1>
              <div className="hero-bottom">
                <div className="hero-actions">
                  <Link
                    className="site-button site-button-light"
                    href="/realizzazioni"
                  >
                    Scopri le realizzazioni
                  </Link>
                  <Link className="hero-contact" href="/contatti">
                    Contattaci
                  </Link>
                </div>
                <p>
                  Progettazione, attrezzature,
                  <br />
                  arredi su misura e assistenza tecnica.
                </p>
              </div>
            </div>
          </section>
          <div className="site-shell home-signature">
            <span>Un unico partner, dal progetto al servizio.</span>
            <a href="#competenze">
              Conosci Matarrese <span aria-hidden="true">↓</span>
            </a>
          </div>
          <section className="site-shell home-expertise" id="competenze">
            <div className="section-topline">
              <h2>
                Le tue idee.
                <br />
                Il nostro mestiere.
              </h2>
              <p>
                Ogni attività ha la sua identità. La trasformiamo in spazi che
                accolgono e strumenti che lavorano, con la cura di chi conosce
                la ristorazione.
              </p>
            </div>
            <div className="expertise-grid">
              {expertise.map(item => (
                <article key={item.href}>
                  <Link
                    className="expertise-image"
                    href={item.href}
                    aria-label={item.link}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 700px) 100vw, 33vw"
                    />
                  </Link>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link className="text-link" href={item.href}>
                    {item.link}
                  </Link>
                </article>
              ))}
            </div>
          </section>
          <section className="home-projects">
            <div className="site-shell">
              <div className="section-topline">
                <h2>Luoghi che prendono vita.</h2>
                <Link className="text-link" href="/realizzazioni">
                  Tutte le realizzazioni
                </Link>
              </div>
              <div className="home-project-grid">
                {lastTwoProjects.slice(0, 4).map((project, index) => {
                  const source =
                    project.featuredImage?.node?.mediaItemUrl ||
                    project.featuredImage?.node?.sourceUrl
                  return (
                    <article key={project.slug}>
                      <Link href={`/realizzazioni/${project.slug}`}>
                        <div className="home-project-image">
                          {source ? (
                            <Image
                              src={source}
                              alt={
                                project.featuredImage.node.altText ||
                                project.title
                              }
                              fill
                              sizes="(max-width: 700px) 100vw, 55vw"
                            />
                          ) : (
                            <span className="image-fallback">Matarrese</span>
                          )}
                        </div>
                        <div className="project-caption">
                          <h3
                            dangerouslySetInnerHTML={{__html: project.title}}
                          />
                          <span>Scopri il progetto</span>
                        </div>
                      </Link>
                    </article>
                  )
                })}
              </div>
              {lastTwoProjects.length === 0 && (
                <p>
                  Scopri i nostri progetti nella sezione{' '}
                  <Link href="/realizzazioni">Realizzazioni</Link>.
                </p>
              )}
            </div>
          </section>
          <section className="site-shell home-company">
            <div className="home-company-image">
              <Image
                src="/img/home-attrezzature.jpg"
                fill
                alt="Lo showroom Matarrese dedicato alla ristorazione professionale"
                sizes="(max-width: 900px) 100vw, 55vw"
              />
            </div>
            <div className="home-company-copy">
              <p className="page-intro">Dentro Matarrese</p>
              <h2>
                Le competenze.
                <br />E lo spazio
                <br />
                per metterle in pratica.
              </h2>
              <p>
                Ad Alberobello, 5.000 m² riuniscono showroom, laboratorio di
                produzione di arredi, officina, magazzino ricambi e spazi per la
                formazione.
              </p>
              <p>
                Un luogo dove vedere le soluzioni, confrontarsi con chi le
                conosce e costruire il proprio progetto.
              </p>
              <Link className="text-link" href="/azienda">
                Conosci la nostra azienda
              </Link>
            </div>
          </section>
          <section className="home-trust" id="assogi">
            <div className="site-shell">
              <div className="trust-intro">
                <h2>La qualità si costruisce insieme.</h2>
                <p>
                  Selezioniamo marchi e tecnologie per la ristorazione
                  professionale. Dal 2010 siamo parte del Consorzio ASSOGI.
                </p>
              </div>
              <div className="home-partners">
                {logos.slice(0, 6).map(logo => (
                  <Image
                    key={logo.name}
                    src={logo.url}
                    width={180}
                    height={95}
                    alt={logo.name}
                  />
                ))}
              </div>
              <Link className="text-link" href="/prodotti">
                Esplora prodotti e marchi
              </Link>
              <figure className="home-quote">
                <blockquote>“{testimonials[0].content}”</blockquote>
                <figcaption>
                  {testimonials[0].name}
                  <span>La voce dei nostri clienti</span>
                </figcaption>
              </figure>
            </div>
          </section>
          {upcoming && (
            <section className="site-shell home-event">
              <p className="page-intro">Il prossimo incontro</p>
              <h2 dangerouslySetInnerHTML={{__html: upcoming.title}} />
              <p>{upcoming.startDate}</p>
              <Link className="site-button" href={`/eventi/${upcoming.slug}`}>
                Scopri l’evento
              </Link>
            </section>
          )}
          <section className="home-contact" id="parliamone">
            <div className="site-shell section-topline">
              <h2>
                Il prossimo progetto
                <br />
                inizia da qui.
              </h2>
              <p>
                Raccontaci cosa hai in mente.
                <br />
                Troviamo insieme il modo di realizzarlo.
              </p>
            </div>
            <ContactForm groups={groups} compact />
          </section>
        </div>
      </Layout>
    </>
  )
}
export async function getStaticProps() {
  const groups = await getGroups()
  const lastTwoProjects = await getLastTwoProjects()
  const event = await getEvents()
  return {
    props: {groups, lastTwoProjects, event: {futureEvent: event.futureEvent}},
    revalidate: 86400,
  }
}
