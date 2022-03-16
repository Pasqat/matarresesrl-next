import clsx from 'clsx'

export default function Categories({categories}) {
  const colors = {
    'dGVybTozNTk=': 'bg-red-100',
    'dGVybTozNjE=': 'bg-yellow-100',
    'dGVybTozNTg=': 'bg-green-100',
    'dGVybTozNjM=': 'bg-blue-100',
    'dGVybTozNjI=': 'bg-gray-100',
    'dGVybTozNjA=': 'bg-indigo-100',
    'dGVybTo2NA==': 'bg-purple-100',
    'dGVybTozNTc=': 'bg-pink-100',
  }

  return (
    <span className="text-xs font-medium">
      {categories.edges.map(category => {
        let color = colors[category.node.id]

        return (
          <span
            key={category.node.id}
            className={clsx(
              category.node.id && `cursor-pointer ${color}`,
              'ml-1 cursor-pointer text-gray-500',
            )}
          >
            {category.node.name.toUpperCase()}
          </span>
        )
      })}
    </span>
  )
}
