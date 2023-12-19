import { Layout } from 'components/common'
import { Container } from 'components/ui'
import { Deliveries } from 'components/deliveries'
import { useUserAuth } from 'components/userAuth/context'

export default function DeliveriesPage() {
  const { user } = useUserAuth()
  return (<Container>
    <Deliveries user={user} admin={false} />
  </Container>)
}

DeliveriesPage.Layout = Layout
