import { useState, useEffect } from 'react'
import { useStorage } from 'hooks/useStorage'

interface Props {
  imgkey: string
  imgDefault: string
}

export default function ImageByKey(props: Props) {
  const { imgkey, imgDefault } = props
  const [url, setUrl] = useState(imgDefault)
  const { downloadPublic } = useStorage()

  const getImageByKey = async (k: string) => {
    const u: any = await downloadPublic(k)
    if (u) {
      setUrl(u)
    } else {
      setUrl(imgDefault)
    }
  }

  useEffect(() => {
    if (imgkey) {
      getImageByKey(imgkey)
    }
  }, [imgkey])

  return <img alt="" className="w-full h-full rounded-full" src={url} />
}
