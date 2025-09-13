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
async function searchOrCreateTag(url, db, uid, pass, tagName) {
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
 * Try to create a lead in Odoo with retry/backoff
 * Uses env vars:
 * - ODOO_URL: Odoo JSON-RPC endpoint
 * - ODOO_DB: Database name
 * - ODOO_USER: Username
 * - ODOO_PASS: Password
 * - ODOO_RETRY_MAX: Max retries (default 3)
 * - ODOO_RETRY_BASE_MS: Base retry delay in ms (default 200)
 */
export async function maybeCreateOdooLead({
  referente,
  senderMail,
  tel,
  company,
  formContent,
}) {
  if (process.env.ODOO_ENABLED !== 'true') return

  const url = process.env.ODOO_URL // e.g. https://odoo.example.com/jsonrpc
  const db = process.env.ODOO_DB
  const user = process.env.ODOO_USER
  const pass = process.env.ODOO_PASS

  if (!url || !db || !user || !pass) {
    logStructuredError(
      'odoo-config',
      new Error('Odoo configured but missing credentials'),
    )
    throw new Error('Odoo configuration incomplete')
  }

  try {
    // Authenticate
    const authRes = await fetchWithRetry(`${url}/web/session/authenticate`, {
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

    const authJson = await authRes.json().catch(() => ({}))
    const uid = authJson.result
    if (!uid) {
      logStructuredError('odoo-auth', new Error('Odoo auth failed'), {authJson})
      throw new Error('Odoo auth failed')
    }

    // Get tag ID
    const tagId = await searchOrCreateTag(url, db, uid, pass, 'sitoweb-form')

    // Create lead
    const createRes = await fetchWithRetry(url, {
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
                name: `Richiesta da ${referente}`,
                contact_name: referente,
                email_from: senderMail,
                phone: tel || false,
                description: formContent,
                company_name: company || false,
                tag_ids: tagId ? [[6, 0, [tagId]]] : undefined,
              },
            ],
          ],
        },
        id: Math.floor(Math.random() * 100000),
      }),
    })

    const createJson = await createRes.json()
    if (!createJson.result) {
      throw new Error('Odoo create lead failed')
    }
  } catch (err) {
    logStructuredError('odoo-lead', err)
    throw err
  }
}
