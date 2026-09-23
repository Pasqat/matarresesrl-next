import {FacebookIcon} from '../icons/facebook-icon'
import {LinkedInIcon} from '../icons/linkedin-icon'
import {MailIcon} from '../icons/mail-icon'
import {TwitterIcon} from '../icons/twitter-icon'
import SocialShareButton from '../SocialShareButton/SocialShareButton'

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN

export default function SocialShareBar({route, title}) {
  return (
    <>
      <div className="share-bar" aria-label="Condividi">
        <span>Condividi</span>
        <SocialShareButton
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            `${domainUrl}${route}`,
          )}`}
          // icon="fab fa-facebook"
          icon={<FacebookIcon size="24" />}
          tooltip="su Facebook"
          title={title}
          social="Facebook"
        />
        <SocialShareButton
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title,
          )}&url=${encodeURIComponent(`${domainUrl}${route}`)}`}
          // icon="fab fa-twitter"
          icon={<TwitterIcon size="24" />}
          tooltip="su Twitter"
          title={title}
          social="Twitter"
        />
        <SocialShareButton
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            `${domainUrl}${route}`,
          )}`}
          // icon="fab fa-linkedin"
          icon={<LinkedInIcon size="24" />}
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
          icon={<MailIcon size="24" />}
          tooltip="via mail"
          title={title}
          social="Email"
        />
      </div>
    </>
  )
}
