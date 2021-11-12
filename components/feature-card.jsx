import * as React from 'react'
import {LinkButton} from './button'

function FeatureCard({title, description, icon, url, urlText}) {
  return (
    <div className="bg-secondary relative flex flex-col items-start px-8 py-12 w-full h-full rounded-lg lg:px-12">
      <div className="text-primary mb-8">{icon}</div>
      <div className="text-primary flex flex-none items-end mb-4 text-xl font-medium">
        {title}
      </div>
      <p className="text-secondary flex-auto max-w-sm text-xl">{description}</p>
      {url && (
        <LinkButton
          href={url}
          withArrow
          variant="accent"
          className="mt-4 text-lg"
        >
          {urlText}
        </LinkButton>
      )}
    </div>
  )
}
export {FeatureCard}
