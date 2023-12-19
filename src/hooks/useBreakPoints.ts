import { useEffect, useState } from 'react'

export const useBreakPoints = () => {
  const [breakPoint, setBreakPoint] = useState('')

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setBreakPoint('sm')
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setBreakPoint('md')
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        setBreakPoint('lg')
      } else if (window.innerWidth >= 1280 && window.innerWidth <= 1535) {
        setBreakPoint('xl')
      } else if (window.innerWidth >= 1535) {
        setBreakPoint('2xl')
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    breakPoint,
    isSm: breakPoint === 'sm',
    isMd: breakPoint === 'md',
    isLg: breakPoint === 'lg',
    isXl: breakPoint === 'xl',
    is2xl: breakPoint === '2xl',
  }
}
