export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

export const pageview = () => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq('track', name, options)
}
