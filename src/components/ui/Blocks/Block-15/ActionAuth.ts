import { toast } from 'react-toast'
import { useUser } from 'hooks/useUser'

export default async function ActionAuth(props: any) {
  const { name, email, phone } = props
  const { userExists, adminCreateUser } = useUser()

  const userExistsResult = await userExists({ email, phone })
  let userID = userExistsResult.id

  if (!userID) {
    const { createdUser } = await adminCreateUser({ name, email, phone })
    userID = createdUser.id
  }

  if (!userID) {
    toast.error(`Houve um problema com a criação ou identificação do usuário.`)
    return null
  }

  return { 
    id: userID, 
    name: userExistsResult && userExistsResult.name ? userExistsResult.name : name
  }
}
