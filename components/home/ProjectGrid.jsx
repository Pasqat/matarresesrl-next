// Ultime realizzazioni: al passaggio la foto si avvicina e dal basso sale "Guarda il progetto".
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectGrid({projects}) {
  return (
    <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
      {projects.slice(0, 4).map((project, i) => {
        const node = project.featuredImage?.node
        const src = node?.mediaItemUrl || node?.sourceUrl
        return (
          <Link
            key={project.slug}
            href={`/realizzazioni/${project.slug}`}
            className={`group block ${i % 2 ? 'md:mt-28' : ''}`}
          >
            <div
              className={`relative overflow-hidden bg-inox ${
                i % 2 ? 'aspect-[4/5]' : 'aspect-[5/4]'
              }`}
            >
              {src && (
                <Image
                  src={src}
                  alt={node.altText || ''}
                  fill
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                />
              )}
              <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-ghisa/85 px-5 py-4 text-sm text-white backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
                Guarda il progetto
                <span aria-hidden="true" className="text-fiamma">
                  ↗
                </span>
              </span>
            </div>
            <h3
              className="type-display mt-5 text-2xl transition-colors group-hover:text-fiamma-testo"
              dangerouslySetInnerHTML={{__html: project.title}}
            />
          </Link>
        )
      })}
    </div>
  )
}
