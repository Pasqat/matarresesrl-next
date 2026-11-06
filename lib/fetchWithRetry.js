// L'hosting condiviso (WordPress e pannello, entrambi su itroom) chiude connessioni o risponde 503/508 sotto carico (build SSG):
// un singolo errore transitorio non deve far fallire tutta la build.
const RETRY_STATUS = new Set([429, 502, 503, 504, 508])
const DELAYS = [1000, 3000, 7000]

export async function fetchWithRetry(url, options) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, options)
      if (!RETRY_STATUS.has(res.status) || attempt === DELAYS.length) return res
    } catch (err) {
      if (attempt === DELAYS.length) throw err
    }
    await new Promise(r => setTimeout(r, DELAYS[attempt]))
  }
}
