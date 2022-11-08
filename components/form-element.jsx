import * as React from 'react'
import clsx from 'clsx'
import {useId} from '@reach/auto-id'

function Label({className, ...labelProps}) {
  return (
    <label
      {...labelProps}
      className={clsx('inline-block text-lg text-gray-500', className)}
    />
  )
}

const Input = React.forwardRef(function Input(
  {featured = false, ...props},
  ref,
) {
  const className = clsx(
    'py-4 px-8 w-full text-lg font-medium placeholder-gray-300 text-black disabled:text-gray-400 disabled:bg-gray-100 rounded-lg caret-yellow-500 focus-ring',
    featured ? 'bg-white' : 'bg-gray-100',
    props.className,
  )

  if (props.type === 'textarea') {
    return (
      <textarea {...props} className={clsx('h-full resize-y', className)} />
    )
  }

  return <input {...props} className={className} ref={ref} />
})

function InputError({children, id}) {
  if (!children) {
    return null
  }

  return (
    <p role="alert" id={id} className="text-sm text-red-500">
      {children}
    </p>
  )
}

const Field = React.forwardRef(function Field(
  {
    defaultValue,
    error,
    name,
    label,
    className,
    description,
    id,
    required,
    featured,
    autoComplete,
    ...props
  },
  ref,
) {
  const prefix = useId()
  const inputId = id ?? `${prefix}-${name}`
  const errorId = `${inputId}-error`
  const descriptionId = `${inputId}-description`

  return (
    <div className={clsx('mb-4', className)}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <Label htmlFor={inputId}>{label}</Label>
        {error ? (
          <InputError id={errorId}>{error}</InputError>
        ) : description ? (
          <div id={descriptionId} className="text-primary text-lg">
            {description}
          </div>
        ) : null}
      </div>

      <Input
        ref={ref}
        {...props}
        name={name}
        id={inputId}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        featured={featured}
        aria-describedby={
          error ? errorId : description ? descriptionId : undefined
        }
      />
    </div>
  )
})

function ButtonGroup({children}) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-6 md:space-x-4">
      {children}
    </div>
  )
}

function NotificationPanel({children, id, isError}) {
  return (
    <div role="alert" className="relative mt-8 py-8 px-11" id={id}>
      <div
        className={clsx('absolute inset-0 rounded-lg opacity-25', {
          'bg-green-500': !isError,
          'bg-red-500': isError,
        })}
      />
      <div className="text-primary relative text-lg font-medium">
        {children}
      </div>
    </div>
  )
}

export {Label, Input, InputError, Field, ButtonGroup, NotificationPanel}
