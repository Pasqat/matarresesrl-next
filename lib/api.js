import client from '../apolloClient'
import { gql } from '@apollo/client'

export async function getAllPosts() {
  const { data } = await client.query({
    query: gql`
      query AllPosts {
        posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              id
              date
              title
              slug
              featuredImage {
                node {
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

export async function getPost(slug) {
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
      }
      query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          ...PostFields
          content
        }
      }
    `,
    variables: {
      id: slug,
      idType: 'SLUG',
    },
  })

  return data
}

export async function sendMail() {
  const { data } = await client.query({
    mutation: gql`
      mutation SEND_EMAIL {
        sendEmail(
          input: {
            to: "pasquale.matarrese@gmail.com"
            from: "test@test.com"
            subject: "test email"
            body: "test email"
            clientMutationId: "test"
          }
        ) {
          origin
          sent
          message
        }
      }
    `,
  })
}
