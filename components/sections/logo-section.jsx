import Image from 'next/image'
import {logos} from '../../data/partner-logo'
function LogoSection() {
  return (
    <section className="site-shell partner-section">
      <div className="section-topline">
        <h2>I marchi che scegliamo.</h2>
        <p>Tecnologie e attrezzature per il lavoro di ogni giorno.</p>
      </div>
      <div className="partner-grid">
        {logos.map(logo => (
          <div key={logo.name}>
            {logo.href ? (
              <a href={logo.href} target="_blank" rel="noreferrer">
                <Image src={logo.url} width={180} height={95} alt={logo.name} />
              </a>
            ) : (
              <Image src={logo.url} width={180} height={95} alt={logo.name} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
export {LogoSection}
