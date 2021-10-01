import client from "./apolloClient";
import { gql } from "@apollo/client";

// NOTE: Expamle functios to get the events
export async function getEvents() {
  const { data } = await client.query({
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
            eventsCategories {
              nodes {
                slug
                name
                databaseId
              }
            }
            excerpt
            organizers {
              nodes {
                title
                content
              }
            }
            venue {
              address
              city
              title
            }
            recurring
            slug
            startDate
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `,
  });

  // Parsing to order data by startDate in Asc order
  function sortByDate(a, b) {
    if (b.startDate < a.startDate) {
      return 1;
    }
    if (b.startDate > a.startDate) {
      return -1;
    }
    return 0;
  }

  const nodes = [...data.events.nodes];
  const sorted = nodes.sort(sortByDate);

  return sorted;
}

export async function getAllEventsWithSlug() {
  const { data } = await client.query({
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
  });

  return data?.events;
}

export async function getEvent(slug) {
  const { data } = await client.query({
    query: gql`
      query EventBySlug($id: ID!, $idType: EventIdType!) {
        event(id: $id, idType: $idType) {
          title
          slug
          startDate
          endDate
          allDay
          recurring
          cost
          content
          databaseId
          duration
          featuredImage {
            node {
              sourceUrl
            }
          }
          link
          organizers {
            nodes {
              title
              slug
              website
              phone
              email
              link
            }
          }
          venue {
            address
            city
            link
            phone
            province
            slug
            title
          }
        }
      }
    `,
    variables: {
      id: slug,
      idType: "SLUG",
    },
    // fetchPolicy: "no-cache",
  });

  return data;
}
