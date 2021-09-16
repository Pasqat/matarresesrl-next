import clsx from "clsx";
import { colors } from "../../ui/category-color"

export default function Categories({ categories }) {
  return (
    <span className="ml-1 text-xs font-semibold">
      {categories.edges.length > 0 ? (
        categories.edges.map((category, index) => {

          let color = colors[category.node.id]

          return (
            <span key={index} className={clsx(category.node.id && color,
              'text-gray-500 cursor-pointer hover:underline')}>
              {category.node.name.toUpperCase()}
            </span>
          );
        })
      ) : (
        <span className={clsx("text-gray-500 text-sm cursor-pointer", category.node.id && colors[category.node.id])}>{categories.edges.node.name.toUpperCase()}</span>
      )}
    </span>
  );
}
