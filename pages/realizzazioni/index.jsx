import * as React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import * as fbq from '../../lib/fpixel'

import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import CardEditoriale from '../../components/editoriale/CardEditoriale'
import GrigliaEditoriale from '../../components/editoriale/GrigliaEditoriale'
import {
  CampoRicerca,
  CaricaAltri,
  ChipCategorie,
} from '../../components/editoriale/FiltriArchivio'

import {filterPosts} from '../../actions/utils/blog'
import {getProjects} from '../../lib/query/project'

const PAGE_SIZE = 12
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

  /**
   * This is here to make sure that a user doesn't hit "enter" on the search
   * button, which focuses the input and then keyup the enter on the input
   * which will trigger the scroll down. We should *only* scroll when the
   * "enter" keypress and keyup happen on the input.
   */
  const ignoreInputKeyUp = React.useRef(false)

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

  const matchingPosts = React.useMemo(() => {
    return filterPosts(allPosts, regularQuery)
  }, [allPosts, regularQuery])

  const [indexToShow, setIndexToShow] = React.useState(initialIndexToShow)
  // when the query changes, we want to reset the index
  React.useEffect(() => {
    setIndexToShow(initialIndexToShow)
  }, [query])

  function toggleCategory(category) {
    setQuery(q => {
      // create a regexp so that we can replace multiple occurrences (`this that this`)
      const expression = new RegExp(category, 'ig')

      const newQuery = expression.test(q)
        ? q.replace(expression, '')
        : `${q} ${category}`

      router.push(
        {query: {q: newQuery.toLowerCase().replace(/\s+/g, ' ').trim()}},
        '',
        {
          scroll: false,
        },
      )
      // trim and remove subsequent spaces (`this   that` => `this that`)
      return newQuery.replace(/\s+/g, ' ').trim()
    })
  }

  const isSearching = query.length > 0

  const posts = matchingPosts.slice(0, indexToShow)

  const hasMorePosts = isSearching
    ? indexToShow < matchingPosts.length
    : indexToShow < matchingPosts.length

  const visibleCategories = isSearching
    ? new Set(
        matchingPosts
          .flatMap(post => {
            return post.categories
          })
          .filter(Boolean),
      )
    : new Set(data.categories)

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
          content="Scopri le realizzazioni di Matarrese srl per bar, ristoranti, hotel, macellerie e altri locali: cucine professionali, arredi su misura e soluzioni complete."
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
        <PageHero
          title="Realizzazioni per bar, ristoranti, hotel e attività professionali"
          intro="Da oltre quarant’anni progettiamo cucine professionali, arredi su misura, attrezzature per l’ho.re.ca. e soluzioni complete per locali commerciali, macellerie, pasticcerie, hotel e spazi dedicati alla ristorazione."
        />

        <section
          className="bg-white text-ghisa"
          data-header="light"
          aria-label="Archivio delle realizzazioni"
        >
          <div className="site-shell pb-24 pt-16 lg:pb-32 lg:pt-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <ChipCategorie
                  label="Filtra per settore"
                  categories={data.categories}
                  isSelected={category =>
                    regularQuery.toLowerCase().includes(category.toLowerCase())
                  }
                  isDisabled={category =>
                    !visibleCategories.has(category) &&
                    !regularQuery.toLowerCase().includes(category.toLowerCase())
                  }
                  onToggle={toggleCategory}
                />
              </div>
              <div className="lg:col-span-5">
                <CampoRicerca
                  ref={searchInputRef}
                  label="Cerca tra le realizzazioni"
                  value={queryValue}
                  isSearching={isSearching}
                  count={matchingPosts.length}
                  buttonProps={{
                    onClick: () => {
                      setQuery('')
                      ignoreInputKeyUp.current = true
                      searchInputRef.current?.focus()
                    },
                    onKeyDown: () => {
                      ignoreInputKeyUp.current = true
                    },
                    onKeyUp: () => {
                      ignoreInputKeyUp.current = false
                    },
                  }}
                  onChange={event => {
                    return setQuery(
                      event.currentTarget.value.toLocaleLowerCase(),
                    )
                  }}
                  onKeyUp={e => {
                    if (!ignoreInputKeyUp.current && e.key === 'Enter') {
                      resultsRef.current
                        ?.querySelector('a')
                        ?.focus({preventScroll: true})
                      resultsRef.current?.scrollIntoView({
                        behavior: 'smooth',
                      })
                      fbq.event('Search', {
                        content_category: 'realizzazioni',
                        search_string: query,
                      })
                      router.push(
                        {
                          query: {q: e.target.value.toLocaleLowerCase()},
                        },
                        '',
                        {scroll: false},
                      )
                    }
                    ignoreInputKeyUp.current = false
                  }}
                />
              </div>
            </div>

            <div ref={resultsRef} className="mt-16 scroll-mt-28 lg:mt-24">
              {posts.length === 0 ? (
                <p className="type-display max-w-[24ch] py-16 text-[clamp(24px,2.6vw,36px)]">
                  Purtroppo non è stato trovato nulla con i tuoi criteri di
                  ricerca
                </p>
              ) : (
                <GrigliaEditoriale
                  items={posts}
                  render={(project, aspect) => (
                    <CardEditoriale
                      as="h2"
                      href={`/realizzazioni/${project.slug}`}
                      image={{
                        src: project.featuredImage?.node?.mediaItemUrl,
                        alt: project.featuredImage?.node?.altText,
                      }}
                      title={project.title}
                      meta={project.categories?.join(' · ')}
                      cta="Guarda il progetto"
                      aspect={aspect}
                    />
                  )}
                />
              )}
            </div>

            {hasMorePosts ? (
              <CaricaAltri
                shown={posts.length}
                total={matchingPosts.length}
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
  const tags = data.tags.filter(tags => tags.count > 0).map(t => t.name)

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
