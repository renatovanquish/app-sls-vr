import { useState, useEffect } from 'react'
import { Button, FormCard } from 'components/ui'
import { Check } from 'components/icons'
import { useUserAuth } from 'components/userAuth/context'

import { toast } from 'react-toast'

export default function ConsentCookies(props: any) {
  const [id, setId] = useState(props.user ? props.user.id : null)
  const [allowCookiesPreference, setAllowCookiesPreference] = useState(false)
  const [allowCookiesStatistic, setAllowCookiesStatistic] = useState(false)

  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const { updateProfile, profile } = useUserAuth()

  useEffect(() => {
    if (profile) {
      setAllowCookiesPreference(profile.allowCookiesPreference ? true : false)
      setAllowCookiesStatistic(profile.allowCookiesStatistic ? true : false)
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
      allowCookiesPreference,
      allowCookiesStatistic,
    })
    setLoading(false)
    toast('Opções de cookies atualizado com sucesso.', {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const handleCheckboxChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    if (target.name === 'allowCookiesPreference') {
      setAllowCookiesPreference(value)
      localStorage.setItem('accept_cookies_preference', value)
    }
    if (target.name === 'allowCookiesStatistic') {
      setAllowCookiesStatistic(value)
      localStorage.setItem('accept_cookies_statistic', value)
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
        title="Gerir preferências de Cookies"
        description="Cookies são arquivos salvos no seu celular, tablet ou computador. Utilizamos cookies para fazer com sua experiência no App seja a melhor possível."
        buttons={<Buttons />}
      >
        <div className="mt-8">
          <div className="flex items-start">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="allowCookiesMin"
                name="allowCookiesMin"
                checked={true}
                onChange={handleCheckboxChange}
                className="checkbox"
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor="allowCookiesMin"
                className="font-medium text-accent-9 text-lg"
              >
                Cookies necessários
              </label>
              <p className="text-accent-7 text-sm">
                São essenciais para o funcionamento do app, sem eles o app não
                seria capaz de realizar por exemplo a conexão persistente e
                manter dados off-line.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="allowCookiesPreference"
                name="allowCookiesPreference"
                checked={allowCookiesPreference}
                onChange={handleCheckboxChange}
                className="checkbox"
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor="allowCookiesPreference"
                className="font-medium text-accent-9 text-lg"
              >
                Cookies de preferência
              </label>
              <p className="text-accent-7 text-sm">
                Permitem que o app se lembre de informações que mudam a forma
                como o ele se comporta ou parece, como seu tema preferido ou a
                região em que você está.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="allowCookiesStatistic"
                name="allowCookiesStatistic"
                checked={allowCookiesStatistic}
                onChange={handleCheckboxChange}
                className="checkbox"
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor="allowCookiesStatistic"
                className="font-medium text-accent-9 text-lg"
              >
                Cookies de estatísticas
              </label>
              <p className="text-accent-7 text-sm">
                Ajudam a entender como os usuários interagem com o app,
                coletando e relatando informações anonimamente.
              </p>
            </div>
          </div>
        </div>
      </FormCard>
    </form>
  )
}
