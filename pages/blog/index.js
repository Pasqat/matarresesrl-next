import Head from 'next/head'
import Link from 'next/link'

import { getAllPosts } from '../../lib/api'
import Navbar from '../../components/Navbars/Navbar'

export default function Blog({ allPosts: { edges } }) {
  return (
    <div>
      <Head>
        <title>Blog articles page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        <h1 className="py-12 mt-0 mb-2 text-4xl font-normal leading-normal text-center text-yellow-500 align-middle">
          Ultimi Aggiornamenti
        </h1>
        <hr />

        <section className="pb-20 ">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap">
              {edges.map(({ node }) => {
                return (
                  <div
                    key={node.title}
                    className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12"
                  >
                    <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                      <div className="flex-auto px-4 py-8">
                        <div className="inline-flex items-center justify-center mb-5 text-center text-white shadow-lg">
                          <figure>
                            <img
                              src={
                                node.featuredImage?.node.mediaDetails.sizes[1]
                                  .sourceUrl
                              }
                              alt={node.title}
                              className="h-auto max-w-full align-middle border-none rounded"
                            />
                          </figure>
                        </div>
                        <h3 className="mb-5 text-xl font-semibold">
                          {node.title}
                        </h3>
                        <div>
                          <Link href={`/blog/${node.slug}`}>
                            <a>Continua a leggere</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const allPosts = await getAllPosts()
  return {
    props: {
      allPosts,
    },
    revalidate: 1,
  }
}
