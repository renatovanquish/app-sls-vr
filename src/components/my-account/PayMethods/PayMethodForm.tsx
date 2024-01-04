import { useState, useEffect } from 'react'
import { Button, Input } from 'components/ui'
import { Check, CreditCard, Person } from 'components/icons'
import { PaymentMethods } from 'API'
import { useUI } from 'components/ui/context'

import Moment from 'moment'

export default function PayMethodForm(props: any) {
  const {
    handleSubmit,
    id,
    method,
    setMethod,
    number,
    setNumber,
    holderName,
    setHolderName,
    holderDocument,
    setHolderDocument,
    expMonth,
    setExpMonth,
    expYear,
    setExpYear,
    cvv,
    setCvv,
    loading,
    disabled,
  } = props

  const [otherHolder, setOtherHolder] = useState(false)

  const { config } = useUI()

  useEffect(() => {
    setOtherHolder(holderDocument ? true : false)
  }, [holderDocument])

  const handleCheckboxChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    if (target.name === 'otherHolder') {
      setOtherHolder(value)
      if (!value) {
        setHolderDocument('')
      }
    }
  }

  return (
    <div className="px-5 pb-32 md:pb-5">
      <form className="max-w-screen-md" onSubmit={handleSubmit}>
        <div className="mt-4 grid grid-cols-6 gap-4">
          {!id && (process.env.PAGARME_DEBIT ||
          process.env.PAGARME_PIX ||
          config.allowPayOnDelivery ||
          config.allowLocalPickup) && (
            <div className="col-span-6">
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Método
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      value={method}
                      onChange={(e) => {
                        setMethod(e.target.value)
                      }}
                      id="method"
                      name="method"

                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value={PaymentMethods.CREDIT}>
                        Cartão de Crédito
                      </option>
                      {process.env.PAGARME_DEBIT && (
                        <option value={PaymentMethods.DEBIT}>
                          Cartão de Debito
                        </option>
                      )}
                      {process.env.PAGARME_PIX && (
                        <option value={PaymentMethods.PIX}>PIX</option>
                      )}
                      {config.allowPayOnDelivery && (
                        <option value={PaymentMethods.ONDELIVERY}>Pagamento na Entrega</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(method !== PaymentMethods.PIX && method !== PaymentMethods.ONDELIVERY) && (
            <>
              <div className="col-span-6">
                <Input
                  label="Nome impresso no cartão"
                  icon={<Person />}
                  value={holderName}
                  onChange={setHolderName}
                  type="text"

                />
              </div>

              <div className="col-span-6">
                <Input
                  label="Número"
                  icon={<CreditCard />}
                  value={number}
                  onChange={setNumber}
                  type="number"

                />
              </div>

              <div className="col-span-6 md:col-span-2">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Mês Validade
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        value={expMonth}
                        onChange={(e) => {
                          setExpMonth(e.target.value)
                        }}
                        id="expMonth"
                        name="expMonth"

                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value=""></option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="4">04</option>
                        <option value="5">05</option>
                        <option value="6">06</option>
                        <option value="7">07</option>
                        <option value="8">08</option>
                        <option value="9">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-6 md:col-span-2">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Ano Validade
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        value={expYear}
                        onChange={(e) => {
                          setExpYear(e.target.value)
                        }}
                        id="expYear"
                        name="expYear"

                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value=""></option>
                        <option value={Moment().format('YYYY')}>
                          {Moment().format('YYYY')}
                        </option>
                        <option value={Moment().add(1, 'year').format('YYYY')}>
                          {Moment().add(1, 'year').format('YYYY')}
                        </option>
                        <option value={Moment().add(2, 'year').format('YYYY')}>
                          {Moment().add(2, 'year').format('YYYY')}
                        </option>
                        <option value={Moment().add(3, 'year').format('YYYY')}>
                          {Moment().add(3, 'year').format('YYYY')}
                        </option>
                        <option value={Moment().add(4, 'year').format('YYYY')}>
                          {Moment().add(4, 'year').format('YYYY')}
                        </option>
                        <option value={Moment().add(5, 'year').format('YYYY')}>
                          {Moment().add(5, 'year').format('YYYY')}
                        </option>
                        <option value={Moment().add(6, 'year').format('YYYY')}>
                          {Moment().add(6, 'year').format('YYYY')}
                        </option>
                        <option value={Moment().add(7, 'year').format('YYYY')}>
                          {Moment().add(7, 'year').format('YYYY')}
                        </option>
                        <option value={Moment().add(8, 'year').format('YYYY')}>
                          {Moment().add(8, 'year').format('YYYY')}
                        </option>
                        <option value={Moment().add(9, 'year').format('YYYY')}>
                          {Moment().add(9, 'year').format('YYYY')}
                        </option>
                        <option value={Moment().add(10, 'year').format('YYYY')}>
                          {Moment().add(10, 'year').format('YYYY')}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-6 md:col-span-2">
                <Input
                  label="CVV"
                  icon=""
                  value={cvv}
                  onChange={setCvv}
                  type="text"

                />
              </div>

              <div className="col-span-6">
                <div className="mt-2 flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="otherHolder"
                      name="otherHolder"
                      checked={otherHolder}
                      onChange={handleCheckboxChange}
                      className="checkbox"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="allowViewEmail" className="text-accent-9">
                      Cartão pertence a outra pessoa?
                    </label>
                  </div>
                </div>
              </div>

              {otherHolder && (
                <div className="col-span-6">
                  <Input
                    label="Número do CPF do titular do cartão"
                    value={holderDocument}
                    onChange={setHolderDocument}
                    type="text"

                  />
                </div>
              )}
            </>
          )}

          {method === PaymentMethods.PIX && (
            <div className="col-span-6">
              <p>
                Após finalizar seu pedido você visualizará a “Chave Aleatória”
                para concluir o pagamento com o PIX e automaticamente alterar o
                status do seu pedido para pago, efetivando sua compra.
              </p>
              <p className="mt-4 text-red-500">
                O pagamento via PIX deve ser feito em até 60 minutos após o
                envio do seu pedido.
              </p>
            </div>
          )}

          {method === PaymentMethods.ONDELIVERY && (
            <div className="col-span-6">
              Você deverá fazer o pagamento na entrega do pedido em dinheiro ou cartão de debito ou crédito.
            </div>
          )}

        </div>

        <div className="md:text-right">
          <div className="pt-6">
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={
                (method === PaymentMethods.PIX || method === PaymentMethods.ONDELIVERY)
                  ? false
                  : disabled || (otherHolder && !holderDocument)
              }
            >
              <Check className="-ml-2 mr-2 h-7 w-7" />
              <span className="font-semibold md:font-medium text-lg md:text-base">
                SALVAR
              </span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
