/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Segment } from 'components/ui'
import { Check } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'
import { useFolder } from 'hooks/useFolder'

import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  folder: string
  viewMode: string
  viewData: string
  viewShadow: string
  viewBorder: string
  viewBgColor: string
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
  const [foldersList, setFoldersList] = useState([] as any)

  const { updateBlock } = useBlock()
  const { listFolders } = useFolder()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const watchViewMode = watch('viewMode')

  useEffect(() => {
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setValue('folder', contentParse.folder)
      setValue(
        'viewMode',
        contentParse.viewMode ? contentParse.viewMode : 'masonry'
      )
      setValue(
        'viewData',
        contentParse.viewData ? contentParse.viewData : 'none'
      )
      setValue(
        'viewShadow',
        contentParse.viewShadow ? contentParse.viewShadow : '-lg'
      )
      setValue(
        'viewBorder',
        contentParse.viewBorder ? contentParse.viewBorder : '2'
      )
      setValue(
        'viewBgColor',
        contentParse.viewBgColor ? contentParse.viewBgColor : '1'
      )
    } else {
      setValue('viewMode', 'masonry')
      setValue('viewData', 'none')
      setValue('viewShadow', '-lg')
      setValue('viewBorder', '2')
      setValue('viewBgColor', '1')
    }
  }, [block, foldersList])

  useEffect(() => {
    let isMounted = true
    const fetchFolders = async () => {
      if (isMounted) {
        const { items } = await listFolders({ limit: 1000 })
        setFoldersList(
          items.sort((a: any, b: any) => a.name.localeCompare(b.name))
        )
      }
    }
    fetchFolders()
    return () => {
      isMounted = false
      setFoldersList([] as any)
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
          className="mt-4" title="Origem das imagems"
          description="Selecione a origem das imagens."
        />

        <div className="flex flex-col sm:flex-row w-full  space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-4/4">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Pasta da Galeria de Mídias com as imagens
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('folder')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    {foldersList.map((f: any, index: number) => (
                      <option key={index} value={f.name}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Segment
          title="Formas de exibição"
          description="Configurações das imagens."
        />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Modo de visualização
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('viewMode')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="masonry">Masonry</option>
                    <option value="carousel">Carousel</option>
                    <option value="grid">Grid</option>
                    <option value="grid_contain">Grid (conter)</option>
                    <option value="grid_cover">Grid (cobrir)</option>
                    <option value="grid_fill">Grid (preencher)</option>
                    <option value="grid_scale-down">Grid (scale-down)</option>
                    <option value="grid_none">Grid (none)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {watchViewMode !== 'carousel' && (
            <div className="w-full md:w-2/4">
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Visualização dos dados
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('viewData')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value="none">Nenhum</option>
                      <option value="name">Nome do arquivo</option>
                      <option value="name_size">
                        Nome e tamanho do arquivo
                      </option>
                      <option value="title">Título da mídia</option>
                      <option value="title_description">
                        Título e descrição da mídia
                      </option>
                      <option value="title_subtitle_description">
                        Título, sub-título e descrição da mídia
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/6">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Sombra
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('viewShadow')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="-none">Nenhuma</option>
                    <option value="-sm">Mínima</option>
                    <option value="">Pequena</option>
                    <option value="-md">Média</option>
                    <option value="-lg">Grande</option>
                    <option value="-xl">Extra grande</option>
                    <option value="-inner">Interna</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/6">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Espessura da borda
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('viewBorder')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="0">Nenhuma</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/6">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Escala da cor de fundo
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('viewBgColor')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="none">Nenhuma</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
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
