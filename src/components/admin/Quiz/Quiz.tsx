import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { List } from 'components/ui'
import { useQuiz } from 'hooks/useQuiz'
import { QuizStatus } from 'API'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'

import Card from './Card'
import Header from './Header'

interface Props {
  userID: string
}

export default function QuizContent(props: Props) {
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
    target && target[1] && target[1].toString() === 'rc-off' ? true : false

  const { listQuizByStatus, deleteQuiz, listQuestionsByQuiz, deleteQuizQuestion } = useQuiz()

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
      title: `Confirma excluir o quiz? : ${e.name}`,
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
      const { items } = await listQuestionsByQuiz({quizID: e.id})
      items.map(async (rll: any)=>{
        await deleteQuizQuestion({id: rll.id})
      })
      await deleteQuiz({ id: e.id })
      handleSelect(-1)
      handleDelete(index)
      toast('Quiz excluído com sucesso.', {
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
      emptyMessage="Nenhum quiz encontrado."
      endMessage="Estes são todos os quiz."
      listItems={listQuizByStatus}
      variables={
        isSearch
          ? ({
              status: isOff ? 'OFF' : 'ON',
              filter: {
                search: {
                  contains: search,
                },
              },
              limit: 1000,
              nextToken: null,
            } as any)
          : ({
              status: isOff ? 'OFF' : 'ON',
              limit: 100,
              nextToken: null,
            } as any)
      }
      layout="flexCol"
      Card={Card}
      onClickItem={onClickItem}
      breakItems="TYPE"
      sortParams={[
        { name: 'name', reverse: false },
      ]}
    />
  )
}
