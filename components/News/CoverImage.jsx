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
    <div className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-tl from-red-600 to-yellow-400 pb-[50%] text-center shadow-md">
      <div className="absolute bottom-[30%] z-0 scale-150 select-none font-serif text-4xl font-extrabold leading-tight text-gray-100 opacity-30">
        {placeholderText}
      </div>
    </div>
  )
}
