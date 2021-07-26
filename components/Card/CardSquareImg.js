function CardSquareImg({ imgSrc, imgAlt, title, children, className }) {
  return (
    <div className={`w-full px-4 pt-6 text-center lg:pt-12 mb-8 ${className}`}>
      <div className="relative flex flex-col w-full min-w-0 break-words bg-white rounded-lg shadow-lg hover:shadow-xl ">
        <div className="flex-auto px-4 py-5">
          {/* TODO: use higher resolution image. Find them in ../uploads/2015/03 */}
          <div className="inline-flex items-center justify-center mb-5 text-center text-white rounded-lg shadow-lg">
            <img
              src={imgSrc}
              className="w-full align-middle rounded-lg"
              alt={imgAlt ?? title}
            />
          </div>
          <h6 className="text-xl font-semibold">{title}</h6>
          <div className="mt-2 mb-4 text-gray-500">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default CardSquareImg;
