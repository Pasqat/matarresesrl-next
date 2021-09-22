export default function CategoriesList({ categories }) {
  const colors = {
    "dGVybTozNTk=": "bg-red-100",
    "dGVybTozNjE=": "bg-yellow-100",
    "dGVybTozNTg=": "bg-green-100",
    "dGVybTozNjM=": "bg-blue-100",
    "dGVybTozNjI=": "bg-gray-100",
    "dGVybTozNjA=": "bg-indigo-100",
    "dGVybTo2NA==": "bg-purple-100",
    "dGVybTozNTc=": "bg-pink-100",
    "dGVybTo2NA==": "bg-gray-200",
  };

  if (!categories) {
    return (
      <div className="flex justify-center items-center mb-4">
        <i className="fas fa-circle-notch text-gray-400 animate-spin text-2xl" />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center text-sm font-medium text-gray-800">
      {categories.map(category => <div className={`p-1 m-1 shadow-sm cursor-pointer bg-gray-200 text-gray-800`} key={category.id}>{category.name}</div>)}
    </div>
  )
}
