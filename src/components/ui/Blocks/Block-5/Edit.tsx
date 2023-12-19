/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input, Segment } from 'components/ui'
import { Check } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type Inputs = {
  title: string
  description: string
  buttonName1: string
  buttonLink1: string
  titleTags: string
  tag1: string
  tag2: string
  tag3: string
  tag4: string
  tag5: string
  tag6: string
  tag7: string
  tag8: string
  tag9: string
  tag10: string
  tag11: string
  tag12: string
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
      setValue('title', contentParse.title)
      setValue('description', contentParse.description)
      setValue('buttonName1', contentParse.buttonName1)
      setValue('buttonLink1', contentParse.buttonLink1)
      setValue('titleTags', contentParse.titleTags)
      setValue('tag1', contentParse.tag1)
      setValue('tag2', contentParse.tag2)
      setValue('tag3', contentParse.tag3)
      setValue('tag4', contentParse.tag4)
      setValue('tag5', contentParse.tag5)
      setValue('tag6', contentParse.tag6)
      setValue('tag7', contentParse.tag7)
      setValue('tag8', contentParse.tag8)
      setValue('tag9', contentParse.tag9)
      setValue('tag10', contentParse.tag10)
      setValue('tag11', contentParse.tag11)
      setValue('tag12', contentParse.tag12)
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

        <Segment className="mt-4" title='Cabeçalho' description='Entre com as informações.' />

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

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
            <div className="w-full">
              <label className="text-accent-7 text-sm font-semibold px-1">
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

        <Segment title='LINK (Opicional)' description='Configure um link para redirecionamento.' />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-1/4">
            <Input
              label="Nome do Link"
              type="text"
              register={register('buttonName1')}
              defaultValue={''}
              notes="Exemplo: Saiba mais."
            />
          </div>
          <div className="w-full md:w-3/4">
            <Input
              label="Link"
              type="text"
              register={register('buttonLink1')}
              defaultValue={''}
              notes="Links externos informe a url completa, por exemplo:
              https://www... Para links internos informe apenas o Apelido da página."
            />
          </div>
        </div>

        <Segment title='TAGS RELACIONADAS' description='Informe pelo menos 3 tags. (palavras-chaves)' />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-4/4">
            <Input
              label="Título das Tags"
              type="text"
              aria-invalid={errors.titleTags ? 'true' : 'false'}
              register={register('titleTags')}
              defaultValue={''}
              notes="Exemplo: Categorias"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 1"
              type="text"
              aria-invalid={errors.tag1 ? 'true' : 'false'}
              register={register('tag1')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 2"
              type="text"
              aria-invalid={errors.tag2 ? 'true' : 'false'}
              register={register('tag2')}
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 3"
              type="text"
              aria-invalid={errors.tag3 ? 'true' : 'false'}
              register={register('tag3')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 4"
              type="text"
              aria-invalid={errors.tag4 ? 'true' : 'false'}
              register={register('tag4')}
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 5"
              type="text"
              aria-invalid={errors.tag5 ? 'true' : 'false'}
              register={register('tag5')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 6"
              type="text"
              aria-invalid={errors.tag6 ? 'true' : 'false'}
              register={register('tag6')}
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 7"
              type="text"
              aria-invalid={errors.tag7 ? 'true' : 'false'}
              register={register('tag7')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 8"
              type="text"
              aria-invalid={errors.tag8 ? 'true' : 'false'}
              register={register('tag8')}
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 9"
              type="text"
              aria-invalid={errors.tag9 ? 'true' : 'false'}
              register={register('tag9')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 10"
              type="text"
              aria-invalid={errors.tag10 ? 'true' : 'false'}
              register={register('tag10')}
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 11"
              type="text"
              aria-invalid={errors.tag11 ? 'true' : 'false'}
              register={register('tag11')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tag 12"
              type="text"
              aria-invalid={errors.tag12 ? 'true' : 'false'}
              register={register('tag12')}
              defaultValue={''}
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
