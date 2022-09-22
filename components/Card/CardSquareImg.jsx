import {ArrowLink} from '../arrow-button'
import {H3} from '../typography'
import Image from 'next/image'

function CardSquareImg({
  slug,
  href,
  imgSrc,
  imgAlt,
  title,
  description,
  url,
  urlText,
}) {
  return (
    <div className="bg-secondary group relative flex h-full w-full flex-col items-start rounded-lg px-8 py-12 lg:px-12">
      <div className="col-span-full justify-between lg:flex lg:flex-col">
        <div>
          <div className="relative h-32 w-full shadow-md">
            <Image
              objectFit="cover"
              objectPosition="center"
              layout="fill"
              src={imgSrc}
              alt={imgAlt ?? title}
              placeholder="blur"
            />
          </div>
        </div>
        <H3 variant="secondary" className="mt-12">
          {title}
        </H3>
        <div
          className="mt-6 text-lg text-gray-500"
          dangerouslySetInnerHTML={{__html: description}}
        />
      </div>
      {url ? (
        <div className="mt-12 flex flex-grow items-end justify-between lg:ml-auto">
          <ArrowLink to={slug ?? href ?? url} className="items-end">
            {urlText}
            <div className="focus-ring absolute inset-0 left-0 right-0 z-10 h-full rounded-lg md:-left-12 md:-right-12 lg:left-0 lg:right-0" />
          </ArrowLink>
        </div>
      ) : null}
    </div>
  )
}

export default CardSquareImg
