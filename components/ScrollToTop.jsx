import {useEffect, useState} from 'react'
import {ArrowButton} from './arrow-button'

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
        className="fixed w-8 h-8 bg-yellow-500 z-20 rounded-full cursor-pointer bottom-10 right-4 items-center flex justify-center group"
        onClick={scrollToTop}
      >
        <svg
          className="w-4 h-4 text-white group-hover:-translate-y-1 transition ease-in-out"
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
