/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Segment } from 'components/ui'
import { Check } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'

import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  enableFilter: string
  orderDesc: string
  thumbnail: string
  thumbnailFormat: string
  showDescription: string
  qtyColumns: string
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
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const watchThumbnail = watch('thumbnail')

  useEffect(() => {
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setValue('enableFilter', contentParse.enableFilter)
      setValue('orderDesc', contentParse.orderDesc)
      setValue('thumbnail', contentParse.thumbnail)
      setValue('thumbnailFormat', contentParse.thumbnailFormat)
      setValue('showDescription', contentParse.showDescription)
      setValue('qtyColumns', contentParse.qtyColumns ? contentParse.qtyColumns : 'auto')
    } else {
      setValue('enableFilter', 'true')
      setValue('orderDesc', 'false')
      setValue('thumbnail', '0')
      setValue('thumbnailFormat', 'squircle')
      setValue('showDescription', 'false')
      setValue('qtyColumns', 'auto')
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
          className="mt-4" title="Menu de navegação das páginas" 
          description="Opções da exibição." 
          notes="Exibe cards com links para todas as páginas do mesmo menu desta página." />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-1/3">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Exibir campo de filtro?
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('enableFilter')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Quantidade de colunas
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('qtyColumns')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="auto">Automatico</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Ordem decrescente?
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('orderDesc')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-1/3">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Descrição da página
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('showDescription')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="false">Não exibir</option>
                    <option value="true">Exibir</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3">
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
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="0">Não exibir</option>
                    <option value="32">Exibir mínimo</option>
                    <option value="64">Exibir pequeno</option>
                    <option value="96">Exibir médio</option>
                    <option value="128">Exibir grande</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {watchThumbnail !== '0' && (<div className="w-full md:w-1/3">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Formato do thumbnail
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('thumbnailFormat')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="squircle">Circulo quadrado</option>
                    <option value="circle">Circulo</option>
                    <option value="square">Quadrado</option>
                    <option value="wide">Retangulo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>)}
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
