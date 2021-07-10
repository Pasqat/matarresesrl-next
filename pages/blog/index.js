import Head from "next/head";
import Link from "next/link";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Header from "../../components/Header/Header"

import { getAllPosts } from "../../lib/api";
import { formatDate } from "../../actions/utils/formatDate";

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
          <Header>
              Ultimi Aggiornamenti
          </Header>
            <hr />

            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {edges.map(({ node }) => {
                    return (
                      <div key={node.title} className="p-4 md:w-1/3">
                        <div className="h-full overflow-hidden bg-white border-2 border-gray-200 rounded-lg border-opacity-60">
                          <img
                            src={
                              node.featuredImage?.node.sourceUrl
                              // node.featuredImage?.node.mediaDetails.sizes[1]
                              //   .sourceUrl
                            }
                            alt={node.title}
                            className={
                              !node.featuredImage?.node.sourceUrl
                                ? "hidden"
                                : "object-cover object-center w-full lg:h-48 md:h-36"
                            }
                          />
                          <div className="flex flex-col justify-between p-6">
                            <div>
                              <h3 className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">
                                {formatDate(node.date)}
                              </h3>
                              <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                                {node.title}
                              </h2>
                              <p
                                className="mb-3 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    node.excerpt.length > 160
                                      ? node.excerpt.substr(0, 160) + "..."
                                      : node.excerpt,
                                }}
                              >
                                {/* {node.excerpt.length > 80
                              ? node.excerpt.substr(0, 80) + '...'
                              : node.excerpt} */}
                              </p>
                              <div className="flex flex-wrap items-center">
                                <Link href={`/blog/${node.slug}`}>
                                  <a className="inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0">
                                    Continua a leggere
                                    <svg
                                      className="w-4 h-4 ml-2"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      fill="none"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M5 12h14"></path>
                                      <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
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
