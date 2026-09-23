// Righe di categorie con foto: al passaggio la foto si avvicina appena e una linea fiamma
// percorre il filetto superiore. Niente link: le schede sono informative.
import Image from 'next/image'

export default function PhotoCards({items, dark = false, className = ''}) {
  return (
    <ul
      className={`grid gap-x-8 gap-y-14 md:grid-cols-2 ${
        items.length > 2 ? 'lg:grid-cols-3' : ''
      } ${className}`}
    >
      {items.map(item => (
        <li key={item.nome} className="group">
          <div className="relative aspect-[4/3] overflow-hidden bg-grafite">
            {item.foto && (
              <Image
                src={item.foto}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            )}
          </div>
          <div
            className={`relative mt-6 border-t pt-6 ${
              dark ? 'border-inox/25' : 'border-ghisa/15'
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute -top-px left-0 h-px w-0 transition-[width] duration-700 ease-out group-hover:w-full motion-reduce:transition-none ${
                dark ? 'bg-fiamma' : 'bg-fiamma-testo'
              }`}
            />
            <h3 className="type-display text-[clamp(22px,2vw,28px)] leading-tight">
              {item.nome}
            </h3>
            <p
              className={`mt-4 max-w-[52ch] ${
                dark ? 'text-inox-muted' : 'text-acciaio'
              }`}
            >
              {item.testo}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
