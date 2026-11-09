import client from '../apolloClient'
import {gql} from '@apollo/client'
import ImageFragment from './fragment/image'
import SeoFragment from './fragment/seo'
import CategoriesFragment from './fragment/categories'
import FaqsFragment from './fragment/faqs'
import {
  PANNELLO_URL,
  articoliPannello,
  articoloPannello,
  altriArticoliPannello,
} from '../pannello'

// WPGraphQL restituisce al massimo 100 voci per richiesta (verificato: 100 su 166 articoli),
// quindi gli articoli si scorrono a pagine col cursore; categorie e tag vengono dalla prima.
const ALL_POSTS = gql`
      query AllPosts($after: String) {
        posts(
          first: 100
          after: $after
          where: {orderby: {field: DATE, order: DESC}}
        ) {
          pageInfo {
            hasNextPage
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
                  ...ImageFragment
                }
              }
              categories {
                nodes {
                  ...CategoriesFragment
                }
              }
              tags {
                nodes {
                  slug
                  id
                  name
                }
              }
            }
          }
        }
        categories(first: 9999) {
          nodes {
            ...CategoriesFragment
            count
          }
        }
        tags(first: 9999) {
          nodes {
            databaseId
            name
            slug
            id
            count
          }
        }
      }
      ${ImageFragment}
      ${CategoriesFragment}
    `

export async function getAllPosts() {
  if (PANNELLO_URL) return articoliPannello()
  const pagine = []
  let after = null
  do {
    const {data} = await client.query({query: ALL_POSTS, variables: {after}})
    pagine.push(data)
    after = data?.posts?.pageInfo?.hasNextPage ? data.posts.pageInfo.endCursor : null
  } while (after)
  const [data] = pagine

  const posts = pagine.flatMap(d => d?.posts?.edges ?? []).map(e => ({
    ...e.node,
    categories: e.node.categories.nodes.flatMap(c => c.name),
    tags: e.node.tags.nodes.flatMap(t => t.name),
  }))
  const categories = Array.from(data?.categories?.nodes)
  const tags = Array.from(data?.tags?.nodes)

  return {posts, categories, tags}
}

export async function getPost(slug, preview, previewData) {
  if (PANNELLO_URL) return articoloPannello(slug, preview ? previewData : null)
  const postPreview = preview && previewData?.post

  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  // const isDraft = isSamePost && postPreview?.status === 'draft'
  const isDraft = isSamePost && preview
  const isRevision = isSamePost && postPreview?.status === 'publish'

  const {data} = await client.query({
    query: gql`
    fragment PostFields on Post {
        id
        title
        slug
        excerpt
        date
        modified
        databaseId
        featuredImage {
          node {
             ...ImageFragment
          }
        }
      categories {
        edges {
          node {
         ...CategoriesFragment
          }
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
      # Yoast SEO data
      seo {
         ...SeoFragment
      }
      # FAQs data
      faqs {
        ...Post_FaqsFragment
        }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!, $asPreview: Boolean) {
      post(id: $id, idType: $idType, asPreview: $asPreview) {
        ...PostFields
        content
        ${
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              }
            }
          }
        `
            : ''
        }
      }
    }
    ${ImageFragment}
    ${CategoriesFragment}
    ${SeoFragment}
    ${FaqsFragment}
  `,
    variables: {
      id: isDraft ? postPreview.id : slug,
      idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      asPreview: Boolean(preview),
    },
    //  NOTE: if Miriana is lamenting to no update in the preview look here 👇
    // fetchPolicy: 'no-cache',
  })

  // Articolo inesistente: niente post vuoto ({...null}), così la pagina risponde 404.
  if (!data?.post) return {...data, post: null}

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // 🔽 crea una copia mutabile del post
  const post = {...data.post}

  if (post?.faqs && typeof post.faqs === 'object') {
    const {__typename, fieldGroupName, ...faqFields} = post.faqs

    const faqsArray = Object.values(faqFields)
      .filter(Boolean)
      .filter(faq => {
        const question = faq?.question && String(faq.question).trim()
        const answerText = (faq?.answer && String(faq.answer).trim()) || ''
        return Boolean(question) && Boolean(answerText)
      })
      .map(faq => ({
        question: faq.question,
        answer: faq.answer,
      }))

    // assegna sull’oggetto copiato, non su quello Apollo
    post.faqs = faqsArray
  }

  // 🔽 ritorna un nuovo oggetto data con il post normalizzato
  return {...data, post}
}

export async function getMorePosts(slug, categoryId, correlati) {
  if (PANNELLO_URL) return altriArticoliPannello(slug, categoryId, correlati)
  const {data} = await client.query({
    query: gql`
      query MorePosts($categoryId: Int!) {
        posts(
          first: 4
          where: {orderby: {field: DATE, order: DESC}, categoryId: $categoryId}
        ) {
          edges {
            node {
              id
              title
              slug
              date
              databaseId
              featuredImage {
                node {
                  ...ImageFragment
                }
              }
            }
          }
        }
      }
      ${ImageFragment}
    `,
    variables: {
      categoryId: categoryId,
    },
    fetchPolicy: 'no-cache',
  })

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({node}) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 3) data.posts.edges.pop()

  return data
}
