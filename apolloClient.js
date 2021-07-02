import { ApolloClient, InMemoryCache } from '@apollo/client'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.WP_API_URL
    : process.env.WP_API_URL_LOCAL

const client = new ApolloClient({
  // uri: API_URL,
  uri: 'http://localhost/matarrese/graphql',
  cache: new InMemoryCache(),
})

export default client
