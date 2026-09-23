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
      {/* Globale ma confinato a .prosa: l'HTML arriva da WordPress e lo scope di styled-jsx
          non lo raggiunge. .site-content in testa per battere i titoli e le interlinee di
          revamp.css (h2 a 0,3,1). */}
      <style jsx global>{`
        .site-content .prosa {
          max-width: 68ch;
          color: var(--ghisa);
          font-size: 18px;
          line-height: 1.7;
        }
        .site-content .prosa-editoriale {
          font-family: var(--font-editorial);
          font-size: 20px;
          letter-spacing: -0.005em;
        }
        @media (min-width: 1024px) {
          .site-content .prosa {
            font-size: 19px;
          }
          .site-content .prosa-editoriale {
            font-size: 22px;
          }
        }
        .site-content .prosa > :first-child {
          margin-top: 0;
        }
        .site-content .prosa p {
          margin: 0 0 1.25em;
          line-height: 1.7;
        }
        .site-content .prosa a {
          color: inherit;
          text-decoration: underline;
          text-decoration-color: var(--fiamma-testo);
          text-decoration-thickness: 1px;
          text-underline-offset: 4px;
          overflow-wrap: anywhere;
        }
        .site-content .prosa a:hover {
          color: var(--fiamma-testo);
        }
        .site-content .prosa strong,
        .site-content .prosa b {
          font-weight: 500;
          color: var(--ghisa);
        }
        .site-content .prosa h2:not(.type-h6):not(.type-display),
        .site-content .prosa h3:not(.type-h6):not(.type-display) {
          font-family: var(--font-display);
          font-stretch: 125%;
          font-weight: 560;
          letter-spacing: -0.02em;
          line-height: 1.12;
          text-wrap: balance;
        }
        .site-content .prosa h2:not(.type-h6):not(.type-display) {
          margin: 2em 0 0.6em;
          font-size: clamp(25px, 2.3vw, 32px);
        }
        .site-content .prosa h3:not(.type-h6):not(.type-display) {
          margin: 1.8em 0 0.5em;
          font-size: clamp(20px, 1.7vw, 24px);
        }
        .site-content .prosa h4 {
          margin: 1.6em 0 0.4em;
          font-weight: 500;
          font-size: 1em;
        }
        .site-content .prosa ul,
        .site-content .prosa ol {
          margin: 0 0 1.25em;
          padding-left: 1.3em;
        }
        .site-content .prosa ul {
          list-style: disc;
        }
        .site-content .prosa ol {
          list-style: decimal;
        }
        .site-content .prosa li {
          margin-top: 0.4em;
        }
        .site-content .prosa li::marker {
          color: var(--acciaio-testo);
        }
        .site-content .prosa blockquote {
          margin: 2em 0;
          padding-left: 1.2em;
          border-left: 2px solid var(--fiamma-testo);
          font-family: var(--font-editorial);
          font-size: 1.15em;
        }
        .site-content .prosa hr {
          margin: 3em 0;
          border-top: 1px solid rgb(30 34 38 / 0.15);
        }
        .site-content .prosa figure,
        .site-content .prosa .wp-block-image {
          margin: 2.5em 0;
        }
        .site-content .prosa img,
        .site-content .prosa video {
          max-width: 100%;
          height: auto;
        }
        .site-content .prosa figcaption {
          margin-top: 0.7em;
          color: var(--acciaio-testo);
          font-family: inherit;
          font-size: 15px;
          line-height: 1.5;
        }
        .site-content .prosa .aligncenter,
        .site-content .prosa .has-text-align-center {
          text-align: center;
        }
        .site-content .prosa .aligncenter img {
          margin-inline: auto;
        }
        .site-content .prosa .wp-block-gallery,
        .site-content .prosa .blocks-gallery-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 200px), 1fr)
          );
          gap: 8px;
          padding: 0;
          list-style: none;
        }
        .site-content .prosa .wp-block-gallery figure,
        .site-content .prosa .blocks-gallery-item,
        .site-content .prosa .blocks-gallery-item figure {
          margin: 0;
        }
        .site-content .prosa .wp-block-gallery img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
        }
        .site-content .prosa .wp-block-gallery > figcaption {
          grid-column: 1 / -1;
        }
        .site-content .prosa .wp-block-table {
          margin: 2em 0;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .site-content .prosa table {
          width: 100%;
          border-collapse: collapse;
          font-family: inherit;
          font-size: 16px;
          line-height: 1.5;
        }
        .site-content .prosa th,
        .site-content .prosa td {
          padding: 0.7em 0.9em;
          border-bottom: 1px solid rgb(30 34 38 / 0.15);
          text-align: left;
          vertical-align: top;
        }
        .site-content .prosa thead th {
          background: var(--calce);
          font-weight: 500;
        }
        .site-content .prosa iframe,
        .site-content .prosa embed,
        .site-content .prosa object {
          max-width: 100%;
        }
        .site-content .prosa .wp-block-embed iframe {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
        }
        .site-content .prosa details {
          border-top: 1px solid rgb(30 34 38 / 0.15);
          border-bottom: 1px solid rgb(30 34 38 / 0.15);
          margin: 0 0 -1px;
        }
        .site-content .prosa summary {
          cursor: pointer;
          padding: 0.9em 0;
          font-weight: 500;
        }
        .site-content .prosa details > :not(summary) {
          margin-bottom: 1em;
        }
      `}</style>
    </>
  )
}
