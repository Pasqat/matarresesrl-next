import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { getAllPostsWithSlug, getPost } from '../../lib/api'
import Navbar from '../../components/Navbars/Navbar'

export default function Post({ postData }) {
  const router = useRouter()

  // FIXME: find why in build time postData is not passed
  if (!router.isFallback && !postData.slug) {
    return <p>hmm...sembra ci sia un errore</p>
  }

  const formatDate = (date) => {
    const newDate = new Date(date)

    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`
  }

  return (
    <div>
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
                className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl prose-yellow"
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
  )
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug)
  return {
    props: {
      postData: data?.post,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths:
      allPosts?.edges.map(({ node }) => ({ params: { slug: node.slug } })) ||
      [],
    fallback: true,
  }
}
