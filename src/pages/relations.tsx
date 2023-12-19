import { useEffect, useState } from 'react'
import { Layout } from 'components/common'
import { Container, LoadingDots, List } from 'components/ui'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { useScreen } from 'hooks/useScreen'
import { useUserAuth } from 'components/userAuth/context'
import { useUI } from 'components/ui/context'
import { useRelation } from 'hooks/useRelation'
import { useRelationLink } from 'hooks/useRelationLink'
import { useUser } from 'hooks/useUser'
import { RelationModes } from 'models'
import cn from 'classnames'
import { Message } from 'components/message'

import {
  ModelSortDirection,
  ListRelationsLinkByUserTypeNotifyUpdatedAtQueryVariables,
} from 'API'

import { API, graphqlOperation } from 'aws-amplify'
import * as subscriptions from 'graphql/subscriptions'

import {
  FormPrivate,
  FormGroup,
  FormAvatar,
  HeaderRelation,
  Card,
  HeaderSearch,
} from 'components/relations'
export default function Relation(): JSX.Element {
  const { user } = useUserAuth()
  const { isSm } = useBreakPoints()
  const { screenHeight } = useScreen()
  const [itemUpdated, setItemUpdated] = useState({} as any)
  const [itemCreated, setItemCreated] = useState({} as any)

  const {
    hideSearch,
    showNavBarBottom,
    heightNavBar,
    searchText,
    setItemListSelected,
    itemListSelected,
    setItemListMode,
    itemListMode,
  } = useUI()

  const { getRelation } = useRelation()
  const { listRelationsLinkByUserTypeNotifyUpdatedAt } = useRelationLink()
  const { getUser } = useUser()

  useEffect(() => {
    showNavBarBottom()
    hideSearch()
    setItemListSelected(false)
    setItemListMode('')
    setItemCreated({})
    setItemUpdated({})
  }, [])

  useEffect(() => {
    if (itemListMode === 'addPrivate' || itemListMode === 'addGroup') {
      setItemListSelected(false)
    }
  }, [itemListMode])

  useEffect(() => {
    if (user) {
      const handleContactPrivate = async (item: any) => {
        console.log('****** handleContactPrivate ******')
        const r = item.id.split('_')
        const contactID = r[0] !== user.id ? r[0] : r[1]
        let cto = await getUser({ id: contactID })
        cto.isRelationAdmin =
          item.admins.indexOf(contactID) === -1 ? false : true
        return cto
      }

      const onUpdateRelationLinkSubscription = (
        API.graphql(
          graphqlOperation(subscriptions.onUpdateRelationLink, {
            userID: user.id,
          })
        ) as any
      ).subscribe({
        next: async (data: any) => {
          let onUpdateRelationLink = data.value.data.onUpdateRelationLink
          let rl = await getRelation({ id: onUpdateRelationLink.relationID })
          if (rl.members.indexOf(user.id) !== -1) {
            rl.isRelationAdmin =
              rl.admins.indexOf(user.id) === -1 ? false : true
            if (rl.mode === RelationModes.PRIVATE) {
              const contact = await handleContactPrivate(rl)
              rl.contact = contact
              onUpdateRelationLink.relation = rl
              setItemUpdated(onUpdateRelationLink)
              setItemListSelected(onUpdateRelationLink)
            } else {
              rl.contact = {}
              onUpdateRelationLink.relation = rl
              setItemUpdated(onUpdateRelationLink)
              setItemListSelected(onUpdateRelationLink)
            }
          }
        },
        error: (error: any) => console.warn(error),
      })

      const onCreateRelationLinkSubscription = (
        API.graphql(
          graphqlOperation(subscriptions.onCreateRelationLink, {
            userID: user.id,
          })
        ) as any
      ).subscribe({
        next: async (data: any) => {
          let onCreateRelationLink = data.value.data.onCreateRelationLink
          let rl = await getRelation({ id: onCreateRelationLink.relationID })
          if (rl.members.indexOf(user.id) !== -1) {
            rl.isRelationAdmin =
              rl.admins.indexOf(user.id) === -1 ? false : true
            if (rl.mode === RelationModes.PRIVATE) {
              const contact = await handleContactPrivate(rl)
              rl.contact = contact
              onCreateRelationLink.relation = rl
              setItemCreated(onCreateRelationLink)
              setItemListSelected(onCreateRelationLink)
            } else {
              setItemCreated(onCreateRelationLink)
              setItemListSelected(onCreateRelationLink)
            }
          }
        },
        error: (error: any) => console.warn(error),
      })

      return () => {
        onUpdateRelationLinkSubscription.unsubscribe()
        onCreateRelationLinkSubscription.unsubscribe()
      }
    }
  }, [user])

  const onClickItem = async (item: any) => {
    setItemListMode('')
    setItemListSelected(item ? item : false)
  }

  return (
    <Container>
      <div
        className={cn('grid grid-cols-1', {
          'md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4':
            itemListSelected ||
            itemListMode === 'addPrivate' ||
            itemListMode === 'addGroup',
        })}
      >
        <div
          className={`md:col-span-1 ${
            itemListSelected ||
            itemListMode === 'addPrivate' ||
            itemListMode === 'addGroup'
              ? 'hidden'
              : ''
          } md:block`}
        >
          <div
            className="overflow-y-auto"
            style={{ height: screenHeight - heightNavBar }}
          >
            {!isSm && itemListSelected && (
              <div className="mt-4">
                <HeaderSearch />
              </div>
            )}
            {!user && <LoadingDots />}
            {user && (
              <List
                keys={`${searchText}`}
                userID={user.id}
                emptyMessage="Nenhum contato encontrado."
                endMessage="Estes são todos os contatos."
                height={
                  screenHeight -
                  (!isSm && itemListSelected ? heightNavBar + 64 : heightNavBar)
                }
                listItems={listRelationsLinkByUserTypeNotifyUpdatedAt}
                variables={
                  searchText
                    ? ({
                        userID: user.id,
                        typeNotifyUpdatedAt: {
                          beginsWith: { type: 'CONTACT' },
                        },
                        filter: {
                          search: {
                            contains: searchText.toString().toLowerCase(),
                          },
                        },
                        sortDirection: ModelSortDirection.DESC,
                        limit: 1000,
                        nextToken: null,
                      } as ListRelationsLinkByUserTypeNotifyUpdatedAtQueryVariables)
                    : ({
                        userID: user.id,
                        typeNotifyUpdatedAt: {
                          beginsWith: { type: 'CONTACT' },
                        },
                        sortDirection: ModelSortDirection.DESC,
                        limit: 20,
                        nextToken: null,
                      } as ListRelationsLinkByUserTypeNotifyUpdatedAtQueryVariables)
                }
                layout="flex"
                onClickItem={onClickItem}
                Card={Card}
                onUpdatedItem={itemUpdated}
                onCreatedItem={itemCreated}
              />
            )}
          </div>
        </div>

        {(itemListSelected ||
          itemListMode === 'addPrivate' ||
          itemListMode === 'addGroup') && (
          <div className="md:col-span-1 lg:col-span-2 2xl:col-span-3">
            <div
              style={{ height: screenHeight - heightNavBar }}
              className={`${!isSm ? 'overflow-y-auto' : 'pb-24'}`}
            >
              {!isSm && itemListSelected && (
                <div className="mt-4">
                  <HeaderRelation relation={itemListSelected.relation} />
                </div>
              )}

              {((itemListMode === 'edit' &&
                itemListSelected.relation.mode === RelationModes.PRIVATE) ||
                itemListMode === 'addPrivate') && (
                <FormPrivate
                  user={user}
                  relation={
                    itemListMode === 'addPrivate'
                      ? {}
                      : itemListSelected.relation
                  }
                />
              )}
              {((itemListMode === 'edit' &&
                itemListSelected.relation.mode === RelationModes.GROUP) ||
                itemListMode === 'addGroup') && (
                <FormGroup
                  user={user}
                  relation={
                    itemListMode === 'addGroup' ? {} : itemListSelected.relation
                  }
                />
              )}
              {itemListMode === 'editAvatar' && (
                <FormAvatar relation={itemListSelected.relation} />
              )}

              {(!itemListMode && user && itemListSelected && itemListSelected.relation) && (
                <Message
                  userID={user.id}
                  relationID={itemListSelected.relation.id}
                  id="relationID"
                  members={itemListSelected.relation.members}
                />
              )}

              {false && (
                <pre className="pb-20 p-5">
                  {JSON.stringify(itemListSelected, null, 4)}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

Relation.Layout = Layout

function Card3(props: any) {
  return <pre>{JSON.stringify(props.item, null, 3)}</pre>
}
