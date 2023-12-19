import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'
import cn from 'classnames'
import s from './Navbar.module.css'
import { useBreakPoints } from 'hooks/useBreakPoints'


interface Props {
  children: React.ReactNode
}

const NavbarRoot: FC<Props> = ({ children }) => {
  const router = useRouter()
  const { pathname } = router
  const rootPathname = pathname.split('/')[1]
  const isAdmin = rootPathname === 'admin'
  const isMyAccount = rootPathname === 'my-account'
  const isOrders = router.asPath == '/orders/'
  const isRelation = rootPathname.indexOf('relation') > -1

  const { isSm } = useBreakPoints()
  const [force, setForce] = useState(!isSm && (isAdmin || isMyAccount || isRelation))
  const [hasScrolled, setHasScrolled] = useState(force)

  useEffect(() => {
    if (!isSm && (isAdmin || isMyAccount || isOrders || isRelation)) {
      setForce(true)
      setHasScrolled(true)
    } else {
      setForce(false)
      setHasScrolled(false)
    }
  }, [isAdmin, isMyAccount, isRelation])

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = force || scrollTop > offset

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled, force])

  return (
    <div className={cn(s.root, { 'shadow-magical': hasScrolled })}>
      {children}
    </div>
  )
}

export default NavbarRoot
