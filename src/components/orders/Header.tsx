import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { OrderStatus } from 'API'
import { Search, Apps } from 'components/icons'
import { useScreen } from 'hooks/useScreen'
import { useBreakPoints } from 'hooks/useBreakPoints'
import cn from 'classnames'

interface HeaderProps {
  index: number
  item: any
  adminMode: any
}

export default function Header(props: HeaderProps) {
  const { index, item, adminMode } = props
  const router = useRouter()
  const { pathname, query } = useRouter()
  const { target } = query
  const rootPathname = pathname.split('/')[1]
  const { isSm } = useBreakPoints()
  const { screenWidth } = useScreen()

  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('')

  useEffect(() => {
    if (target && target[1]) {
      const t = target[1].toString()
      setSelected(t)
      let isStatus = t && t.toString().match(/^[0-9]+$/) !== null ? false : true
      if (isStatus) {
        setShowSearch(false)
        setSearch('')
      } else {
        setShowSearch(true)
        setSearch(t)
      }
    } else {
      setShowSearch(false)
      setSearch('')
    }
  }, [target])

  return (
    <div
      className={`flex flex-col md:flex-row justify-between px-4 mb-4 ${
        index !== 0 ? 'mt-8' : 'mt-4'
      }`}
    >
      <div>
        {index === 0 && adminMode && (
          <select
            className="text-accent-9 bg-accent-0 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(e: any) => {
              const s = e.target.value
              if (s === 'search') {
                setShowSearch(true)
                setSearch('')
              } else {
                setShowSearch(false)
                setSearch('')
                router.push(
                  `/${rootPathname}/orders/${e.target.value.toLowerCase()}/`
                )
              }
            }}
          >
            {(!target || (target && !target[1])) && (
              <option value="">SELECIONE</option>
            )}
            {target && target[1].match(/^[0-9]+$/) === null && (
              <option value={target[1].toUpperCase()}>
                Status{' '}
                {(process.env.ORDER_STATUS as any)[target[1].toUpperCase()]}
              </option>
            )}

            <option value={OrderStatus.STANDBY}>
              Status {(process.env.ORDER_STATUS as any).STANDBY}
            </option>
            <option value={OrderStatus.REJECTED}>
              Status {(process.env.ORDER_STATUS as any).REJECTED}
            </option>
            <option value={OrderStatus.APPROVED}>
              Status {(process.env.ORDER_STATUS as any).APPROVED}
            </option>
            <option value={OrderStatus.IN_PREPARATION}>
              Status {(process.env.ORDER_STATUS as any).IN_PREPARATION}
            </option>
            <option value={OrderStatus.IN_TRANSIT}>
              Status {(process.env.ORDER_STATUS as any).IN_TRANSIT}
            </option>
            <option value={OrderStatus.DELIVERED}>
              Status {(process.env.ORDER_STATUS as any).DELIVERED}
            </option>
            <option value={OrderStatus.CANCELED}>
              Status {(process.env.ORDER_STATUS as any).CANCELED}
            </option>
            {search && (
              <option
                selected={
                  selected === 'search' || selected.match(/^[0-9]+$/) !== null
                    ? true
                    : false
                }
                value="search"
              >
                Exibir pesquisa
              </option>
            )}
          </select>
        )}
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
            placeholder="Pesquisar número do pedido"
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
                    router.push(`/${rootPathname}/orders/${search}/`)
                  }
                } else {
                  if (target && target[1]) {
                    router.push(`/${rootPathname}/orders/`)
                  }
                }
                setSearch('')
              }
            }}
            onClick={() => {
              if (search) {
                if (target && (!target[1] || target[1].toString() !== search)) {
                  router.push(`/${rootPathname}/orders/${search}/`)
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
