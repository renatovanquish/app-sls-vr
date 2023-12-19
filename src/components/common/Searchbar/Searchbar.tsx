import { FC, useState } from 'react'
import cn from 'classnames'
import s from './Searchbar.module.css'
import { useRouter } from 'next/router'
import { Search } from 'components/icons'

interface Props {
  className?: string
  id?: string
}

const Searchbar: FC<Props> = ({ className, id = 'search' }) => {
  const router = useRouter()
  const [term, setTerm] = useState('')

  return (<div
  className={cn(
    'cursor-default relative flex items-center justify-center text-base w-full transition-colors duration-150',
    className
  )}
>
  <label className="hidden" htmlFor={id}>
    Search
  </label>
  <input
    id={id}
    className={s.input}
    autoComplete="off"
    placeholder="Pesquisar..."
    value={term}
    onChange={e => setTerm(e.target.value)}
    onKeyUp={(e) => {
      e.preventDefault()
      if (e.key === 'Enter') {
        if (term) {
          router.push(`/search/${term}`)
          setTerm('')
        }
      }
    }}
    onClick={()=>{
      if (term) {router.push(`/search/${term}`)
        setTerm('')
      }
      }}
  />
  <div className={s.iconContainer} >
    <Search />
  </div>
</div>)
}

export default Searchbar
