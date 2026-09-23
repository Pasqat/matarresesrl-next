// Il metodo come sequenza: a sinistra (desktop) titolo e indice delle fasi che resta fermo e
// segue la lettura, con una linea fiamma che avanza; a destra le fasi numerate.
// Su mobile e con prefers-reduced-motion: niente sticky né scrub, l'indice resta un elenco di link.
import {useRef, useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP, ScrollTrigger)

const num = i => String(i + 1).padStart(2, '0')

export default function MetodoFasi({id, title, intro, fasi, children}) {
  const root = useRef(null)
  const list = useRef(null)
  const bar = useRef(null)
  const [active, setActive] = useState(null) // null: nessun avanzamento (mobile o movimento ridotto)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          setActive(0)
          list.current.querySelectorAll(':scope > li').forEach((el, i) =>
            ScrollTrigger.create({
              trigger: el,
              start: 'top 55%',
              end: 'bottom 55%',
              onToggle: self => self.isActive && setActive(i),
            }),
          )
          gsap.fromTo(
            bar.current,
            {scaleY: 0},
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: list.current,
                start: 'top 55%',
                end: 'bottom 55%',
                scrub: true,
              },
            },
          )
          return () => setActive(null)
        },
      )
      return () => mm.revert()
    },
    {scope: root},
  )

  return (
    <section
      ref={root}
      id={id}
      className="bg-ghisa text-white [&_:focus-visible]:outline-fiamma"
      data-header="dark"
      aria-labelledby={`${id}-title`}
    >
      <div className="site-shell grid gap-14 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <div className="lg:top-28 lg:motion-safe:sticky">
            <h2
              id={`${id}-title`}
              className="type-display max-w-[14ch] text-[clamp(32px,3.6vw,56px)]"
            >
              {title}
            </h2>
            {intro && <p className="mt-6 max-w-[44ch] text-inox">{intro}</p>}

            <nav
              aria-label="Fasi del metodo"
              className="relative mt-12 hidden pl-6 lg:block"
            >
              <span
                className="absolute inset-y-0 left-0 w-px bg-inox/25"
                aria-hidden="true"
              />
              <span
                ref={bar}
                className={`absolute inset-y-0 left-0 w-px origin-top bg-fiamma ${
                  active === null ? 'opacity-0' : ''
                }`}
                aria-hidden="true"
              />
              <ol>
                {fasi.map((f, i) => (
                  <li key={f.id}>
                    <a
                      href={`#${f.id}`}
                      aria-current={active === i ? 'step' : undefined}
                      className={`flex gap-4 py-1.5 transition-colors duration-300 hover:text-white ${
                        active === i ? 'text-white' : 'text-inox-muted'
                      }`}
                    >
                      <span
                        className={`w-7 tabular-nums ${
                          active === i ? 'text-fiamma' : ''
                        }`}
                      >
                        {num(i)}
                      </span>
                      {f.titolo}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            {children && <div className="mt-10">{children}</div>}
          </div>
        </div>

        <ol ref={list} className="lg:col-span-7">
          {fasi.map((f, i) => (
            <li
              key={f.id}
              id={f.id}
              className="border-t border-inox/20 py-10 last:border-b lg:py-14"
            >
              <div className="flex gap-5 md:gap-10">
                <span
                  className="type-display w-10 shrink-0 text-2xl text-fiamma md:w-16 md:text-4xl"
                  aria-hidden="true"
                >
                  {num(i)}
                </span>
                <div className="min-w-0">
                  <h3
                    className={`type-display text-[clamp(22px,2.2vw,32px)] leading-tight transition-colors duration-500 ${
                      active === null || active === i
                        ? 'text-white'
                        : 'text-inox-muted'
                    }`}
                  >
                    {f.titolo}
                  </h3>
                  <div className="mt-5 max-w-prose space-y-4 text-inox-muted [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_strong]:font-medium [&_strong]:text-white">
                    {f.testo}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
