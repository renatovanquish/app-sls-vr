/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })

interface Props {
  block: any
  user?: any
  custom?: any
}

export default function View(props: Props) {
  const { block, user, custom } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)

  const router = useRouter()

  const [photosS3, setPhotosS3] = useState([] as any)
  const [photoSel, setPhotoSel] = useState(0)

  const getFolder = async (folder: string) => {
    setPhotosS3([] as any)
    const items = await Storage.list(folder, { level: 'public' })
    const { files } = processStorageList(items)
    setPhotosS3(files)
    console.log(files)
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (block && block.config) {
        const configParse = JSON.parse(block.config)
        setConfig(configParse)
        if (configParse.bgMode == 'images') {
          getFolder(configParse.bgFolder)
        }
      }
      if (block && block.content) {
        const contentParse = JSON.parse(block.content)
        setContent(contentParse)
      }
    }
    return () => {
      isMounted = false
      setContent({} as any)
      setConfig({} as any)
    }
  }, [block])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (config.bgMode === 'images' && photosS3.length) {
        setPhotoSel((prevCount) => {
          if (photosS3.length >= prevCount) { return prevCount + 1 } else { return 0 }
          
        })
      }
    }, config.duration ? config.duration : 5000)

    return () => clearInterval(intervalId)
  }, [block])

  return (
    <section
      className={cn({
        ['hidden']: config.view === 'hide' || (config.view === 'guest' && user),
        ['md:hidden']: config.view === 'sm',
        ['hidden md:block']: config.view === 'lg',
        ['px-0']: config.padX && config.padX === 'none',
        ['px-4']: !config.padX || config.padX === 'small',
        ['px-8']: config.padX && config.padX === 'normal',
        ['px-12']: config.padX && config.padX === 'large',
        ['px-24']: config.padX && config.padX === 'extra',
        ['py-0']: config.padY && config.padY === 'none',
        ['py-4']: !config.padY || config.padY === 'small',
        ['py-8']: config.padY && config.padY === 'normal',
        ['py-12']: config.padY && config.padY === 'large',
        ['py-24']: config.padY && config.padY === 'extra',
        ['bg-accent-1']: config.bgMode === 'auto',
        ['bg-local']: config.bgMode === 'image',
      })}
      style={
        config.bgMode === 'image'
          ? {
              backgroundImage: `url(${config.bgImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          : config.bgMode === 'images' && photosS3.length && photosS3[photoSel] && photosS3[photoSel].key
          ? {
              backgroundImage: `url(${process.env.MIDIA_CLOUDFRONT}${photosS3[photoSel].key})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          : config.bgMode === 'custom'
          ? {
              backgroundColor: config.bgColor ? config.bgColor : null,
            }
          : {}
      }
    >
      {config.anchor && <a id={`${config.anchor}`}></a>}
      <div style={{height:500}}></div>
    </section>
  )
}

function processStorageList(result: any) {
  const files: any[] = []
  const folders: any[] = []
  result.forEach((res: any) => {
    if (res.size) {
      files.push(res)
      const possibleFolder = res.key.split('/').slice(0, -1).join('/')
      if (possibleFolder && folders.indexOf(possibleFolder) === -1) {
        folders.push(possibleFolder)
      }
    } else {
      folders.push(res.key)
    }
  })
  return { files, folders }
}
