import { FC } from 'react'
import cn from 'classnames'
import { Bell, Edit, Heart } from 'components/icons'
import { Button } from 'components/ui'
import { useUI } from 'components/ui/context'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.css'
import { useUserAuth } from 'components/userAuth/context'
import { CartIndication } from 'components/common'
import { useRouter } from 'next/router'
import { useBreakPoints } from 'hooks/useBreakPoints'

interface Props {
  className?: string
  children?: React.ReactNode
  closeSidebarIfPresent?: any
  rootPathname?: any
}

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { user } = useUserAuth()
  
  const router = useRouter()
  const { pathname, query } = router
  const rootPathName = pathname.split('/')[1]

  const { showEditPage, hideEditPage, displayEditPage, toggleSidebarRight, openModal, displayModal, setModalView } = useUI()
  const itemsCount = 0

  const { isSm } = useBreakPoints()

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li key="cart" className={s.item}>
            <CartIndication />
          </li>

          {false && !isSm && (
            <li key="heart" className={s.item} onClick={()=>router.push('/favorites')}>
              <a className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center">
                <Heart />
              </a>
            </li>
          )}

          {user && (
            <li key="noti" className={s.item} onClick={toggleSidebarRight}>
              <a className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center">
                <Bell />
                {itemsCount > 0 && (
                  <span className={s.bagCount}>{itemsCount}</span>
                )}
              </a>
            </li>
          )}

          {(user && user.isAdmin && rootPathName === 'page') && (
            <li key="admin" className={s.item} onClick={()=>{
              if (displayEditPage) { hideEditPage() } else { showEditPage() }
            }}>
              <a className={cn("z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center")}>
                <Edit />
              </a>
            </li>
          )}

          <li key="my-account" className={s.item}>
            {user ? (
              <DropdownMenu />
            ) : !displayModal ? (
              <div>
                <Button
                  className="bg-tertiary text-tertiary"
                  variant="slim"
                  onClick={() => {
                    setModalView('LOGIN_VIEW')
                    openModal()
                  }}
                >
                  ENTRAR
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
