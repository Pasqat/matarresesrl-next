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
        d="M11.621,21v-5.961H9.278v-2.725h2.343v-2.005c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7l-0.351,2.725h-2.365V21H11.621z"
      />
      <path
        stroke="none"
        fill="none"
        stokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19,3H5C3.897,3,3,3.897,3,5v14c0,1.103,0.897,2,2,2h14c1.103,0,2-0.897,2-2V5C21,3.897,20.103,3,19,3z M5,19V5h14l0.001,14H5z"
      />
    </svg>
  )
}

export {FacebookIcon}
