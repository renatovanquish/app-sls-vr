import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.css'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import React, { FC, useEffect, useState } from 'react'
import { Cross, Cog, Check2 } from 'components/icons'
import { Device } from '@capacitor/device'
import {
  Navbar,
  NavbarProfile,
  NavbarAdmin,
  BottomNavBar,
} from 'components/common'
import { SidebarRight, Button, Modal, Loading } from 'components/ui'
import { ToastContainer } from 'react-toast'

import { useUI } from 'components/ui/context'
import { useUserAuth } from 'components/userAuth/context'

import LoginView from 'components/userAuth/LoginView'
import { FeatureBar } from 'components/common'

import { useBreakPoints } from 'hooks/useBreakPoints'
import { useScreen } from 'hooks/useScreen'
import { useAcceptCookies } from 'hooks/useAcceptCookies'
import LoadingBar from 'react-top-loading-bar'

const LoadingComponent = () => (
  <div className="m-6 text-sm text-tertiary-2">
    <Loading />
  </div>
)

const SignUpView = dynamic(() => import('components/userAuth/SignUpView'), {
  loading: () => <LoadingComponent />,
  ssr: false,
})

const ConfirmCode = dynamic(() => import('components/userAuth/ConfirmCode'), {
  loading: () => <LoadingComponent />,
  ssr: false,
})

const ForgotPassword = dynamic(() => import('components/userAuth/ForgotPassword'), {
  loading: () => <LoadingComponent />,
  ssr: false,
})

const ChangePassword = dynamic(() => import('components/userAuth/ChangePassword'), {
  loading: () => <LoadingComponent />,
  ssr: false,
})

const CookiesMng = dynamic(() => import('components/userAuth/CookiesMng'), {
  loading: () => <LoadingComponent />,
  ssr: false,
})

interface Props {
  children: React.ReactNode
  pageProps: {}
}

const Layout: FC<Props> = ({ children, pageProps }) => {
  const {
    displaySidebarRight,
    closeSidebarRight,
    displayModal,
    closeModal,
    modalView,
    displayNavBarBottom,
    openModal,
    setModalView,
    displaySearch,
    progress,
    setProgress,
    setHeightNavBar,
  } = useUI()

  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

  const router = useRouter()
  const { pathname, locale = 'pt-BR' } = router
  const rootPathname = pathname.split('/')[1]
  const isMyAccount = rootPathname === 'my-account'
  const isAdmin = rootPathname === 'admin'

  const { user, isLoading, isAuthenticating } = useUserAuth()

  const { isSm, isMd } = useBreakPoints()
  const { screenHeight } = useScreen()
  const { setTheme } = useTheme()
  const [tertiary, setTertiary] = useState('')

  useEffect(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--tertiary')
    setTertiary(color)
    if (!process.env.THEME || process.env.THEME === 'light') {
      setTheme('light')
    } else if (process.env.THEME === 'dark') {
      setTheme('dark')
    }
  }, [])

  return (
    <div className={cn(s.root)}>
      <ToastContainer
        position={isSm ? 'bottom-center' : 'bottom-right'}
        delay={5000}
      />

      <LoadingBar
        color={tertiary}
        progress={isAuthenticating || isLoading ? 100 : progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {isSm && isMyAccount && <NavbarProfile />}
      {isSm && isAdmin && <NavbarAdmin />}

      {!isAdmin && !isMyAccount && (
        <Navbar
          user={user}
          displaySearch={displaySearch}
          links={[{ href: '/', label: '' }]}
        />
      )}

      <main>{children}</main>

      <SidebarRight open={displaySidebarRight} onClose={closeSidebarRight}>
        <Notifications closeSidebarRight={closeSidebarRight} />
      </SidebarRight>

      {!isLoading && !user && (
        <Modal
          title={
            modalView === 'COOKIES_MNG' && (
              <div className="mt-2 text-2xl font-semibold">Cookies no App</div>
            )
          }
          focusTrap={false}
          open={displayModal}
          onClose={closeModal}
        >
          <div
            className="mx-auto overflow-y-auto"
            style={{
              maxHeight: screenHeight,
              maxWidth: !isSm && modalView === 'SIGNUP_VIEW' ? 800 : 480,
            }}
          >
            {modalView === 'SIGNUP_VIEW' && <SignUpView />}
            {modalView === 'CONFIRM_VIEW' && <ConfirmCode />}
            {modalView === 'LOGIN_VIEW' && <LoginView />}
            {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
            {modalView === 'CHANGE_PASSWORD_VIEW' && <ChangePassword />}
            {modalView === 'COOKIES_MNG' && <CookiesMng />}
          </div>
        </Modal>
      )}

      <FeatureBar
        title="Este app usa cookies para melhorar sua experiência. Ao aceitar, você concorda com nossa Política de Privacidade."
        hide={acceptedCookies}
        action={
          <div
            className={cn('pt-3', {
              'pb-16 md:pb-0': displayNavBarBottom,
            })}
          >
            <Button
              onClick={() => {
                setModalView('COOKIES_MNG')
                openModal()
              }}
            >
              <Cog height={21} className="mr-2" />
              Opções
            </Button>
            <Button
              className="mt-3 md:mt-0 md:ml-3"
              onClick={() => onAcceptCookies()}
            >
              <Check2 height={21} className="mr-2" />
              Aceitar cookies
            </Button>
          </div>
        }
      />

      {!isLoading && displayNavBarBottom && (
        <div className="block md:hidden">
          <BottomNavBar user={user} />
        </div>
      )}
    </div>
  )
}

export default Layout

/**
 * Notifications
 */
function Notifications(props: any) {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-primary">
        <div className="flex">
          <div className="flex-grow h-16 p-4">
            <h2 className="text-xl font-bold text-accent-8">Notificações</h2>
          </div>
          <div className="flex-none w-16 h-16 p-4">
            <button
              onClick={props.closeSidebarRight}
              aria-label="Close"
              className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none"
            >
              <Cross className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 overflow-y-auto">
        <div onClick={props.closeSidebarRight}>
          <div className="flex w-full transform transition-all duration-300">
            <div className="p-3">Nenhuma nova notificação.</div>
          </div>
          <hr className="border-accent-2 my-3" />
        </div>

        {[].map((i: any, index: number) => (
          <div key={index} onClick={props.closeSidebarRight}>
            <div className="flex w-full transform transition-all duration-300">
              <div className="bg-accent-2 block h-5 w-5 rounded-full overflow-hidden"></div>
              <div className="p-3"></div>
            </div>
            <hr className="border-accent-2 my-3" />
          </div>
        ))}
      </div>
    </div>
  )
}
