// Loghi dei profili social (data/social.js), a tratto come FacebookIcon/LinkedInIcon delle news.
const TRATTI = {
  Instagram: (
    <>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="5" />
      <circle cx="12" cy="12" r="3.75" />
      <path d="M16.75 7.25v.01" />
    </>
  ),
  LinkedIn: (
    <>
      <path d="M4.75 7.75a3 3 0 013-3h8.5a3 3 0 013 3v8.5a3 3 0 01-3 3h-8.5a3 3 0 01-3-3v-8.5z" />
      <path d="M10.75 16.25V14a2.25 2.25 0 014.5 0v2.25M10.75 11.75v4.5M7.75 11.75v4.5M7.75 8.75v.5" />
    </>
  ),
  Facebook: (
    <>
      <path d="M20 8v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4Z" />
      <path d="M11.5 20v-8c0-2 .5-3.5 3.5-3.5m-5.5 4.5h5" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2.75" y="5.75" width="18.5" height="12.5" rx="4" />
      <path d="M10.25 9.5v5l4.25-2.5z" />
    </>
  ),
}

export function SocialIcon({name, size = 22}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {TRATTI[name]}
    </svg>
  )
}
