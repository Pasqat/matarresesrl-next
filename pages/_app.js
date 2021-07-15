import "../styles/globals.css";
import "../styles/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ApolloProvider } from "@apollo/client";

import client from "../lib/apolloClient";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
