// Condivisione: Facebook, LinkedIn, WhatsApp, email e copia del link. `verticale` per la colonna
// fissa accanto agli articoli. I pulsanti ereditano il colore del testo (vanno su chiaro e su scuro).
import {useState} from 'react'
import {usePlausible} from 'next-plausible'
import clsx from 'clsx'
import {gtmEvent} from '../../lib/gtm'
import {FacebookIcon} from '../icons/facebook-icon'
import {LinkedInIcon} from '../icons/linkedin-icon'
import {MailIcon} from '../icons/mail-icon'
import SocialShareButton, {
  classePulsante,
} from '../SocialShareButton/SocialShareButton'

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1a5 5 0 0 1-2.4-2.4l1-1-1-2z"
        fill="currentColor"
      />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CopiaLink({url, title}) {
  const plausible = usePlausible()
  const [copiato, setCopiato] = useState(false)
  return (
    <button
      type="button"
      className={classePulsante}
      aria-label={copiato ? 'Link copiato' : 'Copia il link'}
      title={copiato ? 'Link copiato' : 'Copia il link'}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url)
          setCopiato(true)
          setTimeout(() => setCopiato(false), 2000)
        } catch {
          // clipboard negato (es. contesto non sicuro): resta il link nella barra degli indirizzi
        }
        plausible('Share', {props: {title, on_social: 'Copia link'}})
        gtmEvent('share', {
          method: 'Copia link',
          content_type: 'article',
          item_id: title,
        })
      }}
    >
      <span aria-hidden="true">
        {copiato ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="m5 12 5 5 9-10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <LinkIcon />
        )}
      </span>
    </button>
  )
}

export default function SocialShareBar({route, title, verticale = false}) {
  const url = `${domainUrl}${route}`
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  return (
    <div
      className={clsx(
        'flex flex-wrap items-center gap-2',
        verticale && 'flex-col',
      )}
      role="group"
      aria-label="Condividi"
    >
      <span
        className={clsx(
          'text-sm opacity-70',
          verticale ? 'mb-2 [writing-mode:vertical-rl] rotate-180' : 'mr-3',
        )}
      >
        Condividi
      </span>
      <SocialShareButton
        href={`https://www.facebook.com/sharer/sharer.php?u=${u}`}
        icon={<FacebookIcon size="20" />}
        tooltip="su Facebook"
        title={title}
        social="Facebook"
      />
      <SocialShareButton
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
        icon={<LinkedInIcon size="20" />}
        tooltip="su LinkedIn"
        title={title}
        social="LinkedIn"
      />
      <SocialShareButton
        href={`https://wa.me/?text=${t}%20${u}`}
        icon={<WhatsAppIcon />}
        tooltip="su WhatsApp"
        title={title}
        social="WhatsApp"
      />
      <SocialShareButton
        href={`mailto:?subject=${t}&body=Ciao, ho pensato che ti interesserà: ${u}`}
        icon={<MailIcon size="20" />}
        tooltip="via mail"
        title={title}
        social="Email"
      />
      <CopiaLink url={url} title={title} />
    </div>
  )
}
