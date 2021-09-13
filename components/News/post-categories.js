export default function Categories({ categories }) {
  return (
    <span className="ml-1 text-sm font-semibold">
      {categories.edges.length > 0 ? (
        categories.edges.map((category, index) => (
          <span key={index} className="ml-3 text-gray-600 bg-blue-100 cursor-pointer">
            {category.node.name}
          </span>
        ))
      ) : (
        <span className="ml-1 text-gray-600 bg-blue-100 cursor-pointer">{categories.edges.node.name}</span>
      )}
    </span>
  );
}
