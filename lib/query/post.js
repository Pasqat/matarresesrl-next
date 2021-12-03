import client from '../apolloClient'
import {gql} from '@apollo/client'
import ImageFragment from './fragment/image'
import SeoFragment from './fragment/seo'
import CategoriesFragment from './fragment/categories'
import PostFragment from './fragment/post'

export async function getAllPosts() {
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
            }
          }
        }
        categories {
          nodes {
            ...CategoriesFragment
            count
          }
        }
      }
      ${ImageFragment}
      ${CategoriesFragment}
    `,
  })

  const posts = data?.posts?.edges?.map(e => ({
    ...e.node,
    categories: e.node.categories.nodes.flatMap(c => c.name),
  }))
  const categories = Array.from(data?.categories?.nodes)

  return {posts, categories}
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

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
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
        edges {
          node {
            name
          }
        }
      }
      # Yoast SEO data
      seo {
         ...SeoFragment
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
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
        }
        `
            : ''
        }
      }
      posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
    ${ImageFragment}
    ${CategoriesFragment}
    ${SeoFragment}
  `,
    variables: {
      id: isDraft ? postPreview.id : slug,
      idType: isDraft ? 'DATABASE_ID' : 'SLUG',
    },
    //  TODO: is this suboptimal? need no cache because apollo client default use cache and data are read-only
    fetchPolicy: 'no-cache',
  })

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({node}) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 3) data.posts.edges.pop()

  return data
}

// TODO: this is obsolete
export async function getPaginatedPosts(first, last, after, before) {
  const {data, loading} = await client.query({
    query: gql`
      query GET_PAGINATED_POSTS(
        $first: Int
        $last: Int
        $after: String
        $before: String
      ) {
        posts(first: $first, last: $last, after: $after, before: $before) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
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
                  altText
                  sourceUrl
                  mediaItemUrl
                  mediaDetails {
                    sizes {
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      first,
      last,
      after,
      before,
    },
  })

  return {posts: data?.posts, loading}
}
