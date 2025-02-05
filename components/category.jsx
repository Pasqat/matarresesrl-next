import * as React from 'react'
import clsx from 'clsx'

function Category({category, selected, onClick, disabled}) {
  return (
    <label
      className={clsx(
        'relative mb-4 mr-4 block h-auto w-auto cursor-pointer rounded-full px-6 py-3 transition',
        {
          'text-primary bg-secondary': !selected,
          'bg-inverse text-white': selected,
          'focus-ring opacity-100': !disabled,
          'opacity-25': disabled,
        },
      )}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={onClick}
        value={category}
        className="sr-only"
        disabled={disabled}
      />
      <span>{category}</span>
    </label>
  )
}

export {Category}
