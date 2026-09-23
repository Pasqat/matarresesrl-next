// Card di progetto/articolo coerente con home/ProjectGrid: al passaggio la foto si avvicina
// e dal basso sale la fascia con l'invito. `tone="dark"` per le sezioni ghisa.
import Image from 'next/image'
import Link from 'next/link'

export default function CardEditoriale({
  href,
  image,
  title,
  meta,
  cta,
  aspect = 'aspect-[5/4]',
  as: Heading = 'h3',
  tone = 'light',
  sizes = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
}) {
  const dark = tone === 'dark'
  return (
    <Link href={href} className="group block">
      <div
        className={`relative overflow-hidden ${
          dark ? 'bg-grafite' : 'bg-inox'
        } ${aspect}`}
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
        <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-ghisa/85 px-5 py-4 text-sm text-white backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
          {cta}
          <span aria-hidden="true" className="text-fiamma">
            ↗
          </span>
        </span>
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
