import { useState, useEffect } from 'react'
import { Button, Input, Modal, Segment, Loading } from 'components/ui'
import { Check, Cross2, Undo, Picture, Trash, Refresh } from 'components/icons'
import { useUI } from 'components/ui/context'
import { toast } from 'react-toast'
import { useScreen } from 'hooks/useScreen'
import { useRouter } from 'next/router'
import { MidiasLib } from 'components/admin'
import { useProduct } from 'hooks/useProduct'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import NumberFormat from 'react-number-format'
import convertToSlug from 'lib/convertToSlug'

import {
  PageStatus,
  PageChangeFreq,
  PagePriority,
  PageOptionTitle,
  PageSideColumn,
  PageOptionSideColumn,
} from 'models'

import { WithContext as ReactTags } from 'react-tag-input'
const KeyCodes = { comma: 188, enter: [10, 13] }
const delimiters = [...KeyCodes.enter, KeyCodes.comma]

import { v4 as uuidv4 } from 'uuid'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Editor } from 'components/ui'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })
import { useImageResize } from 'hooks/useImageResize'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import { useCategory } from 'hooks/useCategory'
import { useRelation } from 'hooks/useRelation'

type Inputs = {
  alias: string
  status: string // PageStatus
  category: string
  subCategory: string
  type: string
  relationID: string
  preparationTime: number
  code: string
  name: string
  description: string
  contentTitle: string
  contentTitle2: string
  contentTitle3: string
  content: string
  content2: string
  content3: string
  changeFreq: string // PageChangeFreq
  priority: string // PagePriority
  price_of: number
  price: number
  qty: number
  stockControl: boolean
  photo1: string
  photo2: string
  photo3: string
  photo4: string
  photo5: string
  thumbnailSrc: string
  titlePadX: string
  titlePadY: string
  contentPadX: string
  contentPadY: string
  optionTitle: string
  sideColumn: string
  sideColumnPadX: string
  sideColumnPadY: string
  sideColumnContent: string
  optionSideColumn: string
  footerSm: string
  footerLg: string
  hideInMenu: boolean
  hideInSearch: boolean
}

interface Props {
  userID: string
  product: any
  setCurrentItem?: any
  handleUpdate?: any
  index?: number
}

export default function FormProduct(props: Props) {
  const { userID, product, handleUpdate, index, setCurrentItem } = props
  const [loading, setLoading] = useState(false)
  const [tabSel, setTabSel] = useState(0)
  const [productID, setProductID] = useState('')
  const [modalSel, setModalSel] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [categoriesLoaded, setCategoriesLoaded] = useState(false)
  const [categories, setCategories] = useState([] as any)
  const [subCategories, setSubCategories] = useState([] as any)
  const [relations, setRelations] = useState([] as any)

  const router = useRouter()
  const { openModal, displayModal, closeModal, setProgress } = useUI()
  const { screenWidth, screenHeight } = useScreen()
  const { createProduct, updateProduct } = useProduct()
  const { listCategories } = useCategory()
  const { listRelationsByTypeUpdatedAt } = useRelation()

  const [cropper, setCropper] = useState<any>()
  const [isReady, setIsReady] = useState(false)
  const [thumbnail, setThumbnail] = useState('')
  const [thumbnailCropper, setThumbnailCropper] = useState({} as any)

  const [contentSel, setContentSel] = useState('1')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const watchName = watch('name')
  const watchCategory = watch('category')
  const watchSideColumn = watch('sideColumn')
  const watchOptionTitle = watch('optionTitle')
  const watchThumbnailSrc = watch('thumbnailSrc')
  const watchType = watch('type')

  const { resize } = useImageResize()

  const [tags, setTags] = useState([] as any)

  const handleTagsDelete = (i: number) => {
    setTags(tags.filter((tag: any, index: number) => index !== i))
  }

  const handleTagsAddition = (tag: any) => {
    setTags([...tags, tag])
  }

  const handleTagsDrag = (tag: any, currPos: any, newPos: any) => {
    const newTags = tags.slice()
    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)
    setTags(newTags)
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchData = async () => {
        const { items } = await listCategories({ limit: 1000 })
        const c: any[] = []
        const s: any[] = []
        items.map((i: any) => {
          if (i.isSub) {
            s.push(i)
          } else {
            c.push(i)
          }
        })
        setCategories(c)
        setSubCategories(s)
        setCategoriesLoaded(true)
      }
      fetchData()
    }
    return () => {
      setCategories([] as any)
      setSubCategories([] as any)
      setCategoriesLoaded(false)
    }
  }, [])

  useEffect(() => {
    if (isReady && cropper && thumbnailCropper) {
      cropper
        .setCropBoxData(thumbnailCropper.cropBoxData)
        .setCanvasData(thumbnailCropper.canvasData)
        .setData(thumbnailCropper.data)
    }
  }, [isReady, cropper])

  useEffect(() => {
    if (product) {
      closeModal()
      setIsNew(false)
      setProductID(product.id)
      setValue('alias', product.alias)
      setValue('status', product.status)
      setValue('category', product.category)
      setValue('subCategory', product.subCategory)
      setValue(
        'type',
        product.type
          ? product.type
          : process.env.PRODUCT_TYPE_DEFAULT
          ? process.env.PRODUCT_TYPE_DEFAULT
          : 'DELIVERY'
      )
      setValue('relationID', product.relationID)
      setValue(
        'preparationTime',
        product.preparationTime ? product.preparationTime : 0
      )
      setValue('code', product.code)
      setValue('name', product.name)
      setValue('description', product.description)
      setValue('contentTitle', product.contentTitle ? product.contentTitle : '')
      setValue(
        'contentTitle2',
        product.contentTitle2 ? product.contentTitle2 : ''
      )
      setValue(
        'contentTitle3',
        product.contentTitle3 ? product.contentTitle3 : ''
      )
      setValue('content', product.content ? product.content : '')
      setValue('content2', product.content2 ? product.content2 : '')
      setValue('content3', product.content3 ? product.content3 : '')
      setValue('changeFreq', product.changeFreq)
      setValue('priority', product.priority)
      setValue('price_of', product.price_of)
      setValue('price', product.price)
      setValue('qty', product.qty)
      setValue(
        'stockControl',
        product.stockControl ? product.stockControl : false
      )
      setValue('photo1', product.photo1)
      setValue('photo2', product.photo2)
      setValue('photo3', product.photo3)
      setValue('photo4', product.photo4)
      setValue('photo5', product.photo5)
      setValue('thumbnailSrc', product.thumbnailSrc)
      setValue('footerSm', product.footerSm ? product.footerSm : 'hide')
      setValue('footerLg', product.footerLg ? product.footerLg : 'hide')
      setValue('hideInMenu', product.hideInMenu ? product.hideInMenu : false)
      setValue(
        'hideInSearch',
        product.hideInSearch ? product.hideInSearch : false
      )
      setValue(
        'optionTitle',
        product.optionTitle ? product.optionTitle : PageOptionTitle.L
      )
      setValue('titlePadX', product.titlePadX ? product.titlePadX : 'small')
      setValue('titlePadY', product.titlePadY ? product.titlePadY : 'small')
      setValue(
        'sideColumn',
        product.sideColumn ? product.sideColumn : PageSideColumn.N
      )
      setValue(
        'sideColumnPadX',
        product.sideColumnPadX ? product.sideColumnPadX : 'small'
      )
      setValue(
        'sideColumnPadY',
        product.sideColumnPadY ? product.sideColumnPadY : 'small'
      )
      setValue(
        'sideColumnContent',
        product.sideColumnContent ? product.sideColumnContent : ''
      )
      setValue(
        'optionSideColumn',
        product.optionSideColumn
          ? product.optionSideColumn
          : PageOptionSideColumn.MENU_CONTENT
      )

      const tagsTMP: any[] = []
      if (product.tags) {
        product.tags.map((tag: string) => {
          tagsTMP.push({ id: tag, text: tag })
        })
      }
      setTags(tagsTMP)

      setThumbnail(product.thumbnail ? product.thumbnail : '')
      setThumbnailCropper(
        product.thumbnailCropper
          ? JSON.parse(product.thumbnailCropper)
          : ({} as any)
      )
    } else {
      setIsNew(true)
      setProductID(uuidv4())
      setValue('status', PageStatus.ON)
      setValue('category', '')
      setValue('subCategory', '')
      setValue(
        'type',
        process.env.PRODUCT_TYPE_DEFAULT
          ? process.env.PRODUCT_TYPE_DEFAULT
          : 'DELIVERY'
      )
      setValue('relationID', '')
      setValue('preparationTime', 0)
      setValue('contentTitle', '')
      setValue('contentTitle2', '')
      setValue('contentTitle3', '')
      setValue('content', '')
      setValue('content2', '')
      setValue('content3', '')
      setValue('changeFreq', PageChangeFreq.NEVER)
      setValue('priority', PagePriority.P5)
      setValue('price_of', 0)
      setValue('price', 0)
      setValue('qty', 0)
      setValue('stockControl', false)
      setValue('thumbnailSrc', '')
      setValue('optionTitle', PageOptionTitle.L)
      setValue('sideColumn', PageSideColumn.N)
      setValue('sideColumnContent', '')
      setValue('optionSideColumn', PageOptionSideColumn.MENU_CONTENT)
      setValue('contentPadX', 'small')
      setValue('contentPadY', 'small')
      setValue('sideColumnPadX', 'small')
      setValue('sideColumnPadY', 'small')
      setValue('titlePadX', 'small')
      setValue('titlePadY', 'small')
      setValue('footerSm', 'hide')
      setValue('footerLg', 'hide')
      setValue('hideInMenu', false)
      setValue('hideInSearch', false)
      setThumbnail('')
      setThumbnailCropper({} as any)
    }
  }, [product, setValue, relations])

  useEffect(() => {
    const fetchRelations = async () => {
      ;(process.env.RELATIONS as any).map(async (rl: any) => {
        if (rl.restricted) {
          const { items } = await listRelationsByTypeUpdatedAt({
            type: rl.type,
            limit: 1000,
          })
          const rls = [] as any
          items.map((rl2: any) => {
            rls.push({ id: rl2.id, name: rl2.name })
          })
          setRelations((relations: any) => [...relations, ...rls])
        }
      })
    }
    fetchRelations()
  }, [])

  /**
   * HANDLE SUBMIT
   * ******************************************************
   */
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {
      alias,
      status,
      category,
      subCategory,
      type,
      relationID,
      code,
      name,
      description,
      contentTitle,
      contentTitle2,
      contentTitle3,
      content,
      content2,
      content3,
      changeFreq,
      priority,
      price_of,
      price,
      qty,
      stockControl,
      photo1,
      photo2,
      photo3,
      photo4,
      photo5,
      thumbnailSrc,
      titlePadX,
      titlePadY,
      contentPadX,
      contentPadY,
      optionTitle,
      sideColumn,
      sideColumnPadX,
      sideColumnPadY,
      sideColumnContent,
      optionSideColumn,
      footerSm,
      footerLg,
      hideInMenu,
      hideInSearch,
    } = data

    if (!name) {
      toast.error(`Nome do produto é obrigatório.`)
      return null
    }
    setLoading(true)

    const aliasFMT = alias ? convertToSlug(alias) : convertToSlug(name)
    setValue('alias', aliasFMT)

    const tagsFMT: any[] = []
    tags.map((tag: any) => {
      tagsFMT.push(tag.text)
    })

    let search = name.toLowerCase()
    if (content) {
      search = search + content.toLowerCase()
    }
    if (sideColumnContent) {
      search = search + sideColumnContent.toLowerCase()
    }
    if (description) {
      search = search + description.toLowerCase()
    }

    const input = {
      id: productID,
      alias: aliasFMT,
      status,
      category,
      subCategory,
      type,
      relationID,
      code,
      name,
      description,
      contentTitle,
      contentTitle2,
      contentTitle3,
      content,
      content2,
      content3,
      tags: tagsFMT,
      changeFreq,
      priority,
      price_of,
      price,
      qty,
      stockControl,
      photo1,
      photo2,
      photo3,
      photo4,
      photo5,
      thumbnailSrc,
      titlePadX,
      titlePadY,
      contentPadX,
      contentPadY,
      optionTitle,
      sideColumn,
      sideColumnPadX,
      sideColumnPadY,
      sideColumnContent,
      optionSideColumn,
      footerSm,
      footerLg,
      hideInMenu,
      search,
      hideInSearch,
    } as any

    if (typeof cropper !== 'undefined' && tabSel === 7 && thumbnailSrc) {
      const data = cropper.getData(true)
      const cropBoxData = cropper.getCropBoxData()
      const canvasData = cropper.getCanvasData()
      const thumbnailCropperStr = JSON.stringify({
        data,
        cropBoxData,
        canvasData,
      })
      input.thumbnailCropper = thumbnailCropperStr

      const thumbnailNew = `thumbnail/${new Date().getTime()}.jpg`
      const src = cropper.getCroppedCanvas().toDataURL()
      const img = (await resize(src, 256)) as any
      input.thumbnail = thumbnailNew

      await Storage.remove(thumbnail, { level: 'public' })
      setThumbnail(thumbnailNew)

      await Storage.put(thumbnailNew, img, {
        level: 'public',
        contentType: `${img.type}`,
        progressCallback(progress: any) {
          const { loaded, total } = progress
          const p = ((loaded / total) * 100).toFixed(0)
          setProgress(p)
        },
      })
    }

    if (isNew) {
      await createProduct(input)
      setIsNew(false)
    } else {
      await updateProduct(input)
    }

    if (setCurrentItem) {
      const obj = JSON.parse(JSON.stringify(product))
      Object.keys(obj).forEach((p: any) => {
        if (input.hasOwnProperty(p)) {
          obj[p] = input[p]
        }
      })
      if (input.thumbnail) {
        obj.thumbnail = input.thumbnail
      }
      if (input.thumbnailCropper) {
        obj.thumbnailCropper = input.thumbnailCropper
      }
      setCurrentItem(obj)
    }

    if (handleUpdate) {
      handleUpdate(input)
    }

    setLoading(false)

    toast(`Produto ${isNew ? 'adicionado' : 'atualizado'} com sucesso.`, {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const onClickItem = (e: any) => {
    const { action, index } = e

    if (action === 'IMAGES') {
      setModalSel(action)
      openModal()
    }
  }

  return (
    <div className="w-full">
      <div className="mt-4 tabs">
        <a
          onClick={() => setTabSel(0)}
          className={`cursor-pointer tab tab-lifted ${
            tabSel === 0 && 'tab-active'
          }`}
        >
          Dados
        </a>
        {watchName && product && (
          <a
            onClick={() => setTabSel(1)}
            className={`tab tab-lifted ${tabSel === 1 && 'tab-active'}`}
          >
            Opcionais
          </a>
        )}
        {watchName && (
          <a
            onClick={() => setTabSel(2)}
            className={`tab tab-lifted ${tabSel === 2 && 'tab-active'}`}
          >
            Informações
          </a>
        )}
        {watchName && (
          <a
            onClick={() => setTabSel(3)}
            className={`tab tab-lifted ${tabSel === 3 && 'tab-active'}`}
          >
            Fotos
          </a>
        )}
        {watchName && (
          <a
            onClick={() => setTabSel(4)}
            className={`tab tab-lifted ${tabSel === 4 && 'tab-active'}`}
          >
            Lateral
          </a>
        )}
        {watchName && (
          <a
            onClick={() => setTabSel(5)}
            className={`tab tab-lifted ${tabSel === 5 && 'tab-active'}`}
          >
            SEO
          </a>
        )}
        {watchName && (
          <a
            onClick={() => setTabSel(6)}
            className={`tab tab-lifted ${tabSel === 6 && 'tab-active'}`}
          >
            Ajustes
          </a>
        )}
        {watchName && (
          <a
            onClick={() => setTabSel(7)}
            className={`tab tab-lifted ${tabSel === 7 && 'tab-active'}`}
          >
            Thumbnail
          </a>
        )}
        {screenWidth > 1040 && (
          <div className="flex-1 cursor-default tab tab-lifted"></div>
        )}
      </div>

      <div className="mt-5 mb-2 max-w-full w-full mx-auto">
        {tabSel === 0 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="basis-full lg:basis-2/4">
                <Input
                  label="Nome do produto ou serviço"
                  type="text"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  register={register('name')}
                  defaultValue={''}
                  notes={
                    errors.name && errors.name.type === 'required'
                      ? 'Nome é obrigatório.'
                      : ''
                  }
                />
              </div>
              {!categoriesLoaded && <div className="basis-full lg:basis-1/4 pt-4"><Loading /></div>}
              {categoriesLoaded && <div className="basis-full lg:basis-1/4">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Categoria
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('category')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        {categories
                          ?.sort((a: any, b: any) =>
                            a.order > b.order ? 1 : b.order > a.order ? -1 : 0
                          )
                          .map((i: any, k: number) => (
                            <option key={k} value={i.id}>
                              {i.title}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>}
              {!categoriesLoaded && <div className="basis-full lg:basis-1/4 pt-4"><Loading /></div>}
              {categoriesLoaded && <div className="basis-full lg:basis-1/4">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Sub-categoria
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('subCategory')}
                        placeholder=""
                        aria-invalid={errors.subCategory ? 'true' : 'false'}
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value=""></option>
                        {subCategories
                          ?.sort((a: any, b: any) =>
                            a.order > b.order ? 1 : b.order > a.order ? -1 : 0
                          )
                          .map((i: any, k: number) => (
                            <option key={k} value={i.id}>
                              {i.title}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>}
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="basis-full">
                <Input
                  label="Descrição"
                  type="text"
                  aria-invalid={errors.description ? 'true' : 'false'}
                  register={register('description')}
                  defaultValue={''}
                  notes="A descrição do produto é utilizada em cards, no mapa do site e meta-tags."
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="basis-full lg:basis-1/3">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Status
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('status')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value={PageStatus.ON}>ON LINE</option>
                        <option value={PageStatus.OFF}>OFF LINE</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="basis-full lg:basis-1/3">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Exibir na busca?
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('hideInSearch')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value="true">Não</option>
                        <option value="false">Sim</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="basis-full md:basis-1/3">
                <Input
                  label="Código interno"
                  type="text"
                  aria-invalid={errors.code ? 'true' : 'false'}
                  register={register('code')}
                  defaultValue={''}
                />
              </div>
            </div>

            <div className="mt-6">
              <Segment
                title="Comportamento por tipo"
                notes="A depender do tipo informado o comportamento do produto é diferente, assim como o processo da compra."
              />
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="basis-full md:basis-1/2">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Tipo do produto ou serviço
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('type')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value="DELIVERY">
                        Delivery com entrega por motoboy
                      </option>
                      <option value="DIGITAL">
                        Digital com conteúdo em área restrita
                      </option>
                    </select>
                  </div>
                  <div className="text-accent-6 text-xs">
                    Determina o comportamento no app
                  </div>
                </div>
              </div>
              {watchType === 'DELIVERY' && (
                <div className="basis-full md:basis-1/2">
                  <Input
                    label="Tempo estimado para preparo"
                    type="number"
                    register={register('preparationTime')}
                    defaultValue={''}
                    notes="Tempo em minutos, caso 0 não exibe."
                  />
                </div>
              )}
              {watchType === 'DIGITAL' && (
                <div className="basis-full md:basis-1/2">
                  <div className="w-full">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Conteúdo / Área restrita
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('relationID')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value=""></option>
                        {relations.map((rl: any, k: number) => (
                          <option key={k} value={rl.id}>
                            {rl.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="text-accent-6 text-xs">
                      Integração com Conteúdos Restritos
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <Segment
                title="Disponibilidade e Preço"
                notes="Caso habilite o controle da disponibilidade, apenas a quantidade disponível informada estará disponível para a venda. A cada novo pedido a quantidade será atualizada. Informe o preço de venda e o preço promocional opcionalmente."
              />
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="basis-full md:basis-1/4">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Controlar disponibilidade
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('stockControl')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value="false">Não</option>
                        <option value="true">Sim</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="basis-full md:basis-1/4">
                <Input
                  label="Qtde disponível"
                  type="number"
                  aria-invalid={errors.qty ? 'true' : 'false'}
                  register={register('qty')}
                  defaultValue={''}
                  notes="Qtde limite para venda."
                />
              </div>
              <div className="basis-full md:basis-1/4">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Preço de (Opcional)
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="price_of"
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
                        onValueChange={(values) => onChange(values.floatValue)}
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        ref={ref}
                      />
                    )}
                  />
                </div>
                <span className="text-accent-6 text-xs">Formato de/por.</span>
              </div>
              <div className="basis-full md:basis-1/4">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Preço por
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="price"
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
                        onValueChange={(values) => onChange(values.floatValue)}
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        ref={ref}
                      />
                    )}
                  />
                </div>
                <span className="text-accent-6 text-xs">
                  Preço de venda do produto.
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="slim"
                type="submit"
                loading={loading}
                disabled={!watchName || !watchCategory}
              >
                <Check className="-ml-2 mr-2" />
                {isNew && <span>Adicionar</span>}
                {!isNew && <span>Atualizar</span>}
              </Button>
              {isNew && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Cross2 className="-ml-2 mr-2" />
                  Cancelar
                </Button>
              )}
              {!isNew && !product && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Undo className="-ml-2 mr-2" />
                  Produtos
                </Button>
              )}
            </div>
          </form>
        )}

        {tabSel === 1 && (
          <Optional
            productID={productID}
            userID={userID}
            category={
              product.category
                ? product.category
                : watchCategory
                ? watchCategory
                : ''
            }
          />
        )}

        {tabSel === 2 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="basis-full lg:basis-2/4">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Selecione
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      value={contentSel}
                      onChange={(e) => {
                        setContentSel(e.target.value)
                      }}
                      id="gender"
                      name="gender"
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value="1">Conteúdo 1</option>
                      <option value="2">Conteúdo 2</option>
                      <option value="3">Conteúdo 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="basis-full lg:basis-2/4">
                {contentSel === '1' && (
                  <Input
                    label={`Título do conteúdo 1`}
                    type="text"
                    register={register('contentTitle')}
                    defaultValue={''}
                  />
                )}
                {contentSel === '2' && (
                  <Input
                    label={`Título do conteúdo 2`}
                    type="text"
                    register={register('contentTitle2')}
                    defaultValue={''}
                  />
                )}
                {contentSel === '3' && (
                  <Input
                    label={`Título do conteúdo 3`}
                    type="text"
                    register={register('contentTitle3')}
                    defaultValue={''}
                  />
                )}
              </div>
            </div>
            <div className="w-full">
              {contentSel === '1' && (
                <Editor
                  fieldName="content"
                  value={product && product.content ? product.content : ''}
                  setValue={setValue}
                />
              )}
              {contentSel === '2' && (
                <Editor
                  fieldName="content2"
                  value={product && product.content2 ? product.content2 : ''}
                  setValue={setValue}
                />
              )}
              {contentSel === '3' && (
                <Editor
                  fieldName="content3"
                  value={product && product.content3 ? product.content3 : ''}
                  setValue={setValue}
                />
              )}
              <span className="text-accent-6 text-xs">
                Utilize este conteúdo para informar os detalhes ou
                especificações do produto.
              </span>
            </div>
            <div className="mt-10">
              <Button
                variant="slim"
                type="submit"
                loading={loading}
                disabled={!watchName || !watchCategory}
              >
                <Check className="-ml-2 mr-2" />
                {isNew && <span>Adicionar</span>}
                {!isNew && <span>Atualizar</span>}
              </Button>
              {isNew && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Cross2 className="-ml-2 mr-2" />
                  Cancelar
                </Button>
              )}
              {!isNew && !product && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Undo className="-ml-2 mr-2" />
                  Produtos
                </Button>
              )}
            </div>
          </form>
        )}

        {tabSel === 3 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="w-full">
                <div className="flex flex-row-reverse w-full">
                  <div className="mt-6 pl-2">
                    <div
                      className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                      onClick={() => onClickItem({ action: 'IMAGES' })}
                    >
                      <Picture className="flex-shrink-0 h-6 w-6 text-accent-7" />
                    </div>
                  </div>
                  <div className="w-full">
                    <Input
                      label="URL de uma imagem (1)"
                      type="text"
                      register={register('photo1')}
                      defaultValue={''}
                      notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="w-full">
                <div className="flex flex-row-reverse w-full">
                  <div className="mt-6 pl-2">
                    <div
                      className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                      onClick={() => onClickItem({ action: 'IMAGES' })}
                    >
                      <Picture className="flex-shrink-0 h-6 w-6 text-accent-7" />
                    </div>
                  </div>
                  <div className="w-full">
                    <Input
                      label="URL de uma imagem (2)"
                      type="text"
                      register={register('photo2')}
                      defaultValue={''}
                      notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="w-full">
                <div className="flex flex-row-reverse w-full">
                  <div className="mt-6 pl-2">
                    <div
                      className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                      onClick={() => onClickItem({ action: 'IMAGES' })}
                    >
                      <Picture className="flex-shrink-0 h-6 w-6 text-accent-7" />
                    </div>
                  </div>
                  <div className="w-full">
                    <Input
                      label="URL de uma imagem (3)"
                      type="text"
                      register={register('photo3')}
                      defaultValue={''}
                      notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="w-full">
                <div className="flex flex-row-reverse w-full">
                  <div className="mt-6 pl-2">
                    <div
                      className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                      onClick={() => onClickItem({ action: 'IMAGES' })}
                    >
                      <Picture className="flex-shrink-0 h-6 w-6 text-accent-7" />
                    </div>
                  </div>
                  <div className="w-full">
                    <Input
                      label="URL de uma imagem (4)"
                      type="text"
                      register={register('photo4')}
                      defaultValue={''}
                      notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="w-full">
                <div className="flex flex-row-reverse w-full">
                  <div className="mt-6 pl-2">
                    <div
                      className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                      onClick={() => onClickItem({ action: 'IMAGES' })}
                    >
                      <Picture className="flex-shrink-0 h-6 w-6 text-accent-7" />
                    </div>
                  </div>
                  <div className="w-full">
                    <Input
                      label="URL de uma imagem (5)"
                      type="text"
                      register={register('photo5')}
                      defaultValue={''}
                      notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Button
                variant="slim"
                type="submit"
                loading={loading}
                disabled={!watchName || !watchCategory}
              >
                <Check className="-ml-2 mr-2" />
                {isNew && <span>Adicionar</span>}
                {!isNew && <span>Atualizar</span>}
              </Button>
              {isNew && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Cross2 className="-ml-2 mr-2" />
                  Cancelar
                </Button>
              )}
              {!isNew && !product && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Undo className="-ml-2 mr-2" />
                  Produtos
                </Button>
              )}
            </div>
          </form>
        )}

        {tabSel === 4 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="basis-full md:basis-1/2">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Visualização da coluna lateral
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('sideColumn')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value={PageSideColumn.L}>
                        Exibir a esquerda
                      </option>
                      <option value={PageSideColumn.R}>Exibir a direita</option>
                      <option value={PageSideColumn.N}>Não exibir</option>
                    </select>
                  </div>
                </div>
              </div>
              {watchSideColumn !== PageSideColumn.N && (
                <div className="basis-full md:basis-1/2">
                  <div className="w-full">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Opções da coluna lateral
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('optionSideColumn')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value={PageOptionSideColumn.MENU_CONTENT_TAGS}>
                          Produtos da Categoria, Conteúdo e Tags
                        </option>
                        <option value={PageOptionSideColumn.MENU_CONTENT}>
                          Produtos da Categoria e Conteúdo
                        </option>
                        <option value={PageOptionSideColumn.TAGS_CONTENT}>
                          Tags e Conteúdo
                        </option>
                        <option value={PageOptionSideColumn.CONTENT_MENU_TAGS}>
                          Conteúdo, Produtos da Categoria e Tags
                        </option>
                        <option value={PageOptionSideColumn.CONTENT_MENU}>
                          Conteúdo e Produtos da Categoria
                        </option>
                        <option value={PageOptionSideColumn.CONTENT_TAGS}>
                          Conteúdo e tags
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {watchSideColumn !== PageSideColumn.N && (
              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="basis-full md:basis-1/2">
                  <div className="w-full">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Espaçamento Horizontal (lateral)
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('sideColumnPadX')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value="none">Nenhum</option>
                        <option value="small">Pequeno</option>
                        <option value="normal">Médio</option>
                        <option value="large">Grande</option>
                        <option value="extra">Enorme</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="basis-full md:basis-1/2">
                  <div className="w-full">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Espaçamento Vertical (lateral)
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('sideColumnPadY')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value="none">Nenhum</option>
                        <option value="small">Pequeno</option>
                        <option value="normal">Médio</option>
                        <option value="large">Grande</option>
                        <option value="extra">Enorme</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {watchSideColumn !== PageSideColumn.N && (
              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="w-full">
                  <Editor
                    fieldName="sideColumnContent"
                    value={
                      product && product.sideColumnContent
                        ? product.sideColumnContent
                        : ''
                    }
                    setValue={setValue}
                  />
                </div>
              </div>
            )}
            <div className="mt-6">
              <Button
                variant="slim"
                type="submit"
                loading={loading}
                disabled={!watchName || !watchCategory}
              >
                <Check className="-ml-2 mr-2" />
                {isNew && <span>Adicionar</span>}
                {!isNew && <span>Atualizar</span>}
              </Button>
              {isNew && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Cross2 className="-ml-2 mr-2" />
                  Cancelar
                </Button>
              )}
              {!isNew && !product && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Undo className="-ml-2 mr-2" />
                  Produtos
                </Button>
              )}
            </div>
          </form>
        )}

        {tabSel === 5 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="basis-full">
                <Input
                  label="Apelido da página do produto"
                  type="text"
                  aria-invalid={errors.alias ? 'true' : 'false'}
                  register={register('alias')}
                  defaultValue={''}
                  notes="O apelido é um nome amigavel que aumenta a relevancia da página do produto nos robos de busca."
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="basis-full md:w-1/2">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Frequência das alterações
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('changeFreq')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value={PageChangeFreq.NEVER}>Nunca</option>
                      <option value={PageChangeFreq.YEARLY}>Anualmente</option>
                      <option value={PageChangeFreq.MONTHLY}>
                        Mensalmente
                      </option>
                      <option value={PageChangeFreq.WEEKLY}>
                        Semanalmente
                      </option>
                      <option value={PageChangeFreq.DAILY}>Diariamente</option>
                      <option value={PageChangeFreq.HOURLY}>
                        De hora em hora
                      </option>
                      <option value={PageChangeFreq.ALWAYS}>Sempre</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="basis-full md:w-1/2">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Prioridade
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('priority')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value={PagePriority.P0}>0.0 (Mínima)</option>
                      <option value={PagePriority.P1}>0.1</option>
                      <option value={PagePriority.P2}>0.2</option>
                      <option value={PagePriority.P3}>0.3</option>
                      <option value={PagePriority.P4}>0.4</option>
                      <option value={PagePriority.P5}>0.5</option>
                      <option value={PagePriority.P6}>0.6</option>
                      <option value={PagePriority.P7}>0.7</option>
                      <option value={PagePriority.P8}>0.8</option>
                      <option value={PagePriority.P9}>0.9</option>
                      <option value={PagePriority.P10}>1.0 (Máxima)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor=""
                className="text-accent-7 text-sm font-semibold px-1"
              >
                Tags relacionadas
              </label>
              <div className="text-accent-6 text-xs ml-1 mb-1">
                Opcionalmente informe acima tags (palavras-chaves) relacionadas
                ao produto. Entre com uma tag por vez e tecle enter para
                adicionar.
              </div>
              <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleTagsDelete}
                handleAddition={handleTagsAddition}
                handleDrag={handleTagsDrag}
                inputFieldPosition="top"
                autocomplete
                placeholder="Inserir TAG"
              />
            </div>
            <div className="mt-6">
              <Button
                variant="slim"
                type="submit"
                loading={loading}
                disabled={!watchName || !watchCategory}
              >
                <Check className="-ml-2 mr-2" />
                {isNew && <span>Adicionar</span>}
                {!isNew && <span>Atualizar</span>}
              </Button>
              {isNew && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Cross2 className="-ml-2 mr-2" />
                  Cancelar
                </Button>
              )}
              {!isNew && !product && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Undo className="-ml-2 mr-2" />
                  Produtos
                </Button>
              )}
            </div>
          </form>
        )}

        {tabSel === 6 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Segment
              className="mt-6"
              title="Título da página"
              notes="Por padrão o título da página é exibido antes do conteúdo, você pode escolher seu alinhamento e espaçamento ou ainda não exibi-lo."
            />

            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="basis-full md:basis-1/2 lg:basis-1/3">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Visualização do título
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('optionTitle')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value={PageOptionTitle.L}>
                        Exibir a esquerda
                      </option>
                      <option value={PageOptionTitle.R}>
                        Exibir a direita
                      </option>
                      <option value={PageOptionTitle.C}>
                        Exibir centralizado
                      </option>
                      <option value={PageOptionTitle.N}>Não exibir</option>
                    </select>
                  </div>
                </div>
              </div>
              {watchOptionTitle !== PageOptionTitle.N && (
                <div className="basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="w-full">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Espaçamento Horizontal
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('titlePadX')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value="none">Nenhum</option>
                        <option value="small">Pequeno</option>
                        <option value="normal">Médio</option>
                        <option value="large">Grande</option>
                        <option value="extra">Enorme</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              {watchOptionTitle !== PageOptionTitle.N && (
                <div className="basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="w-full">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Espaçamento Vertical
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('titlePadY')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value="none">Nenhum</option>
                        <option value="small">Pequeno</option>
                        <option value="normal">Médio</option>
                        <option value="large">Grande</option>
                        <option value="extra">Enorme</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Segment
              className="mt-6"
              title="Rodapé da página (Footer)"
              notes="Selecione suas opções de rodapé para esta página tanto para tela grande (Desktop ou Tablet), como tela pequena (celular)."
            />

            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="w-full md:basis-1/2">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Exibir rodapé (Tela pequena - Celular)
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('footerSm')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value="hide">Não exibir</option>
                      <option value="showAll">Exibir completo</option>
                      <option value="showMin">Exibir o mínimo</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-full md:basis-1/2">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Exibir rodapé (Tela grande - Desktop e Tablet)
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('footerLg')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value="hide">Não exibir</option>
                      <option value="showAll">Exibir completo</option>
                      <option value="showMin">Exibir o mínimo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <Segment className='mt-6' title="Menu da página" notes="Selecione se deseja que este produto seja exibido no menu da categoria ao qual ele pertence." />

            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="basis-full md:basis-1/2 lg:basis-1/3">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Visualização no Menu
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('hideInMenu')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value="false">Exibir</option>
                      <option value="true">Não exibir</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button
                variant="slim"
                type="submit"
                loading={loading}
                disabled={!watchName || !watchCategory}
              >
                <Check className="-ml-2 mr-2" />
                {isNew && <span>Adicionar</span>}
                {!isNew && <span>Atualizar</span>}
              </Button>
              {isNew && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Cross2 className="-ml-2 mr-2" />
                  Cancelar
                </Button>
              )}
              {!isNew && !product && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Undo className="-ml-2 mr-2" />
                  Produtos
                </Button>
              )}
            </div>
          </form>
        )}

        {tabSel === 7 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="w-full">
                <div className="flex flex-row-reverse w-full">
                  <div className="mt-6 pl-2">
                    <div
                      className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                      onClick={() => onClickItem({ action: 'IMAGES' })}
                    >
                      <Picture className="flex-shrink-0 h-6 w-6 text-accent-7" />
                    </div>
                  </div>
                  <div className="w-full">
                    <Input
                      label="URL do thumbnail do produto"
                      type="text"
                      register={register('thumbnailSrc')}
                      defaultValue={''}
                      notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              {watchThumbnailSrc && (
                <Cropper
                  zoomable={true}
                  style={{ height: 250, width: '100%' }}
                  zoomTo={0}
                  initialAspectRatio={1}
                  aspectRatio={1}
                  src={watchThumbnailSrc}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  onInitialized={(instance) => setCropper(instance)}
                  ready={() => setIsReady(true)}
                  guides={true}
                  checkCrossOrigin={true}
                />
              )}
            </div>
            <div className="mt-6">
              <Button
                variant="slim"
                type="submit"
                loading={loading}
                disabled={!watchName || !watchCategory}
              >
                <Check className="-ml-2 mr-2" />
                {isNew && <span>Adicionar</span>}
                {!isNew && <span>Atualizar</span>}
              </Button>
              {isNew && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Cross2 className="-ml-2 mr-2" />
                  Cancelar
                </Button>
              )}
              {!isNew && !product && (
                <Button
                  style={{ backgroundColor: 'transparent', color: '#282a36' }}
                  onClick={() => {
                    router.push('/admin/products')
                  }}
                  className="mt-3 md:mt-0 ml-0 md:ml-2"
                  variant="slim"
                  type="button"
                >
                  <Undo className="-ml-2 mr-2" />
                  Produtos
                </Button>
              )}
            </div>
          </form>
        )}
      </div>

      <Modal
        open={displayModal}
        onClose={closeModal}
        focusTrap={false}
        absolute={true}
      >
        <div
          style={{
            width: screenWidth * 0.8,
            height: modalSel === 'IMAGES' ? screenHeight * 0.8 : 'auto',
            maxHeight: screenHeight * 0.8,
          }}
        >
          {modalSel === 'IMAGES' && (
            <div
              style={{ height: screenHeight * 0.78 }}
              className="overflow-y-auto"
            >
              <MidiasLib userID={userID} isModal={true} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

type OptionalInputs = {
  name: string
  price: number
}

interface OptionalProps {
  productID: string
  userID: string
  category?: string
}

function Optional(props: OptionalProps) {
  const { userID, productID, category } = props
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [options, setOptions] = useState([] as any)

  const {
    listOptionsByProduct,
    createOption,
    deleteOption,
    listProductsByCategorySubCategoryName,
  } = useProduct()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchOptions = async () => {
        const { items } = await listOptionsByProduct({
          productID,
          limit: 100,
          nextToken: null,
        })
        setOptions(items)
      }
      fetchOptions()
    }
    return () => {
      isMounted = false
      setOptions([] as any)
    }
  }, [productID])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<OptionalInputs>()

  const watchName = watch('name')

  const onSubmit: SubmitHandler<OptionalInputs> = async (data) => {
    const { name, price } = data
    if (!name) {
      toast.error(`Nome do item opcional é obrigatório.`)
      return null
    }
    setLoading(true)
    const input = {
      productID,
      name,
      price: price ? price : 0,
    } as any

    const result = (await createOption(input)) as any
    setOptions(options.concat(result.data.createOption))
    setLoading(false)
    toast(`Item opcional adicionado com sucesso.`, {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const onDeleteItem = async (e: any, index: number) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir o item? ${e.name}`,
      message: '',
      options: [
        {
          title: 'NÃO',
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: 'SIM',
        },
      ],
    })
    if (promptRet.index === 1) {
      await deleteOption({ id: e.id })

      setOptions(
        options.map((item: any, i: number) => {
          if (index !== i) {
            return item
          }
        })
      )

      toast('Item excluído com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    }
  }

  const onUpdateItems = async () => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma replicar os opcionais para todos os outros produtos desta categoria?`,
      message: '',
      options: [
        {
          title: 'NÃO',
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: 'SIM',
        },
      ],
    })
    if (promptRet.index === 1) {
      if (category) {
        setLoading2(true)
        toast('Replicando opcionais em background.', {
          backgroundColor: '#263238',
          color: '#fff',
        })

        const lpc = await listProductsByCategorySubCategoryName({
          category,
          limit: 500,
        })

        lpc.items.map(async (p: any) => {
          if (p.id !== productID) {
            const lop = await listOptionsByProduct({ productID: p.id })
            lop.items.map(async (o: any) => {
              await deleteOption({ id: o.id })
            })
            options.map(async (op: any) => {
              await createOption({
                productID: p.id,
                name: op.name,
                price: op.price,
              })
            })
          }
        })

        setLoading2(false)
        toast('Opcionais replicados com sucesso.', {
          backgroundColor: '#263238',
          color: '#fff',
        })
      }
    }
  }

  return (
    <div>
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md">
            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="w-full md:w-3/4">
                <Input
                  label="Nome do item"
                  type="text"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  register={register('name')}
                  defaultValue={''}
                  notes="Este item poderá ser adiquirido opcionalmente junto ao produto."
                />
              </div>
              <div className="w-full md:w-1/4">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Valor adicional
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="price"
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
                        onValueChange={(values) => onChange(values.floatValue)}
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        ref={ref}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-6">
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={!watchName}
            >
              <Check className="-ml-2 mr-2" />
              Adicionar
            </Button>
            {category && options.length > 0 && (
              <Button
                style={{ backgroundColor: '#ff0000', color: '#fff' }}
                className="ml-2"
                variant="slim"
                type="button"
                loading={loading2}
                onClick={() => {
                  onUpdateItems()
                }}
              >
                <Refresh className="-ml-2 mr-2" />
                Replicar para todos
              </Button>
            )}
          </div>
        </form>
      </div>

      {options.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full table-compact">
            <thead>
              <tr>
                <th>Item</th>
                <th>Preço adicional</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {options
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map(
                  (option: any, index: number) =>
                    option && (
                      <tr key={index}>
                        <td className="text-base">{option.name}</td>
                        <td className="text-base">
                          <NumberFormat
                            value={option.price ? option.price : 0}
                            thousandsGroupStyle="thousand"
                            prefix="R$ "
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            displayType="text"
                            allowNegative={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </td>
                        <td className="text-red-500">
                          <Trash
                            onClick={() => {
                              onDeleteItem(option, index)
                            }}
                          />
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
