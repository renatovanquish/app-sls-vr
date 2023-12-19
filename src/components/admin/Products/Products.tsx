import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { List } from 'components/ui'
import { PageStatus } from 'models'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { useProduct } from 'hooks/useProduct'
import { toast } from 'react-toast'
import Card from './Card'
import Header from './Header'
import { ListProductsByStatusCategoryNameQueryVariables } from 'API'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })

interface Props {
  userID: string,
  categories: any,
  subCategories: any
}

export default function Products(props: Props) {
  const { userID, categories, subCategories } = props

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

  const { listProductsByStatusCategoryName, deleteProduct, listProducts } = useProduct()

  const onClickItem = (e: any) => {
    const { action, item, index, handleDelete, handleSelect } = e
    if (action === 'DELETE_PRODUCT') {
      openActionSheetProduct(item, index, handleDelete, handleSelect)
    }
  }

  const openActionSheetProduct = async (
    e: any,
    index: number,
    handleDelete: any,
    handleSelect: any
  ) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir o produto? : ${e.name}`,
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
      await deleteProduct({ id: e.id })
      await handleSelect(-1)
      await handleDelete(index)
      toast('Produto excluído com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
      if (e.thumbnail) { await Storage.remove(e.thumbnail, { level: 'public' })}
    }
  }

  return (
    <List
      keys={`${target && target[1] ? target[1].toString() : 'on'}`}
      userID={userID}
      EmptyHeader={<Header />}
      emptyMessage="Nenhum produto encontrado."
      endMessage="Estes são todos os produtos."
      listItems={isSearch ? listProducts : listProductsByStatusCategoryName}
      variables={ 
        isSearch ? {
          filter: {
            search: {
              contains: search,
            },
          },
          limit: 1000,
          nextToken: null,
        } :
        {
          status:
            target && target[1] && target[1].toString() === 'off'
              ? PageStatus.OFF
              : PageStatus.ON,
          limit: 100,
          nextToken: null,
        } as ListProductsByStatusCategoryNameQueryVariables
      }
      layout="flexCol"
      Card={Card}
      onClickItem={onClickItem}
      breakItems="CATEGORY"
      paramsItems={{categories, subCategories}}
    />
  )
}
