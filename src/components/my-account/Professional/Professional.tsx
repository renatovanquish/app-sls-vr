import ProfessionalData from './ProfessionalData'
import UserName from './UserName'

export default function Professional(props: any) {
  return (
    <>
      {true && <ProfessionalData user={props.user} />}
      {false && <UserName user={props.user} />}
    </>
  )
}
