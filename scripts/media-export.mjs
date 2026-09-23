// Esporta i media scelti in /dev/media dentro public/ a misura web.
//   node scripts/media-export.mjs home wp:5646=piazza-grande local:a8c0...=assistenza
// -> public/img/home/piazza-grande.webp (lato lungo max 2400px). I file OneDrive letti vengono
// rimessi "solo online" subito dopo (attrib +U -P).
import {execFileSync} from 'node:child_process'
import {mkdirSync, readFileSync} from 'node:fs'
import {join, resolve} from 'node:path'
import sharp from 'sharp'

const ROOT = resolve(import.meta.dirname, '..')
const index = JSON.parse(readFileSync(join(ROOT, 'data/media-index.json'), 'utf8'))
const [folder, ...pairs] = process.argv.slice(2)
if (!folder || !pairs.length) {
  console.error('Uso: node scripts/media-export.mjs <cartella> <id>=<nome> ...')
  process.exit(1)
}
const outDir = join(ROOT, 'public/img', folder)
mkdirSync(outDir, {recursive: true})

for (const pair of pairs) {
  const [id, name] = pair.split('=')
  const m = index[id]
  if (!m) throw new Error(`Media non in indice: ${id}`)
  const input =
    m.source === 'wp' ? Buffer.from(await (await fetch(m.url)).arrayBuffer()) : m.path
  const out = join(outDir, `${name}.webp`)
  const info = await sharp(input)
    .rotate()
    .resize({width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true})
    .webp({quality: 78})
    .toFile(out)
  if (m.source === 'local') execFileSync('attrib', ['+U', '-P', m.path])
  console.log(`${id} -> ${out} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`)
}
