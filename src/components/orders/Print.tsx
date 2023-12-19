/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import { Info } from 'components/icons'
import { Logo } from 'components/ui'
import NumberFormat from 'react-number-format'
import { useUI } from 'components/ui/context'
import { formatPhoneNumber } from 'react-phone-number-input'
import { PaymentMethods } from 'API'

import Moment from 'moment'

export const PrintOrder = forwardRef((itemOrder: any, ref: any) => {
  const { config } = useUI()

  return (
    <div className="p-10" ref={ref}>
      <Logo />
      <div>App {process.env.URL}</div>
      <div>SAC {formatPhoneNumber(config.phoneOrders as any)}</div>

      <div className="mt-6">
        <div className="text-xl font-semibold">
          Pedido # {Moment(itemOrder.createdAt).unix()}{' '}
        </div>
        <div>
          Em {Moment(itemOrder.createdAt).format('DD MMMM YYYY')} às{' '}
          {Moment(itemOrder.createdAt).format('HH:mm')}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xl font-semibold">Cliente</div>
        <div className="mt-1 whitespace-pre-line text-lg">
          {itemOrder.user.name}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xl font-semibold">Endereço da entrega</div>
        <div className="mt-1 whitespace-pre-line text-lg">
          {itemOrder.addressStreet}
          {itemOrder.addressNumber && <span>, {itemOrder.addressNumber}</span>}
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
          {itemOrder.addressState && <span>, {itemOrder.addressState}</span>}
          {itemOrder.addressCountry && (
            <span>, {itemOrder.addressCountry}</span>
          )}
        </div>
        {itemOrder.addressReference && (
          <div>
            <Info width={16} height={16} /> {itemOrder.addressReference}
          </div>
        )}
      </div>

      {itemOrder.payMethod && (
        <div className="mt-6">
          <div className="text-lg font-semibold text-accent-9">
            Forma de pagamento
          </div>
          <div
            className={`${
              itemOrder.payMethod === PaymentMethods.ONDELIVERY
                ? 'text-white badge badge-lg badge-error'
                : 'text-accent-7'
            }`}
          >
            {itemOrder.payMethod === PaymentMethods.CREDIT && (
              <span>Cartão de Crédito</span>
            )}
            {itemOrder.payMethod === PaymentMethods.DEBIT && (
              <span>Cartão de Débito</span>
            )}
            {itemOrder.payMethod === PaymentMethods.PIX && <span>PIX</span>}
            {itemOrder.payMethod === PaymentMethods.ONDELIVERY && (
              <span className="font-bold">Na entrega</span>
            )}
          </div>
        </div>
      )}

      {itemOrder.couponDiscount > 0 && (
        <div className="mt-6">
          <div className="text-xl font-semibold">Cupom de desconto</div>
          <div className="mt-1 text-lg">{itemOrder.couponName}</div>
          <div className="text-lg">
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

      {itemOrder.notes && (
        <div className="mt-6">
          <div className="text-xl font-semibold text-accent-9">
            Observações do pedido
          </div>
          <div className="text-lg">{itemOrder.notes}</div>
        </div>
      )}

      <div>
        {itemOrder.items &&
          itemOrder.items.items.map((i: any, k: number) => (
            <div className="mt-5 flex" key={k}>
              <div className="pl-0 lg:pl-2 grid grid-cols-1 gap-4 content-center">
                <div className="text-2xl font-semibold">{i.qty}x</div>
              </div>
              <div className="ml-4 lg:ml-4 w-full">
                <div className="grid grid-cols-1 content-center">
                  {i.product.categoryProps && (
                    <div className="text-sm">
                      {i.product.categoryProps.title}
                    </div>
                  )}
                  {!i.changeName && i.product.name && (
                    <div className="text-base lg:text-lg font-semibold">
                      <span>{i.product.name}</span>
                      {i.product.description && (
                        <span> - {i.product.description}</span>
                      )}
                    </div>
                  )}
                  {!i.changeNameAdmin && i.changeName && (
                    <div className="text-base lg:text-lg font-semibold">
                      <span>{i.changeName}</span>
                      {i.changeDescription && (
                        <span> - {i.changeDescription}</span>
                      )}
                    </div>
                  )}
                  {i.changeNameAdmin && (
                    <div className="text-base lg:text-lg font-semibold">
                      <span>{i.changeNameAdmin}</span>
                      {i.changeDescription && (
                        <span> - {i.changeDescription}</span>
                      )}
                    </div>
                  )}
                  {i.optionsItem.items.map(
                    (o: any, index: number) =>
                      o.option && (
                        <div className="font-normal mr-1" key={index}>
                          {o.option.name}
                        </div>
                      )
                  )}
                </div>
                <div className="font-semibold grid grid-cols-1 gap-4 content-center">
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

        <div className="mt-4"></div>

        {itemOrder.couponDiscount > 0 && (
          <div className="mt-3 flex justify-between">
            <div>Cupom de desconto</div>
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

        <div className="mt-3 flex justify-between">
          <div>Taxa de entrega e serviço</div>
          <div>
            {itemOrder.deliveryPrice === 0 && <span>GRÁTIS</span>}
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

        <div className="mt-3 mb-3 flex justify-between">
          <div className="font-bold text-lg">Total do pedido</div>
          <div className="font-bold text-lg">
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
      </div>
    </div>
  )
})
