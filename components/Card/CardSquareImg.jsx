import {H4} from '../typography'

function CardSquareImg({imgSrc, imgAlt, title, children, className}) {
  return (
    <div className={`w-full px-4 pt-6 text-center lg:pt-12 mb-8 ${className}`}>
      <div className="relative flex flex-col w-full min-w-0 break-words bg-white rounded-lg shadow-lg hover:shadow-xl">
        <div className="flex-auto px-4 py-5">
          {/* TODO: use higher resolution image. Find them in ../uploads/2015/03 */}
          <div className="inline-flex items-center justify-center mb-5 text-center text-white rounded-lg shadow-lg">
            <img
              src={imgSrc}
              className="align-middle w-full rounded-lg"
              alt={imgAlt ?? title}
            />
          </div>
          <H4 variant="secondary">{title}</H4>
          <div className="mb-4 mt-2 text-gray-500">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default CardSquareImg
