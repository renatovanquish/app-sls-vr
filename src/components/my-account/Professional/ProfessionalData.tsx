import { useState, useEffect } from 'react'
import { Button, Input, FormCard, Segment } from 'components/ui'
import { Check } from 'components/icons'
import { useUserAuth } from 'components/userAuth/context'

import { toast } from 'react-toast'

import { WithContext as ReactTags } from 'react-tag-input'
const KeyCodes = { comma: 188, enter: [10, 13] }
const delimiters = [...KeyCodes.enter, KeyCodes.comma]

export default function ProfessionalData(props: any) {
  const [id, setId] = useState(props.user && props.user.id ? props.user.id : '')
  const [docProfession, setDocProfession] = useState('')
  const [specialties, setSpecialties] = useState('')
  const [subSpecialties, setSubSpecialties] = useState('')
  const [profession, setProfession] = useState('')
  const [bio, setBio] = useState('')

  /*
   * CODES
   */
  const [codes, setCodes] = useState([] as any)

  const handleCodesDelete = (i: number) => {
    setCodes(codes.filter((code: any, index: number) => index !== i))
  }

  const handleCodesAddition = (code: any) => {
    setCodes([...codes, code])
  }

  const handleCodesDrag = (code: any, currPos: any, newPos: any) => {
    const newCodes = codes.slice()
    newCodes.splice(currPos, 1)
    newCodes.splice(newPos, 0, code)
    setCodes(newCodes)
  }

  /*
   * SCHEDULES SUNDAY
   */
  const [sunday, setSunday] = useState([] as any)
  const handleSundayDelete = (i: number) => {
    setSunday(sunday.filter((s: any, index: number) => index !== i))
  }
  const handleSundayAddition = (s: any) => {
    setSunday([...sunday, s])
  }
  const handleSundayDrag = (s: any, currPos: any, newPos: any) => {
    const newCodes = sunday.slice()
    newCodes.splice(currPos, 1)
    newCodes.splice(newPos, 0, s)
    setSunday(newCodes)
  }

  /*
   * SCHEDULES SATURDAY
   */
  const [saturday, setSaturday] = useState([] as any)
  const handleSaturdayDelete = (i: number) => {
    setSaturday(saturday.filter((s: any, index: number) => index !== i))
  }
  const handleSaturdayAddition = (s: any) => {
    setSaturday([...saturday, s])
  }
  const handleSaturdayDrag = (s: any, currPos: any, newPos: any) => {
    const newCodes = saturday.slice()
    newCodes.splice(currPos, 1)
    newCodes.splice(newPos, 0, s)
    setSaturday(newCodes)
  }

  /*
   * SCHEDULES FRIDAY
   */
  const [friday, setFriday] = useState([] as any)
  const handleFridayDelete = (i: number) => {
    setFriday(friday.filter((s: any, index: number) => index !== i))
  }
  const handleFridayAddition = (s: any) => {
    setFriday([...friday, s])
  }
  const handleFridayDrag = (s: any, currPos: any, newPos: any) => {
    const newCodes = friday.slice()
    newCodes.splice(currPos, 1)
    newCodes.splice(newPos, 0, s)
    setFriday(newCodes)
  }

  /*
   * SCHEDULES THURSDAY
   */
  const [thursday, setThursday] = useState([] as any)
  const handleThursdayDelete = (i: number) => {
    setThursday(thursday.filter((s: any, index: number) => index !== i))
  }
  const handleThursdayAddition = (s: any) => {
    setThursday([...thursday, s])
  }
  const handleThursdayDrag = (s: any, currPos: any, newPos: any) => {
    const newCodes = thursday.slice()
    newCodes.splice(currPos, 1)
    newCodes.splice(newPos, 0, s)
    setThursday(newCodes)
  }

  /*
   * SCHEDULES WEDNESDAY
   */
  const [wednesday, setWednesday] = useState([] as any)
  const handleWednesdayDelete = (i: number) => {
    setWednesday(wednesday.filter((s: any, index: number) => index !== i))
  }
  const handleWednesdayAddition = (s: any) => {
    setWednesday([...wednesday, s])
  }
  const handleWednesdayDrag = (s: any, currPos: any, newPos: any) => {
    const newCodes = wednesday.slice()
    newCodes.splice(currPos, 1)
    newCodes.splice(newPos, 0, s)
    setWednesday(newCodes)
  }

  /*
   * SCHEDULES TUESDAY
   */
  const [tuesday, setTuesday] = useState([] as any)
  const handleTuesdayDelete = (i: number) => {
    setTuesday(tuesday.filter((s: any, index: number) => index !== i))
  }
  const handleTuesdayAddition = (s: any) => {
    setTuesday([...tuesday, s])
  }
  const handleTuesdayDrag = (s: any, currPos: any, newPos: any) => {
    const newCodes = tuesday.slice()
    newCodes.splice(currPos, 1)
    newCodes.splice(newPos, 0, s)
    setTuesday(newCodes)
  }

  /*
   * SCHEDULES MONDAY
   */
  const [monday, setMonday] = useState([] as any)
  const handleMondayDelete = (i: number) => {
    setMonday(monday.filter((s: any, index: number) => index !== i))
  }
  const handleMondayAddition = (s: any) => {
    setMonday([...monday, s])
  }
  const handleMondayDrag = (s: any, currPos: any, newPos: any) => {
    const newCodes = monday.slice()
    newCodes.splice(currPos, 1)
    newCodes.splice(newPos, 0, s)
    setMonday(newCodes)
  }

  const [tabSel, setTabSel] = useState(0)

  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const { updateProfile, profile } = useUserAuth()

  useEffect(() => {
    if (profile) {
      console.log(profile)

      setDocProfession(profile.docProfession ? profile.docProfession : '')
      setSpecialties(profile.specialties ? profile.specialties : '')
      setSubSpecialties(profile.subSpecialties ? profile.subSpecialties : '')
      setProfession(profile.profession ? profile.profession : '')
      setBio(profile.bio ? profile.bio : '')

      const codesTMP: any[] = []
      if (profile.zipCodeCoverage) {
        profile.zipCodeCoverage.map((code: string) => {
          codesTMP.push({ id: code, text: code })
        })
      }
      setCodes(codesTMP)

      const sundayTMP: any[] = []
      if (profile.schedulesSunday) {
        profile.schedulesSunday.map((s: string) => {
          sundayTMP.push({ id: s, text: s })
        })
      }
      setSunday(sundayTMP)

      const mondayTMP: any[] = []
      if (profile.schedulesMonday) {
        profile.schedulesMonday.map((s: string) => {
          mondayTMP.push({ id: s, text: s })
        })
      }
      setMonday(mondayTMP)

      const tuesdayTMP: any[] = []
      if (profile.schedulesTuesday) {
        profile.schedulesTuesday.map((s: string) => {
          tuesdayTMP.push({ id: s, text: s })
        })
      }
      setTuesday(tuesdayTMP)

      const wednesdayTMP: any[] = []
      if (profile.schedulesWednesday) {
        profile.schedulesWednesday.map((s: string) => {
          wednesdayTMP.push({ id: s, text: s })
        })
      }
      setWednesday(wednesdayTMP)

      const thursdayTMP: any[] = []
      if (profile.schedulesThursday) {
        profile.schedulesThursday.map((s: string) => {
          thursdayTMP.push({ id: s, text: s })
        })
      }
      setThursday(thursdayTMP)

      const fridayTMP: any[] = []
      if (profile.schedulesFriday) {
        profile.schedulesFriday.map((s: string) => {
          fridayTMP.push({ id: s, text: s })
        })
      }
      setFriday(fridayTMP)

      const saturdayTMP: any[] = []
      if (profile.schedulesSaturday) {
        profile.schedulesSaturday.map((s: string) => {
          saturdayTMP.push({ id: s, text: s })
        })
      }
      setSaturday(saturdayTMP)
    }
  }, [profile])

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
    }

    setLoading(true)

    const codesFMT: any[] = []
    codes.map((code: any) => {
      codesFMT.push(code.text)
    })

    const sundayFMT: any[] = []
    sunday.map((s: any) => {
      sundayFMT.push(s.text)
    })

    const mondayFMT: any[] = []
    monday.map((s: any) => {
      mondayFMT.push(s.text)
    })

    const tuesdayFMT: any[] = []
    tuesday.map((s: any) => {
      tuesdayFMT.push(s.text)
    })

    const wednesdayFMT: any[] = []
    wednesday.map((s: any) => {
      wednesdayFMT.push(s.text)
    })

    const thursdayFMT: any[] = []
    thursday.map((s: any) => {
      thursdayFMT.push(s.text)
    })

    const fridayFMT: any[] = []
    friday.map((s: any) => {
      fridayFMT.push(s.text)
    })

    const saturdayFMT: any[] = []
    saturday.map((s: any) => {
      saturdayFMT.push(s.text)
    })

    const inputs = {
      id,
      docProfession,
      specialties,
      subSpecialties,
      profession,
      bio,
      zipCodeCoverage: codesFMT,
      schedulesSunday: sundayFMT,
      schedulesMonday: mondayFMT,
      schedulesTuesday: tuesdayFMT,
      schedulesWednesday: wednesdayFMT,
      schedulesThursday: thursdayFMT,
      schedulesFriday: fridayFMT,
      schedulesSaturday: saturdayFMT,
    }

    await updateProfile(inputs)
    setLoading(false)
    toast('Dados atualizados com sucesso.', {
      backgroundColor: '#263238',
      color: '#fff',
    })
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
        title="Dados e ajustes do Profissional"
        description=""
        buttons={<Buttons />}
      >
        <div className="tabs">
          <a
            onClick={() => setTabSel(0)}
            className={`tab tab-lifted ${tabSel === 0 && 'tab-active'}`}
          >
            Dados
          </a>
          <a
            onClick={() => setTabSel(1)}
            className={`tab tab-lifted ${tabSel === 1 && 'tab-active'}`}
          >
            Região
          </a>
          <a
            onClick={() => setTabSel(2)}
            className={`tab tab-lifted ${tabSel === 2 && 'tab-active'}`}
          >
            Horários
          </a>
          <div className="flex-1 cursor-default tab tab-lifted"></div>
        </div>

        {tabSel === 0 && (
          <div>
            <Segment
            className='mt-4'
              title="Dados Profissionais"
              description="Informações do seu perfil."
            />

            <div className="mt-4 grid grid-cols-6 gap-4">
              <div className="col-span-6 md:col-span-3">
                <Input
                  label="Conselho de Classe"
                  value={docProfession}
                  onChange={setDocProfession}
                  type="text"

                />
              </div>

              <div className="col-span-6 md:col-span-3">
                <Input
                  label="Profissão"
                  value={profession}
                  onChange={setProfession}
                  type="text"

                />
              </div>

              <div className="col-span-6 md:col-span-3">
                <Input
                  label="Especialidade"
                  value={specialties}
                  onChange={setSpecialties}
                  type="text"

                />
              </div>

              <div className="col-span-6 md:col-span-3">
                <Input
                  label="Sub-Especialidade"
                  value={subSpecialties}
                  onChange={setSubSpecialties}
                  type="text"

                />
              </div>

              <div className="col-span-6">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label className="text-accent-7 text-sm font-semibold px-1">
                      Mini currículo
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <textarea
                        value={bio}
                        onChange={(e) => {
                          setBio(e.target.value)
                        }}
                        name="bio"
                        id="bio"
                        rows={5}
                        autoComplete="off"

                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      />
                    </div>
                    <span className="text-accent-6 text-xs">
                      Descreva seu mini currículo de forma sucinta.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tabSel === 1 && (
          <div className="-mt-4">
            <Segment
              title="Região de Atendimento"
              description="Entre com os CEPs cobertos pelo seu atendimento."
            />
            <div className="mt-4 grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      CEPs atendidos
                    </label>
                    <div className="text-accent-6 text-xs ml-1 mb-1">
                      Entre com um CEP por vez e tecle enter para adicionar.
                    </div>
                    <ReactTags
                      tags={codes}
                      delimiters={delimiters}
                      handleDelete={handleCodesDelete}
                      handleAddition={handleCodesAddition}
                      handleDrag={handleCodesDrag}
                      inputFieldPosition="top"
                      autocomplete
                      placeholder="Inserir CEP"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tabSel === 2 && (
          <div className="-mt-4">
            <Segment
              title="Disponibilidade de horários"
              description="Entre com a grade de horários semanal."
              notes="Entre com um horário por vez e tecle enter para adicionar. Exemplo: 08:00"
            />
            <div className="mt-4 grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <div className="divider">Domingo</div>
                    <ReactTags
                      tags={sunday}
                      delimiters={delimiters}
                      handleDelete={handleSundayDelete}
                      handleAddition={handleSundayAddition}
                      handleDrag={handleSundayDrag}
                      inputFieldPosition="top"
                      autocomplete
                      placeholder="Inserir 00:00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <div className="divider">Segunda-feira</div>
                    <ReactTags
                      tags={monday}
                      delimiters={delimiters}
                      handleDelete={handleMondayDelete}
                      handleAddition={handleMondayAddition}
                      handleDrag={handleMondayDrag}
                      inputFieldPosition="top"
                      autocomplete
                      placeholder="Inserir 00:00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <div className="divider">Terça-feira</div>
                    <ReactTags
                      tags={tuesday}
                      delimiters={delimiters}
                      handleDelete={handleTuesdayDelete}
                      handleAddition={handleTuesdayAddition}
                      handleDrag={handleTuesdayDrag}
                      inputFieldPosition="top"
                      autocomplete
                      placeholder="Inserir 00:00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <div className="divider">Quarta-feira</div>
                    <ReactTags
                      tags={wednesday}
                      delimiters={delimiters}
                      handleDelete={handleWednesdayDelete}
                      handleAddition={handleWednesdayAddition}
                      handleDrag={handleWednesdayDrag}
                      inputFieldPosition="top"
                      autocomplete
                      placeholder="Inserir 00:00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <div className="divider">Quinta-feira</div>
                    <ReactTags
                      tags={thursday}
                      delimiters={delimiters}
                      handleDelete={handleThursdayDelete}
                      handleAddition={handleThursdayAddition}
                      handleDrag={handleThursdayDrag}
                      inputFieldPosition="top"
                      autocomplete
                      placeholder="Inserir 00:00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <div className="divider">Sexta-feira</div>
                    <ReactTags
                      tags={friday}
                      delimiters={delimiters}
                      handleDelete={handleFridayDelete}
                      handleAddition={handleFridayAddition}
                      handleDrag={handleFridayDrag}
                      inputFieldPosition="top"
                      autocomplete
                      placeholder="Inserir 00:00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <div className="divider">Sábado</div>
                    <ReactTags
                      tags={saturday}
                      delimiters={delimiters}
                      handleDelete={handleSaturdayDelete}
                      handleAddition={handleSaturdayAddition}
                      handleDrag={handleSaturdayDrag}
                      inputFieldPosition="top"
                      autocomplete
                      placeholder="Inserir 00:00"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </FormCard>
    </form>
  )
}
