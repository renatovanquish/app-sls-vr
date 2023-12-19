import { FC, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import s from './Filterbar.module.css'

interface Props {
  className?: string
  id?: string
}

const Filterbar: FC<Props> = ({ className, id = 'filter' }) => {
  const router = useRouter()
  const { pathname, query } = useRouter()
  const { status, search } = query
  let rootPathname = pathname.split('/')[1]

  useEffect(() => {
    // router.prefetch('/search')
    rootPathname = pathname.split('/')[1]
  }, [pathname, search, status])

  return useMemo(
    () => (
      <div
        style={{
          border: 0,
          outline: 'none',
          minWidth: 110,
        }}
        className={cn(
          'text-accent-0 relative text-sm bg-accent-7 outline-none holver:outline-none flex items-center justify-center w-full transition-colors duration-150',
          className
        )}
      >
        <label className="hidden" htmlFor={id}>
          filter
        </label>
        <select
          defaultValue={
            !search && status === 'standby'
              ? 'status|STANDBY'
              : !search && status === 'aborted'
              ? 'status|ABORTED'
              : !search && status === 'started'
              ? 'status|STARTED'
              : !search && status === 'finalized'
              ? 'status|FINALIZED'
              : !search && status === 'active'
              ? 'status|ACTIVE'
              : !search && status === 'uploading'
              ? 'status|UPLOADING'
              : 'DEFAULT'
          }
          style={{
            border: 0,
            outline: 'none',
          }}
          className="text-accent-0 bg-transparent px-3 py-2 outline-none appearance-none w-full transition duration-150 ease-in-out pr-10"
          id={id}
          onChange={(e) => {
            // e.preventDefault()
            const selected = e.currentTarget.value
            if (selected && selected !== 'DEFAULT') {
              const filter = selected.split('|')
              router.push(`/${rootPathname}?${filter[0]}=${filter[1].toLowerCase()}`)
            }
          }}
        >
          <option value="DEFAULT">Filtrar...</option>
          <option value="status|STANDBY">Aguardando</option>
          <option value="status|ACTIVE">Ativo</option>
          <option value="status|STARTED">Iniciado</option>
          <option value="status|ARCHIVED">Arquivado</option>
        </select>
      </div>
    ),
    []
  )
}

export default Filterbar
