import Image from 'next/image'
import React from 'react'

function BlurringImage({
  css,
  img,
  alt,
  height = undefined,
  width = undefined,
  objectFit = 'cover',
  priority = false,
  sizes = undefined,
  // preferito: onLoad (Next.js v14)
  onLoad: onLoadProp = undefined,
  // manteniamo il vecchio handler per compatibilità
  onLoadingComplete: onLoadingCompleteProp = undefined,
  ...otherProps
}) {
  const [hasPlaceholder, setHasPlaceholder] = React.useState(true)

  console.log('BlurringImage render', {img, alt})
  // Normalize img input (string | WP node | next/image props)
  let imgProps = {}
  if (typeof img === 'string') {
    imgProps.src = img
  } else if (img?.node?.mediaItemUrl) {
    imgProps.src = img.node.mediaItemUrl
    if (img.node.mediaDetails.width)
      imgProps.width = img.node.mediaDetails.width
    if (img.node.mediaDetails.height)
      imgProps.height = img.node.mediaDetails.height
  } else {
    imgProps = {...(img || {})}
  }

  console.log('BlurringImage imgProps', imgProps)

  const hasFill =
    Boolean(imgProps?.fill) ||
    Boolean(otherProps?.fill) ||
    imgProps?.layout === 'fill' ||
    otherProps?.layout === 'fill'

  // Prepare imgProps removing legacy props
  if (hasFill) {
    delete imgProps.height
    delete imgProps.width
    delete imgProps.layout
    delete imgProps.objectFit
    imgProps.fill = true
  } else {
    delete imgProps.layout
    delete imgProps.fill
  }

  const imageStyle = hasFill
    ? {
        objectFit: objectFit,
      }
    : {
        height: 'auto',
        maxWidth: '100%',
        ...(height !== undefined && width === undefined ? {width: 'auto'} : {}),
      }

  return (
    <>
      {hasPlaceholder ? (
        <div
          className="absolute top-0 right-0 left-0 bottom-0 h-full w-full scale-150 blur-2xl"
          style={{
            ...css,
          }}
        />
      ) : null}
      <Image
        {...imgProps}
        {...otherProps}
        {...(!hasFill ? {height, width} : {})}
        alt={alt}
        onLoad={event => {
          setHasPlaceholder(false)
          if (typeof onLoadProp === 'function') onLoadProp(event)
          if (typeof onLoadingCompleteProp === 'function')
            onLoadingCompleteProp(event) // legacy support
        }}
        priority={priority}
        sizes={sizes}
        style={imageStyle}
      />
    </>
  )
}

export {BlurringImage}
