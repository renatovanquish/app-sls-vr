import { Storage } from 'aws-amplify'
import { useCallback, useState } from 'react'
import { FormCard, Loading } from 'components/ui'
import { toast } from 'react-toast'
import { useRelation } from 'hooks/useRelation'
import { useRelationLink } from 'hooks/useRelationLink'
import { RelationModes } from 'models'
import { useDropzone } from 'react-dropzone'
import { useUI } from 'components/ui/context'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  relation: any
}

export default function FormAvatar(props: Props) {
  const { relation } = props
  const { setProgress, setItemListSelected, setItemListMode } = useUI()
  const { updateRelation } = useRelation()
  const { listRelationsLinkByRelationUser, updateRelationLink } = useRelationLink()
  const [loading, setLoading] = useState(false)
  
  const onDrop = useCallback(async (acceptedFiles: any[]) => {
    setLoading(true)
    const file = acceptedFiles[0]
    const extension = file.name.split('.').pop()
    const fileKey = `avatar-${uuidv4()}.${extension}`
    
    if (relation.avatar) {
      await Storage.remove(relation.avatar, { level: 'public' })
    }
    
    const { key } = await Storage.put(fileKey, file, {
      level: 'public',
      progressCallback(progress: { loaded: any; total: any }) {
        const { loaded, total } = progress
        const p = ((loaded / total) * 100).toFixed(0)
        setProgress(p)
      },
    })

    if (relation && relation.id && key) {
      await updateRelation({
        id: relation.id,
        type: relation.type,
        mode: relation.mode,
        status: relation.status,
        avatar: key,
        updatedAt: new Date().toISOString(),
      })
      
      const existRL = await listRelationsLinkByRelationUser({
        relationID: relation.id,
        // userID: { eq: user.id },
      })
      if (existRL.items.length > 0) {
        existRL.items.map(async (d: any) => {
          await updateRelationLink({
            id: d.id,
            type: d.type,
            notify: d.notify,
          })
        })
      }

      // setItemListSelected(false)
      setItemListMode('')
      setLoading(false)
    } else { setLoading(false) }

    setProgress(0)
    toast('Avatar atualizado com sucesso.', {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
  })

  return (
    <FormCard
      title={`Foto do ${relation.mode === RelationModes.PRIVATE ? 'contato' : 'grupo'}`}
      description="Tire uma foto ou faça upload da sua galeria."
    >
      {loading && <Loading />}
      {!loading && <div
        {...getRootProps()}
        className="bg-accent-1 text-blue mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-accent-3 border-dashed rounded-md cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte os arquivos aqui ...</p>
        ) : (
          <p>Arraste e solte a imagem aqui ou clique para selecionar ...</p>
        )}
      </div>}
    </FormCard>
  )
}
