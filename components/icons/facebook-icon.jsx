import * as React from 'react'

function FacebookIcon({size = 20, title = 'Fackebook'}) {
  return (
    <svg width={size} height={size} fill="none" viewBox="2 2 24 24">
      <title>{title}</title>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
      >
        <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z"></path>
        <path d="M11 21v-9c0-2.188.5-4 4-4m-6 5h6"></path>
      </g>
      {/* <path
        fill="currentColor"
        d="M7 5c-1.094 0-2 .906-2 2v18c0 1.094.906 2 2 2h18c1.094 0 2-.906 2-2V7c0-1.094-.906-2-2-2zm0 2h18v18h-5.188v-6.75h2.594l.375-3h-2.968v-1.938c0-.874.214-1.468 1.468-1.468h1.625V9.125c-.277-.035-1.238-.094-2.343-.094c-2.305 0-3.875 1.387-3.875 3.969v2.25h-2.625v3h2.624V25H7z"
      ></path> */}
    </svg>
  )
}

export {FacebookIcon}
