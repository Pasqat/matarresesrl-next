import clsx from 'clsx'
import {useEffect, useState} from 'react'
import {ShareIcon} from '@heroicons/react/outline'
import {CheckIcon} from './icons/check-icon'

async function copyToClipboard(value) {
  if (navigator.clipboard) return navigator.clipboard.writeText(value)
  const element = document.createElement('textarea')
  element.value = value
  element.style.position = 'fixed'
  element.style.opacity = '0'
  document.body.append(element)
  try {
    element.select()
    if (!document.execCommand('copy')) throw new Error('Clipboard unavailable')
  } finally {
    element.remove()
  }
}

function ClipboardCopyButton({value, className}) {
  const [status, setStatus] = useState('idle')
  useEffect(() => {
    if (status === 'idle') return
    const timer = setTimeout(() => setStatus('idle'), 2500)
    return () => clearTimeout(timer)
  }, [status])
  const label =
    status === 'copied'
      ? 'Url copiato'
      : status === 'error'
      ? 'Copia non riuscita'
      : 'Copia l’url'
  async function copy() {
    try {
      await copyToClipboard(value)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
  }
  return (
    <button
      type="button"
      aria-label={label}
      onClick={copy}
      className={clsx(
        'copy-url-button',
        status !== 'idle' && 'copy-url-expanded',
        className,
      )}
    >
      <span className="copy-url-icon" aria-hidden="true">
        {status === 'copied' ? <CheckIcon /> : <ShareIcon />}
      </span>
      <span className="copy-url-label" aria-hidden="true">
        {label}
      </span>
      <span className="sr-only" role="status">
        {status === 'idle' ? '' : label}
      </span>
    </button>
  )
}
export {ClipboardCopyButton}
