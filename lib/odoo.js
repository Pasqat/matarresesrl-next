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
  const apiKey = process.env.ODOO_API_KEY

  if (!url || !db || (!apiKey && (!user || !pass))) {
    logStructuredError(
      'odoo-config',
      new Error('Odoo configured but missing credentials'),
    )
    throw new Error('Odoo configuration incomplete')
  }

  try {
    console.log('[Odoo] Parametri invio:', {
      url, db, user, pass, apiKey,
      referente, senderMail, tel, company, formContent
    })
    let uid = null;
    let authHeaders = {'Content-Type': 'application/json'};
    let passwordToUse = pass;
    // Se è presente la API key, usala come password
    if (apiKey) {
      passwordToUse = apiKey;
    }
    // Authenticate via username/password o API key
    const authRes = await fetchWithRetry(`${url}/web/session/authenticate`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          service: 'common',
          method: 'login',
          args: [db, user, passwordToUse],
        },
        id: Math.floor(Math.random() * 100000),
      }),
    });
    const authJson = await authRes.json().catch(() => ({}));
    uid = authJson.result;
    if (!uid) {
      logStructuredError('odoo-auth', new Error('Odoo auth failed'), {
        authJson,
      });
      throw new Error('Odoo auth failed');
    }

    // Get tag ID
    const tagId = await searchOrCreateTag(
      url,
      db,
      uid,
      passwordToUse,
      'sitoweb-form',
      null,
    );
    console.log('[Odoo] Tag ID trovato/creato:', tagId)

    // Create lead
    const leadPayload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [
          db,
          uid,
          passwordToUse,
          'crm.lead',
          'create',
          [
            {
              name: `Richiesta da ${referente}`,
              contact_name: referente,
              email_from: senderMail,
              phone: tel || false,
              description: formContent,
              display_name: company || false,
              tag_ids: tagId ? [[6, 0, [tagId]]] : undefined,
            },
          ],
        ],
      },
      id: Math.floor(Math.random() * 100000),
    };
    console.log('[Odoo] Payload lead:', leadPayload);
    const createRes = await fetchWithRetry(url, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(leadPayload),
    });

    const raw = await createRes.text();
    console.log('[Odoo] Risposta raw:', raw);
    let createJson;
    try {
      createJson = JSON.parse(raw);
    } catch (e) {
      console.error('[Odoo] Errore parsing JSON:', e, raw);
      throw e;
    }
    console.log('[Odoo] Risposta creazione lead:', createJson);
    if (!createJson.result) {
      throw new Error('Odoo create lead failed');
    }
  } catch (err) {
    logStructuredError('odoo-lead', err)
    throw err
  }
}
