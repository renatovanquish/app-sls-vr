import { FC, useState, useEffect } from 'react'
import Image from 'next/image'

interface Props {
  className?: string
  children?: any
  avatarKey?: string
  size?: number
}

const Avatar: FC<Props> = ({ avatarKey, size }) => {
  const [url, setUrl] = useState('/user/user.png')

  useEffect(() => {
    if (avatarKey) {
      setUrl(`${process.env.MIDIA_CLOUDFRONT}${avatarKey}`)
    } else {
      setUrl('/user/user.png')
    }
  }, [avatarKey])

  return (
    <div className="avatar">
      <div
        style={{ width: size ? size : 42, height: size ? size : 42 }}
        className="inline-block rounded-full border-2 border-accent-3 transition linear-out duration-150"
      >
        <Image
          alt=""
          className="rounded-full"
          src={url}
          layout="fill"
          onError={(e: any) => {
            e.target.onerror = null
            e.target.src = '/user/user.png'
          }}
        />
      </div>
    </div>
  )
}

export default Avatar
