import * as React from 'react'
import clsx from 'clsx'

const fontSize = {
  h1: 'leading-tight text-4xl md:text-5xl',
  H2: 'leading-tight text-3xl md:text-4xl',
  h3: 'font-medium text-2xl md:text-3xl',
  h4: 'font-medium text-xl md:text-2xl',
  h6: 'font-medium text-lg md:text-xl',
  h6: 'font-medium text-lg ',
}

const titleColors = {
  primary: 'text-yellow-500',
  secondary: 'text-gray-700',
}

function Title({variant = 'primary', size, as, className, ...rest}) {
  const Tag = as ?? size

  return (
    <Tag
      className={clsx(fontSize[size], titleColors[variant], className)}
      {...rest}
    />
  )
}

function H1(props) {
  return <Title {...props} size="h1" />
}

function H2(props) {
  return <Title {...props} size="H2" />
}

function H3(props) {
  return <Title {...props} size="h3" />
}

function H4(props) {
  return <Title {...props} size="h4" />
}

function H5(props) {
  return <Title {...props} size="h5" />
}

function H6(props) {
  return <Title {...props} size="h6" />
}

function Paragraph({className, as = 'p', ...rest}) {
  // TODO: make this
}

export {H1, H2, H3, H4, H5, H6}
