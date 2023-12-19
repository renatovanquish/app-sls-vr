import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { List } from 'components/ui'
import { usePage } from 'hooks/usePage'
import { useMenu } from 'hooks/useMenu'
import { PageStatus } from 'models'
import { ListPagesByStatusMenuOrderQueryVariables } from 'API'

import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })

import Card from './Card'
import Header from './Header'

interface Props {
  userID: string
}

export default function Pages(props: Props) {
  const { userID } = props

  const router = useRouter()
  const { target } = router.query
  const isSearch =
    target &&
    target[1] &&
    target[1].toString() !== 'on' &&
    target[1].toString() !== 'off'
      ? true
      : false
  const search =
    target &&
    target[1] &&
    target[1].toString() !== 'on' &&
    target[1].toString() !== 'off'
      ? target[1].toLowerCase().trim()
      : ''
  const isOff =
    target && target[1] && target[1].toString() === 'off' ? true : false

  const { listPagesByStatusMenuOrderCustom2, listPages, deletePage } = usePage()

  const [menus, setMenus] = useState([] as any)
  const { listMenus } = useMenu()

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      const { items } = await listMenus({ limit: 1000 })
      setMenus(
        items.sort((a: any, b: any) =>
          a.order > b.order ? 1 : b.order > a.order ? -1 : 0
        )
      )
    }
    if (isMounted) {
      fetchData()
    }
    return () => {
      setMenus([] as any)
    }
  }, [])

  const onClickItem = (e: any) => {
    const { action, item, index, handleDelete, handleSelect } = e
    if (action === 'DELETE_PAGE') {
      openActionSheetPage(item, index, handleDelete, handleSelect)
    }
  }

  const openActionSheetPage = async (
    e: any,
    index: number,
    handleDelete: any,
    handleSelect: any
  ) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir a página? : ${e.title}`,
      message: e.title,
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
      await deletePage({ id: e.id })
      await handleSelect(-1)
      await handleDelete(index)
      toast('Página excluída com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
      if (e.thumbnail) {
        await Storage.remove(e.thumbnail, { level: 'public' })
      }
    }
  }

  return (
    <List
      keys={`${target && target[1] ? target[1].toString() : 'on'}`}
      userID={userID}
      EmptyHeader={<Header />}
      emptyMessage="Nenhuma página encontrada."
      endMessage="Estas são todas as páginas."
      listItems={isSearch ? listPages : listPagesByStatusMenuOrderCustom2}
      variables={
        isSearch
          ? {
              filter: {
                search: {
                  contains: search,
                },
              },
              limit: 1000,
              nextToken: null,
            }
          : ({
              status: isOff ? PageStatus.OFF : PageStatus.ON,
              limit: 100,
              nextToken: null,
            } as ListPagesByStatusMenuOrderQueryVariables)
      }
      layout="flexCol"
      Card={Card}
      onClickItem={onClickItem}
      breakItems="MENU"
      paramsItems={{ menus }}
      sortParams={[
        { name: 'menu', reverse: false },
        { name: 'order', reverse: false },
      ]}
    />
  )
}
