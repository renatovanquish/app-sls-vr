import { Edit, View } from './'

interface Props {
  mode?: string
  block: any
  handleUpdate?: any
  index?: number
  onClickItem?: any
  user?: any
}

export default function Block(props: Props) {
  const { mode, block, handleUpdate, index, onClickItem, user } = props
  return mode === 'EDIT' ? (
    <Edit
      block={block}
      handleUpdate={handleUpdate}
      index={index}
      onClickItem={onClickItem}
    />
  ) : (
    <View block={block} menu={undefined} user={user} />
  )
}
