import client from '../apolloClient'
import { gql } from '@apollo/client'

export async function getAllPosts() {
  const { data } = await client.query({
    query: gql`
      query AllPosts {
        posts(first: 18, where: { orderby: { field: DATE, order: DESC } }) {
        # posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              slug
              date
              id
              featuredImage {
                node {
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
  })

  return data?.posts
}

export async function getAllPostsWithSlug() {
  const { data } = await client.query({
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

// export async function getPost(slug) {
//   const { data } = await client.query({
//     query: gql`
//       fragment PostFields on Post {
//         title
//         slug
//         date
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//       }
//       query PostBySlug($id: ID!, $idType: PostIdType!) {
//         post(id: $id, idType: $idType) {
//           ...PostFields
//           content
//         }
//       }
//     `,
//     variables: {
//       id: slug,
//       idType: 'SLUG',
//     },
//   })

//   return data
// }

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'

  const { data } = await client.query({
    query: gql`
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      categories {
        edges {
          node {
            name
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
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 3) data.posts.edges.pop()

  return data
}
