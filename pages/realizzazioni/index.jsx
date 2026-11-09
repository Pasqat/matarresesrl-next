import * as React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import * as fbq from '../../lib/fpixel'

import Layout from '../../components/Layout'
import HeroCinema from '../../components/cinema/HeroCinema'
import heroImg from '../../public/img/settori/rist-auraterrae.webp'
import GrigliaRivista from '../../components/cinema/GrigliaRivista'
import {CaricaAltri} from '../../components/editoriale/FiltriArchivio'
import Scelta from '../../components/cinema/Scelta'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import StructuredData from '../../components/StructuredData'

import {filterPosts} from '../../actions/utils/blog'
import {getProjects} from '../../lib/query/project'
import {ogni} from '../../lib/pannello'
import {decodifica} from '../../lib/entita'
import {breadcrumbSchema, realizzazioniSchema} from '../../lib/seo/schema'

const DESCRIZIONE =
  'Cucine professionali, laboratori e arredi realizzati in masserie, ristoranti, macellerie, pasticcerie e hotel in Puglia. Guarda i progetti.'

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
          Realizzazioni horeca in Puglia: cucine e arredi | Matarrese srl
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
        <meta name="description" content={DESCRIZIONE} />
        <meta property="og:title" content="Realizzazioni Matarrese srl" />
        <meta
          property="og:description"
          content="Esempi di progetti per cucine professionali, arredi e attrezzature per la ristorazione."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/og/home.jpg`}
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
      {/* Tutti i progetti, non solo quelli filtrati o visibili */}
      <StructuredData
        data={realizzazioniSchema({
          name: 'Realizzazioni horeca in Puglia: cucine e arredi',
          description: DESCRIZIONE,
          projects: allPosts.map(p => ({
            name: decodifica(p.title),
            slug: p.slug,
            comune: p.comune,
          })),
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          {name: 'Realizzazioni', path: '/realizzazioni'},
        ])}
      />

      <Layout navbarTransparent>
        <HeroCinema
          image={heroImg}
          alt="La cucina della Masseria Auraterrae"
          objectPosition="50% 50%"
          eyebrow="Dal 1983, in Puglia"
          riga="Realizzazioni per bar, ristoranti,"
          accento="hotel e attività professionali."
          sottotitolo="Progettare un locale significa trovare il giusto equilibrio tra efficienza in cucina e comfort per i clienti. Da oltre 40 anni, ad Alberobello, progettiamo cucine professionali, arredi su misura e attrezzature horeca per ristoranti, bar, B&B, macellerie, pasticcerie, caseifici e strutture per banqueting."
        >
          <a href="#archivio" className="cin-btn">
            Guarda i progetti
          </a>
        </HeroCinema>

        <section
          id="archivio"
          className="scroll-mt-20 bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="archivio-title"
        >
          <div className="site-shell pb-24 pt-12 lg:pb-32 lg:pt-16">
            <TitoloDueTempi
              id="archivio-title"
              tono="chiaro"
              riga="I nostri progetti"
              className="mb-8 text-[clamp(36px,4.4vw,64px)] !leading-none lg:mb-10"
            />
            {/* Ricerca editoriale: riga grande, filtri a pillola sotto */}
            <div role="search">
              <div className="cin-cerca">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">Cerca tra le realizzazioni</span>
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Cerca un locale…"
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
                        {scroll: false},
                      )
                    }}
                  />
                </label>
                {/* Il totale non si mostra (sembrava poco): solo lo screen reader sente quanti risultati dà un filtro */}
                <p className="sr-only" aria-live="polite">
                  {filtri
                    ? `${posts.length} ${
                        posts.length === 1 ? 'progetto' : 'progetti'
                      }`
                    : ''}
                </p>
              </div>
              <div className="relative mt-5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={`cin-pill ${filtri ? '' : 'is-on'}`}
                  aria-pressed={!filtri}
                  onClick={() => {
                    setQuery('')
                    setSettore('')
                    setAnno('')
                    router.push({query: {}}, '', {scroll: false})
                  }}
                >
                  Tutti
                </button>
                <Scelta
                  label="Settore"
                  tutti="Tutti i settori"
                  opzioni={data.categories}
                  valore={settore}
                  onChange={setSettore}
                />
                <Scelta
                  label="Anno"
                  tutti="Ogni anno"
                  opzioni={data.tags}
                  valore={anno}
                  onChange={setAnno}
                />
              </div>
              {/* L'archivio è una selezione: senza questa nota un anno con un progetto sembra un anno con un lavoro */}
              <p className="mt-6 max-w-[62ch] text-acciaio">
                Una selezione dei nostri lavori, tra i tanti realizzati dal
                1983.
              </p>
            </div>

            <div ref={resultsRef} className="mt-12 scroll-mt-28 lg:mt-16">
              {posts.length === 0 ? (
                <p className="type-display max-w-[24ch] py-16 text-[clamp(24px,2.6vw,36px)]">
                  Nessun progetto con questi criteri. Prova a togliere un
                  filtro.
                </p>
              ) : (
                <GrigliaRivista
                  visibili={indexToShow}
                  items={posts.map(p => ({
                    href: `/realizzazioni/${p.slug}`,
                    title: p.title,
                    meta: [p.categories?.[0], p.tags?.[0], p.comune]
                      .filter(Boolean)
                      .join(' · '),
                    image: {
                      src: p.featuredImage?.node?.mediaItemUrl,
                      alt: p.featuredImage?.node?.altText,
                    },
                  }))}
                />
              )}
            </div>

            {hasMorePosts ? (
              <CaricaAltri
                shown={shown}
                total={posts.length}
                nomi={['progetto', 'progetti']}
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
    revalidate: ogni(60 * 60 * 24),
  }
}
