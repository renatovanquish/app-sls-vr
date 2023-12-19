import { useRouter } from 'next/router'
import { List } from 'components/ui'

import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'

import { useCoupon } from 'hooks/useCoupon'

import Card from './Card'
import Header from './Header'

interface Props {
  userID: string
}

export default function ListCoupons(props: Props): JSX.Element {
  const { userID } = props

  const router = useRouter()
  const { target } = router.query

  const { deleteCoupon, listCoupons } = useCoupon()

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
      title: `Confirma excluir o cupom? : ${item.name}`,
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
      toast('Cupom excluído com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
      await deleteCoupon({ id: item.id })
    }
  }

  return (
    <List
      keys={`${target?.toString()}`}
      userID={userID}
      EmptyHeader={<Header />}
      emptyMessage="Nenhum cupom de desconto por aqui."
      endMessage="Estes são todos os cupons de desconto."
      listItems={listCoupons}
      variables={
        target && target[1]
          ? {
              filter: {
                search: {
                  contains:
                    target && target[1] ? target[1].toLowerCase().trim() : '',
                },
              },
              limit: 1000,
              nextToken: null,
            }
          : {
              limit: 50,
              nextToken: null,
            }
      }
      layout="flexCol"
      Card={Card}
      onClickItem={onClickItem}
      sortParams={[{ name: 'name', reverse: false }]}
    />
  )
}
