// Corpo dei contenuti WordPress (articoli, progetti, eventi): colonna di ~68 caratteri,
// titoli "da targa", immagini, gallerie, tabelle ed embed contenuti a 375px.
// `editoriale` usa Newsreader per i racconti di progetto (DESIGN.md).
import upgradeInsecureUrls from '../../lib/upgradeInsecureUrls'

// I link verso altri siti si aprono in un'altra scheda; quelli verso matarrese.it restano qui.
// `rel="noopener"` lo mette già il pannello quando salva il testo.
export const linkEsterniInNuovaScheda = html =>
  String(html).replace(
    /<a (?=[^>]*href="https?:\/\/(?!(?:www\.)?matarrese\.it))(?![^>]*target=)/gi,
    '<a target="_blank" ',
  )

export default function Prosa({content, editoriale = false, className = ''}) {
  return (
    <>
      <div
        className={`prosa ${editoriale ? 'prosa-editoriale' : ''} ${className}`}
        dangerouslySetInnerHTML={{
          __html: linkEsterniInNuovaScheda(upgradeInsecureUrls(content)),
        }}
      />
      {/* Stili in styles/revamp.css, sezione "Corpo WordPress". */}
    </>
  )
}
