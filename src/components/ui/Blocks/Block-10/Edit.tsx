/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input, Segment } from 'components/ui'
import { Check } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type Inputs = {
  blockTitle: string
  blockDescription: string
  typeOptions: string
  notes: string
  phone1: string
  phone2: string
  email: string
  address: string
  lat: string
  lng: string
  emailTo: string
  subject: string
}

interface Props {
  block: any
  handleUpdate: any
  index?: number
  onClickItem?: any
}

export default function Edit(props: Props) {
  const { block, handleUpdate, index, onClickItem } = props
  const [loading, setLoading] = useState(false)
  const { updateBlock } = useBlock()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setValue('blockTitle', contentParse.blockTitle)
      setValue('blockDescription', contentParse.blockDescription)
      setValue('typeOptions', contentParse.typeOptions)
      setValue('notes', contentParse.notes)
      setValue('phone1', contentParse.phone1)
      setValue('phone2', contentParse.phone2)
      setValue('email', contentParse.email)
      setValue('address', contentParse.address)
      setValue('lat', contentParse.lat)
      setValue('lng', contentParse.lng)
      setValue('emailTo', contentParse.emailTo)
      setValue('subject', contentParse.subject)
    } else {
      setValue('blockTitle', 'Entre em contato')
      setValue('blockDescription', 'Entre com as informações e sua mensagem.')
      setValue('typeOptions', '')
      setValue('notes', 'Seu contato será respondido em breve.')
      setValue('phone1', '')
      setValue('phone2', '')
      setValue('email', '')
      setValue('emailTo', '')
      setValue('subject', 'Novo contato pelo App')
      setValue('address', '')
      setValue('lat', '')
      setValue('lng', '')
    }
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const updatedBlock = await updateBlock({
      id: block.id,
      content: JSON.stringify(data),
    })
    delete updatedBlock.page
    handleUpdate(index, updatedBlock)
    toast.info(`Bloco atualizado com sucesso!`)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-full w-full mx-auto">

        <Segment className="mt-4" title="Formulário de Contato" description="Entre com as informações do formulário." />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-4/4">
            <Input
              label="Título do formulário"
              type="text"
              register={register('blockTitle')}
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full">
            <label className="text-accent-7 text-sm font-semibold px-1">
              Descrição
            </label>
            <div className="flex">
              <div className="w-10 z-10"></div>
              <Controller
                name="blockDescription"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <textarea
                    rows={2}
                    className="-ml-10 text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-4/4">
            <Input
              label="Tipos de contatos (Opcional e Separados por virgula)"
              type="text"
              register={register('typeOptions')}
              defaultValue={''}
              notes="Exemplo: Mais informações, Criticas, Sugestões..."
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
            <div className="w-full">
              <label className="text-accent-7 text-sm font-semibold px-1">
                Observações
              </label>
              <div className="flex">
                <div className="w-10 z-10"></div>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <textarea
                      rows={2}
                      className="-ml-10 text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        
        <Segment title="Seus dados comerciais" description="Email e telefones de contato." />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Número do telefone com DDD (1)"
              type="text"
              register={register('phone1')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Número do telefone com DDD (2)"
              type="text"
              register={register('phone2')}
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-4/4">
            <Input
              label="Email"
              type="text"
              register={register('email')}
              defaultValue={''}
            />
          </div>
        </div>

        <Segment title="Localização e coordenadas de gps" description="Informações da sua localização." />
        
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
            <div className="w-full">
              <label className="text-accent-7 text-sm font-semibold px-1">
                Endereço comercial
              </label>
              <div className="flex">
                <div className="w-10 z-10"></div>
                <Controller
                  name="address"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <textarea
                      rows={2}
                      className="-ml-10 text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <span className="text-accent-6 text-xs"></span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Latitude"
              type="text"
              register={register('lat')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Longitude"
              type="text"
              register={register('lng')}
              defaultValue={''}
            />
          </div>
        </div>

        <Segment title="Visualização no Admin e envio por emails" description="Configuração da Mensagem." />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-4/4">
            <Input
              label="Assunto da mensagem"
              type="text"
              register={register('subject')}
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-4/4">
            <Input
              label="Email(s) do(s) destinatário(s) (separados por virgula)"
              type="text"
              register={register('emailTo')}
              defaultValue={''}
              notes="Emails para os quais serão enviados o contato."
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button type="submit" variant="slim" loading={loading} disabled={false}>
          <Check className="-ml-2 mr-2" />
          Atualizar
        </Button>
      </div>
    </form>
  )
}
