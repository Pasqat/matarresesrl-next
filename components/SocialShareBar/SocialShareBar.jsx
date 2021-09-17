import SocialShareButton from "../SocialShareButton/SocialShareButton"

const domainUrl = process.env.NEXT_PUBLIC_WP_API_URL

export default function SocialShareBar({ route, title }) {
  return (
    <div className="sticky top-28 flex flex-row lg:flex-col z-3 justify-center items-center mt-8 lg:mt-0 lg:ml-10 h-full">
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
  )
}
