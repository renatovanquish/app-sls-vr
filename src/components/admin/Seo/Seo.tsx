import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Input, FormCard } from 'components/ui'
import { toast } from 'react-toast'
import { Check } from 'components/icons'
import { useConfig } from 'hooks/useConfig'
import { useTheme } from 'next-themes'
import { useUI } from 'components/ui/context'

type Inputs = {
  googleAnalyticsID: string
  googleSiteVerification: string
}

interface Props {
  user: any
}

export default function Seo(props: Props) {
  const { user } = props
  const sitemapUrl = `${process.env.URL}sitemap.xml`
  const [loading, setLoading] = useState(false)
  const { updateConfig } = useConfig()
  const { config, setConfig } = useUI()
  const { theme } = useTheme()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setValue('googleAnalyticsID', config.googleAnalyticsID)
      setValue('googleSiteVerification', config.googleSiteVerification)
    }
    return () => {
      isMounted = false
    }
  }, [config])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { googleAnalyticsID, googleSiteVerification } = data
    setLoading(true)
    
    const updatedConfig = await updateConfig({ id: 'DEFAULT', googleAnalyticsID, googleSiteVerification })
    setConfig(updatedConfig)

    setLoading(false)
    toast('Configurações atualizadas com sucesso.', {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const copyLink = () => {
    const selBox = document.createElement('textarea')
    selBox.style.position = 'fixed'
    selBox.style.left = '0'
    selBox.style.top = '0'
    selBox.style.opacity = '0'
    selBox.value = sitemapUrl
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)
    toast.hideAll()
    toast.info('Link copiado para área de transferencia.')
  }

  const Buttons: React.FC = () => (
    <div>
      <Button variant="slim" loading={loading} type="submit">
        <Check className="h-7 w-7" />
        <span className="ml-2 font-semibold md:font-medium text-lg md:text-base">
          SALVAR
        </span>
      </Button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormCard
        title="SEO - Search Engine Optimization"
        description="Otimizações e integrações"
        buttons={<Buttons />}
      >
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6">
            <label className="text-accent-7 text-sm font-semibold px-1">
              Link do Sitemap
            </label>
            <div className="text-accent-9 bg-accent-1 flex w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500">
              <span
                onClick={() => copyLink()}
                className="text-accent-9 bg-accent-2 cursor-pointer inline-flex items-center px-3 rounded-l-md text-sm"
              >
                Copiar
              </span>
              <input
                value={`${sitemapUrl}`}
                type="text"
                autoComplete="off"
                placeholder=""
                readOnly={true}
                id="sitemap"
                className="text-accent-9 bg-accent-1 focus:ring-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-none"
              />
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <Input
              label="Google Site Verification"
              type="text"
              aria-invalid={errors.googleSiteVerification ? 'true' : 'false'}
              register={register('googleSiteVerification')}
              defaultValue={''}
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <Input
              label="Google Analytics ID"
              type="text"
              aria-invalid={errors.googleAnalyticsID ? 'true' : 'false'}
              register={register('googleAnalyticsID')}
              defaultValue={''}
            />
          </div>
        </div>
      </FormCard>
    </form>
  )
}
