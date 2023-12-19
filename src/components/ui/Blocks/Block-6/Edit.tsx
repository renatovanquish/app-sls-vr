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
  topic1: string
  topic2: string
  topic3: string
  topic4: string
  topic5: string
  topic6: string
  topic7: string
  topic8: string
  topic9: string
  topic10: string
  topic11: string
  topic12: string
  topic13: string
  topic14: string
  topic15: string
  topic16: string
  topic17: string
  topic18: string
  topic19: string
  topic20: string
  buttonName1: string
  buttonLink1: string
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
      setValue('topic1', contentParse.topic1)
      setValue('topic2', contentParse.topic2)
      setValue('topic3', contentParse.topic3)
      setValue('topic4', contentParse.topic4)
      setValue('topic5', contentParse.topic5)
      setValue('topic6', contentParse.topic6)
      setValue('topic7', contentParse.topic7)
      setValue('topic8', contentParse.topic8)
      setValue('topic9', contentParse.topic9)
      setValue('topic10', contentParse.topic10)
      setValue('topic11', contentParse.topic11)
      setValue('topic12', contentParse.topic12)
      setValue('topic13', contentParse.topic13)
      setValue('topic14', contentParse.topic14)
      setValue('topic15', contentParse.topic15)
      setValue('topic16', contentParse.topic16)
      setValue('topic17', contentParse.topic17)
      setValue('topic18', contentParse.topic18)
      setValue('topic19', contentParse.topic19)
      setValue('topic20', contentParse.topic20)
      setValue('buttonName1', contentParse.buttonName1)
      setValue('buttonLink1', contentParse.buttonLink1)
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
                      rows={5}
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

        <Segment title='TÓPICOS RELACIONADOS' description='Informe pelo menos 3 tópicos.' />
        
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 1"
              type="text"
              register={register('topic1')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 2"
              type="text"
              register={register('topic2')}
              defaultValue={''}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 3"
              type="text"
              register={register('topic3')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 4"
              type="text"
              register={register('topic4')}
              defaultValue={''}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 5"
              type="text"
              register={register('topic5')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 6"
              type="text"
              register={register('topic6')}
              defaultValue={''}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 7"
              type="text"
              register={register('topic7')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 8"
              type="text"
              register={register('topic8')}
              defaultValue={''}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 9"
              type="text"
              register={register('topic9')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 10"
              type="text"
              register={register('topic10')}
              defaultValue={''}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 11"
              type="text"
              register={register('topic11')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 12"
              type="text"
              register={register('topic12')}
              defaultValue={''}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 13"
              type="text"
              register={register('topic13')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 14"
              type="text"
              register={register('topic14')}
              defaultValue={''}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 15"
              type="text"
              register={register('topic15')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 16"
              type="text"
              register={register('topic16')}
              defaultValue={''}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 17"
              type="text"
              register={register('topic17')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 18"
              type="text"
              register={register('topic18')}
              defaultValue={''}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 19"
              type="text"
              register={register('topic19')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:w-2/4">
            <Input
              label="Tópico 20"
              type="text"
              register={register('topic20')}
              defaultValue={''}
            />
          </div>
        </div>

        <Segment title='BOTÃO (Opicional)' description='Configure um botão para redirecionamento.' />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-1/4">
            <Input
              label="Nome do botão"
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
