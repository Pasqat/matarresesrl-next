// Solo sviluppo: selezione guidata dei media per il revamp.
// Indice generato da scripts/media-index.mjs, scelte salvate in data/media-selection.json.
import {useCallback, useEffect, useMemo, useState} from 'react'
import {existsSync, readFileSync, statSync} from 'node:fs'
import {join} from 'node:path'

const ROLES = [
  {key: 'hero', label: 'Hero', hotkey: 'h', cls: 'bg-yellow-500 text-white'},
  {key: 'sezione', label: 'Sezione', hotkey: 's', cls: 'bg-gray-900 text-white'},
  {key: 'scarta', label: 'Scarta', hotkey: 'x', cls: 'bg-gray-300 text-gray-700'},
]
const SECTORS = [
  ['dark-kitchen', 'Dark kitchen'],
  ['laboratori', 'Laboratori di trasformazione'],
  ['collettiva', 'Ristorazione collettiva'],
  ['ristoranti-pizzerie', 'Ristoranti e pizzerie'],
  ['bar-gelaterie-pasticcerie', 'Bar, gelaterie, pasticcerie'],
  ['hotel-ricevimenti', 'Hotel e sale ricevimenti'],
  ['gdo-pescherie-macellerie', 'GDO, pescherie, macellerie'],
  ['azienda', 'Azienda (sede, officina, team)'],
  ['prodotti', 'Prodotti e dettagli tecnici'],
  ['eventi', 'Eventi e formazione'],
  ['altro', 'Altro'],
]
const PAGES = ['home', 'servizi', 'realizzazioni', 'azienda', 'prodotti', 'eventi', 'contatti']
const FILTERS = [
  ['todo', 'Da vedere'],
  ['hero', 'Hero'],
  ['sezione', 'Sezione'],
  ['scarta', 'Scartati'],
  ['all', 'Tutti'],
]
const HERO_MIN_WIDTH = 1920
// Filtro "utilizzabili": sotto questo lato lungo la foto è troppo sacrificata anche per una sezione.
const MIN_LONG_SIDE = 1200
const MIN_YEAR = 2025
const usable = m =>
  m.year >= MIN_YEAR && (m.kind === 'video' || Math.max(m.w || 0, m.h || 0) >= MIN_LONG_SIDE)

// Anno del media: quello nel nome cartella se c'è (es. "Lab Deliziosa, Noci_2024"), altrimenti
// la data di modifica del file (non scarica i file OneDrive solo-cloud); per WordPress la data di upload.
function yearOf(m) {
  if (m.source === 'wp') return Number(m.date?.slice(0, 4)) || 0
  const fromFolder = m.folder?.match(/(?:^|\D)(20\d\d)(?:\D|$)/)
  if (fromFolder) return Number(fromFolder[1])
  try {
    return statSync(m.path).mtime.getFullYear()
  } catch {
    return 0
  }
}
const group = m => (m.source === 'wp' ? 'WordPress' : m.folder.split('/').slice(0, 2).join('/'))

export async function getServerSideProps() {
  if (process.env.NODE_ENV === 'production') return {notFound: true}
  const read = f => {
    const p = join(process.cwd(), 'data', f)
    return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : {}
  }
  const index = read('media-index.json')
  const items = Object.entries(index)
    .map(([id, m]) => ({id, ...m, year: yearOf(m)}))
    // Locali raggruppati per cartella (= cliente/evento), WordPress dal più grande.
    .sort((a, b) =>
      a.source !== b.source
        ? a.source === 'local' ? -1 : 1
        : a.source === 'local'
          ? (a.folder + a.name).localeCompare(b.folder + b.name)
          : (b.w || 0) - (a.w || 0),
    )
  return {props: {items, initialSelection: read('media-selection.json')}}
}

function gaps(selection) {
  const count = (field, value, role) =>
    Object.values(selection).filter(s => s[field] === value && s.role === role).length
  const out = []
  for (const [key, label] of SECTORS.slice(0, 7)) {
    const hero = count('sector', key, 'hero')
    const sez = count('sector', key, 'sezione')
    if (!hero || sez < 3) out.push(`${label}: ${hero} hero, ${sez}/3 sezione`)
  }
  for (const page of ['home', 'servizi', 'azienda', 'prodotti', 'eventi']) {
    if (!count('page', page, 'hero')) out.push(`Pagina ${page}: nessun hero`)
  }
  return out
}

export default function MediaReview({items, initialSelection}) {
  const [selection, setSelection] = useState(initialSelection)
  const [filter, setFilter] = useState('todo')
  const [folder, setFolder] = useState('all')
  const [showAll, setShowAll] = useState(false)
  const [focus, setFocus] = useState(0)
  const [error, setError] = useState(null)

  const visible = useMemo(
    () =>
      items.filter(m => {
        if (folder !== 'all' && group(m) !== folder) return false
        const role = selection[m.id]?.role
        // Le scelte già fatte restano sempre visibili nelle loro viste.
        if (!showAll && !role && !usable(m)) return false
        if (filter === 'todo') return !role
        if (filter === 'all') return true
        return role === filter
      }),
    [items, selection, filter, folder, showAll],
  )

  const save = useCallback(async (id, patch) => {
    setSelection(s => ({...s, [id]: {...s[id], ...patch}}))
    try {
      const res = await fetch('/api/dev/media-selection', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id, ...patch}),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setError(null)
    } catch (err) {
      setError(`Salvataggio non riuscito (${err.message}): ricarica la pagina.`)
    }
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return
      const item = visible[focus]
      if (e.key === 'ArrowRight' || e.key === 'j') setFocus(f => Math.min(f + 1, visible.length - 1))
      else if (e.key === 'ArrowLeft' || e.key === 'k') setFocus(f => Math.max(f - 1, 0))
      else if (item && e.key === 'u') save(item.id, {role: ''})
      else {
        const role = ROLES.find(r => r.hotkey === e.key)
        if (role && item) save(item.id, {role: role.key})
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, focus, save])

  useEffect(() => {
    document.getElementById(`m-${focus}`)?.scrollIntoView({block: 'nearest'})
  }, [focus])

  const stats = Object.values(selection).reduce((a, s) => ({...a, [s.role]: (a[s.role] || 0) + 1}), {})
  const missing = gaps(selection)
  const pool = showAll ? items : items.filter(usable)
  const hidden = items.length - items.filter(usable).length
  const folders = Object.entries(
    pool.reduce((a, m) => {
      a[group(m)] = (a[group(m)] || 0) + 1
      return a
    }, {}),
  )

  return (
    <main className="min-h-screen bg-gray-100 p-4 text-sm text-gray-900">
      <header className="sticky top-0 z-10 -mx-4 -mt-4 mb-4 border-b border-gray-300 bg-white px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <strong>Selezione media</strong>
          <span className="text-gray-600">
            {pool.length} da valutare · {stats.hero || 0} hero · {stats.sezione || 0} sezione ·{' '}
            {stats.scarta || 0} scartati
          </span>
          <nav className="flex gap-1">
            {FILTERS.map(([key, label]) => (
              <button
                key={key}
                onClick={() => (setFilter(key), setFocus(0))}
                className={`rounded border px-2 py-1 ${filter === key ? 'bg-gray-900 text-white' : 'bg-white'}`}
              >
                {label}
              </button>
            ))}
          </nav>
          <select
            value={folder}
            onChange={e => (setFolder(e.target.value), setFocus(0))}
            aria-label="Cartella"
            className="max-w-xs border px-2 py-1"
          >
            <option value="all">Tutte le cartelle</option>
            {folders.map(([f, n]) => (
              <option key={f} value={f}>
                {f} ({n})
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" checked={showAll} onChange={e => (setShowAll(e.target.checked), setFocus(0))} />
            Mostra anche i {hidden} nascosti (lato lungo &lt; {MIN_LONG_SIDE}px o prima del {MIN_YEAR})
          </label>
          <span className="text-gray-500">Tasti: ← → naviga · h hero · s sezione · x scarta · u annulla</span>
        </div>
        {error && <p className="mt-2 text-red-600" role="alert">{error}</p>}
        {missing.length > 0 && (
          <details className="mt-2">
            <summary className="cursor-pointer text-gray-700">Mancano ancora {missing.length} coperture (lista &ldquo;da produrre&rdquo;)</summary>
            <ul className="mt-1 list-disc pl-5 text-gray-600">
              {missing.map(g => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </details>
        )}
      </header>

      {items.length === 0 && (
        <p>Indice vuoto: esegui <code>node scripts/media-index.mjs --dir &quot;percorso cartella&quot;</code>.</p>
      )}

      <ul className="grid gap-3" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))'}}>
        {visible.map((m, i) => {
          const sel = selection[m.id] || {}
          const lowRes = m.kind === 'image' && m.w && m.w < HERO_MIN_WIDTH
          return (
            <li
              key={m.id}
              id={`m-${i}`}
              onClick={() => setFocus(i)}
              className={`flex flex-col overflow-hidden rounded bg-white ${i === focus ? 'ring-4 ring-yellow-500' : ''}`}
            >
              <div className="relative aspect-[4/3] bg-gray-200">
                {m.thumb && (
                  <img src={m.thumb} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                )}
                <span className="absolute left-1 top-1 rounded bg-black/70 px-1 text-xs text-white">
                  {m.source === 'wp' ? 'WP' : 'Locale'} · {m.kind === 'video' ? 'video' : `${m.w}×${m.h}`}
                </span>
                {lowRes && (
                  <span className="absolute right-1 top-1 rounded bg-yellow-500 px-1 text-xs text-white">
                    &lt; {HERO_MIN_WIDTH}px
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 p-2">
                <p className="truncate text-xs text-gray-500" title={m.path || m.url}>
                  {m.folder ? `${m.folder} · ` : ''}
                  {m.name}
                </p>
                <div className="flex gap-1">
                  {ROLES.map(r => (
                    <button
                      key={r.key}
                      onClick={() => save(m.id, {role: sel.role === r.key ? '' : r.key})}
                      className={`flex-1 rounded border px-2 py-1 ${sel.role === r.key ? r.cls : 'bg-white'}`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
                <select
                  value={sel.sector || ''}
                  onChange={e => save(m.id, {sector: e.target.value})}
                  aria-label="Settore mostrato"
                  className="border px-1 py-1"
                >
                  <option value="">Settore…</option>
                  {SECTORS.map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <select
                  value={sel.page || ''}
                  onChange={e => save(m.id, {page: e.target.value})}
                  aria-label="Pagina suggerita"
                  className="border px-1 py-1"
                >
                  <option value="">Pagina (facoltativa)…</option>
                  {PAGES.map(p => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <input
                  defaultValue={sel.note || ''}
                  onBlur={e => e.target.value !== (sel.note || '') && save(m.id, {note: e.target.value})}
                  placeholder="Nota (es. cliente, luogo, anno)"
                  aria-label="Nota"
                  className="border px-1 py-1"
                />
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
