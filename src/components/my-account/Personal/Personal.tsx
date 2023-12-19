import PersonalData from './PersonalData'
import ChangeAvatar from './ChangeAvatar'

export default function Personal(props: any) {
  return (
    <>
      <PersonalData user={props.user} />
      <ChangeAvatar user={props.user} />
    </>
  )
}
