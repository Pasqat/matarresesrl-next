import * as React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

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
import {formatDate} from '../../actions/utils/formatDate'
import {getAllPosts} from '../../lib/query/post'

const PAGE_SIZE = 12
const initialIndexToShow = PAGE_SIZE

// this really is not needed, or maybe only the part `(\s|$)?
const specialQueryRegex = /(?<not>!)?leader:(?<team>\w+)(\s|$)?/g

export default function News({data}) {
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
  // /news?q=… va sincronizzato qui. I redirect di next.config.js passano slug
  // (es. attrezzatura-professionale): i trattini diventano spazi.
  const {isReady} = router
  React.useEffect(() => {
    if (isReady && searchParams) setQuery(searchParams.replace(/-/g, ' '))
  }, [isReady, searchParams])

  const query = queryValue.trim()

  const {posts: allPosts} = data

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
  const featured = data.posts?.[0]

  const posts = isSearching
    ? matchingPosts.slice(0, indexToShow)
    : matchingPosts
        .filter(p => p.slug !== data?.posts[0].slug)
        .slice(0, indexToShow)

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
          News e approfondimenti su ristorazione, cucina e attrezzature horeca
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/news/`}
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="News su innovazioni in cucina, attrezzature professionali, tecnologie per ristorazione e aggiornamenti sul mondo horeca."
        />
        <meta property="og:title" content="News Matarrese srl" />
        <meta
          property="og:description"
          content="Approfondimenti sul mondo della ristorazione, delle cucine professionali e delle soluzioni per il settore horeca."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/news_og.webp`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/news`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Layout navbarTransparent>
        <PageHero
          // trattino morbido: a 375px "approfondimenti" non entra nella riga
          title={
            'News e approfondi\u00ADmenti sulla ristorazione professionale'
          }
        />

        <section
          className="bg-white text-ghisa"
          data-header="light"
          aria-label="Archivio degli articoli"
        >
          <div className="site-shell pb-24 pt-16 lg:pb-32 lg:pt-20">
            {!isSearching && featured ? (
              <Link
                href={`/news/${featured.slug}`}
                className="group mb-20 grid gap-8 border-b border-ghisa/15 pb-20 lg:mb-24 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-24"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-inox lg:col-span-7 lg:aspect-[3/2]">
                  {featured.featuredImage?.node?.mediaItemUrl && (
                    <Image
                      src={featured.featuredImage.node.mediaItemUrl}
                      alt={featured.featuredImage.node.altText || ''}
                      fill
                      preload
                      fetchPriority="high"
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  )}
                </div>
                <div className="lg:col-span-5">
                  <p className="text-sm text-acciaio">
                    {[featured.categories?.[0], formatDate(featured.date)]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <h2
                    className="type-display mt-3 text-[clamp(28px,3vw,44px)] transition-colors group-hover:text-fiamma-testo"
                    dangerouslySetInnerHTML={{__html: featured.title}}
                  />
                  {featured.excerpt && (
                    <div
                      className="mt-5 line-clamp-4 max-w-[52ch] text-acciaio"
                      dangerouslySetInnerHTML={{__html: featured.excerpt}}
                    />
                  )}
                  <span className="mt-8 inline-block border-b border-ghisa py-2 transition-colors group-hover:text-fiamma-testo">
                    Leggi l’articolo
                  </span>
                </div>
              </Link>
            ) : null}

            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <ChipCategorie
                  label="Filtra per categoria"
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
                  label="Cerca tra gli articoli"
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
                    return setQuery(event.currentTarget.value.toLowerCase())
                  }}
                  onKeyUp={e => {
                    if (!ignoreInputKeyUp.current && e.key === 'Enter') {
                      resultsRef.current
                        ?.querySelector('a')
                        ?.focus({preventScroll: true})
                      resultsRef.current?.scrollIntoView({
                        behavior: 'smooth',
                      })

                      router.push(
                        {
                          query: {q: e.target.value.toLocaleLowerCase()},
                        },
                        '',
                        {scroll: false},
                      )
                      fbq.event('Search', {
                        content_category: 'news',
                        search_string: query,
                      })
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
                  render={(article, aspect) => (
                    <CardEditoriale
                      href={`/news/${article.slug}`}
                      image={{
                        src: article.featuredImage?.node?.mediaItemUrl,
                        alt: article.featuredImage?.node?.altText,
                      }}
                      title={article.title}
                      meta={[article.categories?.[0], formatDate(article.date)]
                        .filter(Boolean)
                        .join(' · ')}
                      cta="Leggi l’articolo"
                      aspect={aspect}
                    />
                  )}
                />
              )}
            </div>

            {hasMorePosts ? (
              <CaricaAltri
                shown={posts.length + (isSearching || !featured ? 0 : 1)}
                total={matchingPosts.length}
                onClick={() => setIndexToShow(i => i + PAGE_SIZE)}
              >
                Mostra altri articoli
              </CaricaAltri>
            ) : null}
          </div>
        </section>
      </Layout>
    </div>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getAllPosts(preview)
  const categories = data.categories
    .filter(category => category.count > 0)
    .map(c => c.name)
  const tags = data.tags.filter(tags => tags.count > 0).map(t => t.name)

  return {
    props: {
      data: {
        categories,
        tags,
        posts: data.posts.map(item => ({
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
      },
      preview,
    },
    revalidate: 60 * 60 * 24,
  }
}
