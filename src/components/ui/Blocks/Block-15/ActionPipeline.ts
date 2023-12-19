import { v4 as uuidv4 } from 'uuid'

import { useRelation } from 'hooks/useRelation'
import { useRelationLink } from 'hooks/useRelationLink'
import { useMessage } from 'hooks/useMessage'
import { useGroupUser } from 'hooks/useGroupUser'
import { useDocument } from 'hooks/useDocument'

import Moment from 'moment'

import { RelationModes, MessagesTypes } from 'models'

export default async function ActionsPipeline(props: any) {
  const { userID, name, email, phone, title, data, groups } = props

  const { createRelation } = useRelation()
  const { createRelationLink } = useRelationLink()
  const { createMessage } = useMessage()
  const { createDocument } = useDocument()
  const { listUsersByGroup } = useGroupUser()

  const relationID = uuidv4()
  const timeStamp = Moment().unix()
  
  const members = [userID] as any
  const admins = [] as any

  const crl = await createRelationLink({
    userID,
    relationID,
    type: 'CONTACT',
    notify: 1,
    search: `${timeStamp}`,
  })
  console.log('crl',crl)

  const all = groups.split(',').map(async (group: string) => {
    console.log('group',group)
    const { items } = await listUsersByGroup({
      group,
      limit: 1000,
    })
    console.log('items',items)
    items.map(async (u: any)=>{
      console.log('u',u)
      const userExists = members.find((id: string) => id === u.userID)
      console.log('userExists',userExists)
      if (!userExists) {
        members.push(u.userID)
        admins.push(u.userID)
        const crl = await createRelationLink({
          userID: u.userID,
          relationID,
          type: 'CONTACT',
          notify: 1,
          search: `${timeStamp} ${name.toLowerCase()}`,
        })
        console.log('crl',crl)
      }
    })
  })
  
  const combine = Promise.all(all)
  await combine

  await createRelation({
    id: relationID,
    type: 'CONTACT',
    mode: RelationModes.GROUP,
    status: 'AGUARDANDO',
    name: `${title} - ${timeStamp}`,
    description: ``,
    reference: `${title}`,
    search: `${timeStamp} ${name.toLowerCase()}`,
    members,
    admins,
    updatedAt: new Date().toISOString(),
  })

  await createDocument({
    relationID,
    ownerID: userID,
    title: `${title}`,
    content: JSON.stringify({
      name,
      email,
      phone,
      data,
    }),
  })

  await createMessage({
    relationID,
    userID,
    type: MessagesTypes.TEXT,
    content: 'Grupo criado.',
    status: process.env.DEFAULT_MESSAGE_STATUS,
  })
  
  return null
}
