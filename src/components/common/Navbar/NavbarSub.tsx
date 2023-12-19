import { useRouter } from 'next/router'
import { useState } from 'react'
import cn from 'classnames'
import s from './NavbarSub.module.css'
import Link from 'next/link'
import ClickOutside from 'lib/click-outside'
import {
  Home,
  Network,
  Apps,
  Team,
  IconList,
  FolderOpen,
  External,
  Browser,
  Upload,
  Plus2,
  Person,
} from 'components/icons'

import { useBreakPoints } from 'hooks/useBreakPoints'

export default function NavbarSub() {
  const [menuOpen, setMenuOpen] = useState(0)

  const router = useRouter()
  const { pathname, query } = useRouter()
  const rootPathname = pathname.split('/')[1]

  const isHome = pathname == '/'
  const isMyAccount = rootPathname === 'my-account'
  const isAdmin = rootPathname === 'admin'
  const isContact = rootPathname === 'contact'
  const isSearch = rootPathname === 'search'
  const isMeet = rootPathname === 'meet'
  
  const { isMd } = useBreakPoints()

  return (
    <ClickOutside active={menuOpen !== 0} onClick={() => setMenuOpen(0)}>
      <div>
        <nav className={s.nav}>
          <ul className={s.navmain}>
            <li>
              <Link href="/contact">
                <a
                  className={cn(s.link, {
                    ['text-xs']: isMd,
                    ['text-sm']: !isMd,
                    [s.active]: isContact,
                  })}
                >
                  <Team height={16} />
                  <span className="ml-2">CONTATOS</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/meet">
                <a
                  className={cn(s.link, {
                    ['text-xs']: isMd,
                    ['text-sm']: !isMd,
                    [s.active]: isMeet,
                  })}
                >
                  <Network height={16} />
                  <span className="ml-2">REUNIÃO</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </ClickOutside>
  )
}
