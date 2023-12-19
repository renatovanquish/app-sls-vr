import { toast } from 'react-toast'
import { v4 as uuidv4 } from 'uuid'

import { useUser } from 'hooks/useUser'
import { useRelation } from 'hooks/useRelation'
import { useRelationLink } from 'hooks/useRelationLink'
import { useMessage } from 'hooks/useMessage'
import { useGroupUser } from 'hooks/useGroupUser'

import Moment from 'moment'

import {
  RelationModes,
  MessagesTypes,
} from 'models'

export default async function Actions(data: any) {
  const { name, email, phone, type, subject, message } = data
  
  const { userExists, adminCreateUser } = useUser()
  const { createRelation } = useRelation()
  const { createRelationLink } = useRelationLink()
  const { createMessage } = useMessage()
  const { listUsersByGroup } = useGroupUser()

  const userExistsResult = await userExists({ email, phone })
  console.log('userExistsResult', userExistsResult)
  let userID = userExistsResult.id

  if (!userID) {
    const { createdUser } = await adminCreateUser({ name, email, phone })
    userID = createdUser.id
  }

  if (!userID) {
    toast.error(`Houve um problema com a criação ou identificação do usuário.`)
    return null
  }

  const { items } = await listUsersByGroup({
    group: 'Admin',
    limit: 1000
  })
  console.log(items)

  const relationID = uuidv4()
  const timeStamp = Moment().unix()

  await createRelationLink({ 
    userID, 
    relationID,
    type: 'CONTACT',
    notify: 1,
    search: `${timeStamp}`
   })

  const members = [userID] as any
  const admins = [] as any
  
  items.map(async (u:any)=>{
    if (userID !== u.userID) {
      console.log(u)
      members.push(u.userID)
      admins.push(u.userID)

      await createRelationLink({ 
        userID: u.userID, 
        relationID,
        type: 'CONTACT',
        notify: 1,
        search: `${timeStamp} ${name.toLowerCase()} ${name.toLowerCase()} ${
          userExistsResult.name && userExistsResult.name.toLowerCase()
        }`,
       })
    } 
  })

  await createRelation({
    id: relationID,
    type: 'CONTACT',
    mode: RelationModes.GROUP,
    status: 'ACTIVE',
    name: `${type ? type : 'Atendimento '} ${timeStamp}`,
    description: ``,
    reference: `${subject}`,
    search: `${timeStamp} ${name.toLowerCase()} ${name.toLowerCase()} ${
      userExistsResult.name && userExistsResult.name.toLowerCase()
    }`,
    members,
    admins,
  })


  await createMessage({
    relationID,
    restrictedContentID: null,
    userID,
    type: MessagesTypes.TEXT,
    content: message,
    search: message.toLowerCase(),
    status: process.env.DEFAULT_MESSAGE_STATUS,
  })

  return null
}
