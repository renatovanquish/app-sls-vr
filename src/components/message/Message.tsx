import InputMessage from './InputMessage'
import ListMessages from './ListMessages'

interface Props {
  id: string
  userID: string
  relationID?: string
  restrictedContentID?: string
  title?: string
  members: any[]
  closeModal?: any
  moderation?: boolean
  className?: string
}

export default function Message(props: Props) {
  const {
    userID,
    relationID,
    restrictedContentID,
    id,
    title,
    members,
    closeModal,
    moderation,
    className
  } = props

  return (
    <div className={className}>
      <ListMessages
        userID={userID}
        relationID={relationID}
        restrictedContentID={restrictedContentID}
        id={id}
        title={title}
        moderation={moderation}
      />

      <InputMessage
        userID={userID}
        relationID={relationID}
        restrictedContentID={restrictedContentID}
        members={members}
        closeModal={closeModal}
      />
    </div>
  )
}
