import clsx from 'clsx'

export default function CategoriesList({categories, onClick, currentCategory}) {
  if (!categories) {
    return (
      <div className="mb-4 flex items-center justify-center">
        <i className="fas fa-circle-notch animate-spin text-2xl text-gray-400" />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center text-sm font-medium text-gray-800">
      {categories.map(category => (
        <button
          className={clsx(
            'm-1 cursor-pointer p-1 shadow-sm',
            currentCategory === category.categoryId
              ? 'bg-yellow-500 font-semibold text-white'
              : 'bg-gray-200 text-gray-700',
          )}
          key={category.id}
          onClick={() => onClick(category.categoryId)}
        >
          {category.name}
        </button>
      ))}
      <button
        className={clsx(
          'm-1 cursor-pointer p-1 shadow-sm',
          currentCategory === null
            ? 'bg-gray-900 font-semibold text-white'
            : 'bg-gray-200 text-gray-700',
        )}
        key="00000"
        onClick={() => onClick(null)}
      >
        Tutti
      </button>
    </div>
  )
}
