import {useState, useEffect} from 'react'
import clsx from 'clsx'

export default function SectionProgress({sectionRef, lgHidden, endOfProgress}) {
  const [y, setY] = useState(null)
  const [positionReached, setPositionReached] = useState(null)

  const getPosition = () => {
    const y =
      sectionRef.current.offsetTop +
      sectionRef.current.offsetParent.offsetTop -
      150
    setY(y)
  }

  const calculatePosition = () => {
    return setPositionReached(window.scrollY > y)
  }

  // Get the position in the beginning
  useEffect(() => {
    getPosition()
  })

  useEffect(() => {
    window.addEventListener('scroll', calculatePosition)

    return () => window.removeEventListener('scroll', calculatePosition)
  })

  return (
    <div
      className={clsx(
        lgHidden && 'lg:hidden',
        'mr-4 flex flex-col items-center',
      )}
    >
      <div>
        <div
          className={clsx(
            positionReached && endOfProgress && 'bg-green-500',
            positionReached && !endOfProgress && 'bg-yellow-500',
            'flex h-10 w-10 items-center justify-center rounded-full border',
          )}
        >
          {endOfProgress ? (
            <svg
              className={clsx(
                'w-4',
                positionReached ? 'text-white' : 'text-gray-600',
              )}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <polyline
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                points="6,12 10,16 18,8"
              />
            </svg>
          ) : (
            <svg
              className={clsx(
                'w-4',
                positionReached ? 'text-white' : 'text-gray-600',
              )}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line
                fill="none"
                strokeMiterlimit="10"
                x1="12"
                y1="2"
                x2="12"
                y2="22"
              />
              <polyline
                fill="none"
                strokeMiterlimit="10"
                points="19,15 12,22 5,15"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="h-full w-px bg-gray-300" />
    </div>
  )
}
