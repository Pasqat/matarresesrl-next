// Run with node scripts/check-revamp.cjs. All network and CRM calls are mocked.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const {transformSync} = require('next/dist/build/swc')
const React = require('react')

function load(file, imports, globals = {}) {
  const {code} = transformSync(fs.readFileSync(file, 'utf8'), {
    filename: file,
    disableNextSsg: true,
    jsc: {
      parser: {syntax: 'ecmascript', jsx: true},
      transform: {react: {runtime: 'classic'}},
    },
    module: {type: 'commonjs'},
  })
  const exports = {}
  vm.runInNewContext(
    code,
    {
      exports,
      React,
      console: {error() {}, log() {}},
      require: imports,
      setTimeout() {},
      process: {
        env: {
          RESEND_API_KEY: 'mock',
          MAILCHIMP_API_KEY: 'mock-us1',
          MAILCHIMP_LIST_ID: 'lista',
          ODOO_ENABLED: 'true',
        },
      },
      fetch() {
        throw new Error('Unexpected network call')
      },
      ...globals,
    },
    {filename: file},
  )
  return exports
}

function nodes(element) {
  if (!element || typeof element !== 'object') return []
  if (Array.isArray(element)) return element.flatMap(nodes)
  return [element, ...nodes(element.props?.children)]
}

async function checkForm(file, props, values, endpoint) {
  const states = []
  let cursor = 0,
    fail = false,
    requests = []
  const stub = () => null
  stub.Panel = stub.Title = stub.Description = stub.Child = stub.Overlay = stub
  const hooks = {
    ...React,
    useEffect() {},
    useRef: () => ({current: null}),
    useId: () => 'test-id',
    useState(initial) {
      const index = cursor++
      if (!(index in states))
        states[index] = typeof initial === 'function' ? initial() : initial
      return [
        states[index],
        value => {
          states[index] =
            typeof value === 'function' ? value(states[index]) : value
        },
      ]
    },
  }
  const component = load(
    file,
    name => {
      if (name === 'react') return hooks
      if (name === 'clsx') return require('clsx')
      return new Proxy(
        {__esModule: true, default: stub},
        {
          get(target, key) {
            if (key in target) return target[key]
            if (key === 'usePlausible') return () => () => {}
            return stub
          },
        },
      )
    },
    {
      fetch: async (url, options) => {
        requests.push({url, body: JSON.parse(options.body)})
        return {
          ok: !fail,
          json: async () =>
            fail
              ? {error: 'Errore simulato'}
              : {ok: true, message: 'Iscrizione effettuata'},
        }
      },
    },
  ).default
  const render = () => {
    cursor = 0
    return nodes(component(props))
  }
  const submit = async () =>
    render()
      .find(n => n.type === 'form')
      .props.onSubmit({preventDefault() {}})
  await submit()
  assert.equal(requests.length, 0, `${file}: empty input must never send`)
  assert(
    states.some(s => s?.isError),
    `${file}: validation feedback`,
  )
  const fill = () => {
    for (const [name, value] of Object.entries(values)) {
      const field = render().find(
        n => n.props?.name === name && n.props.onChange,
      )
      assert(field, `${file}: field ${name}`)
      field.props.onChange({target: {name, value}})
    }
    const consent = render().find(
      n => n.props?.type === 'checkbox' && n.props.name === 'conditions',
    )
    if (!consent.props.checked)
      consent.props.onChange({target: {checked: true}})
  }
  fill()
  fail = true
  await submit()
  assert(
    states.some(s => s?.isError && s.text),
    `${file}: service error is visible`,
  )
  fail = false
  await submit()
  assert.equal(requests.at(-1).url, endpoint)
  assert(
    states.some(s => s?.text && s.isError === false),
    `${file}: confirmation`,
  )
  if (props.type === 'reservation') {
    assert.equal(requests.at(-1).body.source, 'modal-reservation')
    assert.match(requests.at(-1).body.formContent, /Numero partecipanti: 2/)
  }
  console.log(`PASS ${file}: validation, service error, confirmation`)
}

// Prenotazione di un evento nel ContactModal: validazione, errore del servizio, conferma.
async function checkReservation() {
  const file = 'components/Form/ContactModal.jsx'
  const states = [],
    requests = []
  let cursor = 0,
    fail = false
  const hooks = {
    ...React,
    useEffect() {},
    useCallback: fn => fn,
    useRef: () => ({current: null}),
    useId: () => 'test',
    useState(initial) {
      const i = cursor++
      if (!(i in states)) states[i] = initial
      return [
        states[i],
        v => {
          states[i] = typeof v === 'function' ? v(states[i]) : v
        },
      ]
    },
  }
  const Modal = load(
    file,
    name =>
      name === 'react'
        ? hooks
        : name === 'react-dom'
          ? {createPortal: children => children}
          : name === 'next-plausible'
            ? {usePlausible: () => () => {}}
            : name.endsWith('data/settori')
              ? {__esModule: true, default: [{nome: 'Ristorante'}]}
              : new Proxy(
                  {__esModule: true, default: () => null},
                  {get: (t, k) => (k in t ? t[k] : () => {})},
                ),
    {
      document: {body: null},
      window: {},
      requestAnimationFrame() {},
      fetch: async (url, options) => {
        requests.push({url, body: JSON.parse(options.body)})
        return {
          ok: !fail,
          json: async () => (fail ? {error: 'Errore simulato'} : {ok: true}),
        }
      },
    },
  ).default
  // useState in ordine: mounted (il portale c'è solo dopo il mount), open (pannello aperto)
  states[0] = states[1] = true
  const render = () => {
    cursor = 0
    return nodes(Modal({reservation: {title: 'Evento test'}}))
  }
  const submit = () =>
    render()
      .find(n => n.type === 'form')
      .props.onSubmit({preventDefault() {}})
  const riepilogo = () =>
    render().find(n => n.props?.className === 'cm-summary').props.children
  await submit()
  assert.equal(requests.length, 0, `${file}: empty input must never send`)
  assert(riepilogo(), `${file}: validation feedback`)
  const valori = {
    nome: 'Test',
    cognome: 'Locale',
    mail: 'test@example.com',
    partecipanti: '2',
  }
  for (const [name, value] of Object.entries(valori)) {
    const field = render().find(n => n.props?.name === name && n.props.onChange)
    assert(field, `${file}: field ${name}`)
    field.props.onChange({target: {name, value, type: 'text'}})
  }
  render()
    .find(n => n.props?.name === 'privacy')
    .props.onChange({target: {name: 'privacy', type: 'checkbox', checked: true}})
  fail = true
  await submit()
  assert.equal(riepilogo(), 'Errore simulato', `${file}: service error is visible`)
  fail = false
  await submit()
  const {url, body} = requests.at(-1)
  assert.equal(url, '/api/contact')
  assert.equal(body.source, 'modal-prenotazione')
  assert.match(body.formContent, /Partecipanti: 2/)
  assert(
    render().some(n => n.props?.role === 'status'),
    `${file}: confirmation`,
  )
  console.log(`PASS ${file}: reservation validation, service error, confirmation`)
}

async function main() {
  const emptyImports = name => {
    if (name === 'react')
      return {
        ...React,
        useEffect() {},
        useMemo: fn => fn(),
        useRef: () => ({current: null}),
        useState: initial => [
          typeof initial === 'function' ? initial() : initial,
          () => {},
        ],
      }
    if (name === 'clsx') return require('clsx')
    return new Proxy(
      {__esModule: true, default: () => null},
      {
        get(target, key) {
          if (key in target) return target[key]
          if (key === 'useRouter') return () => ({query: {}})
          if (key === 'filterPosts') return () => []
          return () => null
        },
      },
    )
  }
  for (const file of [
    'pages/news/index.jsx',
    'pages/realizzazioni/index.jsx',
  ]) {
    const Page = load(file, emptyImports).default
    const tree = Page({
      data: {posts: [], projects: [], categories: [], tags: []},
      groups: [],
    })
    assert(
      nodes(tree).some(n =>
        String(n.props?.children).includes('con questi criteri'),
      ),
      `${file}: empty archive`,
    )
  }
  console.log('PASS empty archives')
  // Mappa: senza consenso resta la scheda con «Mostra la mappa»; con consenso ma senza chiave
  // Google la mappa risulta non disponibile e resta il link a Google Maps.
  const checkMap = consent => {
    const states = [],
      cleanups = []
    let cursor = 0,
      effects = []
    const Map = load(
      'components/Maps/Map.jsx',
      name =>
        name === 'react'
          ? {
              ...React,
              useRef: () => ({current: null}),
              useEffect: effect => effects.push(effect),
              useState(initial) {
                const i = cursor++
                if (!(i in states)) states[i] = initial
                return [states[i], v => (states[i] = v)]
              },
            }
          : name === 'react-cookie-consent'
            ? {getCookieConsentValue: () => consent}
            : {Loader: function () {}},
      {window: {}},
    ).default
    const render = () => {
      cursor = 0
      effects = []
      const tree = nodes(Map())
      for (const effect of effects) {
        const cleanup = effect()
        if (cleanup) cleanups.push(cleanup)
      }
      return tree
    }
    render()
    render()
    const tree = render()
    cleanups.forEach(fn => fn())
    const testi = tree.map(n => String(n.props?.children))
    return {
      link: tree.some(
        n => n.type === 'a' && n.props.href.includes('google.com/maps'),
      ),
      mostra: testi.includes('Mostra la mappa'),
    }
  }
  assert.deepEqual(checkMap(undefined), {link: true, mostra: true})
  assert.deepEqual(checkMap('true'), {link: true, mostra: false})
  console.log('PASS map: consent gate and fallback without API key')
  const groups = [{id: 'Ristorante', name: 'Ristorante'}]
  await checkForm(
    'components/Form/ContactForm.jsx',
    {groups},
    {
      referente: 'Test',
      email: 'test@example.com',
      formContent: 'Verifica locale',
    },
    '/api/contact',
  )
  await checkForm(
    'components/Form/NewsletterFormFooter.jsx',
    {groups},
    {email: 'test@example.com'},
    '/api/subscribe',
  )
  await checkReservation()
  await checkForm(
    'pages/assistenza/index.jsx',
    {},
    {
      company: 'Test',
      referente: 'Test',
      senderMail: 'test@example.com',
      tel: '0800000000',
      indirizzo: 'Test',
      formContent: 'Verifica locale',
    },
    '/api/contact',
  )

  let sent = 0,
    crm = 0,
    serviceOk = true
  const security = load('lib/security.js', () => {
    throw Error('Unexpected import')
  })
  const api = load(
    'pages/api/contact.js',
    name =>
      name.endsWith('/security')
        ? security
        : {
            logStructuredError() {},
            maybeCreateOdooLead: async () => {
              crm++
            },
          },
    {
      fetch: async () => {
        sent++
        return {ok: serviceOk, status: 502, text: async () => 'mock'}
      },
    },
  ).default
  const call = async (body, method = 'POST') => {
    const res = {
      setHeader() {},
      status(code) {
        this.code = code
        return this
      },
      json(data) {
        this.data = data
        return this
      },
    }
    await api({method, body, headers: {}, socket: {remoteAddress: 'test'}}, res)
    return res.code
  }
  assert.equal(await call({}, 'GET'), 405)
  assert.equal(await call({}), 400)
  assert.equal(await call({honeypot: 'bot'}), 200)
  assert.equal(sent, 0)
  const valid = {
    referente: 'Test',
    senderMail: 'test@example.com',
    formContent: 'Test',
    privacy: true,
  }
  assert.equal(await call({...valid, privacy: undefined}), 400)
  assert.equal(await call({...valid, senderMail: 'bad'}), 400)
  assert.equal(await call({...valid, source: 'assistenza'}), 400)
  assert.equal(await call(valid), 200)
  assert.equal(crm, 1)
  serviceOk = false
  assert.equal(await call(valid), 502)
  assert.equal(crm, 1)
  // Mailchimp simulato: `membro` e' il contatto gia' presente (null = nuovo)
  let membro = null,
    chiamate = []
  const subscribe = load(
    'pages/api/subscribe.js',
    name =>
      name === 'crypto'
        ? require('node:crypto')
        : name.endsWith('newsletter-groups')
          ? {newsletterGroups: groups}
          : {logStructuredError() {}},
    {
      Buffer,
      fetch: async (url, {method, body}) => {
        const dati = body && JSON.parse(body)
        chiamate.push({url, method, dati})
        if (!serviceOk) return {status: 500, json: async () => ({title: 'Errore'})}
        if (method === 'GET')
          return membro
            ? {status: 200, json: async () => membro}
            : {status: 404, json: async () => ({title: 'Resource Not Found'})}
        if (method === 'PUT') {
          const stato = dati.status || membro?.status || dati.status_if_new
          return {status: 200, json: async () => ({status: stato})}
        }
        return {status: 204, json: async () => ({})}
      },
    },
  ).default
  const iscrivi = async body => {
    chiamate = []
    const res = {
      status(code) {
        this.code = code
        return this
      },
      json(dati) {
        this.dati = dati
        return this
      },
    }
    await subscribe({method: 'POST', body}, res)
    return res
  }
  const valido = {email: 'Test@Example.com ', groupId: 'Ristorante', name: 'Test'}
  serviceOk = true
  let r = await iscrivi(valido)
  assert.equal(r.code, 201)
  const [, put, tag] = chiamate
  assert.match(put.url, /^https:\/\/us1\.api\.mailchimp\.com\/3\.0\/lists\/lista\/members\/55502f40dc8b7c769880b10874abc9d0$/)
  assert.deepEqual(
    [put.dati.email_address, put.dati.status_if_new, put.dati.merge_fields],
    // doppio opt-in: un indirizzo nuovo resta pending finché non conferma la mail di Mailchimp
    ['Test@Example.com', 'pending', {MMERGE5: 'Ristorante', FNAME: 'Test'}],
  )
  assert.deepEqual(tag.dati, {tags: [{name: 'Ristorante', status: 'active'}]})
  membro = {status: 'subscribed', merge_fields: {MMERGE5: 'Bar'}}
  await iscrivi(valido)
  assert.equal(chiamate[1].dati.merge_fields.MMERGE5, 'Bar;Ristorante')
  membro = {status: 'unsubscribed', merge_fields: {MMERGE5: 'Ristorante'}}
  r = await iscrivi(valido)
  assert.equal(chiamate[2].dati.status, 'pending')
  assert.match(r.dati.message, /conferma/)
  membro = null
  assert.equal((await iscrivi({...valido, groupId: 'Fornitori'})).code, 400)
  assert.equal((await iscrivi({...valido, honeypot: 'x'})).code, 400)
  assert.equal((await iscrivi({...valido, email: 'no'})).code, 400)
  assert.equal(chiamate.length, 0)
  serviceOk = false
  assert.equal((await iscrivi(valido)).code, 500)
  console.log(
    'PASS API contact/subscribe: validation, honeypot, mocked Resend/Odoo/Mailchimp',
  )
  // Build SSG: il pannello (hosting condiviso) che chiude la connessione o risponde 508 viene ritentato.
  let calls = 0
  let responses = []
  const {fetchWithRetry} = load(
    'lib/fetchWithRetry.js',
    () => {
      throw Error('Unexpected import')
    },
    {
      setTimeout: fn => fn(),
      fetch: async () => {
        const next = responses[calls++]
        if (next instanceof Error) throw next
        return {status: next}
      },
    },
  )
  responses = [new TypeError('fetch failed'), 508, 200]
  assert.equal((await fetchWithRetry('wp')).status, 200)
  assert.equal(calls, 3)
  calls = 0
  responses = [404]
  assert.equal((await fetchWithRetry('wp')).status, 404, 'non ritenta gli errori definitivi')
  assert.equal(calls, 1)
  calls = 0
  responses = [508, 508, 508, 508]
  assert.equal((await fetchWithRetry('wp')).status, 508, 'dopo 3 tentativi restituisce l’errore')
  assert.equal(calls, 4)
  // Pannello: gli elenchi restano un minuto in memoria (meno carico sull'hosting nei picchi), i dettagli no
  const chiesti = []
  let rispostaPannello = () => ({ok: true, status: 200, json: async () => ['voce']})
  const {datiPannello} = load(
    'lib/pannello.js',
    () => ({fetchWithRetry: async url => (chiesti.push(url), rispostaPannello())}),
    {process: {env: {NEXT_PUBLIC_PANNELLO_URL: 'https://pannello.test'}}},
  )
  const [a, b] = await Promise.all([datiPannello('articoli'), datiPannello('articoli')])
  assert.deepEqual([a, b, chiesti.length], [['voce'], ['voce'], 1], 'elenco chiesto una volta sola')
  await datiPannello('articoli/uno')
  await datiPannello('articoli/uno')
  assert.equal(chiesti.length, 3, 'i dettagli non vanno in cache')
  rispostaPannello = () => ({ok: false, status: 508})
  await assert.rejects(datiPannello('eventi'))
  rispostaPannello = () => ({ok: true, status: 200, json: async () => []})
  assert.deepEqual(await datiPannello('eventi'), [], 'dopo un errore si richiede di nuovo')
  console.log('PASS pannello: elenchi in cache per un minuto, dettagli ed errori no')
  console.log('PASS fetch retry: socket errors and 508 retried, 404 not')
  console.log('No external requests were made.')
}
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
