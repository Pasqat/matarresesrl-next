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
          MAILERLITE_API_KEY: 'mock',
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
        String(n.props?.children).includes('non è stato trovato nulla'),
      ),
      `${file}: empty archive`,
    )
  }
  console.log('PASS empty archives')
  let mapEffect,
    mapUnavailable = false
  const map = load(
    'components/Maps/Map.jsx',
    name =>
      name === 'react'
        ? {
            ...React,
            useRef: () => ({current: null}),
            useEffect(effect) {
              mapEffect = effect
            },
            useState: () => [
              mapUnavailable,
              value => {
                mapUnavailable = value
              },
            ],
          }
        : {},
    {window: {}},
  ).default
  map()
  const cleanupMap = mapEffect()
  assert.equal(mapUnavailable, true)
  assert(
    nodes(map()).some(
      n => n.type === 'a' && n.props.href.includes('google.com/maps'),
    ),
  )
  cleanupMap()
  const preview = load('pages/preview/index.jsx', () => ({
    withSessionSsr: fn => fn,
  }))
  assert.equal(
    (await preview.getServerSideProps({req: {session: {}}})).redirect
      .destination,
    '/auth/login',
  )
  assert.equal(
    (await preview.getServerSideProps({req: {session: {user: {}}}})).notFound,
    true,
  )
  console.log(
    'PASS map fallback and protected preview without a session or post',
  )
  const groups = [{id: '101815183615198233', name: 'Ristorante'}]
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
  await checkForm(
    'components/Form/FormModal.jsx',
    {type: 'reservation', title: 'Evento test'},
    {
      referente: 'Test',
      surname: 'Locale',
      mail: 'test@example.com',
      participants: '2',
    },
    '/api/contact',
  )
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
  }
  assert.equal(await call({...valid, senderMail: 'bad'}), 400)
  assert.equal(await call({...valid, source: 'assistenza'}), 400)
  assert.equal(await call(valid), 200)
  assert.equal(crm, 1)
  serviceOk = false
  assert.equal(await call(valid), 502)
  assert.equal(crm, 1)
  const subscribe = load(
    'pages/api/subscribe.js',
    () => ({logStructuredError() {}}),
    {
      fetch: async () => ({
        status: serviceOk ? 201 : 422,
        json: async () => ({data: {email: 'test@example.com'}}),
      }),
    },
  ).default
  for (const success of [true, false]) {
    serviceOk = success
    const res = {
      status(code) {
        this.code = code
        return this
      },
      json() {
        return this
      },
    }
    await subscribe(
      {
        method: 'POST',
        body: {email: 'test@example.com', groupId: groups[0].id},
      },
      res,
    )
    assert.equal(res.code, success ? 201 : 500)
  }
  console.log(
    'PASS API contact/subscribe: validation, honeypot, mocked Resend/Odoo/MailerLite',
  )
  // Build SSG: WordPress che chiude la connessione o risponde 508 viene ritentato.
  let calls = 0
  let responses = []
  const {fetchWithRetry} = load(
    'lib/apolloClient.js',
    () => ({ApolloClient: function () {}, HttpLink: function () {}, InMemoryCache: function () {}}),
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
  console.log('PASS WordPress fetch retry: socket errors and 508 retried, 404 not')
  console.log('No external requests were made.')
}
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
