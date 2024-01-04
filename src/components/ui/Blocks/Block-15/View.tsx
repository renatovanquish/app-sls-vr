/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button } from 'components/ui'
import { Check } from 'components/icons'
import cn from 'classnames'
import { toast } from 'react-toast'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useRouter } from 'next/router'
import NumberFormat from 'react-number-format'
import { v4 as uuidv4 } from 'uuid'
import { useUI } from 'components/ui/context'

import ActionAuth from './ActionAuth'
import ActionPipeline from './ActionPipeline'
import ActionCRUDL from './ActionCRUDL'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })
interface Props {
  block: any
  user: any
}

export default function View(props: Props) {
  const { block, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const [data, setData] = useState([] as any)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [filesUpload, setFilesUpload] = useState([] as any)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setProgress } = useUI()

  useEffect(() => {
    if (block && block.config) {
      const configParse = JSON.parse(block.config)
      setConfig(configParse)
    }
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setContent(contentParse)

      let countSize = 0
      let countLine = 0
      const dataFMT = [] as any

      contentParse.data.map((field: any, index: number) => {
        countSize = countSize + parseInt(field.size)
        if (index === 0) {
          dataFMT.push({ fields: [] })
          dataFMT[countLine].fields.push(field)
          if (countSize >= 12) {
            if (index + 1 < contentParse.data.length) {
              dataFMT.push({ fields: [] })
              countLine++
            }
            countSize = 0
          }
        } else {
          if (countSize >= 12) {
            dataFMT[countLine].fields.push(field)
            if (index + 1 < contentParse.data.length) {
              dataFMT.push({ fields: [] })
              countLine++
            }
            countSize = 0
          } else {
            dataFMT[countLine].fields.push(field)
          }
        }
      })
      setData(dataFMT)
    }
    return () => {
      setConfig({} as any)
      setContent({} as any)
      setData({} as any)
    }
  }, [block])

  useEffect(() => {
    if (user) {
      setUserName(user.name)
      setUserEmail(user.email)
      setUserPhone(user.phone)
    }
    return () => {
      setUserName('')
      setUserEmail('')
      setUserPhone('')
    }
  }, [user])

  const handleChanged = (value: string, idxLine: number, idxField: number) => {
    const d = data
    d[idxLine].fields[idxField].value = value
    setData(d)
  }

  const submitForm = async () => {
    if (content.action === 'PIPELINE' || content.action === 'CRUDL') {
      if (!userName) {
        toast.error('Nome é obrigatório.')
        return null
      }
      if (!userEmail) {
        toast.error('Email é obrigatório.')
        return null
      }
      if (!userPhone) {
        toast.error('Celular/WhatsApp é obrigatório.')
        return null
      }
    }

    setLoading(true)

    const dataFmt: any[] = []
    let search = ''
    let existsUploadImage = false
    let existsUploadFiles = false

    const folder = 'uploads_forms'
    let uploadUniqueID = uuidv4()

    data.map((l: any, i: number) => {
      l.fields.map((f: any, i2: number) => {
        if (f.value || f.type === 'files') {
          if (f.type === 'currency') {
            f.valueFmt = f.value.toFixed(2).replace('.', ',')
          }
          if (
            f.type === 'image' &&
            f.value.type &&
            f.value.type.split('/')[0] === 'image'
          ) {
            const extension = f.value.name.split('.').pop()
            const fileName = `${folder}/${uuidv4()}.${extension}`
            f.fileName = fileName
            f.link = `${process.env.MIDIA_CLOUDFRONT}${fileName}`
            existsUploadImage = true
          }
          if (f.type === 'files' && filesUpload.length > 0) {
            existsUploadFiles = true
            f.files = [] as any
            filesUpload.map((file: any) => {
              const fileName = `${folder}/${uploadUniqueID}-${file.name}`
              f.files.push({
                fileName,
                link: `${process.env.MIDIA_CLOUDFRONT}${fileName}`
              })
            })
          }
          dataFmt.push(f)
          data[i].fields[i2] = f

          if (f.type !== 'currency' && f.type !== 'image' && f.type !== 'files') {
            search = search + ' ' + f.value.toString().toLowerCase()
          }
        }
      })
    })

    if (content.emailTo) {
      const response = await fetch('/api/sendForm', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: content.title,
          emailTo: content.emailTo,
          data: dataFmt,
          name: userName,
          email: userEmail,
          phone: userPhone,
        }),
      })
      const d = await response.json()
    }

    if (existsUploadImage || existsUploadFiles) {
      toast.info('Upload iniciado.')
    }

    if (existsUploadImage) {
      dataFmt.map(async (f: any) => {
        if (f.type === 'image') {
          await Storage.put(f.fileName, f.value, {
            level: 'public',
            progressCallback(progress: { loaded: any; total: any }) {
              const { loaded, total } = progress
              const p = ((loaded / total) * 100).toFixed(0)
              setProgress(p)
            },
          })
          setProgress(0)
        }
      })
    }

    if (existsUploadFiles) {
      let uploaded = 0
      filesUpload.map(async (file: any) => {
        uploaded++
        const fileName = `${folder}/${uploadUniqueID}-${file.name}`
        await Storage.put(fileName, file, {
          level: 'public',
          progressCallback(progress: { loaded: any; total: any }) {
            const { loaded, total } = progress
            const p = ((loaded / total) * 100).toFixed(0)
            setProgress(p)
          },
        })
        if (uploaded === filesUpload.length) {
          setProgress(0)
        }
      })
    }

    toast.info(
      content.message ? content.message : 'Envio realizado com sucesso!'
    )

    if (content.action === 'PIPELINE' || content.action === 'CRUDL') {
      const user = await ActionAuth({
        name: userName,
        email: userEmail,
        phone: userPhone,
      })

      if (user && user.id) {
        if (content.action === 'PIPELINE') {
          await ActionPipeline({
            userID: user.id,
            name: user.name,
            email: userEmail,
            phone: userPhone,
            title: content.title,
            groups: content.groups,
            data,
          })
          RedirectForm({ content, data, userName, userEmail, userPhone })
        } else if (content.action === 'CRUDL') {
          await ActionCRUDL({
            userID: user.id,
            name: user.name,
            email: userEmail,
            phone: userPhone,
            title: content.title,
            dataBase: content.dataBase,
            data,
            search,
          })
          RedirectForm({ content, data, userName, userEmail, userPhone })
        }
      } else {
        RedirectForm({ content, data, userName, userEmail, userPhone })
      }
    } else {
      RedirectForm({ content, data, userName, userEmail, userPhone })
    }

    console.log('content', content)
    console.log('dataFmt', dataFmt)
    console.log('filesUpload', filesUpload)

    setLoading(false)
  }

  return (
    <div
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
      {(content.title || content.description) && (
        <div className="flex flex-col text-center w-full mb-4">
          {content.title && (
            <h1 className="text-2xl font-medium title-font mb-4 text-accent-9 tracking-widest">
              {content.title}
            </h1>
          )}
          {content.description && (
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              {content.description}
            </p>
          )}
        </div>
      )}
      {(content.action === 'PIPELINE' || content.action === 'CRUDL') && (
        <AuthFields
          userName={userName}
          setUserName={setUserName}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userPhone={userPhone}
          setUserPhone={setUserPhone}
        />
      )}
      <div className="max-w-full w-full mx-auto">
        {data.map((line: any, idxLine: number) => (
          <div
            key={idxLine}
            className="mt-3 flex flex-col sm:flex-row basis-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4"
          >
            {line.fields.map((field: any, idxField: number) => (
              <div key={idxField} className={`basis-full md:basis-${field.size}/12`}>
                {field.type == 'text' && (
                  <FieldText
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'number' && (
                  <FieldNumber
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'currency' && (
                  <FieldCurrency
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'tel' && (
                  <FieldTel
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'email' && (
                  <FieldEmail
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'date' && (
                  <FieldDate
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'datetime' && (
                  <FieldDatetime
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'month' && (
                  <FieldMonth
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'week' && (
                  <FieldWeek
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'time' && (
                  <FieldTime
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'url' && (
                  <FieldURL
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'textarea' && (
                  <FieldTextarea
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                    value={data[idxLine].fields[idxField].value}
                  />
                )}
                {field.type == 'select' && (
                  <FieldSelect
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'image' && (
                  <FieldImage
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                  />
                )}
                {field.type == 'files' && (
                  <FieldFiles
                    field={field}
                    idxLine={idxLine}
                    idxField={idxField}
                    handleChanged={handleChanged}
                    setFilesUpload={setFilesUpload}
                    filesUpload={filesUpload}
                  />
                )}
                {field.type == 'title' && <FieldTitle field={field} />}
                {field.type == 'subTitle' && <FieldSubTitle field={field} />}
                {field.type == 'info' && <FieldInfo field={field} />}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Button
          type="button"
          variant="slim"
          loading={loading}
          disabled={loading}
          onClick={submitForm}
        >
          <Check className="-ml-2 mr-2" />
          {content.buttonName}
          {!content.buttonName && <span>Enviar</span>}
        </Button>
      </div>
    </div>
  )
}

interface AuthFieldsProps {
  userName: string
  setUserName: any
  userEmail: string
  setUserEmail: any
  userPhone: string
  setUserPhone: any
}
function AuthFields(props: AuthFieldsProps) {
  const {
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userPhone,
    setUserPhone,
  } = props
  return (
    <div className="max-w-full w-full mx-auto">
      <div className="mt-3 flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
        <div className="w-full md:w-4/12">
          <div className="flex -mx-3">
            <div className="w-full px-3">
              <label className="text-accent-7 text-sm font-semibold px-1">
                Nome completo
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={userName}
                  className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  onChange={(event: any) => setUserName(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <div className="flex -mx-3">
            <div className="w-full px-3">
              <label className="text-accent-7 text-sm font-semibold px-1">
                Email
              </label>
              <div className="flex">
                <input
                  type="email"
                  value={userEmail}
                  className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  onChange={(event: any) => setUserEmail(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <div className="flex -mx-3">
            <div className="w-full px-3">
              <label className="text-accent-7 text-sm font-semibold px-1">
                Celular / WhatsApp
              </label>
              <div className="flex">
                <div className="w-10 z-10"></div>
                <PhoneInput
                  name="phone"
                  id="phone"
                  value={userPhone as any}
                  className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  onChange={(e: any) => setUserPhone(e)}
                  international={false}
                  defaultCountry="BR"

                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PropsFields {
  field: any
  idxLine?: number
  idxField?: number
  handleChanged?: any
  value?: string
  setFilesUpload?: any
  filesUpload?: any
}

function FieldText(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <input
            type="text"
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(event: any) =>
              handleChanged(event.target.value, idxLine, idxField)
            }
          />
        </div>
      </div>
    </div>
  )
}

function FieldNumber(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <input
            type="number"
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(event: any) =>
              handleChanged(event.target.value, idxLine, idxField)
            }
          />
        </div>
      </div>
    </div>
  )
}

function FieldCurrency(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <NumberFormat
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            thousandsGroupStyle="thousand"
            prefix="R$ "
            thousandSeparator={'.'}
            decimalSeparator={','}
            displayType="input"
            type="text"
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale={true}
            onValueChange={(values) => {
              handleChanged(values.floatValue, idxLine, idxField)
            }}
            name={name}
          />
        </div>
      </div>
    </div>
  )
}

function FieldTel(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <div className="w-10 z-10"></div>
          <PhoneInput
            name="phone"
            id="phone"
            value={'' as any}
            className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(e: any) => handleChanged(e, idxLine, idxField)}
            international={false}
            defaultCountry="BR"

          />
        </div>
      </div>
    </div>
  )
}

function FieldEmail(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <input
            type="email"
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(event: any) =>
              handleChanged(event.target.value, idxLine, idxField)
            }
          />
        </div>
      </div>
    </div>
  )
}

function FieldDate(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <input
            type="date"
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(event: any) =>
              handleChanged(event.target.value, idxLine, idxField)
            }
          />
        </div>
      </div>
    </div>
  )
}

function FieldDatetime(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <input
            type="datetime-local"
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(event: any) =>
              handleChanged(event.target.value, idxLine, idxField)
            }
          />
        </div>
      </div>
    </div>
  )
}

function FieldMonth(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <input
            type="month"
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(event: any) =>
              handleChanged(event.target.value, idxLine, idxField)
            }
          />
        </div>
      </div>
    </div>
  )
}

function FieldWeek(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <input
            type="week"
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(event: any) =>
              handleChanged(event.target.value, idxLine, idxField)
            }
          />
        </div>
      </div>
    </div>
  )
}

function FieldTime(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <input
            type="time"
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(event: any) =>
              handleChanged(event.target.value, idxLine, idxField)
            }
          />
        </div>
      </div>
    </div>
  )
}

function FieldURL(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <input
            type="url"
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(event: any) =>
              handleChanged(event.target.value, idxLine, idxField)
            }
          />
        </div>
      </div>
    </div>
  )
}

function FieldTextarea(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name, options } = field
  const [valueTA, setValueTA] = useState('')

  const handleChangeTA = (event: any) => {
    setValueTA(event.target.value)
    handleChanged(event.target.value, idxLine, idxField)
  }

  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <textarea
            rows={options ? options.replace(/\D/g, '') : 4}
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            value={valueTA}
            onChange={handleChangeTA}
          />
        </div>
      </div>
    </div>
  )
}

function FieldSelect(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name, options } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <select
            onChange={(event: any) =>
              handleChanged(event.target.value, idxLine, idxField)
            }

            className="text-accent-9 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
          >
            <option>Selecione...</option>
            {options.split(',').map((opt: string, index: number) => (
              <option key={index} value={`${opt.trim()}`}>
                {opt.trim()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

function FieldImage(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged } = props
  const { name } = field
  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <label className="text-accent-7 text-sm font-semibold px-1">
          {name}
        </label>
        <div className="flex">
          <input
            type="file"
            className="py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            onChange={(event: any) =>
              handleChanged(event.target.files[0], idxLine, idxField)
            }
          />
        </div>
      </div>
    </div>
  )
}

import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'
import { useBreakPoints } from 'hooks/useBreakPoints'

function FieldFiles(props: PropsFields) {
  const { field, idxLine, idxField, handleChanged, setFilesUpload, filesUpload } = props
  const { name } = field
  const { isSm } = useBreakPoints()

  const onDrop = useCallback(async (acceptedFiles: any, setFilesUpload: (arg0: any) => void) => {
    setFilesUpload(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (droppedFiles: any) =>
      onDrop(
        droppedFiles,
        setFilesUpload
      ),
  })

  return (<div>
    <div
      {...getRootProps()}
      className="bg-accent-1 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-accent-3 border-dashed rounded-md cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Solte o arquivo aqui ...</p>
      ) : isSm ? (
        <p>Toque aqui para selecionar...</p>
      ) : (
        <p>Arraste e solte o(s) arquivos aqui ou clique para selecionar ...</p>
      )}

    </div>
    {filesUpload && filesUpload.length > 0 && (<div>
      {filesUpload.length === 1 && <div className='font-semibold'>Arquivo selecionado</div>}
      {filesUpload.length > 1 && <div className='font-semibold'>Arquivos selecionados</div>}
      {filesUpload.map((f:any,k:number)=><div className='test-center' key={k}>{f.path}</div>)}
    </div>)}
  </div>

  )
}

function FieldTitle(props: PropsFields) {
  const { field } = props
  const { name } = field
  return <div className="text-center font-semibold text-lg mt-6">{name}</div>
}

function FieldSubTitle(props: PropsFields) {
  const { field } = props
  const { name } = field
  return <div className="text-center -mt-1">{name}</div>
}

function FieldInfo(props: PropsFields) {
  const { field } = props
  const { options } = field
  return <div className="-mt-1 mb-3">
    <div dangerouslySetInnerHTML={{ __html: options }}></div>
    </div>
}

function RedirectForm(props: any) {
  const { content, data, userName, userEmail, userPhone } = props
  if (content.linkRedirect) {
    var f = document.createElement('form')
    f.action =
      content.linkRedirect.indexOf('http') === 0
        ? content.linkRedirect
        : `/page/${content.linkRedirect}`
    f.method = 'POST'
    var i = document.createElement('input')
    i.type = 'hidden'
    i.name = 'inputs'
    i.value = JSON.stringify({
      data,
      name: userName,
      email: userEmail,
      phone: userPhone,
    })
    f.appendChild(i)
    document.body.appendChild(f)
    f.submit()
  }
}
