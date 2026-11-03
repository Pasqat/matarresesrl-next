import * as React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import * as fbq from '../../lib/fpixel'

import Layout from '../../components/Layout'
import HeroCinema from '../../components/cinema/HeroCinema'
import heroImg from '../../public/img/settori/rist-auraterrae.webp'
import Image from 'next/image'
import Link from 'next/link'
import {CaricaAltri} from '../../components/editoriale/FiltriArchivio'

import {filterPosts} from '../../actions/utils/blog'
import {getProjects} from '../../lib/query/project'

const PAGE_SIZE = 10 // due gruppi da cinque della griglia a rivista
const initialIndexToShow = PAGE_SIZE

// this really is not needed, or maybe only the part `(\s|$)?
const specialQueryRegex = /(?<not>!)?leader:(?<team>\w+)(\s|$)?/g

export default function Realizzazioni({data}) {
  const router = useRouter()

  const searchParams = Array.isArray(router.query.q)
    ? router.query.q.join('+')
    : router.query.q
  const searchInputRef = React.useRef(null)

  const resultsRef = React.useRef(null)

  const [queryValue, setQuery] = React.useState(() => {
    return searchParams ?? ''
  })

  // Pagina statica: `router.query` si popola solo dopo l'idratazione, quindi chi arriva da
  // /realizzazioni?q=… va sincronizzato qui. I redirect di next.config.js passano slug
  // (es. sale-ricevimenti): i trattini diventano spazi.
  const {isReady} = router
  React.useEffect(() => {
    if (isReady && searchParams) setQuery(searchParams.replace(/-/g, ' '))
  }, [isReady, searchParams])

  const query = queryValue.trim()

  const {projects: allPosts} = data

  const regularQuery = query.replace(specialQueryRegex, '').trim()

  const [settore, setSettore] = React.useState('')
  const [anno, setAnno] = React.useState('')

  const matchingPosts = React.useMemo(
    () =>
      filterPosts(allPosts, regularQuery).filter(
        p =>
          (!settore || p.categories?.includes(settore)) &&
          (!anno || p.tags?.includes(anno)),
      ),
    [allPosts, regularQuery, settore, anno],
  )

  const [indexToShow, setIndexToShow] = React.useState(initialIndexToShow)
  // when the filters change, we want to reset the index
  React.useEffect(() => {
    setIndexToShow(initialIndexToShow)
  }, [query, settore, anno])

  // Tutte le realizzazioni restano nell'HTML; a schermo se ne vedono `indexToShow`
  const posts = matchingPosts
  const shown = Math.min(indexToShow, posts.length)
  const hasMorePosts = indexToShow < posts.length
  const filtri = query || settore || anno

  return (
    <div>
      <Head>
        <title>
          Realizzazioni | Cucine professionali, arredi e attrezzature horeca
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/realizzazioni`}
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Cucine professionali, laboratori e arredi realizzati in masserie, ristoranti, macellerie, pasticcerie e hotel in Puglia. Guarda i progetti."
        />
        <meta property="og:title" content="Realizzazioni Matarrese srl" />
        <meta
          property="og:description"
          content="Esempi di progetti per cucine professionali, arredi e attrezzature per la ristorazione."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/realizzazioni`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Layout navbarTransparent>
        <HeroCinema
          image={heroImg}
          alt="La cucina della Masseria Auraterrae"
          objectPosition="50% 50%"
          eyebrow="Dal 1983, in Puglia"
          riga="Realizzazioni per bar, ristoranti,"
          accento="hotel e attività professionali."
          sottotitolo="Da oltre quarant’anni progettiamo cucine professionali, arredi su misura, attrezzature per l’ho.re.ca. e soluzioni complete per locali commerciali, macellerie, pasticcerie, hotel e spazi dedicati alla ristorazione."
        >
          <a href="#archivio" className="cin-btn">
            Guarda i progetti
          </a>
        </HeroCinema>

        <section
          id="archivio"
          className="scroll-mt-20 bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-label="Archivio delle realizzazioni"
        >
          <div className="site-shell pb-24 pt-12 lg:pb-32 lg:pt-16">
            {/* Barra unica: resta sotto l'header mentre si scorre l'archivio */}
            <div className="cin-barra" role="search">
              <label className="cin-barra__cerca">
                <span className="sr-only">Cerca tra le realizzazioni</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="m20 20-3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Cerca un locale o una città"
                  value={queryValue}
                  onChange={e =>
                    setQuery(e.currentTarget.value.toLocaleLowerCase())
                  }
                  onKeyUp={e => {
                    if (e.key !== 'Enter') return
                    resultsRef.current
                      ?.querySelector('a')
                      ?.focus({preventScroll: true})
                    resultsRef.current?.scrollIntoView({behavior: 'smooth'})
                    fbq.event('Search', {
                      content_category: 'realizzazioni',
                      search_string: query,
                    })
                    router.push(
                      {query: {q: e.currentTarget.value.toLocaleLowerCase()}},
                      '',
                      {
                        scroll: false,
                      },
                    )
                  }}
                />
              </label>
              <label className="cin-barra__scelta">
                <span className="sr-only">Settore</span>
                <select
                  value={settore}
                  onChange={e => setSettore(e.target.value)}
                >
                  <option value="">Tutti i settori</option>
                  {data.categories.map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="cin-barra__scelta">
                <span className="sr-only">Anno</span>
                <select value={anno} onChange={e => setAnno(e.target.value)}>
                  <option value="">Ogni anno</option>
                  {data.tags.map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              {filtri ? (
                <button
                  type="button"
                  className="cin-barra__conta"
                  onClick={() => {
                    setQuery('')
                    setSettore('')
                    setAnno('')
                    router.push({query: {}}, '', {scroll: false})
                  }}
                >
                  {posts.length} {posts.length === 1 ? 'progetto' : 'progetti'}
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">: azzera i filtri</span>
                </button>
              ) : (
                <span className="cin-barra__conta" aria-live="polite">
                  {posts.length} progetti
                </span>
              )}
            </div>

            <div ref={resultsRef} className="mt-10 scroll-mt-40 lg:mt-14">
              {posts.length === 0 ? (
                <p className="type-display max-w-[24ch] py-16 text-[clamp(24px,2.6vw,36px)]">
                  Nessun progetto con questi criteri. Prova a togliere un
                  filtro.
                </p>
              ) : (
                <ul className="cin-rivista">
                  {posts.map((project, i) => {
                    const img = project.featuredImage?.node
                    return (
                      <li key={project.slug} hidden={i >= indexToShow}>
                        <Link href={`/realizzazioni/${project.slug}`}>
                          {img?.mediaItemUrl && (
                            <Image
                              src={img.mediaItemUrl}
                              alt={img.altText || ''}
                              fill
                              // la prima di ogni gruppo da cinque occupa metà riga
                              sizes={
                                i % 5 === 0
                                  ? '(min-width: 1024px) 50vw, 100vw'
                                  : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
                              }
                            />
                          )}
                          <span className="cin-rivista__scrim" />
                          <span className="cin-rivista__testo">
                            <span className="cin-rivista__meta">
                              {[project.categories?.[0], project.tags?.[0]]
                                .filter(Boolean)
                                .join(' · ')}
                            </span>
                            <span
                              className="cin-rivista__titolo"
                              dangerouslySetInnerHTML={{__html: project.title}}
                            />
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {hasMorePosts ? (
              <CaricaAltri
                shown={shown}
                total={posts.length}
                onClick={() => setIndexToShow(i => i + PAGE_SIZE)}
              >
                Mostra altre realizzazioni
              </CaricaAltri>
            ) : null}
          </div>
        </section>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const data = await getProjects()
  const categories = data.categories
    .filter(category => category.count > 0)
    .map(c => c.name)
  const tags = data.tags
    .filter(tags => tags.count > 0)
    .map(t => t.name)
    .sort((a, b) => b.localeCompare(a))

  // const domain = process.env.NEXT_PUBLIC_DOMAIN

  return {
    props: {
      data: {
        tags,
        categories,
        projects: data.projects.map(item => ({
          ...item,
          featuredImage: item.featuredImage?.node
            ? {
                node: {
                  mediaItemUrl: item.featuredImage.node.mediaItemUrl,
                  altText: item.featuredImage.node.altText,
                },
              }
            : null,
        })),
        // domain,
      },
    },
    revalidate: 60 * 60 * 24,
  }
}
