import { useState, useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Button, FormCard, Segment, Input } from 'components/ui'
import { Check } from 'components/icons'
import { toast } from 'react-toast'
import { useConfig } from 'hooks/useConfig'
import { useTheme } from 'next-themes'
import { useUI } from 'components/ui/context'
import NumberFormat from 'react-number-format'

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import { ConfigValidationModes } from 'models'

type Inputs = {
  validationMode: string
  infoFooter: string
  minValueOrder: number
  phoneOrders: string
  phoneSac: string
  phoneWhatsapp: string
  allowPayOnDelivery: boolean
  allowLocalPickup: boolean
  deliveryOnSunday: string
  deliveryOnMonday: string
  deliveryOnTuesday: string
  deliveryOnWednesday: string
  deliveryOnThursday: string
  deliveryOnFriday: string
  deliveryOnSaturday: string
  deliveryOffSunday: string
  deliveryOffMonday: string
  deliveryOffTuesday: string
  deliveryOffWednesday: string
  deliveryOffThursday: string
  deliveryOffFriday: string
  deliveryOffSaturday: string
  showNotesCart: boolean
  notesCart: string
  soundOnNewOrder: boolean
  facebook: string
  twitter: string
  instagram: string
  youtube: string
  linkedin: string
  footer: string
  navBar: string
}

export default function ConfigPage() {
  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(true)
  const [tabSel, setTabSel] = useState(0)

  const { updateConfig } = useConfig()
  const { config, setConfig } = useUI()

  const { theme } = useTheme()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const watchAllowPayOnDelivery = watch('allowPayOnDelivery')
  const watchAllowLocalPickup = watch('allowLocalPickup')
  const watchShowNotesCart = watch('showNotesCart')
  const watchSoundOnNewOrder = watch('soundOnNewOrder')

  useEffect(() => {
    let isMounted = true
    if (isMounted && config) {
      setValue(
        'validationMode',
        config.validationMode
          ? config.validationMode
          : ConfigValidationModes.CODE
      )
      setValue('infoFooter', config.infoFooter)
      setValue('minValueOrder', config.minValueOrder)
      setValue('phoneOrders', config.phoneOrders)
      setValue('phoneSac', config.phoneSac)
      setValue('phoneWhatsapp', config.phoneWhatsapp)
      setValue('allowPayOnDelivery', config.allowPayOnDelivery)
      setValue('allowLocalPickup', config.allowLocalPickup)
      setValue('deliveryOnSunday', config.deliveryOnSunday)
      setValue('deliveryOnMonday', config.deliveryOnMonday)
      setValue('deliveryOnTuesday', config.deliveryOnTuesday)
      setValue('deliveryOnWednesday', config.deliveryOnWednesday)
      setValue('deliveryOnThursday', config.deliveryOnThursday)
      setValue('deliveryOnFriday', config.deliveryOnFriday)
      setValue('deliveryOnSaturday', config.deliveryOnSaturday)
      setValue('deliveryOffSunday', config.deliveryOffSunday)
      setValue('deliveryOffMonday', config.deliveryOffMonday)
      setValue('deliveryOffTuesday', config.deliveryOffTuesday)
      setValue('deliveryOffWednesday', config.deliveryOffWednesday)
      setValue('deliveryOffThursday', config.deliveryOffThursday)
      setValue('deliveryOffFriday', config.deliveryOffFriday)
      setValue('deliveryOffSaturday', config.deliveryOffSaturday)
      setValue('showNotesCart', config.showNotesCart)
      setValue('notesCart', config.notesCart)
      setValue('soundOnNewOrder', config.soundOnNewOrder)
      setValue('facebook', config.facebook)
      setValue('twitter', config.twitter)
      setValue('instagram', config.instagram)
      setValue('youtube', config.youtube)
      setValue('linkedin', config.linkedin)
      setValue('footer', config.footer)
      setValue('navBar', config.navBar)
    }
    return () => {
      isMounted = false
    }
  }, [config])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {
      validationMode,
      infoFooter,
      minValueOrder,
      phoneOrders,
      phoneSac,
      phoneWhatsapp,
      allowPayOnDelivery,
      allowLocalPickup,
      deliveryOnSunday,
      deliveryOnMonday,
      deliveryOnTuesday,
      deliveryOnWednesday,
      deliveryOnThursday,
      deliveryOnFriday,
      deliveryOnSaturday,
      deliveryOffSunday,
      deliveryOffMonday,
      deliveryOffTuesday,
      deliveryOffWednesday,
      deliveryOffThursday,
      deliveryOffFriday,
      deliveryOffSaturday,
      showNotesCart,
      notesCart,
      soundOnNewOrder,
      facebook,
      twitter,
      instagram,
      youtube,
      linkedin,
      footer,
      navBar,
    } = data

    setLoading(true)

    let input = {
      id: 'DEFAULT',
      validationMode: validationMode
        ? validationMode
        : ConfigValidationModes.CODE,
      infoFooter,
      facebook,
      twitter,
      instagram,
      youtube,
      linkedin,
      footer,
      navBar,
    } as any

    if (allowPayOnDelivery) {
      input.allowPayOnDelivery = allowPayOnDelivery
    }
    if (allowLocalPickup) {
      input.allowLocalPickup = allowLocalPickup
    }
    if (minValueOrder) {
      input.minValueOrder = minValueOrder
    }
    if (notesCart) {
      input.notesCart = notesCart
    }
    if (phoneSac) {
      input.phoneSac = phoneSac
    }
    if (phoneOrders) {
      input.phoneOrders = phoneOrders
    }
    if (phoneWhatsapp) {
      input.phoneWhatsapp = phoneWhatsapp
    }
    if (showNotesCart) {
      input.showNotesCart = showNotesCart
    }
    if (soundOnNewOrder) {
      input.soundOnNewOrder = soundOnNewOrder
    }
    if (deliveryOnSunday) {
      input.deliveryOnSunday = deliveryOnSunday
    }
    if (deliveryOnMonday) {
      input.deliveryOnMonday = deliveryOnMonday
    }
    if (deliveryOnTuesday) {
      input.deliveryOnTuesday = deliveryOnTuesday
    }
    if (deliveryOnWednesday) {
      input.deliveryOnWednesday = deliveryOnWednesday
    }
    if (deliveryOnThursday) {
      input.deliveryOnThursday = deliveryOnThursday
    }
    if (deliveryOnFriday) {
      input.deliveryOnFriday = deliveryOnFriday
    }
    if (deliveryOnSaturday) {
      input.deliveryOnSaturday = deliveryOnSaturday
    }
    if (deliveryOffSunday) {
      input.deliveryOffSunday = deliveryOffSunday
    }
    if (deliveryOffMonday) {
      input.deliveryOffMonday = deliveryOffMonday
    }
    if (deliveryOffTuesday) {
      input.deliveryOffTuesday = deliveryOffTuesday
    }
    if (deliveryOffWednesday) {
      input.deliveryOffWednesday = deliveryOffWednesday
    }
    if (deliveryOffThursday) {
      input.deliveryOffThursday = deliveryOffThursday
    }
    if (deliveryOffFriday) {
      input.deliveryOffFriday = deliveryOffFriday
    }
    if (deliveryOffSaturday) {
      input.deliveryOffSaturday = deliveryOffSaturday
    }

    const updatedConfig = await updateConfig(input)

    setConfig(updatedConfig)

    setLoading(false)
    toast('Configurações atualizadas com sucesso.', {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const Buttons: React.FC = () => (
    <div>
      <Button variant="slim" loading={loading} type="submit">
        <Check className="h-7 w-7" />
        <span className="ml-2 font-semibold md:font-medium text-lg md:text-base">
          SALVAR
        </span>
      </Button>
    </div>
  )

  const handleCheckboxChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    setValue(target.name, value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormCard
        title="Configurações"
        description="Preferências e funcionalidades do app"
        buttons={<Buttons />}
      >
        <div className="mt-4 tabs">
          <a
            onClick={() => setTabSel(0)}
            className={`cursor-pointer tab tab-lifted ${
              tabSel === 0 && 'tab-active'
            }`}
          >
            Geral
          </a>
          <a
            onClick={() => setTabSel(1)}
            className={`cursor-pointer tab tab-lifted ${
              tabSel === 1 && 'tab-active'
            }`}
          >
            NavBar
          </a>
          <a
            onClick={() => setTabSel(2)}
            className={`cursor-pointer tab tab-lifted ${
              tabSel === 2 && 'tab-active'
            }`}
          >
            Footer
          </a>
          {process.env.APP_COMMERCE && (
            <a
              onClick={() => setTabSel(3)}
              className={`cursor-pointer tab tab-lifted ${
                tabSel === 3 && 'tab-active'
              }`}
            >
              E-commerce
            </a>
          )}
          <div className="flex-1 cursor-default tab tab-lifted"></div>
        </div>

        {tabSel === 0 && (
          <div>
            <Segment
              className="mt-4"
              title="CANAIS DE ATENDIMENTO"
              description="Telefone e WhatsApp"
            />

            <div className="mt-4 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="w-full lg:basis-1/2">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Telefone de atendimento
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="phoneSac"
                    control={control}
                    render={({
                      field: { onChange, onBlur, name, value, ref },
                    }) => (
                      <PhoneInput
                        name="phoneSac"
                        id="phoneSac"
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        value={value as any}
                        onChange={onChange}
                        international={false}
                        defaultCountry="BR"
                        placeholder=""
                      />
                    )}
                  />
                </div>
              </div>
              <div className="w-full lg:basis-1/2">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Atendimento por WhatsApp
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="phoneWhatsapp"
                    control={control}
                    render={({
                      field: { onChange, onBlur, name, value, ref },
                    }) => (
                      <PhoneInput
                        name="phoneWhatsapp"
                        id="phoneWhatsapp"
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        value={value as any}
                        onChange={onChange}
                        international={false}
                        defaultCountry="BR"
                        placeholder=""
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/**
                       * 
            <Segment
              title="AUTENTICAÇÃO DO USUÁRIO"
              description="Forma de validar o login de acesso."
            />

            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6 lg:col-span-3">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Modo de Verificação
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register('validationMode')}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      >
                        <option value="CODE">
                          Usuário informa o código recebido.
                        </option>
                        {true && (
                          <option value="LINK">Usuário clica no link.</option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                       * 
                       */}
          </div>
        )}

        {tabSel === 1 && (
          <div>
            <div className="mt-4 flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="w-full">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Configuração
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="navBar"
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

        {tabSel === 2 && (
          <div>
            <div className="mt-4 flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="w-full">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Configuração
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="footer"
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

            <Segment
              className="mt-4"
              title="Rodapé"
              description="Frase e links de redes sociais no final das páginas"
            />

            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <Input
                  label="Informação exibida no rodapé das páginas."
                  type="text"
                  register={register('infoFooter')}
                  defaultValue={''}
                />
              </div>
              <div className="col-span-6">
                <Input
                  label="Link do Facebook"
                  type="text"
                  register={register('facebook')}
                  defaultValue={''}
                  placeholder="https://"
                />
              </div>
              <div className="col-span-6">
                <Input
                  label="Link do Twitter"
                  type="text"
                  register={register('twitter')}
                  defaultValue={''}
                  placeholder="https://"
                />
              </div>
              <div className="col-span-6">
                <Input
                  label="Link do Instagram"
                  type="text"
                  register={register('instagram')}
                  defaultValue={''}
                  placeholder="https://"
                />
              </div>
              <div className="col-span-6">
                <Input
                  label="Link do Youtube"
                  type="text"
                  register={register('youtube')}
                  defaultValue={''}
                  placeholder="https://"
                />
              </div>
              <div className="col-span-6">
                <Input
                  label="Link do Linkedin"
                  type="text"
                  register={register('linkedin')}
                  defaultValue={''}
                  placeholder="https://"
                />
              </div>
            </div>
          </div>
        )}

        {tabSel === 3 && (
          <div className="w-full">
            <div className="mt-4 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="w-full lg:basis-1/2">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Valor mínimo para os pedidos
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="minValueOrder"
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
              </div>
              <div className="w-full lg:basis-1/2">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Telefone de suporte para pedidos
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="phoneOrders"
                    control={control}
                    render={({
                      field: { onChange, onBlur, name, value, ref },
                    }) => (
                      <PhoneInput
                        name="phoneOrders"
                        id="phoneOrders"
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        value={value as any}
                        onChange={onChange}
                        international={false}
                        defaultCountry="BR"
                        placeholder=""
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="soundOnNewOrder"
                  name="soundOnNewOrder"
                  checked={watchSoundOnNewOrder}
                  onChange={handleCheckboxChange}
                  className="checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="soundOnNewOrder" className="text-accent-9">
                  Tocar sinal sonoro ao receber novos pedidos?
                </label>
              </div>
            </div>

            <div className="mt-4 flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="allowPayOnDelivery"
                  name="allowPayOnDelivery"
                  checked={watchAllowPayOnDelivery}
                  onChange={handleCheckboxChange}
                  className="checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="allowPayOnDelivery" className="text-accent-9">
                  Permitir pagar na entrega?
                </label>
              </div>
            </div>

            <div className="mt-4 flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="allowLocalPickup"
                  name="allowLocalPickup"
                  checked={watchAllowLocalPickup}
                  onChange={handleCheckboxChange}
                  className="checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="allowLocalPickup" className="text-accent-9">
                  Permitir pagar pelo app e retirar no local?
                </label>
              </div>
            </div>

            <Segment
              className="mt-6"
              title="FECHAMENTO DE PEDIDOS"
              description="Campo de observações"
            />

            <div className="mt-4 flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="showNotesCart"
                  name="showNotesCart"
                  checked={watchShowNotesCart}
                  onChange={handleCheckboxChange}
                  className="checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="showNotesCart" className="text-accent-9">
                  Exibir campo de observações no fechamento do pedido?
                </label>
              </div>
            </div>

            {watchShowNotesCart && (
              <div className="mt-4 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
                <div className="w-full">
                  <label className="text-accent-7 text-sm font-semibold px-1">
                    Texto para preenchimento do campo de observação
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <Controller
                      name="notesCart"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <textarea
                          rows={1}
                          className="-ml-10 text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <span className="text-accent-6 text-xs">
                    Exemplo: Alguma observação sobre seu pedido? Informe aqui.
                  </span>
                </div>
              </div>
            )}

            <Segment
              className="mt-6"
              title="CONFIGURAÇÃO DO DELIVERY"
              description="Horários de funcionamento"
              notes="Caso você não tenha um horário de funcionamento específico, deixe os campos em branco. Fora do horário de funcionamento, não será possível realizar pedidos."
            />

            <div className="mt-4 flex flex-row w-full space-x-2 space-y-0 mb-4">
              <div className="basis-2/4">
                <Input
                  label="Domingo abre às:"
                  type="text"
                  register={register('deliveryOnSunday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
              <div className="basis-2/4">
                <Input
                  label="Domingo fecha às:"
                  type="text"
                  register={register('deliveryOffSunday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
            </div>

            <div className="flex flex-row w-full space-x-2 space-y-0 mb-4">
              <div className="basis-2/4">
                <Input
                  label="Segunda abre às:"
                  type="text"
                  register={register('deliveryOnMonday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
              <div className="basis-2/4">
                <Input
                  label="Segunda fecha às:"
                  type="text"
                  register={register('deliveryOffMonday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
            </div>

            <div className="flex flex-row w-full space-x-2 space-y-0 mb-4">
              <div className="basis-2/4">
                <Input
                  label="Terça abre às:"
                  type="text"
                  register={register('deliveryOnTuesday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
              <div className="basis-2/4">
                <Input
                  label="Terça fecha às:"
                  type="text"
                  register={register('deliveryOffTuesday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
            </div>

            <div className="flex flex-row w-full space-x-2 space-y-0 mb-4">
              <div className="basis-2/4">
                <Input
                  label="Quarta abre às:"
                  type="text"
                  register={register('deliveryOnWednesday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
              <div className="basis-2/4">
                <Input
                  label="Quarta fecha às:"
                  type="text"
                  register={register('deliveryOffWednesday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
            </div>

            <div className="flex flex-row w-full space-x-2 space-y-0 mb-4">
              <div className="basis-2/4">
                <Input
                  label="Quinta abre às:"
                  type="text"
                  register={register('deliveryOnThursday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
              <div className="basis-2/4">
                <Input
                  label="Quinta fecha às:"
                  type="text"
                  register={register('deliveryOffThursday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
            </div>

            <div className="flex flex-row w-full space-x-2 space-y-0 mb-4">
              <div className="basis-2/4">
                <Input
                  label="Sexta abre às:"
                  type="text"
                  register={register('deliveryOnFriday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
              <div className="basis-2/4">
                <Input
                  label="Sexta fecha às:"
                  type="text"
                  register={register('deliveryOffFriday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
            </div>

            <div className="flex flex-row w-full space-x-2 space-y-0 mb-4">
              <div className="basis-2/4">
                <Input
                  label="Sábado abre às:"
                  type="text"
                  register={register('deliveryOnSaturday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
              <div className="basis-2/4">
                <Input
                  label="Sábado fecha às:"
                  type="text"
                  register={register('deliveryOffSaturday')}
                  defaultValue={''}
                  placeholder="hh:mm"
                />
              </div>
            </div>
          </div>
        )}
      </FormCard>
    </form>
  )
}
