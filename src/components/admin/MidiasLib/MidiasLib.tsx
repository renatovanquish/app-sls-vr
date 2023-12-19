/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useCallback } from 'react'
import { useTheme } from 'next-themes'
import {
  Search,
  Trash,
  FolderOpen,
  Cross,
  Edit,
  Check,
  IconLink,
  Bulb,
  Play,
} from 'components/icons'

import { useDebounce } from 'use-debounce'
import Masonry from 'react-masonry-css'
import { toast } from 'react-toast'
import { useUI } from 'components/ui/context'
import { Modal, Button, FormCard } from 'components/ui'
import { useScreen } from 'hooks/useScreen'
import unsplashApi from 'pages/api/unsplash'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { useMidia } from 'hooks/useMidia'
import { useFolder } from 'hooks/useFolder'
import { useDropzone } from 'react-dropzone'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { v4 as uuidv4 } from 'uuid'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })

interface Props {
  userID: string
  isModal?: boolean
}

export default function MidiaLib(props: Props) {
  const { userID, isModal } = props
  const [tabSel, setTabSel] = useState(0)
  const [loading, setLoading] = useState(false)
  const [overwrite, setOverwrite] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [value] = useDebounce(searchText, 900)
  const [photos, setPhotos] = useState([] as any)
  const [photosS3, setPhotosS3] = useState([] as any)
  const [folderSel, setFolderSel] = useState('')
  const [foldersList, setFoldersList] = useState([] as any)
  const [folderInputMode, setFolderInputMode] = useState(false)
  const { setProgress, openModal, displayModal, closeModal } = useUI()
  const { theme } = useTheme()

  const [midiaId, setMidiaId] = useState('')
  const [midiaKey, setMidiaKey] = useState('')
  const [midiaTitle, setMidiaTitle] = useState('')
  const [midiaSubTitle, setMidiaSubTitle] = useState('')
  const [midiaDescription, setMidiaDescription] = useState('')
  const [midiaLink, setMidiaLink] = useState('')

  const { screenWidth } = useScreen()
  const { isSm, isMd, isLg } = useBreakPoints()

  const { listMidiaByKey, createMidia, updateMidia, deleteMidia } = useMidia()
  const { listFolders, listFoldersByName, createFolder, deleteFolder } =
    useFolder()

  useEffect(() => {
    let isMounted = true
    const searchPhotos = async (e: string) => {
      if (isMounted) {
        setLoading(true)
        unsplashApi.search(e).then((images: any) => {
          setPhotos(images)
          setLoading(false)
        })
      }
    }
    if (value) {
      searchPhotos(value)
    } else {
      searchPhotos([] as any)
    }
    return () => {
      isMounted = false
      searchPhotos([] as any)
    }
  }, [value])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchFoldersList = async () => {
        if (isMounted) {
          const { items } = await listFolders({ limit: 1000 })
          setTabSel(items.length > 0 ? 1 : 3)
          setFoldersList(
            items.sort((a: any, b: any) => a.name.localeCompare(b.name))
          )
        }
      }
      fetchFoldersList()
      setMidiaKey('')
      setMidiaTitle('')
      setMidiaSubTitle('')
      setMidiaDescription('')
      setMidiaLink('')
    }
    return () => {
      isMounted = false
      setFoldersList([] as any)
      setMidiaKey('')
      setMidiaTitle('')
      setMidiaSubTitle('')
      setMidiaDescription('')
      setMidiaLink('')
    }
  }, [])

  const goFolder = async (folder: string) => {
    setPhotosS3([] as any)
    const items = await Storage.list(folder, { level: 'public' })
    const { files } = processStorageList(items)
    setPhotosS3(files)
  }

  const copyLink = async (url: string) => {
    const selBox = document.createElement('textarea')
    selBox.style.position = 'fixed'
    selBox.style.left = '0'
    selBox.style.top = '0'
    selBox.style.opacity = '0'
    selBox.value = url
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)
    toast('Link copiado para área de transferência.', {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const removeFile = async (key: string, i: number) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir? ${key}`,
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
      const newPhotosS3 = photosS3.filter((item: any, index: number) => {
        return index !== i
      })
      setPhotosS3(newPhotosS3)
      await Storage.remove(key, { level: 'public' })

      const midia = await listMidiaByKey({ key, limit: 1 })
      if (midia) {
        await deleteMidia({ id: midia.id })
      }

      if (!newPhotosS3[0] || newPhotosS3.length === 0) {
        const path = key.split('/').slice(0, -1)
        const folderByName = await listFoldersByName({ name: path.join('/') })
        if (folderByName) {
          const newFoldersList = foldersList.filter((item: any) => {
            return item.name !== path.join('/')
          })
          setFoldersList(
            newFoldersList.sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
            )
          )
          await deleteFolder({ id: folderByName.id })
          setFolderSel('')
        }
      }
      toast.hideAll()
      toast('Mídia excluída com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    }
  }

  const onDrop = useCallback(
    async (
      acceptedFiles: any,
      f: string,
      fl: any,
      ov: boolean,
      midiaTitle: string,
      midiaSubTitle: string,
      midiaDescription: string,
      midiaLink: string
    ) => {
      toast.info('Upload iniciado...')

      const path = `${f.substr(0, 1) === '/' ? f.substr(1, f.length) : f}${
        f.substr(-1) !== '/' ? '/' : ''
      }`
        .replace(/\s+/g, '')
        .toLowerCase()

      const sequencial = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY'

      let countUpload = 0
      acceptedFiles.map(async (file: any) => {
        let key = `${path}${file.name}`
        if (ov) {
          const extension = key.split('.').pop()
          const extensionLess = key.split('.').slice(0, -1).join('.')
          const m = await Storage.list(extensionLess, { level: 'public' })
          if (m.length > 0) {
            if (sequencial[m.length - 1]) {
              key = `${extensionLess}${sequencial[m.length - 1]}.${extension}`
            } else {
              key = `${extensionLess}_${uuidv4()}.${extension}`
            }
          }
        }

        await Storage.put(key, file, {
          level: 'public',
          contentType: `${file.type}`,
          progressCallback(progress: any) {
            const { loaded, total } = progress
            const p = ((loaded / total) * 100).toFixed(0)
            setProgress(p)
          },
        })

        if (midiaTitle || midiaSubTitle || midiaDescription || midiaLink) {
          await createMidia({
            key,
            title: midiaTitle,
            subTitle: midiaSubTitle,
            description: midiaDescription,
            link: midiaLink,
          })
        }

        countUpload++
        if (countUpload == acceptedFiles.length) {
          toast.hideAll()
          toast('Upload realizado com sucesso.', {
            backgroundColor: '#263238',
            color: '#fff',
          })

          const name = path.slice(0, -1)

          let exists = false
          for (let i = 0; i < fl.length; i++) {
            if (fl[i].name === name) {
              exists = true
            }
          }

          if (!exists) {
            setFoldersList(fl.concat({ name }))
            const folderExists = await listFoldersByName({ name })
            if (!folderExists) {
              await createFolder({ name })
            }
          }

          setFolderSel(name)
          setTabSel(1)
          goFolder(name)
        }
      })
    },
    []
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': [],
    },
    onDrop: (droppedFiles) =>
      onDrop(
        droppedFiles,
        folderSel,
        foldersList,
        overwrite,
        midiaTitle,
        midiaSubTitle,
        midiaDescription,
        midiaLink
      ),
  })

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  const getMidia = async (key: string) => {
    const midia = await listMidiaByKey({
      key,
      limit: 1,
    })
    setMidiaKey(key)
    setMidiaId(midia && midia.id ? midia.id : '')
    setMidiaTitle(midia && midia.title ? midia.title : '')
    setMidiaSubTitle(midia && midia.subTitle ? midia.subTitle : '')
    setMidiaDescription(midia && midia.description ? midia.description : '')
    setMidiaLink(midia && midia.link ? midia.link : '')
    openModal()
  }

  const getIdentifyText = async (key: string) => {
    console.log(key)
  }

  const handleUpdate = async () => {
    closeModal()
    if (midiaId) {
      await updateMidia({
        id: midiaId,
        key: midiaKey,
        title: midiaTitle,
        subTitle: midiaSubTitle,
        description: midiaDescription,
        link: midiaLink,
      })
      setMidiaKey('')
      setMidiaTitle('')
      setMidiaSubTitle('')
      setMidiaDescription('')
      setMidiaLink('')
    } else {
      await createMidia({
        key: midiaKey,
        title: midiaTitle,
        subTitle: midiaSubTitle,
        description: midiaDescription,
        link: midiaLink,
      })
      setMidiaKey('')
      setMidiaTitle('')
      setMidiaSubTitle('')
      setMidiaDescription('')
      setMidiaLink('')
    }
    toast('Mídia atualizada com sucesso.', {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const handleCheckboxChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    if (target.name === 'overwrite') {
      setOverwrite(value)
    }
  }

  return !userID ? (
    <></>
  ) : (
    <div>
      <FormCard
        title="Galeria de Mídias"
        description="Aqui você pode gerenciar suas mídias."
      >
        <div className="mt-4 tabs">
          <a
            onClick={() => setTabSel(1)}
            className={`tab tab-lifted ${tabSel === 1 && 'tab-active'}`}
          >
            Minhas Mídias
          </a>
          <a
            onClick={() => {
              setTabSel(2)
              setFolderInputMode(false)
              setMidiaKey('')
              setMidiaTitle('')
              setMidiaSubTitle('')
              setMidiaDescription('')
              setMidiaLink('')
            }}
            className={`tab tab-lifted ${tabSel === 2 && 'tab-active'}`}
          >
            Upload
          </a>
          <a
            onClick={() => {
              setTabSel(4)
              setFolderInputMode(false)
              setMidiaKey('')
              setMidiaTitle('')
              setMidiaSubTitle('')
              setMidiaDescription('')
              setMidiaLink('')
            }}
            className={`tab tab-lifted ${tabSel === 4 && 'tab-active'}`}
          >
            Upload com Dados
          </a>
          <a
            onClick={() => setTabSel(3)}
            className={`cursor-pointer tab tab-lifted ${
              tabSel === 3 && 'tab-active'
            }`}
          >
            Pesquisar
          </a>
          <div className="flex-1 cursor-default tab tab-lifted"></div>
        </div>

        {tabSel === 1 && (
          <div className="py-3">
            {foldersList.length === 0 && (
              <div className="alert">
                <div className="flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#2196f3"
                    className="w-6 h-6 mx-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <label>Nenhuma mídia disponível na sua galeria.</label>
                </div>
              </div>
            )}
            {foldersList.length > 0 && (
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <FolderOpen />
                </div>
                <select
                  className="pl-10 py-2 bg-accent-1 w-full -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  value={folderSel}
                  onChange={(e: any) => {
                    const folder = e.target.value
                    if (folder) {
                      setFolderSel(folder)
                      goFolder(folder)
                    } else {
                      setFolderSel('')
                      setPhotosS3([] as any)
                    }
                  }}
                >
                  <option value="">Selecione uma pasta</option>
                  {foldersList.map((f: any, index: number) => (
                    <option key={index} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {photosS3.length > 0 && (
              <div>
                <div className="px-1 py-3 text-accent-6 text-sm">
                  Clique na imagem para copiar seu link para a área de
                  transferência.
                </div>
                <div className="flex flex-col">
                  {photosS3.map(
                    (photo: any, index: number) =>
                      photo &&
                      photo.key.indexOf('.DS_Store') == -1 && (
                        <div key={index} className="py-2 flex px-3">
                          <div className="cursor-pointer">
                            <div className="avatar">
                              <div className="rounded-box w-32 h-32 ring ring-accent-3 ring-offset-base-100 ring-offset-2">
                                {photo.key.toLowerCase().substr(-4) !==
                                  '.mp4' && (
                                  <S3ImageShow
                                    PhotoKey={photo.key}
                                    copyLink={copyLink}
                                  />
                                )}
                                {photo.key.toLowerCase().substr(-4) ===
                                  '.mp4' && <Play className="mt-12 ml-14" />}
                              </div>
                            </div>
                          </div>
                          <div className="ml-5 w-full flex flex-col">
                            <div className="text-semibold breadcrumbs">
                              <ul>
                                {photo.key
                                  .split('/')
                                  .map((f: string, idx: number) => (
                                    <li key={idx}>{f}</li>
                                  ))}
                              </ul>
                            </div>
                            <div className="badge badge-sm">
                              {formatBytes(photo.size)}
                            </div>
                            <div className="mt-5 flex">
                              <a
                                onClick={() =>
                                  copyLink(
                                    `${process.env.MIDIA_CLOUDFRONT}${photo.key}`
                                  )
                                }
                                className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                              >
                                <IconLink />
                              </a>
                              <a
                                onClick={() => removeFile(photo.key, index)}
                                className="ml-3 z-10 cursor-pointer text-red-500 bg-accent-1 p-2 rounded-full flex items-center justify-center"
                              >
                                <Trash />
                              </a>
                              <a
                                onClick={() => getMidia(photo.key)}
                                className="ml-3 z-10 cursor-pointer text-blue-500 bg-accent-1 p-2 rounded-full flex items-center justify-center"
                              >
                                <Edit />
                              </a>
                              {false && (
                                <a
                                  onClick={() => getIdentifyText(photo.key)}
                                  className="ml-3 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                                >
                                  <Bulb />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {tabSel === 2 && (
          <div className="my-3">
            {(foldersList.length === 0 || folderInputMode) && (
              <div>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <FolderOpen />
                  </div>
                  <input
                    className="pl-10 py-2 bg-accent-1 w-full -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    onChange={(e: any) => {
                      setFolderSel(e.target.value)
                      setPhotosS3([] as any)
                    }}
                    placeholder="Informe do nome da nova pasta"
                    defaultValue={folderSel}
                  />
                  <div
                    onClick={() => setFolderInputMode(false)}
                    className="z-100 cursor-pointer w-10 pl-1 text-center flex items-center justify-center"
                  >
                    <Cross />
                  </div>
                </div>
                <div className="pt-2 text-accent-6 text-sm">
                  Utilize pastas para organizar suas mídias. Não use espaços,
                  acentos ou caracteres especiais.
                </div>
              </div>
            )}
            {foldersList.length > 0 && !folderInputMode && (
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <FolderOpen />
                </div>
                <select
                  className="pl-10 py-2 bg-accent-1 w-full -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  value={folderSel}
                  onChange={(e: any) => {
                    const folder = e.target.value
                    if (folder === 'CREATE_FOLDER') {
                      setFolderInputMode(true)
                      setFolderSel('')
                    } else if (folder !== '') {
                      setFolderInputMode(false)
                      setFolderSel(folder)
                    }
                  }}
                >
                  <option value="">Selecione uma pasta</option>
                  <option value="CREATE_FOLDER">Criar uma nova pasta</option>
                  {foldersList.map((f: any, index: number) => (
                    <option key={index} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {folderSel && (
              <div className="mt-3 w-full">
                <div
                  {...getRootProps()}
                  className="bg-accent-2 cursor-pointer mt-1 flex justify-center px-6 pt-6 pb-8 border-2 border-accent-5 border-dashed rounded-md"
                >
                  <input {...getInputProps()} />
                  <p className="text-black text-lg">
                    Arrastar e soltar o(s) arquivo(s) aqui ou <a>clique</a> para
                    selecionar...
                  </p>
                </div>
                <div className="mt-4 flex items-start">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="overwrite"
                      name="overwrite"
                      checked={overwrite}
                      onChange={handleCheckboxChange}
                      className="checkbox"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="overwrite"
                      className="font-medium text-accent-9 text-lg"
                    >
                      Não sobrepor mídias existentes.
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tabSel === 3 && (
          <div className="py-3">
            <div className="cursor-default relative flex items-center justify-center text-base w-full transition-colors duration-150">
              <label className="hidden" htmlFor="SearchImages">
                Search
              </label>
              <input
                id="SearchImages"
                className="bg-accent-1 rounded-full px-3 py-2 outline-none appearance-none w-full transition duration-150 ease-in-out"
                autoComplete="off"
                placeholder="Pesquisar no Unsplash..."
                onChange={(e) => {
                  const q = e.currentTarget.value
                  setSearchText(q)
                }}
              />
              <div className="text-accent-7 absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search />
              </div>
            </div>
            {photos.length === 0 && (
              <div className="px-1 pt-2 pb-3 text-accent-6 text-sm">
                Use palavras-chaves preferencialmente em inglês.
              </div>
            )}
            {photos.length > 0 && (
              <div className="px-1 pt-2 pb-3 text-accent-6 text-sm">
                Clique na imagem para copiar seu link para a área de
                transferência.
              </div>
            )}

            {loading && (
              <div className="text-sm my-4 text-accent-7">Carregando...</div>
            )}

            <section className="images">
              <Masonry
                breakpointCols={isSm ? 1 : isMd ? 2 : isLg ? 3 : 4}
                className="gallery-grid"
                columnClassName="gallery-grid_column"
              >
                {photos.map((image: any, i: number) => (
                  <div key={i} className="ImageResult">
                    <img
                      onClick={() => copyLink(image.urls.regular)}
                      className="cursor-pointer shadow"
                      key={image.id}
                      src={image.urls.regular}
                      alt=""
                    />
                  </div>
                ))}
              </Masonry>
            </section>
          </div>
        )}

        {tabSel === 4 && (
          <div className="my-3">
            {(foldersList.length === 0 || folderInputMode) && (
              <div>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <FolderOpen />
                  </div>
                  <input
                    className="pl-10 py-2 bg-accent-1 w-full -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    onChange={(e: any) => {
                      setFolderSel(e.target.value)
                      setPhotosS3([] as any)
                    }}
                    placeholder="Informe do nome da nova pasta"
                    defaultValue={folderSel}
                  />
                  <div
                    onClick={() => setFolderInputMode(false)}
                    className="z-100 cursor-pointer w-10 pl-1 text-center flex items-center justify-center"
                  >
                    <Cross />
                  </div>
                </div>
                <div className="pt-2 text-accent-6 text-sm">
                  Utilize pastas para organizar suas mídias. Não use espaços,
                  acentos ou caracteres especiais.
                </div>
              </div>
            )}
            {foldersList.length > 0 && !folderInputMode && (
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <FolderOpen />
                </div>
                <select
                  className="pl-10 py-2 bg-accent-1 w-full -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  value={folderSel}
                  onChange={(e: any) => {
                    const folder = e.target.value
                    if (folder === 'CREATE_FOLDER') {
                      setFolderInputMode(true)
                      setFolderSel('')
                    } else if (folder !== '') {
                      setFolderInputMode(false)
                      setFolderSel(folder)
                    }
                  }}
                >
                  <option value="">Selecione uma pasta</option>
                  <option value="CREATE_FOLDER">Criar uma nova pasta</option>
                  {foldersList.map((f: any, index: number) => (
                    <option key={index} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {folderSel && (
              <div className="mt-3 w-full">
                <div className="mb-2 text-2xl text-accent-9 font-semibold">
                  Dados da mídia
                </div>
                <div className="mt-3">
                  <label className="text-accent-7 text-sm font-semibold px-1">
                    Título
                  </label>
                  <input
                    className="pl-2 py-2 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    onChange={(e: any) => {
                      setMidiaTitle(e.target.value)
                    }}
                    defaultValue={midiaTitle}
                  />
                </div>
                <div className="mt-3">
                  <label className="text-accent-7 text-sm font-semibold px-1">
                    Sub-título
                  </label>
                  <input
                    className="pl-2 py-2 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    onChange={(e: any) => {
                      setMidiaSubTitle(e.target.value)
                    }}
                    defaultValue={midiaSubTitle}
                  />
                </div>
                <div className="mt-3">
                  <label className=" text-accent-7 text-sm font-semibold px-1">
                    Descrição
                  </label>
                  <textarea
                    className="pl-2 py-2 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    onChange={(e: any) => {
                      setMidiaDescription(e.target.value)
                    }}
                    defaultValue={midiaDescription}
                  />
                </div>
                <div className="mt-1 mb-4">
                  <label className="text-accent-7 text-sm font-semibold px-1">
                    Link para redirecionamento
                  </label>
                  <input
                    className="pl-2 py-2 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    onChange={(e: any) => {
                      setMidiaLink(e.target.value)
                    }}
                    defaultValue={midiaLink}
                  />
                </div>
                <div
                  {...getRootProps()}
                  className="bg-accent-2 cursor-pointer mt-1 flex justify-center px-6 pt-6 pb-8 border-2 border-accent-5 border-dashed rounded-md"
                >
                  <input {...getInputProps()} />
                  <p className="text-black text-lg">
                    Arrastar e soltar o arquivo aqui ou <a>clique</a> para
                    selecionar...
                  </p>
                </div>
                <div className="mt-4 flex items-start">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="overwrite"
                      name="overwrite"
                      checked={overwrite}
                      onChange={handleCheckboxChange}
                      className="checkbox"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="overwrite"
                      className="font-medium text-accent-9 text-lg"
                    >
                      Não sobrepor mídias existentes.
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </FormCard>
      <Modal
        open={displayModal && midiaKey}
        onClose={closeModal}
        focusTrap={false}
        absolute={true}
      >
        <div
          className="p-4 flex flex-col"
          style={{
            width: screenWidth * 0.6,
          }}
        >
          <div className="mb-2 text-2xl text-accent-9 font-semibold">
            Dados da mídia
          </div>
          <div className="mt-3">
            <label className="text-accent-7 text-sm font-semibold px-1">
              Título
            </label>
            <input
              className="pl-2 py-2 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
              onChange={(e: any) => {
                setMidiaTitle(e.target.value)
              }}
              defaultValue={midiaTitle}
            />
          </div>
          <div className="mt-3">
            <label className="text-accent-7 text-sm font-semibold px-1">
              Sub-título
            </label>
            <input
              className="pl-2 py-2 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
              onChange={(e: any) => {
                setMidiaSubTitle(e.target.value)
              }}
              defaultValue={midiaSubTitle}
            />
          </div>
          <div className="mt-3">
            <label className=" text-accent-7 text-sm font-semibold px-1">
              Descrição
            </label>
            <textarea
              className="pl-2 py-2 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
              onChange={(e: any) => {
                setMidiaDescription(e.target.value)
              }}
              defaultValue={midiaDescription}
            />
          </div>
          <div className="mt-1">
            <label className="text-accent-7 text-sm font-semibold px-1">
              Link para redirecionamento
            </label>
            <input
              className="pl-2 py-2 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
              onChange={(e: any) => {
                setMidiaLink(e.target.value)
              }}
              defaultValue={midiaLink}
            />
          </div>
          <div>
            <div className="mt-6">
              <Button
                type="button"
                variant="slim"
                onClick={() => handleUpdate()}
              >
                <Check className="-ml-2 mr-2" />
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

interface S3ImageShowProps {
  PhotoKey: string
  copyLink: any
}

function S3ImageShow(props: S3ImageShowProps) {
  const { PhotoKey, copyLink } = props
  const [url, setUrl] = useState('')

  useEffect(() => {
    let isMounted = true
    const GetPhoto = async () => {
      if (isMounted) {
        const signedURL = await Storage.get(PhotoKey, { level: 'public' })
        setUrl(signedURL)
      }
    }
    GetPhoto()
    return () => {
      isMounted = false
      setUrl('')
    }
  }, [PhotoKey])

  return (
    <img
      alt=""
      src={url}
      onClick={() => copyLink(`${process.env.MIDIA_CLOUDFRONT}${PhotoKey}`)}
    />
  )
}

function processStorageList(result: any) {
  const files: any[] = []
  const folders: any[] = []
  result.forEach((res: any) => {
    if (res.size) {
      files.push(res)
      const possibleFolder = res.key.split('/').slice(0, -1).join('/')
      if (possibleFolder && folders.indexOf(possibleFolder) === -1) {
        folders.push(possibleFolder)
      }
    } else {
      folders.push(res.key)
    }
  })
  return { files, folders }
}

/*
function processStorageList2(result: any) {
  const filesystem = {}
  // https://stackoverflow.com/questions/44759750/how-can-i-create-a-nested-object-representation-of-a-folder-structure
  const add = (source: string, target: { [x: string]: any }, item: any) => {
    const elements = source.split('/')
    const element = elements.shift()
    if (!element) return // blank
    target[element] = target[element] || { __data: item } // element;
    if (elements.length) {
      target[element] =
        typeof target[element] === 'object' ? target[element] : {}
      add(elements.join('/'), target[element], item)
    }
  }
  result.forEach((item: { key: any }) => add(item.key, filesystem, item))
  return filesystem
}
*/
