import client from '../apolloClient'
import {gql} from '@apollo/client'
import ImageFragment from './fragment/image'
import SeoFragment from './fragment/seo'
import CategoriesFragment from './fragment/categories'
import FaqsFragment from './fragment/faqs'
import fetchJson from '../fetchJson'

export async function getAllPosts(preview) {
  const {data} = await client.query({
    query: gql`
      query AllPosts {
        posts(first: 99999, where: {orderby: {field: DATE, order: DESC}}) {
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
    `,
    variables: {
      asPreview: preview,
      // preview,
    },
  })

  const posts = data?.posts?.edges?.map(e => ({
    ...e.node,
    categories: e.node.categories.nodes.flatMap(c => c.name),
    tags: e.node.tags.nodes.flatMap(t => t.name),
  }))
  const categories = Array.from(data?.categories?.nodes)
  const tags = Array.from(data?.tags?.nodes)

  return {posts, categories, tags}
}

export async function getPreviewPost(id, idType = 'DATABASE_ID', user) {
  const query = `
  query PreviewPost($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType, asPreview: true) {
      databaseId
      id
      slug
      status
    }
  }
  `
  const variables = {
    id,
    idType,
  }

  const preview = await fetchJson(process.env.NEXT_PUBLIC_WP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        user[process.env.ACCESS_TOKEN_INDEX_IN_SERVER_AUTH_JSON_RESPONSE]
      }`,
    },
    body: JSON.stringify({query, variables}),
  })

  return preview.data.post
}

export async function getAllPostsWithSlug() {
  const {data} = await client.query({
    query: gql`
      {
        posts(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `,
  })
  return data?.posts
}

export async function getPost(slug, preview, previewData) {
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
      FAQ {
        ...FaqsFragment
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

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  return data
}

export async function getMorePosts(slug, categoryId) {
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
