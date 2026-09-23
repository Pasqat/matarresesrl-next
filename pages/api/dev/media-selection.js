// Solo sviluppo: salva le scelte dello strumento /dev/media in data/media-selection.json.
import {existsSync, readFileSync, writeFileSync} from 'node:fs'
import {join} from 'node:path'

const FILE = join(process.cwd(), 'data/media-selection.json')
const FIELDS = ['role', 'sector', 'page', 'note']

export default function handler(req, res) {
  if (process.env.NODE_ENV === 'production') return res.status(404).end()
  if (req.method !== 'POST') return res.status(405).end()

  const {id, ...patch} = req.body || {}
  if (typeof id !== 'string' || !id) return res.status(400).json({error: 'id mancante'})

  const all = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : {}
  const entry = {...all[id]}
  for (const k of FIELDS) {
    if (!(k in patch)) continue
    if (patch[k]) entry[k] = String(patch[k])
    else delete entry[k]
  }
  if (Object.keys(entry).length) all[id] = entry
  else delete all[id]

  writeFileSync(FILE, JSON.stringify(all, null, 1))
  res.status(200).json(entry)
}
