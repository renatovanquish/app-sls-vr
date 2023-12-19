import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, FormCard, Segment, Input, Editor } from 'components/ui'
import { Check } from 'components/icons'
import { toast } from 'react-toast'
import { useConfig } from 'hooks/useConfig'
import { useTheme } from 'next-themes'
import { useUI } from 'components/ui/context'

type Inputs = {
  birthDayEnable: boolean
  birthDaySubject: string
  birthDayMessage: string
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

  const watchBirthDayEnable = watch('birthDayEnable')
  const watchBirthDayMessage = watch('birthDayMessage')

  useEffect(() => {
    let isMounted = true
    if (isMounted && config) {
      setValue('birthDayEnable', config.birthDayEnable)
      setValue('birthDaySubject', config.birthDaySubject)
      setValue('birthDayMessage', config.birthDayMessage)
    }
    return () => {
      isMounted = false
    }
  }, [config])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { birthDayEnable, birthDaySubject, birthDayMessage } = data

    setLoading(true)

    let input = {
      id: 'DEFAULT',
      birthDayEnable,
      birthDaySubject,
      birthDayMessage,
    } as any

    console.log(input)

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
        title="Bot (Robô)"
        description="Configurações do bot (Robô)"
        buttons={<Buttons />}
      >
        <Segment title="ENVIO DE EMAIL PARA ANIVERSARIANTES" description="" />

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="birthDayEnable"
              name="birthDayEnable"
              checked={watchBirthDayEnable}
              onChange={handleCheckboxChange}
              className="checkbox"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="soundOnNewOrder" className="text-accent-9">
              Enviar email de parabéns para os usuários aniversariantes.
            </label>
          </div>
        </div>

        <div className="mt-3">
          <Input
            label="Assunto do email"
            type="text"
            register={register('birthDaySubject')}
            placeholder="Votos de parabéns"
            defaultValue={''}
          />
        </div>

        <div className="mt-3 w-full">
          <label className="text-accent-7 text-sm font-semibold px-1">
            Mensagem do email
          </label>
          <Editor
            fieldName="birthDayMessage"
            value={watchBirthDayMessage}
            setValue={setValue}
            mode="essential"
          />
          <span className="text-accent-6 text-xs">
            Utilize a tag [nome] para inserir o nome do usuário.
          </span>
        </div>
      </FormCard>
    </form>
  )
}
