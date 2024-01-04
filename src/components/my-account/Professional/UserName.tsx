import { useEffect, useState, useCallback } from 'react'
import { Button, Input, FormCard } from 'components/ui'
import { Check } from 'components/icons'
import { useUserAuth } from 'components/userAuth/context'

import { toast } from 'react-toast'

export default function UserName(props: any) {
  const [id, setId] = useState(props.user && props.user.id ? props.user.id : '')
  const [urlUserName, setUrlUserName] = useState('')
  const [urlEnable, setUrlEnable] = useState(false)

  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const { updateProfile, profile, user } = useUserAuth()

  useEffect(() => {
    if (profile) {
      setUrlUserName(
        profile.urlUserName
          ? profile.urlUserName
          : `${process.env.URL}${user.id}`
      )
      setUrlEnable(profile.urlEnable ? true : false)
    }
  }, [profile])

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    setLoading(true)
    await updateProfile({ id, urlUserName, urlEnable })
    setLoading(false)
    toast('Dados atualizados com sucesso.', {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const handleValidation = useCallback(() => {
    if (dirty) {
      setDisabled(urlEnable && !urlUserName)
    }
  }, [urlUserName, urlEnable, dirty])

  const handleCheckboxChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    if (target.name === 'urlEnable') {
      setUrlEnable(value)
    }
  }

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  function handleUrlUserNameChange(event: any) {
    setUrlUserName(event.target.value)
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
        title="Link de acesso do perfil"
        description="Associados e visitantes podem realizar pesquisas no banco de dados
        dos associados. Abaixo você pode permitir ou não que seu perfil e
        informações profissionais sejam exibidas. Você pode definir e
        habilitar uma URL, para expor suas informações profissionais para os
        demais usuários. Além disto através dela os usuários poderão entrar
        em contato com você e realizar solicitações."
        buttons={<Buttons />}
      >
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6 px-0 md:px-2">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Link de acesso direto
                </label>
                <div className="mt-1 flex w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-accent-2 border-accent-0 text-accent-6 text-sm">
                    https://
                  </span>
                  <input
                    value={urlUserName}
                    onChange={handleUrlUserNameChange}
                    type="text"
                    autoComplete="off"

                    id="urlUserName"
                    name="urlUserName"
                    className="text-accent-9 bg-accent-0 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-accent-2"
                  />
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm text-accent-7"></p>
          </div>

          <div className="col-span-6 px-0 md:px-2">
            <fieldset>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="urlEnable"
                      name="urlEnable"
                      checked={urlEnable}
                      onChange={handleCheckboxChange}
                      className="checkbox"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-medium text-gray-700">
                      Permitir visualização do perfil
                    </label>
                    <p className="text-accent-7">
                      Tornar suas informações profissionais acessíveis para os
                      demais usuários.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </FormCard>
    </form>
  )
}
