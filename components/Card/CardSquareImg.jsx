import {ArrowButton} from '../arrow-button'
import {H3} from '../typography'
import Image from 'next/image'

// NOTE: 0947
function CardSquareImg({imgSrc, imgAlt, title, description, url, urlText}) {
  return (
    <div className="relative flex flex-col w-full break-words bg-gray-100 rounded-lg p-6 space-y-4 lg:pt-12 mb-8">
      <div className="flex-auto">
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
      <H3 variant="secondary">{title}</H3>
      <div
        className="text-gray-500 text-lg"
        dangerouslySetInnerHTML={{__html: description}}
      />
      {url ? (
        <div className="justify-items-end text-right">
          <ArrowButton>{urlText}</ArrowButton>
        </div>
      ) : null}
    </div>
  )
}

export default CardSquareImg
