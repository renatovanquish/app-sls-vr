import { useEffect, useState } from 'react'
import { useMessage } from 'hooks/useMessage'
import { ModelSortDirection } from 'API'
import { Loading, LoadingDots } from 'components/ui'
import { Like, Dislike } from 'components/icons'
import Moment from 'moment'
import { Avatar } from 'components/common'
import { Storage } from 'aws-amplify'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { Modal } from 'components/ui'
import { useScreen } from 'hooks/useScreen'
import { useMidia } from 'hooks/useMidia'
import cn from 'classnames'
import { useUserAuth } from 'components/userAuth/context'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'

export default function Moderation(props: any) {
  const { relationID } = props
  const [messages, setMessages] = useState([] as any)
  const [loading, setLoading] = useState(true)

  const { listMessagesByRelationCreatedAt, updateMessage } = useMessage()

  useEffect(() => {
    if (relationID) {
      const fetch = async () => {
        setLoading(true)
        const { items } = await listMessagesByRelationCreatedAt({
          relationID,
          limit: 1000,
          sortDirection: ModelSortDirection.DESC,
        })
        setMessages(items)
        setLoading(false)
      }
      fetch()
    }
    return () => {
      setMessages([])
    }
  }, [relationID])

  const onApproved = async (e: any, index: number) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma aprovar a mensagem?`,
      message: '',
      options: [
        {
          title: 'NÃO',
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: 'SIM',
        },
      ],
    })
    if (promptRet.index === 1) {
      await updateMessage({ id: e.id, status: 'APPROVED' })
      toast('Mensagem aprovada com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    }
  }

  const onReproved = async (e: any, index: number) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma reprovar a mensagem?`,
      message: '',
      options: [
        {
          title: 'NÃO',
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: 'SIM',
        },
      ],
    })
    if (promptRet.index === 1) {
      await updateMessage({ id: e.id, status: 'REPROVED' })
      toast('Mensagem reprovada com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    }
  }

  return (
    <div>
      {loading && <Loading />}

      {(!loading && messages.length === 0) && <div>
        Nenhuma mensagem para moderar.
        </div>}

      {(!loading && messages.length > 0) &&
        messages.map(
          (m: any, index: number) =>
            m.status === 'PENDING' && (
              <div className="my-2 p-2 bg-accent-1 rounded-lg" key={index}>
                <div className="flex justify-between">
                  <div>
                    {m.type === 'TEXT' && (
                      <div className="text-lg font-semibold">{m.content}</div>
                    )}
                    {m.type === 'AUDIO' && <ContentAudio message={m} />}
                    {m.type === 'IMAGE' && <ContentImage message={m} />}

                    <div className="mt-2 flex items-center space-x-2">
                      <div className="avatar">
                        <Avatar avatarKey={m.user.avatar} size={42} />
                      </div>
                      <div>
                        <div>{m.user.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-items-end items-center gap-4">
                    <div>
                      <a onClick={()=>{onApproved(m, index)}} className="z-10 cursor-pointer bg-accent-0 p-2 rounded-full flex items-center justify-center">
                        <Like className="text-green-500" />
                      </a>
                    </div>
                    <div>
                      <a onClick={()=>{onReproved(m, index)}} className="z-10 cursor-pointer bg-accent-0 p-2 rounded-full flex items-center justify-center">
                        <Dislike className="text-red-500" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
    </div>
  )
}


interface Props {
  message: any
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
    <div>
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
          className="ImageResult text-center mx-0 grid justify-items-center"
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


export function ContentImageText(props: any) {
  const { imageKey, userID, isImage } = props
  const id = imageKey.substr(43, 36).split('.')[0]
  const [description, setDescription] = useState('')
  const { user } = useUserAuth()
  const [text, setText] = useState('')

  useEffect(() => {
    const fetchMidia = async () => {
      const m = false as any // await getMidia({ id })
      if (m) {
        setDescription(m.description)
      }
    }
    fetchMidia()
    return () => {
      setDescription('')
      setText('')
    }
  }, [imageKey])

  return user.id !== userID ? (
    <div>
      {description && (
        <div
          className={cn('mt-2 text-lg font-semibold text-accent-9')}
        >
          {description}
        </div>
      )}
    </div>
  ) : (
    <div className="w-full">
      <div className={`flex ${isImage ? 'justify-center' : 'justify-start'}`}>
          {description && (
            <div className={cn('mt-3 text-lg font-semibold text-accent-9')}>
              {description}
            </div>
          )}
        </div>
    </div>
  )
}
