import * as React from 'react'
import clsx from 'clsx'
import {CustomCheckboxContainer, CustomCheckboxInput} from '@reach/checkbox'

function Category({category, selected, onClick, disabled}) {
  return (
    <CustomCheckboxContainer
      as="label"
      checked={selected}
      onChange={onClick}
      className={clsx(
        'relative block mb-4 mr-4 px-6 py-3 w-auto h-auto rounded-full cursor-pointer transition',
        {
          'text-primary bg-secondary': !selected,
          'text-white bg-inverse': selected,
          'focus-ring opacity-100': !disabled,
          'opacity-25': disabled,
        },
      )}
      disabled={disabled}
    >
      <CustomCheckboxInput
        checked={selected}
        value={category}
        className="sr-only"
      />
      <span>{category}</span>
    </CustomCheckboxContainer>
  )
}

export {Category}
