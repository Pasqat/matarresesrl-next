// Ultime realizzazioni: sopra le foto un cerchio "Scopri" segue il cursore (solo mouse).
import {useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP)

export default function ProjectGrid({projects}) {
  const root = useRef(null)
  const bubble = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const el = bubble.current
          gsap.set(el, {xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 1})
          const x = gsap.quickTo(el, 'x', {duration: 0.45, ease: 'power3.out'})
          const y = gsap.quickTo(el, 'y', {duration: 0.45, ease: 'power3.out'})
          const media = gsap.utils.toArray('[data-project-media]', root.current)
          const move = e => {
            x(e.clientX)
            y(e.clientY)
          }
          const show = e => {
            gsap.set(el, {x: e.clientX, y: e.clientY})
            gsap.to(el, {scale: 1, duration: 0.35, ease: 'back.out(1.6)'})
          }
          const hide = () =>
            gsap.to(el, {scale: 0, duration: 0.25, ease: 'power2.in'})
          window.addEventListener('pointermove', move, {passive: true})
          media.forEach(m => {
            m.addEventListener('pointerenter', show)
            m.addEventListener('pointerleave', hide)
          })
          return () => {
            window.removeEventListener('pointermove', move)
            media.forEach(m => {
              m.removeEventListener('pointerenter', show)
              m.removeEventListener('pointerleave', hide)
            })
          }
        },
      )
      return () => mm.revert()
    },
    {scope: root},
  )

  return (
    <div ref={root} className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
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
              data-project-media
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
            </div>
            <h3
              className="type-display mt-5 text-2xl transition-colors group-hover:text-fiamma-testo"
              dangerouslySetInnerHTML={{__html: project.title}}
            />
          </Link>
        )
      })}
      <span
        ref={bubble}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 grid h-24 w-24 place-items-center rounded-full bg-fiamma text-sm font-medium text-ghisa"
        style={{visibility: 'hidden'}}
      >
        Scopri
      </span>
    </div>
  )
}
