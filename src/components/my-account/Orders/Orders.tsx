import { Orders } from 'components/orders'
import { useUserAuth } from 'components/userAuth/context'

export default function OrdersPage() {
  const { user } = useUserAuth()
  return <Orders user={user} admin={false} />
}
