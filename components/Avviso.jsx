// Avviso scritto nel pannello Kirby (Chiusure e avvisi): barra in basso, letta dal browser così
// una modifica si vede subito. Sparisce dopo la data «fino al» o quando il visitatore la chiude.
import {useEffect, useState} from 'react'
import Link from 'next/link'
import {KIRBY_URL, kirby} from '../lib/kirby'

const CHIUSO = 'avviso-chiuso'

export default function Avviso() {
  const [avviso, setAvviso] = useState(null)
  useEffect(() => {
    if (!KIRBY_URL) return
    kirby('sito')
      .then(({avviso: a}) => {
        const oggi = new Date().toLocaleDateString('sv-SE', {
          timeZone: 'Europe/Rome',
        })
        let chiuso = null
        try {
          chiuso = sessionStorage.getItem(CHIUSO)
        } catch {}
        if (a?.testo && (!a.fino || oggi <= a.fino) && chiuso !== a.testo)
          setAvviso(a)
      })
      .catch(() => {})
  }, [])
  if (!avviso) return null
  const chiudi = () => {
    try {
      sessionStorage.setItem(CHIUSO, avviso.testo)
    } catch {}
    setAvviso(null)
  }
  return (
    <aside className="cin-avviso" aria-label="Avviso">
      <p>
        {avviso.testo}
        {avviso.link && (
          <>
            {' '}
            <Link href={avviso.link}>Dettagli</Link>
          </>
        )}
      </p>
      <button type="button" onClick={chiudi} aria-label="Chiudi l’avviso">
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </button>
    </aside>
  )
}
