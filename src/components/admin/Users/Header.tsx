import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { validate } from 'email-validator'
import { Search } from 'components/icons'
import cn from 'classnames'
import { useScreen } from 'hooks/useScreen'
import { useBreakPoints } from 'hooks/useBreakPoints'

export default function Header() {
  const router = useRouter()
  const { pathname, query } = useRouter()
  const { target } = query
  const rootPathname = pathname.split('/')[1]
  const [isGroup, setIsGroup] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('')
  const { screenWidth } = useScreen()
  const { isSm } = useBreakPoints()

  useEffect(() => {
    if (target && target[1]) {
      const t = target[1].toString()
      setSelected(t)
      let ig = false
      ;(process.env.GROUPS as any).map((group: any) => {
        if (group === t) {
          ig = true
        }
      })
      setIsGroup(ig)
      if (ig) {
        setSearch('')
      } else {
        setSearch(target[1])
      }
    } else {
      setSearch('')
    }
  }, [target])


  return (
    <div className="mt-4 flex flex-col md:flex-row justify-between px-4 mb-4">
      <div>
        <select
          value={selected} defaultValue={''}
          className="text-accent-9 bg-accent-0 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
          onChange={(e: any) => {
            const s = e.target.value
            if (s === 'search') {
              setSearch('')
            } else {
              setSearch('')
              router.push(`/admin/users/${s}/`)
            }
          }}
        >
          <option value="">Exibir todos</option>
          {(process.env.GROUPS as any).map((group: string, index: number) => (
            <option
              key={index}
              value={group}
            >
              Exibir grupo {group}
            </option>
          ))}
          {search && (
            <option value="search">
              Exibir pesquisa
            </option>
          )}
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
            placeholder="Nome, email ou telefone."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            onKeyUp={(e) => {
              e.preventDefault()
              if (e.key === 'Enter') {
                if (search) {
                  router.push(`/admin/users/${search}/`)
                } else {
                  router.push(`/admin/users/`)
                }
                setSearch('')
              }
            }}
            onClick={() => {
              if (search) {
                router.push(`/admin/users/${search}/`)
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
