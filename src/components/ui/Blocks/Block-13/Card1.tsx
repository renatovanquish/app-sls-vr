import { useState, useEffect } from 'react'
import { useMidia } from 'hooks/useMidia'
import Image from 'next/image'
import { useRouter } from 'next/router'
import cn from 'classnames'

interface Props {
  midiaKey?: string
  photo: string
  link?: string
  objectFit?: string
  viewFormat?: string
}

export default function Card1(props: Props): JSX.Element {
  const { photo, objectFit, viewFormat, link, midiaKey } = props
  const router = useRouter()

  const [url, setUrl] = useState('')
  const { listMidiaByKey } = useMidia()

  useEffect(() => {
    let isMounted = true
    const fetchMidia = async () => {
      const midia = await listMidiaByKey({ key: midiaKey as string, limit: 1 })
      setUrl(midia && midia.link ? midia.link : '')
    }
    if (isMounted && midiaKey) {
      fetchMidia()
    }
    return () => {
      isMounted = false
      setUrl('')
    }
  }, [midiaKey])

  return (
    <div className={cn("relative h-full w-full", {
      ['cursor-pointer'] : link || url
    })} onClick={() => {
      if (link) { router.push(link) }
      else if (url) { router.push(url) }
    }}>
      <Image
        alt=""
        className={cn(`absolute object-${objectFit ? objectFit : 'cover'} object-center`)}
        src={photo}
        layout="fill"
        priority
      />
    </div>
  )
}
