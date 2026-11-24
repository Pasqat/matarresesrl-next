// Ultime realizzazioni su fondo chiaro: da lg campate 7+5 / 5+7 alla stessa altezza; card a raggio
// ampio (DESIGN.md), al passaggio la foto si avvicina lenta.
import {useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SPAN = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
]

export default function ProjectGrid({projects}) {
  // Foto solo quando la griglia è a 600 px dallo schermo: sono originali da 2000 px (250 KiB) e su rete
  // lenta Chrome anticipa le lazy di ~2500 px, rubando banda all'apertura. Fino ad allora resta il fondo inox.
  const lista = useRef(null)
  const [vicina, setVicina] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setVicina(true)
        io.disconnect()
      },
      {rootMargin: '600px 0px'},
    )
    io.observe(lista.current)
    return () => io.disconnect()
  }, [])
  return (
    <ul ref={lista} className="mt-14 grid gap-x-6 gap-y-14 lg:grid-cols-12">
      {projects.slice(0, 4).map((project, i) => {
        const node = project.featuredImage?.node
        const src = node?.mediaItemUrl || node?.sourceUrl
        const span = SPAN[i % SPAN.length]
        return (
          <li key={project.slug} className={span}>
            <Link
              href={`/realizzazioni/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-[3/2] lg:h-[30vw] lg:[aspect-ratio:auto]">
                <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-inox">
                  {src && vicina && (
                    // sotto lg la scheda è larga quanto lo schermo: basta la copia da 800 px del pannello
                    <picture>
                      {node.url800 && (
                        <source
                          media="(max-width: 1023px)"
                          srcSet={node.url800}
                        />
                      )}
                      <Image
                        src={src}
                        alt={node.altText || ''}
                        fill
                        sizes={`(min-width: 1024px) ${
                          span.endsWith('7') ? 58 : 42
                        }vw, 100vw`}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
                        style={{transitionDuration: '1200ms'}}
                      />
                    </picture>
                  )}
                </div>
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
