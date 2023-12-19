import { useRouter } from 'next/router'
import { List } from 'components/ui'

import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'

import { ModelSortDirection } from 'API'

import { useRelation } from 'hooks/useRelation'
import { useRelationLink } from 'hooks/useRelationLink'
import { useDocument } from 'hooks/useDocument'
import { useMessage } from 'hooks/useMessage'

import Card from './Card'
interface Props {
  user: any
}

export default function Message(props: Props): JSX.Element {
  const { user } = props

  const { listRelationsByTypeStatusUpdatedAtApiKey, deleteRelation } =
    useRelation()
  const { deleteRelationLink } = useRelationLink()
  const { deleteDocument } = useDocument()
  const { deleteMessage } = useMessage()

  const router = useRouter()
  const { target } = router.query

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
      title: `Confirma excluir a mensagem? : ${item.name}`,
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
      toast('Mensagem excluída com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })

      item.relationsLink.items.map(async (rl: any) => {
        await deleteRelationLink({ id: rl.id })
      })

      item.documents.items.map(async (d: any) => {
        await deleteDocument({ id: d.id })
      })

      item.messages.items.map(async (m: any) => {
        await deleteMessage({ id: m.id })
      })

      await deleteRelation({ id: item.id })
    }
  }

  return !user ? (
    <></>
  ) : (
    <List
      keys={`${target?.toString()}`}
      userID={user.id}
      emptyMessage="Nenhuma mensagem por aqui."
      endMessage="Estas são todas os mensagens."
      listItems={listRelationsByTypeStatusUpdatedAtApiKey}
      variables={{
        type: 'PIPELINE',
        statusUpdatedAt: {
          beginsWith: {
            status:
              target && target[1]
                ? target[1].toUpperCase()
                : 'AGUARDANDO',
          },
        },
        limit: 50,
        sortDirection: ModelSortDirection.DESC,
        nextToken: null,
      }}
      layout="flexCol"
      Card={Card}
      onClickItem={onClickItem}
      breakItems="UPDATEDAT"
    />
  )
}
