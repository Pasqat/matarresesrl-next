const EventFragment = `
  fragment EventFragment on Event {
    id
    title
    slug
    cost
    databaseId
    duration
    startDate
    endDate
    featured
    recurring
    featuredImage {
      node {
        ...ImageFragment
      }
    }
  }
`

export default EventFragment
