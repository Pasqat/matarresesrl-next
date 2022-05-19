import * as React from 'react'

function ChevronLeftIcon({className, size = 50}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // stroke="currentColor"
        // strokeLinecap="round"
        // strokeLinejoin="round"
        // strokeWidth="1.5"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.25 8.75L9.75 12L13.25 15.25"
      />
    </svg>
  )
}

export {ChevronLeftIcon}
