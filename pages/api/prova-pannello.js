// TEMPORANEO (diagnosi timeout sull'anteprima): quanto ci mette Vercel a leggere dal pannello
export default async function prova(req, res) {
  const base = process.env.NEXT_PUBLIC_KIRBY_URL
  const out = []
  for (const p of ['sito', 'realizzazioni', 'realizzazioni/macelleria-tropiano', 'articoli']) {
    const t = Date.now()
    try {
      const r = await fetch(`${base}/dati/${p}`, {signal: AbortSignal.timeout(8000)})
      const testo = await r.text()
      out.push({p, status: r.status, ms: Date.now() - t, byte: testo.length, inizio: testo.slice(0, 60)})
    } catch (e) {
      out.push({p, errore: String(e.cause?.code || e.name || e), ms: Date.now() - t})
    }
  }
  res.status(200).json({base, out})
}
