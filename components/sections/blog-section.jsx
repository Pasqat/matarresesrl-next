import clsx from 'clsx'
import * as React from 'react'
import {Grid} from '../grid'
import {ArticleCard} from '../article-card'
import {HeaderSection} from './header-section'
import {Spacer} from '../spacer'

function BlogSection({articles, title, description, showArrowButton = true}) {
  return (
    <>
      <HeaderSection
        title={title}
        subTitle={description}
        cta={showArrowButton ? 'Vedi tutto' : undefined}
        ctaUrl="/news"
      />
      <Spacer size="2xs" />
      <Grid className="gap-y-16">
        {articles.slice(0, 3).map((article, idx) => (
          <div
            key={article.node.slug}
            className={clsx('col-span-4', {
              'hidden lg:block': idx >= 2,
            })}
          >
            <ArticleCard article={article.node} />
          </div>
        ))}
      </Grid>
    </>
  )
}

export {BlogSection}
