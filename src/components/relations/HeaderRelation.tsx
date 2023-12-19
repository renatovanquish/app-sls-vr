import { useEffect, useState } from 'react'
import { RelationModes } from 'models'
import { ArrowLeft, Edit, Camera } from 'components/icons'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { useUI } from 'components/ui/context'

interface Props {
  relation: any
}

export default function HeaderRelation(props: Props) {
  const { relation } = props
  const { isSm } = useBreakPoints()
  const { setItemListSelected, setItemListMode, itemListMode } = useUI()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [isEditable, setIsEditable] = useState(false)
  const [isEditableAvatar, setIsEditableAvatar] = useState(false)

  useEffect(() => {
    if (relation) {
      setName(
        relation.mode === RelationModes.PRIVATE
          ? relation.contact.name
          : relation.name
      )

      const avatarTemp =
        relation.mode === RelationModes.PRIVATE
          ? relation.contact.avatar
          : relation.avatar

      setAvatar(
        avatarTemp
          ? `${process.env.MIDIA_CLOUDFRONT}${avatarTemp}`
          : relation.mode === RelationModes.GROUP
          ? '/user/group.png'
          : '/user/user.png'
      )

      setIsEditable(
        relation.isRelationAdmin &&
          itemListMode !== 'edit' &&
          (relation.mode === RelationModes.GROUP ||
            (relation.mode === RelationModes.PRIVATE &&
              !relation.contact.active))
          ? true
          : false
      )

      setIsEditableAvatar(
        relation.isRelationAdmin &&
          itemListMode !== 'editAvatar' &&
          (relation.mode === RelationModes.GROUP ||
            (relation.mode === RelationModes.PRIVATE &&
              !relation.contact.active))
          ? true
          : false
      )
    }
  }, [relation])

  return (
    <div className="w-full">
      <div className="pb-2 md:pb-0 flex px-4">
        <div className="flex justify-between bg-accent-1 rounded-full px-3 py-2 outline-none appearance-none w-full transition duration-150 ease-in-out">
          {isSm && (
            <a
              onClick={() => {
                setItemListSelected(false)
                setItemListMode('')
              }}
            >
              <ArrowLeft />
            </a>
          )}
          <div className="text-lg font-bold">{name}</div>
          <div className="flex flex-row justify-end gap-2">
            {isEditableAvatar && (
              <a
                className="cursor-pointer"
                onClick={() => setItemListMode('editAvatar')}
              >
                <Camera width={21} height={21} />
              </a>
            )}
            {isEditable && (
              <a
                className="ml-2 cursor-pointer"
                onClick={() => setItemListMode('edit')}
              >
                <Edit width={21} height={21} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
