/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input, Segment } from 'components/ui'
import { Check, Video } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type Inputs = {
  videoUrl: string
  size: string
  controls: boolean
  autoplay: boolean
  muted: boolean
  viewShadow: string
  viewBorder: string
  viewBgColor: string
  viewRounded: string
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
      setValue('videoUrl', contentParse.videoUrl)
      setValue('size', contentParse.size)
      setValue('controls', contentParse.controls)
      setValue('autoplay', contentParse.autoplay)
      setValue('muted', contentParse.muted)
      setValue(
        'viewShadow',
        contentParse.viewShadow ? contentParse.viewShadow : '-none'
      )
      setValue(
        'viewBorder',
        contentParse.viewBorder ? contentParse.viewBorder : '0'
      )
      setValue(
        'viewBgColor',
        contentParse.viewBgColor ? contentParse.viewBgColor : 'none'
      )
      setValue(
        'viewRounded',
        contentParse.viewRounded ? contentParse.viewRounded : '-none'
      )
    } else {
      setValue('size', 'md')
      setValue('controls', true)
      setValue('autoplay', false)
      setValue('muted', false)
      setValue('viewShadow', '-none')
      setValue('viewBorder', '0')
      setValue('viewBgColor', 'none')
      setValue('viewRounded', '-none')
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
        <Segment className="mt-4" title="Vídeo Player" description="Configurações do vídeo." />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-4/4">
            <div className="flex flex-row-reverse w-full">
              <div className="mt-6 pl-2">
                <div
                  className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                  onClick={() =>
                    onClickItem({ action: 'IMAGES', block, index })
                  }
                >
                  <Video className="flex-shrink-0 h-6 w-6 text-accent-7" />
                </div>
              </div>
              <div className="w-full">
                <Input
                  label="URL do vídeo"
                  type="text"
                  register={register('videoUrl')}
                  defaultValue={''}
                  notes="Informe a url do vídeo da internet ou da galeria de mídias."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-1/4">
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

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="-none">Nenhuma</option>
                    <option value="-sm">Mínima</option>
                    <option value="">Pequena</option>
                    <option value="-md">Média</option>
                    <option value="-lg">Grande</option>
                    <option value="-xl">Extra grande</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/4">
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

          <div className="w-full md:w-1/4">
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

          <div className="w-full md:w-1/4">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Cantos arredondados
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('viewRounded')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="-none">Nenhum</option>
                    <option value="-sm">Mínimo</option>
                    <option value="">Pequeno</option>
                    <option value="-md">Médio</option>
                    <option value="-lg">Grande</option>
                    <option value="-xl">Extra</option>
                    <option value="-2xl">Extra grande</option>
                    <option value="-3xl">Máximo</option>
                    <option value="-full">Todo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Tamanho para exibição do vídeo.
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('size')}

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
        </div>

        <div className="mt-6 flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <Controller
                control={control}
                name="controls"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <input
                    type="checkbox"
                    className="checkbox"
                    onBlur={onBlur}
                    onChange={onChange}
                    checked={value}
                  />
                )}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="controls" className="text-accent-9">
                Exibir controles do vídeo?
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <Controller
                control={control}
                name="autoplay"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <input
                    type="checkbox"
                    className="checkbox"
                    onBlur={onBlur}
                    onChange={onChange}
                    checked={value}
                  />
                )}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="autoplay" className="text-accent-9">
                Habilitar Autoplay?
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <Controller
                control={control}
                name="muted"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <input
                    type="checkbox"
                    className="checkbox"
                    onBlur={onBlur}
                    onChange={onChange}
                    checked={value}
                  />
                )}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="muted" className="text-accent-9">
                Definir mudo como padrão?
              </label>
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
