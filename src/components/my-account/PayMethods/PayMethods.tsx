import { useEffect, useState, useCallback } from 'react'
import { Plus, CreditCard } from 'components/icons'
import { Button, Modal, FormCard, Loading } from 'components/ui'

import { useUI } from 'components/ui/context'
import { useUserAuth } from 'components/userAuth/context'

import PayMethodForm from './PayMethodForm'
import PayMethodList from './PayMethodList'

import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { PaymentMethods } from 'API'

export default function PayMethods(props: any) {
  const { openModal, displayModal, closeModal } = useUI()
  const {
    user,
    listPayMethods,
    updatePayMethod,
    deletePayMethod,
    listAddresses,
  } = useUserAuth()

  const [id, setId] = useState('')
  const [userID, setUserID] = useState(user ? user.id : '')
  const [method, setMethod] = useState(PaymentMethods.CREDIT)
  const [number, setNumber] = useState('')
  const [holderName, setHolderName] = useState('')
  const [holderDocument, setHolderDocument] = useState('')
  const [expMonth, setExpMonth] = useState('')
  const [expYear, setExpYear] = useState('')
  const [cvv, setCvv] = useState('')
  const [brand, setBrand] = useState('')
  const [label, setLabel] = useState('')
  const [cardPagarmeID, setCardPagarmeID] = useState('')

  const [loading, setLoading] = useState(true)
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const [addressesExists, setAddressesExists] = useState(false)
  const [description, setDescription] = useState(
    'Os cartões são tratados e armazenados de forma segura e criptografada pelo gateway de pagamento com todos os requisitos de segurança.'
  )

  const [payMethods, setPayMethods] = useState<any[]>([])

  useEffect(() => {
    let isMounted = true
    if (isMounted && user) {
      const fetchData = async () => {
        setLoading(true)
        const pm = await listPayMethods(user.id)
        setPayMethods(pm)
        setLoading(false)

        const ad = await listAddresses(user.id)
        if (ad.length > 0) {
          setAddressesExists(true)
        } else {
          setDescription(
            'Os cartões são tratados e armazenados de forma segura e criptografada pelo gateway de pagamento com todos os requisitos de segurança. Antes de cadastrar seu cartão de pagamento, é necessário cadastrar seu endereço, acesse Endereços no menu Minha Conta.'
          )
        }
      }
      fetchData()
    }
    return () => {
      isMounted = false
      setPayMethods([] as any)
      setAddressesExists(false)
      setLoading(true)
      setDescription(
        'Os cartões são tratados e armazenados de forma segura e criptografada pelo gateway de pagamento com todos os requisitos de segurança.'
      )
    }
  }, [user])

  const openModalPayMethodsForm = (e: any) => {
    if (e && e.id) {
      setId(e.id)
      setUserID(e.userID)
      setMethod(e.method)
      setNumber('')
      setHolderName(e.holderName)
      setHolderDocument(e.holderDocument)
      setExpMonth(e.expMonth)
      setExpYear(e.expYear)
      setCvv(e.cvv)
      setBrand(e.brand)
      setLabel(e.label)
      setCardPagarmeID(e.cardPagarmeID)
    } else {
      setId('')
      setMethod(PaymentMethods.CREDIT)
      setUserID(user ? user.id : '')
      setNumber('')
      setHolderName('')
      setHolderDocument('')
      setExpMonth('')
      setExpYear('')
      setCvv('')
      setBrand('')
      setLabel('')
      setCardPagarmeID('')
    }
    openModal()
  }

  const openModalPayMethodsDelete = async (e: any) => {
    const promptRet = await ActionSheet.showActions({
      title: 'Confirma excluir a forma de pagamento?',
      message: e.label,
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
      setLoading(true)
      await deletePayMethod(e)
      const r = payMethods.filter((elem, i, array) => {
        return elem.id !== e.id
      })
      setPayMethods(r)
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    setLoading(true)
    const n = await updatePayMethod({
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
      cardPagarmeID,
    })

    if (!id && !n.exists) {
      payMethods.push(n)
    } else {
      for (let i = 0; i < payMethods.length; i++) {
        if (id === payMethods[i].id) {
          payMethods[i] = {
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
            cardPagarmeID: n.cardPagarmeID ? n.cardPagarmeID : null,
          }
        }
      }
    }
    closeModal()
    setLoading(false)
  }

  const handleValidation = useCallback(() => {
    if (dirty) {
      setDisabled(!number || !holderName || !expMonth || !expYear || !cvv)
    }
  }, [method, number, holderName, expMonth, expYear, cvv, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  const Buttons: React.FC = () => (
    <div>
      <Button
        variant="slim"
        disabled={!addressesExists}
        type="button"
        onClick={() => openModalPayMethodsForm(null)}
      >
        <Plus className="h-7 w-7" />
        <span className="ml-2 font-semibold md:font-medium text-lg md:text-base">
          ADICIONAR
        </span>
      </Button>
    </div>
  )

  return (
    <>
      <FormCard
        title="Formas de Pagamentos"
        description={description}
        buttons={<Buttons />}
      >
        {loading && <Loading />}
        <PayMethodList
          payMethods={payMethods}
          openModalPayMethodsForm={openModalPayMethodsForm}
          openModalPayMethodsDelete={openModalPayMethodsDelete}
        />
      </FormCard>

      <Modal
        open={displayModal}
        onClose={closeModal}
        focusTrap={false}
        title={
          <div className="mt-2 text-2xl font-semibold">
            <CreditCard /> <span className="ml-2">Forma de pagamento</span>
          </div>
        }
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
      </Modal>
    </>
  )
}
