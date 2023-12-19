/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input, Segment } from 'components/ui'
import { Check, Picture } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type Inputs = {
  imageUrl1: string
  aspectRatio1: string
  viewShadow1: string
  viewBorder1: string
  viewBgColor1: string
  viewRounded1: string
  topic1: string
  text1: string
  buttonName1: string
  buttonLink1: string
  imageUrl2: string
  aspectRatio2: string
  viewShadow2: string
  viewBorder2: string
  viewBgColor2: string
  viewRounded2: string
  topic2: string
  text2: string
  buttonName2: string
  buttonLink2: string
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
      setValue('imageUrl1', contentParse.imageUrl1)
      setValue('topic1', contentParse.topic1)
      setValue('text1', contentParse.text1)
      setValue('buttonName1', contentParse.buttonName1)
      setValue('buttonLink1', contentParse.buttonLink1)
      setValue('imageUrl2', contentParse.imageUrl2)
      setValue('topic2', contentParse.topic2)
      setValue('text2', contentParse.text2)
      setValue('buttonName2', contentParse.buttonName2)
      setValue('buttonLink2', contentParse.buttonLink2)

      setValue('aspectRatio1', contentParse.aspectRatio1 ? contentParse.aspectRatio1 : '1:1')
      setValue('viewShadow1', contentParse.viewShadow1 ? contentParse.viewShadow1 : '-none')
      setValue('viewBorder1', contentParse.viewBorder1 ? contentParse.viewBorder1 : '0')
      setValue('viewBgColor1', contentParse.viewBgColor1 ? contentParse.viewBgColor1 : 'none')
      setValue('viewRounded1', contentParse.viewRounded1 ? contentParse.viewRounded1 : '-none')

      setValue('aspectRatio2', contentParse.aspectRatio2 ? contentParse.aspectRatio2 : '1:1')
      setValue('viewShadow2', contentParse.viewShadow2 ? contentParse.viewShadow2 : '-none')
      setValue('viewBorder2', contentParse.viewBorder2 ? contentParse.viewBorder2 : '0')
      setValue('viewBgColor2', contentParse.viewBgColor2 ? contentParse.viewBgColor2 : 'none')
      setValue('viewRounded2', contentParse.viewRounded2 ? contentParse.viewRounded2 : '-none')
    } else {
      setValue('aspectRatio1', '1:1')
      setValue('viewShadow1', '-none')
      setValue('viewBorder1', '0')
      setValue('viewBgColor1', 'none')
      setValue('viewRounded1', '-none')

      setValue('aspectRatio2', '1:1')
      setValue('viewShadow2', '-none')
      setValue('viewBorder2', '0')
      setValue('viewBgColor2', 'none')
      setValue('viewRounded2', '-none')
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

        <Segment className="mt-4" title='TÓPICO 1 - Imagem' description='Configuração da imagem.' />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-3/4">
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
                  label="URL de uma imagem"
                  type="text"
                  register={register('imageUrl1')}
                  defaultValue={''}
                  notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                />
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
                  Proporção
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('aspectRatio1')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="16:9">16:9 - Horizontal</option>
                    <option value="8:5">8:5 - Horizontal</option>
                    <option value="4:3">4:3 - Horizontal</option>
                    <option value="5:4">5:4 - Horizontal</option>
                    <option value="320:320">1:1 - Quadrado</option>
                    <option value="9:16">9:16 - Vertical</option>
                    <option value="5:8">5:8 - Vertical</option>
                    <option value="3:4">3:4 - Vertical</option>
                    <option value="4:5">4:5 - Vertical</option>
                  </select>
                </div>
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
                    {...register('viewShadow1')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="-none">Nenhuma</option>
                    <option value="-sm">Mínima</option>
                    <option value="">Pequena</option>
                    <option value="-md">Média</option>
                    <option value="-lg">Grande</option>
                    <option value="-xl">Extra grande</option>
                    <option value="-2xl">Máxima</option>
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
                    {...register('viewBorder1')}
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
                    {...register('viewBgColor1')}
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
                    {...register('viewRounded1')}
                    placeholder=""
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

        <Segment title='TÓPICO 1 - Conteúdo' description='Entre com as informações.' />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Nome do tópico"
              type="text"
              register={register('topic1')}
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
            <div className="w-full">
              <label className="text-accent-7 text-sm font-semibold px-1">
                Descrição
              </label>
              <div className="flex">
                <div className="w-10 z-10"></div>
                <Controller
                  name="text1"
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
          <div className="w-full md:w-1/4">
            <Input
              label="Nome do botão"
              type="text"
              register={register('buttonName1')}
              defaultValue={''}
              notes="Exemplo: Saiba mais."
            />
          </div>
          <div className="w-full md:w-3/4">
            <Input
              label="Link para redirecionamento"
              type="text"
              register={register('buttonLink1')}
              defaultValue={''}
              notes="Links externos informe a url completa, por exemplo:
              https://www... Para links internos informe apenas o Apelido da página."
            />
          </div>
        </div>

        <Segment title='TÓPICO 2 - Imagem' description='Configuração da imagem.' />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-3/4">
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
                  label="URL de uma imagem"
                  type="text"
                  register={register('imageUrl2')}
                  defaultValue={''}
                  notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                />
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
                  Proporção
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('aspectRatio2')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="16:9">16:9 - Horizontal</option>
                    <option value="8:5">8:5 - Horizontal</option>
                    <option value="4:3">4:3 - Horizontal</option>
                    <option value="5:4">5:4 - Horizontal</option>
                    <option value="1:1">1:1 - Quadrado</option>
                    <option value="9:16">9:16 - Vertical</option>
                    <option value="5:8">5:8 - Vertical</option>
                    <option value="3:4">3:4 - Vertical</option>
                    <option value="4:5">4:5 - Vertical</option>
                  </select>
                </div>
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
                    {...register('viewShadow2')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="-none">Nenhuma</option>
                    <option value="-sm">Mínima</option>
                    <option value="">Pequena</option>
                    <option value="-md">Média</option>
                    <option value="-lg">Grande</option>
                    <option value="-xl">Extra grande</option>
                    <option value="-2xl">Máxima</option>
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
                    {...register('viewBorder2')}
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
                    {...register('viewBgColor2')}
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
                    {...register('viewRounded2')}
                    placeholder=""
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

        <Segment title='TÓPICO 2 - Conteúdo' description='Entre com as informações.' />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Nome do tópico"
              type="text"
              register={register('topic2')}
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
            <div className="w-full">
              <label className="text-accent-7 text-sm font-semibold px-1">
                Descrição
              </label>
              <div className="flex">
                <div className="w-10 z-10"></div>
                <Controller
                  name="text2"
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
          <div className="w-full md:w-1/4">
            <Input
              label="Nome do botão"
              type="text"
              register={register('buttonName2')}
              defaultValue={''}
              notes="Exemplo: Saiba mais."
            />
          </div>
          <div className="w-full md:w-3/4">
            <Input
              label="Link para redirecionamento"
              type="text"
              register={register('buttonLink2')}
              defaultValue={''}
              notes="Links externos informe a url completa, por exemplo:
              https://www... Para links internos informe apenas o Apelido da página."
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
