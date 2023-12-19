import { useEffect, useState, useRef } from 'react'
import { Info, Mobile, Print, Search, Person } from 'components/icons'
import { Avatar } from 'components/common'
import NumberFormat from 'react-number-format'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { formatPhoneNumber } from 'react-phone-number-input'
import cn from 'classnames'
import { OrderStatus, PaymentMethods } from 'API'
import { useOrder } from 'hooks/useOrder'
import { useScreen } from 'hooks/useScreen'
import { Modal } from 'components/ui'
import { PrintOrder } from './Print'
import { useReactToPrint } from 'react-to-print'
import Link from 'next/link'

import Moment from 'moment'

interface PreviewProps {
  item: any
  adminMode: boolean
  hideDeliveryOrder?: boolean
  hideDeliveryOrderDate?: boolean
  hideAddress?: boolean
  hideCoupon?: boolean
  hideValues?: boolean
  deliveryOrder?: any
  handleUpdate?: any
  index?: number
  handleSelect: any
}

export default function Preview(props: PreviewProps) {
  const {
    item,
    adminMode,
    hideDeliveryOrder,
    hideAddress,
    hideCoupon,
    hideValues,
    deliveryOrder,
    hideDeliveryOrderDate,
    handleUpdate,
    index,
    handleSelect,
  } = props
  const { isSm, isMd } = useBreakPoints()

  const [itemOrder, setItemOrder] = useState({} as any)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setItemOrder(item)
    }
    return () => {
      setItemOrder({} as any)
    }
  }, [item])

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current as any,
  })

  const [displayModal, setDisplayModal] = useState(false)
  const { screenHeight } = useScreen()

  return (
    <div className="overflow-x-auto">
      <div
        onClick={() => {
          handleSelect(index)
        }}
      >
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {!hideAddress && (
            <div>
              <div className="text-lg font-semibold text-accent-9">
                Endereço da entrega
              </div>
              <div className="whitespace-pre-line text-accent-7">
                {itemOrder.addressStreet}
                {itemOrder.addressNumber && (
                  <span>, {itemOrder.addressNumber}</span>
                )}
                {itemOrder.addressComplement && (
                  <span>, {itemOrder.addressComplement}</span>
                )}
                <br />
                CEP {itemOrder.addressZipcode}
                {itemOrder.addressNeighborhood && (
                  <span>, {itemOrder.addressNeighborhood}</span>
                )}
                <br />
                {itemOrder.addressCity && <span>{itemOrder.addressCity}</span>}
                {itemOrder.addressState && (
                  <span>, {itemOrder.addressState}</span>
                )}
                {itemOrder.addressCountry && (
                  <span>, {itemOrder.addressCountry}</span>
                )}
              </div>
              {itemOrder.addressReference && (
                <div className="text-accent-7">
                  <Info width={16} height={16} /> {itemOrder.addressReference}
                </div>
              )}
            </div>
          )}
          {!hideCoupon && itemOrder.couponDiscount > 0 && (
            <div>
              <div className="text-lg font-semibold text-accent-9">
                Cupom de desconto
              </div>
              <div className="text-accent-7">{itemOrder.couponName}</div>
              <div className="text-accent-7">
                <NumberFormat
                  value={itemOrder.couponDiscount}
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
        {!hideDeliveryOrder && deliveryOrder && deliveryOrder.date && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-lg font-semibold text-accent-9 pb-1">
                Responsável
              </div>
              <UserView user={deliveryOrder.deliveryUser} />
            </div>
            {!hideDeliveryOrderDate && (
              <div>
                <div className="text-lg font-semibold text-accent-9">
                  Agendamento
                </div>
                <div className="whitespace-pre-line text-accent-7">
                  <span className="capitalize">
                    {Moment(deliveryOrder.date).format('dddd')},{' '}
                  </span>
                  {Moment(deliveryOrder.date).format('DD MMMM YYYY')} às{' '}
                  {Moment(deliveryOrder.date).format('HH:mm')}
                </div>
              </div>
            )}
          </div>
        )}
        {itemOrder.payMethod && (<div className="mt-5">
            <div className="text-lg font-semibold text-accent-9">
              Forma de pagamento
            </div>
            <div className={`${itemOrder.payMethod === PaymentMethods.ONDELIVERY ? 'text-white badge badge-error' : 'text-accent-7'}`}>
              {itemOrder.payMethod === PaymentMethods.CREDIT && <span>Cartão de Crédito</span>}
              {itemOrder.payMethod === PaymentMethods.DEBIT && <span>Cartão de Débito</span>}
              {itemOrder.payMethod === PaymentMethods.PIX && <span>PIX</span>}
              {itemOrder.payMethod === PaymentMethods.ONDELIVERY && <span className='font-bold'>Na entrega</span>}
            </div>
          </div>)}
        {itemOrder.notes && (
          <div className="mt-5">
            <div className="text-lg font-semibold text-accent-9">
              Observações do pedido
            </div>
            <div className={`${adminMode ? 'text-red-500' : 'text-accent-7'}`}>
              {itemOrder.notes}
            </div>
          </div>
        )}
        <div>
          {itemOrder.items &&
            itemOrder.items.items.map((i: any, k: number) => (
              <div className="mt-4 p-3 flex bg-accent-1 rounded-lg" key={k}>
                <div className="pl-0 lg:pl-2 grid grid-cols-1 gap-4 content-center">
                  <div className="text-2xl font-semibold">{i.qty}x</div>
                </div>
                <div
                  className={cn('ml-3 lg:ml-4 w-full', {
                    'flex justify-between': !isSm && !isMd,
                  })}
                >
                  <div className="grid grid-cols-1 content-center">
                    {i.product.categoryProps && (
                      <div className="text-xs text-tertiary-2">
                        {i.product.categoryProps.title}
                      </div>
                    )}
                    {!i.changeName && i.product.name && (
                      <div className="text-accent-6 text-base lg:text-lg font-semibold">
                        <span>{i.product.name}</span>
                        {i.product.description && (
                          <span> - {i.product.description}</span>
                        )}
                      </div>
                    )}
                    {(!adminMode || !i.changeNameAdmin) && i.changeName && (
                      <div className="text-accent-6 text-base lg:text-lg font-semibold">
                        <span>{i.changeName}</span>
                        {i.changeDescription && (
                          <span> - {i.changeDescription}</span>
                        )}
                      </div>
                    )}
                    {adminMode && i.changeNameAdmin && (
                      <div className="text-accent-6 text-base lg:text-lg font-semibold">
                        <span>{i.changeNameAdmin}</span>
                        {i.changeDescription && (
                          <span> - {i.changeDescription}</span>
                        )}
                      </div>
                    )}
                    {i.optionsItem.items.map(
                      (o: any, index: number) =>
                        o.option && (
                          <div
                            className="font-normal badge badge-info mr-1"
                            key={index}
                          >
                            {o.option.name}
                          </div>
                        )
                    )}
                  </div>
                  <div
                    className={cn(
                      'text-red-500 font-semibold grid grid-cols-1 gap-4 content-center',
                      {
                        'pt-2 text-lg': !isSm && !isMd,
                      }
                    )}
                  >
                    <NumberFormat
                      value={i.price}
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
              </div>
            ))}

          {!hideValues && <div className="mt-3"></div>}

          {!hideValues && itemOrder.couponDiscount > 0 && (
            <div className="mt-1 px-2 flex justify-between">
              <div className="text-accent-7">Cupom de desconto</div>
              <div>
                <NumberFormat
                  value={itemOrder.couponDiscount}
                  thousandsGroupStyle="thousand"
                  prefix="- R$ "
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

          {!hideValues && (
            <div className="mt-1 px-2 flex justify-between">
              <div className="text-accent-7">Taxa de entrega e serviço</div>
              <div>
                {itemOrder.deliveryPrice === 0 && (
                  <span className="badge badge-success font-semibold text-white">
                    GRÁTIS
                  </span>
                )}
                {itemOrder.deliveryPrice > 0 && (
                  <NumberFormat
                    value={itemOrder.deliveryPrice}
                    thousandsGroupStyle="thousand"
                    prefix="+ R$ "
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    displayType="text"
                    allowNegative={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                )}
              </div>
            </div>
          )}

          {!hideValues && (
            <div className="mt-2 mb-1 px-2 flex justify-between">
              <div className="font-bold text-accent-7">Total do pedido</div>
              <div className="font-bold text-accent-7">
                <NumberFormat
                  value={itemOrder.total}
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
      </div>

      {adminMode && (
        <div>
          <div className="flex justify-between">
            <div className="w-full">
              <ChangeStatusOrder
                itemOrder={itemOrder}
                handleUpdate={handleUpdate}
              />
            </div>
            <div className="pt-6 pr-2 flex gap-2">
              <a
                onClick={()=>{
                  setDisplayModal(true)
                }}
                className="inline z-10 cursor-pointer bg-accent-1 p-2 rounded-full"
              >
                <Print />
              </a>
              {itemOrder.user && itemOrder.user.email && (
              <Link href={`/admin/users/${itemOrder.user.email}`}>
                <a className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center">
                  <Person />
                </a>
              </Link>
            )}
            {itemOrder.user && itemOrder.user.email && (
              <Link href={`/admin/logs/${itemOrder.user.email}`}>
                <a className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center">
                  <Search />
                </a>
              </Link>
            )}
            </div>
          </div>

          <Modal
            open={displayModal}
            onClose={() => {
              setDisplayModal(false)
            }}
            focusTrap={false}
            title={
              <div className="mt-3">
                <Print /> <span className="ml-2">Imprimir Pedido</span>
              </div>
            }
            onOpen={handlePrint}
          >
            <div style={{height: screenHeight * 0.8}} className='overflow-y-auto'>
              <PrintOrder {... itemOrder} ref={componentRef} />
            </div>
            
          </Modal>
        </div>
      )}
    </div>
  )
}

interface UserViewProps {
  user: any
}
function UserView(props: UserViewProps) {
  const { user } = props
  const { name, email, phone, avatar } = user
  return (
    <div className="flex items-center">
      <Avatar avatarKey={avatar} size={42} />
      <div className="w-full flex-grow ml-3">
        <h2 className="capitalize whitespace-pre-line text-accent-7">{name}</h2>
        <div className="flex flex-col md:flex-row gap-1 md:gap-3 whitespace-pre-line text-accent-7">
          {phone && (
            <div>
              <Mobile width={16} height={16} />
              <span className="ml-1">{formatPhoneNumber(phone as any)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface OrderViewProps {
  itemOrder: any
  handleUpdate?: any
}
function ChangeStatusOrder(props: OrderViewProps) {
  let { itemOrder, handleUpdate } = props
  const { updateOrder } = useOrder()
  return (
    <div className="mt-3 mb-2 mx-2">
      <select
        defaultValue=""
        className="select select-secondary w-full max-w-xs"
        onChange={async (e: any) => {
          const newStatus = e.target.value
          await updateOrder({ 
            id: itemOrder.id, 
            status: newStatus, 
            createdAt: itemOrder.createdAt 
          })
          itemOrder.status = newStatus
          handleUpdate(itemOrder)
        }}
      >
        <option value="" disabled>
          Alterar o Status do Pedido
        </option>

        <option value={OrderStatus.STANDBY}>
          {(process.env.ORDER_STATUS as any).STANDBY}
        </option>

        <option value={OrderStatus.REJECTED}>
          {(process.env.ORDER_STATUS as any).REJECTED}
        </option>

        <option value={OrderStatus.APPROVED}>
          {(process.env.ORDER_STATUS as any).APPROVED}
        </option>

        <option value={OrderStatus.IN_PREPARATION}>
          {(process.env.ORDER_STATUS as any).IN_PREPARATION}
        </option>

        <option value={OrderStatus.IN_TRANSIT}>
          {(process.env.ORDER_STATUS as any).IN_TRANSIT}
        </option>

        <option value={OrderStatus.DELIVERED}>
          {(process.env.ORDER_STATUS as any).DELIVERED}
        </option>

        <option value={OrderStatus.CANCELED}>
          {(process.env.ORDER_STATUS as any).CANCELED}
        </option>
      </select>
    </div>
  )
}
