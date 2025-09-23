import {logStructuredError} from '../../lib/logging'
import {escapeHtml} from '../../lib/security'
// maybeCreateOdooLead ora usa XML-RPC per invio lead
import {maybeCreateOdooLead} from '../../lib/odoo'

// Serverless endpoint to receive contact form submissions and send email via Resend
// Simple in-memory rate limiter (per-process). Not suitable as sole protection in multi-instance
// deployments — consider Redis/Upstash for production. Configurable via env:
// RATE_LIMIT_MAX (default 10) requests per RATE_LIMIT_WINDOW (default 60 seconds)
const rateStore = new Map()

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({error: 'Method not allowed'})

  const {
    referente,
    senderMail,
    tel,
    company,
    formContent,
    indirizzo,
    honeypot,
    source,
  } = req.body || {}

  // Rate limiting
  try {
    const ip =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
    const windowSec = parseInt(process.env.RATE_LIMIT_WINDOW || '60', 10)
    const max = parseInt(process.env.RATE_LIMIT_MAX || '10', 10)
    const now = Date.now()
    const entry = rateStore.get(ip) || {count: 0, start: now}
    if (now - entry.start > windowSec * 1000) {
      entry.count = 0
      entry.start = now
    }
    entry.count += 1
    rateStore.set(ip, entry)
    if (entry.count > max) {
      // Too many requests from this IP in the window
      return res.status(429).json({error: 'Too many requests'})
    }
  } catch (err) {
    logStructuredError('rate-limit', err)
  }

  // Simple honeypot anti-spam
  if (honeypot) {
    // Pretend success to bots
    return res.status(200).json({ok: true})
  }

  // Validation based on source
  if (source === 'assistenza') {
    // For assistenza: all fields required
    if (!referente || !senderMail || !formContent || !tel || !company || !indirizzo) {
      return res.status(400).json({error: 'Campi obbligatori mancanti per richiesta di assistenza'})
    }
  } else {
    // For homepage, modal-contact, modal-reservation: Nome, Messaggio required; at least one of email or tel
    if (!referente || !formContent) {
      return res.status(400).json({error: 'Nome e Messaggio sono obbligatori'})
    }
    if (!senderMail && !tel) {
      return res
        .status(400)
        .json({error: 'Inserisci almeno uno tra email o telefono'})
    }
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (senderMail && !emailRegex.test(senderMail)) {
    return res.status(400).json({error: 'Email non valida'})
  }

  // Build email body (sanitization: keep simple text/html)
  // Build email template based on source
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
    `
  } else {
    html = `
      <h3>Nuovo contatto da ${escapeHtml(referente)}</h3>
      <p><strong>Email:</strong> ${escapeHtml(senderMail)}</p>
      <p><strong>Telefono:</strong> ${escapeHtml(tel || '-')}</p>
      <p><strong>Azienda:</strong> ${escapeHtml(company || '-')}</p>
      <p><strong>Messaggio:</strong></p>
      <div>${escapeHtml(formContent).replace(/\n/g, '<br/>')}</div>
    `
  }

  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      logStructuredError('resend', new Error('RESEND_API_KEY not configured'))
      return res.status(500).json({error: 'Server configuration error'})
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
        subject: `Nuovo contatto da ${referente}`,
        html,
      }),
    })

    if (!r.ok) {
      const payload = await r.text().catch(() => '')
      logStructuredError('resend', new Error('Resend error'), {
        status: r.status,
        payload,
      })
      return res.status(502).json({error: "Errore nell'invio email"})
    }

  // Optionally create a lead in Odoo via XML-RPC. Make failures blocking if ODOO_MUST_SYNC === 'true'
    if (process.env.ODOO_ENABLED === 'true') {
      try {
        console.log('[API] Invio dati a Odoo:', {
          referente,
          senderMail,
          tel,
          company,
          formContent,
        })
        await maybeCreateOdooLead({
          referente,
          senderMail,
          tel,
          company,
          formContent,
        })
        console.log('[API] Invio a Odoo completato')
      } catch (err) {
        logStructuredError('maybeCreateOdooLead', err)
        console.error('[API] Errore invio Odoo:', err)
        if (process.env.ODOO_MUST_SYNC === 'true') {
          // Treat Odoo failure as blocking: surface 502 to client
          return res.status(502).json({error: 'Errore sincronizzazione CRM'})
        }
        // Otherwise just log and continue
      }
    }

    return res.status(200).json({ok: true})
  } catch (err) {
    logStructuredError('api-contact-outer', err)
    return res.status(500).json({error: 'Server error'})
  }
}
