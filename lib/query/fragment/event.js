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
    isFeatured
    isMultiday
    isPast
    # recurring
    featuredImage {
      node {
        ...ImageFragment
      }
    }
  }
`

export default EventFragment
