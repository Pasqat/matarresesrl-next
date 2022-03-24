const SeoFragment = `
fragment SeoFragment on PostTypeSEO {
      canonical
      title
      metaDesc
      metaKeywords
      metaRobotsNoindex
      metaRobotsNofollow
      readingTime
      opengraphAuthor
      opengraphDescription
      opengraphUrl
      opengraphPublishedTime
      opengraphModifiedTime
      opengraphImage {
        sourceUrl
        mediaType
        mediaDetails {
          height
          width
        }
      }
      opengraphTitle
      opengraphType
      opengraphSiteName
      opengraphPublisher
      twitterTitle
      twitterDescription
      twitterImage {
        sourceUrl
      }
      schema {
        articleType
        pageType
        raw
      }
}
`

export default SeoFragment
