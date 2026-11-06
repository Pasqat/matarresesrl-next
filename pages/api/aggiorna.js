// Il pannello chiama qui dopo ogni salvataggio: le pagine toccate si rigenerano subito invece di
// aspettare i 5 minuti (e una visita) dell'ISR. Body: {voci: ['eventi/slug', 'articoli/slug',
// 'realizzazioni/slug', 'sito']}; chiave in Authorization: Bearer <SEGRETO_AGGIORNAMENTO>.
import {timingSafeEqual} from 'crypto'
import settori from '../../data/settori'
import {logStructuredError} from '../../lib/logging'

// rigenerare fino a una dozzina di pagine dal pannello può superare i 10 s predefiniti di Vercel
export const config = {maxDuration: 60}

const SETTORI = settori.filter(s => s.pagina).map(s => `/settori/${s.slug}`)

function pagineDa(voce) {
  const [tipo, slug] = String(voce).split('/')
  if (tipo === 'sito') return ['/', '/azienda', '/prodotti']
  if (!/^[a-z0-9_-]{1,200}$/.test(slug || '')) return []
  if (tipo === 'eventi') return ['/', '/eventi', `/eventi/${slug}`]
  if (tipo === 'articoli') return ['/', '/news', `/news/${slug}`, ...SETTORI]
  if (tipo === 'realizzazioni')
    return ['/', '/realizzazioni', `/realizzazioni/${slug}`, '/azienda', ...SETTORI]
  return []
}

const chiaveGiusta = req => {
  const atteso = Buffer.from(`Bearer ${process.env.SEGRETO_AGGIORNAMENTO || ''}`)
  const dato = Buffer.from(String(req.headers.authorization || ''))
  return (
    (process.env.SEGRETO_AGGIORNAMENTO || '').length >= 32 &&
    dato.length === atteso.length &&
    timingSafeEqual(dato, atteso)
  )
}

export default async function aggiorna(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!chiaveGiusta(req)) return res.status(401).json({errore: 'chiave'})
  const voci = Array.isArray(req.body?.voci) ? req.body.voci.slice(0, 50) : []
  const pagine = [...new Set(voci.flatMap(pagineDa))]
  const esiti = await Promise.allSettled(pagine.map(p => res.revalidate(p)))
  const fallite = pagine.filter((p, i) => esiti[i].status === 'rejected')
  // una pagina eliminata o mai esistita fallisce: non è un errore del pannello
  if (fallite.length)
    logStructuredError('aggiorna', new Error('rigenerazione non riuscita'), {fallite})
  return res.json({aggiornate: pagine.length - fallite.length, fallite})
}
