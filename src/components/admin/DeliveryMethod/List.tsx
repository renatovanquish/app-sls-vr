import { useRouter } from 'next/router'
import { List } from 'components/ui'

import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'
import { useDeliveryMethodOrder } from 'hooks/useDeliveryMethodOrder'
import Card from './Card'

interface Props {
  userID: string
}

export default function ListDeliveryMethod(props: Props): JSX.Element {
  const { userID } = props

  const router = useRouter()
  const { target } = router.query

  const { deleteDeliveryMethodOrder, listDeliveryMethodOrders } = useDeliveryMethodOrder()

  const onClickItem = (e: any) => {
    const { action, item, index, handleDelete, handleSelect } = e
    if (action === 'DELETE') {
      openActionSheetPage(item, index, handleDelete, handleSelect)
    }
  }

  const openActionSheetPage = async (
    item: any,
    index: number,
    handleDelete: any,
    handleSelect: any
  ) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir o metodo de entrega? : ${item.name}`,
      options: [
        {
          title: 'NÃO',
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: 'SIM',
        },
      ],
    })
    if (promptRet.index === 1) {
      await handleSelect(-1)
      await handleDelete(index)
      toast('Metodo de entrega excluído com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
      await deleteDeliveryMethodOrder({ id: item.id })
    }
  }

  return (<List
    keys={`${target?.toString()}`}
    userID={userID}
    emptyMessage="Nenhum metodo de entrega por aqui."
    endMessage="Estas são todas os metodos de entrega."
    listItems={ listDeliveryMethodOrders }
    variables={{
      limit: 50,
      nextToken: null,
    }}
    layout="flexCol"
    Card={Card}
    onClickItem={onClickItem}
    sortParams={[
      {name: 'order', reverse: false}
    ]}
  />)
}
