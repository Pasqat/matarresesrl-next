#!/usr/bin/env node
// Scansione del sito online come un crawler SEO: legge la sitemap, visita ogni URL e
// controlla stato, tempi, title, description, H1 e canonical. Scrive il report in
// docs/scansioni/scansione-AAAA-MM-GG.md ed esce con 1 se ci sono errori di stato.
//
// Uso: node scripts/scansione-sito.mjs [URL base o sitemap] [--concorrenza 2] [--lenta 5] [--max N]
//   es. corepack pnpm scansione -- --max 15

import {mkdir, writeFile} from 'node:fs/promises'

const UA = 'MatarreseScansione/1.0 (+https://www.matarrese.it)'
const TIMEOUT_MS = 30000

const args = process.argv.slice(2)
const opt = (nome, def) => {
  const i = args.indexOf(`--${nome}`)
  return i >= 0 ? Number(args[i + 1]) : def
}
const concorrenza = opt('concorrenza', 2)
const lentaS = opt('lenta', 5)
const max = opt('max', Infinity)
const base = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'))
const sitemapUrl = !base
  ? 'https://www.matarrese.it/sitemap.xml'
  : base.endsWith('.xml')
  ? base
  : `${base.replace(/\/$/, '')}/sitemap.xml`

async function scarica(url) {
  const t0 = Date.now()
  try {
    const res = await fetch(url, {
      headers: {'User-Agent': UA},
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    const testo = await res.text()
    return {res, testo, ms: Date.now() - t0}
  } catch (err) {
    return {errore: err.name === 'TimeoutError' ? 'timeout' : err.message, ms: Date.now() - t0}
  }
}

const locs = xml => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1])

async function urlDallaSitemap(url) {
  const {res, testo, errore} = await scarica(url)
  if (errore || !res.ok) throw new Error(`sitemap ${url}: ${errore || res.status}`)
  if (!testo.includes('<sitemapindex')) return locs(testo)
  const figlie = await Promise.all(locs(testo).map(urlDallaSitemap))
  return figlie.flat()
}

const entita = s =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()

// Valore di un attributo dentro il primo tag che soddisfa `filtro` (ordine attributi libero).
function attr(html, tag, filtro, nome) {
  for (const [t] of html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))) {
    if (!filtro.test(t)) continue
    const m = new RegExp(`\\b${nome}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i').exec(t)
    return m ? entita(m[2] ?? m[3]) : ''
  }
  return null
}

function analizza(html) {
  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)
  return {
    title: title ? entita(title[1]) : null,
    description: attr(html, 'meta', /name\s*=\s*["']description["']/i, 'content'),
    h1: (html.match(/<h1[\s>]/gi) || []).length,
    canonical: attr(html, 'link', /rel\s*=\s*["']canonical["']/i, 'href'),
  }
}

async function visita(url) {
  const {res, testo, errore, ms} = await scarica(url)
  if (errore) return {url, stato: errore, ms}
  return {
    url,
    stato: res.status,
    ms,
    cache: res.headers.get('x-vercel-cache') || '',
    vercelErr: res.headers.get('x-vercel-error') || '',
    ...(res.status < 400 ? analizza(testo) : {}),
  }
}

const tutti = await urlDallaSitemap(sitemapUrl)
const urls = tutti.slice(0, max)
console.log(`${tutti.length} URL in ${sitemapUrl}, ne visito ${urls.length} (concorrenza ${concorrenza})`)

const pagine = []
let prossimo = 0
await Promise.all(
  Array.from({length: concorrenza}, async () => {
    while (prossimo < urls.length) {
      const p = await visita(urls[prossimo++])
      pagine.push(p)
      process.stdout.write(`  ${p.stato} ${(p.ms / 1000).toFixed(1)}s ${p.url}\n`)
    }
  }),
)
pagine.sort((a, b) => a.url.localeCompare(b.url))

// Segnalazioni
const ok = pagine.filter(p => typeof p.stato === 'number' && p.stato < 400)
const duplicati = campo => {
  const gruppi = new Map()
  for (const p of ok) if (p[campo]) gruppi.set(p[campo], [...(gruppi.get(p[campo]) || []), p.url])
  return [...gruppi].filter(([, u]) => u.length > 1)
}
const problemi = {
  'Errori (stato >= 400 o timeout)': pagine
    .filter(p => typeof p.stato !== 'number' || p.stato >= 400)
    .map(p => `${p.url} — ${p.stato}${p.vercelErr ? ` (${p.vercelErr})` : ''}`),
  [`Pagine lente (> ${lentaS} s)`]: pagine
    .filter(p => p.ms > lentaS * 1000)
    .map(p => `${p.url} — ${(p.ms / 1000).toFixed(1)} s${p.cache ? `, cache ${p.cache}` : ''}`),
  'Title mancante': ok.filter(p => !p.title).map(p => p.url),
  'Description mancante': ok.filter(p => !p.description).map(p => p.url),
  'Title duplicati': duplicati('title').map(([t, u]) => `«${t}»: ${u.join(', ')}`),
  'Description duplicate': duplicati('description').map(([d, u]) => `«${d}»: ${u.join(', ')}`),
  'H1 assente o più di uno': ok.filter(p => p.h1 !== 1).map(p => `${p.url} — ${p.h1} H1`),
  'Title oltre 60 caratteri': ok
    .filter(p => p.title?.length > 60)
    .map(p => `${p.url} — ${p.title.length} car.`),
  'Description fuori 120–160 caratteri': ok
    .filter(p => p.description && (p.description.length < 120 || p.description.length > 160))
    .map(p => `${p.url} — ${p.description.length} car.`),
  'Canonical mancante': ok.filter(p => !p.canonical).map(p => p.url),
}

const oggi = new Date().toISOString().slice(0, 10)
const cella = s => String(s ?? '—').replace(/\|/g, '\\|')
const md = [
  `# Scansione del sito — ${oggi}`,
  '',
  `Sitemap: ${sitemapUrl} — ${tutti.length} URL, visitati ${urls.length}. Concorrenza ${concorrenza}, soglia lentezza ${lentaS} s.`,
  '',
  '## Segnalazioni',
  '',
  ...Object.entries(problemi).flatMap(([titolo, voci]) => [
    `### ${titolo} (${voci.length})`,
    '',
    ...(voci.length ? voci.map(v => `- ${v}`) : ['Nessuna.']),
    '',
  ]),
  '## Tutte le pagine',
  '',
  '| URL | Stato | Tempo | x-vercel-cache | Title (car.) | Description (car.) | H1 | Canonical |',
  '|---|---|---|---|---|---|---|---|',
  ...pagine.map(p =>
    [
      p.url,
      p.stato,
      `${(p.ms / 1000).toFixed(1)} s`,
      p.cache || '—',
      p.title ? `${p.title} (${p.title.length})` : '—',
      p.description ? p.description.length : '—',
      p.h1 ?? '—',
      p.canonical || '—',
    ]
      .map(cella)
      .join(' | ')
      .replace(/^/, '| ')
      .replace(/$/, ' |'),
  ),
  '',
].join('\n')

await mkdir('docs/scansioni', {recursive: true})
const file = `docs/scansioni/scansione-${oggi}.md`
await writeFile(file, md)

console.log(`\nRiepilogo (${urls.length} pagine):`)
for (const [titolo, voci] of Object.entries(problemi)) console.log(`  ${titolo}: ${voci.length}`)
console.log(`Report: ${file}`)
process.exitCode = problemi['Errori (stato >= 400 o timeout)'].length ? 1 : 0
