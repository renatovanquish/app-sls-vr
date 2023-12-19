/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input, Segment } from 'components/ui'
import { Check } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'
import { useFolder } from 'hooks/useFolder'
import { useCategory } from 'hooks/useCategory'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  title: string
  source: string
  folder: string
  category: string
  viewMode: string
  qtyCards: number
  buttonName1: string
  buttonLink1: string
  objectFit: string
  viewFormat: string
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

  const watchSource = watch('source')

  useEffect(() => {
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setValue('title', contentParse.title)
      setValue('source', contentParse.source)
      setValue('folder', contentParse.folder)
      setValue('category', contentParse.category)
      setValue('qtyCards', contentParse.qtyCards ? contentParse.qtyCards : 20)
      setValue(
        'viewMode',
        contentParse.viewMode ? contentParse.viewMode : 'card1'
      )
      setValue('buttonName1', contentParse.buttonName1)
      setValue('buttonLink1', contentParse.buttonLink1)
      setValue(
        'objectFit',
        contentParse.objectFit ? contentParse.objectFit : 'cover'
      )
      setValue(
        'viewFormat',
        contentParse.viewFormat ? contentParse.viewFormat : 'cards'
      )
    } else {
      setValue('viewMode', 'card1')
      setValue('qtyCards', 20)
      setValue('objectFit', 'cover')
      setValue('viewFormat', 'cards')
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

  const [categories, setCategories] = useState([] as any)
  const { listCategories } = useCategory()

  useEffect(()=>{
    let isMounted = true
    const fetchData = async () => {
      const { items } = await listCategories({ limit: 1000 })
      const c = items.filter((i:any)=>{
        return !i.isSub
      })
      setCategories(c)
    }
    if (isMounted) {
      fetchData()
    }
    return () => {
      setCategories([] as any)
    }
  },[])
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    if (data.source !== 'images_folder') { data.folder = '' }
    if (data.source !== 'category_products') { data.category = '' }
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
        <Segment className="mt-4" title='Scroll Cards horizontal' description='Entre com as informações.' />

        <div className="w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <Input
            label="Título dos cards"
            type="text"
            register={register('title')}
            defaultValue={''}
          />
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Origem dos cards
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('source')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="images_folder">Uma pasta da galeria de mídias</option>
                    <option value="menus">Menus das páginas</option>
                    {process.env.APP_COMMERCE && <option value="categories">Categorias do e-commerce</option>}
                    {process.env.APP_COMMERCE && <option value="category_products">Produtos de uma categoria</option>}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {watchSource === 'images_folder' && (
            <div className="w-full md:w-2/4">
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Pasta da galeria
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
          )}
          {watchSource === 'category_products' && (
            <div className="w-full md:w-2/4">
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Produtos da categoria
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('category')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      {categories.map((i: any, k: number) => (
                        <option key={k} value={i.id}>
                          {i.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-1/4">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Formato da visualização
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('viewFormat')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="cards">Wide</option>
                    <option value="cards-v">Wide - Vertical</option>
                    <option value="circle-sm">Circulo - Pequeno</option>
                    <option value="circle-md">Circulo - Médio</option>
                    <option value="circle-lg">Circulo - Grande</option>
                    <option value="square-sm">Quadrado - Pequeno</option>
                    <option value="square-md">Quadrado - Médio</option>
                    <option value="square-lg">Quadrado - Grande</option>
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
                  Exibição dos items
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('viewMode')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="card1">Apenas imagem</option>
                    <option value="card2">Imagem e nome</option>
                    {(watchSource === 'category_products' || watchSource === 'categories' || watchSource === 'menus') && (
                      <option value="card3">Imagem, nome e descrição</option>
                    )}
                    {watchSource === 'images_folder' && (
                      <option value="card4">Imagem e título</option>
                    )}
                    {watchSource === 'images_folder' && (
                      <option value="card5">Imagem, título e descrição</option>
                    )}
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
                  Quantidade de items
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('qtyCards')}
                    placeholder=""
                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
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
                  Ajuste da Imagem
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('objectFit')}
                    placeholder=""
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
        </div>

        <Segment title='BOTÃO (Opicional)' description='Configure um botão de redirecionamento.' />

        <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-1/4">
            <Input
              label="Nome do botão"
              type="text"
              aria-invalid={errors.buttonName1 ? 'true' : 'false'}
              register={register('buttonName1')}
              defaultValue={''}
              notes="Exemplo: Veja mais."
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
