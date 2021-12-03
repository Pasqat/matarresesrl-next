const ImageFragment = `
fragment ImageFragment on MediaItem {
    altText
    sourceUrl
    mediaItemUrl
    mediaDetails {
      sizes {
        sourceUrl
      }
    }
  }
`

export default ImageFragment
