// Archivio a rivista (styles/cinema.css, .cin-rivista): gruppi da cinque, uno grande e quattro
// attorno. Tutte le voci restano nell'HTML; a schermo se ne vedono `visibili`.
import Image from 'next/image'
import Link from 'next/link'

export default function GrigliaRivista({items, visibili = items.length}) {
  return (
    <ul className="cin-rivista">
      {items.map((it, i) => (
        <li key={it.href} hidden={i >= visibili}>
          <Link href={it.href}>
            {it.image?.src && (
              <Image
                src={it.image.src}
                alt={it.image.alt || ''}
                fill
                // la prima di ogni gruppo da cinque occupa metà riga
                sizes={
                  i % 5 === 0
                    ? '(min-width: 1024px) 50vw, 100vw'
                    : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
                }
              />
            )}
            <span className="cin-rivista__scrim" />
            <span className="cin-rivista__testo">
              {it.meta && <span className="cin-rivista__meta">{it.meta}</span>}
              <span
                className="cin-rivista__titolo"
                dangerouslySetInnerHTML={{__html: it.title}}
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
