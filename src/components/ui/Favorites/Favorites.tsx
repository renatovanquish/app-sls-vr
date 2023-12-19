import { FC, useEffect, useState } from 'react'
import { Heart } from 'components/icons'
import cn from 'classnames'
import { useUserAuth } from 'components/userAuth/context'
import { useFavorite } from 'hooks/useFavorite'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  className?: string 
  id: string
  type: string
  link: string
  content?: any
  productID?: string
  relationID?: string
  pageID?: string
}

const Favorites: FC<Props> = (props: Props) => {
  const { className, id, type, link, content, productID, relationID, pageID } = props
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [favoriteUser, setFavoriteUser] = useState<string>('')
  const [favoriteID, setFavoriteID] = useState('')
  const { user } = useUserAuth()
  const { listFavoritesByFavoriteIDUser, createFavorite, deleteFavorite } = useFavorite()


  const fetchFavorite = async (userID: string) => {
    const { items } = await listFavoritesByFavoriteIDUser({
      favoriteID: id,
      userID: { eq: userID }
    })
    if (items.length > 0) {
      setIsFavorite(items.length ? true : false)
      setFavoriteID(items[0].id)
    } else {
      setIsFavorite(false)
      setFavoriteID('')
    }
    
  }

  useEffect(() => {
    if (user) {
      setFavoriteUser(user.id)
      fetchFavorite(user.id)
    } else {
      const exist = localStorage.getItem(`favoriteUser`)
      if (exist) {
        setFavoriteUser(exist)
        fetchFavorite(exist)
      } else {
        const newUser = uuidv4()
        localStorage.setItem(`favoriteUser`, newUser)
        setFavoriteUser(newUser)
        fetchFavorite(newUser)
      }
    }
  }, [id, user])

  return (<div
    style={{
      border: 0,
      outline: 'none',
    }}
    className={cn(' transition-colors duration-150', className)}
  >
    <button
      className={cn({
        'text-tertiary-2': isFavorite,
      })}
      onClick={async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (isFavorite) {
          await deleteFavorite({id: favoriteID})
          setIsFavorite(false)
        } else {
          await createFavorite({
            favoriteID: id, type, link, content: JSON.stringify(content), productID, relationID, pageID,
            userID: favoriteUser,
          })
          setIsFavorite(true)
        }
      }}
    >
      <Heart />
    </button>
  </div>)
}

export default Favorites
