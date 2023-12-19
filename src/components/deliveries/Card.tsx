import { Mail, Mobile, Phone } from 'components/icons'
import { Avatar } from 'components/common'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { formatPhoneNumber } from 'react-phone-number-input'
import { useUI } from 'components/ui/context'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { OrderStatus } from 'API'
import cn from 'classnames'

import Preview from '../orders/Preview'

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

  const { isSm, isMd, isLg } = useBreakPoints()
  const { theme } = useTheme()

  const router = useRouter()
  const { config } = useUI()

  return !item ? null : (
    <div>
      {item.break && (
        <div className={`px-4 mb-4 ${index !== 0 ? 'mt-8' : 'mt-4'}`}>
          <h2 className="tracking-widest text-xs title-font font-medium text-tertiary-2 mb-1">
            DATA
          </h2>
          <h1 className="title-font text-xl font-medium text-accent-9 capitalize">
            {Moment(item.date).format('dddd, DD MMMM YYYY')}
          </h1>
        </div>
      )}
      <div
        key={index}
        className={`px-4 w-full ${paramsItems.adminMode && 'lg:pl-8'} ${
          itemSelected === index ? 'py-3 scale-100' : 'py-1 scale-95'
        } ${
          isLast && 'pb-5'
        } transform transition duration-500 hover:scale-100`}
      >
        <div
          style={{
            backgroundColor:
              item.order.status !== OrderStatus.STANDBY &&
              item.order.status !== OrderStatus.APPROVED &&
              item.order.status !== OrderStatus.IN_PREPARATION &&
              item.order.status !== OrderStatus.IN_TRANSIT
              ? '#dee1e6'
              : theme == 'light'
              ? '#fff'
              : '#94a3b8',
          }}
          className={cn('px-4 py-4 border-l-4 bg-accent-0 w-full rounded shadow hover:shadow-lg',{
            'border-tertiary': true,
            'shadow-lg': itemSelected === index
          })}
        >
          <div
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6"
            onClick={() => handleSelect(index)}
          >
            <div
              className="flex items-center"
              onClick={() => handleSelect(index)}
            >
              <Avatar
                avatarKey={item.order.user.avatar}
                size={itemSelected === index ? (isSm ? 84 : 128) : 42}
              />
              <div className="w-full flex-grow ml-3">
                <h2
                  className={cn(
                    'capitalize font-semibold text-lg hover:text-tertiary-2',
                    {
                      'text-xl text-accent-7': itemSelected !== index,
                      'text-xl text-tertiary-2': itemSelected === index,
                    }
                  )}
                >
                  {item.order.user.name}
                </h2>
                <div
                  className={cn('flex text-sm', {
                    'flex-col gap-1': isSm || isMd || isLg,
                    'flex-col gap-2':
                      !isSm && !isMd && !isLg && itemSelected === index,
                    'flex-row gap-5':
                      !isSm && !isMd && !isLg && itemSelected !== index,
                  })}
                >
                  {itemSelected !== index && (
                    <div className="text-lg font-bold text-red-500">
                      {Moment(item.date).format('HH:mm')} hs
                    </div>
                  )}
                  {itemSelected === index && item.order.user.email && (
                    <div>
                      <Mail width={16} height={16} />
                      <span className="ml-1">{item.order.user.email}</span>
                    </div>
                  )}
                  {itemSelected === index && item.order.user.phone && (
                    <div>
                      <Mobile width={16} height={16} />
                      <span className="ml-1">
                        {formatPhoneNumber(item.order.user.phone as any)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {itemSelected === index && (
              <div
                className={cn('w-full', {
                  'mt-5': !isSm && !isMd && itemSelected === index,
                  'my-1': !isSm && !isMd && itemSelected !== index,
                  'pb-1': isSm || isMd,
                })}
              >
                <div className="flex flex-col flex-wrap">
                  <div className="text-lg font-bold text-red-500">
                    {Moment(item.date).format('HH:mm')} hs
                  </div>
                  <div className="break-all font-bold">
                    PEDIDO # {Moment(item.order.createdAt).unix()}
                  </div>
                  <div className="flex mt-1 gap-2 text-sm">
                    <div
                      className={cn('text-white px-1 rounded', {
                        'bg-orange-500':
                          item.order.status === OrderStatus.STANDBY,
                        'bg-red': item.order.status === OrderStatus.REJECTED,
                        'bg-green': item.order.status === OrderStatus.APPROVED,
                        'bg-blue':
                          item.order.status === OrderStatus.IN_PREPARATION,
                        'bg-purple':
                          item.order.status === OrderStatus.IN_TRANSIT,
                        'bg-black': item.order.status === OrderStatus.DELIVERED,
                      })}
                    >
                      {item.order.status === OrderStatus.STANDBY && (
                        <span>{(process.env.ORDER_STATUS as any).STANDBY}</span>
                      )}
                      {item.order.status === OrderStatus.REJECTED && (
                        <span>
                          {(process.env.ORDER_STATUS as any).REJECTED}
                        </span>
                      )}
                      {item.order.status === OrderStatus.APPROVED && (
                        <span>
                          {(process.env.ORDER_STATUS as any).APPROVED}
                        </span>
                      )}
                      {item.order.status === OrderStatus.IN_PREPARATION && (
                        <span>
                          {(process.env.ORDER_STATUS as any).IN_PREPARATION}
                        </span>
                      )}
                      {item.order.status === OrderStatus.IN_TRANSIT && (
                        <span>
                          {(process.env.ORDER_STATUS as any).IN_TRANSIT}
                        </span>
                      )}
                      {item.order.status === OrderStatus.DELIVERED && (
                        <span>
                          {(process.env.ORDER_STATUS as any).DELIVERED}
                        </span>
                      )}
                      {item.order.status === OrderStatus.CANCELED && (
                        <span>
                          {(process.env.ORDER_STATUS as any).CANCELED}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {itemSelected === index && (
            <div>
              <Preview
                item={item.order}
                adminMode={paramsItems.adminMode}
                hideDeliveryOrder={!paramsItems.adminMode}
                handleSelect={handleSelect}
                index={index}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
