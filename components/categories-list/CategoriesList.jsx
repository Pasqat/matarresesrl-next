import clsx from 'clsx'

export default function CategoriesList({categories, onClick, currentCategory}) {
  if (!categories) {
    return (
      <div className="flex items-center justify-center mb-4">
        <i className="fas fa-circle-notch text-gray-400 text-2xl animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center text-gray-800 text-sm font-medium">
      {categories.map(category => (
        <button
          className={clsx(
            'm-1 p-1 shadow-sm cursor-pointer',
            currentCategory === category.categoryId
              ? 'bg-yellow-500 text-white font-semibold'
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
          'm-1 p-1 shadow-sm cursor-pointer',
          currentCategory === null
            ? 'bg-gray-900 text-white font-semibold'
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
