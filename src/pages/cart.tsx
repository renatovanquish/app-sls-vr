import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from 'graphql/mutations'

import { useState, useEffect, useCallback } from 'react'
import { Layout, Avatar } from 'components/common'
import { Container, Loading, Modal } from 'components/ui'
import { useUserAuth } from 'components/userAuth/context'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'
import Image from 'next/image'
import Link from 'next/link'
import NumberFormat from 'react-number-format'
import cn from 'classnames'
import {
  ArrowLeft,
  RightArrow,
  Trash,
  Minus,
  Plus,
  Pin,
  Info,
  Ticket,
  CreditCard,
  Person,
} from 'components/icons'
import { useTheme } from 'next-themes'
import { useCart } from 'hooks/useCart'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { useUI } from 'components/ui/context'
import { useRouter } from 'next/router'
import crypto from 'lib/crypto'
import { useScreen } from 'hooks/useScreen'
import AddressForm from 'components/my-account/Addresses/AddressForm'
import PayMethodForm from 'components/my-account/PayMethods/PayMethodForm'
import { useDeliveryMethodOrder } from 'hooks/useDeliveryMethodOrder'
import { useDeliveryOrder } from 'hooks/useDeliveryOrder'
import { useCoupon } from 'hooks/useCoupon'
import { useDebounce } from 'use-debounce'
import { useGroupUser } from 'hooks/useGroupUser'
import { useOrder } from 'hooks/useOrder'
import { usePagarme } from 'hooks/usePagarme'
import { useProduct } from 'hooks/useProduct'
import { OrderStatus, DocTypes, DeliveryStatus, PaymentMethods } from 'API'
import { useLog } from 'hooks/useLog'
import { cpf } from 'cpf-cnpj-validator'
import { v4 as uuidv4 } from 'uuid'

import Moment from 'moment'

export default function CartPage() {
  const router = useRouter()
  const { t } = router.query
  const [tokenObj, setTokenObj] = useState(
    t && t.toString() !== 'undefined'
      ? crypto.decrypt(decodeURIComponent(t.toString()))
      : ({} as any)
  )

  const { setLogUser } = useLog()

  const [loadingCart, setLoadingCart] = useState(true)
  const [cart, setCart] = useState([] as any)
  const [total, setTotal] = useState(0)

  const [loadingAddress, setLoadingAddress] = useState(true)
  const [addresses, setAddresses] = useState<any[]>([])
  const [addressSel, setAddressSel] = useState({} as any)

  const [loadingPayMethod, setLoadingPayMethod] = useState(true)
  const [payMethods, setPayMethods] = useState<any[]>([])
  const [payMethodSel, setPayMethodSel] = useState({} as any)

  const [loadingDeliveryMethods, setLoadingDeliveryMethods] = useState(true)
  const [deliveryMethods, setDeliveryMethods] = useState<any[]>([])
  const [deliveryMethodSel, setDeliveryMethodSel] = useState({} as any)

  const [scheduledSel, setScheduledSel] = useState({} as any)

  const [couponSel, setCouponSel] = useState({} as any)
  const [couponValue, setCouponValue] = useState(0)

  const [doc, setDoc] = useState('')

  const [notes, setNotes] = useState('')

  const [loadingFinalize, setLoadingFinalize] = useState(false)

  const [onlyDigital, setOnlyDigital] = useState(true)

  const { listCartsByUser, updateCart, deleteCartOption, deleteCart } =
    useCart()

  const { user, listAddresses, listPayMethods, updateUser } = useUserAuth()

  const { listDeliveryMethodOrders } = useDeliveryMethodOrder()
  const { createDeliveryOrder } = useDeliveryOrder()
  const { createOrder, createOrderItem, createOrderItemOption } = useOrder()
  const { createCouponUsed, updateCoupon, getCoupon } = useCoupon()
  const { getCustomerIDPagarme, createOrderPagarme } = usePagarme()
  const { getProduct, updateProduct } = useProduct()

  const { config, hideSearch } = useUI()

  useEffect(() => {
    hideSearch()
    setTokenObj(
      t && t.toString() !== 'undefined'
        ? crypto.decrypt(decodeURIComponent(t.toString()))
        : ({} as any)
    )
    return () => {
      setTokenObj({} as any)
    }
  }, [t])

  useEffect(() => {
    let isMounted = true

    const fetchDataCarts = async () => {
      setLoadingCart(true)
      const { items } = await listCartsByUser({ userID: user.id })
      let c: any[] = []
      let t = 0
      items.map((i: any) => {
        if (!i.product.type || i.product.type !== 'digital') {
          setOnlyDigital(false)
        }
        if (!i.blendID) {
          let unitPrice =
            i.changePriceAdjustment && i.changePriceAdjustment !== '100'
              ? (i.product.price * parseInt(i.changePriceAdjustment)) / 100
              : i.product.price
          i.options.items.map((o: any) => {
            unitPrice += o.option && o.option.price ? o.option.price : 0
          })
          i.unitPrice = unitPrice
          t += i.qty * unitPrice
          c.push(i)
          setTotal(t)
        } else {
          let products = []
          c.map((i2: any, idx: number) => {
            if (i2.blendID === i.blendID) {
              let p = JSON.parse(JSON.stringify(i.product))
              p.productID = i.productID
              p.options = i.options
              p.cartID = i.id
              c[idx].products.push(p)
              products = c[idx].products
            }
          })
          if (products.length === 0) {
            let p = JSON.parse(JSON.stringify(i.product))
            p.productID = i.productID
            p.options = i.options
            p.cartID = i.id
            products.push(p)
            c.push({
              id: i.blendID,
              blendID: i.blendID,
              changeName: i.changeName,
              changeDescription: i.changeDescription,
              changePriceAdjustment: i.changePriceAdjustment,
              changeQtyBlend: i.changeQtyBlend,
              options: i.options,
              qty: i.qty,
              unitPrice: i.unitPrice,
              userID: i.userID,
              product: i.product,
              products,
            })
          }
        }
      })
      c.map((i: any, idx: number) => {
        if (i.blendID) {
          let name = ''
          let unitPrice = 0
          i.products.map((i2: any) => {
            if (name) {
              name = name + ' / '
            }
            name = name + i2.name
          })
          if (i.changePriceAdjustment === '1') {
            unitPrice =
              i.changeQtyBlend === 2
                ? (i.products[0].price + i.products[1].price) / 2
                : (i.products[0].price +
                    i.products[1].price +
                    i.products[2].price) /
                  3
          } else {
            if (i.changeQtyBlend === 2) {
              unitPrice =
                i.products[0].price > i.products[1].price
                  ? i.products[0].price
                  : i.products[1].price
            } else if (i.changeQtyBlend === 3) {
              unitPrice = i.products[0].price
              if (i.products[1].price > unitPrice) {
                unitPrice = i.products[1].price
              }
              if (i.products[2].price > unitPrice) {
                unitPrice = i.products[2].price
              }
            }
          }
          i.options.items.map((o: any) => {
            unitPrice = unitPrice + o.option.price
          })
          c[idx].product.name = name
          c[idx].product.price = unitPrice
          c[idx].unitPrice = unitPrice
          t += i.qty * unitPrice
          setTotal(t)
        }
      })
      setCart(c)
      setLoadingCart(false)
    }

    const fetchDataAddresses = async () => {
      setLoadingAddress(true)
      const items = await listAddresses(user.id)
      if (items && items.length > 0) {
        setAddresses(items)
        const addressID = localStorage.getItem('addressID')
        if (addressID) {
          const es = items.filter((e: any) => {
            return e.id === addressID
          })
          if (es[0]) {
            setAddressSel(es[0])
          } else {
            setAddressSel(items[0])
          }
        } else {
          setAddressSel(items[0])
        }
      }
      setLoadingAddress(false)
    }

    const fetchDataPayMethods = async () => {
      setLoadingPayMethod(true)
      const items = await listPayMethods(user.id)
      if (items && items.length > 0) {
        setPayMethods(items)
        const payMethodID = localStorage.getItem('payMethodID')
        if (payMethodID) {
          const es = items.filter((e: any) => {
            return e.id === payMethodID
          })
          if (es[0]) {
            setPayMethodSel(es[0])
          } else {
            setPayMethodSel(items[0])
          }
        } else {
          setPayMethodSel(items[0])
        }
      }
      setLoadingPayMethod(false)
    }

    const fetchDataDeliveryMethods = async () => {
      setLoadingDeliveryMethods(true)
      const { items } = await listDeliveryMethodOrders({ limit: 500 })
      setDeliveryMethods(items)
      setLoadingDeliveryMethods(false)
    }

    if (isMounted && user) {
      setCouponSel({} as any)
      setCouponValue(0)
      fetchDataCarts()
      fetchDataAddresses()
      fetchDataPayMethods()
      fetchDataDeliveryMethods()

      if (user.profile) {
        setDoc(user.profile.doc)
      }
    }

    return () => {
      isMounted = false
      setCart([] as any)
      setTotal(0)
      setAddresses([] as any)
      setAddressSel({} as any)
      setPayMethods([] as any)
      setPayMethodSel({} as any)
      setDeliveryMethods([] as any)
      setDeliveryMethodSel({} as any)
      setCouponSel({} as any)
      setCouponValue(0)
      setLoadingCart(true)
      setLoadingAddress(true)
      setLoadingDeliveryMethods(true)
      setLoadingPayMethod(true)
    }
  }, [user])

  useEffect(() => {
    let isMounted = true
    if (isMounted && addressSel.id && deliveryMethods.length > 0) {
      setDeliveryMethodSel({} as any)
      let dmSel = {} as any
      deliveryMethods.map((dm: any) => {
        dm.zipCode.map((z: string) => {
          if (z.indexOf('*') === -1) {
            if (
              z.replace(/\D/g, '') === addressSel.zipcode.replace(/\D/g, '')
            ) {
              if (!dmSel.id) {
                dmSel.id = dm.id
                dmSel.price = dm.price
                dmSel.name = dm.name
              } else if (dmSel.price > dm.price) {
                dmSel.id = dm.id
                dmSel.price = dm.price
                dmSel.name = dm.name
              }
            }
          } else {
            const zp = z.substr(0, z.indexOf('*'))
            if (
              zp === addressSel.zipcode.replace(/\D/g, '').substr(0, zp.length)
            ) {
              if (!dmSel.id) {
                dmSel.id = dm.id
                dmSel.price = dm.price
                dmSel.name = dm.name
              } else if (dmSel.price > dm.price) {
                dmSel.id = dm.id
                dmSel.price = dm.price
                dmSel.name = dm.name
              }
            }
          }
        })
      })
      if (addressSel.zipcode && !dmSel.id) {
        setLogUser({
          userID: user.id,
          tag: 'CEP NÃO ATENDIDO',
          notes: `O CEP ${addressSel.zipcode} esta fora da área de cobertura.`,
        })
      }
      setDeliveryMethodSel(dmSel)
    }
    return () => {
      setDeliveryMethodSel({} as any)
    }
  }, [addressSel, deliveryMethods])

  const updateQty = async (cartID: string, qty: number) => {
    let c: any[] = []
    let t = 0
    cart.map((i: any) => {
      const stockControl = i.product.stockControl
      const stockQty = i.product.qty
      if (!stockControl || (stockControl && stockQty >= qty)) {
        if (cartID === i.id || cartID === i.blendID) {
          i.qty = qty
        }
      }
      let unitPrice =
        i.changePriceAdjustment &&
        i.changePriceAdjustment !== '100' &&
        i.changePriceAdjustment !== '1' &&
        i.changePriceAdjustment !== '2'
          ? (i.product.price * parseInt(i.changePriceAdjustment)) / 100
          : i.product.price
      if (i.changeQtyBlend === 1) {
        i.options.items.map((o: any) => {
          unitPrice += o.option.price
        })
      }
      i.unitPrice = unitPrice
      t += i.qty * unitPrice
      c.push(i)
      setTotal(t)
    })
    setCart(c)
    let exists = false
    cart.map((i: any) => {
      if (i.blendID === cartID) {
        exists = true
        i.products.map(async (i2: any) => {
          await updateCart({ id: i2.cartID, qty })
        })
      }
    })
    if (!exists) {
      await updateCart({ id: cartID, qty })
    }
  }

  const removeProduct = async (id: string, name: string) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir? ${name}`,
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
      let c: any[] = []
      let t = 0
      cart.map((i: any) => {
        if (i.id !== id) {
          let unitPrice = i.product.price
          i.options.items.map((o: any) => {
            unitPrice += o.option.price
          })
          i.unitPrice = unitPrice
          t += i.qty * unitPrice
          c.push(i)
          setTotal(t)
        }
      })
      setCart(c)
      let exists = false
      cart.map((i: any) => {
        if (i.blendID === id) {
          exists = true
          i.products.map(async (i2: any) => {
            i2.options.items.map(async (i3: any) => {
              await deleteCartOption({ id: i3.id })
            })
            await deleteCart({ id: i2.cartID })
          })
        }
      })
      if (!exists) {
        cart.map((i: any) => {
          if (i.id === id) {
            i.options.items.map(async (i3: any) => {
              await deleteCartOption({ id: i3.id })
            })
          }
        })
        await deleteCart({ id })
      }
      toast.hideAll()
      toast('Produto removido com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    }
  }

  const finalizeOrder = async () => {
    if (loadingFinalize) {
      return null
    }

    setLoadingFinalize(true)

    try {
      if (
        doc &&
        user &&
        (!user.profile ||
          (user.profile && !user.profile.doc) ||
          (user.profile && user.profile.doc && !cpf.isValid(user.profile.doc)))
      ) {
        const ru = await updateUser({ doc, docType: DocTypes.CPF })
      }

      /**
       * CONTROL STOCK
       */
      let unavailableStock = false
      let unavailableStockProduct = ''
      let newAvailableStock: { productID: any; qty: number }[] = []

      const all = cart.map(async (i: any) => {
        const stockControl = i.product.stockControl
        let stockQty = i.product.qty
        if (stockControl) {
          const currentProduct = await getProduct({
            id: i.productID,
          })
          stockQty = currentProduct.qty
          newAvailableStock.push({
            productID: i.productID,
            qty: stockQty - i.qty,
          })
        }
        if (stockControl && stockQty < i.qty) {
          toast.error(`${i.product.name} não tem estoque suficiente.`)
          if (unavailableStockProduct) {
            unavailableStockProduct += ', '
          }
          unavailableStockProduct = i.product.name
          unavailableStock = true
        }
      })

      const combine = Promise.all(all)
      await combine

      if (unavailableStock) {
        setLoadingFinalize(false)
        setLogUser({
          userID: user.id,
          tag: 'PEDIDOS',
          notes: 'Indisponibilidade do estoque.',
          message: unavailableStockProduct,
        })
        return null
      }

      const totalOrder =
        total -
        couponValue +
        (deliveryMethodSel.price ? deliveryMethodSel.price : 0)

      let customerPagarmeID =
        user.profile && user.profile.customerPagarmeID
          ? user.profile.customerPagarmeID
          : ''

      let createdOrderPagarme = {} as any
      let qrCodePix = null
      let qrCodePixUrl = null
      const orderID = uuidv4()

      if (
        payMethodSel.method !== PaymentMethods.ONDELIVERY &&
        process.env.PAGARME_API &&
        totalOrder > 0
      ) {
        if (!customerPagarmeID) {
          customerPagarmeID = await getCustomerIDPagarme(user)
        }

        const itemsOrderPagarme = [] as any
        cart.map((i: any) => {
          let changeNameFmt = ''
          let code = ''
          if (i.products && i.products.length > 0) {
            i.products.map((pn: any) => {
              if (changeNameFmt) {
                changeNameFmt = changeNameFmt + ' / '
              }
              changeNameFmt = changeNameFmt + pn.name

              if (code) {
                code = code + ' / '
              }
              code = pn.code ? code + pn.code : code + pn.id
            })
          } else {
            code = i.product.code ? i.product.code : i.productID
          }
          const changeName = changeNameFmt
            ? changeNameFmt + ' - ' + i.changeName
            : i.changeName
          const amount =
            typeof i.unitPrice === 'string'
              ? parseFloat(i.unitPrice).toFixed(2).replace('.', '')
              : i.unitPrice.toFixed(2).replace('.', '')
          itemsOrderPagarme.push({
            code,
            amount,
            description: (i.products && i.products.length > 0
              ? changeName
              : i.changeName
              ? i.product.name + ' - ' + i.changeName
              : i.product.name
            ).trim(),
            quantity: i.qty,
          })
        })

        const card = {
          installments: 1,
          statement_descriptor: process.env.COMPANY,
        } as any

        if (payMethodSel.method !== PaymentMethods.PIX) {
          if (payMethodSel.cardPagarmeID) {
            card.card_id = payMethodSel.cardPagarmeID
          } else {
            card.card = {
              number: (crypto.decrypt(payMethodSel.number) as any).number,
              holder_name: payMethodSel.holderName,
              exp_month: payMethodSel.expMonth,
              exp_year: payMethodSel.expYear,
              cvv: payMethodSel.cvv,
              billing_address: {
                line_1: `${addressSel.street} ${addressSel.number} ${addressSel.complement}`,
                zip_code: addressSel.zipcode,
                city: addressSel.city,
                state: addressSel.state,
                country: 'BR',
              },
            } as any
            if (payMethodSel.holderDocument) {
              card.card.holder_document = payMethodSel.holderDocument
            }
          }
        }

        const payments = [] as any

        let amount = (
          total -
          couponValue +
          (deliveryMethodSel.price ? deliveryMethodSel.price : 0)
        )
          .toFixed(2)
          .replace('.', '')

        if (payMethodSel.method === PaymentMethods.DEBIT) {
          payments.push({
            amount,
            payment_method: 'debit_card',
            debit_card: card,
          })
        } else if (payMethodSel.method === PaymentMethods.PIX) {
          payments.push({
            amount,
            payment_method: 'pix',
            pix: { expires_in: 3600 },
          })
        } else {
          payments.push({
            amount,
            payment_method: 'credit_card',
            credit_card: card,
          })
        }

        const bodyOrderPagarme = {
          code: orderID,
          customer_id: customerPagarmeID,
          items: itemsOrderPagarme,
          payments,
          shipping: {
            amount: deliveryMethodSel.price.toFixed(2).replace('.', ''),
            description: user.name,
            recipient_name: user.name,
            recipient_phone: user.phone,
            address: {
              line_1: `${addressSel.street} ${addressSel.number} ${addressSel.complement}`,
              zip_code: addressSel.zipcode,
              city: addressSel.city,
              state: addressSel.state,
              country: 'BR', // addressSel.country
            },
          },
        }

        console.log(bodyOrderPagarme)

        const cod = await createOrderPagarme(bodyOrderPagarme)

        console.log(cod)

        if (cod && cod.data) {
          createdOrderPagarme = cod.data
        }

        if (createdOrderPagarme.message) {
          toast.error(createdOrderPagarme.message)
          setLogUser({
            userID: user.id,
            tag: 'PEDIDOS',
            notes: 'Erro ao processar pagamento.',
            message: JSON.stringify(createdOrderPagarme),
          })
        }

        if (
          createdOrderPagarme.charges &&
          createdOrderPagarme.charges[0] &&
          createdOrderPagarme.charges[0].last_transaction
        ) {
          const { last_transaction } = createdOrderPagarme.charges[0]

          const {
            gateway_response,
            antifraud_response,
            card,
            qr_code,
            qr_code_url,
          } = last_transaction

          if (qr_code && qr_code_url) {
            qrCodePix = qr_code
            qrCodePixUrl = qr_code_url
          }

          if (gateway_response.errors && gateway_response.errors.length > 0) {
            gateway_response.errors.map((e: any) => {
              toast.error(e.message)
            })
            await getCustomerIDPagarme(user)
          }

          if (card && card.id !== payMethodSel.cardPagarmeID) {
            const input = {
              id: payMethodSel.id,
              brand: card.brand,
              cardPagarmeID: card.id,
            }
            const ruc = await API.graphql(
              graphqlOperation(mutations.updatePayMethod, { input })
            )
          }
        }

        if (createdOrderPagarme.errors) {
          const errors = createdOrderPagarme.errors
          setLogUser({
            userID: user.id,
            tag: 'PAGAR.ME',
            notes: 'Erro ao processar pagamento.',
            message: JSON.stringify(errors),
          })

          Object.keys(errors).forEach((key) => {
            errors[key].map((m: string) => {
              toast.error(m)
            })
          })
        }
      }

      if (
        totalOrder > 0 &&
        payMethodSel.method !== PaymentMethods.ONDELIVERY &&
        createdOrderPagarme.status !== 'pending' &&
        createdOrderPagarme.status !== 'paid'
      ) {
        toast.hideAll()
        if (
          createdOrderPagarme.charges &&
          createdOrderPagarme.charges[0] &&
          createdOrderPagarme.charges[0].last_transaction &&
          createdOrderPagarme.charges[0].last_transaction.status
        ) {
          if (
            createdOrderPagarme.charges[0].last_transaction.status ===
            'not_authorized'
          ) {
            toast.error('Pagamento não autorizado.')
            setLogUser({
              userID: user.id,
              tag: 'PAGAR.ME',
              notes: 'Pagamento não autorizado.',
              message: JSON.stringify(createdOrderPagarme),
            })
          } else {
            toast.error(createdOrderPagarme.charges[0].last_transaction.status)
            setLogUser({
              userID: user.id,
              tag: 'PAGAR.ME',
              notes: createdOrderPagarme.charges[0].last_transaction.status,
              message: JSON.stringify(createdOrderPagarme),
            })
          }
        } else {
          toast.error('Falha ao processar pagamento.')
          setLogUser({
            userID: user.id,
            tag: 'PAGAR.ME',
            notes: 'Erro ao processar pagamento.',
            message: JSON.stringify(createdOrderPagarme),
          })
        }
        setLoadingFinalize(false)
        return null
      }

      let status =
        createdOrderPagarme.status === 'paid' ||
        payMethodSel.method === PaymentMethods.ONDELIVERY ||
        totalOrder === 0
          ? OrderStatus.APPROVED
          : OrderStatus.STANDBY

      const inputOrder = {
        id: orderID,
        userID: user.id,
        status,
        couponID: couponSel.id ? couponSel.id : null,
        couponName: couponSel.name ? couponSel.name : null,
        couponDiscount: couponValue,
        deliveryPrice: deliveryMethodSel.price ? deliveryMethodSel.price : 0,
        total: totalOrder,
        rating: 0,
        ratingNotes: '',
        addressReference: addressSel.reference,
        addressStreet: addressSel.street,
        addressNumber: addressSel.number,
        addressComplement: addressSel.complement,
        addressZipcode: addressSel.zipcode,
        addressNeighborhood: addressSel.neighborhood,
        addressCity: addressSel.city,
        addressState: addressSel.state,
        addressCountry: addressSel.country,
        createdAt: new Date().toISOString(),
        notes,
        qrCodePix,
        qrCodePixUrl,
        payMethod: payMethodSel.method,
        orderPagarmeID:
          createdOrderPagarme && createdOrderPagarme.id
            ? createdOrderPagarme.id
            : null,
      } as any

      const createdOrder = (await createOrder(inputOrder)) as any

      if (createdOrder && createdOrder.id) {

        newAvailableStock.map(async (p: any) => {
          if (p.productID) {
            await updateProduct({
              id: p.productID,
              qty: p.qty,
            })
          }
        })

        if (couponSel.id) {
          const coupon = await getCoupon({ id: couponSel.id })
          await updateCoupon({ id: couponSel.id, qtyUsed: coupon.qtyUsed + 1 })
          let totalProducts = 0
          cart.map((i: any) => {
            totalProducts += i.qty
          })
          await createCouponUsed({
            couponID: couponSel.id,
            userID: user.id,
            qty: totalProducts,
          })
        }

        setLogUser({
          userID: user.id,
          tag: 'PEDIDOS',
          notes: `Novo pedido no app #${Moment(inputOrder.createdAt).unix()}`,
          message: JSON.stringify(inputOrder),
        })

        cart.map(async (item: any) => {
          let changeNameFmt = ''
          let changeNameAdminFmt = ''
          if (item.products && item.products.length > 0) {
            item.products.map((pn: any) => {
              if (changeNameFmt) {
                changeNameFmt = changeNameFmt + ' / '
                changeNameAdminFmt = changeNameAdminFmt + ' / '
              }
              changeNameFmt = changeNameFmt + pn.name
              changeNameAdminFmt =
                changeNameAdminFmt +
                (pn.code ? `[${pn.code}] ${pn.name}` : pn.name)
            })
          }
          const changeName = changeNameFmt
            ? changeNameFmt + ' - ' + item.changeName
            : item.changeName
            ? item.product.name + ' - ' + item.changeName
            : item.product.name

          const changeNameAdmin = changeNameAdminFmt
            ? changeNameAdminFmt + ' - ' + item.changeName
            : item.changeName
            ? (item.product.code
                ? `[${item.product.code}] ${item.product.name}`
                : item.product.name) +
              ' - ' +
              item.changeName
            : item.product.code
            ? `[${item.product.code}] ${item.product.name}`
            : item.product.name

          const inputOrderItem = {
            orderID: createdOrder.id,
            productID: item.productID
              ? item.productID
              : item.products[0].productID,
            qty: item.qty,
            code: item.product.code,
            name: item.product.name,
            description: item.product.description,
            price: item.unitPrice,
            photo1: item.product.photo1,
            changeName,
            changeNameAdmin,
            changeDescription: item.changeDescription,
            changeQtyBlend: item.changeQtyBlend,
            changePriceAdjustment: item.changePriceAdjustment,
            blendID: item.blendID,
          }

          // console.log(inputOrderItem)

          const createdOrderItem = (await createOrderItem(
            inputOrderItem
          )) as any

          //  console.log(createdOrderItem)

          if (createdOrderItem && createdOrderItem.id) {
            item.options.items.map(async (item2: any) => {
              const inputOrderItemOption = {
                orderItemID: createdOrderItem.id,
                optionID: item2.optionID,
              }
              await createOrderItemOption(inputOrderItemOption)
            })
          }
        })

        if (process.env.SCHEDULED_DELIVERY && scheduledSel.date) {
          await createDeliveryOrder({
            orderID: createdOrder.id,
            date: scheduledSel.date,
            deliveryUserID: scheduledSel.profissionalID,
            status: DeliveryStatus.NEEDS_ACTION,
          })
        }
      }

      cart.map(async (i: any) => {
        if (i.products && i.products.length > 0) {
          i.products.map(async (i2: any) => {
            i2.options.items.map(async (i3: any) => {
              await deleteCartOption({ id: i3.id })
            })
            await deleteCart({ id: i2.cartID })
          })
        } else {
          await deleteCart({ id: i.id })
        }
      })

      router.push('/orders')
      setLoadingFinalize(false)
    } catch (r: any) {
      console.log(r)
      setLogUser({
        userID: user.id,
        tag: 'PEDIDOS',
        notes: 'Erro ao processar pagamento.',
        message: JSON.stringify(r),
      })
      setLoadingFinalize(false)
    }
  }

  const deliveryOpen = () => {
    const dayWeek = Moment().day()

    let deliveryOn = ''
    let deliveryOff = ''

    if (dayWeek === 0) {
      if (!config.deliveryOnSunday) {
        return { status: true }
      }
      deliveryOn = config.deliveryOnSunday
      deliveryOff = config.deliveryOffSunday
    } else if (dayWeek === 1) {
      if (!config.deliveryOnMonday) {
        return { status: true }
      }
      deliveryOn = config.deliveryOnMonday
      deliveryOff = config.deliveryOffMonday
    } else if (dayWeek === 2) {
      if (!config.deliveryOnTuesday) {
        return { status: true }
      }
      deliveryOn = config.deliveryOnTuesday
      deliveryOff = config.deliveryOffTuesday
    } else if (dayWeek === 3) {
      if (!config.deliveryOnWednesday) {
        return { status: true }
      }
      deliveryOn = config.deliveryOnWednesday
      deliveryOff = config.deliveryOffWednesday
    } else if (dayWeek === 4) {
      if (!config.deliveryOnThursday) {
        return { status: true }
      }
      deliveryOn = config.deliveryOnThursday
      deliveryOff = config.deliveryOffThursday
    } else if (dayWeek === 5) {
      if (!config.deliveryOnFriday) {
        return { status: true }
      }
      deliveryOn = config.deliveryOnFriday
      deliveryOff = config.deliveryOffFriday
    } else if (dayWeek === 6) {
      if (!config.deliveryOnSaturday) {
        return { status: true }
      }
      deliveryOn = config.deliveryOnSaturday
      deliveryOff = config.deliveryOffSaturday
    }

    const dateOn = Moment()
      .hour(parseInt(deliveryOn.split(':')[0]))
      .minute(parseInt(deliveryOn.split(':')[1]))

    const dateOff = Moment()
      .hour(parseInt(deliveryOff.split(':')[0]))
      .minute(parseInt(deliveryOff.split(':')[1]))

    return {
      status: dateOn <= Moment() && dateOff >= Moment() ? true : false,
      deliveryOn,
      deliveryOff,
    }
  }

  const upDoc = async (doc: any) => {
    await updateUser({ doc, docType: DocTypes.CPF })
  }

  useEffect(() => {
    if (doc && cpf.isValid(doc)) {
      upDoc(doc)
    }
  }, [doc])

  return (
    <Container className="p-4">
      {loadingCart && <Loading />}
      {!loadingCart && (
        <div className="overflow-x-auto select-none">
          <HeaderCart qtyItems={cart.length} tokenObj={tokenObj} />

          {cart && cart.length > 0 && (
            <div>
              {cart.map((p: any, k: number) => (
                <GetProduct
                  key={k}
                  cartID={p.id}
                  product={p.product}
                  options={p.options.items}
                  unitPrice={p.unitPrice}
                  qty={p.qty}
                  blendID={p.blendID}
                  changeName={p.changeName}
                  changePriceAdjustmen={p.changePriceAdjustmen}
                  changeQtyBlend={p.changeQtyBlend}
                  updateQty={updateQty}
                  removeProduct={removeProduct}
                  allowChangeQty={true}
                />
              ))}

              {cart.length > 1 && (
                <TotalItems total={total} qty={cart.length} />
              )}

              {(loadingAddress || loadingDeliveryMethods) && <Loading />}

              {total > 0 && user && (
                <Coupon
                  userID={user.id}
                  couponSel={couponSel}
                  setCouponSel={setCouponSel}
                  total={total}
                  setCouponValue={setCouponValue}
                  cart={cart}
                />
              )}

              {!loadingAddress && !loadingDeliveryMethods && user && (
                <DeliveryTax
                  setAddresses={setAddresses}
                  addresses={addresses}
                  setAddressSel={setAddressSel}
                  addressSel={addressSel}
                  userID={user.id}
                  deliveryMethodSel={deliveryMethodSel}
                  onlyDigital={onlyDigital}
                />
              )}

              {addressSel.id && deliveryMethodSel.id && (
                <TotalOrder
                  total={total - couponValue + deliveryMethodSel.price}
                />
              )}

              {user &&
                (!user.profile ||
                  !user.profile.doc ||
                  (user.profile.doc && !cpf.isValid(user.profile.doc))) &&
                addressSel.id && <Document doc={doc} setDoc={setDoc} />}

              {!loadingPayMethod &&
                user &&
                addressSel.id &&
                deliveryMethodSel.id &&
                user &&
                user.profile &&
                user.profile.doc &&
                total - couponValue + deliveryMethodSel.price > 0 && (
                  <PayMethods
                    setPayMethods={setPayMethods}
                    payMethods={payMethods}
                    setPayMethodSel={setPayMethodSel}
                    payMethodSel={payMethodSel}
                    userID={user.id}
                  />
                )}

              {process.env.SCHEDULED_DELIVERY &&
                addressSel.id &&
                deliveryMethodSel.id &&
                (payMethodSel.id ||
                  total - couponValue + deliveryMethodSel.price === 0) &&
                ((user && user.profile && user.profile.doc) || doc) && (
                  <ScheduleDelivery
                    zipcode={addressSel.zipcode}
                    scheduledSel={scheduledSel}
                    setScheduledSel={setScheduledSel}
                  />
                )}

              {config.showNotesCart &&
                addressSel.id &&
                deliveryMethodSel.id &&
                (payMethodSel.id ||
                  total - couponValue + deliveryMethodSel.price === 0) &&
                ((user && user.profile && user.profile.doc) || doc) &&
                (!process.env.SCHEDULED_DELIVERY ||
                  (process.env.SCHEDULED_DELIVERY && scheduledSel.date)) && (
                  <div className="px-1">
                    <textarea
                      value={notes}
                      onChange={(e) => {
                        setNotes(e.target.value)
                      }}
                      name="notes"
                      id="notes"
                      rows={2}
                      autoComplete="off"
                      placeholder={
                        config.notesCart
                          ? config.notesCart
                          : 'Alguma observação sobre seu pedido? Informe aqui.'
                      }
                      className="mt-4 w-full textarea textarea-accent"
                    />
                  </div>
                )}

              <Finalize
                tokenObj={tokenObj}
                finalizeOrder={finalizeOrder}
                loadingFinalize={loadingFinalize}
                message={
                  !deliveryOpen().status
                    ? `Horário do delivery das ${deliveryOpen().deliveryOn} às
                  ${deliveryOpen().deliveryOff}.`
                    : config.minValueOrder > 0 && config.minValueOrder > total
                    ? `O valor mínimo da compra é de R$ ${config.minValueOrder
                        .toFixed(2)
                        .replace(',', '.')}.`
                    : ''
                }
                disabled={
                  !addressSel.id ||
                  !deliveryMethodSel.id ||
                  ((!payMethodSel || (payMethodSel && !payMethodSel.id)) &&
                    total - couponValue + deliveryMethodSel.price > 0) ||
                  (config.minValueOrder > 0 && config.minValueOrder > total) ||
                  !deliveryOpen().status
                }
                showFinalize={
                  doc &&
                  cpf.isValid(doc) &&
                  addressSel.id &&
                  (payMethodSel.id ||
                    total - couponValue + deliveryMethodSel.price === 0) &&
                  (!process.env.SCHEDULED_DELIVERY ||
                    (process.env.SCHEDULED_DELIVERY && scheduledSel.date))
                }
                showContinuePay={true}
              />
            </div>
          )}
        </div>
      )}
    </Container>
  )
}

CartPage.Layout = Layout

interface HeaderCartProps {
  qtyItems: number
  tokenObj: any
}
export function HeaderCart(props: HeaderCartProps) {
  const { qtyItems, tokenObj } = props
  return (
    <div className="pb-4">
      <h2 className="tracking-widest text-xs title-font font-medium text-tertiary-2">
        CARRINHO DE COMPRAS
      </h2>
      {qtyItems == 0 && (
        <div>
          <h1 className="title-font text-xl font-medium text-accent-9">
            Nenhum item no carrinho de compras.
          </h1>
          <Link
            href={`${
              tokenObj && tokenObj.origin ? tokenObj.origin : process.env.HOME
            }`}
          >
            <a className="mt-4 btn btn-outline cursor-pointer text-accent-6">
              <ArrowLeft /> Continuar Comprando
            </a>
          </Link>
        </div>
      )}
      {qtyItems > 0 && (
        <h1 className="title-font text-xl font-medium text-accent-9">
          {qtyItems === 1 && <span>Produto selecionado</span>}
          {qtyItems > 1 && <span>Produtos selecionados</span>}
        </h1>
      )}
    </div>
  )
}

interface PropsProduct {
  cartID: string
  product: any
  options: any
  unitPrice: number
  qty: number
  blendID: string
  changeName: string
  changePriceAdjustmen: number
  changeQtyBlend: number
  updateQty: any
  removeProduct: any
  allowChangeQty: boolean
}
export function GetProduct(props: PropsProduct) {
  const {
    cartID,
    product,
    options,
    unitPrice,
    qty,
    updateQty,
    removeProduct,
    blendID,
    changeName,
    changePriceAdjustmen,
    changeQtyBlend,
    allowChangeQty,
  } = props
  const { theme } = useTheme()

  const getPhoto = (photo: string) => {
    return photo && photo.substr(0, 4) === 'http'
      ? photo
      : photo
      ? `${process.env.MIDIA_CLOUDFRONT}${photo}`
      : '/images/no_photo.png'
  }

  return (
    <div className="w-full py-1">
      <div
        style={{ backgroundColor: theme == 'light' ? '#fff' : '#1F2029' }}
        className="p-3 w-full rounded shadow"
      >
        <div className="flex justify-between">
          <div className="w-full grid grid-cols-2 md:grid-cols-4">
            <div className="mb-4 md:mb-0 col-span-full md:col-span-2">
              <div className="flex justify-between">
                <div className="w-full flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-12 h-12 mask mask-squircle">
                      <Image
                        alt={product.name}
                        className="bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle"
                        src={
                          product.thumbnail
                            ? `${process.env.MIDIA_CLOUDFRONT}${product.thumbnail}`
                            : getPhoto(product.photo1)
                        }
                        width={64}
                        height={64}
                      />
                    </div>
                  </div>
                  <div>
                    {product.categoryProps && (
                      <div className="text-xs text-tertiary-2">
                        {product.categoryProps.title}
                      </div>
                    )}
                    <div className="text-accent-6 text-xl font-semibold">
                      {product.name}{' '}
                      {changeName && <span> - {changeName}</span>}
                    </div>
                    {options.map(
                      (o: any, index: number) =>
                        o.option && (
                          <div
                            className="font-normal badge badge-info mr-1 text-white"
                            key={index}
                          >
                            {o.option.name}
                          </div>
                        )
                    )}
                  </div>
                </div>
                <div className="flex md:hidden justify-end flex-wrap content-start">
                  <a
                    data-tip="Excluir"
                    title="Excluir"
                    className="text-red-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                    onClick={() => removeProduct(cartID, product.name)}
                  >
                    <Trash />
                  </a>
                </div>
              </div>
            </div>
            {!allowChangeQty && <div></div>}
            {allowChangeQty && (
              <div className="h-full flex items-center justify-start md:justify-center">
                <a
                  data-tip="Menos 1"
                  title="Menos 1"
                  className="mr-2 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  onClick={() => {
                    if (qty - 1 > 0) {
                      updateQty(cartID, qty - 1)
                    }
                  }}
                >
                  <Minus />
                </a>
                <div style={{ width: 80 }}>
                  <input
                    className="py-2 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    value={qty}
                    onChange={(e) => {
                      const q = parseInt(e.target.value)
                      if (q > 0) {
                        updateQty(cartID, q)
                      }
                    }}
                    type="number"

                    min="1"
                    step="1"
                  />
                </div>
                <a
                  data-tip="Mais 1"
                  title="Mais 1"
                  className="ml-2 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  onClick={() => {
                    updateQty(cartID, qty + 1)
                  }}
                >
                  <Plus />
                </a>
              </div>
            )}
            <div className="h-full flex items-center justify-end text-lg font-semibold">
              <NumberFormat
                value={qty * unitPrice}
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
          <div className="hidden md:flex ml-4 justify-end flex-wrap content-center">
            <a
              data-tip="Excluir"
              title="Excluir"
              className="text-red-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
              onClick={() => removeProduct(cartID, product.name)}
            >
              <Trash />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TotalItemsProps {
  total: any
  qty: number
}
export function TotalItems(props: TotalItemsProps) {
  const { total, qty } = props
  return (
    <div className="mt-4 p-3 bg-accent-1 rounded-lg flex justify-between">
      <div className="text-lg lg:text-xl text-accent-9 font-bold">
        {qty === 1 && <span>Total do item</span>}
        {qty > 1 && <span>Total dos items</span>}
      </div>
      <div className="flex-none text-lg lg:text-xl text-accent-9 font-bold">
        <NumberFormat
          value={total}
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
  )
}

interface DeliveryTaxProps {
  addresses: any
  setAddresses: any
  addressSel: any
  setAddressSel: any
  userID: string
  deliveryMethodSel: any
  onlyDigital: boolean
}
export function DeliveryTax(props: DeliveryTaxProps) {
  const {
    setAddresses,
    addresses,
    setAddressSel,
    addressSel,
    userID,
    deliveryMethodSel,
    onlyDigital,
  } = props
  const [displayModal, setDisplayModal] = useState(false)
  const { screenHeight } = useScreen()

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [reference, setReference] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [addressPagarmeID, setAddressPagarmeID] = useState('')

  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [showAddresses, setShowAddresses] = useState(false)

  const { updateUserAddresses } = useUserAuth()

  useEffect(() => {
    let isMounted = true
    if (isMounted && addressSel.id) {
      setId(addressSel.id)
      setName(addressSel.name)
      setReference(addressSel.reference)
      setStreet(addressSel.street)
      setNumber(addressSel.number)
      setComplement(addressSel.complement)
      setZipcode(addressSel.zipcode)
      setNeighborhood(addressSel.neighborhood)
      setCity(addressSel.city)
      setState(addressSel.state)
      setCountry(addressSel.country)
      setAddressPagarmeID(addressSel.addressPagarmeID)
    }
    return () => {
      setId('')
      setName('')
      setReference('')
      setStreet('')
      setNumber('')
      setComplement('')
      setZipcode('')
      setNeighborhood('')
      setCity('')
      setState('')
      setCountry('')
      setAddressPagarmeID('')
      setLoading(false)
      setDirty(true)
      setDisabled(false)
    }
  }, [addressSel])

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    setLoading(true)

    const a = await updateUserAddresses({
      id,
      userID,
      name,
      reference,
      street,
      number,
      complement,
      zipcode,
      neighborhood,
      city,
      state,
      country,
      addressPagarmeID,
    })

    setAddressSel(a)

    if (!id) {
      setAddresses((addresses: any) => [...addresses, a])
      localStorage.setItem('addressID', a.id)
    } else {
      setAddresses(
        addresses.map((item: any, index: number) => {
          if (id !== item.id) {
            return item
          } else {
            return {
              id,
              userID,
              name,
              reference,
              street,
              number,
              complement,
              zipcode,
              neighborhood,
              city,
              state,
              country,
              addressPagarmeID: a.addressPagarmeID ? a.addressPagarmeID : null,
            }
          }
        })
      )
    }

    setDisplayModal(false)
    setLoading(false)
  }

  const handleValidation = useCallback(() => {
    if (dirty) {
      setDisabled(!zipcode || !street || !city || !state || !number)
    }
  }, [zipcode, street, city, state, number, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <div>
      {!addressSel.id && (
        <div className="mt-2 flex flex-col lg:flex-row">
          <button
            onClick={() => {
              setDisplayModal(true)
            }}
            className="btn btn-outline btn-error"
          >
            <Pin className="mr-2" />
            {!onlyDigital && <span>Endereço para Entrega</span>}
            {onlyDigital && <span>Cadastre seu Endereço</span>}
          </button>
        </div>
      )}

      {addressSel.id && (
        <div className="mt-2 p-3 bg-accent-1 rounded-lg">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => {
              setShowAddresses(!showAddresses)
            }}
          >
            <div className="flex flex-row">
              <div>
                <a
                  title="Alterar"
                  className="text-tertiary-2 mr-2 z-10 cursor-pointer bg-accent-0 p-2 rounded-full flex items-center justify-center"
                >
                  <Pin />
                </a>
              </div>
              <div className="cursor-pointer">
                <div className="cursor-pointer text-base lg:text-xl text-accent-9 font-bold">
                  {!onlyDigital && <span>Entrega</span>}{' '}
                  {addressSel.name && <span>({addressSel.name})</span>}
                </div>
                <div className="text-xs line-clamp-1">
                  {addressSel.street}
                  {addressSel.number && <span> {addressSel.number}</span>}
                </div>
              </div>
            </div>
            {!onlyDigital && deliveryMethodSel.price === 0 && (
              <div className="mt-3 badge badge-success font-semibold text-white">
                GRÁTIS
              </div>
            )}
            {deliveryMethodSel.price > 0 && (
              <div className="mt-1 flex-none text-lg lg:text-xl text-accent-9 font-bold">
                <NumberFormat
                  value={
                    deliveryMethodSel && deliveryMethodSel.price
                      ? deliveryMethodSel.price
                      : 0
                  }
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
          </div>
          {showAddresses && (
            <div className="mt-3">
              {addresses.map((i: any, index: number) => (
                <div className="my-1" key={index}>
                  {i.id === addressSel.id && (
                    <button
                      className="btn btn-accent text-white btn-block"
                      onClick={() => {
                        setShowAddresses(false)
                        setDisplayModal(true)
                        localStorage.setItem('addressID', i.id)
                      }}
                    >
                      {i.street}, {i.number}
                      {i.name && <span>&nbsp;({i.name})</span>}
                    </button>
                  )}
                  {i.id !== addressSel.id && (
                    <button
                      className="btn btn-outline btn-accent btn-block"
                      onClick={() => {
                        setShowAddresses(false)
                        setAddressSel(i)
                        localStorage.setItem('addressID', i.id)
                      }}
                    >
                      {i.street}, {i.number}
                      {i.name && <span>&nbsp;({i.name})</span>}
                    </button>
                  )}
                </div>
              ))}
              <div className="my-1">
                <button
                  className="btn btn-primary btn-block text-white"
                  onClick={() => {
                    setId('')
                    setName('')
                    setReference('')
                    setStreet('')
                    setNumber('')
                    setComplement('')
                    setZipcode('')
                    setNeighborhood('')
                    setCity('')
                    setState('')
                    setCountry('')
                    setLoading(false)
                    setDirty(true)
                    setDisabled(false)
                    setDisplayModal(true)
                    setShowAddresses(false)
                  }}
                >
                  <Plus width={16} height={16} />
                  &nbsp; Novo endereço
                </button>
              </div>
            </div>
          )}

          {addressSel.id && !deliveryMethodSel.id && (
            <div className="mt-3 alert alert-error rounded-lg">
              <div className="flex-1 text-lg font-semibold">
                <label>
                  <Info /> Infelizmente seu endereço não esta em nossa área de
                  cobertura. Seu pedido não poderá ser finalizado!
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      <Modal
        open={displayModal}
        onClose={() => {
          setDisplayModal(false)
        }}
        focusTrap={false}
        title={
          <div className="mt-2 text-2xl font-semibold">
            <Pin /> <span className="ml-2">Endereço</span>
          </div>
        }
      >
        <div
          className="overflow-y-auto"
          style={{ maxHeight: screenHeight, maxWidth: 800 }}
        >
          <AddressForm
            handleSubmit={handleSubmit}
            zipcode={zipcode}
            setZipcode={setZipcode}
            name={name}
            setName={setName}
            reference={reference}
            setReference={setReference}
            street={street}
            setStreet={setStreet}
            number={number}
            setNumber={setNumber}
            complement={complement}
            setComplement={setComplement}
            neighborhood={neighborhood}
            setNeighborhood={setNeighborhood}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            country={country}
            setCountry={setCountry}
            loading={loading}
            disabled={disabled}
          />
        </div>
      </Modal>
    </div>
  )
}

interface CouponProps {
  userID: string
  setCouponSel: any
  couponSel: any
  total: number
  setCouponValue: any
  cart: any
}
export function Coupon(props: CouponProps) {
  const { userID, setCouponSel, couponSel, total, setCouponValue, cart } = props
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [description, setDescription] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [value] = useDebounce(code, 900)

  const { listCouponsByCode, listUsedByCouponUser } = useCoupon()

  const getDiscount = () => {
    let discountValue = 0
    if (
      couponSel.products &&
      couponSel.products.items &&
      couponSel.products.items.length > 0
    ) {
      cart.map((itemCart: any) => {
        couponSel.products.items.map((productCoupon: any) => {
          if (itemCart.productID === productCoupon.product.id) {
            const dc = itemCart.unitPrice - productCoupon.price
            const q =
              itemCart.qty > productCoupon.limit
                ? productCoupon.limit
                : itemCart.qty

            discountValue += discountValue + q * dc
          }
        })
      })
      couponSel.discountValue = discountValue
      setCouponSel(couponSel)
    } else {
      if (couponSel && couponSel.id) {
        if (couponSel.discountPercentage > 0) {
          discountValue = (total * parseInt(couponSel.discountPercentage)) / 100
        } else if (couponSel.discountValue > 0) {
          discountValue = couponSel.discountValue
        }
      }
    }
    setCouponValue(discountValue)
    return discountValue
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const searchCode = async (code: string) => {
        setMessage('')
        setDescription('')
        setIsLoading(true)
        const { items } = await listCouponsByCode({ code: code.toUpperCase() })
        if (items && items.length > 0) {
          let coupon = items[0]
          const qtyUsed = coupon.qtyUsed ? coupon.qtyUsed : 0
          const qtyProductUsed = coupon.qtyProductUsed
            ? coupon.qtyProductUsed
            : 0

          if (coupon.qtyLimit > 0 && coupon.qtyLimit <= qtyUsed) {
            setIsSuccess(false)
            setCouponValue(0)
            setCouponSel({} as any)
            setMessage('Este cupom de desconto esgotou!')
            setDescription('')
          } else if (
            coupon.qtyProduct > 0 &&
            coupon.qtyProduct <= qtyProductUsed
          ) {
            setIsSuccess(false)
            setCouponValue(0)
            setCouponSel({} as any)
            setMessage('Os produtos deste cupom de desconto esgotaram!')
            setDescription('')
          } else if (Moment(coupon.expiration) < Moment()) {
            setIsSuccess(false)
            setCouponValue(0)
            setCouponSel({} as any)
            setDescription('')
            setMessage(
              `Este cupom expirou em ${Moment(coupon.expiration).format(
                'DD-MM-YYYY'
              )}.`
            )
          } else {
            let ttp = 0
            items.map((p1: any) => {
              p1.products.items.map((p2: any) => {
                ttp += p2.limit
              })
            })

            const used = await listUsedByCouponUser({
              couponID: coupon.id,
              userID: { eq: userID },
            })

            let tt = 0
            used.items.map((q: any) => {
              tt += q.qty ? q.qty : 0
            })

            if (used && used.items && used.items.length > 0 && tt >= ttp) {
              setIsSuccess(false)
              setCouponValue(0)
              setCouponSel({} as any)
              setMessage('Você já utilizou este cupom!')
              setDescription('')
            } else {
              if (
                coupon.products &&
                coupon.products.items &&
                coupon.products.items.length > 0
              ) {
                let discountValue = 0
                let applied = 0
                cart.map((p: any) => {
                  coupon.products.items.map((p2: any) => {
                    if (applied <= p2.limit && p.productID === p2.product.id) {
                      applied += 1
                      discountValue += discountValue + p.unitPrice - p2.price
                    }
                  })
                })
                coupon.discountValue = discountValue
                setCouponSel(coupon)
                toast.hideAll()
                setIsSuccess(true)
                setIsLoading(false)
                setDescription(coupon.description ? coupon.description : '')
                setMessage(
                  `O cupom ${
                    coupon.name ? coupon.name : 'de desconto'
                  } de R$ ${coupon.discountValue
                    .toFixed(2)
                    .replace('.', ',')} foi aplicado com sucesso.`
                )
              } else {
                setCouponSel(coupon)
                toast.hideAll()
                setIsSuccess(true)
                setIsLoading(false)
                setMessage('')
                setDescription(coupon.description ? coupon.description : '')
                if (coupon.discountPercentage > 0) {
                  setMessage(
                    `O cupom ${coupon.name ? coupon.name : 'de desconto'} de ${
                      coupon.discountPercentage
                    }% de desconto foi aplicado com sucesso.`
                  )
                } else {
                  setMessage(
                    `O cupom ${
                      coupon.name ? coupon.name : 'de desconto'
                    } de R$ ${coupon.discountValue
                      .toFixed(2)
                      .replace('.', ',')} foi aplicado com sucesso.`
                  )
                }
              }
            }
          }
        } else {
          setIsSuccess(false)
          setIsLoading(false)
          setCouponValue(0)
          setCouponSel({} as any)
          setMessage('Nenhum cupom de desconto localizado com este código.')
        }
      }
      if (value) {
        searchCode(value)
      } else {
        setIsSuccess(false)
        setCouponSel({} as any)
        setMessage('')
        setCouponValue(0)
      }
    }
    return () => {
      isMounted = false
      setIsSuccess(false)
      setCouponSel({} as any)
      setMessage('')
      setCouponValue(0)
    }
  }, [value])

  return (
    <div className="mt-2 p-3 bg-accent-1 rounded-lg">
      <div className="flex justify-between">
        <div className="flex">
          <div className="text-tertiary-2 w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            <Ticket />
          </div>
          <input
            className="pl-10 py-2 bg-accent-0 w-full -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
            }}
            type="text"
            placeholder="Cupom de desconto"
          />
        </div>
        <div className="mt-2 flex-none text-lg lg:text-xl text-accent-9 font-bold">
          {isLoading && (
            <button className="btn btn-sm btn-circle loading"></button>
          )}
          {!isLoading && couponSel && couponSel.id && (
            <NumberFormat
              value={getDiscount()}
              thousandsGroupStyle="thousand"
              prefix="- R$ "
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
      {message && (
        <div
          className={`mt-3 alert text-white ${
            isSuccess ? 'alert-success' : 'alert-error'
          } rounded-lg`}
        >
          <div className="flex-1 text-lg font-semibold">
            <div>
              <div>
                <Info /> <span className="ml-2">{message}</span>
              </div>
              {description && (
                <div className="text-sm font-normal">{description}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface TotalOrderProps {
  total: any
}
export function TotalOrder(props: TotalOrderProps) {
  const { total } = props
  return (
    <div className="mt-4 p-3 bg-accent-4 rounded-lg flex justify-between">
      <div className="text-xl lg:text-2xl text-accent-0 font-bold">
        Total do Pedido
      </div>
      <div className="flex-none text-xl lg:text-2xl text-accent-0 font-bold">
        <NumberFormat
          value={total}
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
  )
}

interface ScheduleDeliveryProps {
  zipcode: string
  setScheduledSel: any
  scheduledSel: any
}
export function ScheduleDelivery(props: ScheduleDeliveryProps) {
  const { zipcode, setScheduledSel, scheduledSel } = props
  const [isLoading, setIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [showScheduleAvailable, setShowScheduleAvailable] = useState(false)
  const [usersAvailable, setUsersAvailable] = useState<any[]>([])
  const [scheduleAvailable, setScheduleAvailable] = useState<any[]>([])
  const { config } = useUI()
  const { listUsersByGroup } = useGroupUser()
  const { listDeliveryByDateUser } = useDeliveryOrder()

  useEffect(() => {
    let isMounted = true
    if (isMounted && zipcode) {
      const fetchSA = async () => {
        setIsLoading(true)
        const { items } = await listUsersByGroup({
          group: 'Profissional',
        })
        let uaSel = [] as any
        items.map((ua: any) => {
          ua.profile.zipCodeCoverage &&
            ua.profile.zipCodeCoverage.map((z: string) => {
              if (z.indexOf('*') === -1) {
                if (z.replace(/\D/g, '') === zipcode.replace(/\D/g, '')) {
                  const exists = uaSel.filter((v: any) => {
                    return v.userID === ua.userID
                  })
                  if (exists.length === 0) {
                    uaSel.push(ua)
                  }
                }
              } else {
                const zp = z.substr(0, z.indexOf('*'))
                if (zp === zipcode.replace(/\D/g, '').substr(0, zp.length)) {
                  const exists = uaSel.filter((v: any) => {
                    return v.userID === ua.userID
                  })
                  if (exists.length === 0) {
                    uaSel.push(ua)
                  }
                }
              }
            })
        })
        setUsersAvailable(uaSel)
        setIsLoading(false)
        setTimeout(() => {
          setIsLoading2(false)
        }, 1000)
      }
      fetchSA()
    }
    return () => {
      setUsersAvailable([] as any)
      setIsLoading(true)
      setIsLoading2(true)
    }
  }, [zipcode])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchDays = async () => {
        setIsLoading(true)
        await checkDay(Moment().add(0, 'days').format('YYYY-MM-DD'))
        await checkDay(Moment().add(1, 'days').format('YYYY-MM-DD'))
        await checkDay(Moment().add(2, 'days').format('YYYY-MM-DD'))
        await checkDay(Moment().add(3, 'days').format('YYYY-MM-DD'))
        await checkDay(Moment().add(4, 'days').format('YYYY-MM-DD'))
        await checkDay(Moment().add(5, 'days').format('YYYY-MM-DD'))
        await checkDay(Moment().add(6, 'days').format('YYYY-MM-DD'))
        await checkDay(Moment().add(7, 'days').format('YYYY-MM-DD'))
        setIsLoading(false)
      }
      fetchDays()
    }
    return () => {
      setScheduleAvailable([] as any)
      setIsLoading(true)
    }
  }, [usersAvailable])

  const checkAvailability = async (
    profissionalID: string,
    profissionalName: string,
    profissionalAvatar: string,
    date: string
  ) => {
    const { items } = await listDeliveryByDateUser({
      date: date,
      deliveryUserID: { eq: profissionalID },
      limit: 1,
    })
    if (items.length === 0) {
      setScheduleAvailable((scheduleAvailable: any) => [
        ...scheduleAvailable,
        { profissionalID, profissionalName, profissionalAvatar, date },
      ])
    }
  }

  const checkDay = async (currentDate: string) => {
    await usersAvailable.map(async (ua: any) => {
      const dayWeek = Moment(currentDate).day() // 0 a 6
      const profissionalID = ua.userID
      const profissionalName = ua.user.name
      const profissionalAvatar = ua.user.avatar

      if (dayWeek === 0) {
        await ua.profile.schedulesSunday.map(async (t: string) => {
          if (t) {
            const date = Moment(currentDate)
              .hour(parseInt(t.split(':')[0]))
              .minute(parseInt(t.split(':')[1]))
            if (date > Moment()) {
              await checkAvailability(
                profissionalID,
                profissionalName,
                profissionalAvatar,
                date.toDate().toISOString()
              )
            }
          }
        })
      } else if (dayWeek === 1) {
        await ua.profile.schedulesMonday.map(async (t: string) => {
          if (t) {
            const date = Moment(currentDate)
              .hour(parseInt(t.split(':')[0]))
              .minute(parseInt(t.split(':')[1]))
            if (date > Moment()) {
              await checkAvailability(
                profissionalID,
                profissionalName,
                profissionalAvatar,
                date.toDate().toISOString()
              )
            }
          }
        })
      } else if (dayWeek === 2) {
        await ua.profile.schedulesTuesday.map(async (t: string) => {
          if (t) {
            const date = Moment(currentDate)
              .hour(parseInt(t.split(':')[0]))
              .minute(parseInt(t.split(':')[1]))
            if (date > Moment()) {
              await checkAvailability(
                profissionalID,
                profissionalName,
                profissionalAvatar,
                date.toDate().toISOString()
              )
            }
          }
        })
      } else if (dayWeek === 3) {
        await ua.profile.schedulesWednesday.map(async (t: string) => {
          if (t) {
            const date = Moment(currentDate)
              .hour(parseInt(t.split(':')[0]))
              .minute(parseInt(t.split(':')[1]))
            if (date > Moment()) {
              await checkAvailability(
                profissionalID,
                profissionalName,
                profissionalAvatar,
                date.toDate().toISOString()
              )
            }
          }
        })
      } else if (dayWeek === 4) {
        await ua.profile.schedulesThursday.map(async (t: string) => {
          if (t) {
            const date = Moment(currentDate)
              .hour(parseInt(t.split(':')[0]))
              .minute(parseInt(t.split(':')[1]))
            if (date > Moment()) {
              await checkAvailability(
                profissionalID,
                profissionalName,
                profissionalAvatar,
                date.toDate().toISOString()
              )
            }
          }
        })
      } else if (dayWeek === 5) {
        await ua.profile.schedulesFriday.map(async (t: string) => {
          if (t) {
            const date = Moment(currentDate)
              .hour(parseInt(t.split(':')[0]))
              .minute(parseInt(t.split(':')[1]))
            if (date > Moment()) {
              await checkAvailability(
                profissionalID,
                profissionalName,
                profissionalAvatar,
                date.toDate().toISOString()
              )
            }
          }
        })
      } else if (dayWeek === 6) {
        await ua.profile.schedulesSaturday.map(async (t: string) => {
          if (t) {
            const date = Moment(currentDate)
              .hour(parseInt(t.split(':')[0]))
              .minute(parseInt(t.split(':')[1]))
            if (date > Moment()) {
              await checkAvailability(
                profissionalID,
                profissionalName,
                profissionalAvatar,
                date.toDate().toISOString()
              )
            }
          }
        })
      }
    })
  }

  return (
    <div className="mt-2 p-3 bg-accent-1 rounded-lg">
      {scheduledSel.date && (
        <div
          className="cursor-pointer"
          onClick={() => {
            setShowScheduleAvailable(!showScheduleAvailable)
          }}
        >
          <div className="flex justify-between">
            <div className="flex flex-row">
              <a title="Alterar" className="absolute cursor-pointer">
                <Avatar avatarKey={scheduledSel.profissionalAvatar} size={42} />
              </a>
              <div style={{ marginLeft: 48 }} className="cursor-pointer">
                <div className="cursor-pointer text-base lg:text-xl text-accent-9 font-bold">
                  {scheduledSel.profissionalName}
                </div>
                <div className="text-xs line-clamp-1">
                  Responsável pela aplicação
                </div>
              </div>
            </div>
            <div>
              <div className="text-right text-sm text-red-500 font-semibold">
                {Moment(scheduledSel.date).format('DD-MM-YYYY')}
              </div>
              <div className="text-right text-sm text-red-500 font-semibold">
                às {Moment(scheduledSel.date).format('HH:mm')}
              </div>
            </div>
          </div>
        </div>
      )}

      {(isLoading || isLoading2) && <Loading />}

      {!isLoading2 && scheduleAvailable.length === 0 && (
        <div className="pb-2">
          <div className="pb-2 text-lg font-semibold text-red-500 text-center md:text-left">
            Infelizmente não há nenhum horário disponível para agendamento.
          </div>
          {config.phoneOrders && (
            <div className="flex justify-center md:justify-start">
              <a
                href={`tel:${config.phoneOrders.substring(
                  3,
                  config.phoneOrders.length
                )}`}
                className="btn btn-error btn-outline btn-sm"
              >
                Falar com um atendente?
              </a>
            </div>
          )}
        </div>
      )}

      {!isLoading &&
        !isLoading2 &&
        (!scheduledSel.date || showScheduleAvailable) && (
          <div className={scheduledSel.date && 'mt-2'}>
            {scheduleAvailable.length > 0 && (
              <div className="text-lg font-semibold text-center">
                Horários disponíveis para agendamento
              </div>
            )}

            {scheduleAvailable.length > 0 &&
              scheduleAvailable
                .sort((a: any, b: any) => a.date.localeCompare(b.date))
                .map((sa: any, idx: number) => (
                  <div key={idx} className="my-1">
                    {(!idx ||
                      (idx > 1 &&
                        scheduleAvailable[idx - 1] &&
                        !Moment(sa.date).isSame(
                          scheduleAvailable[idx - 1].date,
                          'day'
                        ))) && (
                      <div className="mt-4 mb-2 text-center font-medium text-lg capitalize text-accent-7">
                        {Moment(sa.date).format('dddd DD-MM-YYYY')}
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setScheduledSel({
                          date: sa.date,
                          profissionalID: sa.profissionalID,
                          profissionalName: sa.profissionalName,
                          profissionalAvatar: sa.profissionalAvatar,
                        })
                        setShowScheduleAvailable(false)
                      }}
                      className="btn btn-outline btn-accent btn-block bg-white"
                    >
                      Às {Moment(sa.date).format('HH:mm')} hs com{' '}
                      {sa.profissionalName}
                    </button>
                  </div>
                ))}
          </div>
        )}
    </div>
  )
}

interface PayMethodsProps {
  setPayMethods: any
  payMethods: any
  setPayMethodSel: any
  payMethodSel: any
  userID: string
}
export function PayMethods(props: PayMethodsProps) {
  const { setPayMethods, payMethods, setPayMethodSel, payMethodSel, userID } =
    props
  const [displayModal, setDisplayModal] = useState(false)
  const { screenHeight } = useScreen()

  const [id, setId] = useState('')
  const [method, setMethod] = useState('CREDIT')
  const [number, setNumber] = useState('')
  const [holderName, setHolderName] = useState('')
  const [holderDocument, setHolderDocument] = useState('')
  const [expMonth, setExpMonth] = useState('')
  const [expYear, setExpYear] = useState('')
  const [cvv, setCvv] = useState('')
  const [brand, setBrand] = useState('')
  const [label, setLabel] = useState('')
  const [cardPagarmeID, setCardPagarmeID] = useState('')

  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [showPayMethods, setShowPayMethods] = useState(false)

  const { updatePayMethod } = useUserAuth()

  useEffect(() => {
    let isMounted = true
    if (isMounted && payMethodSel.id) {
      setId(payMethodSel.id)
      setMethod(payMethodSel.method)
      setNumber('')
      setHolderName(payMethodSel.holderName)
      setHolderDocument(payMethodSel.holderDocument)
      setExpMonth(payMethodSel.expMonth)
      setExpYear(payMethodSel.expYear)
      setCvv(payMethodSel.cvv)
      setBrand(payMethodSel.brand)
      setLabel(payMethodSel.label)
      setCardPagarmeID(payMethodSel.cardPagarmeID)
    }
    return () => {
      setId('')
      setMethod('CREDIT')
      setNumber('')
      setHolderName('')
      setHolderDocument('')
      setExpMonth('')
      setExpYear('')
      setCvv('')
      setBrand('')
      setLabel('')
      setCardPagarmeID('')
      setLoading(false)
      setDirty(true)
      setDisabled(false)
    }
  }, [payMethodSel])

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    setLoading(true)

    const a = await updatePayMethod({
      id,
      method,
      userID,
      number: number.replace(/\D/g, ''),
      holderName,
      holderDocument,
      expMonth,
      expYear,
      cvv,
      brand,
      label,
      cardPagarmeID,
    })

    if (a) {
      setPayMethodSel(a)

      if (!id && !a.exists) {
        setPayMethods((payMethods: any) => [...payMethods, a])
        localStorage.setItem('payMethodID', a.id)
      } else {
        setPayMethods(
          payMethods.map((item: any, index: number) => {
            if (id !== item.id) {
              return item
            } else {
              return {
                id,
                method,
                userID,
                number,
                holderName,
                holderDocument,
                expMonth,
                expYear,
                cvv,
                brand,
                label,
                cardPagarmeID: a.cardPagarmeID ? a.cardPagarmeID : null,
              }
            }
          })
        )
      }

      setDisplayModal(false)
      setLoading(false)
    } else {
      toast.error(
        id
          ? 'Erro ao atualizar o cartão de crédito. Verifique os dados.'
          : 'Erro ao cadastrar o cartão de crédito. Verifique os dados.'
      )
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    if (dirty) {
      setDisabled(!number || !holderName || !expMonth || !expYear || !cvv)
    }
  }, [number, holderName, expMonth, expYear, cvv, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <div>
      {!payMethodSel.id && (
        <div className="mt-2 flex flex-col lg:flex-row">
          <button
            onClick={() => {
              setDisplayModal(true)
            }}
            className="btn btn-outline btn-block btn-error"
          >
            <CreditCard className="mr-2" /> Forma de Pagamento
          </button>
        </div>
      )}

      {payMethodSel.id && (
        <div className="mt-2 p-3 bg-accent-1 rounded-lg">
          <div
            className="flex flex-row cursor-pointer"
            onClick={() => {
              setShowPayMethods(!showPayMethods)
            }}
          >
            <div>
              <a
                title="Alterar"
                className="text-tertiary-2 mr-2 z-10 cursor-pointer bg-accent-0 p-2 rounded-full flex items-center justify-center"
              >
                <CreditCard />
              </a>
            </div>
            <div>
              <div className="cursor-pointer text-base lg:text-xl text-accent-9 font-bold">
                {payMethodSel.method === PaymentMethods.CREDIT && (
                  <span>Crédito&nbsp;</span>
                )}
                {payMethodSel.method === PaymentMethods.DEBIT && (
                  <span>Débito&nbsp;</span>
                )}
                {payMethodSel.method === PaymentMethods.PIX && (
                  <div className="mt-2">Pagamento com Pix</div>
                )}
                {payMethodSel.method === PaymentMethods.ONDELIVERY && (
                  <div className="mt-2">Pagamento na Entrega</div>
                )}
                {payMethodSel.label &&
                  payMethodSel.method !== PaymentMethods.PIX &&
                  payMethodSel.method !== PaymentMethods.ONDELIVERY && (
                    <span>({payMethodSel.label})</span>
                  )}
              </div>
              {payMethodSel.brand && (
                <div className="text-xs line-clamp-1">{payMethodSel.brand}</div>
              )}
            </div>
          </div>
          {showPayMethods && (
            <div className="mt-3">
              {payMethods.map((i: any, index: number) => (
                <div className="my-1" key={index}>
                  {i.id === payMethodSel.id && (
                    <div
                      className="btn btn-accent btn-block text-white"
                      onClick={() => {
                        setShowPayMethods(false)
                        localStorage.setItem('payMethodID', i.id)
                        if (payMethodSel.method !== PaymentMethods.PIX) {
                          setDisplayModal(true)
                        }
                      }}
                    >
                      {i.brand && <span>{i.brand}</span>}
                      {i.method === PaymentMethods.CREDIT && (
                        <span>&nbsp;Crédito</span>
                      )}
                      {i.method === PaymentMethods.DEBIT && (
                        <span>&nbsp;Débito</span>
                      )}
                      {i.method === PaymentMethods.PIX && (
                        <span>&nbsp;Pagamento com Pix</span>
                      )}
                      {i.label && i.method !== PaymentMethods.PIX && (
                        <span>&nbsp;({i.label})</span>
                      )}
                    </div>
                  )}
                  {i.id !== payMethodSel.id && (
                    <div
                      className="btn btn-outline btn-accent btn-block bg-white"
                      onClick={() => {
                        setShowPayMethods(false)
                        setPayMethodSel(i)
                        localStorage.setItem('payMethodID', i.id)
                      }}
                    >
                      {i.brand && <span>{i.brand}</span>}
                      {i.method === PaymentMethods.CREDIT && (
                        <span>&nbsp;Crédito</span>
                      )}
                      {i.method === PaymentMethods.DEBIT && (
                        <span>&nbsp;Débito</span>
                      )}
                      {i.method === PaymentMethods.PIX && (
                        <span>&nbsp;Pagamento com Pix</span>
                      )}
                      {i.label && i.method !== PaymentMethods.PIX && (
                        <span>&nbsp;({i.label})</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="my-1">
                <div
                  className="btn btn-primary btn-block text-white"
                  onClick={() => {
                    setId('')
                    setMethod(PaymentMethods.CREDIT)
                    setNumber('')
                    setHolderName('')
                    setHolderDocument('')
                    setExpMonth('')
                    setExpYear('')
                    setCvv('')
                    setBrand('')
                    setLabel('')
                    setCardPagarmeID('')
                    setLoading(false)
                    setDirty(true)
                    setDisabled(false)
                    setDisplayModal(true)
                    setShowPayMethods(false)
                  }}
                >
                  <Plus width={16} height={16} />
                  &nbsp;Outra forma de pagamento
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <Modal
        open={displayModal}
        onClose={() => {
          setDisplayModal(false)
        }}
        focusTrap={false}
        title={
          <div className="mt-2 text-2xl font-semibold">
            <CreditCard /> <span className="ml-2">Forma de pagamento</span>
          </div>
        }
      >
        <div
          className="overflow-y-auto"
          style={{ maxHeight: screenHeight, maxWidth: 800 }}
        >
          <PayMethodForm
            handleSubmit={handleSubmit}
            id={id}
            method={method}
            setMethod={setMethod}
            number={number}
            setNumber={setNumber}
            holderName={holderName}
            setHolderName={setHolderName}
            holderDocument={holderDocument}
            setHolderDocument={setHolderDocument}
            expMonth={expMonth}
            setExpMonth={setExpMonth}
            expYear={expYear}
            setExpYear={setExpYear}
            cvv={cvv}
            setCvv={setCvv}
            loading={loading}
            disabled={disabled}
          />
        </div>
      </Modal>
    </div>
  )
}

interface DocumentProps {
  doc: string
  setDoc: any
}
export function Document(props: DocumentProps) {
  const { doc, setDoc } = props
  return (
    <div className="mt-2 p-3 bg-accent-1 rounded-lg">
      <div className="flex justify-between">
        <div>
          <div className="flex w-80">
            <div className="text-tertiary-2 w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
              <Person />
            </div>
            <input
              className="pl-10 py-2 bg-accent-0 w-full -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
              value={doc ? doc : ''}
              onChange={(e) => {
                setDoc(e.target.value)
              }}
              type="number"
              placeholder="Informe seu CPF"
            />
          </div>
        </div>
        <div>
          {doc && !cpf.isValid(doc) && (
            <div className="mt-3 badge badge-error gap-2">Invalido</div>
          )}
        </div>
      </div>
    </div>
  )
}

interface FinalizeProps {
  tokenObj: any
  disabled: boolean
  showFinalize: boolean
  showContinuePay: boolean
  finalizeOrder: any
  loadingFinalize: boolean
  message: string
}
export function Finalize(props: FinalizeProps) {
  const {
    tokenObj,
    disabled,
    showFinalize,
    showContinuePay,
    finalizeOrder,
    loadingFinalize,
    message,
  } = props
  const { isSm } = useBreakPoints()
  return (
    <div>
      {isSm && (
        <div className="mt-8 mb-20 flex flex-col md:flex-row justify-between space-x-0 md:space-x-4 space-y-2 md:space-y-0">
          {message && showFinalize && (
            <div className="animate-pulse text-center text-red-500 text-lg font-bold mb-4">
              {message}
            </div>
          )}
          {showFinalize && (
            <button
              className={`btn btn-lg btn-error text-white ${
                loadingFinalize && 'loading'
              }`}
              disabled={disabled}
              onClick={finalizeOrder}
            >
              FINALIZAR PEDIDO <RightArrow />
            </button>
          )}
          {showContinuePay && (
            <Link
              href={`${
                tokenObj && tokenObj.origin ? tokenObj.origin : process.env.HOME
              }`}
            >
              <a className="btn btn-outline text-accent-6">
                <ArrowLeft /> Continuar Comprando
              </a>
            </Link>
          )}
        </div>
      )}
      {!isSm && (
        <div>
          {message && showFinalize && (
            <div className="animate-pulse text-center text-red-500 text-lg font-bold mt-6">
              {message}
            </div>
          )}
          <div className="mt-8 flex flex-col md:flex-row justify-between space-x-0 md:space-x-4 space-y-2 md:space-y-0">
            {showContinuePay && (
              <Link
                href={`${
                  tokenObj && tokenObj.origin
                    ? tokenObj.origin
                    : process.env.HOME
                }`}
              >
                <a className="btn btn-outline text-accent-6">
                  <ArrowLeft /> Continuar Comprando
                </a>
              </Link>
            )}

            {showFinalize && (
              <button
                className={`${
                  showContinuePay && 'ml-4'
                } btn btn-error text-white  ${loadingFinalize && 'loading'}`}
                disabled={disabled}
                onClick={finalizeOrder}
              >
                FINALIZAR PEDIDO <RightArrow />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
