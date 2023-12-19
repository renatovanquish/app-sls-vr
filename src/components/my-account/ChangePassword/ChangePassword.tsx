import { useEffect, useState, useCallback } from 'react'
import { Refresh, Key } from 'components/icons'
import { Button, Input, FormCard } from 'components/ui'
import { useUserAuth } from 'components/userAuth/context'

import { toast } from 'react-toast'

export default function ChangePassword(props: any) {
  const [id, setId] = useState(props.user ? props.user.id : null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmePassword, setConfirmePassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const { changePassword } = useUserAuth()

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    setLoading(true)

    console.log(oldPassword, newPassword)

    const r = await changePassword(oldPassword, newPassword)
    if (!r || r === 'SUCCESS') {
      toast('Senha atualizada com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    }

    switch (r && r.code) {
      case 'NotAuthorizedException':
        setLoading(false)
        toast.error('A senha atual não confere.')
        break

      default:
        setLoading(false)
        const m = r && r.message ? r.message : ''
        if (m) {
          toast.error(m)
        }
    }

    setLoading(false)
  }

  const handleValidation = useCallback(() => {
    const validPassword1 = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(oldPassword)
    const validPassword2 = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword)
    const validPassword3 = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(confirmePassword)

    if (dirty) {
      setDisabled(
        newPassword.length < 6 ||
          !validPassword1 ||
          !validPassword2 ||
          !validPassword3 ||
          newPassword !== confirmePassword
      )
    }
  }, [oldPassword, newPassword, confirmePassword, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  const Buttons: React.FC = () => (
    <div>
      <Button
        variant="slim"
        loading={loading}
        disabled={disabled}
        type="submit"
      >
        <Refresh className="h-7 w-7" />
        <span className="ml-2 font-semibold md:font-medium text-lg md:text-base">
          ALTERAR
        </span>
      </Button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <FormCard
        title="Alterar Senha de Acesso"
        description="A alteração de sua senha irá desconecta-lo de todas as devices e conexões persistentes, imediatamente! Por segurança a senha deve possuir letras e números e ter no mínimo seis caracteres."
        buttons={<Buttons />}
      >
        <div className="gap-4 grid grid-cols-6">
          <div className="col-span-6 md:col-span-3">
            <Input
              label="Senha atual"
              notes=""
              icon={<Key />}
              value={oldPassword}
              onChange={setOldPassword}
              type="password"
              placeholder=""
            />
          </div>

          <div className="col-span-6 md:col-span-3"></div>

          <div className="col-span-6 md:col-span-3">
            <Input
              label="Nova senha"
              notes="A senha deve ter letras e números e no mínimo 6 caracteres."
              icon={<Key />}
              value={newPassword}
              onChange={setNewPassword}
              type="password"
              placeholder=""
            />
          </div>

          <div className="col-span-6 md:col-span-3">
            <Input
              label="Confirme a nova senha"
              notes=""
              icon={<Key />}
              value={confirmePassword}
              onChange={setConfirmePassword}
              type="password"
              placeholder=""
            />
          </div>
        </div>
      </FormCard>
    </form>
  )
}
