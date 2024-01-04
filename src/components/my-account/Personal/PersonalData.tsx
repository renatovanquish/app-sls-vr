import React, { useEffect, useState, useCallback } from 'react'
import { validate } from 'email-validator'
import { Button, Input, FormCard } from 'components/ui'
import { Check } from 'components/icons'
import { useUserAuth } from 'components/userAuth/context'
import { Person, Mail } from 'components/icons'
import { DocTypes } from 'API'
import { toast } from 'react-toast'
import { cpf } from 'cpf-cnpj-validator'

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


export default function PersonalData(props: any) {
  const [id, setId] = useState(props.user && props.user.id ? props.user.id : '')
  const [name, setName] = useState(
    props.user && props.user.name ? props.user.name : ''
  )
  const [email, setEmail] = useState(
    props.user && props.user.email ? props.user.email : ''
  )
  const [phone, setPhone] = useState(
    props.user && props.user.phone ? props.user.phone : ''
  )
  const [createdAt] = useState(
    props.user && props.user.createdAt ? props.user.createdAt : ''
  )
  const [doc, setDoc] = useState('')
  const [docType, setDocType] = useState('')

  const [gender, setGender] = useState('')
  const [birth, setBirth] = useState('')

  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const { user, updateUser, profile } = useUserAuth()

  useEffect(() => {
    if (profile) {
      setGender(profile.gender ? profile.gender : 'UNKNOWN')
      setBirth(profile.birth ? profile.birth : '')
      setDoc(profile.doc ? profile.doc : '')
      setDocType(profile.docType ? profile.docType : DocTypes.CPF)
    }
  }, [profile])

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    setLoading(true)

    await updateUser({ id, name, email, phone, birth, gender, doc, docType, createdAt })

    setLoading(false)
    toast('Dados atualizados com sucesso.', {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const handleValidation = useCallback(() => {
    if (dirty) {
      setDisabled(!email || !validate(email) || name.length < 5 || !phone)
    }
  }, [name, email, phone, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

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
        title="Dados Pessoais"
        description="Mantenha seus dados atualizados."
        buttons={<Buttons />}
      >
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6 md:col-span-3">
            <Input
              label="Nome completo"
              icon={<Person />}
              value={name}
              onChange={setName}
              type="text"

            />
          </div>

          <div className="col-span-6 md:col-span-3">
            <Input
              label="Email"
              icon={<Mail />}
              value={email}
              onChange={setEmail}
              type="email"

            />
          </div>

          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-sm font-semibold px-1"
                >
                  Celular
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <PhoneInput
                    name="phone"
                    id="phone"
                    className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    value={phone as any}
                    onChange={setPhone}
                    international={false}
                    defaultCountry="BR"

                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <Input
              label="Nascimento"
              value={birth}
              onChange={setBirth}
              type="date"

            />
          </div>

          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-sm font-semibold px-1"
                >
                  Gênero
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value)
                    }}
                    id="gender"
                    name="gender"

                    className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="UNKNOWN">Não informado</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {process.env.APP_COMMERCE && (<div className="mt-4 col-span-6">
            <div className='text-xl font-semibold'>Documento de identificação</div>
            <div>Necessário para realizar compras no app.</div>
          </div>)}

          {process.env.APP_COMMERCE && <div className="col-span-6 md:col-span-3">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-4 text-sm font-semibold px-1"
                >
                  Tipo do Documento
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    value={docType}
                    onChange={(e) => {
                      setDocType(e.target.value)
                    }}
                    id="docType"
                    name="docType"

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value={DocTypes.CNPJ}>CNPJ</option>
                    <option value={DocTypes.CPF}>CPF</option>
                    <option value={DocTypes.PASSPORT}>Passaporte</option>
                  </select>
                </div>
              </div>
            </div>
          </div>}

          {process.env.APP_COMMERCE && <div className="col-span-6 md:col-span-3">
              <Input
                label="Documento"
                value={doc}
                onChange={setDoc}
                type="number"

                defaultValue=""
                notes={`${
                  docType &&
                  docType === DocTypes.CPF &&
                  doc &&
                  !cpf.isValid(doc)
                    ? 'CPF Inválido'
                    : ''
                }`}
              />
          </div>}

        </div>
      </FormCard>
    </form>
  )
}
