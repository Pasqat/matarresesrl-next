import Head from "next/head";
import { useQuery, gql } from "@apollo/client";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import NewsList from "../../components/News/NewsList";
import CategoriesList from "../../components/categories-list/CategoriesList"
import { useEffect, useState } from "react";

const BATCH_SIZE = 10;

const GET_PAGINATED_POSTS = gql`
  query GET_PAGINATED_POSTS(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $categoryId: Int
  ) {
    posts(first: $first,
          last: $last
          after: $after
          before: $before
          where: {categoryId: $categoryId}) {
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
  categories {
    nodes {
      categoryId
      name
      slug
      id
      count
    }
  }
  }
`;

export default function News() {
  const [category, setCategory] = useState(null)

  const { data, loading, error, fetchMore } = useQuery(GET_PAGINATED_POSTS, {
    variables: { first: BATCH_SIZE, last: null, after: null, before: null, categoryId: category },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    fetchMore({
      variables: {
        first: BATCH_SIZE,
        after: null,
        last: null,
        before: null,
        categoryId: null
      },
    });
  }, [])

  function selectCategory(categoryId) {
    setCategory(categoryId)
  }

  const categeriesList = data?.categories.nodes.filter(category => category.count > 0)


  return (
    <div>
      <Head>
        <title>News | Matarrese srl</title>
        <link rel="canonical" href="https://www.matarrese.it/news/" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="description"
          content="Approfondimenti sul mondo della ristorazione, horeca, pasticcerie, gelaterie, pizzerie e tanto altro"
        />
        <meta property="og:title" content="News" />
        <meta
          property="og:description"
          content="Approfondimenti sul mondo della ristorazione, horeca, pasticcerie, gelaterie, pizzerie e tanto altro"
        />
        <meta property="og:url" content="https://www.matarrese.it/news" />
        <meta property="og:type" content="blog" />
      </Head>

      <Layout>
        <div className="bg-gray-100">
          <Container>
            <Header>Ultimi Aggiornamenti</Header>
            <CategoriesList categories={categeriesList} onClick={selectCategory} currentCategory={category} />
            <hr />
            <NewsList
              error={error}
              loading={loading}
              posts={data?.posts}
              fetchMore={fetchMore}
              batchSize={BATCH_SIZE}
            />
          </Container>
        </div>
      </Layout>
    </div>
  );
}
