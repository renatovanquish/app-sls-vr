/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Info, Trash, Like, Dislike } from 'components/icons'
import cn from 'classnames'
import { Loading, Modal } from 'components/ui'
import Image from 'next/image'
import { useScreen } from 'hooks/useScreen'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'
import { useDataBase } from 'hooks/useDataBase'
import { DataBaseItemStatus } from 'API'
import NumberFormat from 'react-number-format'
import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })
import { formatPhoneNumber } from 'react-phone-number-input'

interface Props {
  block: any
  user: any
}

export default function View(props: Props) {
  const { block, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const router = useRouter()

  useEffect(() => {
    if (block && block.config) {
      const configParse = JSON.parse(block.config)
      setConfig(configParse)
    }
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setContent(contentParse)
    }
    return () => {
      setConfig({} as any)
      setContent({} as any)
    }
  }, [block])

  const [isLoading, setIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [tabSel, setTabSel] = useState(0)
  const [itemsStandby, setItemsStandby] = useState<any[]>([])
  const [itemsApproved, setItemsApproved] = useState<any[]>([])
  const [myItems, setMyItems] = useState<any[]>([])

  const {
    listItemsByDataBaseCreatedAt,
    listItemsByUserCreatedAt,
    deleteDataBaseItem,
    updateDataBaseItem,
  } = useDataBase()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchItems = async () => {
        const { items, nextToken } = await listItemsByDataBaseCreatedAt({
          dataBaseID: content.dataBase,
          limit: 100,
        })
        items.map((i: any) => {
          if (i.status === DataBaseItemStatus.STANDBY) {
            setItemsStandby((itemsStandby: any) => [...itemsStandby, i])
          } else if (i.status === DataBaseItemStatus.APPROVED) {
            setItemsApproved((itemsApproved: any) => [...itemsApproved, i])
          }
        })
        setIsLoading(false)
      }
      if (content.dataBase) {
        setItemsStandby([] as any)
        setItemsApproved([] as any)
        setIsLoading(true)
        fetchItems()
      }
    }
    return () => {
      isMounted = false
      setItemsStandby([] as any)
      setItemsApproved([] as any)
      setIsLoading(true)
    }
  }, [content])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchItemsByUser = async () => {
        const { items } = await listItemsByUserCreatedAt({
          userID: user.id,
        })
        items.map((i: any) => {
          if (i.dataBaseID === content.dataBase) {
            setMyItems((myItems: any) => [...myItems, i])
          }
        })
        setIsLoading2(false)
      }
      if (user && user.id && content.dataBase) {
        setMyItems([] as any)
        setIsLoading2(true)
        fetchItemsByUser()
      }
    }
    return () => {
      isMounted = false
      setMyItems([] as any)
      setIsLoading2(true)
    }
  }, [user, content])

  const onClickDelete = (item: any, title: string) => {
    openActionSheetDelete(item, title)
  }

  const openActionSheetDelete = async (item: any, title: string) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir? : ${title}`,
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
      setMyItems(
        myItems.map((itm: any, index: number) => {
          if (itm && itm.id !== item.id) {
            return itm
          }
        })
      )
      setItemsApproved(
        itemsApproved.map((itm: any, index: number) => {
          if (itm && itm.id !== item.id) {
            return itm
          }
        })
      )
      setItemsStandby(
        itemsStandby.map((itm: any, index: number) => {
          if (itm && itm.id !== item.id) {
            return itm
          }
        })
      )
      await deleteDataBaseItem({ id: item.id })
      const data = JSON.parse(item.data)
      data.map((l: any, i: number) => {
        l.fields.map(async (f: any, i2: number) => {
          if (f.type === 'image' && f.fileName) {
            await Storage.remove(f.fileName, { level: 'public' })
          }
        })
      })
      toast('Exclusão realizada com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    }
  }

  const onClickReview = (item: any, title: string, approve: boolean) => {
    openActionSheetReview(item, title, approve)
  }

  const openActionSheetReview = async (
    item: any,
    title: string,
    approve: boolean
  ) => {
    const promptRet = await ActionSheet.showActions({
      title: approve
        ? `Confirma APROVAR? : ${title}`
        : `Confirma REPROVAR? : ${title}`,
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
      await updateDataBaseItem({
        id: item.id,
        status: approve
          ? DataBaseItemStatus.APPROVED
          : DataBaseItemStatus.REJECTED,
      })
      setItemsStandby(
        itemsStandby.map((itm: any, index: number) => {
          if (itm && itm.id !== item.id) {
            return itm
          }
        })
      )
      if (approve) {
        setItemsApproved((itemsApproved: any) => [...itemsApproved, item])
      }
      toast(
        approve ? 'Item aprovado com sucesso.' : 'Item reprovado com sucesso.',
        {
          backgroundColor: '#263238',
          color: '#fff',
        }
      )
    }
  }

  return (
    <div
      className={cn({
        ['hidden']: config.view === 'hide' || (config.view === 'guest' && user),
        ['md:hidden']: config.view === 'sm',
        ['hidden md:block']: config.view === 'lg',
        ['px-0']: config.padX && config.padX === 'none',
        ['px-4']: !config.padX || config.padX === 'small',
        ['px-8']: config.padX && config.padX === 'normal',
        ['px-12']: config.padX && config.padX === 'large',
        ['px-24']: config.padX && config.padX === 'extra',
        ['py-0']: config.padY && config.padY === 'none',
        ['py-4']: !config.padY || config.padY === 'small',
        ['py-8']: config.padY && config.padY === 'normal',
        ['py-12']: config.padY && config.padY === 'large',
        ['py-24']: config.padY && config.padY === 'extra',
        ['bg-accent-1']: config.bgMode === 'auto',
        ['bg-local']: config.bgMode === 'image',
      })}
      style={{
        backgroundColor: config.bgMode === 'custom' && config.bgColor ? config.bgColor : null,
        backgroundImage: config.bgMode === 'image' ? `url(${config.bgImage})` : '',
        backgroundRepeat: config.bgMode === 'image' ? 'no-repeat' : '',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >{config.anchor && <a id={`${config.anchor}`}></a>}
      {user && user.id && (
        <div className="tabs">
          <div className="flex-1 cursor-default tab tab-lifted"></div>
          <a
            onClick={() => setTabSel(0)}
            className={`tab tab-lifted ${tabSel === 0 && 'tab-active'}`}
          >
            Anúncios
          </a>
          <a
            onClick={() => setTabSel(1)}
            className={`tab tab-lifted ${tabSel === 1 && 'tab-active'}`}
          >
            Seus Anúncios
          </a>
          {user.isAdmin && (
            <a
              onClick={() => setTabSel(2)}
              className={`tab tab-lifted ${tabSel === 2 && 'tab-active'}`}
            >
              Anúncios Pendentes
            </a>
          )}
          <div className="flex-1 cursor-default tab tab-lifted"></div>
        </div>
      )}

      <div className="p-4 bg-accent-0">
        {tabSel === 0 && (
          <div className="">
            {isLoading && <Loading />}
            {!isLoading && itemsApproved.length === 0 && (
              <div className="alert alert-success">
                <div className="flex-1">
                  <Info />
                  <label className="ml-2">Nenhum anuncio por aqui.</label>
                </div>
              </div>
            )}
            {!isLoading && itemsApproved.length > 0 && (
              <div className="flex flex-row justify-center gap-10 mx-auto flex-wrap">
                {itemsApproved.map((item: any, idx: number) => (
                  <Card key={idx} item={item} />
                ))}
              </div>
            )}
          </div>
        )}

        {tabSel === 1 && (
          <div className="">
            {isLoading2 && <Loading />}
            {!isLoading && myItems.length === 0 && (
              <div className="alert alert-success">
                <div className="flex-1">
                  <Info />
                  <label className="ml-2">
                    Você ainda não publicou nenhum anuncio.
                  </label>
                </div>
              </div>
            )}
            {!isLoading && myItems.length > 0 && (
              <div className="flex flex-row justify-center gap-10 mx-auto flex-wrap">
                {myItems.map((item: any, idx: number) => (
                  <Card
                    key={idx}
                    item={item}
                    showStatus={true}
                    showDelete={true}
                    onClickDelete={onClickDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {tabSel === 2 && (
          <div className="">
            {isLoading && <Loading />}
            {!isLoading && itemsStandby.length === 0 && (
              <div className="alert alert-success">
                <div className="flex-1">
                  <Info />
                  <label className="ml-2">
                    Nenhum anuncio pendente por aqui.
                  </label>
                </div>
              </div>
            )}
            {!isLoading && itemsStandby.length > 0 && (
              <div className="flex flex-row justify-center gap-10 mx-auto flex-wrap">
                {itemsStandby.map((item: any, idx: number) => (
                  <Card
                    key={idx}
                    item={item}
                    showStatus={true}
                    showReview={true}
                    onClickReview={onClickReview}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface CardProps {
  item: any
  showStatus?: boolean
  showDelete?: boolean
  showReview?: boolean
  onClickDelete?: any
  onClickReview?: any
}

export function Card(props: CardProps) {
  const {
    item,
    showStatus,
    showDelete,
    onClickDelete,
    showReview,
    onClickReview,
  } = props
  const [title, setTitle] = useState('')
  const [photo, setPhoto] = useState('')
  const [data, setData] = useState([] as any)
  const [photos, setPhotos] = useState([] as any)
  const [showModal, setShowModal] = useState(false)
  const { screenHeight, screenWidth } = useScreen()

  useEffect(() => {
    let isMounted = true
    if (isMounted && item) {
      const data = JSON.parse(item.data)
      setData(data)
      let t = ''
      let p = ''
      data.map((l: any, i: number) => {
        l.fields.map((f: any, i2: number) => {
          if (i === 0 && i2 === 0) {
            t = f.value
          }
          if (i === 0 && i2 === 1) {
            t = t + ' ' + f.value
          }

          if (!p && f.type === 'image' && f.link) {
            p = f.link
          }

          if (f.type === 'image' && f.link) {
            setPhotos((photos: any) => [...photos, f.link])
          }
        })
      })
      setTitle(t)
      setPhoto(p)
    }
    return () => {
      isMounted = false
      setTitle('')
      setPhoto('')
      setData({} as any)
      setPhotos([] as any)
    }
  }, [item])

  return item ? (
    <div className="2xl:basis-1/6 xl:basis-1/5 lg:basis-1/4 rounded-lg shadow">
      <div className="cursor-pointer">
        <div
          className="relative h-56 w-full bg-accent-1 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <Image
            alt={item.name}
            className="object-cover object-center rounded-t-lg"
            src={photo ? photo : '/images/no_photo.png'}
            layout="fill"
          />
        </div>
        <div className="p-4">
          <div className="text-lg font-semibold capitalize">{title}</div>
          <div className="text-red-500 font-semibold">
            Clique para mais detalhes
          </div>
          {showStatus && (
            <div
              className={cn('badge', {
                'badge-accent': item.status === DataBaseItemStatus.APPROVED,
                'badge-secondary': item.status === DataBaseItemStatus.REJECTED,
                'badge-neutral': item.status === DataBaseItemStatus.STANDBY,
              })}
            >
              {item.status === DataBaseItemStatus.APPROVED && (
                <span>Publicado</span>
              )}
              {item.status === DataBaseItemStatus.REJECTED && (
                <span>Rejeitado</span>
              )}
              {item.status === DataBaseItemStatus.STANDBY && (
                <span>Aguardando Revisão</span>
              )}
            </div>
          )}
          {(showDelete || showReview) && (
            <div className="mt-4">
              {showDelete && (
                <button
                  className="text-red-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  onClick={() => onClickDelete(item, title)}
                >
                  <Trash />
                </button>
              )}
              {showReview && (
                <div className="flex">
                  <button
                    className="mr-2 text-green z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                    onClick={() => onClickReview(item, title, true)}
                  >
                    <Like />
                  </button>
                  <button
                    className="text-red-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                    onClick={() => onClickReview(item, title, false)}
                  >
                    <Dislike />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => {
            setShowModal(false)
          }}
          focusTrap={false}
          fullSize={true}
          title=""
        >
          <div
            style={{
              overflowY: 'auto',
              width: screenWidth,
              height: screenHeight,
            }}
          >
            <Preview data={data} photos={photos} user={item.user} />
          </div>
        </Modal>
      )}
    </div>
  ) : (
    <div></div>
  )
}

interface PreviewProps {
  data: any
  photos: any
  user: any
}

export function Preview(props: PreviewProps) {
  const { data, photos, user } = props
  const { screenHeight, screenWidth } = useScreen()
  return (
    <div className="p-4 overflow-y-auto">
      <div className="pb-4 w-full carousel">
        {photos.map((link: string, idxLine: number) => (
          <div
            key={`slide${idxLine}`}
            id={`slide${idxLine}`}
            className="relative w-full carousel-item justify-center"
          >
            <img
              style={{
                maxWidth: screenWidth * 0.6,
                maxHeight: screenHeight * 0.6,
              }}
              alt=""
              src={link}
              className="shadow-lg bg-accent-0 p-2"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={`#slide${idxLine - 1}`} className="btn btn-circle">
                ❮
              </a>
              <a href={`#slide${idxLine + 1}`} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>

      {data.map((line: any, idxLine: number) => (
        <div key={`l${idxLine}`} className="flex flex-col sm:flex-row w-full ">
          {line &&
            line.fields &&
            line.fields.map(
              (field: any, idxField: number) =>
                field.type !== 'image' && (
                  <div
                    key={`f${idxField}`}
                    className={`mt-4 w-full md:basis-${field.size}/12`}
                  >
                    {field.name && (
                      <div className="text-base">{field.name}</div>
                    )}
                    {!field.value && (
                      <div className="text-accent-9 text-lg ">
                        {!field.type && <span>Não informado</span>}
                      </div>
                    )}
                    {field.value && field.type === 'currency' && (
                      <div className="text-accent-9 text-lg font-semibold">
                        <NumberFormat
                          value={field.value}
                          thousandsGroupStyle="thousand"
                          prefix="R$ "
                          thousandSeparator={'.'}
                          decimalSeparator={','}
                          displayType="text"
                          allowNegative={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </div>
                    )}
                    {field.value && field.type !== 'currency' && (
                      <div className="text-accent-9 text-lg font-semibold">
                        {field.value.toString()}
                      </div>
                    )}
                  </div>
                )
            )}
        </div>
      ))}

      <div className="mt-4">
        Nome do contato: <span className="font-semibold">{user.name}</span>
      </div>
      <div>
        Email: <span className="font-semibold">{user.email}</span>
      </div>
      <div className="pb-40">
        Telefone:{' '}
        <span className="font-semibold">
          {formatPhoneNumber(user.phone as any)}
        </span>
      </div>
    </div>
  )
}
