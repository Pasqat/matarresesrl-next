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
        <h1 className="text-4xl font-normal leading-normal py-12 mt-0 mb-2 text-yellow-500 align-middle text-center">
          Ultimi Aggiornamenti
        </h1>
        <hr />

        <section className="pb-20 ">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {edges.map(({ node }) => {
                return (
                  <div
                    key={node.title}
                    className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"
                  >
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-8 flex-auto">
                        <div className="text-white text-center inline-flex items-center justify-center mb-5 shadow-lg">
                          <figure>
                            <img
                              src={
                                node.featuredImage?.node.mediaDetails.sizes[1]
                                  .sourceUrl
                              }
                              alt={node.title}
                              className="rounded max-w-full h-auto align-middle border-none"
                            />
                          </figure>
                        </div>
                        <h3 className="text-xl font-semibold mb-5">
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
