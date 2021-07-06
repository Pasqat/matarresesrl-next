import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { getAllPostsWithSlug, getPost } from '../../lib/api'
import Navbar from '../../components/Navbars/Navbar'

import { formatDate } from '../../actions/utils/formatDate'

export default function Post({ postData }) {
  const router = useRouter()

  if (!router.isFallback && !postData.slug) {
    console.log('sdeng 💣️')
    return <p>hmm...sembra ci sia un errore</p>
  }

  return (
    <>
      <Head>
        {router.isFallback ? (
          // NOTE: check isFallback is extremly important!!!
          // https://michaelfulton.co/posts/export-encountered-errors
          <title>Matarrese srl</title>
        ) : (
          <title>{postData.title}</title>
        )}
      </Head>
      <Navbar />
      <div className="container">
        <main>
          {router.isFallback ? (
            <h2>Loading...</h2>
          ) : (
            <>
              <img
                style={{ maxWidth: '80vw' }}
                src={postData.featuredImage?.node.sourceUrl}
                alt={postData.title}
              />
              <article>
                <div>
                  <h1>{postData.title}</h1>
                  <p>pubblicato il {formatDate(postData.date)}</p>
                </div>
                <div
                  className="prose-sm prose sm:prose lg:prose-lg xl:prose-xl prose-yellow"
                  dangerouslySetInnerHTML={{ __html: postData.content }}
                />
              </article>
            </>
          )}
          <p>
            <Link href="/blog">
              <a>torna agli articoli</a>
            </Link>
          </p>
        </main>
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug)
  return {
    props: {
      postData: data.post,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true,
  }
}
