import { useEffect, useState } from 'react'
import { Button, Input, FormCard } from 'components/ui'
import { Cross, Check, Team } from 'components/icons'
import { toast } from 'react-toast'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useRelation } from 'hooks/useRelation'
import { useRelationLink } from 'hooks/useRelationLink'
import { RelationModes } from 'models'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { HeaderAdd } from 'components/relations'
import { useUI } from 'components/ui/context'
import { v4 as uuidv4 } from 'uuid'

type Inputs = {
  name: string
  reference: string
  description: string
}

interface Props {
  user: any
  relation: any
}

export default function FormGroup(props: Props) {
  const { user, relation } = props
  const [loading, setLoading] = useState(false)
  const { setItemListMode } = useUI()
  const { createRelation, updateRelation } = useRelation()
  const { listRelationsLinkByRelationUser, updateRelationLink, createRelationLink } = useRelationLink()
  const { isSm } = useBreakPoints()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const watchName = watch('name')

  useEffect(() => {
    if (relation.id) {
      setValue('name', relation.name)
      setValue('reference', relation.reference)
      setValue('description', relation.description)
    } else {
      setValue('name', '')
      setValue('reference', '')
      setValue('description', '')
    }
  }, [relation])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (loading) return
    
    setLoading(true)

    if (!data) {
      toast.error('Necessário informar os dados do grupo.')
      setLoading(false)
      return null
    }

    const { name, reference, description } = data

    if (!name) {
      toast.error('Necessário informar o nome.')
      setLoading(false)
      return null
    }

    const search = `${name.toLowerCase()}`

    if (relation && relation.id) {
      await updateRelation({
        id: relation.id,
        name,
        description,
        status: relation.status,
        mode: relation.mode,
        reference,
        search,
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
      toast('Grupo atualizado com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
      setLoading(false)
      setItemListMode('')
    } else {
      const relationID = uuidv4()
      await createRelationLink({
        relationID,
        userID: user.id,
        type: 'CONTACT',
        notify: 0,
        search
      })
      const createdRelation = await createRelation({
        id: relationID,
        type: 'CONTACT',
        mode: RelationModes.GROUP,
        status: 'ACTIVE',
        name,
        description,
        reference,
        members: [user.id],
        admins: [user.id],
        search,
      })
      toast('Grupo adicionado com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
      setLoading(false)
      setItemListMode('')
    }
  }

  const Buttons: React.FC = () => (
    <div>
      {!isSm && (
        <Button
          style={{ backgroundColor: '#64748b', color: '#fff' }}
          variant="slim"
          className="mr-4"
          type="button"
          onClick={() => setItemListMode('')}
        >
          <Cross className="h-7 w-7 mr-2" /> CANCELAR
        </Button>
      )}

      <Button
        variant={!isSm ? 'slim' : undefined}
        loading={loading}
        disabled={!watchName}
        type="submit"
      >
        <Check className="h-7 w-7" />
        <span className="ml-2 font-semibold md:font-medium text-lg md:text-base">
          SALVAR
        </span>
      </Button>

      {isSm && (
        <Button
          style={{ backgroundColor: '#64748b', color: '#fff' }}
          variant="slim"
          className="mt-4 lg:mt-0 ml-0 md:ml-4"
          type="button"
          onClick={() => setItemListMode('')}
        >
          <Cross className="h-7 w-7 mr-2" /> CANCELAR
        </Button>
      )}
    </div>
  )

  return (
    <form className='pb-20 select-none' onSubmit={handleSubmit(onSubmit)}>
      <FormCard title="" description="" buttons={<Buttons />}>
        <HeaderAdd />

        <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
          <div className="basis-full lg:basis-2/4">
            <Input
              label="Nome do grupo"
              type="text"
              icon={<Team />}
              aria-invalid={errors.name ? 'true' : 'false'}
              register={register('name', { required: true })}
              defaultValue={''}
              notes={
                errors.name && errors.name.type === 'required'
                  ? 'Nome é obrigatório.'
                  : ''
              }
            />
          </div>
          <div className="basis-full lg:basis-2/4">
            <Input
              label="Referência"
              type="text"
              register={register('reference')}
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
          <div className="basis-full">
            <label className="text-sm font-semibold px-1">
              Descrição
            </label>
            <div className="flex">
              <div className="w-10 z-10"></div>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <textarea
                    rows={3}
                    className="-ml-10 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <span className="text-accent-6 text-xs"></span>
          </div>
        </div>
      </FormCard>
    </form>
  )
}
