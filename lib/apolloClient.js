import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client'

// L'hosting condiviso di WordPress chiude connessioni o risponde 508 sotto carico (build SSG):
// un singolo errore transitorio non deve far fallire tutta la build.
const RETRY_STATUS = new Set([429, 502, 503, 504, 508])
const DELAYS = [1000, 3000, 7000]

export async function fetchWithRetry(url, options) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, options)
      if (!RETRY_STATUS.has(res.status) || attempt === DELAYS.length) return res
    } catch (err) {
      if (attempt === DELAYS.length) throw err
    }
    await new Promise(r => setTimeout(r, DELAYS[attempt]))
  }
}

const client = new ApolloClient({
  ssr: true,
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WP_API_URL,
    credentials: 'same-origin',
    fetch: fetchWithRetry,
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Project: {
        fields: {
          // WordPress connections can come as edges/nodes; disable key args and allow simple merging
          portfolioTags: { keyArgs: false, merge: true },
          portfolioCategories: { keyArgs: false, merge: true },
        },
      },
      Post: {
        fields: {
          categories: { keyArgs: false, merge: true },
        },
      },
    },
  }),
})

export default client
