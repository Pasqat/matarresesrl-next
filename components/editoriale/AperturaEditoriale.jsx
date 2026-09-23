// Apertura dei dettagli editoriali (progetto, articolo, evento): fondo ghisa compatto con
// ritorno all'archivio, meta sobrie e titolo da WordPress; sotto, la copertina a cavallo
// tra scuro e chiaro. Da usare con <Layout navbarTransparent>.
import Image from 'next/image'
import Link from 'next/link'

export default function AperturaEditoriale({back, meta, title, children}) {
  return (
    <section
      className="bg-ghisa text-white [&_:focus-visible]:outline-fiamma"
      data-header="dark"
      aria-labelledby="page-title"
    >
      <div className="site-shell pb-14 pt-32 lg:pb-20 lg:pt-40">
        {back && (
          <Link
            href={back.href}
            className="inline-block border-b border-inox/40 py-1 text-sm text-inox transition-colors hover:border-white hover:text-white"
          >
            {back.label}
          </Link>
        )}
        {meta && <div className="mt-10 text-inox-muted">{meta}</div>}
        <h1
          id="page-title"
          className="type-display mt-4 max-w-[22ch] hyphens-auto text-[clamp(32px,4.6vw,72px)] [overflow-wrap:break-word]"
          dangerouslySetInnerHTML={{__html: title}}
        />
        {children}
      </div>
    </section>
  )
}

// Copertina a tutta larghezza del contenitore, metà sul ghisa e metà sul bianco.
// `contain` per le locandine degli eventi, che hanno il testo dentro l'immagine.
export function Copertina({image, contain = false}) {
  if (!image?.src) return null
  return (
    <section
      className="bg-[linear-gradient(to_bottom,var(--ghisa)_50%,#fff_50%)]"
      data-header="dark"
      aria-label="Immagine in evidenza"
    >
      <div
        className={`site-shell relative overflow-hidden ${
          contain
            ? 'aspect-[2/1] bg-grafite'
            : 'aspect-[4/3] bg-inox md:aspect-[16/9]'
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt || ''}
          fill
          preload
          fetchPriority="high"
          sizes="(min-width: 1536px) 1536px, 100vw"
          className={contain ? 'object-contain' : 'object-cover'}
        />
      </div>
    </section>
  )
}
