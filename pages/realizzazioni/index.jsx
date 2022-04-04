import * as React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import clsx from 'clsx'
import {getPlaiceholder} from 'plaiceholder'
import {PlusIcon, SearchIcon} from '@heroicons/react/outline'

import Layout from '../../components/Layout'

import {filterPosts} from '../../actions/utils/blog'
import {getProjects} from '../../lib/query/project'
import {Category} from '../../components/category'
import {Grid} from '../../components/grid'
import {H5, H3} from '../../components/typography'
import {ArticleCard} from '../../components/article-card'
import {Button} from '../../components/button'

const PAGE_SIZE = 12
const initialIndexToShow = PAGE_SIZE

// this really is not needed, or maybe only the part `(\s|$)?
const specialQueryRegex = /(?<not>!)?leader:(?<team>\w+)(\s|$)?/g

export default function Realizzazioni({data}) {
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
        <title>Progettazione spazi e cucine</title>
        <link rel="canonical" href="https://www.matarrese.it/realizzazioni/" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Allestimento bar, ristoranti e gastronomia. Arredamento su misura, progettazione tecnica, supporto e manutenzione attrezzature per ristorazione."
        />
        <meta property="og:title" content="News" />
        <meta
          property="og:description"
          content="Alcune delle nostre realizzazioni"
        />
        <meta
          property="og:url"
          content="https://www.matarrese.it/realizzazioni"
        />
        <meta property="og:type" content="blog" />
      </Head>

      <Layout>
        <Grid className="my-14">
          {data.categories && data.categories.length > 0 ? (
            <>
              <H5 as="div" className="col-span-full mb-6">
                Filtra per settore
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
          <form onSubmit={e => e.preventDefault()}>
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
                  return setQuery(event.currentTarget.value.toLocaleLowerCase())
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

        <Grid className="mb-14 lg:mb-24" ref={resultsRef}>
          {posts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center">
              {/* // TODO: add a beautiful placeholder img */}
              <H3 as="p" variant="secondary" className="mt-24 max-w-lg">
                {`Purtroppo non è stato trovato nulla con i tuoi criteri di ricerca`}
              </H3>
            </div>
          ) : (
            posts.map(article => (
              <div key={article.slug} className="col-span-4 mb-10">
                <ArticleCard isProject article={article} domain={data.domain} />
              </div>
            ))
          )}
        </Grid>

        {hasMorePosts ? (
          <div className="mb-64 flex w-full justify-center">
            <Button
              variant="secondary"
              onClick={() => setIndexToShow(i => i + PAGE_SIZE)}
              size="medium"
            >
              <span>Mostra altri realizzazioni</span> <PlusIcon />
            </Button>
          </div>
        ) : null}
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

  // const {img, svg} = await getPlaiceholder(
  //   data.projects[0].featuredImage.node.sourceUrl,
  //   {size: 64},
  // )

  const domain = process.env.NEXT_PUBLIC_WP_API_URL

  console.log('data -> ', data)
  console.log('---'.repeat(4))
  console.log('categories -> ', categories)
  console.log('---'.repeat(4))
  console.log('domain -> ', domain)
  console.log('---'.repeat(4))

  return {
    props: {
      data: {
        tags,
        categories,
        projects: data.projects,
        // img,
        // svg,
        domain,
      },
    },
    revalidate: 60 * 60 * 24,
  }
}
