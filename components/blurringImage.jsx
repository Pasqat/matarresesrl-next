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
  onLoadingComplete: onLoadingCompleteProp = undefined,
  ...otherProps
}) {
  const [hasPlaceholder, setHasPlaceholder] = React.useState(true)

  // Normalize img input (string | WP node | next/image props)
  let imgProps = {}
  if (typeof img === 'string') {
    imgProps.src = img
  } else if (img?.node?.mediaItemUrl) {
    imgProps.src = img.node.mediaItemUrl
    if (img.node.width) imgProps.width = img.node.width
    if (img.node.height) imgProps.height = img.node.height
  } else {
    imgProps = {...(img || {})}
  }

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
        onLoadingComplete={result => {
          setHasPlaceholder(false)
          if (typeof onLoadingCompleteProp === 'function') {
            onLoadingCompleteProp(result)
          }
        }}
        priority={priority}
        sizes={sizes}
        style={imageStyle}
      />
    </>
  )
}

export {BlurringImage}
