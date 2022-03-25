import client from '../apolloClient'
import {gql} from '@apollo/client'
import SeoFragment from './fragment/seo'

// NOTE: Expamle functios to get the events
export async function getProjects() {
  const {data} = await client.query({
    query: gql`
      query AllProjects {
        projects(first: 99999, where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              title
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
              portfolioCategories {
                nodes {
                  id
                  name
                  slug
                }
              }
              portfolioTags {
                nodes {
                  name
                  slug
                  id
                }
              }
            }
          }
        }
        portfolioCategories(first: 9999) {
          nodes {
            databaseId
            name
            slug
            id
            count
          }
        }
        portfolioTags(first: 9999) {
          nodes {
            name
            slug
            id
            count
          }
        }
      }
    `,
  })

  const projects = data?.projects?.edges?.map(e => ({
    ...e.node,
    categories: e.node.portfolioCategories.nodes.flatMap(c => c.name),
    tags: e.node.portfolioTags.nodes.flatMap(t => t.name),
  }))
  const categories = Array.from(data?.portfolioCategories?.nodes)
  const tags = Array.from(data?.portfolioTags?.nodes)

  return {projects, categories, tags}
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
                databaseId
                id
              }
            }
          }
          portfolioCategories {
            edges {
              node {
                slug
                name
                databaseId
                id
              }
            }
          }
          galleria {
            immagine {
              altText
              sourceUrl
              id
            }
            immagine2 {
              altText
              sourceUrl
              id
            }
            immagine3 {
              altText
              sourceUrl
              id
            }
            immagine4 {
              altText
              sourceUrl
              id
            }
            immagine5 {
              altText
              sourceUrl
              id
            }
            immagine6 {
              altText
              sourceUrl
              id
            }
          }
          seo {
            ...SeoFragment
          }
        }
      }
      ${SeoFragment}
    `,
    variables: {
      id: slug,
      idType: 'SLUG',
    },
    // fetchPolicy: "no-cache",
  })

  const galleria = Object.values(data.project.galleria).filter(
    type => typeof type !== 'string',
  )
  const {project} = data

  const newData = {...project, galleria}

  return newData
}
