import { useState, useEffect } from 'react'
import { Star } from 'components/icons'
import cn from 'classnames'
import { toast } from 'react-toast'
import { useRestrictedContentView } from 'hooks/useRestrictedContentView'

interface Props {
  contentSel: any
  userID: string
}

export default function Rating(props: Props) {
  const { contentSel, userID } = props
  const [rating, setRating] = useState(0)

  const {
    listRestrictedContentViewByRestrictedContentUser,
    createRestrictedContentView,
    updateRestrictedContentView,
  } = useRestrictedContentView()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchData = async () => {
        const { items } =
          await listRestrictedContentViewByRestrictedContentUser({
            restrictedContentID: contentSel.id,
            userID: { eq: userID },
          })
        setRating(items.length ? items[0].rating : 0)
      }
      fetchData()
    }
    return () => {
      setRating(0)
    }
  }, [contentSel])

  const handleClick = async (n: number) => {
    setRating(n)
    const { items } = await listRestrictedContentViewByRestrictedContentUser({
      restrictedContentID: contentSel.id,
      userID: { eq: userID },
    })
    if (items.length > 0) {
      updateRestrictedContentView({
        id: items[0].id,
        rating: n,
      })
    } else {
      createRestrictedContentView({
        restrictedContentID: contentSel.id,
        userID,
        rating: n,
      })
    }
    toast.info(`Obrigado por sua avaliação.`)
  }

  return (
    <div className="flex gap-1">
      <div
        onClick={() => {
          handleClick(1)
        }}
        className={cn({
          'text-orange-500': rating >= 1,
        })}
      >
        <Star />
      </div>
      <div
        onClick={() => {
          handleClick(2)
        }}
        className={cn({
          'text-orange-500': rating >= 2,
        })}
      >
        <Star />
      </div>
      <div
        onClick={() => {
          handleClick(3)
        }}
        className={cn({
          'text-orange-500': rating >= 3,
        })}
      >
        <Star />
      </div>
      <div
        onClick={() => {
          handleClick(4)
        }}
        className={cn({
          'text-orange-500': rating >= 4,
        })}
      >
        <Star />
      </div>
      <div
        onClick={() => {
          handleClick(5)
        }}
        className={cn({
          'text-orange-500': rating == 5,
        })}
      >
        <Star />
      </div>
    </div>
  )
}
