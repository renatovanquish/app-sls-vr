import { Button, Input } from 'components/ui'
import { Check, Search } from 'components/icons'
import { toast } from 'react-toast'
import cep from 'cep-promise'

export default function AddressForm(props: any) {
  const {
    handleSubmit,
    zipcode,
    setZipcode,
    name,
    setName,
    reference,
    setReference,
    street,
    setStreet,
    number,
    setNumber,
    complement,
    setComplement,
    neighborhood,
    setNeighborhood,
    city,
    setCity,
    state,
    setState,
    country,
    setCountry,
    loading,
    disabled,
  } = props

  const getCEP = async (code: string) => {
    cep(code)
      .then((result: any) => {
        setZipcode(result.cep)
        setStreet(result.street)
        setNeighborhood(result.neighborhood)
        setCity(result.city)
        setState(result.state)
        setCountry('Brasil')
      })
      .catch((error: any) => toast.error(error.message))
  }

  return (
    <div className="px-5 pb-32 md:pb-5">
      <form className="max-w-screen-md" onSubmit={handleSubmit}>
        <div className="mt-4 grid grid-cols-6 gap-4">
          <div className="col-span-6 md:col-span-2">
            <div className="flex flex-row-reverse w-full">
              <div className="mt-6 pl-2">
                <div
                  className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                  onClick={() => {
                    getCEP(zipcode)
                  }}
                >
                  <Search className="flex-shrink-0 h-6 w-6" />
                </div>
              </div>
              <div className="w-full">
                <Input
                  label="CEP"
                  icon=""
                  value={zipcode}
                  onChange={(e) => {
                    setZipcode(e)
                    if (e.replace(/\D/g, '').length >= 8) {
                      getCEP(e.replace(/\D/g, ''))
                    }
                  }}
                  type="tel"
                  maxLength={9}
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <div className="col-span-6 md:col-span-4">
            <Input
              label="Nome"
              icon=""
              value={name}
              onChange={setName}
              type="text"
              placeholder="Ex: Casa, Trabalho..."
            />
          </div>

          <div className="col-span-6 md:col-span-4">
            <Input
              label="Logradouro"
              icon=""
              value={street}
              onChange={setStreet}
              type="text"
              placeholder=""
            />
          </div>

          <div className="col-span-6 md:col-span-1">
            <Input
              label="Número"
              icon=""
              value={number}
              onChange={setNumber}
              type="text"
              placeholder=""
            />
          </div>

          <div className="col-span-6 md:col-span-1">
            <Input
              label="Complemento"
              icon=""
              value={complement}
              onChange={setComplement}
              type="text"
              placeholder="Ex: Apto, Bloco..."
            />
          </div>

          <div className="col-span-6 md:col-span-3">
            <Input
              label="Bairro"
              icon=""
              value={neighborhood}
              onChange={setNeighborhood}
              type="text"
              placeholder=""
            />
          </div>

          <div className="col-span-6 md:col-span-3">
            <Input
              label="Cidade"
              icon=""
              value={city}
              onChange={setCity}
              type="text"
              placeholder=""
            />
          </div>

          <div className="col-span-6 md:col-span-3">
            <Input
              label="Estado"
              icon=""
              value={state}
              onChange={setState}
              type="text"
              placeholder=""
            />
          </div>

          <div className="col-span-6 md:col-span-3">
            <Input
              label="Pais"
              icon=""
              value={country}
              onChange={setCountry}
              type="text"
              placeholder=""
            />
          </div>

          <div className="col-span-6">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label className="text-sm font-semibold px-1">
                  Referência
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <textarea
                    value={reference}
                    onChange={(e) => {
                      setReference(e.target.value)
                    }}
                    name="reference"
                    id="reference"
                    rows={1}
                    autoComplete="off"
                    placeholder=""
                    className="bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  />
                </div>
                <span className="text-accent-3 text-xs">
                  Alguma observação para a localização.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:text-right">
          <div className="pt-6">
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={disabled}
            >
              <Check className="-ml-2 mr-2 h-7 w-7" />
              <span className="font-semibold md:font-medium text-lg md:text-base">
                SALVAR
              </span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
