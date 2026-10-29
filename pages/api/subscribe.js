import crypto from 'crypto'
import {logStructuredError} from '../../lib/logging'
import {newsletterGroups} from '../../data/newsletter-groups'

// Iscrizione alla newsletter su Mailchimp (pubblico "All contacts").
// Il settore scelto nel form va sia nel campo "Settore" (MMERGE5) sia nel tag
// omonimo: gli invii si filtrano con l'uno o con l'altro.
const API_KEY = process.env.MAILCHIMP_API_KEY
const LIST_ID = process.env.MAILCHIMP_LIST_ID
// La chiave finisce col datacenter (es. "...-us14"), che è anche l'host dell'API
const DC = (API_KEY || '').split('-').pop()
// Il consenso "Email" del pubblico (marketing permissions GDPR): la casella
// "Accetto il trattamento dei dati" del form lo dà
const PERMESSO_EMAIL = process.env.MAILCHIMP_PERMESSO_EMAIL || '68bc24cea4'
const SETTORI = new Set(newsletterGroups.map(g => g.id))
const ERRORE =
  "Si è verificato un errore durante l'iscrizione. Riprova più tardi."

async function mailchimp(path, method, body) {
  const response = await fetch(`https://${DC}.api.mailchimp.com/3.0${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`sito:${API_KEY}`).toString(
        'base64',
      )}`,
    },
    body: body && JSON.stringify(body),
  })
  const parsed = response.status === 204 ? {} : await response.json()
  return {status: response.status, parsed}
}

export default async function Subscribe(req, res) {
  const {email, name, groupId, company, honeypot} = req.body

  // Stesso campo trappola del form: un bot lo compila, una persona no
  if (honeypot) {
    return res.status(400).json({error: 'Richiesta non valida'})
  }

  const indirizzo = String(email || '').trim()
  if (!indirizzo) {
    return res.status(400).json({error: 'Email is required'})
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(indirizzo)) {
    return res.status(400).json({error: 'Formato email non valido'})
  }

  // Solo i settori del menu: dal browser non si creano tag nuovi
  if (!SETTORI.has(groupId)) {
    return res.status(400).json({error: 'Settore non valido'})
  }

  if (!API_KEY || !LIST_ID || !/^[a-z]+\d+$/.test(DC)) {
    logStructuredError('api-subscribe', new Error('Mailchimp non configurato'))
    return res.status(500).json({error: ERRORE})
  }

  const hash = crypto
    .createHash('md5')
    .update(indirizzo.toLowerCase())
    .digest('hex')
  const membro = `/lists/${LIST_ID}/members/${hash}`

  try {
    // Chi è già iscritto con altri settori li tiene: "Ristorante;Bar", come
    // negli import
    const prima = await mailchimp(membro, 'GET')
    const settori =
      (prima.status === 200 && prima.parsed.merge_fields?.MMERGE5) || ''
    const elenco = settori.split(';').filter(Boolean)
    const settore = elenco.includes(groupId)
      ? settori
      : [...elenco, groupId].join(';')

    // PUT è idempotente: un indirizzo già presente viene aggiornato, non
    // rifiutato; status_if_new vale solo per chi non c'è ancora
    let {status, parsed} = await mailchimp(membro, 'PUT', {
      email_address: indirizzo,
      status_if_new: 'subscribed',
      merge_fields: {
        MMERGE5: settore,
        ...(name ? {FNAME: name} : {}),
        ...(company ? {MMERGE6: company} : {}),
      },
      marketing_permissions: [
        {marketing_permission_id: PERMESSO_EMAIL, enabled: true},
      ],
    })

    // Chi si era disiscritto e si reiscrive riceve la mail di conferma di
    // Mailchimp: senza conferma l'API non lo rimette fra gli iscritti
    if (
      (status === 400 && parsed.title === 'Member In Compliance State') ||
      (status < 300 && ['unsubscribed', 'archived'].includes(parsed.status))
    ) {
      ;({status, parsed} = await mailchimp(membro, 'PUT', {
        email_address: indirizzo,
        status: 'pending',
      }))
    }

    if (status >= 400) {
      if (status === 400 && /fake|invalid/i.test(parsed.detail || '')) {
        return res.status(400).json({
          error: "L'indirizzo e-mail inserito non è valido.",
        })
      }
      throw new Error(
        `Mailchimp ${status}: ${parsed.title} ${parsed.detail || ''}`,
      )
    }

    const tag = await mailchimp(`${membro}/tags`, 'POST', {
      tags: [{name: groupId, status: 'active'}],
    })
    if (tag.status >= 400) {
      // L'iscrizione c'è: il tag mancante si vede nel log, non blocca
      logStructuredError(
        'api-subscribe-tag',
        new Error(`Mailchimp ${tag.status}: ${tag.parsed.title}`),
      )
    }

    return res.status(201).json({
      message:
        parsed.status === 'pending'
          ? `Ti abbiamo inviato una mail a ${indirizzo}: conferma l'iscrizione da lì`
          : `${indirizzo} Iscrizione avvenuta con successo`,
    })
  } catch (error) {
    logStructuredError('api-subscribe', error)
    return res.status(500).json({error: ERRORE})
  }
}
