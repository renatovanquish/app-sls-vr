/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Segment, Loading, Input } from 'components/ui'
import { Check } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'
import { useCategory } from 'hooks/useCategory'
import { Plus2, Trash, Picture } from 'components/icons'

import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form'

type FormValues = {
  origin: string
  tags: string
  category: string
  showDescription: string
  thumbnail: string
  showCode: string
  showSubCategoryMobile: string
  showSubCategoryDesktop: string
  textSize: string
  linkMode: string
  data: {
    name: string
    description: string
    imageUrl: string
    qtyBlend: number
    priceAdjustment: string
  }[]
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
  const [categories, setCategories] = useState([] as any)
  const { updateBlock } = useBlock()
  const { listCategories } = useCategory()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: '',
      showDescription: 'show',
      thumbnail: '64',
      textSize: 'default',
      showCode: 'hide',
      showSubCategoryMobile: 'show-center',
      showSubCategoryDesktop: 'show-center',
      data: [],
    },
    mode: 'onBlur',
  })

  const watchOrigin = watch('origin')

  const formValues = useWatch({
    name: 'data',
    control,
  })

  const { fields, append, remove } = useFieldArray({
    name: 'data',
    control,
  })

  useEffect(() => {
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setValue('category', contentParse.category)
      setValue('tags', contentParse.tags)
      setValue(
        'showDescription',
        contentParse.showDescription ? contentParse.showDescription : 'show'
      )
      setValue(
        'thumbnail',
        contentParse.thumbnail ? contentParse.thumbnail : '64'
      )
      setValue(
        'textSize',
        contentParse.textSize ? contentParse.textSize : 'default'
      )
      setValue(
        'showCode',
        contentParse.showCode ? contentParse.showCode : 'hide'
      )
      setValue(
        'showSubCategoryMobile',
        contentParse.showSubCategoryMobile
          ? contentParse.showSubCategoryMobile
          : 'show-center'
      )
      setValue(
        'showSubCategoryDesktop',
        contentParse.showSubCategoryDesktop
          ? contentParse.showSubCategoryDesktop
          : 'show-center'
      )
      setValue('origin', contentParse.origin ? contentParse.origin : 'category')
      setValue(
        'linkMode',
        contentParse.linkMode ? contentParse.linkMode : 'default'
      )
      contentParse.data && contentParse.data.map((f: any) => append(f))
    } else {
      setValue('showDescription', 'show')
      setValue('thumbnail', '64')
      setValue('textSize', 'default')
      setValue('showCode', 'hide')
      setValue('showSubCategoryMobile', 'show-center')
      setValue('showSubCategoryDesktop', 'show-center')
      setValue('origin', 'category')
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchCategories = async () => {
        const { items } = await listCategories({ limit: 100 })
        const c = items.filter((i: any) => {
          return !i.isSub
        })
        setCategories(c)
      }
      fetchCategories()
    }
    return () => {
      setCategories([] as any)
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

  return categories && categories.length > 0 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-full w-full mx-auto">
        <Segment
          className="mt-4" title="Configurações dos Produtos e Serviços"
          description="Opções de Visualização"
        />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Origem dos produtos
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('origin')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="category">De uma categoria</option>
                    <option value="tags">Com a Tag</option>
                    <option value="discount">Com Desconto</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {watchOrigin === 'tags' && (
            <div className="w-full md:w-2/4">
              <Input
                label="Tag"
                type="text"
                register={register('tags')}
                defaultValue={''}
              />
            </div>
          )}
        </div>

        {watchOrigin === 'category' && (
          <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
            <div className="basis-full md:basis-1/2">
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Exibir produtos da categoria?
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('category')}

                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      {categories.map((category: any, idx: number) => (
                        <option key={idx} value={category.id}>
                          {category.title}
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
                    Modelo de compra
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('linkMode')}

                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value="default">Compra pelo app</option>
                      <option value="none">Não exibir botão de compra</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="basis-full md:basis-1/2">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Sub-categorias no Desktop?
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('showSubCategoryDesktop')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="hide">Não exibir</option>
                    <option value="show-right">Exibir a direita</option>
                    <option value="show-left">Exibir a esquerda</option>
                    <option value="show-center">Exibir centralizado</option>
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
                  Sub-categorias no Mobile?
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('showSubCategoryMobile')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="hide">Não exibir</option>
                    <option value="show-right">Exibir a direita</option>
                    <option value="show-left">Exibir a esquerda</option>
                    <option value="show-center">Exibir centralizado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Segment
          title="Preferências de exibição"
          description="Formatação dos Cards"
        />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="basis-full md:basis-1/2">
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
                    <option value="0">Não exibir</option>
                    <option value="32">Exibir pequeno</option>
                    <option value="64">Exibir médio</option>
                    <option value="96">Exibir grande</option>
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
                  Descrição do produto
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
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="basis-full md:basis-1/2">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Código do produto?
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('showCode')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="show">Exibir</option>
                    <option value="hide">Não exibir</option>
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
                  Tamanho do Texto
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('textSize')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="default">Padrão</option>
                    <option value="lg">Grande no mobile</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {watchOrigin === 'category' && (
          <Segment
            title="Configuração de variações do produto e compra"
            description="Diferentes características e combinações"
            notes="Exemplo: Tamanhos, cor, combinação de dois produtos da mesma categoria, etc."
          />
        )}

        {watchOrigin === 'category' &&
          fields.map((field, index) => {
            return (
              <div key={field.id} className="max-w-full w-full mx-auto">
                <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
                  <div className="basis-full lg:basis-2/12">
                    <Input
                      label="Nome da Opção"
                      type="text"
                      register={register(`data.${index}.name` as const, {
                        required: true,
                      })}
                      defaultValue={''}
                      className={errors?.data?.[index]?.name ? 'error' : ''}
                    />
                  </div>
                  <div className="basis-full lg:basis-3/12">
                    <Input
                      label="Descrição"
                      type="text"
                      register={register(`data.${index}.description` as const, {
                        required: true,
                      })}
                      defaultValue={''}
                      className={
                        errors?.data?.[index]?.description ? 'error' : ''
                      }
                    />
                  </div>
                  <div className="basis-full lg:basis-2/12">
                    <Input
                      label="URL de uma imagem"
                      type="text"
                      register={register(`data.${index}.imageUrl` as const)}
                      defaultValue={''}
                    />
                  </div>
                  <div className="basis-full lg:basis-2/12">
                    <div className="flex -mx-3">
                      <div className="w-full px-3">
                        <label
                          htmlFor=""
                          className="text-accent-7 text-sm font-semibold px-1"
                        >
                          Qtde de combinações
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10"></div>
                          <select
                            {...register(`data.${index}.qtyBlend` as const)}

                            className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                          >
                            <option value="1">Nenhuma - Produto inteiro</option>
                            <option value="2">
                              Duas - 1/2 de cada produto
                            </option>
                            <option value="3">
                              Três - 1/3 de cada produto
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="basis-full lg:basis-2/12">
                    <div className="flex -mx-3">
                      <div className="w-full px-3">
                        <label
                          htmlFor=""
                          className="text-accent-7 text-sm font-semibold px-1"
                        >
                          Calculo do Preço
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10"></div>
                          <select
                            {...register(
                              `data.${index}.priceAdjustment` as const
                            )}

                            className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                          >
                            {formValues &&
                              formValues[index] &&
                              (formValues[index].qtyBlend == 2 ||
                                formValues[index].qtyBlend == 3) && (
                                <option value="1">Média dos preços</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              (formValues[index].qtyBlend == 2 ||
                                formValues[index].qtyBlend == 3) && (
                                <option value="2">Pelo maior Preço</option>
                              )}

                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="0">0% Gratis</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="1">1%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="2">2%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="3">3%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="4">4%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="5">5%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="6">6%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="7">7%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="8">8%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="9">9%</option>
                              )}

                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="10">10%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="11">11%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="12">12%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="13">13%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="14">14%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="15">15%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="16">16%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="17">17%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="18">18%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="19">19%</option>
                              )}

                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="20">20%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="21">21%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="22">22%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="23">23%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="24">24%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="25">25%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="26">26%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="27">27%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="28">28%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="29">29%</option>
                              )}

                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="30">30%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="31">31%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="32">32%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="33">33%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="34">34%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="35">35%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="36">36%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="37">37%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="38">38%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="39">39%</option>
                              )}

                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="40">40%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="41">41%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="42">42%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="43">43%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="44">44%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="45">45%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="46">46%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="47">47%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="48">48%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="49">49%</option>
                              )}

                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="50">50%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="51">51%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="52">52%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="53">53%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="54">54%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="55">55%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="56">56%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="57">57%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="58">58%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="59">59%</option>
                              )}

                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="60">60%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="61">61%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="62">62%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="63">63%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="64">64%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="65">65%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="66">66%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="67">67%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="68">68%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="69">69%</option>
                              )}

                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="70">70%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="71">71%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="72">72%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="73">73%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="74">74%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="75">75%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="76">76%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="77">77%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="78">78%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="79">79%</option>
                              )}

                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="80">80%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="81">81%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="82">82%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="83">83%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="84">84%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="85">85%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="86">86%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="87">87%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="88">88%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="89">89%</option>
                              )}

                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="90">90%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="91">91%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="92">92%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="93">93%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="94">94%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="95">95%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="96">96%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="97">97%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="98">98%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="99">99%</option>
                              )}
                            {formValues &&
                              formValues[index] &&
                              formValues[index].qtyBlend == 1 && (
                                <option value="100">100%</option>
                              )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="basis-full lg:basis-1/12 pt-8">
                    <button type="button" onClick={() => remove(index)}>
                      <Trash />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        {watchOrigin === 'category' && (
          <div className="flex mt-2">
            <button
              type="button"
              className="bg-accent-9 text-accent-0 py-2 px-4 rounded-xl shadow"
              onClick={() =>
                append({
                  name: '',
                  description: '',
                  qtyBlend: 1,
                  priceAdjustment: '100',
                  imageUrl: '',
                })
              }
            >
              <Plus2 /> <span className="ml-2">Adicionar Opção</span>
            </button>
            <button
              type="button"
              className="ml-3 bg-accent-0 text-accent-9 py-2 px-4 rounded-xl shadow"
              onClick={() => onClickItem({ action: 'IMAGES', block, index })}
            >
              <Picture className="flex-shrink-0 h-6 w-6 text-tertiary-2" />
            </button>
          </div>
        )}
      </div>
      <div className="mt-6">
        <Button type="submit" variant="slim" loading={loading} disabled={false}>
          <Check className="-ml-2 mr-2" />
          Atualizar
        </Button>
      </div>
    </form>
  ) : (
    <Loading />
  )
}
