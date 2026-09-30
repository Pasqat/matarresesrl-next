// Ultime realizzazioni su fondo chiaro: da lg campate 7+5 / 5+7 alla stessa altezza; al passaggio
// la foto si avvicina e attorno si disegna il riquadro (disegno/Riquadro).
import Image from 'next/image'
import Link from 'next/link'
import Riquadro from '../disegno/Riquadro'

const SPAN = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

export default function ProjectGrid({projects}) {
  return (
    <ul className="mt-14 grid gap-x-6 gap-y-14 lg:grid-cols-12">
      {projects.slice(0, 4).map((project, i) => {
        const node = project.featuredImage?.node
        const src = node?.mediaItemUrl || node?.sourceUrl
        const span = SPAN[i % SPAN.length]
        return (
          <li key={project.slug} className={span}>
            <Link href={`/realizzazioni/${project.slug}`} className="group block">
              <div className="relative aspect-[3/2] lg:h-[30vw] lg:[aspect-ratio:auto]">
                <div className="absolute inset-0 overflow-hidden bg-inox">
                  {src && (
                    <Image
                      src={src}
                      alt={node.altText || ''}
                      fill
                      sizes={`(min-width: 1024px) ${span.endsWith('7') ? 58 : 42}vw, 100vw`}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  )}
                </div>
                <Riquadro className="text-fiamma-testo" />
              </div>
              <h3
                className="type-display mt-5 text-2xl transition-colors group-hover:text-fiamma-testo"
                dangerouslySetInnerHTML={{__html: project.title}}
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
