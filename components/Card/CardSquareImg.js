function CardSquareImg({ imgSrc, imgAlt, title, children }) {
  return (
    <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
      <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg hover:shadow-xl ">
        <div className="flex-auto px-4 py-5">
          {/* TODO: use higher resolution image. Find them in ../uploads/2015/03 */}
          <div className="inline-flex items-center justify-center mb-5 text-center text-white bg-yellow-500 rounded-lg shadow-lg">
            <img
              src={imgSrc}
              className="w-full align-middle rounded-lg"
              alt={imgAlt ?? title}
            />
          </div>
          <h6 className="text-xl font-semibold">{title}</h6>
          <p className="mt-2 mb-4 text-gray-500">{children}</p>
        </div>
      </div>
    </div>
  )
}

export default CardSquareImg
