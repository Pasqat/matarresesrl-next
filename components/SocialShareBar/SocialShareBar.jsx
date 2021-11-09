import SocialShareButton from '../SocialShareButton/SocialShareButton'

const domainUrl = process.env.NEXT_PUBLIC_WP_API_URL

export default function SocialShareBar({route, title}) {
  return (
    <>
      <div className="text-primtary mt-8 text-center text-2xl lg:hidden">
        Ti è piacuto l&apos;articolo? Condividilo sui social
      </div>
      <div className="sticky z-3 top-28 flex flex-row items-center justify-center mt-8 h-full lg:flex-col lg:ml-10 lg:mt-0">
        <SocialShareButton
          href={`https://www.facebook.com/sharer/sharer.php?u=${domainUrl}${route}`}
          icon="fab fa-facebook"
        />
        <SocialShareButton
          href={`https://twitter.com/intent/tweet?text=${title}&url=${domainUrl}${route}`}
          icon="fab fa-twitter"
        />
        <SocialShareButton
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${domainUrl}${route}`}
          icon="fab fa-linkedin"
        />
        <SocialShareButton
          href={`mailto:?subject=${title}&body=Ciao, ho pensato potesse interessarti: ${domainUrl}${route}`}
          icon="fas fa-envelope"
        />
      </div>
    </>
  )
}
