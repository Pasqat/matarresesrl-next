// Griglia asimmetrica degli archivi: la colonna centrale scende e alterna le proporzioni,
// come le ultime realizzazioni in home. `render(item, aspect)` restituisce la card.
export default function GrigliaEditoriale({items, render, className = ''}) {
  return (
    <ul
      className={`grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {items.map((item, i) => (
        <li
          key={item.slug}
          className="md:max-lg:even:mt-24 lg:[&:nth-child(3n+2)]:mt-24"
        >
          {render(item, i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[5/4]')}
        </li>
      ))}
    </ul>
  )
}
