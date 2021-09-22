import Image from "next/image";
import Link from "next/link";

export default function CoverImage({ title, coverImage, slug, href, placeholderText, ...otherProps }) {
  const image = (
    <Image
      width={2000}
      height={1000}
      alt={`Immagine di copertina per ${title}`}
      src={coverImage?.sourceUrl}
      objectFit="cover"
      className={`z-0 ${otherProps.className} `}
      {...otherProps}
    />
  );
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
    <div className="relative flex items-center justify-center w-full pb-[50%] text-center bg-gradient-to-tl from-red-600 to-yellow-400 overflow-hidden shadow-md">
      <div className="leading-tight select-none absolute bottom-[30%] z-0 text-4xl transform scale-150 text-gray-100 opacity-30 font-extrabold font-serif">
        {placeholderText}
      </div>
    </div>
  )
}
