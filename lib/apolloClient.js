import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  ssr: true,
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WP_API_URL,
    credentials: 'same-origin',
    fetch,
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
