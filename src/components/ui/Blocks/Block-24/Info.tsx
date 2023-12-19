import Moment from 'moment'

interface Props {
  contentSel: any
}

export default function Info(props: Props) {
  const { contentSel } = props
  return contentSel ? (
    <div className="my-4">
      <div className="text-tertiary-2 text-xl font-bold">
        {contentSel.title}
      </div>
      {contentSel.description && (
        <div className="font-bold text-accent-9">{contentSel.description}</div>
      )}
      {contentSel.notes && (
        <div className="text-accent-5">{contentSel.notes}</div>
      )}
      {contentSel.lifetime === 'PERIOD' && contentSel.expiration && (
        <div className="mt-2 text-xs bg-red-500 text-white px-1 rounded tooltip">
          EXPIRA EM {Moment(contentSel.expiration).format('DD-MM-YYYY')}
        </div>
      )}
    </div>
  ) : (
    <></>
  )
}
