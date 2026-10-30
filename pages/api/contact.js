import {logStructuredError} from '../../lib/logging'
import {escapeHtml} from '../../lib/security'
// maybeCreateOdooLead ora usa XML-RPC per invio lead
import {maybeCreateOdooLead} from '../../lib/odoo'

// Serverless endpoint to receive contact form submissions and send email via Resend.
// Rate limiter in memoria: vale per singola istanza serverless (su Vercel ogni istanza ha il suo
// contatore), quindi frena i ripetuti dallo stesso client ma non è una protezione completa: per
// quella serve uno store condiviso (Upstash/Redis). Configurabile via env:
// RATE_LIMIT_MAX (default 10) richieste per RATE_LIMIT_WINDOW (default 60 secondi).
const rateStore = new Map()
const RATE_STORE_MAX = 5000

// Lunghezza massima di ogni campo: oltre, la richiesta viene rifiutata.
const LIMITS = {
  referente: 120,
  senderMail: 254,
  tel: 40,
  company: 160,
  indirizzo: 240,
  settore: 80,
  formContent: 5000,
  source: 40,
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const telRegex = /^[+\d][\d\s().\-/]{5,}$/

function clientIp(req) {
  // Su Vercel x-real-ip è impostato dalla piattaforma; x-forwarded-for può essere una lista.
  const real = req.headers['x-real-ip']
  if (typeof real === 'string' && real) return real.trim()
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

function isRateLimited(ip) {
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW || '60', 10) * 1000
  const max = parseInt(process.env.RATE_LIMIT_MAX || '10', 10)
  const now = Date.now()
  if (rateStore.size > RATE_STORE_MAX) {
    for (const [key, entry] of rateStore) {
      if (now - entry.start > windowMs) rateStore.delete(key)
    }
  }
  const entry = rateStore.get(ip) || {count: 0, start: now}
  if (now - entry.start > windowMs) {
    entry.count = 0
    entry.start = now
  }
  entry.count += 1
  rateStore.set(ip, entry)
  return entry.count > max
}

// Richieste solo dal sito stesso: un Origin diverso dall'host è un altro sito che posta qui.
function isForeignOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return false
  try {
    return new URL(origin).host !== req.headers.host
  } catch {
    return true
  }
}

// Ogni campo deve essere testo (o assente) e restare nei limiti.
function readFields(body) {
  const out = {}
  for (const [name, max] of Object.entries(LIMITS)) {
    const value = body[name]
    if (value === undefined || value === null) {
      out[name] = ''
      continue
    }
    if (typeof value !== 'string') return {error: `Campo non valido: ${name}`}
    const trimmed = value.trim()
    if (trimmed.length > max) return {error: `Testo troppo lungo: ${name}`}
    out[name] = trimmed
  }
  return {fields: out}
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({error: 'Metodo non consentito'})
  }

  if (isForeignOrigin(req)) {
    return res.status(403).json({error: 'Richiesta non consentita'})
  }

  try {
    if (isRateLimited(clientIp(req))) {
      return res
        .status(429)
        .json({error: 'Troppe richieste ravvicinate: riprova tra un minuto.'})
    }
  } catch (err) {
    logStructuredError('rate-limit', err)
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}

  // Honeypot anti-spam: ai bot rispondiamo come se fosse andata bene
  if (body.honeypot) {
    return res.status(200).json({ok: true})
  }

  const {fields, error} = readFields(body)
  if (error) return res.status(400).json({error})
  const {
    referente,
    senderMail,
    tel,
    company,
    indirizzo,
    settore,
    formContent,
    source,
  } = fields

  if (body.privacy !== true) {
    return res
      .status(400)
      .json({error: 'Serve il consenso al trattamento dei dati.'})
  }

  if (source === 'assistenza') {
    if (
      !referente ||
      !senderMail ||
      !formContent ||
      !tel ||
      !company ||
      !indirizzo
    ) {
      return res.status(400).json({
        error: 'Compila tutti i campi della richiesta di assistenza.',
      })
    }
  } else {
    if (!referente || !formContent) {
      return res.status(400).json({error: 'Nome e messaggio sono obbligatori.'})
    }
    if (!senderMail && !tel) {
      return res
        .status(400)
        .json({error: 'Inserisci almeno uno tra email e telefono.'})
    }
  }

  if (senderMail && !emailRegex.test(senderMail)) {
    return res.status(400).json({error: 'Email non valida.'})
  }
  if (tel && !telRegex.test(tel)) {
    return res.status(400).json({error: 'Numero di telefono non valido.'})
  }

  // Le iscrizioni agli eventi arrivano solo per email: non sono opportunità per il CRM.
  const iscrizioneEvento = source === 'modal-prenotazione'

  const consenso = `Consenso privacy dato dal modulo del sito il ${new Date().toLocaleString(
    'it-IT',
    {timeZone: 'Europe/Rome'},
  )}`

  let html
  if (source === 'assistenza') {
    html = `
      <h3>Nuova richiesta di assistenza da ${escapeHtml(referente)}</h3>
      <p><strong>Ragione Sociale:</strong> ${escapeHtml(company)}</p>
      <p><strong>Indirizzo:</strong> ${escapeHtml(indirizzo)}</p>
      <p><strong>Email:</strong> ${escapeHtml(senderMail)}</p>
      <p><strong>Telefono:</strong> ${escapeHtml(tel)}</p>
      <p><strong>Referente:</strong> ${escapeHtml(referente)}</p>
      <p><strong>Descrizione del problema:</strong></p>
      <div>${escapeHtml(formContent).replace(/\n/g, '<br/>')}</div>
      <p><small>${escapeHtml(consenso)}</small></p>
    `
  } else {
    html = `
      <h3>Nuovo contatto da ${escapeHtml(referente)}</h3>
      <p><strong>Email:</strong> ${escapeHtml(senderMail || '-')}</p>
      <p><strong>Telefono:</strong> ${escapeHtml(tel || '-')}</p>
      <p><strong>Azienda:</strong> ${escapeHtml(company || '-')}</p>
      ${
        settore
          ? `<p><strong>Attività:</strong> ${escapeHtml(settore)}</p>`
          : ''
      }
      <p><strong>Modulo:</strong> ${escapeHtml(source || 'pagina')}</p>
      <p><strong>Messaggio:</strong></p>
      <div>${escapeHtml(formContent).replace(/\n/g, '<br/>')}</div>
      <p><small>${escapeHtml(consenso)}</small></p>
    `
  }

  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      logStructuredError('resend', new Error('RESEND_API_KEY not configured'))
      return res
        .status(500)
        .json({error: 'Invio non disponibile: chiamaci al 080 4323 431.'})
    }

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'no-reply@yourdomain.com',
        to: process.env.CONTACT_TO || 'sales@yourdomain.com',
        // Niente a capo nell'oggetto: è un'intestazione della mail.
        subject: `${
          iscrizioneEvento ? 'Iscrizione a un evento' : 'Nuovo contatto'
        } da ${referente.replace(/[\r\n]+/g, ' ')}`,
        ...(senderMail ? {reply_to: senderMail} : {}),
        html,
      }),
    })

    if (!r.ok) {
      const payload = await r.text().catch(() => '')
      logStructuredError('resend', new Error('Resend error'), {
        status: r.status,
        payload,
      })
      return res.status(502).json({
        error: 'Invio non riuscito: riprova o chiamaci al 080 4323 431.',
      })
    }

    // Optionally create a lead in Odoo via XML-RPC. Make failures blocking if ODOO_MUST_SYNC === 'true'
    if (process.env.ODOO_ENABLED === 'true' && !iscrizioneEvento) {
      try {
        await maybeCreateOdooLead({
          referente,
          senderMail,
          tel,
          company,
          formContent: [
            settore && `Attività: ${settore}`,
            formContent,
            consenso,
          ]
            .filter(Boolean)
            .join('\n\n'),
          source,
        })
      } catch (err) {
        logStructuredError('maybeCreateOdooLead', err)
        if (process.env.ODOO_MUST_SYNC === 'true') {
          return res.status(502).json({error: 'Errore sincronizzazione CRM'})
        }
      }
    }

    return res.status(200).json({ok: true})
  } catch (err) {
    logStructuredError('api-contact-outer', err)
    return res.status(500).json({
      error: 'Invio non riuscito: riprova o chiamaci al 080 4323 431.',
    })
  }
}
