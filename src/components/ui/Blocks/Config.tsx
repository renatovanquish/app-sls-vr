/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input, Modal } from 'components/ui'
import { Check, Picture } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputColor from 'react-input-color'
import { useScreen } from 'hooks/useScreen'
import { MidiasLib } from 'components/admin'
import { useFolder } from 'hooks/useFolder'

type Inputs = {
  order: number
  bgMode: string
  bgImage: string
  bgFolder: string
  duration: number
  padY: string
  padX: string
  view: string
  anchor: string
}

interface Props {
  block: any
  index: number
  handleUpdate: any
  userID: string
}

export default function Config(props: Props) {
  const { block, index, handleUpdate, userID } = props
  const [loading, setLoading] = useState(false)
  const [tabSel, setTabSel] = useState(0)
  const { updateBlock } = useBlock()
  const [modalSel, setModalSel] = useState('')
  const { screenWidth, screenHeight } = useScreen()
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const watchBgMode = watch('bgMode', 'transparent')
  const [color, setColor] = useState({} as any)
  const [foldersList, setFoldersList] = useState([] as any)
  const { listFolders } = useFolder()

  useEffect(() => {
    if (block) {
      setValue('order', block.order)
      if (block.config) {
        const configParse = JSON.parse(block.config)
        setValue('bgMode', configParse.bgMode)
        setValue('bgImage', configParse.bgImage)
        setValue('bgFolder', configParse.bgFolder)
        setValue('duration', configParse.duration)
        setValue('padY', configParse.padY ? configParse.padY : 'small')
        setValue('padX', configParse.padX ? configParse.padX : 'small')
        setValue('view', configParse.view ? configParse.view : 'show')
        setValue('anchor', configParse.anchor)
      } else {
        setValue('bgMode', 'transparent')
        setValue('bgImage', '')
        setValue('bgFolder', '')
        setValue('duration', 5000)
        setValue('padY', 'small')
        setValue('padX', 'small')
        setValue('view', 'show')
      }
    }
  }, [block])

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const updatedBlock = await updateBlock({
      id: block.id,
      order: data.order,
      config: JSON.stringify({
        bgMode: data.bgMode,
        bgImage: data.bgImage,
        bgFolder: data.bgFolder,
        duration: data.duration,
        bgColor: color ? color.hex : '#fafafa',
        padX: data.padX ? data.padX : 'normal',
        padY: data.padY ? data.padY : 'normal',
        view: data.view ? data.view : 'show',
        anchor: data.anchor,
      }),
    })
    delete updatedBlock.page
    handleUpdate(index, updatedBlock)
    toast.info(`Bloco atualizado com sucesso!`)
    setLoading(false)
  }

  const onClickItem = (e: any) => {
    const { action, index } = e
    console.log(action)
    if (action === 'IMAGES') {
      setModalSel(action)
      setIsOpen(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 tabs">
        <a
          onClick={() => setTabSel(0)}
          className={`cursor-pointer tab tab-lifted ${
            tabSel === 0 ? 'tab-active' : 'text-accent-5'
          }`}
        >
          Parâmetros
        </a>
        <a
          onClick={() => setTabSel(1)}
          className={`cursor-pointer tab tab-lifted ${
            tabSel === 1 ? 'tab-active' : 'text-accent-5'
          }`}
        >
          Layout
        </a>
        <div className="flex-1 cursor-default tab tab-lifted"></div>
      </div>

      {tabSel === 0 && (
        <div className="pt-4 px-4 max-w-full w-full mx-auto">
          <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
            <div className="w-full md:w-1/3">
              <Input
                label="Ordem de exibição"
                type="number"
                register={register('order')}
                defaultValue={''}
                notes="Em ordem crescente."
              />
            </div>
            <div className="w-full md:w-2/3">
              <label
                htmlFor=""
                className="text-sm font-semibold px-1"
              >
                Exibir bloco
              </label>
              <div className="flex">
                <div className="w-10 z-10"></div>
                <select
                  {...register('view')}

                  className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                >
                  <option value="show">Sim</option>
                  <option value="hide">Não</option>
                  <option value="sm">Tela Pequena (Celular)</option>
                  <option value="lg">Tela Grande (Desktop e Tablet)</option>
                  <option value="guest">Anônimo (Não conectado)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
            <div className="w-full">
              <Input
                label="Identificação (id) do elemento"
                type="text"
                register={register('anchor')}
                defaultValue={''}
                notes="Caso informado, deve ser único na página. O id é utilizado para criar (âncoras/links) na página."
              />
            </div>
          </div>
        </div>
      )}

      {tabSel === 1 && (
        <div className="pt-4 px-4 max-w-full w-full mx-auto">
          <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
            <div className="w-full md:w-1/2">
              <div className="w-full">
                <label
                  htmlFor=""
                  className="text-sm font-semibold px-1"
                >
                  Espaçamento Horizontal
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('padX')}

                    className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
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
            <div className="w-full md:w-1/2">
              <div className="w-full">
                <label
                  htmlFor=""
                  className="text-sm font-semibold px-1"
                >
                  Espaçamento Vertical
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('padY')}

                    className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
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
          <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
            <div className="w-full md:w-1/2">
              <div className="w-full">
                <label
                  htmlFor=""
                  className="xwtext-sm font-semibold px-1"
                >
                  Background
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('bgMode')}

                    className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="auto">Automático light/dark</option>
                    <option value="transparent">Transparente</option>
                    <option value="custom">Cor</option>
                    <option value="image">Imagem</option>
                    <option value="images">Imagens</option>
                    <option value="bg-accent-0">bg-accent-0</option>
                    <option value="bg-accent-1">bg-accent-1</option>
                    <option value="bg-accent-2">bg-accent-2</option>
                    <option value="bg-accent-3">bg-accent-3</option>
                    <option value="bg-accent-4">bg-accent-4</option>
                    <option value="bg-accent-5">bg-accent-5</option>
                    <option value="bg-accent-6">bg-accent-6</option>
                    <option value="bg-accent-7">bg-accent-7</option>
                    <option value="bg-accent-8">bg-accent-8</option>
                    <option value="bg-accent-9">bg-accent-9</option>
                  </select>
                </div>
              </div>
            </div>
            {watchBgMode === 'custom' && (
              <div className="w-full md:w-1/2 pt-9">
                <InputColor
                  initialValue={`${
                    block.config
                      ? JSON.parse(block.config)['bgColor']
                      : '#fafafa'
                  }`}
                  onChange={setColor}
                  placement="right"
                />
              </div>
            )}
            {watchBgMode === 'images' && (
              <div className="w-full md:w-1/2">
                <Input
                  label="Duração (ms)"
                  type="number"
                  register={register('duration')}
                  defaultValue={5000}
                />
              </div>
            )}
          </div>

          {watchBgMode === 'image' && (
            <div className="mt-4 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="w-full">
                <div className="flex flex-row-reverse w-full">
                  <div className="mt-6 pl-2">
                    <div
                      className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                      onClick={() => onClickItem({ action: 'IMAGES' })}
                    >
                      <Picture className="flex-shrink-0 h-6 w-6" />
                    </div>
                  </div>
                  <div className="w-full">
                    <Input
                      label="URL da imagem"
                      type="text"
                      register={register('bgImage')}
                      defaultValue={''}
                      notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {watchBgMode === 'images' && (
            <div className="mt-4 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
            <div className="w-full md:w-1/2">
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label
                    htmlFor=""
                    className=" text-sm font-semibold px-1"
                  >
                    Pasta da galeria
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('bgFolder')}

                      className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
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
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        <Button type="submit" variant="slim" loading={loading} disabled={false}>
          <Check className="-ml-2 mr-2" />
          Atualizar
        </Button>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
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
    </form>
  )
}
