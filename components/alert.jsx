import Container from './Container'
import clsx from 'clsx'

export default function Alert({preview}) {
  return preview ? (
    <div
      className={clsx('border-2', {
        'border-yellow-500 bg-yellow-500 text-white': preview,
        'bg-secondary border-secondary': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          <>
            Questa è un&apos;anteprima.{' '}
            <a
              href="/api/exit-preview"
              className="underline transition-colors duration-200 hover:text-yellow-500"
            >
              Clicca qui
            </a>{' '}
            per uscire dalla visualizzazione anteprima.
          </>
        </div>
      </Container>
    </div>
  ) : null
}
