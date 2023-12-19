import { useEffect, useState, useCallback } from 'react'
import { Plus, Pin } from 'components/icons'
import { Button, Modal, FormCard, Loading } from 'components/ui'

import { useUI } from 'components/ui/context'
import { useUserAuth } from 'components/userAuth/context'
import { useScreen } from 'hooks/useScreen'

import AddressForm from './AddressForm'
import AddressList from './AddressList'

import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'

export default function Addresses(props: any) {
  const { openModal, displayModal, closeModal } = useUI()
  const { user, listAddresses, updateUserAddresses, deleteUserAddresses } =
    useUserAuth()

  const [id, setId] = useState('')
  const [userID, setUserID] = useState(user ? user.id : '')
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

  const [loading, setLoading] = useState(true)
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const [addresses, setAddresses] = useState<any[]>([])
  const { screenHeight } = useScreen()

  useEffect(() => {
    let isMounted = true
    if (isMounted && user) {
      const fetchData = async () => {
        setLoading(true)
        const a = await listAddresses(user.id)
        setAddresses(a)
        setLoading(false)
      }
      fetchData()
    }
    return () => {
      isMounted = false
      setAddresses([] as any)
      setLoading(true)
    }
  }, [user])

  const openModalAdressForm = (e: any) => {
    if (e && e.id) {
      setId(e.id)
      setUserID(e.userID)
      setName(e.name)
      setReference(e.reference)
      setStreet(e.street)
      setNumber(e.number)
      setComplement(e.complement)
      setZipcode(e.zipcode)
      setNeighborhood(e.neighborhood)
      setCity(e.city)
      setState(e.state)
      setCountry(e.country)
      setAddressPagarmeID(e.addressPagarmeID)
    } else {
      setId('')
      setUserID(user ? user.id : '')
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
    }
    openModal()
  }

  const openModalAdressDelete = async (e: any) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir o endereço? ${e.name ? e.name : e.street}`,
      message: '',
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
      await deleteUserAddresses(e)
      const r = addresses.filter((elem, i, array) => {
        return elem.id !== e.id
      })
      setAddresses(r)
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
    const n = await updateUserAddresses({
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
      addressPagarmeID
    })
    if (!id) {
      addresses.push(n)
    } else {
      for (let i = 0; i < addresses.length; i++) {
        if (id === addresses[i].id) {
          addresses[i] = {
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
            addressPagarmeID: n.addressPagarmeID ? n.addressPagarmeID : null
          }
        }
      }
    }
    closeModal()
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

  const Buttons: React.FC = () => (
    <div>
      <Button
        variant="slim"
        disabled={false}
        type="button"
        onClick={() => openModalAdressForm(null)}
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
        title="Endereços"
        description="Utilizados para você receber seus pedidos, correspondências e ainda para a emissão de docs fiscais."
        buttons={<Buttons />}
      >
        {loading && <Loading/>}
        <AddressList
          addresses={addresses}
          openModalAdressForm={openModalAdressForm}
          openModalAdressDelete={openModalAdressDelete}
        />
      </FormCard>

      <Modal
        open={displayModal}
        onClose={closeModal}
        focusTrap={false}
        title={
          <div className="mt-2 text-2xl font-semibold">
            <Pin /> <span className='ml-2'>Endereço</span>
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
    </>
  )
}
