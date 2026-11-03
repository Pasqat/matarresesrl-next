import {gtmEvent} from '../../lib/gtm'
import {usePlausible} from 'next-plausible'

// Pulsante di condivisione (solo SocialShareBar): tondo 44px con filetto, tracciamento invariato.
export const classePulsante =
  'flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(127_127_127/.4)] transition-colors hover:border-fiamma hover:bg-fiamma hover:text-[#120a00]'

export default function SocialShareButton(props) {
  const plausible = usePlausible()
  const {href, icon, children, tooltip, title, social} = props
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={classePulsante}
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
