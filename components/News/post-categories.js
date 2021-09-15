import clsx from "clsx";
import { colors } from "../../ui/category-color"

export default function Categories({ categories }) {
  return (
    <span className="ml-1 text-sm font-semibold">
      {categories.edges.length > 0 ? (
        categories.edges.map((category, index) => {

          console.log(category.node.id, category.node.name)
          let color = colors[category.node.id]

          return (
            <span key={index} className={clsx(category.node.id && color,
              'text-gray-600 cursor-pointer')}>
              {category.node.name.toUpperCase()}
            </span>
          );
        })
      ) : (
        <span className={clsx(category.node.id && color, "ml-1 text-gray-600 cursor-pointer")}>{categories.edges.node.name.toUpperCase()}</span>
      )}
    </span>
  );
}
