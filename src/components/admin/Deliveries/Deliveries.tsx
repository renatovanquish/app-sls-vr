import { Deliveries } from 'components/deliveries'
import { useUserAuth } from 'components/userAuth/context'

export default function DeliveriesPage() {
  const { user } = useUserAuth()
  return <Deliveries user={user} admin={user.isAdmin} />
}