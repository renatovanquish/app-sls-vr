import { FC, useEffect, useState, useCallback } from 'react'
import { Button, Input, Logo } from 'components/ui'
import { useUI } from 'components/ui/context'
import { useUserAuth } from 'components/userAuth/context'
import { Key, Mail } from 'components/icons'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { validate } from 'email-validator'

interface Props {}

const ChangePassword: FC<Props> = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const { setModalView, closeModal } = useUI()
  const { changePasswordRequired, confirmEmail, confirmPhone, login } =
    useUserAuth()

  const handleChangePassword = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    if (loading) {
      return null
    }
    
    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    setLoading(true)
    setMessage('')

    const result = await changePasswordRequired(
      email.trim().toLowerCase(),
      phone.trim(),
      newPassword
    )

    setLoading(false)

    if (!result) {
      closeModal()
    }
  }

  const handleValidation = useCallback(() => {
    if (dirty) {
      setDisabled(!newPassword || newPassword.length < 6)
    }
  }, [newPassword, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation, confirmEmail, confirmPhone])

  return (
    <div className="px-5 md:px-10 pt-2 pb-32 md:pb-20">
      <form
        onSubmit={handleChangePassword}
        className="w-full flex flex-col justify-between"
      >
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="p-6 text-center text-accent-7 text-lg font-semibold">
          Informe seu {!validate(login) ? 'email' : 'número de celular'}{' '}
          e crie uma nova senha para finalizar.
        </div>

        <div className="flex flex-col space-y-4">
          {!validate(login) && (
            <Input
              label="Email"
              icon={<Mail />}
              value={email}
              onChange={setEmail}
              type="email"
              placeholder=""
            />
          )}

          {validate(login) && (
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Telefone Celular
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <PhoneInput
                    name="phone"
                    id="phone"
                    className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    value={phone as any}
                    onChange={(e: any) => setPhone(e)}
                    international={false}
                    countrySelectProps={{ unicodeFlags: true }}
                    defaultCountry="BR"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          )}

          <Input
            label="Nova senha"
            icon={<Key />}
            value={newPassword}
            onChange={setNewPassword}
            type="password"
            placeholder=""
          />

          {message && (
            <div className="max-w-sm whitespace-pre-line py-3 px-5 mb-4 text-red-500 bg-accent-2 text-sm rounded-md border border-red-500">
              {message}
            </div>
          )}

          <div className="pt-2 w-full flex flex-col">
            <Button type="submit" loading={loading} disabled={disabled}>
              {!loading && <span>CRIAR NOVA SENHA</span>}
              {loading && <span>CRIANDO NOVA SENHA</span>}
            </Button>
          </div>

          <div className="text-center">
            <span className="text-accent-7"></span>
            {` `}
            <a
              className="text-accent-9 font-bold cursor-pointer"
              onClick={() => setModalView('LOGIN_VIEW')}
            >
              <br />
              <span className="text-tertiary-2 text-xl">Ir para o login.</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
