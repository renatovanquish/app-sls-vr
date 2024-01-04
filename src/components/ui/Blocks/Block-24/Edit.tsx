/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input, Segment } from 'components/ui'
import { Check } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'

type Inputs = {
  type: string
  security: string
  showDescription: string
  showReference: string
  thumbnail: string
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
  const [types, setTypes] = useState([] as any)
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
      setValue('type', contentParse.type)
      setValue(
        'showDescription',
        contentParse.showDescription ? contentParse.showDescription : 'show'
      )
      setValue(
        'showReference',
        contentParse.showReference ? contentParse.showReference : 'show'
      )
      setValue(
        'thumbnail',
        contentParse.thumbnail ? contentParse.thumbnail : 'show'
      )
      setValue(
        'security',
        contentParse.security ? contentParse.security : 'auth'
      )
    } else {
      setValue('type', 'ALL')
      setValue('showDescription', 'show')
      setValue('showReference', 'show')
      setValue('thumbnail', 'show')
      setValue('security', 'auth')
    }
  }, [])

  useEffect(() => {
    setTypes(
      (process.env.RELATIONS as any).filter((rl: any) => {
        return rl.restricted
      })
    )
    return () => {
      setTypes([] as any)
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
        <Segment
          className="mt-4" title="Configurações dos Conteúdos Restritos"
          description="Opções de Visualização"
        />

        {types && types.length > 0 && (
          <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
            <div className="basis-full md:basis-1/2">
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Tipos dos conteúdos
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('type')}

                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value="ALL">Todos os tipos</option>
                      {types.map((t: any, idx: number) => (
                        <option key={idx} value={t.type}>
                          Apenas {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-full md:basis-1/2">
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Controle de acesso
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('security')}

                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value="auth">Autenticação Padrão</option>
                      <option value="qrCode">
                        Autenticação mais QR Code (Requer App instalado)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Segment
          title="Preferências de exibição"
          description="Formatação dos Cards"
        />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="basis-full md:basis-1/3">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Thumbnail
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('thumbnail')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="show">Exibir</option>
                    <option value="hide">Não exibir</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-1/3">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Descrição do conteúdo
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('showDescription')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="hide">Não exibir</option>
                    <option value="show">Exibir</option>
                    <option value="show-1">Exibir até uma linha</option>
                    <option value="show-2">Exibir até duas linhas</option>
                    <option value="show-3">Exibir até três linha</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-1/3">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Referência do conteúdo
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('showReference')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="hide">Não exibir</option>
                    <option value="show">Exibir</option>
                    <option value="show-1">Exibir até uma linha</option>
                    <option value="show-2">Exibir até duas linhas</option>
                    <option value="show-3">Exibir até três linha</option>
                  </select>
                </div>
              </div>
            </div>
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
