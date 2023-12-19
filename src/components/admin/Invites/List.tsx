import { useRouter } from 'next/router'
import { List } from 'components/ui'

import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'

import { useInvite } from 'hooks/useInvite'

import Card from './Card'

interface Props {
  userID: string
}

export default function ListInvites(props: Props): JSX.Element {
  const { userID } = props

  const router = useRouter()
  const { target } = router.query

  const { deleteInvite, listInvites } = useInvite()

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
      title: `Confirma excluir o convite? : ${item.name}`,
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
      toast('Convite excluído com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
      await deleteInvite({ id: item.id })
    }
  }

  return (
    <List
      keys={`${target?.toString()}`}
      userID={userID}
      emptyMessage="Nenhuma convite por aqui."
      endMessage="Estes são todos os convites."
      listItems={listInvites}
      variables={{
        limit: 50,
        nextToken: null,
      }}
      layout="flexCol"
      Card={Card}
      onClickItem={onClickItem}
      sortParams={[{ name: 'order', reverse: false }]}
    />
  )
}
