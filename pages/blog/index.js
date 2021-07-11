import Head from "next/head";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import CardPost from "../../components/Card/CardPost";

import { getAllPosts } from "../../lib/api";

export default function Blog({ allPosts: { edges } }) {
  if (!edges) return <div>Loading...</div>;
  return (
    <div>
      <Head>
        <title>Blog articles page</title>
        <link rel="icon" href="/favicon.ico" />
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
          </Container>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts(9);
  return {
    props: {
      allPosts,
    },
    revalidate: 1,
  };
}
