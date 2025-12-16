import Image from 'next/image'
import React from 'react'

function BlurringImage({
  img,
  alt,
  width,
  height,
  fill,
  sizes,
  quality,
  placeholder,
  blurDataURL,
  objectFit = 'cover',
  onLoad,
  priority = false,
  className,
  style,
  ...rest
}) {
  const [loaded, setLoaded] = React.useState(false)

  // normalize img input
  const imgSrc = typeof img === 'string' ? img : img?.mediaItemUrl ?? img?.src
  const nodeWidth = img?.mediaDetails?.width
  const nodeHeight = img?.mediaDetails?.height

  // prefer explicit dimensions when available
  const explicitWidth = width ?? nodeWidth
  const explicitHeight = height ?? nodeHeight

  const useFill = fill ?? !(explicitWidth && explicitHeight)

  const imageProps = {
    src: imgSrc,
    alt,
    priority,
    quality,
    sizes: sizes ?? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    style: {objectFit, ...style},
    className,
    ...rest,
  }

  if (useFill) {
    imageProps.fill = true
  } else if (explicitWidth && explicitHeight) {
    imageProps.width = explicitWidth
    imageProps.height = explicitHeight
  }

  return (
    <div className="relative">
      {/* simple blur placeholder */}
      {placeholder === 'blur' && blurDataURL && !loaded && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            filter: 'blur(20px)',
            transform: 'scale(1.05)',
          }}
        />
      )}

      <Image
        {...imageProps}
        onLoad={e => {
          setLoaded(true)
          if (typeof onLoad === 'function') onLoad(e)
        }}
      />
    </div>
  )
}

export {BlurringImage}
