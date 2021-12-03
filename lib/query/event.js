import client from '../apolloClient'
import {gql} from '@apollo/client'
import ImageFragment from './fragment/image'
import EventFragment from './fragment/event'

// NOTE: Expamle functios to get the events
export async function getEvents() {
  const {data} = await client.query({
    query: gql`
      query MyQuery {
        events {
          nodes {
            ...EventFragment
            allDay
            eventsCategories {
              nodes {
                slug
                name
                databaseId
              }
            }
            excerpt
            content
            # organizers {
            #   edges {
            #     node {
            #       title
            #       content
            #       email
            #       slug
            #       phone
            #       title
            #       website
            #     }
            #   }
            # }
            # venue {
            #   address
            #   city
            #   title
            #   country
            #   link
            #   province
            #   phone
            #   showMap
            #   slug
            #   stateProvince
            #   title
            # }
          }
        }
      }
      ${EventFragment}
      ${ImageFragment}
    `,
  })

  // Parsing to order data by startDate in Asc order
  function sortByDate(a, b) {
    if (b.startDate < a.startDate) {
      return 1
    }
    if (b.startDate > a.startDate) {
      return -1
    }
    return 0
  }

  const nodes = [...data.events.nodes]
  const sorted = nodes.sort(sortByDate)

  return sorted
}

export async function getAllEventsWithSlug() {
  const {data} = await client.query({
    query: gql`
      {
        events(first: 10000) {
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

  return data?.events
}

export async function getEvent(slug) {
  const {data} = await client.query({
    query: gql`
      query EventBySlug($id: ID!, $idType: EventIdType!) {
        event(id: $id, idType: $idType) {
          ...EventFragment
          content
          phone
          showMap
          status
          venue {
            address
            city
            country
            link
            province
            phone
            showMap
            slug
            stateProvince
            title
          }
          organizers {
            edges {
              node {
                authorId
                databaseId
                email
                link
                phone
                slug
                title
                website
              }
            }
          }
        }
      }
      ${ImageFragment}
      ${EventFragment}
    `,
    variables: {
      id: slug,
      idType: 'SLUG',
    },
    // fetchPolicy: "no-cache",
  })

  return data
}
