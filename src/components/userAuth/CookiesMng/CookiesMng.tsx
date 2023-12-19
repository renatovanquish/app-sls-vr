import { FC, useEffect } from 'react'

import { useState } from 'react'

interface Props {}

const CookiesMng: FC<Props> = () => {
  const [allowCookiesPreference, setAllowCookiesPreference] = useState(false)
  const [allowCookiesStatistic, setAllowCookiesStatistic] = useState(false)

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

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const acp = localStorage.getItem('accept_cookies_preference')
      setAllowCookiesPreference(acp && acp == 'true' ? true : false)

      const acs = localStorage.getItem('accept_cookies_statistic')
      setAllowCookiesStatistic(acs && acs == 'true' ? true : false)
    }
    return () => {
      isMounted = false
      setAllowCookiesPreference(false)
      setAllowCookiesStatistic(false)
    }
  }, [])

  return (
    <div className="pt-2 px-8 pb-32 md:pb-20">
      <form action="#" method="POST">
        <div style={{ maxWidth: 640 }}>
          <div className="text-accent-7">
            Cookies são arquivos salvos no seu celular, tablet ou computador.
            Utilizamos cookies para fazer com sua experiência no App seja a
            melhor possível.
          </div>

          <div className="col-span-6 px-0 md:px-2 py-3">
            <fieldset>
              <div className="mt-6 space-y-4">
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
                      className="font-semibold text-accent-9 text-lg"
                    >
                      Cookies necessários
                    </label>
                    <p className="text-accent-7">
                      São essenciais para o funcionamento do app, sem eles o app
                      não seria capaz de realizar por exemplo a conexão
                      persistente e manter dados off-line.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center">
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
                    <p className="text-accent-7">
                      Permitem que o app se lembre de informações que mudam a
                      forma como o ele se comporta ou parece, como seu tema
                      preferido ou a região em que você está.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center">
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
                    <p className="text-accent-7">
                      Ajudam a entender como os usuários interagem com o app,
                      coletando e relatando informações anonimamente.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CookiesMng
