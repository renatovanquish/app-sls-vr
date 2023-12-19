/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import cn from 'classnames'
import Masonry from 'react-masonry-css'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { useScreen } from 'hooks/useScreen'
import Image from 'next/image'
import { Modal } from 'components/ui'
import { useMidia } from 'hooks/useMidia'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })

interface Props {
  block: any
  hasLateral?: boolean
  user: any
}

export default function View(props: Props) {
  const { block, hasLateral, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const [photosS3, setPhotosS3] = useState([] as any)
  const [folderSel, setFolderSel] = useState('')

  const [displayModal, setDisplayModal] = useState(false)
  const [photoModal, setPhotoModal] = useState('')

  const { isSm, isMd, isLg, isXl, is2xl } = useBreakPoints()
  const { screenHeight, screenWidth } = useScreen()

  useEffect(() => {
    if (block && block.config) {
      const configParse = JSON.parse(block.config)
      setConfig(configParse)
    }
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setContent(contentParse)
      setFolderSel(contentParse.folder)
    }
    return () => {
      setContent({} as any)
      setConfig({} as any)
      setFolderSel('')
      setDisplayModal(false)
    }
  }, [block])

  useEffect(() => {
    let isMounted = true
    const fetchPhotosS3 = async () => {
      if (isMounted) {
        const items = await Storage.list(folderSel, { level: 'public' })
        const { files } = processStorageList(items)
        setPhotosS3(files.sort((a: any, b: any) => a.key.localeCompare(b.key)))
      }
    }
    if (folderSel) {
      fetchPhotosS3()
    }
    return () => {
      isMounted = false
      setPhotosS3([] as any)
    }
  }, [folderSel])

  const getName = (key: string) => {
    const nameArr = key
      .split(folderSel + '/')[1]
      .split('.')[0]
      .toLowerCase()
      .split('_')

    let name = ''
    for (let i = 0; i < nameArr.length; i++) {
      if (nameArr[i].length === 1) {
        name += `${nameArr[i].toUpperCase()}. `
      } else if (nameArr[i].length === 2 || nameArr[i].length === 3) {
        name += `${nameArr[i]} `
      } else {
        name += `${nameArr[i].charAt(0).toUpperCase()}${nameArr[i].slice(1)} `
      }
    }
    return name
  }

  const getSize = (size: number) => {
    return formatBytes(size)
  }

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
      style={{
        backgroundColor: config.bgMode === 'custom' && config.bgColor ? config.bgColor : null,
        backgroundImage: config.bgMode === 'image' ? `url(${config.bgImage})` : '',
        backgroundRepeat: config.bgMode === 'image' ? 'no-repeat' : '',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >{config.anchor && <a id={`${config.anchor}`}></a>}
      <div>
        {(!content.viewMode || content.viewMode === 'masonry') && (
          <div className="images">
            <Masonry
              breakpointCols={
                isSm
                  ? 1
                  : isMd && photosS3.length >= 2
                  ? 2
                  : isLg && photosS3.length >= 3
                  ? hasLateral
                    ? 2
                    : 3
                  : isXl && photosS3.length >= 4
                  ? hasLateral
                    ? 3
                    : 4
                  : is2xl && photosS3.length >= 5
                  ? hasLateral
                    ? 4
                    : 5
                  : photosS3.length
              }
              className="gallery-grid"
              columnClassName="gallery-grid_column"
            >
              {photosS3.map(
                (photo: any, i: number) =>
                  photo.key.indexOf('.DS_Store') === -1 && (
                    <div
                      key={i}
                      className="ImageResult text-center m-4 grid justify-items-center"
                    >
                      <S3ImageShow
                        PhotoKey={photo.key}
                        setPhotoModal={setPhotoModal}
                        setDisplayModal={setDisplayModal}
                        viewShadow={content.viewShadow}
                        viewBorder={content.viewBorder}
                        viewBgColor={content.viewBgColor}
                      />
                      {content.viewData === 'name' && (
                        <div className="mt-2 text-accent-8 font-semibold">
                          {getName(photo.key)}
                        </div>
                      )}
                      {content.viewData === 'name_size' && (
                        <div className="mt-2">
                          <div className="text-accent-8 font-semibold">
                            {getName(photo.key)}
                          </div>
                          <div className="text-accent-7 text-sm">
                            {getSize(photo.size)}
                          </div>
                        </div>
                      )}
                      {content.viewData === 'title' && (
                        <MidiaTitle PhotoKey={photo.key} />
                      )}
                      {content.viewData === 'title_description' && (
                        <MidiaTitleDescription PhotoKey={photo.key} />
                      )}
                      {content.viewData === 'title_subtitle_description' && (
                        <MidiaTitleSubTitleDescription PhotoKey={photo.key} />
                      )}
                    </div>
                  )
              )}
            </Masonry>
          </div>
        )}

        {content.viewMode === 'carousel' && (
          <div className="-mt-14 w-full carousel">
            {photosS3.map(
              (photo: any, i: number) =>
                photo.key.indexOf('.DS_Store') === -1 && (
                  <div
                    key={i}
                    id={`slide${i}`}
                    className="relative w-full pt-20 carousel-item justify-center"
                  >
                    <S3ImageShow
                      PhotoKey={photo.key}
                      viewShadow={content.viewShadow}
                      viewBorder={content.viewBorder}
                      viewBgColor={content.viewBgColor}
                    />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href={`#slide${i - 1}`} className="btn btn-circle">
                        ❮
                      </a>
                      <a href={`#slide${i + 1}`} className="btn btn-circle">
                        ❯
                      </a>
                    </div>
                  </div>
                )
            )}
          </div>
        )}

        {(content.viewMode === 'grid' ||
          content.viewMode === 'grid_contain' ||
          content.viewMode === 'grid_cover' ||
          content.viewMode === 'grid_fill' ||
          content.viewMode === 'grid_scale-down' ||
          content.viewMode === 'grid_none') && (
          <div
            className={`grid ${
              isSm
                ? 'grid-cols-1'
                : isMd && photosS3.length >= 2
                ? 'grid-cols-2'
                : isLg && photosS3.length >= 3
                ? hasLateral
                  ? 'grid-cols-2'
                  : 'grid-cols-3'
                : isXl && photosS3.length >= 4
                ? hasLateral
                  ? 'grid-cols-3'
                  : 'grid-cols-4'
                : is2xl && photosS3.length >= 5
                ? hasLateral
                  ? 'grid-cols-4'
                  : 'grid-cols-5'
                : `grid-cols-${photosS3.length}`
            }`}
          >
            {photosS3.map(
              (photo: any, i: number) =>
                photo.key.indexOf('.DS_Store') === -1 && (
                  <div
                    key={i}
                    className="text-center m-4 grid justify-items-center"
                  >
                    {content.viewMode === 'grid' && (
                      <S3ImageShow
                        PhotoKey={photo.key}
                        setPhotoModal={setPhotoModal}
                        setDisplayModal={setDisplayModal}
                        viewShadow={content.viewShadow}
                        viewBorder={content.viewBorder}
                        viewBgColor={content.viewBgColor}
                      />
                    )}

                    {content.viewMode !== 'grid' && (
                      <S3ImageShowObject
                        PhotoKey={photo.key}
                        setPhotoModal={setPhotoModal}
                        setDisplayModal={setDisplayModal}
                        viewShadow={content.viewShadow}
                        viewBorder={content.viewBorder}
                        viewBgColor={content.viewBgColor}
                        obj={
                          content.viewMode.indexOf('contain') > 0
                            ? 'contain'
                            : content.viewMode.indexOf('cover') > 0
                            ? 'cover'
                            : content.viewMode.indexOf('scale-down') > 0
                            ? 'scale-down'
                            : content.viewMode.indexOf('none') > 0
                            ? 'none'
                            : 'fill'
                        }
                      />
                    )}

                    {content.viewData === 'name' && (
                      <div className="mt-2 text-accent-8 font-semibold">
                        {getName(photo.key)}
                      </div>
                    )}
                    {content.viewData === 'name_size' && (
                      <div className="mt-2">
                        <div className="text-accent-8 font-semibold">
                          {getName(photo.key)}
                        </div>
                        <div className="text-accent-7 text-sm">
                          {getSize(photo.size)}
                        </div>
                      </div>
                    )}
                    {content.viewData === 'title' && (
                      <MidiaTitle PhotoKey={photo.key} />
                    )}
                    {content.viewData === 'title_description' && (
                      <MidiaTitleDescription PhotoKey={photo.key} />
                    )}
                    {content.viewData === 'title_subtitle_description' && (
                      <MidiaTitleSubTitleDescription PhotoKey={photo.key} />
                    )}
                  </div>
                )
            )}
          </div>
        )}

        <Modal
          open={displayModal && photoModal ? true : false}
          onClose={() => {
            setDisplayModal(false)
          }}
          focusTrap={false}
          fullSize={true}
          absolute={true}
        >
          <img
            alt=""
            src={photoModal}
            className="mx-auto cursor-pointer shadow-lg p-2"
            style={{
              maxWidth: screenWidth * 0.9,
              maxHeight: screenHeight * 0.9,
            }}
          />
        </Modal>
      </div>
    </section>
  )
}

interface S3ImageShowProps {
  PhotoKey: string
  setPhotoModal?: any
  setDisplayModal?: any
  obj?: string
  viewShadow: string
  viewBorder: string
  viewBgColor: string
}

function S3ImageShow(props: S3ImageShowProps) {
  const {
    PhotoKey,
    setDisplayModal,
    setPhotoModal,
    viewShadow,
    viewBorder,
    viewBgColor,
  } = props
  return (
    <img
      alt=""
      src={`${process.env.MIDIA_CLOUDFRONT}${PhotoKey}`}
      className={`${
        setDisplayModal ? 'cursor-pointer' : ''
      } shadow${viewShadow} p-${viewBorder} ${
        viewBgColor !== 'none' && 'bg-accent-' + viewBgColor
      }`}
      onClick={() => {
        if (setDisplayModal) {
          setPhotoModal(`${process.env.MIDIA_CLOUDFRONT}${PhotoKey}`)
          setDisplayModal(true)
        }
      }}
    />
  )
}

function S3ImageShowObject(props: S3ImageShowProps) {
  const {
    PhotoKey,
    setDisplayModal,
    setPhotoModal,
    obj,
    viewShadow,
    viewBorder,
    viewBgColor,
  } = props
  return (
    <div
      className={`shadow${viewShadow} p-${viewBorder} ${
        viewBgColor !== 'none' && 'bg-accent-' + viewBgColor
      }`}
      onClick={() => {
        if (setDisplayModal) {
          setPhotoModal(`${process.env.MIDIA_CLOUDFRONT}${PhotoKey}`)
          setDisplayModal(true)
        }
      }}
    >
      <div className="h-64 w-64 relative">
        <Image
          src={`${process.env.MIDIA_CLOUDFRONT}${PhotoKey}`}
          alt=""
          layout="fill"
          objectFit={(obj ? obj : 'fill') as any}
          className={`${setDisplayModal ? 'cursor-pointer' : ''}`}
        />
      </div>
    </div>
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

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

interface MidiaProps {
  PhotoKey: string
}

function MidiaTitle(props: MidiaProps) {
  const { PhotoKey } = props
  const { listMidiaByKey } = useMidia()
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    let isMounted = true
    const fetchMidia = async () => {
      if (isMounted) {
        const midia = await listMidiaByKey({ key: PhotoKey, limit: 1 })
        setTitle(midia && midia.title ? midia.title : '')
      }
    }
    fetchMidia()
    return () => {
      isMounted = false
      setTitle('')
    }
  }, [PhotoKey])

  return <div className="mt-2 text-accent-8 font-semibold">{title}</div>
}

function MidiaTitleDescription(props: MidiaProps) {
  const { PhotoKey } = props
  const { listMidiaByKey } = useMidia()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    let isMounted = true
    const fetchMidia = async () => {
      if (isMounted) {
        const midia = await listMidiaByKey({ key: PhotoKey, limit: 1 })
        setTitle(midia && midia.title ? midia.title : '')
        setDescription(midia && midia.description ? midia.description : '')
      }
    }
    fetchMidia()
    return () => {
      isMounted = false
      setTitle('')
      setDescription('')
    }
  }, [PhotoKey])

  return (
    <div>
      <div className="mt-2 text-accent-8 font-semibold">{title}</div>
      <div className="text-accent-8 text-sm">{description}</div>
    </div>
  )
}

function MidiaTitleSubTitleDescription(props: MidiaProps) {
  const { PhotoKey } = props
  const { listMidiaByKey } = useMidia()
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    let isMounted = true
    const fetchMidia = async () => {
      if (isMounted) {
        const midia = await listMidiaByKey({ key: PhotoKey, limit: 1 })
        setTitle(midia && midia.title ? midia.title : '')
        setSubTitle(midia && midia.subTitle ? midia.subTitle : '')
        setDescription(midia && midia.description ? midia.description : '')
      }
    }
    fetchMidia()
    return () => {
      isMounted = false
      setTitle('')
      setSubTitle('')
      setDescription('')
    }
  }, [PhotoKey])

  return (
    <div>
      {title && <div className="mt-2 text-accent-9 font-semibold">{title}</div>}
      {subTitle && (
        <div className="text-accent-9 font-semibold line-clamp-1">
          {subTitle}
        </div>
      )}
      {description && (
        <div className="text-accent-9 font-semibold">{description}</div>
      )}
    </div>
  )
}
