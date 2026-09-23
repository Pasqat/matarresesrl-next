// Il contenuto si sposta leggermente verso il cursore (solo mouse, niente movimento ridotto).
import {useRef} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP)

export default function Magnetic({
  children,
  strength = 0.3,
  className = 'inline-block',
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const el = ref.current
          const x = gsap.quickTo(el, 'x', {duration: 0.5, ease: 'power3.out'})
          const y = gsap.quickTo(el, 'y', {duration: 0.5, ease: 'power3.out'})
          const move = e => {
            const r = el.getBoundingClientRect()
            x((e.clientX - r.left - r.width / 2) * strength)
            y((e.clientY - r.top - r.height / 2) * strength)
          }
          const leave = () => {
            x(0)
            y(0)
          }
          el.addEventListener('pointermove', move)
          el.addEventListener('pointerleave', leave)
          return () => {
            el.removeEventListener('pointermove', move)
            el.removeEventListener('pointerleave', leave)
          }
        },
      )
      return () => mm.revert()
    },
    {scope: ref},
  )

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  )
}
