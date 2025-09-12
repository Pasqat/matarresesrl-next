// Structured logging for Odoo errors
function logOdooError(context, err, extra = {}) {
  const ts = new Date().toISOString()
  console.error(
    JSON.stringify({
      ts,
      level: 'error',
      system: 'odoo-sync',
      context,
      message: err && err.message ? err.message : String(err),
      stack: err && err.stack,
      ...extra,
    }),
  )
}
// pages/api/contact.js
// Serverless endpoint to receive contact form submissions and send email via Resend
// Simple in-memory rate limiter (per-process). Not suitable as sole protection in multi-instance
// deployments — consider Redis/Upstash for production. Configurable via env:
// RATE_LIMIT_MAX (default 10) requests per RATE_LIMIT_WINDOW (default 60 seconds)
const rateStore = new Map()

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({error: 'Method not allowed'})

  const {referente, senderMail, tel, company, formContent, honeypot} =
    req.body || {}

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

  // Basic validation
  if (!referente || !senderMail || !formContent) {
    return res.status(400).json({error: 'Campi mancanti'})
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(senderMail)) {
    return res.status(400).json({error: 'Email non valida'})
  }

  // Build email body (sanitization: keep simple text/html)
  const html = `
    <h3>Nuovo contatto da ${escapeHtml(referente)}</h3>
    <p><strong>Email:</strong> ${escapeHtml(senderMail)}</p>
    <p><strong>Telefono:</strong> ${escapeHtml(tel || '-')}</p>
    <p><strong>Azienda:</strong> ${escapeHtml(company || '-')}</p>
    <p><strong>Messaggio:</strong></p>
    <div>${escapeHtml(formContent).replace(/\n/g, '<br/>')}</div>
  `

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

    // Optionally create a lead in Odoo. Make failures blocking if ODOO_MUST_SYNC === 'true'
    if (process.env.ODOO_ENABLED === 'true') {
      try {
        await maybeCreateOdooLead({
          referente,
          senderMail,
          tel,
          company,
          formContent,
        })
      } catch (err) {
        logStructuredError('maybeCreateOdooLead', err)
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
    // Structured logging for errors (importable)
    function logStructuredError(context, err, extra = {}) {
      const ts = new Date().toISOString()
      // eslint-disable-next-line no-console
      console.error(
        JSON.stringify({
          ts,
          level: 'error',
          system: 'api-contact',
          context,
          message: err && err.message ? err.message : String(err),
          stack: err && err.stack,
          ...extra,
        }),
      )
    }
    return res.status(500).json({error: 'Server error'})
  }
}

function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
// Optional: create a lead in Odoo if configured
async function maybeCreateOdooLead({
  referente,
  senderMail,
  tel,
  company,
  formContent,
}) {
  if (process.env.ODOO_ENABLED !== 'true') return
  // fetch with retry/backoff for Odoo calls
  async function fetchWithRetry(url, opts = {}, attempts = null) {
    const maxAttempts =
      attempts ?? parseInt(process.env.ODOO_RETRY_MAX || '3', 10)
    const base = parseInt(process.env.ODOO_RETRY_BASE_MS || '200', 10)

    for (let i = 0; i < maxAttempts; i++) {
      try {
        const r = await fetch(url, opts)
        if (!r.ok && r.status >= 500 && i < maxAttempts - 1) {
          // server error, retry
          throw new Error(`Server error ${r.status}`)
        }
        return r
      } catch (err) {
        const backoff = Math.floor(base * Math.pow(2, i))
        // jitter: +/- 50%
        const jitter = Math.floor(backoff * (Math.random() - 0.5))
        const wait = Math.max(0, backoff + jitter)
        if (i === maxAttempts - 1) throw err
        await new Promise(r => setTimeout(r, wait))
      }
    }
  }
  try {
    const url = process.env.ODOO_URL // e.g. https://odoo.example.com/jsonrpc
    const db = process.env.ODOO_DB
    const user = process.env.ODOO_USER
    const pass = process.env.ODOO_PASS
    if (!url || !db || !user || !pass) {
      logOdooError(
        'config',
        new Error('Odoo configured but missing credentials'),
      )
      return
    }

    // Authenticate
    let authRes
    try {
      authRes = await fetchWithRetry(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'common',
            method: 'login',
            args: [db, user, pass],
          },
          id: Math.floor(Math.random() * 100000),
        }),
      })
    } catch (err) {
      logOdooError('auth', err, {user})
      throw err
    }
    const authJson = await authRes.json().catch(() => ({}))
    const uid = authJson.result
    if (!uid) {
      logOdooError('auth', new Error('Odoo auth failed'), {authJson})
      throw new Error('Odoo auth failed')
    }

    // helper: search or create tag 'sitoweb-form'
    async function searchOrCreateTag(tagName) {
      try {
        // search for existing tag by name
        const searchRes = await fetchWithRetry(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'call',
            params: {
              service: 'object',
              method: 'execute_kw',
              args: [
                db,
                uid,
                pass,
                'crm.lead.tag',
                'search',
                [[['name', '=', tagName]]],
              ],
            },
            id: Math.floor(Math.random() * 100000),
          }),
        })
        const searchJson = await searchRes.json().catch(() => ({}))
        const ids = searchJson.result || []
        if (ids.length > 0) return ids[0]

        // create tag
        const createTagRes = await fetchWithRetry(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'call',
            params: {
              service: 'object',
              method: 'execute_kw',
              args: [
                db,
                uid,
                pass,
                'crm.lead.tag',
                'create',
                [{name: tagName}],
              ],
            },
            id: Math.floor(Math.random() * 100000),
          }),
        })
        const createTagJson = await createTagRes.json().catch(() => ({}))
        return createTagJson.result || null
      } catch (err) {
        logOdooError('tag', err, {tagName})
        throw err
      }
    }

    // Create lead
    // ensure we have the tag id for 'sitoweb-form'
    let tagId = null
    try {
      tagId = await searchOrCreateTag('sitoweb-form')
    } catch (err) {
      logOdooError('tag', err, {tagName: 'sitoweb-form'})
      throw err
    }

    let createRes
    try {
      createRes = await fetchWithRetry(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'object',
            method: 'execute_kw',
            args: [
              db,
              uid,
              pass,
              'crm.lead',
              'create',
              [
                {
                  name: referente,
                  contact_name: referente,
                  email_from: senderMail,
                  phone: tel,
                  description: formContent,
                  company_name: company,
                  tag_ids: tagId ? [[6, 0, [tagId]]] : undefined,
                },
              ],
            ],
          },
          id: Math.floor(Math.random() * 100000),
        }),
      })
    } catch (err) {
      logOdooError('create-lead', err, {referente, senderMail, company})
      throw err
    }
    const createJson = await createRes.json().catch(() => ({}))
    if (!createJson.result) {
      logOdooError('create-lead', new Error('Odoo create lead failed'), {
        createJson,
        referente,
        senderMail,
        company,
      })
      throw new Error('Odoo create lead failed')
    }
  } catch (err) {
    logOdooError('odoo-outer', err)
    throw err
  }
}
