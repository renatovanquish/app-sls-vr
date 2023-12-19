import { useState } from 'react'
import { Search } from 'components/icons'
import { useRouter } from 'next/router'
import { useScreen } from 'hooks/useScreen'
import { useBreakPoints } from 'hooks/useBreakPoints'
import cn from 'classnames'

export default function Header() {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const { target } = router.query
  const { isSm } = useBreakPoints()
  const { screenWidth } = useScreen()
  return (
    <div className="mt-4 px-4 mb-4 flex flex-col md:flex-row md:justify-between">
      <div>
        <h2 className="tracking-widest text-xs title-font font-medium text-tertiary-2 mb-1">
          CUPONS
        </h2>
        <h1 className="title-font text-xl font-medium text-accent-9 capitalize">
          De Desconto
        </h1>
      </div>
      <div
        className="mt-3 md:mt-0"
        style={{ width: isSm ? screenWidth - 32 : 300 }}
      >
        <div
          className={cn(
            'cursor-default relative flex items-center justify-center text-base w-full transition-colors duration-150'
          )}
        >
          <input
            id="searchHeader"
            className="text-accent-9 py-2 bg-accent-0 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            autoComplete="off"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            onKeyUp={(e) => {
              e.preventDefault()
              if (e.key === 'Enter') {
                if (search) {
                  if (
                    target &&
                    (!target[1] || target[1].toString() !== search)
                  ) {
                    router.push(`/admin/coupons/${search}`)
                  }
                } else {
                  if (target && target[1]) {
                    router.push(`/admin/coupons/`)
                  }
                }
                setSearch('')
              }
            }}
            onClick={() => {
              if (search) {
                if (target && (!target[1] || target[1].toString() !== search)) {
                  router.push(`/admin/coupons/${search}`)
                }
              }
              setSearch('')
            }}
          />
          <div className="cursor-pointer text-accent-7 absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search />
          </div>
        </div>
      </div>
    </div>
  )
}
