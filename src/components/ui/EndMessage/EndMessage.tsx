interface Props {
  message: string
}

export default function EndMessage(props: Props) {
  const { message } = props
  return (
    <div className="pt-12 pb-24 text-center text-lg text-tertiary-2 font-semibold">
      {message ? message : 'Final da lista.'}
    </div>
  )
}
