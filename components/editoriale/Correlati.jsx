// Progetti o articoli correlati in fondo ai dettagli: tre card, capitolo scuro o (`tono="chiaro"`) su carta.
import Link from 'next/link'
import CardEditoriale from './CardEditoriale'
import TitoloDueTempi from '../cinema/TitoloDueTempi'

export default function Correlati({
  title,
  accento,
  link,
  items,
  tono = 'scuro',
}) {
  if (!items?.length) return null
  const chiaro = tono === 'chiaro'
  return (
    <section
      className={
        chiaro
          ? 'bg-[var(--carta)] text-ghisa'
          : 'bg-[#121315] text-white [&_:focus-visible]:outline-fiamma'
      }
      data-header={chiaro ? 'light' : 'dark'}
      aria-labelledby="correlati-title"
    >
      <div className="site-shell py-24 lg:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <TitoloDueTempi
            id="correlati-title"
            tono={chiaro ? 'chiaro' : 'scuro'}
            riga={title}
            accento={accento}
            className="text-[clamp(32px,3.6vw,52px)] !leading-none"
          />
          {link && (
            <Link
              href={link.href}
              className={`shrink-0 self-start border-b py-2 md:self-auto ${
                chiaro
                  ? 'border-ghisa hover:text-fiamma-testo'
                  : 'border-inox/60 text-inox hover:text-white'
              }`}
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
                tone={chiaro ? 'light' : 'dark'}
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
