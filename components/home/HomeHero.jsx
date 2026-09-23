// Apertura della home: sequenza di foto dei lavori che si danno il cambio "a lamelle"
// (le doghe dei banconi, i filtri delle cappe). Unico momento orchestrato della pagina (DESIGN.md).
// Pausa accessibile; si ferma fuori schermo o a scheda nascosta; con prefers-reduced-motion
// resta la prima foto e il cambio è istantaneo.
import {useCallback, useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'
import Magnetic from '../Magnetic'

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP, ScrollTrigger)

const SLATS = 7
const DURATION = 6 // secondi per foto
const KEN_BURNS = 1.06

// Su schermi verticali la foto 3:2 in object-cover è molto più larga del viewport.
const SIZES = '(max-aspect-ratio: 3/2) 150vh, 100vw'

function Photo({slide, priority, className, imgRef, onLoad}) {
  return (
    <Image
      ref={imgRef}
      src={slide.src}
      alt=""
      fill
      preload={priority}
      fetchPriority={priority ? 'high' : undefined}
      sizes={SIZES}
      quality={75}
      className={className}
      style={{objectPosition: slide.position || '50% 50%'}}
      onLoad={onLoad}
    />
  )
}

export default function HomeHero({slides, title, intro, primary, secondary}) {
  const root = useRef(null)
  const base = useRef(null)
  const strips = useRef(null)
  const [index, setIndex] = useState(0)
  const [next, setNext] = useState(null)
  const [playing, setPlaying] = useState(true)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const [reduced, setReduced] = useState(false)
  const [ready, setReady] = useState(false) // prima foto caricata: ora si può precaricare la successiva
  const upcomingImg = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Fermo quando l'apertura non si vede o la scheda è nascosta.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.2,
    })
    io.observe(root.current)
    const onVis = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const go = useCallback(
    async target => {
      if (next !== null || target === index) return
      if (reduced) return setIndex(target)
      // Decodifica prima del cambio: niente strisce vuote al primo fotogramma.
      if (target === (index + 1) % slides.length)
        await upcomingImg.current?.decode?.().catch(() => {})
      setNext(target)
    },
    [index, next, reduced, slides.length],
  )

  const running = playing && inView && pageVisible && !reduced && next === null

  // Avanzamento automatico.
  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => go((index + 1) % slides.length), DURATION * 1000)
    return () => clearTimeout(t)
  }, [running, index, go, slides.length])

  // Zoom lento della foto corrente.
  useGSAP(
    () => {
      if (reduced) return
      gsap.fromTo(
        base.current,
        {scale: KEN_BURNS},
        {scale: 1, duration: DURATION + 1.5, ease: 'none'},
      )
    },
    {dependencies: [index, reduced], scope: root, revertOnUpdate: true},
  )

  // Cambio a lamelle: le strisce della foto successiva entrano alternando alto e basso.
  useGSAP(
    () => {
      if (next === null) return
      const els = strips.current.children
      gsap.fromTo(
        els,
        {clipPath: i => clip(i, i % 2 ? '100%' : '0%', i % 2 ? '0%' : '100%')},
        {
          clipPath: i => clip(i, '0%', '0%'),
          duration: 0.9,
          ease: 'power3.inOut',
          stagger: {each: 0.07, from: 'start'},
          onComplete: () => {
            setIndex(next)
            setNext(null)
          },
        },
      )
    },
    {dependencies: [next], scope: root},
  )

  // Leggero parallasse della foto mentre si scorre via dall'apertura.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('[data-hero-media]', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
      return () => mm.revert()
    },
    {scope: root},
  )

  // Col mouse: una luce morbida segue il cursore e la foto si sposta appena in profondità.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const el = root.current
          const light = {x: 0.7, y: 0.4}
          const paint = () => {
            el.style.setProperty('--mx', `${light.x * 100}%`)
            el.style.setProperty('--my', `${light.y * 100}%`)
          }
          const lx = gsap.quickTo(light, 'x', {
            duration: 0.8,
            ease: 'power3.out',
            onUpdate: paint,
          })
          const ly = gsap.quickTo(light, 'y', {
            duration: 0.8,
            ease: 'power3.out',
            onUpdate: paint,
          })
          const tx = gsap.quickTo('[data-hero-depth]', 'x', {
            duration: 1.2,
            ease: 'power3.out',
          })
          const ty = gsap.quickTo('[data-hero-depth]', 'y', {
            duration: 1.2,
            ease: 'power3.out',
          })
          const move = e => {
            const r = el.getBoundingClientRect()
            const px = (e.clientX - r.left) / r.width
            const py = (e.clientY - r.top) / r.height
            lx(px)
            ly(py)
            tx((0.5 - px) * 24)
            ty((0.5 - py) * 16)
          }
          el.addEventListener('pointermove', move)
          return () => el.removeEventListener('pointermove', move)
        },
      )
      return () => mm.revert()
    },
    {scope: root},
  )

  const current = slides[index]
  const shown = slides[next ?? index]
  const upcoming = slides[(index + 1) % slides.length]

  return (
    <section
      ref={root}
      className="relative isolate flex max-h-[1100px] min-h-[640px] flex-col justify-end overflow-hidden bg-ghisa text-white"
      style={{height: '100svh'}}
      aria-labelledby="home-title"
      data-header="dark"
    >
      <div data-hero-media className="absolute inset-0 -z-10">
        <div data-hero-depth className="absolute -inset-6">
          <div
            ref={base}
            className="absolute inset-0"
            style={{transform: reduced ? undefined : `scale(${KEN_BURNS})`}}
          >
            <Photo
              slide={current}
              priority={index === 0}
              className="object-cover"
              onLoad={() => setReady(true)}
            />
          </div>
          {next !== null && (
            <div
              ref={strips}
              className="absolute inset-0"
              style={{transform: `scale(${KEN_BURNS})`}}
            >
              {Array.from({length: SLATS}, (_, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{clipPath: clip(i, '100%', '0%')}}
                >
                  <Photo slide={slides[next]} className="object-cover" />
                </div>
              ))}
            </div>
          )}
          {/* Precarica la foto successiva solo dopo che la prima è arrivata. */}
          {!reduced && ready && (
            <div className="invisible absolute inset-0" aria-hidden="true">
              <Photo
                slide={upcoming}
                className="object-cover"
                imgRef={upcomingImg}
              />
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(30_34_38/.9)_0%,rgb(30_34_38/.55)_50%,rgb(30_34_38/.1)_100%),linear-gradient(0deg,rgb(30_34_38/.85)_0%,transparent_45%),linear-gradient(180deg,rgb(30_34_38/.7)_0%,transparent_22%)]" />
        <div
          className="absolute inset-0 mix-blend-soft-light [@media(hover:none)]:hidden"
          style={{
            background:
              'radial-gradient(560px circle at var(--mx, 70%) var(--my, 40%), rgb(255 255 255 / 0.55), transparent 65%)',
          }}
        />
      </div>

      <div className="site-shell pb-8 pt-36 lg:pb-10">
        <h1
          id="home-title"
          className="type-display max-w-[15ch] text-[clamp(40px,6.6vw,116px)]"
        >
          {title}
        </h1>
        <p className="mt-7 max-w-[48ch] text-lg text-inox lg:text-xl">
          {intro}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Magnetic>
            <Link
              href={primary.href}
              className="inline-flex min-h-[52px] items-center bg-fiamma px-7 font-medium text-ghisa transition-colors hover:bg-white focus-visible:outline-white"
            >
              {primary.label}
            </Link>
          </Magnetic>
          <Link
            href={secondary.href}
            className="border-b border-inox/60 py-2 text-white transition-colors hover:border-white"
          >
            {secondary.label}
          </Link>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-inox/25 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-inox" aria-live="off">
            <span className="text-white">{shown.caption}</span>
            <span className="text-inox-muted"> — {shown.kind}</span>
          </p>
          {slides.length > 1 && (
            <div className="flex items-center gap-4">
              <ol className="flex gap-2" aria-label="Foto dell'apertura">
                {slides.map((s, i) => (
                  <li key={s.src}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Mostra ${s.caption}`}
                      aria-current={i === (next ?? index) ? 'true' : undefined}
                      className="group block py-3"
                    >
                      <span className="block h-0.5 w-8 overflow-hidden bg-inox/30 md:w-12">
                        <span
                          key={`${index}-${running}`}
                          className={`block h-full origin-left bg-fiamma ${
                            i === (next ?? index)
                              ? 'hero-progress'
                              : 'scale-x-0'
                          } ${
                            i === (next ?? index) && !running
                              ? '[animation-play-state:paused]'
                              : ''
                          } ${
                            reduced && i === index ? '![animation:none]' : ''
                          }`}
                          style={{'--hero-duration': `${DURATION}s`}}
                        />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setPlaying(p => !p)}
                  className="min-h-[44px] min-w-[44px] text-sm text-inox underline-offset-4 hover:text-white hover:underline"
                  aria-pressed={!playing}
                >
                  {playing ? 'Pausa' : 'Riprendi'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// clip-path della striscia i: visibile solo nella sua colonna, con inset verticale top/bottom.
function clip(i, top, bottom) {
  const w = 100 / SLATS
  const left = (i * w).toFixed(3)
  const right = Math.max(0, 100 - (i + 1) * w - 0.1).toFixed(3) // 0.1% di sovrapposizione: niente fessure
  return `inset(${top} ${right}% ${bottom} ${left}%)`
}
