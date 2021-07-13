import Head from "next/head";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import CardPost from "../../components/Card/CardPost";

import { getAllPosts, getPaginatedPosts } from "../../lib/api";
import clsx from "clsx";

export default function Blog({ posts: { edges, pageInfo }, loading }) {
  const { hasNextPage, hasPreviousPage, startCursor, endCursor } = pageInfo;

  if (!edges || loading) return <div>Loading...</div>;
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

            <section className="text-gray-600 body-font">
              <div className="container py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {edges.map(({ node }) => {
                    return (
                      <div key={node.title} className="p-4 md:w-1/3">
                        <CardPost
                          slug={node.slug}
                          title={node.title}
                          coverImage={node.featuredImage?.node}
                          date={node.date}
                          excerpt={node.excerpt}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <div className="flex justify-between w-5/12 pb-24 m-auto">
              <button
                className="disabled:opacity-25 disabled:pointer-events-none"
                disabled={!hasPreviousPage}
              >
                Precedenti
              </button>
              <button
                className="disabled:opacity-25 disabled:pointer-events-none"
                disabled={!hasNextPage}
              >Successivi</button>
            </div>
          </Container>
        </div>
      </Layout>
    </div>
  );
}

const { first, last, after, before } = {
  first: 9,
  last: null,
  after: null,
  before: null,
};

export async function getStaticProps() {
  const { posts, loading } = await getPaginatedPosts(
    first,
    last,
    after,
    before
  );
  console.log(posts);
  return {
    props: {
      posts,
      loading,
    },
    revalidate: 1,
  };
}
