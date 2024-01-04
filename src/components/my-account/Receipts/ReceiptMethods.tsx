import { useState, useEffect } from 'react'
import { Check } from 'components/icons'
import { Button, Input, FormCard } from 'components/ui'
import { useUserAuth } from 'components/userAuth/context'

import { toast } from 'react-toast'

export default function ReceiptsMethods(props: any) {
  const { user, updateProfile, profile } = useUserAuth()

  const [id, setId] = useState(user && user.id ? user.id : '')
  const [pix, setPix] = useState('')

  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (profile) {
      setPix(profile.pix ? profile.pix : '')
    }
  }, [profile])

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
    }

    setLoading(true)
    await updateProfile({ id, pix })
    setLoading(false)
    toast('Pix atualizado com sucesso.', {
      backgroundColor: '#263238',
      color: '#fff',
    })
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
        title="Métodos de Recebimento"
        description="Seus recebimentos pelo app, serão creditados no Pix cadastrado abaixo."
        buttons={<Buttons />}
      >
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6">
            <Input
              label="Informe o seu Pix"
              icon=""
              value={pix}
              onChange={setPix}
              type="text"

            />
          </div>
        </div>
      </FormCard>
    </form>
  )
}
