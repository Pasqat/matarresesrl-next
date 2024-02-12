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
    # isMultiday
    # isPast
    # recurring
  }
`;

export default EventFragment;
