/**
 * Evita il "mixed content": forza HTTPS sulle risorse servite dai domini del
 * sito (immagini e allegati di WordPress su be.matarrese.it / matarrese.it)
 * che potrebbero essere salvate con URL http:// nel contenuto del CMS.
 *
 * Volutamente limitato ai domini di Matarrese: i link http:// esterni non
 * vengono toccati.
 */
export default function upgradeInsecureUrls(html = '') {
  return String(html).replace(
    /http:\/\/((?:www\.|be\.)?matarrese\.it)/gi,
    'https://$1',
  )
}
