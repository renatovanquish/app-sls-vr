import { useCallback, useRef, useState } from 'react'

const defaultContraints: MediaStreamConstraints = {
  audio: true,
  video: false,
}

type MediaRecorderOptions = {
  mimeType?: string
  audioBitsPerSecond?: number
  videoBitsPerSecond?: number
  bitsPerSecond?: number
}

type StopRecordingCallback = (blob: Blob, url: string) => void

export enum RecorderStatus {
  'IDLE' = 'idle',
  'INIT' = 'init',
  'RECORDING' = 'recording',
  'UNREGISTERED' = 'unregistered',
}

export enum RecorderError {
  'STREAM_INIT' = 'stream-init',
  'RECORDER_INIT' = 'recorder-init',
}

function useRecorder(
  mediaStreamConstraints?: Partial<MediaStreamConstraints>,
  mediaRecorderOptions?: Partial<MediaRecorderOptions>
): {
  mediaRecorder?: MediaRecorder
  stream?: MediaStream
  startRecording: () => void
  stopRecording: (callback: StopRecordingCallback) => () => void
  register: (element: HTMLAudioElement) => void
  unregister: () => void
  status: RecorderStatus
  error?: RecorderError
} {
  const mediaRecorderRef = useRef<MediaRecorder>()
  const streamRef = useRef<MediaStream>()
  const audioElementRef = useRef<HTMLAudioElement>()
  const [status, setStatus] = useState<RecorderStatus>(RecorderStatus.INIT)
  const [error, setError] = useState<RecorderError>()

  const initStream = useCallback(
    async (audioRef: HTMLAudioElement) => {
      try {
        streamRef.current = await navigator.mediaDevices?.getUserMedia({
          ...defaultContraints,
          ...(mediaStreamConstraints ? { ...mediaStreamConstraints } : {}),
        })
        audioElementRef.current = audioRef
        audioElementRef.current.srcObject = streamRef.current
        return streamRef.current
      } catch (err) {
        throw new Error(RecorderError.STREAM_INIT)
      }
    },
    [mediaStreamConstraints]
  )

  const initMediaRecorder = useCallback(
    (stream: MediaStream) => {
      if (
        mediaRecorderOptions?.mimeType &&
        !MediaRecorder.isTypeSupported(mediaRecorderOptions.mimeType)
      ) {
        console.warn(`MIME type ${mediaRecorderOptions.mimeType} not supported`)
      }

      try {
        const recorder = new MediaRecorder(
          stream,
          { ...mediaRecorderOptions } || {}
        )
        mediaRecorderRef.current = recorder
        setStatus(RecorderStatus.IDLE)
      } catch {
        throw new Error(RecorderError.RECORDER_INIT)
      }
    },
    [mediaRecorderOptions]
  )

  const register = useCallback(
    (element: HTMLAudioElement) => {
      initStream(element).then(initMediaRecorder).catch(setError)
    },
    [initMediaRecorder, initStream]
  )

  const unregister = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause()
      audioElementRef.current.src = ''
    }
    const tracks = streamRef.current?.getTracks()
    if (!tracks || tracks?.length === 0) return
    tracks.forEach((track) => track.stop())
    setStatus(RecorderStatus.UNREGISTERED)
  }, [])

  const startRecording = useCallback(() => {
    setStatus(RecorderStatus.RECORDING)
    mediaRecorderRef.current?.start()
  }, [])

  const stopRecording = useCallback(
    (callback: StopRecordingCallback) => () => {
      setStatus(RecorderStatus.IDLE)
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.ondataavailable = ({
          data: blob,
        }: BlobEvent) => {
          callback(blob, URL.createObjectURL(blob))
        }
        mediaRecorderRef.current?.stop()
      }
    },
    []
  )

  return {
    mediaRecorder: mediaRecorderRef?.current,
    stream: streamRef?.current,
    startRecording,
    stopRecording,
    register,
    unregister,
    status,
    error,
  }
}

export default useRecorder
