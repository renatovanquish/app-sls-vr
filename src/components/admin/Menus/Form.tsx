import { useState, useEffect } from 'react'
import { Button, Input, Segment, Modal } from 'components/ui'
import { Check, Undo, Picture } from 'components/icons'
import { toast } from 'react-toast'
import { useRouter } from 'next/router'
import { useMenu } from 'hooks/useMenu'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useUI } from 'components/ui/context'
import { MidiasLib } from 'components/admin'
import { useScreen } from 'hooks/useScreen'
import { v4 as uuidv4 } from 'uuid'
import convertToSlug from 'lib/convertToSlug'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })
import { useImageResize } from 'hooks/useImageResize'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

type Inputs = {
  alias: string
  order: number
  title: string
  description: string
  orderDesc: boolean
  showDescriptionPage: string
  showThumbnailPage: string
  thumbnailSrc: string
  hide: boolean
}

interface Props {
  userID: string
  menu: any
  setCurrentItem?: any
  handleUpdate?: any
  index?: number
}

export default function FormMenu(props: Props) {
  const { userID, menu, setCurrentItem, handleUpdate, index } = props
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [tabSel, setTabSel] = useState(0)
  const [modalSel, setModalSel] = useState('')
  const { openModal, displayModal, closeModal, setProgress } = useUI()
  const { screenWidth, screenHeight } = useScreen()
  const [cropper, setCropper] = useState<any>()
  const [isReady, setIsReady] = useState(false)
  const [thumbnail, setThumbnail] = useState('')
  const [thumbnailCropper, setThumbnailCropper] = useState({} as any)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const watchTitle = watch('title')
  const watchThumbnailSrc = watch('thumbnailSrc')
  const watchHide = watch('hide')
  const { resize } = useImageResize()

  const { createMenu, updateMenu } = useMenu()

  useEffect(() => {
    if (isReady && cropper && thumbnailCropper) {
      cropper
        .setCropBoxData(thumbnailCropper.cropBoxData)
        .setCanvasData(thumbnailCropper.canvasData)
        .setData(thumbnailCropper.data)
    }
  }, [isReady, cropper])

  useEffect(() => {
    if (menu) {
      setValue('alias', menu.alias)
      setValue('order', menu.order)
      setValue('title', menu.title)
      setValue('description', menu.description)
      setValue('orderDesc', menu.orderDesc)
      setValue('thumbnailSrc', menu.thumbnailSrc)
      setValue('showDescriptionPage', menu.showDescriptionPage)
      setValue('showThumbnailPage', menu.showThumbnailPage)
      setValue('hide', menu.hide)
      setThumbnail(menu.thumbnail ? menu.thumbnail : '')
      setThumbnailCropper(
        menu.thumbnailCropper ? JSON.parse(menu.thumbnailCropper) : ({} as any)
      )
    } else {
      setValue('order', Math.round(new Date().getTime() / 1000))
    }
  }, [menu, setValue])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {
      title,
      description,
      orderDesc,
      showThumbnailPage,
      showDescriptionPage,
      thumbnailSrc,
      alias,
      order,
      hide,
    } = data

    if (!title) {
      toast.error(`Nome do menu é obrigatório.`)
      return null
    }

    setLoading(true)

    const aliasFMT = alias ? convertToSlug(alias) : convertToSlug(title)
    setValue('alias', aliasFMT)

    const input = {
      id: menu ? menu.id : uuidv4(),
      alias: aliasFMT,
      order,
      title,
      description,
      orderDesc,
      thumbnailSrc,
      showDescriptionPage,
      showThumbnailPage,
      hide,
    } as any

    if (typeof cropper !== 'undefined' && tabSel === 2 && thumbnailSrc) {
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

    if (!menu) {
      await createMenu(input)
      router.push('/admin/menus')
    } else {
      await updateMenu(input)
    }

    if (setCurrentItem) {
      const obj = JSON.parse(JSON.stringify(menu))
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

    toast(`Menu ${!menu ? 'adicionado' : 'atualizado'} com sucesso.`, {
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

  const handleCheckboxChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    setValue(target.name, value)
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
        <a
          onClick={() => setTabSel(1)}
          className={`cursor-pointer tab tab-lifted ${
            tabSel === 1 && 'tab-active'
          }`}
        >
          Ajustes
        </a>
        <a
          onClick={() => setTabSel(2)}
          className={`cursor-pointer tab tab-lifted ${
            tabSel === 2 && 'tab-active'
          }`}
        >
          Thumbnail
        </a>
        <div className="flex-1 cursor-default tab tab-lifted"></div>
      </div>

      <div className="max-w-full w-full mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {tabSel === 0 && (
            <div>
              <div className="mt-4 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
                <div className="w-full lg:w-2/4">
                  <Input
                    label="Nome do menu"
                    type="text"
                    aria-invalid={errors.title ? 'true' : 'false'}
                    register={register('title')}
                    defaultValue={''}
                    notes={
                      errors.title && errors.title.type === 'required'
                        ? 'Nome é obrigatório.'
                        : ''
                    }
                  />
                </div>

                <div className="w-full lg:w-1/4">
                  <Input
                    label="Apelido para URL"
                    type="text"
                    aria-invalid={errors.alias ? 'true' : 'false'}
                    register={register('alias')}
                    defaultValue={''}
                    notes={
                      errors.alias && errors.alias.type === 'required'
                        ? 'Apelido é obrigatório.'
                        : ''
                    }
                  />
                </div>
                <div className="w-full lg:w-1/4">
                  <Input
                    label="Ordem"
                    type="text"
                    aria-invalid={errors.order ? 'true' : 'false'}
                    register={register('order')}
                    defaultValue={''}
                    notes={
                      errors.order && errors.order.type === 'required'
                        ? 'Ordem é obrigatório.'
                        : ''
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
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
          )}

          {tabSel === 1 && (
            <div>
              <Segment
                className="mt-4"
                title="Opções de visualização"
                description="Como as páginas são exibidas no menu."
              />

              <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
                <div className="w-full lg:w-1/3">
                  <div className="flex -mx-3">
                    <div className="w-full px-3">
                      <label
                        htmlFor=""
                        className="text-accent-7 text-sm font-semibold px-1"
                      >
                        Ordem das páginas
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10"></div>
                        <select
                          {...register('orderDesc')}
                          placeholder=""
                          className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        >
                          <option value="false">Crescente</option>
                          <option value="true">Decrescente</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/3">
                  <div className="flex -mx-3">
                    <div className="w-full px-3">
                      <label
                        htmlFor=""
                        className="text-accent-7 text-sm font-semibold px-1"
                      >
                        Exibir descrição da página
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10"></div>
                        <select
                          {...register('showDescriptionPage')}
                          placeholder=""
                          className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        >
                          <option value="ALL">Sim</option>
                          <option value="NONE">Não</option>
                          <option value="SM">Apenas no Celular</option>
                          <option value="LG">Apenas no Desktop e Tablet</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/3">
                  <div className="flex -mx-3">
                    <div className="w-full px-3">
                      <label
                        htmlFor=""
                        className="text-accent-7 text-sm font-semibold px-1"
                      >
                        Exibir thumbnail da página
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10"></div>
                        <select
                          {...register('showThumbnailPage')}
                          placeholder=""
                          className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        >
                          <option value="ALL">Sim</option>
                          <option value="NONE">Não</option>
                          <option value="SM">Apenas no Celular</option>
                          <option value="LG">Apenas no Desktop e Tablet</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="hide"
                    name="hide"
                    checked={watchHide}
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="allowViewEmail" className="text-accent-9">
                    Ocultar o menu?
                  </label>
                </div>
              </div>
            </div>
          )}

          {tabSel === 2 && (
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
                        label="URL do thumbnail do menu"
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
            </div>
          )}

          <div className="mt-6">
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={!watchTitle}
            >
              <Check className="-ml-2 mr-2" />
              {!menu && <span>Adicionar</span>}
              {menu && <span>Atualizar</span>}
            </Button>
            {!menu && (
              <Button
                style={{ backgroundColor: 'transparent', color: '#282a36' }}
                onClick={() => {
                  router.push('/admin/menus')
                }}
                className="ml-2"
                variant="slim"
                type="button"
              >
                <Undo className="-ml-2 mr-2" />
                Menus
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
