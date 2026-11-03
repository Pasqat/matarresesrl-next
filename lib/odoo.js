import {logStructuredError} from './logging'


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
  // source non più usato
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

    // Gli ID di tag e sorgente sono configurabili via env vars (con fallback ai valori
    // dell'istanza Odoo attuale). Il modello crm.lead.tag non è accessibile via XML-RPC
    // su Odoo Online, quindi si imposta tag_ids con l'ID noto.
    const tagId = parseInt(process.env.ODOO_TAG_ID || '14', 10)
    const sourceId = parseInt(process.env.ODOO_SOURCE_ID || '11', 10)
    const leadVals = {
      name: `Siteweb LEAD ${referente}`,
      contact_name: referente,
      email_from: senderMail,
      phone: tel || false,
      description: formContent,
      partner_name: company || false,
      tag_ids: [[6, 0, [tagId]]],
      source_id: sourceId,
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
  } catch (err) {
    logStructuredError('odoo-lead', err)
    throw err
  }
}
