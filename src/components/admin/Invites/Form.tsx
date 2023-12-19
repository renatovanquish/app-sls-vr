import { useState, useEffect } from 'react'
import { Button, Input, Segment, Editor } from 'components/ui'
import { Check, Undo, External } from 'components/icons'
import { toast } from 'react-toast'
import { useRouter } from 'next/router'
import { useInvite } from 'hooks/useInvite'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'email-validator'
import { useUser } from 'hooks/useUser'
import { InviteStatus } from 'models'

type Inputs = {
  name: string
  description: string
  email: string
  phone: string
}

interface Props {
  userID: string
  invite: any
  setCurrentItem?: any
  handleUpdate?: any
  index?: number
}

export default function FormInvite(props: Props) {
  const { userID, invite, setCurrentItem, handleUpdate, index } = props
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [groups, setGroups] = useState([] as any)
  const router = useRouter()
  const { userExists } = useUser()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const watchName = watch('name')
  const watchEmail = watch('email')
  const watchDescription = watch('description')

  const { createInvite, updateInvite } = useInvite()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (invite) {
        setValue('name', invite.name)
        setValue('description', invite.description ? invite.description : '')
        setValue('email', invite.email)
        setValue('phone', invite.phone)
      } else {
        setValue('description', '')
      }

      setGroups(
        (process.env.GROUPS as any).map((group: string, idx: number) => {
          return {
            group,
            status:
              invite && invite.groups && invite.groups.indexOf(group) > -1
                ? true
                : false,
          }
        })
      )
    }
    return () => {
      isMounted = false
      setGroups([] as any)
    }
  }, [invite, setValue])

  const sendInviteMail = async (
    name: string,
    description: string,
    email: string
  ) => {
    if (!email) {
      return null
    }
    setLoading2(true)
    const resSend = await fetch('/api/sendInviteMail', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        description,
      }),
    })
    toast(`Convite enviado com sucesso.`, {
      backgroundColor: '#263238',
      color: '#fff',
    })
    setLoading2(false)
    return resSend
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, description, email, phone } = data

    if (!name) {
      toast.error(`Nome do convidado é obrigatório.`)
      return null
    }

    const UserExists = { email, phone }
    const { hasEmail, hasPhone } = await userExists(UserExists)
    if (hasEmail && hasPhone) {
      toast.error(`Já existe um usuário cadastrado com este email e celular.`)
      return null
    } else if (hasEmail) {
      toast.error(`Já existe um usuário cadastrado com este email.`)
      return null
    } else if (hasPhone) {
      toast.error(`Já existe um usuário cadastrado com este celular.`)
      return null
    }

    setLoading(true)

    const groupsFmt = [] as any
    groups.forEach((group: any) => {
      if (group.status) {
        groupsFmt.push(group.group)
      }
    })

    const input = {
      id: invite ? invite.id : uuidv4(),
      name,
      description,
      email: email ? email.trim().toLowerCase() : null,
      status: invite ? invite.status : InviteStatus.SENT,
      groups: groupsFmt,
    } as any

    if (!invite) {
      await createInvite(input)
      await sendInviteMail(name, description, email)
      router.push('/admin/invites')
    } else {
      await updateInvite(input)
    }

    if (setCurrentItem) {
      const obj = JSON.parse(JSON.stringify(invite))
      Object.keys(obj).forEach((p: any) => {
        if (input.hasOwnProperty(p)) {
          obj[p] = input[p]
        }
      })
      setCurrentItem(obj)
    }

    if (handleUpdate) {
      handleUpdate(input)
    }

    setLoading(false)

    toast(`Convite ${!invite ? 'adicionado' : 'atualizado'} com sucesso.`, {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const handleCheckboxChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    setGroups(
      groups.map((group: any) => {
        if (group.group === target.name) {
          group.status = value
        }
        return group
      })
    )
  }

  return (
    <div className="max-w-full w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
          <div className="basis-full lg:basis-2/4">
            <Input
              label="Nome do convidado"
              type="text"
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
              label="Email"
              type="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              register={register('email', { required: true })}
              defaultValue={''}
              notes={
                errors.email && errors.email.type === 'required'
                  ? 'Email é obrigatório.'
                  : ''
              }
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
          <div className="w-full">
            <label className="text-accent-7 text-sm font-semibold px-1">
              Conteúdo do convite
            </label>
            <Editor
              fieldName="description"
              value={watchDescription}
              setValue={setValue}
              mode="essential"
            />
          </div>
        </div>

        <Segment
          className="mt-4"
          title="Grupo do convidado"
          description="Seu convidado pode ser adicionado a um ou mais grupos."
        />

        <div className="">
          {groups.map((g: any, idx: number) => (
            <div key={idx} className="mt-4 flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={g.group}
                  name={g.group}
                  checked={g.status}
                  onChange={handleCheckboxChange}
                  className="checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="allowViewEmail" className="text-accent-9">
                  {g.group}
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={
              !watchName ||
              !watchEmail ||
              (watchEmail && !validate(watchEmail) ? true : false)
            }
          >
            <Check className="-ml-2 mr-2" />
            {!invite && <span>Adicionar</span>}
            {invite && <span>Atualizar</span>}
          </Button>
          {!invite && (
            <Button
              style={{ backgroundColor: 'transparent', color: '#282a36' }}
              onClick={() => {
                router.push('/admin/invites')
              }}
              className="ml-2"
              variant="slim"
              type="button"
            >
              <Undo className="-ml-2 mr-2" />
              Convites
            </Button>
          )}
          {invite && (
            <Button
              style={{ backgroundColor: '#f97316', color: '#fff' }}
              onClick={() => {
                sendInviteMail(watchName, watchDescription, watchEmail)
              }}
              className="ml-2"
              variant="slim"
              type="button"
              loading={loading2}
            >
              <External className="-ml-2 mr-2" />
              Reenviar Convite
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
