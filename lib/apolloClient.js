import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  ssr: true,
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WP_API_URL,
    credentials: 'same-origin',
    fetch,
  }),
  cache: new InMemoryCache(),
})

export default client
