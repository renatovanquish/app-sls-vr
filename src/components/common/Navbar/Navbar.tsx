import { FC, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from 'components/ui'
import { Searchbar, UserNav } from 'components/common'
import NextHead from 'next/head'
import { useTheme } from 'next-themes'
import { useUI } from 'components/ui/context'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { HeaderSearch, HeaderRelation } from 'components/relations'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  user?: any
  links?: Link[]
  displaySearch: boolean
}

const Navbar: FC<NavbarProps> = ({ links, displaySearch, user }) => {
  const { pathname, query } = useRouter()
  const rootPathname = pathname.split('/')[1]
  const isRelations = rootPathname === 'relations'
  const isHome = pathname == '/'

  const { theme } = useTheme()
  const { isSm } = useBreakPoints()
  const { setHeightNavBar, itemListSelected } = useUI()

  const ref = useRef(null as any)

  useEffect(() => {
    if (ref.current) {
      const h = ref.current.clientHeight
      setHeightNavBar(h)
    }
  }, [ref.current?.clientHeight])

  return (
    <NavbarRoot>
      <NextHead>
        <meta
          name="theme-color"
          content={theme === 'dark' ? '#282a36' : '#fafafa'}
        />
      </NextHead>
      <Container clean={process.env.FULL_WIDTH ? true : false}>
        <div ref={ref}>
          <div
            className={cn(s.nav, {
              'px-4': process.env.FULL_WIDTH ? true : false,
            })}
          >
            <div className="flex items-center flex-1">
              <Link href={`${process.env.HOME}`}>
                <a className={s.logo} aria-label="Logo">
                  <Logo maxHeight={60} />
                </a>
              </Link>

              <nav className={s.navMenu}>
                {links?.map((l) => (
                  <Link href={l.href} key={l.href}>
                    <a className={s.link}>{l.label}</a>
                  </Link>
                ))}
              </nav>
            </div>

            {displaySearch && (
              <div className="justify-center flex-1 hidden md:flex">
                <Searchbar />
              </div>
            )}

            <div className="flex items-center justify-end flex-1 space-x-8">
              <UserNav/>
            </div>
          </div>

          {isRelations && !itemListSelected && <HeaderSearch />}
          {isRelations && isSm && itemListSelected && <HeaderRelation relation={itemListSelected.relation} />}

          {displaySearch && (
            <div className="flex py-2 px-4 md:hidden">
              <Searchbar id="mobile-search" />
            </div>
          )}
        </div>
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
