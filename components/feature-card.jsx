import {LinkButton} from './button'
function FeatureCard({title, description, icon, url, urlText}) {
  return (
    <article className="feature-card">
      {icon && <div className="feature-card-media">{icon}</div>}
      <h3>{title}</h3>
      <div className="feature-card-copy">{description}</div>
      {url && <LinkButton href={url}>{urlText || 'Scopri di più'}</LinkButton>}
    </article>
  )
}
export {FeatureCard}
