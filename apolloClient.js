// import { ApolloClient, InMemoryCache } from '@apollo/client'

// const API_URL =
//   process.env.NODE_ENV === 'production'
//     ? process.env.WP_API_URL
//     : process.env.WP_API_URL_LOCAL

// const client = new ApolloClient({
//   uri: API_URL,
//   // uri: process.env.WP_API_URL,
//   // uri: process.env.WP_API_URL_LOCAL,
//   cache: new InMemoryCache(),
// })

// export default client

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.WP_API_URL
    : process.env.WP_API_URL_LOCAL

console.log(API_URL)

const client = new ApolloClient({
  ssr: true,
  link: new HttpLink({
    uri: API_URL,
    credentials: 'same-origin',
    fetch
  }),
  cache: new InMemoryCache(),
})

export default client


