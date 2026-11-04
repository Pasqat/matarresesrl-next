// Comprime le immagini del repo al posto dell'ottimizzazione di Vercel (unoptimized: true in
// next.config.js). Stesso nome e formato, così nessun percorso nel codice cambia: lato massimo
// 2000 px, riscrive il file solo se pesa almeno il 10% in meno.
//   node scripts/ottimizza-immagini.mjs            → tutte le immagini di public/img
//   node scripts/ottimizza-immagini.mjs a.jpg b.png → solo quelle (le usa .githooks/pre-commit)
import {readdirSync, readFileSync, writeFileSync} from 'node:fs'
import {join} from 'node:path'
import sharp from 'sharp'

const LATO_MAX = 2000
const FORMATI = /\.(jpe?g|png|webp)$/i
// favicon: dimensioni e formati fissati dai browser, non si toccano
const ESCLUSI = /[\\/]favicon[\\/]/

const tutte = dir =>
  readdirSync(dir, {withFileTypes: true}).flatMap(f =>
    f.isDirectory() ? tutte(join(dir, f.name)) : [join(dir, f.name)],
  )

const file = (
  process.argv.length > 2 ? process.argv.slice(2) : tutte('public/img')
).filter(f => FORMATI.test(f) && !ESCLUSI.test(f))

let risparmio = 0
for (const f of file) {
  const prima = readFileSync(f)
  const img = sharp(prima, {animated: true}).rotate().resize({
    width: LATO_MAX,
    height: LATO_MAX,
    fit: 'inside',
    withoutEnlargement: true,
  })
  const ext = f.toLowerCase().split('.').pop()
  const dopo = await (
    ext === 'png'
      ? img.png({compressionLevel: 9, adaptiveFiltering: true})
      : ext === 'webp'
        ? img.webp({quality: 80})
        : img.jpeg({quality: 80, mozjpeg: true})
  ).toBuffer()
  if (dopo.length > prima.length * 0.9) continue
  writeFileSync(f, dopo)
  risparmio += prima.length - dopo.length
  console.log(
    `${f}: ${Math.round(prima.length / 1024)} → ${Math.round(dopo.length / 1024)} KB`,
  )
}
console.log(
  `${file.length} immagini controllate, ${Math.round(risparmio / 1024)} KB risparmiati`,
)
