import { useState, useCallback, useEffect, SetStateAction } from 'react'
import { Mic, Attachment, Trash, ArrowLeft, Stop } from 'components/icons'
import cn from 'classnames'
import { toast } from 'react-toast'
import { LoadingDots } from 'components/ui'
import { useMessage } from 'hooks/useMessage'
import { MessagesTypes } from 'API'
import { API, Storage } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'
import { useUI } from 'components/ui/context'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { useDropzone } from 'react-dropzone'
import { useRelationLink } from 'hooks/useRelationLink'
import * as queries from 'graphql/queries'

import useRecorder from './useRecorder'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth'

import { Device } from '@capacitor/device'

export default function InputMessage(props: any) {
  const { userID, relationID, restrictedContentID, members, closeModal } = props
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasMicPermission, setHasMicPermission] = useState(false)
  const [type, setType] = useState(MessagesTypes.TEXT)
  const { createMessage } = useMessage()
  const { setProgress } = useUI()
  const { isSm } = useBreakPoints()
  const [phonesToTwilio, setPhonesToTwilio] = useState([] as any)
  const [newPhonesToTwilio, setNewPhonesToTwilio] = useState([] as any)

  const [device, setDevice] = useState({} as any)
  const [isPWA, setIsPWA] = useState(false)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const logDeviceInfo = async () => {
        const info = await Device.getInfo()
        setDevice(info)
        if (window.matchMedia('(display-mode: standalone)').matches) {
          setIsPWA(true)
        }
      }
      logDeviceInfo()
    }
    return () => {
      setDevice({} as any)
    }
  }, [])

  const { listRelationsLinkByRelationUser, updateRelationLink } =
    useRelationLink()

  const getUser = async (userId: string) => {
    const user: any = await API.graphql({
      query: queries.getUser,
      variables: {
        id: userId,
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })
    return user
  }

  const getUserByPhone = async (phone: string) => {
    const user: any = await API.graphql({
      query: queries.getUserByPhone,
      variables: {
        phone: phone,
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })
    return user
  }

  const handleNotify = async () => {
    var emitterResult = await getUser(userID)
    var emitter = emitterResult.data.getUser.name

    members.map(async (member: any) => {
      if (member !== userID) {
        const { items } = await listRelationsLinkByRelationUser({
          relationID,
          userID: { eq: member },
        })

        items.map(async (item: any) => {
          const result = await getUser(item.userID)
          setPhonesToTwilio((phones: any) => [
            ...phones,
            result.data.getUser?.phone,
          ])
        })

        if (items.length > 0) {
          const rv = items[0]
          await updateRelationLink({
            notify: rv.notify ? rv.notify + 1 : 1,
            id: rv.id,
            type: rv.type,
          })
        }
      }
    })

    newPhonesToTwilio.forEach(async (phone: any) => {
      const result = await getUserByPhone(phone)
      const name = result.data.getUserByPhone.items[0].name
    })

    return null
  }

  const sendContent = async () => {
    if ((!comment && !url) || !userID || !relationID) {
      return null
    }
    setIsLoading(true)

    let content = ''
    let search = ''

    if (type === MessagesTypes.TEXT) {
      content = comment
      search = comment.toLowerCase()
      toast.info('Comentário enviado com sucesso.')
    }

    if (type === MessagesTypes.AUDIO) {
      const extension = blobAudio.type.split('/')[1].split(';')[0]
      const fileName = `audio-${relationID}-${uuidv4()}.${extension}`
      const r = await Storage.put(fileName, blobAudio, {
        level: 'protected',
        contentType: blobAudio.type,
        progressCallback(progress: { loaded: any; total: any }) {
          const { loaded, total } = progress
          const p = ((loaded / total) * 100).toFixed(0)
          setProgress(p)
        },
      })

      content = fileName
      search = ''
      toast.info('Audio enviado com sucesso.')
    }

    const cr = await createMessage({
      relationID,
      userID,
      type,
      content,
      search,
      restrictedContentID: restrictedContentID ? restrictedContentID : null,
      status: process.env.DEFAULT_MESSAGE_STATUS,
    })
    console.log(cr)
    
    setComment('')
    setUrl('')
    setBlobAudio(null)
    setType(MessagesTypes.TEXT)
    setIsLoading(false)
    await handleNotify()
  }

  const [url, setUrl] = useState('')
  const [blobAudio, setBlobAudio] = useState(null as any)
  const onStop = useCallback((blob: any, blobUrl: SetStateAction<string>) => {
    setBlobAudio(blob)
    setUrl(blobUrl)
  }, [])
  const onStopCancel = useCallback((blob: any, blobUrl: any) => {
    setType(MessagesTypes.TEXT)
    setUrl('')
    setBlobAudio(null as any)
  }, [])
  const { startRecording, stopRecording, register, status } = useRecorder()

  const onDrop = useCallback(async (acceptedFiles: any[], restrictedContentID: string | null | undefined) => {
    setIsLoading(true)
    toast('Upload iniciado.')

    const files: { key: any; type: any }[] = []
    const pdfs: { key: any; type: any }[] = []

    let countUpload = 0
    acceptedFiles.map(async (file: any) => {
      const prefix = file.type.split('/')[1] === 'pdf' ? 'pdf' : 'image'
      const key = `${prefix}-${relationID}-${uuidv4()}.${
        file.type.split('/')[1]
      }`
      if (file.type.split('/')[1] === 'pdf') {
        pdfs.push({
          key,
          type: file.type,
        })
      } else {
        files.push({
          key,
          type: file.type,
        })
      }

      await Storage.put(`${key}`, file, {
        level: 'protected',
        contentType: `${file.type}`,
        progressCallback(progress: any) {
          const { loaded, total } = progress
          const p = ((loaded / total) * 100).toFixed(0)
          setProgress(p)
        },
      })

      countUpload++

      if (countUpload == acceptedFiles.length) {
        if (files.length > 0) {
          await createMessage({
            relationID,
            userID,
            restrictedContentID: restrictedContentID
              ? restrictedContentID
              : null,
            type: MessagesTypes.IMAGE,
            content: JSON.stringify(files),
            status: process.env.DEFAULT_MESSAGE_STATUS,
          })
        }
        if (pdfs.length > 0) {
          /* 
                    await createMessage({
            relationID,
            userID,
            type: MessagesTypes.PDF,
            content: JSON.stringify(pdfs),,
      status: process.env.DEFAULT_MESSAGE_STATUS,
          })
          */
        }
        setComment('')
        setType(MessagesTypes.TEXT)
        setIsLoading(false)
        toast.hideAll()
        toast('Upload realizado com sucesso.')
        await handleNotify()
      }
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': [],
    },
    onDrop: (droppedFiles: any[]) => onDrop(droppedFiles, restrictedContentID),
  })

  return (
    <div className="my-6 w-full rounded-lg bg-accent-1 p-2">
      {isLoading && (
        <div className="p-4">
          <LoadingDots />
        </div>
      )}

      {hasMicPermission && (
        <audio ref={register as any} crossOrigin="anonymous" />
      )}

      {!isLoading && (
        <div className="flex items-center justify-between w-full p-0">
          {closeModal && (
            <button className="mx-2" onClick={closeModal}>
              <ArrowLeft className="text-3xl" />
            </button>
          )}
          <button
            className="mx-1"
            onClick={() => {
              if (type !== MessagesTypes.IMAGE) {
                setType(MessagesTypes.IMAGE)
                setComment('')
              } else {
                setType(MessagesTypes.TEXT)
                setComment('')
              }
            }}
          >
            <Attachment className="text-3xl" />
          </button>

          {type === MessagesTypes.IMAGE && (
            <div
              {...getRootProps()}
              className="w-full bg-accent-0 cursor-pointer m-2 p-2 flex justify-center border-2 border-accent-5 border-dashed rounded-md"
            >
              <input {...getInputProps()} />
              {!isSm && (
                <p className="text-blue text-lg">
                  Arrastar e soltar a(s) imagem(s) aqui ou{' '}
                  <a>clique</a> para selecionar...
                </p>
              )}
              {isSm && (
                <p className="text-blue text-sm">Enviar imagens.</p>
              )}
            </div>
          )}

          {type === MessagesTypes.AUDIO && (
            <div className="w-full">
              {url && isSm && (
                <div className="absolute w-full">
                  <audio controls src={url} crossOrigin="anonymous" />
                </div>
              )}
              <div className={cn('flex justify-end', { 'mt-16': url && isSm })}>
                {status === 'idle' && (
                  <button
                    className="mx-2"
                    onClick={() => {
                      setType(MessagesTypes.TEXT)
                      setUrl('')
                      setBlobAudio(null)
                    }}
                  >
                    <Trash className="text-3xl" />
                  </button>
                )}
                {status === 'recording' && (
                  <button
                    className="mx-2"
                    onClick={stopRecording(onStopCancel)}
                  >
                    <Trash className="text-3xl" />
                  </button>
                )}
                {url && !isSm && (
                  <audio controls src={url} crossOrigin="anonymous" />
                )}
                {!url && status === 'recording' && (
                  <div>
                    <span className="text-lg font-bold text-tertiary-2">
                      Gravando
                    </span>{' '}
                    <LoadingDots />
                  </div>
                )}
              </div>
            </div>
          )}

          {type === MessagesTypes.TEXT && (
            <textarea
              rows={2}
              className="border-none block w-full bg-accent-1 outline-none placeholder-blue"
              placeholder="Digite seu comentário..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
              }}
            ></textarea>
          )}

          <div className={cn('flex', { 'mt-16': url && isSm })}>
            {status === 'recording' && (
              <button
                disabled={status !== 'recording'}
                onClick={stopRecording(onStop)}
              >
                <Stop className="ml-4 text-3xl" />
              </button>
            )}
            {status !== 'recording' && (
              <button
                onClick={() => {
                  if (hasMicPermission) {
                    setType(MessagesTypes.AUDIO)
                    startRecording()
                    setComment('')
                  } else {
                    navigator.mediaDevices
                      .getUserMedia({ video: false, audio: true })
                      .then((stream) => {
                        setHasMicPermission(true)
                        setType(MessagesTypes.AUDIO)
                        setTimeout(() => {
                          startRecording()
                          setComment('')
                        }, 300)
                      })
                      .catch((err) => {
                        setHasMicPermission(false)
                      })
                  }
                }}
              >
                <Mic className="ml-4 text-3xl" />
              </button>
            )}
          </div>

          <button
            className={cn('ml-4 mr-2', { 'mt-16': url && isSm })}
            onClick={sendContent}
          >
            <svg
              className={cn(
                'w-8 h-8 text-accent-7 origin-center transform rotate-90',
                {
                  'text-slate-500': !comment,
                  'text-green': comment || url,
                }
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
