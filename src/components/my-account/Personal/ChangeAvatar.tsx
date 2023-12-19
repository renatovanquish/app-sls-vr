import { Storage } from 'aws-amplify'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useUserAuth } from 'components/userAuth/context'
import { toast } from 'react-toast'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { FormCard } from 'components/ui'
import { useUI } from 'components/ui/context'

export default function ChangeAvatar(props: any) {
  const { user } = props
  const { updateUser } = useUserAuth()

  const [loading, setLoading] = useState(false)
  const { isSm } = useBreakPoints()
  const { setProgress } = useUI()

  const onDrop = useCallback(async (acceptedFiles: any[]) => {
    setLoading(true)
    const file = acceptedFiles[0]
    const extension = file.name.split('.').pop()
    const fileName = `avatar-${user.id}.${extension}`

    try {
      const tempAvatar = window.URL.createObjectURL(file)
      await updateUser({ id: user.id, avatar: fileName, tempAvatar })
      await Storage.put(fileName, file, {
        level: 'public',
        progressCallback(progress: { loaded: any; total: any }) {
          const { loaded, total } = progress
          const p = ((loaded / total) * 100).toFixed(0)
          setProgress(p)
        },
      })
      setProgress(0)
      toast('Avatar atualizado com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': []},
    onDrop,
  })

  return (
    <FormCard
      title="Foto do seu Perfil"
      description="Tire uma foto ou faça upload da sua galeria."
    >
      <div
        {...getRootProps()}
        className="text-tertiary-2 bg-accent-1 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-accent-3 border-dashed rounded-md cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte o arquivo aqui ...</p>
        ) : isSm ? (
          <p>Toque aqui para selecionar...</p>
        ) : (
          <p>Arraste e solte a imagem aqui ou clique para selecionar ...</p>
        )}
      </div>
    </FormCard>
  )
}
