const ImageFragment = `
fragment ImageFragment on MediaItem {
    altText
    sourceUrl(size: THUMBNAIL)
    mediaItemUrl
    mediaDetails {
      sizes {
        sourceUrl
      }
    }
  }
`

export default ImageFragment
