/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button, Input } from 'components/ui'
import cn from 'classnames'
import { toast } from 'react-toast'
import { validate } from 'email-validator'
import { Mail, Person } from 'components/icons'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { useScreen } from 'hooks/useScreen'

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Actions from './Actions'

type Inputs = {
  name: string
  email: string
  phone: string
  type: string
  message: string
}

interface Props {
  block: any
  user: any
}

export default function View(props: Props) {
  const { block, user } = props
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const { isSm } = useBreakPoints()
  const { screenHeight } = useScreen()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const dataForm = watch()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const { name, email, phone, type, message } = data

    if (!isValidPhoneNumber(phone)) {
      toast.error(`Número do telefone inválido.`)
      setLoading(false)
      return null
    }

    const r = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        type,
        message,
        emailTo: content.emailTo,
        subject: content.subject ? content.subject : 'Contato pelo App.',
      }),
    })

    setLoading(false)
    toast.info(`Contato enviado com sucesso.`)

    await Actions({
      name,
      email,
      phone,
      type,
      message,
      subject: content.subject ? content.subject : 'Contato pelo App.',
    })
  }

  useEffect(() => {
    if (block && block.config) {
      const configParse = JSON.parse(block.config)
      setConfig(configParse)
    }
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setContent(contentParse)
    }
    return () => {
      setContent({} as any)
    }
  }, [block])

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('phone', user.phone)
    }
  }, [setValue, user])

  return (
    <section
      className={cn({
        ['hidden']: config.view === 'hide' || (config.view === 'guest' && user),
        ['md:hidden']: config.view === 'sm',
        ['hidden md:block']: config.view === 'lg',
        ['px-0']: config.padX && config.padX === 'none',
        ['px-4']: !config.padX || config.padX === 'small',
        ['px-8']: config.padX && config.padX === 'normal',
        ['px-12']: config.padX && config.padX === 'large',
        ['px-24']: config.padX && config.padX === 'extra',
        ['py-0']: config.padY && config.padY === 'none',
        ['py-4']: !config.padY || config.padY === 'small',
        ['py-8']: config.padY && config.padY === 'normal',
        ['py-12']: config.padY && config.padY === 'large',
        ['py-24']: config.padY && config.padY === 'extra',
        ['bg-accent-1']: config.bgMode === 'auto',
        [config.bgMode]: config.bgMode && config.bgMode.indexOf('bg-accent') === 0,
        ['bg-local']: config.bgMode === 'image',
      })}
      style={{
        backgroundColor: config.bgMode === 'custom' && config.bgColor ? config.bgColor : null,
        backgroundImage: config.bgMode === 'image' ? `url(${config.bgImage})` : '',
        backgroundRepeat: config.bgMode === 'image' ? 'no-repeat' : '',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >{config.anchor && <a id={`${config.anchor}`}></a>}
      <div className="mx-auto flex sm:flex-nowrap flex-wrap">
        <div
          style={isSm ? { height: screenHeight * 0.75 } : {}}
          className="w-full lg:w-2/3 md:w-1/2 bg-accent-3 rounded shadow-md overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative"
        >
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            frameBorder="0"
            title="map"
            marginHeight={0}
            marginWidth={0}
            scrolling="no"
            src={`https://maps.google.com/maps?width=100%&height=600&hl=pt_BR&q=${content.lat},${content.lng}&ie=UTF8&t=&z=14&iwloc=B&output=embed`}
          ></iframe>
          <div className="bg-accent-0 relative flex flex-wrap py-6 rounded shadow-md w-full">
            {content.address && (
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-accent-6 tracking-widest text-xs">
                  ENDEREÇO
                </h2>
                <p className="mt-1 text-accent-4">{content.address}</p>
              </div>
            )}
            <div className="w-full lg:w-1/2 px-6 mt-4 lg:mt-0">
              {content.email && (
                <h2 className="title-font font-semibold text-accent-6 tracking-widest text-xs">
                  EMAIL
                </h2>
              )}
              {content.email && (
                <a className="leading-relaxed text-accent-4">
                  {content.email}
                </a>
              )}
              {(content.phone1 || content.phone2) && (
                <h2 className="title-font font-semibold text-accent-6 tracking-widest text-xs mt-4">
                  TELEFONE
                </h2>
              )}
              {content.phone1 && (
                <p className="leading-relaxed text-accent-4">
                  {content.phone1}
                </p>
              )}
              {content.phone2 && (
                <p className="leading-relaxed text-accent-6">
                  {content.phone2}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 rounded shadow-md lg:w-1/3 md:w-1/2 bg-accent-1 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-accent-6 text-2xl font-semibold title-font">
              {content.blockTitle}
            </h2>
            <p className="leading-relaxed mb-5">
              {content.blockDescription}
            </p>
            <div className="w-full mb-3">
              <Input
                icon={<Person />}
                placeholder="Nome completo"
                type="text"
                aria-invalid={errors.name ? 'true' : 'false'}
                register={register('name')}
                defaultValue={''}
                notes={
                  errors.name && errors.name.type === 'required'
                    ? 'Seu nome é obrigatório.'
                    : ''
                }
              />
            </div>
            <div className="w-full mb-3">
              <Input
                icon={<Mail />}
                placeholder="Email"
                type="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                register={register('email')}
                defaultValue={''}
                notes={
                  errors.email && errors.email.type === 'required'
                    ? 'Email é obrigatório.'
                    : ''
                }
              />
            </div>
            <div className="relative mb-3">
              <PhoneInput
                name="phone"
                id="phone"
                className="bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                value={user && (user.phone as any)}
                onChange={(e: any) => setValue('phone', e)}
                international={false}
                countrySelectProps={{ unicodeFlags: true }}
                defaultCountry="BR"
                placeholder="Celular / WhatsApp"
              />
            </div>
            {content.typeOptions && (
              <div className="mb-3 flex -mx-3">
                <div className="w-full px-3">
                  <div className="flex">
                    <select
                      onChange={(event: any) =>
                        setValue('type', event.target.value)
                      }

                      className="text-accent-9 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option>Assunto</option>
                      {content.typeOptions
                        .split(',')
                        .map((typeOpt: string, idxOpt: number) => (
                          <option className="capitalize" key={idxOpt}>
                            {typeOpt.trim()}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div className="relative mb-4">
              <Controller
                name="message"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <textarea
                    rows={4}
                    className="bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    value={value}
                    onChange={onChange}
                    placeholder="Digite sua mensagem"
                  />
                )}
              />
            </div>
            <Button
              type="submit"
              loading={loading}
              disabled={
                !dataForm ||
                !dataForm.name ||
                !dataForm.email ||
                !dataForm.phone ||
                !dataForm.message ||
                (dataForm.email && !validate(dataForm.email))
                  ? true
                  : false
              }
            >
              {!loading && <span>ENVIAR</span>}
              {loading && <span>ENVIANDO</span>}
            </Button>
            {content.notes && (
              <p className="text-xs mt-3">{content.notes}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
