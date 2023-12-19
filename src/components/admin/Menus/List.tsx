import { useRouter } from 'next/router'
import { List } from 'components/ui'

import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'

import { useMenu } from 'hooks/useMenu'

import Card from './Card'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })

interface Props {
  userID: string
}

export default function ListMenus(props: Props): JSX.Element {
  const { userID } = props

  const router = useRouter()
  const { target } = router.query

  const { deleteMenu, listMenus } = useMenu()

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
      title: `Confirma excluir o menu? : ${item.title}`,
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
      toast('Menu excluído com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
      await deleteMenu({ id: item.id })
      if (item.thumbnail) { await Storage.remove(item.thumbnail, { level: 'public' })}
    }
  }

  return (<List
    keys={`${target?.toString()}`}
    userID={userID}
    emptyMessage="Nenhum menu por aqui."
    endMessage="Estes são todos os menus."
    listItems={ listMenus }
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
