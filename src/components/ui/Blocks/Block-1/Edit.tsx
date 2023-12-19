/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input, Editor, Segment } from 'components/ui'
import { Check, Picture } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type Inputs = {
  imageUrl: string
  title: string
  description: string
  buttonName1: string
  buttonLink1: string
  buttonName2: string
  buttonLink2: string
  aspectRatio: string
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
  const [description, setDescription] = useState('')
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
      setValue('imageUrl', contentParse.imageUrl)
      setValue('title', contentParse.title)
      setValue('description', contentParse.description)
      setValue('buttonName1', contentParse.buttonName1)
      setValue('buttonLink1', contentParse.buttonLink1)
      setValue('buttonName2', contentParse.buttonName2)
      setValue('buttonLink2', contentParse.buttonLink2)
      setDescription(contentParse.description)
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
    } else {
      setValue('aspectRatio', '1:1')
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
        
        <Segment className="mt-4" title='Imagem' description='Configurações da imagem.' />
        
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
                  register={register('imageUrl')}
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
                    {...register('aspectRatio')}
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

        <Segment title='Título e descrição' description='Entre com as informações.' />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-4/4">
            <Input
              label="Título do bloco"
              type="text"
              register={register('title')}
              defaultValue={''}
            />
          </div>
        </div>

        <div className="w-full space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <Editor
            fieldName="description"
            value={description}
            setValue={setValue}
          />
        </div>

        <Segment title='BOTÕES (Opicionais)' description='Configure até dois botões para redirecionamentos.' />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-1/4">
            <Input
              label="Nome do botão (1)"
              type="text"
              aria-invalid={errors.buttonName1 ? 'true' : 'false'}
              register={register('buttonName1')}
              defaultValue={''}
              notes="Exemplo: Saiba mais."
            />
          </div>
          <div className="w-full md:w-3/4">
            <Input
              label="Link para redirecionamento"
              type="text"
              aria-invalid={errors.buttonLink1 ? 'true' : 'false'}
              register={register('buttonLink1')}
              defaultValue={''}
              notes="Links externos informe a url completa, por exemplo:
              https://www... Para links internos informe apenas o Apelido da página."
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-1/4">
            <Input
              label="Nome do botão (2)"
              type="text"
              aria-invalid={errors.buttonName2 ? 'true' : 'false'}
              register={register('buttonName2')}
              defaultValue={''}
              notes="Exemplo: Saiba mais."
            />
          </div>
          <div className="w-full md:w-3/4">
            <Input
              label="Link para redirecionamento"
              type="text"
              aria-invalid={errors.buttonLink2 ? 'true' : 'false'}
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
