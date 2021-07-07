/**
 * @param textColor "text-white"
 * @param bgColor "text-yellow-600"
 */
function CardBigImg({
  textColor = 'text-white',
  bgColor = 'bg-yellow-600',
  imgSrc,
  imgAlt,
  title = 'title',
  content,
  children,
}) {
  const polygonColor = bgColor.replace('bg', 'text')

  return (
    <div className="w-full px-4 mt-8 ml-auto mr-auto md:w-4/12">
      <div
        className={`relative flex flex-col w-full min-w-0 mb-6 break-words rounded-lg shadow-lg ${bgColor}`}
      >
        <img
          alt={imgAlt ?? title}
          src={imgSrc}
          className="w-full align-middle rounded-t-lg"
        />
        <blockquote className="relative p-8 mb-4">
          <svg
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 583 95"
            className="absolute left-0 w-full block h-[95px] top-[-94px]"
          >
            <polygon
              points="-30,95 583,95 583,65"
              className={`fill-current ${polygonColor}`}
            ></polygon>
          </svg>
          <h4 className={`text-xl font-bold ${textColor}`}>{title}</h4>
          <p className={`mt-2 font-light ${textColor} text-md`}>{content}</p>
        </blockquote>
        {children}
      </div>
    </div>
  )
}

export default CardBigImg
