import client from "../apolloClient";
import { gql } from "@apollo/client";
import ImageFragment from "./fragment/image";
import EventFragment from "./fragment/event";
import SeoFragment from "./fragment/seo";
import {
  formatDate,
  getHour,
  isFutureDate,
} from "../../actions/utils/formatDate";

export async function getEvents() {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        events(
          where: {orderby: {field: DATE, order: DESC}}
          first: 9999
        ) {
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

  const pastEvent = [...data.events.nodes].filter((n) =>
    !isFutureDate(n.startDate)
  ).slice(0, 6);
  const futureEvent = [...data.events.nodes]
    .filter((n) => isFutureDate(n.startDate))
    .sort(sortByDate);

  const pastEventFormattedDate = pastEvent.map((e) => ({
    ...e,
    startDate: formatDate(e.startDate),
    endDate: formatDate(e.endDate),
  }));

  const futureEventFormattedDate = futureEvent.map((e) => ({
    ...e,
    startDate: formatDate(e.startDate),
    endDate: formatDate(e.endDate),
  }));

  return {
    pastEvent: pastEventFormattedDate,
    futureEvent: futureEventFormattedDate,
  };
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
      idType: "SLUG",
    },
    // fetchPolicy: "no-cache",
  });

  const event = {
    ...data.event,
    startDate: formatDate(data.event.startDate),
    endDate: formatDate(data.event.endDate),
    startHour: getHour(data.event.startDate),
    endHour: getHour(data.event.endDate),
    organizers: { ...data.event.organizers.edges[0].node },
    isFutureDate: isFutureDate(data.event.startDate)
  };

  return event;
}
