import { useEffect, useState } from 'react'
import { Info } from 'components/icons'
import { useOrder } from 'hooks/useOrder'
import { Loading } from 'components/ui'

interface Props {
  user: any
}

export default function TabOrders(props: Props) {
  const { user } = props

  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([] as any)
  const { listOrdersByUserCreatedAt } = useOrder()

  useEffect(() => {
    if (user.id) {
      const fetchOrders = async () => {
        setLoading(true)
        const { items } = await listOrdersByUserCreatedAt({
          userID: user.id,
          limit: 1000,
        })
        setOrders(items)
        setLoading(false)
      }
      fetchOrders()
    }
    return () => {
      setOrders([] as any)
      setLoading(true)
    }
  }, [user])

  return (
    <div>
      {loading && <Loading />}
      {!loading && orders.length === 0 && (
        <div className="alert alert-warning">
          <div className="flex-1">
            <Info />
            <label className="ml-2">Nenhuma compra por aqui.</label>
          </div>
        </div>
      )}
      {!loading && orders.length > 0 && (
        <pre>{JSON.stringify(orders, null, 4)}</pre>
      )}
    </div>
  )
}
