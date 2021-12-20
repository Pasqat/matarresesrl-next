import * as React from 'react'
import clsx from 'clsx'
import {useId} from '@reach/auto-id'

function Label({className, ...labelProps}) {
  return (
    <label
      {...labelProps}
      className={clsx('inline-block text-gray-500 text-lg', className)}
    />
  )
}

const Input = React.forwardRef(function Input(props, ref) {
  const className = clsx(
    'placeholder-gray-500 focus-ring px-11 py-8 w-full text-black disabled:text-gray-400 text-lg font-medium bg-white rounded-lg',
    props.featured ? 'bg-white' : 'bg-gray-100',
    props.className,
  )

  if (props.type === 'textarea') {
    return <textarea {...props} className={className} />
  }

  return <input {...props} className={className} ref={ref} />
})

function InputError({children, id}) {
  if (!children) {
    return null
  }

  return (
    <p role="alert" id={id} className="text-red-500 text-sm">
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
    featured,
    ...props
  },
  ref,
) {
  const prefix = useId()
  const inputId = id ?? `${prefix}-${name}`
  const errorId = `${inputId}-error`
  const descriptionId = `${inputId}-description`

  return (
    <div className={clsx('mb-8', className)}>
      <div className="flex gap-2 items-baseline justify-between mb-4">
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
        autoComplete={name}
        required
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
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-6">
      {children}
    </div>
  )
}

function NotificationPanel({children, id, isError}) {
  return (
    <div role="alert" className="relative mt-8 px-11 py-8" id={id}>
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
