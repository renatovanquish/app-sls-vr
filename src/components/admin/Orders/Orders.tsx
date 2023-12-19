import { Orders } from 'components/orders'
import { useUserAuth } from 'components/userAuth/context'

interface Props {
  status?: string
}

export default function OrdersPage(props: Props) {
  const { status } = props
  const { user } = useUserAuth()
  return <Orders user={user} admin={true} status={status} />
}