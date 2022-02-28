import {Grid} from '../grid'
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
    <div className="px-8 w-full h-full">
      <div className="bg-gray-100 rounded-lg lg:bg-trasparent">
        <Grid
          nested
          className="group px-6 pb-6 pt-14 rounded-lg md:pb-12 lg:bg-gray-100"
        >
          <div className="lg:flex lg:flex-col justify-between col-span-full">
            <div>
              {/* TODO: use higher resolution image. Find them in ../uploads/2015/03 */}
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
              className="text-gray-500 text-lg mt-6"
              dangerouslySetInnerHTML={{__html: description}}
            />

            {url ? (
              <div className="flex justify-between items-center mt-12">
                <ArrowLink to={slug ?? href ?? url}>
                  {urlText}
                  <div className="focus-ring absolute z-10 inset-0 left-0 right-0 rounded-lg md:-left-12 md:-right-12 lg:left-0 lg:right-0" />
                </ArrowLink>
              </div>
            ) : null}
          </div>
        </Grid>
      </div>
    </div>
  )
}

export default CardSquareImg
