import { useEffect, useState } from 'react'
import { Mail, Mobile, Phone, QrCode } from 'components/icons'
import { Avatar } from 'components/common'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { formatPhoneNumber } from 'react-phone-number-input'
import { useUI } from 'components/ui/context'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { OrderStatus, PaymentMethods } from 'API'
import cn from 'classnames'
import QRCode from 'react-qr-code'
import { useDeliveryOrder } from 'hooks/useDeliveryOrder'
import NumberFormat from 'react-number-format'
import Preview from './Preview'
import Header from './Header'
import { toast } from 'react-toast'
import { Loading } from 'components/ui'

import Moment from 'moment'

interface PropsCard {
  userID: string
  index: number
  item: any
  onClickItem: any
  handleUpdate: any
  handleDelete: any
  handleSelect: any
  itemSelected: number
  isLast: boolean
  paramsItems: any
}

export default function Card(props: PropsCard) {
  const {
    userID,
    item,
    index,
    onClickItem,
    handleUpdate,
    handleSelect,
    itemSelected,
    handleDelete,
    isLast,
    paramsItems,
  } = props

  const { isSm, isMd } = useBreakPoints()
  const { theme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [showQrCode, setShowQrCode] = useState(false)
  const [deliveryOrder, setDeliveryOrder] = useState({} as any)

  const router = useRouter()
  const { config } = useUI()

  const { listDeliveryByOrder } = useDeliveryOrder()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchDeliveryOrder = async () => {
        setIsLoading(true)
        const { items } = await listDeliveryByOrder({ orderID: item.id })
        if (items.length > 0) {
          setDeliveryOrder(items[0])
        }
        setIsLoading(false)
      }
      if (item && item.id) {
        fetchDeliveryOrder()
      }
    }
    return () => {
      setDeliveryOrder({} as any)
      setIsLoading(true)
    }
  }, [item])

  return !item ? null : (
    <div>
      {!index && (
        <Header index={index} item={item} adminMode={paramsItems.adminMode} />
      )}
      {item.break && (
        <div className={`px-4 mb-4 ${index !== 0 ? 'mt-8' : 'mt-4'}`}>
          <h2 className="tracking-widest text-xs title-font font-medium text-tertiary-2 mb-1">
            DATA
          </h2>
          <h1 className="title-font text-xl font-medium text-accent-9 capitalize">
            {Moment(item.createdAt).format('dddd, DD MMMM YYYY')}
          </h1>
        </div>
      )}
      <div
        key={index}
        className={`select-none px-4 w-full ${
          paramsItems.adminMode && 'lg:pl-8'
        } ${itemSelected === index ? 'py-3 scale-100' : 'py-1 scale-95'} ${
          isLast && 'pb-5'
        } transform transition duration-500 hover:scale-100`}
      >
        <div
          className={cn(
            'px-4 py-4 border-l-4  w-full rounded shadow',
            {
              'bg-accent-0': theme === 'light',
              'bg-accent-1': theme === 'dark',
              'border-orange-500 hover:shadow-lg': item.status === OrderStatus.STANDBY && itemSelected !== index,
              'border-red-500-500 hover:shadow-lg': item.status === OrderStatus.REJECTED && itemSelected !== index,
              'border-green-500 hover:shadow-lg': item.status === OrderStatus.APPROVED && itemSelected !== index,
              'border-violet-500 hover:shadow-lg': item.status === OrderStatus.IN_PREPARATION && itemSelected !== index,
              'border-pink-500 hover:shadow-lg': item.status === OrderStatus.IN_TRANSIT && itemSelected !== index,
              'border-blue-500-500 hover:shadow-lg': item.status === OrderStatus.DELIVERED && itemSelected !== index,
              'border-violet-900 hover:shadow-lg': item.status === OrderStatus.CANCELED && itemSelected !== index,
              'border-orange-500 shadow-lg shadow-orange-500/20': item.status === OrderStatus.STANDBY && itemSelected === index,
              'border-red-500-500 shadow-lg shadow-red-500/20': item.status === OrderStatus.REJECTED && itemSelected === index,
              'border-green-500 shadow-lg shadow-green-500/20': item.status === OrderStatus.APPROVED && itemSelected === index,
              'border-violet-500 shadow-lg shadow-violet-500/20': item.status === OrderStatus.IN_PREPARATION && itemSelected === index,
              'border-pink-500 shadow-lg shadow-pink-500/20': item.status === OrderStatus.IN_TRANSIT && itemSelected === index,
              'border-blue-500-500 shadow-lg shadow-blue-500/20': item.status === OrderStatus.DELIVERED && itemSelected === index,
              'border-violet-900 shadow-lg shadow-violet-500/20': item.status === OrderStatus.CANCELED && itemSelected === index,
            }
          )}
        >
          <div
            className={cn({
              'w-full grid grid-cols-1 lg:grid-cols-2 gap-6':
                paramsItems.adminMode,
              'flex justify-between': !paramsItems.adminMode,
            })}
          >
            {paramsItems.adminMode && (
              <div
                className="cursor-pointer flex items-center"
                onClick={() => {
                  handleSelect(index)
                  setShowQrCode(false)
                }}
              >
                <Avatar
                  avatarKey={item.user ? item.user.avatar : ''}
                  size={itemSelected === index ? (isSm ? 84 : 128) : 64}
                />
                <div className="-mt-1 w-full flex-grow ml-3">
                  <h2 className="capitalize font-semibold text-lg line-clamp-1 text-accent-8">
                    {item.user?.name}
                  </h2>
                  {item.user && <div className="flex flex-col text-accent-7 text-sm">
                    {item.user.email && <div>{item.user.email}</div>}
                    {item.user.phone && (
                      <div>{formatPhoneNumber(item.user.phone as any)}</div>
                    )}
                  </div>}
                </div>
              </div>
            )}

            <div
              className={cn({
                'w-full': !paramsItems.adminMode,
                '-mt-3 lg:mt-0 flex justify-between': paramsItems.adminMode,
              })}
            >
              <div
                onClick={() => {
                  handleSelect(index)
                  setShowQrCode(false)
                }}
                className={cn({
                  'mt-7':
                    !isSm &&
                    !isMd &&
                    itemSelected === index &&
                    paramsItems.adminMode,
                  'my-1 ':
                    !isSm &&
                    !isMd &&
                    itemSelected === index &&
                    !paramsItems.adminMode,
                  'my-1': !isSm && !isMd && itemSelected !== index,
                  'pb-1': isSm || isMd,
                })}
              >
                <div className="cursor-pointer flex flex-col flex-wrap">
                  <div className="break-all font-bold">
                    Pedido # {Moment(item.createdAt).unix()}
                  </div>
                  <div className="flex">
                    <div className="flex mt-1 gap-2 text-sm">
                      <div
                        className={cn('text-white px-1 rounded', {
                          'bg-orange-500': item.status === OrderStatus.STANDBY,
                          'bg-red-500': item.status === OrderStatus.REJECTED,
                          'bg-green-500': item.status === OrderStatus.APPROVED,
                          'bg-violet-500':
                            item.status === OrderStatus.IN_PREPARATION,
                          'bg-pink-500': item.status === OrderStatus.IN_TRANSIT,
                          'bg-blue-500': item.status === OrderStatus.DELIVERED,
                          'bg-violet-900':
                            item.status === OrderStatus.CANCELED,
                        })}
                      >
                        {item.status === OrderStatus.STANDBY && (
                          <span>
                            {(process.env.ORDER_STATUS as any).STANDBY}
                          </span>
                        )}
                        {item.status === OrderStatus.REJECTED && (
                          <span>
                            {(process.env.ORDER_STATUS as any).REJECTED}
                          </span>
                        )}
                        {item.status === OrderStatus.APPROVED && (
                          <span>
                            {(process.env.ORDER_STATUS as any).APPROVED}
                          </span>
                        )}
                        {item.status === OrderStatus.IN_PREPARATION && (
                          <span>
                            {(process.env.ORDER_STATUS as any).IN_PREPARATION}
                          </span>
                        )}
                        {item.status === OrderStatus.IN_TRANSIT && (
                          <span>
                            {(process.env.ORDER_STATUS as any).IN_TRANSIT}
                          </span>
                        )}
                        {item.status === OrderStatus.DELIVERED && (
                          <span>
                            {(process.env.ORDER_STATUS as any).DELIVERED}
                          </span>
                        )}
                        {item.status === OrderStatus.CANCELED && (
                          <span>
                            {(process.env.ORDER_STATUS as any).CANCELED}
                          </span>
                        )}
                      </div>
                    </div>
                    {paramsItems.adminMode &&
                      item.payMethod === PaymentMethods.ONDELIVERY && (
                        <div className="ml-2 flex mt-1 gap-2 text-sm">
                          <div className="bg-red-500 text-white px-1 rounded">
                            NA ENTREGA
                          </div>
                        </div>
                      )}
                  </div>
                  {itemSelected === index && paramsItems.adminMode && (
                    <div className="mt-1 text-accent-7">
                      Recebido em{' '}
                      {Moment(item.createdAt).format('DD MMMM YYYY')} às{' '}
                      {Moment(item.createdAt).format('HH:mm')}
                    </div>
                  )}
                </div>
              </div>
              {paramsItems.adminMode && itemSelected !== index && (
                <div
                  onClick={() => {
                    handleSelect(index)
                    setShowQrCode(false)
                  }}
                  className="flex flex-col justify-center items-end cursor-pointer"
                >
                  {!Moment(item.createdAt).isSame(new Date(), 'day') && (
                    <div className="font-semibold">
                      {Moment(item.createdAt).format('HH:mm')}
                    </div>
                  )}
                  {Moment(item.createdAt).isSame(new Date(), 'day') && (
                    <div className="font-semibold">
                      {Moment(item.createdAt).fromNow()}
                    </div>
                  )}
                  <div className="text-lg font-bold text-red-500">
                    <NumberFormat
                      value={item.total}
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
                </div>
              )}
            </div>

            {!paramsItems.adminMode && (
              <div className="pt-2 flex">
                {config.phoneOrders && (
                  <a
                    href={`tel:${config.phoneOrders.substring(
                      3,
                      config.phoneOrders.length
                    )}`}
                    className="inline z-10 cursor-pointer bg-accent-1 p-2 rounded-full text-red-500"
                  >
                    <Phone />
                  </a>
                )}
                {(item.status === OrderStatus.APPROVED ||
                  item.status === OrderStatus.IN_TRANSIT) && (
                  <a
                    onClick={() => {
                      setShowQrCode(true)
                      handleSelect(index)
                    }}
                    className="ml-3 inline z-10 cursor-pointer bg-accent-1 p-2 rounded-full text-red-500"
                  >
                    <QrCode />
                  </a>
                )}
              </div>
            )}
          </div>

          {isLoading &&
            !paramsItems.adminMode &&
            item.status === OrderStatus.APPROVED && <Loading />}

          {!isLoading &&
            !paramsItems.adminMode &&
            item.status === OrderStatus.STANDBY &&
            item.qrCodePix && (
              <div
                onClick={() => {}}
                className="cursor-pointer w-full p-2 mt-2 bg-accent-1 rounded-md"
              >
                <div className="font-semibold">
                  Para concluir seu pedido faça o pagamento com PIX.
                </div>
                <div className="flex flex-col md:flex-row gap-0 md:gap-4">
                  <div className="basis-full">
                    <a
                      href={item.qrCodePixUrl}
                      target="_blank"
                      className="mt-4 btn btn-block"
                      rel="noreferrer"
                    >
                      Ver QrCode da Chave PIX
                    </a>
                  </div>
                  <div className="basis-full">
                    <button
                      className="mt-4 btn btn-block"
                      onClick={() => {
                        const selBox = document.createElement('textarea')
                        selBox.style.position = 'fixed'
                        selBox.style.left = '0'
                        selBox.style.top = '0'
                        selBox.style.opacity = '0'
                        selBox.value = item.qrCodePix
                        document.body.appendChild(selBox)
                        selBox.focus()
                        selBox.select()
                        document.execCommand('copy')
                        document.body.removeChild(selBox)
                        toast.hideAll()
                        toast.info('Chave PIX copiada com sucesso.')
                      }}
                    >
                      Copiar a chave PIX
                    </button>
                  </div>
                </div>
              </div>
            )}

          {!isLoading &&
            !paramsItems.adminMode &&
            item.status === OrderStatus.APPROVED &&
            !deliveryOrder.date && (
              <div
                onClick={() => {
                  handleSelect(index)
                  setShowQrCode(false)
                }}
                className="w-full p-2 mt-2 bg-accent-1 rounded-md text-blue-500"
              >
                <span>
                  <Spin />
                </span>
                <span className="ml-2 font-semibold">
                  Já recebemos seu pedido, logo seu status será atualizado.
                </span>
              </div>
            )}

          {!isLoading &&
            !paramsItems.adminMode &&
            item.status === OrderStatus.APPROVED &&
            deliveryOrder.date && (
              <div
                onClick={() => {
                  handleSelect(index)
                  setShowQrCode(false)
                }}
                className="w-full p-2 mt-2 bg-accent-1 rounded-md"
              >
                <div className="text-xs">Agendamento da entrega e serviço</div>
                <div className="whitespace-pre-line font-semibold">
                  <span className="capitalize">
                    {Moment(deliveryOrder.date).format('dddd')},{' '}
                  </span>
                  {Moment(deliveryOrder.date).format('DD MMMM YYYY')} às{' '}
                  {Moment(deliveryOrder.date).format('HH:mm')}
                </div>
              </div>
            )}

          {itemSelected === index && !showQrCode && (
            <Preview
              item={item}
              adminMode={paramsItems.adminMode}
              deliveryOrder={deliveryOrder}
              hideDeliveryOrderDate={
                !paramsItems.adminMode &&
                item.status === OrderStatus.APPROVED &&
                deliveryOrder.date
              }
              index={index}
              handleUpdate={handleUpdate}
              handleSelect={handleSelect}
            />
          )}

          {itemSelected === index && showQrCode && (
            <div>
              <div className="pt-4 flex justify-center">
                <QRCode value={item.id} />
              </div>
              <p className="mt-4 text-center">
                Este QrCode poderá ser escaneado pelo profissional responsável
                pela entrega.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Spin() {
  return (
    <svg
      className="animate-spin h-5 w-5 inline"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
