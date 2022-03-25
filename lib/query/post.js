import client from '../apolloClient'
import {gql} from '@apollo/client'
import ImageFragment from './fragment/image'
import SeoFragment from './fragment/seo'
import CategoriesFragment from './fragment/categories'

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
