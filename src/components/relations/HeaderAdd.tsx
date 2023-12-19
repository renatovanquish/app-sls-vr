import { useUI } from 'components/ui/context'

export default function HeaderAdd(props: any) {
  const { setItemListMode, itemListMode } = useUI()

  return itemListMode === 'addPrivate' || itemListMode === 'addGroup' ? (
    <div className="pb-4 md:mt-0 flex justify-start">
      <div className="btn-group">
        <a
          onClick={() => setItemListMode('addPrivate')}
          className={`btn btn-sm ${
            itemListMode === 'addPrivate'
              ? 'border-none bg-tertiary text-tertiary'
              : 'border-tertiary  bg-accent-0 text-tertiary-2'
          }`}
        >
          NOVO CONTATO
        </a>
        <a
          onClick={() => setItemListMode('addGroup')}
          className={`btn btn-sm ${
            itemListMode === 'addGroup'
              ? 'border-none bg-tertiary text-tertiary'
              : 'border-tertiary bg-accent-0 text-tertiary-2'
          }`}
        >
          NOVO GRUPO
        </a>
      </div>
    </div>
  ) : (
    <></>
  )
}
