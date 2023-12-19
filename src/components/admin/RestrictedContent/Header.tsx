import { useState } from 'react'
import { Search } from 'components/icons'
import { useRouter } from 'next/router'
import { useScreen } from 'hooks/useScreen'
import { useBreakPoints } from 'hooks/useBreakPoints'
import cn from 'classnames'

export default function Header() {
  const router = useRouter()
  const { target } = router.query

  const isSearch =
    target &&
    target[1] &&
    target[1].toString() !== 'rc-on' &&
    target[1].toString() !== 'rc-off'
      ? true
      : false

  const term =
    target &&
    target[1] &&
    target[1].toString() !== 'rc-on' &&
    target[1].toString() !== 'rc-off'
      ? target[1].toLowerCase().trim()
      : ''

  const [search, setSearch] = useState(term)
  const { isSm } = useBreakPoints()
  const { screenWidth } = useScreen()

  return (
    <div className="mt-4 px-4 mb-4 flex flex-col md:flex-row md:justify-between">
      <div>
        <select
          className="text-accent-9 bg-accent-0 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
          onChange={() => {
            if (
              isSearch ||
              (target && target[1] && target[1].toString() === 'rc-off')
            ) {
              router.push('/admin/restrictedcontent/rc-on/')
            } else {
              router.push('/admin/restrictedcontent/rc-off/')
            }
          }}
        >
          {isSearch && <option>Exibir pesquisa</option>}
          <option>
            Exibir todos{' '}
            {target && target[1] && target[1].toString() === 'rc-off'
              ? 'OFF-LINE'
              : 'ON-LINE'}
          </option>
          <option>
            Exibir todas{' '}
            {target && target[1] && target[1].toString() === 'rc-off'
              ? 'ON-LINE'
              : 'OFF-LINE'}
          </option>
        </select>
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
                    router.push(`/admin/restrictedcontent/${search}`)
                  }
                } else {
                  if (target && target[1]) {
                    router.push(`/admin/restrictedcontent/`)
                  }
                }
                setSearch('')
              }
            }}
            onClick={() => {
              if (search) {
                if (target && (!target[1] || target[1].toString() !== search)) {
                  router.push(`/admin/restrictedcontent/${search}`)
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
