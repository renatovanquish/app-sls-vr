import { Storage } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { LoadingDots } from 'components/ui'
import { useMessage } from 'hooks/useMessage'
import { ModelSortDirection, MessagesTypes } from 'API'
import { useStorage } from 'hooks/useStorage'
import { Trash, Check2 } from 'components/icons'
import { useTheme } from 'next-themes'
import cn from 'classnames'
import { toast } from 'react-toast'
import { useBreakPoints } from 'hooks/useBreakPoints'
import Image from 'next/image'

import { API } from 'aws-amplify'
import * as subscriptions from 'graphql/subscriptions'

import Content from './Content'

import Moment from 'moment'

export default function ListMessages(props: any) {
  const { userID, relationID, restrictedContentID, id, title, moderation } = props
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<any[]>([])
  const { listMessagesByRelationCreatedAt, listMessagesByRestrictedContentCreatedAt, deleteMessage } = useMessage()
  const { isSm } = useBreakPoints()
  const [confirmDelete, setConfirmDelete] = useState(-1)
  const { theme } = useTheme()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const getMessagesByRelation = async () => {
        const { items, nextToken } = await listMessagesByRelationCreatedAt({
          relationID,
          sortDirection: ModelSortDirection.ASC,
          limit: 200,
        })
        console.log(items, nextToken)
        setMessages(items)
        setIsLoading(false)
      }
      const getMessagesByRestrictedContent = async () => {
        const { items, nextToken } = await listMessagesByRestrictedContentCreatedAt({
          restrictedContentID,
          sortDirection: ModelSortDirection.ASC,
          limit: 250,
        })
        setMessages(items)
        setIsLoading(false)
      }

      if (id === 'relationID' && relationID) {
        getMessagesByRelation()
      } else if (id === 'restrictedContentID' && restrictedContentID) {
        getMessagesByRestrictedContent()
      }
    }
    return () => {
      isMounted = false
      setMessages([])
      setIsLoading(false)
    }
  }, [relationID, restrictedContentID])

  useEffect(() => {
    if (relationID) {
      const subscription = API.graphql(
        {
          query: subscriptions.onCreateMessage,
          variables: { relationID },
        }
      )
        // @ts-ignore
        .subscribe({
          next: (data: any) => {
            if (
              data &&
              data.value &&
              data.value.data &&
              data.value.data.onCreateMessage
            ) {
              const n = data.value.data.onCreateMessage
              setMessages((messages: any) => [...messages, n])
            }
          },
          error: (error: any) => console.warn(error),
        })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [relationID])

  const deleteContent = async (k: number, m: any) => {
    if (confirmDelete === k) {
      setMessages(
        messages.map((item: any, index: number) => {
          if (index !== k) {
            return item
          }
        })
      )
      toast.hideAll()
      toast.info('Comentário excluído com sucesso.')
      await deleteMessage({ id: m.id })
      if (m.type === MessagesTypes.AUDIO) {
        await Storage.remove(m.content, { level: 'protected' })
        const extension = m.content.split('.').pop()
        await Storage.remove(m.content.replace(extension, 'mp3'), {
          level: 'protected',
        })
      } else if (m.type === MessagesTypes.IMAGE) {
        const images = JSON.parse(m.content)
        images.map(async (image: any) => {
          await Storage.remove(image.key, { level: 'protected' })
        })
      }
      setConfirmDelete(-1)
    } else {
      setConfirmDelete(k)
    }
  }

  return (
    <div>
      {title && <div className="mb-2 text-xl font-semibold">{title}</div>}
      <div className="w-full">
        {isLoading && <LoadingDots />}
        {!isLoading &&
          messages.length > 0 &&
          messages.map(
            (m: any, k: number) =>
              (m && (!moderation || (moderation && (m.status === 'APPROVED' || userID === m.userID)))) && (
                <div
                  key={k}
                  style={
                    userID === m.userID
                      ? {
                          width: isSm ? '88%' : '90%',
                          marginRight: isSm ? '3%' : '0%',
                          marginLeft: isSm ? '12%' : '10%',
                        }
                      : {
                          width: isSm ? '88%' : '90%',
                          marginLeft: isSm ? '1%' : '0%',
                          marginRight: isSm ? '12%' : '10%',
                        }
                  }
                  className={cn(
                    'mt-2 md:mt-3 mx-auto overflow-hidden shadow-sm rounded-lg text-accent-6',
                    {
                      'bg-emerald-900': theme === 'dark' && k !== confirmDelete && userID === m.userID,
                      'bg-emerald-100': theme === 'light' &&  k !== confirmDelete && userID === m.userID,
                      'bg-slate-900': theme === 'dark' && k !== confirmDelete && userID !== m.userID,
                      'bg-slate-100': theme === 'light' && k !== confirmDelete && userID !== m.userID,
                      'bg-slate-500': k === confirmDelete,
                      '': userID !== m.userID,
                    }
                  )}
                >
                  <div className="w-full p-1">
                    <div className='flex justify-between'>
                    <Content message={m} />
                    {moderation && m.status !== 'APPROVED' && <div data-tip="Aguardando moderação" className='text-orange-500 tooltip tooltip-left pt-2 pr-2'><Check2 width={18} height={18} /></div> }
                    </div>
                    
                    <div className="px-2 pb-1 flex flex-start">
                      <div
                        className={cn(
                          'h-12 w-full flex flex-row content-center leading-tight',
                          {
                            'justify-start mt-1 md:mt-2': userID !== m.userID,
                            'justify-end mt-2 md:mt-0': userID === m.userID,
                          }
                        )}
                      >
                        {userID !== m.userID && k !== confirmDelete && (
                          <div className="avatar">
                            <div className="rounded-full w-12 h-12">
                              <Image
                                alt=""
                                className="bg-accent-1 object-cover object-center flex-shrink-0 rounded-full"
                                src={
                                  m && m.user && m.user.avatar
                                    ? `${process.env.MIDIA_CLOUDFRONT}${m.user.avatar}`
                                    : '/user/user.png'
                                }
                                width={64}
                                height={64}
                                onError={(e: any) => {
                                  e.target.onerror = null
                                  e.target.src = '/user/user.png'
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col justify-center">
                          {userID !== m.userID && k !== confirmDelete && (
                            <div className={cn('ml-3 font-medium text-accent-8')}>
                              {m.user.name}
                            </div>
                          )}
                          {userID === m.userID && k !== confirmDelete && (
                            <div className={cn('ml-3 font-medium text-accent-8')}>
                              Você
                            </div>
                          )}
                          <div
                            className={cn('mt-1 flex', {
                              'ml-3': k !== confirmDelete,
                              'ml-1': k === confirmDelete,
                            })}
                          >
                            {m.userID === userID && k !== confirmDelete && (
                              <button
                                className="mr-2 text-red"
                                onClick={() => {
                                  deleteContent(k, m)
                                }}
                              >
                                <Trash width={18} height={18}/>
                              </button>
                            )}
                            {m.userID === userID && k === confirmDelete && (
                              <div className="flex">
                                <button
                                  className="btn btn-xs"
                                  onClick={() => {
                                    setConfirmDelete(-1)
                                  }}
                                >
                                  CANCELAR
                                </button>
                                <button
                                  className="ml-2 btn btn-xs btn-error text-white"
                                  onClick={() => {
                                    deleteContent(k, m)
                                  }}
                                >
                                  CONFIRMAR EXCLUSÃO?
                                </button>
                              </div>
                            )}
                            {k !== confirmDelete && (
                              <div className="text-xs">
                                {!Moment(m.createdAt).isSame(
                                  new Date(),
                                  'day'
                                ) && (
                                  <div className="flex">
                                    <span>
                                      {Moment(m.createdAt).format('DD-MM-YYYY')}
                                    </span>
                                    &nbsp;<span>às</span>&nbsp;
                                    <span>
                                      {Moment(m.createdAt).format('HH:mm')}
                                    </span>
                                  </div>
                                )}
                                {Moment(m.createdAt).isSame(
                                  new Date(),
                                  'day'
                                ) && (
                                  <div className="flex">
                                    {Moment(m.createdAt).fromNow()}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  )
}
