// Reveal leggero dei titoli di sezione (DESIGN.md): gli elementi con data-cin-reveal salgono
// quando entrano in vista. La classe js-cin su <html> li nasconde solo se il JS è attivo.
import {useEffect} from 'react'

export default function useRivela(ref) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    document.documentElement.classList.add('js-cin')
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (!e.isIntersecting) return
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }),
      {threshold: 0.15, rootMargin: '0px 0px -10% 0px'},
    )
    root.querySelectorAll('[data-cin-reveal]').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [ref])
}
