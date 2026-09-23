import {FacebookIcon} from '../icons/facebook-icon'
import {LinkedInIcon} from '../icons/linkedin-icon'
import {MailIcon} from '../icons/mail-icon'
import {TwitterIcon} from '../icons/twitter-icon'
import SocialShareButton from '../SocialShareButton/SocialShareButton'

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN

export default function SocialShareBar({route, title}) {
  return (
    <>
      <div
        className="mt-12 flex flex-wrap items-center gap-2"
        role="group"
        aria-labelledby="condividi-label"
      >
        <span id="condividi-label" className="mr-3 text-sm text-acciaio">
          Condividi
        </span>
        <SocialShareButton
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            `${domainUrl}${route}`,
          )}`}
          // icon="fab fa-facebook"
          icon={<FacebookIcon size="20" />}
          tooltip="su Facebook"
          title={title}
          social="Facebook"
        />
        <SocialShareButton
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title,
          )}&url=${encodeURIComponent(`${domainUrl}${route}`)}`}
          // icon="fab fa-twitter"
          icon={<TwitterIcon size="20" />}
          tooltip="su Twitter"
          title={title}
          social="Twitter"
        />
        <SocialShareButton
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            `${domainUrl}${route}`,
          )}`}
          // icon="fab fa-linkedin"
          icon={<LinkedInIcon size="20" />}
          tooltip="su LinkedIn"
          title={title}
          social="LinkedIn"
        />
        <SocialShareButton
          href={`mailto:?subject=${encodeURIComponent(
            title,
          )}&body=Ciao, ho pensato che ti interesserà: ${encodeURIComponent(
            `${domainUrl}${route}`,
          )}`}
          // icon="fas fa-envelope"
          icon={<MailIcon size="20" />}
          tooltip="via mail"
          title={title}
          social="Email"
        />
      </div>
    </>
  )
}
