import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function CoverImage({ title, coverImage, slug }) {
  const image = (
    <Image
      width={2000}
      height={1000}
      alt={`Immagine di copertina per ${title}`}
      src={coverImage?.sourceUrl}
      // TODO: for some reason classNames are not applied to netx/image component
      // className={clsx(
      //   "shadow-small",
      //   slug ? "hover:shadow-medium transition-shadow duration-200" : ""
      // )}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={slug}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
