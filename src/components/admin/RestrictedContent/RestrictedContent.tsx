import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { List } from 'components/ui'
import { useRelation } from 'hooks/useRelation'
import { useRelationLink } from 'hooks/useRelationLink'
import { ListRelationsByStatusTypeNameQueryVariables } from 'API'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })

import Card from './Card'
import Header from './Header'

interface Props {
  userID: string
}

export default function RestrictedContent(props: Props) {
  const { userID } = props

  const router = useRouter()
  const { target } = router.query

  const isSearch =
    target &&
    target[1] &&
    target[1].toString() !== 'rc-on' &&
    target[1].toString() !== 'rc-off'
      ? true
      : false

  const search =
    target &&
    target[1] &&
    target[1].toString() !== 'rc-on' &&
    target[1].toString() !== 'rc-off'
      ? target[1].toLowerCase().trim()
      : ''

  const isOff =
    target && target[1] && target[1].toString() === 'rc-off' ? true : false

  const { listRelationsByStatusTypeName, deleteRelation } = useRelation()
  const { listRelationsLinkByRelationUser, deleteRelationLink } = useRelationLink()

  const [types, setTypes] = useState([] as any)

  useEffect(() => {
    setTypes(
      (process.env.RELATIONS as any).filter((rl: any) => {
        return rl.restricted
      })
    )
    return () => {
      setTypes([] as any)
    }
  }, [])

  const onClickItem = (e: any) => {
    const { action, item, index, handleDelete, handleSelect } = e
    if (action === 'DELETE') {
      openActionSheetDelete(item, index, handleDelete, handleSelect)
    }
  }

  const openActionSheetDelete = async (
    e: any,
    index: number,
    handleDelete: any,
    handleSelect: any
  ) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir o conteúdo? : ${e.name}`,
      message: e.name,
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
      const { items } = await listRelationsLinkByRelationUser({relationID: e.id})
      items.map(async (rll: any)=>{
        await deleteRelationLink({id: rll.id})
      })
      await deleteRelation({ id: e.id })
      handleSelect(-1)
      handleDelete(index)
      toast('Conteúdo excluído com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    }
  }

  return (
    <List
      keys={`${target && target[1] ? target[1].toString() : 'rc-on'}`}
      userID={userID}
      EmptyHeader={<Header />}
      emptyMessage="Nenhum conteúdo restrito encontrado."
      endMessage="Estes são todos os conteúdos restritos."
      listItems={listRelationsByStatusTypeName}
      variables={
        isSearch
          ? ({
              status: isOff ? 'rc-off' : 'rc-on',
              filter: {
                search: {
                  contains: search,
                },
              },
              limit: 1000,
              nextToken: null,
            } as ListRelationsByStatusTypeNameQueryVariables)
          : ({
              status: isOff ? 'rc-off' : 'rc-on',
              limit: 100,
              nextToken: null,
            } as ListRelationsByStatusTypeNameQueryVariables)
      }
      layout="flexCol"
      Card={Card}
      onClickItem={onClickItem}
      breakItems="TYPE"
      paramsItems={{ types }}
      sortParams={[
        { name: 'type', reverse: false },
        { name: 'name', reverse: false },
      ]}
    />
  )
}
