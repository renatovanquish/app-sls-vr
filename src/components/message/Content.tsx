import { Storage } from 'aws-amplify'
import { useState, useEffect } from 'react'
import { MessagesTypes } from 'API'
import { LoadingDots } from 'components/ui'
import Masonry from 'react-masonry-css'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { Modal } from 'components/ui'
import { useScreen } from 'hooks/useScreen'
import { useMidia } from 'hooks/useMidia'
import { useUserAuth } from 'components/userAuth/context'
import { Edit, Check2 } from 'components/icons'
import { useTheme } from 'next-themes'
import cn from 'classnames'

import Moment from 'moment'

interface Props {
  message: any
}

export default function Content(props: any) {
  const { message } = props
  return (
    <div>
      {message.type === MessagesTypes.TEXT && <ContentText message={message} />}
      {message.type === MessagesTypes.AUDIO && (
        <ContentAudio message={message} />
      )}
      {message.type === MessagesTypes.IMAGE && (
        <ContentImage message={message} />
      )}
      {/** message.type === MessagesTypes.PDF && <ContentPdf message={message} /> */}
    </div>
  )
}

export function ContentText(props: Props) {
  const { theme } = useTheme()
  const { message } = props
  return (
    <div className="pt-1 md:pt-2 px-1 md:px-2">
      <div
        className={cn('text-lg', {
          'text-accent-9': theme === 'light',
          'text-accent-7': theme === 'dark',
        })}
      >
        {message.content}
      </div>
    </div>
  )
}

export function ContentAudio(props: Props) {
  const { message } = props
  const [url, setUrl] = useState('')

  useEffect(() => {
    let isMounted = true
    if (isMounted && message && message.content) {
      const extension = message.content.split('.').pop()
      const isTypeSupported = MediaRecorder.isTypeSupported(
        `audio/${extension}`
      )
      const key =
        isTypeSupported || extension === 'mp4'
          ? message.content
          : message.content.replace(extension, 'mp3')

      const getUrl = async () => {
        const u = (await Storage.get(key, {
          level: 'protected',
          expires: 60 * 60 * 24,
          download: false,
          identityId: message.identityId,
        })) as any
        setUrl(u.toString())
      }

      const diff = Moment().diff(Moment(message.createdAt), 'seconds')
      if (diff < 20 && !isTypeSupported && extension !== 'mp4') {
        setTimeout(() => {
          getUrl()
        }, 1000 * 20)
      } else {
        getUrl()
      }
    }
    return () => {
      isMounted = false
      setUrl('')
    }
  }, [message])

  return (
    <div className="pt-2 px-2">
      {!url && <LoadingDots />}
      {url && (
        <audio
          controls={true}
          controlsList="nodownload"
          crossOrigin="anonymous"
          autoPlay={false}
          playsInline={true}
        >
          <source src={url}></source>
        </audio>
      )}
    </div>
  )
}

export function ContentImage(props: Props) {
  const { message } = props
  const { content } = message
  let contentArr = JSON.parse(content)
  const [images, setImages] = useState([] as any)
  const { isSm, isMd, isLg, isXl, is2xl } = useBreakPoints()
  const { screenHeight, screenWidth } = useScreen()

  const [displayModal, setDisplayModal] = useState(false)
  const [photoModal, setPhotoModal] = useState('')

  useEffect(() => {
    const getUrl = async (image: any) => {
      const u = (await Storage.get(image.key, {
        level: 'protected',
        contentType: image.type,
        expires: 60 * 60 * 24,
        download: false,
        identityId: message.identityId,
      })) as any
      setImages((images: any) => [...images, { ...image, url: u.toString() }])
    }
    setImages([] as any)
    contentArr.map((image: any) => getUrl(image))
    return () => {
      setImages([] as any)
    }
  }, [message])

  return (
    <div className="w-full">
      {images.map((image: any, index: number) => (
        <div
          key={index}
          className="ImageResult text-center mx-0 md:mx-6 mb-2 md:my-4 grid justify-items-center"
        >
          <img
            className="cursor-pointer shadow-xl p-0 md:p-2 bg-slate-100"
            src={image.url}
            alt=""
            crossOrigin="anonymous"
            onClick={() => {
              setPhotoModal(image.url)
              setDisplayModal(true)
            }}
          />
          <ContentImageText
            isImage={true}
            imageKey={image.key}
            userID={message.userID}
          />
        </div>
      ))}
      <Modal
        open={displayModal && photoModal ? true : false}
        onClose={() => {
          setDisplayModal(false)
        }}
        focusTrap={false}
      >
        <img
          alt=""
          src={photoModal}
          className="mx-auto cursor-pointer shadow-lg p-2"
          crossOrigin="anonymous"
          style={{
            maxWidth: screenWidth * 0.9,
            maxHeight: screenHeight * 0.9,
          }}
        />
      </Modal>
    </div>
  )
}

export function ContentPdf(props: Props) {
  const { message } = props
  const { content } = message
  let contentArr = JSON.parse(content)
  const [pdfs, setPdfs] = useState([] as any)

  useEffect(() => {
    const getUrl = async (pdf: any) => {
      const u = (await Storage.get(pdf.key, {
        level: 'protected',
        expires: 60 * 60 * 24,
        download: false,
        identityId: message.identityId,
      })) as any
      setPdfs((pdfs: any) => [...pdfs, { ...pdf, url: u.toString() }])
    }
    setPdfs([] as any)
    contentArr.map((pdf: any) => getUrl(pdf))
    return () => {
      setPdfs([] as any)
    }
  }, [message])

  return (
    <div className="w-full">
      {pdfs.map((pdf: any, index: number) => (
        <div className="cursor-pointer flex flex-start" key={index}>
          <a
            className="p-2"
            href={pdf.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              width={64}
              height={64}
              alt=""
              src="/icons-messages/pdf.png"
              crossOrigin="anonymous"
            />
          </a>
          <div className="ml-2 w-full">
            <ContentImageText
              isImage={false}
              imageKey={pdf.key}
              userID={message.userID}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ContentImageText(props: any) {
  const { imageKey, userID, isImage } = props
  const id = imageKey.substr(43, 36).split('.')[0]
  const {
    // getMidia,
    createMidia,
    updateMidia,
    deleteMidia,
  } = useMidia()
  const [description, setDescription] = useState('')
  const { user } = useUserAuth()
  const [editMode, setEditMode] = useState(false)
  const [exists, setExists] = useState(false)
  const [text, setText] = useState('')
  const { theme } = useTheme()

  useEffect(() => {
    const fetchMidia = async () => {
      const m = false as any // await getMidia({ id })
      if (m) {
        setDescription(m.description)
        setExists(true)
      }
    }
    fetchMidia()
    return () => {
      setDescription('')
      setEditMode(false)
      setExists(false)
      setText('')
    }
  }, [imageKey])

  const handleSubmit = async () => {
    setDescription(text)
    setEditMode(false)
    if (exists) {
      const r = await updateMidia({ id, description: text })
      console.log(r)
    } else {
      /**
      const r = await createMidia({ id, description, userID })
      console.log(r)
      setExists(true)
       */
    }
  }

  return user.id !== userID ? (
    <div>
      {description && (
        <div
          className={cn('mt-2 text-lg font-semibold', {
            'text-accent-9': theme === 'light',
            'text-accent-0': theme === 'dark',
          })}
        >
          {description}
        </div>
      )}
    </div>
  ) : (
    <div className="w-full">
      {!editMode && (
        <div className={`flex ${isImage ? 'justify-center' : 'justify-start'}`}>
          {description && (
            <div className={cn('mt-3 text-lg font-semibold', {
              'text-accent-9': theme === 'light',
              'text-accent-0': theme === 'dark',
            })}>
              {description}
            </div>
          )}
        </div>
      )}
      <div className={`mt-2 w-full ${isImage ? 'text-center' : 'text-left'}`}>
        {!editMode && (
          <a
            className={`cursor-pointer text-blue flex ${
              isImage ? 'justify-center' : 'justify-start'
            }`}
            onClick={() => {
              setText(description)
              setEditMode(true)
            }}
          >
            <Edit />
          </a>
        )}
        {editMode && (
          <div className="w-full">
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value)
              }}
              name="description"
              id="description"
              rows={3}
              autoComplete="off"

              className="text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            />
          </div>
        )}
        {editMode && (
          <div className="mt-1 btn btn-sm" onClick={handleSubmit}>
            Salvar
          </div>
        )}
      </div>
    </div>
  )
}
