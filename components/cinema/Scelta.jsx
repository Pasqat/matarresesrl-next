// Filtro a pillola che apre un pannello di opzioni (al posto del <select> del browser).
// Si chiude con Esc, con un clic fuori o scegliendo; con un valore scelto la pillola diventa piena.
import {useEffect, useRef, useState} from 'react'
import clsx from 'clsx'

export default function Scelta({label, tutti, opzioni, valore, onChange}) {
  const [aperto, setAperto] = useState(false)
  const root = useRef(null)

  useEffect(() => {
    if (!aperto) return
    const fuori = e => !root.current?.contains(e.target) && setAperto(false)
    const esc = e => {
      if (e.key !== 'Escape') return
      setAperto(false)
      root.current?.querySelector('button')?.focus()
    }
    document.addEventListener('pointerdown', fuori)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', fuori)
      document.removeEventListener('keydown', esc)
    }
  }, [aperto])

  const scegli = v => {
    onChange(v)
    setAperto(false)
    // il pannello sparisce col focus dentro: lo riportiamo sul pulsante, come fa Esc
    root.current?.querySelector('button')?.focus()
  }

  return (
    <div ref={root} className="cin-scelta">
      <button
        type="button"
        className={clsx('cin-pill', valore && 'is-on')}
        aria-expanded={aperto}
        onClick={() => setAperto(a => !a)}
      >
        {valore || label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m2 4 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {aperto && (
        <div className="cin-scelta__pannello" role="group" aria-label={label}>
          <button
            type="button"
            aria-pressed={!valore}
            onClick={() => scegli('')}
          >
            {tutti}
          </button>
          {opzioni.map(o => (
            <button
              key={o}
              type="button"
              aria-pressed={valore === o}
              onClick={() => scegli(o)}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
