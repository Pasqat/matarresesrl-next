import Head from "next/head";
import { useQuery, gql } from "@apollo/client";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import NewsList from "../../components/News/NewsList";
import CategoriesList from "../../components/categories-list/CategoriesList";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BATCH_SIZE = 10;

const GET_PAGINATED_POSTS = gql`
  query GET_PAGINATED_POSTS(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) 
  # NOTE: can't find a way to filter by category
  # $portfolioCategoryId: Int
  {
    projects(
      first: $first
      last: $last
      after: $after
      before: $before # where: {portfolioCategoryId: $portfolioCategoryId}
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          slug
          projectId
          id
          featuredImage {
            node {
              sourceUrl(size: MEDIUM_LARGE)
            }
          }
          excerpt
          date
        }
      }
    }
    # portfolioCategories {
    #    nodes {
    #      slug
    #      name
    #      id
    #      databaseId
    #      portfolioCategoryId
    #    }
    #  }
  }
`;

export default function News() {
  // const [category, setCategory] = useState(null)

  const { data, loading, error, fetchMore } = useQuery(GET_PAGINATED_POSTS, {
    variables: {
      first: BATCH_SIZE,
      last: null,
      after: null,
      before: null,
      // portfolioCategoryId: category,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    fetchMore({
      variables: {
        first: BATCH_SIZE,
        after: null,
        last: null,
        before: null,
        // categoryId: null
      },
    });
  }, []);

  //   function selectCategory(categoryId) {
  //     setCategory(categoryId)
  //   }

  //   const categeriesList = data?.categories.nodes.filter(category => category.count > 0)

  return (
    <div>
      <Head>
        <title>Realizzazioni | Matarrese srl</title>
        <link rel="canonical" href="https://www.matarrese.it/realizzazioni/" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="description" content="Alcune delle nostre realizzazioni" />
        <meta property="og:title" content="News" />
        <meta
          property="og:description"
          content="Alcune delle nostre realizzazioni"
        />
        <meta
          property="og:url"
          content="https://www.matarrese.it/realizzazioni"
        />
        <meta property="og:type" content="blog" />
      </Head>

      <Layout>
        <div className="bg-gray-100">
          <Container>
            <Header>Alcune delle nostre realizzazioni</Header>
            {/* <CategoriesList categories={categeriesList} onClick={selectCategory} currentCategory={category} /> */}
            <hr />
            <div className="grid grid-cols-3 grid-rows-3">
              {data?.projects?.edges.map(edge => {
                const {
                  date,
                  excerpt, 
                  featuredImage, 
                  id, 
                  projectId,
                  slug,
                  title
                } = edge.node

                return (
                  <Link href={`/realizzazioni/${slug}`}>
                    <a className="group">
                      <div className="relative w-full h-full bg-blend-multiply bg-green-600">
                        <Image objectFit="cover" width="800" height="800" src={featuredImage?.node?.sourceUrl}/>
                        <div className="absolute top-1/2 left-auto text-2xl group-hover:text-red-700 text-white">{title}</div>
                      </div>
                    </a>
                  </Link>
                )
              })}
            </div>
          </Container>
        </div>
      </Layout>
    </div>
  );
}
