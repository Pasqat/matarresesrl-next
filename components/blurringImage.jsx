import * as React from 'react'
import Image from 'next/image'

function BlurringImage({
  css,
  img,
  alt,
  height = undefined,
  width = undefined,
  ...otherProps
}) {
  const [hasPlaceholder, setHasPlaceholder] = React.useState(true)

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
        {...img}
        {...otherProps}
        height={height}
        width={width}
        alt={alt}
        onLoadingComplete={() => setHasPlaceholder(false)}
      />
    </>
  )
}

export {BlurringImage}
