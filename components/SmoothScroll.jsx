// Scorrimento fluido Lenis su tutto il sito, legato al ticker di GSAP perché ScrollTrigger resti
// allineato. Con movimento ridotto non parte. Le finestre sovrapposte (Dialog) vogliono
// `data-lenis-prevent`, altrimenti la rotella fa scorrere la pagina sotto: menu mobile,
// visore della galleria, modal di contatto (ContactModal).
import {useEffect} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({lerp: 0.1, autoRaf: false, anchors: true})
    lenis.on('scroll', ScrollTrigger.update)
    const raf = t => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [])
  return null
}
