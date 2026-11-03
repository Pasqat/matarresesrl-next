// I titoli di WordPress arrivano con le entità HTML (L&#8217;evoluzione): dove finiscono come testo
// semplice (titolo del modal, oggetto e corpo delle mail) vanno decodificati.
export const decodifica = (s = '') =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
