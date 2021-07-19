export default function Categories({ categories }) {
  return (
    <span className="ml-1">
      in
      {categories.edges.length > 0 ? (
        categories.edges.map((category, index) => (
          <span key={index} className="ml-2 text-gray-600">
            {category.node.name}
          </span>
        ))
      ) : (
        <span className="ml-1">{categories.edges.node.name}</span>
      )}
    </span>
  );
}
