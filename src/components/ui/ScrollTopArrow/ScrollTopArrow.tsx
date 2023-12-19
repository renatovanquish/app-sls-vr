import React, { useState, useEffect } from 'react'
import { ArrowTop } from 'components/icons'

const ScrollTopArrow = () => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)
    return function cleanup() {
      window.removeEventListener('scroll', checkScrollTop)
    }
  })

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    showScroll ? (
      <div className="animate-bounce py-4 flex justify-center">
        <div
          onClick={scrollTop}
          className="text-tertiary-2 z-10 cursor-pointer bg-accent-1 p-2 rounded-full"
        >
          <ArrowTop />
        </div>
      </div>
    ) : (<div></div>)
  )
}

export default ScrollTopArrow
