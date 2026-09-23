// Progetti o articoli correlati in fondo ai dettagli: capitolo scuro con tre card.
import Link from 'next/link'
import CardEditoriale from './CardEditoriale'

export default function Correlati({title, link, items, cta}) {
  if (!items?.length) return null
  return (
    <section
      className="bg-ghisa text-white [&_:focus-visible]:outline-fiamma"
      data-header="dark"
      aria-labelledby="correlati-title"
    >
      <div className="site-shell py-24 lg:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            id="correlati-title"
            className="type-display text-[clamp(30px,3.4vw,52px)]"
          >
            {title}
          </h2>
          {link && (
            <Link
              href={link.href}
              className="shrink-0 self-start border-b border-inox/60 py-2 text-inox hover:text-white md:self-auto"
            >
              {link.label}
            </Link>
          )}
        </div>
        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.href} className={i === 1 ? 'md:mt-16' : ''}>
              <CardEditoriale
                {...item}
                cta={cta}
                tone="dark"
                aspect={i === 1 ? 'aspect-[4/5]' : 'aspect-[5/4]'}
                sizes="(min-width: 640px) 30vw, 100vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
