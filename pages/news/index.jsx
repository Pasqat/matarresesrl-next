import * as React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/dist/client/router'
import clsx from 'clsx'

import * as fbq from '../../lib/fpixel'
import {getGroups} from '../../lib/newsletter'

import Layout from '../../components/Layout'
import {SearchIcon} from '../../components/icons/search-icon'
import {Grid} from '../../components/grid'
import {H5, H3} from '../../components/typography'
import {Category} from '../../components/category'
import {FeaturedSection} from '../../components/sections/featured-section'
import {ArticleCard} from '../../components/article-card'
import {PlusIcon} from '../../components/icons/plus-icon'
import {Button} from '../../components/button'
import NewsletterForm from '../../components/Form/NewsletterForm'

import {filterPosts} from '../../actions/utils/blog'
import {formatDate} from '../../actions/utils/formatDate'
import {getAllPosts} from '../../lib/query/post'
import {getPlaiceholder} from 'plaiceholder'
import {Spacer} from '../../components/spacer'

const PAGE_SIZE = 12
const initialIndexToShow = PAGE_SIZE

// this really is not needed, or maybe only the part `(\s|$)?
const specialQueryRegex = /(?<not>!)?leader:(?<team>\w+)(\s|$)?/g

export default function News({data, groups}) {
  const router = useRouter()

  const searchParams =
    typeof router.query.q === Array ? router.query.q.join('+') : router.query.q
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

  // This is a failed try to have the search when landing with a query
  // e.g. expamle.com/news?q=eventi
  // React.useLayoutEffect(() => {
  //   console.log(router.query.q)
  //   router.query.q ? setQuery(router.query.q) : ''
  // }, [router.query.q])

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

  const posts = isSearching
    ? matchingPosts.slice(0, indexToShow)
    : matchingPosts
        .filter(p => p.slug !== data?.posts[0].slug)
        .slice(0, indexToShow)

  const hasMorePosts = isSearching
    ? indexToShow < matchingPosts.length
    : indexToShow < matchingPosts.length - 1

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
        <title>Novità e aggiornamenti ho.re.ca.</title>
        <link rel="canonical" href="https://www.matarrese.it/news/" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Aggiornamenti e approfondimenti sulle innovazioni e tecnologie in cucina. Novità sul mondo della ristorazione e sulle aziende pugliesi"
        />
        <meta property="og:title" content="News" />
        <meta
          property="og:description"
          content="Approfondimenti sul mondo della ristorazione, horeca, pasticcerie, gelaterie, pizzerie e tanto altro"
        />
        <meta property="og:url" content="https://www.matarrese.it/news" />
        <meta property="og:type" content="blog" />
      </Head>

      <Layout>
        {!isSearching ? (
          <div className="my-20">
            <FeaturedSection
              subTitle={formatDate(data.posts[0].date)}
              title={data.posts[0].title}
              imageUrl={data.posts[0].featuredImage.node.sourceUrl}
              img={data.img}
              svg={data.svg}
              impageAlt={data.posts[0].featuredImage.node.altText}
              caption="In evidenza"
              cta="Leggi tutto"
              slug={`news/${data.posts[0].slug}`}
              permalink={`${data.domain}/news/${data.posts[0].slug}`}
            />
          </div>
        ) : null}

        <Grid className="my-14">
          {data.categories && data.categories.length > 0 ? (
            <>
              <H5 as="div" className="col-span-full mb-6">
                Filtra per categoria
              </H5>
              <div className="col-span-full -mr-4 -mb-4 flex flex-wrap lg:col-span-10">
                {data.categories.map(category => {
                  const selected = regularQuery.includes(category)

                  return (
                    <Category
                      key={category}
                      category={category}
                      selected={selected}
                      onClick={() => toggleCategory(category)}
                      disabled={!visibleCategories.has(category) && !selected}
                    />
                  )
                })}
              </div>
            </>
          ) : null}
        </Grid>

        <div className="mx-auto mb-14 max-w-7xl">
          <form
            // this two are for Remix
            // action="/news" // what is this for?
            // method="GET" // what is this for?
            onSubmit={e => e.preventDefault()} //here I can call something like fetchMore?
          >
            <div className="relative">
              <button
                title={query === '' ? 'Cerca' : 'Pulisci ricerca'}
                type="button"
                onClick={() => {
                  setQuery('')
                  ignoreInputKeyUp.current = true
                  searchInputRef.current?.focus()
                }}
                onKeyDown={() => {
                  ignoreInputKeyUp.current = true
                }}
                onKeyUp={() => {
                  ignoreInputKeyUp.current = false
                }}
                className={clsx(
                  'absolute top-0 left-6 flex h-full items-center justify-center border-none bg-trasparent p-0 text-gray-500',
                  {
                    'cursor-pointer': query !== '',
                    'cursor-default': query === '',
                  },
                )}
              >
                <SearchIcon />
              </button>
              <input
                ref={searchInputRef}
                type="search"
                value={queryValue}
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
                name="q"
                placeholder="cerca"
                className="text-primary bg-primary border-secondary focus:bg-secondary w-full rounded-full border py-6 pr-6 pl-14 text-lg font-medium hover:border-yellow-500 focus:border-yellow-500 focus:outline-none md:pr-24"
              />
              <div className="absolute top-0 right-6 hidden h-full w-14 items-center justify-between text-lg font-medium text-gray-500 md:flex">
                {isSearching ? matchingPosts.length : null}
              </div>
            </div>
          </form>
        </div>

        <Grid className="mb-12 lg:mb-24 xl:mb-48" ref={resultsRef}>
          {posts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center">
              <H3 as="p" variant="secondary" className="mt-24 max-w-lg">
                {`Purtroppo non è stato trovato nulla con i tuoi criteri di ricerca`}
              </H3>
              <Spacer size="base" />
              <NewsletterForm
                nested
                groups={groups}
                title="Iscriviti alla nostra newsletter per rimanere aggiornato sulle ultime novità."
              />
            </div>
          ) : (
            posts.map(article => (
              <div key={article.slug} className="col-span-4 mb-10">
                <ArticleCard article={article} domain={data.domain} />
              </div>
            ))
          )}
        </Grid>

        {hasMorePosts ? (
          <div className="mb-24 flex w-full justify-center lg:mb-48 xl:mb-64">
            <Button
              variant="secondary"
              onClick={() => setIndexToShow(i => i + PAGE_SIZE)}
              size="medium"
            >
              <span>Mostra altri articoli</span> <PlusIcon />
            </Button>
          </div>
        ) : null}
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
  const groups = await getGroups()

  const {img, svg} = await getPlaiceholder(
    data.posts[0].featuredImage.node.sourceUrl,
    {size: 64},
  )

  const domain = process.env.NEXT_PUBLIC_DOMAIN

  return {
    props: {
      data: {
        categories,
        tags,
        posts: data.posts,
        img,
        svg,
        domain,
      },
      preview,
      groups,
    },
    revalidate: 60 * 60 * 24,
  }
}
