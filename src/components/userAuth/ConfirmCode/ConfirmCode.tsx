import { FC, useEffect, useState, useCallback } from 'react'
import { Button, Input, Logo } from 'components/ui'
import { useUI } from 'components/ui/context'
import { useUserAuth } from 'components/userAuth/context'
import { Check2 } from 'components/icons'
import { validate } from 'email-validator'

interface Props {}

const ConfirmCode: FC<Props> = () => {
  const [code, setCode] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const { setModalView, closeModal } = useUI()
  const { confirmEmail, confirmPhone, resendSignUp, confirmSignUp, login } =
    useUserAuth()

  const handleConfirmCode = async (e: React.SyntheticEvent<EventTarget>) => {
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

    confirmSignUp(login.trim(), code.trim()).then((e: any) => {
      if (e === 'SUCCESS') {
        setLoading(false)
        setMessage('')
        // setModalView('LOGIN_VIEW')
        closeModal()
      }

      switch (e && e.code) {
        case 'CodeMismatchException':
          setLoading(false)
          setMessage('O código de verificação informado não confere!')
          break

        case 'NotAuthorizedException':
          setLoading(false)
          setMessage('Este celular já foi confirmado!')
          break

        default:
          setLoading(false)
          const m = e && e.message ? e.message : ''
          setMessage(m)
      }
    })
  }

  const handleValidation = useCallback(() => {
    if (dirty) {
      setDisabled(!code || code.length < 6)
    }
  }, [code, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <div className="px-5 md:px-10 pt-2 pb-32 md:pb-20">
      <form
        onSubmit={handleConfirmCode}
        className="w-full flex flex-col justify-between"
      >
        <div className="flex justify-center">
          <Logo />
        </div>

        {process.env.DEFAULT_LOGIN === 'EMAIL' && (
          <div className="mt-6 text-center text-accent-7 text-lg">
            Você precisa confirmar o recebimento do código, que foi enviado para
            seu email {confirmEmail}.<br />
          </div>
        )}

        {process.env.DEFAULT_LOGIN === 'PHONE' && (
          <div className="mt-6 text-center text-accent-7 text-lg">
            Você precisa confirmar o recebimento do código, que foi enviado para
            seu telefone {confirmPhone}.<br />
          </div>
        )}

        <div className="mt-6 flex flex-col space-y-4">
          <Input
            label="Código de verificação"
            icon={<Check2 />}
            value={code}
            onChange={setCode}
            type="number"
            placeholder=""
          />

          {message && (
            <div className="max-w-sm whitespace-pre-line py-3 px-5 mb-4 text-red-500 bg-accent-2 text-sm rounded-md border border-red-500">
              {message}
            </div>
          )}

          <div className="pt-2 w-full flex flex-col">
            <Button type="submit" loading={loading} disabled={disabled}>
              VALIDAR CÓDIGO
            </Button>
          </div>

          <span className="pt-3 text-center">
            <span className="text-accent-7">Não recebeu o email ou SMS?</span>
            {` `}
            <a
              className="text-accent-9 font-bold cursor-pointer"
              onClick={() => {
                let loginFmt = login
                if (!validate(login)) {
                  const onlyNumbers = login.replace(/\D/g, '')
                  if (onlyNumbers.substr(0, 2) !== '55') {
                    loginFmt = '+55' + onlyNumbers
                  } else {
                    loginFmt = '+' + onlyNumbers
                  }
                }
                setMessage('Novo código enviado com sucesso.')
                resendSignUp(loginFmt)
              }}
            >
              <br />
              <span className="text-tertiary-2 text-xl">Reenviar código</span>
            </a>
            {` | `}
            <a
              className="text-accent-9 font-bold cursor-pointer"
              onClick={() => setModalView('SIGNUP_VIEW')}
            >
              <span className="text-tertiary-2 text-xl">Usar outro login.</span>
            </a>
          </span>
        </div>
      </form>
    </div>
  )
}

export default ConfirmCode
