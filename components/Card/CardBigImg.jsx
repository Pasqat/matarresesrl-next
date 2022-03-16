import {H4} from '../typography'

/**
 * @param textColor "text-white"
 * @param bgColor "text-yellow-600"
 */
function CardBigImg({
  textColor = 'text-black',
  bgColor = 'bg-gray-100',
  imgSrc,
  imgAlt,
  title = 'title',
  content,
  children,
  noSlope,
}) {
  const polygonColor = bgColor.replace('bg', 'text')

  return (
    <div className="mt-8 mr-auto ml-auto w-full px-4 md:w-4/12">
      <div
        className={`relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg ${bgColor}`}
      >
        <img
          alt={imgAlt ?? title}
          src={imgSrc}
          className="w-full rounded-t-lg align-middle"
        />
        <blockquote className="relative mb-4 p-8">
          {!noSlope && (
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 583 95"
              className="absolute left-0 top-[-94px] block h-[95px] w-full"
            >
              <polygon
                points="-30,95 583,95 583,65"
                className={`fill-current ${polygonColor}`}
              ></polygon>
            </svg>
          )}
          <H4 className={`${textColor}`}>{title}</H4>
          <p className={`mt-2 font-light ${textColor} text-md`}>{content}</p>
        </blockquote>
        {children}
      </div>
    </div>
  )
}

export default CardBigImg
