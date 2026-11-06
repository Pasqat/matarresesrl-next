// «Aperto ora / Chiuso» dagli orari della sede (lun–ven 9–13 e 15–18:30, ora italiana), con
// festività nazionali, Pasquetta, patrono e chiusure di data/chiusure.js (o del pannello).
// Calcolato solo nel browser dopo il montaggio: l'HTML statico non può sapere l'ora della visita.
import {useEffect, useState} from 'react'
import {patrono, periodi as periodiFile} from '../../data/chiusure'
import {PANNELLO_URL, datiPannello} from '../../lib/pannello'

const FASCE = [
  [9 * 60, 13 * 60],
  [15 * 60, 18 * 60 + 30],
]
// Festività nazionali a data fissa, 'MM-GG'
const FESTE = [
  '01-01',
  '01-06',
  '04-25',
  '05-01',
  '06-02',
  '08-15',
  '11-01',
  '12-08',
  '12-25',
  '12-26',
]
const hhmm = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`

// Lunedì dell'Angelo: Pasqua (algoritmo di Gauss/Meeus) + 1 giorno, 'MM-GG'
function pasquetta(anno) {
  const a = anno % 19
  const b = Math.floor(anno / 100)
  const c = anno % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const mese = Math.floor((h + l - 7 * m + 114) / 31)
  const giorno = ((h + l - 7 * m + 114) % 31) + 1
  const lunedi = new Date(Date.UTC(anno, mese - 1, giorno + 1))
  return lunedi.toISOString().slice(5, 10)
}

const fmt = d => d.toLocaleDateString('it-IT', {day: 'numeric', month: 'long'})

export function stato(data, periodi = periodiFile) {
  const parti = Object.fromEntries(
    new Intl.DateTimeFormat('it-IT', {
      timeZone: 'Europe/Rome',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    })
      .formatToParts(data)
      .map(p => [p.type, p.value]),
  )
  const mmgg = `${parti.month}-${parti.day}`
  const iso = `${parti.year}-${mmgg}`
  const periodo = periodi.find(p => iso >= p.dal && iso <= p.al)
  if (periodo) {
    const fine = new Date(`${periodo.al}T12:00`)
    return {
      aperto: false,
      testo: `Chiuso per ${periodo.motivo || 'ferie'} fino al ${fmt(fine)}`,
    }
  }
  if (
    FESTE.includes(mmgg) ||
    mmgg === pasquetta(Number(parti.year)) ||
    (patrono && mmgg === patrono)
  )
    return {aperto: false, testo: 'Chiuso oggi · giorno festivo'}

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
    let periodi = periodiFile
    const aggiorna = () => setS(stato(new Date(), periodi))
    aggiorna()
    if (PANNELLO_URL)
      datiPannello('sito')
        .then(d => {
          periodi = d.chiusure
          aggiorna()
        })
        .catch(() => {})
    const t = setInterval(aggiorna, 60000)
    return () => clearInterval(t)
  }, [])
  if (!s) return null
  return (
    <span className={`cin-stato ${s.aperto ? 'is-aperto' : ''}`}>
      {s.testo}
    </span>
  )
}
