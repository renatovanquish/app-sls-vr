import { Info } from 'components/icons'

interface Props {
  message: string
}

export default function EmptyMessage(props: Props) {
  const { message } = props
  return (
    <div className="p-5 select-none">
      <div className="px-4 py-4 w-full rounded shadow bg-tertiary text-tertiary">
        <div className="flex-1">
          <Info />
          <label className="ml-2 font-semibold">{message}</label>
        </div>
      </div>
    </div>
  )
}
