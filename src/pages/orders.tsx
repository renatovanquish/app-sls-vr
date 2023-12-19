import { useEffect } from 'react'
import { Layout } from 'components/common'
import { Container } from 'components/ui'
import { Orders } from 'components/orders'
import { useUserAuth } from 'components/userAuth/context'
import { useUI } from 'components/ui/context'

export default function OrdersPage() {
  const { user } = useUserAuth()
  const { hideSearch, showNavBarBottom } = useUI()

  useEffect(() => {
    hideSearch()
    showNavBarBottom()
  }, [])

  return (
    <Container>
      <Orders user={user} admin={false} />
    </Container>
  )
}

OrdersPage.Layout = Layout