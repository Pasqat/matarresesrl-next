// CV allegato a una candidatura: {nome, dati}, con il PDF in base64 (pages/api/contact.js).
// 3 MB: in base64 diventano 4 MB, e Vercel rifiuta le richieste oltre 4,5 MB.
export const CV_MAX = 3 * 1024 * 1024

export function controllaCv(cv) {
  if (!cv || typeof cv.nome !== 'string' || typeof cv.dati !== 'string' || !cv.dati)
    return {error: 'Allega il tuo curriculum in PDF.'}
  if (cv.dati.length > Math.ceil(CV_MAX / 3) * 4)
    return {error: 'Il curriculum supera i 3 MB: allegane uno più leggero.'}
  // un PDF comincia con «%PDF-», che in base64 è «JVBERi0»
  if (!cv.dati.startsWith('JVBERi0') || !/^[A-Za-z0-9+/]+={0,2}$/.test(cv.dati))
    return {error: 'Il curriculum deve essere un file PDF.'}
  const nome =
    cv.nome
      .replace(/\.pdf$/i, '')
      .replace(/[^\p{L}\p{N} ._-]+/gu, ' ')
      .replace(/^[ .]+/, '')
      .trim()
      .slice(0, 80) || 'curriculum'
  return {allegato: {filename: `${nome}.pdf`, content: cv.dati}}
}
