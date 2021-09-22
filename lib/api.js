import client from "./apolloClient";
import { gql } from "@apollo/client";

export async function getAllPosts() {
  const { data, loading } = await client.query({
    query: gql`
      query AllPosts {
        posts(first: 18, where: { orderby: { field: DATE, order: DESC } }) {
          # posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              slug
              date
              id
              featuredImage {
                node {
                  sourceUrl
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
  });

  return data?.posts;
}

export async function getPaginatedPosts(first, last, after, before) {
  const { data, loading } = await client.query({
    query: gql`
      query GET_PAGINATED_POSTS(
        $first: Int
        $last: Int
        $after: String
        $before: String
      ) {
        posts(first: $first, last: $last, after: $after, before: $before) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              title
              excerpt
              slug
              date
              id
              featuredImage {
                node {
                  sourceUrl
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
    variables: {
      first,
      last,
      after,
      before,
    },
  });

  return { posts: data?.posts, loading };
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
  });
  return data?.posts;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";

  const { data } = await client.query({
    query: gql`
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      databaseId
      featuredImage {
        node {
          sourceUrl
        }
      }
      categories {
        edges {
          node {
            name
            id
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
      # Yoast SEO data
      seo {
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        metaKeywords
        opengraphUrl
        opengraphType
        opengraphTitle
        opengraphSiteName
        opengraphPublisher
        opengraphPublishedTime
        opengraphModifiedTime
        opengraphDescription
        opengraphAuthor
        opengraphImage {
          sourceUrl
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${isRevision
        ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              }
            }
          }
        }
        `
        : ""
      }
      }
      posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    variables: {
      id: isDraft ? postPreview.id : slug,
      idType: isDraft ? "DATABASE_ID" : "SLUG",
    },
    //  TODO: is this suboptimal? need no cache because apollo client default use cache and data are read-only
    fetchPolicy: "no-cache",
  });

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 3) data.posts.edges.pop();

  return data;
}

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
      query EventBySlug($id: ID!, $idType: EventIdType! ) {
        event(id: $id, idType: $idType)  {
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
      idType: "SLUG"
    },
    fetchPolicy: "no-cache",
  });

  return data;
}

