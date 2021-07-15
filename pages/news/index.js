import Head from "next/head";
import { useQuery, gql } from "@apollo/client";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import NewsList from "../../components/News/NewsList";

const BATCH_SIZE = 9;

const GET_PAGINATED_POSTS = gql`
  query GET_PAGINATED_POSTS(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    posts(first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          excerpt
          slug
          date
          id
          featuredImage {
            node {
              sourceUrl
              mediaItemUrl
              mediaDetails {
                sizes {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;


export default function News() {
  const { data, loading, error, fetchMore } = useQuery(GET_PAGINATED_POSTS, {
    variables: { first: BATCH_SIZE, last: null, after: null, before: null },
    notifyOnNetworkStatusChange: true,
  });


   return (
    <div>
      <Head>
        <title>Blog articles page</title>
      </Head>

      <Layout>
        <div className="pt-10 bg-gray-100">
          <Container>
            <Header>Ultimi Aggiornamenti</Header>
            <hr />
            <NewsList
              error={error}
              loading={loading}
              data={data}
              fetchMore={fetchMore}
              batchSize={BATCH_SIZE}
            />
          </Container>
        </div>
      </Layout>
    </div>
  );
}
