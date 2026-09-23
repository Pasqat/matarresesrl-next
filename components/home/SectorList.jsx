// Elenco dei settori: col mouse, una foto del settore segue il cursore e cambia riga per riga.
// Su touch o con movimento ridotto la foto compare come miniatura accanto alla voce.
import {useRef, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP)

export default function SectorList({settori, href}) {
  const root = useRef(null)
  const preview = useRef(null)
  const [active, setActive] = useState(null)
  const [enabled, setEnabled] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          setEnabled(true)
          const el = preview.current
          gsap.set(el, {
            xPercent: -50,
            yPercent: -50,
            autoAlpha: 0,
            scale: 0.85,
          })
          const x = gsap.quickTo(el, 'x', {duration: 0.6, ease: 'power3.out'})
          const y = gsap.quickTo(el, 'y', {duration: 0.6, ease: 'power3.out'})
          const list = root.current
          const move = e => {
            x(e.clientX)
            y(e.clientY)
          }
          const enter = e => {
            gsap.set(el, {x: e.clientX, y: e.clientY})
            gsap.to(el, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.35,
              ease: 'power2.out',
            })
          }
          const leave = () => {
            gsap.to(el, {
              autoAlpha: 0,
              scale: 0.85,
              duration: 0.3,
              ease: 'power2.in',
            })
            setActive(null)
          }
          list.addEventListener('pointermove', move)
          list.addEventListener('pointerenter', enter)
          list.addEventListener('pointerleave', leave)
          return () => {
            setEnabled(false)
            list.removeEventListener('pointermove', move)
            list.removeEventListener('pointerenter', enter)
            list.removeEventListener('pointerleave', leave)
          }
        },
      )
      return () => mm.revert()
    },
    {scope: root},
  )

  return (
    <div className="relative">
      <ul ref={root}>
        {settori.map(s => (
          <li key={s.slug} className="border-t border-ghisa/15 last:border-b">
            <Link
              href={href(s)}
              onPointerEnter={() => setActive(s.slug)}
              onFocus={() => setActive(s.slug)}
              className="group flex items-center gap-5 py-5 md:py-6"
            >
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-3">
                  {s.inEvidenza && (
                    <span
                      className="h-2 w-2 shrink-0 bg-fiamma"
                      aria-hidden="true"
                    />
                  )}
                  <span className="type-display block text-[clamp(22px,2.6vw,40px)] transition-transform duration-500 ease-out group-hover:translate-x-3 group-focus-visible:translate-x-3 motion-reduce:transition-none">
                    {s.nome}
                  </span>
                </span>
                {s.frase && (
                  <span className="mt-2 block max-w-[52ch] text-acciaio transition-transform delay-75 duration-500 ease-out group-hover:translate-x-3 motion-reduce:transition-none">
                    {s.frase}
                  </span>
                )}
              </span>
              {!enabled && (
                <span className="relative hidden aspect-[4/3] w-24 shrink-0 overflow-hidden bg-inox md:block">
                  <Image
                    src={s.foto}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </span>
              )}
              <span
                aria-hidden="true"
                className="shrink-0 text-2xl text-fiamma-testo opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Anteprima che segue il cursore: fuori dal flusso, non intercetta il mouse. */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 aspect-[4/3] w-[min(30vw,420px)] overflow-hidden bg-ghisa"
        style={{visibility: 'hidden'}}
      >
        {enabled &&
          settori.map(s => (
            <Image
              key={s.slug}
              src={s.foto}
              alt=""
              fill
              sizes="420px"
              className={`object-cover transition-[opacity,transform] duration-500 ease-out ${
                active === s.slug
                  ? 'scale-100 opacity-100'
                  : 'scale-110 opacity-0'
              }`}
            />
          ))}
      </div>
    </div>
  )
}
