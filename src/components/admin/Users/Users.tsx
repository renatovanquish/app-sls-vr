import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { List, Loading } from 'components/ui'
import { validate } from 'email-validator'

import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'

import { useUser } from 'hooks/useUser'
import { useGroupUser } from 'hooks/useGroupUser'

import Card from './Card'
import Header from './Header'

interface Props {
  user: any
  search: string
}

export default function ListUsers(props: Props): JSX.Element {
  const { user, search } = props
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [isGroup, setIsGroup] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPhone, setIsPhone] = useState(false)
  const [isName, setIsName] = useState(false)

  const [userSel, setUserSel] = useState({} as any)

  const { listUsers, getUserByEmail, getUserByPhone } = useUser()
  const { listUsersByGroup } = useGroupUser()

  const getByEmail = async () => {
    setLoading(true)
    const u = await getUserByEmail({ email: search })
    setLoading(false)
    if (u) {
      setUserSel(u)
    }
  }

  const getByPhone = async () => {
    setLoading(true)
    const u = await getUserByPhone({ phone: `+55${search}` })
    setLoading(false)
    if (u) {
      setUserSel(u)
    }
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setIsGroup(false)
      setIsEmail(false)
      setIsPhone(false)
      setIsName(false)
      setUserSel({} as any)

      if (search) {
        let g = false
        ;(process.env.GROUPS as any).map((group: any) => {
          if (group === search) {
            g = true
          }
        })
        if (g) {
          setIsGroup(true)
        } else {
          if (validate(search)) {
            setIsEmail(true)
            getByEmail()
          } else if (search.match(/^[0-9]+$/) !== null) {
            setIsPhone(true)
            getByPhone()
          } else {
            setIsName(true)
          }
        }
      } else {
        setIsGroup(false)
        setIsEmail(false)
        setIsPhone(false)
        setIsName(false)
        setUserSel({} as any)
      }
    }
    return () => {
      isMounted = false
      setIsGroup(false)
      setIsEmail(false)
      setIsPhone(false)
      setIsName(false)
      setUserSel({} as any)
    }
  }, [search])

  const onClickItem = (e: any) => {}

  return (
    <div>
      {loading && (
        <div className="p-4">
          <Loading />
        </div>
      )}
      {search && (isEmail || isPhone) && (
        <div>
          {!loading && userSel.id && (
            <Card
              userID={user.id}
              index={0}
              item={userSel}
              onClickItem={onClickItem}
              handleUpdate={() => {}}
              handleDelete={() => {
                setIsGroup(false)
                setIsEmail(false)
                setIsPhone(false)
                setIsName(false)
                setUserSel({} as any)
                router.push(`/admin/users`)
              }}
              handleSelect={() => {}}
              itemSelected={0}
              isLast={true}
            />
          )}
          {!loading && !userSel.id && (
            <div>
              <Header />
              <div className="p-5">
                <div className="alert alert-error">
                  <div className="flex-1">
                    <label className="ml-2 text-white">
                      Usuário não localizado.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {(!search || isGroup || isName) && (
        <List
          keys={`${search}${isGroup}${isName}`}
          userID={user.id}
          EmptyHeader={<Header />}
          emptyMessage="Nenhum usuário por aqui."
          endMessage="Estes são todos os usuários."
          listItems={isGroup && search ? listUsersByGroup : listUsers}
          variables={
            isGroup && search
              ? {
                  group: search,
                  limit: 100,
                  nextToken: null,
                }
              : isName
              ? {
                  filter: {
                    search: {
                      contains: search,
                    },
                  },
                  limit: 1000,
                  nextToken: null,
                }
              : {
                  limit: 100,
                  nextToken: null,
                }
          }
          layout="flexCol"
          Card={Card}
          onClickItem={onClickItem}
          sortParams={[{ name: 'name', reverse: false }]}
        />
      )}
    </div>
  )
}
