import * as React from 'react'
import Image from 'next/image'

function BlurringImage({
  svg: [Svg, svgProps, rectangles],
  img,
  alt,
  style,
  blurLevel = 5,
  height = undefined,
  width = undefined,
  ...otherProps
}) {
  const [hasPlaceholder, setHasPlaceholder] = React.useState(true)

  return (
    <>
      {hasPlaceholder ? (
        <Svg
          {...svgProps}
          style={{
            ...svgProps.style,
            filter: `blur(${blurLevel}px)`,
          }}
        >
          {rectangles.map(([Rect, rectProps]) => (
            <Rect {...rectProps} key={`${rectProps.x} ${rectProps.y}`} />
          ))}
        </Svg>
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
