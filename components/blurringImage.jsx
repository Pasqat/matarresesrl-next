import * as React from 'react'
import Image from 'next/image'

function BlurringImage({
  css,
  img,
  alt,
  height = undefined,
  width = undefined,
  objectFit = 'cover',
  ...otherProps
}) {
  const [hasPlaceholder, setHasPlaceholder] = React.useState(true)

  const hasFill =
    Boolean(img?.fill) ||
    Boolean(otherProps?.fill) ||
    img?.layout === 'fill' ||
    otherProps?.layout === 'fill'

  // Prepara imgProps rimuovendo proprietà legacy
  const imgProps = {...img}
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
        onLoad={() => setHasPlaceholder(false)}
        style={imageStyle}
      />
    </>
  )
}

export {BlurringImage}
