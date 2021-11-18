import Image from 'next/image'
import Link from 'next/link'

export default function CoverImage({
  title,
  coverImage,
  slug,
  href,
  placeholderText,
  className,
  ...rest
}) {
  const image = (
    <Image
      width={2000}
      height={1000}
      alt={`Immagine di copertina per ${title}`}
      src={coverImage}
      objectFit="cover"
      className={`z-0 ${className} rounded-lg `}
      {...rest}
    />
  )
  // TODO: Maybe creat and add a placeholder image when on coverImage
  return coverImage ? (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={href}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  ) : (
    <div className="pb-[50%] relative flex items-center justify-center w-full text-center bg-gradient-to-tl shadow-md from-red-600 to-yellow-400 overflow-hidden">
      <div className="bottom-[30%] absolute z-0 text-gray-100 font-serif text-4xl font-extrabold leading-tight opacity-30 select-none transform scale-150">
        {placeholderText}
      </div>
    </div>
  )
}
