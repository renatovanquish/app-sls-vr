import { useEffect, useState } from 'react'
import { List } from 'components/ui'
import { useDeliveryOrder } from 'hooks/useDeliveryOrder'
import { useTheme } from 'next-themes'
import { ModelSortDirection, DeliveryStatus } from 'API'

import Card from './Card'

import Moment from 'moment'


interface Props {
  user: any
  admin?: boolean
  status?: string
}

export default function Deliveries(props: Props) {
  const { user, admin, status } = props
  const adminMode = admin === true && (user && user.isAdmin) ? true : false
  const [reload, setReload] = useState(0)
  const { listDeliveryByUserDate, listDeliveryByStatusDate } = useDeliveryOrder()

  return user && user.id ? (
    <List
        keys={`${status}${reload}`}
        userID={user.id}
        emptyMessage="Nenhuma programação de entrega por aqui."
        endMessage="Estas são todas as programações de entrega."
        listItems={
          adminMode ? listDeliveryByStatusDate : listDeliveryByUserDate
        }
        variables={
          adminMode
            ? {
                status: DeliveryStatus.NEEDS_ACTION,
                limit: 50,
                nextToken: null,
              }
            : {
                deliveryUserID: user.id,
                limit: 50,
                sortDirection: ModelSortDirection.DESC,
                nextToken: null,
              }
        }
        layout="flexCol"
        Card={Card}
        breakItems="DATE"
        paramsItems={{ adminMode }}
      />
  ) : (
    <></>
  )
}