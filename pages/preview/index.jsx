import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/Layout'
import PostBody from '../../components/News/post-body'
import Categories from '../../components/News/post-categories'
import Date from '../../components/Date'
import fetchJson from '../../lib/fetchJson'
import {withSessionSsr} from '../../lib/session'

export default function Post({postData, preview}) {
  const cover = postData?.featuredImage?.node?.mediaItemUrl
  return (
    <Layout preview={preview}>
      <Head>
        <title>{postData?.title || 'Anteprima'} | Matarrese srl</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <article className="site-shell detail-shell">
        <header className="detail-intro">
          <p className="page-intro">Anteprima riservata</p>
          <h1 dangerouslySetInnerHTML={{__html: postData.title}} />
          <div className="detail-meta">
            <Categories categories={postData.categories} />
            <Date dateString={postData.date} />
          </div>
        </header>
        {cover && (
          <div className="detail-cover">
            <Image
              src={cover}
              alt={postData.featuredImage.node.altText || postData.title}
              fill
              priority
              sizes="90vw"
            />
          </div>
        )}
        <div className="detail-body">
          <PostBody content={postData.content} />
        </div>
      </article>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({preview = false, previewData, req}) {
    const user = req.session.user
    if (!user) return {redirect: {destination: '/auth/login', permanent: false}}
    if (!previewData?.post?.id) return {notFound: true}

    const query = `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType, asPreview: true) {
        databaseId
        id
        slug
        title
        status
        date
        databaseId
        content
        featuredImage {
          node {
            altText
            sourceUrl(size: THUMBNAIL)
            mediaItemUrl
            mediaDetails {
              sizes {
                sourceUrl
              }
            }
          }
        }
        categories {
          edges{
            node {
              categoryId
              name
              slug
        title
              id
            }
          }
        }
        tags {
          nodes {
            slug
        title
            id
            name
          }
        }
      }
    }
    `
    const variables = {
      id: previewData.post.id,
      idType: 'DATABASE_ID',
    }

    const {data} = await fetchJson(process.env.NEXT_PUBLIC_WP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          user[process.env.ACCESS_TOKEN_INDEX_IN_SERVER_AUTH_JSON_RESPONSE]
        }`,
      },
      body: JSON.stringify({query, variables}),
    })

    if (!data?.post) return {notFound: true}
    return {props: {preview, postData: data.post}}
  },
)
