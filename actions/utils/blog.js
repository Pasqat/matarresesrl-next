import {matchSorter, rankings as matchSorterRankings} from 'match-sorter'
import {VALID_LOADERS} from 'next/dist/server/image-config'

function filterPosts(posts, searchString) {
  if (!searchString) return posts

  const options = {
    keys: [
      {
        key: 'title',
        threshold: matchSorterRankings.CONTAINS,
      },
      {
        key: 'categories',
        threshold: matchSorterRankings.CONTAINS,
        maxRanking: matchSorterRankings.CONTAINS,
      },
      {
        key: 'meta.keywords',
        threshold: matchSorterRankings.CONTAINS,
        maxRanking: matchSorterRankings.CONTAINS,
      },
      {
        key: 'excerpt',
        threshold: matchSorterRankings.CONTAINS,
        maxRanking: matchSorterRankings.CONTAINS,
      },
      {
        key: 'tags',
        threshold: matchSorterRankings.CONTAINS,
        maxRanking: matchSorterRankings.CONTAINS,
      },
    ],
  }

  const allResults = matchSorter(posts, searchString, options)

  const searches = new Set(searchString.split(' '))
  if (searches.size < 2) {
    // if there's only one word then we're done
    return allResults
  }

  // if there are multiple words, we'll conduct an individual search for each word
  const [firstWord, ...restWords] = searches.values()
  if (!firstWord) {
    // this should be impossible, but just in case
    return []
  }
  const individualWordOptions = {
    ...options,
    keys: options.keys.map(key => {
      return {
        ...key,
        maxRanking: matchSorterRankings.CASE_SENSITIVE_EQUAL,
        threshold: matchSorterRankings.WORD_STARTS_WITH,
      }
    }),
  }

  // go through each word and further filter the results
  let individualWordResults = matchSorter(
    posts,
    firstWord,
    individualWordOptions,
  )

  for (const word of restWords) {
    const searchResult = matchSorter(
      individualWordResults,
      word,
      individualWordOptions,
    )
    individualWordResults = individualWordResults.filter(r =>
      searchResult.includes(r),
    )
  }
  return Array.from(new Set([...allResults, ...individualWordResults]))
}

export {filterPosts}
