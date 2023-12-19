import { useState, useEffect } from 'react'
import { Button, FormCard } from 'components/ui'
import { Check } from 'components/icons'
import { useUserAuth } from 'components/userAuth/context'

import { toast } from 'react-toast'

export default function ConsentData(props: any) {
  const [id, setId] = useState(props.user ? props.user.id : null)
  const [allowViewEmail, setAllowViewEmail] = useState(false)
  const [allowViewPhone, setAllowViewPhone] = useState(false)

  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const { updateProfile, profile } = useUserAuth()

  useEffect(() => {
    if (profile) {
      setAllowViewEmail(profile.allowViewEmail ? true : false)
      setAllowViewPhone(profile.allowViewPhone ? true : false)
    }
  }, [profile])

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
    }

    setLoading(true)
    await updateProfile({
      id,
      allowViewEmail,
      allowViewPhone,
    })
    setLoading(false)
    toast('Consentimento atualizado com sucesso.', {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const handleCheckboxChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    if (target.name === 'allowViewEmail') {
      setAllowViewEmail(value)
    }
    if (target.name === 'allowViewPhone') {
      setAllowViewPhone(value)
    }
  }

  const Buttons: React.FC = () => (
    <div>
      <Button
        variant="slim"
        loading={loading}
        disabled={disabled}
        type="submit"
      >
        <Check className="h-7 w-7" />
        <span className="ml-2 font-semibold md:font-medium text-lg md:text-base">
          SALVAR
        </span>
      </Button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <FormCard
        title="Consentimento"
        description="Seu consentimento representa sua manifestação livre e inequívoca pela qual você concorda com o tratamento de seus dados pessoais para as finalidade determinadas."
        buttons={<Buttons />}
      >
        <div className="text-md font-semibold">
          Os dados pessoais nome, email e telefone.
        </div>
        <div className="text-accent-7">
          São essenciais para a criação da sua conta, eles compoem sua
          identificação única como usuário do app e possibilitam que seu acesso
          seja autorizado com a verificação do recebimento de um email ou sms.
        </div>

        <div className="mt-8 flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="allowViewEmail"
              name="allowViewEmail"
              checked={allowViewEmail}
              onChange={handleCheckboxChange}
              className="checkbox"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="allowViewEmail" className="text-accent-9">
              Permitir que os prestadores de serviços do app visualizarem seu email?
            </label>
          </div>
        </div>

        <div className="mt-8 flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="allowViewPhone"
              name="allowViewPhone"
              checked={allowViewPhone}
              onChange={handleCheckboxChange}
              className="checkbox"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="allowViewPhone" className="text-accent-9">
              Permitir que os prestadores de serviços do app visualizarem seu telefone?
            </label>
          </div>
        </div>
      </FormCard>
    </form>
  )
}
