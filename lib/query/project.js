import client from '../apolloClient'
import {gql} from '@apollo/client'

// NOTE: Expamle functios to get the events
export async function getProjects() {
  const {data} = await client.query({
    query: gql`
      query MyQuery {
        projects {
          nodes {
            featuredImage {
              node {
                sourceUrl(size: MEDIUM_LARGE)
              }
            }
            excerpt
            id
            portfolioCategories {
              nodes {
                count
                id
                name
                slug
              }
            }
            portfolioTags {
              nodes {
                count
                name
                slug
              }
            }
            projectId
            slug
            title
          }
        }
      }
    `,
  })

  return data
}

export async function getAllProjectsWithSlug() {
  const {data} = await client.query({
    query: gql`
      query allProjectsWithSlug {
        projects(first: 10000) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `,
  })

  return data?.projects
}

export async function getProject(slug) {
  const {data} = await client.query({
    query: gql`
      query ProjectBySlug($id: ID!, $idType: ProjectIdType!) {
        project(id: $id, idType: $idType) {
          title
          slug
          content
          databaseId
          featuredImage {
            node {
              sourceUrl
            }
          }
          date
          id
          portfolioTags {
            edges {
              node {
                slug
                name
                portfolioTagId
                id
              }
            }
          }
          portfolioCategories {
            edges {
              node {
                slug
                name
                portfolioCategoryId
                id
              }
            }
          }
        }
      }
    `,
    variables: {
      id: slug,
      idType: 'SLUG',
    },
    // fetchPolicy: "no-cache",
  })

  return data
}
