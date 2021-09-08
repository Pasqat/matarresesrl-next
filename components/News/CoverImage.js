import Image from "next/image";
import Link from "next/link";

export default function CoverImage({ title, coverImage, slug, href }) {
  const image = (
    <Image
      width={2000}
      height={1000}
      alt={`Immagine di copertina per ${title}`}
      src={coverImage?.sourceUrl}
      objectFit="cover"
      className="rounded-xl"
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
  ) : null;
}
