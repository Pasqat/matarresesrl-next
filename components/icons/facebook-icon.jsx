import * as React from 'react'

function FacebookIcon({size = 24, title = 'Fackebook'}) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <title>{title}</title>
      <path
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M7.5 15.5H2c-.83 0-1.5-.67-1.5-1.5V2C.5 1.17 1.17.5 2 .5h12c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5h-3.5V10H12l1-2.5h-2.5v-2c0-.55.45-.5 1-.5h1V2.5h-2c-.83 0-1.58.34-2.12.88S7.5 4.67 7.5 5.5v2h-2V10h2v5.5z"
      />
    </svg>
  )
}

export {FacebookIcon}
