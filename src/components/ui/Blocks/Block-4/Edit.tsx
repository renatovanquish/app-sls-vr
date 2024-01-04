/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input, Segment } from 'components/ui'
import { Check, Picture } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'

import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  imageMode: string
  imageMask: string
  imageUrl: string
  imageUrlSm: string
  imageHeight: number
  imageHeightSm: number
  aspectRatio: string
  aspectRatioCustom: string
  objectMode: string
  viewShadow: string
  viewBorder: string
  viewBgColor: string
  viewRounded: string
  quality: number
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

  const watchImageMode = watch('imageMode')
  const watchImageMask = watch('imageMask')
  const watchAspectRatio = watch('aspectRatio')

  useEffect(() => {
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setValue('imageUrl', contentParse.imageUrl)
      setValue('imageUrlSm', contentParse.imageUrlSm)
      setValue('imageHeight', contentParse.imageHeight)
      setValue('imageHeightSm', contentParse.imageHeightSm)
      setValue('imageMode', contentParse.imageMode)
      setValue('imageMask', contentParse.imageMask)
      setValue('aspectRatioCustom', contentParse.aspectRatioCustom)
      setValue(
        'aspectRatio',
        contentParse.aspectRatio ? contentParse.aspectRatio : '1:1'
      )
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
      setValue(
        'objectMode',
        contentParse.objectMode ? contentParse.objectMode : 'none'
      )
      setValue(
        'quality',
        contentParse.quality ? contentParse.quality : 75
      )
    } else {
      setValue('imageMode', 'paralax')
      setValue('imageMask', 'none')
      setValue('aspectRatio', '1:1')
      setValue('viewShadow', '-none')
      setValue('viewBorder', '0')
      setValue('viewBgColor', 'none')
      setValue('viewRounded', '-none')
      setValue('objectMode', 'none')
      setValue('quality', 75)
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
        <Segment className="mt-4" title='Imagem' description='Configurações da imagem.' />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-1/4">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Layout
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('imageMode')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="paralax">Paralax</option>
                    <option value="intrinsic">Intrínseco</option>
                    <option value="responsiveLg">Responsivo - Grande</option>
                    <option value="responsiveMd">Responsivo - Médio</option>
                    <option value="responsiveSm">Responsivo - Pequeno</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {watchImageMode !== 'paralax' && (
            <div className="w-full md:w-1/4">
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Qualidade da otimização
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('quality')}

                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                    <option value="50">50%</option>
                    <option value="55">55%</option>
                    <option value="60">60%</option>
                    <option value="65">65%</option>
                    <option value="70">70%</option>
                    <option value="75">75% - Recomendado!</option>
                    <option value="80">80%</option>
                    <option value="85">85%</option>
                    <option value="90">90%</option>
                    <option value="95">95%</option>
                    <option value="100">100%</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          {watchImageMode !== 'paralax' && (
            <div className="w-full md:w-1/4">
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Ajuste
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('objectMode')}

                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                    <option value="contain">Conter</option>
                    <option value="cover">Cobrir</option>
                    <option value="fill">Preencher</option>
                    <option value="scale-down">Scale-down</option>
                    <option value="none">Nenhum</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          {watchImageMode !== 'paralax' && (
            <div className="w-full md:w-1/4">
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Mascara
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('imageMask')}

                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value="none">Nenhuma</option>
                      <option value="circle">Circulo</option>
                      <option value="squircle">Quadrado arredondado</option>
                      <option value="heart">Coração</option>
                      <option value="hexagon">Hexágono</option>
                      <option value="hexagon2">Hexágono 2</option>
                      <option value="decagon">Decágono</option>
                      <option value="pentagon">Pentágono</option>
                      <option value="diamond">Diamante</option>
                      <option value="star">Estrela</option>
                      <option value="star2">Estrela 2</option>
                      <option value="triangle">Triângulo</option>
                      <option value="triangle2">Triângulo 2</option>
                      <option value="triangle3">Triângulo 3</option>
                      <option value="triangle4">Triângulo 4</option>
                      <option value="parallelogram">Paralelogramo</option>
                      <option value="parallelogram2">Paralelogramo 2</option>
                      <option value="parallelogram3">Paralelogramo 3</option>
                      <option value="parallelogram4">Paralelogramo 4</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className={`w-full ${watchImageMode === 'paralax' ? 'md:w-3/4' : watchAspectRatio === 'custom' ? 'md:w-2/4' : 'md:w-3/4'}`}>
            <div className="flex flex-row-reverse w-full">
              <div className="mt-6 pl-2">
                <div
                  className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                  onClick={() =>
                    onClickItem({ action: 'IMAGES', block, index })
                  }
                >
                  <Picture className="flex-shrink-0 h-6 w-6 text-accent-7" />
                </div>
              </div>
              <div className="w-full">
                <Input
                  label={`URL de uma imagem ${watchImageMode === 'paralax' ? '(padrão)' : ''}`}
                  type="text"
                  register={register('imageUrl')}
                  defaultValue={''}
                  notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                />
              </div>
            </div>
          </div>
          {watchImageMode !== 'paralax' && (<div className="w-full md:w-1/4">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Proporção
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('aspectRatio')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="1280:720">16:9 - Horizontal</option>
                    <option value="1067:800">8:5 - Horizontal</option>
                    <option value="800:533">4:3 - Horizontal</option>
                    <option value="800:800">1:1 - Quadrado</option>
                    <option value="720:1280">9:16 - Vertical</option>
                    <option value="800:1067">5:8 - Vertical</option>
                    <option value="533:800">3:4 - Vertical</option>
                    <option value="custom">Personalizado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>)}
          {watchAspectRatio === 'custom' && (<div className="w-full md:w-1/4">
            <div className="w-full">
                <Input
                  label="Largura:Altura"
                  type="text"
                  register={register('aspectRatioCustom')}
                  defaultValue={''}
                  notes="Exemplo: 1280:720"
                />
              </div>
          </div>)}
          {watchImageMode === 'paralax' && (
            <div className="w-full md:w-1/4">
              <Input
                label="Altura em pixels"
                type="number"
                aria-invalid={errors.imageHeight ? 'true' : 'false'}
                register={register('imageHeight')}
                defaultValue={''}
                notes="O padrão é 400."
              />
            </div>
          )}
        </div>
        {watchImageMode === 'paralax' && <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
        <div className={`w-full md:w-3/4`}>
            <div className="flex flex-row-reverse w-full">
              <div className="mt-6 pl-2">
                <div
                  className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                  onClick={() =>
                    onClickItem({ action: 'IMAGES', block, index })
                  }
                >
                  <Picture className="flex-shrink-0 h-6 w-6 text-accent-7" />
                </div>
              </div>
              <div className="w-full">
                <Input
                  label="URL de uma imagem (Celular)"
                  type="text"
                  register={register('imageUrlSm')}
                  defaultValue={''}
                  notes="Caso não informado, será utilizada a url padrão."
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4">
              <Input
                label="Altura em pixels"
                type="number"
                aria-invalid={errors.imageHeightSm ? 'true' : 'false'}
                register={register('imageHeightSm')}
                defaultValue={''}
                notes="O padrão é 200."
              />
            </div>
          </div>}
        {(watchImageMode !== 'paralax' && watchImageMode !== 'intrinsic' && watchImageMask === 'none') && (<div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
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
        </div>)}
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
