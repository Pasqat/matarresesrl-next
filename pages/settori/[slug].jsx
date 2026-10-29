// Pagina di settore: contenuti in data/settori.js (solo i settori con `pagina` hanno una pagina).
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Magnetic from '../../components/Magnetic'
import ContactForm from '../../components/Form/ContactForm'
import CardEditoriale from '../../components/editoriale/CardEditoriale'
import GrigliaEditoriale from '../../components/editoriale/GrigliaEditoriale'
import StructuredData from '../../components/StructuredData'
import {breadcrumbSchema, faqSchema, serviceSchema} from '../../lib/seo/schema'
import {getGroups} from '../../lib/newsletter'
import {getProjects} from '../../lib/query/project'
import settori from '../../data/settori'

export default function Settore({slug, groups, progetti}) {
  const settore = settori.find(s => s.slug === slug)
  const {pagina} = settore
  const altri = settori.filter(s => s.slug !== slug)
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/settori/${slug}`
  const title = `${settore.seo.titolo ?? settore.nome} | Matarrese srl`
  const description = settore.seo.descrizione ?? pagina.intro
  const faq = (settore.seo.faq ?? []).map(([question, answer]) => ({
    question,
    answer,
  }))

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}${pagina.hero}`}
        />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="it_IT" />
      </Head>
      <StructuredData
        data={breadcrumbSchema([
          {name: settore.nome, path: `/settori/${slug}`},
        ])}
      />
      <StructuredData
        data={serviceSchema({
          name: settore.seo.titolo ?? settore.nome,
          description,
          url,
        })}
      />
      <StructuredData data={faqSchema(faq)} />
      <Layout navbarTransparent>
        <PageHero
          title={pagina.titolo}
          intro={pagina.intro}
          image={{src: pagina.hero}}
        >
          <Magnetic>
            <a href="#contatto" className="cta-fiamma">
              Parla con un progettista
            </a>
          </Magnetic>
          <a
            href="#offerta"
            className="border-b border-inox/60 py-2 text-white transition-colors hover:border-white"
          >
            Cosa facciamo
          </a>
        </PageHero>

        {/* Capitolo chiaro: il contesto del settore */}
        <section
          className="bg-calce text-ghisa"
          data-header="light"
          aria-labelledby="capitolo-title"
        >
          <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-5">
              <h2
                id="capitolo-title"
                className="type-display text-[clamp(30px,3.4vw,52px)]"
              >
                {pagina.capitolo.titolo}
              </h2>
              {pagina.capitolo.foto && (
                <div className="relative mt-10 aspect-[4/3] overflow-hidden bg-inox">
                  <Image
                    src={pagina.capitolo.foto}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
              {pagina.capitolo.voci && (
                <dl>
                  {pagina.capitolo.voci.map(([titolo, testo]) => (
                    <div
                      key={titolo}
                      className="border-t border-ghisa/15 py-6 last:border-b"
                    >
                      <dt className="type-display text-[22px]">{titolo}</dt>
                      <dd className="mt-2 max-w-[56ch] text-acciaio">
                        {testo}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {pagina.capitolo.elenco && (
                <ul>
                  {pagina.capitolo.elenco.map(voce => (
                    <li
                      key={voce}
                      className="type-display border-t border-ghisa/15 py-5 text-[clamp(22px,2.4vw,36px)] last:border-b"
                    >
                      {voce}
                    </li>
                  ))}
                </ul>
              )}
              {pagina.capitolo.nota && (
                <p className="mt-6 text-acciaio">{pagina.capitolo.nota}</p>
              )}
            </div>
          </div>
        </section>

        {/* Capitolo scuro: cosa facciamo */}
        <section
          id="offerta"
          className="bg-ghisa text-white"
          data-header="dark"
          aria-labelledby="offerta-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <h2
              id="offerta-title"
              className="type-display max-w-[18ch] text-[clamp(30px,3.4vw,52px)]"
            >
              {pagina.offerta.titolo}
            </h2>
            <ul className="mt-14 grid gap-x-10 md:grid-cols-2">
              {pagina.offerta.voci.map(([titolo, testo]) => (
                <li
                  key={titolo}
                  className="group relative border-t border-inox/25 py-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-px w-0 bg-fiamma transition-all duration-700 ease-out group-hover:w-full motion-reduce:transition-none"
                  />
                  <h3 className="type-display text-2xl">{titolo}</h3>
                  <p className="mt-3 max-w-[52ch] text-inox-muted">{testo}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prova in sede o galleria di lavori */}
        {pagina.prova && (
          <section
            className="bg-calce text-ghisa"
            data-header="light"
            aria-labelledby="prova-title"
          >
            <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:items-center lg:py-32">
              <div className="relative aspect-[3/2] overflow-hidden bg-inox lg:col-span-7">
                <Image
                  src={pagina.prova.foto}
                  alt="Lo showroom Matarrese ad Alberobello"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-5">
                <h2
                  id="prova-title"
                  className="type-display text-[clamp(28px,3vw,44px)]"
                >
                  {pagina.prova.titolo}
                </h2>
                <p className="mt-6 max-w-[46ch] text-acciaio">
                  {pagina.prova.testo}
                </p>
              </div>
            </div>
          </section>
        )}
        {pagina.galleria && (
          <section
            className="bg-calce text-ghisa"
            data-header="light"
            aria-label="Alcuni lavori realizzati"
          >
            <div className="site-shell grid gap-8 py-24 md:grid-cols-3 lg:py-32">
              {pagina.galleria.map((foto, i) => (
                <figure key={foto.src} className={i === 1 ? 'md:mt-20' : ''}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-inox">
                    <Image
                      src={foto.src}
                      alt={foto.didascalia}
                      fill
                      sizes="(min-width: 640px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 text-sm text-acciaio">
                    {foto.didascalia}
                  </figcaption>
                </figure>
              ))}
              {pagina.nota && (
                <p className="text-acciaio md:col-span-3">{pagina.nota}</p>
              )}
            </div>
          </section>
        )}

        {/* Realizzazioni del settore, dalle categorie portfolio di WordPress */}
        {progetti.length > 0 && (
          <section
            className="bg-white text-ghisa"
            data-header="light"
            aria-labelledby="realizzazioni-title"
          >
            <div className="site-shell py-24 lg:py-32">
              <div className="flex flex-wrap items-baseline justify-between gap-6">
                <h2
                  id="realizzazioni-title"
                  className="type-display text-[clamp(28px,3vw,44px)]"
                >
                  Lavori realizzati
                </h2>
                <Link
                  href="/realizzazioni"
                  className="border-b border-ghisa py-1 transition-colors hover:text-fiamma-testo"
                >
                  Tutte le realizzazioni
                </Link>
              </div>
              <GrigliaEditoriale
                className="mt-14"
                items={progetti}
                render={(progetto, aspect) => (
                  <CardEditoriale
                    as="h3"
                    href={`/realizzazioni/${progetto.slug}`}
                    image={progetto.image}
                    title={progetto.title}
                    meta={progetto.categories.join(' · ')}
                    aspect={aspect}
                  />
                )}
              />
            </div>
          </section>
        )}

        {/* Domande frequenti: sempre aperte, sono il testo che i motori citano */}
        {faq.length > 0 && (
          <section
            className="bg-white text-ghisa"
            data-header="light"
            aria-labelledby="faq-title"
          >
            <div className="site-shell grid gap-10 py-24 lg:grid-cols-12 lg:py-32">
              <h2
                id="faq-title"
                className="type-display text-[clamp(28px,3vw,44px)] lg:col-span-4"
              >
                Domande frequenti
              </h2>
              <dl className="lg:col-span-7 lg:col-start-6">
                {faq.map(({question, answer}) => (
                  <div
                    key={question}
                    className="border-t border-ghisa/15 py-6 last:border-b"
                  >
                    <dt className="type-display text-[clamp(19px,1.7vw,24px)] leading-tight">
                      {question}
                    </dt>
                    <dd className="mt-3 max-w-[60ch] text-lg text-acciaio">
                      {answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* Approfondimenti: articoli del blog collegati al settore */}
        {settore.seo.articoli?.length > 0 && (
          <section
            className="bg-white text-ghisa"
            data-header="light"
            aria-labelledby="approfondimenti-title"
          >
            <div className="site-shell border-t border-ghisa/10 py-16">
              <h2 id="approfondimenti-title" className="type-display text-2xl">
                Approfondimenti
              </h2>
              <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
                {settore.seo.articoli.map(([articolo, titolo]) => (
                  <li key={articolo} className="border-t border-ghisa/15">
                    <Link
                      href={`/news/${articolo}`}
                      className="block py-4 text-lg transition-colors hover:text-fiamma-testo"
                    >
                      {titolo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Altri settori */}
        <section
          className="bg-white text-ghisa"
          data-header="light"
          aria-labelledby="altri-title"
        >
          <div className="site-shell border-b border-ghisa/10 py-16">
            <h2 id="altri-title" className="type-display text-2xl">
              Lavoriamo anche per
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-lg">
              {altri.map(s => (
                <li key={s.slug}>
                  {s.pagina ? (
                    <Link
                      href={`/settori/${s.slug}`}
                      className="border-b border-ghisa py-1 hover:text-fiamma-testo"
                    >
                      {s.nome}
                    </Link>
                  ) : (
                    <span className="text-acciaio">{s.nome}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Chiusura: contatto */}
        <section
          id="contatto"
          className="bg-white text-ghisa"
          data-header="light"
          aria-labelledby="contatto-title"
        >
          <div className="site-shell pb-10 pt-24">
            <h2
              id="contatto-title"
              className="type-display max-w-[20ch] text-[clamp(32px,4vw,64px)]"
            >
              Raccontaci il tuo progetto.
            </h2>
          </div>
          <div className="pb-24">
            <ContactForm groups={groups} compact />
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: settori.filter(s => s.pagina).map(s => ({params: {slug: s.slug}})),
    fallback: false,
  }
}

// Ultime sei realizzazioni nelle categorie WordPress del settore (già ordinate per data)
const MAX_PROGETTI = 6

export async function getStaticProps({params}) {
  const settore = settori.find(s => s.slug === params.slug)
  const categorie = settore.seo.categorie ?? []
  const [groups, {projects}] = await Promise.all([
    getGroups(),
    categorie.length ? getProjects() : {projects: []},
  ])
  const progetti = projects
    .filter(p =>
      p.portfolioCategories.nodes.some(c => categorie.includes(c.slug)),
    )
    .slice(0, MAX_PROGETTI)
    .map(p => ({
      title: p.title,
      slug: p.slug,
      categories: p.categories,
      image: {
        src: p.featuredImage?.node?.mediaItemUrl ?? null,
        alt: p.featuredImage?.node?.altText ?? '',
      },
    }))
  return {
    props: {slug: params.slug, groups, progetti},
    revalidate: 60 * 60 * 24,
  }
}
