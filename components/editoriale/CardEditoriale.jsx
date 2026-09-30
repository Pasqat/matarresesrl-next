// Card di progetto/articolo coerente con home/ProjectGrid: al passaggio la foto si avvicina
// e attorno si disegna il riquadro (disegno/Riquadro). `tone="dark"` per le sezioni ghisa.
import Image from 'next/image'
import Link from 'next/link'
import Riquadro from '../disegno/Riquadro'

export default function CardEditoriale({
  href,
  image,
  title,
  meta,
  aspect = 'aspect-[5/4]',
  as: Heading = 'h3',
  tone = 'light',
  sizes = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
}) {
  const dark = tone === 'dark'
  return (
    <Link href={href} className="group block">
      <div className={`relative ${aspect}`}>
        <div
          className={`absolute inset-0 overflow-hidden ${
            dark ? 'bg-grafite' : 'bg-inox'
          }`}
        >
          {image?.src && (
            <Image
              src={image.src}
              alt={image.alt || ''}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
            />
          )}
        </div>
        <Riquadro className={dark ? 'text-fiamma' : 'text-fiamma-testo'} />
      </div>
      {meta && (
        <p
          className={`mt-5 text-sm ${
            dark ? 'text-inox-muted' : 'text-acciaio'
          }`}
        >
          {meta}
        </p>
      )}
      <Heading
        className={`type-display mt-2 text-[22px] leading-tight transition-colors lg:text-2xl ${
          dark ? 'group-hover:text-fiamma' : 'group-hover:text-fiamma-testo'
        }`}
        dangerouslySetInnerHTML={{__html: title}}
      />
    </Link>
  )
}
