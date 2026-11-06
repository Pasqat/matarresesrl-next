// Anteprima di una bozza del pannello: il pannello firma il link, qui si chiede a lui di verificarlo
// leggendo la bozza; se risponde, si apre la pagina in modalità anteprima (preview di Next).
import {PANNELLO_URL, datiPannello} from '../../lib/pannello'

const PAGINE = {articoli: '/news/', realizzazioni: '/realizzazioni/'}

export default async function anteprima(req, res) {
  const {tipo, slug, scade, firma} = req.query
  if (!PANNELLO_URL || !PAGINE[tipo] || !/^[a-z0-9_-]+$/.test(String(slug)))
    return res.status(400).send('Anteprima non valida')
  const bozza = await datiPannello(
    `anteprima/${tipo}/${slug}?scade=${encodeURIComponent(scade)}&firma=${encodeURIComponent(firma)}`,
  ).catch(() => null)
  if (!bozza) return res.status(401).send('Link di anteprima scaduto: riaprilo dal pannello')
  res.setPreviewData({scade, firma}, {maxAge: 3600})
  res.redirect(307, PAGINE[tipo] + slug)
}
