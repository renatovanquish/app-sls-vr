import { FC, useEffect, useState, useCallback } from 'react'
import { Button, Input, Logo } from 'components/ui'
import { useUI } from 'components/ui/context'
import { useUserAuth } from 'components/userAuth/context'
import { Mail, Key, Check2, Person } from 'components/icons'

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface Props {}

const ForgotPassword: FC<Props> = () => {
  const [loginInput, setLoginInput] = useState('')
  const [step, setStep] = useState(1)
  const [code, setCode] = useState('')
  const [newpassword, setNewpassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [loginAuth, setLoginAuth] = useState('')
  const [deliveryMedium, setDeliveryMedium] = useState('')
  const [destination, setDestination] = useState('')

  const { setModalView, closeModal } = useUI()
  const { forgotPassword, forgotPasswordSubmit, login } = useUserAuth()

  /**
   * Step 1 - ForgotPassword
   */
  const handleForgotPassword = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    if (loading) {
      return null
    }

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    setLoading(true)
    setDeliveryMedium('')
    setDestination('')
    setMessage('')

    forgotPassword(loginInput.trim()).then((r: any) => {
      if (
        r &&
        r.data &&
        r.data.CodeDeliveryDetails &&
        r.data.CodeDeliveryDetails.DeliveryMedium
      ) {
        setLoading(false)
        setDeliveryMedium(r.data.CodeDeliveryDetails.DeliveryMedium)
        setDestination(r.data.CodeDeliveryDetails.Destination)
        setMessage('')
        setLoginAuth(r.login)
        setStep(2)
      }

      switch (r && r.data && r.data.message) {
        case 'Username/client id combination not found.':
          setLoading(false)
          setMessage(
            `${
              process.env.DEFAULT_LOGIN === 'PHONE'
                ? 'Número de telefone'
                : 'Email'
            } não localizado!`
          )
          break

        case 'Username cannot be empty':
          setLoading(false)
          setMessage(
            `Informe seu ${
              process.env.DEFAULT_LOGIN === 'PHONE'
                ? 'número de telefone'
                : 'email'
            }.`
          )
          break

        case 'Attempt limit exceeded, please try after some time.':
          setLoading(false)
          setMessage(
            'Limite de tentativas excedido, tente depois de algum tempo.'
          )
          break

        case 'User password cannot be reset in the current state.':
          setLoading(false)
          setMessage('')
          break

        default:
          setLoading(false)
          const m = r && r.data && r.data.message ? r.data.message : ''
          setMessage(m)
      }
    })
  }

  /**
   * Step 2 - ForgotPassword - Confirm code
   */
  const handleForgotPasswordSubmit = async (
    e: React.SyntheticEvent<EventTarget>
  ) => {
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

    forgotPasswordSubmit(loginAuth, code, newpassword).then((r: any) => {
      setMessage('')

      if (!r) {
        setLoading(false)
        closeModal()
        setStep(1)
        setModalView('LOGIN_VIEW')
      }

      switch (r && r.message) {
        case 'Password does not conform to policy: Password not long enough':
          setLoading(false)
          setMessage(
            'A senha não está em conformidade com a política: a senha não é longa o suficiente.'
          )
          break

        case 'Invalid verification code provided, please try again.':
          setLoading(false)
          setMessage('Código de verificação inválido!')
          break

        default:
          setLoading(false)
          const m = r && r.message ? r.message : ''
          setMessage(m)
      }
    })
  }

  const handleValidation = useCallback(() => {
    if (dirty) {
      setDisabled(!loginInput)
    }
  }, [loginInput, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  useEffect(() => {
    let isMounted = true
    if (isMounted && login) {
      setLoginInput(login)
    }
    return () => {
      isMounted = false
    }
  }, [login])

  return (
    <div className="px-5 md:px-10 pt-2 pb-32 md:pb-20">
      {step === 1 && (
        <form
          onSubmit={handleForgotPassword}
          className="w-full flex flex-col justify-between"
        >
          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="my-6 text-center text-accent-7 text-lg font-semibold">
            {process.env.ALLOW_LOGIN &&
              process.env.ALLOW_LOGIN.length === 1 &&
              process.env.ALLOW_LOGIN[0] === 'PHONE' && (
                <span>
                  Informe seu celular com DDD para recuperar a senha.
                </span>
              )}
            {process.env.ALLOW_LOGIN &&
              process.env.ALLOW_LOGIN.length === 1 &&
              process.env.ALLOW_LOGIN[0] === 'EMAIL' && (
                <span>Informe seu email para recuperar a senha.</span>
              )}
            {process.env.ALLOW_LOGIN && process.env.ALLOW_LOGIN.length > 1 && (
              <span>
                Informe seu email ou seu celular com DDD para continuar e
                recuperar a senha.
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            {process.env.ALLOW_LOGIN &&
              process.env.ALLOW_LOGIN.length === 1 &&
              process.env.ALLOW_LOGIN[0] === 'PHONE' && (
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
                        value={loginInput as any}
                        onChange={(e: any) => setLoginInput(e)}
                        international={false}
                        countrySelectProps={{ unicodeFlags: true }}
                        defaultCountry="BR"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              )}

            {process.env.ALLOW_LOGIN &&
              process.env.ALLOW_LOGIN.length === 1 &&
              process.env.ALLOW_LOGIN[0] === 'EMAIL' && (
                <Input
                  label="Email"
                  icon={<Mail />}
                  value={loginInput}
                  onChange={setLoginInput}
                  type="text"
                  placeholder=""
                />
              )}

            {process.env.ALLOW_LOGIN && process.env.ALLOW_LOGIN.length > 1 && (
              <Input
                label="Email ou Celular com DDD"
                icon={<Person />}
                value={loginInput}
                onChange={setLoginInput}
                type="text"
                placeholder=""
              />
            )}

            {message && (
              <div className="max-w-sm whitespace-pre-line py-3 px-5 mb-4 text-red-500 bg-accent-2 text-sm rounded-md border border-red-500">
                {message}
              </div>
            )}

            <div className="py-2 w-full flex flex-col">
              <Button type="submit" loading={loading} disabled={disabled}>
                RECUPERAR A SENHA
              </Button>
            </div>

            <div className="text-center">
              <span className="text-accent-7">Lembrou da senha?</span>
              {` `}
              <a
                className="text-accent-9 font-bold cursor-pointer"
                onClick={() => setModalView('LOGIN_VIEW')}
              >
                <br />
                <span className="text-tertiary-2 text-xl">
                  Voltar para o login.
                </span>
              </a>
            </div>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handleForgotPasswordSubmit}
          className="w-full flex flex-col justify-between"
        >
          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="py-6 text-center text-accent-7 text-lg font-semibold">
            {deliveryMedium === 'SMS' && (
              <span>
                Verifique seu celular {destination} e informe abaixo o
                código de verificação recebido e a nova senha.
              </span>
            )}
            {deliveryMedium !== 'SMS' && (
              <span>
                Verifique a caixa de entrada do email {destination} e informe
                abaixo o código de verificação recebido e a nova senha.
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <Input
              label="Código de verificação"
              icon={<Check2 />}
              value={code}
              onChange={setCode}
              type="number"
              placeholder=""
            />

            <Input
              label="Crie uma nova senha"
              notes="A senha deve ter no mínimo 6 caracteres."
              icon={<Key />}
              value={newpassword}
              onChange={setNewpassword}
              type="password"
              placeholder=""
              onInvalid={`${
                newpassword &&
                newpassword.length < (process.env.PASSWORD_LENGTH as any)
                  ? 'Senha inválida.'
                  : ''
              }`}
            />

            {message && (
              <div className="max-w-sm whitespace-pre-line py-3 px-5 mb-4 text-red-500 bg-accent-2 text-sm rounded-md border border-red-500">
                {message}
              </div>
            )}

            <div className="py-2 w-full flex flex-col">
              <Button type="submit" loading={loading} disabled={!code || !newpassword || newpassword.length < (process.env.PASSWORD_LENGTH as any)}>
                VALIDAR E ALTERAR SENHA
              </Button>
            </div>

            <div className="text-center">
              <span className="text-accent-7">
                Não recebeu o código por{' '}
                {process.env.DEFAULT_LOGIN === 'PHONE' ? 'SMS' : 'email'} ?
              </span>
              {` `}
              <a
                className="text-accent-9 font-bold cursor-pointer"
                onClick={() => setStep(1)}
              >
                <br />
                <span className="text-tertiary-2 text-xl">Re-enviar.</span>
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default ForgotPassword
