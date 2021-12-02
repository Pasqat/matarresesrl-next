import client from './apolloClient'
import {gql} from '@apollo/client'

// NOTE: Expamle functios to get the events
export async function getEvents() {
  const {data} = await client.query({
    query: gql`
      query MyQuery {
        events {
          nodes {
            id
            allDay
            cost
            databaseId
            duration
            endDate
            featured
            recurring
            slug
            startDate
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
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
          id
          cost
          date
          duration
          content
          endDate
          featured
          phone
          recurring
          showMap
          slug
          startDate
          status
          title
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
    `,
    variables: {
      id: slug,
      idType: 'SLUG',
    },
    // fetchPolicy: "no-cache",
  })
  console.log(data.event)

  return data
}
