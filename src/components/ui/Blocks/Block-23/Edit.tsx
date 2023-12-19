/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input, Segment } from 'components/ui'
import { Check, Trash, Plus2 } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'
import NumberFormat from 'react-number-format'

import { useForm, useFieldArray, Controller } from 'react-hook-form'

type FormValues = {
  title: string
  description: string
  frequency: string
  mostPopular: string
  buttonLabel: string
  data: {
    name: string
    price: number
    price2: number
    item1: string
    item2: string
    item3: string
    item4: string
    item5: string
    item6: string
    item7: string
    item8: string
    item9: string
    item10: string
    link: string
    notes: string
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
  const [content, setContent] = useState('')
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
      title: 'Planos e Preços',
      description: 'Selecione o plano que melhor lhe atende.',
      frequency: 'monthly_annually',
      mostPopular: '',
      buttonLabel: 'Contratar',
      data: [],
    },
    mode: 'onBlur',
  })

  const watchFrequency = watch('frequency')

  const { fields, append, remove } = useFieldArray({
    name: 'data',
    control,
  })

  useEffect(() => {
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setValue('title', contentParse.title)
      setValue('description', contentParse.description)
      setValue('frequency', contentParse.frequency)
      setValue('mostPopular', contentParse.mostPopular)
      setValue('buttonLabel', contentParse.buttonLabel)
      contentParse.data && contentParse.data.map((f: any) => append(f))
    } else {
      setValue('frequency', 'monthly_annually')
      setValue('buttonLabel', 'Contratar')
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
        <Segment className="mt-4" title="Cabeçalho" description="Entre com as informações." />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-4/4">
            <Input
              label="Título"
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

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:basis-1/3">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Opções de periodicidade
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('frequency')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="monthly">Somente Mensal</option>
                    <option value="monthly_annually">Mensal e Anual</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:basis-1/3">
            <Input
              label="Plano mais popular"
              type="text"
              register={register('mostPopular')}
              defaultValue={''}
            />
          </div>
          <div className="w-full md:basis-1/3">
            <Input
              label="Label dos botões"
              type="text"
              register={register('buttonLabel')}
              defaultValue={''}
            />
          </div>
        </div>

        {fields.map((field, index) => {
          return (
            <div key={field.id} className="max-w-full w-full mx-auto">
              <Segment
                title={`Plano ${index + 1}`}
                description={`Entre com as informações do plano ${index + 1}.`}
              />
              <div className="-mt-2">
                <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                  <div className="w-full md:basis-1/3">
                    <Input
                      label="Nome do plano"
                      type="text"
                      register={register(`data.${index}.name` as const, {
                        required: true,
                      })}
                      defaultValue={''}
                      className={errors?.data?.[index]?.name ? 'error' : ''}
                    />
                  </div>
                  <div className="w-full md:basis-1/3">
                    <label className="text-accent-7 text-sm font-semibold px-1">
                      Preço Mensal
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <Controller
                        name={`data.${index}.price`}
                        control={control}
                        render={({
                          field: { onChange, onBlur, name, value, ref },
                        }) => (
                          <NumberFormat
                            className="-ml-10 text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                            thousandsGroupStyle="thousand"
                            prefix="R$ "
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            displayType="input"
                            type="text"
                            allowNegative={false}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            onValueChange={(values) =>
                              onChange(values.floatValue)
                            }
                            name={name}
                            value={value}
                            onBlur={onBlur}
                            ref={ref}
                          />
                        )}
                      />
                    </div>
                  </div>
                  {watchFrequency === 'monthly_annually' && (
                    <div className="w-full md:basis-1/3">
                      <label className="text-accent-7 text-sm font-semibold px-1">
                        Preço Anual
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10"></div>
                        <Controller
                          name={`data.${index}.price2`}
                          control={control}
                          render={({
                            field: { onChange, onBlur, name, value, ref },
                          }) => (
                            <NumberFormat
                              className="-ml-10 text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                              thousandsGroupStyle="thousand"
                              prefix="R$ "
                              thousandSeparator={'.'}
                              decimalSeparator={','}
                              displayType="input"
                              type="text"
                              allowNegative={false}
                              decimalScale={2}
                              fixedDecimalScale={true}
                              onValueChange={(values) =>
                                onChange(values.floatValue)
                              }
                              name={name}
                              value={value}
                              onBlur={onBlur}
                              ref={ref}
                            />
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:space-x-2 my-1">
                  <div className="w-full">
                    <Input
                      placeholder="Item 1"
                      type="text"
                      register={register(`data.${index}.item1` as const)}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:space-x-2 my-1">
                  <div className="w-full">
                    <Input
                      placeholder="Item 2"
                      type="text"
                      register={register(`data.${index}.item2` as const)}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:space-x-2 my-1">
                  <div className="w-full">
                    <Input
                      placeholder="Item 3"
                      type="text"
                      register={register(`data.${index}.item3` as const)}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:space-x-2 my-1">
                  <div className="w-full">
                    <Input
                      placeholder="Item 4"
                      type="text"
                      register={register(`data.${index}.item4` as const)}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:space-x-2 my-1">
                  <div className="w-full">
                    <Input
                      placeholder="Item 5"
                      type="text"
                      register={register(`data.${index}.item5` as const)}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:space-x-2 my-1">
                  <div className="w-full">
                    <Input
                      placeholder="Item 6"
                      type="text"
                      register={register(`data.${index}.item6` as const)}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:space-x-2 my-1">
                  <div className="w-full">
                    <Input
                      placeholder="Item 7"
                      type="text"
                      register={register(`data.${index}.item7` as const)}
                      defaultValue={''}
                    />
                  </div>
                </div>{' '}
                <div className="flex flex-col sm:flex-row w-full sm:space-x-2 my-1">
                  <div className="w-full">
                    <Input
                      placeholder="Item 8"
                      type="text"
                      register={register(`data.${index}.item8` as const)}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:space-x-2 my-1">
                  <div className="w-full">
                    <Input
                      placeholder="Item 9"
                      type="text"
                      register={register(`data.${index}.item9` as const)}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:space-x-2 my-1">
                  <div className="w-full">
                    <Input
                      placeholder="Item 10"
                      type="text"
                      register={register(`data.${index}.item10` as const)}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                  <div className="w-full">
                    <Input
                      label="Link"
                      type="text"
                      register={register(`data.${index}.link` as const, { required: true })}
                      defaultValue={''}
                      className={errors?.data?.[index]?.link ? 'error' : ''}
                    />
                  </div>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                  <div className="w-full">
                    <Input
                      label="Observações"
                      type="text"
                      register={register(`data.${index}.notes` as const)}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                  <div className="w-full text-red-500">
                    <button type="button" onClick={() => remove(index)}>
                      <Trash />
                    </button>
                  </div>
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
              price: 0,
              price2: 0,
              item1: '',
              item2: '',
              item3: '',
              item4: '',
              item5: '',
              item6: '',
              item7: '',
              item8: '',
              item9: '',
              item10: '',
              link: '',
              notes: '',
            })
          }
        >
          <Plus2 /> <span className="ml-2">Adicionar Plano</span>
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
