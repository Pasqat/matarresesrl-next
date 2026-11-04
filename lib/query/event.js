import client from '../apolloClient'
import {gql} from '@apollo/client'
import ImageFragment from './fragment/image'
import EventFragment from './fragment/event'
import SeoFragment from './fragment/seo'
import {
  formatDate,
  getHour,
  isFutureDate,
  toSchemaOrgDate,
} from '../../actions/utils/formatDate'
import {KIRBY_URL, kirby, eventoKirby} from '../kirby'

async function eventiDaWordPress() {
  const {data} = await client.query({
    query: gql`
      query MyQuery {
        events(where: {orderby: {field: DATE, order: DESC}}, first: 9999) {
          nodes {
            ...EventFragment
            allDay
            # isPast
            featuredImage {
              node {
                ...ImageFragment
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
      ${EventFragment}
      ${ImageFragment}
    `,
  })
  return data.events.nodes
}

export async function getEvents() {
  const nodes = KIRBY_URL
    ? (await kirby('eventi')).map(eventoKirby)
    : await eventiDaWordPress()

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

  const pastEvent = [...nodes]
    .filter(n => !isFutureDate(n.startDate))
    .slice(0, 6)
  const futureEvent = [...nodes]
    .filter(n => isFutureDate(n.startDate))
    .sort(sortByDate)

  const pastEventFormattedDate = pastEvent.map(e => ({
    ...e,
    startDate: formatDate(e.startDate),
    endDate: formatDate(e.endDate),
  }))

  const futureEventFormattedDate = futureEvent.map(e => ({
    ...e,
    startDate: formatDate(e.startDate),
    endDate: formatDate(e.endDate),
  }))

  return {
    pastEvent: pastEventFormattedDate,
    futureEvent: futureEventFormattedDate,
  }
}

export async function getEvent(slug) {
  if (KIRBY_URL) {
    const e = await kirby(`eventi/${encodeURIComponent(slug)}`)
    return e && conDate(eventoKirby(e))
  }
  const {data} = await client.query({
    query: gql`
      query EventBySlug($id: ID!, $idType: EventIdType!) {
        event(id: $id, idType: $idType) {
          ...EventFragment
          content
          showMap
          status
          featuredImage {
            node {
              ...ImageFragment
            }
          }
          external_link {
            link
          }
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
          seo {
            ...SeoFragment
          }
        }
      }
      ${ImageFragment}
      ${EventFragment}
      ${SeoFragment}
    `,
    variables: {
      id: slug,
      idType: 'SLUG',
    },
    // fetchPolicy: "no-cache",
  })

  if (!data.event) return null
  return conDate(data.event)
}

function conDate(e) {
  return {
    ...e,
    startDate: formatDate(e.startDate),
    endDate: formatDate(e.endDate),
    startHour: getHour(e.startDate),
    endHour: getHour(e.endDate),
    startDateISO: toSchemaOrgDate(e.startDate),
    endDateISO: toSchemaOrgDate(e.endDate),
    organizers: {...e.organizers?.edges?.[0]?.node},
    isFutureDate: isFutureDate(e.startDate),
  }
}
