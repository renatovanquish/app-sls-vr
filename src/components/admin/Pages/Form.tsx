import { useState, useEffect } from 'react'
import { Button, Input, Modal, Segment } from 'components/ui'
import { Check, Cross2, Undo, Picture } from 'components/icons'
import { useUI } from 'components/ui/context'
import { toast } from 'react-toast'
import { useRouter } from 'next/router'
import { MidiasLib } from 'components/admin'
import { useScreen } from 'hooks/useScreen'
import convertToSlug from 'lib/convertToSlug'
import { useMenu } from 'hooks/useMenu'

import {
  PageStatus,
  PageType,
  PageChangeFreq,
  PagePriority,
  PageOptionTitle,
  PageSideColumn,
  PageOptionSideColumn,
} from 'models'

import { usePage } from 'hooks/usePage'

import { WithContext as ReactTags } from 'react-tag-input'
const KeyCodes = { comma: 188, enter: [10, 13] }
const delimiters = [...KeyCodes.enter, KeyCodes.comma]

import { v4 as uuidv4 } from 'uuid'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })
import { useImageResize } from 'hooks/useImageResize'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

type Inputs = {
  alias: string
  status: string // PageStatus
  menu: string
  order: number
  title: string
  titlePadX: string
  titlePadY: string
  description: string
  thumbnailSrc: string
  content: string
  contentPadX: string
  contentPadY: string
  changeFreq: string // PageChangeFreq
  priority: string // PagePriority
  optionTitle: string // PageOptionTitle
  sideColumn: string // PageSideColumn
  sideColumnPadX: string
  sideColumnPadY: string
  sideColumnContent: string
  optionSideColumn: string // PageOptionSideColumn
  footerSm: string
  footerLg: string
  hideInMenu: boolean
}

interface Props {
  userID: string
  page: any
  setCurrentItem?: any
  handleUpdate?: any
  index?: number
}

export default function FormPage(props: Props) {
  const { userID, page, setCurrentItem, handleUpdate, index } = props
  const [loading, setLoading] = useState(false)
  const [tabSel, setTabSel] = useState(0)
  const [pageID, setPageID] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [modalSel, setModalSel] = useState('')
  const { screenWidth, screenHeight } = useScreen()

  const router = useRouter()
  const { openModal, displayModal, closeModal, setProgress } = useUI()

  const [cropper, setCropper] = useState<any>()
  const [isReady, setIsReady] = useState(false)
  const [thumbnail, setThumbnail] = useState('')
  const [thumbnailCropper, setThumbnailCropper] = useState({} as any)

  const [menus, setMenus] = useState([] as any)
  const { listMenus } = useMenu()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const watchTitle = watch('title')
  const watchMenu = watch('menu')
  const watchSideColumn = watch('sideColumn')
  const watchOptionTitle = watch('optionTitle')

  const watchThumbnailSrc = watch('thumbnailSrc')
  const { resize } = useImageResize()

  const { createPage, updatePage } = usePage()

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
      const fetchMenu = async () => {
        const { items } = await listMenus({ limit: 1000 })
        setMenus(items)
      }
      fetchMenu()
    }
    return () => {
      isMounted = false
      setMenus([] as any)
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
    if (page) {
      closeModal()
      setIsNew(false)
      setPageID(page.id)
      setValue('alias', page.alias)
      setValue('status', page.status)
      setValue('menu', page.menu)
      setValue('order', page.order)
      setValue('title', page.title)
      setValue('description', page.description)
      setValue('thumbnailSrc', page.thumbnailSrc)
      setValue('content', page.content ? page.content : '')
      setValue('contentPadX', page.contentPadX ? page.contentPadX : 'small')
      setValue('contentPadY', page.contentPadY ? page.contentPadY : 'small')
      setValue('changeFreq', page.changeFreq)
      setValue('priority', page.priority)
      setValue('footerSm', page.footerSm ? page.footerSm : 'hide')
      setValue('footerLg', page.footerLg ? page.footerLg : 'hide')
      setValue('hideInMenu', page.hideInMenu ? page.hideInMenu : false)
      setValue(
        'optionTitle',
        page.optionTitle ? page.optionTitle : PageOptionTitle.L
      )
      setValue('titlePadX', page.titlePadX ? page.titlePadX : 'small')
      setValue('titlePadY', page.titlePadY ? page.titlePadY : 'small')
      setValue(
        'sideColumn',
        page.sideColumn ? page.sideColumn : PageSideColumn.N
      )
      setValue(
        'sideColumnPadX',
        page.sideColumnPadX ? page.sideColumnPadX : 'small'
      )
      setValue(
        'sideColumnPadY',
        page.sideColumnPadY ? page.sideColumnPadY : 'small'
      )
      setValue(
        'sideColumnContent',
        page.sideColumnContent ? page.sideColumnContent : ''
      )
      setValue(
        'optionSideColumn',
        page.optionSideColumn
          ? page.optionSideColumn
          : PageOptionSideColumn.MENU_CONTENT_TAGS
      )

      const tagsTMP: any[] = []
      if (page.tags) {
        page.tags.map((tag: string) => {
          tagsTMP.push({ id: tag, text: tag })
        })
      }
      setTags(tagsTMP)

      setThumbnail(page.thumbnail ? page.thumbnail : '')
      setThumbnailCropper(
        page.thumbnailCropper ? JSON.parse(page.thumbnailCropper) : ({} as any)
      )
    } else {
      setIsNew(true)
      setPageID(uuidv4())
      setValue('status', PageStatus.ON)
      setValue('menu', '')
      setValue('order', Math.round(new Date().getTime() / 1000))
      setValue('content', '')
      setValue('changeFreq', PageChangeFreq.NEVER)
      setValue('priority', PagePriority.P5)
      setValue('optionTitle', PageOptionTitle.L)
      setValue('sideColumn', PageSideColumn.N)
      setValue('sideColumnContent', '')
      setValue('optionSideColumn', PageOptionSideColumn.MENU_CONTENT_TAGS)
      setValue('contentPadX', 'small')
      setValue('contentPadY', 'small')
      setValue('sideColumnPadX', 'small')
      setValue('sideColumnPadY', 'small')
      setValue('titlePadX', 'small')
      setValue('titlePadY', 'small')
      setValue('footerSm', 'hide')
      setValue('footerLg', 'hide')
      setValue('hideInMenu', false)
      setThumbnail('')
      setThumbnailCropper({} as any)
    }
  }, [page, setValue])

  /**
   * HANDLE SUBMIT
   * ******************************************************
   */
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {
      alias,
      status,
      menu,
      order,
      title,
      description,
      thumbnailSrc,
      content,
      contentPadX,
      contentPadY,
      changeFreq,
      priority,
      optionTitle,
      titlePadX,
      titlePadY,
      sideColumn,
      sideColumnPadX,
      sideColumnPadY,
      sideColumnContent,
      optionSideColumn,
      footerSm,
      footerLg,
      hideInMenu,
    } = data

    if (!title) {
      toast.error(`Título da página é obrigatório.`)
      return null
    }
    setLoading(true)

    const aliasFMT = alias ? convertToSlug(alias) : convertToSlug(title)
    setValue('alias', aliasFMT)

    const tagsFMT: any[] = []
    tags.map((tag: any) => {
      tagsFMT.push(tag.text)
    })

    let search = title.toLowerCase()
    if (content) {
      search = search + content.toLowerCase()
    }
    if (sideColumnContent) {
      search = search + sideColumnContent.toLowerCase()
    }
    if (description) {
      search = search + description.toLowerCase()
    }
    if (page && page.blocks) {
      page.blocks.items.map((block: any) => {
        search = search + block.content.toLowerCase()
      })
    }

    const input = {
      id: pageID,
      alias: aliasFMT,
      status,
      type: PageType.CONTENT,
      menu,
      order,
      title,
      description,
      thumbnailSrc,
      content,
      contentPadX,
      contentPadY,
      tags: tagsFMT,
      changeFreq,
      priority,
      optionTitle,
      titlePadX,
      titlePadY,
      sideColumn,
      sideColumnPadX,
      sideColumnPadY,
      sideColumnContent,
      optionSideColumn,
      footerSm,
      footerLg,
      hideInMenu,
      search,
    } as any

    if (typeof cropper !== 'undefined' && tabSel === 3 && thumbnailSrc) {
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
      await createPage(input)
      setIsNew(false)
    } else {
      await updatePage(input)
    }

    if (setCurrentItem) {
      const obj = JSON.parse(JSON.stringify(page))
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

    toast(`Página ${isNew ? 'adicionada' : 'atualizada'} com sucesso.`, {
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
        {watchTitle && (
          <a
            onClick={() => setTabSel(1)}
            className={`tab tab-lifted ${tabSel === 1 && 'tab-active'}`}
          >
            SEO
          </a>
        )}
        {watchTitle && (
          <a
            onClick={() => setTabSel(2)}
            className={`tab tab-lifted ${tabSel === 2 && 'tab-active'}`}
          >
            Ajustes
          </a>
        )}
        {watchTitle && (
          <a
            onClick={() => setTabSel(3)}
            className={`tab tab-lifted ${tabSel === 3 && 'tab-active'}`}
          >
            Thumbnail
          </a>
        )}
        <div className="flex-1 cursor-default tab tab-lifted"></div>
      </div>

      <div className="mt-5 mb-2 max-w-full w-full mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {tabSel === 0 && (
            <div>
              <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
                <div className="w-full lg:w-2/5">
                  <Input
                    label="Título da página"
                    type="text"
                    aria-invalid={errors.title ? 'true' : 'false'}
                    register={register('title')}
                    defaultValue={''}
                    notes={
                      errors.title && errors.title.type === 'required'
                        ? 'Título é obrigatório.'
                        : ''
                    }
                  />
                </div>
                {menus.length > 0 && <div className="w-full lg:w-1/5">
                  <div className="flex -mx-3">
                    <div className="w-full px-3">
                      <label
                        htmlFor=""
                        className="text-accent-7 text-sm font-semibold px-1"
                      >
                        Menu
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10"></div>
                        <select
                          {...register('menu')}
                          placeholder=""
                          aria-invalid={errors.menu ? 'true' : 'false'}
                          className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        >
                          {menus
                            .sort((a: any, b: any) =>
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
                <div className="w-full lg:w-1/5">
                  <Input
                    label="Ordem"
                    type="number"
                    aria-invalid={errors.order ? 'true' : 'false'}
                    register={register('order')}
                    defaultValue={0}
                  />
                </div>
                <div className="w-full lg:w-1/5">
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
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="w-full md:w-5/5">
                  <Input
                    label="Descrição"
                    type="text"
                    aria-invalid={errors.description ? 'true' : 'false'}
                    register={register('description')}
                    defaultValue={''}
                    notes="A descrição da página é utilizada em cards, no mapa do site e meta-tags."
                  />
                </div>
              </div>
            </div>
          )}

          {tabSel === 1 && (
            <div>
              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="w-full md:w-5/5">
                  <Input
                    label="Apelido da página"
                    type="text"
                    aria-invalid={errors.alias ? 'true' : 'false'}
                    register={register('alias')}
                    defaultValue={''}
                    notes="O apelido é um nome amigavel que aumenta a relevancia da página nos robos de busca."
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="w-full md:w-2/4">
                  <div className="w-full">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Frequencia das alterações
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('changeFreq')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value={PageChangeFreq.NEVER}>Nunca</option>
                        <option value={PageChangeFreq.YEARLY}>
                          Anualmente
                        </option>
                        <option value={PageChangeFreq.MONTHLY}>
                          Mensalmente
                        </option>
                        <option value={PageChangeFreq.WEEKLY}>
                          Semanalmente
                        </option>
                        <option value={PageChangeFreq.DAILY}>
                          Diariamente
                        </option>
                        <option value={PageChangeFreq.HOURLY}>
                          De hora em hora
                        </option>
                        <option value={PageChangeFreq.ALWAYS}>Sempre</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/4">
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
                  Opcionalmente informe acima tags (palavras-chaves)
                  relacionadas a página. Entre com uma tag por vez e tecle enter
                  para adicionar.
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
            </div>
          )}

          {tabSel === 2 && (
            <div>
              <Segment className='mt-6' title="Conteúdo do editor" notes="Caso o conteúdo desta página seja inserido através do editor, selecione os espaçamentos." />

              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="w-full md:w-1/2 lg:w-1/3">
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
                        {...register('contentPadX')}
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
                <div className="w-full md:w-1/2 lg:w-1/3">
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
                        {...register('contentPadY')}
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

              <Segment className='mt-6' title="Título da página" notes="Por padrão o título da página é exibido antes do conteúdo, você pode escolher seu alinhamento e espaçamento ou ainda não exibi-lo." />

              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="w-full md:w-1/2 lg:w-1/3">
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
                  <div className="w-full md:w-1/2 lg:w-1/3">
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
                  <div className="w-full md:w-1/2 lg:w-1/3">
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

              <Segment className='mt-6' title="Rodapé da página (Footer)" notes="Selecione suas opções de rodapé para esta página tanto para tela grande (Desktop ou Tablet), como tela pequena (celular)." />

              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="w-full md:w-1/2">
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
                <div className="w-full md:w-1/2">
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

              <Segment className='mt-6' title="Menu da página" notes="Selecione se deseja que esta página seja exibida no menu ao qual ela pertence." />

              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="w-full md:w-1/2 lg:w-1/3">
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

              <Segment className='mt-6' title="Lateral da página" notes="Selecione entre exibir a coluna lateral nesta página, caso opte por exibir ainda pode escolher o lado de exibição." />

              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <div className="w-full">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Visualização da lateral
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
                        <option value={PageSideColumn.R}>
                          Exibir a direita
                        </option>
                        <option value={PageSideColumn.N}>Não exibir</option>
                      </select>
                    </div>
                  </div>
                </div>
                {watchSideColumn !== PageSideColumn.N && (
                  <div className="w-full md:w-1/2 lg:w-1/3">
                    <div className="w-full">
                      <label
                        htmlFor=""
                        className="text-accent-7 text-sm font-semibold px-1"
                      >
                        Opções da coluna
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10"></div>
                        <select
                          {...register('optionSideColumn')}
                          placeholder=""
                          className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        >
                          <option
                            value={PageOptionSideColumn.MENU_CONTENT_TAGS}
                          >
                            Menu da página, Conteúdo e Tags
                          </option>
                          <option value={PageOptionSideColumn.MENU_CONTENT}>
                            Menu da página e Conteúdo
                          </option>
                          <option value={PageOptionSideColumn.TAGS_CONTENT}>
                            Tags e Conteúdo
                          </option>
                          <option
                            value={PageOptionSideColumn.CONTENT_MENU_TAGS}
                          >
                            Conteúdo, Menu da página e Tags
                          </option>
                          <option value={PageOptionSideColumn.CONTENT_MENU}>
                            Conteúdo e Menu da página
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
                  <div className="w-full md:w-1/2 lg:w-1/3">
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
                  <div className="w-full md:w-1/2 lg:w-1/3">
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
            </div>
          )}

          {tabSel === 3 && (
            <div>
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
                        label="URL do thumbnail da página"
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
                    ready={() => {
                      setIsReady(true)
                      /*
                      setTimeout(()=>{
                        let canvas_img = window.document.querySelector('img.cropper-hide') as any
                        let src = canvas_img.getAttribute('src')
                        canvas_img.setAttribute('crossorigin', 'anonymous')
                        canvas_img.setAttribute('src', src)
                      },100) 
                      */
                    }}
                    guides={true}
                    checkCrossOrigin={true}
                  />
                )}
              </div>
            </div>
          )}

          <div className="mt-6">
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={!watchTitle || !watchMenu}
            >
              <Check className="-ml-2 mr-2" />
              {isNew && <span>Adicionar</span>}
              {!isNew && <span>Atualizar</span>}
            </Button>
            {isNew && (
              <Button
                style={{ backgroundColor: 'transparent', color: '#282a36' }}
                onClick={() => {
                  router.push('/admin/pages')
                }}
                className="ml-2"
                variant="slim"
                type="button"
              >
                <Cross2 className="-ml-2 mr-2" />
                Cancelar
              </Button>
            )}
            {!isNew && !page && (
              <Button
                style={{ backgroundColor: 'transparent', color: '#282a36' }}
                onClick={() => {
                  router.push('/admin/pages')
                }}
                className="ml-2"
                variant="slim"
                type="button"
              >
                <Undo className="-ml-2 mr-2" />
                Páginas
              </Button>
            )}
          </div>
        </form>
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
