import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useLog } from 'hooks/useLog'
import { useUser } from 'hooks/useUser'
import { List } from 'components/ui'
import { ModelSortDirection } from 'API'
import { LogSource } from 'models'
import { validate } from 'email-validator'
import { useScreen } from 'hooks/useScreen'
import Card from './Card'
import Header from './Header'

import { API, graphqlOperation } from 'aws-amplify'
import * as subscriptions from 'graphql/subscriptions'

interface Props {
  user: any
}

export default function Logs(props: Props): JSX.Element {
  const { user } = props
  const router = useRouter()
  const { target } = router.query
  const { screenHeight } = useScreen()
  
  const { listLogBySource, listLogByUser } = useLog()
  const { getUserByEmail, getUserByPhone } = useUser()
  const [searchUserID, setSearchUserID] = useState('')
  const [itemCreated, setItemCreated] = useState({} as any)

  useEffect(() => {
    if (user && user.id) {
      const subscriptionCreate = API.graphql(
        graphqlOperation(subscriptions.onCreateLog)
      )
        // @ts-ignore
        .subscribe({
          next: async (data: any) => {
            const d = data.value.data.onCreateLog
            if (searchUserID) {
              if (d.userID === searchUserID) {
                setItemCreated(d)
              }
            } else {
              setItemCreated(d)
            }
          },
          error: (error: any) => console.warn(error),
        })

      return () => {
        subscriptionCreate.unsubscribe()
      }
    }
  }, [user, searchUserID])

  useEffect(() => {
    const fetchByEmail = async (email: string) => {
      const u = await getUserByEmail({ email })
      setSearchUserID(u.id)
    }
    const fetchByPhone = async (phone: string) => {
      const u = await getUserByPhone({ phone })
      setSearchUserID(u.id)
    }

    if (target && target[1]) {
      const t = target[1].toString()
      let isNumber = t && t.match(/^[0-9]+$/) !== null ? true : false
      if (isNumber) {
        let loginFmt
        const onlyNumbers = t.replace(/\D/g, '')
        if (onlyNumbers.substr(0, 2) !== '55') {
          loginFmt = '+55' + onlyNumbers
        } else {
          loginFmt = '+' + onlyNumbers
        }
        fetchByPhone(loginFmt)
      } else if (validate(t.toLowerCase())) {
        fetchByEmail(t)
      } else {
        setSearchUserID(t)
      }
    } else {
      setSearchUserID('')
    }
  }, [target])

  return !user ? (
    <></>
  ) : (
    <List
      keys={`${searchUserID}`}
      userID={user.id}
      EmptyHeader={<Header />}
      emptyMessage="Nenhum log por aqui."
      endMessage="Estes são todos os logs."
      listItems={searchUserID ? listLogByUser : listLogBySource}
      variables={
        searchUserID
          ? {
              userID: searchUserID,
              limit: 50,
              sortDirection: ModelSortDirection.DESC,
              nextToken: null,
            }
          : {
              source: LogSource.APP,
              limit: 50,
              sortDirection: ModelSortDirection.DESC,
              nextToken: null,
            }
      }
      layout="flexCol"
      Card={Card}
      breakItems="CREATEDAT"
      onCreatedItem={itemCreated}
      sortParams={[{ name: 'createdAt', reverse: true }]}
      height={screenHeight}
    />
  )
}
