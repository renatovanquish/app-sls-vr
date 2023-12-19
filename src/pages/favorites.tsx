import { useEffect, useState } from 'react'
import { Info } from 'components/icons'
import { Layout } from 'components/common'
import { Container, Footer } from 'components/ui'

import { useUI } from 'components/ui/context'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { useScreen } from 'hooks/useScreen'
import cn from 'classnames'

import { useUserAuth } from 'components/userAuth/context'
import { useFavorite } from 'hooks/useFavorite'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([])
  const { user } = useUserAuth()
  const { listFavoritesByUserType, updateFavorite } = useFavorite()

  const fetchFavorites = async (userID: string) => {
    const exist = localStorage.getItem(`favoriteUser`)
    if (exist && user && user.id) {
      const fetchFavoriteUser = async () => {
        const l = await listFavoritesByUserType({userID: exist, limit:500})
        l.items.forEach(async (item: any, index:number) => {
          await updateFavorite({
            id: item.id,
            userID: user.id
          })

          if (index === l.items.length - 1) {
            const { items } = await listFavoritesByUserType({userID, limit:500})
            setFavorites(items)
          }
        })
      }
      fetchFavoriteUser()
      localStorage.removeItem(`favoriteUser`)
    } else {
      const { items } = await listFavoritesByUserType({userID, limit:500})
      setFavorites(items)
    }
  }

  const { config } = useUI()

  useEffect(() => {
    if (user) {
      fetchFavorites(user.id)
    } else {
      const id = localStorage.getItem(`favoriteUser`)
      if (id) { fetchFavorites(id) }
    }
  }, [user])

  const [showModal, setShowModal] = useState(false)
  const [favoriteSel, setFavoriteSel] = useState({} as any)
  const { screenWidth, screenHeight } = useScreen()
  const { isSm } = useBreakPoints()

  return (
    <Container>
      {favorites.length === 0 && (
        <div className="p-4 select-none">
          <div className="px-4 py-4 w-full rounded shadow bg-tertiary text-tertiary">
            <div className="flex-1">
              <Info />
              <label className="ml-2 font-semibold">
                Voce ainda não tem nenhum favorito.
              </label>
            </div>
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <div>
          <div className="mx-0 lg:mx-4 bg-accent-1 mb-0 lg:mb-4 p-4 rounded-lg">
            <div className="text-center text-2xl font-bold">
              {favorites.length} favoritos
            </div>
          </div>
          <div className="flex flex-row justify-evenly flex-wrap overflow-y-hidden">
            {favorites.map((favorite: any, index: number) => (
              <div
                onClick={() => {
                  setShowModal(true)
                  setFavoriteSel(favorite.content)
                }}
                key={index}
                style={
                  isSm
                    ? { width: screenWidth }
                    : {
                        minWidth: 320,
                        maxWidth:
                          screenWidth >= 630 && screenWidth < 700
                            ? 270
                            : screenWidth >= 700 && screenWidth < 800
                            ? 300
                            : screenWidth >= 800 && screenWidth < 950
                            ? 320
                            : screenWidth >= 950 && screenWidth < 1116
                            ? 280
                            : screenWidth >= 1116 && screenWidth < 1282
                            ? 300
                            : screenWidth >= 1282 && screenWidth < 1450
                            ? 320
                            : screenWidth < 630
                            ? screenWidth * 0.8
                            : 320,
                        width: screenWidth < 630 ? screenWidth * 0.6 : 'auto',
                      }
                }
                className={cn(
                  'bg-white shadow-lg md:hover:shadow-xl transform transition duration-500 md:hover:scale-105',
                  {
                    'w-full my-0': isSm,
                    'mx-4 my-6 rounded-lg': !isSm,
                  }
                )}
              >
                {false && <div>{JSON.stringify(favorite,null,4)}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer
        footerSm="showMin"
        footerLg="showAll"
        facebook={config?.facebook}
        twitter={config?.twitter}
        instagram={config?.instagram}
        youtube={config.youtube}
        linkedin={config.linkedin}
        info={config?.infoFooter ? config?.infoFooter : ''}
        content={config.footer}
      />

      <div className="h-24 lg:h-0" />
    </Container>
  )
}

FavoritesPage.Layout = Layout
