import { FC, useEffect, useState, useCallback } from 'react'
import { Button, Input, InputPassword, Logo } from 'components/ui'
import { useUI } from 'components/ui/context'
import { useUserAuth } from 'components/userAuth/context'
import { validate } from 'email-validator'
import { Mail, Person, Key } from 'components/icons'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

interface Props {}

const SignUpView: FC<Props> = () => {
  const enablePhone = true

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const { setModalView } = useUI()
  const { signUp } = useUserAuth()

  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    if (loading) {
      return null
    }

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    setLoading(true)

    signUp(name.trim(), email.trim(), phone.trim(), password).then((r: any) => {
      if (!r || (r && r.message === 'No current user')) {
        setLoading(false)
        setMessage('')
        setModalView('CONFIRM_VIEW')
      }

      switch (r && r.message) {
        case 'Password did not conform with policy: Password not long enough':
          setLoading(false)
          setMessage(
            'A senha não está em conformidade com a política: a senha não é longa o suficiente.'
          )
          break

        case 'Invalid phone number format.':
          setLoading(false)
          setMessage('Número do telefone com DDD é inválido.')
          break

        case 'An account with the given phone_number already exists.':
          setLoading(false)
          setMessage(`Já existe uma conta cadastrada com este login.`)
          break

        case 'Username cannot be empty':
          setLoading(false)
          setMessage('Nome deve ser informado!')
          break

        case 'An account with the given email already exists.':
          setLoading(false)
          setMessage(
            'Seu email já esta cadastrado! Faça login para acessar sua conta.'
          )
          break

        default:
          setLoading(false)
          const m =
            r && r.message && r.message !== 'No current user' ? r.message : ''
          setMessage(m)
      }
    })
  }

  const handleValidation = useCallback(() => {
    //const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)
    if (dirty) {
      setDisabled(
        name.length < 5 ||
          name.indexOf(' ') === -1 ||
          !email ||
          !validate(email) ||
          !phone ||
          !isValidPhoneNumber(phone) ||
          phone.length < 13 ||
          //!validPassword ||
          password.length < (process.env.PASSWORD_LENGTH as any)
      )
    }
  }, [name, email, phone, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <div className="px-5 md:px-10 pt-2 pb-32 md:pb-20">
      <form
        onSubmit={handleSignup}
        className="w-full flex flex-col justify-between"
      >
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mt-6 grid grid-cols-6 gap-4">
          <div className="col-span-6 text-lg font-semibold text-center">
            Entre com seus dados
          </div>

          <div className="col-span-6 md:col-span-3">
            <Input
              label="Nome completo"
              icon={<Person />}
              value={name}
              onChange={setName}
              type="text"
              placeholder=""
              onInvalid={`${
                name && (name.length < 5 || name.indexOf(' ') === -1)
                  ? 'Nome inválido.'
                  : ''
              }`}
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <Input
              label="Email"
              icon={<Mail />}
              value={email}
              onChange={setEmail}
              type="email"
              placeholder=""
              onInvalid={`${
                email && !validate(email) ? 'Email inválido.' : ''
              }`}
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Celular
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
                {phone && (!isValidPhoneNumber(phone) || phone.length < 13) && (
                  <span className="text-red-500 text-xs font-semibold">
                    Celular inválido.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <InputPassword
              label="Crie uma senha"
              notes={`A senha deve ter no mínimo ${
                process.env.PASSWORD_LENGTH ? process.env.PASSWORD_LENGTH : 8
              } caracteres.`}
              icon={<Key />}
              value={password}
              onChange={setPassword}
              placeholder=""
              onInvalid={`${
                password &&
                password.length < (process.env.PASSWORD_LENGTH as any)
                  ? 'Senha inválida.'
                  : ''
              }`}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-4">
          {message && (
            <div className="max-w-sm whitespace-pre-line py-3 px-5 mb-4 text-red-500 bg-accent-2 text-sm rounded-md border border-red-500">
              {message}
            </div>
          )}

          <div className="py-2 w-full flex flex-col">
            <Button type="submit" loading={loading} disabled={disabled}>
              ATIVAR SUA CONTA
            </Button>
          </div>

          <div className="text-center">
            <span className="text-accent-7">Já ativou sua conta?</span>
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

export default SignUpView
