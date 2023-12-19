import { useState, useEffect } from 'react'
import { useUser } from 'hooks/useUser'
import { RelationModes } from 'models'
import Image from 'next/image'
import cn from 'classnames'
import { useTheme } from 'next-themes'

import Moment from 'moment'

interface Props {
  userID: string
  index: number
  item: any
  onClickItem: any
  handleUpdate: any
  handleDelete: any
  handleSelect: any
  itemSelected: number
  isLast: boolean
  paramsItems: any
}

export default function Card(props: Props): JSX.Element {
  const {
    userID,
    item,
    index,
    onClickItem,
    handleUpdate,
    handleSelect,
    itemSelected,
    handleDelete,
    isLast,
    paramsItems,
  } = props

  const [contact, setContact] = useState({} as any)

  const [lastAction, setLastAction] = useState(null as any)
  const [badge, setBadge] = useState(0)
  const [avatarFlag, setAvatarFlag] = useState(false)

  const { theme } = useTheme()

  const { getUser } = useUser()

  useEffect(() => {
    setAvatarFlag(false)
    setBadge(item.notify)
    setLastAction(item.relation.messages && item.relation.messages.items && item.relation.messages.items[0] ? item.relation.messages.items[0].content : 'Contato adicionado')
    
    const handleContactPrivate = async () => {
      console.log('****** handleContactPrivate ******')
      const r = item.relation.id.split('_')
      const contactID = r[0] !== userID ? r[0] : r[1]
      let cto = await getUser({ id: contactID })
      if (cto) {
        cto.isRelationAdmin = item.relation.admins.indexOf(contactID) === -1 ? false : true
        setContact(cto)
      } else {
        console.log(contactID)
      }
    }

    if (item.relation.mode === RelationModes.PRIVATE) {
      handleContactPrivate()
    }
    return () => {
      setContact({} as any)
    }
  }, [item])

  return item && item.relation ? (
    <div
      key={index}
      className={cn('select-none w-full md:w-96 mx-4', {
        'pb-5': isLast,
      })}
    >
      <div
        onClick={() => {
          item.relation.contact = contact
          item.relation.isRelationAdmin =
            item.relation.admins.indexOf(userID) === -1 ? false : true
          onClickItem(item, index)
          handleSelect(index)
        }}
        className={cn(
          'w-full mt-2 p-2 shadow rounded-lg cursor-pointer z-10 flex flex-row items-center relative transition-all duration-200',
          {
            'bg-slate-300': theme === 'light' && index === itemSelected,
            'bg-slate-700': theme === 'dark' && index === itemSelected,
            'bg-slate-100 hover:bg-slate-200': theme === 'light' && index !== itemSelected,
            'bg-slate-800 hover:bg-slate-900': theme === 'dark' && index !== itemSelected,
          }
        )}
      >
        <div className="absolute flex items-center justify-center h-full right-0 top-0 mr-2">
          {false && badge > 0 && (
            <div className="flex items-center justify-center shadow bg-orange-500 h-6 w-6 text-xs font-bold rounded-full text-white">
              {badge}
            </div>
          )}
        </div>
        <div className="avatar relative flex-shrink-0">
          {avatarFlag && (
            <span className="absolute right-0 top-0 border-2 border-white mt-px mr-px flex items-center justify-center h-4 w-4 rounded-full bg-red-500"></span>
          )}
          <div className="flex rounded-full">
            <Image
              alt=""
              src={
                contact.avatar
                  ? `${process.env.MIDIA_CLOUDFRONT}${contact.avatar}`
                  : item.relation && item.relation.avatar
                  ? `${process.env.MIDIA_CLOUDFRONT}${item.relation.avatar}`
                  : item.relation && item.relation.mode === RelationModes.GROUP
                  ? '/user/group.png'
                  : '/user/user.png'
              }
              className="w-full h-full rounded-full"
              width={64}
              height={64}
              onError={(e: any) => {
                e.target.onerror = null
                e.target.src = '/user/user.png'
              }}
            />
          </div>
        </div>
        <div className="flex flex-col ml-4">
          <div className="font-semibold text-lg line-clamp-1 text-accent-9">
            {contact.active ? contact.name : item.relation.name}
          </div>
          {lastAction && <div className="text-sm text-accent-7">{lastAction}</div>}
          <div className="flex gap-2">
            {item.relation.mode === RelationModes.GROUP && (
              <div className="px-1 text-xs bg-red-500 text-white rounded">
                G
              </div>
            )}
            {item.relation.isAdmin && (
              <div className="px-2 text-xs bg-orange-400 text-white rounded">
                ADM
              </div>
            )}
            {contact.active && (
              <div className="px-2 text-xs bg-green-500 text-white rounded">
                ATIVO
              </div>
            )}
            {contact &&
              contact.groups &&
              contact.groups.items.map((g: any, k: number) => (
                <div
                  className={cn('px-2 text-white text-xs rounded uppercase', {
                    'bg-purple-600': process.env.GROUPS && process.env.GROUPS.indexOf(g.group) === 0,
                    'bg-sky-600': process.env.GROUPS && process.env.GROUPS.indexOf(g.group) === 1,
                    'bg-teal-600': process.env.GROUPS && process.env.GROUPS.indexOf(g.group) === 2,
                    'bg-yellow-600': process.env.GROUPS && process.env.GROUPS.indexOf(g.group) === 3,
                    'bg-cyan-600': process.env.GROUPS && process.env.GROUPS.indexOf(g.group) ===  4,
                  })}
                  key={k}
                >
                  {g.group}
                </div>
              ))}
            {!Moment(item.updatedAt).isSame(new Date(), 'day') && (
              <div className="text-xs text-accent-6">
                {Moment(item.updatedAt).format('DD/MM/YYYY')}
              </div>
            )}
            {Moment(item.updatedAt).isSame(new Date(), 'day') && (
              <div className="text-xs">{Moment(item.updatedAt).fromNow()}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (<></>)
}
