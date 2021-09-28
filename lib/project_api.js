import client from "./apolloClient";
import { gql } from "@apollo/client";

// NOTE: Expamle functios to get the events
export async function getProjects() {
  const { data } = await client.query({
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
  });

  console.log(data)

  return data;
}

// export async function getAllProjectsWithSlug() {
//   const { data } = await client.query({
//     query: gql`
//       {
//         events(first: 10000) {
//           edges {
//             node {
//               id
//               slug
//             }
//           }
//         }
//       }
//     `,
//   });

//   return data?.events;
// }

// export async function getProject(slug) {
//   const { data } = await client.query({
//     query: gql`
//       query EventBySlug($id: ID!, $idType: EventIdType! ) {
//         event(id: $id, idType: $idType)  {
//           title
//           slug
//           startDate
//           endDate
//           allDay
//           recurring
//           cost
//           content
//           databaseId
//           duration
//           featuredImage {
//             node {
//               sourceUrl
//             }
//           }
//           link
//           organizers {
//             nodes {
//               title
//               slug
//               website
//               phone
//               email
//               link
//             }
//           }
//           venue {
//             address
//             city
//             link
//             phone
//             province
//             slug
//             title
//           }
//         }
//       }
//     `,
//     variables: {
//       id: slug,
//       idType: "SLUG"
//     },
//     fetchPolicy: "no-cache",
//   });

//   return data;
// }

