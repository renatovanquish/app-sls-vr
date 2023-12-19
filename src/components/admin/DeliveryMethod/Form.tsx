import { useState, useEffect } from 'react'
import { Button, Input, Segment } from 'components/ui'
import { Check, Undo } from 'components/icons'
import { toast } from 'react-toast'
import { useRouter } from 'next/router'
import { useDeliveryMethodOrder } from 'hooks/useDeliveryMethodOrder'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import NumberFormat from 'react-number-format'

import { WithContext as ReactTags } from 'react-tag-input'
const KeyCodes = { comma: 188, enter: [10, 13] }
const delimiters = [...KeyCodes.enter, KeyCodes.comma]

type Inputs = {
  name: string
  zipCode: string
  price: number
  time: number
}

interface Props {
  userID: string
  deliveryMethod: any
  setCurrentItem?: any
  handleUpdate?: any
  index?: number
}

export default function Form(props: Props) {
  const { userID, deliveryMethod, setCurrentItem, handleUpdate, index } = props
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const watchName = watch('name')

  const { createDeliveryMethodOrder, updateDeliveryMethodOrder } =
    useDeliveryMethodOrder()

  const [codes, setCodes] = useState([] as any)

  const handleCodesDelete = (i: number) => {
    setCodes(codes.filter((code: any, index: number) => index !== i))
  }

  const handleCodesAddition = (code: any) => {
    setCodes([...codes, code])
  }

  const handleCodesDrag = (code: any, currPos: any, newPos: any) => {
    const newCodes = codes.slice()
    newCodes.splice(currPos, 1)
    newCodes.splice(newPos, 0, code)
    setCodes(newCodes)
  }

  useEffect(() => {
    if (deliveryMethod) {
      setValue('name', deliveryMethod.name)
      setValue('price', deliveryMethod.price)
      setValue('time', deliveryMethod.time ? deliveryMethod.time : 0)

      const codesTMP: any[] = []
      if (deliveryMethod.zipCode) {
        deliveryMethod.zipCode.map((code: string) => {
          codesTMP.push({ id: code, text: code })
        })
      }
      setCodes(codesTMP)
    }
  }, [deliveryMethod, setValue])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, zipCode, price, time } = data

    if (!name) {
      toast.error(`Nome do método de entrega é obrigatório.`)
      return null
    }

    setLoading(true)

    const codesFMT: any[] = []
    codes.map((code: any) => {
      codesFMT.push(code.text)
    })

    const input = {
      id: deliveryMethod ? deliveryMethod.id : uuidv4(),
      name,
      zipCode: codesFMT,
      price,
      time,
    } as any

    if (!deliveryMethod) {
      await createDeliveryMethodOrder(input)
      router.push('/admin/deliverymethod')
    } else {
      await updateDeliveryMethodOrder(input)
    }

    if (setCurrentItem) {
      const obj = JSON.parse(JSON.stringify(deliveryMethod))
      Object.keys(obj).forEach((p: any) => {
        if (input.hasOwnProperty(p)) {
          obj[p] = input[p]
        }
      })
      setCurrentItem(obj)
    }

    if (handleUpdate) {
      handleUpdate(input)
    }

    setLoading(false)

    toast(
      `Método de entrega ${
        !deliveryMethod ? 'adicionado' : 'atualizado'
      } com sucesso.`,
      {
        backgroundColor: '#263238',
        color: '#fff',
      }
    )
  }

  return (
    <div className="w-full">
      <div className="max-w-full w-full mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mt-4 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="w-full lg:basis-1/3">
                <Input
                  label="Nome de referência"
                  type="text"
                  register={register('name')}
                  defaultValue={''}
                  notes="Não é exibido no app."
                />
              </div>
              <div className="w-full md:basis-1/3">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Taxa da entrega
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="price"
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
                <span className="text-accent-6 text-xs">Informe 0 para entrega grátis.</span>
              </div>
              <div className="w-full lg:basis-1/3">
                <Input
                  label="Tempo estimado para entrega"
                  type="number"
                  register={register('time')}
                  defaultValue={''}
                  notes="Tempo em minutos, caso 0 não exibe."
                />
              </div>
            </div>

            <Segment
              className="mt-4"
              title="CONFIGURAÇÃO DOS CEPS ATENDIDOS"
              description="CEPs que serão atendidos pelo método de entrega."
              notes="Você pode utilizar o * para atender todos os CEPs que iniciarem com a numeração, por exemplo 04* irá aplicar o método de entrega para todos os CEPs que iniciarem com 04."
            />

            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="w-full">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  CEPs atendidos
                </label>
                <div className="text-accent-6 text-xs ml-1 mb-1">
                  Entre com um CEP por vez e tecle enter para adicionar.
                </div>
                <ReactTags
                  tags={codes}
                  delimiters={delimiters}
                  handleDelete={handleCodesDelete}
                  handleAddition={handleCodesAddition}
                  handleDrag={handleCodesDrag}
                  inputFieldPosition="top"
                  autocomplete
                  placeholder="Inserir CEP"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={!watchName}
            >
              <Check className="-ml-2 mr-2" />
              {!deliveryMethod && <span>Adicionar</span>}
              {deliveryMethod && <span>Atualizar</span>}
            </Button>
            {!deliveryMethod && (
              <Button
                style={{ backgroundColor: 'transparent', color: '#282a36' }}
                onClick={() => {
                  router.push('/admin/deliverymethod')
                }}
                className="ml-2"
                variant="slim"
                type="button"
              >
                <Undo className="-ml-2 mr-2" />
                Metodos de Entrega
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
