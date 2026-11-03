import {useEffect, useState} from 'react'

// Torna in cima. Con Lenis attivo scorre con Lenis: window.scrollTo smooth litigherebbe con
// il suo scorrimento e servirebbero due clic. Con movimento ridotto Lenis non c'è e si salta.
export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300)
    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility, {passive: true})
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    if (window.lenis) window.lenis.scrollTo(0)
    else window.scrollTo({top: 0})
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Torna in cima alla pagina"
      title="Torna in cima"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible || undefined}
      className={`cin-sutop ${isVisible ? 'is-on' : ''}`}
    >
      <svg
        viewBox="0 0 10 20"
        fill="none"
        strokeLinecap="round"
        strokeWidth="2"
        strokeLinejoin="round"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="M1 5L5 1M5 1L9 5M5 1V19" />
      </svg>
    </button>
  )
}

export default ScrollToTop
