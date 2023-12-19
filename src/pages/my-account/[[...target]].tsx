import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container } from 'components/ui'
import { Layout } from 'components/common'

import { useBreakPoints } from 'hooks/useBreakPoints'
import { useScreen } from 'hooks/useScreen'
import { useUserAuth } from 'components/userAuth/context'
import { useUI } from 'components/ui/context'

import {
  Menu,
  Personal,
  Professional,
  Addresses,
  Receipts,
  Payments,
  ChangePassword,
  AboutApp,
  Logs,
  Consent,
  Advanced,
  Orders,
  PayMethods
} from 'components/my-account'

export default function MyAccountPage() {
  const router = useRouter()
  const { target } = router.query

  const { user, getProfile } = useUserAuth()
  const { isSm } = useBreakPoints()
  const { screenHeight } = useScreen()
  const { hideSearch, showNavBarBottom, setHeightNavBar } = useUI()

  useEffect(() => {
    setHeightNavBar(0)
    showNavBarBottom()
    hideSearch()

    if (user) {
      const fetchData = async () => {
        getProfile(user.id)
      }
      fetchData()
    }
  }, [user])

  return user ? (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div className={`md:col-span-1 ${target ? 'hidden' : ''} md:block`}>
          <div
            style={{ height: screenHeight }}
            className="overflow-y-auto"
          >
            <Menu user={user} target={target?.toString()} />
          </div>
        </div>

        {(target || !isSm) && (
          <div className="md:col-span-2 lg:col-span-3">
            <div
              style={{ height: screenHeight }}
              className={`${!isSm ? 'overflow-y-auto' : 'pb-24'}`}
            >
              {((!target && !isSm) || target == 'pd') && (
                <Personal user={user} />
              )}
              {target == 'pp' && <Professional user={user} />}
              {target == 'addresses' && <Addresses />}
              {target == 'paymethods' && <PayMethods />}
              {target == 'orders' && <Orders />}
              {target == 'receipts' && <Receipts />}
              {target == 'payments' && <Payments />}
              {target == 'cpw' && <ChangePassword user={user} />}
              {target == 'logs' && <Logs user={user} />}
              {target == 'consent' && <Consent user={user} />}
              {target == 'advanced' && <Advanced />}
              {target == 'aboutapp' && <AboutApp />}

              {(target != 'logs' && target != 'orders') && <div className="h-24 lg:h-0"></div>}
            </div>
          </div>
        )}
      </div>
    </Container>
  ) : (
    <div></div>
  )
}

MyAccountPage.Layout = Layout
