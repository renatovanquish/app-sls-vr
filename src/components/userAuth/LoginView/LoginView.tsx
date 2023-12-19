import { FC, useEffect, useState, useCallback } from 'react'
import { Button, Input, InputPassword, Logo } from 'components/ui'
import { useUI } from 'components/ui/context'
import { useUserAuth } from 'components/userAuth/context'
import { Mail, Key, RightArrow, Person } from 'components/icons'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface Props {}

const LoginView: FC<Props> = () => {
  const [loginInput, setLoginInput] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const { setModalView, closeModal } = useUI()
  const { signIn, login } = useUserAuth()

  const handleCheckboxChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    if (target.name === 'remember') {
      setRemember(value)
    }
  }

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
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

    signIn(loginInput.trim(), password).then((e: any) => {
      if (e && e.newPasswordRequired) {
        setLoading(false)
        setModalView('CHANGE_PASSWORD_VIEW')
      }

      if (!e || (e && e.id)) {
        setLoading(false)
        closeModal()
      }

      switch (e && e.message) {
        case 'User is not confirmed.':
          setLoading(false)
          setMessage('')
          setModalView('CONFIRM_VIEW')
          break

        case 'Incorrect username or password.':
          setLoading(false)
          setMessage('A senha não confere.')
          break

        case 'Pending sign-in attempt already in progress':
          setLoading(false)
          setMessage(`Tentativa de login pendente já em andamento.`)
          break

        case 'Username cannot be empty':
          setLoading(false)
          setMessage(`Você deve informar seu login e senha.`)
          break

        case 'User does not exist.':
          setLoading(false)
          setMessage(`Usuário não localizado.`)
          break

        case 'Password attempts exceeded':
          setLoading(false)
          setMessage('Tentativas de senha excedidas.')
          break

        case 'Password reset required for the user':
          setLoading(false)
          setModalView('FORGOT_VIEW')
          break

        case 'Temporary password has expired and must be reset by an administrator.':
          setLoading(false)
          setModalView('FORGOT_VIEW')
          break

        case 'tryLogin':
          setLoading(false)
          break

        default:
          setLoading(false)
          const m = e && e.message ? e.message : ''
          setMessage(m)
      }
    })
  }

  const handleValidation = useCallback(() => {
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

    if (dirty) {
      setDisabled(password.length < 6 || !validPassword)
    }
  }, [loginInput, password, dirty])

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
    <div className="px-5 md:px-10 pt-2 pb-16">
      <form
        autoComplete="off"
        onSubmit={handleLogin}
        className="w-full flex flex-col justify-between"
      >
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="pt-6 flex flex-col space-y-4">
          {process.env.ALLOW_LOGIN &&
            process.env.ALLOW_LOGIN.length === 1 &&
            process.env.ALLOW_LOGIN[0] === 'PHONE' && (
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label className="text-accent-7 text-sm font-semibold px-1">
                    Número do celular
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <PhoneInput
                      autoComplete="none"
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
                autoComplete="none"
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
              autoComplete="none"
              label="Usuário (Email ou Celular com DDD)"
              icon={<Person />}
              value={loginInput}
              onChange={setLoginInput}
              type="text"
              placeholder=""
            />
          )}

          <InputPassword
            autoComplete="none"
            label="Senha"
            icon={<Key />}
            value={password}
            onChange={setPassword}
            placeholder=""
          />

          <div className="mt-7 flex">
            <label
              htmlFor="remember_me"
              className="inline-flex items-center w-full cursor-pointer"
            >
              <input
                id="remember"
                type="checkbox"
                className="checkbox"
                name="remember"
                checked={remember}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-sm text-accent-9">
                Manter conectado?
              </span>
            </label>

            <div className="w-full text-right">
              <a
                onClick={() => setModalView('FORGOT_VIEW')}
                className="text-tertiary-2 bg-accent-1 rounded-md shadown-sm py-1 px-2 text-sm cursor-pointer font-semibold"
                href="#"
              >
                Recuperar a senha?
              </a>
            </div>
          </div>

          {message && (
            <div className="max-w-sm whitespace-pre-line py-3 px-5 mb-4 text-red-500 bg-accent-2 text-sm rounded-md border border-red-500">
              {message}
            </div>
          )}

          <div className="pt-2 w-full flex flex-col">
            <Button type="submit" loading={loading} disabled={false}>
              ENTRAR <RightArrow />
            </Button>
          </div>

          <div className="text-center">
            <span className="text-accent-7">Ainda não possui uma conta?</span>
            {` `}
            <a
              className="text-accent-9 font-bold cursor-pointer"
              onClick={() => setModalView('SIGNUP_VIEW')}
            >
              <br />
              <span className="text-tertiary-2 text-xl">Cadastre-se.</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginView
