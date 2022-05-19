import {useEffect, useState} from 'react'

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
  }, [])

  return (
    isVisible && (
      <div
        className="group fixed bottom-10 right-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-yellow-500"
        onClick={scrollToTop}
      >
        <svg
          className="h-4 w-4 text-white transition ease-in-out group-hover:-translate-y-1"
          viewBox="0 0 10 20"
          fill="none"
          strokeLinecap="round"
          strokeWidth="2"
          strokeLinejoin="round"
          stroke="currentColor"
        >
          <path d="M1 5L5 1M5 1L9 5M5 1V19" />
        </svg>
      </div>
    )
  )
}

export default ScrollToTop
