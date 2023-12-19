import { useState, useEffect } from 'react'
import { Button, Input } from 'components/ui'
import { Check, Undo } from 'components/icons'
import { toast } from 'react-toast'
import { useRouter } from 'next/router'
import { useCoupon } from 'hooks/useCoupon'
import { useProduct } from 'hooks/useProduct'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import NumberFormat from 'react-number-format'
import { CSVLink } from 'react-csv'

import Moment from 'moment'

type Inputs = {
  name: string
  description: string
  code: string
  start: any
  expiration: any
  discountPercentage: number
  discountValue: number
  qtyLimit: number
  qtyProduct: number
}

interface Props {
  userID: string
  coupon: any
  setCurrentItem?: any
  handleUpdate?: any
  index?: number
}

export default function FormCoupon(props: Props) {
  const { userID, coupon, setCurrentItem, handleUpdate, index } = props
  const [loading, setLoading] = useState(false)
  const [tabSel, setTabSel] = useState(0)
  const router = useRouter()

  const [adherence, setAdherence] = useState([] as any)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const watchName = watch('name')
  const watchCode = watch('code')
  const watchDiscountPercentage = watch('discountPercentage')
  const watchDiscountValue = watch('discountValue')

  const {
    createCoupon,
    updateCoupon,
    listUsedByCoupon,
    updateCouponProduct,
    createCouponProduct,
    deleteCouponProduct,
    listProductsByCoupon,
  } = useCoupon()

  const { listProducts } = useProduct()

  const [products, setProducts] = useState([] as any)
  const [couponProduct, setCouponProduct] = useState([] as any)

  useEffect(() => {
    if (watchDiscountPercentage > 0) {
      setValue('discountValue', 0)
    }
    if (watchDiscountValue > 0) {
      setValue('discountPercentage', 0)
    }
  }, [watchDiscountPercentage, watchDiscountValue, setValue])

  useEffect(() => {
    if (coupon) {
      setValue('name', coupon.name)
      setValue('description', coupon.description ? coupon.description : '')
      setValue('code', coupon.code)
      setValue('start', Moment(coupon.start).format('YYYY-MM-DD'))
      setValue('expiration', Moment(coupon.expiration).format('YYYY-MM-DD'))
      setValue('discountPercentage', coupon.discountPercentage)
      setValue('discountValue', coupon.discountValue)
      setValue('qtyLimit', coupon.qtyLimit)
      setValue('qtyProduct', coupon.qtyProduct ? coupon.qtyProduct : 0)

      const fetchAdherence = async () => {
        const { items } = await listUsedByCoupon({
          couponID: coupon.id,
          limit: 1000,
        })
        const ad = [] as any
        items.map((a: any) => ad.push(a.user))
        setAdherence(ad)
      }

      const fetchCouponProduct = async () => {
        const lp = await listProducts({ limit: 500 })
        console.log(lp)

        const prs: any[] = []
        lp.items.map((p: any) => {
          prs.push({
            id: p.id,
            name: p.name,
            price: p.price,
            limit: 0,
            checked: false,
          })
        })

        if (lp.nextToken) {
          const lp2 = await listProducts({
            limit: 500,
            nextToken: lp.nextToken,
          })

          lp2.items.map((p: any) => {
            prs.push({
              id: p.id,
              name: p.name,
              price: p.price,
              limit: 0,
              checked: false,
            })
          })

          const { items, nextToken } = await listProductsByCoupon({
            limit: 1000,
            couponID: coupon.id,
          })
          const cp: string[] = []
          items.map((p: any) => {
            cp.push(p.productID)
            prs.map((p2: any) => {
              if (p2.id === p.productID) {
                p2.price = p.price
                p2.limit = p.limit
                return p2
              }
            })
          })
          setCouponProduct(cp)
          setProducts(
            prs.sort((a: any, b: any) => a.name.localeCompare(b.name))
          )
        } else {
          const { items, nextToken } = await listProductsByCoupon({
            limit: 1000,
            couponID: coupon.id,
          })
          const cp: string[] = []
          items.map((p: any) => {
            cp.push(p.productID)
            prs.map((p2: any) => {
              if (p2.id === p.productID) {
                p2.price = p.price
                p2.limit = p.limit
                return p2
              }
            })
          })
          setCouponProduct(cp)
          setProducts(
            prs.sort((a: any, b: any) => a.name.localeCompare(b.name))
          )
        }
      }

      fetchAdherence()
      fetchCouponProduct()
    } else {
      setValue('code', generateCode())
      setValue('start', new Date(Date.now()))
      setValue('expiration', new Date(Date.now() + 3600 * 1000 * 24))
      setValue('discountPercentage', 0)
      setValue('discountValue', 0)
      setValue('qtyLimit', 1)
      setValue('qtyProduct', 0)
      setValue('description', '')
    }

    return () => {
      setAdherence([] as any)
      setProducts([] as any)
      setCouponProduct([] as any)
    }
  }, [coupon, setValue])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {
      name,
      description,
      code,
      start,
      expiration,
      discountPercentage,
      discountValue,
      qtyLimit,
      qtyProduct,
    } = data

    if (!name) {
      toast.error(`Nome da cupom é obrigatório.`)
      return null
    }

    setLoading(true)

    const input = {
      id: coupon ? coupon.id : uuidv4(),
      name,
      description,
      code: code.toUpperCase(),
      start: Moment(start).format('YYYY-MM-DD'),
      expiration: Moment(expiration).format('YYYY-MM-DD'),
      discountPercentage,
      discountValue,
      qtyLimit,
      qtyProduct,
      search: name.toLowerCase(),
    } as any

    if (!coupon) {
      await createCoupon(input)
      router.push('/admin/coupons')
    } else {
      await updateCoupon(input)
    }

    if (setCurrentItem) {
      const obj = JSON.parse(JSON.stringify(coupon))
      Object.keys(obj).forEach((p: any) => {
        if (input.hasOwnProperty(p)) {
          obj[p] = input[p]
        }
      })
      setCurrentItem(obj)
    }

    if (handleUpdate) {
      handleUpdate(index, input)
    }

    setLoading(false)

    toast(`Cupom ${!coupon ? 'adicionado' : 'atualizado'} com sucesso.`, {
      backgroundColor: '#263238',
      color: '#fff',
    })

    if (coupon && coupon.id) {
      const { items } = await listProductsByCoupon({
        limit: 500,
        couponID: coupon.id,
      })
      items.map(async (pc: any) => {
        products.map(async (p: any) => {
          if (p.id === pc.productID) {
            await updateCouponProduct({
              id: pc.id,
              price: p.price,
              limit: p.limit,
            })
          }
        })
      })
    }
  }

  const handleCheckboxChangeProduct = async (event: any) => {
    const target = event.target

    setProducts(
      products.map((p: any, idx: number) => {
        if (idx === parseInt(target.name)) {
          p.checked = !p.checked
        }
        return p
      })
    )

    if (couponProduct.indexOf(products[parseInt(target.name)].id) === -1) {
      await createCouponProduct({
        couponID: coupon.id,
        productID: products[parseInt(target.name)].id,
      })
      setCouponProduct(couponProduct.concat(products[parseInt(target.name)].id))
    } else {
      setCouponProduct(
        couponProduct.filter((c: any) => {
          return c !== products[parseInt(target.name)].id
        })
      )
      const { items } = await listProductsByCoupon({
        limit: 1000,
        couponID: coupon.id,
      })
      items.map(async (pc: any) => {
        if (pc.productID === products[parseInt(target.name)].id) {
          await deleteCouponProduct({ id: pc.id })
        }
      })
    }
  }

  const handlePriceChange = async (index: number, price: any) => {
    setProducts(
      products.map((p: any, idx: number) => {
        if (idx === index) {
          p.price = price
        }
        return p
      })
    )
  }

  const handleLimitChange = async (index: number, limit: any) => {
    setProducts(
      products.map((p: any, idx: number) => {
        if (idx === index) {
          p.limit = limit
        }
        return p
      })
    )
  }

  return (
    <div className="max-w-full w-full mx-auto">
      <div className="mt-4 tabs">
        <a
          onClick={() => setTabSel(0)}
          className={`cursor-pointer tab tab-lifted ${
            tabSel === 0 && 'tab-active'
          }`}
        >
          Dados
        </a>
        {coupon && coupon.id && (
          <a
            onClick={() => setTabSel(1)}
            className={`cursor-pointer tab tab-lifted ${
              tabSel === 1 && 'tab-active'
            }`}
          >
            Produtos
          </a>
        )}
        {coupon && coupon.id && (
          <a
            onClick={() => setTabSel(2)}
            className={`cursor-pointer tab tab-lifted ${
              tabSel === 2 && 'tab-active'
            }`}
          >
            Mais
          </a>
        )}
        <div className="flex-1 cursor-default tab tab-lifted"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {tabSel === 0 && (
          <div>
            <div className="mt-4 flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="w-full lg:basis-4/12">
                <Input
                  label="Nome do cupom"
                  type="text"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  register={register('name')}
                  defaultValue={''}
                  notes={
                    errors.name && errors.name.type === 'required'
                      ? 'Nome é obrigatório.'
                      : ''
                  }
                />
              </div>
              <div className="w-full lg:basis-2/12">
                <Input
                  label="Código"
                  type="text"
                  aria-invalid={errors.code ? 'true' : 'false'}
                  register={register('code')}
                  defaultValue={''}
                  notes={
                    errors.code && errors.code.type === 'required'
                      ? 'Código é obrigatório.'
                      : ''
                  }
                />
              </div>
              <div className="w-full lg:basis-3/12">
                <Input
                  label="Data de início"
                  type="date"
                  register={register('start')}
                  defaultValue={''}
                />
              </div>
              <div className="w-full lg:basis-3/12">
                <Input
                  label="Data de expiração"
                  type="date"
                  register={register('expiration')}
                  defaultValue={''}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="w-full lg:basis-3/12">
                <Input
                  maxLength={100}
                  minLength={1}
                  step={1}
                  label="% de desconto"
                  type="number"
                  register={register('discountPercentage')}
                  defaultValue={''}
                  notes="Informe a % se não informar o valor."
                />
              </div>
              <div className="w-full lg:basis-3/12">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Valor de desconto
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="discountValue"
                    control={control}
                    render={({
                      field: { onChange, onBlur, name, value, ref },
                    }) => (
                      <NumberFormat
                        className="-ml-10 text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        thousandsGroupStyle="thousand"
                        prefix="R$ "
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        displayType="input"
                        type="text"
                        allowNegative={false}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        onValueChange={(values) => onChange(values.floatValue)}
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        ref={ref}
                      />
                    )}
                  />
                </div>
                <span className="text-accent-6 text-xs">
                  Informe o valor se não informar a %.
                </span>
              </div>
              <div className="w-full lg:basis-3/12">
                <Input
                  label="Limite de uso"
                  type="number"
                  register={register('qtyLimit')}
                  defaultValue={''}
                  notes="0 para uso ilimitado."
                />
              </div>
              <div className="w-full lg:basis-3/12">
                <Input
                  label="Limite de produtos"
                  type="number"
                  register={register('qtyProduct')}
                  defaultValue={''}
                  notes="0 para uso ilimitado."
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="w-full">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Descrição (Opcional)
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
          <div className="mt-4 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
            <div className="w-full">
              <div className="mb-6 divide-y-6 divide-accent-3 divide-dashed">
                <div className="flex flex-col w-full md:w-auto text-center md:text-left">
                  <h2 className="uppercase text-xs text-tertiary-2 tracking-widest font-medium title-font">
                    PRODUTOS DO CUPOM (OPCIONAL)
                  </h2>
                  <p className="text-xs text-accent-7">
                    Opcionalmente selecione os produtos que deseja associar ao
                    cupom de desconto, caso não selecione nenhum produto, o
                    cupom aplicará o desconto a todos os produtos do pedido.
                  </p>
                </div>
              </div>

              <div className="mt-2 overflow-x-auto">
                <table className="table w-full table-compact">
                  <tbody>
                    {products.map((p: any, i: number) => (
                      <tr key={i}>
                        <th>
                          <label>
                            <input
                              id={`${i}`}
                              name={`${i}`}
                              type="checkbox"
                              checked={
                                couponProduct.indexOf(products[i].id) === -1
                                  ? false
                                  : true
                              }
                              onChange={handleCheckboxChangeProduct}
                              className="checkbox checkbox-accent"
                            />
                          </label>
                        </th>
                        <td>
                          <NumberFormat
                            className="text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                            thousandsGroupStyle="thousand"
                            prefix="R$ "
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            displayType="input"
                            type="text"
                            allowNegative={false}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            placeholder="Valor"
                            onValueChange={(values) =>
                              handlePriceChange(i, values.floatValue)
                            }
                            defaultValue={
                              couponProduct.indexOf(products[i].id) !== -1
                                ? products[i].price
                                : null
                            }
                          />
                        </td>
                        <td className="text-base">
                          <input
                            min={0}
                            type="number"
                            placeholder="Qtde Maxima"
                            className="text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                            onChange={(e) =>
                              handleLimitChange(i, e.target.value)
                            }
                            defaultValue={
                              couponProduct.indexOf(products[i].id) !== -1
                                ? products[i].limit
                                : null
                            }
                          />
                        </td>
                        <td className="text-base">{p.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tabSel === 2 && (
          <div className="mt-4">
            <div className="flex justify-start gap-4 flex-wrap">
              <CSVLink
                filename={`adesao-coupon-${coupon.name}.csv`}
                className="btn"
                data={adherence}
              >
                Download da Adesão
              </CSVLink>
            </div>
          </div>
        )}

        {(tabSel === 0 || tabSel === 1) && (
          <div className="mt-6">
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={!watchName || !watchCode}
            >
              <Check className="-ml-2 mr-2" />
              {!coupon && <span>Adicionar</span>}
              {coupon && <span>Atualizar</span>}
            </Button>
            {!coupon && (
              <Button
                style={{ backgroundColor: 'transparent', color: '#282a36' }}
                onClick={() => {
                  router.push('/admin/coupons')
                }}
                className="ml-2"
                variant="slim"
                type="button"
              >
                <Undo className="-ml-2 mr-2" />
                Cupons
              </Button>
            )}
          </div>
        )}
      </form>
    </div>
  )
}

function generateCode() {
  const ALPHABET = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ'
  const ID_LENGTH = 5
  let rtn = ''
  for (let i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
  }
  return rtn
}
