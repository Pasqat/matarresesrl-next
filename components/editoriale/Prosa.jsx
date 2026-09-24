// Corpo dei contenuti WordPress (articoli, progetti, eventi): colonna di ~68 caratteri,
// titoli "da targa", immagini, gallerie, tabelle ed embed contenuti a 375px.
// `editoriale` usa Newsreader per i racconti di progetto (DESIGN.md).
import upgradeInsecureUrls from '../../lib/upgradeInsecureUrls'

export default function Prosa({content, editoriale = false, className = ''}) {
  return (
    <>
      <div
        className={`prosa ${editoriale ? 'prosa-editoriale' : ''} ${className}`}
        dangerouslySetInnerHTML={{__html: upgradeInsecureUrls(content)}}
      />
      {/* Stili in styles/revamp.css, sezione "Corpo WordPress". */}
    </>
  )
}
