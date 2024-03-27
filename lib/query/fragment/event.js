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
    allDay
    # isMultiday
    # isPast
    # recurring
  }
`;

export default EventFragment;
