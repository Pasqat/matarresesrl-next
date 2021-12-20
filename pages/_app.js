import '../styles/globals.css'
import '../styles/index.css'
import {ApolloProvider} from '@apollo/client'

import ScrollToTop from '../components/ScrollToTop'

import client from '../lib/apolloClient'

function MyApp({Component, pageProps}) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <ScrollToTop />
    </ApolloProvider>
  )
}

export default MyApp
