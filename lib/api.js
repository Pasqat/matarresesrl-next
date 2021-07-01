const API_URL = process.env.WP_API_URL

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })
  // error handling
  const json = await res.json()
  if (json.errors) {
    console.log(json.errors)
    console.log('error details', query, variables)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getAllPosts(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 10, where: {orderby: {field: DATE, order: DESC}}) {
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
    `
  )

  return data?.posts
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(
    `
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `
  )
  return data?.posts
}

export async function getPost(slug) {
  const data = await fetchAPI(
    `
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
    {
      variables: {
        id: slug,
        idType: 'SLUG',
      },
    }
  )

  return data
}

export async function sendMail() {
  const data = await fetchAPI(
    `
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
    `
  )

  console.log(data)
}
