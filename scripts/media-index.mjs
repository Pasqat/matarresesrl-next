// Indicizza i media per lo strumento di selezione (/dev/media).
//   node scripts/media-index.mjs                 -> solo WordPress
//   node scripts/media-index.mjs --dir "D:\Foto" -> WordPress + cartella locale
//   aggiungi --no-wp per saltare WordPress
// Scrive data/media-index.json e le anteprime in public/_media-review/ (entrambi fuori da git).
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs'
import {basename, extname, join, resolve} from 'node:path'
import sharp from 'sharp'

const ROOT = resolve(import.meta.dirname, '..')
const INDEX = join(ROOT, 'data/media-index.json')
const THUMBS = join(ROOT, 'public/_media-review')
const WP_API = 'https://be.matarrese.it/graphql'
const IMG = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif'])
const VID = new Set(['.mp4', '.mov', '.m4v', '.webm'])

const args = process.argv.slice(2)
const dir = args.includes('--dir') ? args[args.indexOf('--dir') + 1] : null
const index = existsSync(INDEX) ? JSON.parse(readFileSync(INDEX, 'utf8')) : {}
mkdirSync(THUMBS, {recursive: true})

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function indexWordPress() {
  // Seriale e con pausa: l'hosting WP va in 508 sotto richieste concorrenti.
  const query = `query($after: String) { mediaItems(first: 100, after: $after) {
    pageInfo { hasNextPage endCursor }
    nodes { databaseId sourceUrl thumb: sourceUrl(size: MEDIUM_LARGE) mimeType date
      mediaDetails { width height } } } }`
  let after = null
  let count = 0
  do {
    const res = await fetch(WP_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query, variables: {after}}),
    })
    const {data, errors} = await res.json()
    if (errors) throw new Error(JSON.stringify(errors))
    for (const n of data.mediaItems.nodes) {
      if (!n.sourceUrl) continue // allegati orfani senza file
      const kind = n.mimeType.startsWith('video/') ? 'video' : 'image'
      index[`wp:${n.databaseId}`] = {
        source: 'wp',
        kind,
        name: basename(n.sourceUrl),
        url: n.sourceUrl,
        thumb: kind === 'image' ? n.thumb || n.sourceUrl : null,
        w: n.mediaDetails?.width,
        h: n.mediaDetails?.height,
        date: n.date,
      }
      count++
    }
    after = data.mediaItems.pageInfo.hasNextPage ? data.mediaItems.pageInfo.endCursor : null
    process.stdout.write(`\rWordPress: ${count}`)
    await sleep(400)
  } while (after)
  console.log()
}

function* walk(d) {
  for (const e of readdirSync(d, {withFileTypes: true})) {
    const p = join(d, e.name)
    if (e.isDirectory()) yield* walk(p)
    else yield p
  }
}

async function indexFolder(folder) {
  let count = 0
  for (const file of walk(resolve(folder))) {
    const ext = extname(file).toLowerCase()
    if (!IMG.has(ext) && !VID.has(ext)) continue
    const hash = createHash('sha1').update(file).digest('hex').slice(0, 16)
    const id = `local:${hash}`
    const thumbFile = join(THUMBS, `${hash}.webp`)
    if (!index[id] || !existsSync(thumbFile)) {
      try {
        let input = file
        if (VID.has(ext)) {
          // Fotogramma a 1s con ffmpeg (deve essere nel PATH).
          input = join(THUMBS, `${hash}.frame.jpg`)
          execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '1', '-i', file, '-frames:v', '1', input])
        }
        const meta = await sharp(input).metadata()
        await sharp(input).rotate().resize({width: 640, withoutEnlargement: true}).webp({quality: 70}).toFile(thumbFile)
        index[id] = {
          source: 'local',
          kind: VID.has(ext) ? 'video' : 'image',
          name: basename(file),
          path: file,
          thumb: `/_media-review/${hash}.webp`,
          w: meta.width,
          h: meta.height,
        }
      } catch (err) {
        console.error(`\nSaltato ${file}: ${err.message}`)
        continue
      }
    }
    count++
    process.stdout.write(`\rCartella: ${count}`)
  }
  console.log()
}

if (!args.includes('--no-wp')) await indexWordPress()
if (dir) await indexFolder(dir)
writeFileSync(INDEX, JSON.stringify(index, null, 1))
console.log(`Indice: ${Object.keys(index).length} media -> ${INDEX}`)
