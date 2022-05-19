import * as React from 'react'

const spacerSizes = {
  '3xs': 'h-6 lg:h-8',
  '2xs': 'h-10 lg:h-12',
  xs: 'h-16 lg:h-20 xl:h-24',
  sm: 'h-24 lg:h-32 xl:h-36',
  base: 'h-36 lg:h-40 xl:h-48',
  lg: 'h-48 lg:h-56 xl:h-64',
}

function Spacer({size, className = ''}) {
  return <div className={`${className} ${spacerSizes[size]}`} />
}

export {Spacer}
