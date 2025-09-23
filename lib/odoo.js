import {logStructuredError} from './logging'

// Utility for exponential backoff
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Fetch with retry/backoff
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

// Search or create a tag in Odoo
async function searchOrCreateTag(url, db, uid, pass, tagName, apiKey = null) {
  try {
    let headers = {'Content-Type': 'application/json'}
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
    }
    // search for existing tag by name
    const searchRes = await fetchWithRetry(url, {
      method: 'POST',
      headers,
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
    if (ids && ids.length > 0) return ids[0]

    // create tag
    const createTagRes = await fetchWithRetry(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          service: 'object',
          method: 'execute_kw',
          args: [db, uid, pass, 'crm.lead.tag', 'create', [{name: tagName}]],
        },
        id: Math.floor(Math.random() * 100000),
      }),
    })
    const createTagJson = await createTagRes.json().catch(() => ({}))
    return createTagJson.result || null
  } catch (err) {
    logStructuredError('odoo-tag', err, {tagName})
    throw err
  }
}

/**
 * Try to create a lead in Odoo via XML-RPC
 * Uses env vars:
 * - ODOO_URL: Odoo XML-RPC endpoint (e.g. https://odoo.example.com)
 * - ODOO_DB: Database name
 * - ODOO_USER: Username
 * - ODOO_API_KEY: API key
 */
import xmlrpc from 'xmlrpc'

export async function maybeCreateOdooLead({
  referente,
  senderMail,
  tel,
  company,
  formContent,
  source, // nome pagina opzionale
}) {
  if (process.env.ODOO_ENABLED !== 'true') return

  const url = process.env.ODOO_URL // e.g. https://odoo.example.com
  const db = process.env.ODOO_DB
  const user = process.env.ODOO_USER
  const apiKey = process.env.ODOO_API_KEY

  if (!url || !db || !user || !apiKey) {
    logStructuredError(
      'odoo-config',
      new Error('Odoo configured but missing credentials'),
    )
    throw new Error('Odoo configuration incomplete')
  }

  // xmlrpc client
  const common = xmlrpc.createClient({
    url: `${url}/xmlrpc/2/common`,
  })
  const object = xmlrpc.createClient({
    url: `${url}/xmlrpc/2/object`,
  })

  // Helper to promisify xmlrpc calls
  function xmlrpcCall(client, method, params) {
    return new Promise((resolve, reject) => {
      client.methodCall(method, params, (err, value) => {
        if (err) reject(err)
        else resolve(value)
      })
    })
  }

  try {
    // Authenticate
    const uid = await xmlrpcCall(common, 'authenticate', [db, user, apiKey, {}])
    if (!uid) {
      logStructuredError('odoo-auth', new Error('Odoo auth failed'), {uid})
      throw new Error('Odoo auth failed')
    }

    // Usa direttamente il tag ID 14 (sitoweb-form)
    // Nota: il modello crm.lead.tag non è accessibile via XML-RPC su Odoo Online,
    // quindi si imposta esplicitamente il tag_ids con l'ID noto.
    const page = source ? String(source).replace(/[^\w-]/g, '_') : 'unknown';
    const leadVals = {
      name: `Siteweb LEAD ${page} ${referente}`,
      contact_name: referente,
      email_from: senderMail,
      phone: tel || false,
      description: formContent,
      display_name: company || false,
      tag_ids: [[6, 0, [14]]], // Tag 'sitoweb-form' (ID 14) impostato esplicitamente
    }
    const leadId = await xmlrpcCall(object, 'execute_kw', [
      db,
      uid,
      apiKey,
      'crm.lead',
      'create',
      [leadVals],
    ])
    if (!leadId) {
      throw new Error('Odoo create lead failed')
    }
    console.log('[Odoo] Lead creato con ID:', leadId)
  } catch (err) {
    logStructuredError('odoo-lead', err)
    throw err
  }
}
