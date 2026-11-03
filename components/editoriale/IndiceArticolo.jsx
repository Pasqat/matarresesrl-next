// Colonne laterali degli articoli: indice dai sottotitoli del testo (con la voce in lettura
// accesa) e linea d'avanzamento. Leggono il DOM dell'articolo dopo il montaggio: i contenuti
// arrivano da WordPress come HTML.
import {useEffect, useState} from 'react'

const slug = t =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// `mobile`: lo stesso indice in un <details> chiuso sopra il testo
export function IndiceArticolo({contenitore, mobile = false}) {
  const [voci, setVoci] = useState([])
  const [attiva, setAttiva] = useState(null)

  useEffect(() => {
    const root = contenitore.current
    if (!root) return
    // il livello dei sottotitoli: h2, o h3 se l'articolo ne ha meno di due (molti da WordPress)
    const h2 = root.querySelectorAll('h2')
    const titoli = [...(h2.length >= 2 ? h2 : root.querySelectorAll('h3'))]
    titoli.forEach((h, i) => {
      if (!h.id) h.id = slug(h.textContent) || `sezione-${i + 1}`
      h.style.scrollMarginTop = '112px'
    })
    setVoci(titoli.map(h => ({id: h.id, testo: h.textContent.trim()})))
    // la voce accesa è l'ultimo sottotitolo passato sopra un terzo dello schermo
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => e.isIntersecting && setAttiva(e.target.id)),
      {rootMargin: '0px 0px -66% 0px'},
    )
    titoli.forEach(h => io.observe(h))
    return () => io.disconnect()
  }, [contenitore])

  if (voci.length < 2) return null
  const elenco = (
    <ol>
      {voci.map(v => (
        <li key={v.id}>
          <a
            href={`#${v.id}`}
            aria-current={attiva === v.id ? 'location' : undefined}
          >
            {v.testo}
          </a>
        </li>
      ))}
    </ol>
  )
  if (mobile)
    return (
      <details className="cin-indice cin-indice--mobile">
        <summary>In questo articolo</summary>
        {elenco}
      </details>
    )
  return (
    <nav aria-label="In questo articolo" className="cin-indice">
      <p>In questo articolo</p>
      {elenco}
    </nav>
  )
}

export function Avanzamento({contenitore}) {
  const [quota, setQuota] = useState(0)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const r = contenitore.current?.getBoundingClientRect()
      if (!r) return
      const fatto = (window.innerHeight / 2 - r.top) / r.height
      setQuota(Math.min(1, Math.max(0, fatto)))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, {passive: true})
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
    }
  }, [contenitore])
  return (
    <div className="cin-avanzamento" aria-hidden="true">
      <span style={{transform: `scaleY(${quota})`}} />
    </div>
  )
}
