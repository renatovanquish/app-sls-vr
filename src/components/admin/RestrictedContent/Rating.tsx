import { useEffect, useState } from 'react'
import { useRestrictedContentView } from 'hooks/useRestrictedContentView'
import { Star } from 'components/icons'
import cn from 'classnames'

export default function Rating({ restrictedContentID }: any) {
  const [rating, setRating] = useState(0)
  const { listRestrictedContentViewByRestrictedContent } =
    useRestrictedContentView()

  useEffect(() => {
    if (restrictedContentID) {
      const fetch = async () => {
        const { items } = await listRestrictedContentViewByRestrictedContent({
          restrictedContentID,
          limit: 1000,
        })
        let t = 0 as number
        let t2 = 0 as number
        items.forEach((item: any) => {
          if (item.rating > 0) {
            t += item.rating ? parseInt(item.rating) : 0
            t2++
          }
        })
        setRating(t > 0 ? t / t2 : 0)
      }
      fetch()
    }
    return () => {
      setRating(0)
    }
  }, [restrictedContentID])

  return rating > 0 ? (
    <div className="bg-orange-500 text-white px-1 rounded flex flex-row items-center gap-1">
      <Star height={13} width={13} />
      <div className="font-semibold">{rating}</div>
    </div>
  ) : (<></>)
}
