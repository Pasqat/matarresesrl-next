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
    <div className="relative">
      <div className="bg-secondary rounded-lg lg:bg-trasparent">
        <div className="group rounded-lg px-6 pb-6 pt-14 md:pb-12 lg:bg-gray-100">
          <div className="col-span-full justify-between lg:flex lg:flex-col">
            <div>
              {/* TODO: HiRes img from Angela */}
              <div className="relative h-32 w-full shadow-md">
                <Image
                  objectFit="cover"
                  objectPosition="center"
                  layout="fill"
                  src={imgSrc}
                  alt={imgAlt ?? title}
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

            {url ? (
              <div className="mt-12 flex items-center justify-between lg:ml-auto">
                <ArrowLink to={slug ?? href ?? url}>
                  {urlText}
                  <div className="focus-ring absolute inset-0 left-0 right-0 z-10 h-full rounded-lg md:-left-12 md:-right-12 lg:left-0 lg:right-0" />
                </ArrowLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSquareImg
