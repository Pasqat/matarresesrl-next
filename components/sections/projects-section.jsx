import Link from 'next/link'
import {ArticleCard} from '../article-card'
function ProjectSection({
  projects = [],
  title = 'Le nostre realizzazioni',
  description,
}) {
  return (
    <section className="site-shell shared-projects">
      <div className="section-topline">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <Link className="text-link" href="/realizzazioni">
          Tutte le realizzazioni
        </Link>
      </div>
      <div className="shared-project-grid">
        {projects.slice(0, 4).map(project => (
          <ArticleCard key={project.slug} article={project} isProject />
        ))}
      </div>
    </section>
  )
}
export {ProjectSection}
