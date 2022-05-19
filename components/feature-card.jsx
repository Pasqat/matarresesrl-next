import * as React from 'react'
import {LinkButton} from './button'

function FeatureCard({title, description, icon, url, urlText}) {
  return (
    <div className="bg-secondary relative flex h-full w-full flex-col items-start rounded-lg px-8 py-12 lg:px-12">
      {icon ? <div className="text-primary mb-8">{icon}</div> : null}
      <div className="text-primary mb-4 flex flex-none items-end text-xl font-medium">
        {title}
      </div>
      <div className="text-secondary max-w-sm flex-auto text-xl">
        {description}
      </div>
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
