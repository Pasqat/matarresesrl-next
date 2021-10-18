import {H4} from '../typography'

/**
 * @param textColor "text-white"
 * @param bgColor "text-yellow-600"
 */
function CardBigImg({
  textColor = 'text-white',
  bgColor = 'bg-gradient-to-t from-green-500 to-blue-500',
  imgSrc,
  imgAlt,
  title = 'title',
  content,
  children,
  noSlope,
}) {
  const polygonColor = bgColor.replace('bg', 'text')

  return (
    <div className="ml-auto mr-auto mt-8 px-4 w-full md:w-4/12">
      <div
        className={`relative flex flex-col w-full min-w-0 mb-6 break-words rounded-lg shadow-lg ${bgColor}`}
      >
        <img
          alt={imgAlt ?? title}
          src={imgSrc}
          className="align-middle w-full rounded-t-lg"
        />
        <blockquote className="relative mb-4 p-8">
          {!noSlope && (
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 583 95"
              className="h-[95px] top-[-94px] absolute left-0 block w-full"
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
