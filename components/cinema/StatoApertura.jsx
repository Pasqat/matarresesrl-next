// «Aperto ora / Chiuso» dagli orari della sede (lun–ven 9–13 e 15–18:30, ora italiana).
// Calcolato solo nel browser dopo il montaggio: l'HTML statico non può sapere l'ora della visita.
import {useEffect, useState} from 'react'

const FASCE = [
  [9 * 60, 13 * 60],
  [15 * 60, 18 * 60 + 30],
]
const hhmm = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`

export function stato(data) {
  const parti = Object.fromEntries(
    new Intl.DateTimeFormat('it-IT', {
      timeZone: 'Europe/Rome',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    })
      .formatToParts(data)
      .map(p => [p.type, p.value]),
  )
  const feriale = !['sab', 'dom'].includes(parti.weekday)
  const ora = Number(parti.hour) * 60 + Number(parti.minute)
  const fascia = feriale && FASCE.find(([a, b]) => ora >= a && ora < b)
  if (fascia)
    return {aperto: true, testo: `Aperto ora · chiude alle ${hhmm(fascia[1])}`}
  const prossima = feriale && FASCE.find(([a]) => ora < a)
  return {
    aperto: false,
    testo: prossima
      ? `Chiuso · riapre alle ${hhmm(prossima[0])}`
      : 'Chiuso ora',
  }
}

export default function StatoApertura() {
  const [s, setS] = useState(null)
  useEffect(() => {
    setS(stato(new Date()))
    const t = setInterval(() => setS(stato(new Date())), 60000)
    return () => clearInterval(t)
  }, [])
  if (!s) return null
  return (
    <span className={`cin-stato ${s.aperto ? 'is-aperto' : ''}`}>
      {s.testo}
    </span>
  )
}
