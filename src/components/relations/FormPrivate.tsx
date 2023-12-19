import { useEffect, useState } from 'react'
import { validate } from 'email-validator'
import { Button, Input, FormCard } from 'components/ui'
import { Person, Mail, Cross, Check } from 'components/icons'
import { toast } from 'react-toast'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useUser } from 'hooks/useUser'
import { useRelation } from 'hooks/useRelation'
import { useRelationLink } from 'hooks/useRelationLink'
import { RelationModes } from 'models'
import { useUI } from 'components/ui/context'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { HeaderAdd } from 'components/relations'

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

type Inputs = {
  name: string
  reference: string
  email: string
  phone: string
  description: string
}

interface Props {
  user: any
  relation: any
}

export default function FormPrivate(props: Props) {
  const { user, relation } = props
  const [loading, setLoading] = useState(false)
  const { setItemListMode } = useUI()

  const { userExists, adminCreateUser, adminUpdateUser, updateUser } = useUser()
  const { createRelationContact, deleteRelation, updateRelation } =
    useRelation()
  const { listRelationsLinkByRelationUser, updateRelationLink, deleteRelationLink } = useRelationLink()
  
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
  const watchEmail = watch('email')
  const watchPhone = watch('phone')

  useEffect(() => {
    if (relation.id) {
      setValue('name', relation.name)
      setValue('reference', relation.reference)
      setValue('email', relation.contact.email)
      setValue('phone', relation.contact.phone)
      setValue('description', relation.description)
    } else {
      setValue('name', '')
      setValue('reference', '')
      setValue('email', '')
      setValue('phone', '')
      setValue('description', '')
    }
  }, [relation])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (loading) return

    setLoading(true)

    if (!data) {
      toast.error('Necessário informar os dados do contato.')
      setLoading(false)
      return null
    }

    let { name, reference, email, phone, description } = data
    email = email.trim().toLowerCase()

    if (!name) {
      toast.error('Necessário informar o nome.')
      setLoading(false)
      return null
    }

    if (!email) {
      toast.error('Necessário informar o email.')
      setLoading(false)
      return null
    }

    // CHECK USER EXISTS
    const UserExists = { email, phone }
    const r = await userExists(UserExists)
    console.log('userExists', r)
    let id = r.id

    if (!id) {
      // CREATE USER IF NOT EXISTS
      const u = {
        name,
        email: email ? email : undefined,
        phone: phone ? phone : undefined,
      }
      const { createdUser } = await adminCreateUser(u)
      console.log('createdUser', createdUser)
      id = createdUser ? createdUser.id : ''
    }

    let changeEmailAndPhone = false
    let changeEmailOrPhone = false

    const search = `${name.toLowerCase()} ${
      reference && reference.toLowerCase()
    }`

    /* EXITE O CONTATO E NÃO ESTA ATIVO */
    if (id && relation && relation.contact && !relation.contact.active) {
      const emailFmt = relation.contact.email
        ? relation.contact.email.toString()
        : null
      const phoneFmt = relation.contact.phone
        ? relation.contact.phone.toString()
        : null

      changeEmailOrPhone =
        emailFmt === email && phoneFmt === phone
          ? false
          : true
      changeEmailAndPhone =
        emailFmt !== email && phoneFmt !== phone
          ? true
          : false

      /* NAO ALTEROU O EMAIL NEM O TELEFONE */
      if (!changeEmailAndPhone && !changeEmailOrPhone) {
        await updateRelation({
          id: relation.id,
          name,
          reference,
          description,
          search,
          status: relation.status,
          mode: relation.mode,
          updatedAt: new Date().toISOString(),
        }) 
        
        await updateUser({ id, name, search })

        toast('Contato atualizado com sucesso.', {
          backgroundColor: '#263238',
          color: '#fff',
        })
      }

      /* ALTEROU O EMAIL E O TELEFONE */
      if (changeEmailAndPhone) {
        relation.relationsLink.items.map(async (rl: any) => {
          await deleteRelationLink({ id: rl.id })
        })
        await deleteRelation({ id: relation.id })
      }

      if (!changeEmailAndPhone && changeEmailOrPhone) {
        try {
          await updateRelation({
            id: relation.id,
            name,
            reference,
            description,
            search,
            status: relation.status,
            mode: relation.mode,
            updatedAt: new Date().toISOString(),
          })

          const User = {
            id,
            name,
            email: email ? email : undefined,
            phone: phone ? phone : undefined,
            search
          }

          const { updatedUser, message } = await adminUpdateUser(User)
          
          toast(message.text, {
            backgroundColor: '#263238',
            color: '#fff',
          })
          console.log('updatedUser', updatedUser)

        } catch (e: any) {
          console.log(e)
          if (e && e[0] && e[0].message) {
            toast.error(e.errors[0].message)
          }
          setLoading(false)
        }
      }

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
      
      setLoading(false)
      setItemListMode('')
    }

    /* NOVO CONTATO OU NOVO RELACIONAMENTO */
    if (id && (!relation || !relation.contact || changeEmailAndPhone)) {
      const RelationContact = {
        type: 'CONTACT',
        mode: RelationModes.PRIVATE,
        status: 'ACTIVE',
        name,
        description,
        avatar: '',
        reference,
        contactID: id,
        userID: user.id,
        search,
      }

      const resultCRC = await createRelationContact(RelationContact)
      console.log('createRelationContact', resultCRC.createdRelation)
      if (resultCRC.message && resultCRC.message.text) {
        toast.error(resultCRC.message.text)
      } else {
        toast(changeEmailOrPhone ? 'Contato atualizado com sucesso.' : 'Contato adicionado com sucesso.', {
          backgroundColor: '#263238',
          color: '#fff',
        })
      }
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
        disabled={
          !watchName ||
          (!watchEmail && !watchPhone) ||
          (watchEmail && !validate(watchEmail) ? true : false)
        }
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
    <form className="pb-20 select-none" onSubmit={handleSubmit(onSubmit)}>
      <FormCard title="" description="" buttons={<Buttons />}>
        <HeaderAdd />
        <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
          <div className="basis-full lg:basis-2/4">
            <Input
              label="Nome do contato"
              type="text"
              icon={<Person />}
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
          <div className="basis-full lg:basis-2/4">
            <Input
              label="Email"
              type="email"
              icon={<Mail />}
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
          <div className="basis-full lg:basis-2/4">
            <div className="w-full">
              <label
                htmlFor=""
                className="text-sm font-semibold px-1"
              >
                Celular
              </label>
              <div className="flex">
                <div className="w-10 z-10"></div>
                <PhoneInput
                  name="phone"
                  id="phone"
                  className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  value={
                    relation && relation.contact && relation.contact.phone
                      ? relation.contact.phone
                      : ''
                  }
                  onChange={(value: string) => {
                    setValue('phone', value)
                  }}
                  international={false}
                  defaultCountry="BR"
                  placeholder=""
                />
              </div>
            </div>
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
