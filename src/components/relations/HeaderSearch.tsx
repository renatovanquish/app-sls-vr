import { useUI } from 'components/ui/context'
import { Search, Plus2 } from 'components/icons'
import { useUserAuth } from 'components/userAuth/context'

export default function HeaderSearch(props: any) {
  const { setSearchText, setItemListMode } = useUI()
  const { user } = useUserAuth()
  return (
    <div className="w-full">
      <div className="pb-2 flex px-4">
        {user && user.isAdmin && (
          <a
            onClick={() => setItemListMode('addPrivate')}
            className="cursor-pointer mr-2 bg-accent-1 p-2 rounded-full flex items-center justify-center"
          >
            <Plus2 />
          </a>
        )}
        <div className="cursor-default relative flex items-center justify-center text-base w-full transition-colors duration-150">
          <label className="hidden">Search</label>
          <input
            className="bg-accent-1 rounded-full px-3 py-2 outline-none appearance-none w-full transition duration-150 ease-in-out"
            autoComplete="off"
            placeholder="Pesquisar..."
            onChange={(e) => {
              e.preventDefault()
              const q = e.currentTarget.value
              setSearchText(q)
            }}
          />
          <div className="text-accent-7 absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search />
          </div>
        </div>
      </div>
    </div>
  )
}
