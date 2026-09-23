import {gtmEvent} from '../../lib/gtm'
import {usePlausible} from 'next-plausible'

// Pulsante di condivisione (solo SocialShareBar): quadrato 44px con filetto, tracciamento invariato.
export default function SocialShareButton(props) {
  const plausible = usePlausible()
  const {href, icon, children, tooltip, title, social} = props
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-11 w-11 items-center justify-center border border-ghisa/15 text-acciaio transition-colors hover:border-ghisa hover:text-ghisa"
      aria-label={`Condividi ${tooltip}`}
      title={`Condividi ${tooltip}`}
      onClick={() => {
        plausible('Share', {props: {title: title, on_social: social}})
        return gtmEvent('share', {
          method: social,
          content_type: 'article',
          item_id: title,
        })
      }}
    >
      <span aria-hidden="true">{icon}</span>
      {children}
    </a>
  )
}
