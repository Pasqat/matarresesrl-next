// Classifica le immagini dell'indice media con Jev (TypeSafe, via OpenRouter) per aiutare /dev/media.
//   node scripts/media-jev.mjs                      -> tutte le immagini non ancora fatte
//   --root <dir>     radice con data/ e public/_media-review (default: questo repo)
//   --solo-scelte    solo gli id presenti in data/media-selection.json
//   --limite N       al massimo N immagini in questo giro
// Legge data/media-index.json e scrive data/media-jev.json (fuori da git): id -> {answers, usage, at}
// oppure {error, at}. Riprendibile: salta gli id già fatti senza errore. Non tocca media-selection.json.
// Lo state è solo l'immagine più un contesto fisso: niente nome file o cartella (il cliente nel nome
// suggerirebbe il settore e la misura direbbe quanto vale il nome, non la foto).
import {existsSync, readFileSync, renameSync, writeFileSync} from 'node:fs'
import {join, resolve} from 'node:path'
import sharp from 'sharp'

const args = process.argv.slice(2)
const arg = name => {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : undefined
}
const ROOT = resolve(arg('--root') || join(import.meta.dirname, '..'))
const INDEX = join(ROOT, 'data/media-index.json')
const SELECTION = join(ROOT, 'data/media-selection.json')
const OUT = join(ROOT, 'data/media-jev.json')
const onlySelected = args.includes('--solo-scelte')
const limit = Number(arg('--limite')) || Infinity

const API = 'https://openrouter.ai/api/alpha/decisions'
const MODEL = 'typesafe/jev-1.14' // l'unico che risponde alle domande "box"
const KEY = process.env.OPENROUTER_API_KEY
const CONCURRENCY = 4
const WP_PAUSE = 400 // l'hosting WP va in 508 sotto richieste concorrenti: download in serie con pausa
const SIDE_MAX = 1568 // limiti di Jev: fuori da 280-1568 px risponde 400, non ridimensiona
const SIDE_MIN = 280

// Stesse chiavi di SECTORS in pages/dev/media.jsx; la descrizione dice cosa si vede.
const SECTORS = {
  'dark-kitchen':
    'Dark kitchen: cucina che lavora solo per le consegne a domicilio, senza sala clienti, con postazioni in fila e contenitori da asporto',
  laboratori:
    'Laboratori di trasformazione: produzione alimentare (pastificio, caseificio, panificio, conserve) con impastatrici, linee di lavorazione, celle',
  collettiva:
    'Ristorazione collettiva: mensa aziendale, scolastica o ospedaliera, centro cottura con grandi pentole, brasiere e linea self-service',
  'ristoranti-pizzerie': 'Ristoranti e pizzerie: cucina di un ristorante, forno per pizza, sala con i tavoli',
  'bar-gelaterie-pasticcerie':
    'Bar, gelaterie, pasticcerie: bancone bar, macchina da caffè, vetrina del gelato o dei dolci, laboratorio di pasticceria',
  'hotel-ricevimenti': 'Hotel e sale ricevimenti: cucina o sala di un hotel, banchetto, buffet, sala per matrimoni',
  'gdo-pescherie-macellerie':
    'GDO, pescherie, macellerie: supermercato, banchi frigo, banco del pesce o della carne, vetrine refrigerate',
  azienda: "Azienda (sede, officina, team): sede, uffici, magazzino, officina, furgoni, tecnici e persone dell'azienda",
  prodotti: 'Prodotti e dettagli tecnici: una singola attrezzatura o un suo dettaglio, da vicino o su sfondo neutro',
  eventi: 'Eventi e formazione: fiera, showcooking, corso, dimostrazione, pubblico davanti a un relatore',
  altro: 'Altro: nessuno dei settori precedenti',
}

const QUESTIONS = {
  settore: {
    type: 'choice',
    instructions: 'Quale settore della ristorazione professionale mostra questa foto?',
    criteria: SECTORS,
  },
  tipo: {
    type: 'choice',
    instructions: 'Che tipo di immagine è?',
    criteria: {
      ambiente: 'Ambiente: una cucina o un locale ripreso per intero',
      attrezzatura: 'Attrezzatura: il dettaglio di una macchina o di un apparecchio',
      persone: 'Persone: persone al lavoro',
      evento: 'Evento: evento, formazione o pubblico',
      prodotto: 'Prodotto: un oggetto su sfondo neutro',
      grafica: 'Grafica: logo, grafica o testo',
      documento: 'Documento: screenshot, documento o schermata',
    },
  },
  usabile: {
    type: 'noul',
    instructions: "È una foto professionale, nitida e ben esposta, adatta al sito web di un'azienda?",
  },
  hero: {
    type: 'score',
    instructions:
      "Quanto è adatta come grande immagine d'apertura orizzontale di una pagina web: soggetto chiaro, composizione pulita, spazio libero per un titolo?",
    criteria: ['Per niente adatta', 'Poco adatta', 'Accettabile', 'Buona', 'Ottima'],
  },
  soggetto: {type: 'box', instructions: 'Dove si trova il soggetto principale della foto?'},
}
const STATE =
  "Foto dall'archivio di Matarrese S.r.l., azienda pugliese che progetta, fornisce e assiste attrezzature " +
  'per la ristorazione professionale (cucine, bar, pasticcerie, laboratori, GDO). Valutala per il nuovo sito aziendale.'

const sleep = ms => new Promise(r => setTimeout(r, ms))
const readJson = f => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {})

// Anteprima -> JPEG baseline nei limiti di Jev, bordo bianco se un lato resta sotto il minimo.
async function toJpeg(buf) {
  const {data, info} = await sharp(buf)
    .rotate()
    .flatten({background: '#ffffff'})
    .resize({width: SIDE_MAX, height: SIDE_MAX, fit: 'inside', withoutEnlargement: true})
    .toBuffer({resolveWithObject: true})
  const padW = Math.max(0, SIDE_MIN - info.width)
  const padH = Math.max(0, SIDE_MIN - info.height)
  return sharp(data)
    .extend({
      top: Math.floor(padH / 2),
      bottom: Math.ceil(padH / 2),
      left: Math.floor(padW / 2),
      right: Math.ceil(padW / 2),
      background: '#ffffff',
    })
    .jpeg({quality: 85})
    .toBuffer()
}

// Un solo download WordPress alla volta, con pausa e backoff sui sovraccarichi.
let wpLock = Promise.resolve()
function downloadWp(url) {
  const job = wpLock.then(async () => {
    try {
      for (let attempt = 0; ; attempt++) {
        const res = await fetch(url, {signal: AbortSignal.timeout(30000)}).catch(err => ({err}))
        if (res.ok) return Buffer.from(await res.arrayBuffer())
        const retryable = res.err || [429, 500, 502, 503, 504, 508, 529].includes(res.status)
        if (!retryable || attempt >= 5) throw new Error(`WP ${res.status || res.err.message}`)
        await sleep(2000 * 2 ** attempt)
      }
    } finally {
      await sleep(WP_PAUSE)
    }
  })
  wpLock = job.catch(() => {})
  return job
}

async function thumbnail(m) {
  if (m.source === 'wp') return downloadWp(m.thumb)
  return readFileSync(join(ROOT, 'public', m.thumb))
}

async function askJev(jpeg) {
  const body = JSON.stringify({
    model: MODEL,
    state: [STATE, {type: 'image_url', image_url: {url: `data:image/jpeg;base64,${jpeg.toString('base64')}`}}],
    questions: QUESTIONS,
  })
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
        'TypeSafe-Danger-Zone-Images': 'true',
      },
      body,
      signal: AbortSignal.timeout(60000),
    }).catch(err => ({err}))
    if (res.ok) {
      const json = await res.json()
      const missing = Object.keys(QUESTIONS).filter(q => !json.answers?.[q])
      if (missing.length) throw new Error(`risposta senza ${missing.join(', ')}`)
      return json
    }
    const retryable = res.err || [429, 500, 502, 503, 504, 529].includes(res.status)
    if (!retryable || attempt >= 5) {
      const text = res.err ? res.err.message : `HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`
      throw new Error(text)
    }
    const after = Number(res.headers?.get('retry-after'))
    await sleep(after > 0 ? after * 1000 : 1000 * 2 ** attempt + Math.random() * 500)
  }
}

// Alterna WP e locali in proporzione: i download WP in serie non bloccano tutti i worker insieme.
function interleave(a, b) {
  const out = []
  let i = 0
  let j = 0
  while (i < a.length || j < b.length) {
    if (j >= b.length || (i < a.length && i / a.length <= j / b.length)) out.push(a[i++])
    else out.push(b[j++])
  }
  return out
}

if (!KEY) throw new Error('OPENROUTER_API_KEY mancante')
const index = readJson(INDEX)
const selection = readJson(SELECTION)
const results = readJson(OUT)
const todo = Object.entries(index).filter(
  ([id, m]) => m.kind === 'image' && m.thumb && (!results[id] || results[id].error) && (!onlySelected || selection[id]),
)
const queue = interleave(
  todo.filter(([, m]) => m.source !== 'wp'),
  todo.filter(([, m]) => m.source === 'wp'),
).slice(0, limit)

function save() {
  writeFileSync(`${OUT}.tmp`, JSON.stringify(results, null, 1))
  renameSync(`${OUT}.tmp`, OUT) // il dev server legge lo stesso file: mai a metà
}
process.on('SIGINT', () => {
  save()
  console.log('\nInterrotto: risultati salvati, rilancia per riprendere.')
  process.exit(130)
})

const total = queue.length
const start = Date.now()
let done = 0
let errors = 0
let cost = 0
let lastSave = Date.now()
console.log(`${total} immagini da classificare -> ${OUT}`)

async function worker() {
  while (queue.length) {
    const [id, m] = queue.shift()
    try {
      const {answers, usage} = await askJev(await toJpeg(await thumbnail(m)))
      results[id] = {answers, usage, at: new Date().toISOString()}
      cost += usage?.cost || 0
    } catch (err) {
      results[id] = {error: err.message, at: new Date().toISOString()}
      errors++
      console.error(`\n${id}: ${err.message}`)
    }
    done++
    if (done % 25 === 0 || Date.now() - lastSave > 15000) {
      save()
      lastSave = Date.now()
    }
    if (done % 10 === 0 || done === total) {
      const min = (Date.now() - start) / 60000
      console.log(`${done}/${total} · errori ${errors} · $${cost.toFixed(4)} · ${min.toFixed(1)} min`)
    }
  }
}

await Promise.all(Array.from({length: CONCURRENCY}, worker))
save()
const all = Object.values(results)
const allCost = all.reduce((a, r) => a + (r.usage?.cost || 0), 0)
console.log(
  `Fatte ${done - errors}/${total} in ${((Date.now() - start) / 60000).toFixed(1)} min, errori ${errors}, ` +
    `costo del giro $${cost.toFixed(4)}. Nel file: ${all.filter(r => !r.error).length} ok, ` +
    `${all.filter(r => r.error).length} errori, costo totale $${allCost.toFixed(4)}.`,
)
