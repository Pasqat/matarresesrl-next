import {FacebookIcon} from '../icons/facebook-icon'
import {LinkedInIcon} from '../icons/linkedin-icon'
import {MailIcon} from '../icons/mail-icon'
import {TwitterIcon} from '../icons/twitter-icon'
import SocialShareButton from '../SocialShareButton/SocialShareButton'

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN

export default function SocialShareBar({route, title}) {
  return (
    <>
      <div className="text-primtary mt-8 text-center text-2xl lg:hidden">
        Ti è piacuto l&apos;articolo? Condividilo sui social
      </div>
      <div className="sticky top-28 z-3 mt-8 flex h-full flex-row items-center justify-center lg:ml-10 lg:mt-0 lg:flex-col">
        <SocialShareButton
          href={`https://www.facebook.com/sharer/sharer.php?u=${domainUrl}${route}`}
          // icon="fab fa-facebook"
          icon={<FacebookIcon size="60" />}
          tooltip="su Facebook"
          title={title}
          social="Facebook"
        />
        <SocialShareButton
          href={`https://twitter.com/intent/tweet?text=${title}&url=${domainUrl}${route}`}
          // icon="fab fa-twitter"
          icon={<TwitterIcon size="50" />}
          tooltip="su Twitter"
          title={title}
          social="Twitter"
        />
        <SocialShareButton
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${domainUrl}${route}`}
          // icon="fab fa-linkedin"
          icon={<LinkedInIcon size="56" />}
          tooltip="su LinkedIn"
          title={title}
          social="LinkedIn"
        />
        <SocialShareButton
          href={`mailto:?subject=${title}&body=Ciao, ho pensato che ti interesserà: ${domainUrl}${route}`}
          // icon="fas fa-envelope"
          icon={<MailIcon size="50" />}
          tooltip="via mail"
          title={title}
          social="Email"
        />
      </div>
    </>
  )
}
