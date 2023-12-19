/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input, Segment } from 'components/ui'
import { Check, Trash, Plus2 } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'

import { useForm, useFieldArray } from 'react-hook-form'

type FormValues = {
  justifyMode: string
  data: {
    name: string
    link: string
    size: string
    color: string
  }[]
}

interface Props {
  block: any
  handleUpdate: any
  index?: number
  onClickItem?: any
}

export default function Edit(props: Props) {
  const { block, handleUpdate, index } = props
  const [loading, setLoading] = useState(false)
  const { updateBlock } = useBlock()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      justifyMode: 'center',
      data: [],
    },
    mode: 'onBlur',
  })

  const { fields, append, remove } = useFieldArray({
    name: 'data',
    control,
  })

  useEffect(() => {
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setValue('justifyMode', contentParse.justifyMode)
      contentParse.data && contentParse.data.map((f: any) => append(f))
    } else {
      setValue('justifyMode', 'center')
    }
  }, [])

  const onSubmit = async (data: FormValues) => {
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

        <Segment className="mt-4" title="Modo de visualização" description="Selecione o modelo de exibição." />
        
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
        <div className="w-full md:w-2/4">
          <div className="flex -mx-3">
            <div className="w-full px-3">
              <label
                htmlFor=""
                className="text-accent-7 text-sm font-semibold px-1"
              >
                Alinhamento no Tablet e Desktop
              </label>
              <div className="flex">
                <div className="w-10 z-10"></div>
                <select
                  {...register('justifyMode')}
                  placeholder=""
                  className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                >
                  <option value="start">A esquerda</option>
                  <option value="center">Centralizado</option>
                  <option value="end">A direita</option>
                  <option value="between">Justificar entre</option>
                  <option value="around">Justificar ao redor</option>
                  <option value="evenly">Justificar uniformemente</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        </div>

        <Segment title="Botões" description="Entre com os botões." />

        {fields.map((field, index) => {
          return (
            <div key={field.id} className="max-w-full w-full mx-auto">
              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="w-full md:w-2/12">
                  <Input
                    label="Nome do botão"
                    type="text"
                    register={register(`data.${index}.name` as const, {
                      required: true,
                    })}
                    defaultValue={''}
                    className={errors?.data?.[index]?.name ? 'error' : ''}
                  />
                </div>
                <div className="w-full md:w-4/12">
                  <Input
                    label="Link (url ou apelido da página)"
                    type="text"
                    register={register(`data.${index}.link` as const)}
                    defaultValue={''}
                    className={errors?.data?.[index]?.link ? 'error' : ''}
                  />
                </div>
                <div className="w-full md:w-2/12">
                  <div className="flex -mx-3">
                    <div className="w-full px-3">
                      <label
                        htmlFor=""
                        className="text-accent-7 text-sm font-semibold px-1"
                      >
                        Cor
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10"></div>
                        <select
                          {...register(`data.${index}.color` as const)}
                          placeholder=""
                          className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        >
                          <option value="neutral">Preto</option>
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                          <option value="accent">Accent</option>
                          <option value="ghost">Transparente</option>
                          <option value="link">Transparente com underline</option>
                          <option value="info">Azul</option>
                          <option value="success">Verde</option>
                          <option value="warning">Laranja</option>
                          <option value="error">Vermelho</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/12">
                  <div className="flex -mx-3">
                    <div className="w-full px-3">
                      <label
                        htmlFor=""
                        className="text-accent-7 text-sm font-semibold px-1"
                      >
                        Tamanho
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10"></div>
                        <select
                          {...register(`data.${index}.size` as const)}
                          placeholder=""
                          className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        >
                          <option value="sm">Pequeno</option>
                          <option value="md">Médio</option>
                          <option value="lg">Grande</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/12 pt-8">
                  <button type="button" onClick={() => remove(index)}>
                    <Trash />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
        <button
          type="button"
          className="mt-2 bg-accent-9 text-accent-0 py-2 px-4 rounded-xl shadow"
          onClick={() =>
            append({
              name: '',
              size: 'md',
              link: '',
              color: 'primary',
            })
          }
        >
          <Plus2 /> <span className="ml-2">Adicionar Botão</span>
        </button>
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
